import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UserDashboard = () => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.get(`${VITE_BACKEND_URL}/auth/booking`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setBookedEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching booked events:', error);
        setLoading(false);
      });
    }
  }, [token]);

  const cancelBooking = (bookingId) => {
    axios.delete(`${VITE_BACKEND_URL}/booking/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Booking cancelled successfully:', response.data);
      setBookedEvents(prevEvents => prevEvents.filter(event => event._id !== bookingId));
    })
    .catch(error => {
      console.error('Error cancelling booking:', error);
    });
  };

  return (
    <>
    <Navbar />
    {loading ? (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">Loading...</div>
    ) : bookedEvents.length === 0 ? (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">No bookings found.</div>
    ) : (
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">My Booked Events</h2>
          <ul>
            {bookedEvents.map(booking => (
              <li key={booking._id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                <p className="text-xl font-semibold">{booking.eventId.title}</p>
                <p className="text-gray-600">Date: {new Date(booking.eventId.date).toLocaleString()}</p>
                <p className="text-gray-600">Location: {booking.eventId.location}</p>
                <p className="text-gray-600">Ticket Availability: {booking.eventId.ticketAvailability}</p>
                <img src={booking.eventId.imageUrl} alt={booking.eventId.title} className="max-w-xs h-auto mb-4" />
                <p className="text-gray-600">Description: {booking.eventId.description}</p>
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
    )}
    <Footer />
    </>
  );
};

export default UserDashboard;
