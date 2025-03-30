import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage.jsx';
import Learn from './pages/Learn.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/learn" element={<Learn />} />
    </Routes>
  );
}

export default App;
