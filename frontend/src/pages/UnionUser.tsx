import { Grid, AppBar, Typography, Button } from '@mui/material';
import styled from 'styled-components';
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
                  <b>Logged in as</b>: Union user
                </Typography>
                <Typography
                  align="right"
                  sx={{
                    mt: '12px',
                    right: '30px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Log out
                </Typography>
              </ToolbarText>
            </AppBar>
          </Grid>

          <Grid item xs={12} style={{ paddingTop: '0px' }}>
            <div className="front">
              <div className="title-container2  ">
                <Typography variant="h1" sx={{ color: 'hsla(0, 0%, 40%);' }}>
                  Welcome
                </Typography>
                <ButtonContainer>
                  <Grid item xs={4}>
                    <Button variant="contained">
                      Register new certificate
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="contained">See all certificates</Button>
                  </Grid>
                </ButtonContainer>
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