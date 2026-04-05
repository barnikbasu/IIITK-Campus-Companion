import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  Library, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Mail, 
  Globe, 
  Users, 
  Clock, 
  ChevronRight,
  Menu,
  X,
  Calculator,
  Bell,
  Search,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Info
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from './lib/utils';

// --- Types ---
interface Notice {
  id: number;
  title: string;
  date: string;
  category: 'Academic' | 'Event' | 'Admin';
  important: boolean;
}

interface Contact {
  name: string;
  role: string;
  phone: string;
  email: string;
}

// --- Mock Data ---
const NOTICES: Notice[] = [
  { id: 1, title: "End Semester Examination Schedule Released", date: "2026-04-10", category: "Academic", important: true },
  { id: 2, title: "Annual Cultural Fest 'Advaita' Registrations Open", date: "2026-04-15", category: "Event", important: false },
  { id: 3, title: "New Library Timings: 8 AM to 10 PM", date: "2026-04-05", category: "Admin", important: false },
  { id: 4, title: "Scholarship Application Deadline Extended", date: "2026-04-20", category: "Admin", important: true },
];

const CONTACTS: Contact[] = [
  { name: "Dr. S. Mukherjee", role: "Academic Dean", phone: "+91 33 2582 2240", email: "dean.acad@iiitkalyani.ac.in" },
  { name: "Mr. R. Das", role: "Hostel Warden", phone: "+91 98765 43210", email: "warden@iiitkalyani.ac.in" },
  { name: "Campus Security", role: "Emergency", phone: "+91 33 2582 1234", email: "security@iiitkalyani.ac.in" },
];

const QUICK_LINKS = [
  { name: 'LMS Portal', icon: GraduationCap, url: 'https://lms.iiitkalyani.ac.in', color: 'bg-blue-500' },
  { name: 'ERP System', icon: Users, url: 'https://erp.iiitkalyani.ac.in', color: 'bg-indigo-500' },
  { name: 'Library', icon: Library, url: 'https://iiitkalyani.ac.in/library', color: 'bg-emerald-500' },
  { name: 'Calendar', icon: Calendar, url: 'https://iiitkalyani.ac.in/academic-calendar', color: 'bg-rose-500' },
];

// --- Components ---

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-10">
    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{children}</h2>
    {subtitle && <p className="mt-4 text-lg text-slate-600">{subtitle}</p>}
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    | 'dashboard' 
    | 'tools' 
    | 'directory'
    | 'schedule'
    | 'mess'
    | 'notices'
    | 'resources'
    | 'opportunities'
    | 'tasks'
    | 'lostfound'
    | 'market'
    | 'chatbot'
    | 'qa'
    | 'materials'
    | 'staff'
    | 'clubs'
  >('dashboard');
  
  // CGPA Calculator State
  const [grades, setGrades] = useState<{ credit: number; grade: number }[]>([{ credit: 0, grade: 0 }]);
  const calculateCGPA = () => {
    const totalCredits = grades.reduce((acc, curr) => acc + Number(curr.credit), 0);
    const weightedSum = grades.reduce((acc, curr) => acc + (Number(curr.credit) * Number(curr.grade)), 0);
    return totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : "0.00";
  };

  // Attendance Tracker State
  const [attendance, setAttendance] = useState<{ subject: string; attended: number; total: number }[]>([
    { subject: 'Data Structures', attended: 12, total: 15 },
    { subject: 'Algorithms', attended: 8, total: 10 },
  ]);

  // Schedule (next lectures etc.)
  const [schedule, setSchedule] = useState<Array<{ time: string; course: string; room: string; teacher: string }>>([
    { time: '09:00 - 10:00', course: 'Operating Systems', room: 'AB-203', teacher: 'Dr. Rao' },
    { time: '11:00 - 12:00', course: 'Linear Algebra', room: 'AB-105', teacher: 'Prof. Sen' },
  ]);

  // Mess Menu (simple daily menu)
  const [messMenu, setMessMenu] = useState<Array<{ meal: 'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner'; items: string[] }>>([
    { meal: 'Breakfast', items: ['Poha', 'Boiled Egg', 'Banana', 'Milk'] },
    { meal: 'Lunch', items: ['Rice', 'Dal', 'Paneer Curry', 'Salad'] },
    { meal: 'Snacks', items: ['Samosa', 'Tea'] },
    { meal: 'Dinner', items: ['Roti', 'Chicken Curry', 'Jeera Rice'] },
  ]);

  // Academic Resources
  const [resources] = useState<Array<{ title: string; type: 'Notes' | 'Syllabus' | 'Previous Year'; url: string }>>([
    { title: 'DSA Notes (PDF)', type: 'Notes', url: '#' },
    { title: 'OS Syllabus', type: 'Syllabus', url: '#' },
    { title: 'Maths PYQs', type: 'Previous Year', url: '#' },
  ]);

  // Opportunities
  const [opportunities] = useState<Array<{ title: string; org: string; deadline: string; url: string }>>([
    { title: 'Summer Internship - SDE', org: 'TechCorp', deadline: '2026-05-01', url: '#' },
    { title: 'Hackathon: Build4Campus', org: 'OpenAI Labs', deadline: '2026-04-30', url: '#' },
  ]);

  // Task Manager
  const [tasks, setTasks] = useState<Array<{ id: number; title: string; due?: string; done: boolean }>>([
    { id: 1, title: 'Submit OS Assignment 2', due: '2026-04-12', done: false },
    { id: 2, title: 'CG Lab Report', due: '2026-04-14', done: true },
  ]);

  // Lost & Found
  const [lostFound, setLostFound] = useState<Array<{ id: number; status: 'Lost' | 'Found'; item: string; where: string; contact: string }>>([
    { id: 1, status: 'Lost', item: 'Black Wallet', where: 'Canteen Area', contact: '98765 12345' },
    { id: 2, status: 'Found', item: 'Water Bottle (Blue)', where: 'Library 1st Floor', contact: 'dean.acad@iiitkalyani.ac.in' },
  ]);

  // Buy & Sell
  const [market] = useState<Array<{ id: number; title: string; price: string; condition: string; contact: string }>>([
    { id: 1, title: 'Used Calculus Book', price: '₹200', condition: 'Good', contact: 'student1@iiitkalyani.ac.in' },
    { id: 2, title: 'Headphones', price: '₹600', condition: 'Like New', contact: 'student2@iiitkalyani.ac.in' },
  ]);

  // Student–Faculty Q&A (placeholder data)
  const [faculty] = useState<Array<{ id: number; name: string; dept: string; email: string }>>([
    { id: 1, name: 'Prof. A. Gupta', dept: 'CSE', email: 'agupta@iiitkalyani.ac.in' },
    { id: 2, name: 'Dr. R. Nandi', dept: 'ECE', email: 'rnandi@iiitkalyani.ac.in' },
  ]);
  const [questions, setQuestions] = useState<Array<{ id: number; toFacultyId: number; topic: string; question: string; answer?: string }>>([
    { id: 1, toFacultyId: 1, topic: 'Assignment', question: 'Could you clarify Q3 constraints?', answer: 'Check the updated PDF; input ranges extended.' },
    { id: 2, toFacultyId: 2, topic: 'Exam', question: 'Syllabus coverage for midterm?', answer: undefined },
  ]);

  // Teacher Materials (placeholder posts)
  const [materials, setMaterials] = useState<Array<{ id: number; title: string; course: string; kind: 'Notes' | 'Slides' | 'Assignment'; url: string }>>([
    { id: 1, title: 'OS Lecture 05 Slides', course: 'Operating Systems', kind: 'Slides', url: '#' },
    { id: 2, title: 'Linear Algebra Notes Set A', course: 'Linear Algebra', kind: 'Notes', url: '#' },
  ]);

  // Staff Utilities (placeholder)
  const [staffTools] = useState<Array<{ name: string; description: string }>>([
    { name: 'Room Booking Overview', description: 'Quick view of room usage and requests.' },
    { name: 'Facility Issue Tracker', description: 'Log maintenance requests and updates.' },
  ]);

  // Clubs & Fests (Gymkhana; Status Code)
  const [clubs] = useState<Array<{ name: string; desc: string; leads: string[] }>>([
    { name: 'Coding Club', desc: 'Competitive programming & dev sessions under IIITK Gymkhana.', leads: ['Alice', 'Mohit'] },
    { name: 'Cultural Club', desc: 'Dance, music, drama events and fests.', leads: ['Priya', 'Rohan'] },
  ]);
  const [fests] = useState<Array<{ name: string; when: string; url?: string; flagship?: boolean }>>([
    { name: 'Advaita (Cultural Fest)', when: 'Every Spring', url: '#advaita' },
    { name: 'Status Code (Flagship Hackathon)', when: 'Annual', url: '#status-code', flagship: true },
  ]);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Campus<span className="text-blue-600">Companion</span>
            </span>
          </div>

          <div className="hidden md:flex md:items-center md:gap-1">
            {['dashboard','schedule','mess','notices','resources','opportunities','tasks','lostfound','market','clubs','qa','materials','staff','directory','tools','chatbot'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-all rounded-lg capitalize",
                  activeTab === tab ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {tab}
              </button>
            ))}
            <div className="ml-4 h-6 w-px bg-slate-200" />
            <button className="ml-4 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-800 active:scale-95">
              Student Login
            </button>
          </div>

          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Hero / Welcome */}
              <div className="relative overflow-hidden rounded-3xl bg-blue-600 p-8 text-white shadow-2xl shadow-blue-200 sm:p-12">
                <div className="relative z-10 max-w-2xl">
                  <h1 className="text-3xl font-bold sm:text-5xl">Welcome back, Student!</h1>
                  <p className="mt-4 text-lg text-blue-100">
                    Stay updated with the latest campus news and manage your academic life efficiently.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    {QUICK_LINKS.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-all hover:bg-white/20"
                      >
                        <link.icon size={18} /> {link.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/30 blur-3xl" />
                <div className="absolute -bottom-20 right-20 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl" />
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Notice Board */}
                <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="text-blue-600" size={24} />
                      <h3 className="text-xl font-bold">Notice Board</h3>
                    </div>
                    <button className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
                  </div>
                  <div className="space-y-4">
                    {NOTICES.map((notice) => (
                      <div key={notice.id} className="group flex items-start gap-4 rounded-2xl border border-transparent p-4 transition-all hover:border-slate-100 hover:bg-slate-50">
                        <div className={cn(
                          "mt-1 flex h-2 w-2 shrink-0 rounded-full",
                          notice.important ? "bg-rose-500 animate-pulse" : "bg-blue-500"
                        )} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{notice.category}</span>
                            <span className="text-xs text-slate-400">{notice.date}</span>
                          </div>
                          <h4 className="mt-1 font-semibold text-slate-900 group-hover:text-blue-600">{notice.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats / Attendance Preview */}
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="mb-6 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-600" size={24} />
                    <h3 className="text-xl font-bold">Attendance</h3>
                  </div>
                  <div className="space-y-6">
                    {attendance.map((item) => {
                      const percentage = (item.attended / item.total) * 100;
                      return (
                        <div key={item.subject}>
                          <div className="mb-2 flex justify-between text-sm">
                            <span className="font-medium text-slate-700">{item.subject}</span>
                            <span className={cn("font-bold", percentage < 75 ? "text-rose-600" : "text-emerald-600")}>
                              {percentage.toFixed(0)}%
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              className={cn("h-full rounded-full", percentage < 75 ? "bg-rose-500" : "bg-emerald-500")} 
                            />
                          </div>
                        </div>
                      );
                    })}
                    <button 
                      onClick={() => setActiveTab('tools')}
                      className="w-full rounded-xl bg-slate-50 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
                    >
                      Manage Attendance
                    </button>
                  </div>
                </div>
              </div>

              {/* Campus Map Preview */}
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
                  <div>
                    <h3 className="text-2xl font-bold">Campus Map</h3>
                    <p className="mt-4 text-slate-600 leading-relaxed">
                      Interactive guide to academic buildings, hostels, and recreational areas. 
                      Never get lost on campus again.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      {['Academic Block', 'Hostel 1', 'Hostel 2', 'Canteen', 'Library'].map(tag => (
                        <span key={tag} className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-medium text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="mt-8 flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95">
                      <MapPin size={18} /> Open Interactive Map
                    </button>
                  </div>
                  <div className="aspect-video rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden relative group">
                    <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/800/450')] bg-cover bg-center grayscale opacity-50 transition-all group-hover:grayscale-0 group-hover:scale-105" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 shadow-xl">
                        <Search size={32} />
                      </div>
                      <span className="mt-4 font-bold text-slate-900 bg-white/80 backdrop-blur px-4 py-1 rounded-full">Preview Map</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'tools' && (
            <motion.div
              key="tools"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 gap-8 lg:grid-cols-2"
            >
              {/* CGPA Calculator */}
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <Calculator size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">CGPA Calculator</h3>
                    <p className="text-sm text-slate-500">Calculate your semester GPA or overall CGPA.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {grades.map((g, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Credits</label>
                        <input 
                          type="number" 
                          value={g.credit || ''} 
                          onChange={(e) => {
                            const newGrades = [...grades];
                            newGrades[i].credit = Number(e.target.value);
                            setGrades(newGrades);
                          }}
                          className="w-full rounded-xl border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                          placeholder="e.g. 4"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Grade Point</label>
                        <select 
                          value={g.grade}
                          onChange={(e) => {
                            const newGrades = [...grades];
                            newGrades[i].grade = Number(e.target.value);
                            setGrades(newGrades);
                          }}
                          className="w-full rounded-xl border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                        >
                          <option value="0">Select Grade</option>
                          <option value="10">O (10)</option>
                          <option value="9">E (9)</option>
                          <option value="8">A (8)</option>
                          <option value="7">B (7)</option>
                          <option value="6">C (6)</option>
                          <option value="5">D (5)</option>
                        </select>
                      </div>
                      <button 
                        onClick={() => setGrades(grades.filter((_, idx) => idx !== i))}
                        className="mt-6 p-2 text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button 
                    onClick={() => setGrades([...grades, { credit: 0, grade: 0 }])}
                    className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    <Plus size={18} /> Add Course
                  </button>
                  <div className="text-right">
                    <span className="text-sm text-slate-500 block">Total CGPA</span>
                    <span className="text-4xl font-black text-indigo-600">{calculateCGPA()}</span>
                  </div>
                </div>
              </div>

              {/* Attendance Tracker Full */}
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Attendance Tracker</h3>
                    <p className="text-sm text-slate-500">Track your attendance for each subject.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {attendance.map((item, i) => {
                    const percentage = (item.attended / item.total) * 100;
                    return (
                      <div key={i} className="rounded-2xl border border-slate-100 p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <h4 className="font-bold text-slate-900">{item.subject}</h4>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-slate-500">{item.attended}/{item.total}</span>
                            <span className={cn("text-lg font-black", percentage < 75 ? "text-rose-600" : "text-emerald-600")}>
                              {percentage.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              const newAtt = [...attendance];
                              newAtt[i].attended++;
                              newAtt[i].total++;
                              setAttendance(newAtt);
                            }}
                            className="flex-1 rounded-lg bg-emerald-500 py-2 text-xs font-bold text-white transition-all hover:bg-emerald-600"
                          >
                            Present
                          </button>
                          <button 
                            onClick={() => {
                              const newAtt = [...attendance];
                              newAtt[i].total++;
                              setAttendance(newAtt);
                            }}
                            className="flex-1 rounded-lg bg-rose-500 py-2 text-xs font-bold text-white transition-all hover:bg-rose-600"
                          >
                            Absent
                          </button>
                        </div>
                        {percentage < 75 && (
                          <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-rose-600 uppercase">
                            <AlertCircle size={12} /> Warning: Below 75%
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'directory' && (
            <motion.div
              key="directory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <SectionHeading subtitle="Important contacts for academic and campus support.">
                Campus Directory
              </SectionHeading>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {CONTACTS.map((contact) => (
                  <div key={contact.name} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <Users size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{contact.name}</h3>
                    <p className="text-sm font-medium text-blue-600">{contact.role}</p>
                    
                    <div className="mt-8 space-y-4">
                      <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600">
                        <Phone size={16} /> {contact.phone}
                      </a>
                      <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600">
                        <Mail size={16} /> {contact.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergency Banner */}
              <div className="rounded-3xl bg-rose-50 p-8 border border-rose-100 flex flex-col sm:flex-row items-center gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-200">
                  <Phone size={32} className="animate-bounce" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-rose-900">Emergency Helpline</h4>
                  <p className="text-rose-700">In case of any medical or security emergency, call the 24/7 campus helpline immediately.</p>
                </div>
                <a href="tel:+913325821234" className="sm:ml-auto rounded-full bg-rose-600 px-8 py-3 text-white font-bold shadow-lg hover:bg-rose-700 transition-all">
                  Call Now
                </a>
              </div>
            </motion.div>
          )}

          {activeTab === 'schedule' && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <SectionHeading subtitle="Always know your next lecture.">
                Class Schedule
              </SectionHeading>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {schedule.map((s, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-900">{s.course}</div>
                      <div className="text-sm font-semibold text-blue-600">{s.time}</div>
                    </div>
                    <div className="mt-2 text-sm text-slate-600">Room: {s.room}</div>
                    <div className="text-sm text-slate-600">Teacher: {s.teacher}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'mess' && (
            <motion.div
              key="mess"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <SectionHeading subtitle="Plan meals without surprises.">
                Mess Menu
              </SectionHeading>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {messMenu.map((m, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-2 text-sm font-bold text-slate-500 uppercase">{m.meal}</div>
                    <ul className="list-disc pl-5 text-slate-700 text-sm space-y-1">
                      {m.items.map((it, idx) => <li key={idx}>{it}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'notices' && (
            <motion.div
              key="notices"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <SectionHeading subtitle="Never miss important announcements. Admin mode planned.">
                Notices & Events
              </SectionHeading>
              <div className="space-y-4">
                {NOTICES.map(n => (
                  <div key={n.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{n.category}</span>
                      <span className="text-xs text-slate-400">{n.date}</span>
                    </div>
                    <div className="mt-1 font-semibold text-slate-900">{n.title}</div>
                    {n.important && <div className="mt-2 text-[10px] font-bold uppercase text-rose-600">Important</div>}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <SectionHeading subtitle="Easy access to study materials.">
                Academic Resources
              </SectionHeading>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resources.map((r, i) => (
                  <a key={i} href={r.url} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                    <div className="text-sm font-bold text-slate-500 uppercase">{r.type}</div>
                    <div className="mt-1 font-semibold text-slate-900">{r.title}</div>
                    <div className="mt-2 inline-flex items-center gap-1 text-sm text-blue-600">
                      Open <ChevronRight size={16} />
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'opportunities' && (
            <motion.div
              key="opportunities"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <SectionHeading subtitle="Internships, events & more. Admin mode planned.">
                Opportunities
              </SectionHeading>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {opportunities.map((o, i) => (
                  <a key={i} href={o.url} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-slate-900">{o.title}</div>
                      <div className="text-xs text-slate-500">Deadline: {o.deadline}</div>
                    </div>
                    <div className="mt-1 text-sm text-slate-600">{o.org}</div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'tasks' && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <SectionHeading subtitle="Stay on top of assignments.">
                Task Manager
              </SectionHeading>
              <div className="space-y-3">
                {tasks.map(t => (
                  <div key={t.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <input
                      aria-label="toggle task"
                      type="checkbox"
                      checked={t.done}
                      onChange={() => setTasks(ts => ts.map(x => x.id === t.id ? { ...x, done: !x.done } : x))}
                    />
                    <div className={cn("flex-1", t.done ? "line-through text-slate-400" : "text-slate-800")}>
                      {t.title}
                    </div>
                    {t.due && <div className="text-xs font-semibold text-slate-500">Due: {t.due}</div>}
                    <button
                      className="p-1 text-slate-400 hover:text-rose-500"
                      onClick={() => setTasks(ts => ts.filter(x => x.id !== t.id))}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'lostfound' && (
            <motion.div
              key="lostfound"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <SectionHeading subtitle="Return or claim lost items easily.">
                Lost & Found
              </SectionHeading>
              <div className="space-y-3">
                {lostFound.map(l => (
                  <div key={l.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className={cn("text-xs font-bold uppercase", l.status === 'Lost' ? "text-rose-600" : "text-emerald-600")}>
                        {l.status}
                      </div>
                      <div className="text-sm text-slate-500">{l.where}</div>
                    </div>
                    <div className="mt-1 font-semibold text-slate-900">{l.item}</div>
                    <div className="mt-1 text-sm text-slate-600">Contact: {l.contact}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'market' && (
            <motion.div
              key="market"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <SectionHeading subtitle="Student-to-student marketplace.">
                Buy & Sell
              </SectionHeading>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {market.map(m => (
                  <div key={m.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="font-semibold text-slate-900">{m.title}</div>
                    <div className="text-sm text-emerald-600 font-bold mt-1">{m.price}</div>
                    <div className="text-sm text-slate-600">Condition: {m.condition}</div>
                    <div className="mt-2 text-sm text-slate-600">Contact: {m.contact}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'chatbot' && (
            <motion.div
              key="chatbot"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <SectionHeading subtitle="Navigate everything seamlessly. Advanced AI planned.">
                Chatbot
              </SectionHeading>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="text-slate-600 text-sm">
                  Chatbot UI placeholder. Hook your provider here (e.g., college-specific knowledge base, auth-gated).
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'qa' && (
            <motion.div
              key="qa"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <SectionHeading subtitle="Students can personally ask doubts to faculty; faculty can reply.">
                Q&A with Faculty
              </SectionHeading>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="text-sm font-bold text-slate-500 uppercase mb-3">Faculty</div>
                  <ul className="space-y-2">
                    {faculty.map(f => (
                      <li key={f.id} className="rounded-lg border border-slate-100 p-3">
                        <div className="font-semibold text-slate-800">{f.name}</div>
                        <div className="text-xs text-slate-500">{f.dept}</div>
                        <a className="text-xs text-blue-600" href={`mailto:${f.email}`}>{f.email}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="text-sm font-bold text-slate-500 uppercase mb-3">Recent Questions</div>
                  <div className="space-y-3">
                    {questions.map(q => {
                      const to = faculty.find(f => f.id === q.toFacultyId);
                      return (
                        <div key={q.id} className="rounded-xl border border-slate-100 p-4">
                          <div className="text-xs text-slate-500">To: {to?.name} ({to?.dept})</div>
                          <div className="mt-1 font-semibold text-slate-900">{q.topic}</div>
                          <div className="mt-1 text-sm text-slate-700">{q.question}</div>
                          {q.answer ? (
                            <div className="mt-2 rounded-lg bg-slate-50 p-3 text-sm">
                              <span className="font-semibold">Answer: </span>{q.answer}
                            </div>
                          ) : (
                            <div className="mt-2 text-xs font-semibold text-amber-600 uppercase">Pending faculty response</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'materials' && (
            <motion.div
              key="materials"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <SectionHeading subtitle="Teachers can post important notes and materials here.">
                Teacher Materials
              </SectionHeading>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {materials.map(m => (
                  <a key={m.id} href={m.url} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                    <div className="text-xs font-bold uppercase text-slate-500">{m.kind}</div>
                    <div className="mt-1 font-semibold text-slate-900">{m.title}</div>
                    <div className="text-sm text-slate-600">{m.course}</div>
                    <div className="mt-2 inline-flex items-center gap-1 text-sm text-blue-600">
                      Open <ChevronRight size={16} />
                    </div>
                  </a>
                ))}
              </div>
              <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-600">
                Posting UI placeholder for authenticated teachers (uploads/links, titles, course tags).
              </div>
            </motion.div>
          )}

          {activeTab === 'staff' && (
            <motion.div
              key="staff"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <SectionHeading subtitle="Utilities for campus staff.">
                Staff Utilities
              </SectionHeading>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {staffTools.map((t, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="font-semibold text-slate-900">{t.name}</div>
                    <div className="text-sm text-slate-600 mt-1">{t.description}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-600">
                Placeholder for role-based dashboards (e.g., maintenance, room allocations, transport, mess ops).
              </div>
            </motion.div>
          )}

          {activeTab === 'clubs' && (
            <motion.div
              key="clubs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <SectionHeading subtitle="All clubs and campus fests under IIITK Gymkhana.">
                Clubs & Fests
              </SectionHeading>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {clubs.map((c, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="font-semibold text-slate-900">{c.name}</div>
                    <div className="text-sm text-slate-600 mt-1">{c.desc}</div>
                    <div className="mt-2 text-xs text-slate-500">Leads: {c.leads.join(', ')}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-bold text-slate-500 uppercase mb-2">Fests</div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {fests.map((f, i) => (
                    <a key={i} href={f.url || '#'} className="rounded-xl border border-slate-100 p-4 hover:shadow-sm transition">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-slate-900">{f.name}</div>
                        {f.flagship && <span className="text-[10px] font-bold uppercase text-indigo-600">Flagship</span>}
                      </div>
                      <div className="text-sm text-slate-600 mt-1">When: {f.when}</div>
                      <div className="mt-2 inline-flex items-center gap-1 text-sm text-blue-600">
                        Details <ChevronRight size={16} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="text-blue-600" size={24} />
              <span className="text-lg font-bold">CampusCompanion</span>
            </div>
            <p className="text-sm text-slate-500">
              Built for the students of IIIT Kalyani. © 2026 Internal Portal.
            </p>
            <div className="flex gap-6 mt-4">
              <a href="#" className="text-slate-400 hover:text-blue-600"><Globe size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-blue-600"><Mail size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
