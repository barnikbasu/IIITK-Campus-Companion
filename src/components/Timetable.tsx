import React, { useState } from 'react';
import { motion } from 'motion/react';
import { INITIAL_TIMETABLE, ICONS } from '../constants';
import { cn } from '../lib/utils';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const filteredTimetable = INITIAL_TIMETABLE.filter(item => item.day === selectedDay);

  return (
    <div className="space-y-8">
      {/* Day Selector */}
      <div className="flex flex-wrap items-center gap-3 p-3 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-x-auto custom-scrollbar">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={cn(
              "px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 whitespace-nowrap",
              selectedDay === day
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            )}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Timetable Grid/List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredTimetable.length > 0 ? (
          filteredTimetable.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                {/* Time Block */}
                <div className="flex flex-col items-center justify-center min-w-[120px] p-4 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition-colors">
                  <span className="text-sm font-black text-slate-400 group-hover:text-indigo-400 uppercase tracking-tighter">{item.startTime}</span>
                  <div className="w-0.5 h-6 bg-slate-200 my-2 group-hover:bg-indigo-200"></div>
                  <span className="text-sm font-black text-slate-400 group-hover:text-indigo-400 uppercase tracking-tighter">{item.endTime}</span>
                </div>

                {/* Info Block */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                      {item.subject}
                    </h4>
                    <p className="text-slate-500 font-bold mt-1 uppercase tracking-wider text-xs">{item.teacher}</p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
                      <ICONS.MapPin className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
                      <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-600 uppercase tracking-widest">{item.room}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
                      <ICONS.Clock className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
                      <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-600 uppercase tracking-widest">1 Hour</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button className="p-3 bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all active:scale-95">
                    <ICONS.Bell className="w-5 h-5" />
                  </button>
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                    View Notes
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <ICONS.Calendar className="w-10 h-10 text-slate-300" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">No classes scheduled</h4>
            <p className="text-slate-400 mt-2 font-medium">Enjoy your free time or catch up on studies!</p>
          </div>
        )}
      </div>
    </div>
  );
}
