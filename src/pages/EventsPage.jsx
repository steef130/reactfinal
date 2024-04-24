import React from 'react';
import { Heading, Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AddNewEvent } from '../pages/AddNewEvent'; 


export const EventsPage = () => {

  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/events');
        const eventData = await response.json();
      setEvents(eventData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);
 

  const createEvent = async (user) => {
    
    // No error handling, normally you would do that.
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });
    const newEvent = await response.json();
    setEventData((prevEvents) =>(prevEvents.concat(newEvent)));
  }; 

  return (
    <div>
      <Heading>List of events</Heading>
   
      <Box className="event-list"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'row',
          cursor: 'pointer'
        }}>;
       
         {events.map((event) => (
           <Link key={event.id} to={`/event/${event.id}`}>
        <li key={event.id}>
          
          <img src={event.image} alt={event.title} />
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Location: {event.location}</p>
          <p>Date: {event.startTime}</p>
        </li>
        </Link>
      ))}
      
      </Box>
      <br/>
      <br/>
      <br/>
  
      <AddNewEvent createEvent={createEvent} />
     
      
    </div>
  );
};
