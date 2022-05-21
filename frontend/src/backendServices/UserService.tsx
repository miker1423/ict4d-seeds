import React, { useState } from 'react';
import IUser from '../interfaces/IUser';
import axios from '../http-common';
import IAccount from '../interfaces/IAccount';
import { AxiosResponse } from 'axios';

// APIs endpoints
// Create account
export const create = ({
  userData,
  userCreds
}: {
  userData: IUser;
  userCreds: IAccount;
}) => {
  const json = `{
    "userName": ${userCreds.username},
    "password":  ${userCreds.password},
    "organization":  ${userData.org},
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

export const Login = async (userData: IAccount) => {
  const json = JSON.stringify({
    userName: userData.username,
    password: userData.password
  });

  let token = '';
  let org = '';
  let role = '';

  const data = JSON.parse(json);
  console.log('xx data', data);

  await axios
    .post('/Account/login', data, {
      headers: { 'content-type': 'application/json' }
    })
    .then((res) => {
      // console.log('xx create res', res.data.token);
      token = res.data.token;
      org = res.data.user.organization;
      role = res.data.user.role;
    });

  return {
    data: {
      token: token,
      org: org,
      role: role
    }
  };
};

const UserServices = {
  create,
  Login
  //   deleteUser,
  //   getAllFarmers,
  //   getFarmer
};

export default UserServices;
