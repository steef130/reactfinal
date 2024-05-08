import React, { useState } from "react";
import { Box, Input, Button } from "@chakra-ui/react";
export const AddNewEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
 const [eventData, setEventData] = useState([]);
  const createEvent = async (user) => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json;charset=utf-8" },
      });

      if (!response.ok) {
        throw new Error("Er is een fout opgetreden bij het toevoegen van het evenement.");
      }

      const newEvent = await response.json();
      setEventData((prevEvents) => prevEvents.concat(newEvent));
    } catch (error) {
      console.error("Fout bij het toevoegen van het evenement:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  
    createEvent({ title, description, image, location, startTime, endTime });

    setTitle("");
    setDescription("");
    setImage("");
    setLocation("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <Box
      className="add-event"
      flexDirection={"column"}
      backgroundColor={"teal.300"}>
    <form onSubmit={handleSubmit}>
      
      <h2>Add new event</h2>
      <label htmlFor="title">Titel:</label>
      <Input
        type="text"
        required="required"
        placeholder="name"
        onChange={e => setTitle(e.target.value)}
        value={title}
      />
      <Input
        type="text"
        required="required"
        placeholder="description"
        onChange={e => setDescription(e.target.value)}
        value={description}
      />
      <Input
        type="url"
        required="required"
        placeholder="image"
        onChange={e => setImage(e.target.value)}
        value={image}
      />
       <Input
        type="text"
        required="required"
        placeholder="location"
        onChange={e => setLocation(e.target.value)}
        value={location}
      />
       <Input
        type="time"
        required="required"
        placeholder="startTime"
        onChange={e => setStartTime(e.target.value)}
        value={startTime}
      />
       <Input
        type="time"
        required="required"
        placeholder="endTime"
        onChange={e => setEndTime(e.target.value)}
        value={endTime}
      />
     <Button type="button" onClick={handleSubmit} backgroundColor="teal.600" color="white">Evenement toevoegen</Button>
    </form>
    </Box>
  );
};
