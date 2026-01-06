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

  // Яндекс.Метрика - добавляем правильно
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
        webvisor:true,
        ecommerce:"dataLayer"
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

    toast.success("Спасибо! Мы перезвоним вам в течение 30 минут");
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
    toast.info(`Файл "${docTitle}" отправлен`);
  };

  // Данные
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

  const situations = [
    {
      icon: "Users",
      title: "Долг по расписке",
      description:
        "Друг, знакомый, сосед взял деньги под расписку и не возвращает",
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: "Home",
      title: "Долг за аренду",
      description: "Жилец не платит за квартиру или комнату, не выезжает",
      color: "bg-green-100 text-green-700",
    },
    {
      icon: "Wrench",
      title: "Долг за ремонт/услуги",
      description: "Сделали ремонт, оказали услуги — клиент исчез без оплаты",
      color: "bg-orange-100 text-orange-700",
    },
    {
      icon: "Car",
      title: "Долг за автомобиль",
      description: "Продали машину, а покупатель не доплатил оставшуюся сумму",
      color: "bg-purple-100 text-purple-700",
    },
    {
      icon: "Briefcase",
      title: "Партнерский долг",
      description:
        "Бывший партнер по бизнесу должен деньги за вклад в общее дело",
      color: "bg-red-100 text-red-700",
    },
    {
      icon: "HeartHandshake",
      title: "Семейный долг",
      description: "Родственник занял крупную сумму и теперь избегает общения",
      color: "bg-pink-100 text-pink-700",
    },
  ];

  const advantages = [
    {
      icon: "Percent",
      title: "Оплата за результат",
      text: "В сложных случаях работаем за процент от возвращенной суммы. Никаких предоплат.",
      highlight: true,
    },
    {
      icon: "Zap",
      title: "Действуем за 72 часа",
      text: "Пока другие раздумывают — мы уже отправляем претензию и начинаем давление.",
      highlight: true,
    },
    {
      icon: "Shield",
      title: "Работаем по закону",
      text: "Никаких угроз и незаконных методов. Только правовые рычаги давления.",
      highlight: false,
    },
    {
      icon: "EyeOff",
      title: "Конфиденциальность",
      text: "Ваши соседи, знакомые и коллеги не узнают, что вы взыскиваете долг.",
      highlight: false,
    },
    {
      icon: "Clock",
      title: "Экономим ваше время",
      text: "Не нужно ходить по судам и общаться с приставами. Мы делаем всё за вас.",
      highlight: false,
    },
    {
      icon: "Target",
      title: "Знаем слабые места",
      text: "У 95% должников есть что терять: работа, репутация, имущество. Используем это.",
      highlight: false,
    },
  ];

  const steps = [
    {
      num: "1",
      title: "Консультация",
      text: "Бесплатный анализ вашей ситуации. Просто расскажите, кто, сколько и как давно должен.",
      duration: "15 минут",
    },
    {
      num: "2",
      title: "Стратегия",
      text: "Изучаем ваши документы, объясняем рычаги воздействия, предлагаем план.",
      duration: "1-2 дня",
    },
    {
      num: "3",
      title: "Реализация",
      text: "Юридически грамотные претензии, переговоры, психологическое давление — всё по закону.",
      duration: "2-3 недели",
    },
    {
      num: "4",
      title: "Результат",
      text: "Деньги возвращаются на ваш счет. В 72% случаев — без суда.",
      duration: "1-4 месяца",
    },
  ];

  const cases = [
    {
      amount: "850 000 ₽",
      period: "3 года",
      result: "Полностью вернули",
      details:
        "Долг по расписке от бывшего друга. Должник скрывался, менял номера.",
      actions: ["Поиск через соцсети", "Претензия на работу", "Угроза судом"],
    },
    {
      amount: "350 000 ₽",
      period: "1.5 года",
      result: "Вернули 300 000 ₽",
      details: "Долг за ремонт квартиры. Заказчик остался недоволен качеством.",
      actions: ["Экспертиза качества", "Медиация", "Мировое соглашение"],
    },
    {
      amount: "1 200 000 ₽",
      period: "4 года",
      result: "Вернули 900 000 ₽",
      details:
        "Семейный долг между братьями. Конфликт угрожал разрушить семью.",
      actions: [
        "Конфиденциальные переговоры",
        "Рассрочка платежа",
        "Семейный договор",
      ],
    },
  ];

  const faq = [
    {
      question: "А если у меня нет расписки?",
      answer:
        "Расписка — не единственное доказательство. Переписка, свидетельские показания, банковские переводы — всё это можно использовать.",
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
        "Мы действуем максимально тактично. Часто должник даже не знает, что вы обратились к юристу — думает, что это стандартная процедура.",
    },
  ];

  const usefulInfo = [
    {
      title: "Средний срок возврата",
      value: "2-3 месяца",
      description: "Именно столько нужно, чтобы заставить должника заплатить",
    },
    {
      title: "Возврат без суда",
      value: "72%",
      description:
        "Большинство должников начинают платить после наших первых действий",
    },
    {
      title: "Минимальная сумма",
      value: "от 50 000 ₽",
      description: "Если долг меньше, судиться часто невыгодно",
    },
    {
      title: "Шанс вернуть деньги",
      value: "85-90%",
      description: "При условии, что есть доказательства долга",
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
          content="Вернем ваши деньги с друзей, знакомых, родственников. Долги по распискам, за аренду, услуги. Работаем за результат. Конфиденциально. Бесплатная консультация."
        />
        <meta
          name="keywords"
          content="вернуть долг, взыскание долгов, долг по расписке, вернуть деньги, должник не платит, судебное взыскание"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero секция */}
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

        {/* Полезная информация */}
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
          </div>
        </section>

        {/* Ситуации */}
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
                  className="p-6 hover:shadow-lg transition-shadow border hover:border-blue-300"
                  onClick={() => trackButtonClick(`situation_${item.title}`)}
                >
                  <div
                    className={`w-14 h-14 ${item.color.split(" ")[0]} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <Icon
                      name={item.icon}
                      className={`h-7 w-7 ${item.color.split(" ")[1]}`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Почему обращаются к нам
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advantages.map((adv, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-xl border ${adv.highlight ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"}`}
                >
                  <div
                    className={`w-12 h-12 ${adv.highlight ? "bg-blue-100" : "bg-gray-100"} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <Icon
                      name={adv.icon}
                      className={`h-6 w-6 ${adv.highlight ? "text-blue-600" : "text-gray-600"}`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{adv.title}</h3>
                  <p className="text-gray-600">{adv.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Этапы работы */}
        <section className="py-20 bg-white">
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
                        {step.duration}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Бесплатные документы */}
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
                Даже если вы решите действовать самостоятельно
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {freeDocuments.map((doc, i) => (
                <Card
                  key={i}
                  className="p-6 hover:shadow-xl transition-shadow border border-blue-100"
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
                      Теперь у вас есть полезные инструменты. Но помните: каждая
                      ситуация уникальна.
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

        {/* FAQ */}
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
          </div>
        </section>

        {/* Кейсы */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Реальные истории возврата
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {cases.map((c, i) => (
                <Card key={i} className="p-8 hover:shadow-lg transition-shadow">
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {c.amount}
                    </div>
                    <div className="text-sm text-gray-500">
                      не возвращалось {c.period}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-lg font-semibold text-green-700 mb-2">
                      {c.result}
                    </div>
                    <p className="text-gray-700">{c.details}</p>
                  </div>

                  <div className="pt-6 border-t">
                    <div className="text-sm font-semibold text-gray-500 mb-3">
                      Примененные методы:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {c.actions.map((action, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                        >
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
                    Мы выслушаем, зададим уточняющие вопросы и объясним варианты
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

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                    <p className="text-blue-800 text-sm text-center">
                      Консультация — это просто разговор. Вы ничего не теряете,
                      но можете многое понять.
                    </p>
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
