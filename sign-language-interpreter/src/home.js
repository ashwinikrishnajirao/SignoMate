import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Optional: Import an external CSS file for additional styling

const Home = () => {
  return (
    <div className="landing-page">
      <h1>JSS Academy of Technical Education, Bengaluru</h1>
      <h2>COMPUTER GRAPHICS AND IMAGE PROCESSING LABORATORY (21CSL66)</h2>
      <h3>
        PROJECT: <Link to="/app" className="project-link">SIGN LANGUAGE INTERPRETER</Link>
      </h3>
      <p>BY: ASHWINI KRISHNAJI RAO (1JS21CS030)</p>
      <p>AISHWARYA S PATIL (1JS21CS013)</p>
      <p>GUIDED BY: MRS. RASHMI B N, ASST PROF, DEPT OF CSE</p>
    </div>
  );
};

export default Home;
