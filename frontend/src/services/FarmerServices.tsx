import React from 'react';
import IFarmer from '../interfaces/IFarmer';
import http from '../http-common';

// APIs endpoints

export const create = (farmerData: IFarmer) => {
  http
    .post('/Farmers/create', farmerData)
    .then((res) => console.log('xx create res', res));
};

const FarmerServices = {
  create
};

export default FarmerServices;
