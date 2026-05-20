const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'usuarios_db'
});

con.connect(function(error) {
  if (error) {
    console.error('Erro ao conectar no MySQL:', error);
    throw error;
  }
  console.log('Conectado ao MySQL!');
});

module.exports = con;
