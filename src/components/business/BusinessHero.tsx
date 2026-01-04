import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { CONTACTS } from "@/config/contacts";
import { useEffect, useState } from "react";

const BusinessHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(106063131, "reachGoal", "whatsapp_click");
    }
    window.open(`https://wa.me/${CONTACTS.whatsapp}`, "_blank");
  };

  const handlePhoneClick = () => {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(106063131, "reachGoal", "phone_click");
    }
    window.location.href = `tel:${CONTACTS.phone.replace(/[^\d+]/g, "")}`;
  };

  return (
    <section className="relative min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Анимированный фон с пульсацией */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        {/* Анимированные точки */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-ping animation-delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Левый блок - Текст с анимацией */}
            <div
              className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div
                className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
              >
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6 hover:bg-white/15 transition-colors">
                  <Icon name="Building2" size={20} className="text-blue-300" />
                  <span className="text-sm font-semibold tracking-wider">
                    ЮРИДИЧЕСКАЯ ЗАЩИТА БИЗНЕСА
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  <span
                    className={`block transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                  >
                    Защита бизнеса
                  </span>
                  <span
                    className={`block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                  >
                    в арбитражных спорах
                  </span>
                </h1>

                <p
                  className={`text-xl text-slate-300 mb-8 leading-relaxed transition-all duration-700 delay-900 ${isVisible ? "opacity-100" : "opacity-0"}`}
                >
                  Представьте: вы столкнулись с арбитражным иском или рисками в
                  договоре... Мы здесь, чтобы помочь. Профессиональное
                  юридическое сопровождение для вашего бизнеса.
                </p>
              </div>

              {/* Преимущества */}
              <div
                className={`grid grid-cols-2 gap-4 mb-8 transition-all duration-1000 delay-1100 ${isVisible ? "opacity-100" : "opacity-0"}`}
              >
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon
                      name="GraduationCap"
                      size={20}
                      className="text-blue-300 group-hover:text-blue-200 transition-colors"
                    />
                  </div>
                  <div>
                    <div className="font-medium">Высшее образование</div>
                    <div className="text-sm text-slate-400">
                      Профильные юристы
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon
                      name="FileCheck"
                      size={20}
                      className="text-blue-300 group-hover:text-blue-200 transition-colors"
                    />
                  </div>
                  <div>
                    <div className="font-medium">Фиксированная цена</div>
                    <div className="text-sm text-slate-400">
                      Без скрытых платежей
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon
                      name="Target"
                      size={20}
                      className="text-blue-300 group-hover:text-blue-200 transition-colors"
                    />
                  </div>
                  <div>
                    <div className="font-medium">Специализация</div>
                    <div className="text-sm text-slate-400">
                      Арбитраж, договоры
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon
                      name="Shield"
                      size={20}
                      className="text-blue-300 group-hover:text-blue-200 transition-colors"
                    />
                  </div>
                  <div>
                    <div className="font-medium">Конфиденциальность</div>
                    <div className="text-sm text-slate-400">NDA по запросу</div>
                  </div>
                </div>
              </div>

              {/* Кнопки */}
              <div
                className={`transition-all duration-1000 delay-1300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 text-lg px-8 py-6 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1"
                    onClick={handleWhatsAppClick}
                  >
                    <Icon name="MessageCircle" size={24} className="mr-3" />
                    Бесплатная консультация
                  </Button>
                  <Button
                    size="lg"
                    className="bg-white/5 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:shadow-lg text-lg px-8 py-6 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
                    onClick={handlePhoneClick}
                  >
                    <Icon name="Phone" size={24} className="mr-3" />
                    <span className="text-white">{CONTACTS.phone}</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Правый блок - Статистика */}
            <div
              className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 lg:p-10 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <h3 className="text-2xl font-bold mb-8 text-center">
                Наши преимущества
              </h3>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  {
                    value: "24/7",
                    label: "Юридическая поддержка",
                    icon: "Clock",
                  },
                  { value: "1 час", label: "Ответ на заявку", icon: "Zap" },
                  {
                    value: "100%",
                    label: "Конфиденциальность",
                    icon: "Shield",
                  },
                  { icon: "CheckCircle", label: "Быстрое решение", text: true },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  >
                    {item.value ? (
                      <>
                        <div className="text-4xl font-bold text-blue-300 mb-2 group-hover:scale-110 transition-transform">
                          {item.value}
                        </div>
                        <div className="text-sm text-blue-200 group-hover:text-blue-100">
                          {item.label}
                        </div>
                      </>
                    ) : (
                      <>
                        <Icon
                          name={item.icon}
                          className="h-10 w-10 text-blue-300 mx-auto mb-2 group-hover:scale-110 transition-transform"
                        />
                        <div className="text-sm text-blue-200 group-hover:text-blue-100">
                          {item.label}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[
                  "Специализация на арбитражных спорах",
                  "Работаем с компаниями любого масштаба",
                  "Детальный анализ каждой ситуации",
                ].map((text, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                  >
                    <Icon
                      name="CheckCircle2"
                      size={20}
                      className="text-green-400 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-slate-200 group-hover:text-white">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Градиент внизу */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default BusinessHero;
