import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Form from './Form';
import LogoImage2 from '../images/logoImage-2.png';

function Footer() {
  return (
    <>
      <Logo />
      <div className="footer-container">
        <img src={LogoImage2} alt="Logo" />
        <p className="copyright">&copy; {new Date().getFullYear()} Miso Hungry</p>
      </div>
    </>
  );
}

export default Footer;