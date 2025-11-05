// src/app/core/interfaces/index.ts

// ==================== USERS ====================

export interface User {
  id?: string;
  _id?: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor';
  active?: boolean;
  lastAccess?: Date | string;
}

// ==================== STUDENTS ====================

export interface Student {
  id?: string;
  _id?: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  document: {
    type: 'CC' | 'TI' | 'CE' | 'Passport';
    number: string;
  };
  email: string;
  phone: string;
  studentCode: string;
  program?: string;
  status: 'active' | 'inactive' | 'graduated' | 'withdrawn' | 'suspended';
}

// ==================== NEWS ====================

export interface News {
  id?: string;
  _id?: string;
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  category: 'Institutional' | 'Students' | 'Events' | 'Graduations' | 'Partnerships';
  featured?: boolean;
  author?: string;
  readTime?: string;
  publishDate?: Date | string;
}

// ==================== EVENTS ====================

export interface Event {
  id?: string;
  _id?: string;
  name: string;
  description: string;
  date: Date | string;
  startTime: string;
  endTime?: string;
  location: string;
  type: 'Academic' | 'Cultural' | 'Sports' | 'Institutional' | 'Social';
  featured?: boolean;
  image?: string;
  availableSeats?: number;
  registrationRequired?: boolean;
}

// ==================== PROGRAMS ====================

export interface Program {
  id?: string | number;
  _id?: string;
  name: string;
  code?: string;
  description: string;
  duration?: string;
  modality: 'InPerson' | 'Virtual' | 'Hybrid';
  category?: 'Technology' | 'Administration' | 'Health' | 'Accounting';
  icon?: string;
  color?: string; // ✅ agregado
  features?: string[];
  costs: {
    enrollment: number;
    monthly: number;
  };
  featured?: boolean;
}


// ==================== TESTIMONIALS ====================

export interface Testimonial {
  id?: string;
  _id?: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  testimonial: string;
  program: string;
  rating?: number;
  approved?: boolean;
  image?: string;
  position?: string;
  company?: string;
  graduationDate?: Date | string;
}

// ==================== API RESPONSES ====================

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ==================== AUTH ====================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: User | Student;
  token: string;
}

// ==================== FORMS ====================

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface EnrollmentForm {
  // Personal data
  firstName: string;
  lastName: string;
  document: {
    type: 'CC' | 'TI' | 'CE' | 'Passport';
    number: string;
  };
  birthDate: Date | string;
  email: string;
  phone: string;
  
  // Address
  address: string;
  city: string;
  state: string;
  
  // Academic information
  programInterest: string;
  preferredModality: 'InPerson' | 'Virtual' | 'Hybrid';
  preferredSchedule?: 'Morning' | 'Afternoon' | 'Evening' | 'Weekend';
  
  // Additional information
  educationLevel: 'HighSchool' | 'Technical' | 'Technologist' | 'Professional';
  workExperience?: string;
  howDidYouKnow?: string;
}