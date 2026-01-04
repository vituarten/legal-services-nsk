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

      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero с срочностью */}
          <div className="max-w-5xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6 relative">
              <Icon name="AlertTriangle" size={48} className="text-red-600" />
              <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                {currentHour}ч
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Взыскание ущерба от ДТП:
              <span className="text-red-600"> время против вас</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Виновник уже скрывает имущество? Ущерб больше лимита ОСАГО?
              <br />
              <span className="font-bold">
                Каждый день бездействия стоит вам{" "}
                {Math.round(lossAmount / daysPassed).toLocaleString()} ₽
              </span>
            </p>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 mb-8 inline-block border-2 border-red-200">
              <p className="text-2xl font-bold text-red-700 mb-2">
                ⚠️ Ваши текущие потери: {lossAmount.toLocaleString()} ₽
              </p>
              <p className="text-gray-600">
                и увеличиваются на 625 ₽ каждый час
              </p>
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-lg px-8 py-6 shadow-lg"
              onClick={() => handleConsultation("hero")}
            >
              <Icon name="ShieldAlert" size={24} className="mr-2" />
              Остановить потери — бесплатный анализ
            </Button>
            <p className="mt-4 text-gray-500">
              📞 Звонок через 90 секунд • Анализ документов за 15 минут • 0 ₽
              предоплаты
            </p>
          </div>

          {/* Таймлайн потерь (новая фишка) */}
          <div className="max-w-4xl mx-auto mb-16 bg-white rounded-2xl p-6 border-2 border-red-200 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Icon name="Clock" className="text-red-600 mr-3" size={28} />
              Часы тикают: где вы сейчас?
            </h2>

            <div className="relative">
              <div className="absolute left-0 right-0 top-4 h-2 bg-gray-200" />

              <div className="flex justify-between relative">
                {timelineEvents.map((event, idx) => (
                  <div key={idx} className="flex flex-col items-center w-1/5">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 z-10 border-4 ${
                        daysPassed >= event.day
                          ? "bg-white border-red-500 ring-4 ring-red-100"
                          : "bg-gray-100 border-gray-300"
                      }`}
                    >
                      <span
                        className={`font-bold ${daysPassed >= event.day ? "text-red-600" : "text-gray-500"}`}
                      >
                        {event.day}
                      </span>
                    </div>
                    <div className="text-center px-1">
                      <p
                        className={`text-sm font-bold mb-1 ${daysPassed >= event.day ? "text-red-700" : "text-gray-600"}`}
                      >
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-500">{event.loss}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="absolute top-3 w-4 h-4 bg-red-600 rounded-full -ml-2 z-20"
                style={{ left: `${(daysPassed / 30) * 100}%` }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                    Вы здесь
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-red-50 rounded-xl">
              <p className="text-center text-gray-700">
                <span className="font-bold text-red-600">Внимание:</span> Если
                вы уже на {daysPassed}-м дне, виновник{" "}
                <span className="font-bold">уже начал скрывать имущество</span>.
                Завтра будет поздно.
              </p>
            </div>
          </div>

          {/* Ситуации (из первой версии) */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Когда нужно действовать{" "}
              <span className="text-red-600">немедленно</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: "BanknoteIcon",
                  title: "Ущерб превышает 400 000 ₽",
                  desc: "Страховая выплатила максимум, но на ремонт нужно больше",
                  urgency: "🔥 Высокая: виновник испугается большой суммы",
                },
                {
                  icon: "UserX",
                  title: "У виновника нет страховки",
                  desc: "Полиса ОСАГО нет или он просрочен",
                  urgency: "⚡ Критическая: прячет имущество прямо сейчас",
                },
                {
                  icon: "AlertCircle",
                  title: "Алкоголь или нарушение ПДД",
                  desc: "Страховка виновника не покроет ущерб",
                  urgency: "⚠️ Срочная: пытается скрыть доказательства",
                },
                {
                  icon: "Heart",
                  title: "Вред здоровью",
                  desc: "Нужна компенсация лечения и морального вреда",
                  urgency: "⏳ Высокая: медицинские документы имеют сроки",
                },
                {
                  icon: "Package",
                  title: "Повреждён груз",
                  desc: "В аварии пострадали перевозимые вещи или товар",
                  urgency: "⚡ Критическая: товар теряет срок годности",
                },
                {
                  icon: "Clock",
                  title: "Простой транспорта",
                  desc: "Такси или грузовик не работает — теряете доход",
                  urgency: "💰 Ежедневные потери: считайте упущенную выгоду",
                },
              ].map((situation, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border-2 border-red-100 hover:border-red-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon
                        name={situation.icon}
                        size={24}
                        className="text-red-600"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {situation.title}
                        </h3>
                        <span className="text-xs font-bold px-2 py-1 bg-red-100 text-red-700 rounded-full">
                          {situation.urgency.split(" ")[0]}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{situation.desc}</p>
                      <p className="text-sm text-red-600 font-medium">
                        {situation.urgency}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Процесс (из первой версии, но с акцентом на скорость) */}
          <div className="max-w-5xl mx-auto mb-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Как мы останавливаем потерю денег
            </h2>
            <div className="space-y-6">
              {[
                {
                  num: "01",
                  title: "Экстренная заморозка активов (24 часа)",
                  desc: "Срочно подаём ходатайства, чтобы виновник не успел продать имущество",
                },
                {
                  num: "02",
                  title: "Мгновенный сбор доказательств (48 часов)",
                  desc: "Находим утерянные записи камер, свидетелей, фиксируем все повреждения до ремонта",
                },
                {
                  num: "03",
                  title: "Агрессивная досудебная работа (72 часа)",
                  desc: "Давление через все инстанции: страховая, ГИБДД, угроза уголовной ответственности",
                },
                {
                  num: "04",
                  title: "Взыскание до копейки (от 30 дней)",
                  desc: "Добиваемся реального перевода денег на ваш счёт, а не просто решения суда",
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="flex items-start gap-6 bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <div className="text-4xl font-bold opacity-50">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="opacity-90">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Что мы взыскиваем (из первой версии) */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Что мы взыскиваем{" "}
              <span className="text-green-600">дополнительно</span>
            </h2>
            <div className="bg-white rounded-2xl p-8 border-2 border-green-200 shadow-lg">
              <div className="space-y-4">
                {[
                  {
                    item: "Стоимость ремонта автомобиля",
                    amount: "по экспертизе",
                    extra: "Базовое",
                  },
                  {
                    item: "Утрата товарной стоимости (УТС)",
                    amount: "5-15% от стоимости авто",
                    extra: "+100-300 тыс. ₽",
                  },
                  {
                    item: "Эвакуатор и хранение",
                    amount: "фактические расходы",
                    extra: "+",
                  },
                  {
                    item: "Упущенная выгода (для такси/грузовиков)",
                    amount: "расчёт по доходам",
                    extra: "+1 500 ₽/день",
                  },
                  {
                    item: "Моральный вред при вреде здоровью",
                    amount: "от 100 000 ₽",
                    extra: "+",
                  },
                  {
                    item: "Расходы на лечение",
                    amount: "по документам",
                    extra: "+",
                  },
                  {
                    item: "Судебные расходы и госпошлина",
                    amount: "полностью",
                    extra: "Вернём",
                  },
                  {
                    item: "Услуги юриста",
                    amount: "взыскиваем с ответчика",
                    extra: "Для вас 0 ₽",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
                  >
                    <div>
                      <span className="text-gray-700 font-medium">
                        {item.item}
                      </span>
                      {item.extra && (
                        <span className="ml-2 text-green-600 text-sm font-bold">
                          {item.extra}
                        </span>
                      )}
                    </div>
                    <span className="text-orange-600 font-bold">
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                <p className="text-center text-gray-700">
                  <span className="font-bold text-green-600">Итог:</span>{" "}
                  Обычный водитель взыскивает только ремонт.
                  <span className="font-bold">
                    {" "}
                    Наши клиенты получают на 40-150% больше.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Кейсы с акцентом на скорость (комбинация) */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Что было бы, если бы они{" "}
              <span className="text-red-600">ждали</span>
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Mercedes после лобового столкновения",
                  situation:
                    "Виновник без страховки, начал продавать квартиру на 7-й день",
                  action: "Мы подали заявление о заморозке сделки на 5-й день",
                  result:
                    "Взыскали 2 127 000 ₽, квартира виновника под арестом",
                  saved: "Спасено: 2 127 000 ₽",
                  time: "Начали на 5-й день",
                },
                {
                  title: "Повреждение груза электроники",
                  situation: "Виновник планировал банкротство через 20 дней",
                  action:
                    "Арестовали счета и запретили банкротство на 15-й день",
                  result:
                    "Взыскали 2 640 000 ₽, деньги переведены до банкротства",
                  saved: "Спасено: 2 640 000 ₽",
                  time: "Начали на 15-й день",
                },
                {
                  title: "Такси — простой 45 дней",
                  situation: "Виновник сменил работу и уволился на 10-й день",
                  action: "Подали иск и арестовали зарплату на 8-й день",
                  result: "Взыскали 312 000 ₽, удержали из последней зарплаты",
                  saved: "Спасено: 312 000 ₽",
                  time: "Начали на 8-й день",
                },
              ].map((case_item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {case_item.title}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
                      {case_item.time}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-red-700 font-medium">
                        ⚠️ Что было бы:
                      </p>
                      <p className="text-red-600">{case_item.situation}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-green-700 font-medium">
                        ✅ Что сделали:
                      </p>
                      <p className="text-green-600">{case_item.action}</p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-2xl font-bold text-green-600">
                          {case_item.saved}
                        </p>
                        <p className="text-gray-600">{case_item.result}</p>
                      </div>
                      <Icon
                        name="CheckCircle"
                        size={32}
                        className="text-green-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Финальный CTA с срочностью */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-10 text-white mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                <Icon name="Shield" size={40} />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                У вас ещё есть шанс всё исправить
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Но он уменьшается на 625 ₽ каждый час
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/20 p-4 rounded-xl">
                  <div className="text-3xl font-bold">98%</div>
                  <div>дел выигрываем</div>
                </div>
                <div className="bg-white/20 p-4 rounded-xl">
                  <div className="text-3xl font-bold">0 ₽</div>
                  <div>предоплаты от вас</div>
                </div>
                <div className="bg-white/20 p-4 rounded-xl">
                  <div className="text-3xl font-bold">24ч</div>
                  <div>до заморозки активов виновника</div>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 text-xl px-10 py-6 font-bold shadow-2xl"
                onClick={() => handleConsultation("final")}
              >
                <Icon name="Phone" size={28} className="mr-3" />
                Бесплатный анализ моей ситуации
              </Button>
              <p className="mt-6 text-sm opacity-75">
                📄 Проверим документы • 📊 Посчитаем реальную сумму • ⚖️
                Расскажем про риски
              </p>
            </div>

            <div className="bg-gray-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Почему нельзя ждать "ещё немного"?
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start">
                  <Icon
                    name="X"
                    size={20}
                    className="text-red-500 mr-3 mt-1 flex-shrink-0"
                  />
                  <span>Виновник успеет продать/подарить имущество</span>
                </div>
                <div className="flex items-start">
                  <Icon
                    name="X"
                    size={20}
                    className="text-red-500 mr-3 mt-1 flex-shrink-0"
                  />
                  <span>Потеряете УТС (15% от стоимости авто)</span>
                </div>
                <div className="flex items-start">
                  <Icon
                    name="X"
                    size={20}
                    className="text-red-500 mr-3 mt-1 flex-shrink-0"
                  />
                  <span>Свидетели забудут детали, камеры сотрут записи</span>
                </div>
                <div className="flex items-start">
                  <Icon
                    name="X"
                    size={20}
                    className="text-red-500 mr-3 mt-1 flex-shrink-0"
                  />
                  <span>
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
