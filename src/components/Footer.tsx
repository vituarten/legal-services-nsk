import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const handleCallback = () => {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(106063131, "reachGoal", "callback_request");
    }
    alert("Мы перезвоним вам в течение 15 минут!");
  };

  return (
    <footer className="bg-gradient-to-b from-background to-secondary/10 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Company Info */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 mb-1">
              <Icon
                name="Scale"
                className="h-5 w-5 sm:h-6 sm:w-6 text-primary"
              />
              <span className="text-lg sm:text-xl font-bold text-foreground">
                ЮрСервис НСК
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-snug">
              Юридические услуги в Новосибирске. Защита прав с 2016 года.
            </p>
            <div className="flex items-start gap-1.5 text-xs sm:text-sm text-muted-foreground">
              <Icon
                name="MapPin"
                className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0 text-primary"
              />
              <span>г. Новосибирск, ул. Ленина, д. 3</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1">
              Услуги
            </h3>
            <ul className="space-y-0.5 text-xs sm:text-sm">
              <li>
                <a
                  href="/#services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Автоюрист
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Семейное право
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Банкротство
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Недвижимость
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Уголовная защита
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1">
              Контакты
            </h3>

            <div className="space-y-1 text-xs sm:text-sm">
              <a
                href="tel:+79931903500"
                onClick={() => {
                  if (typeof window !== "undefined" && window.ym) {
                    window.ym(106063131, "reachGoal", "phone_click");
                  }
                }}
                className="flex items-center space-x-1.5 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Icon
                  name="Phone"
                  className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform flex-shrink-0"
                />
                <span className="font-medium">+7 993 190 35 00</span>
              </a>

              <a
                href="mailto:info@yurservicensk.ru"
                className="flex items-center space-x-1.5 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Icon
                  name="Mail"
                  className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform flex-shrink-0"
                />
                <span className="truncate">info@yurservicensk.ru</span>
              </a>

              <div className="flex items-start space-x-1.5 text-muted-foreground">
                <Icon
                  name="MapPin"
                  className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0"
                />
                <span className="leading-snug">
                  г. Новосибирск, ул. Ленина, д. 3
                </span>
              </div>

              <div className="flex items-center space-x-1.5 text-muted-foreground">
                <Icon
                  name="Clock"
                  className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0"
                />
                <span>Работаем 24/7</span>
              </div>
            </div>
          </div>

          {/* Callback Form */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1">
              Мы перезвоним вам
            </h3>

            <div className="space-y-1.5">
              <input
                type="tel"
                placeholder="Ваш телефон"
                className="w-full px-3 py-2 text-sm rounded border border-border focus:outline-none focus:border-primary"
              />
              <Button
                className="w-full text-sm bg-primary hover:bg-primary/90"
                onClick={handleCallback}
              >
                Жду звонка
              </Button>
            </div>

            <div className="pt-1">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Icon name="Shield" className="h-3 w-3 text-primary" />
                <span>100% конфиденциальность</span>
              </div>
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="mt-5 mb-4">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>

        {/* Нижняя часть */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-center sm:text-left">
            <p className="text-xs sm:text-sm font-medium text-foreground/90">
              © 2016-{currentYear} ЮрСервис НСК. Все права защищены.
            </p>
            <div className="text-xs text-muted-foreground mt-0.5">
              <p>
                ИП Витушкин Артем Вячеславович • ИНН: 421210273345 • ОГРНИП:
                323547600197695
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded border border-green-200 font-medium">
              ФНС проверено
            </div>

            <a
              href="https://webmaster.yandex.ru/siteinfo/?site=https://юридический-сервис.рф"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity inline-block"
              title="Яндекс.Метрика"
            >
              <img
                width="70"
                height="25"
                alt="Яндекс.Метрика"
                src="https://yandex.ru/cycounter?https://юридический-сервис.рф&theme=light&lang=ru"
                className="rounded"
                loading="lazy"
              />
            </a>
          </div>
        </div>

        {/* Ссылки */}
        <div className="mt-3 flex justify-center">
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a
              href="/privacy"
              className="hover:text-primary transition-colors hover:underline"
            >
              Политика конфиденциальности
            </a>
            <a
              href="/privacy#terms"
              className="hover:text-primary transition-colors hover:underline"
            >
              Пользовательское соглашение
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
