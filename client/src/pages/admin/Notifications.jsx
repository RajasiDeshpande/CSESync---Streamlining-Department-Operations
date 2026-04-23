import React, { useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';

const Notifications = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    target: 'all'
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      // Map 'target' to proper recipientRole field for the backend
      await api.post('/admin/notifications', {
        title: formData.title,
        message: formData.message,
        recipientRole: formData.target, // 'all', 'student', 'professor', 'club'
        category: 'system',
      });
      setStatus({ type: 'success', message: `Notification broadcasted to ${formData.target === 'all' ? 'everyone' : formData.target + 's'} successfully!` });
      setFormData({ title: '', message: '', target: 'all' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to send notification.' });
    } finally {
      setSending(false);
    }
  };


  return (
    <DashboardLayout>
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Send System Notice</h1>
        <p className="text-gray-500 font-medium italic">Communicate important updates across the department in real-time.</p>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-[40px] shadow-2xl shadow-blue-500/5 border border-gray-100 overflow-hidden">
         <div className="p-12">
            {status && (
               <div className={`mb-8 p-6 rounded-3xl flex items-center gap-4 animate-in slide-in-from-top-4 duration-500 ${
                 status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
               }`}>
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${status.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                     <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       {status.type === 'success' ? (
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                       ) : (
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                       )}
                     </svg>
                  </div>
                  <p className="font-bold">{status.message}</p>
               </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Target Audience</label>
                     <select 
                       value={formData.target}
                       onChange={(e) => setFormData({...formData, target: e.target.value})}
                       className="w-full bg-gray-50 border-none px-6 py-4 rounded-2xl font-bold text-gray-700 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                     >
                        <option value="all">Everyone (All Roles)</option>
                        <option value="student">Students Only</option>
                        <option value="professor">Professors Only</option>
                        <option value="club">Clubs Heads Only</option>
                     </select>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Urgency Level</label>
                     <div className="flex gap-3">
                        {['Normal', 'Urgent', 'Critical'].map(lvl => (
                           <button key={lvl} type="button" className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                             lvl === 'Normal' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
                           }`}>{lvl}</button>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4 text-center">Alert Headline</label>
                  <input 
                    type="text"
                    required
                    placeholder="E.g., Semester Registration Deadline Extended"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-gray-50 border-none px-8 py-5 rounded-2xl font-bold text-gray-900 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Message Content</label>
                  <textarea 
                    required
                    rows="5"
                    placeholder="Write your detailed announcement here..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-gray-50 border-none px-8 py-5 rounded-3xl font-bold text-gray-900 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  ></textarea>
               </div>

               <button 
                 disabled={sending}
                 className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 text-white font-black py-6 rounded-3xl shadow-2xl shadow-blue-500/20 transition-all flex items-center justify-center gap-4 text-sm uppercase tracking-widest group"
               >
                  {sending ? 'Broadcasting Alert...' : (
                    <>
                      <svg className="h-5 w-5 transform group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                      Broadcast to Platform
                    </>
                  )}
               </button>
            </form>
         </div>
         
         <div className="bg-gray-50 px-12 py-8 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="h-2 w-2 rounded-full bg-red-500"></div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Broadcasts are permanent and visible immediately</p>
            </div>
            <button type="button" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View History</button>
         </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
