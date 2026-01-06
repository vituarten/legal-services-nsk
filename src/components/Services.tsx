import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Категории проблем с учетом пересечений
  const problemCategories = [
    {
      id: "money",
      title: "💸 Деньги",
      icon: "CreditCard",
      color: "bg-gradient-to-br from-red-50 to-orange-50",
      border: "border-red-100",
    },
    {
      id: "housing",
      title: "🏠 Жильё",
      icon: "Home",
      color: "bg-gradient-to-br from-blue-50 to-cyan-50",
      border: "border-blue-100",
    },
    {
      id: "family",
      title: "👨‍👩‍👧‍👦 Семья",
      icon: "Users",
      color: "bg-gradient-to-br from-pink-50 to-rose-50",
      border: "border-pink-100",
    },
    {
      id: "auto",
      title: "🚗 Авто",
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
    {
      id: "consumer",
      title: "🛒 Покупки",
      icon: "ShoppingCart",
      color: "bg-gradient-to-br from-purple-50 to-violet-50",
      border: "border-purple-100",
    },
    {
      id: "court",
      title: "⚖️ Суд",
      icon: "Scale",
      color: "bg-gradient-to-br from-gray-50 to-slate-50",
      border: "border-gray-100",
    },
  ];

  // Реальные ситуации с учетом всех подразделов
  const realCases = [
    // ===== ДЕНЬГИ =====
    {
      problem: "Должны деньги, но не отдают",
      keywords: [
        "должны денег",
        "не отдают деньги",
        "задолжал",
        "должник",
        "вернуть деньги",
        "задолженность",
        "одолжил",
        "заём",
      ],
      solution: "Заставим вернуть через суд",
      result: "Получите свои деньги + проценты за просрочку",
      time: "2-4 месяца",
      link: "/debt-collection",
      icon: "CreditCard",
      color: "from-blue-500 to-cyan-500",
      stat: "Вернули 89% долгов",
      categories: ["money", "court"],
    },
    {
      problem: "Кредиты душат, коллекторы звонят",
      keywords: [
        "кредиты",
        "долги",
        "коллекторы",
        "банкротство",
        "не могу платить",
        "просрочка",
        "займы",
        "микрофинансы",
      ],
      solution: "Спишем долги через банкротство",
      result: "Избавитесь от долгов, сохраните жильё, остановите звонки",
      time: "5-9 месяцев",
      link: "/bankruptcy-lawyer",
      icon: "TrendingDown",
      color: "from-red-500 to-orange-500",
      stat: "Списали до 90% долгов",
      categories: ["money", "court"],
    },
    {
      problem: "Навязали страховку в банке",
      keywords: [
        "страховка",
        "навязали",
        "банк",
        "кредит",
        "страхование",
        "возврат страховки",
        "навязанная услуга",
      ],
      solution: "Вернём деньги за навязанную страховку",
      result: "Возврат средств + штраф 50% в вашу пользу",
      time: "1-2 месяца",
      link: "/consumer-protection",
      icon: "Shield",
      color: "from-purple-600 to-indigo-500",
      stat: "Вернули до 100 тыс. ₽",
      categories: ["money", "consumer", "court"],
    },

    // ===== АВТО =====
    {
      problem: "Попал(а) в ДТП, страховая платит мало",
      keywords: [
        "дтп",
        "авария",
        "страховая",
        "осаго",
        "ущерб",
        "авто",
        "машина",
        "авария",
        "страховая выплата",
      ],
      solution: "Добьёмся полной выплаты по ОСАГО",
      result: "Увеличим выплату в 2-3 раза, сохраним права",
      time: "1-3 месяца",
      link: "/dtp-lawyer",
      icon: "Car",
      color: "from-green-500 to-emerald-500",
      stat: "Увеличили выплаты в 87% случаев",
      categories: ["auto", "court"],
    },
    {
      problem: "Спор о виновнике ДТП",
      keywords: [
        "виновник дтп",
        "невиновность",
        "доказать невиновность",
        "установление вины",
        "спор о вине",
      ],
      solution: "Докажем вашу невиновность",
      result: "Установим настоящего виновника, снимим с вас обвинения",
      time: "2-4 месяца",
      link: "/dtp-lawyer",
      icon: "Scale",
      color: "from-gray-500 to-gray-700",
      stat: "Доказали невиновность в 76% споров",
      categories: ["auto", "court"],
    },
    {
      problem: "Лишают прав за алкоголь",
      keywords: [
        "лишение прав",
        "алкоголь",
        "лишают прав",
        "водительские права",
        "обжалование",
        "протокол",
        "гибдд",
      ],
      solution: "Обжалуем протокол и защитим в суде",
      result: "Сохраним водительские права или смягчим наказание",
      time: "2-3 месяца",
      link: "/dtp-lawyer",
      icon: "AlertCircle",
      color: "from-red-600 to-rose-500",
      stat: "Сохранили права в 68% случаев",
      categories: ["auto", "court"],
    },
    {
      problem: "Незаконный штраф ГИБДД",
      keywords: [
        "штраф гибдд",
        "незаконный штраф",
        "обжалование штрафа",
        "постановление",
        "дпс",
      ],
      solution: "Оспорим необоснованные штрафы",
      result: "Отмена штрафа или его существенное снижение",
      time: "1-2 месяца",
      link: "/dtp-lawyer",
      icon: "FileWarning",
      color: "from-amber-500 to-yellow-500",
      stat: "Отменили 82% оспоренных штрафов",
      categories: ["auto", "court"],
    },
    {
      problem: "СТО сделала плохой ремонт",
      keywords: [
        "сто",
        "автосервис",
        "некачественный ремонт",
        "ремонт авто",
        "брак",
        "автомастерская",
        "недоделки",
      ],
      solution: "Взыщем убытки за некачественный ремонт",
      result: "Возврат денег или бесплатное исправление всех недостатков",
      time: "2-3 месяца",
      link: "/dtp-lawyer",
      icon: "Wrench",
      color: "from-blue-600 to-cyan-500",
      stat: "Вернули деньги в 91% случаев",
      categories: ["auto", "consumer", "court"],
    },
    {
      problem: "Купил бракованный автомобиль",
      keywords: [
        "бракованный авто",
        "некачественный автомобиль",
        "покупка авто",
        "дефекты машины",
        "авто с пробегом",
        "новый авто",
      ],
      solution: "Вернём деньги или заменим автомобиль",
      result: "Возврат полной стоимости или замена на исправный автомобиль",
      time: "3-6 месяцев",
      link: "/consumer-protection",
      icon: "Car",
      color: "from-indigo-500 to-purple-500",
      stat: "Вернули до 1,5 млн ₽",
      categories: ["auto", "consumer", "court"],
    },

    // ===== ЖИЛЬЁ =====
    {
      problem: "Затопили соседи сверху",
      keywords: [
        "затопили",
        "потоп",
        "соседи залили",
        "ремонт",
        "ущерб",
        "затопило квартиру",
        "вода",
      ],
      solution: "Взыщем ущерб в полном объёме",
      result: "Деньги на новый ремонт + компенсация за неудобства",
      time: "2-4 месяца",
      link: "/flood-damage",
      icon: "Droplets",
      color: "from-cyan-500 to-blue-500",
      stat: "Вернули до 500 тыс. ₽",
      categories: ["housing", "court"],
    },
    {
      problem: "Купили квартиру, а застройщик обманул",
      keywords: [
        "застройщик",
        "новостройка",
        "квартира с дефектами",
        "дду",
        "обман",
        "строители",
        "некачественная квартира",
      ],
      solution: "Вернём деньги или заставим исправить",
      result: "Полный возврат средств или устранение всех недостатков",
      time: "4-8 месяца",
      link: "/disputes-with-developers",
      icon: "Building",
      color: "from-indigo-500 to-purple-500",
      stat: "Вернули до 2 млн ₽",
      categories: ["housing", "consumer", "court"],
    },
    {
      problem: "Конфликт с УК из-за коммунальных платежей",
      keywords: [
        "ук",
        "управляющая компания",
        "коммуналка",
        "квартплата",
        "общедомовые нужды",
        "перерасчёт",
      ],
      solution: "Оспорим незаконные начисления",
      result: "Снижение платежей + перерасчёт за прошлые месяцы",
      time: "2-3 месяца",
      link: "/housing-disputes",
      icon: "Home",
      color: "from-blue-600 to-cyan-500",
      stat: "Снизили платежи на 30-50%",
      categories: ["housing", "court"],
    },

    // ===== СЕМЬЯ =====
    {
      problem: "Развод, супруг угрожает забрать всё",
      keywords: [
        "развод",
        "раздел имущества",
        "дети",
        "алименты",
        "брак",
        "супруг",
        "семья",
      ],
      solution: "Сохраним ваше имущество и права",
      result: "Справедливый раздел, определение детей, алименты",
      time: "3-6 месяцев",
      link: "/family-lawyer",
      icon: "Users",
      color: "from-pink-500 to-rose-500",
      stat: "Защитили имущество в 92% дел",
      categories: ["family", "court"],
    },
    {
      problem: "Спор из-за наследства с родственниками",
      keywords: [
        "наследство",
        "завещание",
        "родственники",
        "спор",
        "доля",
        "имущество",
      ],
      solution: "Защитим ваши права на наследство",
      result: "Получение законной доли наследства",
      time: "4-8 месяцев",
      link: "/family-lawyer",
      icon: "Package",
      color: "from-rose-500 to-pink-500",
      stat: "Отстояли права в 86% споров",
      categories: ["family", "court"],
    },

    // ===== РАБОТА =====
    {
      problem: "Не платят зарплату 3 месяца",
      keywords: [
        "зарплата",
        "не платят",
        "работодатель",
        "увольнение",
        "трудовая спор",
        "деньги за работу",
        "задержка зарплаты",
      ],
      solution: "Взыщем зарплату и компенсацию",
      result: "Все невыплаты + компенсация за задержку",
      time: "1-2 месяца",
      link: "/labor-law",
      icon: "Briefcase",
      color: "from-amber-500 to-yellow-500",
      stat: "Вернули 100% задолженности",
      categories: ["work", "money", "court"],
    },
    {
      problem: "Уволили без выплат и объяснений",
      keywords: [
        "увольнение",
        "незаконное увольнение",
        "расчёт",
        "трудовая",
        "восстановление",
      ],
      solution: "Восстановим на работе или взыщем компенсацию",
      result: "Восстановление или компенсация в 6 средних зарплат",
      time: "2-3 месяца",
      link: "/labor-law",
      icon: "Briefcase",
      color: "from-amber-600 to-orange-500",
      stat: "Восстановили 78% уволенных",
      categories: ["work", "court"],
    },
    {
      problem: "Получил(а) травму на производстве",
      keywords: [
        "травма",
        "производство",
        "несчастный случай",
        "больничный",
        "компенсация",
      ],
      solution: "Добьёмся компенсации и лечения",
      result: "Компенсация ущерба + оплата лечения + пособие",
      time: "3-5 месяцев",
      link: "/labor-law",
      icon: "AlertCircle",
      color: "from-red-600 to-pink-500",
      stat: "Полная компенсация в 91% случаев",
      categories: ["work", "court"],
    },

    // ===== ПОКУПКИ =====
    {
      problem: "Купили телефон, а он сломался через неделю",
      keywords: [
        "брак",
        "некачественный товар",
        "возврат",
        "гарантия",
        "ремонт",
        "покупка",
        "магазин",
        "обман",
      ],
      solution: "Вернём деньги или заменим товар",
      result: "Возврат полной стоимости или замена на новый",
      time: "1-2 месяца",
      link: "/consumer-protection",
      icon: "ShoppingCart",
      color: "from-purple-500 to-violet-500",
      stat: "Вернули деньги в 94% случаев",
      categories: ["consumer", "court"],
    },
    {
      problem: "Туроператор сорвал отпуск",
      keywords: [
        "туроператор",
        "отпуск",
        "поездка",
        "тур",
        "сорванный отдых",
        "путевка",
        "турфирма",
      ],
      solution: "Вернём деньги за испорченный отпуск",
      result: "Возврат средств + компенсация морального вреда",
      time: "2-4 месяца",
      link: "/consumer-protection",
      icon: "Plane",
      color: "from-sky-500 to-blue-500",
      stat: "Вернули до 300 тыс. ₽",
      categories: ["consumer", "court"],
    },

    // ===== СУД (ОТДЕЛЬНО) =====
    {
      problem: "Нужен представитель в суде по любому вопросу",
      keywords: [
        "представительство в суде",
        "юрист в суде",
        "защита в суде",
        "суд",
        "исковое заявление",
        "адвокат в суде",
        "судебный процесс",
      ],
      solution: "Опытный юрист защитит ваши интересы",
      result:
        "Профессиональное ведение дела от подачи иска до исполнения решения",
      time: "Зависит от дела",
      link: "/court-representation",
      icon: "Scale",
      color: "from-gray-700 to-slate-700",
      stat: "Выиграли 89% дел",
      categories: ["court"],
    },
    {
      problem: "Обжалование решения суда",
      keywords: [
        "обжалование",
        "апелляция",
        "кассация",
        "пересмотр дела",
        "отмена решения суда",
      ],
      solution: "Подготовим жалобу и представим в вышестоящем суде",
      result: "Отмена или изменение несправедливого решения",
      time: "3-6 месяцев",
      link: "/court-representation",
      icon: "FileText",
      color: "from-slate-600 to-gray-600",
      stat: "Отменили 45% решений",
      categories: ["court"],
    },
  ];

  // Улучшенный поиск с учетом пересечения категорий
  const filteredCases = useMemo(() => {
    if (!searchQuery && !activeCategory) return realCases;

    const query = searchQuery.toLowerCase().trim();

    return realCases.filter((case_) => {
      // Проверка по категории (если выбрана)
      const categoryMatch =
        !activeCategory || case_.categories.includes(activeCategory);

      if (!categoryMatch) return false;

      // Если есть поисковый запрос
      if (!query) return true;

      // Расширенный поиск: проверяем все поля и ключевые слова
      const searchIn = [
        case_.problem.toLowerCase(),
        case_.solution.toLowerCase(),
        case_.result.toLowerCase(),
        ...case_.keywords,
      ].join(" ");

      return searchIn.includes(query);
    });
  }, [searchQuery, activeCategory]);

  // Популярные запросы для быстрого поиска
  const popularSearches = [
    "дтп страховая мало",
    "лишение прав",
    "штраф гибдд",
    "затопили соседи",
    "не платят зарплату",
    "развод имущество",
    "бракованный товар",
    "долги кредиты",
    "представительство в суде",
  ];

  // Примеры для каждой категории
  const getCategoryExamples = (categoryId: string) => {
    const examples = realCases
      .filter((case_) => case_.categories.includes(categoryId))
      .slice(0, 3);

    return examples.length > 0 ? examples : realCases.slice(0, 3);
  };

  return (
    <div className="space-y-16">
      {/* Блок 1: Главный поиск */}
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Решим вашу юридическую проблему
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Опишите ситуацию — мы знаем все нюансы. От ДТП до споров с
          застройщиками.
        </p>

        {/* Поле поиска с подсказками */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Например: 'лишают прав', 'штраф ГИБДД', 'СТО плохой ремонт', 'затопили'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm"
            />
            <Icon
              name="Search"
              className="absolute right-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            />
          </div>

          {/* Популярные запросы */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <span className="text-sm text-gray-500 mr-2">Часто ищут:</span>
            {popularSearches.map((search, i) => (
              <button
                key={i}
                onClick={() => setSearchQuery(search)}
                className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Категории с примерами */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Ищите по категории или конкретной ситуации:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemCategories.map((category) => {
              const examples = getCategoryExamples(category.id);
              const isActive = activeCategory === category.id;

              return (
                <div
                  key={category.id}
                  className={`rounded-xl border-2 ${category.border} ${category.color} p-5 transition-all duration-300 hover:shadow-lg ${
                    isActive ? "ring-2 ring-primary ring-offset-2" : ""
                  }`}
                >
                  <div
                    className="flex items-center gap-3 mb-4 cursor-pointer"
                    onClick={() =>
                      setActiveCategory(isActive ? null : category.id)
                    }
                  >
                    <div className="text-2xl">
                      {category.title.split(" ")[0]}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800">
                        {category.title.split(" ")[1]}
                      </h3>
                      <div className="text-xs text-gray-500 mt-1">
                        {
                          realCases.filter((c) =>
                            c.categories.includes(category.id),
                          ).length
                        }{" "}
                        ситуаций
                      </div>
                    </div>
                    <Icon
                      name={isActive ? "ChevronUp" : "ChevronDown"}
                      className="h-5 w-5 text-gray-500"
                    />
                  </div>

                  {isActive && (
                    <div className="space-y-3 mb-4 animate-in fade-in duration-300">
                      {examples.map((example, idx) => (
                        <div
                          key={idx}
                          className="text-sm text-gray-700 p-3 bg-white/80 rounded-lg cursor-pointer hover:bg-white transition-colors border border-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(example.link);
                          }}
                        >
                          <div className="font-medium mb-1">
                            {example.problem}
                          </div>
                          <div className="text-green-600 text-xs">
                            {example.solution}
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-500">
                              {example.time}
                            </span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {example.stat}
                            </span>
                          </div>
                        </div>
                      ))}

                      {realCases.filter((c) =>
                        c.categories.includes(category.id),
                      ).length > 3 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCategory(category.id);
                          }}
                          className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium py-2"
                        >
                          Показать все{" "}
                          {
                            realCases.filter((c) =>
                              c.categories.includes(category.id),
                            ).length
                          }{" "}
                          ситуаций →
                        </button>
                      )}
                    </div>
                  )}

                  {!isActive && (
                    <div className="space-y-2 mb-4">
                      {examples.map((example, idx) => (
                        <div
                          key={idx}
                          className="text-sm text-gray-600 p-2 bg-white/50 rounded cursor-pointer hover:bg-white/80 transition-colors"
                          onClick={() =>
                            setSearchQuery(example.problem.split(",")[0])
                          }
                        >
                          {example.problem.split(",")[0]}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Блок 2: Результаты поиска */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {filteredCases.length === 0
              ? "Не нашли свою ситуацию?"
              : `Нашлось ${filteredCases.length} решений`}
          </h2>

          {(searchQuery || activeCategory) && (
            <div className="flex items-center gap-3">
              {activeCategory && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm">
                  {
                    problemCategories.find((c) => c.id === activeCategory)
                      ?.title
                  }
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="ml-1 hover:text-primary/70"
                  >
                    ×
                  </button>
                </div>
              )}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory(null);
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Сбросить всё
              </button>
            </div>
          )}
        </div>

        {filteredCases.length === 0 ? (
          // Если ничего не найдено
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Не нашли свою ситуацию?
            </h3>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              У нас есть решения для сотен разных случаев.
              <br />
              <span className="font-semibold">
                Опишите по телефону — найдём способ помочь.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => window.open("tel:+73832359505", "_self")}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg px-10 py-6 text-lg"
              >
                <Icon name="Phone" className="h-6 w-6 mr-3" />
                Бесплатная консультация 15 мин
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory(null);
                }}
                className="border-2 border-gray-300 hover:border-gray-400 px-8 py-6"
              >
                Показать все ситуации
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Карточки решений */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCases.map((case_, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(case_.link)}
                >
                  {/* Цветная полоска сверху */}
                  <div className={`h-2 bg-gradient-to-r ${case_.color}`} />

                  <div className="p-6">
                    {/* Заголовок с иконкой */}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${case_.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon
                          name={case_.icon}
                          className="h-6 w-6 text-white"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                          {case_.problem}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <div className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full">
                            {case_.solution}
                          </div>
                          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {case_.stat}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Результат */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Icon
                          name="CheckCircle"
                          className="h-4 w-4 text-green-500"
                        />
                        <span className="font-medium">Что получите:</span>
                      </div>
                      <p className="text-gray-700 pl-6 text-sm">
                        {case_.result}
                      </p>
                    </div>

                    {/* Футер карточки */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Icon name="Clock" className="h-4 w-4" />
                          <span>{case_.time}</span>
                        </div>
                        <div className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded">
                          Бесплатная консультация
                        </div>
                      </div>

                      <div className="flex items-center text-primary font-semibold text-sm group-hover:text-primary/80">
                        <span>Узнать подробнее</span>
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

            {/* Подсказка о других ситуациях */}
            {filteredCases.length > 0 && filteredCases.length < 5 && (
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Видите только часть решений? Попробуйте другой запрос или
                  позвоните нам
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.open("tel:+73832359505", "_self")}
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  <Icon name="Phone" className="h-4 w-4 mr-2" />
                  Получить бесплатную консультацию
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Блок 3: CTA */}
      <div className="bg-gradient-to-br from-primary/10 to-blue-50 rounded-3xl p-10 text-center border border-primary/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Нужен юрист для представительства в суде?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Мы берёмся за дела любой сложности. От консультации до полного
            ведения в суде.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate("/court-representation")}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold px-10 py-6 text-lg rounded-xl shadow-lg"
            >
              <Icon name="Scale" className="h-6 w-6 mr-3" />
              Подробнее о судебном представительстве
            </Button>

            <div className="text-left">
              <div className="text-2xl font-black text-gray-900 tracking-tight">
                +7 (383) 235-95-05
              </div>
              <div className="text-gray-600 text-sm mt-1">
                Звоните с 8:00 до 22:00 • Новосибирск
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-primary/30">
            {[
              {
                icon: "Scale",
                title: "Все суды",
                desc: "Мировой, районный, арбитражный",
              },
              {
                icon: "FileText",
                title: "Любые дела",
                desc: "Гражданские, административные, уголовные",
              },
              {
                icon: "Shield",
                title: "Защита интересов",
                desc: "Полное представительство от А до Я",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                  <Icon name={item.icon} className="h-5 w-5 text-primary" />
                </div>
                <div className="font-semibold text-gray-900">{item.title}</div>
                <div className="text-gray-600 text-sm mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
