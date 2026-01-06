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
        title="Решаем юридические проблемы в Новосибирске | Юридическая помощь"
        description="Затопили квартиру? Долги по кредитам? Не платят зарплату? Решим вашу проблему. Бесплатная консультация юриста. Звоните +7 (383) 235-95-05"
        keywords="юридическая помощь, решение проблем, долги, ДТП, развод, новосибирск, юрист"
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
                <BreadcrumbPage>Решение проблем</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Основной контент */}
          <Services />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ServicesPage;
