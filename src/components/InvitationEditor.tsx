import React, { useRef } from 'react';
import {
  Crown,
  Heart,
  Award,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Users,
  Image as ImageIcon,
  Type,
  Wand2,
  Trash2,
  Upload,
  Layers,
  Baby,
} from 'lucide-react';
import { InvitationData, EventType, LanguageScript, FontTheme } from '../types';
import { BACKGROUND_PRESETS } from '../constants/backgrounds';
import { TEMPLATES_DATA } from '../constants/templates';

interface InvitationEditorProps {
  data: InvitationData;
  onChange: (updated: Partial<InvitationData>) => void;
  onOpenAiModal: () => void;
}

export const InvitationEditor: React.FC<InvitationEditorProps> = ({
  data,
  onChange,
  onOpenAiModal,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Event Type Change
  const handleEventTypeChange = (type: EventType) => {
    const template = TEMPLATES_DATA[type][data.language];
    let recommendedBgId = data.backgroundId;
    if (type === 'ogil_toy') {
      recommendedBgId = 'sunnat_royal_gold';
    } else if (type === 'nikoh_toyi') {
      recommendedBgId = 'wedding_gold_emerald';
    } else if (type === 'qiz_uzatish') {
      recommendedBgId = 'wedding_ivory_floral';
    }

    onChange({
      eventType: type,
      title: template.title,
      childOrCoupleName: template.defaultCelebrant,
      hosts: template.defaultHosts,
      hostsLabel: template.hostsLabel,
      bismillahText: template.bismillahText,
      poem: template.poem,
      invitationText: template.invitationText,
      closingWish: template.closingWish,
      backgroundId: recommendedBgId,
    });
  };

  // Handle Language Script Change
  const handleLanguageChange = (lang: LanguageScript) => {
    const template = TEMPLATES_DATA[data.eventType][lang];
    onChange({
      language: lang,
      title: template.title,
      hostsLabel: template.hostsLabel,
      bismillahText: template.bismillahText,
      poem: template.poem,
      invitationText: template.invitationText,
      closingWish: template.closingWish,
    });
  };

  // Handle Custom Image Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({ customPhotoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    onChange({ customPhotoUrl: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const eventTypesList: { id: EventType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'ogil_toy',
      label: data.language === 'ru' ? 'Суннат той' : data.language === 'uz_cyrillic' ? 'Суннат тўйи' : "O'g'il to'y (Sunnat)",
      icon: <Crown className="w-4 h-4 text-amber-400" />,
    },
    {
      id: 'nikoh_toyi',
      label: data.language === 'ru' ? 'Свадьба' : data.language === 'uz_cyrillic' ? 'Никоҳ тўйи' : "Nikoh to'yi",
      icon: <Heart className="w-4 h-4 text-rose-400" />,
    },
    {
      id: 'qiz_uzatish',
      label: data.language === 'ru' ? 'Проводы невесты' : data.language === 'uz_cyrillic' ? 'Қиз узатиш' : 'Qiz uzatish',
      icon: <Sparkles className="w-4 h-4 text-pink-400" />,
    },
    {
      id: 'yubiley',
      label: data.language === 'ru' ? 'Юбилей' : data.language === 'uz_cyrillic' ? 'Юбилей' : 'Yubiley / Tavallud',
      icon: <Award className="w-4 h-4 text-amber-300" />,
    },
    {
      id: 'beshik_toyi',
      label: data.language === 'ru' ? 'Бешик той' : data.language === 'uz_cyrillic' ? 'Бешик тўйи' : "Beshik to'yi",
      icon: <Baby className="w-4 h-4 text-blue-400" />,
    },
    {
      id: 'fotiha_toyi',
      label: data.language === 'ru' ? 'Помолвка' : data.language === 'uz_cyrillic' ? 'Фотиҳа тўйи' : "Fotiha to'yi",
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
    },
  ];

  return (
    <div className="space-y-6 text-stone-200">
      {/* 1. To'y Turi (Event Type) */}
      <section className="space-y-2">
        <label className="text-xs uppercase font-semibold tracking-wider text-amber-300 flex items-center gap-2">
          <Crown className="w-4 h-4" />
          <span>
            {data.language === 'ru'
              ? 'Тип торжества'
              : data.language === 'uz_cyrillic'
              ? 'Тўй турини танланг'
              : "To'y turini tanlang"}
          </span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {eventTypesList.map((et) => {
            const isActive = data.eventType === et.id;
            return (
              <button
                key={et.id}
                type="button"
                onClick={() => handleEventTypeChange(et.id)}
                className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-all text-left ${
                  isActive
                    ? 'border-amber-500 bg-amber-500/20 text-amber-200 shadow-sm'
                    : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-stone-700 hover:bg-stone-800'
                }`}
              >
                {et.icon}
                <span className="truncate">{et.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Til va Alifbo Tanlovi */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase font-semibold tracking-wider text-amber-300 flex items-center gap-2">
            <Type className="w-4 h-4" />
            <span>
              {data.language === 'ru' ? 'Язык и алфавит' : data.language === 'uz_cyrillic' ? 'Тил ва алифбо' : 'Til va alifbo'}
            </span>
          </label>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleLanguageChange('uz_latin')}
            className={`p-2 rounded-lg border text-xs font-medium text-center transition-all ${
              data.language === 'uz_latin'
                ? 'border-amber-500 bg-amber-500/20 text-amber-200'
                : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:text-stone-200'
            }`}
          >
            O'zbekcha (Lotin)
          </button>
          <button
            type="button"
            onClick={() => handleLanguageChange('uz_cyrillic')}
            className={`p-2 rounded-lg border text-xs font-medium text-center transition-all ${
              data.language === 'uz_cyrillic'
                ? 'border-amber-500 bg-amber-500/20 text-amber-200'
                : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:text-stone-200'
            }`}
          >
            Ўзбекча (Кирилл)
          </button>
          <button
            type="button"
            onClick={() => handleLanguageChange('ru')}
            className={`p-2 rounded-lg border text-xs font-medium text-center transition-all ${
              data.language === 'ru'
                ? 'border-amber-500 bg-amber-500/20 text-amber-200'
                : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:text-stone-200'
            }`}
          >
            Русский язык
          </button>
        </div>
      </section>

      {/* 3. Bosh Qahramon Ismi va Taklif Etuvchilar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5">
            {data.eventType === 'ogil_toy' ? <Crown className="w-3.5 h-3.5 text-amber-400" /> : <Users className="w-3.5 h-3.5 text-amber-400" />}
            <span>
              {data.eventType === 'ogil_toy'
                ? (data.language === 'ru' ? 'Имя мальчика (сына)' : data.language === 'uz_cyrillic' ? 'Ўғил боланинг исми' : "O'g'il bolaning ismi")
                : data.eventType === 'nikoh_toyi'
                ? (data.language === 'ru' ? 'Имена жениха и невесты' : data.language === 'uz_cyrillic' ? 'Куёв ва Келин исмлари' : "Kuyov va Kelin ismlari")
                : (data.language === 'ru' ? 'Имя виновника торжества' : data.language === 'uz_cyrillic' ? 'Бош қаҳрамон исми' : "Bosh qahramon ismi")}
            </span>
          </label>
          <input
            type="text"
            value={data.childOrCoupleName}
            onChange={(e) => onChange({ childOrCoupleName: e.target.value })}
            placeholder="Masalan: Azizbekxon yoki Sardor & Nozima"
            className="w-full rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {data.language === 'ru'
                ? 'От кого (хозяева / семья)'
                : data.language === 'uz_cyrillic'
                ? 'Кимдан (хонадон эгалари)'
                : "Kimdan (xonadon egalari)"}
            </span>
          </label>
          <input
            type="text"
            value={data.hosts}
            onChange={(e) => onChange({ hosts: e.target.value })}
            placeholder="Masalan: Madaliyevlar xonadoni yoki Ota-onasi"
            className="w-full rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 4. Sana, Vaqt va Nahor Oshi */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{data.language === 'ru' ? 'Дата' : data.language === 'uz_cyrillic' ? 'Тўй санаси' : "To'y sanasi"}</span>
          </label>
          <input
            type="date"
            value={data.eventDate}
            onChange={(e) => onChange({ eventDate: e.target.value })}
            className="w-full rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-sm text-stone-100 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{data.language === 'ru' ? 'Время банкета' : data.language === 'uz_cyrillic' ? 'Базм вақти' : 'Bazm vaqti'}</span>
          </label>
          <input
            type="text"
            value={data.eventTime}
            onChange={(e) => onChange({ eventTime: e.target.value })}
            placeholder="18:00"
            className="w-full rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-sm text-stone-100 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5">
              <span>{data.language === 'ru' ? 'Утренний плов' : data.language === 'uz_cyrillic' ? 'Наҳор оши' : 'Nahor oshi'}</span>
            </label>
            <input
              type="checkbox"
              checked={data.hasNahorOshi}
              onChange={(e) => onChange({ hasNahorOshi: e.target.checked })}
              className="accent-amber-500 h-3.5 w-3.5 rounded cursor-pointer"
            />
          </div>
          <input
            type="text"
            disabled={!data.hasNahorOshi}
            value={data.nahorOshiTime}
            onChange={(e) => onChange({ nahorOshiTime: e.target.value })}
            placeholder="07:00 - 09:00"
            className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
              data.hasNahorOshi
                ? 'border-stone-800 bg-stone-950 text-stone-100 focus:border-amber-500'
                : 'border-stone-900 bg-stone-950/40 text-stone-600'
            }`}
          />
        </div>
      </div>

      {/* 5. To'yxona va Manzil */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {data.language === 'ru' ? 'Название ресторана / зала' : data.language === 'uz_cyrillic' ? 'Тўйхона / Ресторан номи' : "To'yxona / Restoran nomi"}
            </span>
          </label>
          <input
            type="text"
            value={data.venueName}
            onChange={(e) => onChange({ venueName: e.target.value })}
            placeholder="Masalan: Yakkasaroy to'ylar maskani"
            className="w-full rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{data.language === 'ru' ? 'Адрес' : data.language === 'uz_cyrillic' ? 'Манзил (шаҳар, кўча)' : 'Manzil (shahar, ko\'cha)'}</span>
          </label>
          <input
            type="text"
            value={data.venueAddress}
            onChange={(e) => onChange({ venueAddress: e.target.value })}
            placeholder="Toshkent shahri, Bobur ko'chasi, 5-uy"
            className="w-full rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 6. AI bilan Matn va She'r Yozish Banner */}
      <div className="rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div>
          <h4 className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
            <Wand2 className="w-4 h-4 text-amber-400" />
            <span>
              {data.language === 'ru'
                ? 'AI Генератор приглашений и стихов'
                : data.language === 'uz_cyrillic'
                ? 'AI Сунъий интеллект шеър ва матн генератори'
                : "AI Sun'iy intellekt she'r va matn yozuvchi"}
            </span>
          </h4>
          <p className="text-[11px] text-stone-400 mt-0.5">
            {data.language === 'ru'
              ? 'Автоматически сочинит эксклюзивные стихи и душевный текст приглашения'
              : data.language === 'uz_cyrillic'
              ? 'Кирилл ёки лотин алифбосида ўғил тўй ёки никоҳ учун махсус шеър яратади'
              : "Kiritilgan ism va to'y turiga mos betakror samimiy she'riy misralar yozib beradi"}
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenAiModal}
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-semibold text-stone-950 shadow-md hover:bg-amber-400 transition-colors whitespace-nowrap cursor-pointer shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{data.language === 'ru' ? 'Создать с AI' : data.language === 'uz_cyrillic' ? 'AI билан ёзиш' : 'AI bilan yozish'}</span>
        </button>
      </div>

      {/* 7. She'r va Asosiy Taklif Matni */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-stone-300 flex items-center justify-between">
            <span>{data.language === 'ru' ? 'Поэтические строки (стихи)' : data.language === 'uz_cyrillic' ? 'Тўй шеъри (мисралар)' : "To'y she'ri (misralar)"}</span>
            <span className="text-[11px] text-stone-500">2-4 qator</span>
          </label>
          <textarea
            rows={3}
            value={data.poem}
            onChange={(e) => onChange({ poem: e.target.value })}
            placeholder="She'riy taklif misralari..."
            className="w-full rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-xs text-stone-100 placeholder-stone-600 focus:border-amber-500 focus:outline-none font-cormorant italic"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-stone-300 flex items-center justify-between">
            <span>{data.language === 'ru' ? 'Основной текст приглашения' : data.language === 'uz_cyrillic' ? 'Асосий таклиф матни' : 'Asosiy taklif matni'}</span>
          </label>
          <textarea
            rows={4}
            value={data.invitationText}
            onChange={(e) => onChange({ invitationText: e.target.value })}
            placeholder="Aziz mehmonlarimiz, sizni to'y dasturxonimizga taklif etamiz..."
            className="w-full rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-xs text-stone-100 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 8. To'ybop Orqa Fon (Background Selection) */}
      <section className="space-y-2 pt-2 border-t border-stone-800/80">
        <label className="text-xs uppercase font-semibold tracking-wider text-amber-300 flex items-center gap-2">
          <Layers className="w-4 h-4" />
          <span>
            {data.language === 'ru' ? 'Праздничный фон открытки' : data.language === 'uz_cyrillic' ? 'Тўйбоп орқа фон (дизайн)' : "To'ybop orqa fon (dizayn)"}
          </span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {BACKGROUND_PRESETS.map((bg) => {
            const isSelected = data.backgroundId === bg.id;
            return (
              <button
                key={bg.id}
                type="button"
                onClick={() => onChange({ backgroundId: bg.id })}
                className={`group relative flex flex-col items-center rounded-xl p-1.5 border text-left transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-amber-500/10 shadow-md ring-1 ring-amber-400'
                    : 'border-stone-800 bg-stone-900/60 hover:border-stone-700'
                }`}
              >
                <div
                  className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-stone-700/50 mb-1.5 relative bg-stone-950"
                  style={{
                    background: bg.category === 'gradient' ? bg.gradientStyle : '#111827',
                  }}
                >
                  {bg.category === 'image' && bg.src && (
                    <img
                      src={bg.src}
                      alt={bg.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  )}
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-amber-500 text-stone-950 p-0.5 rounded-full shadow">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-medium text-stone-200 line-clamp-1 text-center w-full">
                  {bg.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 9. Rasm Qo'shish (Celebrant Photo Upload) */}
      <section className="space-y-2 pt-2 border-t border-stone-800/80">
        <label className="text-xs uppercase font-semibold tracking-wider text-amber-300 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            {data.language === 'ru'
              ? 'Фотография ребенка или молодоженов'
              : data.language === 'uz_cyrillic'
              ? 'Ўғил бола ёки ёшлар расмини қўшиш'
              : "O'g'il bola yoki yoshlar rasmini qo'shish"}
          </span>
          {data.customPhotoUrl && (
            <button
              type="button"
              onClick={removePhoto}
              className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>O'chirish</span>
            </button>
          )}
        </label>

        {data.customPhotoUrl ? (
          <div className="flex items-center gap-3 p-3 rounded-xl border border-stone-800 bg-stone-950/60">
            <img
              src={data.customPhotoUrl}
              alt="Yuklangan rasm"
              className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow"
            />
            <div className="flex-1 text-xs">
              <p className="font-medium text-amber-300">Rasm muvaffaqiyatli yuklandi</p>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Taklifnoma markazida zarhal toj va hoshiya bilan ko'rinadi
              </p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 text-xs rounded-lg border border-stone-700 bg-stone-900 text-stone-300 hover:bg-stone-800"
            >
              Almashtirish
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-stone-700 bg-stone-950/40 hover:bg-stone-900/60 transition-colors cursor-pointer text-center group"
          >
            <Upload className="w-6 h-6 text-stone-500 group-hover:text-amber-400 transition-colors mb-1.5" />
            <p className="text-xs font-medium text-stone-300 group-hover:text-amber-300">
              {data.language === 'ru' ? 'Нажмите, чтобы загрузить фото' : data.language === 'uz_cyrillic' ? 'Расм юклаш учун босинг' : 'Rasm yuklash uchun bosing'}
            </p>
            <p className="text-[10px] text-stone-500 mt-0.5">JPG, PNG formatlar (ixtiyoriy)</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
      </section>

      {/* 10. Shrift va Bezaklar */}
      <section className="space-y-3 pt-2 border-t border-stone-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-amber-400" />
              <span>{data.language === 'ru' ? 'Шрифт заголовка' : data.language === 'uz_cyrillic' ? 'Сарлавҳа шрифти' : 'Sarlavha shrifti'}</span>
            </label>
            <select
              value={data.fontTheme}
              onChange={(e) => onChange({ fontTheme: e.target.value as FontTheme })}
              className="w-full rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-xs text-stone-100 focus:border-amber-500 focus:outline-none"
            >
              <option value="playfair">Playfair Display (Klassik Serifi)</option>
              <option value="cinzel">Cinzel (Qirollik Rim Uslubi)</option>
              <option value="cormorant">Cormorant Garamond (Nafis)</option>
              <option value="script">Marck Script (Qo'lyozma Kalligrafiya)</option>
            </select>
          </div>

          <div className="space-y-1.5 flex flex-col justify-end">
            <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg border border-stone-800 bg-stone-950/60 hover:bg-stone-900">
              <input
                type="checkbox"
                checked={data.showOrnaments}
                onChange={(e) => onChange({ showOrnaments: e.target.checked })}
                className="accent-amber-500 h-4 w-4 rounded cursor-pointer"
              />
              <span className="text-xs font-medium text-stone-300">
                {data.language === 'ru' ? 'Золотые угловые орнаменты' : data.language === 'uz_cyrillic' ? 'Зарҳал бурчак нақшлари' : 'Zarhal burchak naqshlari'}
              </span>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};
