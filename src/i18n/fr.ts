import type { Translations } from './en';

const fr: Translations = {
  dir: 'ltr',
  langName: 'Français',
  flag: '🇫🇷',

  nav: {
    home: 'Accueil',
    about: 'À propos',
    services: 'Services',
    projects: 'Projets',
    impact: 'Impact',
    team: 'Équipe',
    contact: 'Contact',
    blog: 'Blog',
    getInvolved: 'S\'impliquer',
    menu: 'Menu',
  },

  hero: {
    badge: 'Innovation suédoise pour un impact mondial',
    titleLine1: 'Faire avancer la ',
    titleHighlight1: 'Santé Mondiale',
    titleLine2: 'Par la ',
    titleHighlight2: 'Science',
    subtitle:
      'Civicavita AB est une organisation de recherche suédoise dédiée à combler le fossé entre l\'innovation scientifique et l\'action humanitaire pour créer un monde plus sain et plus équitable.',
    cta1: 'Découvrir nos travaux',
    cta2: 'Notre mission',
    scroll: 'Défiler',
    stats: [
      { number: '47+', label: 'Pays' },
      { number: '2,8M+', label: 'Vies touchées' },
      { number: '156', label: 'Publications' },
      { number: '94%', label: 'Taux de réussite' },
    ],
  },

  about: {
    badge: 'Qui sommes-nous',
    titlePart1: 'La Science rencontre ',
    titleHighlight: 'l\'Humanité',
    description:
      'Fondée en Suède, Civicavita AB se situe à l\'intersection de la recherche scientifique rigoureuse et de l\'action humanitaire compatissante, travaillant à créer des solutions durables pour les défis sanitaires les plus pressants du monde.',
    missionTitle: 'Notre Mission',
    missionText:
      'Faire progresser l\'équité en santé mondiale grâce à la recherche scientifique innovante, au plaidoyer politique fondé sur des preuves et à l\'intervention humanitaire directe. Nous croyons que chacun, quelle que soit sa géographie ou sa situation, mérite un accès à des soins de santé de qualité et un environnement sain.',
    missionTags: ['Excellence en recherche', 'Équité en santé', 'Innovation', 'Durabilité'],
    visionTitle: 'Notre Vision',
    visionText:
      'Un monde où les percées scientifiques atteignent chaque communauté, où les systèmes de santé sont résilients et équitables, et où la réponse humanitaire est alimentée par l\'innovation basée sur les données. Nous envisageons un avenir où aucune vie n\'est perdue à cause d\'une maladie évitable.',
    visionTags: ['Portée mondiale', 'Équité', 'Résilience', 'Données'],
    valuesTitle: 'Nos Valeurs Fondamentales',
    values: [
      {
        icon: '🔬',
        title: 'Rigueur Scientifique',
        desc: 'Chaque programme est fondé sur la recherche évaluée par des pairs et une méthodologie basée sur des preuves.',
      },
      {
        icon: '🤝',
        title: 'Esprit Collaboratif',
        desc: 'Nous construisons des partenariats à travers les frontières, les disciplines et les secteurs pour un impact maximal.',
      },
      {
        icon: '🌍',
        title: 'Équité Mondiale',
        desc: 'Nous priorisons les communautés les plus vulnérables et travaillons à éliminer les disparités en santé.',
      },
      {
        icon: '💡',
        title: 'Innovation d\'abord',
        desc: 'Nous adoptons les technologies émergentes et les approches créatives pour résoudre des défis complexes.',
      },
    ],
  },

  services: {
    badge: 'Ce que nous faisons',
    titlePart1: 'Nos domaines d\'',
    titleHighlight: 'Expertise',
    description:
      'De la recherche en laboratoire au déploiement sur le terrain, nous offrons des solutions complètes sur tout le spectre des défis de santé mondiale.',
    learnMore: 'En savoir plus',
    items: [
      {
        title: 'Recherche Scientifique',
        description:
          'Faire avancer la santé mondiale grâce à la recherche de pointe en épidémiologie, biotechnologie et science environnementale.',
      },
      {
        title: 'Aide Humanitaire',
        description:
          'Fournir des services de santé essentiels, de l\'eau potable et des fournitures indispensables aux communautés touchées par des crises dans le monde entier.',
      },
      {
        title: 'Politique de Santé Mondiale',
        description:
          'Élaborer des politiques fondées sur des preuves qui renforcent les systèmes de santé et améliorent les résultats dans les régions mal desservies.',
      },
      {
        title: 'Développement Durable',
        description:
          'Intégrer la durabilité environnementale aux initiatives de santé publique pour des communautés résilientes et prospères.',
      },
      {
        title: 'IA et Innovation en Santé',
        description:
          'Exploiter l\'intelligence artificielle et l\'analyse de données pour prédire les épidémies, optimiser l\'allocation des ressources et accélérer les diagnostics.',
      },
      {
        title: 'Autonomisation des Communautés',
        description:
          'Renforcer les capacités locales grâce à la formation, l\'éducation et les programmes de partenariat qui créent un changement durable.',
      },
    ],
  },

  projects: {
    badge: 'Nos Travaux',
    titlePart1: 'Projets ',
    titleHighlight: 'Phares',
    description:
      'Des initiatives d\'eau potable aux diagnostics alimentés par l\'IA, découvrez les programmes qui font une différence tangible dans les communautés du monde entier.',
    viewDetails: 'Voir les détails',
    statuses: {
      Active: 'Actif',
      'In Development': 'En développement',
      Ongoing: 'En cours',
      Planning: 'Planification',
    },
    items: [
      {
        title: 'Initiative Eau Potable — Afrique subsaharienne',
        description:
          'Fournir un accès durable à l\'eau potable grâce à des systèmes de filtration innovants et des programmes de gestion de l\'eau menés par les communautés dans 12 pays.',
        tags: ['Eau & Assainissement', 'ODD 6', 'Santé communautaire'],
      },
      {
        title: 'Plateforme de Diagnostic IA',
        description:
          'Développement de modèles d\'apprentissage automatique pour la détection précoce des maladies infectieuses dans les établissements de santé ruraux avec une infrastructure de laboratoire limitée.',
        tags: ['IA/ML', 'Diagnostics', 'Innovation'],
      },
      {
        title: 'Réponse Médicale d\'Urgence — Zones de crise',
        description:
          'Déploiement rapide d\'équipes médicales et de fournitures dans les régions touchées par des catastrophes, fournissant des soins de santé d\'urgence et des services de traumatologie.',
        tags: ['Réponse d\'urgence', 'Traumatologie', 'Logistique'],
      },
      {
        title: 'Programme de Santé Maternelle et Infantile',
        description:
          'Programmes complets de soins de santé maternelle et de vaccination infantile réduisant la mortalité infantile dans les communautés d\'Asie du Sud-Est.',
        tags: ['Santé maternelle', 'Vaccination', 'ODD 3'],
      },
      {
        title: 'Systèmes de Santé Résilients au Climat',
        description:
          'Construction d\'infrastructures de santé capables de résister aux impacts du changement climatique, des cliniques alimentées à l\'énergie solaire aux chaînes d\'approvisionnement médical résistantes à la chaleur.',
        tags: ['Adaptation climatique', 'Infrastructure', 'Résilience'],
      },
      {
        title: 'Réseau Mondial de Distribution de Vaccins',
        description:
          'Établissement de réseaux logistiques de chaîne du froid et de distribution assurant un accès équitable aux vaccins dans les populations éloignées et mal desservies.',
        tags: ['Accès aux vaccins', 'Logistique', 'Équité'],
      },
    ],
  },

  impact: {
    badge: 'Notre Impact',
    titlePart1: 'Faire une ',
    titleHighlight: 'Différence',
    titlePart2: ' Mesurable',
    description:
      'Notre engagement envers la transparence signifie que nous mesurons et rapportons chaque aspect de notre travail, assurant la responsabilité et l\'amélioration continue.',
    stats: [
      { label: 'Pays atteints', description: 'Opérant sur cinq continents' },
      { label: 'Vies touchées', description: 'Personnes directement servies' },
      { label: 'Articles de recherche', description: 'Publiés dans des revues à comité de lecture' },
      { label: 'Taux de réussite', description: 'Dépassant les objectifs fixés' },
    ],
    partnersTitle: 'Partenaires et Collaborateurs de Confiance',
    testimonials: [
      {
        quote:
          'Le programme d\'eau potable de Civicavita a transformé notre village. Pour la première fois depuis des générations, nos enfants peuvent boire de l\'eau potable sans marcher des heures jusqu\'à la source la plus proche.',
        author: 'Chef de communauté, Kenya',
        role: 'Partenaire bénéficiaire',
      },
      {
        quote:
          'Leur plateforme de diagnostic IA a détecté les cas de tuberculose 3 semaines plus tôt que les méthodes traditionnelles. Cette technologie sauvera d\'innombrables vies dans les milieux aux ressources limitées.',
        author: 'Dr. Sarah Kimani',
        role: 'Conseillère régionale de l\'OMS',
      },
      {
        quote:
          'Le partenariat avec Civicavita a été transformateur. Leur rigueur scientifique combinée à un engagement humanitaire sincère en fait un modèle pour l\'industrie.',
        author: 'James Morrison',
        role: 'Directeur de la Fondation Gates',
      },
    ],
  },

  team: {
    badge: '👥 Notre Équipe',
    titlePart1: 'Rencontrez notre ',
    titleHighlight: 'Équipe',
    description:
      'Notre équipe diversifiée de scientifiques, médecins, ingénieurs et humanitaires réunit des décennies d\'expérience en santé mondiale et en innovation.',
    joinTitle: 'Rejoignez Notre Mission',
    joinText:
      'Nous recherchons toujours des personnes passionnées qui souhaitent faire une différence en santé mondiale. Explorez les postes ouverts et les opportunités de bénévolat.',
    joinCta: 'Voir les opportunités',
    openPosition: 'Poste ouvert',
    openPositionText: 'Nous construisons notre équipe. Si vous partagez notre mission, nous aimerions en entendre parler.',
    applyNow: 'Postuler',
    members: [
      {
        role: 'Fondatrice & Chercheuse principale',
        bio: 'Doctorat en médecine de l\'Université de Téhéran, MSc en Santé publique internationale de l\'Université de Lund. Plus de 18 ans avec l\'OMS, l\'UNICEF, le PNUD et ONU Femmes dans 12 pays en situations d\'urgence et de développement.',
      },
      {
        role: 'Collaborateurs scientifiques',
        bio: 'Notre équipe de recherche multidisciplinaire apporte une expertise en santé publique, gestion des catastrophes, prévention des MNT, systèmes d\'information sanitaire et élaboration de politiques.',
      },
      {
        role: 'Partenaires humanitaires',
        bio: 'Un réseau de coordinateurs de terrain et de professionnels humanitaires avec une profonde expérience dans les urgences complexes, les programmes de relèvement et la mobilisation sociale communautaire.',
      },
      {
        role: 'Conseillers stratégiques',
        bio: 'Des conseillers de haut niveau de l\'OMS, de l\'UNICEF, de l\'Université Linnaeus et de l\'Université de Malmö fournissent des orientations stratégiques sur la conception de recherche et le renforcement des systèmes de santé.',
      },
    ],
  },

  founder: {
    badge: 'Fondatrice et Visionnaire',
    titlePart1: 'Rencontrez notre ',
    titleHighlight: 'Fondatrice',
    founderBadge: '✦ Fondatrice & PDG',
    role: 'Fondatrice & Chercheuse principale, Civicavita AB',
    bio: 'Le Dr. Sahar Motallebi est médecin, experte en santé publique et leader humanitaire avec plus de 18 ans d\'expérience dans la conception et la gestion de programmes de plusieurs millions de dollars avec l\'OMS, l\'UNICEF, le PNUD et ONU Femmes dans 12 pays en situations d\'urgence complexes, de relèvement et de développement.',
    highlights: [
      {
        title: 'Formation',
        text: 'Doctorat en médecine, Université de Téhéran · MSc Santé publique internationale, Université de Lund · Certificats de l\'Université de Copenhague, Université de Bâle & MIT',
      },
      {
        title: 'Expérience',
        text: '18+ ans avec des Ministères, ONG & Agences de l\'ONU (OMS, UNICEF, PNUD, ONU Femmes) en Iran, Irak, Afghanistan, Soudan, Somalie, Kenya, Pakistan & Suède',
      },
      {
        title: 'Portée mondiale',
        text: '12 pays au Moyen-Orient, en Afrique, en Asie du Sud & en Europe — des opérations de terrain à l\'élaboration de politiques au plus haut niveau',
      },
      {
        title: 'Recherche & Impact',
        text: '5+ publications dont dans l\'American Journal of Preventive Medicine · Recherche sur le COVID-19, la prévention des MNT, les déterminants sociaux de la santé',
      },
    ],
    specialtiesLabel: 'Domaines d\'expertise',
    specialties: [
      'Gestion des catastrophes',
      'Politique de santé publique',
      'Prévention des MNT',
      'Renforcement des systèmes de santé',
      'Conception de recherche',
      'Gestion de subventions',
      'Coordination de cluster',
      'Santé des femmes & Protection',
      'Mobilisation communautaire',
      'Planification basée sur les preuves',
    ],
    linkedinCta: 'Se connecter sur LinkedIn',
    cvTitle: 'Curriculum Vitae Complet',
    experienceTitle: 'Expérience professionnelle',
    experienceRoles: [
      'Fondatrice & Chercheuse principale',
      'Chercheuse associée — Sciences de la santé publique',
      'Consultante — Éducation communautaire sur la violence domestique',
      'Chargée technique — Profil national MNT, notes de politique & cadre S&E',
      'Coordinatrice de projet — Programme EVAW, ONU Femmes & PNUD',
      'Spécialiste de programme — Bureau zonal de l\'Est',
      'Chef du programme de santé et nutrition — Bureau zonal',
      'Chef de sous-bureau — État du Nil Bleu',
      'Conseillère en planification des catastrophes — Secrétariat de gestion des risques sanitaires',
      'Médecin urgentiste — Hôpitaux publics',
    ],
    educationTitle: 'Formation',
    educationDegrees: [
      'Master en systèmes d\'information',
      'Gouvernance climatique (30 ECTS)',
      'MSc Santé publique internationale — Mémoire : Déterminants sociaux de la santé des populations déplacées',
      'Doctorat en médecine (MD)',
    ],
    coursesTitle: 'Cours & Certifications sélectionnés',
    publicationsTitle: 'Publications & Recherche',
    languagesTitle: 'Langues',
    languageNames: ['Persan & Azéri', 'Anglais', 'Arabe & Français'],
    languageLevels: { native: 'Langue maternelle', fluent: 'Courant', working: 'Connaissance professionnelle' },
    skillsTitle: 'Compétences clés',
    skillNames: [
      'Gestion du cycle de projet',
      'Rédaction de propositions & rapports',
      'Suivi & Évaluation',
      'Mobilisation des ressources',
      'Coordination de cluster',
      'Conception de recherche',
      'Systèmes d\'information sanitaire',
      'Réduction des risques de catastrophe',
      'Santé & autonomisation des femmes',
      'Mobilisation sociale',
      'SPSS, SIG & Cartographie sanitaire',
      'Plaidoyer politique',
    ],
  },

  cta: {
    features: [
      'Approuvé par l\'OMS',
      '2,8M+ de vies impactées',
      'Solutions alimentées par l\'IA',
    ],
    titlePart1: 'Prêt à faire la ',
    titleHighlight: 'Différence',
    description:
      'Rejoignez-nous dans notre mission pour faire progresser l\'équité en santé mondiale. Que ce soit par le partenariat, le bénévolat ou le soutien — chaque contribution crée des ondulations de changement.',
    cta1: 'Devenez Partenaire',
    cta2: 'Voir notre impact',
  },

  contact: {
    badge: 'Nous Contacter',
    titlePart1: 'Travaillons ',
    titleHighlight: 'Ensemble',
    description:
      'Que vous soyez intéressé par un partenariat, le bénévolat ou en savoir plus sur notre travail, nous serions ravis de vous entendre.',
    email: 'E-mail',
    phone: 'Téléphone',
    address: 'Adresse',
    addressValue: 'Kungsgatan 44, 111 35 Stockholm, Suède',
    workingHours: 'Horaires de travail',
    workingHoursValue: 'Lun–Ven : 09h00 – 17h00 CET',
    formName: 'Nom complet',
    formNamePlaceholder: 'Jean Dupont',
    formEmail: 'Adresse e-mail',
    formEmailPlaceholder: 'jean@example.com',
    formSubject: 'Sujet',
    formSubjectPlaceholder: 'Sélectionnez un sujet...',
    formSubjectOptions: [
      'Demande de partenariat',
      'Opportunités de bénévolat',
      'Collaboration de recherche',
      'Dons et financement',
      'Médias et presse',
      'Autre',
    ],
    formMessage: 'Message',
    formMessagePlaceholder: 'Parlez-nous de votre demande...',
    formSubmit: 'Envoyer le message',
    successTitle: 'Message envoyé !',
    successText: 'Nous vous répondrons dans les 24 heures.',
  },

  footer: {
    description:
      'Une organisation de recherche suédoise faisant progresser la santé mondiale grâce à l\'innovation scientifique, l\'action humanitaire et les politiques fondées sur des preuves. Ensemble, nous construisons un monde plus sain et plus équitable.',
    organizationTitle: 'Organisation',
    organization: ['À propos', 'Notre équipe', 'Carrières', 'Rapports annuels'],
    programsTitle: 'Programmes',
    programs: ['Santé mondiale', 'Recherche', 'Aide humanitaire', 'Laboratoire d\'innovation'],
    resourcesTitle: 'Ressources',
    resources: ['Publications', 'Données et analyses', 'Actualités', 'Devenez partenaire'],
    newsletterTitle: 'Restez informé',
    newsletterText: 'Recevez les dernières nouvelles sur nos recherches et programmes.',
    newsletterPlaceholder: 'Entrez votre e-mail',
    newsletterCta: 'S\'abonner',
    copyright: `© ${new Date().getFullYear()} Civicavita AB. Tous droits réservés. Org.nr : 559XXX-XXXX.`,
    builtWith: 'Construit avec',
    inStockholm: 'à Stockholm, Suède.',
    privacyPolicy: 'Politique de confidentialité',
    termsOfService: 'Conditions d\'utilisation',
  },

  blog: {
    badge: 'Analyses & Réflexions',
    titlePart1: 'Notes de ',
    titleHighlight: 'Terrain',
    subtitle: 'Réflexions, recherches et leçons de terrain tirées de plus de 18 ans en santé mondiale, action humanitaire et politique de santé.',
    searchPlaceholder: 'Rechercher des articles, sujets ou tags…',
    allCategories: 'Tous',
    noPosts: 'Aucun article trouvé. Revenez bientôt ou écrivez-en un depuis le panneau d\'administration.',
    minRead: 'min de lecture',
    backToBlog: 'Retour aux articles',
    notFound: 'Article introuvable',
    notFoundText: 'L\'article que vous recherchez a peut-être été déplacé ou supprimé.',
    viewAll: 'Voir tous les articles',
  },

  admin: {
    title: 'Connexion Administrateur',
    subtitle: 'Connectez-vous pour gérer les articles du blog',
    passwordLabel: 'Mot de passe',
    passwordPlaceholder: 'Entrez le mot de passe admin',
    wrongPassword: 'Mot de passe incorrect. Veuillez réessayer.',
    hint: 'Mot de passe par défaut : civicavita2026 — à modifier dans src/components/AdminPanel.tsx',
    login: 'Se connecter',
    backToSite: 'Retour au site',
    authenticated: 'Authentifié',
    dashboardTitle: 'Tableau de bord du contenu',
    dashboardSubtitle: 'Créez, modifiez et publiez des articles dans le style de WordPress.',
    newPost: 'Nouvel article',
    logout: 'Se déconnecter',
    editPost: 'Modifier l\'article',
    createPost: 'Créer un nouvel article',
    fieldTitle: 'Titre',
    fieldCategory: 'Catégorie',
    fieldExcerpt: 'Extrait / Résumé',
    fieldExcerptPlaceholder: 'Un court résumé affiché sur la liste du blog…',
    fieldContent: 'Contenu',
    markdownHint: '(Markdown pris en charge : # titres, **gras**, *italique*, - listes)',
    fieldDate: 'Date',
    fieldEmoji: 'Emoji de couverture',
    fieldTags: 'Tags',
    fieldTagsPlaceholder: 'séparés, par, virgules',
    update: 'Mettre à jour',
    publish: 'Publier',
    cancel: 'Annuler',
    allPosts: 'Tous les articles',
    resetToDefault: 'Réinitialiser aux articles par défaut',
    confirmReset: 'Réinitialiser tous les articles aux articles d\'origine ? Les articles personnalisés seront perdus.',
    noPosts: 'Aucun article pour le moment. Cliquez sur "Nouvel article" pour écrire votre premier article.',
    view: 'Voir',
    edit: 'Modifier',
    delete: 'Supprimer',
    confirmDelete: 'Supprimer cet article ? Cette action est irréversible.',
  },
};

export default fr;
