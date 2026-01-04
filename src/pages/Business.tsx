import BusinessNavigation from "@/components/business/BusinessNavigation";
import BusinessHero from "@/components/business/BusinessHero";
import BusinessServices from "@/components/business/BusinessServices";
import BusinessBlog from "@/components/business/BusinessBlog";
import BusinessContacts from "@/components/business/BusinessContacts";
import BusinessFooter from "@/components/business/BusinessFooter";
import SEOHead from "@/components/SEOHead";

const Business = () => {
  return (
    <>
      <SEOHead
        title="Юридическая защита бизнеса | Арбитражные споры, договорное право, корпоративные вопросы"
        description="Профессиональная юридическая помощь бизнесу. Арбитражные споры, разработка договоров, защита корпоративных интересов. Бесплатная консультация за 1 час."
        keywords="юридическая помощь бизнесу, арбитражные споры, контракты и договоры, корпоративное право, взыскание долгов, юридическое сопровождение"
        canonical="https://yurist-kaluga.ru/business"
      />
      <BusinessNavigation />
      <div className="min-h-screen bg-slate-50">
        <BusinessHero />
        <BusinessServices />
        <BusinessBlog />
        <BusinessContacts />
        <BusinessFooter />
      </div>
    </>
  );
};

export default Business;
