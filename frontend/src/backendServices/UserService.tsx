import React, { useState } from 'react';
import IUser from '../interfaces/IUser';
import axios from '../http-common';
import IAccount from '../interfaces/IAccount';

// APIs endpoints
// Create account
export const create = async ({
  userData,
  userCreds
}: {
  userData: IUser;
  userCreds: IAccount;
}) => {
  const json = {
    userName: userCreds.username,
    password: userCreds.password,
    organization: userData.org,
    phoneNumber: userData.phoneno,
    role: userData.role
  };

  const data = json;

  await axios
    .post('/Account', data, {
      headers: { 'content-type': 'application/json' }
    })
    .then((res) => {
      console.log('xx create res', res);
    })
    .catch((e) => console.log('xx error', e.response));

  return {};
};

export const Login = async ({
  userData,
  setUserData
}: {
  userData: IAccount;
  setUserData: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}) => {
  const json = JSON.stringify({
    userName: userData.username,
    password: userData.password
  });

  let token = '';
  let org = '';
  let role = '';

  const data = JSON.parse(json);

  await axios
    .post('/Account/login', data, {
      headers: { 'content-type': 'application/json' }
    })
    .then((res) => {
      token = res.data.token;
      org = res.data.user.organization;
      role = res.data.user.role;
      console.log('xx res status', res.statusText);

      setUserData({
        token: token,
        org: org,
        role: role
      });
    })
    .catch((e) => console.log('xx error', e.response));

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
