const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'rootpassword',
      database: 'employees_db'
    },
    console.log(`Connected to the employees database.`)
  );

  module.exports = db;