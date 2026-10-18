import React from 'react';
import { Sparkles, Music, Volume2, VolumeX } from 'lucide-react';
import { LanguageScript } from '../types';

interface HeaderProps {
  currentLanguage: LanguageScript;
  onLanguageChange: (lang: LanguageScript) => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onPreviewClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  isMusicPlaying,
  onToggleMusic,
  onPreviewClick,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-800 bg-stone-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-700 text-stone-950 shadow-md shadow-amber-900/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <a
            href="/"
            className="font-cinzel text-xl font-bold tracking-wider text-amber-100 whitespace-nowrap shrink-0 hover:text-amber-300 transition-colors"
          >
            TO'YONA
          </a>
        </div>

        {/* Zone 2: 4 Navigation Links & Language Switch */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-stone-400">
          <a
            href="#editor"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {currentLanguage === 'ru' ? 'Конструктор' : currentLanguage === 'uz_cyrillic' ? 'Конструктор' : 'Konstruktor'}
          </a>
          <a
            href="#templates"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {currentLanguage === 'ru' ? 'Шаблоны' : currentLanguage === 'uz_cyrillic' ? 'Шаблонлар' : 'Shablonlar'}
          </a>
          <a
            href="#backgrounds"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {currentLanguage === 'ru' ? 'Фоны' : currentLanguage === 'uz_cyrillic' ? 'Фонлар' : 'Fonlar'}
          </a>
          <a
            href="#interactive"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {currentLanguage === 'ru' ? 'Интерактив' : currentLanguage === 'uz_cyrillic' ? 'Интерактив' : 'Interaktiv'}
          </a>

          {/* Quick Script Selector */}
          <div className="flex items-center gap-1 border-l border-stone-800 pl-4">
            <button
              type="button"
              onClick={() => onLanguageChange('uz_latin')}
              className={`px-2 py-1 text-[11px] font-medium tracking-normal rounded transition-colors whitespace-nowrap ${
                currentLanguage === 'uz_latin'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Lotin
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('uz_cyrillic')}
              className={`px-2 py-1 text-[11px] font-medium tracking-normal rounded transition-colors whitespace-nowrap ${
                currentLanguage === 'uz_cyrillic'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Кирилл
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('ru')}
              className={`px-2 py-1 text-[11px] font-medium tracking-normal rounded transition-colors whitespace-nowrap ${
                currentLanguage === 'ru'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Рус
            </button>
          </div>
        </nav>

        {/* Zone 3: 1 Primary Action (with Music quick toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleMusic}
            title={isMusicPlaying ? "Musiqani to'xtatish" : "To'y kuyini yangratish"}
            className={`flex h-9 items-center gap-2 rounded-lg px-3 text-xs transition-colors whitespace-nowrap ${
              isMusicPlaying
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 animate-pulse'
                : 'border border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            {isMusicPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            <span className="hidden sm:inline">
              {isMusicPlaying ? "Kuy yangramoqda" : "To'y kuyi"}
            </span>
          </button>

          <button
            type="button"
            onClick={onPreviewClick}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-semibold text-stone-950 shadow-md shadow-amber-950/40 hover:from-amber-400 hover:to-amber-500 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>
              {currentLanguage === 'ru'
                ? 'Открыть приглашение'
                : currentLanguage === 'uz_cyrillic'
                ? 'Таклифномани очиш'
                : "Taklifnomani ko'rish"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
