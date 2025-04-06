import React from 'react';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';
import i1 from '../images/instruction1.png';
import i2 from '../images/instruction2.png';
import i3 from '../images/instruction3.png';
import Footer from '../components/Footer';

function Learn() {
  return (
    <>
      <Logo/>
      <div className="learn-container">
        {/* learn header info */}
        <h1 className = 'learn-header'>How to use MisoHungry</h1>
        <h4>Using MisoHungry is as simple as a few clicks!</h4>
        <div className="learn-instructions">
            {/* step 1 */}
            <div className="instruction-container">
              <div className = 'i-left'>
                <h1>1</h1>
                <h4>Input ingredients you want in your recipe!</h4>
              </div>
              <div className = 'i-right'>
                <img src={i1} alt="Step 1" />
              </div>
            </div>
            {/* step 2 : DISPLAYED ON RIGHT - similar but diff css*/}
            <div className="instruction-container">
              <div className = 'i-left-2'>
                <img src={i2} alt="Step 2" />
              </div>
              <div className = 'i-right-2'>
                <h4>Select filters to eliminate ingredients in recipes!</h4>
                <h1>2</h1>
              </div>
            </div>
            {/* step 3 */}
            <div className="instruction-container">
              <div className = 'i-left'>
                <h1>3</h1>
                <h4>Choose a recipe youre interested in!</h4>
              </div>
              <div className = 'i-right'>
                <img src={i3} alt="Step 3" />
              </div>
            </div>
        </div>
        <p><Link to="/">Back to Home</Link></p>
      </div>
      <Footer/>
    </>
  );
}

export default Learn;