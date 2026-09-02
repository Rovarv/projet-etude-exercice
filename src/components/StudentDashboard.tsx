import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  School, 
  Calendar, 
  Award, 
  BookOpen, 
  Settings, 
  LogOut, 
  Star, 
  Clock, 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  CalendarDays,
  Menu,
  X,
  FileText,
  HelpCircle,
  Sparkles,
  Download
} from 'lucide-react';
import { Student, EnrolledCourse, UpcomingEvent, ActiveScreen, Course } from '../types';

interface StudentDashboardProps {
  student: Student;
  enrolledCourses: EnrolledCourse[];
  upcomingEvents: UpcomingEvent[];
  activeSubTab: string;
  onSelectSubTab: (tab: string) => void;
  onOpenCourseLesson: (enrolled: EnrolledCourse) => void;
  onNavigateToCatalog: () => void;
  onOpenCalendarModal: () => void;
  onOpenGradesModal: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  enrolledCourses,
  upcomingEvents,
  activeSubTab,
  onSelectSubTab,
  onOpenCourseLesson,
  onNavigateToCatalog,
  onOpenCalendarModal,
  onOpenGradesModal,
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Calculate radar chart polygon points for student competencies
  const numPoints = student.skills.length;
  const radius = 65;
  const center = 90;

  const points = student.skills.map((skill, index) => {
    const angle = (Math.PI * 2 / numPoints) * index - Math.PI / 2;
    const r = (skill.value / skill.fullMark) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f9fb] text-[#191c1e]">
      
      {/* 1. SIDE NAVIGATION (Exact match to Screen 2) */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#f2f4f6] border-r border-[#c3c6d1]/60 
        flex flex-col py-6 px-4 shrink-0 transition-transform duration-300 ease-in-out
        ${mobileNavOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-8 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#003366] flex items-center justify-center shrink-0 shadow-sm">
              <School className="w-5 h-5 text-[#fed488]" />
            </div>
            <div className="truncate">
              <h1 className="font-heading font-bold text-sm text-[#001e40] truncate">
                Espace Étudiant
              </h1>
              <p className="text-xs text-[#737780] truncate">Univ. Rovaniaina</p>
            </div>
          </div>

          <button 
            onClick={() => setMobileNavOpen(false)}
            className="md:hidden text-[#737780] hover:text-[#191c1e]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links matching Screen 2 */}
        <nav className="flex flex-col gap-1.5 flex-grow overflow-y-auto pr-1">
          
          <button
            onClick={() => onSelectSubTab('dashboard')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-heading font-semibold transition-all ${
              activeSubTab === 'dashboard'
                ? 'bg-[#fed488] text-[#785a1a] shadow-xs'
                : 'text-[#43474f] hover:bg-[#e6e8ea]'
            }`}
            id="sidebar-link-dashboard"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Tableau de bord</span>
          </button>

          <button
            onClick={() => onSelectSubTab('courses')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-heading transition-all ${
              activeSubTab === 'courses'
                ? 'bg-[#fed488] text-[#785a1a] font-semibold shadow-xs'
                : 'text-[#43474f] hover:bg-[#e6e8ea]'
            }`}
            id="sidebar-link-mes-cours"
          >
            <School className="w-4 h-4" />
            <span>Mes Cours ({enrolledCourses.length})</span>
          </button>

          <button
            onClick={() => onOpenCalendarModal()}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-heading text-[#43474f] hover:bg-[#e6e8ea] transition-all"
            id="sidebar-link-calendrier"
          >
            <Calendar className="w-4 h-4" />
            <span>Calendrier</span>
          </button>

          <button
            onClick={() => onOpenGradesModal()}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-heading text-[#43474f] hover:bg-[#e6e8ea] transition-all"
            id="sidebar-link-notes"
          >
            <Award className="w-4 h-4" />
            <span>Notes & Relevé</span>
          </button>

          <button
            onClick={() => onSelectSubTab('resources')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-heading transition-all ${
              activeSubTab === 'resources'
                ? 'bg-[#fed488] text-[#785a1a] font-semibold'
                : 'text-[#43474f] hover:bg-[#e6e8ea]'
            }`}
            id="sidebar-link-ressources"
          >
            <BookOpen className="w-4 h-4" />
            <span>Ressources</span>
          </button>

        </nav>

        {/* Footer Actions matching Screen 2 */}
        <div className="mt-auto pt-4 flex flex-col gap-1.5 border-t border-[#c3c6d1]/40">
          <button
            onClick={() => onSelectSubTab('settings')}
            className="flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs text-[#43474f] hover:bg-[#e6e8ea] transition-all"
            id="sidebar-link-parametres"
          >
            <Settings className="w-4 h-4" />
            <span>Paramètres</span>
          </button>
          
          <button
            onClick={onNavigateToCatalog}
            className="flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs text-[#ba1a1a] hover:bg-rose-50 transition-all"
            id="sidebar-link-deconnexion"
          >
            <LogOut className="w-4 h-4" />
            <span>Catalogue public</span>
          </button>
        </div>

      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f7f9fb]">
        
        {/* Mobile Header Toggle */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-[#c3c6d1]/60">
          <div className="flex items-center gap-2">
            <School className="w-5 h-5 text-[#003366]" />
            <h2 className="font-heading font-bold text-sm text-[#003366]">Espace Étudiant</h2>
          </div>
          <button
            onClick={() => setMobileNavOpen(true)}
            className="p-2 text-[#43474f] rounded-md hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Dashboard View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* LEFT COLUMN (8 cols): Header & Active Courses */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Student Summary Card matching Screen 2 */}
              <section className="bg-white rounded-xl border border-[#c3c6d1]/60 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-academic">
                <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-[#003366]/20 shadow-sm">
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left flex flex-col justify-center">
                  <h2 className="font-heading font-extrabold text-2xl text-[#001e40] mb-1">
                    {student.name}
                  </h2>
                  <p className="text-sm text-[#43474f] mb-3">
                    {student.degree} • Département d'{student.department}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {student.isScholarship && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d5e3ff] text-[#1f477b] text-xs font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        Boursier d'Excellence
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eceef0] text-[#43474f] text-xs font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {student.semester}
                    </span>
                  </div>
                </div>
              </section>

              {/* "Cours en cours" Section matching Screen 2 */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-heading font-bold text-xl text-[#001e40]">
                    Cours en cours
                  </h3>
                  <button
                    onClick={onNavigateToCatalog}
                    className="text-xs font-heading font-semibold text-[#003366] hover:text-[#C5A059] uppercase tracking-wider flex items-center gap-1 transition-colors"
                    id="btn-voir-tout-cours-en-cours"
                  >
                    <span>Voir tout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 2-Card Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrolledCourses.map((enrolled) => (
                    <article
                      key={enrolled.id}
                      className="bg-white border border-[#c3c6d1]/60 rounded-xl overflow-hidden flex flex-col shadow-academic hover:shadow-academic-hover transition-all duration-300 group"
                      id={`enrolled-card-${enrolled.id}`}
                    >
                      {/* Image Header with Code Badge */}
                      <div className="h-32 w-full relative overflow-hidden bg-slate-100">
                        <img
                          src={enrolled.course.coverImageUrl}
                          alt={enrolled.course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-heading font-bold text-[#003366] shadow-xs">
                          {enrolled.course.code}
                        </div>
                      </div>

                      {/* Course Details */}
                      <div className="p-5 flex flex-col flex-1">
                        <p className="text-[11px] font-heading font-bold text-[#775a19] uppercase tracking-wider mb-1">
                          Département d'{enrolled.course.department}
                        </p>
                        <h4 className="font-heading font-bold text-base text-[#191c1e] mb-1 line-clamp-2">
                          {enrolled.course.title}
                        </h4>
                        <p className="text-xs text-[#737780] mb-4">
                          {enrolled.course.professor.name}
                        </p>

                        {/* Progress Bar with Heritage Gold fill */}
                        <div className="mt-auto">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs text-[#43474f]">Progression</span>
                            <span className="text-xs font-heading font-bold text-[#003366]">
                              {enrolled.progress}%
                            </span>
                          </div>

                          <div className="w-full bg-[#eceef0] rounded-full h-2 mb-4 overflow-hidden">
                            <div
                              className="bg-[#C5A059] h-2 rounded-full transition-all duration-700"
                              style={{ width: `${enrolled.progress}%` }}
                            ></div>
                          </div>

                          {/* Action Button matching Screen 2 */}
                          <button
                            onClick={() => onOpenCourseLesson(enrolled)}
                            className={`w-full py-2.5 px-4 rounded-lg font-heading font-semibold text-xs transition-colors flex justify-center items-center gap-2 shadow-xs ${
                              enrolled.progress > 50
                                ? 'bg-[#003366] text-white hover:bg-[#001e40]'
                                : 'border border-[#003366] text-[#003366] hover:bg-[#f2f4f6]'
                            }`}
                            id={`btn-continue-course-${enrolled.id}`}
                          >
                            <span>{enrolled.progress > 50 ? 'Reprendre le cours' : 'Continuer'}</span>
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </div>

                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Quick Resources & Academic Tools */}
              <section className="bg-white rounded-xl border border-[#c3c6d1]/60 p-6 shadow-academic">
                <h4 className="font-heading font-bold text-sm text-[#003366] mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#C5A059]" />
                  <span>Derniers documents de cours mis en ligne</span>
                </h4>
                <div className="divide-y divide-[#eceef0] text-xs">
                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#191c1e]">Syllabus & TD N°3 - Équilibre Macroéconomique DSGE</p>
                      <p className="text-[10px] text-[#737780]">PDF • 2.4 Mo • Déposé par Dr. Rakotoarisoa</p>
                    </div>
                    <button className="text-[#003366] hover:text-[#C5A059] flex items-center gap-1 font-semibold">
                      <Download className="w-3.5 h-3.5" />
                      <span>Télécharger</span>
                    </button>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#191c1e]">Étude de cas : Diagnostic Stratégique et Innovation Océan Bleu</p>
                      <p className="text-[10px] text-[#737780]">PDF • 1.8 Mo • Déposé par Pr. Andriamalala</p>
                    </div>
                    <button className="text-[#003366] hover:text-[#C5A059] flex items-center gap-1 font-semibold">
                      <Download className="w-3.5 h-3.5" />
                      <span>Télécharger</span>
                    </button>
                  </div>
                </div>
              </section>

            </div>

            {/* RIGHT COLUMN (4 cols): Bento Widgets */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Performance Widget matching Screen 2 */}
              <section className="bg-white border border-[#c3c6d1]/60 rounded-xl p-6 shadow-academic">
                <h3 className="font-heading font-bold text-base text-[#001e40] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#C5A059]" />
                  <span>Performances</span>
                </h3>

                {/* Top Metrics: Moyenne & ECTS */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  
                  {/* Moyenne */}
                  <div className="bg-[#f2f4f6] p-4 rounded-lg flex flex-col items-center text-center">
                    <span className="text-[11px] font-heading font-semibold text-[#737780] uppercase tracking-wider mb-1">
                      Moyenne
                    </span>
                    <span className="font-heading font-extrabold text-2xl text-[#003366]">
                      {student.gpa}
                      <span className="text-xs font-normal text-[#737780]">/{student.maxGpa}</span>
                    </span>
                  </div>

                  {/* Crédits ECTS */}
                  <div className="bg-[#f2f4f6] p-4 rounded-lg flex flex-col items-center text-center relative overflow-hidden">
                    <span className="text-[11px] font-heading font-semibold text-[#737780] uppercase tracking-wider mb-1">
                      Crédits ECTS
                    </span>
                    <span className="font-heading font-extrabold text-2xl text-[#775a19]">
                      {student.ects}
                      <span className="text-xs font-normal text-[#737780]">/{student.totalEcts}</span>
                    </span>
                    {/* Visual accent bar at bottom */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#c3c6d1]">
                      <div 
                        className="h-full bg-[#C5A059]" 
                        style={{ width: `${(student.ects / student.totalEcts) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                </div>

                {/* Radar Skill Visualizer matching Screen 2 "Répartition des compétences" */}
                <div className="w-full aspect-square bg-[#f2f4f6] rounded-lg relative overflow-hidden border border-[#c3c6d1]/30 flex items-center justify-center p-2">
                  <svg viewBox="0 0 180 180" className="w-full h-full max-w-[200px]">
                    {/* Background grid concentric polygons */}
                    {gridLevels.map((lvl, idx) => {
                      const gridPoints = student.skills.map((_, i) => {
                        const angle = (Math.PI * 2 / numPoints) * i - Math.PI / 2;
                        const r = radius * lvl;
                        return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
                      }).join(' ');
                      return (
                        <polygon
                          key={idx}
                          points={gridPoints}
                          fill="none"
                          stroke="#cbd5e1"
                          strokeWidth="1"
                          strokeDasharray={lvl === 1 ? 'none' : '2 2'}
                        />
                      );
                    })}

                    {/* Radial spokes */}
                    {student.skills.map((_, i) => {
                      const angle = (Math.PI * 2 / numPoints) * i - Math.PI / 2;
                      const x2 = center + radius * Math.cos(angle);
                      const y2 = center + radius * Math.sin(angle);
                      return (
                        <line
                          key={i}
                          x1={center}
                          y1={center}
                          x2={x2}
                          y2={y2}
                          stroke="#cbd5e1"
                          strokeWidth="1"
                        />
                      );
                    })}

                    {/* Skill area polygon */}
                    <polygon
                      points={points}
                      fill="rgba(197, 160, 89, 0.4)"
                      stroke="#C5A059"
                      strokeWidth="2"
                    />

                    {/* Points on radar */}
                    {student.skills.map((skill, i) => {
                      const angle = (Math.PI * 2 / numPoints) * i - Math.PI / 2;
                      const r = (skill.value / skill.fullMark) * radius;
                      const cx = center + r * Math.cos(angle);
                      const cy = center + r * Math.sin(angle);
                      return (
                        <circle
                          key={i}
                          cx={cx}
                          cy={cy}
                          r="3"
                          fill="#003366"
                        />
                      );
                    })}
                  </svg>

                  {/* Overlay label matching Screen 2 */}
                  <div className="absolute bottom-2 text-center pointer-events-none">
                    <span className="text-[11px] font-heading font-medium text-[#43474f] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-xs border border-[#c3c6d1]/40">
                      Répartition des compétences
                    </span>
                  </div>
                </div>

              </section>

              {/* Upcoming Deadlines Widget matching Screen 2 exact Deep Blue box */}
              <section className="bg-[#001e40] border border-[#003366] rounded-xl p-6 shadow-md text-white">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-heading font-bold text-base flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-[#ffdea5]" />
                    <span>À venir</span>
                  </h3>
                  <span className="text-[10px] bg-[#003366] text-[#fed488] px-2 py-0.5 rounded-full font-medium">
                    2 échéances
                  </span>
                </div>

                <ul className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <li key={event.id} className="flex gap-3.5 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                      <div className="flex flex-col items-center justify-center bg-white/10 rounded-md w-12 h-12 shrink-0 border border-white/10">
                        <span className="text-[10px] font-heading font-extrabold text-[#ffdea5] uppercase">
                          {event.dayShort}
                        </span>
                        <span className="font-heading font-bold text-base text-white">
                          {event.dayNumber}
                        </span>
                      </div>
                      <div className="truncate">
                        <h4 className="font-heading font-semibold text-xs text-white truncate">
                          {event.title}
                        </h4>
                        <p className="text-[11px] text-[#d5e3ff] truncate mt-0.5">
                          {event.location}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onOpenCalendarModal}
                  className="mt-6 w-full py-2.5 px-4 border border-white/30 text-white font-heading font-semibold text-xs rounded-lg hover:bg-white/10 transition-colors flex justify-center items-center gap-2"
                  id="btn-ouvrir-le-calendrier"
                >
                  <span>Ouvrir le calendrier</span>
                  <Calendar className="w-3.5 h-3.5 text-[#ffdea5]" />
                </button>
              </section>

            </div>

          </div>
        </div>

      </main>

    </div>
  );
};
