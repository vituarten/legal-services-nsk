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

        {/* Центральная карточка с призывом */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-12">
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-white to-primary/5 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6 sm:p-8 md:p-10">
              <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
                <div className="lg:w-1/4 flex justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon
                      name="Briefcase"
                      className="h-10 w-10 sm:h-12 sm:w-12 text-white"
                    />
                  </div>
                </div>

                <div className="lg:w-3/4 text-center lg:text-left">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                    Полный спектр юридических услуг
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                    Мы предоставляем широкий перечень юридических услуг для
                    решения различных вопросов. Подробную информацию о всех
                    наших услугах, направлениях работы и специализациях вы
                    можете найти в соответствующем разделе сайта.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <Link
                      to="/services"
                      className="inline-flex items-center justify-center bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:bg-primary/90 transition-all hover:shadow-lg"
                    >
                      <span className="mr-2 sm:mr-3">Перейти к услугам</span>
                      <Icon
                        name="ArrowRight"
                        className="h-4 w-4 sm:h-5 sm:w-5"
                      />
                    </Link>
                    <a
                      href="tel:+73832359505"
                      className="inline-flex items-center justify-center border border-primary text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:bg-primary/5 transition-all"
                    >
                      <Icon
                        name="Phone"
                        className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
                      />
                      Заказать консультацию
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
