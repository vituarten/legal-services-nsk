import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-background to-secondary/10 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-5">
            <div className="flex items-center space-x-2">
              <Icon name="Scale" className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 text-primary" />
              <div>
                <span className="text-xl sm:text-2xl font-bold text-foreground block">
                  ЮрСервис НСК
                </span>
                <span className="text-xs text-muted-foreground block mt-0.5">
                  Лицо компании
                </span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
              Профессиональные юридические услуги в Новосибирске. 
              Защищаем ваши права и интересы с 2016 года.
            </p>
            
            {/* Быстрый CTA для мобильных */}
            {isMobile && (
              <div className="pt-2">
                <Button 
                  size="sm" 
                  className="w-full bg-primary hover:bg-primary/90"
                  asChild
                >
                  <a href="tel:+79931903500">
                    <Icon name="Phone" className="h-3 w-3 mr-1.5" />
                    Срочный звонок
                  </a>
                </Button>
              </div>
            )}
            
            <div className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground pt-2">
              <Icon name="MapPin" className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0 text-primary" />
              <span>г. Новосибирск, ул. Ленина, д. 3</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-foreground text-base sm:text-lg">Услуги</h3>
            <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm">
              {[
                { name: "Корпоративное право", href: "/corporate" },
                { name: "Семейное право", href: "/family-lawyer" },
                { name: "Недвижимость", href: "/real-estate-lawyer" },
                { name: "Трудовое право", href: "/labor-law" },
                { name: "Уголовная защита", href: "/criminal-lawyer" }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-muted-foreground hover:text-primary transition-colors block py-0.5"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-foreground text-base sm:text-lg">Практика</h3>
            <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm">
              {[
                { name: "Арбитражные споры", href: "/arbitration" },
                { name: "Гражданские дела", href: "/civil-cases" },
                { name: "Административное право", href: "/administrative" },
                { name: "Банкротство", href: "/bankruptcy-lawyer" }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-muted-foreground hover:text-primary transition-colors block py-0.5"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-foreground text-base sm:text-lg">Контакты</h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <a 
                href="tel:+79931903500"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.ym) {
                    window.ym(106063131, 'reachGoal', 'phone_click_footer');
                  }
                }}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group py-0.5"
              >
                <Icon name="Phone" className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="font-medium">+7 993 190 35 00</span>
              </a>
              <a 
                href="mailto:info@yurservicensk.ru" 
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group py-0.5"
              >
                <Icon name="Mail" className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>info@yurservicensk.ru</span>
              </a>
              <div className="flex items-start space-x-2 text-muted-foreground py-0.5">
                <Icon name="MapPin" className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  г. Новосибирск, ул. Ленина, д. 3
                </span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground py-0.5">
                <Icon name="Clock" className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span>Круглосуточная поддержка</span>
              </div>
              
              {/* Форма быстрого звонка */}
              {!isMobile && (
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      placeholder="Ваш телефон"
                      className="flex-1 px-3 py-1.5 text-xs rounded border border-border focus:outline-none focus:border-primary"
                    />
                    <Button size="sm" className="text-xs px-3">
                      <Icon name="Phone" className="h-3 w-3 mr-1" />
                      Позвонить
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="mt-8 sm:mt-12 md:mt-16 mb-6 sm:mb-8 md:mb-10">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>

        {/* Нижняя часть - реквизиты и мета */}
        <div className="space-y-6 sm:space-y-8">
          {/* Реквизиты */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
            <div className="space-y-2 sm:space-y-3">
              <p className="text-xs sm:text-sm font-medium text-foreground/90">
                © 2016-{currentYear} ЮрСервис НСК. Все права защищены.
              </p>
              <div className="text-xs text-muted-foreground space-y-1 leading-relaxed">
                <p className="font-medium text-foreground/70">ИП Витушкин Артем Вячеславович</p>
                <p>ИНН: 421210273345</p>
                <p>ОГРНИП: 323547600197695</p>
                <p className="text-xs opacity-75 mt-2">
                  ИНН/ОГРНИП проверены в ФНС РФ. Юридическая деятельность лицензирована.
                </p>
              </div>
            </div>

            <div className="flex justify-start md:justify-end items-start">
              <a
                href="https://webmaster.yandex.ru/siteinfo/?site=https://юридический-сервис.рф"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity