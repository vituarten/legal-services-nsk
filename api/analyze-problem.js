// /api/analyze-problem.js
import { OpenAI } from 'openai';

export const config = {
  runtime: 'edge', // Для Vercel Edge Functions
};

// Ваш ключ OpenRouter (временно в коде, потом перенесите в env)
const OPENROUTER_API_KEY = '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';

const client = new OpenAI({
  apiKey: OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'https://poehali.dev',
    'X-Title': 'Legal Services NSK',
  },
});

const professionalServices = `Ты — AI-помощник юридической компании. Твоя задача — анализировать описание проблемы клиента и точно сопоставлять его с одной из предоставляемых услуг.

СПИСОК УСЛУГ (возвращай ТОЛЬКО эти названия):
1. Взыскание задолженности
2. Возмещение ущерба от залива
3. Банкротство физических лиц
4. Юридическое сопровождение при ДТП
5. Семейно-правовое консультирование
6. Сопровождение сделок с недвижимостью
7. Трудовое право и защита прав работников
8. Защита прав потребителей
9. Консультация (если проблема неясна)

ПРАВИЛА:
- Проблемы о долгах, кредитах, займах → Взыскание задолженности
- Проблемы о заливе квартиры, потопе → Возмещение ущерба от залива
- Проблемы о ДТП, авариях, страховых → Юридическое сопровождение при ДТП
- Проблемы о разводе, детях, алиментах → Семейно-правовое консультирование
- Проблемы о невыплате зарплаты → Трудовое право и защита прав работников
- Проблемы о некачественных товарах → Защита прав потребителей
- Все остальные случаи → Консультация

Возвращай ТОЛЬКО название услуги без пояснений.`;

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Метод не поддерживается' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { query } = await req.json();
    
    if (!query || query.trim().length < 2) {
      return new Response(
        JSON.stringify({ professionalService: 'Консультация', originalQuery: query || '' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`🤖 AI анализирует: "${query.substring(0, 50)}..."`);

    const response = await client.chat.completions.create({
      model: "google/gemma-2-2b-it:free",
      messages: [
        { role: "system", content: professionalServices },
        { role: "user", content: `Проблема клиента: "${query.trim()}"` }
      ],
      max_tokens: 20,
      temperature: 0.1
    });

    const aiResponse = response.choices[0].message.content.trim();
    console.log(`✅ AI определил: "${aiResponse}"`);

    return new Response(
      JSON.stringify({ 
        professionalService: aiResponse, 
        originalQuery: query,
        mode: 'openrouter-ai'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Ошибка OpenRouter:', error.message);
    
    // Fallback на эмулятор
    const query = (await req.json())?.query || '';
    const queryLower = query.toLowerCase();
    let foundService = 'Консультация';
    
    if (queryLower.includes('долг') || queryLower.includes('деньг')) foundService = 'Взыскание задолженности';
    else if (queryLower.includes('затоп') || queryLower.includes('потоп')) foundService = 'Возмещение ущерба от залива';
    else if (queryLower.includes('кредит') || queryLower.includes('банкрот')) foundService = 'Банкротство физических лиц';
    else if (queryLower.includes('дтп') || queryLower.includes('авари')) foundService = 'Юридическое сопровождение при ДТП';
    else if (queryLower.includes('развод')) foundService = 'Семейно-правовое консультирование';
    else if (queryLower.includes('зарплат')) foundService = 'Трудовое право и защита прав работников';
    else if (queryLower.includes('застройщик')) foundService = 'Сопровождение сделок с недвижимостью';
    else if (queryLower.includes('брак') || queryLower.includes('товар')) foundService = 'Защита прав потребителей';
    
    return new Response(
      JSON.stringify({ 
        professionalService: foundService, 
        originalQuery: query,
        mode: 'эмулятор (fallback)'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}