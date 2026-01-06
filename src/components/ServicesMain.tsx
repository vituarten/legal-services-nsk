import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ServicesMain = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const serviceCategories = [
    {
      icon: "Car",
      title: "Автоюрист",
      description:
        "Защита при ДТП, споры со страховыми, лишение прав, незаконные штрафы",
      link: "/dtp-lawyer",
    },
    {
      icon: "Users",
      title: "Семейное право",
      description: "Разводы, алименты, раздел имущества, споры о детях",
      link: "/family-lawyer",
    },
    {
      icon: "TrendingDown",
      title: "Банкротство",
      description: "Списание долгов физических лиц, защита от кредиторов",
      link: "/bankruptcy-lawyer",
    },
    {
      icon: "FileText",
      title: "Миграционное право",
      description: "РВП, ВНЖ, гражданство, депортация, запреты на въезд",
      link: "/migration",
    },
    {
      icon: "Home",
      title: "Недвижимость",
      description:
        "Сделки купли-продажи, споры с застройщиками, перепланировки",
      link: "/real-estate-lawyer",
    },
    {
      icon: "Shield",
      title: "Уголовная защита",
      description: "Защита на следствии и в суде, обжалование приговоров",
      link: "/criminal-lawyer",
    },
  ];

  return (
    <section
      id="services"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-secondary/10"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Наши услуги
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Комплексная юридическая поддержка — от консультации до победы в суде
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {serviceCategories.map((service, index) => (
            <Link key={index} to={service.link}>
              <Card className="h-full hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 border sm:border-2 hover:border-primary hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-4 sm:p-5 md:p-6 lg:p-8 space-y-3 sm:space-y-4">
                  <div className="inline-block p-3 sm:p-3.5 md:p-4 bg-primary/10 rounded-lg sm:rounded-xl group-hover:bg-primary group-hover:scale-110 transition-all">
                    <Icon
                      name={service.icon as any}
                      className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary group-hover:text-white"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                    {service.description}
                  </p>
                  <div className="flex items-center text-primary font-semibold pt-1 sm:pt-2 text-sm sm:text-base">
                    <span className="mr-1.5 sm:mr-2">Подробнее</span>
                    <Icon
                      name="ArrowRight"
                      className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-2 transition-transform"
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Преимущества */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
              🎯 Наши преимущества
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Почему клиенты выбирают именно нас
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-all">
              <CardContent className="p-4 sm:p-5 md:p-6 text-center space-y-2 sm:space-y-3">
                <div className="inline-block p-2.5 sm:p-3 bg-primary rounded-lg sm:rounded-xl">
                  <Icon
                    name="Award"
                    className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                  />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground">
                  Опыт с 2016 года
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Более 8 лет успешной практики
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200 hover:shadow-lg transition-all">
              <CardContent className="p-4 sm:p-5 md:p-6 text-center space-y-2 sm:space-y-3">
                <div className="inline-block p-2.5 sm:p-3 bg-blue-600 rounded-lg sm:rounded-xl">
                  <Icon
                    name="UserCheck"
                    className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                  />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground">
                  Индивидуальный подход
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Персональная стратегия для каждого клиента
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200 hover:shadow-lg transition-all">
              <CardContent className="p-4 sm:p-5 md:p-6 text-center space-y-2 sm:space-y-3">
                <div className="inline-block p-2.5 sm:p-3 bg-green-600 rounded-lg sm:rounded-xl">
                  <Icon
                    name="FileText"
                    className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                  />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground">
                  Документы
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Полная подготовка всех документов
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200 hover:shadow-lg transition-all">
              <CardContent className="p-4 sm:p-5 md:p-6 text-center space-y-2 sm:space-y-3">
                <div className="inline-block p-2.5 sm:p-3 bg-amber-600 rounded-lg sm:rounded-xl">
                  <Icon
                    name="MessageSquare"
                    className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                  />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground">
                  Консультация
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Разбор ситуации за 15 минут
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesMain;
