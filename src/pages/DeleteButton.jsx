import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const DeleteButton = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/events')
      .then(response => {
        setEvents(response.data);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm('Weet je zeker dat je dit evenement wilt verwijderen?');
    if (confirmed) {
    axios.delete(`http://localhost:3000/events/${id}`)
      .then(() => {
        // Update the state or perform any other necessary actions
        console.log(`Event with ID ${id} deleted successfully.`);
      })
      .catch(error => {
        console.error('Error deleting event:', error);
      });
    }
  };

  return (
    <div>
      <h1>Event List</h1>
      {events.map(event => (
        <div key={event.id}>
          <p>{event.title} {event.number}</p>
          <button onClick={() => handleDelete(event.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

