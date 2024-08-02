import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Importing the CSS file
import LOGO from './LOGO.png'; // Correcting the import

const Home = () => {
  return (
    <div className="landing-page">
      <img src={LOGO} alt="college logo" />
      <h1>JSS Academy of Technical Education, Bengaluru</h1>
      <h2>COMPUTER GRAPHICS AND IMAGE PROCESSING LABORATORY (21CSL66)</h2>
      <h3>
        PROJECT: <Link to="/app" className="project-link">SIGN LANGUAGE INTERPRETER</Link>
      </h3>
      <div className="names">
        <div>
          <p><b>BY:</b></p>
          <p>ASHWINI KRISHNAJI RAO (1JS21CS030)</p>
          <p>AISHWARYA S PATIL (1JS21CS013)</p>
        </div>
        <div>
          <p><b>GUIDED BY:</b></p>
          <p>MRS. RASHMI B N, B.E., M.TECH</p>
          <p>ASSISTANT PROF, DEPT OF CSE</p>
        </div>
      </div>
      <button className='My_button'><Link to="/app" className='My_button' >CLICK TO SEE THE DEMO</Link>
      </button></div>

  );
};

export default Home;
