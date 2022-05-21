import { Grid, AppBar, Typography, Button } from '@mui/material';
import styled from 'styled-components';
import Certificates from '../components/Certificates';
import React, { useEffect, useState } from 'react';
import { GetAllCerts } from '../backendServices/CertificateServices';
import ICertificate from '../interfaces/ICertificate';

const SeeAllCertificates = () => {
  const [validToken, setValidToken] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [certificates, setCertificates] = useState<ICertificate[]>();

  useEffect(() => {
    const currToken = sessionStorage.getItem('token');
    if (currToken !== '' && currToken !== null) setToken(currToken);
    if (token !== '' && token !== null) setValidToken(true);
  }, [validToken, token]);

  useEffect(() => {
    GetAllCerts().then((data) => {
      setCertificates(data.data);
      console.log('xx gotte certs', data.data);
    });
  }, []);

  return (
    <>
      {validToken && (
        <div
          className="body-container"
          style={{ height: '100vh', overflow: 'hidden' }}
        >
          <Grid className="frontpage-grid" container spacing={2}>
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
                  {certificates && <Certificates certList={certificates} />}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default SeeAllCertificates;
