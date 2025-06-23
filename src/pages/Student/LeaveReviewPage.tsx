import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom"
import api from "../../api/api";

interface Criteria {
    id: string;
    name: string;
}

function LeaveReviewPage() {
    const {teacherId} = useParams<{teacherId: string}>();
    const navigate = useNavigate();
    const [criteria, setCriteria] = useState<Criteria[]>([]);
    const [scores, setScores] = useState<{[key: string]: number}>({});
    const [semester, setSemester] = useState('');
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCriteria = async () => {
            try {
                const response = await api.get('/reviews/criteria');
                setCriteria(response.data);
            }
            catch (err) {
                setError('Failed to load criteria.');
            }
        };

        fetchCriteria();
    }, []);

    const handleScoreChange = (criteriaId: string, value: number) => {
        setScores({...scores, [criteriaId]: value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (Object.keys(scores).length !== criteria.length) {
            setError('Please rate all criteria.');
            return;
        }

        try {
            await api.post('/reviews', {
                teacherId,
                scores,
                comment,
                semester
            });

            setMessage('Review submitted successfully!');
            setTimeout(() => navigate('/student/dashboard'), 1500);
        }
        catch (err: any) {
            if (err.response && err.response.status === 409) {
                setError('You have already submitted a review for this teacher this semester.');
            }
            else if (err.response && err.response.status === 400) {
                setError('Please fill in all required fields correctly.');
            }
            else {
                setError('Failed to submit review.');
            }
        }
    };

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
            <div className="d-flex justify-content-between align-items-center w-100 mb-4" style={{ maxWidth: '900px' }}>
                <h2 className="text-white mb-0">Leave a Review</h2>
                <button className="btn" style ={{background: 'linear-gradient(135deg,rgb(63, 206, 180) 0%, #ACB6E5 100%)'}} onClick={() => navigate('/student/dashboard')}>
                    Back
                </button>
            </div>

            <div
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}
            >
                {error && <div className="alert alert-danger">{error}</div>}
                {message && <div className="alert alert-success">{message}</div>}

                <form onSubmit={handleSubmit}>
                    {criteria.map((crit) => (
                        <div className="mb-3" key={crit.id}>
                            <label className="form-label">{crit.name} (1-5)</label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                required
                                className="form-control"
                                value={scores[crit.id] || ''}
                                onChange={(e) => handleScoreChange(crit.id, parseInt(e.target.value))}
                            />
                        </div>
                    ))}

                    <div className="mb-3">
                        <label className="form-label">Semester</label>
                        <select
                            className="form-select"
                            required
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                        >
                            <option value="">Select semester</option>
                            <option value="Spring 2025">Spring 2025</option>
                            <option value="Fall 2025">Fall 2025</option>
                            <option value="Spring 2026">Spring 2026</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Comment (optional)</label>
                        <textarea
                            className="form-control"
                            rows={3}
                            placeholder="Leave your comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Submit Review</button>
                </form>
            </div>
        </div>
    );
}

export default LeaveReviewPage;