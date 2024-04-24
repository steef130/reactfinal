import { useState } from "react";



export const AddNewEvent = ({ createEvent }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  
  const handleSubmit = e => {
    e.preventDefault();

    // An async function, but no need to wait for it.
    createEvent({ title, description, image, location, startTime, endTime });

    // Empty the form fields.
    setTitle("");
    setDescription("");
    setImage("");
    setLocation("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        required="required"
        placeholder="name"
        onChange={e => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
        required="required"
        placeholder="description"
        onChange={e => setDescription(e.target.value)}
        value={description}
      />
      <input
        type="url"
        required="required"
        placeholder="image"
        onChange={e => setImage(e.target.value)}
        value={image}
      />
       <input
        type="text"
        required="required"
        placeholder="location"
        onChange={e => setLocation(e.target.value)}
        value={location}
      />
       <input
        type="text"
        required="required"
        placeholder="startTime"
        onChange={e => setStartTime(e.target.value)}
        value={startTime}
      />
       <input
        type="text"
        required="required"
        placeholder="endTime"
        onChange={e => setEndTime(e.target.value)}
        value={endTime}
      />
      <button type="submit">Add event</button>
    </form>
  );
};