"use client";

import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";

export default function FloodDamagePage() {
  // ============ СОСТОЯНИЯ ============
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
    selectedService: "free", // 'free' или 'paid'
  });

  const [checklist, setChecklist] = useState<number[]>([1, 2, 3]);
  const [timeOnSite, setTimeOnSite] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; timestamp: number }>({
    x: 0,
    y: 0,
    timestamp: 0,
  });

  // ============ КОНСТАНТЫ ============
  const CITY_PHONE = "+7 (383) 235-95-05";
  const CITY_PHONE_RAW = "+738322359505";
  const TELEGRAM_LINK = "https://t.me/ваш_логин"; // Замените на ваш
  const MAX_LINK = "https://max.me/ваша_компания"; // Замените на ваш

  // ============ ЭФФЕКТЫ ============
  // Таймер на сайте
  useEffect(() => {
    const timer = setInterval(() => setTimeOnSite((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // ============ ОБРАБОТЧИКИ ============
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceName =
      formData.selectedService === "free"
        ? "бесплатную консультацию"
        : "анализ документов за 1 500 ₽";
    const message = `Здравствуйте! Меня зовут ${formData.name}. 
Телефон: ${formData.phone}.
Хочу заказать: ${serviceName}.
Ситуация: ${formData.description.substring(0, 200)}...`;

    alert(
      `Спасибо! Информация для связи сохранена. Мы свяжемся с вами в течение 30 минут для уточнения деталей.`,
    );
    console.log("Данные для связи:", { ...formData, message });
  };

  const handleChecklistChange = (id: number) => {
    setChecklist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleMessengerClick = (messenger: "telegram" | "max" | "phone") => {
    const serviceText =
      formData.selectedService === "free"
        ? "бесплатную консультацию"
        : "анализ документов (1500 ₽)";
    const baseMessage = `Здравствуйте! Интересует ${serviceText}. Имя: ${formData.name || "не указано"}, Тел: ${formData.phone || "не указан"}. ${formData.description ? `Ситуация: ${formData.description.substring(0, 150)}...` : ""}`;
    const encodedMessage = encodeURIComponent(baseMessage);

    if (messenger === "telegram") {
      window.open(`https://t.me/share/url?url=${encodedMessage}`, "_blank");
    } else if (messenger === "max") {
      window.open(`${MAX_LINK}?text=${encodedMessage}`, "_blank");
    } else {
      window.location.href = `tel:${CITY_PHONE_RAW}`;
    }
  };

  // ============ ДАННЫЕ ============
  const checklistItems = [
    {
      id: 1,
      text: "Остановить протечку и уведомить соседей/УК",
      critical: true,
    },
    {
      id: 2,
      text: "Сфотографировать/снять на видео весь ущерб",
      critical: true,
    },
    {
      id: 3,
      text: "Вызвать представителя УК для составления акта",
      critical: true,
    },
    { id: 4, text: "Детально описать ВСЕ повреждения в акте", critical: false },
    {
      id: 5,
      text: "Получить подпись виновника или акт об отказе",
      critical: true,
    },
    { id: 6, text: "Не начинать ремонт до экспертизы", critical: true },
  ];

  const atFaultParties = [
    {
      type: "Сосед (физическое лицо)",
      pros: [
        "Проще установить вину",
        "Можно взыскать моральный вред",
        "Часто решается досудебно",
      ],
      cons: [
        "Может не иметь средств для выплаты",
        "Может скрываться",
        "Требует личного взыскания",
      ],
      action:
        "Составляем досудебную претензию, при необходимости — иск в мировой суд.",
    },
    {
      type: "Управляющая компания (УК) / ТСЖ",
      pros: [
        "Юридическое лицо, есть средства",
        "Ответственность за общее имущество",
        "Можно взыскать штраф",
      ],
      cons: [
        "Часто уходят от ответственности",
        "Сложные суды с их юристами",
        "Требует экспертизы",
      ],
      action:
        "Требуем официальный ответ, проводим экспертизу, подаем иск с расчетом неустойки.",
    },
    {
      type: "Застройщик (при новостройке)",
      pros: [
        "Гарантийные обязательства",
        "Крупная организация",
        "Можно требовать устранения",
      ],
      cons: [
        "Длительные разбирательства",
        "Требует строительной экспертизы",
        "Сложные договоры",
      ],
      action:
        "Акт с участием представителя УК и строителей, независимая экспертиза, претензия по гарантии.",
    },
  ];

  const services = [
    {
      id: "free",
      title: "БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ",
      price: "0 ₽",
      description: "Общий разбор ситуации и план действий",
      features: [
        "Устный анализ вашего случая за 20-30 минут",
        "Объяснение ваших прав и возможностей",
        "Рекомендации по первым шагам",
        "Ответы на общие вопросы",
        "Предварительная оценка перспектив",
      ],
      whoNeeds:
        "Если вы только столкнулись с проблемой и не знаете, с чего начать",
    },
    {
      id: "paid",
      title: "АНАЛИЗ ДОКУМЕНТОВ",
      price: "1 500 ₽",
      description: "Детальная проверка ваших бумаг с заключением",
      features: [
        "Проверка акта о заливе на ошибки и полноту",
        "Анализ переписки с виновником/УК",
        "Письменное заключение с оценкой рисков",
        "Конкретный план по увеличению суммы взыскания",
        "Рекомендации по независимой экспертизе",
      ],
      whoNeeds: "Если у вас уже есть документы и вы хотите понять их силу",
    },
  ];

  const faqItems = [
    {
      q: "Что именно я получу за 1500 рублей?",
      a: "Вы получаете письменный анализ имеющихся у вас документов (акт, фото, переписка) с конкретными указаниями: какие ошибки исправить, что донести, как общаться с виновником для увеличения итоговой суммы. Это не 'консультация', а работа с вашими документами.",
    },
    {
      q: "Чем анализ отличается от консультации?",
      a: "Консультация (0 ₽) — это устные общие рекомендации: 'ваши права, что делать'. Анализ (1500 ₽) — это изучение ВАШИХ конкретных бумаг, поиск слабых мест, расчет упущенной выгоды и подготовка вас к переговорам или экспертизе.",
    },
    {
      q: "Вы работаете дистанционно?",
      a: "Да. Для консультации нужен только телефон. Для анализа — фото/скан ваших документов, которые можно отправить в Telegram или MAX. Договор и оплата также онлайн.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Юрист по заливу квартиры в Новосибирске | Консультация 0₽ | Анализ
          документов 1500₽
        </title>
        <meta
          name="description"
          content={`Затопили соседа? Бесплатная консультация юриста. Анализ ваших документов - 1500₽. Работаем через Telegram и MAX. ${CITY_PHONE}`}
        />
      </Helmet>

      {/* ============ 1. ГЛАВНЫЙ ЭКРАН ============ */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Затопили квартиру в{" "}
              <span className="text-blue-600">Новосибирске</span>?
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Получите{" "}
              <span className="font-bold text-green-600">
                бесплатную консультацию
              </span>{" "}
              по вашим правам или{" "}
              <span className="font-bold text-blue-600">
                профессиональный анализ документов
              </span>{" "}
              за 1 500 ₽, чтобы не потерять деньги.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
              <span>⏱️</span> Вы на сайте: {Math.floor(timeOnSite / 60)}:
              {(timeOnSite % 60).toString().padStart(2, "0")}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Левая колонка - Выбор услуги и форма */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Выберите, что вам нужно:
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          selectedService: service.id,
                        })
                      }
                      className={`p-6 rounded-xl border-2 text-center transition-all ${formData.selectedService === service.id ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-300 hover:border-gray-400"}`}
                    >
                      <div className="text-3xl font-black mb-2">
                        {service.price}
                      </div>
                      <div className="font-bold mb-2">{service.title}</div>
                      <div className="text-sm text-gray-600">
                        {service.description}
                      </div>
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg"
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg"
                      placeholder={CITY_PHONE}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Кратко о ситуации
                    </label>
                    <textarea
                      className="w-full p-3 border-2 border-gray-200 rounded-lg min-h-[100px]"
                      placeholder="Например: 10 марта залили соседи сверху, повреждены потолок и стены. Акт составили."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
                  >
                    {formData.selectedService === "free"
                      ? "▶ Получить бесплатную консультацию"
                      : "📄 Заказать анализ документов за 1 500 ₽"}
                  </button>
                </form>
              </div>

              {/* Блок быстрой связи */}
              <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl border-2 border-gray-300 p-6">
                <h3 className="text-xl font-bold mb-4">
                  Свяжитесь удобным способом:
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleMessengerClick("telegram")}
                    className="p-4 bg-[#0088cc] text-white rounded-lg flex flex-col items-center justify-center hover:bg-[#007ab8] transition-colors"
                  >
                    <div className="text-2xl mb-2">✈️</div>
                    <div className="text-sm font-medium">Telegram</div>
                  </button>
                  <button
                    onClick={() => handleMessengerClick("max")}
                    className="p-4 bg-gradient-to-r from-[#FF3366] to-[#FF6633] text-white rounded-lg flex flex-col items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    <div className="text-2xl mb-2">M</div>
                    <div className="text-sm font-medium">MAX</div>
                  </button>
                  <button
                    onClick={() => handleMessengerClick("phone")}
                    className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg flex flex-col items-center justify-center hover:from-green-600 hover:to-emerald-700 transition-all"
                  >
                    <div className="text-2xl mb-2">📞</div>
                    <div className="text-sm font-medium">Позвонить</div>
                  </button>
                </div>
                <p className="text-center text-sm text-gray-600 mt-4">
                  Работаем через российский мессенджер MAX и
                  Telegram[citation:1][citation:2][citation:4]
                </p>
              </div>
            </div>

            {/* Правая колонка - Чек-лист и Инфо */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border-2 border-blue-200 p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">
                  Интерактивный чек-лист: что уже сделали?
                </h2>
                <div className="space-y-4 mb-8">
                  {checklistItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleChecklistChange(item.id)}
                      className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${checklist.includes(item.id) ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${checklist.includes(item.id) ? "border-green-500 bg-green-500 text-white" : "border-gray-300"}`}
                      >
                        {checklist.includes(item.id) ? "✓" : ""}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.text}</div>
                        {item.critical && (
                          <div className="text-xs text-red-600 mt-1 font-bold">
                            КРИТИЧЕСКИ ВАЖНО
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    Ваша готовность:
                  </div>
                  <div className="text-3xl font-black text-blue-600">
                    {checklist.length}/{checklistItems.length}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Отметьте выполненные пункты
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-amber-900 mb-4">
                  💰 Почему анализ документов стоит 1500 ₽?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="text-green-600 font-bold mt-0.5">+</div>
                    <div>
                      Находим в среднем{" "}
                      <span className="font-bold">3-5 ошибок</span> в актах
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="text-green-600 font-bold mt-0.5">+</div>
                    <div>
                      Каждая ошибка ={" "}
                      <span className="font-bold">10-30% потерь</span> от суммы
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="text-green-600 font-bold mt-0.5">+</div>
                    <div>
                      Платите один раз,{" "}
                      <span className="font-bold">результат используете</span>{" "}
                      на всех этапах
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. КТО ВИНОВАТ: РАЗБОР ============ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                От кого затопило? Стратегия зависит от виновника
              </h2>
              <p className="text-xl text-gray-600">
                Объясняем простыми словами разницу в подходах
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {atFaultParties.map((party, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-b from-white to-gray-50 rounded-2xl border-2 border-gray-300 p-8 hover:border-blue-400 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    {party.type}
                  </h3>

                  <div className="mb-6">
                    <div className="text-sm font-semibold text-green-700 mb-2">
                      ✓ Плюсы для вас:
                    </div>
                    <ul className="space-y-2">
                      {party.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="text-green-500 mt-1">•</div>
                          <div className="text-sm text-gray-700">{pro}</div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-semibold text-red-700 mb-2">
                      ⚠ Сложности:
                    </div>
                    <ul className="space-y-2">
                      {party.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="text-red-500 mt-1">•</div>
                          <div className="text-sm text-gray-700">{con}</div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <div className="text-sm font-semibold text-blue-700 mb-2">
                      🎯 Наша тактика:
                    </div>
                    <div className="text-sm text-gray-700">{party.action}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="inline-block p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 max-w-2xl">
                <p className="text-lg text-gray-900">
                  <span className="font-bold">
                    На бесплатной консультации мы определяем
                  </span>
                  , кто именно виноват в вашем случае, и даём пошаговый алгоритм
                  действий, специфичный для этой ситуации.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. FAQ ============ */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ответы на вопросы
              </h2>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border-2 border-gray-300 overflow-hidden"
                >
                  <button
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.q}
                    </h3>
                    <div className="text-2xl text-gray-400 flex-shrink-0">
                      {activeFaq === idx ? "−" : "+"}
                    </div>
                  </button>
                  {activeFaq === idx && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. ФИНАЛЬНЫЙ CTA ============ */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Не усложняйте. Начните с бесплатного разбора ситуации
            </h2>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">⚖️</div>
                  <div className="font-bold">Консультация 0₽</div>
                  <div className="text-sm text-white/80">
                    Узнайте свои права и план
                  </div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">📄</div>
                  <div className="font-bold">Анализ 1500₽</div>
                  <div className="text-sm text-white/80">
                    Проверка ваших документов
                  </div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">💬</div>
                  <div className="font-bold">Telegram / MAX</div>
                  <div className="text-sm text-white/80">
                    Удобная связь[citation:2][citation:4][citation:10]
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setFormData((f) => ({ ...f, selectedService: "free" }));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  Бесплатная консультация
                </button>
                <button
                  onClick={() => {
                    setFormData((f) => ({ ...f, selectedService: "paid" }));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all"
                >
                  Анализ документов за 1 500 ₽
                </button>
              </div>
            </div>

            <p className="text-white/70 text-sm">
              Новосибирск • Консультация бесплатно • Анализ документов 1500₽ •
              Договор онлайн
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
