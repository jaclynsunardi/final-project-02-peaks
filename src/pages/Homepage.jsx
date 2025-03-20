import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../components/Logo';
import Form from './Form';

function Homepage() {
  const formRef = useRef(null);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Logo />
      <div className="home-container">
        <h1>MisoHungry</h1>
        <button type="button" onClick={scrollToForm}>
          <a>Click to start!</a>
        </button>
        <p>or <NavLink to="/learn" className={({ isActive }) => isActive ? "active-link" : ""}>click here</NavLink> to learn</p>
      </div>
      <div ref={formRef}> {/* Reference to Form */}
        <Form />
      </div>
    </>
  );
}

export default Homepage;