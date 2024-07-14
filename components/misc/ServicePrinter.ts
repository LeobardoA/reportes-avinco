import Service from "./Service";
import * as FileSystem from 'expo-file-system';

export async function setHTML(name: string, uri: string) {
  try {
    const destinoArchivo = `${FileSystem.documentDirectory}${name}`;
    await FileSystem.copyAsync({ from: uri, to: destinoArchivo });
    return destinoArchivo;
  } catch (error) {
    console.error('Error al guardar o compartir el archivo:', error);
  }
}

export async function generateHTML(servicio: Service) {
  return `
  <!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Formulario de Mantenimiento</title>
    <style>
        .hoja-a4 {
            width: 21.59cm;
            height: 27.9cm;
            margin: 0 auto;
            box-sizing: border-box;
            background-color: white;
            position: relative;
            border-color: black;
            border-style: solid;
            padding: 20px;
            font-family: Arial, sans-serif;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            margin-left: 2cm;
        }

        .logo {
            width: 7cm;
        }

        .info {
            text-align: right;
        }

        .form-section {
            border: 1px solid black;
            padding: 10px;
        }

        .form-section table {
            width: 100%;
            border-collapse: collapse;
        }

        .form-section th,
        .form-section td {
            border: 1px solid black;
            padding: 5px;
            text-align: left;
            font-size: 0.3cm;
        }

        .form-section th {
            background-color: #f0f0f0;
        }

        .form-section pre {
            padding: 0px;
            margin: 0px;
        }

        .input-field {
            width: 100%;
            box-sizing: border-box;
        }

        .small-input {
            width: 50px;
        }

        .observaciones {
            height: 50px;
            resize: none;
        }

        .tl_triangle {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 4cm 3cm 0 0;
            border-color: #000342 transparent transparent transparent;
            position: absolute;
            top: 0;
            left: 0;
        }

        .br_triangle {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 0 3cm 3cm;
            border-color: transparent transparent #4d0000 transparent;
            position: absolute;
            bottom: 0;
            right: 0;
        }

        footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            padding-bottom: 10px;
            box-sizing: border-box;
            /* background-color: red; */
        }

        .firmas {
            display: flex;
            justify-content: space-evenly;
        }

        .firma {
            width: 8cm;
            border-style: solid;
            border-width: 1px;
        }
    </style>
</head>

<body style="margin: 0px;">
${await getPages(servicio)}
</body>

</html>
  `;
}


const getPages = async (ser: Service) => {
  let stringBuilder = '';

  let deviceCount = 0;

  // Ajustar la longitud para excluir el último elemento extra
  const deviceDataLength = ser.deviceData.length;

  for (let iterator = 0; iterator < Math.ceil(deviceDataLength / 2); iterator++) {
    stringBuilder = stringBuilder.concat(`
      <div class="hoja-a4">
        <div class="header">
          <img src="https://i.postimg.cc/PqtW5pd5/logo-format.png" alt="Logo" class="logo">
          <div class="info">
            <div>Fecha: ${ser.date_day}/${ser.date_month}/${ser.date_year}</div>
            <div>No. de Reporte: 4577</div>
            <img src="https://i.postimg.cc/VNDjrfNB/marcas.jpg" style="width: 6.5cm;">
          </div>
        </div>
        <div class="client-info">
          <div>Cliente: <input type="text" class="input-field" value="${ser.clientName}"></div>
          <div>Domicilio: <input type="text" class="input-field" value="${ser.clientLocation}"></div>
        </div>
        <br>
    `);

    for (let index = 0; index < 2; index++) {
      if (deviceCount < deviceDataLength && ser.deviceData[deviceCount] != null) {
        stringBuilder = stringBuilder.concat(`<!-- Primer equipo -->
          <div class="form-section">
            <table>
              <tr>
                <th>Equipo Tipo:</th>
                <td colspan="3">${ser.deviceData[deviceCount].deviceType}</td>
                <th>Capacidad:</th>
                <td>${ser.deviceData[deviceCount].deviceCapacity} T.R.</td>
              </tr>
              <tr>
                <th>Modelo:</th>
                <td>${ser.deviceData[deviceCount].deviceModel}</td>
                <th>Serie:</th>
                <td>${ser.deviceData[deviceCount].deviceSerial}</td>
                <th>Ubicación:</th>
                <td>${ser.deviceData[deviceCount].deviceRoom}</td>
              </tr>
              <tr>
                <th>Marca:</th>
                <td colspan="3">${ser.deviceData[deviceCount].deviceBrand}</td>
                <th>Tipo Servicio:</th>
                <td colspan="5">${ser.deviceData[deviceCount].typeOfService}</td>
              </tr>
            </table>
            <br>
            <table>
              <tr>
                <th></th>
                <th>Volt.</th>
                <th>AMP.</th>
                <th colspan="4">Tareas Realizadas</th>
              </tr>
              <tr>
    <th>Compresor</th>
    <td>${ser.deviceData[deviceCount].compressorVoltage} V</td>
    <td>${ser.deviceData[deviceCount].compressorAmp} A</td>
    <th>Limpieza serpentin evap.</th>
    <td>${ser.deviceData[deviceCount].isSerpentinEv ? '' : 'X'}</td>
    <th>Limpieza de tablero elec.</th>
    <td>${ser.deviceData[deviceCount].isElectricCircuit ? '' : 'X'}</td>
</tr>
<tr>
    <th>Motor Condensador</th>
    <td>${ser.deviceData[deviceCount].motorCVoltage} V</td>
    <td>${ser.deviceData[deviceCount].motorCAmp} A</td>
    <th>Limpieza serpentin cond.</th>
    <td>${ser.deviceData[deviceCount].isSerpentinCd ? '' : 'X'}</td>
    <th>Presion Baja</th>
    <td>${ser.deviceData[deviceCount].isLowPressure ? '' : 'X'}</td>
</tr>
<tr>
    <th>Motor Evaporadora</th>
    <td>${ser.deviceData[deviceCount].motorEVoltage} V</td>
    <td>${ser.deviceData[deviceCount].motorEAmp} A</td>
    <th>Limpieza de filtros</th>
    <td>${ser.deviceData[deviceCount].isFilterCleaning ? '' : 'X'}</td>
    <th>Presion Alta</th>
    <td>${ser.deviceData[deviceCount].isHighPressure ? '' : 'X'}</td>
</tr>

              <tr>
                <th>observaciones</th>
                <td colspan="6">${ser.deviceData[deviceCount].notes}</td>
              </tr>
            </table>
          </div>
          <br>
          <br>`);
        deviceCount += 1;
      }
    }
    stringBuilder = stringBuilder.concat(`
      <footer>
            <div class="firmas">
                <div>
                    <p>Realizo:</p>
                    <img class="firma" src="" alt="Firma Realizo">
                </div>
                <div>
                    <p>Recibio:</p>
                    <img class="firma" src="" alt="Firma Recibio">
                </div>
            </div>
            <div>
                <pre>www.avinco.com.mx             Cel.33 3196 3497</pre>
                <pre>Esther Tapia de Castellanos #3717   Col. Beatriz Hernández, Guadalajara, Jalisco.</pre>
            </div>
        </footer>
        <div>
            <div class="tl_triangle">
                <div class="tl_triangle_border"></div>
            </div>
            <div class="br_triangle">
                <div class="br_triangle_border"></div>
            </div>
        </div>
    </div>
    `);
  }

  return stringBuilder;
};
