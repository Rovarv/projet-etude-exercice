import React from 'react';
import { 
  X, 
  Clock, 
  BookOpen, 
  Award, 
  Users, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Calendar,
  Share2,
  Sparkles
} from 'lucide-react';
import { Course } from '../types';

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (course: Course) => void;
  isEnrolled: boolean;
  currency: 'MGA' | 'EUR';
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  isOpen,
  onClose,
  onEnroll,
  isEnrolled,
  currency,
}) => {
  if (!isOpen || !course) return null;

  const formattedPrice = currency === 'EUR' ? `€${course.priceEUR}` : `${course.priceMGA.toLocaleString('fr-FR')} MGA`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-[#c3c6d1] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Cover Hero */}
        <div className="relative h-60 sm:h-72 w-full bg-slate-900 shrink-0">
          <img
            src={course.coverImageUrl}
            alt={course.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001e40] via-[#001e40]/50 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#fed488] text-[#5d4201] text-xs font-heading font-bold px-2.5 py-0.5 rounded">
                {course.department}
              </span>
              <span className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded backdrop-blur-sm">
                Code : {course.code}
              </span>
              <span className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded backdrop-blur-sm">
                {course.level}
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl leading-tight">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow space-y-6 text-sm text-[#191c1e]">
          
          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#f2f4f6] p-4 rounded-xl border border-[#c3c6d1]/50 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#003366]" />
              <div>
                <p className="text-[10px] text-[#737780]">Durée totale</p>
                <p className="font-heading font-bold text-[#191c1e]">{course.duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#003366]" />
              <div>
                <p className="text-[10px] text-[#737780]">Inscrits</p>
                <p className="font-heading font-bold text-[#191c1e]">{course.enrolledCount} étudiants</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#C5A059] fill-current" />
              <div>
                <p className="text-[10px] text-[#737780]">Évaluation</p>
                <p className="font-heading font-bold text-[#191c1e]">{course.rating}/5.0</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#775a19]" />
              <div>
                <p className="text-[10px] text-[#737780]">Certification</p>
                <p className="font-heading font-bold text-[#191c1e]">Diplôme d'État</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-heading font-bold text-base text-[#003366] mb-2">
              Présentation du programme
            </h3>
            <p className="text-[#43474f] leading-relaxed">
              {course.longDescription || course.description}
            </p>
          </div>

          {/* Syllabus */}
          <div>
            <h3 className="font-heading font-bold text-base text-[#003366] mb-3 flex items-center justify-between">
              <span>Plan de cours & Programme d'enseignement</span>
              <span className="text-xs font-normal text-[#737780]">{course.syllabus.length} modules</span>
            </h3>

            <div className="space-y-3">
              {course.syllabus.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white border border-[#c3c6d1]/70 rounded-xl p-4 shadow-xs"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-heading font-bold text-[#775a19] uppercase tracking-wide">
                      Semaine {item.week} • {item.duration}
                    </span>
                  </div>
                  <h4 className="font-heading font-semibold text-sm text-[#191c1e] mb-2">
                    {item.title}
                  </h4>
                  <ul className="space-y-1.5 pl-2 text-xs text-[#43474f]">
                    {item.lessons.map((lesson, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Professor Profile */}
          <div className="bg-[#f7f9fb] p-5 rounded-xl border border-[#c3c6d1]/60 flex items-start gap-4">
            <img
              src={course.professor.avatarUrl}
              alt={course.professor.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#003366]/20 shrink-0"
            />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#775a19] tracking-wider">
                Responsable Pédagogique
              </span>
              <h4 className="font-heading font-bold text-base text-[#003366]">
                {course.professor.name}
              </h4>
              <p className="text-xs text-[#737780] mb-2">{course.professor.title}</p>
              <p className="text-xs text-[#43474f]">{course.professor.bio}</p>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-[#f2f4f6] px-6 py-4 border-t border-[#eceef0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-[11px] text-[#737780]">Droits d'inscription au certificat</p>
            <p className="font-heading font-extrabold text-xl text-[#001e40]">{formattedPrice}</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isEnrolled ? (
              <button
                disabled
                className="w-full sm:w-auto bg-emerald-600 text-white px-6 py-2.5 rounded-md font-heading font-semibold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Déjà inscrit à ce cours</span>
              </button>
            ) : (
              <button
                onClick={() => onEnroll(course)}
                className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#b08d4a] text-white px-8 py-3 rounded-md font-heading font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                id="btn-modal-confirm-enroll"
              >
                <span>Confirmer l'inscription</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
