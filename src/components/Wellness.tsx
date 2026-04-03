import React from 'react';
import { motion } from 'motion/react';
import { WELLNESS_RESOURCES, ICONS } from '../constants';
import { cn } from '../lib/utils';

export default function Wellness() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-rose-600 rounded-[3rem] p-12 text-white shadow-2xl shadow-rose-200 relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
          <div className="max-w-xl">
            <h3 className="text-5xl font-black tracking-tight mb-6 text-white leading-none">Your Well-being Matters.</h3>
            <p className="text-rose-100 text-xl font-medium leading-relaxed">
              Access mental health support, counseling, and wellness resources designed for the IIIT Kalyani community.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="px-10 py-5 bg-white text-rose-600 rounded-2xl font-black text-lg shadow-xl hover:bg-rose-50 transition-all active:scale-95 whitespace-nowrap flex items-center gap-3">
                <ICONS.Shield className="w-6 h-6" />
                Emergency SOS
              </button>
              <button className="px-10 py-5 bg-rose-500/30 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-lg shadow-xl hover:bg-rose-500/40 transition-all active:scale-95 whitespace-nowrap">
                Book Counseling
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <ICONS.Heart className="w-64 h-64 text-white/20 animate-pulse" />
          </div>
        </div>
        <ICONS.Heart className="absolute -right-20 -bottom-20 w-96 h-96 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
      </div>

      {/* Wellness Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {WELLNESS_RESOURCES.map((resource, idx) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group text-center relative overflow-hidden"
          >
            <div className={cn(
              "w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg mx-auto mb-8 transition-transform group-hover:scale-110 duration-500",
              resource.category === 'counseling' ? "bg-indigo-50 text-indigo-600 shadow-indigo-100" :
              resource.category === 'physical-health' ? "bg-emerald-50 text-emerald-600 shadow-emerald-100" :
              "bg-rose-50 text-rose-600 shadow-rose-100"
            )}>
              {resource.icon === 'Heart' ? <ICONS.Heart className="w-10 h-10" /> :
               resource.icon === 'Zap' ? <ICONS.Zap className="w-10 h-10" /> :
               <ICONS.Shield className="w-10 h-10" />}
            </div>

            <h4 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
              {resource.title}
            </h4>
            <p className="text-slate-500 text-lg mt-4 leading-relaxed font-medium">
              {resource.description}
            </p>

            <button className="mt-10 w-full py-5 bg-slate-50 text-slate-600 rounded-2xl font-black text-sm hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-95">
              Learn More
            </button>
          </motion.div>
        ))}
      </div>

      {/* Quote Section */}
      <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm text-center max-w-4xl mx-auto">
        <ICONS.MessageSquare className="w-12 h-12 text-indigo-600 mx-auto mb-8 opacity-20" />
        <h3 className="text-3xl font-black text-slate-900 italic tracking-tight leading-relaxed">
          "It's okay to not be okay. Your mental health is just as important as your physical health."
        </h3>
        <p className="text-slate-400 font-bold mt-8 uppercase tracking-widest text-sm">— IIITK Wellness Center</p>
      </div>
    </div>
  );
}
