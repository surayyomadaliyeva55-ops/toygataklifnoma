import React from 'react';
import { Calendar, Clock, MapPin, Heart, Crown, Sparkles, Award } from 'lucide-react';
import { InvitationData, BackgroundPreset } from '../types';

interface InvitationCardProps {
  data: InvitationData;
  background: BackgroundPreset;
  cardRef?: React.RefObject<HTMLDivElement | null>;
  scale?: number;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  data,
  background,
  cardRef,
  scale = 1,
}) => {
  const isDarkBg = background.textColorTheme === 'light';

  // Format date nicely
  const formatDate = (dateStr: string, lang: string) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const monthNum = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);

        const monthsUzLatin = [
          'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
          'Iyul', 'Avgust', 'Sentabr', 'Oktyabr', 'Noyabr', 'Dekabr'
        ];
        const monthsUzCyrillic = [
          'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
          'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
        const monthsRu = [
          'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
          'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ];

        if (lang === 'ru') {
          return `${day} ${monthsRu[monthNum - 1] || ''} ${year} года`;
        } else if (lang === 'uz_cyrillic') {
          return `${year} йил «${day}» ${monthsUzCyrillic[monthNum - 1] || ''}`;
        } else {
          return `${year}-yil «${day}»-${monthsUzLatin[monthNum - 1] || ''}`;
        }
      }
    } catch {
      // fallback
    }
    return dateStr;
  };

  const getFontClass = () => {
    switch (data.fontTheme) {
      case 'cinzel':
        return 'font-cinzel';
      case 'playfair':
        return 'font-playfair';
      case 'cormorant':
        return 'font-cormorant';
      case 'script':
        return 'font-script';
      default:
        return 'font-playfair';
    }
  };

  const getEventIcon = () => {
    switch (data.eventType) {
      case 'ogil_toy':
        return <Crown className="w-8 h-8 text-amber-400 drop-shadow-md mx-auto" />;
      case 'nikoh_toyi':
        return <Heart className="w-8 h-8 text-amber-400 drop-shadow-md mx-auto fill-amber-400/20" />;
      case 'yubiley':
        return <Award className="w-8 h-8 text-amber-400 drop-shadow-md mx-auto" />;
      default:
        return <Sparkles className="w-7 h-7 text-amber-400 drop-shadow-md mx-auto" />;
    }
  };

  return (
    <div
      ref={cardRef}
      id="invitation-card-render"
      className="relative w-full max-w-[540px] aspect-[1/1.45] rounded-2xl overflow-hidden shadow-2xl transition-all select-none mx-auto border border-amber-500/30"
      style={{
        background: background.category === 'gradient' ? background.gradientStyle : '#0e1424',
      }}
    >
      {/* Background Image if available */}
      {background.category === 'image' && background.src && (
        <img
          src={background.src}
          alt="To'y foni"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      )}

      {/* Decorative Scrim for readability and warmth */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDarkBg
            ? 'bg-gradient-to-b from-stone-950/70 via-stone-950/50 to-stone-950/80'
            : 'bg-gradient-to-b from-amber-50/75 via-white/80 to-amber-50/85'
        }`}
      />

      {/* Gold Foil Border Inset */}
      {data.showOrnaments && (
        <div className="absolute inset-3 sm:inset-4 border border-amber-400/40 rounded-xl pointer-events-none">
          <div className="absolute inset-1 border border-amber-400/20 rounded-lg" />
          
          {/* Corner Flourishes */}
          <svg className="absolute -top-1 -left-1 w-6 h-6 text-amber-400/80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0,0 L12,0 C6.48,0 2,4.48 2,10 L2,22 L0,22 Z" />
          </svg>
          <svg className="absolute -top-1 -right-1 w-6 h-6 text-amber-400/80 transform rotate-90" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0,0 L12,0 C6.48,0 2,4.48 2,10 L2,22 L0,22 Z" />
          </svg>
          <svg className="absolute -bottom-1 -left-1 w-6 h-6 text-amber-400/80 transform -rotate-90" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0,0 L12,0 C6.48,0 2,4.48 2,10 L2,22 L0,22 Z" />
          </svg>
          <svg className="absolute -bottom-1 -right-1 w-6 h-6 text-amber-400/80 transform rotate-180" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0,0 L12,0 C6.48,0 2,4.48 2,10 L2,22 L0,22 Z" />
          </svg>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`relative h-full flex flex-col justify-between p-6 sm:p-8 text-center z-10 ${
        isDarkBg ? 'text-amber-50' : 'text-stone-900'
      }`}>
        {/* Top Header Section */}
        <div className="space-y-2">
          {/* Bismillah / Sacred Opening */}
          {data.bismillahText && (
            <p className="font-cormorant text-xs sm:text-sm tracking-widest text-amber-400 font-medium">
              ~ {data.bismillahText} ~
            </p>
          )}

          {/* Event Badge & Icon */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-amber-400/70" />
            <div className="text-amber-400">{getEventIcon()}</div>
            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-amber-400/70" />
          </div>

          <h2 className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-300/90 font-cinzel">
            {data.title}
          </h2>

          {/* Celebrant Photo if provided */}
          {data.customPhotoUrl && (
            <div className="pt-1 flex justify-center">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 border-2 border-amber-400 shadow-xl bg-stone-900/50">
                <img
                  src={data.customPhotoUrl}
                  alt={data.childOrCoupleName}
                  className="w-full h-full object-cover rounded-full"
                />
                {data.eventType === 'ogil_toy' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-stone-950 p-1 rounded-full shadow">
                    <Crown className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Celebrant Name */}
          <h1 className={`${getFontClass()} text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide text-amber-300 drop-shadow-md py-1 leading-tight`}>
            {data.childOrCoupleName}
          </h1>
        </div>

        {/* Center Verse & Warm Welcome */}
        <div className="space-y-3 px-2 py-1">
          {/* Poetic Verse */}
          {data.poem && (
            <div className="relative py-1">
              <p className="font-cormorant italic text-xs sm:text-sm leading-relaxed text-amber-100/90 whitespace-pre-line font-medium drop-shadow-sm">
                "{data.poem}"
              </p>
            </div>
          )}

          {/* Main Invitation Text */}
          <p className="text-[11px] sm:text-xs leading-relaxed text-stone-200/90 max-w-md mx-auto whitespace-pre-line drop-shadow-sm font-light">
            {data.invitationText}
          </p>
        </div>

        {/* Event Details: Date, Time & Venue */}
        <div className="space-y-3 pt-2">
          {/* Date & Time Ribbon */}
          <div className="mx-auto max-w-sm rounded-xl bg-stone-950/60 border border-amber-500/30 p-2.5 sm:p-3 shadow-inner backdrop-blur-sm">
            <div className="flex items-center justify-around gap-2 text-amber-200">
              {/* Date */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{formatDate(data.eventDate, data.language)}</span>
              </div>

              <div className="h-4 w-[1px] bg-amber-500/40" />

              {/* Time */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{data.eventTime}</span>
              </div>
            </div>

            {/* Nahor Oshi if specified */}
            {data.hasNahorOshi && data.nahorOshiTime && (
              <div className="mt-1.5 pt-1.5 border-t border-amber-500/20 text-[11px] text-amber-300/80 flex items-center justify-center gap-2">
                <span className="font-medium">
                  {data.language === 'ru' ? 'Утренний плов:' : data.language === 'uz_cyrillic' ? 'Наҳор оши:' : 'Nahor oshi:'}
                </span>
                <span>{data.nahorOshiTime}</span>
              </div>
            )}
          </div>

          {/* Venue & Address */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-1 text-amber-300 font-semibold text-xs sm:text-sm font-cinzel">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{data.venueName}</span>
            </div>
            {data.venueAddress && (
              <p className="text-[10px] sm:text-[11px] text-stone-300/80 truncate max-w-xs mx-auto">
                {data.venueAddress}
              </p>
            )}
          </div>

          {/* Footer Hosts & Closing */}
          <div className="pt-1 border-t border-amber-500/20">
            <p className="text-[10px] sm:text-xs text-amber-400/90 font-medium tracking-wider">
              {data.hostsLabel} <span className="text-amber-100 font-semibold">{data.hosts}</span>
            </p>
            {data.closingWish && (
              <p className="text-[10px] text-stone-400/90 italic mt-0.5">
                {data.closingWish}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
