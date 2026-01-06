import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AudienceSelector from "@/components/AudienceSelector";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const audienceType = localStorage.getItem("audienceType");
    const audienceTimestamp = localStorage.getItem("audienceTimestamp");
    const now = Date.now();

    // Сброс выбора через 24 часа
    if (
      audienceTimestamp &&
      now - parseInt(audienceTimestamp) > 24 * 60 * 60 * 1000
    ) {
      localStorage.removeItem("audienceType");
      localStorage.removeItem("audienceTimestamp");
      return;
    }

    if (audienceType === "business") {
      navigate("/business");
    } else if (audienceType === "citizens") {
      navigate("/citizens");
    }
  }, [navigate]);

  const handleAudienceSelect = async (type: "business" | "citizens") => {
    setIsLoading(true);
    // Небольшая задержка для лучшего UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    localStorage.setItem("audienceType", type);
    localStorage.setItem("audienceTimestamp", Date.now().toString());

    if (type === "business") {
      navigate("/business");
    } else {
      navigate("/citizens");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="ЮрСервис НСК - Юридические услуги в Новосибирске"
        description="Профессиональные юридические услуги для граждан и бизнеса в Новосибирске. Автоюрист, гражданские дела, банкротство, миграционные споры."
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <AudienceSelector onSelect={handleAudienceSelect} />
      </div>
    </>
  );
};

export default Index;
