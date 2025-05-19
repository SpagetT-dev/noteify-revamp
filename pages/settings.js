'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Sun, Moon, Bell, Shield, User, Palette, ArrowLeft, X } from 'lucide-react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Use centralized firestore.js

export default function SettingsPage() {
  const { user, loading, logout, updateUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });
  const [twoFactor, setTwoFactor] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const initializeTheme = async () => {
      let savedTheme = localStorage.getItem('theme') || 'light';
      console.log('Settings: Initial theme from localStorage:', savedTheme);

      if (user) {
        console.log('Settings: User UID:', user.uid);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          console.log('Settings: User document exists:', userDoc.exists());
          if (!userDoc.exists()) {
            console.log('Settings: Creating user document for UID:', user.uid);
            await setDoc(userDocRef, {
              displayName: user.displayName || 'User',
              theme: savedTheme,
              createdAt: new Date().toISOString(),
            });
            console.log('Settings: User document created with theme:', savedTheme);
          } else if (userDoc.data().theme) {
            savedTheme = userDoc.data().theme;
            console.log('Settings: Theme from Firestore:', savedTheme);
          } else {
            console.log('Settings: No theme in Firestore, using localStorage:', savedTheme);
          }
        } catch (error) {
          console.error('Settings: Error fetching/creating theme from Firestore:', error);
          toast.error('Failed to load theme preference.');
        }
      }

      console.log('Settings: Applying theme:', savedTheme);
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(savedTheme);
      console.log('Settings: DOM data-theme:', document.documentElement.getAttribute('data-theme'));
      console.log('Settings: DOM classes:', document.documentElement.className);
    };

    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      setDisplayName(user.displayName || '');
      initializeTheme();
    }
  }, [user, loading, router]);

  const handleThemeChange = async (newTheme) => {
    console.log('Settings: Changing theme to:', newTheme);
    try {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      console.log('Settings: Saved theme to localStorage:', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
      console.log('Settings: Updated DOM data-theme:', document.documentElement.getAttribute('data-theme'));
      console.log('Settings: Updated DOM classes:', document.documentElement.className);

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        console.log('Settings: User document exists before update:', userDoc.exists());
        if (!userDoc.exists()) {
          console.log('Settings: Creating user document for theme update:', user.uid);
          await setDoc(userDocRef, {
            displayName: user.displayName || 'User',
            theme: newTheme,
            createdAt: new Date().toISOString(),
          });
          console.log('Settings: User document created with theme:', newTheme);
        } else {
          await updateDoc(userDocRef, { theme: newTheme });
          console.log('Settings: Updated Firestore theme:', newTheme);
        }
      }

      toast.success(`Theme changed to ${newTheme}!`);
      setActiveTab(null);
    } catch (error) {
      console.error('Settings: Error saving theme:', error);
      toast.error('Failed to save theme preference.');
    }
  };

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} notifications ${notifications[type] ? 'disabled' : 'enabled'}!`);
  };

  const handleTwoFactorToggle = () => {
    setTwoFactor(!twoFactor);
    toast.success(`Two-factor authentication ${twoFactor ? 'disabled' : 'enabled'}!`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out!');
      router.push('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-300 text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col font-sans">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col p-4 sm:p-6"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Settings</h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </motion.button>
        </div>
        <nav className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center space-x-4 p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors"
            >
              <tab.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">{tab.label}</span>
            </motion.button>
          ))}
        </nav>
      </motion.div>

      <AnimatePresence>
        {activeTab && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-gray-800 p-6 sm:p-8 overflow-y-auto font-sans"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTab(null)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Close panel"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </motion.button>
            </div>

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="mt-1 w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Display Name</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your Name"
                      className="mt-1 w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-base"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors font-semibold text-base"
                  >
                    Update Profile
                  </motion.button>
                </form>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Theme</label>
                    <div className="mt-2 flex space-x-4">
                      <button
                        onClick={() => handleThemeChange('light')}
                        className={`flex items-center space-x-2 p-3 rounded-lg border ${
                          theme === 'light'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                            : 'border-gray-200 dark:border-gray-600'
                        } text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold text-base`}
                      >
                        <Sun className="w-5 h-5" />
                        <span>Light</span>
                      </button>
                      <button
                        onClick={() => handleThemeChange('dark')}
                        className={`flex items-center space-x-2 p-3 rounded-lg border ${
                          theme === 'dark'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                            : 'border-gray-200 dark:border-gray-600'
                        } text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold text-base`}
                      >
                        <Moon className="w-5 h-5" />
                        <span>Dark</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {['email', 'push', 'sms'].map((type) => (
                    <div key={type} className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 capitalize">
                        {type} Notifications
                      </label>
                      <input
                        type="checkbox"
                        checked={notifications[type]}
                        onChange={() => handleNotificationChange(type)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Two-Factor Authentication
                    </label>
                    <input
                      type="checkbox"
                      checked={twoFactor}
                      onChange={handleTwoFactorToggle}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-500 transition-colors font-semibold text-base"
                  >
                    Log Out
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}