'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, LogIn, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup, resendVerificationEmail } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password, displayName, isSignUp });
    setIsLoading(true);
    try {
      if (isSignUp) {
        if (!displayName.trim()) {
          toast.error('Display name is required!');
          console.log('Signup failed: Missing display name');
          return;
        }
        console.log('Attempting signup...');
        await signup(email, password, displayName);
        toast.success('Account created! Please check your email to verify your account.');
      } else {
        console.log('Attempting login...');
        await login(email, password);
        toast.success('Logged in!');
      }
    } catch (error) {
      console.error('Auth error:', error.message);
      if (error.message.includes('verify your email')) {
        toast.error(
          <div>
            <p>Please verify your email.</p>
            <button
              onClick={async () => {
                try {
                  await resendVerificationEmail();
                  toast.success('Verification email resent!');
                } catch (err) {
                  toast.error(err.message);
                }
              }}
              className="underline text-blue-500"
            >
              Resend verification email
            </button>
          </div>,
          { duration: 5000 }
        );
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#fff',
            color: '#333',
            borderRadius: '8px',
          },
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 max-w-md w-full border border-gray-100"
      >
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Noteify</h1>
        </div>
        <div className="flex justify-center mb-6">
          <div className="relative w-40 bg-gray-200 rounded-full p-1">
            <motion.div
              className="absolute top-1 left-1 w-20 h-8 bg-blue-500 rounded-full"
              animate={{ x: isSignUp ? 76 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
            <div className="flex justify-between text-sm font-medium text-gray-700 relative z-10">
              <button
                onClick={() => setIsSignUp(false)}
                className={`w-20 py-2 ${!isSignUp ? 'text-white' : 'text-gray-600'}`}
              >
                Login
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`w-20 py-2 ${isSignUp ? 'text-white' : 'text-gray-600'}`}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 absolute left-3" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full pl-10 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  disabled={isLoading}
                />
              </div>
            </div>
          )}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-10 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                disabled={isLoading}
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.05 }}
            whileTap={{ scale: isLoading ? 1 : 0.95 }}
            type="submit"
            className={`w-full p-3 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 transition ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <LogIn className="w-5 h-5" />
            )}
            {isSignUp ? 'Sign Up' : 'Login'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}