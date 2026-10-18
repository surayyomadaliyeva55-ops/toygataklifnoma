export type EventType = 
  | 'ogil_toy'      // O'g'il to'y / Sunnat to'y
  | 'nikoh_toyi'    // Nikoh to'yi / Visol oqshomi
  | 'qiz_uzatish'   // Qiz uzatish
  | 'yubiley'       // Yubiley / Tavallud to'yi
  | 'beshik_toyi'   // Beshik to'yi
  | 'fotiha_toyi';  // Fotiha to'yi

export type LanguageScript = 'uz_latin' | 'uz_cyrillic' | 'ru';

export type FontTheme = 'cinzel' | 'playfair' | 'cormorant' | 'script';

export type ColorTheme = 'gold' | 'emerald' | 'sapphire' | 'ruby' | 'ivory';

export interface ScheduleItem {
  id: string;
  time: string;
  label: string;
}

export interface InvitationData {
  eventType: EventType;
  language: LanguageScript;
  childOrCoupleName: string;
  title: string;
  bismillahText: string;
  poem: string;
  invitationText: string;
  hosts: string;
  hostsLabel: string;
  eventDate: string; // YYYY-MM-DD or formatted
  eventTime: string; // e.g. 18:00
  hasNahorOshi: boolean;
  nahorOshiTime: string; // e.g. 07:00 - 09:00
  venueName: string;
  venueAddress: string;
  closingWish: string;
  backgroundId: string;
  customPhotoUrl: string | null;
  fontTheme: FontTheme;
  colorTheme: ColorTheme;
  showOrnaments: boolean;
  showCountdown: boolean;
  showRsvp: boolean;
  schedules: ScheduleItem[];
}

export interface BackgroundPreset {
  id: string;
  name: string;
  category: 'image' | 'gradient';
  src?: string;
  gradientStyle?: string;
  textColorTheme: 'light' | 'dark';
  accentBorder: string;
  description: string;
}

export interface GuestRsvp {
  id: string;
  name: string;
  status: 'attending' | 'cant_attend' | 'thinking';
  guestsCount: number;
  wishes: string;
  submittedAt: string;
}
