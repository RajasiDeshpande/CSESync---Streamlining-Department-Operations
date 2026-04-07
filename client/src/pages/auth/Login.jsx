import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get role context from navigation state
  const roleContext = location.state?.role || null;

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      
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
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const getRoleDisplayName = (role) => {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className="flex min-h-screen w-full bg-white font-sans overflow-hidden">
      {/* Left side - Branding/Illustration (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-700 items-center justify-center overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500 opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-800 opacity-30 blur-3xl"></div>
          <div className="absolute top-[20%] left-[10%] w-24 h-24 rounded-2xl bg-white/5 rotate-12 backdrop-blur-sm border border-white/10 transition-transform hover:rotate-45 duration-700"></div>
          <div className="absolute bottom-[30%] right-[15%] w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 transition-transform hover:scale-110 duration-500"></div>
        </div>

        <div className="relative z-10 p-16 max-w-2xl text-white text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-4 mb-12">
            <div className="bg-white p-3 rounded-2xl shadow-2xl flex items-center justify-center">
              <i className="fa-solid fa-layer-group text-blue-600 text-4xl"></i>
            </div>
            <h1 className="text-5xl font-black tracking-tighter">CSESync</h1>
          </div>
          
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Streamlining Department Operations with Precision.
          </h2>
          <p className="text-xl text-blue-100 font-medium leading-relaxed opacity-90 mb-12">
            The central hub for students, professors, and administrators to collaborate and manage departmental activities efficiently.
          </p>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-start space-x-3">
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md flex items-center justify-center">
                <i className="fa-solid fa-bolt-lightning text-blue-200"></i>
              </div>
              <div>
                <h4 className="font-bold">Automated Workflows</h4>
                <p className="text-sm text-blue-100/70">Reduce manual tasks and complexity.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md flex items-center justify-center">
                <i className="fa-solid fa-rotate text-blue-200"></i>
              </div>
              <div>
                <h4 className="font-bold">Real-time Sync</h4>
                <p className="text-sm text-blue-100/70">Stay updated with instant notifications.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 bg-gray-50/30">
        <div className="w-full max-w-md space-y-10">
          <div className="lg:hidden flex justify-center mb-8">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-xl">
              <i className="fa-solid fa-layer-group text-white text-3xl"></i>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <div className="mb-3">
              <span className="text-sm font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                {roleContext ? `${getRoleDisplayName(roleContext)} Portal` : 'Central Portal'}
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              Welcome Back
            </h2>
            <p className="text-lg text-gray-500 font-medium">
              {roleContext 
                ? `Sign in to access your ${roleContext} workspace.` 
                : 'Sign in to manage your department tasks.'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl">
              <div className="flex items-center">
                <i className="fa-solid fa-circle-exclamation text-red-500 mr-3"></i>
                <p className="text-sm font-bold text-red-800">{error}</p>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1" htmlFor="email-address">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                    <i className="fa-solid fa-at"></i>
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-300"
                    placeholder="john@example.com"
                    value={email}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1" htmlFor="password">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-300"
                    placeholder="••••••••"
                    value={password}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between ml-1 text-sm">
              <label className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3" />
                Remember me
              </label>
              <a href="#" className="font-extrabold text-blue-600 hover:text-blue-500 transition-colors">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-4 px-6 border border-transparent text-lg font-black rounded-2xl text-white shadow-xl transform transition-all duration-200 active:scale-95 ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 shadow-blue-200'
              }`}
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin mr-3"></i>
                  Signing in...
                </>
              ) : (
                <> Sign In <i className="fa-solid fa-arrow-right-to-bracket ml-3 text-sm opacity-70"></i> </>
              )}
            </button>
          </form>
          
          <div className="text-center pt-4">
            <p className="text-lg text-gray-600 font-medium">
              Don't have an account?{' '}
              <Link to="/register" className="font-black text-blue-600 hover:text-blue-500 transition-colors">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
