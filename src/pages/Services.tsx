// src/components/Services.tsx
import React, { useState, useMemo } from "react";
import { servicesData } from "@/data/servicesData";

interface ServicesProps {
  onServiceClick?: (serviceId: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onServiceClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");

  // Получаем уникальные категории
  const categories = useMemo(() => {
    const cats = servicesData.map((service) => service.category);
    return ["Все", ...Array.from(new Set(cats))];
  }, []);

  // Фильтрация услуг
  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      // Фильтр по категории
      const categoryMatch =
        selectedCategory === "Все" || service.category === selectedCategory;

      // Фильтр по поиску
      const searchMatch =
        searchQuery === "" ||
        service.professionalTitle
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        service.humanQuery.some((query) =>
          query.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        service.searchKeywords.some((keyword) =>
          keyword.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        service.simpleDescription
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [searchQuery, selectedCategory]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Функция для обработки клика по карточке
  const handleServiceClick = (serviceId: string) => {
    if (onServiceClick) {
      onServiceClick(serviceId);
    }
    // Здесь можно добавить логику для перехода на детальную страницу услуги
    // или открытия модального окна
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Поисковая строка */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Опишите вашу проблему, например: 'списали деньги с карты' или 'не платят зарплату'"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-6 py-4 text-lg border-2 border-blue-100 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2 ml-2">
          Ищете профессиональную помощь? Опишите ситуацию простыми словами — мы
          подберем решение
        </p>
      </div>

      {/* Фильтр по категориям */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Результаты поиска */}
      {searchQuery && (
        <div className="mb-6">
          <p className="text-lg text-gray-700">
            Найдено {filteredServices.length}{" "}
            {filteredServices.length === 1
              ? "решение"
              : filteredServices.length > 1 && filteredServices.length < 5
                ? "решения"
                : "решений"}
            по запросу: <span className="font-semibold">"{searchQuery}"</span>
          </p>
        </div>
      )}

      {/* Карточки услуг */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Не нашли свою проблему?
          </h3>
          <p className="text-gray-600 mb-6">
            Не беспокойтесь! Опишите вашу ситуацию нашему юристу — мы найдем
            решение
          </p>
          <button
            onClick={() => (window.location.href = "/consultation")}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            Получить консультацию
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-100"
            >
              {/* Заголовок с иконкой */}
              <div className="flex items-start mb-5">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <div className="ml-4">
                  {/* Профессиональное название */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {service.professionalTitle}
                  </h3>
                  <span className="inline-block mt-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Простое описание для пользователя */}
              <p className="text-gray-700 mb-5 leading-relaxed">
                {service.simpleDescription}
              </p>

              {/* Блок "Как люди описывают эту проблему" */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-3">
                  Чаще всего люди ищут это так:
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.humanQuery.slice(0, 3).map((query, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm rounded-lg border border-gray-200"
                    >
                      "{query}"
                    </span>
                  ))}
                </div>
              </div>

              {/* Кнопка */}
              <div className="mt-6">
                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5">
                  Решить проблему
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Информационный блок */}
      <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Не нашли подходящую услугу?
            </h3>
            <p className="text-gray-700 mb-4">
              Каждая ситуация уникальна. Опишите свою проблему нашему юристу, и
              мы подберем индивидуальное решение с учетом всех нюансов вашего
              дела.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => (window.location.href = "/consultation")}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Бесплатная консультация
              </button>
              <button
                onClick={() => (window.location.href = "/contacts")}
                className="px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-colors font-medium border border-blue-200"
              >
                Позвонить сейчас
              </button>
            </div>
          </div>
          <div className="md:w-1/3 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md">
              <svg
                className="w-10 h-10 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <p className="mt-4 text-lg font-semibold text-gray-900">
              +7 (383) 235-95-05
            </p>
            <p className="text-sm text-gray-600">Звонок бесплатный</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
