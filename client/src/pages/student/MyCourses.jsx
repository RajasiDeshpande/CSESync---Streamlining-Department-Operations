import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';

const MyCourses = () => {
  const [enrolled, setEnrolled] = useState([]);
  const [available, setAvailable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('enrolled');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrolledRes, availableRes] = await Promise.all([
          api.get('/student/courses'),
          api.get('/courses') // assuming we have a general course list or filter
        ]);
        setEnrolled(enrolledRes.data.data);
        // Filter out already enrolled
        const enrolledIds = enrolledRes.data.data.map(c => c._id);
        setAvailable(availableRes.data.data.filter(c => !enrolledIds.includes(c._id)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEnroll = async (id) => {
    try {
      await api.post(`/student/courses/${id}/enroll`);
      // Refresh list
      const res = await api.get('/student/courses');
      setEnrolled(res.data.data);
      setAvailable(available.filter(c => c._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to enroll');
    }
  };

  if (loading) return null;

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Academic Modules</h1>
        <p className="text-gray-500 font-medium italic">Manage your curriculum and explore new learning paths.</p>
      </div>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('enrolled')}
          className={`px-6 py-3 rounded-2xl font-bold text-sm tracking-tight transition-all ${activeTab === 'enrolled' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-100'}`}
        >
          My Enrolled Courses ({enrolled.length})
        </button>
        <button 
          onClick={() => setActiveTab('available')}
          className={`px-6 py-3 rounded-2xl font-bold text-sm tracking-tight transition-all ${activeTab === 'available' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-100'}`}
        >
          Browse Available ({available.length})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {(activeTab === 'enrolled' ? enrolled : available).map((course) => (
          <div key={course._id} className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <div className="h-14 w-14 rounded-2xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center text-xl font-black italic">
                {course.code.substring(0, 2)}
              </div>
              <span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400">
                {course.credits} Credits
              </span>
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{course.name}</h3>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-tighter mb-6">{course.code} • Prof. {course.professor?.name || 'Assigned'}</p>
            
            {activeTab === 'available' ? (
              <button 
                onClick={() => handleEnroll(course._id)}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-100"
              >
                Enroll Now
              </button>
            ) : (
              <button className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest cursor-default">
                Access Materials
              </button>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default MyCourses;
