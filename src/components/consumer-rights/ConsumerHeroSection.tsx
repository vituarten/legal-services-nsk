import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ConsumerHeroSectionProps {
  onPhoneClick: () => void;
  onWhatsAppClick: () => void;
}

export default function ConsumerHeroSection({ onPhoneClick, onWhatsAppClick }: ConsumerHeroSectionProps) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="inline-block mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">
          🔥 Вернём деньги или работаем бесплатно
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Защита прав потребителей
        </h1>
        <p className="text-xl text-muted-foreground mb-4">
          Вернём до 200% от стоимости товара + неустойку + моральный вред + судебные расходы
        </p>
        <p className="text-lg mb-8">
          <strong>Средняя сумма взыскания — 187 000 ₽</strong> • 93% дел выигрываем
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href="https://wa.me/79994523500"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onWhatsAppClick}
          >
            <Button size="lg" className="text-lg px-8 bg-green-600 hover:bg-green-700">
              <Icon name="MessageCircle" className="mr-2" size={20} />
              Получить консультацию
            </Button>
          </a>
          <a href="tel:+7 (383) 235-95-05" onClick={onPhoneClick}>
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Icon name="Phone" className="mr-2" size={20} />
              +7 (999) 452-35-00
            </Button>
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          Бесплатная консультация • Ответим за 15 минут
        </p>
      </div>
    </section>
  );
}
