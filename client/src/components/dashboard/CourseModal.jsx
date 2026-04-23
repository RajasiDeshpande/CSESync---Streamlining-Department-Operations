import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const CourseModal = ({ isOpen, onClose, onRefresh, course = null, departments = [], professors = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    department: '',
    professor: '',
    credits: 3,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name,
        code: course.code,
        department: course.department?._id || '',
        professor: course.professor?._id || '',
        credits: course.credits || 3,
      });
    } else {
      setFormData({
        name: '',
        code: '',
        department: departments.length > 0 ? departments[0]._id : '',
        professor: '',
        credits: 3,
      });
    }
  }, [course, isOpen, departments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (course) {
        await api.put(`/admin/courses/${course._id}`, formData);
      } else {
        await api.post('/admin/courses', formData);
      }
      onRefresh();
      onClose();
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
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            {course ? 'Edit Course' : 'Add New Course'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-2xl border border-red-100">{error}</p>}
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Course Name</label>
            <input 
              type="text" 
              required
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              placeholder="e.g. Data Structures"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Course Code</label>
            <input 
              type="text" 
              required
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
              placeholder="e.g. CS201"
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Department</label>
               <select 
                 required
                 className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold appearance-none"
                 value={formData.department}
                 onChange={(e) => setFormData({...formData, department: e.target.value})}
               >
                 <option value="">Select Dept</option>
                 {departments.map(dept => (
                   <option key={dept._id} value={dept._id}>{dept.code}</option>
                 ))}
               </select>
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Credits</label>
               <input 
                 type="number" 
                 min="1"
                 max="10"
                 required
                 className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                 value={formData.credits}
                 onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})}
               />
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Assign Professor</label>
            <select 
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold appearance-none"
              value={formData.professor}
              onChange={(e) => setFormData({...formData, professor: e.target.value})}
            >
              <option value="">Select Professor</option>
              {professors.map(prof => (
                <option key={prof._id} value={prof._id}>{prof.name}</option>
              ))}
            </select>
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
              className="flex-1 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-blue-600 text-white shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {loading ? 'Saving...' : course ? 'Update Course' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
