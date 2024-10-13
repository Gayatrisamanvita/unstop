// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Import the database connection

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Get available seats
app.get('/seats', (req, res) => {
  const sql = 'SELECT seat_num, row_num, is_booked FROM seats';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Book seats
app.post('/book-seats', (req, res) => {
  const { seatNumbers } = req.body; // Expecting an array of seat numbers to book
  if (!Array.isArray(seatNumbers) || seatNumbers.length === 0) {
    return res.status(400).json({ error: 'Invalid seat numbers' });
  }

  // Update seats to booked in the database
  const sql = 'UPDATE seats SET is_booked = 1 WHERE seat_num IN (?)';
  db.query(sql, [seatNumbers], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Seats booked successfully', bookedSeats: seatNumbers });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 
