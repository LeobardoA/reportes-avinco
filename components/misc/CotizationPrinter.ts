import * as FileSystem from 'expo-file-system';
import Cliente from './Cliente';
import { Concept } from '@/app/(tabs)/(services)/NewCotization';

export async function setHTML(name: string, uri: string) {
    try {
        const destinoArchivo = `${FileSystem.documentDirectory}${name}`;
        await FileSystem.copyAsync({ from: uri, to: destinoArchivo });
        return destinoArchivo;
    } catch (error) {
        console.error('Error al guardar o compartir el archivo:', error);
    }
}

export async function generateHTML(cliente: Cliente, concepts: Concept[], notas: string) {
    const date = new Date();

    return `
    <!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <title>Formulario de Mantenimiento</title>
    <style>
        body {
            margin: 0px;
            padding: 0px;
            background-color: black;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        body p {
            margin: 0;
        }

        .hoja-a4 {
            width: 21.59cm;
            height: 27.9cm;
            margin: 0;
            flex-direction: column;
            box-sizing: border-box;
            background-color: white;
            position: relative;
            border-color: black;
            border-style: solid;
            padding: 0px;
            font-family: Arial, sans-serif;
        }

        .logo-container {
            display: flex;
            justify-content: start;
            width: 85%;
            margin-left: 12.5%;
            margin-top: 1cm;
        }

        .logo {
            width: 2.5cm;
            height: 2.5cm;
        }

        .logo-title {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.6cm;
            color: #fb8500;
            font-weight: bold;
        }

        .logo-subtitle {
            color: #3949AB;
            font-size: 0.3cm;
            width: 5.5cm;
            font-family: Arial, Helvetica, sans-serif;
        }

        .info-cotizacion {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100;
        }

        .date {
            width: 85%;
            text-align: end;
            //font-family: 'Courier New', Courier, monospace;
        }

        hr {
            height: 5px;
            border-top: 1px solid black;
            border-bottom: 2px solid;
            border-left: none;
            border-right: none;
            width: 85%;
        }

        .nCotizacion {
            position: relative;
            width: 100%;
            text-align: center;
            font-size: 0.4cm;
            font-family: 'Courier New', Courier, monospace;
        }

        .data {
            width: 90%;
            margin-left: 5%;
        }

        .client-name {
            font-weight: bold;
            font-size: 0.4cm;
        }

        .client-data {
            font-size: 0.4cm;
        }

        .client-petite {
            width: 100%;
            font-size: 0.35cm;
            text-align: center;
            margin-top: 0.5cm;
        }

        table.redTable {
            margin-top: 0.3cm;
            background-color: #EEEEEE;
            text-align: center;
            width: 100%;
            border-collapse: collapse;
        }

        table.redTable td,
        table.redTable th {
            border: 1px solid #AAAAAA;
            padding: 3px 2px;
        }

        table.redTable tbody td {
            font-size: 0.35cm;
        }

        table.redTable tr:nth-child(even) {
            background: #D0D0D0;
        }

        table.redTable td:nth-child(3) {
            word-break: break-word;
            text-align: left;
        }

        table.redTable td:nth-child(4) {
            text-align: end;
            width: 3cm;
        }

        table.redTable td:nth-child(5) {
            text-align: end;
            width: 3cm;
        }

        table.redTable thead {
            background: #717171;
        }

        table.redTable thead th {
            font-size: 0.4cm;
            font-weight: bold;
            font-family: 'Arial';
            color: #FFFFFF;
            text-align: center;
            border-left: 2px solid #A4A4A4;
        }

        table.redTable thead th:first-child {
            border-left: none;
        }

        .data-note {
            margin-top: 0.5cm;
            margin-bottom: 0.25cm;
            font-weight: bold;
            font-size: 0.3cm;

        }

        .patita {
            position: absolute;
            bottom: 1cm;
            width: 100%;
            text-align: center;
            font-size: 0.35cm;
        }

        .conditions {
            font-size: 0.3cm;
        }

        .service-conditions {
            margin: 0px;
            margin-bottom: 0.5cm;
            font-size: 0.3cm;
        }

        .thanks-note {
            text-align: center;
            width: 100%;
            font-size: 0.3cm;

        }

        .atention {
            width: 100%;
            text-align: center;
            margin-top: 1cm;
            font-size: 0.35cm;

        }

        .name {
            width: 100%;
            text-align: center;
            font-weight: bold;
            font-size: 0.3cm;

        }

        .sign {
            width: 40%;
            margin-left: 30%;
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
    </style>
</head>

<body>
    <div class="hoja-a4">
        <!-- LOGO -->
        <div class="logo-container">
            <img src="https://i.postimg.cc/dVCKpc5H/logo.png" class="logo" />
            <div>
                <p class="logo-title">AVINCO</p>
                <p class="logo-subtitle">AVI, Instalaciones Climáticas de Occidente S de R.L. de CV.</p>
            </div>
        </div>
        <!-- HEADER -->
        <div class="info-cotizacion">
            <p class="date">
                ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}
            </p>
            <hr>
            <p class="nCotizacion">COTIZACIÓN IC-R4681-2024</p>
            <hr>
        </div>
        <!-- CONTENT -->
        <div class="data">
            <p class="client-name">${cliente.name}</p>
            <p class="client-data">AT'N. ${cliente.contacto}</p>
            <p class="client-data">TEL:${cliente.telefono}</p>
            <p class="client-data">Correo Electronico: ${cliente.correo}</p>
            <p class="client-data">PRESENTE</p>
            <p class="client-petite">De acuerdo a su solicitud, ponemos a su apreciable consideración nuestra propuesta:
            </p>
            <table class="redTable">
                <thead>
                    <tr>
                        <th>Part.</th>
                        <th>Cant.</th>
                        <th>Descripción/Servicio</th>
                        <th>Precio Unitario</th>
                        <th>Sub-total</th>
                    </tr>
                </thead>
                <tbody>
                    ${getTable(concepts)}
                </tbody>
            </table>
            <p class="data-note">Notas: ${notas}</p>
            <p class="conditions">CONDICIONES DE SERVICO:</p>
            <ul class="service-conditions">
                <li>16 % DE I.V.A. CON CARGO AL CLIENTE</li>
                <li>PRECIOS EN MONEDA NACIONAL</li>
                <li>SUJETO A CAMBIO SIN PREVIO AVISO</li>
            </ul>
            <p class="thanks-note">En espera de que nuestra propuesta sea de su agrado, quedamos a sus órdenes para
                cualquier duda o
                comentario y de
                antemano agradezco las atenciones brindadas a la presente.
            </p>
            <p class="atention">ATENTAMENTE</p>
            <img src="https://i.postimg.cc/Pf6h84L4/firma.jpg" class="sign">
            <p class="name">LEOBARDO AVILES MATA.</p>
        </div>
        <!-- FOOTER -->
        <div class="patita">
            <p>ingenieriadeconfort@hotmail.com Tel: (33) 36042630 y 36046139 Cel. 33 31 96 34 97</p>
            <p>Esther Tapia de Castellanos #3717 Col. Beatriz Hernandez, Guadalajara, Jalisco.</p>
        </div>
        <!-- TRIANGULOS NO TOCAR -->
        <div>
            <div class="tl_triangle">
                <div class="tl_triangle_border"></div>
            </div>
            <div class="br_triangle">
                <div class="br_triangle_border"></div>
            </div>
        </div>
    </div>
</body>

</html>
    `;
}

const getTable = (concepts: Concept[]) => {
    let stringBuilder = '';
    const currencyFormatter = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2,
    });

    for (let index = 0; index < concepts.length; index++) {
        const element = concepts[index];
        stringBuilder = stringBuilder.concat('<tr>');
        // FILL DATA TABLE
        stringBuilder = stringBuilder.concat(`<td>${element.id}</td>`);
        stringBuilder = stringBuilder.concat(`<td>${element.quantity}</td>`);
        stringBuilder = stringBuilder.concat(`<td>${element.description}</td>`);
        stringBuilder = stringBuilder.concat(`<td>${currencyFormatter.format(parseFloat(element.unitPrice))}</td>`);

        const quantity = parseFloat(element.quantity);
        const unitPrice = parseFloat(element.unitPrice);
        const subtotal = quantity * unitPrice;

        stringBuilder = stringBuilder.concat(`<td>${currencyFormatter.format(subtotal)}</td>`);
        //END OF FILL DATA TABLE
        stringBuilder = stringBuilder.concat('</tr>');
    }

    const total = concepts.reduce((sum, concept) => {
        return sum + (parseFloat(concept.quantity) * parseFloat(concept.unitPrice) || 0);
    }, 0);

    stringBuilder = stringBuilder.concat(
        `<tr><td></td><td></td><td></td><td>SUB-TOTAL M.N</td><td>${currencyFormatter.format(total)} +IVA</td></tr>`
    );

    return stringBuilder;
}

