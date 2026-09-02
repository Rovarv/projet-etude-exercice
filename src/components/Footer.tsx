import React from 'react';
import { School, MapPin, Mail, Phone, ExternalLink, ShieldCheck } from 'lucide-react';
import { ActiveScreen, Department } from '../types';

interface FooterProps {
  onNavigate: (screen: ActiveScreen) => void;
  onSelectDepartment: (dept: Department) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectDepartment }) => {
  return (
    <footer className="w-full bg-[#001e40] text-white border-t border-[#003366] pt-14 pb-12 mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#293446]">
          
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-[#003366] flex items-center justify-center text-[#fed488]">
                <School className="w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-lg text-[#ffdea5]">Univ. Rovaniaina</span>
            </div>
            <p className="text-sm text-[#799dd6] leading-relaxed">
              L'excellence académique et la rigueur intellectuelle au service du développement à Madagascar et au-delà.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#d5e3ff] bg-[#003366] px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-[#fed488]" />
                Établissement Agréé par l'État
              </span>
            </div>
          </div>

          {/* Col 2: Faculties */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-[#ffdea5] uppercase tracking-wider mb-4">
              Facultés & Départements
            </h4>
            <ul className="space-y-2.5 text-sm text-[#799dd6]">
              <li>
                <button
                  onClick={() => {
                    onSelectDepartment('Économie');
                    onNavigate('catalog');
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                  id="footer-link-faculte-economie"
                >
                  <span>Faculté d'Économie</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectDepartment('Gestion');
                    onNavigate('catalog');
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                  id="footer-link-faculte-gestion"
                >
                  <span>Faculté de Gestion</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectDepartment('Sociologie');
                    onNavigate('catalog');
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                  id="footer-link-faculte-sociologie"
                >
                  <span>Faculté de Sociologie</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors text-xs text-[#C5A059] font-medium pt-1"
                >
                  Voir tous les diplômes →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Information & Resources */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-[#ffdea5] uppercase tracking-wider mb-4">
              Informations
            </h4>
            <ul className="space-y-2.5 text-sm text-[#799dd6]">
              <li>
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-white transition-colors"
                >
                  Espace Numérique de Travail (ENT)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('resources')}
                  className="hover:text-white transition-colors"
                >
                  Bibliothèque Universitaire
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Admissions & Bourses d'Étude
                </button>
              </li>
              <li>
                <span className="text-[#919cb2] text-xs">Plan du campus & Mentions légales</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-[#ffdea5] uppercase tracking-wider mb-4">
              Contact & Siège
            </h4>
            <div className="space-y-3 text-sm text-[#799dd6]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Campus Universitaire d'Ankatso, Antananarivo 101, Madagascar</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href="mailto:contact@univ-rovaniaina.mg" className="hover:text-white transition-colors">
                  contact@univ-rovaniaina.mg
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>+261 (0) 20 22 400 00</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#799dd6]">
          <p>© {new Date().getFullYear()} Université Rovaniaina de Madagascar. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Politique de Confidentialité</span>
            <span className="hover:text-white cursor-pointer transition-colors">Règlement des Études</span>
            <span className="text-[#fed488]">Accrédité MESupReS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
