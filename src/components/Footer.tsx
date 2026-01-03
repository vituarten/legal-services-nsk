import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Отслеживание кликов
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
    <footer
      id="contacts"
      className="bg-gradient-to-b from-background to-secondary/10 border-t border-border/50"
    >
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <Icon
                name="Scale"
                className="h-7 w-7 sm:h-8 sm:w-8 text-primary"
              />
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                ЮрСервис НСК
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Юридические услуги в Новосибирске. Защита прав с 2016 года.
            </p>

            <div className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground pt-2">
              <Icon
                name="MapPin"
                className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0 text-primary"
              />
              <span>г. Новосибирск, ул. Ленина, д. 3</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-base">Услуги</h3>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {[
                "Автоюрист",
                "Семейное право",
                "Банкротство",
                "Недвижимость",
                "Уголовная защита",
              ].map((service, index) => (
                <li key={index}>
                  <a
                    href={`#${service.toLowerCase().replace(" ", "-")}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-base">
              Направления
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {[
                "Арбитражные споры",
                "Гражданские дела",
                "Административные дела",
                "Исполнительное производство",
              ].map((area, index) => (
                <li key={index}>
                  <a
                    href="#practice"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {area}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-base">
              Контакты
            </h3>
            <div className="space-y-2 text-xs sm:text-sm">
              {/* Скрытый/раскрываемый телефон */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-muted-foreground">Телефон юриста:</span>
                  <button
                    onClick={() => setShowPhone(!showPhone)}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <Icon
                      name={showPhone ? "EyeOff" : "Eye"}
                      className="h-3 w-3"
                    />
                    {showPhone ? "Скрыть" : "Показать"}
                  </button>
                </div>

                {showPhone ? (
                  <a
                    href="tel:+79931903500"
                    onClick={(e) => {
                      e.preventDefault();
                      trackPhoneClick("footer_revealed");
                      window.location.href = "tel:+79931903500";
                    }}
                    className="block text-lg font-bold text-primary hover:text-primary/80 transition-colors py-1"
                  >
                    +7 993 190 35 00
                  </a>
                ) : (
                  <div className="text-lg font-bold text-foreground/50 select-none py-1">
                    +7 993 ••• •• 00
                  </div>
                )}

                <p className="text-xs text-muted-foreground mt-1">
                  {showPhone
                    ? "Нажмите для звонка"
                    : "Нажмите 'Показать' для телефона"}
                </p>
              </div>

              <a
                href="mailto:info@yurservicensk.ru"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors py-1"
              >
                <Icon
                  name="Mail"
                  className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0"
                />
                <span>info@yurservicensk.ru</span>
              </a>

              <div className="flex items-center space-x-2 text-muted-foreground py-1">
                <Icon
                  name="Clock"
                  className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0"
                />
                <span>пн-пт 9:00-18:00</span>
              </div>

              {/* Форма обратного звонка */}
              {!isMobile && (
                <div className="pt-3">
                  <div className="text-xs text-muted-foreground mb-1">
                    Обратный звонок:
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      placeholder="Ваш телефон"
                      className="flex-1 px-3 py-1.5 text-xs rounded border border-border focus:outline-none focus:border-primary"
                    />
                    <Button
                      size="sm"
                      className="text-xs px-3"
                      onClick={() => {
                        if (typeof window !== "undefined" && window.ym) {
                          window.ym(106063131, "reachGoal", "callback_request");
                        }
                        alert("Мы перезвоним вам в течение 15 минут!");
                      }}
                    >
                      Жду звонка
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="mt-8 sm:mt-10 mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>

        {/* Нижняя часть */}
        <div className="space-y-6">
          {/* Реквизиты */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-medium text-foreground/90">
                © 2016-{currentYear} ЮрСервис НСК. Все права защищены.
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p className="font-medium text-foreground/70">
                  ИП Витушкин Артем Вячеславович
                </p>
                <p>ИНН: 421210273345 • ОГРНИП: 323547600197695</p>
              </div>
            </div>

            <div className="flex justify-start md:justify-end">
              <a
                href="https://webmaster.yandex.ru/siteinfo/?site=https://юридический-сервис.рф"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity inline-block"
                title="Яндекс.Метрика"
              >
                <img
                  width={isMobile ? "70" : "88"}
                  height={isMobile ? "25" : "31"}
                  alt="Яндекс.Метрика"
                  src="https://yandex.ru/cycounter?https://юридический-сервис.рф&theme=light&lang=ru"
                  className="rounded"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          {/* Ссылки */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-muted-foreground">
              <a
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Политика конфиденциальности
              </a>
              <a
                href="/privacy#terms"
                className="hover:text-primary transition-colors"
              >
                Пользовательское соглашение
              </a>
            </div>

            {/* Бейджы доверия */}
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <div className="text-xs px-1.5 py-0.5 bg-green-50 text-green-700 rounded border border-green-200">
                ФНС проверено
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
