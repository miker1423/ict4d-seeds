import React from 'react';
import ICertificate from '../interfaces/ICertificate';
import axios from '../http-common';

// APIs endpoints

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

const CertificateServices = {
  create
};

export default CertificateServices;
