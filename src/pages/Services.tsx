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
        title="Юридическая помощь в Новосибирске | Решение любых проблем"
        description="ДТП, долги, развод, затопили соседи, проблемы с работой? Просто опишите ситуацию — мы знаем решение. Бесплатная консультация юриста. +7 (383) 235-95-05"
        keywords="юрист, решение проблем, ДТП, долги, развод, новосибирск, юридическая помощь, бесплатная консультация, суд, представительство"
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

          {/* Основной компонент услуг */}
          <Services />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ServicesPage;
