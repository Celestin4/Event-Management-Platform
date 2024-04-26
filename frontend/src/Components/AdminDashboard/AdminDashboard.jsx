import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Import React Modal

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false); // State for Create Event modal
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); // State for Update Event modal
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    ticketAvailability: ''
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/events/')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleCreateEvent = () => {
    setCreateModalOpen(true); // Open Create Event modal
  };

  const handleUpdateEvent = (eventId) => {
    setUpdateModalOpen(true); // Open Update Event modal
    setSelectedEvent(events.find(event => event._id === eventId));
  };

  const handleDeleteEvent = (eventId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      // Handle token not found (e.g., redirect to login)
      return;
    }

    axios.delete(`http://localhost:5000/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include token in request headers
      }
    })
      .then(response => {
        console.log('Event deleted successfully:', response.data);
        // Update events state to remove the deleted event
        setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
      })
      .catch(error => {
        console.error('Error deleting event:', error);
        // Handle error (e.g., display error message)
      });
  };

  const handleSubmitCreate = () => {
    axios.post('http://localhost:5000/events/', newEvent)
      .then(response => {
        console.log('Event created successfully:', response.data);
        setEvents(prevEvents => [...prevEvents, response.data]);
        setCreateModalOpen(false);
        setNewEvent({
          title: '',
          date: '',
          location: '',
          ticketAvailability: ''
        });
      })
      .catch(error => {
        console.error('Error creating event:', error);
        // Handle error (e.g., display error message)
      });
  };

  const handleSubmitUpdate = () => {
    axios.put(`/api/admin/events/${selectedEvent._id}`, selectedEvent)
      .then(response => {
        console.log('Event updated successfully:', response.data);
        setEvents(prevEvents => prevEvents.map(event =>
          event._id === selectedEvent._id ? response.data : event
        ));
        setUpdateModalOpen(false);
        setSelectedEvent(null);
      })
      .catch(error => {
        console.error('Error updating event:', error);
        // Handle error (e.g., display error message)
      });
  };

  return (
    <div className="container mx-auto p-4 relative">
      <h2 className="text-3xl font-semibold mb-4">Event Management</h2>
      <button
        onClick={handleCreateEvent}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Create Event
      </button>
      <ul>
        {events.map(event => (
          <li key={event._id} className="border border-gray-200 p-4 rounded mb-4">
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Tickets available:</strong> {event.ticketAvailability}</p>
            <div className="mt-4">
              <button
                onClick={() => handleUpdateEvent(event._id)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteEvent(event._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Create Event Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onRequestClose={() => setCreateModalOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Create Event</h2>
        <form onSubmit={handleSubmitCreate}>
          <label>Title:</label>
          <input type="text" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
          <label>Date:</label>
          <input type="date" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
          <label>Location:</label>
          <input type="text" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
          <label>Tickets available:</label>
          <input type="number" value={newEvent.ticketAvailability} onChange={e => setNewEvent({...newEvent, ticketAvailability: e.target.value})} />
          <button type="submit">Create</button>
        </form>
      </Modal>

      {/* Update Event Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setUpdateModalOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Update Event</h2>
        {selectedEvent && (
          <form onSubmit={handleSubmitUpdate}>
            <label>Title:</label>
            <input type="text" value={selectedEvent.title} onChange={e => setSelectedEvent({...selectedEvent, title: e.target.value})} />
            <label>Date:</label>
            <input type="date" value={selectedEvent.date} onChange={e => setSelectedEvent({...selectedEvent, date: e.target.value})} />
            <label>Location:</label>
            <input type="text" value={selectedEvent.location} onChange={e => setSelectedEvent({...selectedEvent, location: e.target.value})} />
            <label>Tickets available:</label>
            <input type="number" value={selectedEvent.ticketAvailability} onChange={e => setSelectedEvent({...selectedEvent, ticketAvailability: e.target.value})} />
            <button type="submit">Update</button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;
