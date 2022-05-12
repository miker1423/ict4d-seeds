import { Grid, AppBar, Typography, Button } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Certificates from '../components/Certificates';
import PdfCreator from '../components/PdfCreator';
import NavBar from '../components/NavBar';
import { PDFViewer } from '@react-pdf/renderer';

const UnionUser = () => {
  const [showTable, setShowTable] = useState<boolean>(false);
  const [showDocument, setShowDocument] = useState<boolean>(false);

  const handleDocument = () => {
    setShowDocument(true);
  };

  const handleClick = () => {
    setShowTable(true);
  };

  return (
    <div className="App">
      <div
        className="body-container"
        style={{ height: '100vh', overflow: 'hidden' }}
      >
        <Grid className="frontpage-grid" container spacing={2}>
          <Grid item xs={12}>
            <NavBar user={'Union'} />
          </Grid>

          <Grid container xs={12} style={{ paddingTop: '0px' }}>
            <div className="front">
              <div
                className="title-container2"
                style={{ textAlign: 'left', marginLeft: '10px' }}
              >
                <Grid container sx={{ pl: '30px', pr: '10px' }}>
                  <Grid item xs={4}>
                    <Typography
                      variant="h1"
                      sx={{ color: 'hsla(0, 0%, 15%);', fontSize: '4.6em' }}
                    >
                      Welcome
                    </Typography>
                    <br />
                    <Typography sx={{ width: '300px' }}>
                      Press the button to see and download certificates.
                    </Typography>

                    <Button
                      variant="contained"
                      sx={{
                        mt: '20px',
                        justifyContent: 'left'
                      }}
                      onClick={handleClick}
                    >
                      See certificates
                    </Button>
                    <Button variant="contained" onClick={handleDocument}>
                      See Document
                    </Button>
                  </Grid>
                  <Grid item xs={8}>
                    <div
                      className="list-of-certificates"
                      style={{ width: '100%' }}
                    >
                      {showTable && <Certificates />}
                    </div>
                  </Grid>
                  <Grid item xs={8}>
                    <div className="document" style={{ width: '100%' }}>
                      {showDocument && (
                        <PDFViewer>
                          <PdfCreator />
                        </PDFViewer>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
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

const ButtonContainer = styled.div`
  justify-content: center;
  display: flex;

  & > * {
    color: white;
    padding-top: 30px;
    padding-bottom: 20px;
  }
`;

export default UnionUser;
