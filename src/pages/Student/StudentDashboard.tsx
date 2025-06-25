/**
 * Назначение: Показывает список преподавателей для оценки
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { clearAuth } from "../../services/auth";

// Интерфейс для преподавателей. Он содержит идентификатор, имя и департамент. Является структурой для отображения списка преподавателей
interface Teacher {
    id: string;
    fullname: string;
    department: string;
}

// Компонент для отображения списка преподавателей
function StudentDashboard() {
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Загрузка списка преподавателей при монтировании компонента
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await api.get('/reviews/teachers');
                // Функция для загрузки списка преподавателей
                setTeachers(response.data);
                // Установка флага загрузки в false
                setLoading(false);
            }
            catch (err) {
                setError('Failed to load teachers');
                setLoading(false);
            }
        };

        // Вызов функции загрузки списка преподавателей
        fetchTeachers();
    }, []);

    // Навигация к форме оценивания конкретного преподавателя
    const handleLeaveReview = (teacherId: string) => {
        navigate(`/student/reviews/${teacherId}`);
    };

    // Очищение данных авторизации
    const handleLogout = () => {
        clearAuth();
        localStorage.removeItem('fullname');
        navigate('/login');
    }

    // Получение имени пользователя
    const fullname = localStorage.getItem('fullname') || 'Student';

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

            <h4 className="mb-4 text-white">Available Teachers:</h4>

            {loading ? (
                <p className="text-white">Loading...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px',
                        width: '100%',
                        maxWidth: '1200px',
                        padding: '20px',
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                        overflowY: 'auto',
                        maxHeight: '600px'
                    }}
                >
                    {teachers.map((teacher) => (
                        <div key={teacher.id} className="card p-3 shadow-sm text-center">
                            <h5>{teacher.fullname}</h5>
                            <p>{teacher.department}</p>
                            <button
                                className="btn btn-primary w-100"
                                onClick={() => handleLeaveReview(teacher.id)}
                            >
                                Leave Review
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default StudentDashboard;