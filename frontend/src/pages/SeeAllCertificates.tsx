import { Grid, AppBar, Typography, Button } from '@mui/material';
import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';

const SeeAllCertificates = () => {
  return (
    <div className="App">
      <div
        className="body-container"
        style={{ height: '100vh', overflow: 'hidden' }}
      >
        <Grid className="frontpage-grid" container spacing={2}>
          {/* NAV BAR */}
          <Grid item xs={12}>
            <AppBar
              className="appbar"
              position="static"
              style={{
                color: 'white',
                backgroundColor: '#3ca341',
                height: '15vh',
                paddingLeft: 16,
                alignContent: 'bottom'
              }}
            >
              <ToolbarText>
                <Typography variant="h4" align="left" sx={{ mt: '30px' }}>
                  TéléCiden
                </Typography>

                <Typography
                  align="right"
                  sx={{
                    mt: '45px',
                    mr: '20px',
                    right: '10px'
                  }}
                >
                  <b>Signed in as</b>: LaboSem user
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ top: '5px', right: '25px', position: 'absolute' }}
                >
                  <Link id="link" to="/">
                    Sign out
                  </Link>
                </Button>
              </ToolbarText>
            </AppBar>
          </Grid>

          <Grid item xs={12} style={{ paddingTop: '0px' }}>
            <div className="front"></div>
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

export default SeeAllCertificates;
