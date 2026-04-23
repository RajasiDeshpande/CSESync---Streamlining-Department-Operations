import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import PublicRoute from '../components/auth/PublicRoute';

// Pages
import Landing from '../pages/Landing';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import UserManagement from '../pages/admin/UserManagement';
import Courses from '../pages/admin/Courses';
import Departments from '../pages/admin/Departments';
import Events from '../pages/admin/Events';
import Notifications from '../pages/admin/Notifications';
import Reports from '../pages/admin/Reports';
import Settings from '../pages/admin/Settings';

import StudentDashboard from '../pages/student/Dashboard';
import MyCourses from '../pages/student/MyCourses';
import EventsExplorer from '../pages/student/EventsExplorer';
import NotificationCenter from '../pages/student/NotificationCenter';

import ProfessorDashboard from '../pages/professor/Dashboard';
import BatchDetail from '../pages/professor/BatchDetail';
import BroadcastConsole from '../pages/professor/BroadcastConsole';

import ClubDashboard from '../pages/club/Dashboard';
import EventManager from '../pages/club/EventManager';
import ClubMembers from '../pages/club/ClubMembers';

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
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/courses" element={<Courses />} />
        <Route path="/admin/departments" element={<Departments />} />
        <Route path="/admin/events" element={<Events />} />
        <Route path="/admin/notifications" element={<Notifications />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>

      {/* Student Routes */}
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/courses" element={<MyCourses />} />
        <Route path="/student/events" element={<EventsExplorer />} />
        <Route path="/student/announcements" element={<NotificationCenter />} />
      </Route>

      {/* Professor Routes */}
      <Route element={<ProtectedRoute allowedRoles={['professor']} />}>
        <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
        <Route path="/professor/courses" element={<BatchDetail />} />
        <Route path="/professor/broadcast" element={<BroadcastConsole />} />
      </Route>

      {/* Club Routes */}
      <Route element={<ProtectedRoute allowedRoles={['club']} />}>
        <Route path="/club/dashboard" element={<ClubDashboard />} />
        <Route path="/club/events" element={<EventManager />} />
        <Route path="/club/members" element={<ClubMembers />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
