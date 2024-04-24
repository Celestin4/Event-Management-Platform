import  { useState, useEffect } from 'react';
import axios from 'axios';

const EventDetails = ({ eventId }) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details from backend API
    axios.get(`/api/events/${eventId}`)
      .then(response => {
        setEvent(response.data);
      })
      .catch(error => {
        console.error('Error fetching event details:', error);
      });
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{event.title}</h2>
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
      <p>Tickets available: {event.ticketAvailability}</p>
      {/* Add more details here as needed */}
    </div>
  );
};

export default EventDetails;
