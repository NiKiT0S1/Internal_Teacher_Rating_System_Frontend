/**
 * Назначение: Показывает все отзывы с комментариями и детальными оценками
 */

import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import api from "../../api/api";
import { clearAuth } from "../../services/auth";

// Интерфейс для отзывов. Является структурой для отображения списка отзывов
interface Review {
    id: string;
    semester: string;
    scores: {[key: string]: number};
    comment: string;
}

// Компонент TeacherReviewPage. Используется для отображения списка отзывов
function TeacherReviewPage() {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // const [message, setMessage] = useState('');

    // Загрузка отзывов при монтировании компонента
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await api.get('/teacher/reviews');
                // if (response.data.length === 0) {
                //     setMessage("No reviews available yet.");
                // }
                setReviews(response.data);
                setLoading(false);
            }
            catch (err) {
                setError("Failed to load reviews.");
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    // Очищение данных авторизации
    const handleLogout = () => {
        clearAuth();
        localStorage.removeItem('fullname');
        navigate('/login');
    }

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
                <h2 className="text-white mb-0">Your Reviews</h2>
                <button className="btn" style={{ background: 'linear-gradient(135deg,rgb(63, 206, 180) 0%, #ACB6E5 100%)' }} onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <br />

            {/* {message && (
                <p className="text-white mb-3">{message}</p>
            )} */}

            <div
                style={{
                    maxHeight: '500px',
                    overflowY: 'auto',
                    width: '100%',
                    maxWidth: '900px',
                    padding: '10px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}
            >
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : reviews.length === 0 ? (
                    <p className="text-center">No reviews available yet.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="card mb-3 p-3 shadow-sm">
                            <h5>Semester: {review.semester}</h5>
                            <p><strong>Comment:</strong> {review.comment}</p>
                            <ul className="list-group">
                                {Object.entries(review.scores).map(([criteria, score], index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        {criteria}
                                        <span className="badge bg-primary rounded-pill">{score}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-4 d-flex gap-3">
                <button className="btn btn-secondary" onClick={() => navigate('/teacher/averages')}>
                    Back to Averages
                </button>
            </div>
        </div>
    );
    
}

export default TeacherReviewPage;