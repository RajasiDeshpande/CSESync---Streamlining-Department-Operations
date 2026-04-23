import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';

const ClubDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/club/dashboard');
        setData(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
            <div className="absolute top-0 h-16 w-16 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>
          </div>
          <p className="font-bold text-gray-400 animate-pulse uppercase tracking-widest text-xs">Accessing Club Console...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Club Console</h1>
        <p className="text-gray-500 font-medium italic">Empowering {user?.name} community at AITR.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard 
          label="Total Events" 
          value={data?.stats?.totalEvents || 0} 
          color="purple" 
          icon={<i className="fa-solid fa-puzzle-piece"></i>}
        />
        <StatCard 
          label="Active Events" 
          value={data?.stats?.activeEvents || 0} 
          color="blue" 
          icon={<i className="fa-solid fa-fire-flame-curved"></i>}
        />
        <StatCard 
          label="Event History" 
          value={data?.stats?.pastEvents || 0} 
          color="gray" 
          icon={<i className="fa-solid fa-clock-rotate-left"></i>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Managed Events */}
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
             <h3 className="text-xl font-black text-gray-900 tracking-tight">Event Pipeline</h3>
             <button className="px-5 py-2.5 bg-purple-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-purple-700 transition-colors shadow-lg shadow-purple-100">
                Create New Event
             </button>
          </div>
          <div className="p-8">
            <div className="space-y-6">
              {data?.myEvents?.length > 0 ? (
                data.myEvents.map((event) => (
                  <div key={event._id} className="group relative p-6 rounded-[24px] bg-gray-50 border border-gray-100 hover:border-purple-200 hover:bg-white hover:shadow-xl transition-all duration-300">
                     <div className="flex justify-between items-start mb-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${new Date(event.date) >= new Date() ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                           {new Date(event.date) >= new Date() ? 'Upcoming' : 'Completed'}
                        </span>
                        <div className="flex gap-2">
                           <button className="h-8 w-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all shadow-sm">
                              <i className="fa-solid fa-pen-to-square text-xs"></i>
                           </button>
                           <button className="h-8 w-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-sm">
                              <i className="fa-solid fa-trash-can text-xs"></i>
                           </button>
                        </div>
                     </div>
                     <h4 className="font-bold text-gray-900 text-xl leading-tight mb-2">{event.title}</h4>
                     <p className="text-gray-500 text-sm line-clamp-2 mb-4 italic">{event.description}</p>
                     
                     <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                           <span className="flex items-center gap-2"><i className="fa-solid fa-calendar text-purple-400"></i> {new Date(event.date).toLocaleDateString()}</span>
                           <span className="flex items-center gap-2"><i className="fa-solid fa-location-dot text-purple-400"></i> {event.location}</span>
                        </div>
                        <div className="flex -space-x-2">
                           {[1,2,3].map(i => (
                             <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-gray-200"></div>
                           ))}
                           <div className="h-6 w-6 rounded-full border-2 border-white bg-purple-50 text-purple-600 flex items-center justify-center text-[10px] font-black">+12</div>
                        </div>
                     </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 px-10">
                   <div className="h-24 w-24 bg-purple-50 rounded-[32px] flex items-center justify-center mx-auto mb-6 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                      <i className="fa-solid fa-champagne-glasses text-purple-200 text-4xl"></i>
                   </div>
                   <h5 className="text-lg font-bold text-gray-900 mb-2">No events scheduled yet</h5>
                   <p className="text-gray-400 text-sm max-w-xs mx-auto">Start by creating your first event to engage with the department community.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visibility Score & History */}
        <div className="space-y-8">
           <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                 <i className="fa-solid fa-chart-line text-8xl"></i>
              </div>
              <div className="relative z-10">
                 <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-200 mb-4">Visibility Score</p>
                 <h2 className="text-5xl font-black mb-2">94%</h2>
                 <p className="text-sm font-medium text-indigo-100 opacity-80 mb-8 leading-relaxed">Your club is currently among the most active in the CSE department.</p>
                 <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-[94%]"></div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
              <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Broadcast History</h3>
              <div className="space-y-6">
                {data?.recentNotifications?.length > 0 ? (
                  data.recentNotifications.map((notif) => (
                    <div key={notif._id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-purple-500 before:rounded-full">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{new Date(notif.createdAt).toLocaleDateString()}</p>
                       <h5 className="font-bold text-[13px] text-gray-900 leading-tight">{notif.title}</h5>
                       <p className="text-xs text-gray-500 italic mt-1 line-clamp-1">{notif.message}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm italic">No recent broadcasts sent.</p>
                )}
                <button className="w-full py-3 bg-gray-50 text-gray-400 hover:text-purple-600 font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all">View All Activity</button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClubDashboard;
