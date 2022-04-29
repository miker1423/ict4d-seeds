import { AppBar, Typography, Button, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

const NavBar = ({ user, active }: { user: string; active?: string }) => {
  return (
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
          <Link id="link" to={user === 'LaboSem' ? '/labosem' : '/union'}>
            TéléCiden
          </Link>
        </Typography>
        <MenuContainer
          className="menu-container"
          style={{
            display: user.toLowerCase() === 'labosem' ? 'flex' : 'none'
          }}
        >
          <MenuItem selected={active === 'regcer' ? true : false}>
            <Link id="link" to="/registercertificate">
              Register certificate
            </Link>
          </MenuItem>
          <MenuItem selected={active === 'seecer' ? true : false}>
            <Link id="link" to="/seeallcertificates">
              See all certificates
            </Link>
          </MenuItem>
        </MenuContainer>
        <Typography
          align="right"
          sx={{
            mt: '45px',
            mr: '20px',
            right: '10px'
          }}
        >
          <b>Signed in as</b>: {user} user
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

const MenuContainer = styled.div`
  display: flex;
  & > li {
    height: 40px;
    border-radius: 50px;
    font-size: 0.9em;
    top: 30px;
    margin-left: 10px;
    width: 100%;
  }
`;

export default NavBar;
