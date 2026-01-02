import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ContactBarProps {
  phone?: string;
  telegram?: string;
  onConsultClick?: () => void;
}

const ContactBar = ({ 
  phone = "+7 (999) 452-35-00", 
  telegram = "79931903500",
  onConsultClick 
}: ContactBarProps) => {
  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(106063131, 'reachGoal', 'phone_click');
    }
    window.location.href = `tel:${phone.replace(/[^\d+]/g, '')}`;
  };

  const handleTelegramClick = () => {
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(106063131, 'reachGoal', 'telegram_click');
    }
    window.open(`https://t.me/${telegram}`, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t-2 border-blue-200 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-600 mb-1">Нужна консультация?</p>
            <p className="font-bold text-gray-900">Позвоните или напишите нам</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handlePhoneClick}
            >
              <Icon name="Phone" size={20} className="mr-2" />
              {phone}
            </Button>
            
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleTelegramClick}
            >
              <Icon name="Send" size={20} className="mr-2" />
              Telegram
            </Button>

            {onConsultClick && (
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={onConsultClick}
              >
                <Icon name="FileText" size={20} className="mr-2" />
                Заявка
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBar;