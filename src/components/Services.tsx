import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Services = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Категории проблем (только 6 основных)
  const categories = [
    {
      id: "auto",
      title: "🚗 Авто и ДТП",
      icon: "Car",
      problems: [
        { text: "Страховая мало платит за ДТП", link: "/dtp-lawyer" },
        { text: "Лишают водительских прав", link: "/dtp-lawyer" },
        { text: "Штраф ГИБДД незаконный", link: "/dtp-lawyer" },
        { text: "СТО сделала плохой ремонт", link: "/consumer-protection" },
      ],
    },
    {
      id: "money",
      title: "💸 Деньги и долги",
      icon: "CreditCard",
      problems: [
        { text: "Должник не отдаёт деньги", link: "/debt-collection" },
        { text: "Коллекторы звонят", link: "/bankruptcy-lawyer" },
        { text: "Не могу платить кредиты", link: "/bankruptcy-lawyer" },
        { text: "Навязали страховку в банке", link: "/consumer-protection" },
      ],
    },
    {
      id: "housing",
      title: "🏠 Жильё и квартиры",
      icon: "Home",
      problems: [
        { text: "Затопили соседи сверху", link: "/flood-damage" },
        { text: "Застройщик обманул", link: "/disputes-with-developers" },
        { text: "Споры с управляющей компанией", link: "/housing-disputes" },
        { text: "Нужно узаконить перепланировку", link: "/real-estate-lawyer" },
      ],
    },
    {
      id: "family",
      title: "👨‍👩‍👧‍👦 Семья и дети",
      icon: "Users",
      problems: [
        { text: "Развод с разделом имущества", link: "/family-lawyer" },
        { text: "Споры об алиментах", link: "/family-lawyer" },
        { text: "Конфликт из-за наследства", link: "/family-lawyer" },
        { text: "Определение места жительства детей", link: "/family-lawyer" },
      ],
    },
    {
      id: "work",
      title: "💼 Работа",
      icon: "Briefcase",
      problems: [
        { text: "Не платят зарплату", link: "/labor-law" },
        { text: "Уволили незаконно", link: "/labor-law" },
        { text: "Травма на производстве", link: "/labor-law" },
        { text: "Дискриминация на работе", link: "/labor-law" },
      ],
    },
    {
      id: "consumer",
      title: "🛒 Покупки и услуги",
      icon: "ShoppingCart",
      problems: [
        { text: "Купил бракованный товар", link: "/consumer-protection" },
        { text: "Обманули в интернет-магазине", link: "/consumer-protection" },
        { text: "Туроператор сорвал отпуск", link: "/consumer-protection" },
        { text: "Некачественные услуги", link: "/consumer-protection" },
      ],
    },
  ];

  // Все проблемы для поиска (сплющенный список)
  const allProblems = useMemo(() => {
    return categories.flatMap((cat) => cat.problems);
  }, []);

  // Результаты поиска
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return allProblems
      .filter((problem) => problem.text.toLowerCase().includes(query))
      .slice(0, 6);
  }, [searchQuery, allProblems]);

  // Популярные запросы
  const popularQueries = [
    "ДТП",
    "долги",
    "развод",
    "затопили",
    "зарплата",
    "штраф ГИБДД",
  ];

  return (
    <div className="space-y-16">
      {/* === БЛОК 1: ПОНИМАНИЕ ПРОБЛЕМЫ === */}
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Найдите решение своей проблемы
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Опишите ситуацию или выберите категорию. Мы покажем, как решаем именно
          ваш случай.
        </p>

        {/* Поиск */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Например: 'затопили квартиру', 'не платят зарплату', 'штраф ГИБДД'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
            <Icon
              name="Search"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            />
          </div>

          {/* Популярные запросы */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {popularQueries.map((query, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(query)}
                className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                {query}
              </button>
            ))}
          </div>

          {/* Результаты поиска */}
          {searchResults.length > 0 && (
            <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-lg p-4">
              <div className="text-sm text-gray-500 mb-3">Найдено:</div>
              <div className="space-y-3">
                {searchResults.map((result, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      navigate(result.link);
                      setSearchQuery("");
                    }}
                    className="block w-full text-left p-4 hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors group"
                  >
                    <div className="font-medium text-gray-900 mb-1">
                      {result.text}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Перейти к решению
                      </span>
                      <Icon
                        name="ArrowRight"
                        className="h-4 w-4 text-gray-400 group-hover:text-primary transform group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Если нет результатов поиска */}
          {searchQuery.trim() && searchResults.length === 0 && (
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4">
                Не нашли свою ситуацию? Выберите категорию или позвоните нам
              </p>
            </div>
          )}
        </div>
      </div>

      {/* === БЛОК 2: КАТЕГОРИИ ПРОБЛЕМ === */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-8">
          Выберите категорию своей проблемы
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="text-2xl">{category.title.split(" ")[0]}</div>
                <h3 className="text-lg font-bold text-gray-900">
                  {category.title.split(" ").slice(1).join(" ")}
                </h3>
              </div>

              <div className="space-y-3 mb-6">
                {category.problems.map((problem, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(problem.link)}
                    className="block w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="font-medium text-gray-800 group-hover:text-primary">
                      {problem.text}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center">
                      Смотреть решение
                      <Icon
                        name="ArrowRight"
                        className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </button>
                ))}
              </div>

              <Button
                onClick={() => navigate(category.problems[0].link)}
                variant="outline"
                className="w-full"
              >
                <span>Все решения по категории</span>
                <Icon name="ArrowRight" className="h-4 w-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* === БЛОК 3: ПРИМЕРЫ РЕШЕНИЙ === */}
      <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">
            Как мы решаем проблемы
          </h2>
          <p className="text-gray-600 text-center mb-10">
            Реальные примеры из нашей практики
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                problem: "Клиенту затопили квартиру",
                solution: "Взыскали 450 000 ₽ за ремонт",
                steps: [
                  "Экспертиза ущерба",
                  "Досудебная претензия",
                  "Судебный процесс",
                  "Исполнительное производство",
                ],
                time: "3 месяца",
              },
              {
                problem: "Страховая занизила выплату по ДТП",
                solution: "Увеличили выплату с 80 000 до 210 000 ₽",
                steps: [
                  "Анализ экспертизы",
                  "Независимая оценка",
                  "Переговоры со страховой",
                  "Суд при необходимости",
                ],
                time: "2 месяца",
              },
              {
                problem: "Не платили зарплату 4 месяца",
                solution: "Взыскали 320 000 ₽ + компенсацию",
                steps: [
                  "Сбор документов",
                  "Трудовая инспекция",
                  "Подача иска в суд",
                  "Получение решения",
                ],
                time: "1.5 месяца",
              },
              {
                problem: "Развод с разделом ипотечной квартиры",
                solution: "Справедливый раздел, сохранение доли",
                steps: [
                  "Анализ документов",
                  "Оценка имущества",
                  "Соглашение/судебный раздел",
                  "Регистрация прав",
                ],
                time: "4 месяца",
              },
            ].map((example, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {example.problem}
                    </h3>
                    <div className="text-green-600 font-semibold">
                      {example.solution}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                    {example.time}
                  </div>
                </div>

                <div className="space-y-2">
                  {example.steps.map((step, stepIdx) => (
                    <div
                      key={stepIdx}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium">
                          {stepIdx + 1}
                        </span>
                      </div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === БЛОК 4: ПРОЦЕСС РАБОТЫ === */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-8">Как мы работаем</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              step: "1",
              title: "Консультация и анализ",
              description:
                "Бесплатно анализируем вашу ситуацию, изучаем документы, оцениваем перспективы",
            },
            {
              step: "2",
              title: "Стратегия и документы",
              description:
                "Разрабатываем план действий, готовим все необходимые документы и претензии",
            },
            {
              step: "3",
              title: "Решение и результат",
              description:
                "Ведём переговоры, представляем в суде, контролируем исполнение решения",
            },
          ].map((item) => (
            <div key={item.step} className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg">
                {item.step}
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* === БЛОК 5: ЕДИНСТВЕННЫЙ ПРИЗЫВ К ДЕЙСТВИЮ === */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-primary/5 to-blue-50 rounded-2xl p-8 md:p-10 border border-primary/20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Icon name="Clock" className="h-4 w-4" />
            Первая консультация 15 минут — бесплатно
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Расскажите о своей ситуации
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Юрист проанализирует вашу проблему и назовёт точную стоимость
            решения
          </p>

          <Button
            size="lg"
            onClick={() => window.open("tel:+73832359505", "_self")}
            className="bg-primary hover:bg-primary/90 text-white font-bold px-10 py-6 text-lg mb-6"
          >
            <Icon name="Phone" className="h-6 w-6 mr-3" />
            Позвонить и получить консультацию
          </Button>

          <div>
            <div className="text-2xl font-black text-gray-900">
              +7 (383) 235-95-05
            </div>
            <div className="text-gray-600 text-sm mt-1">
              Новосибирск • Работаем с 8:00 до 22:00
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
            {[
              { text: "Анализ документов перед работой" },
              { text: "Фиксированная или процентная оплата" },
              { text: "Полная конфиденциальность" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-gray-600 text-sm"
              >
                <Icon
                  name="Check"
                  className="h-4 w-4 text-green-500 flex-shrink-0"
                />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
