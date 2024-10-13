 
// db.js
const mysql = require('mysql');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',        // e.g., localhost or your database host
  user: 'root',    // Your MySQL username
  password: '', // Your MySQL password
  database: 'train_reservation', // Your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

module.exports = connection;
