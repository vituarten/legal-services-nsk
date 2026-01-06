import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import { Link } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Категории проблем
  const problemCategories = [
    {
      id: "money",
      title: "💸 Деньги",
      icon: "CreditCard",
      color: "bg-gradient-to-br from-red-50 to-orange-50",
      border: "border-red-100",
      problems: ["Кредиты", "Долги", "Коллекторы", "Страховки", "Аресты"],
    },
    {
      id: "housing",
      title: "🏠 Жильё",
      icon: "Home",
      color: "bg-gradient-to-br from-blue-50 to-cyan-50",
      border: "border-blue-100",
      problems: ["Потопы", "Застройщики", "Ремонт", "Участки", "Соседи"],
    },
    {
      id: "family",
      title: "👨‍👩‍👧‍👦 Семья",
      icon: "Users",
      color: "bg-gradient-to-br from-pink-50 to-rose-50",
      border: "border-pink-100",
      problems: ["Развод", "Алименты", "Наследство", "Дети", "Имущество"],
    },
    {
      id: "auto",
      title: "🚗 Авто",
      icon: "Car",
      color: "bg-gradient-to-br from-green-50 to-emerald-50",
      border: "border-green-100",
      problems: ["ДТП", "Страховые", "Права", "Покупка авто", "Ремонт"],
    },
    {
      id: "work",
      title: "💼 Работа",
      icon: "Briefcase",
      color: "bg-gradient-to-br from-yellow-50 to-amber-50",
      border: "border-yellow-100",
      problems: ["Зарплата", "Увольнение", "Отпуск", "Травмы", "Дискриминация"],
    },
    {
      id: "consumer",
      title: "🛒 Покупки",
      icon: "ShoppingCart",
      color: "bg-gradient-to-br from-purple-50 to-violet-50",
      border: "border-purple-100",
      problems: ["Товары", "Обман", "Услуги", "Туры", "Ремонт"],
    },
  ];

  // Реальные ситуации с решениями + синонимы для поиска
  const realCases = [
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
    },
    {
      problem: "Затопили соседи, ремонт за свой счёт",
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
    },
    {
      problem: "Попал в ДТП, страховая платит мало",
      keywords: [
        "дтп",
        "авария",
        "страховая",
        "осаго",
        "ущерб",
        "авто",
        "машина",
        "авария",
      ],
      solution: "Добьёмся полной выплаты",
      result: "Увеличим выплату в 2-3 раза, сохраним права",
      time: "1-3 месяца",
      link: "/dtp-lawyer",
      icon: "Car",
      color: "from-green-500 to-emerald-500",
      stat: "Увеличили выплаты в 87% случаев",
    },
    {
      problem: "Развод, муж угрожает забрать всё",
      keywords: [
        "развод",
        "раздел имущества",
        "дети",
        "алименты",
        "брак",
        "супруг",
        "семья",
        "развод с мужем",
        "развод с женой",
      ],
      solution: "Сохраним ваше имущество и права",
      result: "Справедливый раздел, определение детей, алименты",
      time: "3-6 месяцев",
      link: "/family-lawyer",
      icon: "Users",
      color: "from-pink-500 to-rose-500",
      stat: "Защитили имущество в 92% дел",
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
      time: "4-8 месяцев",
      link: "/disputes-with-developers",
      icon: "Building",
      color: "from-indigo-500 to-purple-500",
      stat: "Вернули до 2 млн ₽",
    },
    {
      problem: "Не платят зарплату 3 месяца",
      keywords: [
        "зарплата",
        "не платят",
        "работодатель",
        "увольнение",
        "трудовой спор",
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
    },
    {
      problem: "Купил телефон, а он сломался",
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
    },
  ];

  // Улучшенный поиск с учетом синонимов
  const filteredCases = useMemo(() => {
    if (!searchQuery && !activeCategory) return realCases;

    const query = searchQuery.toLowerCase().trim();

    return realCases.filter((case_) => {
      // Проверка по категории
      const categoryMatch =
        !activeCategory ||
        problemCategories
          .find((c) => c.id === activeCategory)
          ?.problems.some((problem) =>
            case_.problem.toLowerCase().includes(problem.toLowerCase()),
          );

      if (!categoryMatch) return false;

      // Если есть поисковый запрос
      if (!query) return true;

      // Поиск по основным полям и ключевым словам
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
    "должны деньги",
    "затопили квартиру",
    "долги по кредитам",
    "попал в ДТП",
    "не платят зарплату",
    "развод с мужем",
    "обманул застройщик",
    "купил бракованный товар",
  ];

  return (
    <div className="space-y-16">
      {/* Блок 1: Главный поиск */}
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Решим вашу проблему с юристом
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Опишите ситуацию простыми словами — подберём решение. Работаем без
          предоплаты.
        </p>

        {/* Поле поиска с подсказками */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Например: 'должны деньги', 'затопили квартиру', 'не платят зарплату'..."
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

        {/* Категории проблем - компактнее */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Выберите категорию проблемы:
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
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${
                  activeCategory === category.id
                    ? `${category.color} ${category.border} border-2 shadow-lg scale-105`
                    : `bg-white ${category.border} border hover:shadow-md`
                }`}
              >
                <span className="text-xl">{category.title.split(" ")[0]}</span>
                <span className="font-medium">
                  {category.title.split(" ")[1]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Блок 2: Результаты поиска */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {filteredCases.length === 0
              ? "Не нашли свою ситуацию?"
              : "Как решаем такие проблемы"}
          </h2>
          {filteredCases.length > 0 && (
            <div className="text-sm text-gray-500">
              Нашли {filteredCases.length} вариант
              {filteredCases.length === 1 ? "" : "а"}
            </div>
          )}
        </div>

        {filteredCases.length === 0 ? (
          // Если ничего не найдено
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
            <div className="text-6xl mb-6">🤔</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Такая ситуация нам не знакома
            </h3>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Возможно, ваша проблема уникальна или вы описали её необычно.
              <br />
              <span className="font-semibold">
                Позвоните — мы всё равно поможем.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => window.open("tel:+73832359505", "_self")}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg px-10 py-6 text-lg"
              >
                <Icon name="Phone" className="h-6 w-6 mr-3" />
                Бесплатно проконсультироваться
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
          // Карточки решений - новый дизайн
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
                      <Icon name={case_.icon} className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
                        {case_.problem}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full">
                          {case_.solution}
                        </div>
                        <div className="text-xs text-gray-500">
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
                    <p className="text-gray-700 pl-6">{case_.result}</p>
                  </div>

                  {/* Футер карточки */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Icon name="Clock" className="h-4 w-4" />
                        <span>{case_.time}</span>
                      </div>
                      <div className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        Без предоплаты
                      </div>
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

      {/* Блок 3: Полный список услуг (аккордеон) */}
      <div className="border-t border-gray-200 pt-12">
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer text-xl font-bold text-gray-900 mb-6 list-none hover:text-primary transition-colors">
            <span>Все услуги юриста (список для ознакомления)</span>
            <Icon
              name="ChevronDown"
              className="h-5 w-5 text-gray-500 transform group-open:rotate-180 transition-transform"
            />
          </summary>

          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Банкротство физических лиц",
                desc: "Списание долгов, защита от коллекторов",
                link: "/bankruptcy-lawyer",
              },
              {
                title: "Взыскание долгов",
                desc: "Вернём деньги с должников через суд",
                link: "/debt-collection",
              },
              {
                title: "Семейный юрист",
                desc: "Развод, раздел имущества, алименты",
                link: "/family-lawyer",
              },
              {
                title: "Автоюрист",
                desc: "ДТП, споры со страховыми, лишение прав",
                link: "/dtp-lawyer",
              },
              {
                title: "Недвижимость",
                desc: "Сделки, перепланировки, споры",
                link: "/real-estate-lawyer",
              },
              {
                title: "Трудовые споры",
                desc: "Невыплата зарплаты, незаконное увольнение",
                link: "/labor-law",
              },
              {
                title: "Защита прав потребителей",
                desc: "Возврат некачественного товара",
                link: "/consumer-protection",
              },
              {
                title: "Миграционные вопросы",
                desc: "ВНЖ, гражданство, защита от депортации",
                link: "/migration",
              },
              {
                title: "Уголовные дела",
                desc: "Защита на следствии и в суде",
                link: "/criminal-lawyer",
              },
              {
                title: "Земельные споры",
                desc: "Межевание, оформление участков",
                link: "/land-law",
              },
              {
                title: "Возмещение ущерба от потопов",
                desc: "Взыскание ущерба при залитии",
                link: "/flood-damage",
              },
              {
                title: "Составление документов",
                desc: "Договоры, иски, правовая экспертиза",
                link: "/document-services",
              },
            ].map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="block p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all hover:shadow-sm"
              >
                <div className="font-semibold text-gray-900 hover:text-primary transition-colors mb-1">
                  {service.title}
                </div>
                <div className="text-sm text-gray-600">{service.desc}</div>
              </Link>
            ))}
          </div>
        </details>
      </div>

      {/* Блок 4: CTA - помощь в выборе */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Не уверены, что вам можем помочь?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Расскажите о ситуации за 5 минут — юрист определит, можем ли решить
            вашу проблему
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              onClick={() => window.open("tel:+73832359505", "_self")}
              className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-10 py-6 text-lg rounded-xl shadow-lg"
            >
              <Icon name="Phone" className="h-6 w-6 mr-3" />
              Бесплатная консультация 15 мин
            </Button>

            <div className="text-left">
              <div className="text-2xl font-black tracking-tight">
                +7 (383) 235-95-05
              </div>
              <div className="text-gray-400 text-sm mt-1">
                Звоните с 8:00 до 22:00 • Новосибирск
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-gray-700">
            {[
              {
                icon: "CheckCircle",
                title: "Честная оценка",
                desc: "Скажем, если не сможем помочь",
              },
              {
                icon: "Clock",
                title: "Без ожидания",
                desc: "Сразу соединим с юристом",
              },
              {
                icon: "Shield",
                title: "Конфиденциально",
                desc: "Не передаём данные третьим лицам",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                  <Icon name={item.icon} className="h-5 w-5 text-primary" />
                </div>
                <div className="font-semibold">{item.title}</div>
                <div className="text-gray-400 text-sm mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
