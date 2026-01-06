import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Contacts = () => {
  const contactInfo = [
    {
      icon: "Phone" as const,
      title: "Телефон",
      value: "+7 (383) 235-95-05",
      link: "tel:+73832359505",
      description: "Городской номер, Новосибирск",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: "Mail" as const,
      title: "Email",
      value: "112@юридический-сервис.рф",
      link: "mailto:112@юридический-сервис.рф",
      description: "Основная почта",
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
    {
      icon: "Shield" as const,
      title: "Аккредитация",
      value: "МВД Новосибирской области",
      link: "#",
      description: "С 18 марта 2016 года",
      color: "bg-blue-500/10 text-blue-500",
    },
  ];

  return (
    <section
      id="contacts"
      className="py-8 sm:py-12 bg-gradient-to-b from-background to-white"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Контакты
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>

        {/* Основной контент - теперь без sticky */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Левая колонка - Контакты (2/3 ширины) */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
                  <div className="bg-white p-3 sm:p-4 rounded-lg border border-border hover:border-gray-300 hover:shadow-md transition-all h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex items-start gap-2 mb-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color.split(" ")[0]}`}
                        >
                          <Icon
                            name={item.icon}
                            className={`h-4 w-4 ${item.color.split(" ")[1]}`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground text-xs sm:text-sm">
                            {item.title}
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="text-sm sm:text-base font-bold text-foreground mb-0.5">
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
            <div className="mt-4 sm:mt-6">
              <h3 className="font-semibold text-foreground text-base sm:text-lg mb-2">
                Мы находимся здесь
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
                  <div className="p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-white border-t border-border">
                    <div className="text-xs sm:text-sm text-muted-foreground">
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

          {/* Правая колонка - Информация о компании (1/3 ширины) */}
          <div>
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 h-full">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Scale" className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">ЮрСервис НСК</h3>
                    <p className="text-xs text-muted-foreground">С 2016 года</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground text-sm mb-1">
                    О нас:
                  </h4>
                  <ul className="space-y-1.5">
                    {[
                      "✅ Опыт работы с 2016 года",
                      "✅ Аккредитация МВД Новосибирской области",
                      "✅ Индивидуальный подход к каждому клиенту",
                      "✅ Прозрачное ценообразование",
                      "✅ Работаем по всей России",
                      "✅ Очная и дистанционная консультация",
                    ].map((info, index) => (
                      <li key={index} className="flex items-start gap-1.5">
                        <Icon
                          name="CheckCircle"
                          className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5"
                        />
                        <span className="text-xs text-foreground">{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Призыв к действию - теперь пропорциональный и красивый */}
        <div className="mt-6 sm:mt-8">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-4 sm:p-5 border border-primary/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                  Нужна срочная консультация?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Позвоните прямо сейчас
                </p>
              </div>

              <div className="flex-shrink-0">
                <a
                  href="tel:+73832359505"
                  className="inline-flex items-center gap-2 text-lg sm:text-xl font-bold text-primary hover:text-primary/80 transition-colors bg-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg border border-primary/20 hover:border-primary/40 hover:shadow-sm"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.ym) {
                      window.ym(106063131, "reachGoal", "urgent_call_bottom");
                    }
                  }}
                >
                  <Icon name="Phone" className="h-5 w-5" />
                  +7 (383) 235-95-05
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
