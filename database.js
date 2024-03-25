const pool = new Pool({
    user: 'Data',
    host: 'localhost',
    database: 'fileuploads',
    password: '1234',
    port: 5432, // puerto por defecto de PostgreSQL
  });
  
  module.exports = pool;