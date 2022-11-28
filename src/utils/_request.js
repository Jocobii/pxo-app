/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { getUserData, saveUserData } from '../features/user/utils/user.localstorage';

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: false,
    responseType: 'json',
});

request.interceptors.request.use(
    (config) => {
        // eslint-disable-next-line no-param-reassign
        config.headers = {
            Authorization: `Bearer ${getUserData()?.accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

const refreshToken = async () => {
    const userData = getUserData();
    const { data } = await request.post('/auth/refresh-token', { currentToken: userData?.accessToken });
    if (data.error) return null;
    if (data.data.accessToken) saveUserData({ ...userData, accessToken: data.data.accessToken });
    return data.accessToken;
};

// Response interceptor for API calls
request.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        console.log('Refresh Token');
        originalRequest._retry = true;
        const accessToken = await refreshToken();
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        return request(originalRequest);
    }
    return Promise.reject(error);
});

const errorHandler = (response) => {
    if (response.response.status === 401) {
        console.log('Token Expired');
    }
    return response.response.data;
};

const fetcher = {
    get: (url, props) => request
        .get(url, {
            params: { ...props, agency_id: getUserData()?.agency_id },
        })
        .then((response) => response.data)
        .catch(errorHandler),

    post: (url, data) => request
        .post(url, data, {
        })
        .then((response) => response.data)
        .catch(errorHandler),
    put: (url, data) => request
        .put(url, data, {
        })
        .then((response) => response.data)
        .catch(errorHandler),
    delete: (url, data) => request
        .delete(url, {
            data,
        })
        .then((response) => response.data)
        .catch(errorHandler),
};

export default fetcher;
