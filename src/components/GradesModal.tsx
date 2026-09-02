import React from 'react';
import { X, Award, CheckCircle2, TrendingUp, Download, ShieldCheck } from 'lucide-react';
import { Student, EnrolledCourse } from '../types';

interface GradesModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  enrolledCourses: EnrolledCourse[];
}

export const GradesModal: React.FC<GradesModalProps> = ({
  isOpen,
  onClose,
  student,
  enrolledCourses,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#c3c6d1] overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#001e40] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-[#fed488]" />
            <h2 className="font-heading font-bold text-base sm:text-lg">
              Relevé de Notes & Résultats d'Évaluation
            </h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          {/* Header Summary */}
          <div className="bg-[#f2f4f6] p-4 rounded-xl border border-[#c3c6d1]/60 flex items-center justify-between">
            <div>
              <p className="font-heading font-bold text-sm text-[#001e40]">{student.name}</p>
              <p className="text-xs text-[#737780]">{student.degree} • {student.department}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#737780] block">Moyenne Générale</span>
              <span className="font-heading font-extrabold text-xl text-[#003366]">
                {student.gpa}/20
              </span>
            </div>
          </div>

          {/* Grades Table */}
          <div className="border border-[#c3c6d1]/70 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#003366] text-white text-[11px] font-heading font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Unité d'Enseignement (UE)</th>
                  <th className="p-3 text-center">Crédits</th>
                  <th className="p-3 text-center">Note /20</th>
                  <th className="p-3 text-right">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eceef0] text-xs">
                {enrolledCourses.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f7f9fb]">
                    <td className="p-3 font-medium text-[#191c1e]">
                      <span className="font-bold text-[#003366] block">{item.course.code}</span>
                      {item.course.title}
                    </td>
                    <td className="p-3 text-center text-[#43474f]">6 ECTS</td>
                    <td className="p-3 text-center font-heading font-bold text-[#191c1e]">
                      {item.grade ? `${item.grade}/20` : 'En cours'}
                    </td>
                    <td className="p-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Validé
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="hover:bg-[#f7f9fb]">
                  <td className="p-3 font-medium text-[#191c1e]">
                    <span className="font-bold text-[#003366] block">ÉCON-302</span>
                    Microéconomie de l'Incertitude & Théorie des Jeux
                  </td>
                  <td className="p-3 text-center text-[#43474f]">6 ECTS</td>
                  <td className="p-3 text-center font-heading font-bold text-[#191c1e]">16.0/20</td>
                  <td className="p-3 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Validé
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs text-[#737780] pt-2">
            <span className="flex items-center gap-1 text-[#003366]">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              Document officiel certifié par le rectorat
            </span>
            <button className="text-[#003366] hover:text-[#C5A059] font-bold flex items-center gap-1">
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger le bulletin PDF</span>
            </button>
          </div>

        </div>

        <div className="bg-[#f2f4f6] px-6 py-3 border-t border-[#eceef0] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#003366] text-white px-4 py-2 rounded-md text-xs font-semibold hover:bg-[#001e40]"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
