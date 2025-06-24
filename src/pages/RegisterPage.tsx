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
    const [showPassword, setShowPassword] = useState(false);

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
        <div style={{
                minHeight: '100vh',
                minWidth: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)'
        }}>
            <div
                className="card p-4 shadow"
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    margin: '50px',
                    borderRadius: '12px',
                    animation: 'fadeIn 0.5s ease-in-out',
                    backgroundColor: '#fff'
                }}
            >    
                <h1 className="text-center mb-4">Teacher Review System</h1>

                <h2 className="text-center mb-4">Register</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
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
                        <label htmlFor="password" className="form-label">Password</label>
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
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">Fullname</label>
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            className="form-control"
                            placeholder="Enter fullname"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select name="role" id="role" className="form-select" value={form.role} onChange={handleChange} required>
                            <option value="STUDENT">Student</option>
                            <option value="TEACHER">Teacher</option>
                            <option value="MODERATOR">Moderator</option>
                        </select>
                    </div>
                    {form.role === 'TEACHER' && (
                        <div className="mb-3">
                            <label htmlFor="department" className="form-label">Department</label>
                            {/* <input
                                type="text"
                                name="department"
                                id="department"
                                className="form-control"
                                placeholder="Enter department"
                                value={form.department}
                                onChange={handleChange}
                                required={form.role === 'TEACHER'}
                            /> */}
                            <select name="department" id="department" className="form-select" value={form.department} onChange={handleChange} required>
                                <option value="">Select Department</option>
                                <option value="Software Engineering">Software Engineering</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Big Data Analysis">Big Data Analysis</option>
                                <option value="Cybersecurity">Cybersecurity</option>
                                <option value="Media Technologies">Media Technologies</option>
                                <option value="Smart Technologies">Smart Technologies</option>
                                <option value="Mathematical and Computational Science">Mathematical and Computational Science</option>
                            </select>
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary w-100" style={{ transition: 'background-color 0.3s ease' }}>Register</button>
                </form>
                <p className="mt-3 text-center">
                    Already have an account?{' '} <a href="/login" style={{ transition: 'color 0.3s ease' }}>Login</a>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;