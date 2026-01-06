import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";
import { useState } from "react";

export default function PrivateDebtCollectionPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof window !== "undefined" && window.ym) {
      window.ym(106063131, "reachGoal", "form_submit");
    }

    toast.success("Заявка принята! Мы перезвоним вам в течение 30 минут");
    setFormData({ name: "", phone: "" });
  };

  const handlePhoneClick = () => {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(106063131, "reachGoal", "phone_click");
    }
  };

  const trackButtonClick = (buttonName: string) => {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(106063131, "reachGoal", `${buttonName}_click`);
    }
  };

  const situations = [
    {
      icon: "Users",
      title: "Долг по расписке",
      description:
        "Друг, знакомый, сосед взял деньги под расписку и не возвращает",
    },
    {
      icon: "Home",
      title: "Долг за аренду",
      description: "Жилец не платит за квартиру или комнату, не выезжает",
    },
    {
      icon: "Wrench",
      title: "Долг за ремонт/услуги",
      description: "Сделали ремонт, оказали услуги — клиент исчез без оплаты",
    },
    {
      icon: "Car",
      title: "Долг за автомобиль",
      description: "Продали машину, а покупатель не доплатил",
    },
    {
      icon: "Briefcase",
      title: "Партнерский долг",
      description: "Бывший партнер по бизнесу должен деньги",
    },
    {
      icon: "HeartHandshake",
      title: "Семейный долг",
      description: "Родственник занял и избегает общения",
    },
  ];

  const steps = [
    {
      num: "1",
      title: "Консультация",
      text: "Бесплатный общий анализ вашей ситуации",
    },
    {
      num: "2",
      title: "Стратегия",
      text: "Разрабатываем план действий по возврату денег",
    },
    {
      num: "3",
      title: "Реализация",
      text: "Ведем переговоры, готовим документы",
    },
    {
      num: "4",
      title: "Результат",
      text: "Возвращаем ваши деньги на счет",
    },
  ];

  const advantages = [
    {
      icon: "Percent",
      title: "За результат",
      text: "Часто работаем за процент от возвращенной суммы",
    },
    {
      icon: "Shield",
      title: "По закону",
      text: "Только правовые методы, никаких угроз",
    },
    {
      icon: "EyeOff",
      title: "Конфиденциально",
      text: "Никто не узнает, что вы взыскиваете долг",
    },
    {
      icon: "Zap",
      title: "Быстро",
      text: "Начинаем действовать в течение 24 часов",
    },
  ];

  const cases = [
    {
      amount: "850 000 ₽",
      result: "Полностью вернули",
      details: "Долг по расписке от бывшего друга",
    },
    {
      amount: "350 000 ₽",
      result: "Вернули 300 000 ₽",
      details: "Долг за ремонт квартиры",
    },
    {
      amount: "1 200 000 ₽",
      result: "Вернули 900 000 ₽",
      details: "Семейный долг между братьями",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Вернуть деньги с должника | Взыскание долгов между частными лицами
        </title>
        <meta
          name="description"
          content="Вернем деньги с друзей, знакомых, родственников. Долги по распискам, за аренду, услуги. Бесплатная консультация. Конфиденциально."
        />

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          
          ym(106063131, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          });`,
          }}
        />

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
        {/* Hero секция */}
        <section className="pt-28 pb-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-700 font-medium mb-6 border border-red-200">
                  <Icon name="AlertCircle" className="h-5 w-5 mr-2" />
                  Только для физических лиц
                </div>

                <h1 className="text-5xl font-bold mb-6 leading-tight">
                  Вам должен друг, знакомый, родственник?
                  <br />
                  <span className="text-blue-600">Вернем ваши деньги</span>
                </h1>

                <p className="text-xl text-gray-600 mb-8">
                  Долги по распискам, за аренду, услуги или просто "одолжил и не
                  вернул". Работаем конфиденциально. Первая консультация —
                  бесплатно.
                </p>

                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <Icon
                      name="CheckCircle"
                      className="h-6 w-6 text-green-500 mr-3"
                    />
                    <span className="text-lg font-medium">
                      Бесплатная консультация — 15 минут
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Icon
                      name="CheckCircle"
                      className="h-6 w-6 text-green-500 mr-3"
                    />
                    <span className="text-lg font-medium">
                      Работаем по всей России удаленно
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Icon
                      name="CheckCircle"
                      className="h-6 w-6 text-green-500 mr-3"
                    />
                    <span className="text-lg font-medium">
                      Часто — оплата за результат
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="text-lg bg-red-600 hover:bg-red-700 shadow-lg"
                    onClick={() => trackButtonClick("hero_button")}
                    asChild
                  >
                    <a href="#form">
                      <Icon name="MessageSquare" className="h-5 w-5 mr-2" />
                      Бесплатная консультация
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg border-gray-300"
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

                <div className="mt-6 text-sm text-gray-500">
                  <Icon name="Clock" className="h-4 w-4 inline mr-1" />
                  Звоните с 9:00 до 21:00 по Новосибирску
                </div>
              </div>

              {/* Блок статистики */}
              <div className="hidden lg:block">
                <Card className="p-8 rounded-2xl shadow-xl border-t-4 border-blue-500">
                  <div className="space-y-8">
                    <div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        &gt; 70%
                      </div>
                      <div className="text-gray-600">
                        долгов возвращаются без суда
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold mb-4">
                        Мы знаем, как заставить платить:
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Icon
                            name="CheckCircle"
                            className="h-5 w-5 text-green-500 mr-3"
                          />
                          <span>Через давление на репутацию</span>
                        </div>
                        <div className="flex items-center">
                          <Icon
                            name="CheckCircle"
                            className="h-5 w-5 text-green-500 mr-3"
                          />
                          <span>Через угрозу судебного разбирательства</span>
                        </div>
                        <div className="flex items-center">
                          <Icon
                            name="CheckCircle"
                            className="h-5 w-5 text-green-500 mr-3"
                          />
                          <span>Через психологическое воздействие</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Ситуации */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                С какими долгами работаем
              </h2>
              <p className="text-lg text-gray-600">
                Вернем деньги в самых распространенных ситуациях
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {situations.map((item, i) => (
                <Card
                  key={i}
                  className="p-6 hover:shadow-lg transition-all duration-300 border hover:border-blue-300"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={item.icon} className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Этапы работы */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Как мы работаем
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {step.num}
                  </div>
                  <Card className="p-6 pt-12 h-full bg-white">
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.text}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Почему мы</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((adv, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={adv.icon} className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{adv.title}</h3>
                  <p className="text-gray-600">{adv.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ограничения */}
        <section className="py-20 bg-red-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-white rounded-full text-red-700 font-medium mb-4 border border-red-200">
                  <Icon name="AlertTriangle" className="h-5 w-5 mr-2" />
                  Важная информация
                </div>
                <h2 className="text-4xl font-bold mb-4">Что нужно знать</h2>
              </div>

              <Card className="p-8 bg-white">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Icon
                      name="Info"
                      className="h-6 w-6 text-blue-600 mr-3 mt-0.5"
                    />
                    <div>
                      <h4 className="font-semibold text-lg mb-2">
                        Бесплатная консультация включает:
                      </h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Общий анализ ситуации (без изучения документов)</li>
                        <li>Объяснение возможных вариантов действий</li>
                        <li>Ответы на общие вопросы</li>
                        <li>Ориентировочные сроки и стоимость услуг</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Icon
                      name="XCircle"
                      className="h-6 w-6 text-red-600 mr-3 mt-0.5"
                    />
                    <div>
                      <h4 className="font-semibold text-lg mb-2">
                        Мы НЕ работаем:
                      </h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>
                          С исполнительными листами (уже есть решение суда)
                        </li>
                        <li>С корпоративными долгами (только физлица)</li>
                        <li>По заведомо безнадежным делам</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="font-semibold text-blue-900 mb-2">
                      Для детального анализа нужны:
                    </div>
                    <p className="text-blue-800">
                      Документы, подтверждающие долг (расписка, договор,
                      переписка). Детальный анализ документов и оценка
                      перспектив — платная услуга.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Кейсы */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Примеры из практики
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {cases.map((c, i) => (
                <Card key={i} className="p-8">
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {c.amount}
                    </div>
                    <div className="text-lg font-semibold text-green-700">
                      {c.result}
                    </div>
                  </div>
                  <p className="text-gray-700">{c.details}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Форма */}
        <section
          id="form"
          className="py-20 bg-gradient-to-r from-blue-900 to-gray-900 text-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  Бесплатная консультация
                </h2>
                <p className="text-xl opacity-90">
                  Общий анализ ситуации за 15 минут*
                </p>
              </div>

              <Card className="p-8 bg-white text-gray-900">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      placeholder="Как к вам обращаться?"
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
                      Телефон для связи *
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

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">
                        * Бесплатная консультация включает:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Общий анализ ситуации (без изучения документов)</li>
                        <li>Объяснение возможных вариантов действий</li>
                        <li>Ответы на общие вопросы</li>
                        <li>Ориентировочные сроки и стоимость услуг</li>
                      </ul>
                      <p className="mt-2 text-sm">
                        Детальный анализ документов и оценка перспектив дела —
                        платная услуга.
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg bg-red-600 hover:bg-red-700 py-6"
                    onClick={() => trackButtonClick("form_submit")}
                  >
                    <Icon name="Phone" className="h-5 w-5 mr-2" />
                    Заказать консультацию
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
                <Button
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10"
                  onClick={() => {
                    handlePhoneClick();
                    trackButtonClick("bottom_phone");
                  }}
                  asChild
                >
                  <a href="tel:73832359505">
                    <Icon name="Phone" className="h-5 w-5 mr-2" />
                    Или просто позвоните: +7 (383) 235-95-05
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
