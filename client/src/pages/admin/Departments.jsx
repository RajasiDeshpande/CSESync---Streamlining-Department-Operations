import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/dashboard/DataTable';
import ConfirmModal from '../../components/dashboard/ConfirmModal';
import DepartmentModal from '../../components/dashboard/DepartmentModal';


const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [modalMode, setModalMode] = useState('add');


  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/departments');
      setDepartments(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfessors = async () => {
    try {
      const res = await api.get('/admin/users?role=professor');
      setProfessors(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchProfessors();
  }, []);

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/departments/${selectedDept._id}`);
      fetchDepartments();
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };


  const columns = [
    { 
      label: 'Department', 
      key: 'name',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black">
            {row.code}
          </div>
          <p className="font-bold text-gray-900 text-lg">{val}</p>
        </div>
      )
    },
    { 
      label: 'Head of Department', 
      key: 'hod',
      render: (val) => (
        <div className="flex items-center gap-2">
           <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black">{val?.name?.[0] || '?'}</div>
           <span className="font-bold text-gray-700">{val?.name || 'Unassigned'}</span>
        </div>
      )
    },
    { 
      label: 'Description', 
      key: 'description',
      render: (val) => <p className="max-w-xs truncate text-gray-400 font-medium italic">{val || 'No description provided'}</p>
    }
  ];

  const actions = [
    {
      label: 'Edit',
      icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
      onClick: (dept) => {
        setSelectedDept(dept);
        setModalMode('edit');
        setIsModalOpen(true);
      },
      className: 'text-blue-600 hover:bg-blue-50'
    },
    {
      label: 'Delete',
      icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
      onClick: (dept) => {
        setSelectedDept(dept);
        setIsDeleteModalOpen(true);
      },
      className: 'text-red-500 hover:bg-red-50'
    }
  ];


  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Organizational Units</h1>
          <p className="text-gray-500 font-medium italic">Manage department structure and HOD assignments.</p>
        </div>
        <button 
          onClick={() => {
            setSelectedDept(null);
            setModalMode('add');
            setIsModalOpen(true);
          }}
          className="bg-gray-900 hover:bg-black text-white font-black px-6 py-3.5 rounded-2xl transition-all flex items-center gap-2 text-sm uppercase tracking-widest shadow-xl shadow-gray-200"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
          New Department
        </button>

      </div>

      <DataTable 
        columns={columns} 
        data={departments} 
        actions={actions}
        loading={loading}
      />

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Department"
        message={`Are you sure you want to delete the ${selectedDept?.name} department? This may affect courses assigned to it.`}
        confirmText="Confirm Delete"
      />

      <DepartmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={fetchDepartments}
        department={modalMode === 'edit' ? selectedDept : null}
        professors={professors}
      />

      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Science & Tech', count: '12 Courses', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.691.31a2 2 0 01-1.782 0l-.691-.31a6 6 0 00-3.86-.517l-2.388.477a2 2 0 00-1.022.547V18a2 2 0 001.022 1.571l2.387.477a6 6 0 003.86-.517l.691-.31a2 2 0 011.782 0l.691.31a6 6 0 003.86.517l2.387-.477A2 2 0 0019.428 18v-2.571z' },
          { label: 'Arts & Design', count: '8 Courses', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 014 4h-8z' },
          { label: 'Management', count: '15 Courses', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z' }
        ].map(cat => (
          <div key={cat.label} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-6">
            <div className="h-14 w-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} /></svg>
            </div>
            <div>
              <h4 className="font-black text-gray-900 tracking-tight">{cat.label}</h4>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">{cat.count}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Departments;
