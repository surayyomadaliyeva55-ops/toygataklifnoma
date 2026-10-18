import { EventType, LanguageScript } from '../types';

export interface EventTemplateData {
  title: string;
  defaultCelebrant: string;
  defaultHosts: string;
  hostsLabel: string;
  bismillahText: string;
  poem: string;
  invitationText: string;
  closingWish: string;
}

export const TEMPLATES_DATA: Record<EventType, Record<LanguageScript, EventTemplateData>> = {
  ogil_toy: {
    uz_latin: {
      title: "Sunnat To'yi Taklifnomasi",
      defaultCelebrant: "Azizbekxon",
      defaultHosts: "Madaliyevlar xonadoni",
      hostsLabel: "Hurmat va ehtirom ila:",
      bismillahText: "Bismillahi-r-Rahmoni-r-Rahiym",
      poem: "Yurakda quvonch-u, dilda orzular,\nXonadonimizda bugun bayram, to'y.\nO'g'limiz kamolin ko'rmoq baxti bor,\nSiz aziz do'stlarni chorlaydi bu ko'y.",
      invitationText: "Muhtaram va qadrli mehmonlarimiz!\nSizni xonadonimiz suyuklisi, ko'zimiz nuri bo'lmish o'g'limizning sunnat to'yi (xatna marosimi) munosabati bilan yozilajak fayzli to'y dasturxonimizga lutfan taklif etamiz.\n\nSiz azizlarning davramizda bo'lishingiz biz uchun cheksiz sharaf va quvonchdir!",
      closingWish: "Duolaringiz va tashrifingizdan mamnun bo'lamiz!",
    },
    uz_cyrillic: {
      title: "Суннат Тўйи Таклифномаси",
      defaultCelebrant: "Азизбекхон",
      defaultHosts: "Мадалиевлар хонадони",
      hostsLabel: "Ҳурмат ва эҳтиром ила:",
      bismillahText: "Бисмиллаҳир Роҳманир Роҳийм",
      poem: "Юракда қувонч-у, дилда орзулар,\nХонадонимизда бугун байрам, тўй.\nЎғлимиз камолин кўрмоқ бахти бор,\nСиз азиз дўстларни чорлайди бу кўй.",
      invitationText: "Муҳтарам ва қадрли меҳмонларимиз!\nСизни хонадонимиз суюклиси, кўзимиз нури бўлмиш ўғлимизнинг суннат тўйи (хатна маросими) муносабати билан ёзилажак файзли тўй дастурхонимизга лутфан таклиф этамиз.\n\nСиз азизларнинг даврамизда бўлишингиз биз учун чексиз шараф ва қувончдир!",
      closingWish: "Дуоларингиз ва ташрифингиздан мамнун бўламиз!",
    },
    ru: {
      title: "Приглашение на Суннат Той",
      defaultCelebrant: "Азизбек",
      defaultHosts: "Семья Мадалиевых",
      hostsLabel: "С искренним уважением:",
      bismillahText: "С именем Всевышнего, Милостивого и Милосердного",
      poem: "Радость в сердце, свет в глазах,\nПраздник в добрых небесах.\nСын растет — надежда наша,\nС вами станет встреча краше!",
      invitationText: "Дорогие и глубокоуважаемые гости!\nС огромной радостью и теплом приглашаем вас разделить с нами благословенный и светлый праздник — Суннат той нашего любимого сына.\n\nВаше присутствие и добрые пожелания станут главным украшением нашего торжества!",
      closingWish: "Будем искренне рады видеть вас среди почетных гостей!",
    },
  },

  nikoh_toyi: {
    uz_latin: {
      title: "Nikoh To'yi Taklifnomasi",
      defaultCelebrant: "Sardorbek & Madinabonu",
      defaultHosts: "Kuyov va Kelinning ota-onalari",
      hostsLabel: "Taklif etuvchilar:",
      bismillahText: "Bismillahi-r-Rahmoni-r-Rahiym",
      poem: "Ikki qalb tutashdi mehr rishtasida,\nOrzular gulladi hayot bog'ida.\nIkki yosh baxtiga guvoh bo'lingiz,\nBiz bilan bo'lingiz visol chog'ida.",
      invitationText: "Qadrli va muhtaram mehmonimiz!\nFarzandlarimiz hayotidagi eng quvonchli va tarixiy voqea — Nikoh visol oqshomi munosabati bilan yoziladigan tantanali to'y dasturxonimizga sizni lutfan taklif etamiz.\n\nSizning tashrifingiz to'yimizga o'zgacha fayz va nur bag'ishlaydi.",
      closingWish: "Ezgu tilaklar va shirin xotiralar ila kutib qolamiz!",
    },
    uz_cyrillic: {
      title: "Никоҳ Тўйи Таклифномаси",
      defaultCelebrant: "Сардорбек & Мадинабону",
      defaultHosts: "Куёв ва Келиннинг ота-оналари",
      hostsLabel: "Таклиф этувчилар:",
      bismillahText: "Бисмиллаҳир Роҳманир Роҳийм",
      poem: "Икки қалб туташди меҳр риштасида,\nОрзулар гуллади ҳаёт боғида.\nИкки ёш бахтига гувоҳ бўлингиз,\nБиз билан бўлингиз висол чоғида.",
      invitationText: "Қадрли ва муҳтарам меҳмонимиз!\nФарзандларимиз ҳаётидаги энг қувончли ва тарихий воқеа — Никоҳ висол оқшоми муносабати билан ёзиладиган тантанали тўй дастурхонимизга сизни лутфан таклиф этамиз.\n\nСизнинг ташрифингиз тўйимизга ўзгача файз ва нур бағишлайди.",
      closingWish: "Эзгу тилаклар ва ширин хотиралар ила кутиб қоламиз!",
    },
    ru: {
      title: "Свадебное Приглашение",
      defaultCelebrant: "Сардор и Мадина",
      defaultHosts: "Родители жениха и невесты",
      hostsLabel: "С любовью и уважением:",
      bismillahText: "С именем Всевышнего, Милостивого и Милосердного",
      poem: "Два сердца бьются в унисон,\nСудьба сплела союз святой.\nПусть будет жизнь прекрасней грёз,\nСогрета верностью, любовью и мечтой.",
      invitationText: "Дорогие друзья и близкие!\nВ этот особенный и незабываемый день создания нашей новой семьи мы от всей души приглашаем вас разделить с нами радость свадебного торжества.\n\nБудем счастливы видеть вас в числе наших самых дорогих гостей!",
      closingWish: "С нетерпением ждем встречи на нашем празднике!",
    },
  },

  qiz_uzatish: {
    uz_latin: {
      title: "Qiz Uzatish Marosimi",
      defaultCelebrant: "Madinabonu",
      defaultHosts: "Kelinning ota-onasi",
      hostsLabel: "Hurmat bilan:",
      bismillahText: "Bismillahi-r-Rahmoni-r-Rahiym",
      poem: "Oq fotiha bilan qizimiz uchar,\nYangi ostonaga baxt yo'lin quchar.\nSiz aziz mehmonlar duosidan so'ng,\nFarog'atli hayot quchog'in ochar.",
      invitationText: "Aziz va qadrli yaqinlarimiz!\nXonadonimiz malikasi, erka gulimiz bo'lgan suyukli qizimizning turmushga chiqishi munosabati bilan o'tkazilayotgan «Qiz uzatish» oqshomiga sizni lutfan taklif etamiz.",
      closingWish: "Duolaringiz bilan qizimiz baxtini butun qiling!",
    },
    uz_cyrillic: {
      title: "Қиз Узатиш Маросими",
      defaultCelebrant: "Мадинабону",
      defaultHosts: "Келиннинг ота-онаси",
      hostsLabel: "Ҳурмат билан:",
      bismillahText: "Бисмиллаҳир Роҳманир Роҳийм",
      poem: "Оқ фотиҳа билан қизимиз учар,\nЯнги остонага бахт йўлин қучар.\nСиз азиз меҳмонлар дуосидан сўнг,\nФароғатли ҳаёт қучоғин очар.",
      invitationText: "Азиз ва қадрли яқинларимиз!\nХонадонимиз маликаси, эрка гулимиз бўлган суюкли қизимизнинг турмушга чиқиши муносабати билан ўтказилаётган «Қиз узатиш» оқшомига сизни лутфан таклиф этамиз.",
      closingWish: "Дуоларингиз билан қизимиз бахтини бутун қилинг!",
    },
    ru: {
      title: "Проводы Невесты (Киз Узатиш)",
      defaultCelebrant: "Мадина",
      defaultHosts: "Родители невесты",
      hostsLabel: "С почтением и уважением:",
      bismillahText: "С именем Всевышнего",
      poem: "Летит голубка в новый светлый дом,\nПусть счастье вечно расцветает в нем.\nБлагословением согрейте наш порог,\nЧтоб легким был её жизненный исток.",
      invitationText: "Дорогие родные и близкие!\nПриглашаем вас на торжественный вечер проводов нашей любимой дочери в новую семейную жизнь. Будем искренне рады вашему благословению и теплым пожеланиям!",
      closingWish: "Ждем вас с открытым сердцем!",
    },
  },

  yubiley: {
    uz_latin: {
      title: "Tavallud Ayyomi & Yubiley",
      defaultCelebrant: "Bahrom Madaliyev (60 yosh)",
      defaultHosts: "Farzandlari va nevaralari",
      hostsLabel: "Farzandlari nomidan:",
      bismillahText: "Bismillahi-r-Rahmoni-r-Rahiym",
      poem: "Umr — oqar daryo, to'la hikmatga,\nYetib keldik shukr ushbu fursatga.\nOta davlatiga, ona mehriga,\nQo'shiling siz ham bu bayram dasturxonga.",
      invitationText: "Qadrli do'stlar, qadrdonlar va mehmonlar!\nSuyukli otamizning tabarruk 60 yoshlik yubiley tantanasi munosabati bilan yozilajak bayram dasturxonimizga taklif etamiz.",
      closingWish: "Xush kelibsiz, aziz mehmon!",
    },
    uz_cyrillic: {
      title: "Таваллуд Айёми & Юбилей",
      defaultCelebrant: "Баҳром Мадалиев (60 ёш)",
      defaultHosts: "Фарзандлари ва неваралари",
      hostsLabel: "Фарзандлари номидан:",
      bismillahText: "Бисмиллаҳир Роҳманир Роҳийм",
      poem: "Умр — оқар дарё, тўла ҳикматга,\nЕтиб келдик шукр ушбу фурсатга.\nОта давлатига, она меҳрига,\nҚўшилинг сиз ҳам бу байрам дастурхонга.",
      invitationText: "Қадрли дўстлар, қадрдонлар ва меҳмонлар!\nСуюкли отамизнинг табаррук 60 ёшлик юбилей тантанаси муносабати билан ёзилажак байрам дастурхонимизга таклиф этамиз.",
      closingWish: "Хуш келибсиз, азиз меҳмон!",
    },
    ru: {
      title: "Юбилейное Торжество",
      defaultCelebrant: "Бахром Мадалиев (60 лет)",
      defaultHosts: "Дети и внуки юбиляра",
      hostsLabel: "С любовью и глубоким уважением:",
      bismillahText: "С именем Всевышнего",
      poem: "Года летят, слагая мудрость лет,\nОставив в сердце негасимый свет.\nПусть этот праздник радость принесет,\nИ в добрый круг друзей нас соберет.",
      invitationText: "Уважаемые друзья и дорогие гости!\nСердечно приглашаем вас отметить вместе с нами знаменательный 60-летний юбилей нашего дорогого юбиляра.",
      closingWish: "Будем счастливы разделить этот радостный день вместе с вами!",
    },
  },

  beshik_toyi: {
    uz_latin: {
      title: "Beshik To'yi Taklifnomasi",
      defaultCelebrant: "Mustafoxon",
      defaultHosts: "Bobosi, buvisi va ota-onasi",
      hostsLabel: "Xonadon ahllari:",
      bismillahText: "Bismillahi-r-Rahmoni-r-Rahiym",
      poem: "Beshik tebranadi mehr ohangida,\nFarishtalar kulib turar yonida.\nJajjigina go'dak quvonchin baham,\nKo'rmoqqa chorlaymiz to'y maydonida.",
      invitationText: "Muhtaram mehmonlar!\nXonadonimizda dunyoga kelgan jajji farzandimizning muborak «Beshik to'yi» tantanasi munosabati bilan yoziladigan xos dasturxonimizga taklif etamiz.",
      closingWish: "Qadamingizga hasanot!",
    },
    uz_cyrillic: {
      title: "Бешик Тўйи Таклифномаси",
      defaultCelebrant: "Мустафохон",
      defaultHosts: "Бобоси, бувиси ва ота-онаси",
      hostsLabel: "Хонадон аҳллари:",
      bismillahText: "Бисмиллаҳир Роҳманир Роҳийм",
      poem: "Бешик тебранади меҳр оҳангида,\nФаришталар кулиб турар ёнида.\nЖажжигина гўдак қувончин баҳам,\nКўрмоққа чорлаймиз тўй майдонида.",
      invitationText: "Муҳтарам меҳмонлар!\nХонадонимизда дунёга келган жажжи фарзандимизнинг муборак «Бешик тўйи» тантанаси муносабати билан ёзиладиган хос дастурхонимизга таклиф этамиз.",
      closingWish: "Қадамингизга ҳасанот!",
    },
    ru: {
      title: "Приглашение на Бешик Той",
      defaultCelebrant: "Мустафа",
      defaultHosts: "Дедушка, бабушка и родители",
      hostsLabel: "С уважением:",
      bismillahText: "С именем Всевышнего",
      poem: "Колыбель качается с любовью и теплом,\nАнгелы хранят наш светлый дом.\nВ честь рождения малыша у нас,\nЖдем с улыбкой в этот добрый час.",
      invitationText: "Дорогие друзья и близкие! Приглашаем вас на светлый семейный праздник — «Бешик той» в честь нашего новорожденного ангелочка.",
      closingWish: "Добро пожаловать в наш дом!",
    },
  },

  fotiha_toyi: {
    uz_latin: {
      title: "Fotiha To'yi Taklifnomasi",
      defaultCelebrant: "Jasur & Shahnoza",
      defaultHosts: "Qudalar xonadoni",
      hostsLabel: "Ehtirom bilan:",
      bismillahText: "Bismillahi-r-Rahmoni-r-Rahiym",
      poem: "Fotiha qilindi, dillar bog'landi,\nYaxshi niyat ila qadam qo'yildi.\nIlohim baxt kelsin ikki yosh sari,\nQutlug' qadam bilan xonadon to'ldi.",
      invitationText: "Qadrli do'stlar va qondoshlar! Farzandlarimizning ezgu niyatlar bilan boshlangan Fotiha to'yi marosimi sharafiga yoziladigan dasturxonimizga taklif etamiz.",
      closingWish: "Tashrifingiz xursandchiligimizga quvonch qo'shadi!",
    },
    uz_cyrillic: {
      title: "Фотиҳа Тўйи Таклифномаси",
      defaultCelebrant: "Жасур & Шаҳноза",
      defaultHosts: "Қудалар хонадони",
      hostsLabel: "Эҳтиром билан:",
      bismillahText: "Бисмиллаҳир Роҳманир Роҳийм",
      poem: "Фотиҳа қилинди, диллар боғланди,\nЯхши ният ила қадам қўйилди.\nИлоҳим бахт келсин икки ёш сари,\nҚутлуғ қадам билан хонадон тўлди.",
      invitationText: "Қадрли дўстлар ва қондошлар! Фарзандларимизнинг эзгу ниятлар билан бошланган Фотиҳа тўйи маросими шарафига ёзиладиган дастурхонимизга таклиф этамиз.",
      closingWish: "Ташрифингиз хурсандчилигимизга қувонч қўшади!",
    },
    ru: {
      title: "Помолвка (Фотиха Той)",
      defaultCelebrant: "Жасур и Шахноза",
      defaultHosts: "Семьи жениха и невесты",
      hostsLabel: "С уважением:",
      bismillahText: "С именем Всевышнего",
      poem: "Светлые клятвы и добрый союз,\nКрепче на свете нет преданных уз.\nВместе разделим волнующий час,\nВстретим с теплом и вниманием вас.",
      invitationText: "Дорогие друзья и родственники! С искренней радостью приглашаем вас на церемонию помолвки (Фотиха той) наших детей.",
      closingWish: "Ждем вас с нетерпением!",
    },
  },
};
