import React, { useState } from 'react';
import { Search, School, Database, User, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { ActiveScreen, Department, Student } from '../types';

interface NavbarProps {
  currentScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onSelectDepartment: (dept: Department | 'Tous') => void;
  selectedDepartment: Department | 'Tous';
  searchQuery: string;
  onSearchChange: (query: string) => void;
  student: Student;
  onOpenSupabaseManager: () => void;
  isSupabaseConnected: boolean;
  currency: 'MGA' | 'EUR';
  onToggleCurrency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onSelectDepartment,
  selectedDepartment,
  searchQuery,
  onSearchChange,
  student,
  onOpenSupabaseManager,
  isSupabaseConnected,
  currency,
  onToggleCurrency,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleDeptClick = (dept: Department) => {
    onSelectDepartment(dept);
    if (currentScreen !== 'catalog') {
      onNavigate('catalog');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f7f9fb] border-b border-[#c3c6d1]/60 shadow-none">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
          id="btn-nav-home"
        >
          <div className="w-10 h-10 rounded-lg bg-[#003366] flex items-center justify-center text-white shadow-sm group-hover:bg-[#001e40] transition-colors">
            <School className="w-6 h-6 text-[#fed488]" />
          </div>
          <div>
            <div className="font-heading font-bold text-lg sm:text-xl text-[#003366] tracking-tight flex items-center gap-1.5">
              <span>Université Rovaniaina</span>
            </div>
            <p className="text-[10px] text-[#737780] font-medium tracking-wide uppercase hidden sm:block">Madagascar • Excellence Académique</p>
          </div>
        </div>

        {/* Navigation Categories */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => handleDeptClick('Économie')}
            className={`transition-colors py-1 ${
              currentScreen === 'catalog' && selectedDepartment === 'Économie'
                ? 'text-[#775a19] font-bold border-b-2 border-[#775a19]'
                : 'text-[#43474f] hover:text-[#003366]'
            }`}
            id="nav-link-economie"
          >
            Économie
          </button>
          <button
            onClick={() => handleDeptClick('Gestion')}
            className={`transition-colors py-1 ${
              currentScreen === 'catalog' && selectedDepartment === 'Gestion'
                ? 'text-[#775a19] font-bold border-b-2 border-[#775a19]'
                : 'text-[#43474f] hover:text-[#003366]'
            }`}
            id="nav-link-gestion"
          >
            Gestion
          </button>
          <button
            onClick={() => handleDeptClick('Sociologie')}
            className={`transition-colors py-1 ${
              currentScreen === 'catalog' && selectedDepartment === 'Sociologie'
                ? 'text-[#775a19] font-bold border-b-2 border-[#775a19]'
                : 'text-[#43474f] hover:text-[#003366]'
            }`}
            id="nav-link-sociologie"
          >
            Sociologie
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              currentScreen === 'dashboard'
                ? 'text-[#775a19] font-bold border-b-2 border-[#775a19]'
                : 'text-[#43474f] hover:text-[#003366]'
            }`}
            id="nav-link-ma-formation"
          >
            <span>Ma Formation</span>
            <span className="w-2 h-2 rounded-full bg-[#C5A059] inline-block animate-pulse"></span>
          </button>
        </nav>

        {/* Actions & Search */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          
          {/* Quick Search */}
          <div className="hidden lg:flex items-center bg-[#f2f4f6] rounded-full px-3.5 py-1.5 border border-[#c3c6d1]/80 w-52 focus-within:w-64 focus-within:border-[#003366] transition-all">
            <Search className="w-4 h-4 text-[#737780] mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher des cours..."
              className="bg-transparent border-none outline-none text-xs text-[#191c1e] w-full focus:ring-0 placeholder-[#737780]"
              id="input-nav-search"
            />
          </div>

          {/* Currency Toggle */}
          <button
            onClick={onToggleCurrency}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full border border-[#c3c6d1] bg-white text-[#43474f] hover:bg-[#eceef0] transition-colors"
            title="Basculer la devise (MGA / EUR)"
            id="btn-toggle-currency"
          >
            <span className="text-[10px] text-[#737780]">Devise:</span>
            <span className="text-[#003366] font-bold">{currency}</span>
          </button>

          {/* Supabase & Dynamic Images Button */}
          <button
            onClick={onOpenSupabaseManager}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              isSupabaseConnected
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                : 'bg-white text-[#003366] border-[#c3c6d1] hover:bg-[#f2f4f6]'
            }`}
            title="Gérer les images dynamiques & Connexion Supabase"
            id="btn-open-supabase-manager"
          >
            <Database className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="hidden sm:inline">Images Supabase</span>
            {isSupabaseConnected ? (
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            )}
          </button>

          {/* Login / Espace Etudiant CTA Button */}
          {currentScreen === 'dashboard' ? (
            <button
              onClick={() => onNavigate('catalog')}
              className="font-heading font-medium text-xs sm:text-sm bg-[#003366] text-white px-3.5 py-2 rounded-md hover:bg-[#001e40] transition-all shadow-sm flex items-center gap-1.5"
              id="btn-nav-catalogue"
            >
              <BookOpen className="w-4 h-4 text-[#fed488]" />
              <span className="hidden sm:inline">Catalogue</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('dashboard')}
              className="font-heading font-semibold text-xs sm:text-sm bg-[#C5A059] text-white px-4 py-2 rounded-md hover:bg-[#b08d4a] transition-all shadow-sm flex items-center gap-1.5"
              id="btn-nav-connect"
            >
              <User className="w-4 h-4" />
              <span>Espace Étudiant</span>
            </button>
          )}

          {/* Avatar Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#C5A059] hover:ring-2 ring-[#003366]/20 transition-all cursor-pointer block"
              id="btn-user-avatar"
            >
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#c3c6d1]/70 p-3 z-50 text-[#191c1e] animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setShowProfileMenu(false)}
              >
                <div className="flex items-center gap-2.5 pb-2.5 mb-2 border-b border-[#eceef0]">
                  <img src={student.avatarUrl} alt="" className="w-9 h-9 rounded-full object-cover border border-[#C5A059]" />
                  <div className="truncate">
                    <p className="font-heading font-bold text-xs text-[#003366] truncate">{student.name}</p>
                    <p className="text-[11px] text-[#43474f]">{student.degree} • {student.department}</p>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#f2f4f6] text-[#191c1e] flex items-center justify-between"
                  >
                    <span>Tableau de bord</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">Moy: 14.5</span>
                  </button>
                  <button
                    onClick={() => onNavigate('catalog')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#f2f4f6] text-[#191c1e]"
                  >
                    Explorer les cours
                  </button>
                  <button
                    onClick={onOpenSupabaseManager}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#f2f4f6] text-[#003366] font-medium flex items-center justify-between"
                  >
                    <span>Images Dynamiques & DB</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
