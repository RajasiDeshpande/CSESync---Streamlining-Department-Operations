import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';

const EventsExplorer = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        setEvents(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleRegister = async (id) => {
    try {
      const res = await api.post(`/student/events/${id}/register`);
      // Update local state for immediate feedback
      setEvents(events.map(e => {
        if (e._id === id) {
          const isInterested = res.data.isInterested;
          const user = JSON.parse(localStorage.getItem('user')); // Get current user
          const participants = isInterested 
            ? [...e.participants, user._id] 
            : e.participants.filter(pid => pid !== user._id);
          return { ...e, participants };
        }
        return e;
      }));
    } catch (err) {
      alert('Action failed');
    }
  };


  if (loading) return null;

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Campus Radar</h1>
        <p className="text-gray-500 font-medium italic">Discover activities, workshops, and club events across the department.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event) => (
          <div key={event._id} className="bg-white rounded-[40px] border border-gray-100 p-10 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <i className="fa-solid fa-calendar-days text-9xl -rotate-12"></i>
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {event.club?.name || 'Departmental'}
                </span>
                <span className={`h-2.5 w-2.5 rounded-full ${new Date(event.date) >= new Date() ? 'bg-green-500' : 'bg-gray-300'}`}></span>
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">{event.title}</h3>
              <p className="text-gray-500 font-medium mb-8 line-clamp-3 italic text-sm">{event.description}</p>

              <div className="flex flex-wrap gap-6 items-center pt-8 border-t border-gray-50">
                <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                  <div className="h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center">
                    <i className="fa-solid fa-calendar text-indigo-400"></i>
                  </div>
                  {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                  <div className="h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center">
                    <i className="fa-solid fa-location-dot text-indigo-400"></i>
                  </div>
                  {event.location}
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button 
                  onClick={() => handleRegister(event._id)}
                  className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${
                    event.participants?.includes(JSON.parse(localStorage.getItem('user'))?._id)
                      ? 'bg-green-600 text-white shadow-green-100'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
                  }`}
                >
                  {event.participants?.includes(JSON.parse(localStorage.getItem('user'))?._id) ? 'Registered' : 'Interested'} 
                  <i className={`fa-solid ${event.participants?.includes(JSON.parse(localStorage.getItem('user'))?._id) ? 'fa-check' : 'fa-plus'} text-[10px]`}></i>
                </button>

                <button className="h-14 w-14 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-all">
                  <i className="fa-solid fa-share-nodes"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-gray-400 font-medium italic">Quiet on the radar today. Check back later for new events!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EventsExplorer;
