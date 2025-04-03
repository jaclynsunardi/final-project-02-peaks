import React from 'react';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';
import step1Image from '../images/step1.png';
import step2Image from '../images/step2.png';
import step3Image from '../images/step3.png';

function Learn() {
  return (
    <>
      <Logo/>
      <div className="learn-container">
        <h1>How to use MisoHungry</h1>
        <div className="learn-instructions">
            <div
              className="instruction-container"
              style={{ backgroundImage: `url(${step1Image})` }}
            />
            <div
              className="instruction-container"
              style={{ backgroundImage: `url(${step2Image})` }}
            />
            <div
              className="instruction-container"
              style={{ backgroundImage: `url(${step3Image})` }}
            />
        </div>
        <p><Link to="/">Back to Home</Link></p>
      </div>
    </>
  );
}

export default Learn;
