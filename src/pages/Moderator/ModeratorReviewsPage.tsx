import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { clearAuth } from '../../services/auth';


interface Review {
    id: string;
    semester: string;
    comment: string;
    hidden: boolean;
    scores: {[criteriaName: string]: number};
    teacherFullname: string;
    teacherUsername: string;
}


function ModeratorReviewsPage() {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    const fetchReviews = async () => {
            try {
                const response = await api.get('/moderation/reviews');
                setReviews(response.data);
                // console.log(response.data);
                setLoading(false);
            }
            catch (err) {
                setError('Failed to load reviews');
                setLoading(false);
            }
    };
    
    useEffect(() => {
        // const fetchReviews = async () => {
        //     try {
        //         const response = await api.get('/moderation/reviews');
        //         setReviews(response.data);
        //         setLoading(false);
        //     }
        //     catch (err) {
        //         setError('Failed to load reviews');
        //         setLoading(false);
        //     }
        // };

        fetchReviews();
    }, []);

    const handleToggleVisibility = async (id: string, hide: boolean) => {
        try {
            const endpoint = `/moderation/reviews/${id}/${hide ? 'hide': 'show'}`;
            await api.patch(endpoint);
            // fetchReviews();
            setReviews((prev) => 
                prev.map((review) =>
                    review.id === id ? {...review, hidden: hide} : review
                )
            );
            // const response = await api.get('/moderation/reviews');
            // setReviews(response.data);
        }
        catch (err) {
            alert("Failed to update review visibility");
        }
    };

    const handleLogout = () => {
        clearAuth();
        localStorage.removeItem('fullname');
        navigate('/login');
    }

    return (
        <div
        style={{
            minHeight: "100vh",
            minWidth: "100vw",
            padding: "40px 20px",
            background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}
        >
        <div
            className="d-flex justify-content-between align-items-center w-100 mb-4"
            style={{ maxWidth: "1200px" }}
        >
            <h2 className="text-white mb-0">Moderator Panel</h2>
            <button
            className="btn" 
            style={{ background: 'linear-gradient(135deg,rgb(63, 206, 180) 0%, #ACB6E5 100%)' }}
            onClick={handleLogout}
            >
            Logout
            </button>
        </div>

        <h4 className="mb-4 text-white">All Reviews</h4>

        <div
            className="table-responsive"
            style={{
            width: "100%",
            maxWidth: "1200px",
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
        >
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Teacher</th>
                            <th>Semester</th>
                            <th>Scores</th>
                            <th>Comment</th>
                            <th>Status</th>
                            <th style={{ minWidth: "130px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {reviews.map((review) => (
                    <tr key={review.id}>
                        <td>
                            <strong>{review.teacherFullname}</strong>
                            <br />
                            <small className="text-muted">{review.teacherUsername}</small>
                        </td>
                        <td>{review.semester || "N/A"}</td>
                            <td>
                                {Object.entries(review.scores).map(([criteria, score]) => (
                                <div key={criteria}>
                                    <strong>{criteria}</strong>: {score}
                                </div>
                                ))}
                            </td>
                        <td>{review.comment || "-"}</td>
                        <td>
                            {review.hidden ? (
                                <span className="badge bg-danger">Hidden</span>
                            ) : (
                                <span className="badge bg-success">Visible</span>
                            )}
                        </td>
                        <td>
                            <button
                                className={`btn btn-${review.hidden ? "success" : "warning"} btn-sm`}
                                onClick={() => handleToggleVisibility(review.id, !review.hidden)}
                            >
                                {review.hidden ? "Show" : "Hide"}
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>

        <div className="mt-4">
            <button className="btn btn-secondary" onClick={() => navigate("/moderation/criteria")}>
                Manage Criteria
            </button>
        </div>
        </div>
  );
}

export default ModeratorReviewsPage;