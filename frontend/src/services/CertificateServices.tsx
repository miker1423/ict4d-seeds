import React from 'react';
import ICertificate from '../interfaces/ICertificate';
import axios from '../http-common';

// APIs endpoints

// create certificate
export const create = (certificateData: ICertificate) => {
  const json = `{
    "phoneNumber": ${certificateData.phoneno}
  }`;
  const data = JSON.parse(json);

  console.log('xx inside create certificate!', data);
  axios
    .post('/Certificate/create', data, {
      headers: { 'content-type': 'application/json' }
    })
    .catch((e) => console.log('xx error', e.response))
    .then((res) => console.log('xx create res', res));
};

// Get users certificate
export const getUserCerts = (phoneno: ICertificate['phoneno']) => {
  axios
    .get(`/Certificate/getUserCerts/${phoneno}`)
    .catch((e) => console.log('xx error', e.response))
    .then((res) => console.log('xx create res', res));
};

// Get all certificates
export const getAllCerts = () => {
  axios
    .get(`/Certificate/getAllCerts`)
    .catch((e) => console.log('xx error', e.response))
    .then((res) => console.log('xx create res', res));
};

//  what does this do..
export const getPhoneNo = (phoneno: ICertificate['phoneno']) => {
  axios
    .get(`/Certificate/get_phone/${phoneno}`)
    .catch((e) => console.log('xx error', e.response))
    .then((res) => console.log('xx create res', res));
};

// delete certificate
export const deleteCert = (id: ICertificate['id']) => {
  axios
    .delete(`/Certificate/delete/${id}`)
    .catch((e) => console.log('xx error', e.response))
    .then((res) => console.log('xx create res', res));
};

const CertificateServices = {
  create,
  getPhoneNo,
  getAllCerts,
  getUserCerts,
  deleteCert
};

export default CertificateServices;
