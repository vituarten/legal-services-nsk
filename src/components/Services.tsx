import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Services = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Самые частые проблемы с иконками
  const commonProblems = [
    {
      text: "🚗 ДТП и авто",
      problems: [
        "Страховая мало платит",
        "Лишают прав",
        "Штраф ГИБДД",
        "Спор о вине в ДТП",
      ],
      link: "/dtp-lawyer",
      color: "border-blue-200 hover:border-blue-300 bg-blue-50",
    },
    {
      text: "💸 Деньги и долги",
      problems: [
        "Должник не отдаёт",
        "Кредиты/коллекторы",
        "Банкротство",
        "Навязали страховку",
      ],
      link: "/debt-collection",
      color: "border-red-200 hover:border-red-300 bg-red-50",
    },
    {
      text: "🏠 Жильё и квартиры",
      problems: [
        "Затопили соседи",
        "Застройщик обманул",
        "Споры с УК",
        "Перепланировка",
      ],
      link: "/real-estate-lawyer",
      color: "border-green-200 hover:border-green-300 bg-green-50",
    },
    {
      text: "👨‍👩‍👦 Семья и дети",
      problems: [
        "Развод и имущество",
        "Алименты",
        "Споры о детях",
        "Наследство",
      ],
      link: "/family-lawyer",
      color: "border-pink-200 hover:border-pink-300 bg-pink-50",
    },
    {
      text: "💼 Работа",
      problems: [
        "Не платят зарплату",
        "Уволили незаконно",
        "Травма на производстве",
        "Дискриминация",
      ],
      link: "/labor-law",
      color: "border-yellow-200 hover:border-yellow-300 bg-yellow-50",
    },
    {
      text: "🛒 Покупки и услуги",
      problems: [
        "Бракованный товар",
        "Обманули в магазине",
        "Некачественная услуга",
        "Туроператор сорвал отпуск",
      ],
      link: "/consumer-protection",
      color: "border-purple-200 hover:border-purple-300 bg-purple-50",
    },
  ];

  // Все конкретные ситуации для поиска
  const allProblems = [
    { text: "Страховая мало платит за ДТП", link: "/dtp-lawyer" },
    { text: "Лишают прав за алкоголь", link: "/dtp-lawyer" },
    { text: "Штраф ГИБДД незаконный", link: "/dtp-lawyer" },
    { text: "Должник не отдаёт деньги", link: "/debt-collection" },
    { text: "Коллекторы звонят", link: "/bankruptcy-lawyer" },
    { text: "Не могу платить кредиты", link: "/bankruptcy-lawyer" },
    { text: "Затопили соседи сверху", link: "/flood-damage" },
    {
      text: "Застройщик сдал квартиру с дефектами",
      link: "/disputes-with-developers",
    },
    { text: "Развод с разделом имущества", link: "/family-lawyer" },
    { text: "Не платят алименты", link: "/family-lawyer" },
    { text: "Не платят зарплату 3 месяца", link: "/labor-law" },
    { text: "Уволили без выплат", link: "/labor-law" },
    { text: "Купил бракованный телефон", link: "/consumer-protection" },
    { text: "Навязали услугу в банке", link: "/consumer-protection" },
    { text: "Нужен юрист в суд", link: "/court-representation" },
    { text: "Спор о наследстве", link: "/family-lawyer" },
  ];

  // Фильтрация для поиска
  const searchResults = searchQuery
    ? allProblems
        .filter((p) => p.text.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 6)
    : [];

  return (
    <div className="space-y-12">
      {/* ШАГ 1: Главный вопрос */}
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Какую проблему нужно решить?
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Найдите свою ситуацию или выберите категорию
        </p>

        {/* Поиск с умными подсказками */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Начните вводить проблему..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
            />
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
              <Icon name="Search" className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Результаты поиска */}
          {searchResults.length > 0 && (
            <div className="mt-4 bg-white border border-gray-200 rounded-xl shadow-lg p-4 animate-in fade-in">
              <div className="text-sm text-gray-500 mb-2">Нашли в базе:</div>
              <div className="space-y-2">
                {searchResults.map((problem, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      navigate(problem.link);
                      setSearchQuery("");
                    }}
                    className="block w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="font-medium text-gray-900">
                      {problem.text}
                    </div>
                    <div className="text-sm text-primary mt-1 flex items-center">
                      Смотреть решение
                      <Icon name="ArrowRight" className="h-3 w-3 ml-1" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchQuery && searchResults.length === 0 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-center">
              <p className="text-gray-700 mb-3">
                Такой ситуации нет в базе, но мы всё равно поможем
              </p>
              <Button
                onClick={() => window.open("tel:+73832359505", "_self")}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
              >
                <Icon name="Phone" className="h-4 w-4 mr-2" />
                Расскажите о проблеме по телефону
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* ШАГ 2: Категории проблем */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-8">
          Или выберите категорию проблемы
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commonProblems.map((category, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${category.color}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{category.text.split(" ")[0]}</div>
                <h3 className="text-xl font-bold text-gray-900">
                  {category.text.split(" ").slice(1).join(" ")}
                </h3>
              </div>

              <div className="space-y-2 mb-6">
                {category.problems.map((problem, pIdx) => (
                  <div key={pIdx} className="text-gray-700 text-sm pl-2">
                    • {problem}
                  </div>
                ))}
              </div>

              <Button
                onClick={() => navigate(category.link)}
                variant="outline"
                className="w-full border-gray-300 hover:border-primary hover:bg-primary/5"
              >
                Смотреть решения по этой категории
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* ШАГ 3: Как мы работаем (без дублирования) */}
      <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Как мы решаем проблемы
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "MessageCircle",
                title: "Консультация и анализ",
                items: [
                  "Бесплатная консультация 15 мин",
                  "Анализ ваших документов",
                  "Оценка перспектив дела",
                  "Честный ответ: сможем ли помочь",
                ],
              },
              {
                icon: "FileText",
                title: "Подготовка и стратегия",
                items: [
                  "Разрабатываем план действий",
                  "Готовим все документы",
                  "Составляем претензии, иски",
                  "Рассчитываем точную стоимость",
                ],
              },
              {
                icon: "Scale",
                title: "Решение и результат",
                items: [
                  "Ведём переговоры за вас",
                  "Представляем интересы в суде",
                  "Контролируем исполнение",
                  "Добиваемся результата",
                ],
              },
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name={step.icon} className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <ul className="space-y-2">
                  {step.items.map((item, iIdx) => (
                    <li
                      key={iIdx}
                      className="flex items-start gap-2 text-gray-600"
                    >
                      <Icon
                        name="Check"
                        className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ЕДИНСТВЕННЫЙ CTA - без дублирования */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-blue-50 rounded-2xl p-10 border border-primary/20">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Icon name="Clock" className="h-4 w-4" />
              Первые 15 минут консультации — бесплатно
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Расскажите о проблеме
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Юрист выслушает, проанализирует и скажет точную стоимость решения
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                onClick={() => window.open("tel:+73832359505", "_self")}
                className="bg-primary hover:bg-primary/90 text-white font-bold px-10 py-6 text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <Icon name="Phone" className="h-6 w-6 mr-3" />
                Позвонить и рассказать о проблеме
              </Button>

              <div className="text-left">
                <div className="text-2xl font-black text-gray-900">
                  +7 (383) 235-95-05
                </div>
                <div className="text-gray-600 text-sm">
                  Новосибирск • с 8:00 до 22:00
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-gray-200">
              {[
                { text: "Анализ документов перед работой" },
                { text: "Оплата за результат в некоторых случаях" },
                { text: "Конфиденциальность гарантирована" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <Icon
                    name="CheckCircle"
                    className="h-5 w-5 text-green-500 flex-shrink-0"
                  />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
