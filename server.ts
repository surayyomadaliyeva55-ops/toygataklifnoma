import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialise GoogleGenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface GenerateTextRequest {
  eventType: string; // 'ogil_toy' | 'nikoh_toyi' | 'qiz_uzatish' | 'yubiley' | 'beshik_toyi' | 'fotiha_toyi';
  childOrCoupleName: string;
  hosts: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
  venueAddress: string;
  language: 'uz_latin' | 'uz_cyrillic' | 'ru';
  tone?: string;
  specialWishes?: string;
}

app.post('/api/generate-invitation-text', async (req, res) => {
  try {
    const data = req.body as GenerateTextRequest;
    const {
      eventType = "ogil_toy",
      childOrCoupleName = "Azizbek",
      hosts = "Karimovlar xonadoni",
      eventDate = "2026-10-25",
      eventTime = "18:00",
      venueName = "Versal to'yxonasi",
      venueAddress = "Toshkent shahri",
      language = "uz_latin",
      tone = "traditional_poem",
      specialWishes = "",
    } = data;

    const langInstructions = {
      uz_latin: "Matnni O'zbek tili (Lotin alifbosi)da yozing. To'g'ri o'zbek imlosi (o', g', sh, ch) ishlatilsin.",
      uz_cyrillic: "Матнни Ўзбек тили (Кирилл алифбоси)да ёзинг. Чиройли миллий ва самимий бўлсин (ў, қ, ғ, ҳ ҳарфлари тўғри ишлатилсин).",
      ru: "Текст напишите на русском языке в изысканном, торжественном и душевном свадебном стиле.",
    };

    const eventNames = {
      ogil_toy: "O'g'il to'y / Sunnat to'yi (Xatna to'y)",
      nikoh_toyi: "Nikoh to'yi (Visol oqshomi)",
      qiz_uzatish: "Qiz uzatish marosimi",
      yubiley: "Yubiley / Tavallud to'yi",
      beshik_toyi: "Beshik to'yi",
      fotiha_toyi: "Fotiha to'yi",
    };

    const prompt = `
Siz tantanalar va to'ylar uchun eng nafis, ta'sirchan va zamonaviy taklifnomalar yozuvchi shoir va mutaxassissiz.
Quyidagi ma'lumotlar asosida taklifnoma matnini tayyorlang:
- To'y turi: ${eventNames[eventType as keyof typeof eventNames] || eventType}
- Bosh qahramon (bolaning ismi / kuyov-kelin / yubilyar): ${childOrCoupleName}
- Taklif etuvchilar / xonadon egalari: ${hosts}
- Sana: ${eventDate}
- Vaqt: ${eventTime}
- Manzil / To'yxona: ${venueName}, ${venueAddress}
- Til talabi: ${langInstructions[language] || langInstructions.uz_latin}
- Uslub: ${tone}
${specialWishes ? `- Qo'shimcha istaklar: ${specialWishes}` : ''}

Quyidagi JSON formatda faqat yaroqli JSON qaytaring (hech qanday markdown \`\`\`json belgisiz, faqat toza JSON obyekti):
{
  "headerTitle": "Taklifnoma sarlavhasi (masalan, 'Taklifnoma' yoki 'Суннат Тўйига Таклифнома' yoki 'Приглашение')",
  "bismillahText": "Diniy/an'anaviy xushomad (masalan: 'Bismillahi-r-Rahmoni-r-Rahiym' yoki 'Бисмиллаҳир Роҳманир Роҳийм' yoki 'С именем Всевышнего' yoki bo'sh satr)",
  "poem": "To'y mavzusiga mos 2-4 qatorli samimiy va chiroyli she'riy misralar (qatorlar orasida \\n bilan)",
  "mainInvitation": "To'yga taklif qiluvchi asosiy matn (aziz mehmonlarni lutfan to'y dasturxonimizga taklif etamiz mazmunida)",
  "hostsLabel": "Taklif etuvchi iborasi (masalan: 'Hurmat bilan: ' yoki 'Ҳурмат билан: ' yoki 'С уважением: ')",
  "hostsNames": "${hosts}",
  "schedule": [
    { "time": "${eventTime}", "label": "Tantanali bazm boshlanishi" }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text?.trim() || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      // Clean possible fences if any
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Gemini invitation text error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate invitation text',
    });
  }
});

// Setup Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
