import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../images/logoImage.png';

function Logo() {
  return (
    <>
      <div className="logo-container">
        <h1>
          <Link to="/"
          >
            Logo
          </Link>
          
        </h1>
      </div>
    </>
  );
}

export default Logo;
