import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin': return '/admin/dashboard';
      case 'student': return '/student/dashboard';
      case 'professor': return '/professor/dashboard';
      case 'club': return '/club/dashboard';
      default: return '/';
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      isLandingPage 
        ? (isScrolled ? 'bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/20 py-3' : 'bg-transparent py-6') 
        : 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="bg-blue-600 p-2 rounded-xl mr-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                <i className="fa-solid fa-layer-group text-white text-lg"></i>
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-black tracking-tighter leading-none ${
                   isLandingPage && !isScrolled ? 'text-white' : 'text-gray-900'
                }`}>
                  CSESync
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 ${
                   isLandingPage && !isScrolled ? 'text-blue-200' : 'text-blue-500'
                }`}>
                  AITR Indore
                </span>
              </div>
            </Link>
            
            <div className="hidden md:ml-12 md:flex items-center space-x-10">
              <Link to="/" className={`text-sm font-bold transition-colors ${
                isLandingPage && !isScrolled ? 'text-white/80 hover:text-white' : 'text-gray-500 hover:text-blue-600'
              }`}>Home</Link>
              <a href="#" className={`text-sm font-bold transition-colors ${
                isLandingPage && !isScrolled ? 'text-white/80 hover:text-white' : 'text-gray-500 hover:text-blue-600'
              }`}>Resources</a>
              <a href="#" className={`text-sm font-bold transition-colors ${
                isLandingPage && !isScrolled ? 'text-white/80 hover:text-white' : 'text-gray-500 hover:text-blue-600'
              }`}>Events</a>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            {user ? (
              <div className={`flex items-center space-x-6 p-1.5 pl-5 rounded-2xl border transition-all duration-300 ${
                isLandingPage && !isScrolled 
                  ? 'bg-white/10 backdrop-blur-md border-white/20' 
                  : 'bg-gray-50 border-gray-100'
              }`}>
                <div className="hidden sm:flex flex-col items-end">
                  <span className={`text-xs font-black leading-none mb-1 ${
                    isLandingPage && !isScrolled ? 'text-white' : 'text-gray-900'
                  }`}>{user.name}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    isLandingPage && !isScrolled ? 'text-blue-200' : 'text-blue-500'
                  }`}>{user.role}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white text-gray-900 hover:bg-red-50 hover:text-red-600 px-5 py-2.5 rounded-xl text-sm font-black transition-all duration-200 border border-transparent hover:border-red-100 shadow-sm"
                >
                  <i className="fa-solid fa-power-off sm:mr-2"></i>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className={`px-5 py-3 rounded-xl text-sm font-black transition-colors ${
                    isLandingPage && !isScrolled ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-7 py-3 rounded-2xl text-sm font-black transition-all duration-300 shadow-xl shadow-blue-500/20 hover:-translate-y-0.5 active:scale-95"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
