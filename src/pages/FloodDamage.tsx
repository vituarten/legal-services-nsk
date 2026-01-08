"use client";

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

export default function FloodDamagePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "free",
  });
  const [checklist, setChecklist] = useState([1, 2, 3]);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const CITY_PHONE = "+7 (383) 235-95-05";
  const CITY_PHONE_RAW = "+738322359505";
  const TELEGRAM_LINK = "https://t.me/ваш_логин"; // ЗАМЕНИТЕ
  const MAX_LINK = "https://max.me/ваша_компания"; // ЗАМЕНИТЕ

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const service =
      formData.service === "free"
        ? "бесплатную консультацию"
        : "анализ документов за 1 500 ₽";
    alert(
      `Спасибо, ${formData.name}! Мы свяжемся с вами в течение 15 минут для ${service}.`,
    );
  };

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

  const faqItems = [
    {
      q: "Чем консультация отличается от анализа за 1500₽?",
      a: "Консультация (0₽) — устные ответы на вопросы и общий план. Анализ (1500₽) — детальная проверка ВАШИХ документов, поиск ошибок, из-за которых могут занизить сумму, и письменные рекомендации по их исправлению.",
    },
    {
      q: "Как быстро начнется работа?",
      a: "Сразу после вашего согласия. Договор вышлем в Telegram/MAX или на почту. Подписать его можно онлайн за 5 минут. Мы на связи 24/7 для любых вопросов.",
    },
    {
      q: "Вы находите ошибки в документах?",
      a: "В 9 из 10 случаев находим минимум 3-5 ошибок или упущений (нет подписи, не указан скрытый ущерб, неверные формулировки). Каждая ошибка — риск потерять 10-30% от суммы компенсации.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Профессиональный разбор залива в Новосибирске | Консультация 0₽ или
          анализ 1500₽
        </title>
        <meta
          name="description"
          content={`Затопили соседи? Узнайте, что делать. Бесплатная консультация или анализ ваших документов за 1500₽. Договор онлайн. ${CITY_PHONE}`}
        />
      </Helmet>

      {/* === 1. HERO: Главный оффер и форма === */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Затопили квартиру в Новосибирске?
              <br />
              <span className="text-2xl md:text-3xl text-gray-700">
                Узнайте за 15 минут, как получить максимум
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              <span className="font-bold text-green-600">Бесплатно</span>{" "}
              разберем вашу ситуацию или за{" "}
              <span className="font-bold text-blue-600">1 500 ₽</span> найдем
              ошибки в документах, из-за которых вы теряете деньги.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Левая часть: Выбор услуги и форма */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-xl">
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  {
                    id: "free",
                    title: "БЕСПЛАТНО",
                    desc: "Консультация и план",
                    price: "0 ₽",
                  },
                  {
                    id: "paid",
                    title: "АНАЛИЗ ДОКУМЕНТОВ",
                    desc: "Проверка на ошибки",
                    price: "1 500 ₽",
                  },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setFormData({ ...formData, service: s.id })}
                    className={`p-6 rounded-xl border-2 text-center transition-all ${formData.service === s.id ? "border-blue-500 bg-blue-50 shadow-inner" : "border-gray-300 hover:border-gray-400"}`}
                  >
                    <div className="text-3xl font-black mb-2">{s.price}</div>
                    <div className="font-bold mb-1">{s.title}</div>
                    <div className="text-sm text-gray-600">{s.desc}</div>
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Как к вам обращаться? *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Телефон для связи *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder={CITY_PHONE}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
                >
                  {formData.service === "free"
                    ? "▶ Получить бесплатный план действий"
                    : "📄 Заказать анализ документов за 1 500 ₽"}
                </button>
                <p className="text-center text-sm text-gray-500">
                  Нажимая, вы соглашаетесь на обработку данных.{" "}
                  <span className="font-semibold">Спам не присылаем.</span>
                </p>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">
                  Свяжитесь удобным способом:
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href={TELEGRAM_LINK}
                    target="_blank"
                    className="p-3 bg-[#0088cc] text-white rounded-lg flex flex-col items-center justify-center hover:bg-[#007ab8] transition-colors"
                  >
                    <div className="text-xl mb-1">✈️</div>
                    <div className="text-sm font-medium">Telegram</div>
                  </a>
                  <a
                    href={MAX_LINK}
                    target="_blank"
                    className="p-3 bg-gradient-to-r from-[#FF3366] to-[#FF6633] text-white rounded-lg flex flex-col items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    <div className="text-xl mb-1 font-bold">M</div>
                    <div className="text-sm font-medium">MAX</div>
                  </a>
                  <a
                    href={`tel:${CITY_PHONE_RAW}`}
                    className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg flex flex-col items-center justify-center hover:from-green-600 hover:to-emerald-700 transition-all"
                  >
                    <div className="text-xl mb-1">📞</div>
                    <div className="text-sm font-medium">Позвонить</div>
                  </a>
                </div>
              </div>
            </div>

            {/* Правая часть: Чек-лист и блок доверия */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border-2 border-blue-200 p-8">
                <h2 className="text-2xl font-bold mb-6">
                  Что уже сделано? Отметьте:
                </h2>
                <div className="space-y-4 mb-8">
                  {checklistItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() =>
                        setChecklist((prev) =>
                          prev.includes(item.id)
                            ? prev.filter((i) => i !== item.id)
                            : [...prev, item.id],
                        )
                      }
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${checklist.includes(item.id) ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
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
                            ВАЖНО ДЛЯ КОМПЕНСАЦИИ
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    Ваш прогресс сбора доказательств:
                  </div>
                  <div className="text-3xl font-black text-blue-600">
                    {checklist.length}/{checklistItems.length}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Чем больше пунктов, тем выше шансы на полную компенсацию
                  </div>
                </div>
              </div>

              {/* Блок про онлайн-договор и поддержку */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">⚡</span> Начните работу сегодня
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <div>
                      <strong>Договор онлайн.</strong> Подпишите дистанционно за
                      5 минут. Юридическая сила как у бумажного.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <div>
                      <strong>Поддержка 24/7.</strong> Отвечаем на вопросы в
                      Telegram, MAX или по телефону в любое время.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <div>
                      <strong>Фокус на результат.</strong> Не просто
                      консультация, а конкретный план по увеличению вашей
                      компенсации.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === 2. БЛОК СРАВНЕНИЯ УСЛУГ === */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Что выбрать: консультацию или анализ?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl border-2 border-green-300 p-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl font-black text-green-600 mb-2">
                    0 ₽
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Бесплатная консультация
                  </h3>
                  <p className="text-gray-600">
                    Идеально, если вы в начале пути
                  </p>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "Устный разбор ситуации за 20-30 минут",
                    "Объяснение ваших прав и возможностей",
                    "Пошаговый план действий именно для вашего случая",
                    "Ответы на общие вопросы",
                    "Рекомендация: нужен ли анализ документов",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setFormData({ ...formData, service: "free" });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  Получить консультацию
                </button>
              </div>

              <div className="bg-white rounded-2xl border-2 border-blue-400 p-8 shadow-xl relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-full">
                    САМАЯ ВЫГОДНАЯ
                  </span>
                </div>
                <div className="text-center mb-6">
                  <div className="text-4xl font-black text-blue-600 mb-2">
                    1 500 ₽
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Анализ документов
                  </h3>
                  <p className="text-gray-600">
                    Если уже есть документы и нужен результат
                  </p>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "Проверка акта, переписки, фото на ошибки",
                    "Поиск упущений, из-за которых занизят сумму",
                    "Письменное заключение с конкретными рекомендациями",
                    "Расчет, сколько вы можете потерять из-за ошибок",
                    "План по увеличению итоговой суммы взыскания",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setFormData({ ...formData, service: "paid" });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Заказать анализ
                </button>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-8">
              Не знаете, что выбрать? Начните с бесплатной консультации — мы
              подскажем.
            </p>
          </div>
        </div>
      </section>

      {/* === 3. FAQ (Сомневаетесь?) === */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Сомневаетесь? Отвечаем
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div
                  key={idx}
                  className="border-2 border-gray-300 rounded-2xl overflow-hidden"
                >
                  <button
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.q}
                    </h3>
                    <span className="text-2xl text-gray-400 flex-shrink-0">
                      {activeFaq === idx ? "−" : "+"}
                    </span>
                  </button>
                  {activeFaq === idx && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === 4. ФИНАЛЬНЫЙ CTA === */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Не теряйте время — теряйте сомнения
            </h2>
            <p className="text-xl mb-10 text-white/80">
              Каждый день бездействия может стоить вам тысяч рублей из-за
              упущенных деталей.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setFormData({ ...formData, service: "free" });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all text-lg"
              >
                Получить бесплатный план
              </button>
              <button
                onClick={() => {
                  setFormData({ ...formData, service: "paid" });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all text-lg border-2 border-cyan-400/30"
              >
                Проверить документы за 1 500 ₽
              </button>
            </div>
            <p className="mt-8 text-white/70 text-sm">
              Новосибирск и область • Договор онлайн • Поддержка 24/7 в Telegram
              и MAX • Работаем с 2016 года
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
