import * as SQLite from 'expo-sqlite';
import Cliente from './Cliente';

const db = SQLite.openDatabaseAsync('avinco.db');

export const setupDatabase = async () => {
  await (await db).execAsync(`CREATE TABLE IF NOT EXISTS Clientes ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, alias TEXT NOT NULL, contacto TEXT NOT NULL, telefono TEXT NOT NULL, domicilio TEXT NOT NULL,correo TEXT NOT NULL);`);
};

export const addClient = async (cliente: Cliente) => {
  console.log(cliente);
  const statement = (await db).prepareAsync('INSERT INTO Clientes (id,name,alias,contacto,telefono,domicilio,correo) VALUES (NULL,$name,$alias,$contacto,$telefono,$domicilio,$correo); ');

  let result = (await statement).executeAsync(
    {
      $name: cliente.name,
      $alias: cliente.alias,
      $contacto: cliente.contacto,
      $telefono: cliente.telefono,
      $domicilio: cliente.domicilio,
      $correo: cliente.correo
    });
  console.log((await result).lastInsertRowId, (await result).changes);
};

export const deleteClient = async (id: string) => {
  const statement = (await db).prepareAsync('DELETE FROM Clientes WHERE Clientes.id = $id;');

  let result = (await statement).executeAsync(
    {
      $id: id,
    });
};

export const updateClientData = async (cliente: Cliente) => {
  console.log("Se va a modificar el cliente con id: " + cliente.id);
  const statement = (await db).prepareAsync('UPDATE Clientes SET name=$name, alias=$alias, contacto=$contacto, telefono=$telefono, domicilio=$domicilio, correo=$correo WHERE id=$id;');

  let result = (await statement).executeAsync(
    {
      $id: cliente.id,
      $name: cliente.name,
      $alias: cliente.alias,
      $contacto: cliente.contacto,
      $telefono: cliente.telefono,
      $domicilio: cliente.domicilio,
      $correo: cliente.correo
    });
  console.log((await result).changes);
};


export const getClient = async (id: string): Promise<Cliente> => {
  const results = await (await db).getFirstAsync('SELECT * FROM Clientes WHERE Clientes.id = ?;', [id]);
  return results as Cliente;
};

export const getAllClients = async (): Promise<Cliente[]> => {
  const allRows = (await db).getAllAsync('SELECT * FROM Clientes');
  return allRows as unknown as Cliente[];
};
