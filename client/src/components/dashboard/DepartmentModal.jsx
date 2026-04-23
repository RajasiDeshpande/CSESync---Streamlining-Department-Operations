import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const DepartmentModal = ({ isOpen, onClose, onRefresh, department = null, professors = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    hod: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
        code: department.code,
        hod: department.hod?._id || '',
        description: department.description || '',
      });
    } else {
      setFormData({
        name: '',
        code: '',
        hod: '',
        description: '',
      });
    }
  }, [department, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (department) {
        await api.put(`/admin/departments/${department._id}`, formData);
      } else {
        await api.post('/admin/departments', formData);
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
            {department ? 'Edit Department' : 'Add New Department'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-2xl border border-red-100">{error}</p>}
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Department Name</label>
            <input 
              type="text" 
              required
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
              placeholder="e.g. Computer Science & Engineering"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Department Code</label>
            <input 
              type="text" 
              required
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
              placeholder="e.g. CSE"
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Head of Department (HOD)</label>
            <select 
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold appearance-none"
              value={formData.hod}
              onChange={(e) => setFormData({...formData, hod: e.target.value})}
            >
              <option value="">Select HOD</option>
              {professors.map(prof => (
                <option key={prof._id} value={prof._id}>{prof.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
            <textarea 
              rows="3"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium resize-none"
              placeholder="Brief description of the department..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
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
              className="flex-1 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              {loading ? 'Saving...' : department ? 'Update Dept' : 'Create Dept'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentModal;
