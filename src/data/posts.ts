export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  date: string; // ISO date
  coverEmoji: string;
  readMinutes: number;
  tags: string[];
}

const STORAGE_KEY = 'civicavita_posts_v1';

export const SEED_POSTS: BlogPost[] = [
  {
    id: 'post-sheltering-displaced',
    title: 'Semi-Permanent Sheltering in Disasters: Lessons from Bam, Sri Lanka & Pakistan',
    excerpt:
      'Drawing on field experiences from three major disasters, I reflect on the social determinants of health that shape life in prolonged temporary settlements — and what we must do differently.',
    content: `When the Bam earthquake struck Iran in 2003, I was among the first medical responders. Months later, as communities still lived in makeshift shelters, I began to see what the data would later confirm: the disaster was not over when the shaking stopped.

My master's dissertation at Lund University studied public health concerns in prolonged temporary and semi-permanent sheltering across three contexts — the Bam earthquake, the Sri Lanka tsunami, and the Pakistan earthquake. Three lessons have stayed with me across two decades of humanitarian work.

**1. Shelter is a health intervention.**
Overcrowding, poor ventilation, lack of privacy and insecure water sources turn temporary settlements into amplifiers of respiratory infection, skin disease, and gender-based violence. We cannot treat shelter as logistics. It is preventive medicine.

**2. Time matters more than materials.**
A tarpaulin in week one is protection. The same tarpaulin in month twelve is a determinant of chronic disease. The longer displacement lasts without transition planning, the more the "temporary" settlement becomes a permanent source of morbidity.

**3. Community agency is non-negotiable.**
In all three case studies, the settlements that functioned best were those where displaced communities co-designed layouts, water points and governance structures. Participation is not a luxury — it is the difference between a camp and a community.

As climate-related displacement accelerates globally, these lessons are more urgent than ever. The next generation of humanitarian practitioners must be trained to see shelter, health and dignity as one integrated problem — not three separate sectors.`,
    category: 'Disaster Management',
    author: 'Dr. Sahar Motallebi',
    authorRole: 'Founder & Lead Researcher',
    date: '2025-09-14',
    coverEmoji: '🏚️',
    readMinutes: 6,
    tags: ['Disasters', 'Shelter', 'Public Health', 'Displacement'],
  },
  {
    id: 'post-ncd-afghanistan',
    title: 'Non-Communicable Diseases in Fragile States: The Invisible Crisis',
    excerpt:
      'During my WHO years in Afghanistan and Iran, I watched NCDs quietly overtake infectious disease as the leading burden — while humanitarian funding remained frozen in the past.',
    content: `Between 2013 and 2016, as WHO Technical Officer in Afghanistan and later in Iran, I led the development of the NCD country profile, policy briefs, and the monitoring and evaluation framework for NCD prevention and control. What I learned changed how I think about humanitarian health programming.

**The myth of the "acute" crisis.**
Humanitarian health architecture was built for cholera, measles, and malnutrition. It is not built for diabetes, hypertension, and depression. Yet in Afghanistan — a country in protracted crisis for over four decades — the leading causes of death are now cardiovascular disease, cancer, and chronic respiratory illness.

**What we did about it.**
We designed 18 NCD research projects and assisted the national task force for the UNDAF. We helped establish the national consortium for NCD cohort studies. Most importantly, we made the invisible visible: we produced data that ministries and donors could no longer ignore.

**Three policy levers that work.**
1. Integrate NCD screening into every primary health contact — antenatal, vaccination, TB follow-up.
2. Protect the supply chain for essential NCD medicines the way we protect vaccines.
3. Invest in community health workers as the first line of NCD detection and follow-up.

Fragile states do not get a pass on the epidemiological transition. If we keep funding humanitarian health as if the 20th century never ended, we will keep losing the patients who are dying quietly today.`,
    category: 'Health Systems',
    author: 'Dr. Sahar Motallebi',
    authorRole: 'Founder & Lead Researcher',
    date: '2025-10-02',
    coverEmoji: '🫀',
    readMinutes: 7,
    tags: ['NCDs', 'Afghanistan', 'WHO', 'Policy'],
  },
  {
    id: 'post-evaw-women-protection',
    title: 'Ending Violence Against Women in Emergencies: A Field Perspective',
    excerpt:
      'As UN Women Project Coordinator for the EVAW Special Fund in Afghanistan, I managed 16 projects and designed 25 grants. Here is what works — and what donors still get wrong.',
    content: `In 2012, as Project Coordinator for the UN Women Elimination of Violence Against Women (EVAW) Special Fund in Afghanistan, I managed 16 concurrent projects and designed 25 grants totaling USD 10 million. I also coordinated the multi-agency framework for the GBV referral system across health, protection and justice sectors, and monitored 20 shelters for survivors.

What I saw in those two years taught me more than any policy document ever could.

**Shelters are necessary but never sufficient.**
A shelter saves a woman tonight. Without legal aid, livelihood support, and community-level norm change, she returns to the same violence next year. Protection programming that stops at the shelter door is protection that fails.

**Survivors must lead the design.**
The most effective projects in our portfolio were those co-designed with survivor advisory groups. Their insights about intake procedures, privacy, and staff training were consistently sharper than those of international consultants.

**Data is protection.**
We built the first referral-system database of its kind in Afghanistan. It gave us the evidence to advocate with ministries, and it gave survivors a way to see that their case was being followed — which is itself a form of care.

**Donors must fund flexibility.**
GBV casework does not fit quarterly logframes. The donors who trusted us with adaptive management got the best outcomes. The ones who demanded rigid indicators got good reports and weak impact.

Violence against women in emergencies is not a side issue of humanitarian response. It is one of its core reasons for existing.`,
    category: 'Protection & Gender',
    author: 'Dr. Sahar Motallebi',
    authorRole: 'Founder & Lead Researcher',
    date: '2025-10-22',
    coverEmoji: '🛡️',
    readMinutes: 6,
    tags: ['GBV', 'Women', 'Afghanistan', 'UN Women'],
  },
  {
    id: 'post-covid-face-covering',
    title: 'Face Coverings and COVID-19 Mortality: What Our 44-Country Study Found',
    excerpt:
      'Our 2021 study in the American Journal of Preventive Medicine analyzed two continents. The signal was clear — and the policy implications remain relevant for the next pandemic.',
    content: `In 2021, my co-authors and I published a study in the American Journal of Preventive Medicine examining the association between face-covering mandates and COVID-19 mortality decline across 44 countries on two continents.

**What we found.**
Countries that implemented population-level face-covering mandates earlier saw a faster and deeper decline in COVID-19 mortality, after adjusting for other non-pharmaceutical interventions and timing of the epidemic curve.

**Why this matters beyond COVID.**
The methodological contribution is the more important one. We showed that cross-country quasi-experimental designs, when carefully constructed, can give policymakers usable evidence in real time — rather than waiting for randomized trials that will never arrive during a fast-moving pandemic.

**Three takeaways for the next pandemic.**
1. Early, universal, low-cost interventions outperform late, targeted, high-cost ones.
2. Communication is part of the intervention. Mandates without public understanding fail.
3. Protect the data infrastructure. Our study was only possible because countries had comparable mortality reporting.

At Civicavita AB, one of our core research lines is pandemic preparedness in low-resource settings. We are building on this work to develop decision-support tools that ministries of health can actually use in week two of an outbreak — not year two of a post-mortem.`,
    category: 'Research',
    author: 'Dr. Sahar Motallebi',
    authorRole: 'Founder & Lead Researcher',
    date: '2025-11-08',
    coverEmoji: '😷',
    readMinutes: 5,
    tags: ['COVID-19', 'Research', 'Epidemiology', 'Policy'],
  },
  {
    id: 'post-health-systems-fragile',
    title: 'Building Health Systems That Survive the Crisis — and the Peace',
    excerpt:
      'A health system built only for the emergency will collapse when the emergency ends. Reflections from 12 countries on what "health system strengthening" actually means on the ground.',
    content: `Over 18 years of work with WHO, UNICEF, UNDP, UN Women and national ministries across Iran, Iraq, Sudan, Somalia, Kenya, Pakistan, Afghanistan and Sri Lanka, I have seen the same failure mode repeated: we build parallel systems for the crisis, and they vanish the day the crisis is declared over.

**The parallel-system trap.**
NGOs and agencies, with the best intentions, set up their own clinics, supply chains and data systems. They save lives — and they hollow out the ministry. When they leave, the ministry is weaker than before.

**What "strengthening" actually looks like.**
1. Budget support to ministry line items, not just project grants.
2. Technical assistance embedded inside government departments, not outside them.
3. Data systems owned by the ministry from day one, even if they are imperfect.
4. Procurement through national channels, with ring-fenced oversight.

**The peace dividend.**
The hardest transitions are not from war to peace. They are from emergency funding to development funding. Donors that commit to 7-10 year flexible funding get outcomes that 3-year project grants cannot produce.

At Civicavita AB, we are building our advisory practice around exactly this question: how do we help ministries and donors design health systems that are born in crisis but built to outlast it?`,
    category: 'Health Systems',
    author: 'Dr. Sahar Motallebi',
    authorRole: 'Founder & Lead Researcher',
    date: '2025-11-28',
    coverEmoji: '🏥',
    readMinutes: 7,
    tags: ['Health Systems', 'Fragile States', 'Policy', 'Donors'],
  },
];

export function loadPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_POSTS));
      return SEED_POSTS;
    }
    const parsed = JSON.parse(raw) as BlogPost[];
    if (!Array.isArray(parsed) || parsed.length === 0) return SEED_POSTS;
    return parsed;
  } catch {
    return SEED_POSTS;
  }
}

export function savePosts(posts: BlogPost[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch {
    // storage full or blocked — fail silently
  }
}

export function createEmptyPost(): Omit<BlogPost, 'id'> {
  return {
    title: '',
    excerpt: '',
    content: '',
    category: 'Research',
    author: 'Dr. Sahar Motallebi',
    authorRole: 'Founder & Lead Researcher',
    date: new Date().toISOString().slice(0, 10),
    coverEmoji: '📝',
    readMinutes: 5,
    tags: [],
  };
}

export function estimateReadMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export function generateId(): string {
  return `post-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
