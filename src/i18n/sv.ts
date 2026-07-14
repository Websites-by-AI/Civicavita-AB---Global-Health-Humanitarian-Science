import type { Translations } from './en';

const sv: Translations = {
  dir: 'ltr',
  langName: 'Svenska',
  flag: '🇸🇪',

  nav: {
    home: 'Hem',
    about: 'Om oss',
    services: 'Tjänster',
    projects: 'Projekt',
    impact: 'Påverkan',
    team: 'Team',
    contact: 'Kontakt',
    blog: 'Blogg',
    getInvolved: 'Engagera dig',
    menu: 'Meny',
  },

  hero: {
    badge: 'Svensk innovation för global påverkan',
    titleLine1: 'Främjar ',
    titleHighlight1: 'Global Hälsa',
    titleLine2: 'Genom ',
    titleHighlight2: 'Vetenskap',
    subtitle:
      'Civicavita AB är en svensk forskningsorganisation dedikerad till att överbrygga klyftan mellan vetenskaplig innovation och humanitär handling för att skapa en hälsosammare, mer rättvis värld.',
    cta1: 'Utforska vårt arbete',
    cta2: 'Vårt uppdrag',
    scroll: 'Scrolla',
    stats: [
      { number: '47+', label: 'Länder' },
      { number: '2,8M+', label: 'Påverkade liv' },
      { number: '156', label: 'Publikationer' },
      { number: '94%', label: 'Framgångsgrad' },
    ],
  },

  about: {
    badge: 'Vilka vi är',
    titlePart1: 'Vetenskap möter ',
    titleHighlight: 'Mänskligheten',
    description:
      'Grundat i Sverige, Civicavita AB står i skärningspunkten mellan rigorös vetenskaplig forskning och medkännande humanitär handling, och arbetar för att skapa varaktiga lösningar på världens mest akuta hälsoutmaningar.',
    missionTitle: 'Vårt uppdrag',
    missionText:
      'Att främja global hälsorättvisa genom innovativ vetenskaplig forskning, evidensbaserat politiskt påverkansarbete och direkt humanitär insats. Vi tror att alla, oavsett geografi eller omständigheter, förtjänar tillgång till kvalitativ sjukvård och en hälsosam miljö.',
    missionTags: ['Forskningsexcellens', 'Hälsorättvisa', 'Innovation', 'Hållbarhet'],
    visionTitle: 'Vår vision',
    visionText:
      'En värld där vetenskapliga genombrott når varje samhälle, där sjukvårdssystem är motståndskraftiga och rättvisa, och där humanitär respons drivs av datadrivet innovation. Vi ser en framtid där inget liv går förlorat av en sjukdom som kan förebyggas.',
    visionTags: ['Global räckvidd', 'Rättvisa', 'Motståndskraft', 'Datadriven'],
    valuesTitle: 'Våra kärnvärden',
    values: [
      {
        icon: '🔬',
        title: 'Vetenskaplig noggrannhet',
        desc: 'Varje program grundas i peer-reviewed forskning och evidensbaserad metodik.',
      },
      {
        icon: '🤝',
        title: 'Samarbetsanda',
        desc: 'Vi bygger partnerskap över gränser, discipliner och sektorer för maximal påverkan.',
      },
      {
        icon: '🌍',
        title: 'Global rättvisa',
        desc: 'Vi prioriterar de mest sårbara samhällena och arbetar för att eliminera hälsoskillnader.',
      },
      {
        icon: '💡',
        title: 'Innovation först',
        desc: 'Vi omfamnar ny teknik och kreativa tillvägagångssätt för att lösa komplexa utmaningar.',
      },
    ],
  },

  services: {
    badge: 'Vad vi gör',
    titlePart1: 'Våra ',
    titleHighlight: 'Expertområden',
    description:
      'Från laboratorieforskning till fältarbete levererar vi omfattande lösningar över hela spektrumet av globala hälsoutmaningar.',
    learnMore: 'Läs mer',
    items: [
      {
        title: 'Vetenskaplig forskning',
        description:
          'Främjar global hälsa genom spjutspetsforskning inom epidemiologi, bioteknik och miljövetenskap.',
      },
      {
        title: 'Humanitärt bistånd',
        description:
          'Levererar kritiska hälsotjänster, rent vatten och nödvändiga förnödenheter till samhällen drabbade av kriser världen över.',
      },
      {
        title: 'Global hälsopolitik',
        description:
          'Utformar evidensbaserade policyer som stärker sjukvårdssystem och förbättrar resultat i underservade regioner.',
      },
      {
        title: 'Hållbar utveckling',
        description:
          'Integrerar miljömässig hållbarhet med folkhälsoinitiativ för motståndskraftiga, blomstrande samhällen.',
      },
      {
        title: 'AI & Hälsoinnovation',
        description:
          'Utnyttjar artificiell intelligens och dataanalys för att förutsäga utbrott, optimera resursfördelning och påskynda diagnostik.',
      },
      {
        title: 'Samhällsförstärkning',
        description:
          'Bygger lokal kapacitet genom utbildning och partnerskapsprogram som skapar varaktig förändring.',
      },
    ],
  },

  projects: {
    badge: 'Vårt arbete',
    titlePart1: 'Utvalda ',
    titleHighlight: 'Projekt',
    description:
      'Från initiativ för rent vatten till AI-drivna diagnostikverktyg, utforska programmen som gör verklig skillnad i samhällen världen över.',
    viewDetails: 'Visa detaljer',
    statuses: {
      Active: 'Aktiv',
      'In Development': 'Under utveckling',
      Ongoing: 'Pågående',
      Planning: 'Planering',
    },
    items: [
      {
        title: 'Initiativ för rent vatten — Subsahariska Afrika',
        description:
          'Tillhandahåller hållbar tillgång till rent dricksvatten genom innovativa filtreringssystem och samhällsledda vattenhanteringsprogram i 12 länder.',
        tags: ['Vatten & sanitet', 'SDG 6', 'Samhällshälsa'],
      },
      {
        title: 'AI-driven diagnostikplattform',
        description:
          'Utvecklar maskininlärningsmodeller för tidig upptäckt av infektionssjukdomar i rurala sjukvårdsinrättningar med begränsad laboratorieutrustning.',
        tags: ['AI/ML', 'Diagnostik', 'Innovation'],
      },
      {
        title: 'Akut medicinsk insats — Krisområden',
        description:
          'Snabb utplacering av medicinska team och förnödenheter i katastrofdrabbade regioner, med akutsjukvård och traumavård.',
        tags: ['Akutinsats', 'Traumavård', 'Logistik'],
      },
      {
        title: 'Program för mödra- och barnhälsa',
        description:
          'Omfattande program för mödravård och barnvaccinering som minskar spädbarnsdödligheten i sydostasiatiska samhällen.',
        tags: ['Mödrahälsa', 'Vaccination', 'SDG 3'],
      },
      {
        title: 'Klimatresilienta hälsosystem',
        description:
          'Bygger sjukvårdsinfrastruktur som klarar klimatförändringseffekter, från solcellsdrivna kliniker till värmemotståndiga medicinska leveranskedjor.',
        tags: ['Klimatanpassning', 'Infrastruktur', 'Motståndskraft'],
      },
      {
        title: 'Globalt vaccinationsdistributionsnätverk',
        description:
          'Etablerar kylkedjelogistik och distributionsnätverk som säkerställer rättvis vaccintillgång i avlägsna och underservade befolkningar.',
        tags: ['Vaccintillgång', 'Logistik', 'Rättvisa'],
      },
    ],
  },

  impact: {
    badge: 'Vår påverkan',
    titlePart1: 'Gör en ',
    titleHighlight: 'mätbar',
    titlePart2: ' skillnad',
    description:
      'Vårt engagemang för transparens innebär att vi mäter och rapporterar om varje aspekt av vårt arbete, vilket säkerställer ansvarsskyldighet och kontinuerlig förbättring.',
    stats: [
      { label: 'Nådda länder', description: 'Verksamma på fem kontinenter' },
      { label: 'Påverkade liv', description: 'Direkt betjänade personer' },
      { label: 'Forskningsartiklar', description: 'Publicerade i peer-reviewed tidskrifter' },
      { label: 'Projektframgång', description: 'Överträffar uppsatta mål' },
    ],
    partnersTitle: 'Betrodda partners och samarbetspartners',
    testimonials: [
      {
        quote:
          'Civicavitas program för rent vatten förändrade vår by. För första gången på generationer kan våra barn dricka säkert vatten utan att gå i timmar till närmaste källa.',
        author: 'Samhällsledare, Kenya',
        role: 'Partner och mottagare',
      },
      {
        quote:
          'Deras AI-diagnostikplattform upptäckte tuberkulosfall 3 veckor tidigare än traditionella metoder. Denna teknik kommer att rädda otaliga liv i resursbegränsade miljöer.',
        author: 'Dr. Sarah Kimani',
        role: 'WHO:s regionala rådgivare',
      },
      {
        quote:
          'Partnerskapet med Civicavita har varit transformativt. Deras vetenskapliga noggrannhet kombinerat med genuint humanitärt engagemang gör dem till en förebild för branschen.',
        author: 'James Morrison',
        role: 'Direktör, Gates Foundation',
      },
    ],
  },

  team: {
    badge: '👥 Vårt team',
    titlePart1: 'Möt vårt ',
    titleHighlight: 'Team',
    description:
      'Vårt mångsidiga team av forskare, läkare, ingenjörer och humanitärarbetare samlar decennier av erfarenhet inom global hälsa och innovation.',
    joinTitle: 'Gå med i vårt uppdrag',
    joinText:
      'Vi söker alltid passionerade personer som vill göra skillnad inom global hälsa. Utforska öppna positioner och volontärmöjligheter.',
    joinCta: 'Se möjligheter',
    openPosition: 'Öppen tjänst',
    openPositionText: 'Vi bygger vårt team. Om du delar vårt uppdrag vill vi gärna höra från dig.',
    applyNow: 'Ansök nu',
    members: [
      {
        role: 'Grundare & Ledande Forskare',
        bio: 'Läkarexamen från Teherans universitet, MSc i Internationell folkhälsa från Lunds universitet. Över 18 år med WHO, UNICEF, UNDP & UN Women i 12 länder i komplexa nödsituationer, återhämtning och utveckling.',
      },
      {
        role: 'Vetenskapliga samarbetspartners',
        bio: 'Vårt tvärvetenskapliga forskarteam har expertis inom folkhälsa, katastrofhantering, NCD-prevention, hälsoinformationssystem och evidensbaserat policyarbete.',
      },
      {
        role: 'Humanitära partners',
        bio: 'Ett nätverk av fältkoordinatorer och humanitära yrkesverksamma med djup erfarenhet av komplexa nödsituationer, återhämtningsprogram och samhällelig social mobilisering.',
      },
      {
        role: 'Strategiska rådgivare',
        bio: 'Seniora rådgivare från WHO, UNICEF, Linnéuniversitetet och Malmö universitet ger strategisk vägledning om forskningsdesign, hälsosystemförstärkning och hållbar utveckling.',
      },
    ],
  },

  founder: {
    badge: 'Grundare & Visionär',
    titlePart1: 'Möt vår ',
    titleHighlight: 'Grundare',
    founderBadge: '✦ Grundare & VD',
    role: 'Grundare & Ledande Forskare, Civicavita AB',
    bio: 'Dr. Sahar Motallebi är läkare, folkhälsoexpert och humanitär ledare med över 18 års erfarenhet av att utforma och hantera mångmiljonprogram med WHO, UNICEF, UNDP och UN Women i 12 länder i komplexa nödsituationer, återhämtning och utvecklingssammanhang.',
    highlights: [
      {
        title: 'Utbildning',
        text: 'Läkarexamen, Teherans universitet · MSc Internationell folkhälsa, Lunds universitet · Certifikat från Köpenhamns universitet, Basels universitet & MIT',
      },
      {
        title: 'Erfarenhet',
        text: '18+ år med ministerier, NGO:er & FN-organ (WHO, UNICEF, UNDP, UN Women) i Iran, Irak, Afghanistan, Sudan, Somalia, Kenya, Pakistan & Sverige',
      },
      {
        title: 'Global räckvidd',
        text: '12 länder i Mellanöstern, Afrika, Sydasien & Europa — från fältoperationer till policyarbete på högsta nivå',
      },
      {
        title: 'Forskning & Påverkan',
        text: '5+ publikationer inklusive i American Journal of Preventive Medicine · Forskning om COVID-19, NCD-prevention, sociala hälsofaktorer',
      },
    ],
    specialtiesLabel: 'Expertområden',
    specialties: [
      'Katastrofhantering',
      'Folkhälsopolitik',
      'NCD-prevention',
      'Hälsosystemförstärkning',
      'Forskningsdesign',
      'Bidragshantering',
      'Klusterkoordinering',
      'Kvinnohälsa & Skydd',
      'Samhällsmobilisering',
      'Evidensbaserad planering',
    ],
    linkedinCta: 'Anslut på LinkedIn',
    cvTitle: 'Fullständigt CV',
    experienceTitle: 'Yrkeserfarenhet',
    experienceRoles: [
      'Grundare & Ledande Forskare',
      'Research Fellow — Folkhälsovetenskap',
      'Konsult — Samhällsutbildning om våld i hemmet',
      'Teknisk handläggare — NCD-landsprofil, policybrief & M&E-ram',
      'Projektkoordinator — EVAW-program, UN Women & UNDP',
      'Programspecialist — Östra zonkontoret',
      'Chef för hälsa- och näringsprogram — Zonkontor',
      'Chef för underkontor — Blue Nile State',
      'Rådgivare för katastrofplanering — Sekretariatet för hälsoriskhantering',
      'Akutläkare — Offentliga sjukhus',
    ],
    educationTitle: 'Utbildning',
    educationDegrees: [
      'Master i informationssystem',
      'Klimatstyrning (30 ECTS)',
      'MSc Internationell folkhälsa — Avhandling: Sociala hälsofaktorer för fördrivna befolkningar',
      'Läkarexamen (MD)',
    ],
    coursesTitle: 'Utvalda kurser & certifieringar',
    publicationsTitle: 'Publikationer & Forskning',
    languagesTitle: 'Språk',
    languageNames: ['Persiska & Azeriska', 'Engelska', 'Arabiska & Franska'],
    languageLevels: { native: 'Modersmål', fluent: 'Flytande', working: 'Arbetskunskap' },
    skillsTitle: 'Kärnkompetenser',
    skillNames: [
      'Projektcykelsstyrning',
      'Förslags- & rapportskrivning',
      'Uppföljning & Utvärdering',
      'Resursmobilisering',
      'Klusterkoordinering',
      'Forskningsdesign',
      'Hälsoinformationssystem',
      'Katastrofriskminskning',
      'Kvinnohälsa & egenmakt',
      'Social mobilisering',
      'SPSS, GIS & Hälsokartläggning',
      'Policy-påverkan',
    ],
  },

  cta: {
    features: [
      'Betrodd av WHO',
      '2,8M+ påverkade liv',
      'AI-drivna lösningar',
    ],
    titlePart1: 'Redo att göra ',
    titleHighlight: 'skillnad',
    description:
      'Gå med i vårt uppdrag att främja global hälsorättvisa. Oavsett om det är genom partnerskap, volontärarbete eller stöd — varje bidrag skapar ringar på vattnet.',
    cta1: 'Bli partner',
    cta2: 'Se vår påverkan',
  },

  contact: {
    badge: 'Kontakta oss',
    titlePart1: 'Låt oss arbeta ',
    titleHighlight: 'Tillsammans',
    description:
      'Oavsett om du är intresserad av partnerskap, volontärarbete eller att veta mer om vårt arbete, vill vi gärna höra från dig.',
    email: 'E-post',
    phone: 'Telefon',
    address: 'Adress',
    addressValue: 'Kungsgatan 44, 111 35 Stockholm, Sverige',
    workingHours: 'Öppettider',
    workingHoursValue: 'Mån–Fre: 09:00 – 17:00 CET',
    formName: 'Fullständigt namn',
    formNamePlaceholder: 'Anna Andersson',
    formEmail: 'E-postadress',
    formEmailPlaceholder: 'anna@example.com',
    formSubject: 'Ämne',
    formSubjectPlaceholder: 'Välj ett ämne...',
    formSubjectOptions: [
      'Partnerskapsförfrågan',
      'Volontärmöjligheter',
      'Forskningssamarbete',
      'Donationer & finansiering',
      'Media & press',
      'Övrigt',
    ],
    formMessage: 'Meddelande',
    formMessagePlaceholder: 'Berätta om din förfrågan...',
    formSubmit: 'Skicka meddelande',
    successTitle: 'Meddelande skickat!',
    successText: 'Vi återkommer inom 24 timmar.',
  },

  footer: {
    description:
      'En svensk forskningsorganisation som främjar global hälsa genom vetenskaplig innovation, humanitär handling och evidensbaserad politik. Tillsammans bygger vi en hälsosammare, mer rättvis värld.',
    organizationTitle: 'Organisation',
    organization: ['Om oss', 'Vårt team', 'Karriär', 'Årsredovisningar'],
    programsTitle: 'Program',
    programs: ['Global hälsa', 'Forskning', 'Humanitärt bistånd', 'Innovationslabb'],
    resourcesTitle: 'Resurser',
    resources: ['Publikationer', 'Data & insikter', 'Nyheter & uppdateringar', 'Bli partner'],
    newsletterTitle: 'Håll dig uppdaterad',
    newsletterText: 'Få senaste nytt om vår forskning och våra program.',
    newsletterPlaceholder: 'Ange din e-post',
    newsletterCta: 'Prenumerera',
    copyright: `© ${new Date().getFullYear()} Civicavita AB. Alla rättigheter förbehållna. Org.nr: 559XXX-XXXX.`,
    builtWith: 'Byggd med',
    inStockholm: 'i Stockholm, Sverige.',
    privacyPolicy: 'Integritetspolicy',
    termsOfService: 'Användarvillkor',
  },

  blog: {
    badge: 'Insikter & Analys',
    titlePart1: 'Fält',
    titleHighlight: 'anteckningar',
    subtitle: 'Reflektioner, forskning och fältlektioner från 18+ år inom global hälsa, humanitärt arbete och hälsopolitik.',
    searchPlaceholder: 'Sök artiklar, ämnen eller taggar…',
    allCategories: 'Alla',
    noPosts: 'Inga inlägg hittades. Kom tillbaka snart eller skriv ett från adminpanelen.',
    minRead: 'min läsning',
    backToBlog: 'Tillbaka till alla inlägg',
    notFound: 'Inlägg hittades inte',
    notFoundText: 'Artikeln du letar efter kan ha flyttats eller tagits bort.',
    viewAll: 'Se alla inlägg',
  },

  admin: {
    title: 'Admininloggning',
    subtitle: 'Logga in för att hantera blogginlägg',
    passwordLabel: 'Lösenord',
    passwordPlaceholder: 'Ange adminlösenord',
    wrongPassword: 'Fel lösenord. Försök igen.',
    hint: 'Standardlösenord: civicavita2026 — ändra detta i src/components/AdminPanel.tsx',
    login: 'Logga in',
    backToSite: 'Tillbaka till webbplatsen',
    authenticated: 'Autentiserad',
    dashboardTitle: 'Innehållspanel',
    dashboardSubtitle: 'Skapa, redigera och publicera blogginlägg i WordPress-stil.',
    newPost: 'Nytt inlägg',
    logout: 'Logga ut',
    editPost: 'Redigera inlägg',
    createPost: 'Skapa nytt inlägg',
    fieldTitle: 'Titel',
    fieldCategory: 'Kategori',
    fieldExcerpt: 'Utdrag / Sammanfattning',
    fieldExcerptPlaceholder: 'En kort sammanfattning som visas i bloggens lista…',
    fieldContent: 'Innehåll',
    markdownHint: '(Markdown stöds: # rubriker, **fetstil**, *kursiv*, - listor)',
    fieldDate: 'Datum',
    fieldEmoji: 'Omslags-emoji',
    fieldTags: 'Taggar',
    fieldTagsPlaceholder: 'separerade, med, kommatecken',
    update: 'Uppdatera',
    publish: 'Publicera',
    cancel: 'Avbryt',
    allPosts: 'Alla inlägg',
    resetToDefault: 'Återställ till standardinlägg',
    confirmReset: 'Återställ alla inlägg till originalartiklarna? Anpassade inlägg förloras.',
    noPosts: 'Inga inlägg än. Klicka på "Nytt inlägg" för att skriva din första artikel.',
    view: 'Visa',
    edit: 'Redigera',
    delete: 'Ta bort',
    confirmDelete: 'Ta bort detta inlägg? Detta kan inte ångras.',
  },
};

export default sv;
