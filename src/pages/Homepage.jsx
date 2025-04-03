import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
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
        <h1>Miso Hungry</h1>
        <button type="button" onClick={scrollToForm}>
          <p><a href="#form">Click to start!</a></p>
        </button>
        <p>or <Link to="/learn">click here</Link> to learn</p>
        </div>
      <div ref={formRef}> {/* Reference to Form */}
        <Form />
      </div>
    </>
  );
}

export default Homepage;