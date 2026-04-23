import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(notifications.filter(n => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
            <div className="absolute top-0 h-16 w-16 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          </div>
          <p className="font-bold text-gray-400 animate-pulse uppercase tracking-widest text-xs">Loading Alerts...</p>
        </div>
      </div>
    );
  }

  const getIcon = (category) => {
    switch (category) {
      case 'event': return 'fa-calendar-star';
      case 'academic': return 'fa-book-open-reader';
      case 'system': return 'fa-shield-halved';
      default: return 'fa-bullhorn';
    }
  };

  const getColor = (category) => {
    switch (category) {
      case 'event': return 'bg-purple-500';
      case 'academic': return 'bg-blue-500';
      case 'system': return 'bg-red-500';
      default: return 'bg-indigo-500';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const filtered = filter === 'unread' ? notifications.filter(n => !n.isRead) : notifications;

  return (
    <DashboardLayout>
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Bulletin Board</h1>
          <p className="text-gray-500 font-medium italic">Your centralized history of department alerts and highlights.</p>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 px-5 py-3 rounded-2xl">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">{unreadCount} Unread</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
        <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-gray-400 hover:bg-white'}`}
            >
              All Alerts
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'unread' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-gray-400 hover:bg-white'}`}
            >
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </button>
          </div>
          <button
            onClick={handleMarkAllRead}
            className="text-[10px] font-black text-gray-400 hover:text-indigo-600 uppercase tracking-widest transition-all"
          >
            Mark All as Read
          </button>
        </div>

        <div className="flex-1 divide-y divide-gray-50">
          {filtered.map((notif) => (
            <div
              key={notif._id}
              onClick={() => !notif.isRead && handleMarkRead(notif._id)}
              className={`p-8 hover:bg-gray-50/50 transition-all flex gap-8 items-start relative group cursor-pointer ${!notif.isRead ? 'bg-indigo-50/20' : ''}`}
            >
              {!notif.isRead && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-full my-8"></div>
              )}
              <div className={`h-16 w-16 rounded-3xl ${getColor(notif.category)} flex items-center justify-center text-white text-xl shadow-lg flex-shrink-0 transition-transform group-hover:scale-110 duration-300`}>
                <i className={`fa-solid ${getIcon(notif.category)}`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      {new Date(notif.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                      {notif.sender?.name && ` • From ${notif.sender.name}`}
                    </p>
                    <h3 className={`text-lg font-black leading-tight group-hover:text-indigo-600 transition-colors ${!notif.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                      {notif.title}
                    </h3>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(notif._id); }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-red-500 ml-4 flex-shrink-0"
                  >
                    <i className="fa-solid fa-trash-can text-sm"></i>
                  </button>
                </div>
                <p className="text-gray-500 font-medium leading-relaxed italic">{notif.message}</p>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center py-20 text-center grayscale opacity-30">
              <i className="fa-solid fa-folder-open text-6xl mb-4"></i>
              <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs">No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationCenter;
