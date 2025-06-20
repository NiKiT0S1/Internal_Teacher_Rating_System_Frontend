import axios from 'axios';
import { getToken } from '../services/auth';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

/* 
    Adding a token to each request to secure endpoints.
    Without this, requests will be rejected with an access error.
    It is done once in the request service via 'interceptors'.
*/
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Error Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // console.warn('Unauthorized - maybe redirect to login?');
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.setItem('sessionExpired', 'true');

            window.location.href= '/login';
        }
        return Promise.reject(error);
    }
);

export default api;