// src/components/business/Services.tsx
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("popular");

  const tabs = [
    { id: "popular", label: "ПОПУЛЯРНЫЕ" },
    { id: "citizens", label: "УСЛУГИ ДЛЯ ГРАЖДАН" },
    { id: "business", label: "УСЛУГИ ДЛЯ БИЗНЕСА" },
    { id: "realestate", label: "НЕДВИЖИМОСТЬ" },
    { id: "bankruptcy", label: "БАНКРОТСТВО" },
  ];

  const allServices = [
    {
      icon: "Users",
      title: "Семейный юрист",
      description: "Развод, раздел имущества, алименты, опека",
      category: ["popular", "citizens"],
      link: "/family-lawyer",
    },
    {
      icon: "TrendingDown",
      title: "Банкротство физических лиц",
      description: "Процедура банкротства для граждан, списание долгов",
      category: ["popular", "bankruptcy", "citizens"],
      link: "/bankruptcy-lawyer",
    },
    {
      icon: "Home",
      title: "Недвижимость и перепланировки",
      description: "Сделки с недвижимостью, узаконивание перепланировок",
      category: ["popular", "realestate"],
      link: "/real-estate-lawyer",
    },
    {
      icon: "CreditCard",
      title: "Взыскание долгов",
      description: "Взыскание задолженности, работа с должниками",
      category: ["popular", "business", "citizens"],
      link: "/debt-collection",
    },
    {
      icon: "FileText",
      title: "Составление и анализ документов",
      description:
        "Подготовка договоров, анализ документации, правовая экспертиза",
      category: ["popular", "business", "citizens"],
      link: "/document-services",
    },
    {
      icon: "Shield",
      title: "Представительство и защита в суде",
      description: "Представительство интересов в судах всех инстанций",
      category: ["popular", "business", "citizens"],
      link: "/court-representation",
    },
    {
      icon: "ShieldCheck",
      title: "Защита прав потребителей",
      description: "Возврат некачественного товара, споры с продавцами",
      category: ["popular", "citizens"],
      link: "/consumer-protection",
    },
    {
      icon: "Car",
      title: "Автоюрист. Споры по ДТП",
      description: "Взыскание ущерба, представительство в суде по автоавариям",
      category: ["popular", "citizens"],
      link: "/car-lawyer",
    },
    {
      icon: "Building",
      title: "Споры с застройщиками",
      description:
        "Защита прав дольщиков, взыскание неустойки, возврат средств",
      category: ["popular", "realestate", "citizens"],
      link: "/disputes-with-developers",
    },
    {
      icon: "Briefcase",
      title: "Трудовое право",
      description: "Защита трудовых прав, взыскание заработной платы",
      category: ["citizens"],
      link: "/labor-law",
    },
    {
      icon: "Building",
      title: "Земельное право",
      description: "Оформление земельных участков, споры по межеванию",
      category: ["realestate"],
      link: "/land-law",
    },
    {
      icon: "Droplets",
      title: "Возмещение ущерба от потопов",
      description: "Взыскание ущерба от залития квартиры, оценка повреждений",
      category: ["popular", "citizens", "realestate"],
      link: "/flood-damage",
    },
  ];

  const getFilteredServices = () => {
    if (activeTab === "popular") {
      return allServices.filter((service) =>
        service.category.includes("popular"),
      );
    }
    return allServices.filter((service) =>
      service.category.includes(activeTab),
    );
  };

  const services = getFilteredServices();

  return (
    <section id="services" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Услуги юристов в Новосибирске
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Найдите нужную услугу. Под каждой — детальное описание, порядок
            работы и примеры из практики.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-border p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(service.link)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(service.link)}
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon
                      name={service.icon}
                      className="h-6 w-6 text-primary"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-primary font-semibold text-sm group-hover:text-primary/80 transition-colors">
                    Подробнее об услуге
                  </span>
                  <Icon
                    name="ArrowRight"
                    className="h-4 w-4 text-primary transform group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 pt-8 border-t border-border">
          <p className="text-lg text-muted-foreground mb-4">
            Не нашли свою ситуацию в списке?
          </p>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
            Опишите проблему по телефону, и юрист подскажет, как её решить
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open("tel:+73832359505", "_self")}
              className="border-primary text-primary hover:bg-primary hover:text-white px-8"
            >
              <Icon name="Phone" className="h-5 w-5 mr-2" />
              Позвонить юристу
            </Button>
            <div className="text-center sm:text-left">
              <div className="text-lg font-bold">+7 (383) 235-95-05</div>
              <div className="text-sm text-muted-foreground">
                Новосибирск, городской
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
