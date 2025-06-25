import axios from 'axios';
import { getToken, clearAuth } from '../services/auth';
import { redirectToLogin } from '../utils/redirect';

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
            
            // localStorage.removeItem('token');
            // localStorage.removeItem('role');
            clearAuth();
            localStorage.removeItem('fullname');
            localStorage.setItem('sessionExpired', 'true');

            // history.push('/login');
            // window.location.reload();
            // redirectToLogin();

            // setTimeout(() => {
            //     window.location.href= '/login';
            // }, 100);
            // window.location.href= '/login';
            redirectToLogin();
        }
        return Promise.reject(error);
    }
);

export default api;