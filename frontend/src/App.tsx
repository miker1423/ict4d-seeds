import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LogIn from './pages/LogIn';
import MainPage from './pages/MainPage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
