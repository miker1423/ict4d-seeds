import React from 'react';
import ICertificate from '../interfaces/ICertificate';
import axios from '../http-common';

// APIs endpoints

// create certificate
export const create = (certData: ICertificate) => {
  const json = `{
    "farmerId": ${certData.farmerId},
    "status": ${certData.status},
    "dateCreate": ${certData.dateCreated},
    "lastChanged": ${certData.lastChanged},
    "seedvar": ${certData.seedvar},
  }`;
  const data = JSON.parse(json);

  axios
    .put('/Certificate', data, {
      headers: { 'content-type': 'application/json' }
    })
    .catch((e) => console.log('xx error', e.response))
    .then((res) => console.log('xx create res', res));
};

// Get a users certificate by phone
// export const getCertByPhone = (phoneno: ICertificate['phoneno']) => {
//   axios
//     .get(`/Certificate/get_phone/${phoneno}`)
//     .catch((e) => console.log('xx error', e.response))
//     .then((res) => console.log('xx create res', res));
// };

// Get a users certificate by id
export const getCertById = (id: ICertificate['farmerId']) => {
  axios
    .get(`/Certificate/${id}`)
    .catch((e) => console.log('xx error', e.response))
    .then((res) => console.log('xx create res', res));
};

// Get all certificates
export const getAllCerts = () => {
  axios
    .get(`/Certificate`)
    .catch((e) => console.log('xx error', e.response))
    .then((res) => console.log('xx create res', res));
};

// delete certificate
export const deleteCert = (id: ICertificate['id']) => {
  axios
    .delete(`/Certificate/${id}`)
    .catch((e) => console.log('xx error', e.response))
    .then((res) => console.log('xx create res', res));
};

const CertificateServices = {
  create,
  getAllCerts,
  getCertById,
  deleteCert
};

export default CertificateServices;
