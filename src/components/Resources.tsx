import React, { useState } from 'react';
import { motion } from 'motion/react';
import { INITIAL_RESOURCES, ICONS } from '../constants';
import { cn } from '../lib/utils';

export default function Resources() {
  const [filter, setFilter] = useState('all');

  const filteredResources = filter === 'all' 
    ? INITIAL_RESOURCES 
    : INITIAL_RESOURCES.filter(r => r.type === filter);

  const resourceTypes = [
    { id: 'all', label: 'All Resources', icon: ICONS.BookOpen },
    { id: 'note', label: 'Lecture Notes', icon: ICONS.FileText },
    { id: 'pyq', label: 'Previous Year Papers', icon: ICONS.Calendar },
    { id: 'assignment', label: 'Assignments', icon: ICONS.Download },
  ];

  return (
    <div className="space-y-8">
      {/* Type Filter */}
      <div className="flex flex-wrap items-center gap-4">
        {resourceTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setFilter(type.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-200",
              filter === type.id
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105"
                : "bg-white text-slate-500 border border-slate-100 hover:bg-slate-50 hover:text-slate-800 shadow-sm"
            )}
          >
            <type.icon className="w-4 h-4" />
            {type.label}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((resource, idx) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm",
                resource.type === 'note' ? "bg-indigo-50 text-indigo-600" :
                resource.type === 'pyq' ? "bg-emerald-50 text-emerald-600" :
                "bg-amber-50 text-amber-600"
              )}>
                {resource.type === 'note' ? <ICONS.FileText className="w-7 h-7" /> :
                 resource.type === 'pyq' ? <ICONS.Calendar className="w-7 h-7" /> :
                 <ICONS.Download className="w-7 h-7" />}
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Semester {resource.semester}</span>
                <p className="text-xs text-slate-500 font-bold mt-1">{resource.date}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                  {resource.title}
                </h4>
                <p className="text-slate-500 font-bold mt-1 uppercase tracking-wider text-xs">{resource.subject}</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                  {resource.uploadedBy.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Uploaded By</p>
                  <p className="text-xs font-bold text-slate-700 mt-1">{resource.uploadedBy}</p>
                </div>
                <button 
                  className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-90 transition-all"
                >
                  <ICONS.Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upload Section */}
      <div className="bg-indigo-600 rounded-3xl p-10 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-3xl font-black tracking-tight mb-4">Contribute to the Hub</h3>
            <p className="text-indigo-100 text-lg font-medium leading-relaxed">
              Help your peers by sharing your notes, assignments, and previous year question papers.
            </p>
          </div>
          <button className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-50 transition-all active:scale-95 whitespace-nowrap">
            Upload Resource
          </button>
        </div>
        <ICONS.BookOpen className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
      </div>
    </div>
  );
}
