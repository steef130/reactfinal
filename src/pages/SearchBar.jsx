import React, { useState, useEffect } from 'react';


export const SearchBar = ({ onChance }) => {
   const [searchTerm, setSearchTerm] = useState('');
   const [events, setEvents] = useState([]);
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

  const matchEvent = events.filter((item) => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase())=== item.categoryIds.includes(matchCategories.id);
  });
    
 



    

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log('Search term:', e.target.value);
  };

  // Call onSearch with the filtered results
  onChance({ matchEvent, matchCategories });

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Zoeken..."
      />
       <ul>
      {matchEvent.map((event) => (
        <li key={event.id}>{event.title}</li>
      ))}
    </ul>
    
    
    </div>
  );
};