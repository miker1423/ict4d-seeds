import { AppBar, Typography, Button, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

const NavBar = ({
  user,
  active,
  admin
}: {
  user: string;
  active?: string;
  admin?: boolean;
}) => {
  return (
    <AppBar
      className="appbar"
      position="static"
      style={{
        color: 'white',
        backgroundColor: '#3ca341',
        paddingLeft: 16,
        alignContent: 'bottom'
      }}
    >
      <ToolbarText className="toolbartext">
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
          <Link id="link" to="/registercertificate">
            <MenuItem selected={active === 'regcer' ? true : false}>
              Register certificate
            </MenuItem>
          </Link>{' '}
          <Link id="link" to="/seeallcertificates">
            <MenuItem selected={active === 'seecer' ? true : false}>
              See all certificates
            </MenuItem>
          </Link>
          {admin && (
            <Link id="link" to="/registeruser">
              <MenuItem selected={active === 'reguser' ? true : false}>
                Register user
              </MenuItem>
            </Link>
          )}
        </MenuContainer>
        <div>
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
        </div>
      </ToolbarText>
    </AppBar>
  );
};

const ToolbarText = styled.div`
  width: 100%;
  height: 100%;
  display: inline-flex;

  & > * > p {
    position: absolute;
    font-size: 0.9em;
  }

  @media screen and (max-width: 615px) {
    display: block;
    & > h4 {
      font-size: 1.1em;
      text-align: center;
    }
  }
`;

const MenuContainer = styled.div`
  display: flex;
  & > a {
    height: 40px;
    border-radius: 50px;
    margin-left: 10px;
    width: 100%;
  }

  & > a > li {
    top: 40px;
    font-size: 0.9em;
  }

  @media screen and (max-width: 615px) {
   display: block;

`;

export default NavBar;
