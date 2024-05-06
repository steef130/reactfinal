import React from 'react';
import { Heading, Button } from '@chakra-ui/react';
import { useLoaderData, Link  } from 'react-router-dom';

//import { EventReactionForm } from '../pages/EventReactionForm';



export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categoriesResponse = await fetch('http://localhost:3000/categories');
  const users = await fetch('http://localhost:3000/users');
  
  return {
    event: await event.json(),
    categoriesData: await categoriesResponse.json(),
    users: await users.json(),
  };};



export const EventPage = () => {

 

  const { event, categoriesData, users } = useLoaderData();


  if (!event) { 
  return <div>Loading...</div>
 }

 

  return (
 
    <div className="event">

      <Heading>Event {event.title} </Heading>
      <img src={event.image} alt={event.title} />
      <p>{event.discription}</p>
      <p>Where: {event.location}</p>
    
      <p>When: {event.startTime}</p>
      <p>Till: {event.endTime}</p>
     {/* Display category names */}
     <h3>Categories:</h3>
      <ul>
      {event.categoryIds.map((categoryId) => (
          <li key={categoryId}>
           {categoriesData.find((cat) => cat.id == categoryId)?.name || "Onbekend"}
          </li>
        ))}
      </ul>
   
       by{""}
       <p>
       {users.find((user) => user.id && event.createdBy)?.name || "Onbekend"}
       </p>
      
       <Link to={`/edit/${event.id}`}>
        <Button>Edit Event</Button>
      </Link>
   
       <Link to ="/delete">
     <Button>Delete Event</Button>
     </Link>
    </div>
    
  );
};
  
 

