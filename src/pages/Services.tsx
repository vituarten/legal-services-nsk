import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import SEOHead from "@/components/SEOHead";
import { getSEOConfig } from "@/utils/seoConfig";
import Footer from "@/components/Footer";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("popular");
  const seo = getSEOConfig("services");

  const tabs = [
    { id: "popular", label: "ПОПУЛЯРНЫЕ" },
    { id: "citizens", label: "УСЛУГИ ДЛЯ ГРАЖДАН" },
    { id: "business", label: "УСЛУГИ ДЛЯ БИЗНЕСА" },
    { id: "realestate", label: "НЕДВИЖИМОСТЬ" },
    { id: "bankruptcy", label: "БАНКРОТСТВО" },
  ];

  const allServices = [
    {
      icon: "Car",
      title: "Автоюрист. Споры по ДТП",
      description:
        "Взыскание ущерба по ОСАГО, споры со страховыми, защита от лишения прав",
      category: ["popular", "citizens"],
      link: "/dtp-lawyer",
    },
    {
      icon: "Users",
      title: "Семейный юрист",
      description: "Развод, раздел имущества, алименты, опека, споры по детям",
      category: ["popular", "citizens"],
      link: "/family-lawyer",
    },
    {
      icon: "TrendingDown",
      title: "Банкротство физических лиц",
      description:
        "Процедура банкротства для граждан, списание долгов, защита имущества",
      category: ["popular", "bankruptcy", "citizens"],
      link: "/bankruptcy-lawyer",
    },
    {
      icon: "Home",
      title: "Недвижимость и перепланировки",
      description:
        "Сделки с недвижимостью, узаконивание перепланировок, споры с соседями",
      category: ["popular", "realestate"],
      link: "/real-estate-lawyer",
    },
    {
      icon: "CreditCard",
      title: "Взыскание долгов",
      description:
        "Взыскание задолженности, работа с должниками, исполнительное производство",
      category: ["popular", "citizens"],
      link: "/debt-collection",
    },
    {
      icon: "FileText",
      title: "Миграционные споры",
      description: "Получение РВП, ВНЖ, гражданства, защита от депортации",
      category: ["popular", "citizens"],
      link: "/migration",
    },
    {
      icon: "Shield",
      title: "Уголовная защита",
      description:
        "Защита в уголовных делах, представительство в суде, обжалование приговоров",
      category: ["popular", "citizens"],
      link: "/criminal-lawyer",
    },
    {
      icon: "ShieldCheck",
      title: "Защита прав потребителей",
      description:
        "Возврат некачественного товара, споры с продавцами и услугами",
      category: ["popular", "citizens"],
      link: "/consumer-protection",
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
      icon: "FileText",
      title: "Составление документов",
      description: "Подготовка договоров, исков, жалоб, анализ документации",
      category: ["citizens"],
      link: "/document-services",
    },
    {
      icon: "Briefcase",
      title: "Трудовое право",
      description:
        "Защита трудовых прав, взыскание заработной платы, восстановление на работе",
      category: ["citizens"],
      link: "/labor-law",
    },
    {
      icon: "MapPin",
      title: "Земельное право",
      description:
        "Оформление земельных участков, споры по межеванию, аренда земли",
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
    {
      icon: "Shield",
      title: "Представительство и защита в суде",
      description: "Представительство интересов в судах всех инстанций",
      category: ["popular", "business", "citizens"],
      link: "/court-representation",
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
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Главная</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Услуги</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Заголовок */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Услуги юристов в Новосибирске
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Найдите нужную услугу. Под каждой — детальное описание, порядок
              работы и примеры из практики.
            </p>
          </div>

          {/* Табы */}
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

          {/* Сетка услуг - чистая навигация */}
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

          {/* Минимальный блок для неопределившихся */}
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
        <Footer />
      </div>
    </>
  );
};

export default ServicesPage;
