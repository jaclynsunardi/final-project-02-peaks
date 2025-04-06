import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Form from './Form';
import Footer from './Footer';
import ScrollToTop from '../components/ScrollToTop';

function Homepage() {
  const formRef = useRef(null);

  const scrollToForm = () => {
    if (formRef.current) {
      const yOffset = -100;
      const y = formRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
  
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  

  return (
    <>
      <ScrollToTop/>
      <Logo />
      <div className="home-container">
        <h1>Miso Hungry</h1>
        <h4>The simple recipe generator catered to your ingredients</h4>
        <button type="button" onClick={scrollToForm}>
          <p><a href="#form">Click to start!</a></p>
        </button>
        <p className = "to-learn">or <Link to="/learn">click here</Link> to learn...</p>
        </div>
      <div ref={formRef}> {/* Reference to Form */}
        <Form/>
        <Footer/>
      </div>
    </>
  );
}

export default Homepage;