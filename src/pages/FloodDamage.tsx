// app/flood-damage/page.tsx (основная страница)
import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/HeroSection"; // Ваш существующий гер-блок
import FloodDamageCalculator from "@/components/FloodDamageCalculator";
import ActionChecklist from "@/components/ActionChecklist";
import SocialProofSection from "@/components/SocialProofSection";
import UrgentContactForm from "@/components/UrgentContactForm";
import ServicesSection from "@/components/ServicesSection"; // Ваш блок с услугами
import FAQSection from "@/components/FAQSection"; // Ваш блок с вопросами

export default function FloodDamagePage() {
  return (
    <>
      <Helmet>
        <title>
          Юрист по заливу квартиры в Новосибирске | Взыскание ущерба от потопа
        </title>
        <meta
          name="description"
          content="Затопили соседи? Профессиональный юрист по заливам. Взыщем ущерб за ремонт + штраф 50% + моральный вред. Работаем без предоплаты. Звоните: +7 (383) 235-95-05"
        />
      </Helmet>

      {/* 1. Гер-блок с формой (уже есть у вас) */}
      <HeroSection />

      {/* 2. Чек-лист первых действий (новый) */}
      <ActionChecklist />

      {/* 3. Калькулятор компенсации (новый) */}
      <FloodDamageCalculator />

      {/* 4. Блок с услугами и ценами (уже есть у вас) */}
      <ServicesSection />

      {/* 5. Социальные доказательства (новый) */}
      <SocialProofSection />

      {/* 6. Усиленная форма с таймером (новый) */}
      <UrgentContactForm />

      {/* 7. FAQ (уже есть у вас) */}
      <FAQSection />

      {/* 8. Финальный CTA блок (уже есть у вас) */}
      <FinalCTASection />
    </>
  );
}
