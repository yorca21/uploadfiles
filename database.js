const pool = new Pool({
    user: 'tu_usuario',
    host: 'localhost',
    database: 'tu_base_de_datos',
    password: 'tu_contraseña',
    port: 5432, // puerto por defecto de PostgreSQL
  });
  
  module.exports = pool;