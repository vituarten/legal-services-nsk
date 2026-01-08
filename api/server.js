// server.js
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai'); // Используем совместимый SDK
require('dotenv').config(); // Для загрузки ключа из .env файла

const app = express();
app.use(cors());
app.use(express.json());

// Инициализируем клиент DeepSeek. API совместимо с OpenAI[citation:2][citation:3].
const client = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY, // Ключ из переменной окружения
    baseURL: 'https://api.deepseek.com' // Эндпоинт DeepSeek[citation:2]
});

// Ваш список услуг на профессиональном языке (для контекста AI)
const professionalServices = `
Я юридическая компания. Сопоставь проблему клиента с одной из моих профессиональных услуг.
Вот список моих услуг в строгом деловом стиле:
1. Взыскание задолженности
2. Возмещение ущерба от залива
3. Банкротство физических лиц
4. Юридическое сопровождение при ДТП
5. Семейно-правовое консультирование
6. Сопровождение сделок с недвижимостью
7. Трудовое право и защита прав работников
8. Защита прав потребителей

Отвечай ТОЛЬКО названием одной подходящей услуги из этого списка, без пояснений.
Если запрос неясен или не подходит, ответь: "Консультация".
`;

app.post('/api/analyze-problem', async (req, res) => {
    const userProblem = req.body.query; // Получаем запрос от пользователя

    if (!userProblem) {
        return res.status(400).json({ error: 'Запрос не может быть пустым' });
    }

    try {
        // Отправляем запрос в DeepSeek[citation:2]
        const response = await client.chat.completions.create({
            model: "deepseek-chat", // Используем чат-модель[citation:2][citation:8]
            messages: [
                { role: "system", content: professionalServices },
                { role: "user", content: `Проблема клиента: "${userProblem}"` }
            ],
            max_tokens: 50,
            temperature: 0.3 // Для более предсказуемых ответов
        });

        const aiServiceName = response.choices[0].message.content.trim();
        res.json({ professionalService: aiServiceName });

    } catch (error) {
        console.error('Ошибка DeepSeek API:', error);
        res.status(500).json({ error: 'Ошибка при анализе запроса' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));