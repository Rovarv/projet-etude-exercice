export type Department = 'Économie' | 'Gestion' | 'Sociologie';

export interface Professor {
  id: string;
  name: string;
  title: string;
  department: Department;
  avatarUrl: string;
  bio?: string;
  email?: string;
}

export interface SyllabusItem {
  id: string;
  week: number;
  title: string;
  duration: string;
  lessons: string[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  department: Department;
  departmentTag: string;
  description: string;
  longDescription?: string;
  priceMGA: number;
  priceEUR: number;
  coverImageUrl: string;
  professor: Professor;
  duration: string;
  level: 'Licence 1' | 'Licence 2' | 'Licence 3' | 'Master 1' | 'Master 2' | 'Certificat Professionnel';
  enrolledCount: number;
  rating: number;
  syllabus: SyllabusItem[];
  isFeatured?: boolean;
}

export interface RadarSkill {
  subject: string;
  value: number; // e.g. 10 to 20
  fullMark: number;
}

export interface Student {
  id: string;
  name: string;
  degree: string;
  department: Department;
  avatarUrl: string;
  isScholarship: boolean;
  semester: string;
  gpa: number; // 14.5
  maxGpa: number; // 20
  ects: number; // 45
  totalEcts: number; // 60
  skills: RadarSkill[];
}

export interface EnrolledCourse {
  id: string;
  courseId: string;
  course: Course;
  progress: number;
  lastAccessed: string;
  nextLessonTitle: string;
  status: 'in_progress' | 'completed';
  grade?: number;
}

export interface UpcomingEvent {
  id: string;
  dayShort: string;
  dayNumber: string;
  month: string;
  title: string;
  location: string;
  time: string;
  type: 'exam' | 'submission' | 'lecture';
  courseCode: string;
}

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  isConnected: boolean;
  storageBucket: string;
  autoSync: boolean;
}

export type ActiveScreen = 
  | 'home' 
  | 'catalog' 
  | 'dashboard' 
  | 'my_courses' 
  | 'calendar' 
  | 'grades' 
  | 'resources' 
  | 'settings';
