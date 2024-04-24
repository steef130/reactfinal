import React, { useState, useEffect } from 'react';


export const EditForm = ({ match }) => {
  
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
  
  const eventId = match.params.eventId;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        const eventData = await response.json();
        setEventData(eventData);
      } catch (error) {
        console.error("Fout bij het ophalen van evenementsgegevens:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Bewerk bericht</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={e => setEventData({ ...eventData, title: e.target.value })}
          placeholder="Titel"
        />
         <input
          type="text"
          name="description"
          value={eventData.description}
          onChange={e => setEventData({ ...eventData, description: e.target.value })}
          placeholder="Omschrijving"
        />
         <input
          type="text"
          name="location"
          value={eventData.location}
          onChange={e => setEventData({ ...eventData, location: e.target.value })}
          placeholder="Locatie"
        />
         <input
          type="text"
          name="startTime"
          value={eventData.startTime}
          onChange={e => setEventData({ ...eventData, startTime: e.target.value })}
          placeholder="Starttijd"
        />
         <input
          type="text"
          name="endTime"
          value={eventData.endTime}
          onChange={e => setEventData({ ...eventData, endTime: e.target.value })}
          placeholder="Eindtijd"
        />
        
        <button type="submit">Opslaan</button>
      </form>
    </div>
  );
};

