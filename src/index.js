import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 

import App from './App.jsx';
import './index.css';
import Homepage from './pages/Homepage.jsx';
import Form from './pages/Form.jsx';
import Learn from './pages/Learn.jsx';
import Recipe from './pages/Recipe.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/index', element: <Homepage /> },
  { path: '/form', element: <Form /> },
  { path: '/learn', element: <Learn /> },
  { path: '/recipe', element: <Recipe /> }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
