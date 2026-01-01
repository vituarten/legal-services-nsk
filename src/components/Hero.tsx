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
      className="pt-20 pb-16 bg-background"
      role="main"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
            className={`space-y-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
                <Icon name="MapPin" className="h-4 w-4 mr-2" />
                Новосибирск
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Профессиональная юридическая помощь в Новосибирске
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Защищаю права и интересы граждан и предприятий. 
                Индивидуальный подход к каждому клиенту и гарантия результата.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
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
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold transition-all"
              >
                <a 
                  href="tel:+79931903500"
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.ym) {
                      window.ym(103525320, 'reachGoal', 'phone_click');
                    }
                  }}
                >
                  <Icon name="Phone" className="h-5 w-5 mr-2" />
                  +7 993 190 35 00
                </a>
              </Button>
            </div>

          </div>
        </div>

        {/* About Company Section */}
        <div className="mt-20">
          <h2 className="">
            ЮрСервисНСК
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left side - Text content */}
            <div className="lg:w-1/2 space-y-6">
              <p className="text-lg font-bold text-[#000000]">ЮрСервисНСК — это уникальное объединение юридической компании ООО "Правоотношение" и Народной дружины Октябрьского района г. Новосибирска, аккредитованных МВД Новосибирской области. Мы работаем во взаимодействии с государственными органами, обеспечивая доверие, законность и ответственность в каждом действии.</p>
              
              <div className="bg-gradient-to-r from-primary/10 via-blue-50 to-primary/5 rounded-xl p-6 border-l-4 border-primary space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Народная дружина Октябрьского района</h3>
                  <p className="text-sm text-muted-foreground">Действующая на основании лицензии МВД от 18 марта 2016 года</p>
                </div>
                
                <div className="h-px bg-border"></div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">ООО "Правоотношение"</h3>
                  <p className="text-sm text-muted-foreground">
                    Юридическая компания, работающая с 2016 года в области права и оказывающая профессиональные юридические услуги
                  </p>
                </div>
              </div>

              <p className="text-base text-muted-foreground">Юридическая компания, основанная в 2016 году</p>
            </div>

            {/* Right side - Logos with orbit animation */}
            <div className="lg:w-1/2 flex items-center justify-center">
              <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                
                <div className="absolute w-[480px] h-[480px] animate-orbit">
                  <img
                    src="https://cdn.poehali.dev/files/ЛоготипНД54%20(%20без%20фона%20)%20.jpe%20g.png"
                    alt="Народная Дружина Октябрьская"
                    className="w-full h-full object-contain drop-shadow-xl rounded-lg"
                  />
                </div>

                <div className="absolute w-40 h-40 animate-orbit" style={{ animationDelay: '-5s' }}>
                  <img
                    src="https://cdn.poehali.dev/files/Unkwn.png"
                    alt="ЮрСервисНСК"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>

                <div className="flex flex-col items-center justify-center z-10 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mb-2">
                    <Icon name="Scale" className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">ЮрСервисНСК</h3>
                  <p className="text-xs text-muted-foreground mt-1">Юридическая защита</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;