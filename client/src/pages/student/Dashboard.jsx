import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/student/dashboard');
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
            <div className="absolute top-0 h-16 w-16 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          </div>
          <p className="font-bold text-gray-400 animate-pulse uppercase tracking-widest text-xs">Syncing Academic Data...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Student Portal</h1>
        <p className="text-gray-500 font-medium italic">Welcome back, {user?.name}. Here's your academic summary.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard 
          label="Enrolled Courses" 
          value={data?.stats?.enrolledCourses || 0} 
          color="blue" 
          icon={<i className="fa-solid fa-book-open"></i>}
        />
        <StatCard 
          label="Campus Events" 
          value={data?.stats?.upcomingEvents || 0} 
          color="indigo" 
          icon={<i className="fa-solid fa-calendar-star"></i>}
        />
        <StatCard 
          label="Unread Alerts" 
          value={data?.stats?.unreadNotifications || 0} 
          color="purple" 
          icon={<i className="fa-solid fa-bell"></i>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Campus Radar - Events */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-black text-gray-900 tracking-tight">Campus Radar</h3>
             <span className="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">New Events</span>
          </div>
          <div className="space-y-4">
            {data?.upcomingEvents?.length > 0 ? (
              data.upcomingEvents.map((event) => (
                <div key={event._id} className="flex items-center gap-6 p-4 rounded-3xl bg-gray-50 border border-gray-100 hover:border-indigo-100 transition-all hover:bg-white hover:shadow-md group">
                   <div className="h-16 w-16 rounded-2xl bg-white flex flex-col items-center justify-center shadow-sm border border-gray-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <span className="text-[10px] font-black uppercase tracking-tighter opacity-60 leading-none mb-1">
                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                      </span>
                      <span className="text-xl font-black leading-none">
                        {new Date(event.date).getDate()}
                      </span>
                   </div>
                   <div className="flex-1">
                      <h4 className="font-bold text-gray-900 leading-tight mb-1">{event.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-gray-400 font-bold">
                        <span className="flex items-center gap-1"><i className="fa-solid fa-location-dot"></i> {event.location}</span>
                        <span className="h-1 w-1 rounded-full bg-gray-200"></span>
                        <span className="uppercase">{event.category}</span>
                      </div>
                   </div>
                   <button className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-200 transition-all group-hover:bg-indigo-50">
                      <i className="fa-solid fa-chevron-right text-xs"></i>
                   </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic py-4">No upcoming events found.</p>
            )}
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <i className="fa-solid fa-bullhorn text-8xl -rotate-12"></i>
          </div>
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-xl font-black tracking-tight">Recent Announcements</h3>
               <div className="flex gap-1.5">
                 <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                 <div className="h-1.5 w-1.5 rounded-full bg-blue-400/40"></div>
                 <div className="h-1.5 w-1.5 rounded-full bg-blue-400/20"></div>
               </div>
            </div>
            <div className="space-y-6 flex-1">
              {data?.recentNotifications?.length > 0 ? (
                data.recentNotifications.map((notif) => (
                  <div key={notif._id} className="group cursor-pointer">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 opacity-80">
                      {new Date(notif.createdAt).toLocaleDateString()} • FROM {notif.category || 'SYSTEM'}
                    </p>
                    <h4 className="font-bold text-lg leading-tight group-hover:text-blue-300 transition-colors">{notif.title}</h4>
                    <p className="text-sm text-indigo-200/60 line-clamp-1 mt-1">{notif.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-indigo-300 italic opacity-50">No new announcements at this time.</p>
              )}
            </div>
            <button className="mt-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl w-full text-xs font-black uppercase tracking-[0.2em] transition-all border border-white/5 backdrop-blur-md">
              View All Alerts
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
