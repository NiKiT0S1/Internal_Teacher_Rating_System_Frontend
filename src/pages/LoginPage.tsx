import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { saveToken } from '../services/auth';

function LoginPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('sessionExpired') === 'true') {
            setError('Session expired. Please login again.');
            localStorage.removeItem('sessionExpired');
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', form);
            const {token, role} = response.data;

            saveToken(token, role);
            localStorage.setItem('fullname', response.data.fullname);

            if (role === 'STUDENT') navigate ('/student/dashboard');
            else if (role === 'TEACHER') navigate ('/teacher/reviews');
            else if (role === 'MODERATOR') navigate ('/moderator/reviews');
        }
        catch (err) {
            setError('Invalid username or password');
        }
    };

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