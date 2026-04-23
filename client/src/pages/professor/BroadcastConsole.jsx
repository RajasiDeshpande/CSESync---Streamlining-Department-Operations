import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';

const BroadcastConsole = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [formData, setFormData] = useState({ title: '', message: '' });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/professor/dashboard');
        setCourses(res.data.data.assignedCourses);
        if (res.data.data.assignedCourses.length > 0) {
          setSelectedCourse(res.data.data.assignedCourses[0]._id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending broadcast...' });
    try {
      await api.post('/professor/broadcast', {
        courseId: selectedCourse,
        ...formData
      });
      setStatus({ type: 'success', message: 'Broadcast sent successfully!' });
      setFormData({ title: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to send broadcast' });
    }
  };

  if (loading) return null;

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Broadcast Console</h1>
        <p className="text-gray-500 font-medium italic">Communicate directly with your enrolled students across all batches.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white rounded-[40px] border border-gray-100 p-10 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Target Course</label>
              <div className="flex flex-wrap gap-3">
                {courses.map((course) => (
                  <button
                    key={course._id}
                    type="button"
                    onClick={() => setSelectedCourse(course._id)}
                    className={`px-5 py-3 rounded-2xl font-bold text-xs transition-all border ${selectedCourse === course._id ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'}`}
                  >
                    {course.code}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Message Headline</label>
              <input
                type="text"
                required
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="e.g., Assignment Deadline Extension"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Message Content</label>
              <textarea
                required
                rows="6"
                className="w-full bg-gray-50 border border-gray-100 rounded-3xl px-6 py-4 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                placeholder="Write your announcement here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            {status && (
              <div className={`p-4 rounded-2xl text-sm font-bold flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700' : status.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
                <div className={`h-2 w-2 rounded-full ${status.type === 'success' ? 'bg-green-500' : status.type === 'error' ? 'bg-red-500' : 'bg-blue-500 animate-pulse'}`}></div>
                {status.message}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[24px] font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3"
            >
              Dispatch Broadcast <i className="fa-solid fa-paper-plane text-[10px]"></i>
            </button>
          </form>
        </div>

        <div className="space-y-8">
           <div className="bg-blue-900 rounded-[40px] p-10 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-10 scale-150 rotate-12 group-hover:rotate-0 transition-all duration-700">
                 <i className="fa-solid fa-signal-stream text-9xl"></i>
              </div>
              <div className="relative z-10">
                 <h3 className="text-xl font-black mb-6 tracking-tight">Broadcasting Tips</h3>
                 <ul className="space-y-6">
                    <li className="flex gap-4 items-start italic opacity-80">
                       <i className="fa-solid fa-circle-check text-blue-400 mt-1"></i>
                       <span>Keep headlines concise and action-oriented for better engagement.</span>
                    </li>
                    <li className="flex gap-4 items-start italic opacity-80">
                       <i className="fa-solid fa-circle-check text-blue-400 mt-1"></i>
                       <span>Students will receive an immediate push notification and email alert.</span>
                    </li>
                    <li className="flex gap-4 items-start italic opacity-80">
                       <i className="fa-solid fa-circle-check text-blue-400 mt-1"></i>
                       <span>Broadcasts can be seen in the student's personal bulletin board history.</span>
                    </li>
                 </ul>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BroadcastConsole;
