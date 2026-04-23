import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/dashboard/DataTable';
import ConfirmModal from '../../components/dashboard/ConfirmModal';
import UserModal from '../../components/dashboard/UserModal';


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'


  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/users${roleFilter ? `?role=${roleFilter}` : ''}`);
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/users/${selectedUser._id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { 
      label: 'User', 
      key: 'name',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-black">
            {val[0]}
          </div>
          <div>
            <p className="font-bold text-gray-900">{val}</p>
            <p className="text-xs text-gray-400 font-medium">{row.email}</p>
          </div>
        </div>
      )
    },
    { 
      label: 'Role', 
      key: 'role',
      render: (val) => {
        const colors = {
          admin: 'bg-red-50 text-red-600 border-red-100',
          professor: 'bg-blue-50 text-blue-600 border-blue-100',
          student: 'bg-green-50 text-green-600 border-green-100',
          club: 'bg-purple-50 text-purple-600 border-purple-100',
        };
        return (
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${colors[val] || 'bg-gray-50 text-gray-500'}`}>
            {val}
          </span>
        );
      }
    },
    { 
      label: 'Reg. Date', 
      key: 'createdAt',
      render: (val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
  ];

  const actions = [
    {
      label: 'Edit',
      icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
      onClick: (user) => {
        setSelectedUser(user);
        setModalMode('edit');
        setIsUserModalOpen(true);
      },
      className: 'text-blue-600 hover:bg-blue-50'
    },

    {
      label: 'Delete',
      icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
      onClick: (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
      },
      className: 'text-red-500 hover:bg-red-50'
    }
  ];

  return (
    <>
      <DashboardLayout>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Platform Users</h1>
            <p className="text-gray-500 font-medium italic">Manage students, professors, and club heads.</p>
          </div>
          <button 
            onClick={() => {
              setSelectedUser(null);
              setModalMode('add');
              setIsUserModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-blue-500/20 transition-all flex items-center gap-2 text-sm uppercase tracking-widest"
          >
            <svg className="h-5 w-5 font-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
            Add New User
          </button>

        </div>

        <div className="mb-8 flex gap-4">
          {['', 'student', 'professor', 'club', 'admin'].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border ${
                roleFilter === role 
                  ? 'bg-gray-900 text-white border-gray-900 shadow-lg' 
                  : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
              }`}
            >
              {role || 'All Roles'}
            </button>
          ))}
        </div>

        <DataTable 
          columns={columns} 
          data={users} 
          actions={actions}
          loading={loading}
        />
      </DashboardLayout>

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
        confirmText="Remove User"
      />

      <UserModal 
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onRefresh={fetchUsers}
        user={modalMode === 'edit' ? selectedUser : null}
      />
    </>

  );
};

export default UserManagement;
