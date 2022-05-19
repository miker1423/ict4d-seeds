import React from 'react';
import IUser from '../interfaces/IUser';
import axios from '../http-common';
import IAccount from '../interfaces/IAccount';

// APIs endpoints
// Create account
export const create = (userData: IUser) => {
  const json = `{
    "userName": ${userData.username},
    "password":  ${userData.password},
    "organization":  ${userData.organization},
    "phoneNumber":  ${userData.phoneno}
  }`;

  const data = JSON.parse(json);

  axios
    .post('/Account', data, {
      headers: { 'content-type': 'application/json' }
    })
    .catch((e) => console.log('xx error', e.response))
    .then((res) => console.log('xx create res', res));
};

export const login = async (userData: IAccount) => {
  const json = JSON.stringify({
    userName: userData.username,
    password: userData.password
  });

  let token = '';

  console.log('xx json', json.charAt(19));
  const data = JSON.parse(json);

  await axios
    .post('/Account/login', data, {
      headers: { 'content-type': 'application/json' }
    })
    .then((res) => {
      // console.log('xx create res', res.data.token);
      token = res.data.token;
    });
  // .catch((e) => console.log('xx error', e.response));

  return {
    userToken: token
  };
};

const UserServices = {
  create,
  login
  //   deleteUser,
  //   getAllFarmers,
  //   getFarmer
};

export default UserServices;
