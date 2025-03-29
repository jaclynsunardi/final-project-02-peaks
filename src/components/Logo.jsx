import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoImage from '../images/logoImage.png';

function Logo() {
  return (
    <>
      <div className="logo-container">
        <h1>
          <NavLink 
            to='/index' 
            className={({ isActive }) => isActive ? 'active-link' : ''}
          >
            <img 
              src={LogoImage} 
              alt="MisoHungry Logo" // Alt text for the image
              className="logo-image" // Optional: add a class to style the image
            />
          </NavLink>
        </h1>
      </div>
    </>
  );
}

export default Logo;
