// Type definitions for the IIITK Campus Companion

// User type
export interface User {
    id: number;
    name: string;
    email: string;
    role: 'student' | 'faculty';
}

// Course type
export interface Course {
    id: number;
    title: string;
    description: string;
    credits: number;
}

// Event type
export interface Event {
    id: number;
    title: string;
    date: Date;
    location: string;
    description: string;
}

// Notification type
export interface Notification {
    id: number;
    userId: number;
    message: string;
    timestamp: Date;
}

// Campus type
export interface Campus {
    id: number;
    name: string;
    location: string;
    facilities: string[];
}