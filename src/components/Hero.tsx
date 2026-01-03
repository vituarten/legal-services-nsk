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

          {/* Right side - Logos */}
          <div className="relative">
            <div className="relative w-full max-w-[500px] mx-auto">
              <div className="grid grid-cols-2 gap-8 items-stretch">
                {/* Логотип Народной Дружины */}
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-border hover:shadow-2xl transition-all flex flex-col">
                  <div className="flex-1 flex items-center justify-center">
                    <img
                      src="https://cdn.poehali.dev/files/ЛоготипНД54%20(%20без%20фона%20)%20.jpe%20g.png"
                      alt="Народная Дружина Октябрьского района"
                      className="w-full h-40 object-contain"
                    />
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Народная Дружина<br/>Октябрьского района
                  </p>
                </div>

                {/* Логотип Правоотношение */}
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-border hover:shadow-2xl transition-all flex flex-col">
                  <div className="flex-1 flex items-center justify-center">
                    <img
                      src="https://cdn.poehali.dev/files/Unkwn.png"
                      alt="ООО Правоотношение"
                      className="w-full h-40 object-contain"
                    />
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    ООО "Правоотношение"
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-3 bg-primary/10 rounded-full px-6 py-3 border border-primary/20">
                  <Icon name="Scale" className="h-6 w-6 text-primary" />
                  <span className="font-bold text-foreground">ЮрСервисНСК</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Company Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Юридический сервис Новосибирск это -</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto font-semibold text-lg">
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