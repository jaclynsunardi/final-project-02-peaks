import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../images/logoImage.png';
import LogoImage2 from '../images/logoImage-2.png';

function Logo() {
  return (
    <>
      <div className="logo-container">
        <h1>
          <Link to="/"
          >
            <img src={LogoImage2} alt="Logo" />
          </Link>
          
        </h1>
      </div>
    </>
  );
}

export default Logo;
