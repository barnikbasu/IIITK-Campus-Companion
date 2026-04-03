import React, { useState } from 'react';
import { motion } from 'motion/react';
import { INITIAL_FACULTY, ICONS } from '../constants';
import { cn } from '../lib/utils';

export default function Directory() {
  const [search, setSearch] = useState('');

  const filteredFaculty = INITIAL_FACULTY.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1 relative">
          <ICONS.Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-3xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-3xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
          <ICONS.Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((faculty, idx) => (
          <motion.div
            key={faculty.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group text-center"
          >
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-md overflow-hidden mx-auto group-hover:scale-105 transition-transform">
                <img 
                  src={faculty.photo} 
                  alt={faculty.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center text-white shadow-sm">
                <ICONS.UserCheck className="w-4 h-4" />
              </div>
            </div>

            <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
              {faculty.name}
            </h4>
            <p className="text-indigo-600 font-bold mt-1 uppercase tracking-widest text-[10px]">{faculty.designation}</p>
            <p className="text-slate-400 font-medium text-xs mt-1">{faculty.department}</p>

            <div className="mt-8 space-y-3 pt-6 border-t border-slate-50">
              <div className="flex items-center gap-3 text-slate-500 hover:text-indigo-600 transition-colors group/item">
                <div className="p-2 bg-slate-50 rounded-xl group-hover/item:bg-indigo-50 transition-colors">
                  <ICONS.Notices className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold truncate">{faculty.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 hover:text-indigo-600 transition-colors group/item">
                <div className="p-2 bg-slate-50 rounded-xl group-hover/item:bg-indigo-50 transition-colors">
                  <ICONS.MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold truncate">{faculty.office}</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <button className="py-3 bg-slate-50 text-slate-600 rounded-2xl font-bold text-xs hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-95">
                Profile
              </button>
              <button className="py-3 bg-indigo-600 text-white rounded-2xl font-bold text-xs shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                Message
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Staff Directory Callout */}
      <div className="bg-slate-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-3xl font-black tracking-tight mb-4 text-white">Non-Teaching Staff</h3>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              Find contact information for administrative, technical, and support staff members.
            </p>
          </div>
          <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-lg shadow-xl hover:bg-slate-100 transition-all active:scale-95 whitespace-nowrap">
            View Staff Directory
          </button>
        </div>
        <ICONS.Directory className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
      </div>
    </div>
  );
}
