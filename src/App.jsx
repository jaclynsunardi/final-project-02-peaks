// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom';

// import Homepage from './pages/Homepage.jsx';
// import Learn from './pages/Learn.jsx';
// import Recipe from './pages/Recipe.jsx';

// function App() {
//   return (
//     // init routes used in web app
//     <Routes>
//       <Route path="/" element={<Homepage />} />
//       <Route path="/learn" element={<Learn />} />
//       <Route path="/recipe" element={<Recipe />} />
//       <Route path="*" element={<Homepage />} />
//     </Routes>
//   );
// }

// export default App;

import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* Optional: Add a shared navbar/header here if needed */}
      <Outlet /> {/* This renders the matched child route */}
      {/* Optional: Add a footer here if needed */}
    </div>
  );
}

export default App;
