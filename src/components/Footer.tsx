import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon
                name="Scale"
                className="h-6 w-6 sm:h-7 sm:w-7 text-primary"
              />
              <span className="text-lg sm:text-xl font-bold text-foreground">
                ЮрСервис НСК
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
              Юридические услуги в Новосибирске. Защита прав с 2016 года.
            </p>
            <div className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground pt-1">
              <Icon
                name="MapPin"
                className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0 text-primary"
              />
              <span>г. Новосибирск, ул. Ленина, д. 3</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">
              Услуги
            </h3>
            <ul className="space-y-1 text-xs sm:text-sm">
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

          {/* Practice Areas */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">
              Направления
            </h3>
            <ul className="space-y-1 text-xs sm:text-sm">
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

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">
              Контакты
            </h3>

            <div className="space-y-1.5 text-xs sm:text-sm">
              <a
                href="tel:+73832359505"
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
                <span className="font-medium">+7 (383) 235-95-05</span>
              </a>

              <a
                href="mailto:112@юридический-сервис.рф"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Icon
                  name="Mail"
                  className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform flex-shrink-0"
                />
                <span>112@юридический-сервис.рф</span>
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
            <div className="pt-2">
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
                  onClick={handleCallback}
                >
                  Жду звонка
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="mt-6 sm:mt-8 mb-4 sm:mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>

        {/* Нижняя часть */}
        <div className="space-y-4">
          {/* Реквизиты */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="space-y-1.5">
              <p className="text-xs sm:text-sm font-medium text-foreground/90">
                © 2016-{currentYear} ЮрСервис НСК. Все права защищены.
              </p>
              <div className="text-xs text-muted-foreground space-y-0.5 leading-relaxed">
                <p className="font-medium text-foreground/70">
                  ИП Витушкин Артем Вячеславович
                </p>
                <p>ИНН: 421210273345 • ОГРНИП: 323547600197695</p>
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

          {/* Ссылки и бейдж */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-muted-foreground">
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

            <div className="flex items-center gap-2 mt-1 sm:mt-0">
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
