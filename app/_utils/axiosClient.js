const { default: axios } = require("axios");

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
// const apiUrl = 'http://localhost:1337/api';
const apiUrl = 'https://e9fbd968-64fa-4800-96ab-99f8b0700d67.e1-us-cdp-2.choreoapps.dev/api';

const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Barear ${apiKey}`
  }
});

export default axiosClient;