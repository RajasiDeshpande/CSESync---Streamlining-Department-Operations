import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';

const ClubMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // For now, let's mock the "Interested Students" logic
        // In a real app, this would be students who RSVP'd or Joined the club
        const res = await api.get('/admin/users'); // Admin gets all users, club has restricted view
        setMembers(res.data.data.filter(u => u.role === 'student').slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) return null;

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Community Insights</h1>
        <p className="text-gray-500 font-medium italic">Meet the students engaging with your club's events and initiatives.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {members.map((member) => (
          <div key={member._id} className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300">
             <div className="h-24 w-24 rounded-[32px] bg-purple-600/10 flex items-center justify-center text-3xl font-black text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                {member.name[0]}
             </div>
             <h3 className="text-lg font-black text-gray-900 mb-1">{member.name}</h3>
             <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">Student Participant</p>
             <div className="w-full flex gap-2">
                <button className="flex-1 py-3 bg-gray-50 text-gray-400 hover:text-purple-600 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all">Message</button>
             </div>
          </div>
        ))}
        {members.length === 0 && (
           <div className="col-span-full py-20 text-center grayscale opacity-30">
              <i className="fa-solid fa-users-slash text-6xl mb-4"></i>
              <p className="font-bold text-xs uppercase tracking-widest text-gray-500">No student engagement tracked yet.</p>
           </div>
        )}
      </div>

      <div className="mt-12 bg-purple-900 rounded-[40px] p-12 text-white shadow-xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-12 opacity-10 scale-150 rotate-12 group-hover:rotate-0 transition-all duration-1000">
            <i className="fa-solid fa-handshake-angle text-9xl"></i>
         </div>
         <div className="relative z-10">
            <h2 className="text-2xl font-black mb-4 tracking-tight">Growth & Engagement</h2>
            <p className="text-purple-200 font-medium italic max-w-xl leading-relaxed mb-10">
               Student engagement is your club's most valuable metric. Broadcasters and event organizers with high engagement often receive featured placement on the primary Campus Radar.
            </p>
            <div className="flex gap-4">
               <div className="px-6 py-3 bg-white/10 rounded-2xl border border-white/5 font-black text-[10px] uppercase tracking-[0.2em] animate-pulse">Community Growth +14%</div>
               <div className="px-6 py-3 bg-white/10 rounded-2xl border border-white/5 font-black text-[10px] uppercase tracking-[0.2em]">Top Category: Workshop</div>
            </div>
         </div>
      </div>
    </DashboardLayout>
  );
};

export default ClubMembers;
