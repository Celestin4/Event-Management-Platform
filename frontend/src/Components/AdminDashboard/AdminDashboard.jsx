import { useState, useEffect } from 'react';
import axios from 'axios';


const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); 
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isViewAttendeeModalOpen, setViewAttendeeModalOpen] = useState(false);
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    ticketAvailability: ''
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    axios.get(`${VITE_BACKEND_URL}/events/`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleCreateEvent = () => {
    setCreateModalOpen(true);
  };

  const handlesetUpdateModalOpen = (eventId) => {
    const selectedEventData = events.find(event => event._id === eventId);
    if (selectedEventData) {
      setNewEvent(selectedEventData); // Populate newEvent state with selected event data
      setUpdateModalOpen(true);
    }
  };

  const handleSetDeleteModalOpen = () => {
    setDeleteModalOpen(true)
  }

  const handleSetViewAttendeeModalOpen = (eventId) => {
    setSelectedEvent(events.find(event => event._id === eventId)); // Set the selected event
    handleViewAttendees(eventId); // Fetch attendees for the selected event
  };

  const handleCancelEvent = (eventId) => {
    setSelectedEvent(events.find(event => event._id === eventId));
    setCancelModalOpen(true);
  };

  const handleViewAttendees = (eventId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }
  
    axios.get(`${VITE_BACKEND_URL}/auth/viewAttebdee/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setAttendees(response.data);
      setViewAttendeeModalOpen(true); 
    })
    .catch(error => {
      console.error('Error fetching attendees:', error);
    });
  };
  

  const handleSubmitCreate = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }
  
    axios.post(`${VITE_BACKEND_URL}/events/`, newEvent, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
    .then(response => {
      console.log('Event created successfully:', response.data);
      // Add the newly created event to the events state
      setEvents(prevEvents => [...prevEvents, response.data]);
      setCreateModalOpen(false); // Close the Create Event modal
      // Clear the newEvent state for next creation
      setNewEvent({
        title: '',
        date: '',
        location: '',
        description: '',
        ticketAvailability: ''
      });
    })
    .catch(error => {
      console.error('Error creating event:', error);
      // Handle error (e.g., display error message)
    });
  };

  const handleSubmitUpdate = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }

    axios.put(`${VITE_BACKEND_URL}/events/${newEvent._id}`, newEvent, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Event updated successfully:', response.data);
      const updatedEvents = events.map(event =>
        event._id === newEvent._id ? response.data : event
      );
      setEvents(updatedEvents);
      setUpdateModalOpen(false);
      setNewEvent({ // Reset newEvent state
        title: '',
        date: '',
        location: '',
        description: '',
        ticketAvailability: ''
      });
    })
    .catch(error => {
      console.error('Error updating event:', error);
    });
  };

  const handleDeleteEvent = (eventId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      // Handle token not found (e.g., redirect to login)
      return;
    }

    axios.delete(`${VITE_BACKEND_URL}/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include token in request headers
      }
    })
    .then(response => {
      console.log('Event deleted successfully:', response.data);
      // Update events state to remove the deleted event
      setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
      setDeleteModalOpen(false);
    })
    .catch(error => {
      console.error('Error deleting event:', error);
      // Handle error (e.g., display error message)
    });
  };


  const handleSubmitCancel = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      // Handle token not found (e.g., redirect to login)
      return;
    }
  
    axios.delete(`${VITE_BACKEND_URL}/events/${selectedEvent._id}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include token in request headers
      }
    })
      .then(response => {
        console.log('Event canceled successfully:', response.data);
        // Update events state to remove the canceled event
        setEvents(prevEvents => prevEvents.filter(event => event._id !== selectedEvent._id));
        setCancelModalOpen(false);
      })
      .catch(error => {
        console.error('Error canceling event:', error);
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
            <img src={event.imageUrl} alt={event.title} className="max-w-xs h-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Tickets available:</strong> {event.ticketAvailability}</p>
            <div className="mt-4">
              <button
                onClick={() => handlesetUpdateModalOpen(event._id)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleSetDeleteModalOpen(event._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => handleCancelEvent(event._id)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSetViewAttendeeModalOpen(event._id)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                View Attendees
              </button>
            </div>
          </li>
        ))}
      </ul>


      

      {/* View attendee modal */}
      {isViewAttendeeModalOpen && (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">List of Attendees for {selectedEvent.title}</h3>
              {attendees.length > 0 ? (
                <ul>
                  {attendees.map(attendee => (
                    <li key={attendee._id} className="mb-2 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-semibold">{attendee.fullName}</p>
                      </div>
                      <div>
                        <button
              
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No attendees booked for this event.</p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6">
          <button
            onClick={() => setViewAttendeeModalOpen(false)}
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{/* Add new event model */}

{isCreateModalOpen && (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Event</h3>
              <div className="mt-2">
                <form>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                    <input
                      type="text"
                      id="title"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter title"
                      value={newEvent.title}
                      onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
                    <input
                      type="date"
                      id="date"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter date"
                      value={newEvent.date}
                      onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
                    <input
                      type="text"
                      id="location"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter location"
                      value={newEvent.location}
                      onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                    <input
                      type="textarea"
                      id="location"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter location"
                      value={newEvent.description}
                      onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="ticketAvailability" className="block text-gray-700 text-sm font-bold mb-2">Ticket Availability:</label>
                    <input
                      type="number"
                      id="ticketAvailability"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter ticket availability"
                      value={newEvent.ticketAvailability}
                      onChange={e => setNewEvent({ ...newEvent, ticketAvailability: e.target.value })}
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={handleSubmitCreate}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Create
          </button>
          <button
            onClick={() => setCreateModalOpen(false)}
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}


 {/* Update model */}

 {isUpdateModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Update This Event</h3>
                    <div className="mt-2">
                      <form>
                        <div className="mb-4">
                          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                          <input
                            type="text"
                            id="title"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter title"
                            value={newEvent.title}
                            onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
                          <input
                            type="date"
                            id="date"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter date"
                            value={newEvent.date}
                            onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
                          <input
                            type="text"
                            id="location"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter location"
                            value={newEvent.location}
                            onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                          <textarea
                            id="description"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter description"
                            value={newEvent.description}
                            onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="ticketAvailability" className="block text-gray-700 text-sm font-bold mb-2">Ticket Availability:</label>
                          <input
                            type="number"
                            id="ticketAvailability"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter ticket availability"
                            value={newEvent.ticketAvailability}
                            onChange={e => setNewEvent({ ...newEvent, ticketAvailability: e.target.value })}
                            required
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSubmitUpdate}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => setUpdateModalOpen(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* Cancel Event Model */}
      {isCancelModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Are you sure you want to cancel this event?</h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSubmitCancel}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Yes
                </button>
                <button
                  onClick={() => setCancelModalOpen(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Delete Event Modal */}
      {isDeleteModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Are you sure you want to delete this event?</h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => handleDeleteEvent(selectedEvent._id)} // Pass eventId to handleDeleteEvent
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Yes
                </button>
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      
    </div>
  );
};

export default AdminDashboard;
