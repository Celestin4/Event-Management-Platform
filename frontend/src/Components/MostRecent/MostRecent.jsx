import { useState, useEffect } from 'react';
import axios from 'axios';
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const MostRecentEventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/events/mostRecentEvents`);
        setEvents([...response.data]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold m-4"> There are events happening in 7 days</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          {events.length === 0 ? (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">There is no upcoming events in the next 7 days</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map(event => (
                <div key={event._id} className="bg-white rounded-lg shadow-md p-4">
                  {/* Link to the event details page */}
                  <Link to={`/events/${event._id}`}>
                    <img src={event.imageUrl} alt={event.title} className="w-full mb-2" />
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  </Link>
                  <p className="text-gray-600 mb-2">Date: {event.date}</p>
                  <p className="text-gray-600 mb-2">Location: {event.location}</p>
                  <p className="text-gray-600 mb-2">Tickets available: {event.ticketAvailability}</p>
                  <p className="text-gray-600 mb-2">{event.description}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MostRecentEventList;
