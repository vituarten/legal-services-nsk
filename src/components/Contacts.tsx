import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("Пожалуйста, введите имя и телефон");
      return;
    }

    setIsSubmitting(true);

    try {
      if (typeof window !== "undefined" && window.ym) {
        window.ym(106063131, "reachGoal", "main_form_submit");
      }

      const message = `📋 Новая заявка с сайта:\n\n👤 Имя: ${formData.name}\n📞 Телефон: ${formData.phone}\n📅 ${new Date().toLocaleString()}`;

      console.log("Заявка:", message);

      await new Promise((resolve) => setTimeout(resolve, 600));

      alert("✅ Мы перезвоним вам в течение 15 минут!");
      setFormData({
        name: "",
        phone: "",
      });
    } catch (error) {
      console.error("Ошибка отправки:", error);
      alert("⚠️ Что-то пошло не так. Позвоните нам: +7 (383) 235-95-05");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contacts"
      className="py-12 sm:py-16 bg-gradient-to-b from-background to-white"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Левая колонка - Контакты */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                >
                  <div className="bg-white p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all h-full">
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
                          <div className="font-semibold text-foreground">
                            {item.title}
                          </div>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <div className="text-lg font-bold text-foreground mb-1">
                          {item.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Карта */}
            <div className="mt-8">
              <h3 className="font-semibold text-foreground text-xl mb-4">
                Наш офис в Новосибирске
              </h3>
              <Card className="border-border overflow-hidden shadow-lg">
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
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-1">
                        <strong>📍 Адрес:</strong> г. Новосибирск, ул. Ленина,
                        д. 3
                      </p>
                      <p>
                        <strong>⏰ Время работы:</strong> круглосуточно,
                        консультации 24/7
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Правая колонка - Форма (sticky) */}
          <div>
            <div className="sticky top-6">
              <Card className="bg-gradient-to-br from-primary/5 via-white to-primary/5 border-primary/30 shadow-xl h-full">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Icon
                        name="MessageSquare"
                        className="h-7 w-7 text-white"
                      />
                    </div>
                    <h3 className="font-bold text-foreground text-xl mb-2">
                      Бесплатная консультация
                    </h3>
                    <p className="text-muted-foreground">
                      Оставьте номер телефона — юрист свяжется с вами
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">
                        Ваше имя
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Иван Иванов"
                        className="w-full py-3 px-4 border-border focus:border-primary"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">
                        Телефон *
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+7 (999) 123-45-67"
                        className="w-full py-3 px-4 border-border focus:border-primary"
                        required
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white text-base font-semibold py-4 shadow-lg hover:shadow-xl transition-all"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-3">
                            <Icon
                              name="Loader2"
                              className="h-5 w-5 animate-spin"
                            />
                            Отправляем...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-3">
                            <Icon name="Phone" className="h-5 w-5" />
                            Получить консультацию
                          </div>
                        )}
                      </Button>
                    </div>

                    <div className="text-center pt-2">
                      <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                        <Icon
                          name="ShieldCheck"
                          className="h-4 w-4 text-green-500"
                        />
                        <span>
                          Конфиденциально • Без спама • Первая консультация
                          бесплатно
                        </span>
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Простой баннер внизу */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Срочный вопрос? Не откладывайте!
                </h3>
                <p className="text-muted-foreground">
                  Позвоните прямо сейчас — первая консультация бесплатно
                </p>
              </div>
              <div>
                <a
                  href="tel:+73832359505"
                  className="inline-flex items-center justify-center gap-3 text-xl font-bold text-primary hover:text-primary/80 transition-colors bg-white px-8 py-4 rounded-xl border border-primary/20 hover:border-primary/40 hover:shadow-lg shadow-md"
                >
                  <Icon name="Phone" className="h-6 w-6" />
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
