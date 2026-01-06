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

  // 1. Яндекс.Метрика добавляется ДИНАМИЧЕСКИ через useEffect
  useEffect(() => {
    // Создаем script для метрики
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

    // Создаем noscript для метрики
    const noscript = document.createElement("noscript");
    const img = document.createElement("img");
    img.src = "https://mc.yandex.ru/watch/106063131";
    img.style.cssText = "position:absolute; left:-9999px;";
    img.alt = "";
    noscript.appendChild(img);

    // Добавляем оба в head
    document.head.appendChild(script);
    document.head.appendChild(noscript);

    return () => {
      // Удаляем при размонтировании
      document.head.removeChild(script);
      document.head.removeChild(noscript);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Отслеживание цели
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
    // window.location.href = 'tel:+73832359505'; // Раскомментировать если нужно
  };

  // Простые данные для отображения
  const situations = [
    {
      icon: "Users",
      title: "Долг по расписке",
      description: "Друг, знакомый, сосед взял деньги и не возвращает",
    },
    {
      icon: "Home",
      title: "Долг за аренду",
      description: "Жилец не платит за квартиру или комнату",
    },
    {
      icon: "Wrench",
      title: "Долг за услуги",
      description: "Выполнили работу, а клиент не оплатил",
    },
    {
      icon: "Car",
      title: "Долг за автомобиль",
      description: "Покупатель не доплатил за машину",
    },
    {
      icon: "Briefcase",
      title: "Партнерский долг",
      description: "Бывший партнер должен деньги",
    },
    {
      icon: "HeartHandshake",
      title: "Семейный долг",
      description: "Родственник занял и не возвращает",
    },
  ];

  const steps = [
    {
      num: "1",
      title: "Консультация",
      text: "Бесплатный анализ вашей ситуации",
    },
    { num: "2", title: "Стратегия", text: "Разрабатываем план возврата денег" },
    {
      num: "3",
      title: "Реализация",
      text: "Ведем переговоры, готовим документы",
    },
    { num: "4", title: "Результат", text: "Возвращаем ваши деньги на счет" },
  ];

  // 2. Helmet БЕЗ noscript внутри - только meta теги
  return (
    <>
      <Helmet>
        <title>Поможем вернуть деньги с должника | Взыскание долгов</title>
        <meta
          name="description"
          content="Вернем ваши деньги с друзей, знакомых, родственников. Долги по распискам, за аренду, услуги. Бесплатная консультация."
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
                вернул". Мы поможем вернуть ваши деньги — профессионально и
                конфиденциально.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  className="text-lg bg-blue-600 hover:bg-blue-700 shadow-lg px-8 py-6"
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
                  onClick={handlePhoneClick}
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
                <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
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
              Как мы помогаем вернуть деньги
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
                  >
                    <Icon name="Phone" className="h-5 w-5 mr-2" />
                    Обсудить мою ситуацию
                  </Button>
                </form>
              </Card>

              <div className="text-center mt-8">
                <div className="inline-flex items-center px-4 py-3 bg-white/10 rounded-lg">
                  <Icon name="Phone" className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Или просто позвоните:</div>
                    <a
                      href="tel:73832359505"
                      className="text-2xl font-bold hover:text-blue-300 transition-colors"
                      onClick={handlePhoneClick}
                    >
                      +7 (383) 235-95-05
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
