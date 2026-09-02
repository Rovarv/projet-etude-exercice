import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  BookOpen, 
  SlidersHorizontal, 
  Sparkles, 
  X,
  Image as ImageIcon,
  CheckCircle2,
  Check
} from 'lucide-react';
import { Course, Department, ActiveScreen } from '../types';

interface CatalogScreenProps {
  courses: Course[];
  selectedDepartment: Department | 'Tous';
  onSelectDepartment: (dept: Department | 'Tous') => void;
  onSelectCourse: (course: Course) => void;
  onEnrollCourse: (course: Course) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenSupabaseManager: () => void;
  currency: 'MGA' | 'EUR';
  onToggleCurrency: () => void;
  onQuickEditImage: (course: Course) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  courses,
  selectedDepartment,
  onSelectDepartment,
  onSelectCourse,
  onEnrollCourse,
  searchQuery,
  onSearchChange,
  onOpenSupabaseManager,
  currency,
  onToggleCurrency,
  onQuickEditImage,
}) => {
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>('Tous');
  const [sortBy, setSortBy] = useState<'rating' | 'price_asc' | 'price_desc' | 'popular'>('popular');
  const [visibleCount, setVisibleCount] = useState(6);

  // Filtered & sorted courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Department filter
      if (selectedDepartment !== 'Tous' && course.department !== selectedDepartment) {
        return false;
      }
      // Level filter
      if (selectedLevel !== 'Tous' && course.level !== selectedLevel) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = course.title.toLowerCase().includes(q);
        const matchDesc = course.description.toLowerCase().includes(q);
        const matchProf = course.professor.name.toLowerCase().includes(q);
        const matchCode = course.code.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchProf && !matchCode) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.priceEUR - b.priceEUR;
      if (sortBy === 'price_desc') return b.priceEUR - a.priceEUR;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.enrolledCount - a.enrolledCount;
    });
  }, [courses, selectedDepartment, selectedLevel, searchQuery, sortBy]);

  const displayedCourses = filteredCourses.slice(0, visibleCount);

  const formatPrice = (course: Course) => {
    if (currency === 'EUR') {
      return `€${course.priceEUR}`;
    }
    return `${course.priceMGA.toLocaleString('fr-FR')} MGA`;
  };

  return (
    <main className="flex-grow container mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12">
      
      {/* 1. Header matching Screen 3 */}
      <div className="mb-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#001e40] tracking-tight mb-2">
              Catalogue des Cours
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#43474f] max-w-2xl leading-relaxed">
              Découvrez notre offre de formation académique rigoureuse, conçue pour forger les leaders de demain en économie, gestion et sciences sociales.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-center md:self-end">
            <button
              onClick={onOpenSupabaseManager}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold bg-white border border-[#c3c6d1] text-[#003366] hover:bg-[#f2f4f6] transition-colors shadow-sm"
              id="catalog-btn-supabase-links"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Gérer les liens d'images</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Filters & Search Bar matching Screen 3 */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-10 gap-4 border-b border-[#c3c6d1]/60 pb-5">
        
        {/* Department Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {(['Tous', 'Économie', 'Gestion', 'Sociologie'] as const).map((dept) => {
            const isSelected = selectedDepartment === dept;
            return (
              <button
                key={dept}
                onClick={() => onSelectDepartment(dept)}
                className={`px-4 py-2 rounded-full font-heading font-medium text-xs sm:text-sm whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#003366] text-white shadow-sm font-semibold'
                    : 'bg-[#f7f9fb] border border-[#c3c6d1] text-[#43474f] hover:border-[#003366] hover:text-[#003366]'
                }`}
                id={`filter-pill-${dept.toLowerCase()}`}
              >
                {dept}
              </button>
            );
          })}
        </div>

        {/* Search & Filter Trigger */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737780]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher un cours..."
              className="w-full pl-10 pr-3.5 py-2 rounded-md border border-[#c3c6d1] bg-white text-xs sm:text-sm text-[#191c1e] focus:border-[#003366] focus:ring-1 focus:ring-[#003366] outline-none shadow-sm transition-all"
              id="catalog-input-search"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md border text-xs sm:text-sm font-heading font-medium transition-colors shadow-sm shrink-0 ${
              showFilterDrawer || selectedLevel !== 'Tous'
                ? 'bg-[#003366] text-white border-[#003366]'
                : 'border-[#c3c6d1] bg-white text-[#43474f] hover:bg-[#eceef0]'
            }`}
            id="catalog-btn-filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filtres</span>
            {selectedLevel !== 'Tous' && (
              <span className="w-2 h-2 rounded-full bg-[#fed488]"></span>
            )}
          </button>
        </div>

      </div>

      {/* Filter Drawer / Panel if open */}
      {showFilterDrawer && (
        <div className="mb-8 p-5 bg-[#f2f4f6] rounded-xl border border-[#c3c6d1] grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
          <div>
            <label className="block text-xs font-heading font-bold text-[#003366] mb-2 uppercase tracking-wide">
              Niveau d'Études
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full text-xs p-2 rounded-md border border-[#c3c6d1] bg-white text-[#191c1e] focus:ring-1 focus:ring-[#003366]"
            >
              <option value="Tous">Tous les niveaux</option>
              <option value="Licence 1">Licence 1</option>
              <option value="Licence 2">Licence 2</option>
              <option value="Licence 3">Licence 3</option>
              <option value="Master 1">Master 1</option>
              <option value="Master 2">Master 2</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-heading font-bold text-[#003366] mb-2 uppercase tracking-wide">
              Trier par
            </label>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full text-xs p-2 rounded-md border border-[#c3c6d1] bg-white text-[#191c1e] focus:ring-1 focus:ring-[#003366]"
            >
              <option value="popular">Popularité (Inscriptions)</option>
              <option value="rating">Meilleures évaluations</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={() => {
                setSelectedLevel('Tous');
                setSortBy('popular');
              }}
              className="px-3 py-2 text-xs text-[#737780] hover:text-[#003366] font-medium"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      )}

      {/* 3. Course Cards Grid matching Screen 3 */}
      {displayedCourses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-[#c3c6d1]/60 p-8">
          <BookOpen className="w-12 h-12 text-[#737780] mx-auto mb-3 opacity-60" />
          <h3 className="font-heading font-bold text-lg text-[#191c1e] mb-1">Aucun cours trouvé</h3>
          <p className="text-xs text-[#43474f] mb-4">Essayez d'ajuster vos filtres ou termes de recherche.</p>
          <button
            onClick={() => {
              onSelectDepartment('Tous');
              onSearchChange('');
              setSelectedLevel('Tous');
            }}
            className="text-xs font-semibold text-[#003366] underline hover:text-[#C5A059]"
          >
            Réinitialiser tous les critères
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedCourses.map((course) => (
            <article
              key={course.id}
              className="bg-white border border-[#c3c6d1]/60 rounded-xl overflow-hidden hover:shadow-[0px_4px_16px_rgba(0,51,102,0.08)] transition-all duration-300 flex flex-col group relative"
              id={`catalog-card-${course.id}`}
            >
              
              {/* Cover Image Container */}
              <div 
                className="h-48 w-full relative overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => onSelectCourse(course)}
              >
                <img
                  src={course.coverImageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Department Tag Overlay */}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-heading font-semibold text-[#003366] border border-[#c3c6d1]/40 shadow-xs">
                    {course.department}
                  </span>
                </div>

                {/* Level Tag Overlay */}
                <div className="absolute top-3 right-3">
                  <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-medium text-white">
                    {course.level}
                  </span>
                </div>

                {/* Quick image edit button for testing Supabase dynamic link */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickEditImage(course);
                  }}
                  className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-[#003366] p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Modifier l'URL d'image dynamique Supabase"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-grow">
                
                {/* Title */}
                <h3 
                  onClick={() => onSelectCourse(course)}
                  className="font-heading font-bold text-lg text-[#001e40] mb-2 leading-snug group-hover:text-[#C5A059] transition-colors cursor-pointer line-clamp-2"
                >
                  {course.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs text-[#43474f] mb-6 flex-grow line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                {/* Professor & Price Row */}
                <div className="flex items-center justify-between mb-4 pt-4 border-t border-[#eceef0]">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={course.professor.avatarUrl}
                      alt={course.professor.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#c3c6d1]"
                    />
                    <div>
                      <p className="font-heading font-semibold text-xs text-[#191c1e]">
                        {course.professor.name}
                      </p>
                      <p className="text-[10px] text-[#737780] leading-tight">
                        {course.professor.title}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-heading font-bold text-base sm:text-lg text-[#001e40]">
                      {formatPrice(course)}
                    </p>
                  </div>
                </div>

                {/* Enroll Button matching Screen 3 exact Heritage Gold Button */}
                <button
                  onClick={() => onEnrollCourse(course)}
                  className="w-full bg-[#C5A059] hover:bg-[#b08d4a] text-white px-4 py-3 rounded-md font-heading font-semibold text-xs sm:text-sm transition-colors flex justify-center items-center gap-2 shadow-sm"
                  id={`btn-card-enroll-${course.id}`}
                >
                  <span>S'inscrire</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>

            </article>
          ))}
        </div>
      )}

      {/* 4. Load More Button */}
      {visibleCount < filteredCourses.length && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="px-8 py-3 rounded-md border border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white font-heading font-semibold text-xs sm:text-sm transition-colors"
            id="btn-load-more-courses"
          >
            Charger plus de cours ({filteredCourses.length - visibleCount} restants)
          </button>
        </div>
      )}

    </main>
  );
};
