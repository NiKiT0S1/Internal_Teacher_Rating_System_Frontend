import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
  return (
    // <Router>
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
        <Route path="/student/reviews" element={
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
        <Route path="/moderator/reviews" element={
          <PrivateRoute allowedRoles={['MODERATOR']}>
            <ModeratorReviewsPage />
          </PrivateRoute>
          } />
        <Route path="/moderator/criteria" element={
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