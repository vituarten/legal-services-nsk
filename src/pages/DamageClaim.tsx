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
  const [lossAmount, setLossAmount] = useState(85000);
  const seo = getSEOConfig("damageClaim");

  useEffect(() => {
    const timer = setInterval(() => {
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

  // Данные для блоков
  const team = [
    {
      name: "Алексей Семёнов",
      role: "Ведущий юрист по ДТП",
      exp: "9 лет",
      cases: "140+ дел",
      spec: "Специализация: взыскание ущерба с виновника, работа с укрывателями активов.",
      quote:
        "Знаю, как находить скрытые счета и имущество даже у самых хитрых неплательщиков.",
    },
    {
      name: "Мария Колесникова",
      role: "Эксперт по страховым спорам",
      exp: "7 лет",
      cases: "95+ дел",
      spec: "Специализация: оспаривание отказов и занижений страховых, независимая экспертиза.",
      quote:
        "Моя задача - чтобы страховая или виновник заплатили не сколько дадут, а всю сумму по закону.",
    },
  ];

  const prices = [
    {
      service: "Бесплатный анализ документов и стратегии",
      price: "0 ₽",
      desc: "Изучим ваши документы, оценим риски и рассчитаем реальную сумму для взыскания.",
    },
    {
      service: "Подготовка досудебной претензии и работа с виновником",
      price: "от 15 000 ₽",
      desc: "Составим юридически безупречное требование. Часто это заставляет виновника платить без суда.",
    },
    {
      service: "Полное ведение дела в суде (взыскание ущерба)",
      price: "от 40 000 ₽",
      desc: "Включает: иск, арест активов, все заседания, работу с приставами. Гонорар взыскиваем с ответчика.",
    },
    {
      service: "Срочный выезд юриста для фиксации обстоятельств",
      price: "5 000 ₽",
      desc: "Приедем в течение 2 часов, поможем правильно оформить документы на месте ДТП.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Ваш звонок и анализ",
      desc: "Бесплатно изучаем документы. Через 30 минут вы знаете точную сумму к взысканию и план.",
    },
    {
      num: "02",
      title: "Атака на активы (72ч)",
      desc: "Подаем иск и ходатайства об аресте счетов, автомобиля и имущества виновника.",
    },
    {
      num: "03",
      title: "Суд и давление",
      desc: "Проводим переговоры и судебные заседания. 98% наших дел заканчиваются в пользу клиента.",
    },
    {
      num: "04",
      title: "Деньги на вашем счету",
      desc: "Контролируем приставов до момента, когда вся сумма (включая наши услуги) поступит к вам.",
    },
  ];

  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />

      {/* 1. HERO - СРОЧНОСТЬ И БОЛЬ */}
      <div className="min-h-[90vh] bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500 rounded-full mix-blend-screen filter blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
              <div className="relative inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-red-600 to-orange-500 rounded-full shadow-2xl border-4 border-white/20">
                <Icon
                  name="AlertTriangle"
                  size={56}
                  className="text-white drop-shadow-lg"
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">
                Виновник ДТП скрывает активы?
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                Мы заблокируем их счета за 72 часа
              </span>
            </h1>
            <p className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Каждый час ожидания стоит вам денег. Узнайте, как взыскать полную
              сумму с виновника - ремонт, УТС 15%, моральный вред и упущенную
              выгоду.
            </p>
            <div className="relative mb-12 inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl blur opacity-70"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
                <div className="text-center">
                  <div className="text-5xl font-black text-white mb-2 font-mono">
                    {lossAmount.toLocaleString()} ₽
                  </div>
                  <div className="text-red-300 font-bold text-lg">
                    ВАШИ ПОТЕРИ РАСТУТ
                  </div>
                  <p className="text-gray-400 mt-2">
                    +625 ₽ каждый час бездействия
                  </p>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              className="relative bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white text-2xl font-black px-12 py-8 rounded-2xl shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-white/20 animate-pulse-slow"
              onClick={() => handleConsultation("hero")}
            >
              <div className="flex items-center justify-center">
                <Icon name="ShieldAlert" size={32} className="mr-4" />
                <div className="text-left">
                  <div className="text-2xl font-black">
                    Бесплатно проанализировать мой случай
                  </div>
                  <div className="text-lg font-bold opacity-90">
                    и получить план на 72 часа - 0 ₽
                  </div>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* 2. КОМАНДА ЭКСПЕРТОВ */}
      <div className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
              <span className="bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                Ваше дело в руках узких специалистов
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-10 mb-16">
              {team.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
                >
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                        {member.name.split(" ")[0].charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {member.name}
                      </h3>
                      <p className="text-blue-300 font-bold mb-1">
                        {member.role}
                      </p>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm">
                          Опыт: {member.exp}
                        </span>
                        <span className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm">
                          Дела: {member.cases}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4">{member.spec}</p>
                      <div className="p-4 bg-gray-800/50 rounded-xl border-l-4 border-blue-500">
                        <p className="text-white italic">"{member.quote}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-gray-900/80 to-black/80 rounded-2xl p-8 border border-white/10 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Наша практика в цифрах
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-4xl font-black text-green-400">8+</div>
                  <div className="text-gray-300">лет на рынке</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-blue-400">280+</div>
                  <div className="text-gray-300">выигранных дел</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-orange-400">98%</div>
                  <div className="text-gray-300">успешных дел</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-red-400">1.2М</div>
                  <div className="text-gray-300">средняя сумма взыскания</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ПРОЦЕСС РАБОТЫ */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
              <span className="bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent">
                Как мы возвращаем ваши деньги
              </span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl p-6 border border-white/10"
                >
                  <div className="text-3xl font-black text-green-400 mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-300">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. ЦЕНЫ И УСЛУГИ */}
      <div className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
              <span className="bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
                Прозрачные условия работы
              </span>
            </h2>
            <div className="space-y-6 mb-12">
              {prices.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-gray-900/90 to-black/90 rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {item.service}
                      </h3>
                      <p className="text-gray-300">{item.desc}</p>
                    </div>
                    <div className="text-2xl font-black text-white whitespace-nowrap">
                      {item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-2xl p-8 border border-yellow-500/30 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Важное условие
              </h3>
              <p className="text-gray-300 text-lg">
                При полном ведении дела{" "}
                <span className="font-bold text-yellow-300">
                  50% нашего гонорара взыскивается с виновника
                </span>{" "}
                по решению суда. Таким образом, ваши фактические расходы на
                юридическую помощь{" "}
                <span className="font-bold text-green-400">
                  снижаются вдвое
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. ФИНАЛЬНЫЙ CTA С КОНТАКТАМИ */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative mb-12">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-3xl blur-xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border border-white/10 shadow-2xl">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                  <span className="bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                    Начните действовать сейчас
                  </span>
                </h2>
                <p className="text-2xl text-gray-300 mb-10">
                  Оставьте заявку и получите бесплатный разбор вашей ситуации от
                  ведущего юриста
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white text-3xl font-black px-16 py-10 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20"
                  onClick={() => handleConsultation("final")}
                >
                  <div className="flex items-center">
                    <Icon name="Phone" size={36} className="mr-6" />
                    <div className="text-left">
                      <div className="text-3xl font-black">
                        Получить консультацию
                      </div>
                      <div className="text-xl font-bold opacity-90">
                        и расчет суммы взыскания - 0 ₽
                      </div>
                    </div>
                  </div>
                </Button>
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Контакты для связи
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <Icon
                        name="Phone"
                        className="inline mr-3 text-green-400"
                      />
                      +7 (XXX) XXX-XX-XX
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <Icon name="Mail" className="inline mr-3 text-blue-400" />
                      example@email.ru
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <Icon
                        name="MapPin"
                        className="inline mr-3 text-red-400"
                      />
                      г. Новосибирск
                    </div>
                  </div>
                  <p className="text-gray-400 mt-8">
                    Режим работы: Пн-Пт с 9:00 до 19:00. Принимаем срочные
                    заявки 24/7 в мессенджерах.
                  </p>
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
