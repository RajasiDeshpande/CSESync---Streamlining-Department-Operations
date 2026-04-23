import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';

const BatchDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // If id is provided, fetch specific course, otherwise maybe show first assigned?
        // For simplicity, let's assume this page might be accessed via /professor/courses/:id
        // But for now, we'll fetch all assigned courses and let user switch
        const res = await api.get('/professor/dashboard');
        const assigned = res.data.data.assignedCourses;
        
        if (assigned.length > 0) {
          const targetId = id || assigned[0]._id;
          const detailRes = await api.get(`/professor/courses/${targetId}/students`);
          setStudents(detailRes.data.data);
          setCourse(assigned.find(c => c._id === targetId));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return null;

  return (
    <DashboardLayout>
      <div className="mb-10 flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
             {course?.name || 'Batch Details'}
           </h1>
           <p className="text-gray-500 font-medium italic">
             {course?.code} • {students.length} Enrolled Students
           </p>
        </div>
        <button className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-sm text-gray-900 hover:bg-gray-50 transition-all shadow-sm">
           <i className="fa-solid fa-file-export text-blue-500"></i> Export List
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">Student Name</th>
              <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">University Email</th>
              <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((student) => (
              <tr key={student._id} className="group hover:bg-gray-50/50 transition-all">
                <td className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black">
                      {student.name[0]}
                    </div>
                    <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{student.name}</span>
                  </div>
                </td>
                <td className="p-8 text-sm font-medium text-gray-500 italic">{student.email}</td>
                <td className="p-8 text-right">
                   <button className="h-10 w-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all">
                      <i className="fa-solid fa-message-dots text-xs"></i>
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length === 0 && (
          <div className="py-20 text-center opacity-40">
             <i className="fa-solid fa-users-slash text-5xl mb-4"></i>
             <p className="font-bold text-xs uppercase tracking-widest">No students enrolled in this batch.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BatchDetail;
