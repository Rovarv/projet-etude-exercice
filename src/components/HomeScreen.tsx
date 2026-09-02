import React from 'react';
import { 
  TrendingUp, 
  Building2, 
  Users, 
  ArrowRight, 
  ChevronRight, 
  Search, 
  CheckCircle2, 
  Award,
  BookOpen,
  Sparkles,
  Edit3
} from 'lucide-react';
import { Course, Department, ActiveScreen } from '../types';

interface HomeScreenProps {
  courses: Course[];
  onNavigate: (screen: ActiveScreen) => void;
  onSelectDepartment: (dept: Department) => void;
  onSelectCourse: (course: Course) => void;
  onEnrollCourse: (course: Course) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenSupabaseManager: () => void;
  currency: 'MGA' | 'EUR';
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  courses,
  onNavigate,
  onSelectDepartment,
  onSelectCourse,
  onEnrollCourse,
  searchQuery,
  onSearchChange,
  onOpenSupabaseManager,
  currency,
}) => {
  // Certified / Featured courses for the homepage
  const featuredCourses = courses.slice(0, 3);

  const formatPrice = (course: Course) => {
    if (currency === 'EUR') {
      return `€${course.priceEUR}`;
    }
    return `${course.priceMGA.toLocaleString('fr-FR')} MGA`;
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('catalog');
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[580px] lg:min-h-[620px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Deep Academic Navy Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1600"
            alt="Université Rovaniaina Bibliothèque"
            className="w-full h-full object-cover"
          />
          {/* Multi-layered academic navy gradients for readability */}
          <div className="absolute inset-0 bg-[#001e40]/75 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#001e40] via-[#003366]/60 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center py-16">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fed488]/20 border border-[#fed488]/40 text-[#ffdea5] text-xs font-semibold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            Inscriptions Ouvertes • Rentrée Universitaire
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-4 max-w-3xl">
            Excellence Académique à Portée de Main
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#d5e3ff] mb-8 max-w-2xl leading-relaxed">
            Rejoignez l'Université Rovaniaina de Madagascar et façonnez votre avenir avec nos programmes reconnus en Économie, Gestion et Sociologie.
          </p>

          {/* Search Bar in Hero */}
          <form 
            onSubmit={handleHeroSearch}
            className="flex flex-col sm:flex-row gap-2.5 w-full max-w-xl mb-8"
          >
            <div className="relative flex-grow">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737780]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Trouvez votre formation..."
                className="w-full pl-11 pr-4 py-3.5 rounded-md bg-white border-0 text-[#191c1e] text-sm shadow-md focus:ring-2 focus:ring-[#C5A059] outline-none"
                id="hero-search-input"
              />
            </div>
            <button
              type="submit"
              className="bg-[#C5A059] text-white font-heading font-semibold text-sm px-6 py-3.5 rounded-md hover:bg-[#b08d4a] transition-all shadow-md flex-shrink-0 flex items-center justify-center gap-2"
              id="hero-search-submit"
            >
              <span>Rechercher</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3.5 justify-center">
            <button
              onClick={() => onNavigate('catalog')}
              className="bg-[#C5A059] text-white font-heading font-semibold text-sm px-7 py-3 rounded-md hover:bg-[#b08d4a] transition-all shadow-md"
              id="hero-btn-sinscrire"
            >
              S'inscrire
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className="border border-white text-white font-heading font-semibold text-sm px-7 py-3 rounded-md hover:bg-white hover:text-[#003366] transition-all"
              id="hero-btn-en-savoir-plus"
            >
              En savoir plus
            </button>
          </div>

        </div>
      </section>

      {/* 2. SECTION: NOS DOMAINES D'EXPERTISE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto w-full">
        
        <div className="text-center mb-14">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#003366] mb-3">
            Nos Domaines d'Expertise
          </h2>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto rounded-full"></div>
          <p className="text-[#43474f] text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Des parcours universitaires d'élite fondés sur l'analyse empirique et la rigueur scientifique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Domain 1: Économie */}
          <div 
            onClick={() => {
              onSelectDepartment('Économie');
              onNavigate('catalog');
            }}
            className="bg-white border border-[#c3c6d1]/60 rounded-xl p-8 shadow-academic hover:shadow-academic-hover hover:border-[#003366]/40 transition-all duration-300 flex flex-col items-center text-center cursor-pointer group"
            id="card-domaine-economie"
          >
            <div className="w-16 h-16 rounded-full bg-[#d5e3ff] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#003366] transition-all duration-300">
              <TrendingUp className="w-8 h-8 text-[#003366] group-hover:text-[#fed488] transition-colors" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#003366] mb-3">
              Économie
            </h3>
            <p className="text-sm text-[#43474f] leading-relaxed flex-grow mb-6">
              Comprenez les dynamiques des marchés globaux et locaux grâce à une analyse rigoureuse et des modèles économiques avancés.
            </p>
            <span className="text-[#003366] text-xs font-heading font-semibold flex items-center gap-1.5 group-hover:text-[#C5A059] transition-colors">
              <span>Découvrir les cours</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Domain 2: Gestion */}
          <div 
            onClick={() => {
              onSelectDepartment('Gestion');
              onNavigate('catalog');
            }}
            className="bg-white border border-[#c3c6d1]/60 rounded-xl p-8 shadow-academic hover:shadow-academic-hover hover:border-[#003366]/40 transition-all duration-300 flex flex-col items-center text-center cursor-pointer group"
            id="card-domaine-gestion"
          >
            <div className="w-16 h-16 rounded-full bg-[#fed488]/40 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#775a19] transition-all duration-300">
              <Building2 className="w-8 h-8 text-[#775a19] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#003366] mb-3">
              Gestion
            </h3>
            <p className="text-sm text-[#43474f] leading-relaxed flex-grow mb-6">
              Développez des compétences en leadership, stratégie d'entreprise et management pour piloter les organisations de demain.
            </p>
            <span className="text-[#003366] text-xs font-heading font-semibold flex items-center gap-1.5 group-hover:text-[#C5A059] transition-colors">
              <span>Découvrir les cours</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Domain 3: Sociologie */}
          <div 
            onClick={() => {
              onSelectDepartment('Sociologie');
              onNavigate('catalog');
            }}
            className="bg-white border border-[#c3c6d1]/60 rounded-xl p-8 shadow-academic hover:shadow-academic-hover hover:border-[#003366]/40 transition-all duration-300 flex flex-col items-center text-center cursor-pointer group"
            id="card-domaine-sociologie"
          >
            <div className="w-16 h-16 rounded-full bg-[#d8e3fa] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#141f2f] transition-all duration-300">
              <Users className="w-8 h-8 text-[#141f2f] group-hover:text-[#fed488] transition-colors" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#003366] mb-3">
              Sociologie
            </h3>
            <p className="text-sm text-[#43474f] leading-relaxed flex-grow mb-6">
              Analysez les structures sociales, les comportements humains et les enjeux contemporains avec un esprit critique aiguisé.
            </p>
            <span className="text-[#003366] text-xs font-heading font-semibold flex items-center gap-1.5 group-hover:text-[#C5A059] transition-colors">
              <span>Découvrir les cours</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

        </div>
      </section>

      {/* 3. SECTION: PROGRAMMES CERTIFIANTS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f2f4f6] border-y border-[#c3c6d1]/50">
        <div className="max-w-[1280px] mx-auto w-full">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#003366] mb-1.5">
                Programmes Certifiants
              </h2>
              <p className="text-sm sm:text-base text-[#43474f]">
                Boostez votre carrière avec nos formations intensives en ligne.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenSupabaseManager}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#003366] bg-white border border-[#c3c6d1] px-3 py-1.5 rounded-md hover:bg-[#eceef0] transition-colors font-medium"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" />
                Lier des images
              </button>
              <button
                onClick={() => onNavigate('catalog')}
                className="inline-flex items-center text-[#003366] hover:text-[#C5A059] font-heading font-semibold text-sm transition-colors"
                id="btn-voir-tout-catalogue"
              >
                <span>Voir tout le catalogue</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Cards Grid matching Screen 1 exact layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white border border-[#c3c6d1]/60 rounded-xl overflow-hidden shadow-academic hover:shadow-academic-hover transition-all duration-300 flex flex-col group"
                id={`card-certifiant-${course.id}`}
              >
                {/* Cover Image */}
                <div 
                  className="h-44 w-full relative overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => onSelectCourse(course)}
                >
                  <img
                    src={course.coverImageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-3 left-3">
                    <span className={`text-[11px] font-heading font-semibold px-2.5 py-0.5 rounded ${
                      course.department === 'Économie'
                        ? 'bg-[#d5e3ff] text-[#1f477b]'
                        : course.department === 'Gestion'
                        ? 'bg-[#fed488] text-[#5d4201]'
                        : 'bg-[#d8e3fa] text-[#111c2c]'
                    }`}>
                      {course.department}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-grow flex flex-col">
                  
                  {/* Top line: Tag & Price */}
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-xs font-semibold text-[#737780] uppercase tracking-wide">
                      {course.code}
                    </span>
                    <span className="font-heading font-bold text-sm text-[#003366]">
                      {formatPrice(course)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => onSelectCourse(course)}
                    className="font-heading font-bold text-lg text-[#191c1e] mb-2 leading-snug group-hover:text-[#003366] transition-colors cursor-pointer line-clamp-2"
                  >
                    {course.title}
                  </h3>

                  <p className="text-xs text-[#43474f] line-clamp-2 mb-4">
                    {course.description}
                  </p>

                  {/* Professor Info Footer */}
                  <div className="mt-auto pt-4 border-t border-[#eceef0] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={course.professor.avatarUrl}
                        alt={course.professor.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#c3c6d1]"
                      />
                      <div>
                        <p className="font-heading font-semibold text-xs text-[#191c1e]">
                          {course.professor.name}
                        </p>
                        <p className="text-[10px] text-[#737780]">
                          {course.professor.title}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEnrollCourse(course);
                      }}
                      className="bg-[#C5A059] hover:bg-[#b08d4a] text-white text-xs font-heading font-semibold px-3 py-1.5 rounded transition-colors flex items-center gap-1 shadow-sm"
                      id={`btn-enroll-${course.id}`}
                    >
                      <span>S'inscrire</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. KEY METRICS & RECOGNITION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto w-full">
        <div className="bg-[#001e40] rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#003366] rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
          
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#293446]">
            <div className="pt-4 lg:pt-0">
              <p className="font-heading font-extrabold text-3xl sm:text-4xl text-[#ffdea5] mb-1">98%</p>
              <p className="text-xs sm:text-sm text-[#d5e3ff]">Taux d'insertion professionnelle</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <p className="font-heading font-extrabold text-3xl sm:text-4xl text-[#ffdea5] mb-1">15 000+</p>
              <p className="text-xs sm:text-sm text-[#d5e3ff]">Diplômés et Cadres formés</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <p className="font-heading font-extrabold text-3xl sm:text-4xl text-[#ffdea5] mb-1">45+</p>
              <p className="text-xs sm:text-sm text-[#d5e3ff]">Enseignants-Chercheurs Émérites</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <p className="font-heading font-extrabold text-3xl sm:text-4xl text-[#ffdea5] mb-1">100%</p>
              <p className="text-xs sm:text-sm text-[#d5e3ff]">Accréditation Internationale</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
