import React from 'react';
import { motion } from 'motion/react';
import { ICONS, INITIAL_NOTICES, INITIAL_TIMETABLE, INITIAL_EVENTS } from '../constants';
import { cn } from '../lib/utils';
import { User } from '../types';

interface DashboardProps {
  user: User | null;
  setActiveTab: (tab: string) => void;
}

export default function Dashboard({ user, setActiveTab }: DashboardProps) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayClasses = INITIAL_TIMETABLE.filter(item => item.day === today);
  const recentNotices = INITIAL_NOTICES.slice(0, 3);
  const upcomingEvents = INITIAL_EVENTS.slice(0, 2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Welcome Section - Bento Large */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-8 bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group"
      >
        <div className="relative z-10">
          <h2 className="text-5xl font-black tracking-tight mb-4 leading-none">
            Welcome back, <br />
            <span className="text-indigo-200">{user?.name.split(' ')[0]}!</span>
          </h2>
          <p className="text-indigo-100 text-xl font-medium max-w-md leading-relaxed">
            You have {todayClasses.length} classes today. Your current attendance is looking good at 82%.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button 
              onClick={() => setActiveTab('timetable')}
              className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm shadow-xl hover:bg-indigo-50 transition-all active:scale-95"
            >
              View Schedule
            </button>
            <button 
              onClick={() => setActiveTab('attendance')}
              className="px-8 py-4 bg-indigo-500/30 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-sm shadow-xl hover:bg-indigo-500/40 transition-all active:scale-95"
            >
              Check Attendance
            </button>
          </div>
        </div>
        <ICONS.Zap className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
      </motion.div>

      {/* Quick Stats - Bento Small */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="lg:col-span-4 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-lg shadow-emerald-50">
            <ICONS.Attendance className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">On Track</span>
        </div>
        <div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2">Overall Attendance</p>
          <h3 className="text-5xl font-black text-slate-900 leading-none">82<span className="text-2xl text-slate-300">%</span></h3>
          <div className="mt-6 w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '82%' }}></div>
          </div>
        </div>
      </motion.div>

      {/* Today's Schedule - Bento Medium */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-4 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Today's Routine</h3>
          <button onClick={() => setActiveTab('timetable')} className="text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline">Full View</button>
        </div>
        <div className="space-y-6">
          {todayClasses.length > 0 ? todayClasses.map((item, idx) => (
            <div key={item.id} className="flex gap-6 group">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-3 h-3 rounded-full ring-4 ring-white shadow-sm",
                  idx === 0 ? "bg-indigo-600" : "bg-slate-200"
                )}></div>
                {idx !== todayClasses.length - 1 && <div className="w-0.5 h-full bg-slate-100 mt-2"></div>}
              </div>
              <div className="pb-6">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{item.startTime}</p>
                <h4 className="text-lg font-black text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight">{item.subject}</h4>
                <p className="text-sm font-medium text-slate-500 mt-1">{item.room} • {item.teacher}</p>
              </div>
            </div>
          )) : (
            <div className="text-center py-10">
              <ICONS.Calendar className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-bold text-sm">No classes today. Enjoy!</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Recent Notices - Bento Medium */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="lg:col-span-4 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Latest Notices</h3>
          <button onClick={() => setActiveTab('notices')} className="text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline">All News</button>
        </div>
        <div className="space-y-6">
          {recentNotices.map((notice) => (
            <div key={notice.id} className="group cursor-pointer" onClick={() => setActiveTab('notices')}>
              <div className="flex items-center gap-3 mb-2">
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                  notice.category === 'academic' ? "bg-indigo-50 text-indigo-600" :
                  notice.category === 'placement' ? "bg-rose-50 text-rose-600" :
                  "bg-emerald-50 text-emerald-600"
                )}>
                  {notice.category}
                </span>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{notice.date}</span>
              </div>
              <h4 className="text-lg font-black text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight line-clamp-2">
                {notice.title}
              </h4>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Campus Highlights - Bento Medium */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="lg:col-span-4 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm overflow-hidden relative group"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Highlights</h3>
          <ICONS.Award className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="space-y-6">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="relative rounded-2xl overflow-hidden aspect-video group/event cursor-pointer">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover/event:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent p-6 flex flex-col justify-end">
                <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">{event.category}</p>
                <h4 className="text-lg font-black text-white leading-tight">{event.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions - Bento Wide */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {[
          { id: 'clubs', label: 'Clubs', icon: ICONS.Globe, color: 'bg-indigo-50 text-indigo-600 shadow-indigo-100' },
          { id: 'mentorship', label: 'Mentors', icon: ICONS.Users, color: 'bg-rose-50 text-rose-600 shadow-rose-100' },
          { id: 'wellness', label: 'Wellness', icon: ICONS.Heart, color: 'bg-emerald-50 text-emerald-600 shadow-emerald-100' },
          { id: 'resources', label: 'Library', icon: ICONS.Resources, color: 'bg-amber-50 text-amber-600 shadow-amber-100' },
        ].map((action) => (
          <button
            key={action.id}
            onClick={() => setActiveTab(action.id)}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group text-center"
          >
            <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110 duration-500 shadow-lg", action.color)}>
              <action.icon className="w-8 h-8" />
            </div>
            <p className="text-sm font-black text-slate-900 uppercase tracking-widest">{action.label}</p>
          </button>
        ))}
      </motion.div>
    </div>
  );
}
