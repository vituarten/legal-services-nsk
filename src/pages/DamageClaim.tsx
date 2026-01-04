import { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOConfig } from "@/utils/seoConfig";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import DTPConsultationModal from "@/components/dtp/DTPConsultationModal";
import ContactBar from "@/components/dtp/ContactBar";
import { trackCustomGoal } from "@/utils/metrika";

const DamageClaim = () => {
  const [showForm, setShowForm] = useState(false);
  const [daysPassed, setDaysPassed] = useState(5);
  const [currentHour, setCurrentHour] = useState(12);
  const [lossAmount, setLossAmount] = useState(75000);

  const seo = getSEOConfig("damageClaim");

  // Эмуляция прошедшего времени
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour((prev) => prev + 1);
      setLossAmount((prev) => prev + 625);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleConsultation = (source) => {
    trackCustomGoal("damage_claim_consultation", {
      source: source || "page",
      action: "form_open",
    });
    setShowForm(true);
  };

  const timelineEvents = [
    { day: 0, title: "День ДТП", status: "safe", loss: "0 ₽" },
    {
      day: 3,
      title: "Доказательства исчезают",
      status: "warning",
      loss: "45 000 ₽",
    },
    {
      day: 7,
      title: "Виновник прячет активы",
      status: "danger",
      loss: "105 000 ₽",
    },
    { day: 15, title: "Потеря УТС", status: "critical", loss: "225 000 ₽" },
    { day: 30, title: "Банкротство", status: "lost", loss: "450 000 ₽" },
  ];

  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />

      {/* Hero с срочностью - ВИЗУАЛЬНО ПЕРЕРАБОТАННЫЙ */}
      <div className="min-h-[90vh] bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-24 pb-16 relative overflow-hidden">
        {/* Новый фоновый элемент для динамики */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500 rounded-full mix-blend-screen filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-screen filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-16">
            {/* Иконка с эффектом "пульсации тревоги" */}
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
              <div className="relative inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-red-600 to-orange-500 rounded-full mb-2 shadow-2xl border-4 border-white/20">
                <Icon
                  name="AlertTriangle"
                  size={56}
                  className="text-white drop-shadow-lg"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full animate-pulse border-2 border-white">
                {currentHour}ч
              </div>
            </div>

            {/* Заголовок с градиентным текстом */}
            <h1 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">
                Почему деньги за вашу разбитую машину
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                всё ещё у виновника?
              </span>
            </h1>

            {/* Подзаголовок с акцентом */}
            <p className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Мы заставим его заплатить.{" "}
              <span className="font-bold text-white">
                Первый шаг — бесплатный анализ,
              </span>{" "}
              который покажет,
              <span className="text-orange-300 font-bold">
                {" "}
                как заблокировать его счета в течение 72 часов.
              </span>
            </p>

            {/* Виджет потерь - переработанный */}
            <div className="relative mb-12 inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="text-5xl font-black text-white mb-2 font-mono tracking-tight">
                      {lossAmount.toLocaleString()} ₽
                    </div>
                    <div className="text-red-300 font-bold text-lg">
                      ВАШИ ПОТЕРИ
                    </div>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-2xl font-black text-white mb-2">
                      <Icon
                        name="TrendingUp"
                        size={28}
                        className="text-red-400 mr-3"
                      />
                      <span className="font-mono">+625 ₽</span>
                    </div>
                    <div className="text-gray-400">каждый час бездействия</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-center text-sm text-gray-400">
                    <Icon name="Clock" size={16} className="mr-2" />
                    <span>Обновляется в реальном времени</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Кнопка CTA с эффектом */}
            <div className="relative">
              <Button
                size="lg"
                className="relative bg-gradient-to-r from-red-600 via-orange-500 to-red-600 hover:from-red-700 hover:via-orange-600 hover:to-red-700 text-white text-2xl font-black px-12 py-8 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-white/20 animate-pulse-slow"
                onClick={() => handleConsultation("hero")}
              >
                <div className="flex items-center justify-center">
                  <div className="mr-4 p-2 bg-white/20 rounded-full">
                    <Icon name="ShieldAlert" size={32} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-black">
                      Получить расчёт суммы и план
                    </div>
                    <div className="text-lg font-bold opacity-90">
                      на первые 72 часа — 0 ₽
                    </div>
                  </div>
                  <Icon name="ArrowRight" size={28} className="ml-6" />
                </div>
              </Button>

              {/* Декоративные элементы вокруг кнопки */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-orange-400 rounded-tl-lg"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-orange-400 rounded-tr-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-red-400 rounded-bl-lg"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-red-400 rounded-br-lg"></div>
            </div>

            {/* Пояснение под кнопкой */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center text-gray-400">
                <Icon name="Phone" size={20} className="mr-3 text-green-400" />
                <span className="font-medium">Звонок через 90 секунд</span>
              </div>
              <div className="flex items-center justify-center text-gray-400">
                <Icon
                  name="FileText"
                  size={20}
                  className="mr-3 text-blue-400"
                />
                <span className="font-medium">
                  Анализ документов за 15 минут
                </span>
              </div>
              <div className="flex items-center justify-center text-gray-400">
                <Icon
                  name="CreditCard"
                  size={20}
                  className="mr-3 text-yellow-400"
                />
                <span className="font-medium">0 ₽ предоплаты</span>
              </div>
            </div>

            {/* Анимированная стрелка вниз */}
            <div className="mt-16 animate-bounce">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20">
                <Icon name="ChevronDown" size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Блок "Проблема" - ВИЗУАЛЬНО ОБНОВЛЁННЫЙ */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-900/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                <span className="bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                  Цена каждого дня ожидания
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Пока вы надеетесь на совесть виновника, он действует по чёткому
                плану, чтобы оставить вас ни с чем:
              </p>
            </div>

            {/* Интерактивный таймлайн */}
            <div className="relative">
              {/* Линия времени */}
              <div className="absolute left-0 right-0 top-8 h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>

              {/* Текущая позиция */}
              <div
                className="absolute top-4 w-8 h-8 bg-gradient-to-br from-red-600 to-orange-500 rounded-full -ml-4 z-20 animate-pulse border-2 border-white shadow-lg"
                style={{ left: `${(daysPassed / 30) * 100}%` }}
              >
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-lg font-bold shadow-xl">
                    Вы здесь: {daysPassed} день
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-600 mx-auto"></div>
                </div>
              </div>

              <div className="flex justify-between relative z-10">
                {timelineEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center w-1/5 px-2"
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border-4 ${
                        daysPassed >= event.day
                          ? "bg-gradient-to-br from-red-600 to-orange-500 border-white/30 shadow-2xl"
                          : "bg-gray-800 border-gray-700"
                      } transition-all duration-500`}
                    >
                      <span
                        className={`text-xl font-bold ${daysPassed >= event.day ? "text-white" : "text-gray-500"}`}
                      >
                        {event.day}
                      </span>
                    </div>
                    <div className="text-center">
                      <h4
                        className={`font-bold text-lg mb-2 ${daysPassed >= event.day ? "text-white" : "text-gray-500"}`}
                      >
                        {event.title}
                      </h4>
                      <div
                        className={`px-4 py-3 rounded-xl ${
                          daysPassed >= event.day
                            ? "bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-500/30"
                            : "bg-gray-800/50"
                        }`}
                      >
                        <p
                          className={`text-lg font-bold ${daysPassed >= event.day ? "text-red-300" : "text-gray-500"}`}
                        >
                          {event.loss}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-20 p-8 bg-gradient-to-r from-gray-900/80 to-black/80 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6 md:mb-0 md:mr-8">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Ваши потери на {daysPassed}-й день:
                    </h3>
                    <p className="text-gray-300">
                      И увеличиваются на 15 000 ₽ каждый следующий день
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-black text-red-400 mb-2 font-mono">
                      {Math.round(daysPassed * 15000).toLocaleString()} ₽
                    </div>
                    <Button
                      className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
                      onClick={() => handleConsultation("timeline")}
                    >
                      <Icon name="StopCircle" className="mr-3" />
                      Остановить потери
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Блок "Решение" - ВИЗУАЛЬНО ОБНОВЛЁННЫЙ */}
      <div className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                <span className="bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                  Наш алгоритм действий
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                От вашего звонка до денег на счёте — мы действуем как
                оперативная группа по финансовой безопасности
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  num: "01",
                  title: "СРОЧНЫЙ АУДИТ",
                  subtitle: "(24 часа)",
                  desc: "Анализируем все документы, вычисляем полную сумму (ремонт, УТС, упущенная выгода) и находим все активы виновника.",
                  icon: "Search",
                },
                {
                  num: "02",
                  title: "ПРЕВЕНТИВНЫЙ УДАР",
                  subtitle: "(72 часа)",
                  desc: "Подаём иск и ходатайство об аресте его счетов, автомобиля и доли в имуществе. Лишаем его возможности что-либо скрыть.",
                  icon: "Shield",
                },
                {
                  num: "03",
                  title: "ВЗЫСКАНИЕ ПОД КЛЮЧ",
                  subtitle: "(до результата)",
                  desc: "Ведём дело в суде, а после решения — контролируем приставов до момента, когда компенсация поступит на ваш счёт.",
                  icon: "CheckCircle",
                },
              ].map((step, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
                  <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                    <div className="flex items-start mb-6">
                      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-3xl font-black w-16 h-16 rounded-xl flex items-center justify-center mr-6">
                        {step.num}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {step.title}
                        </h3>
                        <p className="text-blue-300 font-bold">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-6">{step.desc}</p>
                    <div className="flex items-center text-blue-400">
                      <Icon name={step.icon} size={24} className="mr-3" />
                      <span className="font-medium">Этап завершён</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
                Вы получаете не «юридическую помощь», а{" "}
                <span className="font-bold text-white">
                  гарантированный результат
                </span>{" "}
                и полное спокойствие.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Блок "УТП" - ВИЗУАЛЬНО ОБНОВЛЁННЫЙ */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                  Наши услуги для вас — 0 ₽
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Все расходы взыскиваем с виновника. Это не рекламный слоган, а
                пункт в нашем договоре.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center p-8 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl border border-green-500/20">
                  <div className="text-6xl font-black text-green-400 mb-4">
                    0 ₽
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    предоплаты от вас
                  </h3>
                  <p className="text-gray-300">Начинаем работу без аванса</p>
                </div>
                <div className="text-center p-8 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl border border-blue-500/20">
                  <div className="text-6xl font-black text-blue-400 mb-4">
                    98%
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    дел в пользу клиентов
                  </h3>
                  <p className="text-gray-300">Статистика за 2023-2024 год</p>
                </div>
                <div className="text-center p-8 bg-gradient-to-br from-orange-900/30 to-amber-900/30 rounded-2xl border border-orange-500/20">
                  <div className="text-6xl font-black text-orange-400 mb-4">
                    72ч
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    до ареста активов
                  </h3>
                  <p className="text-gray-300">
                    Максимальный срок первого удара
                  </p>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-2xl border border-yellow-500/30">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="mb-6 md:mb-0 md:mr-8">
                    <Icon
                      name="ShieldCheck"
                      size={64}
                      className="text-yellow-400"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Ваш финансовый риск равен нулю
                    </h3>
                    <p className="text-gray-300 text-lg">
                      Вы платите только в случае нашего успеха, а успех — это
                      98% наших дел. Наши гонорары, госпошлина, работа эксперта
                      — всё это мы заявляем к взысканию с проигравшей стороны.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Финальный CTA - ВИЗУАЛЬНО ОБНОВЛЁННЫЙ */}
      <div className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-3xl blur-xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border border-white/10 shadow-2xl">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-600 to-orange-500 rounded-full mb-8 shadow-2xl">
                  <Icon name="Shield" size={48} className="text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                  <span className="bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                    У вас ещё есть шанс всё исправить
                  </span>
                </h2>
                <p className="text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
                  Но он уменьшается на{" "}
                  <span className="font-bold text-red-400">
                    625 ₽ каждый час
                  </span>
                </p>

                <div className="relative inline-block">
                  <Button
                    size="lg"
                    className="relative bg-gradient-to-r from-red-600 via-orange-500 to-red-600 hover:from-red-700 hover:via-orange-600 hover:to-red-700 text-white text-3xl font-black px-16 py-10 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 animate-pulse-slow"
                    onClick={() => handleConsultation("final")}
                  >
                    <div className="flex items-center">
                      <Icon name="Phone" size={36} className="mr-6" />
                      <div className="text-left">
                        <div className="text-3xl font-black">
                          Получить расчёт суммы и план
                        </div>
                        <div className="text-xl font-bold opacity-90">
                          на первые 72 часа — 0 ₽
                        </div>
                      </div>
                      <Icon name="ArrowRight" size={36} className="ml-10" />
                    </div>
                  </Button>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                  <div className="flex flex-col items-center p-4">
                    <Icon
                      name="Phone"
                      size={28}
                      className="text-green-400 mb-3"
                    />
                    <span className="text-gray-300 font-medium">
                      Звонок через 90 секунд
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4">
                    <Icon
                      name="FileText"
                      size={28}
                      className="text-blue-400 mb-3"
                    />
                    <span className="text-gray-300 font-medium">
                      Анализ документов
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4">
                    <Icon
                      name="CheckSquare"
                      size={28}
                      className="text-purple-400 mb-3"
                    />
                    <span className="text-gray-300 font-medium">
                      Пошаговый план
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4">
                    <Icon
                      name="Ban"
                      size={28}
                      className="text-yellow-400 mb-3"
                    />
                    <span className="text-gray-300 font-medium">Без спама</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 bg-gradient-to-r from-gray-900/80 to-black/80 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-8">
                Почему нельзя ждать "ещё немного"?
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start p-4 bg-gradient-to-r from-red-900/20 to-transparent rounded-xl">
                  <Icon
                    name="X"
                    size={24}
                    className="text-red-500 mr-4 mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-300 text-lg">
                    Виновник успеет продать/подарить имущество
                  </span>
                </div>
                <div className="flex items-start p-4 bg-gradient-to-r from-red-900/20 to-transparent rounded-xl">
                  <Icon
                    name="X"
                    size={24}
                    className="text-red-500 mr-4 mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-300 text-lg">
                    Потеряете УТС (15% от стоимости авто)
                  </span>
                </div>
                <div className="flex items-start p-4 bg-gradient-to-r from-red-900/20 to-transparent rounded-xl">
                  <Icon
                    name="X"
                    size={24}
                    className="text-red-500 mr-4 mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-300 text-lg">
                    Свидетели забудут детали, камеры сотрут записи
                  </span>
                </div>
                <div className="flex items-start p-4 bg-gradient-to-r from-red-900/20 to-transparent rounded-xl">
                  <Icon
                    name="X"
                    size={24}
                    className="text-red-500 mr-4 mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-300 text-lg">
                    Виновник оформит банкротство — взыскать будет не с кого
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactBar onConsultClick={() => handleConsultation("contact_bar")} />
      <DTPConsultationModal
        showForm={showForm}
        onClose={() => setShowForm(false)}
      />
    </>
  );
};

export default DamageClaim;
