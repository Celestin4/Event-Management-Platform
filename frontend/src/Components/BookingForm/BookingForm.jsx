import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ eventId }) => {
  const [tickets, setTickets] = useState(1);

  const handleBooking = () => {
    // Send booking request to backend API
    axios.post('/api/bookings', { eventId, tickets })
      .then(response => {
        console.log('Booking successful:', response.data);
        // Handle success (e.g., show confirmation message)
      })
      .catch(error => {
        console.error('Error booking tickets:', error);
        // Handle error (e.g., display error message)
      });
  };

  return (
    <div>
      <h2>Book Tickets</h2>
      <label>
        Number of Tickets:
        <input type="number" value={tickets} onChange={e => setTickets(e.target.value)} />
      </label>
      <button onClick={handleBooking}>Book Tickets</button>
    </div>
  );
};

export default BookingForm;
