import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Категории проблем - оптимальное количество
  const problemCategories = [
    {
      id: "money",
      title: "💸 Деньги и долги",
      icon: "CreditCard",
      color: "bg-gradient-to-br from-red-50 to-orange-50",
      border: "border-red-100",
    },
    {
      id: "housing",
      title: "🏠 Недвижимость",
      icon: "Home",
      color: "bg-gradient-to-br from-blue-50 to-cyan-50",
      border: "border-blue-100",
    },
    {
      id: "family",
      title: "👨‍👩‍👦 Семейные дела",
      icon: "Users",
      color: "bg-gradient-to-br from-pink-50 to-rose-50",
      border: "border-pink-100",
    },
    {
      id: "auto",
      title: "🚗 Автомобиль",
      icon: "Car",
      color: "bg-gradient-to-br from-green-50 to-emerald-50",
      border: "border-green-100",
    },
    {
      id: "work",
      title: "💼 Работа",
      icon: "Briefcase",
      color: "bg-gradient-to-br from-yellow-50 to-amber-50",
      border: "border-yellow-100",
    },
  ];

  // Реальные ситуации - оптимизировано, убраны дубли
  const realCases = [
    {
      problem: "Должны деньги, но не отдают",
      solution: "Взыскание через суд",
      result: "Получите деньги + проценты за просрочку",
      time: "2-4 месяца",
      link: "/debt-collection",
      icon: "CreditCard",
      color: "from-blue-500 to-cyan-500",
    },
    {
      problem: "Затопили соседи",
      solution: "Взыскание ущерба",
      result: "Деньги на ремонт + компенсация",
      time: "2-4 месяца",
      link: "/flood-damage",
      icon: "Droplets",
      color: "from-cyan-500 to-blue-500",
    },
    {
      problem: "Кредиты, коллекторы",
      solution: "Банкротство",
      result: "Списываем долги, останавливаем звонки",
      time: "5-9 месяцев",
      link: "/bankruptcy",
      icon: "TrendingDown",
      color: "from-red-500 to-orange-500",
    },
    {
      problem: "Попал в ДТП, страховая платит мало",
      solution: "Споры со страховой",
      result: "Увеличиваем выплату в 2-3 раза",
      time: "1-3 месяца",
      link: "/dtp-lawyer",
      icon: "Car",
      color: "from-green-500 to-emerald-500",
    },
    {
      problem: "Развод и раздел имущества",
      solution: "Семейный юрист",
      result: "Справедливый раздел, определение детей",
      time: "3-6 месяцев",
      link: "/family-lawyer",
      icon: "Users",
      color: "from-pink-500 to-rose-500",
    },
    {
      problem: "Застройщик обманул с квартирой",
      solution: "Споры с застройщиком",
      result: "Возврат денег или устранение недостатков",
      time: "4-8 месяцев",
      link: "/developer-disputes",
      icon: "Building",
      color: "from-indigo-500 to-purple-500",
    },
    {
      problem: "Не платят зарплату",
      solution: "Трудовые споры",
      result: "Все невыплаты + компенсация",
      time: "1-2 месяца",
      link: "/labor-law",
      icon: "Briefcase",
      color: "from-amber-500 to-yellow-500",
    },
    {
      problem: "Бракованный товар",
      solution: "Защита прав потребителей",
      result: "Возврат денег или замена товара",
      time: "1-2 месяца",
      link: "/consumer-protection",
      icon: "ShoppingCart",
      color: "from-purple-500 to-violet-500",
    },
  ];

  // Оптимизированный поиск
  const filteredCases = useMemo(() => {
    if (!searchQuery && !activeCategory) return realCases;

    const query = searchQuery.toLowerCase().trim();

    return realCases.filter((case_) => {
      if (activeCategory) {
        const categoryKeywords =
          {
            money: ["деньги", "долги", "кредиты", "коллекторы"],
            housing: ["затопили", "квартира", "застройщик", "ремонт"],
            family: ["развод", "муж", "жена", "дети", "алименты"],
            auto: ["дтп", "авария", "страховая", "авто", "машина"],
            work: ["зарплата", "работодатель", "увольнение"],
          }[activeCategory] || [];

        if (
          !categoryKeywords.some(
            (keyword) =>
              case_.problem.toLowerCase().includes(keyword) ||
              case_.solution.toLowerCase().includes(keyword),
          )
        )
          return false;
      }

      if (!query) return true;

      const searchIn =
        case_.problem.toLowerCase() +
        " " +
        case_.solution.toLowerCase() +
        " " +
        case_.result.toLowerCase();

      return searchIn.includes(query);
    });
  }, [searchQuery, activeCategory]);

  // Популярные запросы
  const popularSearches = ["долги", "дтп", "развод", "зарплата", "застройщик"];

  return (
    <div className="space-y-12">
      {/* Блок 1: Поиск и категории */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Юридические услуги
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Профессиональная помощь в решении правовых вопросов
        </p>

        {/* Поле поиска */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Опишите вашу ситуацию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-base border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
            <Icon
              name="Search"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            />
          </div>

          {/* Быстрые запросы */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {popularSearches.map((search, i) => (
              <button
                key={i}
                onClick={() => setSearchQuery(search)}
                className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Категории */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Категории услуг
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {problemCategories.map((category) => (
              <button
                key={category.id}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === category.id ? null : category.id,
                  )
                }
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  activeCategory === category.id
                    ? `${category.color} ${category.border} border shadow-md`
                    : `bg-white border border-gray-200 hover:shadow-sm`
                }`}
              >
                <span className="text-base font-medium">{category.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Блок 2: Результаты */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Наши услуги</h2>
          {filteredCases.length > 0 && (
            <div className="text-sm text-gray-500">
              {filteredCases.length} услуг
              {filteredCases.length === 1 ? "а" : ""}
            </div>
          )}
        </div>

        {filteredCases.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Не нашли подходящую услугу?
            </h3>
            <p className="text-gray-600 mb-6">
              Свяжитесь с нами для консультации
            </p>
            <Button
              onClick={() => window.open("tel:+73832359505", "_self")}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Icon name="Phone" className="h-5 w-5 mr-2" />
              Консультация
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredCases.map((case_, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => navigate(case_.link)}
              >
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${case_.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon name={case_.icon} className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 leading-tight mb-1">
                        {case_.problem}
                      </h3>
                      <div className="text-sm text-primary font-medium">
                        {case_.solution}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 text-sm">{case_.result}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      Срок: {case_.time}
                    </div>
                    <div className="flex items-center text-primary text-sm font-medium">
                      <span>Подробнее</span>
                      <Icon
                        name="ArrowRight"
                        className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Блок 3: CTA - упрощенный */}
      <div className="bg-gray-900 rounded-2xl p-8 text-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Нужна помощь с выбором услуги?
          </h2>
          <p className="text-gray-300 mb-6">
            Получите бесплатную консультацию юриста
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => window.open("tel:+73832359505", "_self")}
              className="bg-white text-gray-900 hover:bg-gray-100 font-semibold"
            >
              <Icon name="Phone" className="h-5 w-5 mr-2" />
              Позвонить
            </Button>

            <div className="text-left">
              <div className="text-xl font-bold tracking-tight">
                +7 (383) 235-95-05
              </div>
              <div className="text-gray-400 text-sm mt-1">
                Новосибирск • Ежедневно 9:00-21:00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
