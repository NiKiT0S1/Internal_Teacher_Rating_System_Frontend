/**
 * Назначение: Настройка маршрутизации и защищенных роутов
 */


// import {useEffect} from 'react';
// import { isTokenExpired } from './services/auth';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentDashboard from "./pages/Student/StudentDashboard";
import LeaveReviewPage from "./pages/Student/LeaveReviewPage";
import TeacherReviewsPage from "./pages/Teacher/TeacherReviewsPage";
import TeacherAveragesPage from "./pages/Teacher/TeacherAveragesPage";
import ModeratorReviewsPage from "./pages/Moderator/ModeratorReviewsPage";
import ModeratorCriteriaPage from "./pages/Moderator/ModeratorCriteriaPage";
  

function App() {

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isTokenExpired()) {
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('role');
  //     navigate('/login');
  //   }
  // }, []);

  return (
    // <Router>
    
    // Определяет все маршруты приложения с защитой по ролям
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* STUDENT Page */}
        <Route path="/student/dashboard" element={
          <PrivateRoute allowedRoles={['STUDENT']}>
            <StudentDashboard />
          </PrivateRoute>
          } />
        <Route path="/student/reviews/:teacherId" element={
          <PrivateRoute allowedRoles={['STUDENT']}>
            <LeaveReviewPage />
          </PrivateRoute>
          } />

        {/* TEACHER Page */}
        <Route path="/teacher/reviews" element={
          <PrivateRoute allowedRoles={['TEACHER']}>
            <TeacherReviewsPage />
          </PrivateRoute>
          } />
        <Route path="/teacher/averages" element={
          <PrivateRoute allowedRoles={['TEACHER']}>
            <TeacherAveragesPage />
          </PrivateRoute>
          } />

        {/* MODERATOR Page */}
        <Route path="/moderation/reviews" element={
          <PrivateRoute allowedRoles={['MODERATOR']}>
            <ModeratorReviewsPage />
          </PrivateRoute>
          } />
        <Route path="/moderation/criteria" element={
          <PrivateRoute allowedRoles={['MODERATOR']}>
            <ModeratorCriteriaPage />
          </PrivateRoute>
          } />

        {/* For non-exists routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    // </Router>
  );
}

export default App;