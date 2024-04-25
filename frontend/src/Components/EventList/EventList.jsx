import { useState, useEffect } from 'react';
import axios from 'axios';
import { Base_URL } from '../../constants/constants';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Base_URL}/events`);
        console.log(response)
        setEvents(response.data);
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
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <div key={event._id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-2">Date: {event.date}</p>
              <p className="text-gray-600 mb-2">Location: {event.location}</p>
              <p className="text-gray-600">Tickets available: {event.ticketAvailability}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
