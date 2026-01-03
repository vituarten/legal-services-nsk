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

        {/* УСИЛЕННЫЙ CTA БАННЕР (Новая версия) */}
        <Card className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-white border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative">
          {/* Декоративные элементы */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>

          <CardContent className="p-6 sm:p-8 md:p-10 relative z-10">
            <div className="text-center space-y-5 sm:space-y-6">
              {/* Заголовок с эмоциональным акцентом */}
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
                  Бесплатная консультация за 15 минут — ваши права под защитой!
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-blue-100/90 max-w-2xl mx-auto">
                  Позвоните нам или оставьте заявку, чтобы получить
                  профессиональную помощь прямо сейчас.
                  <span className="block mt-1 font-medium">
                    15 минут консультации помогут разобраться в вашей ситуации и
                    определить следующий шаг.
                  </span>
                </p>
              </div>

              {/* Упрощённые и сильные кнопки */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
                <Button
                  size={isMobile ? "default" : "lg"}
                  className="bg-white text-primary hover:bg-gray-50 font-bold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
                  asChild
                >
                  <a href="tel:+79931903500">
                    <Icon name="Phone" className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                    Позвонить сейчас
                  </a>
                </Button>

                <Button
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg"
                  asChild
                >
                  <a href="#contacts">
                    <Icon
                      name="MessageSquare"
                      className="h-5 w-5 sm:h-6 sm:w-6 mr-2"
                    />
                    Оставить заявку
                  </a>
                </Button>
              </div>

              {/* Усиленные гарантии */}
              <div className="pt-4 sm:pt-6 border-t border-white/20">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm text-blue-100">
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
                    <Icon
                      name="CheckCircle"
                      className="h-3 w-3 sm:h-4 sm:w-4"
                    />
                    <span>Консультация бесплатна</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
                    <Icon name="Shield" className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Полная конфиденциальность</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
                    <Icon name="Clock" className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Ответ за 15 минут</span>
                  </div>
                </div>

                {/* Заключительное сообщение */}
                <p className="text-xs text-blue-100/70 mt-4 pt-3 border-t border-white/10">
                  Мы перезвоним вам в течение 15 минут в рабочее время. Ваши
                  данные защищены.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ServicesMain;
