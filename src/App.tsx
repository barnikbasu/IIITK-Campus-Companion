/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Timetable from './components/Timetable';
import Attendance from './components/Attendance';
import Resources from './components/Resources';
import Notices from './components/Notices';
import Directory from './components/Directory';
import LostFound from './components/LostFound';
import Canteen from './components/Canteen';
import AIAssistant from './components/AIAssistant';
import { User, Role } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '', role: 'student' as Role });

  useEffect(() => {
    const savedUser = localStorage.getItem('iiitk_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    const newUser: User = {
      id: '1',
      name: loginForm.email.split('@')[0].replace('.', ' '),
      email: loginForm.email,
      role: loginForm.role,
      department: 'Computer Science',
      semester: 4,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginForm.email}`
    };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('iiitk_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('iiitk_user');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-md w-full relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-indigo-600"></div>
          
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 mb-6">
              <span className="text-3xl font-black">I</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Campus Companion</h2>
            <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">IIIT Kalyani Internal Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                placeholder="yourname@iiitkalyani.ac.in"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Your Role</label>
              <div className="grid grid-cols-3 gap-3">
                {(['student', 'teacher', 'staff'] as Role[]).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setLoginForm({ ...loginForm, role })}
                    className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      loginForm.role === role
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                        : 'bg-slate-50 text-slate-400 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all mt-4"
            >
              Sign In
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase font-black tracking-widest">
                <span className="bg-white px-4 text-slate-300">Or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const guestUser: User = {
                  id: 'guest',
                  name: 'Guest Student',
                  email: 'guest@iiitkalyani.ac.in',
                  role: 'student',
                  department: 'General',
                  semester: 1,
                  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest'
                };
                setUser(guestUser);
                setIsLoggedIn(true);
              }}
              className="w-full py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-50 active:scale-95 transition-all"
            >
              Continue as Guest
            </button>
          </form>

          <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-10">
            For internal use only • © 2026 IIIT Kalyani
          </p>
        </motion.div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard user={user} setActiveTab={setActiveTab} />;
      case 'timetable': return <Timetable />;
      case 'attendance': return <Attendance />;
      case 'resources': return <Resources />;
      case 'notices': return <Notices />;
      case 'directory': return <Directory />;
      case 'lost-found': return <LostFound />;
      case 'canteen': return <Canteen />;
      case 'ai-assistant': return <AIAssistant />;
      default: return <Dashboard user={user} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      user={user} 
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
}

