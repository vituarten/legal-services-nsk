import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ServicesMain = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

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

        {/* CTA Баннер - ПРОСТОЙ И ПОНЯТНЫЙ */}
        <Card className="bg-gradient-to-r from-primary to-primary/90 text-white border-none">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center space-y-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                Нужна юридическая помощь?
              </h3>
              <p className="text-sm sm:text-base text-blue-100">
                Получите бесплатную консультацию за 15 минут
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size={isMobile ? "default" : "lg"}
                  className="bg-white text-primary hover:bg-gray-100 px-6 sm:px-8 text-base font-semibold"
                  onClick={(e) => handlePhoneClick(e, "cta_main")}
                >
                  <Icon name="Phone" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  +7 993 190 35 00
                </Button>

                <Button
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  className="border-2 border-white text-white hover:bg-white hover:text-primary px-6 sm:px-8 text-base font-semibold"
                  asChild
                >
                  <a
                    href="#contacts"
                    onClick={() => trackPhoneClick("cta_form")}
                  >
                    <Icon
                      name="MessageCircle"
                      className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
                    />
                    Получить консультацию
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-4 text-xs sm:text-sm text-blue-100">
                <div className="flex items-center gap-1.5">
                  <Icon name="Clock" className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Работаем 24/7</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon name="Shield" className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>100% конфиденциальность</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon name="CheckCircle" className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Опыт с 2016 года</span>
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
