import React, { useState, useEffect } from 'react';
import { 
  ActiveScreen, 
  Department, 
  Course, 
  Student, 
  EnrolledCourse, 
  UpcomingEvent,
  SupabaseConfig 
} from './types';
import { 
  INITIAL_STUDENT, 
  INITIAL_ENROLLED_COURSES, 
  INITIAL_UPCOMING_EVENTS,
  INITIAL_COURSES,
  INITIAL_PROFESSORS 
} from './data/mockData';
import { 
  getStoredCourses, 
  saveStoredCourses, 
  getStoredProfessors, 
  saveStoredProfessors, 
  getSupabaseConfig, 
  saveSupabaseConfig 
} from './lib/supabase';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { CatalogScreen } from './components/CatalogScreen';
import { StudentDashboard } from './components/StudentDashboard';
import { SupabaseManagerModal } from './components/SupabaseManagerModal';
import { CourseDetailModal } from './components/CourseDetailModal';
import { CalendarModal } from './components/CalendarModal';
import { GradesModal } from './components/GradesModal';
import { CourseLessonModal } from './components/CourseLessonModal';
import { RegisterModal } from './components/RegisterModal';

export default function App() {
  // Navigation & Filter States
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('home');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | 'Tous'>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<'MGA' | 'EUR'>('MGA');

  // Data States
  const [courses, setCourses] = useState<Course[]>(() => getStoredCourses());
  const [professors, setProfessors] = useState(() => getStoredProfessors());
  const [student, setStudent] = useState<Student>(INITIAL_STUDENT);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>(INITIAL_ENROLLED_COURSES);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>(INITIAL_UPCOMING_EVENTS);
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfig>(() => getSupabaseConfig());

  // Modal States
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [selectedEnrolledForLesson, setSelectedEnrolledForLesson] = useState<EnrolledCourse | null>(null);
  const [isSupabaseManagerOpen, setIsSupabaseManagerOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isGradesModalOpen, setIsGradesModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [activeDashboardSubTab, setActiveDashboardSubTab] = useState<string>('dashboard');

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Update Dynamic Image for a course
  const handleUpdateCourseImage = (courseId: string, newUrl: string) => {
    const updated = courses.map((c) => {
      if (c.id === courseId) {
        return { ...c, coverImageUrl: newUrl };
      }
      return c;
    });
    setCourses(updated);
    saveStoredCourses(updated);

    // Also update in enrolled courses if present
    setEnrolledCourses((prev) => 
      prev.map((item) => {
        if (item.courseId === courseId) {
          return {
            ...item,
            course: { ...item.course, coverImageUrl: newUrl }
          };
        }
        return item;
      })
    );

    showToast("Lien d'image dynamique mis à jour avec succès !");
  };

  const handleUpdateProfessorImage = (profId: string, newUrl: string) => {
    const updated = professors.map((p) => {
      if (p.id === profId) {
        return { ...p, avatarUrl: newUrl };
      }
      return p;
    });
    setProfessors(updated);
    saveStoredProfessors(updated);
    showToast("Avatar du professeur mis à jour !");
  };

  const handleSaveConfig = (cfg: SupabaseConfig) => {
    setSupabaseConfig(cfg);
    saveSupabaseConfig(cfg);
    showToast(cfg.isConnected ? "Supabase connecté !" : "Configuration enregistrée");
  };

  const handleResetToDefaults = () => {
    setCourses(INITIAL_COURSES);
    saveStoredCourses(INITIAL_COURSES);
    setProfessors(INITIAL_PROFESSORS);
    saveStoredProfessors(INITIAL_PROFESSORS);
    showToast("Données réinitialisées aux valeurs initiales.");
  };

  // Enroll in a Course
  const handleEnrollCourse = (course: Course) => {
    const isAlreadyEnrolled = enrolledCourses.some((e) => e.courseId === course.id);
    if (isAlreadyEnrolled) {
      showToast("Vous êtes déjà inscrit à ce cours !");
      setSelectedCourseForModal(null);
      setCurrentScreen('dashboard');
      return;
    }

    const newEnrolled: EnrolledCourse = {
      id: `enr-${Date.now()}`,
      courseId: course.id,
      course,
      progress: 0,
      lastAccessed: "À l'instant",
      nextLessonTitle: course.syllabus[0]?.lessons[0] || 'Module 1 : Introduction',
      status: 'in_progress',
      grade: 15.0
    };

    setEnrolledCourses([newEnrolled, ...enrolledCourses]);
    setSelectedCourseForModal(null);
    showToast(`Félicitations ! Inscription validée pour "${course.title}".`);
    setCurrentScreen('dashboard');
  };

  const handleUpdateLessonProgress = (courseId: string, newProgress: number) => {
    setEnrolledCourses((prev) =>
      prev.map((item) => {
        if (item.courseId === courseId) {
          return {
            ...item,
            progress: newProgress,
            lastAccessed: "À l'instant",
            status: newProgress >= 100 ? 'completed' : 'in_progress'
          };
        }
        return item;
      })
    );
  };

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'MGA' ? 'EUR' : 'MGA'));
  };

  const handleRegisterStudent = (newStudent: Student) => {
    setStudent(newStudent);
    showToast(`Bienvenue à l'Université Rovaniaina, ${newStudent.name} ! Inscription réussie.`);
    setCurrentScreen('dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e] font-sans selection:bg-[#fed488] selection:text-[#001e40]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#001e40] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#C5A059] flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 text-xs font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059] animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation (Except in standalone Dashboard full view, or kept on all pages) */}
      {currentScreen !== 'dashboard' && (
        <Navbar
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          selectedDepartment={selectedDepartment}
          onSelectDepartment={(dept) => setSelectedDepartment(dept)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          student={student}
          onOpenSupabaseManager={() => setIsSupabaseManagerOpen(true)}
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
          isSupabaseConnected={supabaseConfig.isConnected}
          currency={currency}
          onToggleCurrency={toggleCurrency}
        />
      )}

      {/* ACTIVE SCREEN RENDERER */}
      {currentScreen === 'home' && (
        <HomeScreen
          courses={courses}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onSelectDepartment={(dept) => {
            setSelectedDepartment(dept);
            setCurrentScreen('catalog');
          }}
          onSelectCourse={(course) => setSelectedCourseForModal(course)}
          onEnrollCourse={(course) => handleEnrollCourse(course)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          onOpenSupabaseManager={() => setIsSupabaseManagerOpen(true)}
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
          currency={currency}
        />
      )}

      {currentScreen === 'catalog' && (
        <CatalogScreen
          courses={courses}
          selectedDepartment={selectedDepartment}
          onSelectDepartment={(dept) => setSelectedDepartment(dept)}
          onSelectCourse={(course) => setSelectedCourseForModal(course)}
          onEnrollCourse={(course) => handleEnrollCourse(course)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          onOpenSupabaseManager={() => setIsSupabaseManagerOpen(true)}
          currency={currency}
          onToggleCurrency={toggleCurrency}
          onQuickEditImage={(course) => {
            setIsSupabaseManagerOpen(true);
          }}
        />
      )}

      {currentScreen === 'dashboard' && (
        <StudentDashboard
          student={student}
          enrolledCourses={enrolledCourses}
          upcomingEvents={upcomingEvents}
          activeSubTab={activeDashboardSubTab}
          onSelectSubTab={(tab) => {
            if (tab === 'courses') {
              setCurrentScreen('catalog');
            } else {
              setActiveDashboardSubTab(tab);
            }
          }}
          onOpenCourseLesson={(enrolled) => setSelectedEnrolledForLesson(enrolled)}
          onNavigateToCatalog={() => setCurrentScreen('catalog')}
          onOpenCalendarModal={() => setIsCalendarModalOpen(true)}
          onOpenGradesModal={() => setIsGradesModalOpen(true)}
        />
      )}

      {/* Footer on Homepage and Catalog */}
      {currentScreen !== 'dashboard' && (
        <Footer
          onNavigate={(screen) => setCurrentScreen(screen)}
          onSelectDepartment={(dept) => {
            setSelectedDepartment(dept);
            setCurrentScreen('catalog');
          }}
        />
      )}

      {/* MODALS */}
      <CourseDetailModal
        course={selectedCourseForModal}
        isOpen={Boolean(selectedCourseForModal)}
        onClose={() => setSelectedCourseForModal(null)}
        onEnroll={(course) => handleEnrollCourse(course)}
        isEnrolled={enrolledCourses.some((e) => e.courseId === selectedCourseForModal?.id)}
        currency={currency}
      />

      <SupabaseManagerModal
        isOpen={isSupabaseManagerOpen}
        onClose={() => setIsSupabaseManagerOpen(false)}
        courses={courses}
        professors={professors}
        onUpdateCourseImage={handleUpdateCourseImage}
        onUpdateProfessorImage={handleUpdateProfessorImage}
        supabaseConfig={supabaseConfig}
        onSaveSupabaseConfig={handleSaveConfig}
        onResetToDefaults={handleResetToDefaults}
      />

      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        events={upcomingEvents}
      />

      <GradesModal
        isOpen={isGradesModalOpen}
        onClose={() => setIsGradesModalOpen(false)}
        student={student}
        enrolledCourses={enrolledCourses}
      />

      <CourseLessonModal
        enrolledCourse={selectedEnrolledForLesson}
        isOpen={Boolean(selectedEnrolledForLesson)}
        onClose={() => setSelectedEnrolledForLesson(null)}
        onUpdateProgress={handleUpdateLessonProgress}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={handleRegisterStudent}
      />

    </div>
  );
}
