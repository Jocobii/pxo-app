import axios from 'axios';
import { getUserData } from '../features/user/utils/user.localstorage';

const BASE_URL = 'http://localhost:5000/api/v1';

const accessToken = getUserData()?.accessToken;

const request = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    responseType: 'json',
    headers: {
        Authorization:
            `Bearer ${accessToken}`,
    },
});

const fetcher = {
    get: (url, props) => request
        .get(url, props)
        .then((response) => response.data)
        .catch((error) => error.response.data),

    post: (url, data) => request
        .post(url, data)
        .then((response) => response.data)
        .catch((error) => error.response.data),
    put: (url, data) => request
        .put(url, data)
        .then((response) => response.data)
        .catch((error) => error.response.data),
    delete: (url, data) => request
        .delete(url, data)
        .then((response) => response.data)
        .catch((error) => error.response.data),
};

export default fetcher;
