import { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [token, setToken] = useState(""); // State to store the token
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Fetch token from wherever it's stored (e.g., local storage)
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      // Fetch booked events from backend API with token in headers
      axios.get('http://localhost:5000/auth/booking', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setBookedEvents(response.data);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch(error => {
        console.error('Error fetching booked events:', error);
        setLoading(false); // Set loading to false in case of error
      });
    }
  }, [token]);

  const cancelBooking = (bookingId) => {
    // Send cancellation request to backend API with token in headers
    axios.delete(`http://localhost:5000/booking/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Booking cancelled successfully:', response.data);
      // Remove cancelled booking from state
      setBookedEvents(prevEvents => prevEvents.filter(event => event._id !== bookingId));
    })
    .catch(error => {
      console.error('Error cancelling booking:', error);
    });
  };

  // Render a loading message while data is being fetched
  if (loading) {
    return <div className="bg-gray-100 min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Render message when there are no bookings
  if (bookedEvents.length === 0) {
    return <div className="bg-gray-100 min-h-screen flex items-center justify-center">No bookings found.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">My Booked Events</h2>
        <ul>
          {bookedEvents.map(booking => (
            <li key={booking._id} className="bg-white rounded-lg shadow-md p-4 mb-4">
              <p className="text-xl font-semibold">{booking.title}</p>
              <p className="text-gray-600">Date: {booking.date}</p>
              <p className="text-gray-600">Location: {booking.location}</p>
              <button 
                className="bg-red-500 text-white py-2 px-4 mt-2 rounded-md hover:bg-red-600 transition-colors"
                onClick={() => cancelBooking(booking._id)}
              >
                Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
