import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.consent) {
      alert(
        "Пожалуйста, заполните все поля и дайте согласие на обработку данных",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Простая отправка - можно заменить на Telegram бота или email
      const message = `📞 Новая заявка с сайта:\n\n👤 Имя: ${formData.name}\n📱 Телефон: ${formData.phone}\n⏰ Время: ${new Date().toLocaleString("ru-RU")}`;

      console.log("Заявка получена:", message);

      // Яндекс.Метрика
      if (typeof window !== "undefined" && window.ym) {
        window.ym(106063131, "reachGoal", "quick_form_submit");
      }

      // Симуляция отправки
      await new Promise((resolve) => setTimeout(resolve, 800));

      alert("✅ Отлично! Мы перезвоним вам в течение 15 минут.");
      setFormData({
        name: "",
        phone: "",
        consent: false,
      });
    } catch (error) {
      console.error("Ошибка:", error);
      alert("⚠️ Ошибка отправки. Позвоните нам напрямую: +7 993 190 35 00");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    {
      icon: "Phone",
      title: "Позвоните нам",
      value: "+7 993 190 35 00",
      link: "tel:+79931903500",
      subtitle: "Основной номер",
      action: "Позвонить",
    },
    {
      icon: "Clock",
      title: "Работаем 24/7",
      value: "Круглосуточно",
      link: "#",
      subtitle: "Консультации в любое время",
      action: "",
    },
    {
      icon: "MapPin",
      title: "Приходите",
      value: "Новосибирск",
      link: "#",
      subtitle: "ул. Ленина, д. 3",
      action: "",
    },
  ];

  const benefits = [
    "✅ Бесплатный разбор ситуации",
    "✅ 15 минут — и вы знаете решение",
    "✅ Консультация по телефону",
    "✅ Гарантия конфиденциальности",
  ];

  return (
    <section
      id="contacts"
      className="py-12 sm:py-16 bg-gradient-to-b from-background to-secondary/10"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            📞 Получите бесплатную консультацию юриста
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Оставьте заявку — перезвоним через 15 минут. Разберём вашу ситуацию
            и предложим решение.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Левая часть - Контакты и преимущества */}
          <div className="space-y-6 sm:space-y-8">
            {/* Контактные карточки */}
            <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
              {contactItems.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target={item.link.startsWith("tel:") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className={`group block ${item.link === "#" ? "cursor-default" : "cursor-pointer"}`}
                  onClick={() => {
                    if (
                      item.link.startsWith("tel:") &&
                      typeof window !== "undefined" &&
                      window.ym
                    ) {
                      window.ym(106063131, "reachGoal", "phone_click_main");
                    }
                  }}
                >
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all h-full">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon
                          name={item.icon as any}
                          className="h-5 w-5 text-primary"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground text-sm sm:text-base mb-0.5">
                          {item.title}
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-foreground mb-1">
                          {item.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.subtitle}
                        </div>
                        {item.action && (
                          <div className="mt-2 text-xs font-medium text-primary flex items-center gap-1">
                            {item.action}
                            <Icon
                              name="ArrowRight"
                              className="h-3 w-3 group-hover:translate-x-1 transition-transform"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Преимущества */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-5 sm:p-6">
                <h3 className="font-bold text-lg sm:text-xl text-foreground mb-4">
                  🎯 Почему выбирают нас:
                </h3>
                <ul className="space-y-2.5">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Icon
                        name="CheckCircle"
                        className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                      />
                      <span className="text-sm sm:text-base text-foreground">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Карта */}
            <div>
              <h3 className="font-semibold text-foreground text-lg sm:text-xl mb-3">
                📍 Мы находимся в Новосибирске
              </h3>
              <div className="rounded-xl overflow-hidden border border-border">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=82.920430%2C55.030204&z=13&l=map&pt=82.920430%2C55.030204,pm2rdm"
                  width="100%"
                  height="250"
                  frameBorder="0"
                  title="Офис в Новосибирске"
                  loading="lazy"
                  allowFullScreen
                  className="block"
                />
              </div>
            </div>
          </div>

          {/* Правая часть - Форма */}
          <div>
            <Card className="border-none shadow-xl bg-gradient-to-br from-background to-white">
              <CardContent className="p-5 sm:p-6 md:p-8">
                <div className="text-center mb-6">
                  <div className="inline-block p-3 bg-primary/10 rounded-full mb-3">
                    <Icon
                      name="MessageCircle"
                      className="h-8 w-8 text-primary"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    Оставьте заявку сейчас
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    И получите бесплатную консультацию юриста
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Ваше имя
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Как к вам обращаться?"
                        required
                        className="h-12 text-base"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Ваш телефон *
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+7 993 190 35 00"
                        required
                        className="h-12 text-base"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      className="mt-1"
                      id="consent"
                      required
                    />
                    <label
                      htmlFor="consent"
                      className="text-xs text-muted-foreground flex-1"
                    >
                      Нажимая кнопку, вы соглашаетесь с{" "}
                      <a
                        href="/privacy"
                        className="text-primary hover:underline"
                      >
                        политикой конфиденциальности
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <Icon name="Loader2" className="h-5 w-5 animate-spin" />
                        <span>Отправляем...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Icon name="Phone" className="h-5 w-5" />
                        <span>ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ</span>
                      </div>
                    )}
                  </Button>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Shield" className="h-4 w-4 text-primary" />
                      <span>Ваши данные в безопасности</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Мы перезвоним в течение 15 минут
                    </div>
                  </div>
                </form>

                {/* Дополнительный CTA */}
                <div className="mt-6 pt-5 border-t border-border/50">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Нужна срочная помощь?
                    </p>
                    <a
                      href="tel:+79931903500"
                      className="inline-flex items-center gap-2 text-lg font-bold text-primary hover:text-primary/80 transition-colors"
                      onClick={() => {
                        if (typeof window !== "undefined" && window.ym) {
                          window.ym(106063131, "reachGoal", "urgent_call");
                        }
                      }}
                    >
                      <Icon name="Phone" className="h-5 w-5" />
                      +7 993 190 35 00
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
