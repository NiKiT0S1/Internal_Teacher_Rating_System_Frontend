/**
 * Назначение: Показывает средние баллы по критериям в виде графика.
 * Использует библиотеку recharts для создания столбчатой диаграммы
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { clearAuth } from "../../services/auth";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

// Интерфейс для средних баллов. Является структурой для отображения списка средних баллов
interface AverageScore {
    criteriaName: string;
    averageScore: number;
}

// Компонент TeacherAveragesPage.
function TeacherAveragesPage() {
    const navigate = useNavigate();
    const [averages, setAverages] = useState<AverageScore[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // const [message, setMessage] = useState('');

    // Загрузка средних баллов при монтировании компонента
    useEffect(() => {
        const fetchAverages = async () => {
            try {
                const response = await api.get('/teacher/averages');
                // if (response.data.length === 0) {
                //     setMessage('No reviews available yet');
                // }
                setAverages(response.data);
                setLoading(false);
            }
            catch (err) {
                setError('Failed to load averages');
                setLoading(false);
            }
        };

        fetchAverages();
    }, []);

    // Очищение данных авторизации
    const handleLogout = () => {
        clearAuth();
        localStorage.removeItem('fullname');
        navigate('/login');
    };

    const fullname = localStorage.getItem('fullname') || 'Teacher';

    // Отображение страницы
    return (
        <div
            style={{
                minHeight: '100vh',
                minWidth: '100vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '40px 20px',
                background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)',
                overflowX: 'hidden'
            }}
        >
            <div className="d-flex justify-content-between align-items-center w-100 mb-4" style={{ maxWidth: '1200px' }}>
                <h2 className="text-white mb-0">Welcome, {fullname}!</h2>
                <button className="btn" style ={{background: 'linear-gradient(135deg,rgb(63, 206, 180) 0%, #ACB6E5 100%)'}} onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <h4 className="mb-4 text-white">Average Scores by Criteria:</h4>

            {/* {message && (
                <p className="text-white mb-3">{message}</p>
            )} */}

            <div
                style={{
                    maxHeight: '400px',
                    width: '100%',
                    maxWidth: '900px',
                    padding: 'auto',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}
            >
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : averages.length === 0 ? (
                    <p className="text-center">No reviews available yet.</p>
                ) : (
                    // <ul className="list-group">
                    //     {averages.map((item, index) => (
                    //         <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    //             {item.criteriaName}
                    //             <span className="badge bg-primary rounded-pill">{item.averageScore.toFixed(2)}</span>
                    //         </li>
                    //     ))}
                    // </ul>
                    // style={{padding: '25px'}}
                    
                    // Компонент барной диаграммы
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={averages} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="criteriaName" />
                            <YAxis domain={[0, 5]} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="averageScore" name="Average Score" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>

            <div className="mt-4 d-flex gap-3">
                <button className="btn btn-secondary" onClick={() => navigate('/teacher/reviews')}>
                    View Comments
                </button>
                {/* <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button> */}
            </div>
        </div>
    );
}

export default TeacherAveragesPage;