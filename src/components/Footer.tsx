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

  const trackSocialClick = (network: string) => {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(106063131, "reachGoal", `social_${network}`);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-background to-secondary/10 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <Icon
                name="Scale"
                className="h-7 w-7 sm:h-8 sm:w-8 text-primary"
              />
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                ЮрСервис НСК
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Юридические услуги в Новосибирске. Защита прав с 2016 года.
            </p>
            <div className="flex items-start gap-2 text-sm text-muted-foreground pt-2">
              <Icon
                name="MapPin"
                className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary"
              />
              <span>г. Новосибирск, ул. Ленина, д. 3</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-base">Услуги</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/#services"
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline"
                >
                  Автоюрист
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline"
                >
                  Семейное право
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline"
                >
                  Банкротство
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline"
                >
                  Недвижимость
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline"
                >
                  Уголовная защита
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-base">
              Контакты
            </h3>

            <div className="space-y-2 text-sm">
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
                  className="h-4 w-4 group-hover:scale-110 transition-transform flex-shrink-0"
                />
                <span className="font-medium">+7 993 190 35 00</span>
              </a>

              <a
                href="mailto:info@yurservicensk.ru"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Icon
                  name="Mail"
                  className="h-4 w-4 group-hover:scale-110 transition-transform flex-shrink-0"
                />
                <span>info@yurservicensk.ru</span>
              </a>

              <div className="flex items-start space-x-2 text-muted-foreground">
                <Icon name="MapPin" className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  г. Новосибирск, ул. Ленина, д. 3
                </span>
              </div>

              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="Clock" className="h-4 w-4 flex-shrink-0" />
                <span>Работаем 24/7</span>
              </div>
            </div>

            {/* Форма обратного звонка */}
            <div className="pt-4">
              <div className="text-sm text-muted-foreground mb-2">
                Мы перезвоним вам:
              </div>
              <div className="flex gap-2">
                <input
                  type="tel"
                  placeholder="Ваш телефон"
                  className="flex-1 px-3 py-2 text-sm rounded-lg border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <Button
                  size="sm"
                  className="px-4 text-sm bg-primary hover:bg-primary/90"
                  onClick={handleCallback}
                >
                  Жду звонка
                </Button>
              </div>
            </div>
          </div>

          {/* Соцсети */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-base">
              Наши группы в соцсетях
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* ВКонтакте */}
              <a
                href="#"
                onClick={() => trackSocialClick("vk")}
                className="flex flex-col items-center p-4 bg-gradient-to-br from-[#0077FF]/5 to-[#0077FF]/10 hover:from-[#0077FF]/10 hover:to-[#0077FF]/15 rounded-xl border border-[#0077FF]/20 transition-all group"
                title="Мы ВКонтакте"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0077FF] to-[#0044CC] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2m-1.76 15.13c-1.37 0-1.88-.94-2.59-1.94-.77 1.07-1.17 1.94-2.85 1.94-1.54 0-2.17-1.12-3.06-2.51C4.62 12.15 4 10.93 4 10.29c0-.26.2-.47.47-.47h1.47c.35 0 .5.25.65.56.7 1.45 1.86 3.72 2.49 3.72.59 0 .74-.64 1.33-1.59.65-1.06 1.15-2.38 1.15-2.38 0-.26.2-.47.47-.47h1.47c.35 0 .5.25.5.56 0 .59-.84 2.05-1.27 2.68-.59.85-.86 1.12-.86 1.41 0 .35.5.47.85.82.49.49 1.68 1.68 1.68 3.72 0 .35-.2.56-.65.56h-1.47c-.35 0-.5-.25-.5-.56 0-1.02-.34-1.75-.79-2.38-.44-.61-.94-1.27-1.46-1.98-.2-.26-.59-.82-.94-1.27 0 .94.05 2.33.05 2.33 0 .35-.2.56-.65.56H9.1c-.35 0-.5-.25-.5-.56 0-1.37.05-3.14.05-3.14 0-.35.2-.56.65-.56h1.47c.35 0 .5.25.5.56 0 .59-.1 1.37-.1 1.37.2-.35.44-.79.79-1.27.49-.68 1.05-1.45 1.87-2.33.2-.2.44-.35.79-.35h1.47c.35 0 .5.25.5.56 0 .59-.34 1.37-1.27 2.68-.59.85-1.22 1.68-1.22 2.68 0 .35.2.56.65.56h1.47c.35 0 .5-.25.5-.56 0-1.02-.34-1.75-1.27-2.68-.49-.49-.94-1.02-1.46-1.68.2.26.44.56.65.79.79 1.02 1.86 2.38 2.59 3.14.79.82 1.37 1.12 1.37 1.68 0 .35-.2.56-.65.56h-1.47c-.35 0-.5-.25-.5-.56 0-.59.34-1.12 1.05-1.83.49-.49.94-1.02 1.46-1.68.2-.26.44-.56.65-.79-.2.26-.44.56-.65.79-.79 1.02-1.86 2.38-2.59 3.14-.79.82-1.37 1.12-1.37 1.68 0 .35.2.56.65.56h1.47c.35 0 .5-.25.5-.56 0-.59-.34-1.12-1.05-1.83-.49-.49-.94-1.02-1.46-1.68-.2-.26-.44-.56-.65-.79.2.26.44.56.65.79.79 1.02 1.86 2.38 2.59 3.14.79.82 1.37 1.12 1.37 1.68 0 .35-.2.56-.65.56h-1.47c-.35 0-.5-.25-.5-.56 0-.59.34-1.12 1.05-1.83.49-.49.94-1.02 1.46-1.68.2-.26.44-.56.65-.79-.2.26-.44.56-.65.79-.79 1.02-1.86 2.38-2.59 3.14-.79.82-1.37 1.12-1.37 1.68 0 .35.2.56.65.56h1.47c.35 0 .5-.25.5-.56 0-.59-.34-1.12-1.05-1.83z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  ВКонтакте
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Группа
                </span>
              </a>

              {/* YouTube */}
              <a
                href="#"
                onClick={() => trackSocialClick("youtube")}
                className="flex flex-col items-center p-4 bg-gradient-to-br from-[#FF0000]/5 to-[#CC0000]/10 hover:from-[#FF0000]/10 hover:to-[#CC0000]/15 rounded-xl border border-[#FF0000]/20 transition-all group"
                title="Наш YouTube канал"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF0000] to-[#CC0000] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.67 8.14C19.58 7.84 19.39 7.57 19.13 7.37C18.87 7.17 18.56 7.05 18.23 7.02C17.33 6.94 12 6.94 12 6.94C12 6.94 6.67 6.94 5.77 7.02C5.44 7.05 5.13 7.17 4.87 7.37C4.61 7.57 4.42 7.84 4.33 8.14C4.15 9.07 4.06 10.01 4.06 10.96C4.06 10.96 4.06 11.91 4.24 12.84C4.33 13.14 4.52 13.41 4.78 13.61C5.04 13.81 5.35 13.93 5.68 13.96C6.58 14.04 11.91 14.04 11.91 14.04C11.91 14.04 17.24 14.04 18.14 13.96C18.47 13.93 18.78 13.81 19.04 13.61C19.3 13.41 19.49 13.14 19.58 12.84C19.76 11.91 19.85 10.97 19.85 10.02C19.85 10.02 19.85 9.07 19.67 8.14ZM10.3 12.46V9.46L13.97 10.96L10.3 12.46Z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  YouTube
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Канал
                </span>
              </a>

              {/* TikTok */}
              <a
                href="#"
                onClick={() => trackSocialClick("tiktok")}
                className="flex flex-col items-center p-4 bg-gradient-to-br from-black/5 to-gray-800/10 hover:from-black/10 hover:to-gray-800/15 rounded-xl border border-gray-300 transition-all group"
                title="Наш TikTok"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-black to-gray-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .6.06.88.16V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  TikTok
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Аккаунт
                </span>
              </a>

              {/* Яндекс.Дзен */}
              <a
                href="#"
                onClick={() => trackSocialClick("dzen")}
                className="flex flex-col items-center p-4 bg-gradient-to-br from-[#FF0000]/5 to-[#FFCC00]/10 hover:from-[#FF0000]/10 hover:to-[#FFCC00]/15 rounded-xl border border-[#FF0000]/20 transition-all group"
                title="Наш Яндекс.Дзен"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF0000] to-[#FFCC00] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <div className="absolute inset-0 bg-white rounded-full"></div>
                    <span className="relative text-[#FF0000] font-bold text-lg leading-none">
                      Я
                    </span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  Дзен
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Яндекс
                </span>
              </a>
            </div>

            {/* Группы в мессенджерах */}
            <div className="pt-4">
              <div className="text-sm text-muted-foreground mb-3">
                Группы в мессенджерах:
              </div>
              <div className="flex gap-3">
                {/* Telegram группа */}
                <a
                  href="#"
                  onClick={() => trackSocialClick("telegram_channel")}
                  className="flex-1 flex items-center justify-center p-3 bg-gradient-to-r from-[#0088cc]/10 to-[#0088cc]/5 hover:from-[#0088cc]/20 hover:to-[#0088cc]/15 rounded-lg border border-[#0088cc]/20 transition-all group"
                  title="Telegram группа"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.356l-1.896 8.928c-.134.626-.478.78-.97.486l-2.698-1.984-1.297 1.25c-.143.143-.265.265-.543.265l.193-2.72 5.022-4.53c.218-.196-.048-.305-.338-.11l-6.208 3.91-2.67-.835c-.582-.18-.596-.582.12-.864l10.47-4.03c.485-.18.91.12.72.864z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[#0088cc]">
                      Telegram
                    </span>
                  </div>
                </a>

                {/* MAX группа */}
                <a
                  href="#"
                  onClick={() => trackSocialClick("max_group")}
                  className="flex-1 flex items-center justify-center p-3 bg-gradient-to-r from-[#6D4DFF]/10 to-[#3B1E8C]/5 hover:from-[#6D4DFF]/20 hover:to-[#3B1E8C]/15 rounded-lg border border-[#6D4DFF]/20 transition-all group"
                  title="MAX группа"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6D4DFF] to-[#3B1E8C] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-xs font-bold text-white">M</span>
                    </div>
                    <span className="text-sm font-medium text-[#6D4DFF]">
                      MAX
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="mt-8 sm:mt-10 mb-6 sm:mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>

        {/* Нижняя часть */}
        <div className="space-y-5">
          {/* Реквизиты */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground/90">
                © 2016-{currentYear} ЮрСервис НСК. Все права защищены.
              </p>
              <div className="text-sm text-muted-foreground space-y-1 leading-relaxed">
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
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-muted-foreground">
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
              <a
                href="/sitemap"
                className="hover:text-primary transition-colors hover:underline"
              >
                Карта сайта
              </a>
            </div>

            <div className="flex items-center gap-3 mt-2 sm:mt-0">
              <div className="text-xs px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200 font-medium">
                ФНС проверено
              </div>
              <div className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200 font-medium">
                Аккредитация МВД
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
