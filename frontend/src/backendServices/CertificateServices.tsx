import React, { useState } from 'react';
import ICertificate from '../interfaces/ICertificate';
import axios from '../http-common';

// APIs endpoints

// create certificate
export const create = async (certData: ICertificate) => {
  const json = `{
    "farmerId": ${certData.farmerId},
    "status": ${certData.status},
    "dateCreate": ${certData.dateCreated},
    "lastChanged": ${certData.lastChanged},
    "seedvar": ${certData.seedvar},
  }`;
  const data = JSON.parse(json);

  await axios
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
export const getCertById = async (id: ICertificate['farmerId']) => {
  let certificate: ICertificate = {
    id: 0,
    dateCreated: '',
    seedvar: '',
    status: 1,
    lastChanged: '',
    farmerId: ''
  };

  await axios
    .get(`/Certificate/${id}`)
    .then((res) => {
      console.log('xx create res', res);
      const cert = res.data;
      certificate = {
        id: cert.id,
        dateCreated: cert.dateCreate,
        seedvar: cert.seedvar,
        status: cert.status,
        lastChanged: cert.lastChanged,
        farmerId: cert.farmerId
      };
    })
    .catch((e) => console.log('xx error', e.response));

  return {
    data: certificate
  };
};

// Get all certificates
export const GetAllCerts = async () => {
  let certList: ICertificate[];
  certList = [];

  await axios
    .get(`/Certificate`)
    .then((res) => {
      for (let cert of res.data) {
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

  return {
    data: certList
  };
};

// delete certificate
export const deleteCert = async (id: ICertificate['id']) => {
  await axios
    .delete(`/Certificate/${id}`)
    .then((res) => console.log('xx delete', res))
    .catch((e) => console.log('xx error', e.response));
};

const CertificateServices = {
  create,
  GetAllCerts,
  getCertById,
  deleteCert
};

export default CertificateServices;
