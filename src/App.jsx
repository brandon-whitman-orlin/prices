import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import './App.css';
// import useFriendStore from './friends/friend-store';

import Home from '../pages/home/Home';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ minHeight: '100%', width: '100%' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/pricing' element={<Pricing />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
