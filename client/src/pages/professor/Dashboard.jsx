import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ProfessorDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/professor/dashboard');
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div></div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Professor Dashboard</h1>
            <p className="text-gray-500 mt-1">Academic Leadership & Mentorship</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {user?.role}
            </span>
            <button 
              onClick={logout}
              className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Backend Message</h3>
            <p className="text-xl font-bold text-gray-900">{data?.message}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Professor Profile</h3>
            <p className="text-xl font-bold text-gray-900">{user?.name}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Faculty Role</h3>
            <p className="text-xl font-bold text-teal-600">Active</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
            <div className="bg-teal-50 p-4 rounded-full mb-4">
                <svg className="h-12 w-12 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic Modules</h2>
            <p className="text-gray-600 max-w-lg mb-6">
              You are successfully authenticated. The professor workspace will soon allow you to manage courses, view student progress, and organize departmental activities.
            </p>
            <div className="flex gap-4">
                <div className="px-4 py-2 bg-teal-50 text-teal-700 rounded-lg text-sm font-bold">Course Management</div>
                <div className="px-4 py-2 bg-teal-50 text-teal-700 rounded-lg text-sm font-bold">Student Guidance</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashboard;
