import React, { useState } from 'react';
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
export const GetAllCerts = async () => {
  let certList: ICertificate[];
  certList = [];

  await axios
    .get(`/Certificate`)
    .then((res) => {
      for (let cert of res.data) {
        console.log('xx res.data', res.data);
        const aCert: ICertificate = {
          id: cert.id,
          dateCreated: cert.dateCreate,
          seedvar: cert.seedvar,
          status: cert.status,
          lastChanged: cert.lastChanged,
          farmerId: cert.farmerId
        };
        certList.push(aCert);
      }
    })
    .catch((e) => console.log('xx error', e.response));

  console.log('xx certlist', certList[0]);
  return {
    data: certList
  };
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
  GetAllCerts,
  getCertById,
  deleteCert
};

export default CertificateServices;
