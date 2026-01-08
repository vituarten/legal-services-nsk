"use client";

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

export default function FloodDamagePage() {
  const [userData, setUserData] = useState({ name: "", phone: "" });
  const [checklist, setChecklist] = useState<number[]>([]);
  const [timeOnSite, setTimeOnSite] = useState(0);

  const CITY_PHONE = "+7 (383) 235-95-05";
  const CITY_PHONE_RAW = "+738322359505";
  const TG_LINK = "https://t.me/ваш_логин";
  const MAX_LINK = "https://max.me/ваша_компания";

  // Таймер для естественной срочности
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnSite((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData.name || !userData.phone) {
      alert("Пожалуйста, заполните имя и телефон");
      return;
    }
    const message = `Заявка на консультацию по заливу:%0AИмя: ${userData.name}%0AТелефон: ${userData.phone}`;
    // Перенаправляем в Telegram для мгновенной связи
    window.open(`https://t.me/share/url?url=${message}`, "_blank");
    alert(`Спасибо, ${userData.name}! Открываем Telegram для быстрой связи.`);
  };

  const checklistItems = [
    {
      id: 1,
      text: "Составили акт о заливе?",
      tip: "Без акта шансы на компенсацию падают на 80%",
    },
    {
      id: 2,
      text: "Виновник признаёт вину?",
      tip: "Если нет — нужна особенная стратегия",
    },
    {
      id: 3,
      text: "Ущерб больше 100 000 ₽?",
      tip: "От суммы зависит способ взыскания",
    },
    {
      id: 4,
      text: "Прошло больше 3 дней?",
      tip: "Доказательства со временем теряют силу",
    },
  ];

  const guiltyParties = [
    {
      type: "Сосед",
      icon: "👤",
      risk: "Может не платить, даже если признаёт вину",
      solution: "Даём шаблон претензии с расчётом неустойки",
    },
    {
      type: "Управляющая компания",
      icon: "🏢",
      risk: "Будет занижать сумму или перекладывать вину",
      solution: "Помогаем составить жалобу в Жилищную инспекцию",
    },
    {
      type: "Застройщик",
      icon: "🏗️",
      risk: "Затянет решение на месяцы в рамках гарантии",
      solution:
        "Составляем требование с ссылками на закон о долевом строительстве",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Бесплатная консультация юриста по заливу квартиры в Новосибирске
        </title>
        <meta
          name="description"
          content={`Затопили соседи? Получите бесплатную консультацию юриста и пошаговый план действий за 20 минут. ${CITY_PHONE}`}
        />
      </Helmet>

      {/* ГЛАВНЫЙ ЭКРАН */}
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Шапка с триггером */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm mb-6">
                <span className="animate-pulse">●</span> Онлайн • Консультация 0
                ₽ • Договор в Telegram
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Бесплатно разберём вашу ситуацию с заливом
                <span className="block text-3xl md:text-4xl text-blue-600 mt-4">
                  и дадим пошаговый план
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                За 20 минут вы узнаете: какие документы готовить, как общаться с
                виновником и сколько можно взыскать.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Левая колонка: Форма и контакты */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl border-2 border-blue-200 p-8 shadow-xl">
                  <div className="text-center mb-8">
                    <div className="text-5xl font-black text-green-600 mb-2">
                      0 ₽
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Консультация юриста
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Оставьте контакты, перезвоним в течение 15 минут
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        required
                        value={userData.name}
                        onChange={(e) =>
                          setUserData({ ...userData, name: e.target.value })
                        }
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Как к вам обращаться?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Телефон для связи
                      </label>
                      <input
                        type="tel"
                        required
                        value={userData.phone}
                        onChange={(e) =>
                          setUserData({ ...userData, phone: e.target.value })
                        }
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder={CITY_PHONE}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all text-lg shadow-lg hover:shadow-xl"
                    >
                      Получить бесплатный план действий
                    </button>

                    <div className="text-center text-sm text-gray-500 pt-4 border-t">
                      <p>✅ Консультация ни к чему не обязывает</p>
                      <p>✅ Сразу скажем, можно ли взыскать деньги</p>
                    </div>
                  </form>
                </div>

                {/* Блок связи */}
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl border-2 border-gray-300 p-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-center">
                    Или свяжитесь сразу:
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <a
                      href={TG_LINK}
                      target="_blank"
                      className="p-4 bg-[#0088cc] text-white rounded-xl flex flex-col items-center justify-center hover:bg-[#007ab8] transition-colors"
                    >
                      <div className="text-2xl mb-2">✈️</div>
                      <div className="text-sm font-medium">Telegram</div>
                    </a>
                    <a
                      href={MAX_LINK}
                      target="_blank"
                      className="p-4 bg-gradient-to-r from-[#FF3366] to-[#FF6633] text-white rounded-xl flex flex-col items-center justify-center hover:opacity-90 transition-opacity"
                    >
                      <div className="text-2xl mb-2 font-bold">M</div>
                      <div className="text-sm font-medium">MAX</div>
                    </a>
                    <a
                      href={`tel:${CITY_PHONE_RAW}`}
                      className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl flex flex-col items-center justify-center hover:from-green-600 hover:to-emerald-700 transition-all"
                    >
                      <div className="text-2xl mb-2">📞</div>
                      <div className="text-sm font-medium">Позвонить</div>
                    </a>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-4">
                    Отвечаем в мессенджерах 24/7
                  </p>
                </div>
              </div>

              {/* Правая колонка: Чек-лист и информация */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl border-2 border-blue-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Ответьте на 4 вопроса
                  </h2>
                  <div className="space-y-4">
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
                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${checklist.includes(item.id) ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">
                            {item.text}
                          </span>
                          <div
                            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${checklist.includes(item.id) ? "border-green-500 bg-green-500" : "border-gray-400"}`}
                          >
                            {checklist.includes(item.id) && (
                              <span className="text-white text-sm">✓</span>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mt-3">
                          {item.tip}
                        </div>
                      </div>
                    ))}
                  </div>

                  {timeOnSite > 30 && (
                    <div className="mt-8 p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">⏱️</div>
                        <div>
                          <div className="font-bold text-amber-900">
                            Вы уже изучили проблему {timeOnSite} секунд
                          </div>
                          <div className="text-sm text-amber-800">
                            Самое время получить конкретный план вместо чтения
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Блок "Кто виноват" */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Кто вас затопил? Стратегия зависит от ответа
                  </h3>
                  <div className="space-y-6">
                    {guiltyParties.map((party, idx) => (
                      <div
                        key={idx}
                        className="bg-white/70 rounded-xl p-5 border border-blue-200"
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div className="text-3xl">{party.icon}</div>
                          <div>
                            <div className="font-bold text-gray-900">
                              {party.type}
                            </div>
                            <div className="text-sm text-red-600">
                              Риск: {party.risk}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Решение:</span>{" "}
                          {party.solution}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-blue-300/50">
                    <p className="text-center text-gray-700 font-medium">
                      На консультации разберём ваш случай и дадим шаблоны
                      документов
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* СЕКЦИЯ ПРОЦЕССА */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Как проходит консультация
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Звонок или сообщение
                </h3>
                <p className="text-gray-600">
                  Связываемся в течение 15 минут в удобном вам мессенджере
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Разбор ситуации
                </h3>
                <p className="text-gray-600">
                  Анализируем ваши документы, объясняем права и риски
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  План действий
                </h3>
                <p className="text-gray-600">
                  Даём пошаговую инструкцию и шаблоны необходимых документов
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ФИНАЛЬНЫЙ CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Бесплатно ≠ Бесполезно
            </h2>
            <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto">
              Это ваш шанс получить профессиональную оценку ситуации, прежде чем
              совершить ошибку, которая обойдётся в десятки тысяч рублей.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-full mb-6">
                <span className="text-green-300">✅</span>
                <span className="font-medium">
                  Консультация ни к чему не обязывает
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() =>
                    document
                      .querySelector("form")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all text-lg"
                >
                  Получить план бесплатно
                </button>
                <a
                  href={`tel:${CITY_PHONE_RAW}`}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all text-lg"
                >
                  Позвонить {CITY_PHONE}
                </a>
              </div>
            </div>

            <p className="text-white/60 text-sm">
              Новосибирск и область • Консультация 0 ₽ • Работаем через
              Telegram/MAX • Отвечаем 24/7
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
