import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import PublicRoute from '../components/auth/PublicRoute';

// Pages
import Landing from '../pages/Landing';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AdminDashboard from '../pages/admin/Dashboard';
import StudentDashboard from '../pages/student/Dashboard';
import ProfessorDashboard from '../pages/professor/Dashboard';
import ClubDashboard from '../pages/club/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Auth Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Student Routes */}
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Route>

      {/* Professor Routes */}
      <Route element={<ProtectedRoute allowedRoles={['professor']} />}>
        <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
      </Route>

      {/* Club Routes */}
      <Route element={<ProtectedRoute allowedRoles={['club']} />}>
        <Route path="/club/dashboard" element={<ClubDashboard />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
