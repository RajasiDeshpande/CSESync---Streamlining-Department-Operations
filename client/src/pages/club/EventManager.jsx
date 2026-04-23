import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ConfirmModal from '../../components/dashboard/ConfirmModal';


const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', date: '', location: '', category: 'technical' });


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/club/dashboard');
        setEvents(res.data.data.myEvents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/club/events', formData);
      setEvents([res.data.data, ...events]);
      setShowModal(false);
      setFormData({ title: '', description: '', date: '', location: '', category: 'technical' });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create event');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/club/events/${selectedEvent._id}`);
      setEvents(events.filter(e => e._id !== selectedEvent._id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      alert('Failed to delete event');
    }
  };


  if (loading) return null;

  return (
    <>
      <DashboardLayout>

      <div className="mb-10 flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Event Pipeline</h1>
           <p className="text-gray-500 font-medium italic">Orchestrate and monitor your club's presence on campus.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-8 py-4 bg-purple-600 text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-purple-700 transition-all shadow-xl shadow-purple-100 flex items-center gap-3"
        >
          Schedule New Event <i className="fa-solid fa-plus text-[10px]"></i>
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">Event Details</th>
              <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">Date & Location</th>
              <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">Status</th>
              <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {events.map((event) => (
              <tr key={event._id} className="group hover:bg-gray-50/50 transition-all">
                <td className="p-8">
                  <h4 className="font-bold text-gray-900 leading-tight mb-1 group-hover:text-purple-600 transition-colors">{event.title}</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{event.category}</p>
                </td>
                <td className="p-8">
                  <p className="text-sm font-bold text-gray-700">{new Date(event.date).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-400 italic">@{event.location}</p>
                </td>
                <td className="p-8">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${new Date(event.date) >= new Date() ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                    {new Date(event.date) >= new Date() ? 'Active' : 'Past'}
                  </span>
                </td>
                <td className="p-8 text-right">
                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="h-10 w-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all shadow-sm">
                       <i className="fa-solid fa-pen-to-square text-xs"></i>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsDeleteModalOpen(true);
                      }}
                      className="h-10 w-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-sm"
                    >
                       <i className="fa-solid fa-trash-can text-xs"></i>
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && (
          <div className="py-20 text-center opacity-40">
             <i className="fa-solid fa-calendar-xmark text-5xl mb-4"></i>
             <p className="font-bold text-xs uppercase tracking-widest">No events in your pipeline.</p>
          </div>
        )}
      </div>

      {/* Modal - Simple implementation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl p-12 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-10">
                 <h2 className="text-2xl font-black text-gray-900 tracking-tight">Create New Marketplace Event</h2>
                 <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                    <i className="fa-solid fa-circle-xmark text-2xl"></i>
                 </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-8">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                       <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Event Title</label>
                       <input type="text" required className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Category</label>
                       <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold appearance-none" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                          <option value="technical">Technical</option>
                          <option value="cultural">Cultural</option>
                          <option value="sports">Sports</option>
                          <option value="workshop">Workshop</option>
                       </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Event Date</label>
                        <input type="date" required className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Location</label>
                        <input type="text" required className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="e.g. Auditorium 2" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Description</label>
                        <textarea required rows="4" className="w-full bg-gray-50 border border-gray-100 rounded-[28px] px-6 py-4 font-bold resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                    </div>
                 </div>
                 <button type="submit" className="w-full py-5 bg-purple-600 text-white rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl shadow-purple-100 transition-all hover:bg-purple-700">
                    Publish to Campus Radar
                 </button>
              </form>
           </div>
        </div>
      )}
    </DashboardLayout>

    <ConfirmModal 
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      onConfirm={handleDelete}
      title="Delete Event"
      message={`Are you sure you want to delete "${selectedEvent?.title}"? This cannot be undone.`}
      confirmText="Delete Event"
    />
  </>
  );
};


export default EventManager;
