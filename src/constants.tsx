import { 
  LayoutDashboard, 
  Calendar, 
  CheckCircle, 
  BookOpen, 
  Bell, 
  Users, 
  Search, 
  Coffee, 
  MessageSquare,
  FileText,
  UserCheck,
  MapPin,
  HelpCircle,
  LogOut,
  Settings,
  ChevronRight,
  Plus,
  Filter,
  Download,
  AlertTriangle,
  Clock,
  User,
  Heart,
  Shield,
  Zap,
  Globe,
  Award,
  Smartphone,
  Moon,
  Sun
} from 'lucide-react';
import { Faculty, Notice, Resource, TimetableEntry, CanteenItem, LostFoundItem, Club, Event, WellnessResource } from './types';

export const ICONS = {
  Dashboard: LayoutDashboard,
  Calendar,
  Attendance: CheckCircle,
  Resources: BookOpen,
  Notices: Bell,
  Directory: Users,
  LostFound: Search,
  Canteen: Coffee,
  AI: MessageSquare,
  FileText,
  UserCheck,
  MapPin,
  HelpCircle,
  LogOut,
  Settings,
  ChevronRight,
  Plus,
  Filter,
  Download,
  AlertTriangle,
  Clock,
  User,
  Heart,
  Shield,
  Zap,
  Globe,
  Award,
  Smartphone,
  Moon,
  Sun,
  Users,
  MessageSquare,
  // Raw icons for direct access
  Search,
  Bell,
  Coffee,
  BookOpen
};

export const INITIAL_NOTICES: Notice[] = [
  {
    id: '1',
    title: 'Mid-Semester Examination Schedule',
    content: 'The mid-semester examination for the Spring 2026 semester will commence from April 15th. Please check the detailed schedule on the academic portal.',
    category: 'academic',
    date: '2026-04-01',
    author: 'Academic Office',
    isImportant: true
  },
  {
    id: '2',
    title: 'Annual Cultural Fest - Advaita 2026',
    content: 'Get ready for the most awaited cultural fest of IIIT Kalyani! Advaita 2026 is scheduled for May 10th-12th. Registration for events is now open.',
    category: 'event',
    date: '2026-03-30',
    author: 'Cultural Committee',
    isImportant: false
  },
  {
    id: '3',
    title: 'Placement Drive: Google India',
    content: 'Google India is visiting for a campus placement drive for the 2026 batch. Interested students must register by April 5th.',
    category: 'placement',
    date: '2026-03-28',
    author: 'Placement Cell',
    isImportant: true
  }
];

export const INITIAL_TIMETABLE: TimetableEntry[] = [
  {
    id: '1',
    subject: 'Operating Systems',
    teacher: 'Dr. S. Mukherjee',
    room: 'L-101',
    startTime: '09:00',
    endTime: '10:00',
    day: 'Monday'
  },
  {
    id: '2',
    subject: 'Database Management Systems',
    teacher: 'Dr. A. Ghosh',
    room: 'L-102',
    startTime: '10:00',
    endTime: '11:00',
    day: 'Monday'
  },
  {
    id: '3',
    subject: 'Computer Networks',
    teacher: 'Dr. R. Das',
    room: 'L-101',
    startTime: '11:15',
    endTime: '12:15',
    day: 'Monday'
  }
];

export const INITIAL_FACULTY: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Santasri Kothari',
    designation: 'Assistant Professor',
    department: 'Computer Science',
    email: 'santasri@iiitkalyani.ac.in',
    office: 'Room 204, Academic Block',
    photo: 'https://picsum.photos/seed/faculty1/200/200'
  },
  {
    id: '2',
    name: 'Dr. Imon Mukherjee',
    designation: 'Associate Professor',
    department: 'Computer Science',
    email: 'imon@iiitkalyani.ac.in',
    office: 'Room 205, Academic Block',
    photo: 'https://picsum.photos/seed/faculty2/200/200'
  }
];

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'OS Lecture Notes - Process Management',
    type: 'note',
    subject: 'Operating Systems',
    semester: 4,
    url: '#',
    uploadedBy: 'Dr. S. Mukherjee',
    date: '2026-03-25'
  },
  {
    id: '2',
    title: 'DBMS Previous Year Question Paper 2025',
    type: 'pyq',
    subject: 'Database Management Systems',
    semester: 4,
    url: '#',
    uploadedBy: 'Academic Cell',
    date: '2026-03-20'
  }
];

export const INITIAL_CANTEEN_MENU: CanteenItem[] = [
  { id: '1', name: 'Masala Dosa', price: 40, category: 'breakfast', isAvailable: true, isVeg: true },
  { id: '2', name: 'Paneer Butter Masala', price: 80, category: 'lunch', isAvailable: true, isVeg: true },
  { id: '3', name: 'Chicken Biryani', price: 120, category: 'lunch', isAvailable: true, isVeg: false },
  { id: '4', name: 'Veg Chowmein', price: 50, category: 'snacks', isAvailable: true, isVeg: true }
];

export const INITIAL_LOST_FOUND: LostFoundItem[] = [
  {
    id: '1',
    title: 'Black Laptop Charger',
    description: 'Found a black Dell laptop charger in L-101 after the OS class.',
    type: 'found',
    location: 'L-101',
    date: '2026-04-02',
    contact: '9876543210',
    status: 'active'
  }
];

export const INITIAL_CLUBS: Club[] = [
  { id: '1', name: 'CodeRats', description: 'The official coding club of IIIT Kalyani.', category: 'technical', logo: 'https://picsum.photos/seed/coderats/100/100', members: 150, lead: 'Rahul Sharma' },
  { id: '2', name: 'Groove', description: 'Dance and music club for cultural enthusiasts.', category: 'cultural', logo: 'https://picsum.photos/seed/groove/100/100', members: 80, lead: 'Ananya Das' },
  { id: '3', name: 'Strikers', description: 'Sports club for football and cricket lovers.', category: 'sports', logo: 'https://picsum.photos/seed/strikers/100/100', members: 120, lead: 'Vikram Singh' }
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Advaita 2026',
    description: 'The annual cultural fest of IIIT Kalyani.',
    date: '2026-05-10',
    time: '10:00 AM',
    location: 'Main Campus',
    organizer: 'Cultural Committee',
    image: 'https://picsum.photos/seed/advaita/800/400',
    category: 'fest'
  },
  {
    id: '2',
    title: 'Web Dev Workshop',
    description: 'Learn modern web development with React and Tailwind.',
    date: '2026-04-15',
    time: '02:00 PM',
    location: 'Lab 2',
    organizer: 'CodeRats',
    image: 'https://picsum.photos/seed/webdev/800/400',
    category: 'workshop'
  }
];

export const WELLNESS_RESOURCES: WellnessResource[] = [
  { id: '1', title: 'Mental Health Counseling', description: 'Free counseling sessions for all students.', category: 'counseling', link: '#', icon: 'Heart' },
  { id: '2', title: 'Yoga & Meditation', description: 'Weekly sessions at the campus gym.', category: 'physical-health', link: '#', icon: 'Zap' },
  { id: '3', title: 'Emergency SOS', description: 'Instant contact for campus security.', category: 'mental-health', link: '#', icon: 'Shield' }
];
