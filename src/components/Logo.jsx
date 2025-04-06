import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../images/logoImage.png';

function Logo() {
  return (
    <>
      {/* top left logo */}
      <div className="logo-container">
        <h1>
          <Link to="/"
          >
            <img src={LogoImage} alt="Logo" />
          </Link>
          
        </h1>
      </div>
    </>
  );
}

export default Logo;
