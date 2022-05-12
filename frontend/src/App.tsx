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
import { AuthProvider } from 'react-oidc-context';

const oidcConfig = {
  authority: 'https://bcdf-145-108-81-4.eu.ngrok.io/api/',
  UserName: 'fatima',
  Password: 'whatever',
  client_secret: 'secret',
  client_id: 'default_client',
  Scope: 'api',
  redirect_uri: 'http://localhost:3000'
};

const App = () => {
  return (
    <AuthProvider {...oidcConfig}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/labosem" element={<LaboSemUser />} />
            <Route path="/union" element={<UnionUser />} />
            <Route
              path="/registercertificate"
              element={<RegisterCertificate />}
            />
            <Route
              path="/seeallcertificates"
              element={<SeeAllCertificates />}
            />

            <Route path="/registeruser" element={<RegisterUser />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;
