import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { CONTACTS } from "@/config/contacts";

const BusinessHero = () => {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${CONTACTS.whatsapp}`, "_blank");
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${CONTACTS.phone.replace(/[^\d+]/g, "")}`;
  };

  return (
    <section className="relative min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
            <Icon name="Building2" size={20} className="text-blue-300" />
            <span className="text-sm font-semibold">
              ЮРИДИЧЕСКАЯ ЗАЩИТА БИЗНЕСА
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            <span className="block">Надежная защита</span>
            <span className="block mt-2 text-blue-400">
              интересов вашей компании
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
            Профессиональное юридическое сопровождение бизнеса. Арбитражные
            споры • Договорное право • Корпоративное право
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg px-8 py-6 rounded-xl"
              onClick={handleWhatsAppClick}
            >
              <Icon name="MessageCircle" size={24} className="mr-2" />
              Бесплатная консультация
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-xl"
              onClick={handlePhoneClick}
            >
              <Icon name="Phone" size={24} className="mr-2" />
              {CONTACTS.phone}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
              <div className="text-sm text-blue-200">Успешных дел</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-sm text-blue-200">Поддержка</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-sm text-blue-200">Конфиденциальность</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">1 час</div>
              <div className="text-sm text-blue-200">Ответ на заявку</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessHero;
