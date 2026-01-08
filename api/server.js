const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

// === ВАШ API-КЛЮЧ ВСТРОЕН ПРЯМО В КОД ===
const DEEPSEEK_API_KEY = "sk-f01f52cdf3dd4a59854e3dded97bbe07";

// Инициализация клиента DeepSeek
const client = new OpenAI({
  apiKey: DEEPSEEK_API_KEY, // Ваш ключ прямо здесь
  baseURL: "https://api.deepseek.com",
});

// Список услуг для контекста AI
const professionalServices = `
Ты — AI-помощник юридической компании. Твоя задача — анализировать описание проблемы от клиента и точно сопоставлять его с одной из предоставляемых услуг.

СПИСОК УСЛУГ (используй ТОЛЬКО эти формулировки):
1. Взыскание задолженности
2. Возмещение ущерба от залива
3. Банкротство физических лиц
4. Юридическое сопровождение при ДТП
5. Семейно-правовое консультирование
6. Сопровождение сделок с недвижимостью
7. Трудовое право и защита прав работников
8. Защита прав потребителей

ИНСТРУКЦИЯ:
1. Проанализируй запрос пользователя.
2. Определи, какая услуга из списка выше наиболее точно соответствует проблеме.
3. Верни в ответе ТОЛЬКО точное название этой услуги из списка.
4. Не добавляй пояснений, номеров, точек, кавычек или других символов.
5. Если запрос неясен, неоднозначен или не соответствует ни одной услуге, верни "Консультация".
`;

// Основной маршрут для анализа проблемы
app.post("/api/analyze-problem", async (req, res) => {
  const userProblem = req.body.query;

  if (!userProblem || userProblem.trim().length === 0) {
    return res.status(400).json({
      error: "Пустой запрос",
      professionalService: "Консультация",
    });
  }

  try {
    console.log(`🔍 AI анализирует запрос: "${userProblem}"`);

    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: professionalServices },
        { role: "user", content: `Проблема клиента: "${userProblem.trim()}"` },
      ],
      max_tokens: 30,
      temperature: 0.1,
    });

    const aiServiceName = response.choices[0].message.content.trim();
    console.log(`✅ AI определил: "${aiServiceName}"`);

    res.json({
      professionalService: aiServiceName,
      originalQuery: userProblem,
    });
  } catch (error) {
    console.error("❌ Ошибка DeepSeek API:", error.message);
    res.status(500).json({
      error: "Внутренняя ошибка сервера",
      professionalService: "Консультация",
    });
  }
});

// Тестовый маршрут для проверки работы сервера
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Сервер AI-поиска работает",
    apiKey: DEEPSEEK_API_KEY ? "✅ Настроен" : "❌ Отсутствует",
    timestamp: new Date().toISOString(),
  });
});

// Простой тестовый маршрут для быстрой проверки
app.get("/api/test", async (req, res) => {
  try {
    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "user", content: "Ответь 'Работает!' если ты доступен" },
      ],
      max_tokens: 10,
    });

    res.json({
      test: "✅ AI работает",
      aiResponse: response.choices[0].message.content,
    });
  } catch (error) {
    res.json({
      test: "❌ AI не работает",
      error: error.message,
    });
  }
});

// Запуск сервера
const PORT = 3001;
app.listen(PORT, () => {
  console.log("=".repeat(50));
  console.log(`✅ Сервер AI-поиска запущен на порту ${PORT}`);
  console.log(`🔗 Проверка сервера: http://localhost:${PORT}/api/health`);
  console.log(`🔗 Тест AI: http://localhost:${PORT}/api/test`);
  console.log("=".repeat(50));
});
