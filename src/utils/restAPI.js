// import axios from 'axios';
import { ConfigApp } from 'config';

import { ASSET_TOKEN } from './constant';
import axios from 'axios';
import { getMenuAlias } from './utils';


const restApi = axios.create({
    baseURL: ConfigApp.API_URL, // Thay thế bằng URL API thực tế của bạn
});

// Request interceptor for API calls
restApi.interceptors.request.use(
    async config => {
        const assToken = window.localStorage.getItem(ASSET_TOKEN);
        let menu = getMenuAlias();
        config.headers = {
            'Authorization': `Bearer ${assToken}`,
            'Accept': 'application/json',
            'VIEWPAGE': menu,
            // 'Content-Type': 'application/x-www-form-urlencoded'
        }
        return config;
    },
    error => {
        Promise.reject(error);
    });
// Response interceptor for API calls
restApi.interceptors.response.use((response) => {

    return response
}, async function (error) {
    return error.response;
});

export default restApi;
