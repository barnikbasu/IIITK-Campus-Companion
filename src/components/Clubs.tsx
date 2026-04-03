import React, { useState } from 'react';
import { motion } from 'motion/react';
import { INITIAL_CLUBS, ICONS } from '../constants';
import { cn } from '../lib/utils';

export default function Clubs() {
  const [filter, setFilter] = useState('all');

  const filteredClubs = filter === 'all' 
    ? INITIAL_CLUBS 
    : INITIAL_CLUBS.filter(c => c.category === filter);

  const categories = [
    { id: 'all', label: 'All Clubs', icon: ICONS.Globe },
    { id: 'technical', label: 'Technical', icon: ICONS.Zap },
    { id: 'cultural', label: 'Cultural', icon: ICONS.Award },
    { id: 'sports', label: 'Sports', icon: ICONS.Smartphone },
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

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club, idx) => (
          <motion.div
            key={club.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                club.category === 'technical' ? "bg-indigo-100 text-indigo-600" :
                club.category === 'cultural' ? "bg-rose-100 text-rose-600" :
                "bg-emerald-100 text-emerald-600"
              )}>
                {club.category}
              </span>
            </div>

            <div className="w-24 h-24 rounded-3xl bg-slate-50 border-2 border-white shadow-sm overflow-hidden mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
              <img src={club.logo} alt={club.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>

            <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
              {club.name}
            </h4>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed line-clamp-2">
              {club.description}
            </p>

            <div className="mt-8 flex items-center justify-center gap-8 pt-6 border-t border-slate-50">
              <div className="text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Members</p>
                <p className="text-sm font-black text-slate-800 mt-1">{club.members}+</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Lead</p>
                <p className="text-sm font-black text-slate-800 mt-1 truncate max-w-[100px]">{club.lead.split(' ')[0]}</p>
              </div>
            </div>

            <button className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all">
              Join Club
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
