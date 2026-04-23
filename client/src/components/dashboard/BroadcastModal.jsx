import React, { useState } from 'react';
import api from '../../services/api';

const BroadcastModal = ({ isOpen, onClose, onRefresh, courses = [] }) => {
  const [formData, setFormData] = useState({
    courseId: '',
    title: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/professor/broadcast', formData);
      onRefresh();
      onClose();
      setFormData({ courseId: '', title: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-teal-50/50">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">New Broadcast</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-2xl border border-red-100">{error}</p>}
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Select Course</label>
            <select 
              required
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-bold appearance-none"
              value={formData.courseId}
              onChange={(e) => setFormData({...formData, courseId: e.target.value})}
            >
              <option value="">Target Course</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>{course.name} ({course.code})</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Subject</label>
            <input 
              type="text" 
              required
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
              placeholder="e.g. Tomorrow's Lab Session"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Message Content</label>
            <textarea 
              rows="4"
              required
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium resize-none"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-teal-600 text-white shadow-xl shadow-teal-500/20 hover:bg-teal-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Sending...' : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  Blast Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BroadcastModal;
