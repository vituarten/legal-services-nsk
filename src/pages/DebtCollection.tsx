import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export default function DebtCollection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    situation: "",
  });
  const [downloadClicked, setDownloadClicked] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Яндекс.Метрика
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      ym(106063131, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
      });
    `;

    const noscript = document.createElement("noscript");
    const img = document.createElement("img");
    img.src = "https://mc.yandex.ru/watch/106063131";
    img.style.cssText = "position:absolute; left:-9999px;";
    img.alt = "";
    noscript.appendChild(img);

    document.head.appendChild(script);
    document.head.appendChild(noscript);

    return () => {
      if (script.parentNode) document.head.removeChild(script);
      if (noscript.parentNode) document.head.removeChild(noscript);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof window !== "undefined" && (window as any).ym) {
      (window as any).ym(106063131, "reachGoal", "form_submit");
    }

    toast.success(
      "Заявка принята! Юрист по взысканию свяжется с вами в течение 30 минут",
    );
    setFormData({ name: "", phone: "", email: "", situation: "" });
  };

  const handlePhoneClick = () => {
    if (typeof window !== "undefined" && (window as any).ym) {
      (window as any).ym(106063131, "reachGoal", "phone_click");
    }
  };

  const trackButtonClick = (buttonName: string) => {
    if (typeof window !== "undefined" && (window as any).ym) {
      (window as any).ym(106063131, "reachGoal", `${buttonName}_click`);
    }
  };

  const handleDownloadClick = (docTitle: string) => {
    setDownloadClicked(true);
    if (typeof window !== "undefined" && (window as any).ym) {
      (window as any).ym(106063131, "reachGoal", "document_download", {
        document: docTitle,
      });
    }
    toast.info(
      `Файл "${docTitle}" начнет скачиваться. Если возникнут вопросы - мы ниже.`,
    );
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Данные для секций
  const painPoints = [
    { icon: "Clock", text: 'Долг "висит" уже несколько месяцев или лет?' },
    { icon: "UserX", text: "Должник игнорирует звонки и письма?" },
    { icon: "Building", text: "Компания-должник меняет директоров и адреса?" },
    { icon: "ShieldOff", text: 'Приставы говорят "не можем найти имущество"?' },
    {
      icon: "TrendingDown",
      text: "Боитесь, что должник обанкротится и спишет долг?",
    },
    { icon: "DollarSign", text: "Эти деньги нужны вам для развития бизнеса?" },
  ];

  const creditorSituations = [
    {
      icon: "Building2",
      title: "Контрагент не платит",
      description: "ООО или ИП задерживает оплату за товар или услугу",
      color: "bg-blue-50 border-blue-200",
    },
    {
      icon: "User",
      title: "Частный заемщик",
      description: "Человек не возвращает крупную сумму денег",
      color: "bg-green-50 border-green-200",
    },
    {
      icon: "FileText",
      title: "Есть решение суда",
      description: "Суд был, исполнительный лист есть, а денег нет",
      color: "bg-purple-50 border-purple-200",
    },
    {
      icon: "ShieldAlert",
      title: "Должник банкротится",
      description: "Нужно срочно включиться в реестр кредиторов",
      color: "bg-red-50 border-red-200",
    },
    {
      icon: "Globe",
      title: "Иностранный контрагент",
      description: "Зарубежная компания уклоняется от оплаты",
      color: "bg-yellow-50 border-yellow-200",
    },
    {
      icon: "Clock",
      title: "Долг списали как безнадежный",
      description: "Но вы уверены, что деньги можно вернуть",
      color: "bg-gray-50 border-gray-200",
    },
  ];

  const advantages = [
    {
      icon: "Percent",
      title: "Платите только за результат",
      text: "В сложных делах работаем за процент от возвращенной суммы. Никаких предоплат.",
      highlight: "0 ₽ предоплаты",
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: "Zap",
      title: "Действуем пока вы читаете",
      text: 'За 72 часа наложим арест на счета и имущество должника. Пока другие юристы "изучают документы".',
      highlight: "72 часа",
      color: "from-green-500 to-green-700",
    },
    {
      icon: "Search",
      title: "Найдем то, что скрыто",
      text: 'У 60% "бедных" должников есть счета в других банках, недвижимость на родственников, доли в бизнесе.',
      highlight: "60% должников",
      color: "from-purple-500 to-purple-700",
    },
    {
      icon: "Briefcase",
      title: "Говорим на языке цифр",
      text: 'Не "возьмемся за дело", а "вернем от 70% долга за 4-8 месяцев". Конкретика вместо обещаний.',
      highlight: "70-100% долга",
      color: "from-red-500 to-red-700",
    },
  ];

  const cases = [
    {
      debt: "12.4 млн ₽",
      result: "Взыскано 100%",
      time: "8 месяцев",
      situation:
        "Долг по договору поставки. Должник скрывал активы через офшоры.",
      difficulties: ["Офшоры", "Подставные лица", "Международная юрисдикция"],
      color: "border-l-4 border-blue-500",
    },
    {
      debt: "3.1 млн ₽",
      result: "Взыскано 85%",
      time: "4 месяца",
      situation: "Займ физлицу. Вернули через арест доли в бизнесе.",
      difficulties: [
        "Отсутствие имущества",
        "Бездействие приставов",
        "Скрытые активы",
      ],
      color: "border-l-4 border-green-500",
    },
    {
      debt: "87 млн ₽",
      result: "Взыскано 70%",
      time: "14 месяцев",
      situation: "Корпоративный спор. Работали в рамках банкротства должника.",
      difficulties: [
        "Банкротное дело",
        "Конкурсные кредиторы",
        "Сложные активы",
      ],
      color: "border-l-4 border-purple-500",
    },
  ];

  const freeDocuments = [
    {
      title: 'Чек-лист "10 действий до обращения в суд"',
      description:
        "Пошаговый план, который увеличит шансы на возврат денег на 40%",
      icon: "CheckSquare",
      color: "bg-green-50 border-green-100 hover:border-green-300",
    },
    {
      title: "Образец эффективной досудебной претензии",
      description:
        "Не просто формальность, а документ, после которого 30% должников платят",
      icon: "FileText",
      color: "bg-blue-50 border-blue-100 hover:border-blue-300",
    },
    {
      title: 'Памятка "Как проверить должника"',
      description:
        "7 источников информации, которые покажут реальные активы должника",
      icon: "Search",
      color: "bg-yellow-50 border-yellow-100 hover:border-yellow-300",
    },
    {
      title: "Гид по работе с приставами",
      description:
        "Что требовать от ФССП, чтобы они реально работали по вашему делу",
      icon: "Shield",
      color: "bg-purple-50 border-purple-100 hover:border-purple-300",
    },
  ];

  const debtTypes = [
    {
      title: "Договорные долги",
      description: "Займы, расписки, договоры поставки",
      features: [
        "Срок давности: 3 года",
        "Проще доказать",
        "Быстрее взыскание",
      ],
      stats: "85% успеха",
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
    },
    {
      title: "Внедоговорные",
      description: "Причинение ущерба, неосновательное обогащение",
      features: ["Сложнее доказать", "Требуется экспертиза", "Дольше процесс"],
      stats: "65% успеха",
      color: "bg-gradient-to-r from-yellow-500 to-amber-600",
    },
    {
      title: "Просроченные",
      description: "Срок исковой давности истек или истекает",
      features: [
        "Есть способы восстановить",
        "Нужны доказательства",
        "Срочные действия",
      ],
      stats: "70% успеха",
      color: "bg-gradient-to-r from-red-500 to-rose-600",
    },
  ];

  const faq = [
    {
      question: "Что делать, если у меня нет расписки?",
      answer:
        "Расписка — не единственное доказательство. Переписка в мессенджерах, свидетельские показания, банковские переводы, записи разговоров — всё это можно использовать в суде. Мы поможем собрать доказательную базу.",
    },
    {
      question: "А если должник уже банкротится?",
      answer:
        "Это критический срок! Нужно срочно включаться в реестр кредиторов. У нас есть опыт работы в банкротных делах — знаем, как защитить ваши интересы даже на этой стадии.",
    },
    {
      question: "Сколько времени занимает взыскание?",
      answer:
        "В 70% случаев — 2-3 месяца (досудебное урегулирование). Если дело доходит до суда — 4-8 месяцев. Срочные меры (арест счетов) — 72 часа.",
    },
    {
      question: "Что если у должника ничего нет?",
      answer:
        'В 85% случаев у "бедных" должников находятся активы: доли в бизнесе, машины на родственников, счета в других банках, будущие доходы. Мы знаем, где искать.',
    },
  ];

  const restrictions = [
    {
      title: "Исполнительные листы",
      description:
        "Если у вас уже есть решение суда и исполнительный лист — вам нужен специалист по работе с приставами.",
    },
    {
      title: "Корпоративные споры (ООО vs ООО)",
      description:
        "Мы работаем с долгами между физическими лицами. Если ООО должно ООО — это не наша специализация.",
    },
    {
      title: "Долги менее 50 000 ₽",
      description:
        "Если сумма меньше, судебные издержки могут превысить сумму возврата.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Вернуть деньги с должника | Профессиональное взыскание долгов
        </title>
        <meta
          name="description"
          content="Должник не платит? Вернем ваши деньги. Действуем жестко и быстро. Арест счетов за 72 часа. Работаем за результат. Бесплатный анализ дела."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* === 1. HERO — ЭМОЦИОНАЛЬНЫЙ УДАР === */}
        <section className="relative pt-28 pb-20 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
          {/* Декоративные элементы */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full translate-x-1/3 translate-y-1/3"></div>

          <div className="container relative mx-auto px-4 z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Бейдж срочности */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 rounded-full text-white font-bold mb-6 shadow-lg animate-pulse">
                  <Icon name="AlertTriangle" className="h-5 w-5 mr-2" />
                  СРОЧНО: Пока вы читаете — должник выводит активы
                </div>

                <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                  Должник не платит?
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                    Мы заставим
                  </span>
                </h1>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Не ждите, пока должник обанкротится или скроется.
                  <span className="font-bold text-white"> За 72 часа </span>
                  наложим арест на его счета и имущество.
                  <span className="block mt-2 text-cyan-300">
                    Вернем ваши деньги, когда другие опускают руки.
                  </span>
                </p>

                {/* Психологический триггер */}
                <div className="mb-10 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Icon
                      name="HelpCircle"
                      className="h-6 w-6 mr-3 text-cyan-300"
                    />
                    Узнаете свою ситуацию?
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {painPoints.map((point, i) => (
                      <div
                        key={i}
                        className="flex items-center text-sm p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <Icon
                          name="X"
                          className="h-4 w-4 text-red-400 mr-3 flex-shrink-0"
                        />
                        <span className="text-gray-200">{point.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-xl transform hover:-translate-y-1 transition-all"
                    onClick={() => trackButtonClick("hero_start")}
                    asChild
                  >
                    <a href="#action">
                      <Icon name="Swords" className="h-6 w-6 mr-2" />
                      Начать взыскание
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg text-white border-2 border-white/40 hover:bg-white/20 hover:border-white/60 backdrop-blur-sm"
                    onClick={() => {
                      handlePhoneClick();
                      trackButtonClick("hero_phone");
                    }}
                    asChild
                  >
                    <a
                      href="tel:73832359505"
                      className="flex items-center justify-center"
                    >
                      <Icon name="Phone" className="h-6 w-6 mr-2" />
                      <div className="text-left">
                        <div className="text-xs opacity-80">
                          Бесплатная консультация
                        </div>
                        <div className="font-bold">+7 (383) 235-95-05</div>
                      </div>
                    </a>
                  </Button>
                </div>
              </div>

              {/* Карточка "Пока вы думаете" */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-30"></div>
                <Card className="relative p-8 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white shadow-2xl">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-500 rounded-full font-bold text-sm shadow-lg">
                      ⚠️ ОПАСНОСТЬ
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-8 text-center mt-4">
                    Пока вы думаете, должник:
                  </h3>

                  <div className="space-y-6">
                    {[
                      {
                        icon: "Building",
                        color: "from-red-500 to-pink-500",
                        title: "Переоформляет имущество",
                        desc: "На родственников или подставных лиц",
                      },
                      {
                        icon: "Banknote",
                        color: "from-yellow-500 to-amber-500",
                        title: "Выводит деньги",
                        desc: "Со счетов, пока не наложен арест",
                      },
                      {
                        icon: "Scale",
                        color: "from-green-500 to-emerald-500",
                        title: "Инициирует банкротство",
                        desc: "Чтобы списать ваш долг законно",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700/50"
                      >
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                        >
                          <Icon
                            name={item.icon}
                            className="h-7 w-7 text-white"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{item.title}</div>
                          <div className="text-sm text-gray-400">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-6 border-t border-gray-700 text-center">
                    <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text mb-2">
                      72 часа
                    </div>
                    <div className="text-gray-400 font-medium">
                      и мы начинаем реальные действия
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Арест счетов • Наложение запрета • Поиск активов
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* === 2. "У МЕНЯ ТАКАЯ ЖЕ СИТУАЦИЯ" === */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full text-blue-700 font-bold mb-6">
                <Icon name="Users" className="h-6 w-6 mr-3" />
                УЗНАЕТЕ СЕБЯ?
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                "У нас <span className="text-blue-600">такая же ситуация</span>"
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Мы работаем с реальными ситуациями каждый день. Вот самые частые
                случаи:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {creditorSituations.map((item, i) => (
                <Card
                  key={i}
                  className={`p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 ${item.color} relative overflow-hidden group`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-100 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity"></div>

                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon name={item.icon} className="h-10 w-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 mb-6">{item.description}</p>

                  <div className="pt-6 border-t border-gray-200">
                    <div className="text-sm font-semibold text-gray-500 mb-3">
                      Типичные признаки:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Игнорирует претензии",
                        "Скрывается",
                        "Меняет контакты",
                        "Нет активов",
                      ]
                        .slice(0, (i % 3) + 2)
                        .map((sign, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium"
                          >
                            {sign}
                          </span>
                        ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full text-green-700 font-bold">
                <Icon name="CheckCircle" className="h-6 w-6 mr-3" />
                90% наших клиентов начинают с этих ситуаций
              </div>
            </div>
          </div>
        </section>

        {/* === 3. ПОЧЕМУ МЫ РЕШИМ ВАШУ ПРОБЛЕМУ === */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Почему мы вернем{" "}
                <span className="text-green-600">ваши деньги</span>,
                <br />
                <span className="text-lg text-gray-600">
                  когда другие опускают руки
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Не обещания, а конкретные действия и гарантии
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Преимущества */}
              <div className="space-y-8">
                {advantages.map((adv, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-start gap-6 p-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${adv.color} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform`}
                      >
                        <Icon name={adv.icon} className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-2xl font-bold text-gray-900">
                            {adv.title}
                          </h3>
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-bold">
                            {adv.highlight}
                          </span>
                        </div>
                        <p className="text-gray-700 text-lg">{adv.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Чего мы НЕ делаем */}
              <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-200">
                <h3 className="text-3xl font-bold mb-8 text-center">
                  Чего мы <span className="text-red-600">НЕ делаем</span>
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: "XCircle",
                      title: 'Не берем дела "для галочки"',
                      desc: "Если шансов нет - скажем честно и не возьмемся",
                      color: "bg-red-50 border-red-100",
                    },
                    {
                      icon: "Clock",
                      title: "Не затягиваем сроки",
                      desc: "Каждые 2 недели - отчет о конкретных действиях",
                      color: "bg-yellow-50 border-yellow-100",
                    },
                    {
                      icon: "FileText",
                      title: "Не работаем по шаблону",
                      desc: "Для каждого должника - своя стратегия давления",
                      color: "bg-purple-50 border-purple-100",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-4 p-6 rounded-2xl border-2 ${item.color}`}
                    >
                      <Icon
                        name={item.icon}
                        className="h-8 w-8 text-red-600 mt-1 flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-700">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Вывод */}
                <div className="mt-10 p-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200">
                  <div className="text-center">
                    <div className="text-5xl font-black text-blue-700 mb-3">
                      0 ₽
                    </div>
                    <div className="text-2xl font-bold text-blue-900 mb-3">
                      предоплаты
                    </div>
                    <p className="text-blue-800 font-medium">
                      в делах с оплатой за результат
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === 4. КЕЙСЫ — ДОКАЗАТЕЛЬСТВА === */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-100 to-orange-100 rounded-full text-red-700 font-bold mb-6">
                <Icon name="Trophy" className="h-6 w-6 mr-3" />
                РЕАЛЬНЫЕ РЕЗУЛЬТАТЫ
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Сложные дела, которые другие назвали
                <span className="text-red-600"> "безнадежными"</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Мы специализируемся на том, от чего отказываются другие
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {cases.map((c, i) => (
                <Card
                  key={i}
                  className={`p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${c.color} bg-white`}
                >
                  {/* Главные цифры */}
                  <div className="mb-8">
                    <div className="text-4xl font-black text-gray-900 mb-2">
                      {c.debt}
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {c.result}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      за {c.time} работы
                    </div>
                  </div>

                  {/* Описание */}
                  <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                    {c.situation}
                  </p>

                  {/* Сложности */}
                  <div className="pt-8 border-t border-gray-200">
                    <div className="text-sm font-bold text-gray-500 mb-4 flex items-center">
                      <Icon
                        name="AlertTriangle"
                        className="h-5 w-5 mr-2 text-orange-500"
                      />
                      Особые сложности:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {c.difficulties.map((diff, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 text-red-700 rounded-full text-sm font-medium border border-red-100"
                        >
                          {diff}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full text-white font-bold shadow-xl hover:shadow-2xl transition-shadow">
                <Icon
                  name="AlertTriangle"
                  className="h-6 w-6 mr-3 text-yellow-400"
                />
                <div className="text-left">
                  <div className="text-sm opacity-80">ВАШ СЛУЧАЙ СЛОЖНЕЕ?</div>
                  <div className="text-xl">Это наша специализация</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === 5. ОБРАЗОВАТЕЛЬНЫЙ БЛОК === */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full text-blue-700 font-bold mb-6">
                <Icon name="Lightbulb" className="h-6 w-6 mr-3" />
                ВАЖНО ЗНАТЬ
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                Ваш долг <span className="text-blue-600">не безнадежен</span>
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Понимание природы долга увеличивает шансы на возврат в 2 раза
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {debtTypes.map((type, i) => (
                <Card
                  key={i}
                  className="p-8 bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all"
                >
                  <div className={`h-3 rounded-full ${type.color} mb-6`}></div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {type.title}
                  </h3>
                  <p className="text-gray-700 mb-6">{type.description}</p>

                  <div className="space-y-3 mb-8">
                    {type.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-gray-700"
                      >
                        <Icon
                          name="CheckCircle"
                          className="h-5 w-5 text-green-500 mr-3"
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-6 border-t border-gray-200">
                    <div className="text-3xl font-black text-gray-900">
                      {type.stats}
                    </div>
                    <div className="text-sm text-gray-600">
                      вероятность возврата
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Важная информация о сроке */}
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-200">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Icon name="Info" className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-blue-900 mb-4">
                      ⚡ Срок исковой давности — 3 года, НО:
                    </h4>
                    <p className="text-blue-800 text-lg">
                      Срок <span className="font-bold">прерывается</span>, если
                      должник признал долг (заплатил хоть 100 рублей, ответил на
                      претензию, подписал акт сверки). После этого 3 года
                      начинаются заново. Даже "просроченные" долги часто можно
                      вернуть.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* === 6. ЛИД-МАГНИТ (ДОКУМЕНТЫ) === */}
        <section id="documents" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full text-green-700 font-bold mb-6">
                <Icon name="Download" className="h-6 w-6 mr-3" />
                БЕСПЛАТНО • БЕЗ РЕГИСТРАЦИИ
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                Возьмите эти документы,
                <br />
                <span className="text-green-600">
                  даже если не готовы к услугам
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                То, что другие юристы продают за деньги. Скачайте и используйте
                прямо сейчас
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {freeDocuments.map((doc, i) => (
                <Card
                  key={i}
                  className={`p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border-2 ${doc.color}`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-6 shadow-lg">
                    <Icon name={doc.icon} className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    {doc.title}
                  </h3>
                  <p className="text-gray-700 mb-6">{doc.description}</p>

                  <Button
                    variant="outline"
                    className="w-full border-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 hover:text-green-800 font-bold py-6"
                    onClick={() => handleDownloadClick(doc.title)}
                  >
                    <Icon name="Download" className="h-5 w-5 mr-3" />
                    Скачать бесплатно
                  </Button>
                </Card>
              ))}
            </div>

            {/* Триггер после скачивания */}
            {downloadClicked && (
              <div className="max-w-3xl mx-auto">
                <Card className="p-10 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-xl">
                  <div className="flex items-start gap-8">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg flex-shrink-0">
                      <Icon
                        name="MessageCircle"
                        className="h-10 w-10 text-white"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-blue-900 mb-4">
                        Остались вопросы по документам?
                      </h3>
                      <p className="text-blue-800 text-lg mb-6">
                        Бесплатные файлы — это хорошо. Но если нужен
                        <span className="font-bold">
                          {" "}
                          конкретный план для вашей ситуации
                        </span>
                        , лучше поговорить с юристом. Мы уже изучили документы,
                        которые вы скачали, и понимаем вашу проблему.
                      </p>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg font-bold py-6 px-8"
                        onClick={() =>
                          trackButtonClick("documents_to_consultation")
                        }
                      >
                        <a href="#action">
                          <Icon name="Phone" className="h-6 w-6 mr-3" />
                          Получить 15-минутную консультацию
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </section>

        {/* === 7. FAQ — СНИМАЕМ ВОЗРАЖЕНИЯ === */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                Частые вопросы
                <span className="block text-2xl text-gray-600 mt-4">
                  То, о чем спрашивают перед обращением
                </span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faq.map((item, i) => (
                <Card
                  key={i}
                  className={`overflow-hidden border-2 ${activeFaq === i ? "border-blue-300 bg-blue-50" : "border-gray-200"}`}
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full p-8 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <div
                        className={`w-12 h-12 rounded-xl ${activeFaq === i ? "bg-gradient-to-r from-blue-500 to-cyan-500" : "bg-gray-100"} flex items-center justify-center`}
                      >
                        <Icon
                          name="HelpCircle"
                          className={`h-6 w-6 ${activeFaq === i ? "text-white" : "text-gray-600"}`}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.question}
                      </h3>
                    </div>
                    <Icon
                      name={activeFaq === i ? "ChevronUp" : "ChevronDown"}
                      className="h-6 w-6 text-gray-500"
                    />
                  </button>

                  {activeFaq === i && (
                    <div className="p-8 pt-0">
                      <div className="pl-18">
                        <p className="text-gray-700 text-lg leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* === 8. ФИЛЬТРАЦИЯ — ОГРАНИЧЕНИЯ === */}
        <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-white to-red-100 rounded-full text-red-700 font-bold mb-6 border border-red-200">
                  <Icon name="AlertTriangle" className="h-6 w-6 mr-3" />
                  ЧЕСТНО ОГОВОРИМ УСЛОВИЯ
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                  С чем мы <span className="text-red-600">НЕ работаем</span>
                </h2>
                <p className="text-xl text-gray-700">
                  Чтобы не тратить ваше и наше время
                </p>
              </div>

              <Card className="p-10 bg-white border-2 border-red-200 shadow-xl">
                <div className="space-y-8">
                  {restrictions.map((item, i) => (
                    <div key={i} className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-red-100 to-orange-100 border border-red-200 flex items-center justify-center flex-shrink-0">
                        <Icon name="XCircle" className="h-7 w-7 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-gray-700 text-lg">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="mt-12 p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
                    <div className="text-center">
                      <div className="text-3xl font-black text-green-700 mb-4">
                        Если ваша ситуация подходит:
                      </div>
                      <div className="text-5xl font-black text-green-600 mb-3">
                        85-90%
                      </div>
                      <div className="text-2xl font-bold text-green-800 mb-4">
                        вернем деньги
                      </div>
                      <p className="text-green-700 text-lg font-medium">
                        Работаем за результат • Первая консультация бесплатно
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* === 9. ФОРМА — ПРИЗЫВ К ДЕЙСТВИЮ === */}
        <section
          id="action"
          className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-bold mb-6 shadow-lg">
                  <Icon name="Target" className="h-6 w-6 mr-3" />
                  ПРИШЛО ВРЕМЯ ВЫБИРАТЬ
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-8">
                  Один из <span className="text-cyan-300">двух вариантов</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Каждый день промедления уменьшает ваши шансы на возврат денег
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* Вариант 1 */}
                <div className="p-10 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl border-2 border-red-500/30">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-6 mx-auto">
                      <Icon name="X" className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-3xl font-black text-red-300 mb-2">
                      Самостоятельно
                    </div>
                    <div className="text-gray-400">или с обычным юристом</div>
                  </div>

                  <ul className="space-y-6">
                    {[
                      "Тратите время на изучение законов",
                      "Делаете ошибки, которые затягивают процесс",
                      "Должник находит новые лазейки",
                      "Вернете 0-30% долга за 1-2 года",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Icon
                          name="X"
                          className="h-6 w-6 text-red-400 mr-4 mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-300 text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 pt-8 border-t border-gray-700 text-center">
                    <div className="text-4xl font-black text-red-400">
                      Вы теряете
                    </div>
                    <div className="text-2xl font-bold text-red-300">
                      время и деньги
                    </div>
                  </div>
                </div>

                {/* Вариант 2 */}
                <div className="p-10 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-3xl border-2 border-cyan-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-8 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-bl-lg shadow-lg">
                    <span className="font-bold text-white">
                      ВЫБОР 90% КЛИЕНТОВ
                    </span>
                  </div>

                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-6 mx-auto">
                      <Icon name="Check" className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-3xl font-black text-cyan-300 mb-2">
                      С нами
                    </div>
                    <div className="text-gray-300">
                      профессиональное взыскание
                    </div>
                  </div>

                  <ul className="space-y-6">
                    {[
                      "Мы действуем с первого дня",
                      "Знаем все уловки должников",
                      "Действуем одновременно по всем направлениям",
                      "Вернете 50-100% долга за 4-8 месяцев",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Icon
                          name="Check"
                          className="h-6 w-6 text-green-400 mr-4 mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-100 text-lg font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 pt-8 border-t border-cyan-700 text-center">
                    <div className="text-4xl font-black text-cyan-300">
                      Вы получаете
                    </div>
                    <div className="text-2xl font-bold text-green-300">
                      свои деньги назад
                    </div>
                  </div>
                </div>
              </div>

              {/* Форма */}
              <Card className="p-10 bg-gradient-to-br from-white to-gray-50 border-2 border-cyan-200 shadow-2xl">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full text-cyan-700 font-bold mb-6">
                    <Icon name="Zap" className="h-6 w-6 mr-3" />
                    ЭКСПРЕСС-АНАЛИЗ ВАШЕГО ДЕЛА
                  </div>
                  <h3 className="text-4xl font-black text-gray-900 mb-4">
                    Узнайте, можно ли вернуть{" "}
                    <span className="text-cyan-600">ваши деньги</span>
                  </h3>
                  <p className="text-xl text-gray-600">
                    Ответим за 15 минут. Если шансов нет — скажем честно.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Как вас зовут? <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Иван Иванов"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 text-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Телефон для связи{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 text-lg"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Электронная почта
                    </label>
                    <input
                      type="email"
                      placeholder="Для отправки предварительного плана"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Опишите ситуацию коротко{" "}
                      <span className="text-red-500">*</span>
                      <span className="block text-gray-600 font-normal text-sm mt-1">
                        (Например: "ООО должен 2 млн за поставку с января,
                        директор скрывается")
                      </span>
                    </label>
                    <textarea
                      placeholder="Чем больше деталей, точнее будет анализ..."
                      value={formData.situation}
                      onChange={(e) =>
                        setFormData({ ...formData, situation: e.target.value })
                      }
                      className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 text-lg min-h-[140px]"
                      required
                    />
                  </div>

                  {/* Что будет после */}
                  <div className="p-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border-2 border-cyan-200">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg flex-shrink-0">
                        <Icon name="Clock" className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cyan-900 mb-4">
                          Что будет после заявки:
                        </div>
                        <ol className="list-decimal list-inside text-gray-800 space-y-3 text-lg">
                          <li>
                            Перезвоним в течение 15 минут (в рабочее время)
                          </li>
                          <li>Зададим 5-7 уточняющих вопросов по телефону</li>
                          <li>
                            Сразу скажем, есть ли реальные рычаги воздействия
                          </li>
                          <li>
                            Если шансы есть — предложим план действий и
                            стоимость
                          </li>
                          <li>
                            Если нет — объясним почему и что можно сделать
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Кнопка отправки */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 py-8 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
                    onClick={() => trackButtonClick("form_submit")}
                  >
                    <Icon name="Send" className="h-7 w-7 mr-3" />
                    Получить честный анализ ситуации
                  </Button>

                  <p className="text-center text-gray-500 text-sm mt-6">
                    Отправляя заявку, вы соглашаетесь с политикой
                    конфиденциальности.
                    <br />
                    Мы не передаем ваши данные третьим лицам и не рассылаем
                    спам.
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
