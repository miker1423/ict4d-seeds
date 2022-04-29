import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MainPage = () => {
  return (
    <div className="App">
      <div className="body-container">
        <Grid className="frontpage-grid" container spacing={2}>
          <Grid item xs={12}>
            <div className="front">
              <div className="title-container">
                <Title>
                  <Typography variant="h1">TéléCiden</Typography>
                </Title>
                <SubTitle>
                  <p>
                    Welcome to TéléCiden, Mali's first website for registration
                    and retrieval of seed certificates.
                    <p>
                      Are you from LaboSem or a farmer's union? <br />
                      Please sign in to access the site.
                    </p>
                  </p>
                </SubTitle>
                <Button size="large" variant="contained">
                  <Link id="link" to="login">
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const Title = styled.span`
  height: 100px;
  width: 100px;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  font-weight: bold;
  color: hsla(0, 0%, 20%);
`;

const SubTitle = styled.span`
  & > p {
    color: hsla(0, 0%, 40%);
    width: 300px;
    font-size: 18px;
  }
`;

export default MainPage;
