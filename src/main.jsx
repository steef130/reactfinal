import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { EventPage, loader as EventPageLoader } from './pages/EventPage';
import { EventsPage } from './pages/EventsPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/Root';
import { EditForm } from './pages/EditForm';
import { DeleteButton } from './pages/DeleteButton';
import { AddNewEvent } from './pages/AddNewEvent';




const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <EventsPage />,
        
      },
       {
        path: '/event/:eventId',
        element: <EventPage />,
        loader: EventPageLoader,
        }, 
         {
        path: '/edit/:eventId',
        element: <EditForm />,
        }, 
       {
        path: '/delete',
        element: <DeleteButton />,
       },
       {
        path: '/add',
        element: <AddNewEvent />,
       },
        {
          path: '*',
          element: <div>Not Found</div>,
        }
      
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
