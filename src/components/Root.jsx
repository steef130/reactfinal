import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Box } from '@chakra-ui/react';
import { SearchBar } from '../pages/SearchBar';
export const Root = () => {
  const handleSearch = (results) => {
    // Handle search results (update state, render components, etc.)
    console.log('Search results:', results);
  };
  return (
    <Box>
      <Navigation />
      <SearchBar onChance={handleSearch}/>
      <Outlet />
    </Box>
  );
};
