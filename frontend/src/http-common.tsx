import axios from 'axios';

export default axios.create({
  baseURL: 'https://seed-cert.azurewebsites.net/api/',
  headers: {
    'Content-type': 'application/json'
  }
});
