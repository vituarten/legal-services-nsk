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
                <div className="bg-white rounded-2xl border-2 border-blue-200 p-8 shadow-xl relative">
                  {/* Декоративный элемент для акцента */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-1 rounded-full text-sm font-semibold">
                    Главная форма заявки
                  </div>

                  <div className="text-center mb-8 pt-4">
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
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
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
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                        placeholder={CITY_PHONE}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-lg shadow-lg hover:shadow-xl shadow-blue-200"
                    >
                      Получить бесплатный план действий
                    </button>

                    <div className="text-center text-sm text-gray-500 pt-4 border-t">
                      <p className="flex items-center justify-center gap-2">
                        <span className="text-green-500">✓</span> Консультация
                        ни к чему не обязывает
                      </p>
                      <p className="flex items-center justify-center gap-2 mt-1">
                        <span className="text-green-500">✓</span> Сразу скажем,
                        можно ли взыскать деньги
                      </p>
                    </div>
                  </form>
                </div>

                {/* Блок связи - УЛУЧШЕННЫЙ ДИЗАЙН */}
                <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 text-center">
                    Или свяжитесь сразу:
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Telegram */}
                    <a
                      href={TG_LINK}
                      target="_blank"
                      className="group p-4 bg-[#0088cc] text-white rounded-xl flex flex-col items-center justify-center hover:bg-[#0077b5] active:scale-[0.98] transition-all duration-200 shadow hover:shadow-md"
                    >
                      <svg
                        className="w-7 h-7 mb-2 group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.139l-1.67 7.894c-.126.569-.452.71-.916.443l-2.537-1.87-1.223 1.18c-.135.135-.248.248-.508.248l.18-2.569 4.714-4.26c.205-.186-.045-.289-.317-.104l-5.826 3.673-2.513-.785c-.548-.17-.56-.548.115-.812l9.846-3.793c.456-.18.855.112.71.812z" />
                      </svg>
                      <div className="text-sm font-medium">Telegram</div>
                      <div className="text-xs opacity-80 mt-1">
                        Отвечаем быстро
                      </div>
                    </a>

                    {/* MAX */}
                    <a
                      href={MAX_LINK}
                      target="_blank"
                      className="group p-4 bg-gradient-to-br from-[#FF3366] via-[#FF3366] to-[#FF6633] text-white rounded-xl flex flex-col items-center justify-center hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow hover:shadow-md"
                    >
                      <div className="relative w-7 h-7 mb-2">
                        <div className="absolute inset-0 bg-white rounded-full flex items-center justify-center">
                          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FF3366] to-[#FF6633] font-bold text-lg">
                            M
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-medium">MAX</div>
                      <div className="text-xs opacity-80 mt-1">Для звонков</div>
                    </a>

                    {/* Телефон */}
                    <a
                      href={`tel:${CITY_PHONE_RAW}`}
                      className="group p-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl flex flex-col items-center justify-center hover:from-gray-900 hover:to-black active:scale-[0.98] transition-all duration-200 shadow hover:shadow-md"
                    >
                      <svg
                        className="w-7 h-7 mb-2 group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <div className="text-sm font-medium">Позвонить</div>
                      <div className="text-xs opacity-80 mt-1">
                        Прямо сейчас
                      </div>
                    </a>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-4 flex items-center justify-center gap-2">
                    <span className="text-green-500">●</span> Отвечаем в
                    мессенджерах 24/7
                  </p>
                </div>
              </div>

              {/* Правая колонка: Чек-лист и информация */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl border-2 border-blue-100 p-8 shadow-sm">
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
                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:border-blue-300 hover:shadow-sm ${
                          checklist.includes(item.id)
                            ? "border-green-500 bg-green-50 shadow-sm"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">
                            {item.text}
                          </span>
                          <div
                            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                              checklist.includes(item.id)
                                ? "border-green-500 bg-green-500 shadow-sm"
                                : "border-gray-300"
                            }`}
                          >
                            {checklist.includes(item.id) && (
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mt-3 pl-1">
                          {item.tip}
                        </div>
                      </div>
                    ))}
                  </div>

                  {timeOnSite > 30 && (
                    <div className="mt-8 p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl animate-pulse">
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
                <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Кто вас затопил? Стратегия зависит от ответа
                  </h3>
                  <div className="space-y-6">
                    {guiltyParties.map((party, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl p-5 border border-blue-100 hover:border-blue-300 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div className="text-3xl bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                            {party.icon}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">
                              {party.type}
                            </div>
                            <div className="text-sm text-red-600 font-medium">
                              Риск: {party.risk}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                          <span className="font-semibold text-blue-700">
                            Решение:
                          </span>{" "}
                          {party.solution}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-blue-200">
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
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4 border-2 border-blue-200">
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
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4 border-2 border-blue-200">
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
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4 border-2 border-blue-200">
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
      <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Бесплатно ≠ Бесполезно
            </h2>
            <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
              Это ваш шанс получить профессиональную оценку ситуации, прежде чем
              совершить ошибку, которая обойдётся в десятки тысяч рублей.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-full mb-6">
                <svg
                  className="w-5 h-5 text-green-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
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
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-lg shadow-lg hover:shadow-xl shadow-green-900/30"
                >
                  Получить план бесплатно
                </button>
                <a
                  href={`tel:${CITY_PHONE_RAW}`}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-lg shadow-lg hover:shadow-xl shadow-blue-900/30"
                >
                  Позвонить {CITY_PHONE}
                </a>
              </div>
            </div>

            <p className="text-blue-300/70 text-sm">
              Новосибирск и область • Консультация 0 ₽ • Работаем через
              Telegram/MAX • Отвечаем 24/7
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
