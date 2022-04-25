import React from 'react';
// import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* FOR WHEN WE NEED NAVIGATION
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes> */}
      <MainPage />
    </div>
  );
}

export default App;
