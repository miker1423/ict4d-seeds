import { Grid, AppBar, Typography, Button } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React from 'react';

const UnionUser = () => {
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
                  <Link id="link" to="/union">
                    TéléCiden
                  </Link>
                </Typography>

                <Typography
                  align="right"
                  sx={{
                    mt: '45px',
                    mr: '20px',
                    right: '10px'
                  }}
                >
                  <b>Logged in as</b>: Union user
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ top: '5px', right: '25px', position: 'absolute' }}
                >
                  <Link id="link" to="/">
                    Log out
                  </Link>
                </Button>
              </ToolbarText>
            </AppBar>
          </Grid>

          <Grid container xs={12} style={{ paddingTop: '0px' }}>
            <div className="front">
              <div
                className="title-container2 "
                style={{ textAlign: 'left', marginLeft: '10px' }}
              >
                <Grid container sx={{ pl: '20px', pr: '10px' }}>
                  <Grid item xs={6}>
                    <Typography
                      variant="h1"
                      sx={{ color: 'hsla(0, 0%, 15%);', fontSize: '5.2em' }}
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
                    >
                      <Link id="link" to="#">
                        See certificates
                      </Link>
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <div
                      className="list-of-certificates"
                      style={{
                        backgroundColor: 'blue',
                        width: '100px',
                        height: '100px'
                      }}
                    ></div>
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
