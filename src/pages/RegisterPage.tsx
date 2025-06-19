import { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: '',
        email: '',
        fullName: '',
        role: 'STUDENT',
        department: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.role === 'TEACHER' && !form.department.trim()) {
            setError('Department is required for teachers');
            return;
        }
        try {
            await api.post('/auth/register', form);
            navigate('/login');
        }
        catch(err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div style={{padding: '20px'}}>
            <h2>Register</h2>
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
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                />
                <br />
                <select name="role" value={form.role} onChange={handleChange} required>
                    <option value="STUDENT">Student</option>
                    <option value="TEACHER">Teacher</option>
                    <option value="MODERATOR">Moderator</option>
                </select>
                <br />
                {form.role === 'TEACHER' && (
                    <>
                        <input
                            type="text"
                            name="department"
                            placeholder="Department"
                            value={form.department}
                            onChange={handleChange}
                            required
                        />
                        <br />
                    </>
                )}
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
}

export default RegisterPage;