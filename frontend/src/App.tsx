import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LaboSemUser from './pages/LaboSemUser';
import LogIn from './pages/LogIn';
import MainPage from './pages/MainPage';
import UnionUser from './pages/UnionUser';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/labosem" element={<LaboSemUser />} />
          <Route path="/union" element={<UnionUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
