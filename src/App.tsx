import { motion } from 'motion/react';
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
  Search,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';

const QUICK_LINKS = [
  { name: 'LMS Portal', icon: GraduationCap, url: 'https://lms.iiitkalyani.ac.in', description: 'Access course materials and assignments' },
  { name: 'ERP System', icon: Users, url: 'https://erp.iiitkalyani.ac.in', description: 'Student records and registration' },
  { name: 'Library', icon: Library, url: 'https://iiitkalyani.ac.in/library', description: 'Digital resources and catalog' },
  { name: 'Academic Calendar', icon: Calendar, url: 'https://iiitkalyani.ac.in/academic-calendar', description: 'Important dates and holidays' },
];

const CAMPUS_RESOURCES = [
  { name: 'Hostel Info', icon: MapPin, description: 'Accommodation details and rules' },
  { name: 'Mess Menu', icon: BookOpen, description: 'Weekly dining schedule' },
  { name: 'Bus Schedule', icon: Clock, description: 'Campus shuttle timings' },
  { name: 'Student Clubs', icon: Globe, description: 'Technical and cultural societies' },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Campus<span className="text-blue-600">Companion</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <a href="#" className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600">Home</a>
            <a href="#links" className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600">Quick Links</a>
            <a href="#resources" className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600">Resources</a>
            <a href="#contact" className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600">Contact</a>
            <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95">
              Login
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-slate-200 bg-white px-4 py-4 md:hidden"
          >
            <div className="flex flex-col gap-4">
              <a href="#" className="text-sm font-medium text-slate-600">Home</a>
              <a href="#links" className="text-sm font-medium text-slate-600">Quick Links</a>
              <a href="#resources" className="text-sm font-medium text-slate-600">Resources</a>
              <a href="#contact" className="text-sm font-medium text-slate-600">Contact</a>
              <button className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white">
                Login
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white py-20 sm:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.50),white)]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                  Your Digital Gateway to <br />
                  <span className="text-blue-600">IIIT Kalyani</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  Access all your campus resources, schedules, and academic tools in one place. 
                  Designed for students, by students.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="#links"
                    className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-200 transition-all hover:bg-blue-700 hover:scale-105 active:scale-95"
                  >
                    Get Started
                  </a>
                  <a href="#resources" className="text-sm font-semibold leading-6 text-slate-900 flex items-center gap-1 group">
                    View Resources <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Links Grid */}
        <section id="links" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Quick Links</h2>
              <p className="mt-4 text-lg text-slate-600">Direct access to essential university portals.</p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
              {QUICK_LINKS.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <link.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{link.name}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{link.description}</p>
                  <div className="mt-6 flex items-center text-xs font-semibold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Visit Portal <ExternalLink size={12} className="ml-1" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="bg-slate-900 py-24 text-white sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Campus Resources</h2>
                <p className="mt-6 text-lg text-slate-400">
                  Everything you need to navigate campus life effectively. From shuttle timings to 
                  mess menus, we've got you covered.
                </p>
                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {CAMPUS_RESOURCES.map((resource) => (
                    <div key={resource.name} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <resource.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold">{resource.name}</h4>
                        <p className="mt-1 text-sm text-slate-400">{resource.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-2xl">
                  <div className="h-full w-full rounded-[1.4rem] bg-slate-900 p-8 flex flex-col justify-center items-center text-center">
                    <MapPin size={48} className="text-blue-400 mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Interactive Campus Map</h3>
                    <p className="text-slate-400 mb-8">Find your way around IIIT Kalyani's campus and hostels.</p>
                    <button className="rounded-full border border-blue-400/30 bg-blue-400/10 px-6 py-2 text-sm font-semibold text-blue-400 transition-colors hover:bg-blue-400 hover:text-white">
                      Open Map
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-blue-600 px-6 py-16 sm:px-16 sm:py-24 lg:flex lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Need help or have suggestions?
                </h2>
                <p className="mt-4 text-lg text-blue-100">
                  We're always looking to improve the Campus Companion. Reach out to the student council or the technical team.
                </p>
              </div>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row lg:mt-0">
                <a
                  href="mailto:support@iiitkalyani.ac.in"
                  className="flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-blue-600 shadow-lg transition-all hover:bg-blue-50 active:scale-95"
                >
                  <Mail size={18} /> Email Support
                </a>
                <a
                  href="tel:+913325822240"
                  className="flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/20 active:scale-95"
                >
                  <Phone size={18} /> Call Admin
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <GraduationCap size={18} />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Campus<span className="text-blue-600">Companion</span>
              </span>
            </div>
            <p className="text-sm text-slate-500">
              © 2026 IIIT Kalyani Internal Portal. For internal use only.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Globe size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Mail size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
