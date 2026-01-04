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
              Почему деньги за вашу разбитую машину всё ещё у виновника?
              <br />
              <span className="text-red-600">
                Мы заставим его заплатить. Первый шаг — бесплатный анализ,
                который покажет, как заблокировать его счета в течение 72 часов.
              </span>
            </h1>

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
              Получить расчёт суммы и план на первые 72 часа — 0 ₽
            </Button>
            <p className="mt-4 text-gray-500">
              📞 Звонок через 90 секунд • Анализ документов за 15 минут • 0 ₽
              предоплаты
            </p>
          </div>

          {/* Блок "Проблема" с акцентом на потери */}
          <div className="max-w-4xl mx-auto mb-16 bg-white rounded-2xl p-6 border-2 border-red-200 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Icon name="Clock" className="text-red-600 mr-3" size={28} />
              Цена каждого дня ожидания
            </h2>

            <p className="text-gray-700 mb-6">
              Пока вы надеетесь на совесть виновника, он действует по чёткому
              плану, чтобы оставить вас ни с чем:
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="bg-red-100 text-red-800 font-bold px-3 py-1 rounded mr-4">
                  День 1-3
                </div>
                <p className="text-gray-700">
                  Ищет лжесвидетелей и готовит алиби.{" "}
                  <span className="font-bold text-red-600">
                    Ваши шансы на свидетелей тают.
                  </span>
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-red-100 text-red-800 font-bold px-3 py-1 rounded mr-4">
                  День 4-7
                </div>
                <p className="text-gray-700">
                  Переписывает автомобиль и имущество на родственников.{" "}
                  <span className="font-bold text-red-600">
                    Взыскивать скоро будет нечего.
                  </span>
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-red-100 text-red-800 font-bold px-3 py-1 rounded mr-4">
                  День 8+
                </div>
                <p className="text-gray-700">
                  Подаёт на фиктивное банкротство.{" "}
                  <span className="font-bold text-red-600">
                    Решение суда превратится в бесполезную бумажку.
                  </span>
                </p>
              </div>
            </div>

            <div className="p-4 bg-red-50 rounded-xl border-l-4 border-red-500">
              <p className="text-center text-gray-700">
                <span className="font-bold text-red-600">Итог:</span> Вы теряете
                до 15% стоимости авто (УТС), несёте убытки за простой и
                оплачиваете ремонт из своего кармана.
                <span className="font-bold"> Время работает против вас.</span>
              </p>
            </div>
          </div>

          {/* Блок "Решение" - наш алгоритм */}
          <div className="max-w-5xl mx-auto mb-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Наш алгоритм действий: от вашего звонка до денег на счёте
            </h2>
            <div className="space-y-6">
              {[
                {
                  num: "01",
                  title: "СРОЧНЫЙ АУДИТ (24 часа)",
                  desc: "Анализируем все документы, вычисляем полную сумму (ремонт, УТС, упущенная выгода) и находим все активы виновника.",
                },
                {
                  num: "02",
                  title: "ПРЕВЕНТИВНЫЙ УДАР (72 часа)",
                  desc: "Подаём иск и ходатайство об аресте его счетов, автомобиля и доли в имуществе. Лишаем его возможности что-либо скрыть.",
                },
                {
                  num: "03",
                  title: "ВЗЫСКАНИЕ ПОД КЛЮЧ",
                  desc: "Ведём дело в суде, а после решения — контролируем приставов до момента, когда компенсация поступит на ваш счёт.",
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
            <p className="text-center mt-8 text-white/80">
              Вы получаете не «юридическую помощь», а{" "}
              <span className="font-bold">гарантированный результат</span> и
              полное спокойствие.
            </p>
          </div>

          {/* Блок "УТП" - наши услуги 0 ₽ */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Наши услуги для вас — 0 ₽. Все расходы взыскиваем с виновника.
            </h2>
            <div className="bg-white rounded-2xl p-8 border-2 border-green-200 shadow-lg">
              <div className="text-center mb-6">
                <p className="text-gray-700 text-lg">
                  Это не рекламный слоган, а пункт в нашем договоре. Вы ничего
                  не платите заранее. Наши гонорары, госпошлина, работа эксперта
                  — всё это мы заявляем к взысканию с проигравшей стороны.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-xl text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    0 ₽
                  </div>
                  <p className="font-bold text-gray-900">предоплаты от вас</p>
                  <p className="text-gray-600 text-sm mt-2">
                    Начинаем работу без аванса
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    98%
                  </div>
                  <p className="font-bold text-gray-900">
                    дел в пользу клиентов
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Статистика за 2023-2024 год
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    72ч
                  </div>
                  <p className="font-bold text-gray-900">до ареста активов</p>
                  <p className="text-gray-600 text-sm mt-2">
                    Максимальный срок первого удара
                  </p>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-center text-gray-700">
                  <span className="font-bold text-yellow-700">
                    Ваш финансовый риск равен нулю.
                  </span>{" "}
                  Вы платите только в случае нашего успеха, а успех — это 98%
                  наших дел.
                </p>
              </div>
            </div>
          </div>

          {/* Финальный CTA */}
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

              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 text-xl px-10 py-6 font-bold shadow-2xl"
                onClick={() => handleConsultation("final")}
              >
                <Icon name="Phone" size={28} className="mr-3" />
                Получить расчёт суммы и план на первые 72 часа — 0 ₽
              </Button>
              <p className="mt-6 text-sm opacity-75">
                📞 Звонок через 90 секунд • 📄 Анализ документов • ⚖️ Пошаговый
                план • Без спама и навязывания
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
