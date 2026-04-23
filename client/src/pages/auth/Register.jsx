import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const { name, email, password, role } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/register', {
        name,
        email,
        password,
        role,
      });

      const { user, token } = res.data;
      login(user, token);

      // Redirect based on role
      switch (user.role) {
        case 'admin': navigate('/admin/dashboard'); break;
        case 'student': navigate('/student/dashboard'); break;
        case 'professor': navigate('/professor/dashboard'); break;
        case 'club': navigate('/club/dashboard'); break;
        default: navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white font-sans overflow-hidden">
      {/* Left side - Branding/Illustration (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-700 items-center justify-center overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500 opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-800 opacity-30 blur-3xl"></div>
          <div className="absolute top-[40%] right-[10%] w-24 h-24 rounded-2xl bg-white/5 -rotate-12 backdrop-blur-sm border border-white/10 transition-transform hover:rotate-0 duration-700"></div>
          <div className="absolute bottom-[20%] left-[15%] w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 transition-transform hover:scale-110 duration-500"></div>
        </div>

        <div className="relative z-10 p-16 max-w-2xl text-white">
          <div className="flex items-center space-x-4 mb-12">
            <div className="bg-white p-3 rounded-2xl shadow-2xl flex items-center justify-center">
              <i className="fa-solid fa-layer-group text-indigo-600 text-4xl"></i>
            </div>
            <h1 className="text-5xl font-black tracking-tighter">CSESync</h1>
          </div>
          
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Join the Community of Innovators.
          </h2>
          <p className="text-xl text-indigo-100 font-medium leading-relaxed opacity-90 mb-12">
            Create your account to start managing projects, collaborating with peers, and accessing departmental resources.
          </p>
          
          <ul className="space-y-6">
            <li className="flex items-center space-x-4">
              <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-md flex items-center justify-center">
                <i className="fa-solid fa-check text-indigo-200"></i>
              </div>
              <span className="text-lg font-medium">Personalized Dashboards</span>
            </li>
            <li className="flex items-center space-x-4">
              <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-md flex items-center justify-center">
                <i className="fa-solid fa-shield-halved text-indigo-200"></i>
              </div>
              <span className="text-lg font-medium">Role-based Access Control</span>
            </li>
            <li className="flex items-center space-x-4">
              <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-md flex items-center justify-center">
                <i className="fa-solid fa-database text-indigo-200"></i>
              </div>
              <span className="text-lg font-medium">Secure Data Management</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-12 bg-gray-50/30 overflow-y-auto">
        <div className="w-full max-w-md space-y-8 my-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-indigo-600 transition-all group mb-4 sm:mb-0"
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-3 group-hover:bg-indigo-50 group-hover:shadow-md transition-all">
                <i className="fa-solid fa-arrow-left text-xs"></i>
              </div>
              <span>Return to Home</span>
            </Link>
            
            <div className="lg:hidden flex justify-center">
              <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl flex items-center justify-center">
                <i className="fa-solid fa-layer-group text-white text-2xl"></i>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              Create Account
            </h2>
            <p className="text-lg text-gray-500 font-medium">
              Join CSESync to streamline your operations.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-center">
                <i className="fa-solid fa-triangle-exclamation text-red-500 mr-3"></i>
                <p className="text-sm font-bold text-red-800">{error}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1" htmlFor="name">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                    <i className="fa-solid fa-user-tag text-sm"></i>
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-300"
                    placeholder="John Doe"
                    value={name}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1" htmlFor="email-address">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                    <i className="fa-solid fa-envelope text-sm"></i>
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-300"
                    placeholder="john@example.com"
                    value={email}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1" htmlFor="password">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                    <i className="fa-solid fa-fingerprint text-sm"></i>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-300"
                    placeholder="••••••••"
                    value={password}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1" htmlFor="role">
                  Join as
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                    <i className="fa-solid fa-briefcase text-sm"></i>
                  </div>
                  <select
                    id="role"
                    name="role"
                    className="block w-full pl-11 pr-10 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-300 appearance-none cursor-pointer"
                    value={role}
                    onChange={onChange}
                  >
                    <option value="student">Student</option>
                    <option value="professor">Professor</option>
                    <option value="club">Club Member</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-4 px-6 border border-transparent text-lg font-black rounded-2xl text-white shadow-xl transform transition-all duration-200 active:scale-95 mt-4 ${
                loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 shadow-indigo-100'
              }`}
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin mr-3"></i>
                  Creating Account...
                </>
              ) : (
                <> Get Started <i className="fa-solid fa-rocket ml-3 text-sm opacity-70"></i> </>
              )}
            </button>
          </form>
          
          <div className="text-center pt-2">
            <p className="text-lg text-gray-600 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="font-black text-indigo-600 hover:text-indigo-500 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
