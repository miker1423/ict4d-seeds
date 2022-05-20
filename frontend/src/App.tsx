import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LaboSemUser from './pages/LaboSemUser';
import LogIn from './pages/LogIn';
import MainPage from './pages/MainPage';
import RegisterCertificate from './pages/RegisterCertificate';
import RegisterUser from './pages/RegisterUser';
import SeeAllCertificates from './pages/SeeAllCertificates';
import UnionUser from './pages/UnionUser';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route
            path="/labosem"
            element={<LaboSemUser userData={undefined} />}
          />
          <Route path="/union" element={<UnionUser />} />
          <Route
            path="/registercertificate"
            element={<RegisterCertificate userData={undefined} />}
          />
          <Route path="/seeallcertificates" element={<SeeAllCertificates />} />

          <Route path="/registeruser" element={<RegisterUser />} />
        </Routes>
      </BrowserRouter>

      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
};

export default App;
