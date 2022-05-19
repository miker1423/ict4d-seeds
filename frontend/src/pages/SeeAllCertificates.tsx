import { Grid, AppBar, Typography, Button } from '@mui/material';
import styled from 'styled-components';
import { Link, Navigate } from 'react-router-dom';
import Certificates from '../components/Certificates';
import NavBar from '../components/NavBar';
import LoadingComp from '../components/LoadingComp';
import React, { useEffect, useState } from 'react';

const SeeAllCertificates = () => {
  const [validToken, setValidToken] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [login, setLogin] = useState<boolean>(false);

  useEffect(() => {
    const currToken = sessionStorage.getItem('token');
    if (currToken !== '' && currToken !== null) setToken(currToken);
    if (token !== '' && token !== null) setValidToken(true);

    if (!validToken) {
      const timer = setTimeout(() => {
        setLogin(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [validToken, token]);

  if (login) {
    return <Navigate to="/login" />;
  }

  return (
    // <div className="App">
    <>
      {!validToken && <LoadingComp />}
      {validToken && (
        <div className="body-container" style={{ height: '100vh' }}>
          <Grid className="frontpage-grid" container spacing={2}>
            {/* NAV BAR */}
            <Grid item xs={12}>
              <NavBar user={'LaboSem'} active={'seecer'} />
            </Grid>

            <Grid item xs={12} style={{ paddingTop: '0px' }}>
              <div className="main" style={{ padding: '10px' }}>
                <Grid item xs={12} sx={{ paddingTop: '0px' }}>
                  <div className="front-certificate">
                    <Typography variant="h5" sx={{ pb: '30px' }}>
                      All certificates
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Certificates />
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </>
    // </div>
  );
};

const ToolbarText = styled.span`
  width: 100%;
  height: 100%;
  display: inline-flex;

  & > p {
    position: absolute;
    font-size: 0.9em;
  }
`;

export default SeeAllCertificates;
