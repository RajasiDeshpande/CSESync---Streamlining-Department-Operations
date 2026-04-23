import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/dashboard/DataTable';
import ConfirmModal from '../../components/dashboard/ConfirmModal';


const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);


  const fetchEvents = async () => {
    try {
      const res = await api.get('/admin/events');
      setEvents(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/admin/events/${id}`, { status });
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/events/${selectedEvent._id}`);
      fetchEvents();
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };


  const columns = [
    { 
      label: 'Event Title', 
      key: 'title',
      render: (val, row) => (
        <div>
          <p className="font-bold text-gray-900">{val}</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">{row.club?.name || 'Club Unknown'}</p>
        </div>
      )
    },
    { 
      label: 'Date & Location', 
      key: 'date',
      render: (val, row) => (
        <div className="text-xs text-gray-600 font-medium">
          <p className="font-bold text-gray-900">{new Date(val).toLocaleDateString()}</p>
          <p className="opacity-60 uppercase tracking-tighter">{row.location || 'Campus Wide'}</p>
        </div>
      )
    },
    { 
      label: 'Status', 
      key: 'status',
      render: (val) => {
        const colors = {
          pending: 'bg-amber-50 text-amber-600 border-amber-100',
          approved: 'bg-green-50 text-green-600 border-green-100',
          rejected: 'bg-red-50 text-red-600 border-red-100',
        };
        return (
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${colors[val]}`}>
            {val}
          </span>
        );
      }
    }
  ];

  const actions = [
    {
      label: 'Approve',
      icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>,
      onClick: (row) => handleStatusChange(row._id, 'approved'),
      className: 'text-green-600 hover:bg-green-50'
    },
    {
      label: 'Reject',
      icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>,
      onClick: (row) => handleStatusChange(row._id, 'rejected'),
      className: 'text-orange-600 hover:bg-orange-50'
    },
    {
      label: 'Delete',
      icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
      onClick: (row) => {
        setSelectedEvent(row);
        setIsDeleteModalOpen(true);
      },
      className: 'text-red-500 hover:bg-red-50'
    }
  ];


  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Club Management</h1>
          <p className="text-gray-500 font-medium italic">Review and approve upcoming departmental events.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest">{events.filter(e => e.status === 'pending').length} Actions Required</p>
           </div>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={events} 
        actions={actions}
        loading={loading}
      />

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Event"
        message={`Are you sure you want to permanently delete the event "${selectedEvent?.title}"?`}
        confirmText="Flush Event Record"
      />
    </DashboardLayout>
  );
};


export default Events;
