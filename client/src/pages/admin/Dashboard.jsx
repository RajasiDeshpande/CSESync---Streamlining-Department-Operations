import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';
import ChartCard from '../../components/dashboard/ChartCard';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return null;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">System Analytics</h1>
        <p className="text-gray-500 font-medium italic">Your department's performance at a glance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          label="Total Students" 
          value={stats?.totalStudents || 0} 
          color="blue" 
          trend={12}
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
        />
        <StatCard 
          label="Total Professors" 
          value={stats?.totalProfessors || 0} 
          color="indigo" 
          trend={5}
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
        />
        <StatCard 
          label="Active Clubs" 
          value={stats?.totalClubs || 0} 
          color="purple" 
          trend={0}
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        />
        <StatCard 
          label="Available Courses" 
          value={stats?.totalCourses || 0} 
          color="orange" 
          trend={8}
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <ChartCard 
          title="Student Registrations" 
          data={stats?.monthlyRegistrations || []} 
          color="blue"
        />
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-[32px] p-10 text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute -top-24 -right-24 h-64 w-64 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/30 transition-all duration-700"></div>
           <div className="relative z-10 flex flex-col h-full">
              <span className="text-blue-400 font-black uppercase tracking-[0.2em] text-[10px] mb-4">Quick Actions</span>
              <h3 className="text-2xl font-black mb-6 leading-tight">Manage your department<br />efficiency with one click.</h3>
              <div className="grid grid-cols-2 gap-4 mt-auto">
                 <button className="bg-white/10 hover:bg-white/20 p-5 rounded-3xl text-left transition-all border border-white/5 backdrop-blur-md group/btn">
                    <div className="h-10 w-10 bg-blue-500 rounded-xl flex items-center justify-center mb-3 group-hover/btn:scale-110 transition-transform">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </div>
                    <p className="font-bold text-sm">Add New Student</p>
                 </button>
                 <button className="bg-white/10 hover:bg-white/20 p-5 rounded-3xl text-left transition-all border border-white/5 backdrop-blur-md group/btn">
                    <div className="h-10 w-10 bg-indigo-500 rounded-xl flex items-center justify-center mb-3 group-hover/btn:scale-110 transition-transform">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    </div>
                    <p className="font-bold text-sm">Broadcast Message</p>
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Pending Events Summary */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">System Health & Live Monitoring</h3>
            <div className="flex gap-2">
               <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
               <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Active Connection</span>
            </div>
         </div>
         <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-bold">API Server Status</span>
                  <span className="text-green-600 font-black">OPERATIONAL</span>
               </div>
               <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[98%]"></div>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-bold">Database Latency</span>
                  <span className="text-blue-600 font-black">24ms</span>
               </div>
               <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[15%]"></div>
               </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-100 flex items-center justify-center text-center">
               <p className="text-gray-400 text-sm font-medium italic italic leading-relaxed">System logs indicate high platform activity. Ensure all club event requests are reviewed before the weekend.</p>
            </div>
         </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
