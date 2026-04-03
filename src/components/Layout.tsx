import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ICONS } from '../constants';
import { cn } from '../lib/utils';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User | null;
  onLogout: () => void;
}

export default function Layout({ children, activeTab, setActiveTab, user, onLogout }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ICONS.Dashboard },
    { id: 'timetable', label: 'Timetable', icon: ICONS.Calendar },
    { id: 'attendance', label: 'Attendance', icon: ICONS.Attendance },
    { id: 'resources', label: 'Resources', icon: ICONS.Resources },
    { id: 'notices', label: 'Notices', icon: ICONS.Notices },
    { id: 'clubs', label: 'Clubs', icon: ICONS.Globe },
    { id: 'mentorship', label: 'Mentorship', icon: ICONS.Users },
    { id: 'wellness', label: 'Wellness', icon: ICONS.Heart },
    { id: 'directory', label: 'Directory', icon: ICONS.Directory },
    { id: 'lost-found', label: 'Lost & Found', icon: ICONS.LostFound },
    { id: 'canteen', label: 'Canteen', icon: ICONS.Canteen },
    { id: 'ai-assistant', label: 'AI Assistant', icon: ICONS.AI },
  ];

  return (
    <div className={cn(
      "min-h-screen font-sans transition-colors duration-300",
      isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    )}>
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 320 : 100 }}
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 border-r transition-colors duration-300",
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
        )}
      >
        <div className="h-full flex flex-col p-6">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-12 px-2">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 shrink-0">
              <span className="text-2xl font-black">I</span>
            </div>
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <h1 className="text-xl font-black tracking-tight">IIIT Kalyani</h1>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Campus Companion</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group relative",
                  activeTab === item.id
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100"
                    : isDarkMode 
                      ? "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className={cn(
                  "w-6 h-6 shrink-0 transition-transform group-hover:scale-110",
                  activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-indigo-500"
                )} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-sm font-bold whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {activeTab === item.id && !isSidebarOpen && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-l-full"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="mt-8 pt-8 border-t border-slate-100 space-y-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all",
                isDarkMode ? "text-slate-400 hover:bg-slate-800" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              <ICONS.ChevronRight className={cn(
                "w-6 h-6 transition-transform",
                isSidebarOpen ? "rotate-180" : "rotate-0"
              )} />
              {isSidebarOpen && <span className="text-sm font-bold">Collapse</span>}
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all"
            >
              <ICONS.LogOut className="w-6 h-6" />
              {isSidebarOpen && <span className="text-sm font-bold">Logout</span>}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main 
        className="transition-all duration-300"
        style={{ marginLeft: isSidebarOpen ? 320 : 100 }}
      >
        {/* Header */}
        <header className={cn(
          "sticky top-0 z-40 h-24 border-b px-10 flex items-center justify-between transition-colors duration-300",
          isDarkMode ? "bg-slate-900/80 border-slate-800 backdrop-blur-md" : "bg-white/80 border-slate-100 backdrop-blur-md"
        )}>
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black tracking-tight capitalize">
              {activeTab.replace('-', ' ')}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm border",
                isDarkMode ? "bg-slate-800 border-slate-700 text-amber-400" : "bg-slate-50 border-slate-100 text-slate-400"
              )}
            >
              {isDarkMode ? <ICONS.Sun className="w-6 h-6" /> : <ICONS.Moon className="w-6 h-6" />}
            </button>

            <button className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm border",
              isDarkMode ? "bg-slate-800 border-slate-700 text-slate-400" : "bg-slate-50 border-slate-100 text-slate-400"
            )}>
              <ICONS.Bell className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black leading-none">{user?.name}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{user?.role}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border-2 border-white shadow-md overflow-hidden">
                <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-10 max-w-[1600px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
