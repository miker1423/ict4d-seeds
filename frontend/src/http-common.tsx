import axios from 'axios';

export default axios.create({
  baseURL: 'https://bcdf-145-108-81-4.eu.ngrok.io/api/',
  headers: {
    'Content-type': 'application/json'
  }
});
