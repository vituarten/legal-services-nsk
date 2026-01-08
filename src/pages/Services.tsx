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
        title="Юридические услуги в Новосибирске | Профессиональная помощь юриста"
        description="Профессиональные юридические услуги: банкротство, взыскание долгов, семейные споры, ДТП, трудовые споры. Бесплатная консультация. Звоните +7 (383) 235-95-05"
        keywords="юридические услуги, юрист Новосибирск, профессиональная помощь, взыскание долгов, семейные споры, ДТП, трудовое право"
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
