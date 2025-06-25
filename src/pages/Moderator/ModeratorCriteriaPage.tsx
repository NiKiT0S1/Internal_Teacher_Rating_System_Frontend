/**
 * Назначение: Добавление и удаление критериев оценивания
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { clearAuth } from "../../services/auth";

// Интерфейс для критериев оценки. Является структурой для отображения списка критериев
interface Criteria {
    id: string;
    name: string;
}

// Компонент ModeratorCriteriaPage
function ModeratorCriteriaPage() {
    const navigate = useNavigate();
    const [criteriaList, setCriteriaList] = useState<Criteria[]>([]);
    const [newCriteria, setNewCriteria] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Загрузка критериев при монтировании компонента
    const fetchCriteria = async () => {
        try {
            const response = await api.get('/moderation/criteria');
            setCriteriaList(response.data);
            setLoading(false);
        }
        catch (err) {
            setError('Failed to load criteria');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCriteria();
    }, []);

    // Удаление критерия
    const handleDelete = async (id: string) => {
        try {
            // Переводим критерий в состояние "удаленного"
            await api.delete(`/moderation/criteria/${id}`);
            // Обновляем список критериев
            setCriteriaList(prev => prev.filter(c => c.id !== id));
        }
        catch (err) {
            alert('Failed to delete criteria');
        }
    };

    // Добавление нового критерия
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        // Проверка на пустую строку
        if (!newCriteria.trim()) {
            setError('Criteria name cannot be empty');
            return;
        }
        try {
            // Добавляем критерий
            await api.post('/moderation/criteria', {name: newCriteria});
            // Обновляем список критериев
            setNewCriteria('');
            setError('');
            fetchCriteria();
        }
        catch (err) {
            setError('Failed to add criteria');
        }
    };

    // Очищение данных авторизации
    const handleLogout = () => {
        clearAuth();
        localStorage.removeItem('fullname');
        navigate('/login');
    };

    // Отображение страницы
    return (
        <div
        style={{
            minHeight: '100vh',
            minWidth: '100vw',
            padding: '40px 20px',
            background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
        <div
            className="d-flex justify-content-between align-items-center w-100 mb-4"
            style={{ maxWidth: '800px' }}
        >
            <h2 className="text-white mb-0">Manage Criteria</h2>
            <button
                className="btn"
                style={{ background: 'linear-gradient(135deg,rgb(63, 206, 180) 0%, #ACB6E5 100%)' }}
                onClick={handleLogout}
            >
            Logout
            </button>
        </div>

        <div
            style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            maxWidth: '800px',
            width: '100%',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            }}
        >
            <h5>Existing Criteria</h5>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <ul className="list-group mb-4">
                    {criteriaList.map((crit) => (
                    <li key={crit.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {crit.name}
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(crit.id)}>
                        Delete
                        </button>
                    </li>
                    ))}
                </ul>
            )}

            <form onSubmit={handleAdd}>
            <div className="mb-3">
                <label htmlFor="newCriteria" className="form-label">Add New Criteria</label>
                <input
                    type="text"
                    className="form-control"
                    id="newCriteria"
                    value={newCriteria}
                    onChange={(e) => setNewCriteria(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">Add</button>
            </form>
        </div>

        <div className="mt-4">
            <button className="btn btn-secondary" onClick={() => navigate("/moderation/reviews")}>
            Back to Reviews
            </button>
        </div>
        </div>
  );

}

export default ModeratorCriteriaPage;