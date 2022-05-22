import React from 'react';
import IFarmer from '../interfaces/IFarmer';
import axios from '../http-common';

// APIs endpoints
export const create = async (farmerData: IFarmer) => {
  const farmer: IFarmer = {
    phoneno: farmerData.phoneno,
    organization: farmerData.organization,
    name: farmerData.name
  };

  const data = farmer;

  let response = undefined;

  await axios
    .post('/Farmers/Create', data, {
      headers: { 'content-type': 'application/json' }
    })
    .then((res) => {
      console.log('xx create farmer', res);
      if (res) response = res.status;
    })
    .catch((e) => {
      console.log('xx error', e.response);
      response = e.response;
    });

  return { data: response };
};

// Get a farmer by phone
export const getFarmer = async (phoneno: IFarmer['phoneno']) => {
  let farmer: IFarmer = {
    phoneno: '',
    id: undefined,
    name: ''
  };

  await axios
    .get(`/Farmers/Find/${phoneno}`)
    .then((res) => {
      // console.log('xx create res', res);
      farmer = {
        phoneno: res.data.phoneNumber,
        id: res.data.id,
        name: res.data.name
      };
    })
    .catch((e) => {
      console.log('xx error', e.response);
    });

  return {
    data: farmer
  };
};

// Get all Farmers
export const getAllFarmers = () => {
  axios
    .get(`/Farmers`)
    .catch((e) => console.log('xx error', e.response))
    .then((res) => console.log('xx create res', res));
};

// delete Farmers
// export const deleteFarmer = (phoneno: IFarmer['phoneno']) => {
//   axios
//     .delete(`/Farmers/delete/${phoneno}`)
//     .catch((e) => console.log('xx error', e.response))
//     .then((res) => console.log('xx create res', res));
// };

const FarmerServices = {
  create,
  // deleteFarmer,
  getAllFarmers,
  getFarmer
};

export default FarmerServices;
