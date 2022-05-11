import React from 'react';
import ICertificate from '../interfaces/ICertificate';
import axios from '../http-common';

// APIs endpoints

export const create = (certificateData: ICertificate) => {
  console.log('xx inside create certificate!', certificateData);

  const data = JSON.parse(
    `{
      'phoneNumber: ${certificateData.phoneno}
    }`
  );

  axios
    .post('/Certificate/create', data)
    .catch((e) => console.log('xx error', e.response))
    .then((res) => console.log('xx create res', res));
};

const CertificateServices = {
  create
};

export default CertificateServices;
