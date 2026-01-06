import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
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
    setIsVisible(true);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <main
      id="home"
      className="pt-16 sm:pt-18 md:pt-20 pb-12 sm:pb-14 md:pb-16 bg-gradient-to-b from-background to-secondary/20"
      role="main"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Content */}
          <div
            className={`space-y-4 sm:space-y-5 md:space-y-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold border border-primary/20">
                <Icon
                  name="MapPin"
                  className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2"
                />
                Новосибирск
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                Профессиональная юридическая помощь
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                Защищаем ваши права и интересы. Индивидуальный подход,
                прозрачные цены, гарантия результата.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
              <Button
                size={isMobile ? "default" : isTablet ? "lg" : "lg"}
                className="bg-primary hover:bg-primary/90 text-sm sm:text-base md:text-lg px-6 sm:px-7 md:px-8 py-4 sm:py-5 md:py-6"
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
                asChild
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm sm:text-base md:text-lg px-6 sm:px-7 md:px-8 py-4 sm:py-5 md:py-6"
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

            <div className="flex flex-wrap gap-4 sm:gap-5 md:gap-6 pt-3 sm:pt-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Icon
                  name="CheckCircle"
                  className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0"
                />
                <span>Опыт с 2016 года</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Icon
                  name="Shield"
                  className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0"
                />
                <span>100% конфиденциальность</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Icon
                  name="Clock"
                  className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0"
                />
                <span>Работаем 24/7</span>
              </div>
            </div>
          </div>

          {/* Right side - Logos */}
          <div className="relative w-full">
            <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-stretch">
                {/* Логотип Народной Дружины */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg sm:shadow-xl border border-border hover:shadow-2xl transition-all flex flex-col">
                  <div className="flex-1 flex items-center justify-center min-h-[120px] sm:min-h-[140px] md:min-h-[160px]">
                    <img
                      src="https://cdn.poehali.dev/files/ЛоготипНД54%20(%20без%20фона%20)%20.jpe%20g.png"
                      alt="Народная Дружина Октябрьского района"
                      className="w-full h-auto max-h-[120px] sm:max-h-[140px] md:max-h-[160px] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-3 sm:mt-4">
                    Народная Дружина
                    <br />
                    Октябрьского района
                  </p>
                </div>

                {/* Логотип Правоотношение */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg sm:shadow-xl border border-border hover:shadow-2xl transition-all flex flex-col">
                  <div className="flex-1 flex items-center justify-center min-h-[120px] sm:min-h-[140px] md:min-h-[160px]">
                    <img
                      src="https://cdn.poehali.dev/files/Unkwn.png"
                      alt="ООО Правоотношение"
                      className="w-full h-auto max-h-[120px] sm:max-h-[140px] md:max-h-[160px] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-3 sm:mt-4">
                    ООО "Правоотношение"
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:mt-7 md:mt-8 text-center">
                <div className="inline-flex items-center gap-2 sm:gap-3 bg-primary/10 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 border border-primary/20">
                  <Icon
                    name="Scale"
                    className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary"
                  />
                  <span className="font-bold text-foreground text-sm sm:text-base">
                    ЮрСервисНСК
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Company Section - С ДОБАВЛЕННОЙ МИССИЕЙ */}
        <div className="mt-16 sm:mt-18 md:mt-20 lg:mt-24">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Наша миссия
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto font-semibold text-sm sm:text-base md:text-lg">
              Сделать правовую защиту доступной и эффективной для каждого
            </p>
          </div>

          {/* Принципы работы */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
            {[
              {
                icon: "Shield",
                title: "Защита интересов",
                desc: "Ваши интересы — наш приоритет",
              },
              {
                icon: "Scale",
                title: "Законность",
                desc: "Строгое соблюдение закона",
              },
              {
                icon: "Users",
                title: "Индивидуальный подход",
                desc: "Персональная стратегия",
              },
              {
                icon: "Clock",
                title: "Оперативность",
                desc: "Быстрое решение задач",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 sm:p-5 md:p-6 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="inline-block p-2.5 sm:p-3 bg-primary/10 rounded-lg sm:rounded-xl mb-3">
                  <Icon
                    name={item.icon as any}
                    className="h-5 w-5 sm:h-6 sm:w-6 text-primary"
                  />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row lg:grid lg:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 border border-primary/20 space-y-4 sm:space-y-5 md:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-primary rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon
                    name="Building2"
                    className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 sm:mb-2">
                    ООО "Правоотношение"
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Юридическая компания с 2016 года. Специализируемся на защите
                    прав граждан и бизнеса во всех сферах права — от семейных
                    споров до корпоративных конфликтов.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 border border-blue-200 space-y-4 sm:space-y-5 md:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon
                    name="Shield"
                    className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 sm:mb-2">
                    Народная дружина Октябрьского района
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Аккредитация МВД Новосибирской области от 18 марта 2016
                    года. Работаем в тесном взаимодействии с государственными
                    органами для защиты законности.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-7 md:mt-8 text-center">
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-4xl mx-auto">
              <strong className="text-foreground">ЮрСервисНСК</strong> — это
              объединение юридической компании{" "}
              <strong className="text-primary">"Правоотношение"</strong> и{" "}
              <strong className="text-blue-600">Народной дружины</strong>{" "}
              (аккредитация МВД).
            </p>
            <p className="text-sm sm:text-base md:text-lg text-primary font-semibold mt-3 sm:mt-4">
              Экспертиза в праве + государственная поддержка = ваша уверенность.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
