const { Pool } = require('pg');

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'uploadfiles_db',
  password: '8510887',
  port: 5432,
});

// Función para crear la tabla 'archivos' si no existe
async function crearTablaArchivos() {
  const query = `
    CREATE TABLE IF NOT EXISTS archivos (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(5000),
      extension VARCHAR(50),
      peso INTEGER
    )
  `;
 
  await pool.query(query);
}

// Función para insertar un archivo en la tabla 'archivos'
async function insertarArchivo(nombre, extension, peso) {
  
  const query = 'INSERT INTO archivos (nombre, extension, peso) VALUES ($1, $2, $3)';
  const values = [nombre, extension, peso];
  await pool.query(query, values);
}

module.exports = { crearTablaArchivos, insertarArchivo };
