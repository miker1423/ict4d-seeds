import { Grid, Typography, Button } from '@mui/material';
import styled from 'styled-components';
import { Link, Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import React, { useState, useEffect } from 'react';
import LoadingComp from '../components/LoadingComp';
import IUser from '../interfaces/IUser';
import RegisterCertificate from '../components/RegisterCertificate';
import SeeAllCertificates from '../components/SeeAllCertificates';
import RegisterUser from './RegisterUser';

const LaboSemUser = ({ userData }: { userData: IUser | undefined }) => {
  const [validToken, setValidToken] = useState<boolean>(false);
  const [token, setToken] = useState('');
  const [login, setLogin] = useState<boolean>(false);
  const [currPage, setCurrPage] = useState<string>('labosemHome');

  useEffect(() => {
    const currToken = sessionStorage.getItem('token');
    if (currToken !== '' && currToken !== null) setToken(currToken);
    if (token !== '' && token !== null) setValidToken(true);

    if (!validToken) {
      const timer = setTimeout(() => {
        setLogin(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [validToken, token]);

  const setPage = (page: string) => {
    setCurrPage(page);
  };

  return (
    <>
      {login && <Navigate to="/login" />}
      {!validToken && <LoadingComp />}
      {validToken && (
        <div
          className="body-container"
          style={{ height: '100vh', overflow: 'hidden' }}
        >
          <Grid className="frontpage-grid" container spacing={2}>
            {/* NAV BAR */}
            <Grid item xs={12}>
              <NavBar
                user={userData?.org || ''}
                setPage={setPage}
                role={userData?.role}
              />
            </Grid>

            {currPage === 'regcer' && <RegisterCertificate />}
            {currPage === 'seecer' && <SeeAllCertificates />}
            {currPage === 'reguser' &&
              userData &&
              userData.role === 'admin' && <RegisterUser userData={userData} />}
            {currPage === 'labosemHome' && (
              <Grid item xs={12} style={{ paddingTop: '0px' }}>
                <div className="front">
                  <div className="title-container2">
                    <Typography
                      variant="h1"
                      sx={{ color: 'hsla(0, 0%, 15%);' }}
                    >
                      Welcome
                    </Typography>
                    <br />
                    <Typography sx={{ width: '300px' }}>
                      Press on a button to start registering a new certificate
                      or to see a list of existing certificates.
                    </Typography>
                    <ButtonContainer>
                      <Grid item xs={4}>
                        <Link
                          id="link"
                          to="#"
                          onClick={() => setCurrPage('regcer')}
                        >
                          <Button variant="contained">
                            Register new certificate
                          </Button>
                        </Link>
                      </Grid>
                      <Grid item xs={4}>
                        <Link
                          id="link"
                          to="#"
                          onClick={() => setCurrPage('seecer')}
                        >
                          <Button variant="contained">
                            See all certificates
                          </Button>
                        </Link>
                      </Grid>
                    </ButtonContainer>
                  </div>
                </div>
              </Grid>
            )}
          </Grid>
        </div>
      )}
    </>
  );
};

const ButtonContainer = styled.div`
  justify-content: center;
  display: flex;

  & > * {
    color: white;
    padding-top: 30px;
    padding-bottom: 20px;
  }
`;

export default LaboSemUser;
