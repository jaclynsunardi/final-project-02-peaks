import React from 'react';
import { NavLink } from 'react-router-dom';

function Logo() {
  return (
    <>
        <div className="logo-container">
            <h1><NavLink to = '/index' className={({ isActive }) => isActive ? "active-link" : ""}>Logo</NavLink></h1>
        </div>
    </>
  );
}

export default Logo;