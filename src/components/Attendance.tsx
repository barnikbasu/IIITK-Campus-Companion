import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ICONS } from '../constants';
import { cn } from '../lib/utils';
import { AttendanceRecord } from '../types';

const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { subjectId: '1', subjectName: 'Operating Systems', attended: 12, total: 15 },
  { subjectId: '2', subjectName: 'Database Management Systems', attended: 14, total: 16 },
  { subjectId: '3', subjectName: 'Computer Networks', attended: 10, total: 15 },
  { subjectId: '4', subjectName: 'Design and Analysis of Algorithms', attended: 15, total: 18 },
  { subjectId: '5', subjectName: 'Software Engineering', attended: 8, total: 10 },
];

export default function Attendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('iiitk_attendance');
    if (saved) {
      setRecords(JSON.parse(saved));
    } else {
      setRecords(INITIAL_ATTENDANCE);
    }
  }, []);

  const updateAttendance = (id: string, increment: boolean) => {
    const newRecords = records.map(r => {
      if (r.subjectId === id) {
        const newAttended = increment ? r.attended + 1 : Math.max(0, r.attended - 1);
        const newTotal = increment ? r.total + 1 : Math.max(newAttended, r.total - 1);
        return { ...r, attended: newAttended, total: newTotal };
      }
      return r;
    });
    setRecords(newRecords);
    localStorage.setItem('iiitk_attendance', JSON.stringify(newRecords));
  };

  const calculatePercentage = (attended: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((attended / total) * 100);
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 75) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (percentage >= 65) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-emerald-500';
    if (percentage >= 65) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
            <ICONS.Attendance className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Overall Attendance</p>
            <h3 className="text-2xl font-black text-slate-800">
              {Math.round(records.reduce((acc, r) => acc + calculatePercentage(r.attended, r.total), 0) / records.length || 0)}%
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm">
            <ICONS.UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Safe Subjects</p>
            <h3 className="text-2xl font-black text-slate-800">
              {records.filter(r => calculatePercentage(r.attended, r.total) >= 75).length}
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shadow-sm">
            <ICONS.AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">At Risk</p>
            <h3 className="text-2xl font-black text-slate-800">
              {records.filter(r => calculatePercentage(r.attended, r.total) < 75).length}
            </h3>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="grid grid-cols-1 gap-6">
        {records.map((record, idx) => {
          const percentage = calculatePercentage(record.attended, record.total);
          return (
            <motion.div
              key={record.subjectId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                        {record.subjectName}
                      </h4>
                      <p className="text-slate-400 font-bold mt-1 uppercase tracking-wider text-[10px]">Subject ID: {record.subjectId}</p>
                    </div>
                    <div className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest border",
                      getStatusColor(percentage)
                    )}>
                      {percentage}%
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <span>Progress</span>
                      <span>{record.attended} / {record.total} Classes</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={cn("h-full rounded-full shadow-sm", getProgressColor(percentage))}
                      />
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-8">
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => updateAttendance(record.subjectId, true)}
                      className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-90 transition-all"
                    >
                      <ICONS.Plus className="w-6 h-6" />
                    </button>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Present</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => updateAttendance(record.subjectId, false)}
                      className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 active:scale-90 transition-all"
                    >
                      <span className="text-2xl font-black leading-none">−</span>
                    </button>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Absent</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex items-start gap-4">
        <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
          <ICONS.AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-amber-900 uppercase tracking-tight">Attendance Policy Reminder</h4>
          <p className="text-amber-700 text-sm mt-1 leading-relaxed">
            A minimum of 75% attendance is required to be eligible for the end-semester examinations. 
            Subjects with attendance below 75% are marked in red.
          </p>
        </div>
      </div>
    </div>
  );
}
