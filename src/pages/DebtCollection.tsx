import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export default function PrivateDebtCollectionPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [downloadClicked, setDownloadClicked] = useState(false);

  // Добавляем скрипт Яндекс.Метрики через useEffect
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){
          (m[i].a=m[i].a||[]).push(arguments)
        };
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) { return; }
        }
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
      ym(106063131, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
      });
    `;
    document.head.appendChild(script);

    return () => {
      // При размонтировании удаляем скрипт
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof window !== "undefined" && (window as any).ym) {
      (window as any).ym(106063131, "reachGoal", "form_submit");
    }

    toast.success(
      "Спасибо! Мы перезвоним вам в течение 30 минут, чтобы обсудить вашу ситуацию",
    );
    setFormData({ name: "", phone: "" });
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
      `Мы отправили "${docTitle}" на вашу почту. Проверьте папку "Входящие" или "Спам"`,
    );
  };

  // Документы для скачивания
  const freeDocuments = [
    {
      title: "Образец расписки с максимальной защитой",
      description: "Шаблон, который не оставит должнику шансов в суде",
      icon: "FileText",
    },
    {
      title: 'Чек-лист "Как вести переговоры с должником"',
      description: "10 фраз, которые заставят человека вернуть деньги",
      icon: "MessageSquare",
    },
    {
      title: "Шаблон претензии о возврате денег",
      description: "Готовый текст, который отправляем перед судом",
      icon: "Send",
    },
    {
      title: 'Памятка "Что делать, если должник скрывается"',
      description: "Пошаговый план поиска и действий",
      icon: "Search",
    },
  ];

  // Ситуации - перефразируем с позиции клиента
  const situations = [
    {
      icon: "Users",
      title: "Долг по расписке",
      description:
        "Человек, которому вы доверяли, не возвращает деньги по расписке",
      question: 'Должник говорит "отдам позже", но сроки давно прошли?',
    },
    {
      icon: "Home",
      title: "Долг за аренду",
      description:
        "Жилец задерживает оплату, а вы не знаете, как законно его выселить",
      question: "Арендатор не платит, но продолжает жить в вашей квартире?",
    },
    {
      icon: "Wrench",
      title: "Долг за ремонт или услуги",
      description: "Вы выполнили работу, а клиент исчез, не оплатив ваш труд",
      question: 'Клиент доволен работой, но "забывает" оплатить счет?',
    },
    {
      icon: "Car",
      title: "Долг за автомобиль",
      description:
        "Покупатель машины не доплатил оставшуюся сумму и перестал выходить на связь",
      question:
        "Покупатель забрал машину, а обещанные платежи так и не поступили?",
    },
    {
      icon: "Briefcase",
      title: "Партнерский долг",
      description:
        "Бывший партнер по бизнесу должен деньги за вклад в общее дело",
      question:
        "Деловой партнер обещал вернуть долю, но теперь избегает встреч?",
    },
    {
      icon: "HeartHandshake",
      title: "Семейный или дружеский долг",
      description:
        "Близкий человек занял крупную сумму и теперь не отвечает на звонки",
      question: "Боитесь испортить отношения, но деньги вам нужны?",
    },
  ];

  // Преимущества - говорим о выгоде для клиента
  const advantages = [
    {
      icon: "Percent",
      title: "Вы платите только когда получаете деньги",
      text: "В большинстве случаев мы работаем за процент от возвращенной суммы. Риск — на нас.",
    },
    {
      icon: "Shield",
      title: "Сохраняем ваши нервы и отношения",
      text: "Мы становимся буфером между вами и должником. Все переговоры ведем мы.",
    },
    {
      icon: "Zap",
      title: "Действуем быстро и профессионально",
      text: "За 3 дня создаем такое давление, что 40% должников начинают возвращать деньги.",
    },
    {
      icon: "EyeOff",
      title: "Полная конфиденциальность",
      text: "Никто не узнает, что вы обратились к юристу. Особенно важно при семейных долгах.",
    },
    {
      icon: "Target",
      title: "Знаем, как заставить платить",
      text: 'У каждого должника есть "болевые точки". Мы находим их и используем законно.',
    },
    {
      icon: "Clock",
      title: "Вернем деньги быстрее, чем вы думаете",
      text: "Средний срок возврата — 2-3 месяца. В 70% случаев удается решить вопрос без суда.",
    },
  ];

  // Этапы работы - объясняем простыми словами
  const steps = [
    {
      num: "1",
      title: "Вы рассказываете нам ситуацию",
      text: "Бесплатно. Просто опишите, кто, сколько и как давно должен. Мы сразу поймем, можно ли помочь.",
      duration: "15 минут",
    },
    {
      num: "2",
      title: "Мы анализируем и предлагаем план",
      text: "Изучаем ваши документы (если есть) и объясняем, какие у вас есть рычаги воздействия.",
      duration: "1-2 дня",
    },
    {
      num: "3",
      title: "Начинаем работать с должником",
      text: "Юридически грамотные претензии, переговоры, психологическое давление — всё по закону.",
      duration: "2-3 недели",
    },
    {
      num: "4",
      title: "Доводим дело до результата",
      text: "Либо деньги возвращаются на досудебной стадии, либо идем в суд и взыскиваем через него.",
      duration: "1-4 месяца",
    },
  ];

  // Реальные вопросы, которые задают клиенты
  const faq = [
    {
      question: "А если у меня нет расписки?",
      answer:
        "Расписка — не единственное доказательство. Переписка в мессенджерах, свидетельские показания, банковские переводы — всё это можно использовать.",
    },
    {
      question: "Что делать, если должник скрывается?",
      answer:
        "Мы знаем, как найти человека: через соцсети, родственников, место работы. В 85% случаев удается установить контакт.",
    },
    {
      question: "А если прошло уже много времени?",
      answer:
        "Срок исковой давности — 3 года, но он прерывается, если должник признал долг. Часто даже старые долги можно вернуть.",
    },
    {
      question: "Не испортятся ли отношения с должником?",
      answer:
        "Мы действуем максимально тактично. Часто должник даже не знает, что вы обратились к юристу — думает, что это стандартная процедура банка или коллекторов.",
    },
  ];

  // Полезная информация для принятия решения
  const usefulInfo = [
    {
      title: "Средний срок возврата долга",
      value: "2-3 месяца",
      description:
        "Именно столько нужно, чтобы заставить должника заплатить в 70% случаев",
    },
    {
      title: "Долги, которые возвращаются без суда",
      value: "72%",
      description:
        "Большинство должников начинают платить после наших первых же действий",
    },
    {
      title: "Минимальная сумма для обращения",
      value: "от 50 000 ₽",
      description:
        "Если долг меньше, судиться часто невыгодно — судебные издержки съедят возвращенное",
    },
    {
      title: "Шанс вернуть деньги",
      value: "85-90%",
      description: "При условии, что есть хоть какие-то доказательства долга",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Поможем вернуть деньги с должника | Взыскание долгов между частными
          лицами
        </title>
        <meta
          name="description"
          content="Вернем ваши деньги с друзей, знакомых, родственников. Долги по распискам, за аренду, услуги. Работаем за результат. Конфиденциально."
        />

        {/* NoScript для Яндекс.Метрики */}
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/106063131"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero секция - вместо боли показываем понимание */}
        <section className="pt-28 pb-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium mb-6">
                <Icon name="HandHeart" className="h-5 w-5 mr-2" />
                Поможем вернуть ваши деньги
              </div>

              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Вам должны деньги, а должник{" "}
                <span className="text-blue-600">не отвечает</span> на звонки?
              </h1>

              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                Долги по распискам, за аренду, услуги или просто "одолжил и не
                вернул".
                <br />
                <span className="font-semibold">
                  Мы поможем вернуть ваши деньги
                </span>{" "}
                — профессионально, тактично и, в большинстве случаев, без суда.
              </p>

              <div className="bg-white rounded-xl p-8 shadow-lg mb-12 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Скорее всего, вы уже пробовали:
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Icon
                      name="PhoneOff"
                      className="h-5 w-5 text-gray-500 mr-3"
                    />
                    <span>Звонить и писать</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Icon name="Users" className="h-5 w-5 text-gray-500 mr-3" />
                    <span>Просить через общих знакомых</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Icon name="Clock" className="h-5 w-5 text-gray-500 mr-3" />
                    <span>Ждать "когда будет возможность"</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Icon
                      name="AlertTriangle"
                      className="h-5 w-5 text-gray-500 mr-3"
                    />
                    <span>Угрожать (и жалеть об этом)</span>
                  </div>
                </div>
                <p className="text-center mt-6 text-gray-700">
                  Если эти методы не работают — пора действовать
                  профессионально.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  className="text-lg bg-blue-600 hover:bg-blue-700 shadow-lg px-8 py-6"
                  onClick={() => trackButtonClick("hero_consultation")}
                  asChild
                >
                  <a href="#consultation">
                    <Icon name="MessageSquare" className="h-5 w-5 mr-2" />
                    Бесплатно обсудить мою ситуацию
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg border-gray-300 px-8 py-6"
                  onClick={() => {
                    handlePhoneClick();
                    trackButtonClick("hero_phone");
                  }}
                  asChild
                >
                  <a href="tel:73832359505">
                    <Icon name="Phone" className="h-5 w-5 mr-2" />
                    +7 (383) 235-95-05
                  </a>
                </Button>
              </div>

              <div className="text-sm text-gray-500">
                <Icon name="Shield" className="h-4 w-4 inline mr-1" />
                Первая консультация — бесплатно и без обязательств
              </div>
            </div>
          </div>
        </section>

        {/* Полезная информация для принятия решения */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Что нужно знать, прежде чем действовать
              </h2>
              <p className="text-lg text-gray-600">
                Факты, которые помогут вам принять правильное решение
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {usefulInfo.map((info, i) => (
                <Card
                  key={i}
                  className="p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {info.value}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{info.title}</h3>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </Card>
              ))}
            </div>

            <div className="mt-16 max-w-3xl mx-auto">
              <Card className="p-8 bg-gradient-to-r from-blue-50 to-white border-blue-200">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Когда нужно обращаться к юристу?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Icon
                      name="CheckCircle"
                      className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold mb-1">
                        Должник игнорирует вас больше месяца
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Чем дольше ждете — тем сложнее вернуть деньги
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Icon
                      name="CheckCircle"
                      className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold mb-1">
                        Сумма долга значима для вас
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Если потеря этих денег ощутима для вашего бюджета
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Icon
                      name="CheckCircle"
                      className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold mb-1">
                        Вы устали от неопределенности
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Постоянные мысли о долге мешают жить и работать
                      </p>
                    </div>
                  </div>
                  <div className="text-center mt-6">
                    <Button
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-50"
                      onClick={() => trackButtonClick("when_to_contact")}
                      asChild
                    >
                      <a href="#consultation">
                        <Icon name="HelpCircle" className="h-4 w-4 mr-2" />
                        Не уверены, пора ли обращаться? Спросите у нас
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Ситуации - с вопросами, а не констатацией */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Знакомые ситуации?</h2>
              <p className="text-lg text-gray-600">
                Мы помогаем в самых разных случаях
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {situations.map((item, i) => (
                <Card
                  key={i}
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border hover:border-blue-300 cursor-pointer group"
                  onClick={() => trackButtonClick(`situation_${item.title}`)}
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <Icon name={item.icon} className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm font-medium text-blue-700">
                      {item.question}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Как мы помогаем - простыми словами */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Как мы помогаем вернуть деньги
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                    {step.num}
                  </div>
                  <Card className="p-6 pt-12 h-full bg-white hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.text}</p>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500 flex items-center">
                        <Icon name="Clock" className="h-4 w-4 mr-2" />
                        Обычно занимает: {step.duration}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            <div className="mt-16 max-w-3xl mx-auto">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
                <div className="flex items-start">
                  <Icon
                    name="Lightbulb"
                    className="h-8 w-8 text-green-600 mr-4 mt-1 flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      Почему с нами возвращают деньги чаще
                    </h3>
                    <p className="text-gray-700 mb-6">
                      Большинство людей пытаются действовать сами: уговаривают,
                      угрожают, ждут.
                      <span className="font-semibold">
                        {" "}
                        Профессиональный подход другой
                      </span>
                      : мы создаем систему давления, где каждый шаг заставляет
                      должника думать не "платить или не платить", а "как
                      быстрее и с меньшими потерями вернуть деньги".
                    </p>
                    <div className="flex items-center text-green-700 font-medium">
                      <Icon name="ArrowRight" className="h-5 w-5 mr-2" />
                      Мы переводим ситуацию из эмоциональной в деловую плоскость
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Частые вопросы и сомнения */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Частые вопросы и сомнения
              </h2>
              <p className="text-lg text-gray-600">
                То, о чем обычно спрашивают перед обращением
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {faq.map((item, i) => (
                <Card key={i} className="p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-3 flex items-start">
                    <Icon
                      name="HelpCircle"
                      className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0"
                    />
                    {item.question}
                  </h3>
                  <p className="text-gray-700">{item.answer}</p>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">
                Есть другие вопросы? Спросите на бесплатной консультации — мы
                ответим честно и подробно.
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => trackButtonClick("faq_consultation")}
                asChild
              >
                <a href="#consultation">
                  <Icon name="MessageSquare" className="h-4 w-4 mr-2" />
                  Задать свой вопрос
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Бесплатные документы - как полезный бонус */}
        <section id="documents" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-medium mb-4">
                <Icon name="Gift" className="h-5 w-5 mr-2" />
                Полезные материалы в подарок
              </div>
              <h2 className="text-4xl font-bold mb-4">
                Возьмите эти документы бесплатно
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Даже если вы решите действовать самостоятельно или просто хотите
                разобраться в ситуации
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {freeDocuments.map((doc, i) => (
                <Card
                  key={i}
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={doc.icon} className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{doc.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {doc.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                    onClick={() => handleDownloadClick(doc.title)}
                  >
                    <Icon name="Download" className="h-4 w-4 mr-2" />
                    Получить бесплатно
                  </Button>
                </Card>
              ))}
            </div>

            {downloadClicked && (
              <div className="max-w-2xl mx-auto mt-12 p-8 bg-gradient-to-r from-blue-50 to-white rounded-2xl border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon
                      name="MessageCircle"
                      className="h-6 w-6 text-blue-600"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Получили документы? Отлично!
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Теперь у вас есть полезные инструменты. Но помните:{" "}
                      <span className="font-semibold">
                        каждая ситуация уникальна
                      </span>
                      . То, что работает в одном случае, может не сработать в
                      другом.
                    </p>
                    <p className="text-gray-700 mb-6">
                      Если хотите быть уверены на 100%, давайте обсудим вашу
                      ситуацию индивидуально.
                    </p>
                    <Button
                      asChild
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() =>
                        trackButtonClick("documents_to_consultation")
                      }
                    >
                      <a href="#consultation">
                        <Icon name="Phone" className="h-4 w-4 mr-2" />
                        Обсудить мою ситуацию с юристом
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Форма консультации */}
        <section
          id="consultation"
          className="py-20 bg-gradient-to-r from-blue-900 to-gray-900 text-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  Бесплатная консультация
                </h2>
                <p className="text-xl opacity-90">
                  Обсудим вашу ситуацию и расскажем, что можно сделать
                </p>
              </div>

              <Card className="p-8 bg-white text-gray-900">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon
                      name="MessageSquare"
                      className="h-8 w-8 text-blue-600"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Расскажите о своей ситуации
                  </h3>
                  <p className="text-gray-600">
                    Мы выслушаем, зададим уточняющие вопросы и объясним:
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-start mb-4">
                    <Icon
                      name="CheckCircle"
                      className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span>Какие у вас есть варианты действий</span>
                  </div>
                  <div className="flex items-start mb-4">
                    <Icon
                      name="CheckCircle"
                      className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span>Какие шансы вернуть деньги в вашем случае</span>
                  </div>
                  <div className="flex items-start mb-4">
                    <Icon
                      name="CheckCircle"
                      className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span>Сколько времени это может занять</span>
                  </div>
                  <div className="flex items-start">
                    <Icon
                      name="CheckCircle"
                      className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span>Во сколько примерно обойдется</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                  <p className="text-blue-800 text-sm text-center">
                    Консультация — это просто разговор. Вы ничего не теряете, но
                    можете многое понять.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Как вас зовут?
                    </label>
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Телефон для связи
                    </label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg bg-blue-600 hover:bg-blue-700 py-6"
                    onClick={() => trackButtonClick("consultation_form_submit")}
                  >
                    <Icon name="Phone" className="h-5 w-5 mr-2" />
                    Обсудить мою ситуацию
                  </Button>

                  <p className="text-xs text-center text-gray-500 mt-4">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a href="/policy" className="text-blue-600 hover:underline">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              </Card>

              <div className="text-center mt-8">
                <div className="inline-flex items-center px-4 py-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Icon name="Phone" className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Или просто позвоните:</div>
                    <a
                      href="tel:73832359505"
                      className="text-2xl font-bold hover:text-blue-300 transition-colors"
                      onClick={() => {
                        handlePhoneClick();
                        trackButtonClick("bottom_phone_large");
                      }}
                    >
                      +7 (383) 235-95-05
                    </a>
                  </div>
                </div>
                <p className="text-sm opacity-80 mt-4">
                  Звоните с 9:00 до 21:00. Ответим на вопросы и запишем на
                  консультацию.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
