import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { CONTACTS } from "@/config/contacts";

const BusinessHero = () => {
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
      {/* Анимированный фон */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Левый блок - Текст */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
                  <Icon name="Building2" size={20} className="text-blue-300" />
                  <span className="text-sm font-semibold tracking-wider">
                    ЮРИДИЧЕСКАЯ ЗАЩИТА БИЗНЕСА
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  <span className="block">Надежная защита</span>
                  <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    интересов вашей компании
                  </span>
                </h1>

                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  Профессиональное юридическое сопровождение бизнеса. Решаем
                  сложные задачи в области арбитражных споров, договорного и
                  корпоративного права.
                </p>
              </div>

              {/* Преимущества */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center">
                    <Icon
                      name="ShieldCheck"
                      size={20}
                      className="text-blue-300"
                    />
                  </div>
                  <span className="font-medium">Конфиденциальность</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-blue-300" />
                  </div>
                  <span className="font-medium">Ответ за 1 час</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center">
                    <Icon
                      name="FileCheck"
                      size={20}
                      className="text-blue-300"
                    />
                  </div>
                  <span className="font-medium">Фиксированная цена</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center">
                    <Icon
                      name="GraduationCap"
                      size={20}
                      className="text-blue-300"
                    />
                  </div>
                  <span className="font-medium">Высшее образование</span>
                </div>
              </div>

              {/* Кнопки */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-xl shadow-blue-600/30 text-lg px-8 py-6 rounded-xl"
                  onClick={handleWhatsAppClick}
                >
                  <Icon name="MessageCircle" size={24} className="mr-3" />
                  Бесплатная консультация
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6 rounded-xl"
                  onClick={handlePhoneClick}
                >
                  <Icon name="Phone" size={24} className="mr-3" />
                  {CONTACTS.phone}
                </Button>
              </div>
            </div>

            {/* Правый блок - Статистика */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 lg:p-10">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <div className="text-4xl font-bold text-blue-300 mb-2">
                    95%
                  </div>
                  <div className="text-sm text-blue-200">Успешных дел</div>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <div className="text-4xl font-bold text-blue-300 mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-blue-200">Поддержка</div>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <div className="text-4xl font-bold text-blue-300 mb-2">
                    100%
                  </div>
                  <div className="text-sm text-blue-200">
                    Конфиденциальность
                  </div>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <div className="text-4xl font-bold text-blue-300 mb-2">
                    1 час
                  </div>
                  <div className="text-sm text-blue-200">Ответ на заявку</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                  <Icon
                    name="CheckCircle2"
                    size={20}
                    className="text-green-400"
                  />
                  <span className="text-slate-200">
                    Высшее юридическое образование
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                  <Icon
                    name="CheckCircle2"
                    size={20}
                    className="text-green-400"
                  />
                  <span className="text-slate-200">Опыт работы с бизнесом</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                  <Icon
                    name="CheckCircle2"
                    size={20}
                    className="text-green-400"
                  />
                  <span className="text-slate-200">
                    Детальный анализ каждой ситуации
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

// ВАЖНО: Добавить этот экспорт!
export default BusinessHero;
