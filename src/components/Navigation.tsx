// Navigation.tsx - исправленная версия с ButtonSimple
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ButtonSimple } from "@/components/ui/button-simple";
import Icon from "@/components/ui/icon";

interface NavigationProps {
  onLoginClick?: () => void;
}

const Navigation = ({ onLoginClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Главная", href: "/citizens" },
    { name: "Услуги", href: "/services" },
    { name: "Цены", href: "/pricing" },
    { name: "О нас", href: "/about" },
    { name: "Контакты", href: "/contacts" },
  ];

  // Городской телефон
  const cityPhone = "+7 (383) 235-95-05";
  const cityPhoneRaw = "+738322359505";

  // Проверяем, находимся ли на странице взыскания долгов
  const isDebtCollectionPage =
    location.pathname.includes("/debt-collection") ||
    location.pathname.includes("/vzyskanie") ||
    location.pathname.includes("/взыскание");

  // =========== СПЕЦИАЛЬНАЯ ВЕРСИЯ ДЛЯ СТРАНИЦЫ ВЗЫСКАНИЯ ===========
  if (isDebtCollectionPage) {
    return (
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gradient-to-r from-gray-900 to-blue-900/95 shadow-2xl backdrop-blur-md"
            : "bg-gradient-to-r from-gray-900/95 to-blue-900/90 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Логотип */}
            <Link to="/" className="flex items-center space-x-2">
              <Icon name="Scale" className="h-8 w-8 text-red-400" />
              <span className="text-xl font-bold text-white">ЮрСервис НСК</span>
            </Link>

            {/* Навигация для страницы взыскания */}
            <nav className="hidden md:flex items-center space-x-6">
              {/* Основные ссылки сайта */}
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-white/80 hover:text-cyan-300 font-medium transition-colors hover:scale-105"
                >
                  {item.name}
                </Link>
              ))}

              {/* Специальные ссылки для страницы взыскания */}
              <div className="ml-2 pl-2 border-l border-white/30 flex items-center space-x-4">
                <a
                  href="#action"
                  className="text-white hover:text-cyan-300 font-semibold transition-colors hover:scale-105"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById("action");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Начать взыскание
                </a>
                <a
                  href="#documents"
                  className="text-white hover:text-cyan-300 font-semibold transition-colors hover:scale-105"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById("documents");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Документы
                </a>

                {/* ГОРОДСКОЙ ТЕЛЕФОН */}
                <ButtonSimple
                  size="sm"
                  className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 shadow-lg hover:shadow-red-500/25 ml-2 text-white"
                  onClick={() => (window.location.href = `tel:${cityPhoneRaw}`)}
                >
                  <Icon name="Phone" className="h-4 w-4 mr-2" />
                  <span className="font-bold">{cityPhone}</span>
                </ButtonSimple>
              </div>
            </nav>

            {/* Мобильная версия */}
            <div className="md:hidden flex items-center gap-3">
              <ButtonSimple
                size="sm"
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white"
                onClick={() => (window.location.href = `tel:${cityPhoneRaw}`)}
              >
                <Icon name="Phone" className="h-4 w-4" />
              </ButtonSimple>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                <Icon
                  name={isMenuOpen ? "X" : "Menu"}
                  className="h-6 w-6 text-white"
                />
              </button>
            </div>
          </div>

          {/* Мобильное меню */}
          {isMenuOpen && (
            <div className="md:hidden pt-4 pb-6 border-t border-white/20">
              <nav className="flex flex-col space-y-4">
                {/* Основные ссылки сайта */}
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-white hover:text-cyan-300 font-medium py-2 px-4 bg-white/10 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Специальные ссылки для страницы взыскания */}
                <a
                  href="#action"
                  className="text-white hover:text-cyan-300 font-medium py-2 px-4 bg-white/10 rounded-lg"
                  onClick={() => {
                    setIsMenuOpen(false);
                    const element = document.getElementById("action");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Начать взыскание
                </a>
                <a
                  href="#documents"
                  className="text-white hover:text-cyan-300 font-medium py-2 px-4 bg-white/10 rounded-lg"
                  onClick={() => {
                    setIsMenuOpen(false);
                    const element = document.getElementById("documents");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Бесплатные документы
                </a>
                <a
                  href="#cases"
                  className="text-white hover:text-cyan-300 font-medium py-2 px-4 bg-white/10 rounded-lg"
                  onClick={() => {
                    setIsMenuOpen(false);
                    const element = document.getElementById("cases");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Реальные кейсы
                </a>

                <ButtonSimple
                  className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white mt-4"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.location.href = `tel:${cityPhoneRaw}`;
                  }}
                >
                  <Icon name="Phone" className="h-4 w-4 mr-2" />
                  {cityPhone}
                </ButtonSimple>
              </nav>
            </div>
          )}
        </div>
      </header>
    );
  }

  // =========== ОБЫЧНАЯ ВЕРСИЯ НАВИГАЦИИ ===========
  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className={`fixed top-0 w-full backdrop-blur-sm border-b border-border z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 shadow-lg" : "bg-background/70"
      }`}
      role="banner"
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Icon name="Scale" className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">
              ЮрСервис НСК
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-colors duration-200 font-medium ${
                  isActive(item.href)
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="MapPin" className="h-4 w-4 text-primary" />
              <span>г. Новосибирск, ул. Ленина, д. 3</span>
            </div>
            <ButtonSimple
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => (window.location.href = `tel:${cityPhoneRaw}`)}
            >
              <Icon name="Phone" className="h-4 w-4 mr-2" />
              {cityPhone}
            </ButtonSimple>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-2 py-1 transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-primary font-medium"
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <ButtonSimple
                className="w-full bg-primary hover:bg-primary/90 text-white"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.location.href = `tel:${cityPhoneRaw}`;
                }}
              >
                <Icon name="Phone" className="h-4 w-4 mr-2" />
                {cityPhone}
              </ButtonSimple>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
