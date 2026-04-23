import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';
import BroadcastModal from '../../components/dashboard/BroadcastModal';


const ProfessorDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();


  const fetchDashboard = async () => {
    try {
      const res = await api.get('/professor/dashboard');
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);


  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
            <div className="absolute top-0 h-16 w-16 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></div>
          </div>
          <p className="font-bold text-gray-400 animate-pulse uppercase tracking-widest text-xs">Loading Academic Workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DashboardLayout>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Academic Workspace</h1>
        <p className="text-gray-500 font-medium italic">Welcome, Prof. {user?.name.split(' ')[0]}. Manage your batches and curriculum.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard 
          label="Active Batches" 
          value={data?.stats?.totalCourses || 0} 
          color="teal" 
          icon={<i className="fa-solid fa-chalkboard-user"></i>}
        />
        <StatCard 
          label="Total Students" 
          value={data?.stats?.totalStudents || 0} 
          color="blue" 
          icon={<i className="fa-solid fa-users"></i>}
        />
        <StatCard 
          label="Announcements" 
          value={data?.stats?.announcementsSent || 0} 
          color="purple" 
          icon={<i className="fa-solid fa-paper-plane"></i>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course List */}
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
             <h3 className="text-xl font-black text-gray-900 tracking-tight">Active Courses</h3>
             <button className="text-xs font-black text-teal-600 uppercase tracking-widest">Manage All</button>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {data?.assignedCourses?.length > 0 ? (
                data.assignedCourses.map((course) => (
                  <div key={course._id} className="flex items-center justify-between p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-teal-100 transition-all hover:bg-white hover:shadow-md group">
                     <div className="flex items-center gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-xl font-black shadow-lg shadow-teal-200">
                           {course.code.substring(0, 2)}
                        </div>
                        <div>
                           <h4 className="font-bold text-gray-900 text-lg leading-tight">{course.name}</h4>
                           <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{course.code} • {course.credits} Credits</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-8">
                        <div className="hidden md:block text-right">
                           <p className="text-xl font-black text-gray-900">{course.enrolledStudents?.length || 0}</p>
                           <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Enrolled Students</p>
                        </div>
                        <button className="h-12 w-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-teal-600 hover:border-teal-200 transition-all shadow-sm">
                           <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                     </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                   <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fa-solid fa-folder-open text-gray-300 text-3xl"></i>
                   </div>
                   <p className="text-gray-400 font-medium italic">No courses currently assigned.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Tools & Recent History */}
        <div className="space-y-8">
           <div className="bg-gray-900 rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 h-40 w-40 bg-teal-600/20 rounded-full blur-3xl group-hover:bg-teal-600/30 transition-all duration-700"></div>
              <h3 className="text-lg font-black mb-6 relative z-10">Quick Actions</h3>
              <div className="space-y-4 relative z-10">
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center gap-4 transition-all border border-white/5 backdrop-blur-md"
                  >
                    <div className="h-10 w-10 bg-teal-500 rounded-xl flex items-center justify-center">
                       <i className="fa-solid fa-bullhorn text-sm"></i>
                    </div>
                    <span className="font-bold text-sm">Send Broadcast</span>
                 </button>

                 <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center gap-4 transition-all border border-white/5 backdrop-blur-md">
                    <div className="h-10 w-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                       <i className="fa-solid fa-file-export text-sm"></i>
                    </div>
                    <span className="font-bold text-sm">Export Attendance</span>
                 </button>
              </div>
           </div>

           <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
              <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Recent Sent</h3>
              <div className="space-y-6">
                {data?.recentAnnouncements?.length > 0 ? (
                  data.recentAnnouncements.map((notif) => (
                    <div key={notif._id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-teal-500 before:rounded-full">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{new Date(notif.createdAt).toLocaleDateString()}</p>
                       <h5 className="font-bold text-sm text-gray-900 leading-tight line-clamp-1">{notif.title}</h5>
                       <p className="text-xs text-gray-500 italic mt-1 truncate">{notif.message}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm italic">No recent broadcasts.</p>
                )}
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>

    <BroadcastModal 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onRefresh={fetchDashboard}
      courses={data?.assignedCourses || []}
    />
  </>
  );
};

export default ProfessorDashboard;

