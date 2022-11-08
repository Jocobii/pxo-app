import axios from 'axios';
import { getUserData } from '../features/user/utils/user.localstorage';

const BASE_URL = 'http://localhost:5000/api/v1';

const request = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    responseType: 'json',
});

// Token Expired
// eslint-disable-next-line max-len
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTY2NzY4MTY5MSwiZXhwIjoxNjY3Njg1MjkxfQ.JyuByoD4yrpFElj9XTcsM9lF0zNZpgcCwxPE4_uHKqQ

const getDefaultHeaders = () => {
    const accessToken = getUserData()?.accessToken;
    return {
        Authorization: `Bearer ${accessToken}`,
    };
};

const errorHandler = (response) => {
    // Logica para hacer reflesh del token
    if (response.response.status === 401) {
        console.log('Token Expired');
    }
    return response.response.data;
};

const fetcher = {
    get: (url, props) => request
        .get(url, {
            headers: getDefaultHeaders(),
            params: props,
        })
        .then((response) => response.data)
        .catch(errorHandler),

    post: (url, data) => request
        .post(url, data, {
            headers: getDefaultHeaders(),
        })
        .then((response) => response.data)
        .catch(errorHandler),
    put: (url, data) => request
        .put(url, data, {
            headers: getDefaultHeaders(),
        })
        .then((response) => response.data)
        .catch(errorHandler),
    delete: (url, data) => request
        .delete(url, data, {
            headers: getDefaultHeaders(),
        })
        .then((response) => response.data)
        .catch(errorHandler),
};

export default fetcher;
