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
  const [diagnosisStep, setDiagnosisStep] = useState(0);
  const [diagnosisAnswers, setDiagnosisAnswers] = useState({});
  const [daysPassed, setDaysPassed] = useState(5); // Пример: 5 дней с ДТП
  const [currentHour, setCurrentHour] = useState(0);
  const [lossAmount, setLossAmount] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(90);

  const seo = getSEOConfig("damageClaim");

  // Таймер для диагностики
  useEffect(() => {
    if (diagnosisStep < 3 && timerSeconds > 0) {
      const interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [diagnosisStep, timerSeconds]);

  // Таймер для "часов с ДТП"
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour((prev) => prev + 1);
    }, 10000); // 10 секунд = 1 час
    return () => clearInterval(interval);
  }, []);

  // Расчёт потерь в реальном времени
  useEffect(() => {
    const carValue = 1000000; // Пример: машина за 1 млн
    const dailyLoss = 15000; // Потери в день
    const totalLoss = daysPassed * dailyLoss + currentHour * 625; // 625 ₽ в час
    setLossAmount(totalLoss);
  }, [daysPassed, currentHour]);

  const handleConsultation = (source) => {
    trackCustomGoal("damage_claim_consultation", {
      source: source || "page",
      action: "form_open",
    });
    setShowForm(true);
  };

  const diagnosisQuestions = [
    {
      id: 1,
      text: "Сколько дней прошло с момента ДТП?",
      options: [
        { text: "1-3 дня", risk: "Ещё можно всё исправить", value: 1 },
        { text: "4-7 дней", risk: "Доказательства исчезают", value: 2 },
        { text: "8+ дней", risk: "КРИТИЧЕСКИЙ срок", value: 3 },
      ],
    },
    {
      id: 2,
      text: "Виновник согласен добровольно оплатить ущерб?",
      options: [
        { text: "Да, готов платить", risk: "Низкий риск", value: 1 },
        { text: "Уклоняется/молчит", risk: "Высокий риск", value: 2 },
        { text: "Отказывается/угрожает", risk: "КРИТИЧЕСКИЙ", value: 3 },
      ],
    },
    {
      id: 3,
      text: "Ваш автомобиль уже в ремонте?",
      options: [
        { text: "Нет, жду", risk: "Можно взыскать УТС", value: 1 },
        {
          text: "Частично отремонтирован",
          risk: "Потеряли часть УТС",
          value: 2,
        },
        {
          text: "Полностью отремонтирован",
          risk: "Потеряли весь УТС",
          value: 3,
        },
      ],
    },
  ];

  const timelineEvents = [
    { day: 0, title: "День ДТП", status: "safe", loss: "0 ₽" },
    {
      day: 3,
      title: "Исчезают доказательства",
      status: "warning",
      loss: "45 000 ₽",
    },
    {
      day: 7,
      title: "Виновник прячет активы",
      status: "danger",
      loss: "105 000 ₽",
    },
    {
      day: 15,
      title: "Точка невозврата УТС",
      status: "critical",
      loss: "225 000 ₽",
    },
    {
      day: 30,
      title: "Банкротство виновника",
      status: "lost",
      loss: "450 000 ₽",
    },
  ];

  const opponentActions = [
    { hour: 2, action: "Ищет способы скрыть алкоголь", completed: true },
    { hour: 6, action: "Договаривается со 'свидетелями'", completed: true },
    {
      hour: 12,
      action: "Снимает деньги со счетов",
      completed: currentHour >= 12,
    },
    {
      hour: 24,
      action: "Переоформляет авто на родственников",
      completed: currentHour >= 24,
    },
    { hour: 48, action: "Берёт микрозаймы", completed: currentHour >= 48 },
    { hour: 72, action: "Начинает банкротство", completed: currentHour >= 72 },
  ];

  const calculateRiskLevel = () => {
    const values = Object.values(diagnosisAnswers);
    const sum = values.reduce((a, b) => a + b, 0);
    if (sum >= 7)
      return {
        level: "КРИТИЧЕСКИЙ",
        color: "red",
        text: "Немедленные действия требуются",
      };
    if (sum >= 5)
      return { level: "ВЫСОКИЙ", color: "orange", text: "Срочно нужна защита" };
    return {
      level: "СРЕДНИЙ",
      color: "yellow",
      text: "Есть риски, нужно действовать",
    };
  };

  const risk = calculateRiskLevel();

  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />

      {/* ЭКСТРЕННАЯ ДИАГНОСТИКА */}
      <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-orange-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Блок 1: Диагностика */}
          <div className="max-w-2xl mx-auto mb-20">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
                <Icon name="AlertTriangle" size={48} className="text-red-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Это <span className="text-red-600">ваша</span> ситуация после
                ДТП?
              </h1>
              <p className="text-xl text-gray-600">
                Ответьте на 3 вопроса — узнайте, сколько денег вы{" "}
                <span className="font-bold">уже потеряли</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-red-100">
              {diagnosisStep < 3 ? (
                <>
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-500">
                        Вопрос {diagnosisStep + 1} из 3
                      </span>
                      <div className="flex items-center text-sm font-medium text-red-600">
                        <Icon name="Clock" size={16} className="mr-1" />⏳{" "}
                        {Math.floor(timerSeconds / 60)}:
                        {String(timerSeconds % 60).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300"
                        style={{ width: `${((diagnosisStep + 1) / 3) * 100}%` }}
                      />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    {diagnosisQuestions[diagnosisStep].text}
                  </h2>

                  <div className="space-y-4">
                    {diagnosisQuestions[diagnosisStep].options.map(
                      (option, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setDiagnosisAnswers({
                              ...diagnosisAnswers,
                              [diagnosisStep]: option.value,
                            });
                            setTimeout(
                              () => setDiagnosisStep(diagnosisStep + 1),
                              300,
                            );
                            setTimerSeconds(90);
                          }}
                          className="w-full text-left p-5 rounded-xl border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-lg">
                              {option.text}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                option.value === 1
                                  ? "bg-green-100 text-green-800"
                                  : option.value === 2
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {option.risk}
                            </span>
                          </div>
                        </button>
                      ),
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                      risk.color === "red"
                        ? "bg-red-100"
                        : risk.color === "orange"
                          ? "bg-orange-100"
                          : "bg-yellow-100"
                    }`}
                  >
                    <Icon
                      name={
                        risk.color === "red" ? "AlertOctagon" : "AlertCircle"
                      }
                      size={40}
                      className={`text-${risk.color}-600`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Уровень риска:{" "}
                    <span className={`text-${risk.color}-600`}>
                      {risk.level}
                    </span>
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg">
                    {risk.text}. Бездействие уже стоило вам{" "}
                    <span className="font-bold text-red-600">
                      {lossAmount.toLocaleString()} ₽
                    </span>
                  </p>
                  <Button
                    size="lg"
                    className={`bg-${risk.color}-600 hover:bg-${risk.color}-700 text-white text-lg px-8 py-6`}
                    onClick={() => handleConsultation("diagnosis")}
                  >
                    <Icon name="ShieldAlert" size={24} className="mr-3" />
                    Получить план защиты
                  </Button>
                  <p className="text-gray-500 mt-4 text-sm">
                    Бесплатный анализ документов • План действий за 15 минут
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Блок 2: Таймлайн потерь */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Часы <span className="text-red-600">тикают</span>: что происходит
              с каждым днем
            </h2>

            <div className="relative">
              {/* Линия времени */}
              <div className="absolute left-0 right-0 top-12 h-1 bg-gray-300 z-0" />

              {/* Текущая позиция */}
              <div
                className="absolute top-10 w-6 h-6 bg-red-600 rounded-full -ml-3 z-10 animate-pulse"
                style={{ left: `${(daysPassed / 30) * 100}%` }}
              >
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                    Вы здесь: {daysPassed} день
                  </div>
                  <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-red-600 mx-auto" />
                </div>
              </div>

              <div className="flex justify-between relative z-20">
                {timelineEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center w-1/5 px-2"
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border-4 ${
                        event.status === "safe"
                          ? "bg-white border-green-400"
                          : event.status === "warning"
                            ? "bg-white border-yellow-400"
                            : event.status === "danger"
                              ? "bg-white border-orange-400"
                              : event.status === "critical"
                                ? "bg-white border-red-400"
                                : "bg-gray-100 border-gray-400"
                      } ${
                        daysPassed >= event.day
                          ? "ring-4 ring-opacity-30 " +
                            (event.status === "safe"
                              ? "ring-green-400"
                              : event.status === "warning"
                                ? "ring-yellow-400"
                                : event.status === "danger"
                                  ? "ring-orange-400"
                                  : "ring-red-400")
                          : ""
                      }`}
                    >
                      <span
                        className={`font-bold text-lg ${
                          daysPassed >= event.day
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {event.day}
                      </span>
                    </div>
                    <div className="text-center">
                      <h4
                        className={`font-bold mb-2 ${
                          daysPassed >= event.day
                            ? "text-gray-900"
                            : "text-gray-600"
                        }`}
                      >
                        {event.title}
                      </h4>
                      <div
                        className={`px-3 py-2 rounded-lg ${
                          daysPassed >= event.day
                            ? "bg-red-50 border border-red-200"
                            : "bg-gray-100"
                        }`}
                      >
                        <p
                          className={`text-sm font-bold ${
                            daysPassed >= event.day
                              ? "text-red-700"
                              : "text-gray-500"
                          }`}
                        >
                          Потеря: {event.loss}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-16">
                <div className="inline-block bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-1 mb-6">
                  <div className="bg-white rounded-xl p-6">
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      Ваши потери на {daysPassed}-й день:
                    </p>
                    <p className="text-4xl font-bold text-red-600 mb-4">
                      {lossAmount.toLocaleString()} ₽
                    </p>
                    <p className="text-gray-600">
                      +{Math.round(lossAmount / daysPassed).toLocaleString()} ₽
                      каждый день
                    </p>
                  </div>
                </div>
                <br />
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-lg px-10 py-6 shadow-lg"
                  onClick={() => handleConsultation("timeline")}
                >
                  <Icon name="StopCircle" size={24} className="mr-3" />
                  Остановить потери на {daysPassed}-м дне
                </Button>
              </div>
            </div>
          </div>

          {/* Блок 3: Действия виновника */}
          <div className="max-w-4xl mx-auto mb-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">
                Пока вы читаете это, виновник делает:
              </h2>
              <p className="text-gray-300 text-xl">
                {currentHour < 72
                  ? `Прошло ${currentHour} часов с ДТП. Вот что уже произошло:`
                  : "Прошло больше 72 часов — самые опасные сценарии уже в работе"}
              </p>
            </div>

            <div className="space-y-4 mb-10">
              {opponentActions.map((action, idx) => (
                <div key={idx} className="flex items-start">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1 ${
                      action.completed ? "bg-red-600" : "bg-gray-700"
                    }`}
                  >
                    {action.completed ? (
                      <Icon name="Check" size={24} />
                    ) : (
                      <span className="font-bold">{action.hour}</span>
                    )}
                  </div>
                  <div
                    className={`flex-1 p-5 rounded-xl ${
                      action.completed
                        ? "bg-red-900/30 border-l-4 border-red-500"
                        : "bg-gray-700/50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">
                        {action.action}
                      </span>
                      {action.completed ? (
                        <span className="bg-red-800 text-red-200 px-3 py-1 rounded-full text-sm">
                          ✅ Уже сделано
                        </span>
                      ) : (
                        <span className="bg-gray-600 text-yellow-300 px-3 py-1 rounded-full text-sm">
                          ⏳ Через {action.hour - currentHour}ч
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-6">
              <h3 className="font-bold text-xl mb-4">
                Ваши шансы на полную выплату:
              </h3>
              <div className="h-6 bg-gray-700 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-1000"
                  style={{ width: `${Math.max(10, 100 - currentHour)}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-300">
                <span>
                  Сейчас:{" "}
                  <span className="font-bold">
                    {Math.max(10, 100 - currentHour)}%
                  </span>
                </span>
                <span className="text-red-300">
                  ▼ Упали на {currentHour}% за {currentHour} часов
                </span>
              </div>
            </div>
          </div>

          {/* Блок 4: Что мы делаем (старый блок, но улучшенный) */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Мы останавливаем этот сценарий за 4 шага
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  step: "01",
                  title: "Экстренная заморозка активов",
                  desc: "В течение 24 часов подаём ходатайство о запрете виновнику продавать имущество",
                  icon: "Freeze",
                },
                {
                  step: "02",
                  title: "Сбор неопровержимых доказательств",
                  desc: "Находим утерянные записи камер, свидетелей, фиксируем все повреждения",
                  icon: "Search",
                },
                {
                  step: "03",
                  title: "Давление через все инстанции",
                  desc: "Параллельно работаем со страховой, ГИБДД, судом и приставами",
                  icon: "Scale",
                },
                {
                  step: "04",
                  title: "Взыскание до последней копейки",
                  desc: "Добиваемся реального перевода денег на ваш счёт, а не просто решения суда",
                  icon: "Banknote",
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {step.step}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Блок 5: Финальный выбор */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-10 text-white mb-10">
              <Icon name="Crosshair" size={64} className="mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6">Выбор за вами:</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-5xl font-bold mb-4">⏳</div>
                  <h3 className="text-xl font-bold mb-3">Ждать и надеяться</h3>
                  <ul className="text-left space-y-2 text-white/90">
                    <li className="flex items-center">
                      <Icon name="X" size={16} className="mr-2 text-red-300" />
                      Виновник скроет все активы
                    </li>
                    <li className="flex items-center">
                      <Icon name="X" size={16} className="mr-2 text-red-300" />
                      Потеряете УТС (100-300 тыс. ₽)
                    </li>
                    <li className="flex items-center">
                      <Icon name="X" size={16} className="mr-2 text-red-300" />
                      Получите "бумажное" решение суда
                    </li>
                  </ul>
                  <div className="mt-6 text-2xl font-bold text-red-200">
                    Итог: -{Math.round(lossAmount * 2).toLocaleString()} ₽
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-yellow-300">
                  <div className="text-5xl font-bold mb-4">⚡</div>
                  <h3 className="text-xl font-bold mb-3">Действовать сейчас</h3>
                  <ul className="text-left space-y-2 text-white/90">
                    <li className="flex items-center">
                      <Icon
                        name="Check"
                        size={16}
                        className="mr-2 text-green-300"
                      />
                      Заморозим имущество виновника
                    </li>
                    <li className="flex items-center">
                      <Icon
                        name="Check"
                        size={16}
                        className="mr-2 text-green-300"
                      />
                      Сохраним УТС (дополнительные 15%)
                    </li>
                    <li className="flex items-center">
                      <Icon
                        name="Check"
                        size={16}
                        className="mr-2 text-green-300"
                      />
                      Доведём до реальных денег на счёте
                    </li>
                  </ul>
                  <div className="mt-6 text-2xl font-bold text-green-300">
                    Итог: +{Math.round(lossAmount * 1.5).toLocaleString()} ₽
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 inline-block">
                <p className="text-gray-900 text-xl mb-4">
                  <span className="font-bold">Бесплатно</span> проанализируем
                  ваши документы и покажем,
                  <span className="text-orange-600 font-bold">
                    {" "}
                    какую именно сумму можно спасти
                  </span>
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-xl px-10 py-6"
                  onClick={() => handleConsultation("final")}
                >
                  <Icon name="Shield" size={28} className="mr-3" />
                  Получить план спасения денег
                </Button>
                <p className="text-gray-600 mt-4 text-sm">
                  Консультация юриста • Расчёт суммы • Пошаговый план • 0 ₽
                </p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">98%</div>
                  <div className="text-gray-700">дел выигрываем в суде</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">0 ₽</div>
                  <div className="text-gray-700">предоплаты от клиента</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">15+</div>
                  <div className="text-gray-700">
                    лет специализируемся на ДТП
                  </div>
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
