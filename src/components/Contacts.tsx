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
      alert("⚠️ Ошибка отправки. Позвоните нам напрямую: +7 (383) 235-95-05");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contacts"
      className="py-12 sm:py-16 bg-gradient-to-b from-background to-secondary/10"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            📞 Получите консультацию юриста
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Оставьте заявку — перезвоним через 15 минут
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* Левая часть - Контакты */}
          <div className="space-y-6">
            {/* Телефон */}
            <div className="bg-white p-5 rounded-xl border border-border shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">
                    Позвоните нам
                  </div>
                  <a
                    href="tel:+73832359505"
                    className="text-xl font-bold text-foreground hover:text-primary transition-colors block"
                    onClick={() => {
                      if (typeof window !== "undefined" && window.ym) {
                        window.ym(
                          106063131,
                          "reachGoal",
                          "phone_click_contacts",
                        );
                      }
                    }}
                  >
                    +7 (383) 235-95-05
                  </a>
                  <div className="text-sm text-muted-foreground mt-1">
                    Городской номер, Новосибирск
                  </div>
                </div>
              </div>
            </div>

            {/* Адрес */}
            <div className="bg-white p-5 rounded-xl border border-border shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">
                    Наш адрес
                  </div>
                  <div className="text-foreground">
                    г. Новосибирск, ул. Ленина, д. 3
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Юридический адрес
                  </div>
                </div>
              </div>
            </div>

            {/* Карта */}
            <div className="rounded-xl overflow-hidden border border-border shadow-sm">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=82.920430%2C55.030204&z=14&l=map&pt=82.920430%2C55.030204,pm2rdm"
                width="100%"
                height="200"
                frameBorder="0"
                title="Офис в Новосибирске"
                loading="lazy"
                allowFullScreen
                className="block"
              />
            </div>
          </div>

          {/* Правая часть - Форма */}
          <div>
            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-6 sm:p-7">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Оставьте заявку сейчас
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    И мы вам перезвоним
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Ваше имя
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Как к вам обращаться?"
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Ваш телефон *
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+7 (___) ___-__-__"
                      required
                      className="h-12"
                    />
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
                      Согласен с{" "}
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
                    className="w-full h-12 font-semibold bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <Icon name="Loader2" className="h-4 w-4 animate-spin" />
                        <span>Отправляем...</span>
                      </div>
                    ) : (
                      "ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ"
                    )}
                  </Button>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Shield" className="h-4 w-4 text-primary" />
                      <span>Конфиденциально</span>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
