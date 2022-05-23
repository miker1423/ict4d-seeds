import { Grid, AppBar, Typography, Button } from '@mui/material';
import styled from 'styled-components';
import Certificates from '../components/Certificates';
import React, { useEffect, useState } from 'react';
import CertificateServices from '../backendServices/CertificateServices';
import ICertificate from '../interfaces/ICertificate';
import LoadingComp from './LoadingComp';

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
    CertificateServices.GetAllCerts().then((data) => {
      const certList = data.data;
      const cert = certList.filter((row) => row.status !== 2);
      setCertificates(cert);
    });
  }, []);

  const deleteCert = (id: string) => {
    if (id) {
      CertificateServices.deleteCert(id).then(() =>
        console.log('xx has cert been deleted')
      );
    }
  };

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
                <Grid
                  item
                  className="tablecontainer"
                  xs={12}
                  style={{ marginLeft: '10px' }}
                >
                  {certificates && (
                    <Certificates
                      certList={certificates}
                      deleteCert={deleteCert}
                    />
                  )}
                  {!certificates && <LoadingComp />}
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
