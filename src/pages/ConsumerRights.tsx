import ConsumerCalculator from '@/components/ConsumerCalculator';
import ConsumerHeroSection from '@/components/consumer-rights/ConsumerHeroSection';
import ConsumerLawSection from '@/components/consumer-rights/ConsumerLawSection';
import ConsumerSituationsSection from '@/components/consumer-rights/ConsumerSituationsSection';
import { trackCustomGoal } from '@/utils/metrika';

export default function ConsumerRights() {
  const handlePhoneClick = () => {
    trackCustomGoal('consumer_rights_consultation', {
      source: 'page',
      action: 'phone_call'
    });
  };

  const handleWhatsAppClick = () => {
    trackCustomGoal('consumer_rights_whatsapp', {
      source: 'page',
      action: 'whatsapp_click'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <ConsumerHeroSection 
        onPhoneClick={handlePhoneClick}
        onWhatsAppClick={handleWhatsAppClick}
      />

      <ConsumerCalculator />

      <ConsumerLawSection />

      <ConsumerSituationsSection />
    </div>
  );
}
