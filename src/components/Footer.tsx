import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const currentYear = new Date().getFullYear();

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

  const handleCallback = () => {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(106063131, "reachGoal", "callback_request");
    }
    alert("Мы перезвоним вам в течение 15 минут!");
  };

  return (
    <footer className="bg-gradient-to-b from-background to-secondary/10 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-5">
            <div className="flex items-center space-x-2">
              <Icon
                name="Scale"
                className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 text-primary"
              />
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                ЮрСервис НСК
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
              Юридические услуги в Новосибирске. Защита прав с 2016 года.
            </p>
            <div className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground pt-1 sm:pt-2">
              <Icon
                name="MapPin"
                className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0 text-primary"
              />
              <span>г. Новосибирск, ул. Ленина, д. 3</span>
            </div>
          </div>

          {/* Services - ОБНОВЛЁННЫЙ СПИСОК */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-foreground text-base sm:text-lg">
              Услуги
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
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

          {/* Practice Areas - ОБНОВЛЁННЫЙ СПИСОК */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-foreground text-base sm:text-lg">
              Направления
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="/#practice"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Арбитражные споры
                </a>
              </li>
              <li>
                <a
                  href="/#practice"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Гражданские дела
                </a>
              </li>
              <li>
                <a
                  href="/#practice"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Административные дела
                </a>
              </li>
              <li>
                <a
                  href="/#practice"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Исполнительное производство
                </a>
              </li>
            </ul>
          </div>

          {/* Contact - С ОБНОВЛЁННОЙ ИНФОРМАЦИЕЙ */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-foreground text-base sm:text-lg">
              Контакты
            </h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <a
                href="tel:+79931903500"
                onClick={() => {
                  if (typeof window !== "undefined" && window.ym) {
                    window.ym(106063131, "reachGoal", "phone_click");
                  }
                }}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Icon
                  name="Phone"
                  className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform flex-shrink-0"
                />
                <span className="font-medium">+7 993 190 35 00</span>
              </a>
              <a
                href="mailto:info@yurservicensk.ru"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Icon
                  name="Mail"
                  className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform flex-shrink-0"
                />
                <span>info@yurservicensk.ru</span>
              </a>
              <div className="flex items-start space-x-2 text-muted-foreground">
                <Icon
                  name="MapPin"
                  className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0"
                />
                <span className="leading-relaxed">
                  г. Новосибирск, ул. Ленина, д. 3
                </span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon
                  name="Clock"
                  className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0"
                />
                <span>Работаем 24/7</span>
              </div>
            </div>

            {/* Форма обратного звонка */}
            <div className="pt-3 sm:pt-4">
              <div className="text-xs text-muted-foreground mb-1 sm:mb-2">
                Обратный звонок:
              </div>
              <div className="flex gap-2">
                <input
                  type="tel"
                  placeholder="Ваш телефон"
                  className="flex-1 px-3 py-1.5 sm:py-2 text-xs rounded border border-border focus:outline-none focus:border-primary"
                />
                <Button
                  size={isMobile ? "sm" : "default"}
                  className="text-xs px-3"
                  onClick={handleCallback}
                >
                  Жду звонка
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 mb-6 sm:mb-8 md:mb-10">
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
              <div className="text-xs text-muted-foreground space-y-1 sm:space-y-1.5 leading-relaxed">
                <p className="font-medium text-foreground/70">
                  ИП Витушкин Артем Вячеславович
                </p>
                <p>ИНН: 421210273345</p>
                <p>ОГРНИП: 323547600197695</p>
              </div>
            </div>

            <div className="flex justify-start md:justify-end items-start">
              <a
                href="https://webmaster.yandex.ru/siteinfo/?site=https://юридический-сервис.рф"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity inline-block"
                title="Яндекс.Метрика"
              >
                <img
                  width={isMobile ? "70" : isTablet ? "80" : "88"}
                  height={isMobile ? "25" : isTablet ? "28" : "31"}
                  alt="Яндекс.Метрика"
                  src="https://yandex.ru/cycounter?https://юридический-сервис.рф&theme=light&lang=ru"
                  className="rounded"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          {/* Ссылки и ID */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs">
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 sm:gap-x-6 gap-y-1 sm:gap-y-2 text-muted-foreground">
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

            {/* Бейдж ФНС */}
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
