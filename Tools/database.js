const { Pool } = require('pg');
const generateFileruta = require('./rutas');

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'uploadfiles_db',
  password: '8510887',
  port: 5432,
});

async function crearTablaArchivos() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS archivos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(5000),
        extension VARCHAR(50),
        ruta VARCHAR(500),
        peso INTEGER
      )
    `;
   
    await pool.query(query);
    //console.log('Tabla "archivos" creada correctamente');
  } catch (error) {
    console.error('Error al crear la tabla de archivos:', error);
    throw error; // Reenviar el error para que sea manejado en un nivel superior si es necesario
  }
}

// Función para insertar un archivo en la tabla 'archivos'
async function insertarArchivo(nombre, extension, peso) {
  try {
    const ruta = generateFileruta(extension); 
    const query = 'INSERT INTO archivos (nombre, extension, peso, ruta) VALUES ($1, $2, $3, $4)';
    const values = [nombre, extension, peso, ruta];
    await pool.query(query, values);
    //console.log('Archivo insertado correctamente:', nombre);
  } catch (error) {
    console.error('Error al insertar archivo en la base de datos:', error);
    throw error; // Reenviar el error para que sea manejado en un nivel superior si es necesario
  }
}

module.exports = { crearTablaArchivos, insertarArchivo };
