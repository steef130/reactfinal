import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Input, Button } from '@chakra-ui/react';

export const EditForm = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
    createdBy: "",
    image: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        if (response.ok) {
          const eventData = await response.json();
          setEventData(eventData);
        } else {
          console.error("Failed to fetch event data");
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
  
      if (response.ok) {
        const updatedEventData = await response.json();
        setEventData(updatedEventData);
        console.log("Event data updated successfully:", updatedEventData);
      } else {
        console.error("Failed to update event data");
      }
    } catch (error) {
      console.error("Error updating event data:", error);
    }
  };

  return (
    <Box background="teal.400">
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
      <Input
          type="text"
          name="title"
          value={eventData.title}
          onChange={e => setEventData({ ...eventData, title: e.target.value })}
          placeholder="Titel"
        />
         <Input
          type="text"
          name="description"
          value={eventData.description}
          onChange={e => setEventData({ ...eventData, description: e.target.value })}
          placeholder="Omschrijving"
        />
         <Input
          type="text"
          name="desimage"
          value={eventData.image}
          onChange={e => setEventData({ ...eventData, image: e.target.value })}
          placeholder="Afbeelding"
        />
         <Input
          type="text"
          name="location"
          value={eventData.location}
          onChange={e => setEventData({ ...eventData, location: e.target.value })}
          placeholder="Locatie"
        />
         <Input
          type="time"
          name="startTime"
          value={eventData.startTime}
          onChange={e => setEventData({ ...eventData, startTime: e.target.value })}
          placeholder="Starttijd"
        />
         <Input
          type="time"
          name="endTime"
          value={eventData.endTime}
          onChange={e => setEventData({ ...eventData, endTime: e.target.value })}
          placeholder="Eindtijd"
        />
        
        <Button type="submit" backgroundColor={"teal.600"} color="white">Opslaan</Button>
      </form>
    </Box>
  );
};
