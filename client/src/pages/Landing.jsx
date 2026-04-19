import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';

const Landing = () => {
  const { user } = useAuth();

  const roles = [
    {
      title: 'Students',
      slug: 'student',
      icon: 'fa-user-graduate',
      description: 'Access academic resources, track your progress, and collaborate with peers in real-time.',
      color: 'text-emerald-600',
      bgColor: 'bg-white',
      borderColor: 'border-emerald-100',
      iconColor: 'bg-emerald-500 text-white',
      hoverBorder: 'hover:border-emerald-300',
      accentBg: 'bg-emerald-50'
    },
    {
      title: 'Professors',
      slug: 'professor',
      icon: 'fa-chalkboard-teacher',
      description: 'Manage course materials, streamline grading, and communicate directly with your students.',
      color: 'text-purple-600',
      bgColor: 'bg-white',
      borderColor: 'border-purple-100',
      iconColor: 'bg-purple-500 text-white',
      hoverBorder: 'hover:border-purple-300',
      accentBg: 'bg-purple-50'
    },
    {
      title: 'Clubs',
      slug: 'club',
      icon: 'fa-users-rectangle',
      description: 'Organize events, manage memberships, and broadcast activities to the entire department.',
      color: 'text-amber-600',
      bgColor: 'bg-white',
      borderColor: 'border-amber-100',
      iconColor: 'bg-amber-500 text-white',
      hoverBorder: 'hover:border-amber-300',
      accentBg: 'bg-amber-50'
    },
    {
      title: 'Admins',
      slug: 'admin',
      icon: 'fa-user-shield',
      description: 'Full oversight of department operations, user management, and system-wide analytics.',
      color: 'text-indigo-600',
      bgColor: 'bg-white',
      borderColor: 'border-indigo-100',
      iconColor: 'bg-indigo-500 text-white',
      hoverBorder: 'hover:border-indigo-300',
      accentBg: 'bg-indigo-50'
    },
  ];

  const announcements = [
    { date: 'Oct 12, 2026', title: 'Mid-term Examination Schedule Released', category: 'Exam' },
    { date: 'Oct 10, 2026', title: 'Workshop on Quantum Computing in Lab 4', category: 'Workshop' },
    { date: 'Oct 08, 2026', title: 'Acro-Tech Festival Registration Open', category: 'Event' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <Navbar />

      {/* Hero Section with Intense AITR Indore Branding */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like fix */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] scale-110 hover:scale-100"
          style={{ backgroundImage: "url('/hero.png')" }}
        >
          {/* Multi-layered Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/60 to-gray-50"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left h-full flex flex-col justify-center">
          <div className="space-y-6 max-w-4xl animate-fade-in-up">
            <div className="inline-flex items-center space-x-3 px-5 py-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full text-white mb-8">
              <span className="flex h-3 w-3 rounded-full bg-blue-400 animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-[0.3em]">Official Department Portal</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-8">
              Acropolis Institute <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-200">
                CSE Department.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 font-medium leading-relaxed mb-12 max-w-3xl opacity-90 border-l-4 border-blue-400 pl-6">
              Welcome to the digital heart of Computer Science & Engineering at AITR Indore. 
              Efficiency, innovation, and synergy—all synced in one ecosystem.
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
              {user ? (
                <Link to="/login" className="group w-full sm:w-auto px-12 py-6 bg-white text-blue-900 rounded-3xl font-black text-xl shadow-2xl hover:-translate-y-2 hover:shadow-white/20 transition-all duration-300 flex items-center justify-center">
                  Access Portal <i className="fa-solid fa-arrow-right-to-bracket ml-4 text-sm group-hover:translate-x-2 transition-transform"></i>
                </Link>
              ) : (
                <>
                  <Link to="/register" className="group w-full sm:w-auto px-12 py-6 bg-blue-600 text-white rounded-3xl font-black text-xl shadow-2xl shadow-blue-500/30 hover:-translate-y-2 hover:bg-blue-500 transition-all duration-300 flex items-center justify-center">
                    Get Started Free <i className="fa-solid fa-bolt-lightning ml-4 text-sm group-hover:animate-bounce"></i>
                  </Link>
                  <Link to="/login" className="w-full sm:w-auto px-12 py-6 bg-white/5 backdrop-blur-xl text-white border-2 border-white/20 rounded-3xl font-black text-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <i className="fa-solid fa-chevron-down text-white text-2xl"></i>
        </div>
      </section>

      {/* Roles Section - Clean & Solid Cards */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest rounded-full border border-blue-100 mb-5">
              Choose Your Portal
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">
              Built for Everyone.
            </h2>
            <p className="text-lg text-gray-500 font-medium max-w-xl mx-auto">
              Tailored experiences for every member of the AITR CSE Department.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, idx) => (
              <Link 
                key={idx}
                to="/login"
                state={{ role: role.slug }}
                className={`${role.bgColor} relative group p-8 rounded-3xl border-2 ${role.borderColor} ${role.hoverBorder} shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 cursor-pointer text-left overflow-hidden block`}
              >
                {/* Subtle accent top bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${role.iconColor} rounded-t-3xl opacity-80`}></div>
                
                <div className={`${role.iconColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg mt-4`}>
                  <i className={`fa-solid ${role.icon}`}></i>
                </div>
                
                <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">{role.title}</h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">
                  {role.description}
                </p>
                
                <div className={`mt-8 pt-5 border-t border-gray-100 flex items-center justify-between`}>
                  <span className={`text-sm font-black ${role.color} flex items-center gap-2`}>
                    Sign in as {role.title.endsWith('s') ? role.title.slice(0,-1) : role.title}
                    <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements & Info Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left: Content */}
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-6">Department <br />Announcements.</h2>
              <p className="text-gray-500 font-medium text-lg leading-relaxed mb-8">
                Stay updated with the latest news, exam updates, and cultural happenings within the Indore campus.
              </p>
              <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-gray-800 transition-colors">
                View All Updates
              </button>
            </div>

            {/* Right: Announcement List */}
            <div className="lg:col-span-2 space-y-6">
              {announcements.map((item, idx) => (
                <div key={idx} className="group flex items-center bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div className="flex-shrink-0 w-24 text-center">
                    <span className="block text-xl font-black text-blue-600 leading-none mb-1">{item.date.split(' ')[1]}</span>
                    <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.date.split(' ')[0]}</span>
                  </div>
                  <div className="ml-8 flex-grow">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-3">
                      {item.category}
                    </span>
                    <h4 className="text-lg font-black text-gray-900">{item.title}</h4>
                  </div>
                  <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="fa-solid fa-arrow-up-right-from-square text-blue-600"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer - College Style */}
      <footer className="bg-gray-900 pt-32 pb-16 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 opacity-10 rounded-full blur-[150px] -mr-48 -mt-48"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-blue-600 p-3 rounded-2xl">
                  <i className="fa-solid fa-layer-group text-2xl"></i>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black tracking-tighter">CSESync</span>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-[0.3em]">AITR INDORE</span>
                </div>
              </div>
              <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-md">
                Empowering the future engineers of AITR Indore with a unified digital ecosystem. 
                Built for the department, by the department.
              </p>
            </div>
            
            <div>
              <h5 className="text-sm font-black uppercase tracking-[0.3em] mb-8 text-blue-400">Quick Links</h5>
              <ul className="space-y-4 font-bold text-gray-500">
                <li className="hover:text-white transition-colors cursor-pointer">Official AITR Website</li>
                <li className="hover:text-white transition-colors cursor-pointer">Student ERP Portal</li>
                <li className="hover:text-white transition-colors cursor-pointer">Library Resources</li>
                <li className="hover:text-white transition-colors cursor-pointer">Anti-Ragging Cell</li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm font-black uppercase tracking-[0.3em] mb-8 text-blue-400">Contact</h5>
              <p className="font-bold text-gray-500 mb-2">Bypass Road, Manglia Square, Indore</p>
              <p className="font-bold text-gray-500 mb-8">info@acropolis.in</p>
              <div className="flex space-x-6 text-gray-400">
                <i className="fa-brands fa-facebook text-xl hover:text-white transition-colors"></i>
                <i className="fa-brands fa-linkedin text-xl hover:text-white transition-colors"></i>
                <i className="fa-brands fa-twitter text-xl hover:text-white transition-colors"></i>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm font-bold text-gray-600">
            <p>© {new Date().getFullYear()} CSESync - Department of CSE, AITR Indore.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Credits</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
