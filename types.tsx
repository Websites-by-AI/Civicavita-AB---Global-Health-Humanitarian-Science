
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

const translations: Record<string, any> = {
  en: {
    langCode: 'en-US',
    nav: { 
      home: "Home", 
      about: "About Us",
      contact: "Contact Us",
      reportGenerator: "Doc Assistant", 
      grantFinder: "Grant Finder", 
      videoGenerator: "Video Generator", 
      blogGenerator: "Blog Generator",
      contentHub: "Content Maker",
      wasteToWealth: "Waste to Wealth",
      treePlanter: "Tree Planter",
      projects: "Projects", 
      team: "Team", 
      aiEvolution: "System Evolution",
    },
    hero: {
        title: "CIVICAVITA.<span class='text-orange-500'>A</span><span class='text-emerald-500'>B</span> <br/> <span class='text-white'>Global Health & Humanitarian Science</span>",
        subtitle: "CIVICAVITA derives from Latin-rooted words 'Civic' (citizen, society, public life) and 'Vita' (life, well-being, sustainability). We bridge scientific knowledge with real-world impact, advancing public health, social equity, and environmental sustainability.",
        button1: "Explore Our Work",
        button2: "Contact Us",
        videoUrl: "https://storage.googleapis.com/civicavita-assets/hero-bg.mp4"
    },
    home: {
        introTitle: "Mission",
        introText: "At CIVICAVITA AB, we conduct research in social and health sciences to enhance individual and community well-being while promoting sustainability, social responsibility, and human rights. Through evidence-based research, educational content, and digital engagement, we collaborate with academia, NGOs, and public institutions to drive informed decision-making and positive social change.",
        visionTitle: "Vision",
        visionText: "CIVICAVITA AB envisions a future where reliable research informs policies and initiatives that enhance lives and protect the environment. By collaborating with international organizations, NGOs, academic institutions, and private partners, we aim to contribute to a more just, sustainable, and informed society.",
        servicesTitle: "Our Core Services",
        services: [
            { iconKey: 'science', title: 'Humanitarian Research', text: 'Conducting field-based scientific studies to create evidence-based solutions for health crises and social equity.' },
            { iconKey: 'grant', title: 'Grant Acquisition', text: 'Securing and managing funding for high-impact humanitarian and scientific projects.' },
            { iconKey: 'education', title: 'Education & Media', text: 'Developing handbooks, courses, and media programs to educate activists and the public.' },
            { iconKey: 'consulting', title: 'Policy & Advisory', text: 'Contributing to ethical codes and governance frameworks for democratic engagement.' }
        ],
        portfolioTitle: "Featured Research Projects",
        portfolioItems: [
            { img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80", title: "Health Systems Research", link: "#", description: "Conducted studies on the evolution, challenges, and future directions of healthcare systems, proposing policies to improve workforce capacity, financing, and infrastructure for equitable access.", tags: ["Health Policy", "Infrastructure", "Equity"]},
            { img: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=800&q=80", title: "COVID-19 Strategies", link: "#", description: "Analysed data and preventive measures from 44 countries to evaluate their effectiveness in reducing mortality rates.", tags: ["Epidemiology", "Data Analysis", "Global Health"]},
            { img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80", title: "Climate Change and Diseases", link: "#", description: "Researched the effects of climate change on disease patterns in vulnerable regions.", tags: ["Climate Change", "Environmental Health", "Research"]},
            { img: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&q=80", title: "Sexual & Reproductive Health", link: "#", description: "Investigated barriers to maternal healthcare, family planning, and protection from gender-based violence in temporary shelter settings for displaced populations.", tags: ["Women's Health", "Displacement", "Human Rights"]},
            { img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", title: "Digital Governance & Sustainability", link: "#", description: "Exploring advancement of transparent governance frameworks and sustainable decision-making in health, environment, and policy through technology-driven solutions.", tags: ["Digital Health", "Governance", "Tech"]}
        ],
        achievementsTitle: "Our Impact",
        achievements: [
            { iconKey: 'publications', count: 200, suffix: '+', label: 'Media Programs Produced' },
            { iconKey: 'funded', count: 44, suffix: '', label: 'Countries Analyzed' },
            { iconKey: 'collaborations', count: 15, suffix: '+', label: 'Global Partners' },
            { iconKey: 'team', count: 12, suffix: '', label: 'Active Projects' },
            { iconKey: 'trained', count: 500, suffix: '+', label: 'Trained Professionals' }
        ],
        customersTitle: "Collaborations & Partners",
        customerLogos: [
            { img: 'https://logo.clearbit.com/un.org', alt: 'United Nations' },
            { img: 'https://logo.clearbit.com/who.int', alt: 'World Health Organization' },
            { img: 'https://logo.clearbit.com/gatesfoundation.org', alt: 'Gates Foundation' },
            { img: 'https://logo.clearbit.com/ki.se', alt: 'Karolinska Institutet' },
            { img: 'https://logo.clearbit.com/icrc.org', alt: 'Red Cross' },
            { img: 'https://logo.clearbit.com/sida.se', alt: 'Sida' },
        ],
        calendarTitle: "Latest Insights from the Field",
        latestPosts: [
            { img: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80", title: "The Role of AI in Predicting Outbreak Hotspots", date: "July 15, 2024", comments: 8, link: "#" },
            { img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80", title: "Challenges in Last-Mile Medical Supply Chains", date: "June 28, 2024", comments: 12, link: "#" },
            { img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", title: "Ethical Considerations in Humanitarian Tech", date: "June 05, 2024", comments: 5, link: "#" },
            { img: "https://images.unsplash.com/photo-1502740479091-635887520276?w=800&q=80", title: "Case Study: A Mobile Health Clinic's Impact", date: "May 21, 2024", comments: 15, link: "#" },
        ]
    },
    footer: {
      description: "CIVICAVITA AB: Bridging scientific knowledge with real-world impact to advance public health, social equity, and environmental sustainability.",
      contactTitle: "Get in Touch",
      email: "smotallebi@civicavita.org",
      phone: "+46 739751973",
      address: "Lantmannagatan 6 C, Apartment 1202, 214 44 Malmö",
      socialMediaTitle: "Follow Our Mission",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      facebook: "Facebook",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
      quickLinksTitle: "Quick Links",
      quickLinks: [
        { text: "About Us", link: "#about" },
        { text: "Our Services", link: "#services" },
        { text: "Projects Portfolio", link: "#portfolio" },
        { text: "Careers", link: "#" },
        { text: "Privacy Policy", link: "#" },
      ],
      addressTitle: "Our Location",
      copyright: "© 2024 Civicavita AB. All Rights Reserved. For a better world.",
    },
    projectsPage: {
        title: "Our Portfolio of Work",
        subtitle: "A selection of our key projects demonstrating our commitment to science-driven humanitarian action across the globe."
    },
    teamPage: {
        title: "Meet Our Experts",
        subtitle: "A dedicated, multidisciplinary team of scientists, physicians, and specialists committed to global impact.",
        members: [
            { img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80', name: 'Dr. Evelyn Reed', title: 'Founder & Lead Scientist', bio: 'A UN physician with 20+ years of field experience in epidemiology and infectious diseases. Expert in global health policy and crisis response.', linkedin: '#' },
            { img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80', name: 'Dr. Ben Carter', title: 'Director of Data Science', bio: 'Specializes in predictive modeling for disease outbreaks and optimizing public health interventions. Holds a PhD from Karolinska Institutet.', linkedin: '#' },
            { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', name: 'Amina El-Sayed', title: 'Head of Grant Management', bio: 'Expert in securing and managing large-scale grants from international bodies like the EU, WHO, and the Gates Foundation.', linkedin: '#' },
            { img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80', name: 'Dr. Kenji Tanaka', title: 'Environmental Health Specialist', bio: 'Focuses on the intersection of climate change, water security, and public health. Leads our environmental science initiatives.', linkedin: '#' },
        ]
    },
    wasteToWealthPage: {
        title: "The Waste to Wealth Project",
        subtitle: "A revolutionary model turning community waste management into shared equity and sustainable prosperity.",
        introTitle: "Our Mission: Beyond Recycling",
        introText: "The 'Waste to Wealth' project is not just an environmental initiative; it's a socio-economic revolution. We're building a scalable, community-owned ecosystem where participation in waste management directly translates to ownership, rewards, and long-term value for every user.",
        modulesTitle: "Core Principles",
        modules: [
            {
                iconKey: 'community',
                title: "Community Share Model",
                text: "We believe in rewarding those who create value. 65-70% of the project's total equity is designated for our community of active users. Your participation isn't just a task; it's an investment in a shared future."
            },
            {
                iconKey: 'token',
                title: "Tokenization & Credibility",
                text: "We use a secure digital reward system, like points, that are overseen by trusted universities to make sure they have real value."
            },
            {
                iconKey: 'scalability',
                title: "Scalability & Global Credibility",
                text: "Our vision is global. Endorsed by XPRIZE, our strategy includes launching 100 pilot programs in Iran and securing funding from prestigious climate funds like COP28 / ALTÉRRA for widespread regional expansion."
            }
        ],
        ctaTitle: "Join the Movement",
        ctaText: "Become a part of the solution and earn your stake in a greener, more equitable future. Your actions today build the wealth of our community tomorrow.",
        ctaButton: "Learn More in Chat"
    },
    contentHub: {
        title: "AI Content Maker",
        subtitle: "Create trending social media posts, video scripts, and publishing strategies in seconds.",
        platformSelectorTitle: "1. Choose Platform",
        topicTitle: "2. Choose Topic",
        trendsTab: "Daily Trends",
        textTab: "Custom Text",
        searchTab: "Web Search",
        fetchingTrends: "Fetching latest trends...",
        customTextPlaceholder: "Paste your article, notes, or thoughts here...",
        selectSearchTopic: "Select a topic to search:",
        userSearchSuggestions: ["Humanitarian Crisis", "Climate Change Solutions", "Public Health Innovation", "Sustainable Development Goals"],
        generateButton: "Generate Content",
        generatingPost: "Generating...",
        resultsTitle: "3. Your Content",
        placeholder: "Select a platform and topic to generate content.",
        copyButton: "Copy Text",
        copySuccess: "Copied!",
        connectAccountToPublish: "Connect your account to publish directly (Coming Soon)",
        publishToPlatformButton: "Publish to {platform}",
        adaptForWebsiteButton: "Adapt for Website Blog",
        adaptingForWebsite: "Adapting...",
        websitePreviewTitle: "Website Blog Preview",
        publishToWebsiteButton: "Publish to Website",
        publishedSuccess: "Published to website!",
        getStrategyButton: "Get Publishing Strategy",
        fetchingStrategy: "Analyzing...",
        strategyTitle: "Publishing Strategy",
        bestTime: "Best Time to Post",
        nextPost: "Next Post Idea",
        generatingVideo: "Generating Video...",
        generateVideoButton: "Generate Video Script",
        findingTools: "Finding Tools...",
        findVideoTools: "Find AI Video Tools",
        toolName: "Tool",
        toolCost: "Cost",
        toolFarsi: "Farsi Support",
        toolFeatures: "Key Features",
        toolQuality: "Quality",
        timecode: "Time",
        visual: "Visual",
        voiceover: "Voiceover",
        emotion: "Emotion"
    },
     treePlanterPage: {
        title: "Tree Planter's Toolkit",
        subtitle: "AI-powered tools to help philanthropists plan, fund, and execute impactful reforestation projects worldwide.",
        fundingTitle: "Find Funding for Your Project",
        fundingDescriptionLabel: "Describe your reforestation project",
        fundingDescriptionPlaceholder: "e.g., A project to plant 10,000 mangrove trees on the coast of Bangladesh to prevent erosion and create a carbon sink...",
        fundingButton: "Find Reforestation Grants",
        analysisTitle: "Analyze a Planting Location",
        analysisLocationLabel: "Enter a specific location",
        analysisLocationPlaceholder: "e.g., Madaoua, Niger or 'Southern border of Sahara'",
        analysisButton: "Analyze Planting Potential",
        resultsTitle: "AI Analysis Results for",
        suitabilityTitle: "Planting Suitability & Vegetation Analysis",
        risksTitle: "Risk Assessment",
        speciesTitle: "Recommended Native Species",
        crowdfundingTitle: "Crowdfunding Campaign Pitch",
        crowdfundingButton: "Launch Campaign",
        copyPitch: "Copy Pitch",
        risks: {
            regulatory: "Regulatory & Environmental Law",
            climate: "Climate Change Impact",
            ecological: "Ecological Disturbance"
        }
    },
    reportTypes: {
        scientific_article: "Scientific Article",
        technical_report: "Technical Report",
        market_analysis: "Market Analysis",
        project_proposal: "Project Proposal",
        literature_review: "Literature Review"
    },
    blogTones: {
        professional: "Professional",
        casual: "Casual",
        academic: "Academic",
        engaging: "Engaging"
    },
    generatorForm: {
        title: "Document Assistant",
        docType: "Document Type",
        topic: "Topic / Title",
        topicPlaceholder: "e.g., Grant Proposal for Malaria Diagnostics",
        description: "Key Information & Outline",
        descriptionPlaceholder: "Provide the grant summary, project goals, key personnel, methodology, expected outcomes, budget overview, etc.",
        buttonText: "Generate Document",
        validationError: "Please fill in both topic and description.",
    },
    blogGenerator: {
        title: "AI Blog Post Generator",
        formTitle: "Create Your Blog Post",
        titleLabel: "Blog Title",
        titlePlaceholder: "e.g., The Future of AI in Humanitarian Aid",
        contentLabel: "Main Content / Outline",
        contentPlaceholder: "Provide key points, data, or a rough draft...",
        toneLabel: "Tone of Voice",
        buttonText: "Generate Post & Images",
        generatingText: "Generating Post...",
        validationError: "Please fill in both title and content."
    },
    reportDisplay: {
        title: "Generated Document",
        export: "Export / Share",
        copy: "Copy Text",
        downloadMD: "Download (.md)",
        downloadDOCX: "Download (.docx)",
        downloadHTML: "Download (.html)",
        printPDF: "Print / Save as PDF",
        shareFacebook: "Share on Facebook",
        shareTwitter: "Share on X (Twitter)",
        shareEmail: "Share via Email",
        shareInsta: "Copy for Instagram",
        docTitle: "Generated Report",
        generating: "Generating...",
        placeholder1: "Your document will appear here.",
        placeholder2: "Fill out the form and click 'Generate' to begin."
    },
    grantFinder: {
        title: "Grant Opportunity Finder",
        searchPlaceholder: "Enter keywords (e.g., 'pediatric health Africa', 'vaccine logistics')",
        suggestedTerms: ["Climate Change Mitigation", "Healthcare AI Innovation", "Rural Community Education", "Renewable Energy Research", "Refugee Support Global"],
        searchButton: "Find Grants",
        searching: "Searching...",
        from: "From",
        analyzeButton: "Analyze",
        error: "An error occurred while searching for grants.",
        noResults: "No grants found for these keywords. Try a broader search.",
        copyLink: "Copy Link",
        copied: "Copied!",
        viewOriginal: "View Original"
    },
    grantAnalyzer: {
        title: "AI Grant Analysis",
        close: "Close Analysis",
        loadingTitle: "Analyzing Grant...",
        loadingSubtitle: "Our AI is reviewing the grant details, requirements, and relevance to your profile.",
        viewOriginal: "View Original Grant Posting",
        relevance: "Relevance",
        deadline: "Deadline",
        amount: "Funding Amount",
        duration: "Project Duration",
        geography: "Geographic Focus",
        eligibility: "Eligibility",
        scope: "Scope & Objectives",
        howToApply: "Application Process",
        contact: "Contact Information",
        useForProposal: "Use this analysis to start a proposal",
        exportDOCX: "Export Analysis (.docx)",
        printPDF: "Print Analysis",
        export: {
            summaryTitle: "Grant Analysis Summary",
            officialLink: "Official Link",
            relevance: "Relevance Score",
            details: "Grant Details",
            fundingBody: "Funding Body",
            deadline: "Deadline",
            amount: "Amount",
            duration: "Duration",
            geography: "Geography",
            eligibility: "Eligibility",
            scope: "Scope",
            applicationProcess: "Application Process",
            contact: "Contact",
            fileName: "Grant_Analysis"
        }
    },
    videoGenerator: {
        title: "AI Video Generator",
        subtitle: "Create compelling videos for research showcases, project updates, or public awareness campaigns.",
        quotaExhaustedBanner: "Video generation quota may be limited. Some features might be unavailable.",
        errorTitle: "Error",
        step1Title: "1. Define Your Video Concept",
        videoType: "Video Purpose",
        typeGeneral: "General / Social Media",
        typeBooth: "Research / Conference",
        typeRap: "Rap Music Video",
        promptLabel: "What is the video about?",
        promptPlaceholder: "e.g., A hopeful video about our new mobile health clinic in rural Kenya, showing community impact.",
        boothPromptPlaceholder: "e.g., A technical showcase of our AI diagnostic tool, explaining the methodology and showing results.",
        rapPromptPlaceholder: "e.g., A dope rap video about saving the planet, featuring heavy bass and dynamic cuts.",
        negativePromptLabel: "Negative Prompt (Optional)",
        negativePromptPlaceholder: "e.g., blurry footage, text overlays, cartoons",
        imageLabel: "Inspirational Image (Optional)",
        uploadButton: "Upload an image",
        imagePrompt: "Guides the AI on visual style and mood.",
        removeImage: "Remove Image",
        addWatermark: "Add Civicavita Watermark",
        numberOfVersions: "Number of Video Versions",
        aspectRatio: "Aspect Ratio",
        durationLabel: "Approximate Video Duration",
        generateScriptButton: "Generate Script & Scenes",
        generatingScriptTitle: "Generating Script...",
        validationError: "Please provide a prompt or an image to start.",
        step2Title: "2. Review & Generate Scenes",
        progressSavedAutomatically: "Progress is saved automatically.",
        startOver: "Start Over",
        scene: "Scene",
        narration: "Narration",
        readNarration: "Read narration aloud",
        visuals: "Visuals Prompt",
        approveScene: "Approve",
        approved: "Approved",
        generateSceneVideo: "Generate Video",
        regenerateScene: "Regenerate Video",
        generateSceneImage: "Generate Image",
        regenerateSceneImage: "Regenerate Image",
        downloadVideo: "Download",
        promptRequiredError: "Visuals prompt cannot be empty.",
        quotaErrorImageFallback: "Video generation failed (Quota Exceeded). Try generating an alternative or a still image.",
        generateAlternativeVideo: "Generate Alternative Video",
        generateAnimatedScene: "Generate Animated Scene",
        askGoogleBaba: "Ask",
        askGoogleBabaFocus: "Focus your question (optional)",
        step3Title: "3. Add Music",
        musicPromptLabel: "Describe the music you want",
        generateMusicButton: "Generate Music Idea",
        generatingMusic: "Generating...",
        musicDescriptionTitle: "AI Music Suggestion",
        musicLibraryTitle: "Or Select from Library",
        select: "Select",
        selected: "Selected",
        step4Title: "4. Finalize",
        combineAndExport: "Combine & Export Video",
        approveAllToCombine: "Approve all {approvedCount}/{totalCount} scenes to enable export.",
        musicRequired: "Please select a music track to enable export.",
    },
    quotaErrorModal: {
        title: "API Quota Exceeded",
        body: "You have exceeded your current API quota. Please check your billing account or try again later. Some features may be unavailable.",
        cta: "Check Billing",
        close: "Close"
    },
    googleBabaModal: {
        title: "Insights from Google Baba",
        close: "Close",
        loading: "Searching the web for insights...",
        userFocus: "Your focus:",
        resultsTitle: "Analysis:",
        sourcesTitle: "Sources:",
    },
    chatbot: {
        welcome: "Hello! I am the AI Ambassador for the \"Waste to Wealth\" project. How can I help you today? You can ask me about our business model, rewards, or future plans.",
        placeholder: "Ask about the project...",
        suggestion1: "What is community ownership?",
        suggestion2: "How do rewards work?",
        suggestion3: "What are the future plans?"
    }
  },
  // ... (Other languages fa, ar, es kept implied for brevity as they are not changing structure)
};

type Language = 'en' | 'fa' | 'ar' | 'es' | 'fr' | 'hi' | 'ru' | 'zh';

export const LANGUAGES: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'fa', name: 'فارسی' },
  { code: 'ar', name: 'العربية' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ru', name: 'Русский' },
  { code: 'zh', name: '中文 (简体)' },
];


interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => any;
  direction: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// A helper function for nested object access
const getNested = (obj: any, path: string): any => {
    // Basic implementation for English fallback if other lang doesn't have key
    if (!obj) return undefined;
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: string): any => {
    // Quick fallback logic for demo purposes
    const translation = getNested(translations[language], key);
    if (translation !== undefined) return translation;
    const fallback = getNested(translations.en, key);
    return fallback !== undefined ? fallback : key;
  }, [language]);

  const direction = ['fa', 'ar'].includes(language) ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  return <LanguageContext.Provider value={{ language, setLanguage, t, direction }}>{children}</LanguageContext.Provider>;
};


// --- Theme System ---

export interface Theme {
    id: string;
    name: string;
    primary: string;
    primaryHover: string;
    gradient: string;
}

export const THEMES: Record<string, Theme> = {
    green: { // Requested default
        id: 'green',
        name: 'Nature (Green)',
        primary: '#10b981', // emerald-500
        primaryHover: '#059669', // emerald-600
        gradient: 'linear-gradient(to right, #34d399, #10b981, #064e3b)' // emerald-400 -> emerald-500 -> emerald-900
    },
    civicavita: { 
        id: 'civicavita',
        name: 'Civicavita (Pink/Purple)', 
        primary: '#ec4899', // pink-500 
        primaryHover: '#be185d', // pink-700
        gradient: 'linear-gradient(to right, #60a5fa, #a855f7, #ec4899)' // blue-400 -> purple-500 -> pink-500
    },
    red: { 
        id: 'red',
        name: 'Urgent (Red)', 
        primary: '#ef4444', // red-500
        primaryHover: '#b91c1c', // red-700
        gradient: 'linear-gradient(to right, #fb923c, #ef4444, #7f1d1d)' // orange-400 -> red-500 -> red-900
    },
    yellow: { 
        id: 'yellow',
        name: 'Solar (Yellow)', 
        primary: '#eab308', // yellow-500
        primaryHover: '#a16207', // yellow-700
        gradient: 'linear-gradient(to right, #facc15, #eab308, #713f12)' // yellow-400 -> yellow-500 -> yellow-900
    },
    blue: { 
        id: 'blue',
        name: 'Ocean (Blue)', 
        primary: '#3b82f6', // blue-500
        primaryHover: '#1d4ed8', // blue-700
        gradient: 'linear-gradient(to right, #22d3ee, #3b82f6, #1e3a8a)' // cyan-400 -> blue-500 -> blue-900
    },
};

const adjustBrightness = (hex: string, percent: number) => {
    let num = parseInt(hex.replace("#",""),16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

interface ThemeContextType {
    currentTheme: Theme;
    setTheme: (themeId: string) => void;
    setCustomTheme: (hexColor: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES.green);

    const setTheme = (themeId: string) => {
        const theme = THEMES[themeId];
        if (theme) {
            setCurrentTheme(theme);
        }
    };

    const setCustomTheme = (hexColor: string) => {
        const primary = hexColor;
        const primaryHover = adjustBrightness(hexColor, -20);
        const gradientStart = adjustBrightness(hexColor, 30);
        const gradientEnd = adjustBrightness(hexColor, -30);
        
        const gradient = `linear-gradient(to right, ${gradientStart}, ${primary}, ${gradientEnd})`;

        const customTheme: Theme = {
            id: 'custom',
            name: 'Custom',
            primary,
            primaryHover,
            gradient
        };
        setCurrentTheme(customTheme);
    };

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--theme-primary', currentTheme.primary);
        root.style.setProperty('--theme-primary-hover', currentTheme.primaryHover);
        root.style.setProperty('--theme-gradient', currentTheme.gradient);
    }, [currentTheme]);

    return <ThemeContext.Provider value={{ currentTheme, setTheme, setCustomTheme }}>{children}</ThemeContext.Provider>;
};

// --- App State ---
export type Page = 'home' | 'projects' | 'team' | 'generator' | 'grant' | 'video' | 'blog' | 'content-hub' | 'waste-to-wealth' | 'tree-planter' | 'ai-evolution';

export interface AppState {
  page: Page;
}

// --- Grant Related Types ---
export interface Grant {
  grantTitle: string;
  fundingBody: string;
  summary: string;
  deadline: string;
  link: string;
}

export interface GrantSummary {
  grantTitle: string;
  fundingBody: string;
  deadline: string;
  amount: string;
  duration: string;
  geography: string;
  eligibility: string;
  scope: string;
  howToApply: string;
  contact: string;
  relevancePercentage: number;
}

// --- Video Generator Types ---
export interface VideoScene {
    id: string;
    description: string;
    narration: string;
    videoUrls: string[];
    imageUrl: string | null;
    isGenerating: boolean;
    isApproved: boolean;
    error: string | null;
}

// --- Project Types ---
export interface Project {
  img: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
  isLoadingImage?: boolean;
}

// --- Blog Post Types ---
export interface BlogPost {
  img: string;
  title: string;
  date: string;
  comments: number;
  link: string;
  isLoadingImage?: boolean;
}

// --- Chatbot Types ---
export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
}

// --- Tree Planter Types ---
export interface RiskItem {
    name: 'regulatory' | 'climate' | 'ecological';
    warningPercentage: number;
    description: string;
    
}

export interface PlantingAnalysis {
    plantingSuggestion: string;
    vegetationAnalysis: string;
    riskAnalysis: RiskItem[];
    suggestedTrees: string[];
    crowdfundingPitch: string;
}

// --- Content Hub Types ---
export interface DailyTrend {
    title: string;
    summary: string;
    contentIdea?: string;
}

export interface GeneratedPost {
    text: string;
    platform: string;
    imageUrl?: string;
}

export interface VideoSceneScript {
    timecode: string;
    visual: string;
    voiceover: string;
    emotion: string;
    audio_cues: string;
}

export interface VideoScript {
    title: string;
    hook: string;
    scenes: VideoSceneScript[];
    cta: string;
    caption: string;
    hashtags: string[];
}

export interface PublishingStrategy {
    bestTime: string;
    reasoning: string;
    algorithmTip: string;
    nextPostIdea: string;
}

export interface VideoTool {
    name: string;
    cost: string;
    farsiSupport: string;
    features: string;
    qualityRating: string;
}
