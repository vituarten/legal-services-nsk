import Services from "@/components/Services";
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
  const seo = getSEOConfig("services");

  return (
    <>
      <SEOHead
        title="Профессиональные юридические услуги в Новосибирске | Юридическая помощь"
        description="Профессиональные юридические услуги: взыскание задолженности, банкротство, семейные споры, ДТП, трудовые споры. Бесплатная консультация юриста. Звоните +7 (383) 235-95-05"
        keywords="юридические услуги, юрист Новосибирск, взыскание задолженности, банкротство, семейные споры, ДТП, трудовые споры"
        canonical="/services"
      />

      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Хлебные крошки */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Главная</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Юридические услуги</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Основной компонент услуг */}
          <Services />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ServicesPage;
