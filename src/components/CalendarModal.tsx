import React from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { UpcomingEvent } from '../types';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: UpcomingEvent[];
}

export const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose, events }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#c3c6d1] overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#001e40] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-[#fed488]" />
            <h2 className="font-heading font-bold text-base sm:text-lg">
              Calendrier Académique & Examens
            </h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#eceef0]">
            <span className="font-heading font-bold text-sm text-[#003366]">Mars - Avril 2026</span>
            <div className="flex items-center gap-1 text-xs text-[#737780]">
              <span className="px-2 py-0.5 bg-[#d5e3ff] text-[#1f477b] rounded font-semibold">Semestre 2</span>
            </div>
          </div>

          <div className="space-y-3">
            {events.map((evt) => (
              <div 
                key={evt.id}
                className="p-4 rounded-xl border border-[#c3c6d1]/60 bg-[#f7f9fb] flex items-start gap-4 hover:border-[#003366] transition-colors"
              >
                <div className="flex flex-col items-center justify-center bg-[#001e40] text-white rounded-lg w-14 h-14 shrink-0 shadow-xs">
                  <span className="text-[10px] font-heading font-extrabold text-[#fed488] uppercase">
                    {evt.dayShort}
                  </span>
                  <span className="font-heading font-bold text-lg leading-tight">
                    {evt.dayNumber}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#fed488]/40 text-[#785a1a]">
                      {evt.courseCode}
                    </span>
                    <span className="text-xs text-[#737780]">{evt.month}</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#191c1e] mb-1 truncate">
                    {evt.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#43474f]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      {evt.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#003366]" />
                      {evt.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
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
