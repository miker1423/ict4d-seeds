import React, { useState } from 'react';
import ICertificate from '../interfaces/ICertificate';
import axios from '../http-common';

// APIs endpoints

// create certificate
export const create = async (certData: ICertificate) => {
  // create needs phoneno
  const json = {
    id: certData.id,
    dateCreated: certData.dateCreated,
    seedvar: certData.seedvar,
    status: certData.status,
    batchno: certData.batchno,
    gerfac: certData.gerfac,
    varpur: certData.varpur,
    certper: certData.certper,
    phoneno: certData.phoneno,
    organization: certData.organization
  };

  const data = json;

  let response = undefined;
  await axios
    .post('/Certificate/Create', data, {
      headers: { 'content-type': 'application/json' }
    })
    .then((res) => {
      console.log('xx create cert', res);
      if (res) response = res.status;
    })
    .catch((e) => {
      console.log('xx error', e.response);
      response = e.response;
    });

  return { data: response };
};

// Get a users certificate by id
export const getCertById = async (phone: ICertificate['phoneno']) => {
  let certificate: ICertificate = {
    id: 0,
    dateCreated: '',
    seedvar: '',
    status: 0,
    batchno: 0,
    gerfac: 0,
    varpur: 0,
    certper: '',
    phoneno: '',
    organization: ''
    // phone
  };

  await axios
    .get(`/Certificate/${phone}`)
    .then((res) => {
      console.log('xx get cert by phone', res);
      const cert = res.data;
      certificate = {
        id: cert.id,
        dateCreated: cert.dateCreated,
        seedvar: cert.seedvar,
        status: cert.status,
        batchno: cert.batchno,
        gerfac: cert.gerfac,
        varpur: cert.varpur,
        certper: cert.certper,
        phoneno: cert.phoneno,
        organization: cert.organization
      };
    })
    .catch((e) => console.log('xx error', e.response));

  return {
    data: certificate
  };
};

export const download = async (id: number) => {
  await axios
    .get(`/Certificate/download/${id}`)
    .then((res) => {
      console.log('xx response', res);
    })
    .catch((e) => console.log('xx error', e.response));

  return {
    // data: certList
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
          dateCreated: cert.dateCreated,
          seedvar: cert.seedvar,
          status: cert.status,
          batchno: cert.batchno,
          gerfac: cert.gerfac,
          varpur: cert.varpur,
          certper: cert.certper,
          phoneno: cert.phoneno,
          organization: cert.organization
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
    .then((res) => console.log('xx deleteq', res))
    .catch((e) => console.log('xx error', e.response));
};

const CertificateServices = {
  create,
  GetAllCerts,
  getCertById,
  deleteCert,
  download
};

export default CertificateServices;
