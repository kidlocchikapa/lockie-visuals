import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Navbar from './Components/Head';
import OurServices from './Components/Services';
import Discover from './Components/Discover';
import TeamSection from './Components/TeamSection';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/solutions" element={<OurServices/>} />
        </Routes>
      </div>
      <OurServices/>
      <Discover/>
      <TeamSection/>
    </Router>
  );
};

export default App;