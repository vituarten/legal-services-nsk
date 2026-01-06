import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import SEOHead from "@/components/SEOHead";
import { getSEOConfig } from "@/utils/seoConfig";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const seo = getSEOConfig("services");

  const tabs = [
    { id: "all", label: "ВСЕ УСЛУГИ" },
    { id: "popular", label: "ПОПУЛЯРНЫЕ" },
    { id: "citizens", label: "ДЛЯ ГРАЖДАН" },
    { id: "realestate", label: "НЕДВИЖИМОСТЬ" },
    { id: "bankruptcy", label: "БАНКРОТСТВО" },
  ];

  // УДАЛЕНА услуга "Банкротство юридических лиц" и все цены
  const allServices = [
    {
      icon: "Car",
      title: "Автоюрист. Споры по ДТП",
      description:
        "Взыскание ущерба по ОСАГО, споры со страховыми, защита от лишения прав, административные дела",
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
        "Процедура банкротства для граждан, списание долгов, защита имущества от кредиторов",
      category: ["popular", "bankruptcy", "citizens"],
      link: "/bankruptcy-lawyer",
    },
    {
      icon: "FileText",
      title: "Миграционные споры",
      description:
        "Получение РВП, ВНЖ, гражданства, защита от депортации, миграционный учёт",
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
      link: "/real-estate-lawyer",
    },
    {
      icon: "FileText",
      title: "Составление документов",
      description:
        "Подготовка договоров, исков, жалоб, анализ документации, правовая экспертиза",
      category: ["citizens"],
      link: "/services",
    },
    {
      icon: "Briefcase",
      title: "Трудовое право",
      description:
        "Защита трудовых прав, взыскание заработной платы, восстановление на работе",
      category: ["citizens"],
      link: "/services",
    },
    {
      icon: "MapPin",
      title: "Земельное право",
      description:
        "Оформление земельных участков, споры по межеванию, аренда земли",
      category: ["realestate"],
      link: "/real-estate-lawyer",
    },
    {
      icon: "Droplets",
      title: "Возмещение ущерба от потопов",
      description:
        "Взыскание ущерба от залития квартиры, оценка повреждений, споры с соседями",
      category: ["popular", "citizens", "realestate"],
      link: "/flood-damage",
    },
  ];

  const getFilteredServices = () => {
    if (activeTab === "all") {
      return allServices;
    }
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

          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Наши услуги
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Полный спектр юридических услуг для граждан. Прозрачные цены,
              профессиональное качество, гарантия результата.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Services Grid - БЕЗ ЦЕН */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-border group"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Icon name={service.icon} className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex gap-2">
                    {service.link ? (
                      <Link to={service.link} className="flex-1">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                          <Icon name="ArrowRight" className="h-4 w-4 mr-2" />
                          Подробнее
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                        onClick={() => window.open("tel:+79994523500", "_self")}
                      >
                        <Icon name="MessageCircle" className="h-4 w-4 mr-2" />
                        Заказать услугу
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-primary to-blue-600 text-white border-none shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <h3 className="text-3xl font-bold">
                    Не нашли нужную услугу?
                  </h3>
                  <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                    Мы оказываем весь спектр юридических услуг. Позвоните или
                    оставьте заявку — подберём решение для вашей ситуации.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Button
                      size="lg"
                      className="bg-white text-primary hover:bg-gray-100"
                      onClick={() => window.open("tel:+79994523500", "_self")}
                    >
                      <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                      Бесплатная консультация
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-white text-white hover:bg-white hover:text-primary"
                      onClick={() => window.open("tel:+79994523500", "_self")}
                    >
                      <Icon name="Phone" className="h-5 w-5 mr-2" />
                      +7 999 452 35 00
                    </Button>
                  </div>

                  <div className="flex flex-wrap justify-center gap-6 pt-6 text-blue-100">
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" className="h-5 w-5" />
                      <span>Работаем 24/7</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="MapPin" className="h-5 w-5" />
                      <span>Выезд в любой район</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Shield" className="h-5 w-5" />
                      <span>Конфиденциальность</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ServicesPage;
