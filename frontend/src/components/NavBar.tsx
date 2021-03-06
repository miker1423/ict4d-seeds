import { AppBar, Typography, Button, MenuItem } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const NavBar = ({
  user,
  role,
  setPage
}: {
  user: string;
  role?: string;
  setPage?: (page: string) => void;
}) => {
  const [admin, setAdmin] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>('');
  const logo = require('../images/logo.png');

  useEffect(() => {
    console.log('xx is role?', role);
    if (role && role === 'admin') setAdmin(true);
    else setAdmin(false);
    // setActivePage(page);
  }, [role]);

  const logOut = () => {
    console.log('xx log out button click!');
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('organization');
      sessionStorage.removeItem('role');
    }
  };

  const handlePage = (page: string) => {
    if (setPage) {
      setPage(page);
    }
    // setActivePage(page);
  };

  return (
    <AppBar
      className="appbar"
      position="static"
      style={{
        color: 'white',
        backgroundColor: '#3ca341',
        paddingLeft: 16,
        alignContent: 'bottom',
        height: '20vh'
      }}
    >
      <ToolbarText className="toolbartext">
        <Typography variant="h5" align="left" sx={{ mt: '40px' }}>
          <Link
            id="link"
            to={'#'}
            onClick={() => {
              handlePage(
                user.toLowerCase() === 'labosem' ? 'labosemHome' : 'unionHome'
              );
            }}
          >
            <span>
              <img src={logo} style={{ width: '30px' }}></img>
            </span>
            TéléCiden
          </Link>
        </Typography>
        <MenuContainer
          className="menu-container"
          style={{
            display: user.toLowerCase() === 'labosem' ? 'flex' : 'none'
          }}
        >
          <Link id="link" to="#" onClick={() => handlePage('regcer')}>
            <MenuItem selected={activePage === 'regcer' ? true : false}>
              Register certificate
            </MenuItem>
          </Link>
          <Link id="link" to="#" onClick={() => handlePage('seecer')}>
            <MenuItem selected={activePage === 'seecer' ? true : false}>
              See all certificates
            </MenuItem>
          </Link>
          {admin && (
            <Link id="link" to="#" onClick={() => handlePage('reguser')}>
              <MenuItem selected={activePage === 'reguser' ? true : false}>
                Register user
              </MenuItem>
            </Link>
          )}
        </MenuContainer>
        <MenuContainer
          className="menu-container"
          style={{
            display: user.toLowerCase() !== 'labosem' ? 'flex' : 'none'
          }}
        >
          {admin && (
            <Link id="link" to="#" onClick={() => handlePage('reguser')}>
              <MenuItem selected={activePage === 'reguser' ? true : false}>
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
            <Link id="link" to="/" onClick={() => logOut()}>
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
`;

export default NavBar;
