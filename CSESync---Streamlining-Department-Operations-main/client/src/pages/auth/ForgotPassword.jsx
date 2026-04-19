import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/forgot-password', { email });
      setMessage(res.data.message || 'OTP sent to your email');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!otp || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/reset-password', { email, otp, password });
      setMessage(res.data.message || 'Password reset successful');
      setStep(1);
      setOtp('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-3">Forgot Password</h1>
          <p className="text-sm text-gray-500">
            Enter your email to receive an OTP, then reset your password.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl bg-red-50 border border-red-200 p-4 text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 rounded-2xl bg-green-50 border border-green-200 p-4 text-green-700">
            {message}
          </div>
        )}

        <form onSubmit={step === 1 ? handleSendOTP : handleResetPassword} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="6-digit OTP"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="New password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Repeat new password"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-blue-600 text-white font-black py-4 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Processing...' : step === 1 ? 'Send OTP' : 'Reset Password'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <Link to="/login" className="font-bold text-blue-600 hover:text-blue-500">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
