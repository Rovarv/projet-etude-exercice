import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Course, Professor, SupabaseConfig } from '../types';
import { INITIAL_COURSES, INITIAL_PROFESSORS } from '../data/mockData';

const STORAGE_KEY_CONFIG = 'rovaniaina_supabase_config';
const STORAGE_KEY_COURSES = 'rovaniaina_courses_data';
const STORAGE_KEY_PROFESSORS = 'rovaniaina_professors_data';

// Default configuration
const DEFAULT_CONFIG: SupabaseConfig = {
  supabaseUrl: 'https://xyzcompany.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummykey',
  isConnected: false,
  storageBucket: 'course-images',
  autoSync: false
};

let clientInstance: SupabaseClient | null = null;

export function getSupabaseConfig(): SupabaseConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading Supabase config from localStorage', e);
  }
  return DEFAULT_CONFIG;
}

export function saveSupabaseConfig(config: SupabaseConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
    // Reset client instance
    if (config.supabaseUrl && config.supabaseAnonKey && config.supabaseUrl !== DEFAULT_CONFIG.supabaseUrl) {
      clientInstance = createClient(config.supabaseUrl, config.supabaseAnonKey);
    } else {
      clientInstance = null;
    }
  } catch (e) {
    console.error('Error saving Supabase config to localStorage', e);
  }
}

export function getSupabaseClient(): SupabaseClient | null {
  if (clientInstance) return clientInstance;
  const config = getSupabaseConfig();
  if (config.isConnected && config.supabaseUrl && config.supabaseAnonKey && config.supabaseUrl.startsWith('http')) {
    try {
      clientInstance = createClient(config.supabaseUrl, config.supabaseAnonKey);
      return clientInstance;
    } catch (e) {
      console.warn('Could not initialize Supabase client:', e);
      return null;
    }
  }
  return null;
}

export function getStoredCourses(): Course[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_COURSES);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading courses from localStorage', e);
  }
  return INITIAL_COURSES;
}

export function saveStoredCourses(courses: Course[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(courses));
  } catch (e) {
    console.error('Error saving courses to localStorage', e);
  }
}

export function getStoredProfessors(): Professor[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PROFESSORS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading professors from localStorage', e);
  }
  return INITIAL_PROFESSORS;
}

export function saveStoredProfessors(profs: Professor[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROFESSORS, JSON.stringify(profs));
  } catch (e) {
    console.error('Error saving professors to localStorage', e);
  }
}

/**
 * Generate Supabase PostgreSQL migration script
 */
export function getSampleSQLMigration(): string {
  return `-- =========================================================
-- Schéma PostgreSQL / Supabase pour Université Rovaniaina
-- =========================================================

-- 1. Table des Départements
CREATE TABLE IF NOT EXISTS public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table des Professeurs & Enseignants
CREATE TABLE IF NOT EXISTS public.professors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  avatar_url TEXT NOT NULL,
  bio TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table des Cours & Formations Certifiantes
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  department_tag TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  price_mga NUMERIC NOT NULL,
  price_eur NUMERIC NOT NULL,
  cover_image_url TEXT NOT NULL,
  professor_id TEXT REFERENCES public.professors(id) ON DELETE SET NULL,
  duration TEXT NOT NULL,
  level TEXT NOT NULL,
  enrolled_count INTEGER DEFAULT 0,
  rating NUMERIC DEFAULT 5.0,
  is_featured BOOLEAN DEFAULT false,
  syllabus JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table des Étudiants et Inscriptions
CREATE TABLE IF NOT EXISTS public.students (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  degree TEXT NOT NULL,
  department TEXT NOT NULL,
  avatar_url TEXT NOT NULL,
  is_scholarship BOOLEAN DEFAULT false,
  semester TEXT NOT NULL,
  gpa NUMERIC DEFAULT 14.5,
  ects INTEGER DEFAULT 45,
  skills JSONB DEFAULT '[]'::jsonb
);

CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id TEXT REFERENCES public.students(id) ON DELETE CASCADE,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  status TEXT DEFAULT 'in_progress',
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. Bucket de Stockage Supabase pour les Images de Cours
INSERT INTO storage.buckets (id, name, public) 
VALUES ('course-images', 'course-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS (Row Level Security) - Lecture publique pour le catalogue
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow public read professors" ON public.professors FOR SELECT USING (true);
`;
}
