import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Наши услуги
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Комплексная юридическая поддержка — от консультации до победы в суде
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-12 md:mb-16">
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

        {/* ДОБАВЛЕННЫЕ ПРЕИМУЩЕСТВА */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-10 sm:mb-12 md:mb-16">
          {/* Существующие преимущества */}
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
                Более 8 лет успешной практики в различных областях права
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
                Анализируем вашу ситуацию и предлагаем оптимальное решение
              </p>
            </CardContent>
          </Card>

          {/* Новые преимущества из концепции */}
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
                Подготовка всех документов
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

          {/* Еще два новых преимущества */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200 hover:shadow-lg transition-all sm:col-span-2 lg:col-span-1">
            <CardContent className="p-4 sm:p-5 md:p-6 text-center space-y-2 sm:space-y-3">
              <div className="inline-block p-2.5 sm:p-3 bg-purple-600 rounded-lg sm:rounded-xl">
                <Icon
                  name="Briefcase"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground">
                Сопровождение
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Ведение дела в суде
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-50 to-pink-100/50 border-pink-200 hover:shadow-lg transition-all sm:col-span-2 lg:col-span-1">
            <CardContent className="p-4 sm:p-5 md:p-6 text-center space-y-2 sm:space-y-3">
              <div className="inline-block p-2.5 sm:p-3 bg-pink-600 rounded-lg sm:rounded-xl">
                <Icon
                  name="CreditCard"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground">
                Оплата
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Фиксированная цена
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-primary to-primary/90 text-white border-none shadow-lg sm:shadow-xl md:shadow-2xl">
          <CardContent className="p-6 sm:p-8 md:p-10">
            <div className="text-center space-y-4 sm:space-y-5 md:space-y-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                Нужна юридическая помощь?
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto">
                Позвоните нам или оставьте заявку — мы свяжемся с вами в течение
                15 минут
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 sm:pt-3 md:pt-4">
                <Button
                  size={isMobile ? "default" : isTablet ? "lg" : "lg"}
                  className="bg-white text-primary hover:bg-gray-100 px-6 sm:px-7 md:px-8 text-sm sm:text-base md:text-lg font-semibold"
                  asChild
                >
                  <a href="tel:+79931903500">
                    <Icon name="Phone" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    +7 993 190 35 00
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size={isMobile ? "default" : isTablet ? "lg" : "lg"}
                  className="border-2 border-white text-white hover:bg-white hover:text-primary px-6 sm:px-7 md:px-8 text-sm sm:text-base md:text-lg font-semibold"
                  asChild
                >
                  <a href="#contacts">
                    <Icon
                      name="MessageCircle"
                      className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
                    />
                    Получить консультацию
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 md:gap-8 pt-4 sm:pt-5 md:pt-6 text-xs sm:text-sm text-blue-100">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Icon
                    name="Clock"
                    className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5"
                  />
                  <span className="font-medium">Работаем 24/7</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Icon
                    name="MapPin"
                    className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5"
                  />
                  <span className="font-medium">
                    г. Новосибирск, ул. Ленина, д. 3
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Icon
                    name="Shield"
                    className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5"
                  />
                  <span className="font-medium">100% конфиденциальность</span>
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
