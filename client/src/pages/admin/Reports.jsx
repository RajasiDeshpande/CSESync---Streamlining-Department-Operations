import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ChartCard from '../../components/dashboard/ChartCard';

const Reports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get('/admin/reports');
        setData(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
            <div className="absolute top-0 h-16 w-16 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const highlights = data?.highlights || {};

  const highlightCards = [
    {
      title: 'Top Course by Enrollment',
      val: highlights.topCourse?.name || 'N/A',
      detail: highlights.topCourse?.detail || 'No enrollment data',
      color: 'bg-green-50 text-green-600',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
    },
    {
      title: 'Most Active Club',
      val: highlights.mostActiveClub?.name || 'N/A',
      detail: highlights.mostActiveClub?.detail || 'No events recorded',
      color: 'bg-blue-50 text-blue-600',
      icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z'
    },
    {
      title: 'Course Enrollment Avg',
      val: highlights.avgEnrollment?.name || '0 avg',
      detail: highlights.avgEnrollment?.detail || 'Across all courses',
      color: 'bg-orange-50 text-orange-600',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    }
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Performance Metrics</h1>
          <p className="text-gray-500 font-medium italic">Real-time breakdown of departmental activity and analytics.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-white hover:bg-gray-50 text-gray-900 font-black px-6 py-3.5 rounded-2xl border border-gray-100 shadow-sm transition-all flex items-center gap-2 text-xs uppercase tracking-widest"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Download PDF Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <ChartCard
          title="Platform Activity Trend"
          data={data?.monthlyActivity || []}
          color="indigo"
        />
        <ChartCard
          title="Course Enrollment Distribution"
          data={data?.coursePerformanceData || []}
          color="purple"
          valueKey="count"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {highlightCards.map(card => (
          <div key={card.title} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm group hover:shadow-xl transition-all">
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${card.color}`}>
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} /></svg>
            </div>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{card.title}</p>
            <h4 className="text-2xl font-black text-gray-900 mb-1 leading-tight">{card.val}</h4>
            <p className="text-xs font-bold text-gray-500 opacity-60">{card.detail}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Reports;
