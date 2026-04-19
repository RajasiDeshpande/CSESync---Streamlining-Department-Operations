import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ClubDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/club/dashboard');
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Club Dashboard</h1>
            <p className="text-gray-500 mt-1">Events & Community Engagement</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
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
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Club Profile</h3>
            <p className="text-xl font-bold text-gray-900">{user?.name}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Membership Status</h3>
            <p className="text-xl font-bold text-orange-600">Active</p>
          </div>
        </div>

        <div className="bg-orange-600 rounded-2xl p-8 text-white shadow-lg overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Event Hub & Collaboration</h2>
                <p className="text-orange-100 mb-6">
                Welcome to the specialized workspace for department clubs. Your authentication is complete, and you'll soon be able to manage events, track member participation, and coordinate with the department administration.
                </p>
                <button className="bg-white text-orange-600 px-6 py-2 rounded-xl font-bold hover:bg-orange-50 transition-colors">Create New Event</button>
            </div>
            <div className="hidden md:block">
                <svg className="h-32 w-32 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDashboard;
