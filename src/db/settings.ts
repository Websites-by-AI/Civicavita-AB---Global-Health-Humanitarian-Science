const SETTINGS_KEY = 'civicavita_settings_v1';

export interface SiteSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  social: {
    twitter: string;
    linkedin: string;
    facebook: string;
  };
  commentsEnabled: boolean;
  autoApproveComments: boolean;
  registrationEnabled: boolean;
  accentColor: string;
  openrouter: {
    apiKey: string;
    model: string;
    siteName: string;
    siteUrl: string;
  };
}

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'Civicavita AB',
  tagline: 'Global Health & Humanitarian Science',
  contactEmail: 'info@civicavita.se',
  contactPhone: '+46 (0) 8 123 456 78',
  address: 'Kungsgatan 44, 111 35 Stockholm, Sweden',
  social: {
    twitter: 'https://twitter.com/',
    linkedin: 'https://linkedin.com/in/sahar-motallebi-05108310/',
    facebook: 'https://facebook.com/',
  },
  commentsEnabled: true,
  autoApproveComments: false,
  registrationEnabled: true,
  accentColor: '#10b981',
  openrouter: {
    apiKey: '',
    model: 'openai/gpt-4o-mini',
    siteName: 'Civicavita AB',
    siteUrl: typeof window !== 'undefined' ? window.location.origin : '',
  },
};

// Popular OpenRouter models for the selector
export const OPENROUTER_MODELS = [
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini (fast, cheap)' },
  { id: 'openai/gpt-4o', name: 'GPT-4o (balanced)' },
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet (best quality)' },
  { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku (fast)' },
  { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 Flash (free)' },
  { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Llama 3.3 70B (free)' },
  { id: 'deepseek/deepseek-chat', name: 'DeepSeek Chat (cheap)' },
  { id: 'mistralai/mistral-large', name: 'Mistral Large' },
];

export const SettingsDB = {
  get(): SiteSettings {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return DEFAULT_SETTINGS;
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  },
  save(settings: Partial<SiteSettings>): SiteSettings {
    const current = this.get();
    const merged = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
    return merged;
  },
  reset(): SiteSettings {
    localStorage.removeItem(SETTINGS_KEY);
    return DEFAULT_SETTINGS;
  },
};
