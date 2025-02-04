// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.scss';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the IoT Dashboard</h1>
      <p>Visualize and analyze your IoT data in real-time.</p>
      <Link to="/login" className="btn">Get Started</Link>
    </div>
  );
};

export default Home;