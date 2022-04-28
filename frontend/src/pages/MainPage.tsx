import React, { useState } from 'react';
import { Container, Grid, Button, Modal, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const MainPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOnClick = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="App">
      <div className="body-container">
        <Grid className="frontpage-grid" container spacing={2}>
          <Grid item xs={12}>
            <div className="front">
              <div className="title-container">
                <Title>
                  <Typography variant="h2">TéléCiden</Typography>
                </Title>
                <SubTitle>
                  <p>
                    Welcome to TéléCiden, Mali's first digital website for
                    registration and retrieval of seed certificates.
                    <p>Please log in</p>
                  </p>
                </SubTitle>
                <Button
                  size="large"
                  sx={{ left: '10px' }}
                  variant="contained"
                  onClick={handleOnClick}
                >
                  <Link
                    id="link"
                    to="login"
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    Log In
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
  font-size: 6em;
`;

const SubTitle = styled.span`
  & > p {
    color: white;
    width: 300px;
    padding-left: 10px;
    font-size: 18px;
  }
`;

export default MainPage;
