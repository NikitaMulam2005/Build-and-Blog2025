export type Page = 'landing' | 'onboarding' | 'login' | 'signup' | 'forgot-password' | 'chat';

export type OnboardingData = {
  method: 'web' | 'whatsapp';
  language: string;
  city: string;
  assistanceType: string;
};

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'fa', name: 'Farsi', flag: '🇮🇷' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', flag: '🇮🇳' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'uk', name: 'Ukrainian', flag: '🇺🇦' },
];

export const ASSISTANCE_TYPES = [
  { value: 'shelter', label: 'Emergency Shelter' },
  { value: 'food', label: 'Food & Water' },
  { value: 'medical', label: 'Medical Help' },
  { value: 'legal', label: 'Legal Guidance' },
  { value: 'general', label: 'General Support' },
];

export type ChatMessage = {
  id: string;
  session_id: string;
  user_id: string;
  role: 'user' | 'agent';
  content: string;
  created_at: string;
  agent_type?: string | null;
  agent_status?: string | null;
};

export type ChatSession = {
  id: string;
  user_id: string;
  status: 'active' | 'closed';
  language?: string | null;
  city?: string | null;
  assistance_type?: string | null;
  created_at: string;
};
