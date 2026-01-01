import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main
      id="home"
      className="pt-20 pb-16 bg-gradient-to-b from-background to-secondary/20"
      role="main"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
            className={`space-y-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                <Icon name="MapPin" className="h-4 w-4 mr-2" />
                Новосибирск
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Профессиональная юридическая помощь
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Защищаем ваши права и интересы. Индивидуальный подход, прозрачные цены, гарантия результата.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
                asChild
              >
                <a href="tel:+79931903500">
                  <Icon name="Phone" className="h-5 w-5 mr-2" />
                  +7 993 190 35 00
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg px-8 py-6"
              >
                <a href="#contacts">
                  <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                  Получить консультацию
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" className="h-5 w-5 text-primary" />
                <span>Опыт с 2016 года</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" className="h-5 w-5 text-primary" />
                <span>100% конфиденциальность</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" className="h-5 w-5 text-primary" />
                <span>Работаем 24/7</span>
              </div>
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center space-y-6">
                  <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <Icon name="Scale" className="h-16 w-16 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">ЮрСервисНСК</h3>
                    <p className="text-muted-foreground mt-2">Ваш надёжный юридический партнёр</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Company Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">О компании</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Объединение профессионализма и государственной поддержки
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Building2" className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">ООО "Правоотношение"</h3>
                  <p className="text-muted-foreground">
                    Юридическая компания с 2016 года. Специализируемся на защите прав граждан и бизнеса 
                    во всех сферах права — от семейных споров до корпоративных конфликтов.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-8 border border-blue-200 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Shield" className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Народная дружина Октябрьского района</h3>
                  <p className="text-muted-foreground">
                    Аккредитация МВД Новосибирской области от 18 марта 2016 года. 
                    Работаем в тесном взаимодействии с государственными органами для защиты законности.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              <strong className="text-foreground">ЮрСервисНСК</strong> — это синергия юридической экспертизы 
              и государственной поддержки. Мы обеспечиваем профессиональную защиту ваших интересов 
              на основе законности, доверия и полной ответственности.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
