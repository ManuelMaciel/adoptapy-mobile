import axios from 'axios';

const AxiosService = axios.create({
  baseURL: 'https://adoptapy.herokuapp.com/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default AxiosService;