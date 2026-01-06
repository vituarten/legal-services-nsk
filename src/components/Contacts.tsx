import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Contacts = () => {
  const contactInfo = [
    {
      icon: "Phone" as const,
      title: "Основной телефон",
      value: "+7 993 190 35 00",
      link: "tel:+79931903500",
      description: "Звонки по всей России",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: "Phone" as const,
      title: "Городской номер",
      value: "+7 (383) 235-95-05",
      link: "tel:+73832359505",
      description: "Для звонков из Новосибирска",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      icon: "Mail" as const,
      title: "Email",
      value: "info@yurservicensk.ru",
      link: "mailto:info@yurservicensk.ru",
      description: "Для официальных писем",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      icon: "MapPin" as const,
      title: "Адрес офиса",
      value: "г. Новосибирск, ул. Ленина, д. 3",
      link: "#",
      description: "Юридический адрес",
      color: "bg-green-500/10 text-green-500",
    },
    {
      icon: "Clock" as const,
      title: "Режим работы",
      value: "Круглосуточно 24/7",
      link: "#",
      description: "Консультации в любое время",
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      icon: "Building2" as const,
      title: "О компании",
      value: "ЮрСервис НСК",
      link: "#home",
      description: "Работаем с 2016 года",
      color: "bg-red-500/10 text-red-500",
    },
  ];

  const companyInfo = [
    "✅ Опыт работы с 2016 года",
    "✅ Аккредитация МВД Новосибирской области",
    "✅ Индивидуальный подход к каждому клиенту",
    "✅ Прозрачное ценообразование",
    "✅ Работаем по всей России",
    "✅ Очная и дистанционная консультация",
  ];

  return (
    <section
      id="contacts"
      className="py-12 sm:py-16 bg-gradient-to-b from-background to-white"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            📍 Контакты и реквизиты
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Наши контакты, адрес и информация о компании
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Левая колонка - Контакты */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target={
                    item.link.startsWith("tel:") ||
                    item.link.startsWith("mailto:")
                      ? "_self"
                      : "_blank"
                  }
                  rel="noopener noreferrer"
                  className={`block ${item.link === "#" ? "cursor-default" : "cursor-pointer hover:scale-[1.02] transition-transform"}`}
                  onClick={() => {
                    if (
                      (item.link.startsWith("tel:") ||
                        item.link.startsWith("mailto:")) &&
                      typeof window !== "undefined" &&
                      window.ym
                    ) {
                      window.ym(
                        106063131,
                        "reachGoal",
                        `${item.icon.toLowerCase()}_click`,
                      );
                    }
                  }}
                >
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-border hover:border-gray-300 hover:shadow-md transition-all h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color.split(" ")[0]}`}
                        >
                          <Icon
                            name={item.icon}
                            className={`h-5 w-5 ${item.color.split(" ")[1]}`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground text-sm">
                            {item.title}
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="text-lg font-bold text-foreground mb-1">
                          {item.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Карта */}
            <div className="mt-6 sm:mt-8">
              <h3 className="font-semibold text-foreground text-lg sm:text-xl mb-3">
                🗺️ Мы находимся здесь
              </h3>
              <Card className="border-border overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video">
                    <iframe
                      src="https://yandex.ru/map-widget/v1/?ll=82.920430%2C55.030204&z=14&l=map&pt=82.920430%2C55.030204,pm2rdm"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      title="Офис ЮрСервис НСК в Новосибирске"
                      loading="lazy"
                      allowFullScreen
                      className="block"
                    />
                  </div>
                  <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-white border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-1">
                        <strong>Адрес:</strong> г. Новосибирск, ул. Ленина, д. 3
                      </p>
                      <p>
                        <strong>Время работы:</strong> круглосуточно,
                        консультации 24/7
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Правая колонка - Информация о компании (БЕЗ РЕКВИЗИТОВ) */}
          <div>
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 sticky top-6">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Scale" className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">
                      ЮрСервис НСК
                    </h3>
                    <p className="text-sm text-muted-foreground">С 2016 года</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground mb-2">
                    🎯 О нас:
                  </h4>
                  <ul className="space-y-2">
                    {companyInfo.map((info, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icon
                          name="CheckCircle"
                          className="h-4 w-4 text-primary flex-shrink-0 mt-0.5"
                        />
                        <span className="text-sm text-foreground">{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Убрали блок с реквизитами */}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Призыв к действию - с новым номером */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white p-4 sm:p-5 rounded-xl border border-border shadow-sm">
            <div className="text-left">
              <div className="font-semibold text-foreground">
                📞 Нужна срочная консультация?
              </div>
              <div className="text-sm text-muted-foreground">
                Позвоните прямо сейчас
              </div>
            </div>
            <a
              href="tel:+79994523500"
              className="inline-flex items-center gap-2 text-lg font-bold text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
              onClick={() => {
                if (typeof window !== "undefined" && window.ym) {
                  window.ym(106063131, "reachGoal", "urgent_call_bottom");
                }
              }}
            >
              <Icon name="Phone" className="h-5 w-5" />
              +7 999 452 35 00
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
