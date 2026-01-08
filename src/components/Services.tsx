import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

// ПОЛНЫЙ МАССИВ ИЗ 8 УСЛУГ
const realCases = [
  {
    id: "debt",
    problem: "Должны деньги, но не отдают",
    professionalTitle: "Взыскание задолженности",
    solution: "Заставим вернуть через суд",
    result: "Получите свои деньги + проценты за просрочку",
    time: "2-4 месяца",
    link: "/debt-collection",
    icon: "CreditCard",
    color: "from-blue-500 to-cyan-500",
    stat: "Вернули 89% долгов",
    keywords: ["долг", "деньги", "вернуть", "задолжал", "заём"],
  },
  {
    id: "flood",
    problem: "Затопили соседи, ремонт за свой счёт",
    professionalTitle: "Возмещение ущерба от залива",
    solution: "Взыщем ущерб в полном объёме",
    result: "Деньги на новый ремонт + компенсация за неудобства",
    time: "2-4 месяца",
    link: "/flood-damage",
    icon: "Droplets",
    color: "from-cyan-500 to-blue-500",
    stat: "Вернули до 500 тыс. ₽",
    keywords: ["затопили", "потоп", "соседи", "ремонт", "ущерб"],
  },
  {
    id: "bankruptcy",
    problem: "Кредиты душат, коллекторы звонят",
    professionalTitle: "Банкротство физических лиц",
    solution: "Спишем долги через банкротство",
    result: "Избавитесь от долгов, сохраните жильё, остановите звонки",
    time: "5-9 месяцев",
    link: "/bankruptcy-lawyer",
    icon: "TrendingDown",
    color: "from-red-500 to-orange-500",
    stat: "Списали до 90% долгов",
    keywords: ["кредиты", "долги", "коллекторы", "банкротство"],
  },
  {
    id: "dtp",
    problem: "Попал в ДТП, страховая платит мало",
    professionalTitle: "Юридическое сопровождение при ДТП",
    solution: "Добьёмся полной выплаты",
    result: "Увеличим выплату в 2-3 раза, сохраним права",
    time: "1-3 месяца",
    link: "/dtp-lawyer",
    icon: "Car",
    color: "from-green-500 to-emerald-500",
    stat: "Увеличили выплаты в 87% случаев",
    keywords: ["дтп", "авария", "страховая", "авто", "машина"],
  },
  {
    id: "family",
    problem: "Развод, муж угрожает забрать всё",
    professionalTitle: "Семейно-правовое консультирование",
    solution: "Сохраним ваше имущество и права",
    result: "Справедливый раздел, определение детей, алименты",
    time: "3-6 месяцев",
    link: "/family-lawyer",
    icon: "Users",
    color: "from-pink-500 to-rose-500",
    stat: "Защитили имущество в 92% дел",
    keywords: ["развод", "имущество", "дети", "алименты", "брак"],
  },
  {
    id: "realestate",
    problem: "Купили квартиру, а застройщик обманул",
    professionalTitle: "Сопровождение сделок с недвижимостью",
    solution: "Вернём деньги или заставим исправить",
    result: "Полный возврат средств или устранение всех недостатков",
    time: "4-8 месяцев",
    link: "/disputes-with-developers",
    icon: "Building",
    color: "from-indigo-500 to-purple-500",
    stat: "Вернули до 2 млн ₽",
    keywords: ["застройщик", "квартира", "новостройка", "дду", "обман"],
  },
  {
    id: "labor",
    problem: "Не платят зарплату 3 месяца",
    professionalTitle: "Трудовое право и защита прав работников",
    solution: "Взыщем зарплату и компенсацию",
    result: "Все невыплаты + компенсация за задержку",
    time: "1-2 месяца",
    link: "/labor-law",
    icon: "Briefcase",
    color: "from-amber-500 to-yellow-500",
    stat: "Вернули 100% задолженности",
    keywords: ["зарплата", "не платят", "работодатель", "увольнение"],
  },
  {
    id: "consumer",
    problem: "Купил телефон, а он сломался",
    professionalTitle: "Защита прав потребителей",
    solution: "Вернём деньги или заменим товар",
    result: "Возврат полной стоимости или замена на новый",
    time: "1-2 месяца",
    link: "/consumer-protection",
    icon: "ShoppingCart",
    color: "from-purple-500 to-violet-500",
    stat: "Вернули деньги в 94% случаев",
    keywords: ["брак", "товар", "возврат", "магазин", "гарантия"],
  },
];

const Services = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{
    service: string | null;
    originalQuery: string;
  }>({ service: null, originalQuery: "" });

  // ПРОСТАЯ ВЕРСИЯ AI ПОИСКА (работает всегда)
  const analyzeWithAI = async (query: string) => {
    if (!query.trim()) return;

    setIsAnalyzing(true);
    setAiResult({ service: null, originalQuery: query });

    try {
      // Пробуем настоящий AI сервер
      const response = await fetch(
        "http://localhost:3001/api/analyze-problem",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        },
      );

      const data = await response.json();
      setAiResult({
        service: data.professionalService,
        originalQuery: query,
      });
    } catch (error) {
      // Если AI сервер не работает - используем простой поиск по ключевым словам
      console.log("AI сервер недоступен, используем простой поиск");

      const queryLower = query.toLowerCase();
      let foundService = "Консультация";

      // Простой поиск по ключевым словам
      for (const service of realCases) {
        if (
          service.problem.toLowerCase().includes(queryLower) ||
          service.keywords.some((keyword) => queryLower.includes(keyword)) ||
          service.professionalTitle.toLowerCase().includes(queryLower)
        ) {
          foundService = service.professionalTitle;
          break;
        }
      }

      setAiResult({
        service: foundService,
        originalQuery: query,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ФИЛЬТРАЦИЯ - ПРОСТАЯ И РАБОЧАЯ
  const filteredCases = useMemo(() => {
    let result = [...realCases];

    // Если AI нашел конкретную услугу - показываем только ее
    if (aiResult.service && aiResult.service !== "Консультация") {
      result = result.filter(
        (item) => item.professionalTitle === aiResult.service,
      );
      return result;
    }

    // Если есть текст поиска - фильтруем по нему
    if (searchQuery && !aiResult.service) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.problem.toLowerCase().includes(query) ||
          item.keywords.some((kw) => query.includes(kw.toLowerCase())) ||
          item.professionalTitle.toLowerCase().includes(query),
      );
    }

    return result;
  }, [aiResult.service, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      analyzeWithAI(searchQuery);
    }
  };

  const handleResetSearch = () => {
    setSearchQuery("");
    setActiveCategory(null);
    setAiResult({ service: null, originalQuery: "" });
  };

  return (
    <div className="space-y-16">
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Профессиональные юридические решения
        </h1>

        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Опишите вашу ситуацию — система подберёт нужную юридическую услугу
        </p>

        <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Примеры: 'соседи затопили', 'не выплачивают зарплату', 'попал в ДТП'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm"
              disabled={isAnalyzing}
            />
            <button
              type="submit"
              disabled={isAnalyzing || !searchQuery.trim()}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isAnalyzing ? (
                <>
                  <span className="inline-block animate-spin mr-2">⟳</span>
                  Поиск
                </>
              ) : (
                "Найти решение"
              )}
            </button>
          </div>

          {aiResult.service && (
            <div className="mt-4 text-sm text-gray-600">
              <span className="font-semibold">Результат:</span>{" "}
              {aiResult.service}
              <button
                onClick={handleResetSearch}
                className="ml-4 text-primary hover:text-primary/80 text-xs font-medium"
              >
                [ показать все ]
              </button>
            </div>
          )}
        </form>
      </div>

      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {aiResult.service === "Консультация"
                ? "Требуется консультация"
                : aiResult.service || "Юридические услуги"}
            </h2>
            <p className="text-gray-600">
              {aiResult.service
                ? aiResult.service === "Консультация"
                  ? "Опишите подробнее вашу ситуацию"
                  : "Подобранное решение"
                : "Полный спектр юридических услуг"}
            </p>
          </div>

          {filteredCases.length > 0 && (
            <div className="text-sm text-gray-500">
              Найдено: {filteredCases.length}
            </div>
          )}
        </div>

        {isAnalyzing ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin text-4xl mb-4">⟳</div>
            <h3 className="text-xl font-semibold text-gray-700">
              Ищем решение
            </h3>
          </div>
        ) : filteredCases.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
            <div className="text-6xl mb-6">📋</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Уточните запрос
            </h3>
            <Button
              size="lg"
              onClick={() => window.open("tel:+73832359505", "_self")}
              className="mt-4"
            >
              <Icon name="Phone" className="h-6 w-6 mr-3" />
              Позвонить юристу
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(caseItem.link)}
              >
                <div className={`h-2 bg-gradient-to-r ${caseItem.color}`} />

                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${caseItem.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon
                        name={caseItem.icon}
                        className="h-6 w-6 text-white"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {caseItem.professionalTitle}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full">
                          {caseItem.solution}
                        </span>
                        <span className="text-xs text-gray-500">
                          {caseItem.stat}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Icon
                        name="CheckCircle"
                        className="h-4 w-4 text-green-500"
                      />
                      <span className="font-medium">Результат:</span>
                    </div>
                    <p className="text-gray-700 pl-6">{caseItem.result}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Icon name="Clock" className="h-4 w-4" />
                        <span>{caseItem.time}</span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        Без предоплаты
                      </span>
                    </div>
                    <div className="flex items-center text-primary font-semibold text-sm group-hover:text-primary/80">
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
    </div>
  );
};

export default Services;
