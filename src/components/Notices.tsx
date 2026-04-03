import React, { useState } from 'react';
import { motion } from 'motion/react';
import { INITIAL_NOTICES, ICONS } from '../constants';
import { cn } from '../lib/utils';

export default function Notices() {
  const [filter, setFilter] = useState('all');

  const filteredNotices = filter === 'all' 
    ? INITIAL_NOTICES 
    : INITIAL_NOTICES.filter(n => n.category === filter);

  const categories = [
    { id: 'all', label: 'All Notices', icon: ICONS.Bell },
    { id: 'academic', label: 'Academic', icon: ICONS.BookOpen },
    { id: 'event', label: 'Events', icon: ICONS.Calendar },
    { id: 'placement', label: 'Placement', icon: ICONS.UserCheck },
  ];

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-200",
              filter === cat.id
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105"
                : "bg-white text-slate-500 border border-slate-100 hover:bg-slate-50 hover:text-slate-800 shadow-sm"
            )}
          >
            <cat.icon className="w-4 h-4" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Notices List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredNotices.map((notice, idx) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border",
                    notice.category === 'academic' ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                    notice.category === 'event' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    "bg-amber-50 text-amber-600 border-amber-100"
                  )}>
                    {notice.category}
                  </span>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">• {notice.date}</span>
                </div>

                <div>
                  <h4 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                    {notice.title}
                  </h4>
                  <p className="text-slate-500 font-bold mt-1 uppercase tracking-wider text-xs">Posted by: {notice.author}</p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                  {notice.content}
                </p>

                <div className="flex items-center gap-4 pt-4">
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                    Read More
                  </button>
                  <button className="p-3 bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all active:scale-95">
                    <ICONS.Download className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {notice.isImportant && (
                <div className="flex flex-col items-center gap-2 p-4 bg-rose-50 rounded-2xl text-rose-500 border border-rose-100 shadow-sm">
                  <ICONS.AlertTriangle className="w-8 h-8" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Urgent</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subscription Callout */}
      <div className="bg-emerald-600 rounded-3xl p-10 text-white shadow-2xl shadow-emerald-200 relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-3xl font-black tracking-tight mb-4">Stay Updated</h3>
            <p className="text-emerald-100 text-lg font-medium leading-relaxed">
              Subscribe to instant notifications for academic updates and important campus announcements.
            </p>
          </div>
          <button className="px-10 py-5 bg-white text-emerald-600 rounded-2xl font-black text-lg shadow-xl hover:bg-emerald-50 transition-all active:scale-95 whitespace-nowrap">
            Enable Notifications
          </button>
        </div>
        <ICONS.Bell className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
      </div>
    </div>
  );
}
