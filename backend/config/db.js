const mysql = require('mysql2');

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'shipping'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

module.exports = db;
