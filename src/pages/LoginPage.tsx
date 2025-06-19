import { useState } from 'react';
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

            if (role === 'STUDENT') navigate ('/student/dashboard');
            else if (role === 'TEACHER') navigate ('/teacher/reviews');
            else if (role === 'MODERATOR') navigate ('/moderator/reviews');
        }
        catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div style={{padding: '20px'}}>
            <h2>Login</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                 />
                 <br />
                 <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                 />
                 <br />
                 <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
}

export default LoginPage;