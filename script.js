// Create a 2D array to represent the seats in each row and their booking status
let seatRows = [
  { row: 1, seats: [1, 2, 3, 4, 5, 6, 7], status: [0, 0, 0, 0, 0, 0, 0] },
  { row: 2, seats: [8, 9, 10, 11, 12, 13, 14], status: [0, 0, 0, 0, 0, 0, 0] },
  { row: 3, seats: [15, 16, 17, 18, 19, 20, 21], status: [0, 0, 0, 0, 0, 0, 0] },
  { row: 4, seats: [22, 23, 24, 25, 26, 27, 28], status: [0, 0, 0, 0, 0, 0, 0] },
  { row: 5, seats: [29, 30, 31, 32, 33, 34, 35], status: [0, 0, 0, 0, 0, 0, 0] },
  { row: 6, seats: [36, 37, 38, 39, 40, 41, 42], status: [0, 0, 0, 0, 0, 0, 0] },
  { row: 7, seats: [43, 44, 45, 46, 47, 48, 49], status: [0, 0, 0, 0, 0, 0, 0] },
  { row: 8, seats: [50, 51, 52, 53, 54, 55, 56], status: [0, 0, 0, 0, 0, 0, 0] },
  { row: 9, seats: [57, 58, 59, 60, 61, 62, 63], status: [0, 0, 0, 0, 0, 0, 0] },
  { row: 10, seats: [64, 65, 66, 67, 68, 69, 70], status: [0, 0, 0, 0, 0, 0, 0] },
  { row: 11, seats: [71, 72, 73, 74, 75, 76, 77], status: [0, 0, 0, 0, 0, 0, 0] },
  { row: 12, seats: [78, 79, 80], status: [0, 0, 0] }
];

// Dynamically generate seat layout on page load
const seatLayout = document.querySelector('.seat-layout');
window.onload = function() {
  generateSeatLayout();
};

// Function to generate the seat layout
function generateSeatLayout() {
  seatLayout.innerHTML = ''; // Clear existing layout
  seatRows.forEach((row) => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    row.seats.forEach((seat, index) => {
      const seatBtn = document.createElement('button');
      seatBtn.classList.add('seat');
      seatBtn.textContent = seat;
      if (row.status[index] === 1) {
        seatBtn.classList.add('booked');
      }
      rowDiv.appendChild(seatBtn);
    });
    seatLayout.appendChild(rowDiv);
  });
}

// Function to handle seat reservation
document.getElementById('reserveBtn').addEventListener('click', function() {
  const numSeats = parseInt(document.getElementById('numSeats').value);
  if (isNaN(numSeats) || numSeats < 1 || numSeats > 7) {
    alert('Please enter a valid number between 1 and 7.');
    return;
  }

  const bookedSeats = bookSeats(numSeats);
  if (bookedSeats.length > 0) {
    document.getElementById('status').textContent = `Seats booked: ${bookedSeats.join(', ')}`;
    generateSeatLayout(); // Update the layout to reflect the booked seats
  } else {
    document.getElementById('status').textContent = 'Sorry, not enough seats available.';
  }
});

// Function to book seats
function bookSeats(numSeats) {
  let bookedSeats = [];

  // First, try to find a row with enough available seats
  for (let row of seatRows) {
    let availableSeats = row.seats.filter((seat, index) => row.status[index] === 0);
    if (availableSeats.length >= numSeats) {
      // Book the seats
      for (let i = 0; i < numSeats; i++) {
        let seatIndex = row.seats.indexOf(availableSeats[i]);
        row.status[seatIndex] = 1;
        bookedSeats.push(row.seats[seatIndex]);
      }
      return bookedSeats;
    }
  }

  // If no single row has enough seats, book the closest available seats across rows
  let allAvailableSeats = [];
  seatRows.forEach(row => {
    allAvailableSeats.push(...row.seats.filter((seat, index) => row.status[index] === 0));
  });

  if (allAvailableSeats.length >= numSeats) {
    for (let i = 0; i < numSeats; i++) {
      let seat = allAvailableSeats[i];
      bookedSeats.push(seat);

      // Update the status of the booked seat in the corresponding row
      seatRows.forEach(row => {
        if (row.seats.includes(seat)) {
          let seatIndex = row.seats.indexOf(seat);
          row.status[seatIndex] = 1;
        }
      });
    }
    return bookedSeats;
  }

  return [];
}
