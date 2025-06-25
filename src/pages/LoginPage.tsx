/**
 * Назначение: Аутентификация пользователей
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { saveToken } from '../services/auth';

// Компонент LoginPage представляет страницу для аутентификации пользователей
function LoginPage() {
    // Используется для навигации между страницами
    const navigate = useNavigate();
    // Используется для управления состоянием компонента
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Проверка на истечение сессии
    useEffect(() => {
        const expired = localStorage.getItem('sessionExpired');
        // if (localStorage.getItem('sessionExpired') === 'true') {
        //     setError('Session expired. Please login again.');
        //     localStorage.removeItem('sessionExpired');
        // }
        if (expired === 'true') {
            setError('Session expired. Please login again.');
            localStorage.removeItem('sessionExpired');
        }
    }, []);

    // Обработка изменения полей формы
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Обработка отправки формы
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        // Отправка данных на сервер
        try {
            const response = await api.post('/auth/login', form);
            const {token, role} = response.data;

            // Сохранение данных авторизации в localStorage
            saveToken(token, role);
            localStorage.setItem('fullname', response.data.fullname);

            // Редирект в зависимости от роли
            if (role === 'STUDENT') navigate ('/student/dashboard');
            else if (role === 'TEACHER') navigate ('/teacher/averages');
            else if (role === 'MODERATOR') navigate ('/moderation/reviews');
        }
        // Обработка ошибок
        catch (err: any) {
            if (err.response && err.response.status === 403) {
                setError('Invalid username or password');
            }
            else {
                setError('Something went wrong. Please try again.');
            }
        }
    };

    // Рендер страницы
    return (
        <div
            style={{
                minHeight: '100vh',
                minWidth: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)'
            }}
        >
            <div
                className="card p-4 shadow"
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    borderRadius: '12px',
                    animation: 'fadeIn 0.5s ease-in-out',
                    backgroundColor: '#fff'
                }}
            >
                <h1 className="text-center mb-4">Teacher Review System</h1>

                <h2 className="text-center mb-4">Login</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="form-control"
                            placeholder="Enter username"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-check mt-2">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label className="form-check-label" htmlFor="showPassword">
                            Show password👁
                        </label>
                    </div>
                    <br />

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        style={{ transition: 'background-color 0.3s ease' }}
                    >
                        Login
                    </button>
                </form>

                <p className="mt-3 text-center">
                    Don't have an account?{' '}
                    <a href="/register" style={{ transition: 'color 0.3s ease' }}>
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;