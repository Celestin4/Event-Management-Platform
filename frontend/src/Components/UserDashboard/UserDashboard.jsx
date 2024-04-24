import  { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    // Fetch booked events from backend API (assuming authentication is implemented)
    axios.get('/api/user/bookings')
      .then(response => {
        setBookedEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching booked events:', error);
      });
  }, []);

  const cancelBooking = (bookingId) => {
    // Send cancellation request to backend API
    axios.delete(`/api/bookings/${bookingId}`)
      .then(response => {
        console.log('Booking cancelled successfully:', response.data);
        // Remove cancelled booking from state
        setBookedEvents(prevEvents => prevEvents.filter(event => event._id !== bookingId));
      })
      .catch(error => {
        console.error('Error cancelling booking:', error);
        // Handle error (e.g., display error message)
      });
  };

  return (
    <div>
      <h2>My Booked Events</h2>
      <ul>
        {bookedEvents.map(booking => (
          <li key={booking._id}>
            <p>{booking.event.title}</p>
            <p>Date: {booking.event.date}</p>
            <p>Location: {booking.event.location}</p>
            <button onClick={() => cancelBooking(booking._id)}>Cancel Booking</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
