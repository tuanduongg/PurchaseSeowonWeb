// import axios from 'axios';
// import { ASSET_TOKEN } from './constant';
import axios from 'axios';
import config from '../config';
import { getCookie } from './helper';

const restApi = axios.create({
  baseURL: config.apiUrl // Thay thế bằng URL API thực tế của bạn
});

// Request interceptor for API calls
restApi.interceptors.request.use(
  async (confi) => {
    const assToken = getCookie(config.ASSET_TOKEN);
    confi.headers = {
      Authorization: `Bearer ${assToken}`,
      Accept: 'application/json'
    };
    return confi;
  },
  (error) => {
    Promise.reject(error);
  }
);
// Response interceptor for API calls
restApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    return error.response;
  }
);

export default restApi;
