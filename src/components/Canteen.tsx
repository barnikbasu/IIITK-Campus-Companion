import React, { useState } from 'react';
import { motion } from 'motion/react';
import { INITIAL_CANTEEN_MENU, ICONS } from '../constants';
import { cn } from '../lib/utils';

export default function Canteen() {
  const [filter, setFilter] = useState('all');

  const filteredMenu = filter === 'all' 
    ? INITIAL_CANTEEN_MENU 
    : INITIAL_CANTEEN_MENU.filter(i => i.category === filter);

  const categories = [
    { id: 'all', label: 'Full Menu', icon: ICONS.Coffee },
    { id: 'breakfast', label: 'Breakfast', icon: ICONS.Clock },
    { id: 'lunch', label: 'Lunch', icon: ICONS.Calendar },
    { id: 'snacks', label: 'Snacks', icon: ICONS.Clock },
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

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenu.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm",
                item.isVeg ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              )}>
                <div className={cn(
                  "w-3 h-3 rounded-sm border-2",
                  item.isVeg ? "border-emerald-600 bg-emerald-600" : "border-rose-600 bg-rose-600"
                )}></div>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-slate-900">₹{item.price}</span>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{item.category}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                  {item.name}
                </h4>
                {!item.isAvailable && (
                  <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-1 block">Currently Unavailable</span>
                )}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                <button 
                  disabled={!item.isAvailable}
                  className={cn(
                    "flex-1 py-3 rounded-2xl font-bold text-xs transition-all active:scale-95 shadow-lg",
                    item.isAvailable 
                      ? "bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700" 
                      : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                  )}
                >
                  Order Now
                </button>
                <button className="p-3 bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all active:scale-95">
                  <ICONS.Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feedback Section */}
      <div className="bg-amber-500 rounded-3xl p-10 text-white shadow-2xl shadow-amber-200 relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-3xl font-black tracking-tight mb-4">Canteen Feedback</h3>
            <p className="text-amber-100 text-lg font-medium leading-relaxed">
              Share your thoughts on the food quality or suggest new items for the menu.
            </p>
          </div>
          <button className="px-10 py-5 bg-white text-amber-600 rounded-2xl font-black text-lg shadow-xl hover:bg-amber-50 transition-all active:scale-95 whitespace-nowrap">
            Submit Feedback
          </button>
        </div>
        <ICONS.Coffee className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
      </div>
    </div>
  );
}
