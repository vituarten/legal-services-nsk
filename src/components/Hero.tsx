import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    setIsVisible(true);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Функция для отслеживания звонков
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

  return (
    <main
      id="home"
      className="pt-16 md:pt-20 pb-12 bg-gradient-to-b from-background to-secondary/20"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Основной Hero */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 md:mb-16">
          {/* Контент слева */}
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-3 md:space-y-4">
              <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-semibold border border-primary/20">
                <Icon
                  name="MapPin"
                  className="h-3 w-3 md:h-4 md:w-4 mr-1.5 md:mr-2"
                />
                Новосибирск • С 2016 года
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Профессиональная юридическая помощь
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Защищаем права граждан и бизнеса. Гарантия результата.
              </p>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-4">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-primary">
                  8+
                </div>
                <div className="text-xs md:text-sm">лет</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-primary">
                  1500+
                </div>
                <div className="text-xs md:text-sm">дел</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-primary">
                  95%
                </div>
                <div className="text-xs md:text-sm">успеха</div>
              </div>
            </div>

            {/* Кнопки как в старой версии */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-base md:text-lg px-6 md:px-8 py-4 md:py-6"
                onClick={(e) => handlePhoneClick(e, "hero_main")}
              >
                <Icon name="Phone" className="h-5 w-5 mr-2" />
                +7 993 190 35 00
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-base md:text-lg px-6 md:px-8 py-4 md:py-6"
                asChild
              >
                <a href="#contacts">
                  <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                  Получить консультацию
                </a>
              </Button>
            </div>

            {/* Преимущества */}
            <div className="flex flex-wrap gap-3 md:gap-4 lg:gap-6 pt-3 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5 md:gap-2">
                <Icon
                  name="CheckCircle"
                  className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0"
                />
                <span>Опыт с 2016 года</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <Icon
                  name="Shield"
                  className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0"
                />
                <span>100% конфиденциальность</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <Icon
                  name="Clock"
                  className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0"
                />
                <span>Работаем 24/7</span>
              </div>
            </div>
          </div>

          {/* Логотипы справа */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl p-4 sm:p-5 shadow-lg border border-border">
                <div className="h-24 sm:h-28 flex items-center justify-center">
                  <img
                    src="https://cdn.poehali.dev/files/ЛоготипНД54%20(%20без%20фона%20)%20.jpe%20g.png"
                    alt="Народная Дружина"
                    className="h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Народная Дружина
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-5 shadow-lg border border-border">
                <div className="h-24 sm:h-28 flex items-center justify-center">
                  <img
                    src="https://cdn.poehali.dev/files/Unkwn.png"
                    alt="ООО Правоотношение"
                    className="h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  ООО "Правоотношение"
                </p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 border border-primary/20">
                <Icon name="Scale" className="h-5 w-5 text-primary" />
                <span className="font-bold text-sm">ЮрСервисНСК</span>
              </div>
            </div>
          </div>
        </div>

        {/* Миссия и принципы */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3">
              Наша миссия
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Сделать правовую защиту доступной и эффективной для каждого
            </p>
          </div>

          {/* Принципы работы */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                className="bg-white p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
              >
                <div className="inline-block p-2.5 bg-primary/10 rounded-lg mb-3">
                  <Icon
                    name={item.icon as any}
                    className="h-5 w-5 text-primary"
                  />
                </div>
                <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* История компаний */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-5 sm:p-6 border border-primary/20">
            <p className="text-center text-foreground mb-2">
              <span className="font-bold text-primary">ЮрСервисНСК</span> —
              объединение юридической компании{" "}
              <span className="font-bold text-primary">"Правоотношение"</span> и{" "}
              <span className="font-bold text-blue-600">Народной дружины</span>{" "}
              (аккредитация МВД).
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Экспертиза в праве + государственная поддержка = ваша уверенность.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
