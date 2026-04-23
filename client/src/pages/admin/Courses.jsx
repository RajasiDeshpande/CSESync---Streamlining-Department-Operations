import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/dashboard/DataTable';
import ConfirmModal from '../../components/dashboard/ConfirmModal';
import CourseModal from '../../components/dashboard/CourseModal';


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalMode, setModalMode] = useState('add');


  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/courses');
      setCourses(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeptsAndProfs = async () => {
    try {
      const [deptRes, profRes] = await Promise.all([
        api.get('/admin/departments'),
        api.get('/admin/users?role=professor')
      ]);
      setDepartments(deptRes.data.data);
      setProfessors(profRes.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchDeptsAndProfs();
  }, []);

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/courses/${selectedCourse._id}`);
      fetchCourses();
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };


  const columns = [
    { 
      label: 'Course', 
      key: 'name',
      render: (val, row) => (
        <div>
          <p className="font-bold text-gray-900">{val}</p>
          <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">{row.code}</p>
        </div>
      )
    },
    { 
      label: 'Department', 
      key: 'department',
      render: (val) => val?.name || 'N/A'
    },
    { 
      label: 'Professor', 
      key: 'professor',
      render: (val) => val?.name || <span className="text-orange-500 italic">Not Assigned</span>
    },
    { 
      label: 'Credits', 
      key: 'credits',
      render: (val) => <span className="font-black text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">{val}</span>
    }
  ];

  const actions = [
    {
      label: 'Edit',
      icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
      onClick: (course) => {
        setSelectedCourse(course);
        setModalMode('edit');
        setIsModalOpen(true);
      },
      className: 'text-blue-600 hover:bg-blue-50'
    },
    {
      label: 'Delete',
      icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
      onClick: (course) => {
        setSelectedCourse(course);
        setIsDeleteModalOpen(true);
      },
      className: 'text-red-500 hover:bg-red-50'
    }
  ];


  return (
    <>
      <DashboardLayout>

      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Academic Courses</h1>
          <p className="text-gray-500 font-medium italic">Monitor academic offerings and assignments.</p>
        </div>
        <button 
          onClick={() => {
            setSelectedCourse(null);
            setModalMode('add');
            setIsModalOpen(true);
          }}
          className="bg-gradient-to-br from-indigo-600 to-blue-700 hover:shadow-xl hover:shadow-indigo-500/20 text-white font-black px-6 py-3.5 rounded-2xl transition-all flex items-center gap-2 text-sm uppercase tracking-widest"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
          Create Course
        </button>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-10">
        <div className="xl:col-span-3">
          <DataTable 
            columns={columns} 
            data={courses} 
            actions={actions}
            loading={loading}
          />

        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Course Insights</h3>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Total Credit Load</p>
                <p className="text-4xl font-black text-gray-900">{courses.reduce((acc, c) => acc + (c.credits || 0), 0)}</p>
              </div>
              <hr className="border-gray-50" />
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Unassigned Courses</p>
                <p className="text-4xl font-black text-gray-900">{courses.filter(c => !c.professor).length}</p>
              </div>

            </div>
          </div>
          
          <div className="bg-blue-600 rounded-[32px] p-8 text-white">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Notice</p>
            <p className="font-bold text-sm leading-relaxed mb-4">Ensure all courses have assigned professors before the next semester starts.</p>
            <button className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-4 py-2 rounded-xl border border-white/10">View Unassigned</button>
          </div>
        </div>
      </div>
    </DashboardLayout>

    <ConfirmModal 
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      onConfirm={handleDelete}
      title="Delete Course"
      message={`Are you sure you want to delete ${selectedCourse?.name}? This will unenroll all students.`}
      confirmText="Proceed Delete"
    />

    <CourseModal 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onRefresh={fetchCourses}
      course={modalMode === 'edit' ? selectedCourse : null}
      departments={departments}
      professors={professors}
    />
  </>
  );
};

export default Courses;

