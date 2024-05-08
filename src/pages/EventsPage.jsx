import React from 'react';
import { Heading, Box, Button, Input } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';



export const EventsPage = () => {

  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData('http://localhost:3000/events', setEvents);
    fetchData('http://localhost:3000/categories', setCategories);
  }, []);


  const matchCategories = categories.filter((category) =>
  category.name.includes(searchTerm.toLowerCase()));


  const filteredEvents = events.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.categoryIds &&
        item.categoryIds.some((categoryId) =>
          matchCategories.some((cat) => cat.id == categoryId)
        ))
    );
  });
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  
    const filteredEvents = events.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.categoryIds &&
          item.categoryIds.some((categoryId) =>
            matchCategories.some((cat) => cat.id == categoryId)
          ))
      );
    });
  
    // Call onSearch with the filtered results
    onSearch(filteredEvents);
  };
  

  return (
    <div style={{ background: 'teal.400', minHeight: '100vh' }}>
      <Box bg="teal.500" p={4} color="white">
      <Heading>List of events</Heading>
      <Input
        placeholder="Search events..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      </Box>
   
      <Box mt={4}
        display="flex"
        flexDirection="row"
       
      >
      
       
       {filteredEvents.map((event) => (
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
      <Box backgroundColor="teal.600">
      <Link to ="/add">
      <Button backgroundColor={"green.800"} color="white">Add Event</Button>
      </Link>
      </Box>
     
      
    </div>
  );
};
