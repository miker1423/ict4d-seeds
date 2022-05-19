import React from 'react';
import IFarmer from '../interfaces/IFarmer';
import axios from '../http-common';

// APIs endpoints
export const create = (farmerData: IFarmer) => {
  const json = `{
    "phoneNumber": ${farmerData.phoneno}
  }`;

  const data = JSON.parse(json);

  axios
    .post('/Farmers/Create', data, {
      headers: { 'content-type': 'application/json' }
    })
    .catch((e) => console.log('xx error', e.response))
    .then((res) => console.log('xx create res', res));
};

// Get a farmer by phone
export const getFarmer = (phoneno: IFarmer['phoneno']) => {
  axios
    .get(`/Farmers/Find/${phoneno}`)
    .catch((e) => console.log('xx error', e.response))
    .then((res) => console.log('xx create res', res));
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
