import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Share2,
  Download,
  Send,
  Heart,
  Volume2,
  VolumeX,
  CheckCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { InvitationData, BackgroundPreset, GuestRsvp } from '../types';
import { InvitationCard } from './InvitationCard';

interface InteractiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvitationData;
  background: BackgroundPreset;
  onDownloadCard: () => void;
  isDownloading: boolean;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const InteractiveModal: React.FC<InteractiveModalProps> = ({
  isOpen,
  onClose,
  data,
  background,
  onDownloadCard,
  isDownloading,
  isMusicPlaying,
  onToggleMusic,
}) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // RSVP Form State
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [guestStatus, setGuestStatus] = useState<'attending' | 'cant_attend'>('attending');
  const [guestWish, setGuestWish] = useState('');
  const [rsvpList, setRsvpList] = useState<GuestRsvp[]>([]);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load RSVPs from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`toyona_rsvp_${data.childOrCoupleName}`);
      if (saved) {
        setRsvpList(JSON.parse(saved));
      } else {
        // Sample default warm wishes
        setRsvpList([
          {
            id: '1',
            name: "Rustam va Dilnoza",
            status: 'attending',
            guestsCount: 2,
            wishes: "To'ylar muborak bo'lsin! Alijon katta yigit bo'lib, ota-onasining faxri bo'lsin!",
            submittedAt: "Bugun",
          },
          {
            id: '2',
            name: "Akmal aka oilasi",
            status: 'attending',
            guestsCount: 3,
            wishes: "Baxt va sog'lik tilaymiz! Albatta boramiz!",
            submittedAt: "Kecha",
          },
        ]);
      }
    } catch {
      // fallback
    }
  }, [data.childOrCoupleName]);

  // Countdown Calculation
  useEffect(() => {
    if (!data.eventDate) return;

    const calculateTime = () => {
      const target = new Date(`${data.eventDate}T${data.eventTime || '18:00'}:00`).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [data.eventDate, data.eventTime]);

  if (!isOpen) return null;

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F59E0B', '#10B981', '#3B82F6', '#EC4899'],
    });
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const newRsvp: GuestRsvp = {
      id: Date.now().toString(),
      name: guestName.trim(),
      status: guestStatus,
      guestsCount: guestCount,
      wishes: guestWish.trim(),
      submittedAt: "Hozirgina",
    };

    const updated = [newRsvp, ...rsvpList];
    setRsvpList(updated);
    setRsvpSubmitted(true);
    triggerConfetti();

    try {
      localStorage.setItem(`toyona_rsvp_${data.childOrCoupleName}`, JSON.stringify(updated));
    } catch {
      // fallback
    }

    setGuestName('');
    setGuestWish('');
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareTelegram = () => {
    const text = encodeURIComponent(
      `💌 Sizni ${data.title}ga taklif qilamiz!\n\n👑 ${data.childOrCoupleName}\n📅 Sana: ${data.eventDate} (${data.eventTime})\n📍 Manzil: ${data.venueName}\n\nTaklifnomani ochish: ${window.location.href}`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`, '_blank');
  };

  const handleOpenMap = () => {
    const query = encodeURIComponent(`${data.venueName} ${data.venueAddress}`);
    window.open(`https://yandex.uz/maps/?text=${query}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/95 backdrop-blur-md p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      <div className="mx-auto max-w-5xl">
        {/* Top Floating Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-cinzel text-lg font-bold text-amber-300">
              {data.language === 'ru' ? 'Онлайн Приглашение' : data.language === 'uz_cyrillic' ? 'Онлайн Таклифнома' : 'Online Taklifnoma'}
            </span>
            <span className="text-xs text-stone-400">·</span>
            <span className="text-xs text-stone-400 font-medium">{data.childOrCoupleName}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleMusic}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isMusicPlaying
                  ? 'border-amber-500 bg-amber-500/20 text-amber-300 animate-pulse'
                  : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              {isMusicPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{isMusicPlaying ? "Kuy" : "Kuy yoqish"}</span>
            </button>

            <button
              type="button"
              onClick={triggerConfetti}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
            >
              🎉 <span className="hidden sm:inline">Zarlar sochish</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 2-Column Split: Card on Left, Interactive Guest Features on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Card (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full shadow-2xl rounded-2xl overflow-hidden ring-1 ring-amber-500/40">
              <InvitationCard data={data} background={background} />
            </div>

            {/* Quick Actions Under Card */}
            <div className="w-full max-w-[540px] flex items-center justify-between gap-3 mt-4">
              <button
                type="button"
                disabled={isDownloading}
                onClick={onDownloadCard}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold shadow-lg transition-all disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? "Yuklanmoqda..." : "Rasmni yuklab olish (PNG)"}</span>
              </button>

              <button
                type="button"
                onClick={handleShareTelegram}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-xs font-semibold transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Telegram</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-stone-800 bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-medium transition-all cursor-pointer"
              >
                <Copy className="w-4 h-4 text-amber-400" />
                <span>{copiedLink ? "Nusxalandi!" : "Havola"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Guest Experience (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Countdown Clock */}
            <div className="rounded-2xl border border-amber-500/30 bg-stone-900/80 p-5 backdrop-blur shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase font-semibold tracking-wider text-amber-300 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {data.language === 'ru' ? 'До торжества осталось' : data.language === 'uz_cyrillic' ? 'Тўйгача қолган вақт' : "To'ygacha qolgan vaqt"}
                </span>
                <span className="text-xs text-amber-400/80 font-medium">{data.eventDate}</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="rounded-xl border border-stone-800 bg-stone-950 p-2.5">
                  <span className="font-cinzel text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">
                    {timeLeft.days}
                  </span>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">
                    {data.language === 'ru' ? 'Дней' : data.language === 'uz_cyrillic' ? 'Кун' : 'Kun'}
                  </p>
                </div>
                <div className="rounded-xl border border-stone-800 bg-stone-950 p-2.5">
                  <span className="font-cinzel text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">
                    {timeLeft.hours}
                  </span>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">
                    {data.language === 'ru' ? 'Часов' : data.language === 'uz_cyrillic' ? 'Соат' : 'Soat'}
                  </p>
                </div>
                <div className="rounded-xl border border-stone-800 bg-stone-950 p-2.5">
                  <span className="font-cinzel text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">
                    {timeLeft.minutes}
                  </span>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">
                    {data.language === 'ru' ? 'Минут' : data.language === 'uz_cyrillic' ? 'Дақиқа' : 'Daqiqa'}
                  </p>
                </div>
                <div className="rounded-xl border border-stone-800 bg-stone-950 p-2.5">
                  <span className="font-cinzel text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">
                    {timeLeft.seconds}
                  </span>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">
                    {data.language === 'ru' ? 'Секунд' : data.language === 'uz_cyrillic' ? 'Сония' : 'Soniya'}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Venue Location / Map */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/80 p-5 backdrop-blur shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-semibold tracking-wider text-amber-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {data.language === 'ru' ? 'Место проведения' : data.language === 'uz_cyrillic' ? 'Тўй манзили' : "To'y manzili"}
                </span>
              </div>

              <div className="p-3 rounded-xl border border-stone-800 bg-stone-950">
                <h4 className="font-cinzel text-sm font-bold text-stone-100">{data.venueName}</h4>
                <p className="text-xs text-stone-400 mt-0.5">{data.venueAddress || "Toshkent shahri"}</p>
              </div>

              <button
                type="button"
                onClick={handleOpenMap}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>
                  {data.language === 'ru' ? 'Открыть в Яндекс / Google Картах' : data.language === 'uz_cyrillic' ? 'Харитада кўриш (Яндекс / Google)' : "Xaritada ko'rish (Yandex / Google)"}
                </span>
              </button>
            </div>

            {/* 3. RSVP / Qatnashishni Tasdiqlash & Tilaklar */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/80 p-5 backdrop-blur shadow-xl space-y-4">
              <div>
                <h3 className="text-xs uppercase font-semibold tracking-wider text-amber-300 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-400" />
                  {data.language === 'ru'
                    ? 'Подтверждение участия и пожелания'
                    : data.language === 'uz_cyrillic'
                    ? 'Тўйда қатнашишни тасдиқлаш ва тилаклар'
                    : "To'yda qatnashishni tasdiqlash va tilaklar"}
                </h3>
                <p className="text-[11px] text-stone-400 mt-1">
                  Xonadon egalariga tashrifingizni bildiring va iliq tilaklar qoldiring
                </p>
              </div>

              <form onSubmit={handleRsvpSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGuestStatus('attending')}
                    className={`py-2 px-3 rounded-lg border text-xs font-medium text-center transition-all ${
                      guestStatus === 'attending'
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                        : 'border-stone-800 bg-stone-950 text-stone-400'
                    }`}
                  >
                    ✓ Albatta boramiz
                  </button>
                  <button
                    type="button"
                    onClick={() => setGuestStatus('cant_attend')}
                    className={`py-2 px-3 rounded-lg border text-xs font-medium text-center transition-all ${
                      guestStatus === 'cant_attend'
                        ? 'border-rose-500 bg-rose-500/20 text-rose-300'
                        : 'border-stone-800 bg-stone-950 text-stone-400'
                    }`}
                  >
                    Bora olmaymiz
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Ismingiz (masalan: Jamshid aka)"
                      className="w-full rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-xs text-stone-100 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full rounded-lg border border-stone-800 bg-stone-950 px-2 py-2 text-xs text-stone-100 focus:border-amber-500 focus:outline-none"
                    >
                      <option value={1}>1 kishi</option>
                      <option value={2}>2 kishi</option>
                      <option value={3}>3 kishi</option>
                      <option value={4}>Oila (4+)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    value={guestWish}
                    onChange={(e) => setGuestWish(e.target.value)}
                    placeholder="To'y egalariga ezgu tilaklaringiz..."
                    className="w-full rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-xs text-stone-100 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold shadow transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Yuborish & Tasdiqlash</span>
                </button>
              </form>

              {/* Guest Wishes Board */}
              {rsvpList.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-stone-800">
                  <span className="text-[11px] font-semibold text-stone-400">
                    Mehmonlar tilaklari ({rsvpList.length})
                  </span>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {rsvpList.map((r) => (
                      <div
                        key={r.id}
                        className="p-2.5 rounded-lg border border-stone-800/80 bg-stone-950/60 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-amber-300">{r.name}</span>
                          <span className="text-[10px] text-stone-500">{r.submittedAt}</span>
                        </div>
                        {r.wishes && <p className="text-stone-300 italic">"{r.wishes}"</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
