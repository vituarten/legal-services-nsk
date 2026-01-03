import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ServicesMain = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Функция для отслеживания
  const trackPhoneClick = (context: string) => {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(106063131, "reachGoal", `phone_click_${context}`);
    }
  };

  const handlePhoneClick = (e: React.MouseEvent, context: string) => {
    e.preventDefault();
    trackPhoneClick(context);
    window.location.href = "tel:+79931903500";
  };

  const serviceCategories = [
    {
      icon: "Car",
      title: "Автоюрист",
      description: "ДТП, страховые споры, лишение прав",
      link: "/dtp-lawyer",
    },
    {
      icon: "Users",
      title: "Семейное право",
      description: "Разводы, алименты, раздел имущества",
      link: "/family-lawyer",
    },
    {
      icon: "TrendingDown",
      title: "Банкротство",
      description: "Списание долгов, защита от кредиторов",
      link: "/bankruptcy-lawyer",
    },
    {
      icon: "FileText",
      title: "Миграционное право",
      description: "РВП, ВНЖ, гражданство, депортация",
      link: "/migration",
    },
    {
      icon: "Home",
      title: "Недвижимость",
      description: "Сделки, споры с застройщиками",
      link: "/real-estate-lawyer",
    },
    {
      icon: "Shield",
      title: "Уголовная защита",
      description: "Защита на следствии и в суде",
      link: "/criminal-lawyer",
    },
  ];

  return (
    <section id="services" className="py-12 sm:py-16 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            Наши услуги
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Комплексная юридическая поддержка от консультации до суда
          </p>
        </div>

        {/* Услуги */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 sm:mb-12">
          {serviceCategories.map((service, index) => (
            <Link key={index} to={service.link} className="block h-full">
              <Card className="h-full hover:shadow-lg transition-all duration-300 border hover:border-primary cursor-pointer">
                <CardContent className="p-4 sm:p-5 space-y-3">
                  <div className="inline-block p-2.5 sm:p-3 bg-primary/10 rounded-lg">
                    <Icon
                      name={service.icon as any}
                      className="h-5 w-5 sm:h-6 sm:w-6 text-primary"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium pt-1">
                    <span className="mr-1.5">Подробнее</span>
                    <Icon name="ArrowRight" className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Преимущества */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
          {[
            {
              icon: "FileText",
              title: "Документы",
              desc: "Подготовка всех документов",
            },
            {
              icon: "MessageSquare",
              title: "Консультация",
              desc: "Разбор ситуации за 15 минут",
            },
            {
              icon: "Briefcase",
              title: "Сопровождение",
              desc: "Ведение дела в суде",
            },
            {
              icon: "CreditCard",
              title: "Оплата",
              desc: "Фиксированная цена",
            },
          ].map((item, idx) => (
            <Card
              key={idx}
              className="border-border hover:border-primary/30 transition-all"
            >
              <CardContent className="p-4 text-center space-y-2">
                <div className="inline-block p-2 rounded-lg bg-primary/10 mb-2">
                  <Icon
                    name={item.icon as any}
                    className="h-4 w-4 text-primary"
                  />
                </div>
                <h3 className="text-sm font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* УСИЛЕННЫЙ CTA БАННЕР С ОТСЛЕЖИВАНИЕМ */}
        <Card className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-white border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative">
          <CardContent className="p-6 sm:p-8 md:p-10 relative">
            <div className="text-center space-y-5 sm:space-y-6">
              {/* Заголовок */}
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
                  ⚖️ Решите проблему сегодня — получите план действий за 15
                  минут!
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-blue-100/90 max-w-2xl mx-auto">
                  Не откладывайте решение юридического вопроса. Позвоните сейчас
                  и получите:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-lg font-bold mb-1">1</div>
                    <p className="text-sm">Анализ вашей ситуации</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-lg font-bold mb-1">2</div>
                    <p className="text-sm">План действий</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-lg font-bold mb-1">3</div>
                    <p className="text-sm">Расчёт стоимости</p>
                  </div>
                </div>
              </div>

              {/* Кнопки с разным отслеживанием */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
                <Button
                  size={isMobile ? "default" : "lg"}
                  className="bg-white text-primary hover:bg-gray-50 font-bold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all group"
                  onClick={(e) => handlePhoneClick(e, "cta_main")}
                >
                  <Icon name="Phone" className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                  <span className="relative">
                    СРОЧНЫЙ ЗВОНОК
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      +7 993 ••• •• 00
                    </span>
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg"
                  asChild
                >
                  <a
                    href="#contacts"
                    onClick={() => trackPhoneClick("cta_form")}
                  >
                    <Icon
                      name="MessageSquare"
                      className="h-5 w-5 sm:h-6 sm:w-6 mr-2"
                    />
                    Записаться на консультацию
                  </a>
                </Button>
              </div>

              {/* Раскрываемый телефон */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setShowPhone(!showPhone);
                    if (!showPhone) trackPhoneClick("phone_reveal");
                  }}
                  className="text-xs sm:text-sm text-blue-100/80 hover:text-white transition-colors flex items-center gap-1.5 mx-auto"
                >
                  <Icon
                    name={showPhone ? "EyeOff" : "Eye"}
                    className="h-3 w-3"
                  />
                  <span>
                    {showPhone
                      ? "Скрыть телефон"
                      : "Показать телефон для звонка"}
                  </span>
                </button>

                {showPhone && (
                  <div className="mt-3 p-4 bg-white/10 rounded-xl border border-white/20 animate-in fade-in">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="text-left">
                        <p className="font-medium">Прямой телефон юриста:</p>
                        <p className="text-xs text-blue-100/70">
                          Нажмите для звонка
                        </p>
                      </div>
                      <a
                        href="tel:+79931903500"
                        className="text-2xl font-bold text-white hover:text-yellow-200 transition-colors"
                        onClick={() => trackPhoneClick("cta_revealed")}
                      >
                        +7 993 190 35 00
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Гарантии */}
              <div className="pt-4 sm:pt-6 border-t border-white/20">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm text-blue-100">
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle" className="h-4 w-4" />
                    <span>Бесплатный анализ ситуации</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Shield" className="h-4 w-4" />
                    <span>Конфиденциально</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" className="h-4 w-4" />
                    <span>15 минут консультации</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ServicesMain;
