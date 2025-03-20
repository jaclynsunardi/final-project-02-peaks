import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Import RouterProvider

import App from './App.jsx';
import './index.css';
import Homepage from './pages/Homepage.jsx';
import Form from './pages/Form.jsx';
import Learn from './pages/Learn.jsx';
import Recipe from './pages/Recipe.jsx';

// Define the router
const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/index', element: <Homepage /> },
  { path: '/form', element: <Form /> },
  { path: '/learn', element: <Learn /> },
  { path: '/recipe', element: <Recipe /> }
]);

// Render the app with the RouterProvider to manage the routes
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} /> {/* Use RouterProvider instead of BrowserRouter */}
  </React.StrictMode>
);
