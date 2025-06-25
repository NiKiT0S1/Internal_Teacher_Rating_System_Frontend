/**
 * Назначение: Центральная настройка для всех HTTP запросов
 */

import axios from 'axios'; // Библиотека для HTTP запросов
import { getToken, clearAuth } from '../services/auth';
import { redirectToLogin } from '../utils/redirect';

// Создание базового экземпляра axios, которое будет использоваться для всех запросов
const api = axios.create({
    baseURL: 'http://localhost:8080',
});

/* 
    Adding a token to each request to secure endpoints.
    Without this, requests will be rejected with an access error.
    It is done once in the request service via 'interceptors'.
*/
// Автоматически добавляет токен к каждому запросу. Без этого запросы будут отклонены с ошибкой доступа.
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Error Interceptor
// Обработчик ошибок
api.interceptors.response.use(
    // Успешные запросы пропускаем
    (response) => response,
    (error) => {
        // При ошибках 401/403 (нет доступа) - очищаем сессию
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // console.warn('Unauthorized - maybe redirect to login?');
            
            // localStorage.removeItem('token');
            // localStorage.removeItem('role');
            
            // Очищаем токены, имя пользователя, уведомляем об истечении сессии
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

            // Перенаправляем на страницу входа
            redirectToLogin();
        }
        
        // Пропускаем все остальные ошибки
        return Promise.reject(error);
    }
);

export default api;