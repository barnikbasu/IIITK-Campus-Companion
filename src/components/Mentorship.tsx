import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ICONS } from '../constants';
import { cn } from '../lib/utils';
import { User } from '../types';

const INITIAL_MENTORS: User[] = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@iiitkalyani.ac.in', role: 'mentor', isMentor: true, mentorBio: 'Final year CSE student. Expert in Web Dev and Competitive Programming.', mentorSkills: ['React', 'Node.js', 'C++'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul' },
  { id: '2', name: 'Ananya Das', email: 'ananya@iiitkalyani.ac.in', role: 'mentor', isMentor: true, mentorBio: 'Third year ECE student. Passionate about IoT and Robotics.', mentorSkills: ['IoT', 'Arduino', 'Python'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ananya' },
  { id: '3', name: 'Vikram Singh', email: 'vikram@iiitkalyani.ac.in', role: 'mentor', isMentor: true, mentorBio: 'Final year CSE student. Placement coordinator and open source contributor.', mentorSkills: ['Java', 'Spring Boot', 'Open Source'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram' },
];

export default function Mentorship() {
  const [search, setSearch] = useState('');

  const filteredMentors = INITIAL_MENTORS.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.mentorSkills?.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-indigo-600 rounded-[3rem] p-12 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
          <div className="max-w-xl">
            <h3 className="text-5xl font-black tracking-tight mb-6 text-white leading-none">Find Your Mentor.</h3>
            <p className="text-indigo-100 text-xl font-medium leading-relaxed">
              Connect with seniors who can guide you through academics, placements, and campus life.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-50 transition-all active:scale-95 whitespace-nowrap flex items-center gap-3">
                Find a Mentor
              </button>
              <button className="px-10 py-5 bg-indigo-500/30 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-500/40 transition-all active:scale-95 whitespace-nowrap">
                Become a Mentor
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <ICONS.Users className="w-64 h-64 text-white/20 animate-pulse" />
          </div>
        </div>
        <ICONS.Users className="absolute -right-20 -bottom-20 w-96 h-96 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto relative">
        <ICONS.Search className="w-6 h-6 absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name or skill (e.g., React, Python)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-16 pr-6 py-6 bg-white border border-slate-200 rounded-[2.5rem] text-lg font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
        />
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMentors.map((mentor, idx) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group text-center relative overflow-hidden"
          >
            <div className="relative inline-block mb-8">
              <div className="w-28 h-28 rounded-[2rem] bg-slate-100 border-4 border-white shadow-lg overflow-hidden mx-auto group-hover:scale-110 transition-transform duration-500">
                <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-md">
                <ICONS.Award className="w-5 h-5" />
              </div>
            </div>

            <h4 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
              {mentor.name}
            </h4>
            <p className="text-indigo-600 font-bold mt-2 uppercase tracking-widest text-[10px]">Senior Mentor</p>
            
            <p className="text-slate-500 text-lg mt-6 leading-relaxed font-medium line-clamp-3">
              {mentor.mentorBio}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {mentor.mentorSkills?.map(skill => (
                <span key={skill} className="px-4 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-100">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <button className="py-4 bg-slate-50 text-slate-600 rounded-2xl font-black text-sm hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-95">
                Profile
              </button>
              <button className="py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                Connect
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
