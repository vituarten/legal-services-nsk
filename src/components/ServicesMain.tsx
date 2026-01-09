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

  const howWeHelp = [
    {
      icon: "Shield",
      title: "Защищаем ваши права",
      description: "Если ваши права нарушены — мы поможем их восстановить",
    },
    {
      icon: "Scale",
      title: "Сопровождаем в суде",
      description: "Берем все хлопоты по судебным делам на себя",
    },
    {
      icon: "FileText",
      title: "Готовим документы",
      description: "Собираем и оформляем все необходимые бумаги",
    },
    {
      icon: "Users",
      title: "Отвечаем на вопросы",
      description: "Объясняем сложные юридические ситуации простыми словами",
    },
    {
      icon: "Target",
      title: "Составляем план",
      description: "Разрабатываем пошаговую стратегию решения вашего вопроса",
    },
    {
      icon: "Clock",
      title: "Ведем до результата",
      description: "Не бросаем на полпути — доводим дело до конца",
    },
  ];

  return (
    <section
      id="expertise"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-secondary/10"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Юридическая помощь для людей
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Мы помогаем обычным людям решать юридические вопросы. Не важно,
            насколько сложная у вас ситуация — мы объясним всё простыми словами
            и поможем найти решение.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {howWeHelp.map((item, index) => (
            <Card
              key={index}
              className="h-full hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 border sm:border-2 hover:border-primary hover:-translate-y-1 cursor-pointer group"
            >
              <CardContent className="p-4 sm:p-5 md:p-6 lg:p-8 space-y-3 sm:space-y-4">
                <div className="inline-block p-3 sm:p-3.5 md:p-4 bg-primary/10 rounded-lg sm:rounded-xl group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Icon
                    name={item.icon as any}
                    className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary group-hover:text-white"
                  />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Почему нам доверяют */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
              Почему нам доверяют
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Мы стараемся сделать юридическую помощь доступной и понятной
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-all">
              <CardContent className="p-4 sm:p-5 md:p-6 text-center space-y-2 sm:space-y-3">
                <div className="inline-block p-2.5 sm:p-3 bg-primary rounded-lg sm:rounded-xl">
                  <Icon
                    name="UserCheck"
                    className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                  />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground">
                  Личный юрист
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  С вами работает один специалист от начала до конца
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200 hover:shadow-lg transition-all">
              <CardContent className="p-4 sm:p-5 md:p-6 text-center space-y-2 sm:space-y-3">
                <div className="inline-block p-2.5 sm:p-3 bg-blue-600 rounded-lg sm:rounded-xl">
                  <Icon
                    name="Clock"
                    className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                  />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground">
                  Четкие сроки
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Знаем, когда будет готово, и держим вас в курсе
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200 hover:shadow-lg transition-all">
              <CardContent className="p-4 sm:p-5 md:p-6 text-center space-y-2 sm:space-y-3">
                <div className="inline-block p-2.5 sm:p-3 bg-green-600 rounded-lg sm:rounded-xl">
                  <Icon
                    name="DollarSign"
                    className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                  />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground">
                  Цена известна заранее
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Никаких скрытых платежей и сюрпризов в счетах
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
                  Всё под контролем
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Вы видите, что происходит с вашим делом на каждом этапе
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Ссылка на услуги */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 max-w-3xl mx-auto">
            <CardContent className="p-6 sm:p-8 md:p-10">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-block p-3 sm:p-4 bg-primary rounded-xl">
                  <Icon
                    name="List"
                    className="h-8 w-8 sm:h-10 sm:w-10 text-white"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3">
                    С какими вопросами мы помогаем?
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-4 sm:mb-6">
                    У нас есть решения для самых разных ситуаций. Посмотрите
                    полный список — наверняка найдется то, что нужно вам.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                    <Link
                      to="/services"
                      className="inline-flex items-center justify-center bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:bg-primary/90 transition-all hover:shadow-lg w-full sm:w-auto"
                    >
                      <span className="mr-2 sm:mr-3">
                        Посмотреть все услуги
                      </span>
                      <Icon
                        name="ArrowRight"
                        className="h-4 w-4 sm:h-5 sm:w-5"
                      />
                    </Link>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-0">
                      Помогаем с ДТП, семейными спорами, долгами, недвижимостью
                      и другими вопросами
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesMain;
