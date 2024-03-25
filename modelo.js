const pool = require('./database');

async function saveFileBD(nombreArchivo, rutaArchivo) {
  const query = 'INSERT INTO archivos (nombre, ruta) VALUES ($1, $2)';
  const values = [nombreArchivo, rutaArchivo];
  await pool.query(query, values);
}

module.exports = { saveFileBD };
