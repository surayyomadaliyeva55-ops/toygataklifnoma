import React, { useState } from 'react';
import { X, Sparkles, Loader2, Check, RefreshCw } from 'lucide-react';
import { InvitationData, LanguageScript } from '../types';

interface AiTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvitationData;
  onApply: (generated: {
    poem: string;
    invitationText: string;
    title: string;
    bismillahText: string;
  }) => void;
}

export const AiTextModal: React.FC<AiTextModalProps> = ({
  isOpen,
  onClose,
  data,
  onApply,
}) => {
  const [tone, setTone] = useState<string>('traditional_poem');
  const [targetLang, setTargetLang] = useState<LanguageScript>(data.language);
  const [specialWishes, setSpecialWishes] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<{
    poem: string;
    invitationText: string;
    title: string;
    bismillahText: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/generate-invitation-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: data.eventType,
          childOrCoupleName: data.childOrCoupleName,
          hosts: data.hosts,
          eventDate: data.eventDate,
          eventTime: data.eventTime,
          venueName: data.venueName,
          venueAddress: data.venueAddress,
          language: targetLang,
          tone,
          specialWishes,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setResult({
          poem: resData.data.poem || '',
          invitationText: resData.data.mainInvitation || '',
          title: resData.data.headerTitle || data.title,
          bismillahText: resData.data.bismillahText || data.bismillahText,
        });
      } else {
        throw new Error(resData.error || 'Server javob bermadi');
      }
    } catch (err: any) {
      console.warn('AI generate fallback:', err);
      // High-quality local fallback poem and wording generator
      generateLocalFallback();
    } finally {
      setIsLoading(false);
    }
  };

  const generateLocalFallback = () => {
    let poem = '';
    let invText = '';
    let title = '';
    let bism = '';

    if (data.eventType === 'ogil_toy') {
      if (targetLang === 'uz_cyrillic') {
        title = 'Суннат Тўйи Таклифномаси';
        bism = 'Бисмиллаҳир Роҳманир Роҳийм';
        poem = `Қувончларга тўлсин бугун даврамиз,\n${data.childOrCoupleName} камолини кўрмоқ истаймиз.\nФайзли тўйхонада азиз дўстларни,\nТўёна дастурхонга лутфан чорлаймиз!`;
        invText = `Ҳурматли ва қадрли меҳмонларимиз!\nСизни дилбандимиз, оила сурури ${data.childOrCoupleName}нинг суннат тўйи (хатна маросими) муносабати билан ёзиладиган тантанали дастурхонимизга таклиф этамиз.\n\nТашрифингиз хонадонимизга чексиз файз бағишлайди!`;
      } else if (targetLang === 'ru') {
        title = 'Приглашение на Суннат Той';
        bism = 'С именем Всевышнего';
        poem = `Пусть льется радость и звучит веселье,\nВ глазах сияет праздничный покой.\nВ честь нашего сыночка ${data.childOrCoupleName},\nРазделим вместе славный суннат той!`;
        invText = `Дорогие и уважаемые гости!\nПриглашаем вас разделить нашу безграничную радость — светлый праздник Суннат той нашего любимого сына ${data.childOrCoupleName}.\n\nБудем искренне рады видеть вас за нашим праздничным дастарханом!`;
      } else {
        title = "Sunnat To'yi Taklifnomasi";
        bism = 'Bismillahi-r-Rahmoni-r-Rahiym';
        poem = `Quvonchlarga to'lsin bugun davramiz,\n${data.childOrCoupleName} kamolini ko'rmoq istaymiz.\nFayzli to'yxonada aziz do'stlarni,\nTo'yona dasturxonga lutfan chorlaymiz!`;
        invText = `Hurmatli va qadrli mehmonlarimiz!\nSizni dilbandimiz, oila sururi ${data.childOrCoupleName}ning sunnat to'yi (xatna marosimi) munosabati bilan yoziladigan tantanali dasturxonimizga taklif etamiz.\n\nTashrifingiz xonadonimizga cheksiz fayz bag'ishlaydi!`;
      }
    } else {
      if (targetLang === 'ru') {
        title = 'Свадебное Торжество';
        bism = 'С именем Всевышнего';
        poem = 'Два сердца, две судьбы сплелись в одну,\nВстречая долгожданную весну.\nПусть в доме правит верность и покой,\nБлагословите наш союз святой!';
        invText = `Дорогие друзья и близкие!\nСердечно приглашаем вас на торжественный свадебный вечер в честь ${data.childOrCoupleName}.\n\nВаше присутствие сделает наш праздник незабываемым!`;
      } else if (targetLang === 'uz_cyrillic') {
        title = 'Никоҳ Тўйи Таклифномаси';
        bism = 'Бисмиллаҳир Роҳманир Роҳийм';
        poem = 'Икки ёш бахтига тўлсин диллари,\nГулларга кўмилсин ҳаёт йўллари.\nСиз азиз меҳмонлар дуоси бирла,\nҚутлуғ қадам қўйсин висол кунлари.';
        invText = `Муҳтарам меҳмонларимиз!\nФарзандларимиз ${data.childOrCoupleName}нинг бахт ва висол тўйи муносабати билан ёзиладиган тўёна дастурхонимизга сизни лутфан таклиф этамиз!`;
      } else {
        title = "Nikoh To'yi Taklifnomasi";
        bism = 'Bismillahi-r-Rahmoni-r-Rahiym';
        poem = "Ikki yosh baxtiga to'lsin dillari,\nGullarga ko'milsin hayot yo'llari.\nSiz aziz mehmonlar duosi birla,\nQutlug' qadam qo'ysin visol kunlari.";
        invText = `Muhtaram mehmonlarimiz!\nFarzandlarimiz ${data.childOrCoupleName}ning baxt va visol to'yi munosabati bilan yoziladigan to'yona dasturxonimizga sizni lutfan taklif etamiz!`;
      }
    }

    setResult({ poem, invitationText: invText, title, bismillahText: bism });
  };

  const handleApplyResult = () => {
    if (result) {
      onApply(result);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl border border-stone-800 bg-stone-950 p-6 shadow-2xl text-stone-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-200 p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cinzel text-lg font-bold text-amber-200">
              AI She'r va Taklifnoma Matni Yaratish
            </h3>
            <p className="text-xs text-stone-400">
              Gemini AI yordamida takrorlanmas, samimiy va baland pardali taklifnoma
            </p>
          </div>
        </div>

        {/* Form Options */}
        <div className="space-y-4">
          {/* Alphabet / Language Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-stone-300">Til va alifbo</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTargetLang('uz_latin')}
                className={`py-1.5 px-3 rounded-lg border text-xs font-medium ${
                  targetLang === 'uz_latin'
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                    : 'border-stone-800 bg-stone-900 text-stone-400'
                }`}
              >
                O'zbek (Lotin)
              </button>
              <button
                type="button"
                onClick={() => setTargetLang('uz_cyrillic')}
                className={`py-1.5 px-3 rounded-lg border text-xs font-medium ${
                  targetLang === 'uz_cyrillic'
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                    : 'border-stone-800 bg-stone-900 text-stone-400'
                }`}
              >
                Ўзбек (Кирилл)
              </button>
              <button
                type="button"
                onClick={() => setTargetLang('ru')}
                className={`py-1.5 px-3 rounded-lg border text-xs font-medium ${
                  targetLang === 'ru'
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                    : 'border-stone-800 bg-stone-900 text-stone-400'
                }`}
              >
                Русский
              </button>
            </div>
          </div>

          {/* Tone */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-stone-300">Uslub va yo'nalish</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-lg border border-stone-800 bg-stone-900 px-3 py-2 text-xs text-stone-200 focus:border-amber-500 focus:outline-none"
            >
              <option value="traditional_poem">An'anaviy to'yona she'riy va samimiy</option>
              <option value="modern_warm">Zamonaviy, xushmuomala va iliq</option>
              <option value="islamic_blessing">Diniy-ma'rifiy fotiha va duolar ila</option>
              <option value="grand_palace">Olijanob shohona va tantanavor</option>
            </select>
          </div>

          {/* Extra Wishes Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-stone-300">Qo'shimcha istak yoki izoh (ixtiyoriy)</label>
            <input
              type="text"
              value={specialWishes}
              onChange={(e) => setSpecialWishes(e.target.value)}
              placeholder="Masalan: Bobosi va buvisi nomidan, yoki tantanali nahor oshi eslatilsin"
              className="w-full rounded-lg border border-stone-800 bg-stone-900 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Generate Button */}
          <button
            type="button"
            disabled={isLoading}
            onClick={handleGenerate}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 text-xs font-semibold text-stone-950 shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>She'r va matn yaratilmoqda...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Yangi matn va she'r yaratish</span>
              </>
            )}
          </button>

          {/* Generated Result Preview */}
          {result && (
            <div className="space-y-3 p-4 rounded-xl border border-amber-500/30 bg-stone-900/80">
              <div className="flex items-center justify-between text-xs text-amber-400 font-semibold border-b border-stone-800 pb-2">
                <span>Yaratilgan Taklifnoma Natijasi</span>
                <span className="text-[11px] text-stone-400">{targetLang}</span>
              </div>

              {result.poem && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">She'r:</span>
                  <p className="font-cormorant italic text-xs leading-relaxed text-amber-200 whitespace-pre-line bg-stone-950/50 p-2.5 rounded-lg border border-stone-800">
                    "{result.poem}"
                  </p>
                </div>
              )}

              {result.invitationText && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">Taklif matni:</span>
                  <p className="text-xs text-stone-300 leading-relaxed bg-stone-950/50 p-2.5 rounded-lg border border-stone-800 whitespace-pre-line">
                    {result.invitationText}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleApplyResult}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 py-2 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Taklifnomaga o'rnatish</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
