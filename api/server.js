// api/server.js - БЕСПЛАТНЫЙ AI через OpenRouter
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

// === ВАШ КЛЮЧ OPENROUTER ===
// ⚠️ ВАЖНО: После запуска удалите этот ключ из публичного чата!
const OPENROUTER_API_KEY =
  "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";

// Инициализация клиента OpenRouter
const client = new OpenAI({
  apiKey: OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Legal Services NSK",
  },
});

// Системный промпт для AI
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

// Основной маршрут AI
app.post("/api/analyze-problem", async (req, res) => {
  const userProblem = req.body.query?.trim();

  if (!userProblem || userProblem.length < 3) {
    return res.json({
      professionalService: "Консультация",
      originalQuery: userProblem || "",
      mode: "недостаточно данных",
    });
  }

  try {
    console.log(`🤖 AI анализирует: "${userProblem.substring(0, 50)}..."`);

    const response = await client.chat.completions.create({
      model: "google/gemma-2-2b-it:free", // БЕСПЛАТНАЯ модель
      messages: [
        { role: "system", content: professionalServices },
        { role: "user", content: `Проблема клиента: "${userProblem}"` },
      ],
      max_tokens: 20,
      temperature: 0.1,
    });

    const aiResponse = response.choices[0].message.content.trim();
    console.log(`✅ AI определил: "${aiResponse}"`);

    res.json({
      professionalService: aiResponse,
      originalQuery: userProblem,
      mode: "openrouter-ai",
    });
  } catch (error) {
    console.error("❌ Ошибка OpenRouter:", error.message);

    // Fallback на эмулятор если AI не работает
    const fallbackResult = emulateAI(userProblem);
    res.json({
      professionalService: fallbackResult,
      originalQuery: userProblem,
      mode: "эмулятор (fallback)",
    });
  }
});

// Эмулятор AI на случай ошибок
function emulateAI(query) {
  const queryLower = query.toLowerCase();

  if (
    queryLower.includes("долг") ||
    queryLower.includes("деньг") ||
    queryLower.includes("задолж")
  )
    return "Взыскание задолженности";
  if (
    queryLower.includes("затоп") ||
    queryLower.includes("потоп") ||
    queryLower.includes("залив") ||
    queryLower.includes("сосед")
  )
    return "Возмещение ущерба от залива";
  if (
    queryLower.includes("кредит") ||
    queryLower.includes("банкрот") ||
    queryLower.includes("коллектор") ||
    queryLower.includes("заём")
  )
    return "Банкротство физических лиц";
  if (
    queryLower.includes("дтп") ||
    queryLower.includes("авари") ||
    queryLower.includes("страхов") ||
    queryLower.includes("авто")
  )
    return "Юридическое сопровождение при ДТП";
  if (
    queryLower.includes("развод") ||
    queryLower.includes("семь") ||
    queryLower.includes("алимент") ||
    queryLower.includes("брак")
  )
    return "Семейно-правовое консультирование";
  if (
    queryLower.includes("застройщик") ||
    queryLower.includes("квартир") ||
    queryLower.includes("недвижим") ||
    queryLower.includes("новострой")
  )
    return "Сопровождение сделок с недвижимостью";
  if (
    queryLower.includes("зарплат") ||
    queryLower.includes("работ") ||
    queryLower.includes("увольн") ||
    queryLower.includes("трудов")
  )
    return "Трудовое право и защита прав работников";
  if (
    queryLower.includes("брак") ||
    queryLower.includes("товар") ||
    queryLower.includes("магазин") ||
    queryLower.includes("возврат")
  )
    return "Защита прав потребителей";

  return "Консультация";
}

// Проверка сервера
app.get("/api/health", (req, res) => {
  res.json({
    status: "✅ Работает",
    provider: "OpenRouter AI",
    model: "google/gemma-2-2b-it:free",
    freeQuota: "Да, бесплатно",
    note: "API ключ активен",
  });
});

// Простой тест
app.get("/api/test-query", async (req, res) => {
  try {
    const testResponse = await client.chat.completions.create({
      model: "google/gemma-2-2b-it:free",
      messages: [{ role: "user", content: "Ответь 'Готов к работе!'" }],
      max_tokens: 10,
    });

    res.json({
      test: "✅ AI подключен",
      response: testResponse.choices[0].message.content,
      keyStatus: "активен",
    });
  } catch (error) {
    res.json({
      test: "❌ Ошибка подключения",
      error: error.message,
      suggestion: "Проверьте ключ или попробуйте позже",
    });
  }
});

// Запуск сервера
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║     🚀 AI СЕРВЕР С ВАШИМ КЛЮЧОМ         ║
╠══════════════════════════════════════════╣
║ 📍 Порт: ${PORT}                         
║ 🔗 Здоровье: http://localhost:${PORT}/api/health
║ 🔗 Тест AI: http://localhost:${PORT}/api/test-query
║                                          
║ 🆓 Модель: google/gemma-2-2b-it:free    
║ 📊 Бесплатный лимит: ~10,000 запросов   
║                                          
║ ⚠️  ВАЖНО: УДАЛИТЕ КЛЮЧ ИЗ ЧАТА!        
╚══════════════════════════════════════════╝
    `);
  console.log("🔄 Сервер запущен. Тестируйте запросы...");
});
