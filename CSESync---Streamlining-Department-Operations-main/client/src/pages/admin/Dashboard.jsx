import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/admin/Sidebar';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/admin/dashboard');
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
          <div className="absolute top-0 h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
        <p className="font-bold text-gray-500 animate-pulse uppercase tracking-widest text-xs">Initializing Secure Session...</p>
      </div>
    </div>
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-72 p-10">
        {/* Top greeting section */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-blue-600 font-black uppercase tracking-widest text-[10px] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 italic">
              System Overview
            </span>
            <h1 className="text-4xl font-black text-gray-900 mt-2 tracking-tight">
              Welcome back, {user?.name.split(' ')[0]}
            </h1>
            <p className="text-gray-500 mt-1 font-medium italic">Here's what's happening with the department today.</p>
          </div>
          
          <div className="flex gap-3">
             <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 px-4">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-ping"></div>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-tighter">Server Live</span>
             </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Active Sessions', val: '24', color: 'blue', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
            { label: 'Pending Requests', val: '08', color: 'amber', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'System Health', val: '99%', color: 'green', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
            { label: 'Total Events', val: '156', color: 'purple', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
              <div className={`h-12 w-12 rounded-2xl bg-${stat.color}-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <svg className={`h-6 w-6 text-${stat.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <h3 className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">{stat.label}</h3>
              <p className="text-3xl font-black text-gray-900 tracking-tighter">{stat.val}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main info panel */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">Department Activity Feed</h2>
                  <button className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:underline">View All</button>
               </div>
               <div className="p-8">
                  <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                     <div className="h-10 w-10 text-gray-400 mb-2">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                     </div>
                     <p className="text-gray-500 font-bold italic">Latest API Response: <span className="text-blue-600 not-italic">"{data?.message}"</span></p>
                  </div>
               </div>
            </div>
          </div>

          {/* Side action panel */}
          <div className="space-y-8">
             <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white shadow-xl shadow-blue-500/20">
                <h3 className="text-lg font-black tracking-tight mb-2 italic underline decoration-blue-400">Admin Quick Access</h3>
                <p className="text-blue-100 text-sm mb-6 leading-relaxed">You have full system privileges. Use items below to manage the platform core.</p>
                <div className="space-y-3">
                   {['User Registrations', 'Platform Logs', 'Security Keys'].map(action => (
                     <button key={action} className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl text-left text-sm font-bold transition-all border border-white/5 backdrop-blur-md flex justify-between items-center group">
                        {action}
                        <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                     </button>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
