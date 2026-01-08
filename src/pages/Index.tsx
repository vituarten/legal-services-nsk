import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AudienceSelector from "@/components/AudienceSelector";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const audienceType = localStorage.getItem("audienceType");
    if (audienceType === "business") {
      navigate("/business");
    } else if (audienceType === "citizens") {
      navigate("/citizens");
    }
  }, [navigate]);

  const handleAudienceSelect = (type: "business" | "citizens") => {
    localStorage.setItem("audienceType", type);
    navigate(type === "business" ? "/business" : "/citizens");
  };

  return (
    <>
      <SEOHead
        title="ЮрСервис НСК - Юридические услуги в Новосибирске"
        description="Профессиональные юридические услуги для граждан и бизнеса в Новосибирске. Автоюрист, гражданские дела, банкротство, миграционные споры."
        canonical="/"
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <AudienceSelector onSelect={handleAudienceSelect} />
      </div>
    </>
  );
};

export default Index;
