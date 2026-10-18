import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import {
  Download,
  Eye,
  Sparkles,
  Share2,
  RefreshCw,
  Wand2,
  Volume2,
  VolumeX,
  Languages,
  Crown,
  Heart,
  Calendar,
  Clock,
  MapPin,
  Check,
} from 'lucide-react';

import { InvitationData, LanguageScript } from './types';
import { BACKGROUND_PRESETS } from './constants/backgrounds';
import { TEMPLATES_DATA } from './constants/templates';
import { weddingAudio } from './utils/audioSynth';
import { toCyrillic, toLatin } from './utils/transliterate';

import { Header } from './components/Header';
import { InvitationEditor } from './components/InvitationEditor';
import { InvitationCard } from './components/InvitationCard';
import { InteractiveModal } from './components/InteractiveModal';
import { AiTextModal } from './components/AiTextModal';

export default function App() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Initialize with Sunnat to'y (O'g'il to'y) as explicitly requested by user!
  const [data, setData] = useState<InvitationData>({
    eventType: 'ogil_toy',
    language: 'uz_latin',
    childOrCoupleName: 'Azizbekxon',
    title: "Sunnat To'yi Taklifnomasi",
    bismillahText: 'Bismillahi-r-Rahmoni-r-Rahiym',
    poem: "Yurakda quvonch-u, dilda orzular,\nXonadonimizda bugun bayram, to'y.\nO'g'limiz kamolin ko'rmoq baxti bor,\nSiz aziz do'stlarni chorlaydi bu ko'y.",
    invitationText:
      "Muhtaram va qadrli mehmonlarimiz!\nSizni xonadonimiz suyuklisi, ko'zimiz nuri bo'lmish o'g'limizning sunnat to'yi (xatna marosimi) munosabati bilan yozilajak fayzli to'y dasturxonimizga lutfan taklif etamiz.\n\nSiz azizlarning davramizda bo'lishingiz biz uchun cheksiz sharaf va quvonchdir!",
    hosts: 'Madaliyevlar xonadoni',
    hostsLabel: 'Hurmat va ehtirom ila:',
    eventDate: '2026-10-25',
    eventTime: '18:00',
    hasNahorOshi: true,
    nahorOshiTime: '07:00 - 09:00',
    venueName: 'Versal Tantanalari Saroyi',
    venueAddress: "Toshkent shahri, Chilonzor tumani, Bunyodkor shoh ko'chasi, 2-uy",
    closingWish: "Duolaringiz va tashrifingizdan mamnun bo'lamiz!",
    backgroundId: 'sunnat_royal_gold',
    customPhotoUrl: null,
    fontTheme: 'playfair',
    colorTheme: 'gold',
    showOrnaments: true,
    showCountdown: true,
    showRsvp: true,
    schedules: [{ id: '1', time: '18:00', label: 'Tantanali bazm' }],
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const [isInteractiveOpen, setIsInteractiveOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [transliteratedNotice, setTransliteratedNotice] = useState<string | null>(null);

  // Current background preset
  const currentBackground =
    BACKGROUND_PRESETS.find((b) => b.id === data.backgroundId) || BACKGROUND_PRESETS[0];

  const handleDataChange = (updated: Partial<InvitationData>) => {
    setData((prev) => ({ ...prev, ...updated }));
  };

  const handleToggleMusic = () => {
    const newState = weddingAudio.toggle();
    setIsMusicPlaying(newState);
  };

  // Convert all text fields between Latin & Cyrillic on user command
  const handleTransliterateToggle = () => {
    if (data.language === 'uz_latin') {
      setData((prev) => ({
        ...prev,
        language: 'uz_cyrillic',
        childOrCoupleName: toCyrillic(prev.childOrCoupleName),
        title: toCyrillic(prev.title),
        bismillahText: toCyrillic(prev.bismillahText),
        poem: toCyrillic(prev.poem),
        invitationText: toCyrillic(prev.invitationText),
        hosts: toCyrillic(prev.hosts),
        hostsLabel: toCyrillic(prev.hostsLabel),
        venueName: toCyrillic(prev.venueName),
        venueAddress: toCyrillic(prev.venueAddress),
        closingWish: toCyrillic(prev.closingWish),
      }));
      setTransliteratedNotice("Матнлар Кирилл алифбосига ўтказилди!");
    } else if (data.language === 'uz_cyrillic') {
      setData((prev) => ({
        ...prev,
        language: 'uz_latin',
        childOrCoupleName: toLatin(prev.childOrCoupleName),
        title: toLatin(prev.title),
        bismillahText: toLatin(prev.bismillahText),
        poem: toLatin(prev.poem),
        invitationText: toLatin(prev.invitationText),
        hosts: toLatin(prev.hosts),
        hostsLabel: toLatin(prev.hostsLabel),
        venueName: toLatin(prev.venueName),
        venueAddress: toLatin(prev.venueAddress),
        closingWish: toLatin(prev.closingWish),
      }));
      setTransliteratedNotice("Matnlar Lotin alifbosiga o'tkazildi!");
    }
    setTimeout(() => setTransliteratedNotice(null), 3000);
  };

  // Download high-resolution PNG card
  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 0.95,
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      const safeName = data.childOrCoupleName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      link.download = `taklifnoma_${safeName || 'toyona'}.png`;
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (err) {
      console.error('Download card error:', err);
      alert("Rasmni yuklab olishda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-body">
      {/* 3-Zone Header compliant with top bar contract */}
      <Header
        currentLanguage={data.language}
        onLanguageChange={(lang) => {
          const tmpl = TEMPLATES_DATA[data.eventType][lang];
          setData((prev) => ({
            ...prev,
            language: lang,
            title: tmpl.title,
            hostsLabel: tmpl.hostsLabel,
            bismillahText: tmpl.bismillahText,
            poem: tmpl.poem,
            invitationText: tmpl.invitationText,
            closingWish: tmpl.closingWish,
          }));
        }}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onPreviewClick={() => setIsInteractiveOpen(true)}
      />

      {/* Hero Strip / Quick Mode Notification */}
      <div className="border-b border-stone-800/80 bg-stone-900/40 py-2.5 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-stone-300">
            <span className="font-semibold text-amber-400">
              {data.language === 'ru'
                ? 'Режим:'
                : data.language === 'uz_cyrillic'
                ? 'Ҳозирги тўй тури:'
                : "Hozirgi to'y turi:"}
            </span>
            <span className="font-cinzel text-amber-200">
              {data.eventType === 'ogil_toy'
                ? "👑 O'g'il to'y (Sunnat to'yi)"
                : data.eventType === 'nikoh_toyi'
                ? "💍 Nikoh to'yi (Visol oqshomi)"
                : data.eventType === 'qiz_uzatish'
                ? "🌸 Qiz uzatish"
                : "🎉 Tantanali to'y"}
            </span>
            <span className="text-stone-600">|</span>
            <span className="text-stone-400">
              {data.language === 'uz_latin' ? "Lotin alifbosi" : data.language === 'uz_cyrillic' ? "Кирилл алифбоси" : "Русский язык"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick 1-click Latin <-> Cyrillic conversion */}
            {(data.language === 'uz_latin' || data.language === 'uz_cyrillic') && (
              <button
                type="button"
                onClick={handleTransliterateToggle}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md border border-stone-700 bg-stone-800/80 text-stone-200 hover:text-amber-300 hover:border-amber-500/50 transition-colors"
                title="Yozilgan barcha matnlarni alifboga mos o'girish"
              >
                <Languages className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {data.language === 'uz_latin' ? "Кириллга ўгириш" : "Lotinga o'girish"}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-colors"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>AI She'r generatori</span>
            </button>
          </div>
        </div>
      </div>

      {transliteratedNotice && (
        <div className="bg-amber-500 text-stone-950 text-xs font-semibold text-center py-1.5 animate-in slide-in-from-top">
          {transliteratedNotice}
        </div>
      )}

      {/* Main Workspace Layout: 2 Columns */}
      <main className="flex-1 mx-auto max-w-7xl w-full p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Editor Controls (7 Columns) */}
          <section id="editor" className="lg:col-span-7 rounded-2xl border border-stone-800 bg-stone-900/60 p-5 sm:p-7 backdrop-blur shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
              <div>
                <h2 className="font-cinzel text-lg font-bold text-amber-200">
                  {data.language === 'ru'
                    ? 'Параметры Приглашения'
                    : data.language === 'uz_cyrillic'
                    ? 'Таклифнома Маълумотлари'
                    : "Taklifnoma Ma'lumotlari"}
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Ism, to'y sanasi, to'yxona va orqa fonni sozlang
                </p>
              </div>

              {/* Sample Quick Preset Selector */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-stone-400 hidden sm:inline">Namunalar:</span>
                <button
                  type="button"
                  onClick={() => {
                    const tmpl = TEMPLATES_DATA.ogil_toy[data.language];
                    setData((prev) => ({
                      ...prev,
                      eventType: 'ogil_toy',
                      backgroundId: 'sunnat_royal_gold',
                      childOrCoupleName: tmpl.defaultCelebrant,
                      title: tmpl.title,
                      poem: tmpl.poem,
                      invitationText: tmpl.invitationText,
                      closingWish: tmpl.closingWish,
                    }));
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium border ${
                    data.eventType === 'ogil_toy'
                      ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                      : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  O'g'il to'y
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const tmpl = TEMPLATES_DATA.nikoh_toyi[data.language];
                    setData((prev) => ({
                      ...prev,
                      eventType: 'nikoh_toyi',
                      backgroundId: 'wedding_gold_emerald',
                      childOrCoupleName: tmpl.defaultCelebrant,
                      title: tmpl.title,
                      poem: tmpl.poem,
                      invitationText: tmpl.invitationText,
                      closingWish: tmpl.closingWish,
                    }));
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium border ${
                    data.eventType === 'nikoh_toyi'
                      ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                      : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Nikoh to'yi
                </button>
              </div>
            </div>

            <InvitationEditor
              data={data}
              onChange={handleDataChange}
              onOpenAiModal={() => setIsAiModalOpen(true)}
            />
          </section>

          {/* Right Column: Sticky Live Card Preview (5 Columns) */}
          <section className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-semibold tracking-wider text-amber-300">
                  {data.language === 'ru' ? 'Живой предпросмотр' : data.language === 'uz_cyrillic' ? 'Жонли кўриниш' : 'Jonli ko\'rinish'}
                </span>
                <span className="text-[11px] text-stone-500">· Real-vaqt rejimida</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsInteractiveOpen(true)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 text-xs font-medium cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Kengaytirilgan</span>
                </button>
              </div>
            </div>

            {/* Live Rendered Card Component */}
            <div className="p-3 sm:p-5 rounded-2xl border border-stone-800/80 bg-stone-900/40 backdrop-blur shadow-2xl flex justify-center">
              <InvitationCard
                data={data}
                background={currentBackground}
                cardRef={cardRef}
              />
            </div>

            {/* Card Action Strip */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={isDownloading}
                onClick={handleDownloadCard}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold shadow-lg shadow-amber-950/40 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? "Tayyorlanmoqda..." : "Rasm sifatida saqlash"}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsInteractiveOpen(true)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-stone-700 bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-semibold shadow transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>Onlayn havola & RSVP</span>
              </button>
            </div>

            {/* Quick Tips */}
            <div className="p-3.5 rounded-xl border border-stone-800/80 bg-stone-950/40 text-[11px] text-stone-400 space-y-1">
              <p className="font-semibold text-stone-300">💡 Qulayliklar:</p>
              <p>• Olingan taklifnomani Telegram yoki Instagram orqali rasm yoki online havola ko'rinishida do'stlarga yuboring.</p>
              <p>• Rus, Kirill va Lotin alifbosini bir tugma bilan o'zgartirish mumkin.</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-800 bg-stone-950 py-6 text-center text-xs text-stone-500">
        <p className="font-cinzel text-stone-400 text-sm tracking-wider">
          TO'YONA TAKLIFNOMALAR GENERATORI
        </p>
        <p className="mt-1 text-[11px]">
          O'g'il to'y, nikoh to'ylari va tantanalar uchun o'zbek va rus tillarida zamonaviy taklifnomalar yaratish xizmati.
        </p>
      </footer>

      {/* AI Text Generation Modal */}
      <AiTextModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        data={data}
        onApply={(gen) => {
          setData((prev) => ({
            ...prev,
            poem: gen.poem,
            invitationText: gen.invitationText,
            title: gen.title || prev.title,
            bismillahText: gen.bismillahText || prev.bismillahText,
          }));
          confetti({ particleCount: 50, spread: 60 });
        }}
      />

      {/* Interactive Digital Invitation Modal */}
      <InteractiveModal
        isOpen={isInteractiveOpen}
        onClose={() => setIsInteractiveOpen(false)}
        data={data}
        background={currentBackground}
        onDownloadCard={handleDownloadCard}
        isDownloading={isDownloading}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />
    </div>
  );
}
