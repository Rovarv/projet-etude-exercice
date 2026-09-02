import React, { useState } from 'react';
import { 
  X, 
  Play, 
  CheckCircle2, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  ChevronRight, 
  ArrowLeft,
  Download,
  Award,
  Sparkles,
  Volume2
} from 'lucide-react';
import { EnrolledCourse } from '../types';

interface CourseLessonModalProps {
  enrolledCourse: EnrolledCourse | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProgress: (courseId: string, newProgress: number) => void;
}

export const CourseLessonModal: React.FC<CourseLessonModalProps> = ({
  enrolledCourse,
  isOpen,
  onClose,
  onUpdateProgress,
}) => {
  const [selectedLessonIdx, setSelectedLessonIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'quiz'>('video');
  const [completedLessons, setCompletedLessons] = useState<number[]>([0]);

  if (!isOpen || !enrolledCourse) return null;

  const { course } = enrolledCourse;
  const allLessons = course.syllabus.flatMap((s) => s.lessons);

  const handleMarkComplete = (index: number) => {
    if (!completedLessons.includes(index)) {
      const updated = [...completedLessons, index];
      setCompletedLessons(updated);
      const newProgress = Math.min(100, Math.round((updated.length / allLessons.length) * 100));
      onUpdateProgress(course.id, newProgress);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-hidden animate-in fade-in duration-200">
      <div 
        className="bg-[#141f2f] text-white rounded-2xl max-w-5xl w-full h-[90vh] shadow-2xl border border-[#293446] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="bg-[#001e40] px-6 py-4 border-b border-[#293446] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-heading font-bold text-[#ffdea5] uppercase tracking-wide">
                  {course.code}
                </span>
                <span className="text-xs text-[#799dd6]">
                  {course.department}
                </span>
              </div>
              <h2 className="font-heading font-bold text-sm sm:text-base text-white truncate max-w-lg">
                {course.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs text-[#d5e3ff]">Progression :</span>
              <span className="font-heading font-bold text-xs text-[#fed488]">
                {enrolledCourse.progress}%
              </span>
              <div className="w-24 bg-[#293446] rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-[#C5A059] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${enrolledCourse.progress}%` }}
                ></div>
              </div>
            </div>

            <button onClick={onClose} className="p-1 text-[#d5e3ff] hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left: Video / Notes Player */}
          <div className="flex-1 flex flex-col bg-[#001b3c] overflow-y-auto">
            
            {/* Media Screen Container */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden border-b border-[#293446]">
              <img
                src={course.coverImageUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 text-center p-6 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#C5A059] hover:bg-[#b08d4a] text-white flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-110 mb-3">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <p className="font-heading font-bold text-sm sm:text-base text-white">
                  {allLessons[selectedLessonIdx] || 'Module Magistral en Ligne'}
                </p>
                <p className="text-xs text-[#d5e3ff] mt-1">
                  Enseigné par {course.professor.name} ({course.professor.title})
                </p>
              </div>
            </div>

            {/* Content Tabs & Lesson Material */}
            <div className="p-6 space-y-4">
              <div className="flex gap-2 border-b border-[#293446] pb-3 text-xs font-heading font-semibold">
                <button
                  onClick={() => setActiveTab('video')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    activeTab === 'video' ? 'bg-[#C5A059] text-white' : 'text-[#799dd6] hover:text-white'
                  }`}
                >
                  Supports de Cours
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    activeTab === 'notes' ? 'bg-[#C5A059] text-white' : 'text-[#799dd6] hover:text-white'
                  }`}
                >
                  Notes & Bibliographie
                </button>
              </div>

              <div className="text-xs text-[#d5e3ff] leading-relaxed space-y-3">
                <p>
                  <strong>Objectifs de la séance :</strong> Approfondir les concepts fondamentaux abordés dans ce module à travers l'étude de cas réels et de simulations numériques adaptées au contexte universitaire malgache et international.
                </p>
                <div className="bg-[#141f2f] p-4 rounded-xl border border-[#293446] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#fed488]" />
                    <div>
                      <p className="font-heading font-bold text-white text-xs">Support de cours_Chapitre_{selectedLessonIdx + 1}.pdf</p>
                      <p className="text-[10px] text-[#799dd6]">Diapositives et exercices d'application (4.2 Mo)</p>
                    </div>
                  </div>
                  <button className="bg-[#003366] hover:bg-[#001e40] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => handleMarkComplete(selectedLessonIdx)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg text-xs font-heading font-bold flex items-center gap-2 shadow-sm transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Marquer ce module comme terminé</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right: Course Curriculum Checklist */}
          <div className="w-full md:w-80 bg-[#141f2f] border-t md:border-t-0 md:border-l border-[#293446] flex flex-col h-full overflow-y-auto">
            <div className="p-4 border-b border-[#293446] bg-[#001e40]">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#ffdea5]">
                Plan du Cours ({allLessons.length} Modules)
              </h3>
            </div>

            <div className="divide-y divide-[#293446] overflow-y-auto">
              {allLessons.map((lesson, idx) => {
                const isCompleted = completedLessons.includes(idx);
                const isSelected = selectedLessonIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedLessonIdx(idx)}
                    className={`w-full text-left p-3.5 transition-colors flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#003366] text-white font-semibold'
                        : 'text-[#d5e3ff] hover:bg-[#293446]/60'
                    }`}
                  >
                    <span className="shrink-0 mt-0.5">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-500 text-[10px] flex items-center justify-center font-mono">
                          {idx + 1}
                        </div>
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate">{lesson}</p>
                      <span className="text-[10px] text-[#799dd6]">45 min • Vidéo & TD</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
