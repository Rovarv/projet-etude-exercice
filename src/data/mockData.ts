import { Course, Professor, Student, EnrolledCourse, UpcomingEvent } from '../types';

export const INITIAL_PROFESSORS: Professor[] = [
  {
    id: 'prof-1',
    name: 'Dr. Rakotoarisoa',
    title: 'Professeur Titulaire',
    department: 'Économie',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'Spécialiste des modèles macroéconomiques dynamiques et des politiques monétaires en économies émergentes.',
    email: 'h.rakotoarisoa@univ-rovaniaina.mg'
  },
  {
    id: 'prof-2',
    name: 'Pr. Rasoamaharo',
    title: 'Experte en Management',
    department: 'Gestion',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    bio: 'Conseillère stratégique d’entreprises et directrice du laboratoire d’innovation managériale.',
    email: 'm.rasoamaharo@univ-rovaniaina.mg'
  },
  {
    id: 'prof-3',
    name: 'Dr. Andrianina',
    title: 'Chercheur Associé',
    department: 'Sociologie',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Chercheur en sociologie urbaine et analyse des transformations territoriales à Madagascar.',
    email: 'm.andrianina@univ-rovaniaina.mg'
  },
  {
    id: 'prof-4',
    name: 'Pr. H. Lefebvre',
    title: 'Professeur Émérite',
    department: 'Économie',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'Ancien conseiller à la Banque Centrale et auteur de plusieurs manuels d’économétrie appliquée.',
    email: 'h.lefebvre@univ-rovaniaina.mg'
  },
  {
    id: 'prof-5',
    name: 'Pr. Andriamalala',
    title: 'Directrice de Département',
    department: 'Gestion',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    bio: 'Pionnière de l’entrepreneuriat digital et de la gouvernance d’entreprise responsable.',
    email: 'v.andriamalala@univ-rovaniaina.mg'
  },
  {
    id: 'prof-6',
    name: 'Dr. Randria',
    title: 'Maître de Conférences',
    department: 'Sociologie',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
    bio: 'Sociologue du travail et spécialiste des structures organisationnelles contemporaines.',
    email: 'j.randria@univ-rovaniaina.mg'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    code: 'ÉCON-401',
    title: 'Macroéconomie Avancée',
    department: 'Économie',
    departmentTag: 'Économie',
    description: 'Une analyse approfondie des modèles macroéconomiques dynamiques, des politiques monétaires et fiscales dans un contexte d\'économie ouverte.',
    longDescription: 'Ce cours explore les fondements théoriques et empiriques des fluctuations économiques, de l\'équilibre général stochastique (DSGE) et des réponses de politiques monétaires face aux chocs exogènes dans les pays en développement.',
    priceMGA: 450000,
    priceEUR: 150,
    coverImageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    professor: INITIAL_PROFESSORS[0],
    duration: '45 heures • 6 semaines',
    level: 'Master 1',
    enrolledCount: 342,
    rating: 4.9,
    isFeatured: true,
    syllabus: [
      {
        id: 'syl-1',
        week: 1,
        title: 'Fondements des modèles IS-LM-BP & régimes de change',
        duration: '7h30',
        lessons: ['Introduction aux chocs monétaires', 'Modèles d\'économie ouverte de Mundell-Fleming', 'Travaux dirigés : Arbitrage de taux d\'intérêt']
      },
      {
        id: 'syl-2',
        week: 2,
        title: 'Microfondations de la consommation et de l\'investissement',
        duration: '8h00',
        lessons: ['Hypothèse du revenu permanent de Friedman', 'Q de Tobin et accumulation du capital', 'Étude de cas : Politiques budgétaires à Madagascar']
      },
      {
        id: 'syl-3',
        week: 3,
        title: 'Modèles DSGE et politique monétaire moderne',
        duration: '9h30',
        lessons: ['Courbe de Phillips néo-keynésienne', 'Règle de Taylor et ciblage d\'inflation', 'Simulation économétrique sur Python/R']
      }
    ]
  },
  {
    id: 'course-2',
    code: 'GEST-412',
    title: 'Stratégie d\'Entreprise et Innovation',
    department: 'Gestion',
    departmentTag: 'Gestion',
    description: 'Développer des cadres analytiques pour concevoir et mettre en œuvre des stratégies concurrentielles durables dans un environnement en mutation.',
    longDescription: 'Acquérez la maîtrise des méthodologies de diagnostic stratégique, de l\'analyse des ressources et compétences (VRIO), des stratégies de rupture (Océan Bleu) et du déploiement opérationnel des plans de transformation numérique.',
    priceMGA: 500000,
    priceEUR: 180,
    coverImageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    professor: INITIAL_PROFESSORS[4],
    duration: '50 heures • 8 semaines',
    level: 'Master 1',
    enrolledCount: 489,
    rating: 4.85,
    isFeatured: true,
    syllabus: [
      {
        id: 'syl-4',
        week: 1,
        title: 'Diagnostic concurrentiel et écosystèmes d\'affaires',
        duration: '6h00',
        lessons: ['Les 5 forces de Porter revisitées', 'Cartographie des parties prenantes', 'Étude de cas : Télécommunications en Afrique subsaharienne']
      },
      {
        id: 'syl-5',
        week: 2,
        title: 'Stratégies de différenciation et innovation de rupture',
        duration: '7h30',
        lessons: ['Matrice Canvas et modèles économiques circulaires', 'Leadership par les coûts vs différenciation', 'Atelier pratique : Pitch d\'innovation stratégique']
      }
    ]
  },
  {
    id: 'course-3',
    code: 'SOC-305',
    title: 'Sociologie des Organisations Modernes',
    department: 'Sociologie',
    departmentTag: 'Sociologie',
    description: 'Étude critique des structures organisationnelles, des dynamiques de pouvoir et des cultures d\'entreprise dans la société contemporaine.',
    longDescription: 'Ce cursus examine les théories sociologiques de l\'action organisée (Crozier, Friedberg, Mintzberg), les rapports hiérarchiques, les mécanismes de négociation informelle et les mutations contemporaines du télétravail.',
    priceMGA: 380000,
    priceEUR: 120,
    coverImageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
    professor: INITIAL_PROFESSORS[5],
    duration: '40 heures • 6 semaines',
    level: 'Licence 3',
    enrolledCount: 298,
    rating: 4.92,
    isFeatured: true,
    syllabus: [
      {
        id: 'syl-6',
        week: 1,
        title: 'Les fondements de l\'analyse stratégique des systèmes',
        duration: '6h30',
        lessons: ['Le concept de zone d\'incertitude', 'Pouvoir et dépendance au sein de l\'institution', 'Enquête de terrain : Les administrations publiques']
      },
      {
        id: 'syl-7',
        week: 2,
        title: 'Culture d\'entreprise, rituels et identités professionnelles',
        duration: '8h00',
        lessons: ['La sociologie de la traduction (Callon-Latour)', 'Gestion du changement et résistances collectives', 'Restitution des travaux de groupe']
      }
    ]
  },
  {
    id: 'course-4',
    code: 'ÉCON-202',
    title: 'Analyse de Données Financières & Économétrie',
    department: 'Économie',
    departmentTag: 'Économie',
    description: 'Comprenez les séries temporelles financières, la modélisation des risques et l\'utilisation des outils statistiques pour la prise de décision.',
    longDescription: 'Une formation pratique orientée données combinant théorie financière moderne, modèles ARCH/GARCH pour la volatilité boursière et programmation d\'analyses statistiques de portefeuille.',
    priceMGA: 450000,
    priceEUR: 150,
    coverImageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
    professor: INITIAL_PROFESSORS[0],
    duration: '42 heures • 7 semaines',
    level: 'Master 1',
    enrolledCount: 412,
    rating: 4.88,
    isFeatured: false,
    syllabus: [
      {
        id: 'syl-8',
        week: 1,
        title: 'Introduction aux séries temporelles stationnaires',
        duration: '7h00',
        lessons: ['Processus AR, MA et ARMA', 'Tests de racine unitaire (Dickey-Fuller)', 'Laboratoire logiciel sur R Studio']
      }
    ]
  },
  {
    id: 'course-5',
    code: 'GEST-501',
    title: 'Leadership Stratégique et Gouvernance',
    department: 'Gestion',
    departmentTag: 'Gestion',
    description: 'Développez des compétences de haut niveau en négociation exécutive, prise de décision sous incertitude et leadership éthique.',
    longDescription: 'Ce programme s\'adresse aux futurs cadres et dirigeants d\'institutions afin de renforcer leurs aptitudes de négociation internationale, de pilotage de comités d\'administration et de responsabilité sociétale des organisations.',
    priceMGA: 500000,
    priceEUR: 180,
    coverImageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    professor: INITIAL_PROFESSORS[1],
    duration: '48 heures • 8 semaines',
    level: 'Master 2',
    enrolledCount: 260,
    rating: 4.95,
    isFeatured: false,
    syllabus: [
      {
        id: 'syl-9',
        week: 1,
        title: 'Dynamiques d\'équipe et intelligence émotionnelle',
        duration: '6h00',
        lessons: ['Styles de leadership situationnel', 'Gestion constructive des conflits', 'Simulations immersives de comités de direction']
      }
    ]
  },
  {
    id: 'course-6',
    code: 'SOC-410',
    title: 'Dynamiques Sociales Urbaines & Développement',
    department: 'Sociologie',
    departmentTag: 'Sociologie',
    description: 'Analysez les flux migratoires, la ségrégation spatiale, l\'urbanisation accélérée et l\'économie informelle dans les métropoles.',
    longDescription: 'Enquête approfondie sur l\'évolution socio-spatiale des grandes agglomérations des pays du Sud, les réseaux de solidarité communautaire et l\'aménagement urbain participatif.',
    priceMGA: 380000,
    priceEUR: 120,
    coverImageUrl: 'https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?auto=format&fit=crop&q=80&w=800',
    professor: INITIAL_PROFESSORS[2],
    duration: '38 heures • 6 semaines',
    level: 'Master 1',
    enrolledCount: 315,
    rating: 4.87,
    isFeatured: false,
    syllabus: [
      {
        id: 'syl-10',
        week: 1,
        title: 'Métropolisation et fabrique de la ville informelle',
        duration: '6h00',
        lessons: ['Théories de l\'école de Chicago à nos jours', 'Les marchés urbains informels et circuits vivriers', 'Diagnostic de terrain à Antananarivo']
      }
    ]
  }
];

export const INITIAL_STUDENT: Student = {
  id: 'std-2024-001',
  name: 'Alexandre Dubois',
  degree: 'Master 1',
  department: 'Économie',
  avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
  isScholarship: true,
  semester: 'Semestre 2',
  gpa: 14.5,
  maxGpa: 20,
  ects: 45,
  totalEcts: 60,
  skills: [
    { subject: 'Macroéconomie', value: 16.5, fullMark: 20 },
    { subject: 'Économétrie', value: 15.0, fullMark: 20 },
    { subject: 'Stratégie', value: 13.5, fullMark: 20 },
    { subject: 'Sociologie', value: 14.0, fullMark: 20 },
    { subject: 'Analyse Données', value: 17.0, fullMark: 20 },
    { subject: 'Gestion Projet', value: 14.5, fullMark: 20 }
  ]
};

export const INITIAL_ENROLLED_COURSES: EnrolledCourse[] = [
  {
    id: 'enr-1',
    courseId: 'course-1',
    course: INITIAL_COURSES[0], // Macroéconomie Avancée
    progress: 65,
    lastAccessed: 'Aujourd\'hui à 10:30',
    nextLessonTitle: 'Module 3 : Courbe de Phillips néo-keynésienne',
    status: 'in_progress',
    grade: 15.5
  },
  {
    id: 'enr-2',
    courseId: 'course-2',
    course: INITIAL_COURSES[1], // Stratégie d'Entreprise
    progress: 32,
    lastAccessed: 'Hier à 16:45',
    nextLessonTitle: 'Module 2 : Matrice Canvas et modèles économiques',
    status: 'in_progress',
    grade: 14.0
  }
];

export const INITIAL_UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: 'evt-1',
    dayShort: 'MAR',
    dayNumber: '12',
    month: 'Mars',
    title: 'Examen : Macroéconomie Avancée',
    location: 'Amphi A • 09:00 - 12:00',
    time: '09:00 - 12:00',
    type: 'exam',
    courseCode: 'ÉCON-401'
  },
  {
    id: 'evt-2',
    dayShort: 'JEU',
    dayNumber: '14',
    month: 'Mars',
    title: 'Rendu : DTD Sociologie des Organisations',
    location: 'Portail Numérique • 23:59',
    time: '23:59',
    type: 'submission',
    courseCode: 'SOC-305'
  },
  {
    id: 'evt-3',
    dayShort: 'LUN',
    dayNumber: '18',
    month: 'Mars',
    title: 'Conférence Magistrale : Innovation & Marchés en Afrique',
    location: 'Salle Polyvalente & Visioconférence',
    time: '14:00 - 17:00',
    type: 'lecture',
    courseCode: 'GEST-412'
  }
];

export const CURATED_IMAGE_PRESETS = [
  {
    name: 'Amphithéâtre Universitaire & Tableaux',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    category: 'Campus'
  },
  {
    name: 'Graphiques & Données Financières',
    url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    category: 'Économie'
  },
  {
    name: 'Réunion Stratégique & Management',
    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    category: 'Gestion'
  },
  {
    name: 'Étudiants en Groupe & Discussions',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
    category: 'Sociologie'
  },
  {
    name: 'Bibliothèque Moderne & Étude',
    url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800',
    category: 'Campus'
  },
  {
    name: 'Tableau de Bord Économique Digital',
    url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
    category: 'Économie'
  }
];
