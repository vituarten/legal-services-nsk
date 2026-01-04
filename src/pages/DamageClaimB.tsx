import { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOConfig } from "@/utils/seoConfig";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import DTPConsultationModal from "@/components/dtp/DTPConsultationModal";
import ContactBar from "@/components/dtp/ContactBar";
import { trackCustomGoal } from "@/utils/metrika";

const DamageClaimB = () => {
  const [showForm, setShowForm] = useState(false);
  const [lossAmount, setLossAmount] = useState(85000);
  const [currentHour, setCurrentHour] = useState(12);
  const seo = getSEOConfig('damageClaim');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(prev => prev + 1);
      setLossAmount(prev => prev + 625);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleConsultation = (source: string) => {
    trackCustomGoal('damage_claim_consultation_b', { source, action: 'form_open', variant: 'b' });
    setShowForm(true);
  };

  const team = [
    {
      name: "Алексей Семёнов",
      role: "Ведущий юрист по ДТП",
      exp: "9 лет",
      cases: "140+ дел",
      spec: "Специализация: взыскание ущерба с виновника, работа с укрывателями активов.",
      quote: "Знаю, как находить скрытые счета и имущество даже у самых хитрых неплательщиков."
    },
    {
      name: "Мария Колесникова",
      role: "Эксперт по страховым спорам",
      exp: "7 лет",
      cases: "95+ дел",
      spec: "Специализация: оспаривание отказов и занижений страховых, независимая экспертиза.",
      quote: "Моя задача - чтобы страховая или виновник заплатили не сколько дадут, а всю сумму по закону."
    }
  ];

  const prices = [
    { service: "Бесплатный анализ документов и стратегии", price: "0 ₽", desc: "Изучим ваши документы, оценим риски и рассчитаем реальную сумму для взыскания." },
    { service: "Подготовка досудебной претензии и работа с виновником", price: "от 15 000 ₽", desc: "Составим юридически безупречное требование. Часто это заставляет виновника платить без суда." },
    { service: "Полное ведение дела в суде (взыскание ущерба)", price: "от 40 000 ₽", desc: "Включает: иск, арест активов, все заседания, работу с приставами. Гонорар взыскиваем с ответчика." },
    { service: "Срочный выезд юриста для фиксации обстоятельств", price: "5 000 ₽", desc: "Приедем в течение 2 часов, поможем правильно оформить документы на месте ДТП." }
  ];

  const steps = [
    { num: "01", title: "Ваш звонок и анализ", desc: "Бесплатно изучаем документы. Через 30 минут вы знаете точную сумму к взысканию и план." },
    { num: "02", title: "Атака на активы (72ч)", desc: "Подаем иск и ходатайства об аресте счетов, автомобиля и имущества виновника." },
    { num: "03", title: "Суд и давление", desc: "Проводим переговоры и судебные заседания. 98% наших дел заканчиваются в пользу клиента." },
    { num: "04", title: "Деньги на вашем счету", desc: "Контролируем приставов до момента, когда вся сумма (включая наши услуги) поступит к вам." }
  ];

  const problems = [
    { icon: "Lock", text: "Виновник переписывает имущество на родственников" },
    { icon: "Banknote", text: "Страховая выплатила только 400 000 ₽, а ремонт стоит 800 000 ₽" },
    { icon: "UserX", text: "Виновник скрылся или у него нет страховки" },
    { icon: "Clock", text: "Каждый день простоя такси/грузовика = потеря 2 500 ₽ дохода" },
    { icon: "Heart", text: "Нужна компенсация за лечение и моральный вред" },
    { icon: "AlertCircle", text: "Вы не знаете, как правильно составить иск и какие документы нужны" }
  ];

  const whatWeClaim = [
    { item: "Стоимость ремонта автомобиля", amount: "по экспертизе" },
    { item: "Утрата товарной стоимости (УТС)", amount: "5-15% от стоимости авто" },
    { item: "Эвакуатор и хранение", amount: "фактические расходы" },
    { item: "Упущенная выгода (для коммерческого транспорта)", amount: "расчёт по доходам" },
    { item: "Моральный вред", amount: "от 50 000 ₽" },
    { item: "Расходы на лечение", amount: "по документам" },
    { item: "Судебные расходы и госпошлина", amount: "полностью" },
    { item: "Наши юридические услуги", amount: "взыскиваем с ответчика" }
  ];

  return (
    <>
      <SEOHead 
        title={seo.title + " | Вариант B"}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />

      {/* 1. HERO - СРОЧНОСТЬ */}
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-screen filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-128 h-128 bg-orange-500 rounded-full mix-blend-screen filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Иконка с таймером */}
            <div className="relative inline-block mb-12">
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping-slow opacity-20"></div>
              <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-red-600 to-orange-500 rounded-full shadow-2xl border-4 border-white/20">
                <Icon name="AlertTriangle" size={64} className="text-white drop-shadow-lg" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-red-600 text-white text-base font-bold px-4 py-2 rounded-full animate-pulse border-2 border-white">
                {currentHour}ч с ДТП
              </div>
            </div>

            {/* Главный заголовок */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">
                ВИНОВНИК ДТП УКРЫВАЕТ АКТИВЫ?
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-400 via-orange-300 to-red-400 bg-clip-text text-transparent">
                МЫ ЗАБЛОКИРУЕМ ИХ СЧЕТА ЗА 72 ЧАСА
              </span>
            </h1>

            {/* Подзаголовок */}
            <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Каждый час ожидания сжигает ваши деньги. Мы заставляем виновника заплатить ВСЁ: 
              <span className="text-orange-300 font-bold"> ремонт + УТС 15% + моральный вред + упущенную выгоду</span>.
            </p>

            {/* Виджет потерь */}
            <div className="relative mb-16 inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-lg rounded-3xl p-10 border border-white/10 shadow-2xl">
                <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                  <div className="text-center">
                    <div className="text-6xl font-black text-white mb-3 font-mono tracking-tighter">
                      {lossAmount.toLocaleString()} ₽
                    </div>
                    <div className="text-red-300 font-bold text-xl">ВАШИ ТЕКУЩИЕ ПОТЕРИ</div>
                  </div>
                  <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-3xl font-black text-white mb-3">
                      <Icon name="TrendingUp" size={36} className="text-red-400 mr-4" />
                      <span className="font-mono">+625 ₽/час</span>
                    </div>
                    <div className="text-gray-400 text-lg">рост потерь каждые 60 минут</div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-center text-base text-gray-400">
                    <Icon name="Clock" size={20} className="mr-3" />
                    <span>Таймер обновляется в реальном времени. Это не фикция - это математика ваших убытков.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Главная кнопка */}
            <div className="relative mb-12">
              <Button 
                size="lg"
                onClick={() => handleConsultation('hero')}
                className="relative bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white text-2xl md:text-3xl font-black px-12 md:px-16 py-8 md:py-10 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-white/20 animate-pulse-slow w-full md:w-auto"
              >
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <Icon name="ShieldAlert" size={40} className="text-white" />
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-2xl md:text-3xl font-black">БЕСПЛАТНО ПРОАНАЛИЗИРОВАТЬ</div>
                    <div className="text-lg md:text-xl font-bold opacity-90">мой случай и получить план на 72 часа - 0 ₽</div>
                  </div>
                  <Icon name="ArrowRight" size={36} className="hidden md:block" />
                </div>
              </Button>
            </div>

            {/* Преимущества под кнопкой */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center text-gray-300 p-4 bg-white/5 rounded-2xl">
                <Icon name="Phone" size={28} className="mr-4 text-green-400" />
                <div>
                  <div className="font-bold text-lg">Звонок через 90 секунд</div>
                  <div className="text-sm text-gray-400">Не оставляем в ожидании</div>
                </div>
              </div>
              <div className="flex items-center justify-center text-gray-300 p-4 bg-white/5 rounded-2xl">
                <Icon name="FileText" size={28} className="mr-4 text-blue-400" />
                <div>
                  <div className="font-bold text-lg">Анализ документов за 15 минут</div>
                  <div className="text-sm text-gray-400">Быстрая оценка ситуации</div>
                </div>
              </div>
              <div className="flex items-center justify-center text-gray-300 p-4 bg-white/5 rounded-2xl">
                <Icon name="CreditCard" size={28} className="mr-4 text-yellow-400" />
                <div>
                  <div className="font-bold text-lg">0 ₽ предоплаты</div>
                  <div className="text-sm text-gray-400">Начинаем без аванса</div>
                </div>
              </div>
            </div>

            {/* Стрелка вниз */}
            <div className="mt-20 animate-bounce">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20">
                <Icon name="ChevronDown" size={32} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ПРОБЛЕМЫ КЛИЕНТА */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-20">
              <span className="bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                ВАША СИТУАЦИЯ ВЫГЛЯДИТ ТАК?
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {problems.map((problem, idx) => (
                <div key={idx} className="group">
                  <div className="relative h-full">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-xl flex items-center justify-center">
                            <Icon name={problem.icon} size={32} className="text-red-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">{problem.text}</h3>
                          <div className="h-px w-16 bg-gradient-to-r from-red-500 to-orange-500 my-4"></div>
                          <p className="text-gray-400 text-sm">
                            {idx === 0 && "Через 7 дней имущество будет переписано и взыскать будет нечего"}
                            {idx === 1 && "Вы теряете 400 000 ₽ + УТС 15% + моральный вред"}
                            {idx === 2 && "Страховая не платит. Виновник исчезает. Вы остаётесь один на один с проблемой"}
                            {idx === 3 && "За месяц простоя теряете 75 000 ₽ дохода. Это новая машина в кредит"}
                            {idx === 4 && "Лечение стоит денег. Стресс и переживания должны быть компенсированы"}
                            {idx === 5 && "Одна ошибка в иске - и дело затянется на годы. Виновник успеет всё скрыть"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Важная заметка */}
            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-2xl p-10 border-l-4 border-red-500">
              <div className="flex items-start gap-6">
                <Icon name="AlertCircle" size={48} className="text-red-400 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Худший сценарий, если ничего не делать:</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-black/40 p-6 rounded-xl">
                      <div className="text-red-400 font-bold mb-2">Через 30 дней:</div>
                      <ul className="text-gray-300 space-y-2">
                        <li className="flex items-center"><Icon name="X" size={16} className="text-red-500 mr-3" />Виновник оформит банкротство</li>
                        <li className="flex items-center"><Icon name="X" size={16} className="text-red-500 mr-3" />Вы потеряете право на УТС 15%</li>
                        <li className="flex items-center"><Icon name="X" size={16} className="text-red-500 mr-3" />Свидетели забудут детали</li>
                      </ul>
                    </div>
                    <div className="bg-black/40 p-6 rounded-xl">
                      <div className="text-red-400 font-bold mb-2">Через 60 дней:</div>
                      <ul className="text-gray-300 space-y-2">
                        <li className="flex items-center"><Icon name="X" size={16} className="text-red-500 mr-3" />Вы оплатите ремонт из своего кармана</li>
                        <li className="flex items-center"><Icon name="X" size={16} className="text-red-500 mr-3" />Решение суда станет бесполезной бумажкой</li>
                        <li className="flex items-center"><Icon name="X" size={16} className="text-red-500 mr-3" />Ваши общие потери: ~1.5 млн ₽</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. КОМАНДА ЭКСПЕРТОВ */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-6">
              <span className="bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                ВАШЕ ДЕЛО В РУКАХ УЗКИХ СПЕЦИАЛИСТОВ
              </span>
            </h2>
            <p className="text-xl text-gray-400 text-center mb-20 max-w-3xl mx-auto">
              Мы не «юристы широкого профиля». Каждый из нас 8+ лет занимается только ДТП и взысканием ущерба. 
              Знаем каждую лазейку, которую использует виновник.
            </p>

            <div className="grid md:grid-cols-2 gap-12 mb-20">
              {team.map((member, idx) => (
                <div key={idx} className="group">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-10 border border-white/10">
                      <div className="flex flex-col lg:flex-row items-start gap-10">
                        {/* Фото/аватар */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50"></div>
                            <div className="relative w-48 h-48 bg-gradient-to-br from-blue-700 to-purple-700 rounded-full flex items-center justify-center text-6xl font-black text-white border-4 border-white/20">
                              {member.name.split(' ')[0].charAt(0)}
                              {member.name.split(' ')[1].charAt(0)}
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg border-2 border-white/20">
                              {member.exp}
                            </div>
                          </div>
                        </div>

                        {/* Информация */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-4 mb-6">
                            <h3 className="text-3xl font-bold text-white">{member.name}</h3>
                            <span className="px-4 py-2 bg-blue-900/40 text-blue-300 rounded-full font-bold">
                              {member.role}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-gray-800/50 p-4 rounded-xl">
                              <div className="text-2xl font-black text-blue-400">{member.cases}</div>
                              <div className="text-gray-400">дел провёл</div>
                            </div>
                            <div className="bg-gray-800/50 p-4 rounded-xl">
                              <div className="text-2xl font-black text-purple-400">98%</div>
                              <div className="text-gray-400">успешных дел</div>
                            </div>
                          </div>

                          <p className="text-gray-300 mb-6 text-lg">{member.spec}</p>

                          <div className="bg-gray-800/40 p-6 rounded-2xl border-l-4 border-blue-500">
                            <div className="flex items-start gap-4">
                              <div className="text-4xl text-blue-400 font-serif leading-none">"</div>
                              <div>
                                <p className="text-white text-lg italic">{member.quote}</p>
                                <div className="flex items-center mt-4">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Icon key={i} name="Star" size={20} className="text-yellow-400 mr-1" />
                                    ))}
                                  </div>
                                  <span className="text-gray-400 ml-3">Рейтинг клиентов: 4.9/5</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Статистика компании */}
            <div className="bg-gradient-to-r from-gray-900/80 to-black/80 rounded-3xl p-12 border border-white/10">
              <h3 className="text-3xl font-bold text-white text-center mb-12">НАША ПРАКТИКА В ЦИФРАХ</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-black text-green-400 mb-4">8+</div>
                  <div className="text-gray-300 text-xl">лет на рынке</div>
                  <div className="text-gray-500 text-sm mt-2">Только ДТП, только взыскание</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-black text-blue-400 mb-4">280+</div>
                  <div className="text-gray-300 text-xl">выигранных дел</div>
                  <div className="text-gray-500 text-sm mt-2">По взысканию ущерба с виновника</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-black text-orange-400 mb-4">98%</div>
                  <div className="text-gray-300 text-xl">успешных дел</div>
                  <div className="text-gray-500 text-sm mt-2">Статистика за 2022-2024 годы</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-black text-red-400 mb-4">1.2М</div>
                  <div className="text-gray-300 text-xl">средняя сумма взыскания</div>
                  <div className="text-gray-500 text-sm mt-2">На 40-150% больше, чем платит страховая</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ЧТО МЫ ВЗЫСКИВАЕМ */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-6">
              <span className="bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent">
                МЫ ВЗЫСКИВАЕМ НЕ ТОЛЬКО РЕМОНТ
              </span>
            </h2>
            <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
              Обычные водители получают только стоимость ремонта. Наши клиенты получают на 40-150% больше за счёт 
              дополнительных статей взыскания, о которых не знают страховые и «общие» юристы.
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Список что взыскиваем */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-10 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <Icon name="Banknote" size={32} className="text-green-400 mr-4" />
                  Полный список компенсаций:
                </h3>
                <div className="space-y-6">
                  {whatWeClaim.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-5 border-b border-gray-800 last:border-0 group hover:bg-white/5 hover:px-4 hover:-mx-4 rounded-xl transition-all duration-300">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-lg flex items-center justify-center mr-4">
                          <Icon name="Check" size={20} className="text-green-400" />
                        </div>
                        <span className="text-gray-300 text-lg">{item.item}</span>
                      </div>
                      <span className="text-green-400 font-bold text-xl">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Пример расчёта */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-10 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <Icon name="Calculator" size={32} className="text-orange-400 mr-4" />
                  Пример реального расчёта:
                </h3>
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-gray-800/50 to-black/50 rounded-2xl">
                    <div className="text-gray-400 mb-2">Автомобиль после ДТП:</div>
                    <div className="text-2xl font-bold text-white">Toyota Camry 2020 года</div>
                    <div className="text-gray-400">Рыночная стоимость: 2 500 000 ₽</div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Стоимость ремонта:</span>
                      <span className="text-white font-bold">800 000 ₽</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">УТС 12%:</span>
                      <span className="text-green-400 font-bold">+300 000 ₽</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Эвакуатор и хранение:</span>
                      <span className="text-green-400 font-bold">+25 000 ₽</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Упущенная выгода (такси, 30 дней):</span>
                      <span className="text-green-400 font-bold">+75 000 ₽</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Моральный вред:</span>
                      <span className="text-green-400 font-bold">+100 000 ₽</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-4"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-white">ИТОГО ВЗЫСКАНИЕ:</span>
                      <div>
                        <div className="text-3xl font-black text-green-400">1 300 000 ₽</div>
                        <div className="text-gray-500 text-sm text-right">вместо 800 000 ₽ у обычных юристов</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-6 rounded-2xl border border-green-500/30">
                    <div className="flex items-center">
                      <Icon name="Zap" size={24} className="text-green-400 mr-4" />
                      <div>
                        <div className="text-green-300 font-bold">+500 000 ₽ дополнительно</div>
                        <div className="text-gray-300 text-sm">Наши клиенты получают в среднем на 62% больше</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ПРОЦЕСС РАБОТЫ */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-6">
              <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                КАК МЫ ВОЗВРАЩАЕМ ВАШИ ДЕНЬГИ
              </span>
            </h2>
            <p className="text-xl text-gray-400 text-center mb-20 max-w-3xl mx-auto">
              4 этапа от вашего звонка до денег на счёте. Мы действуем как оперативная группа быстрого реагирования.
            </p>

            <div className="relative">
              {/* Линия процесса */}
              <div className="hidden lg:block absolute left-0 right-0 top-24 h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Номер этапа на линии */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full flex items-center justify-center text-3xl font-black text-white border-4 border-black shadow-2xl">
                        {step.num}
                      </div>
                    </div>

                    <div className="pt-20">
                      <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-10 border border-white/10 h-full hover:border-cyan-500/50 transition duration-500 group">
                        <div className="text-center mb-6">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-2xl mb-6 group-hover:scale-110 transition duration-300">
                            <Icon 
                              name={idx === 0 ? "Phone" : idx === 1 ? "Zap" : idx === 2 ? "Scale" : "Banknote"} 
                              size={32} 
                              className="text-cyan-400"
                            />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                          <p className="text-gray-300">{step.desc}</p>
                        </div>

                        {/* Детали этапа */}
                        <div className="mt-8 pt-6 border-t border-gray-800">
                          <div className="text-sm text-gray-400">
                            {idx === 0 && "• Анализ документов • Расчёт суммы • Консультация"}
                            {idx === 1 && "• Исковое заявление • Арест активов • Ходатайства"}
                            {idx === 2 && "• Судебные заседания • Переговоры • Давление"}
                            {idx === 3 && "• Работа с приставами • Контроль выплат • Отчёт"}
                          </div>
                          <div className="mt-4">
                            <span className="inline-block px-4 py-2 bg-cyan-900/30 text-cyan-300 rounded-full text-sm font-bold">
                              {idx === 0 ? "1-2 часа" : idx === 1 ? "24-72 часа" : idx === 2 ? "1-3 месяца" : "до результата"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Кейс */}
            <div className="mt-32 bg-gradient-to-r from-gray-900/80 to-black/80 rounded-3xl p-12 border border-white/10">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full flex items-center justify-center text-6xl font-black text-white">
                    🚗
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6">Реальный кейс: Mercedes после лобового столкновения</h3>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <div className="text-gray-400 mb-2">Ситуация:</div>
                      <div className="text-white">Виновник без страховки начал продавать квартиру</div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-2">Наши действия:</div>
                      <div className="text-white">Арестовали счёт и долю в квартире за 48 часов</div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-2">Срок:</div>
                      <div className="text-white">Начали на 5-й день после ДТП</div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-2">Результат:</div>
                      <div className="text-2xl font-black text-green-400">2 127 000 ₽</div>
                      <div className="text-gray-400 text-sm">взыскано полностью, квартира под арестом</div>
                    </div>
                  </div>
                  <Button onClick={() => handleConsultation('case')}>
                    <Icon name="FileText" className="mr-3" />
                    Посмотреть другие кейсы
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ЦЕНЫ И УСЛОВИЯ */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-6">
              <span className="bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
                ПРОЗРАЧНЫЕ УСЛОВИЯ РАБОТЫ
              </span>
            </h2>
            <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
              Никаких скрытых платежей. Вы платите только за результат. Большую часть гонорара мы взыскиваем с виновника.
            </p>

            <div className="space-y-8 mb-16">
              {prices.map((item, idx) => (
                <div key={idx} className="group">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-gradient-to-r from-gray-900/90 to-black/90 rounded-3xl p-10 border border-white/10">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="flex-1">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-xl flex items-center justify-center mr-6">
                              <Icon name="CheckCircle" size={24} className="text-yellow-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">{item.service}</h3>
                          </div>
                          <p className="text-gray-300 text-lg">{item.desc}</p>
                        </div>
                        <div className="lg:text-right">
                          <div className="text-4xl font-black text-yellow-400">{item.price}</div>
                          <div className="text-gray-400 mt-2">
                            {idx === 0 ? "Без обязательств" :
                              idx === 1 ? "Фиксированная ставка" :
                              idx === 2 ? "Оплата по этапам" : "Разовый платёж"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* УТП */}
            <div className="bg-gradient-to-r from-yellow-900/20 via-orange-900/20 to-amber-900/20 rounded-3xl p-12 border border-yellow-500/30">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 bg-gradient-to-br from-yellow-600 to-orange-500 rounded-full flex items-center justify-center">
                    <Icon name="ShieldCheck" size={64} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6">ВАШ ФИНАНСОВЫЙ РИСК РАВЕН НУЛЮ</h3>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-black/40 p-6 rounded-2xl">
                      <div className="text-yellow-400 font-bold mb-4 flex items-center">
                        <Icon name="Banknote" className="mr-3" /> Наше условие:
                      </div>
                      <ul className="text-gray-300 space-y-3">
                        <li className="flex items-center"><Icon name="Check" size={16} className="text-green-400 mr-3" />50% гонорара взыскиваем с виновника</li>
                        <li className="flex items-center"><Icon name="Check" size={16} className="text-green-400 mr-3" />Оплата только по факту подачи иска в суд</li>
                        <li className="flex items-center"><Icon name="Check" size={16} className="text-green-400 mr-3" />Без предоплаты за экспертизу и госпошлину</li>
                      </ul>
                    </div>
                    <div className="bg-black/40 p-6 rounded-2xl">
                      <div className="text-green-400 font-bold mb-4 flex items-center">
                        <Icon name="Calculator" className="mr-3" /> Пример экономии:
                      </div>
                      <div className="text-white">
                        <div className="flex justify-between mb-2">
                          <span>Стоимость услуг:</span>
                          <span className="font-bold">80 000 ₽</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Взыскиваем с виновника:</span>
                          <span className="text-green-400 font-bold">-40 000 ₽</span>
                        </div>
                        <div className="h-px bg-gray-700 my-3"></div>
                        <div className="flex justify-between text-xl">
                          <span>Ваш фактический расход:</span>
                          <span className="font-black text-green-400">40 000 ₽</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg">
                    Это прописываем отдельным пунктом в договоре. Если не взыщем с виновника - вы не доплачиваете.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ФИНАЛЬНЫЙ CTA */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-4xl blur-3xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-4xl p-16 border border-white/10 shadow-2xl">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-red-600 to-orange-500 rounded-full mb-10 shadow-2xl">
                    <Icon name="Shield" size={64} className="text-white" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black mb-8">
                    <span className="bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent">
                      У ВАС ЕЩЁ ЕСТЬ ШАНС ВСЁ ИСПРАВИТЬ
                    </span>
                  </h2>
                  <p className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
                    Но он уменьшается на <span className="font-black text-red-400">625 ₽ каждый час</span>
                  </p>
                </div>

                {/* Главная кнопка */}
                <div className="relative mb-16">
                  <Button 
                    size="lg"
                    onClick={() => handleConsultation('final')}
                    className="relative bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white text-3xl md:text-4xl font-black px-12 md:px-20 py-10 md:py-14 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 animate-pulse-slow w-full"
                  >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                      <Icon name="Phone" size={48} className="" />
                      <div className="text-center md:text-left">
                        <div className="text-3xl md:text-4xl font-black">ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ ЮРИСТА</div>
                        <div className="text-xl md:text-2xl font-bold opacity-90">и расчёт суммы взыскания — 0 ₽</div>
                      </div>
                      <Icon name="ArrowRight" size={48} className="hidden md:block" />
                    </div>
                  </Button>
                </div>

                {/* Контакты */}
                <div className="border-t border-white/10 pt-16">
                  <h3 className="text-3xl font-bold text-white text-center mb-12">КОНТАКТЫ ДЛЯ СВЯЗИ</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white/5 p-8 rounded-3xl text-center hover:bg-white/10 transition duration-300">
                      <Icon name="Phone" size={48} className="text-green-400 mb-6 mx-auto" />
                      <div className="text-2xl font-bold text-white mb-2">+7 (XXX) XXX-XX-XX</div>
                      <div className="text-gray-400">Горячая линия 24/7</div>
                    </div>
                    <div className="bg-white/5 p-8 rounded-3xl text-center hover:bg-white/10 transition duration-300">
                      <Icon name="Mail" size={48} className="text-blue-400 mb-6 mx-auto" />
                      <div className="text-2xl font-bold text-white mb-2">example@email.ru</div>
                      <div className="text-gray-400">Электронная почта</div>
                    </div>
                    <div className="bg-white/5 p-8 rounded-3xl text-center hover:bg-white/10 transition duration-300">
                      <Icon name="MapPin" size={48} className="text-red-400 mb-6 mx-auto" />
                      <div className="text-2xl font-bold text-white mb-2">г. Новосибирск</div>
                      <div className="text-gray-400">Офис в центре города</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-800/50 to-black/50 rounded-3xl p-8 text-center">
                    <div className="text-gray-300 text-lg flex flex-wrap items-center justify-center gap-2">
                      <Icon name="Clock" className="text-yellow-400" />
                      <span>Режим работы: Пн-Пт с 9:00 до 19:00 • Сб с 10:00 до 16:00 •</span> 
                      <span className="text-green-400 font-bold">Срочные заявки принимаем 24/7 в мессенджерах</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Важное предупреждение */}
            <div className="mt-20 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-3xl p-10 border border-red-500/30">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-shrink-0">
                  <Icon name="AlertCircle" size={80} className="text-red-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">ПОЧЕМУ НЕЛЬЗЯ ЖДАТЬ «ЕЩЁ НЕМНОГО»?</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <Icon name="X" size={24} className="text-red-500 mr-4 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Виновник успеет продать/подарить имущество</span>
                    </div>
                    <div className="flex items-start">
                      <Icon name="X" size={24} className="text-red-500 mr-4 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Потеряете УТС (15% от стоимости авто)</span>
                    </div>
                    <div className="flex items-start">
                      <Icon name="X" size={24} className="text-red-500 mr-4 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Свидетели забудут детали, камеры сотрут записи</span>
                    </div>
                    <div className="flex items-start">
                      <Icon name="X" size={24} className="text-red-500 mr-4 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Виновник оформит банкротство — взыскать будет не с кого</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2024 Юридическая компания «[Ваше название]». Все права защищены.</p>
          <p className="mt-4 text-sm">ИНН: XXXXXXXXXX • ОГРНИП: XXXXXXXXXXXXX</p>
        </div>
      </footer>

      <ContactBar onConsultClick={() => handleConsultation('contact_bar')} />
      <DTPConsultationModal showForm={showForm} onClose={() => setShowForm(false)} />
    </>
  );
};

export default DamageClaimB;
