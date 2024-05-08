import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button } from '@chakra-ui/react';


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
        
        console.log(`Event with ID ${id} deleted successfully.`);
      })
      .catch(error => {
        console.error('Error deleting event:', error);
      });
    }
  };

  return (
    <Box
    backgroundColor={"teal.300"}>
      <h1>Event List</h1>
      {events.map(event => (
        <div key={event.id}>
          <p>{event.title} {event.number}</p>
          <Button onClick={() => handleDelete(event.id)} colorScheme="red">Delete</Button>
        </div>
      ))}
    </Box>
  );
};

