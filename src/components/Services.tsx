import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Категории с расширенными ключевыми словами
  const problemCategories = [
    {
      id: "money",
      title: "💸 Финансы и долги",
      icon: "CreditCard",
      color: "bg-gradient-to-br from-red-50 to-orange-50",
      border: "border-red-100",
      keywords: [
        "долги",
        "кредиты",
        "займы",
        "микрофинансы",
        "коллекторы",
        "банкротство",
        "взыскание",
        "задолженность",
        "неплатеж",
        "должник",
        "проценты",
        "просрочка",
        "финансовые споры",
        "денежные обязательства",
      ],
    },
    {
      id: "housing",
      title: "🏠 Недвижимость",
      icon: "Home",
      color: "bg-gradient-to-br from-blue-50 to-cyan-50",
      border: "border-blue-100",
      keywords: [
        "квартира",
        "дом",
        "застройщик",
        "дду",
        "жилье",
        "потоп",
        "залив",
        "соседи",
        "ремонт",
        "ущерб",
        "аренда",
        "ипотека",
        "сделка",
        "долевое строительство",
        "некачественный ремонт",
      ],
    },
    {
      id: "family",
      title: "👨‍👩‍👦 Семейное право",
      icon: "Users",
      color: "bg-gradient-to-br from-pink-50 to-rose-50",
      border: "border-pink-100",
      keywords: [
        "развод",
        "брак",
        "алименты",
        "дети",
        "имущество",
        "наследство",
        "завещание",
        "опека",
        "родительские права",
        "совместная собственность",
        "брачный договор",
        "раздел имущества",
        "семейные споры",
      ],
    },
    {
      id: "auto",
      title: "🚗 Автомобильное право",
      icon: "Car",
      color: "bg-gradient-to-br from-green-50 to-emerald-50",
      border: "border-green-100",
      keywords: [
        "дтп",
        "авария",
        "страховая",
        "осаго",
        "каско",
        "авто",
        "машина",
        "ущерб",
        "ремонт",
        "штрафы",
        "лишение прав",
        "европротокол",
        "страховая выплата",
        "виновник дтп",
        "потерпевший",
      ],
    },
    {
      id: "work",
      title: "💼 Трудовое право",
      icon: "Briefcase",
      color: "bg-gradient-to-br from-yellow-50 to-amber-50",
      border: "border-yellow-100",
      keywords: [
        "зарплата",
        "увольнение",
        "работодатель",
        "отпуск",
        "больничный",
        "трудовой договор",
        "сокращение",
        "дисциплинарное взыскание",
        "незаконное увольнение",
        "задержка зарплаты",
        "трудовые права",
        "компенсация",
        "восстановление на работе",
      ],
    },
    {
      id: "consumer",
      title: "🛍️ Защита прав потребителей",
      icon: "ShoppingCart",
      color: "bg-gradient-to-br from-purple-50 to-violet-50",
      border: "border-purple-100",
      keywords: [
        "товар",
        "услуга",
        "брак",
        "некачественный",
        "гарантия",
        "возврат",
        "обмен",
        "ремонт",
        "договор",
        "магазин",
        "продавец",
        "изготовитель",
        "существенный недостаток",
        "закон о защите прав потребителей",
      ],
    },
  ];

  // Профессиональные услуги с пояснениями
  const legalServices = [
    {
      // Деньги
      problem: "Взыскание задолженности",
      description: "Вернем ваши деньги с должника через суд",
      keywords: [
        "должник не возвращает деньги",
        "заем не отдают",
        "задолженность по договору",
        "неплатеж по расписке",
        "вернуть долг",
        "судебное взыскание",
        "принудительное исполнение",
        "исполнительный лист",
      ],
      solution: "Судебное взыскание",
      result: "Возврат всей суммы долга + проценты и штрафы",
      time: "2-4 месяца",
      link: "/vzyskanie-dolgov",
      icon: "Scale",
      color: "from-blue-500 to-cyan-500",
      category: "money",
    },
    {
      problem: "Банкротство физических лиц",
      description: "Спишем долги по кредитам и займам законно",
      keywords: [
        "не могу платить кредиты",
        "долги банкам",
        "коллекторы звонят",
        "микрофинансовые организации",
        "финансовая несостоятельность",
        "освобождение от долгов",
        "реструктуризация долгов",
        "процедура банкротства",
      ],
      solution: "Процедура банкротства",
      result: "Списание до 100% долгов, защита от коллекторов",
      time: "5-9 месяцев",
      link: "/bankrotstvo-fizlic",
      icon: "FileCheck",
      color: "from-red-500 to-orange-500",
      category: "money",
    },

    // Недвижимость
    {
      problem: "Возмещение ущерба от залива",
      description: "Взыщем деньги на ремонт, если вас затопили соседи",
      keywords: [
        "затопили квартиру",
        "потоп от соседей",
        "ремонт после залива",
        "ущерб имуществу",
        "компенсация ущерба",
        "оценка ущерба",
        "соседи сверху залили",
        "залив квартиры",
      ],
      solution: "Досудебное урегулирование и суд",
      result: "Полная компенсация ущерба + моральный вред",
      time: "2-4 месяца",
      link: "/vozmeshchenie-ushcherba",
      icon: "Droplets",
      color: "from-cyan-500 to-blue-500",
      category: "housing",
    },
    {
      problem: "Споры с застройщиком",
      description: "Решим проблемы с новостройкой: дефекты, просрочка, обман",
      keywords: [
        "застройщик нарушил сроки",
        "квартира с недостатками",
        "нарушение договора дду",
        "некачественная отделка",
        "скрытые дефекты",
        "отказ от договора",
        "взыскание неустойки",
        "расторжение договора дду",
      ],
      solution: "Претензионная работа и суд",
      result: "Устранение недостатков или возврат денег",
      time: "4-8 месяцев",
      link: "/spory-so-zastrojshhikom",
      icon: "Building",
      color: "from-indigo-500 to-purple-500",
      category: "housing",
    },

    // Семейное право
    {
      problem: "Расторжение брака и раздел имущества",
      description: "Поможем при разводе справедливо разделить имущество",
      keywords: [
        "развод с мужем/женой",
        "раздел квартиры при разводе",
        "совместно нажитое имущество",
        "брачный договор",
        "определение долей",
        "спор об имуществе",
        "супружеские доли",
        "раздел ипотечной квартиры",
      ],
      solution: "Мировое соглашение или суд",
      result: "Справедливый раздел, определение долей",
      time: "3-6 месяцев",
      link: "/razvod-razdel-imushchestva",
      icon: "HeartBreak",
      color: "from-pink-500 to-rose-500",
      category: "family",
    },
    {
      problem: "Взыскание алиментов",
      description: "Добьемся выплат на содержание детей",
      keywords: [
        "алименты на ребенка",
        "неплательщик алиментов",
        "увеличение алиментов",
        "задолженность по алиментам",
        "взыскание алиментов в твердой сумме",
        "уклонение от алиментов",
        "лишение родительских прав",
        "изменение размера алиментов",
      ],
      solution: "Судебный приказ или иск",
      result: "Регулярные выплаты + взыскание задолженности",
      time: "1-2 месяца",
      link: "/vzyskanie-alimentov",
      icon: "Baby",
      color: "from-rose-500 to-pink-500",
      category: "family",
    },

    // Автомобильное право
    {
      problem: "Споры со страховой компанией",
      description: "Добьемся полной выплаты по ОСАГО после ДТП",
      keywords: [
        "страховая отказывает в выплате",
        "недостаточная выплата по осаго",
        "отказ страховой компании",
        "занижение выплаты",
        "экспертиза ущерба",
        "досудебная претензия страховой",
        "судебный спор со страховой",
        "взыскание страхового возмещения",
      ],
      solution: "Досудебное урегулирование и суд",
      result: "Увеличение выплаты до рыночной стоимости ремонта",
      time: "1-3 месяца",
      link: "/spory-so-strahovoj",
      icon: "ShieldAlert",
      color: "from-green-500 to-emerald-500",
      category: "auto",
    },
    {
      problem: "Оспаривание виновности в ДТП",
      description: "Докажем вашу невиновность или смягчим ответственность",
      keywords: [
        "не согласен с виновностью",
        "неправильное оформление дтп",
        "обжалование постановления",
        "лишение прав",
        "административное нарушение",
        "доказательство невиновности",
        "экспертиза дтп",
        "восстановление водительских прав",
      ],
      solution: "Административное обжалование",
      result: "Отмена или изменение постановления, сохранение прав",
      time: "2-3 месяца",
      link: "/osparivanie-dtp",
      icon: "Car",
      color: "from-emerald-500 to-green-500",
      category: "auto",
    },

    // Трудовое право
    {
      problem: "Взыскание заработной платы",
      description: "Вернем невыплаченную зарплату и компенсацию",
      keywords: [
        "не выплачивают зарплату",
        "задержка заработной платы",
        "неполная выплата",
        "расчет при увольнении",
        "компенсация за задержку",
        "задолженность по зарплате",
        "трудовые права",
        "нарушение трудового договора",
      ],
      solution: "Трудовая инспекция и суд",
      result: "Взыскание всей задолженности + 1/150 ключевой ставки",
      time: "1-2 месяца",
      link: "/vzyskanie-zarplaty",
      icon: "Banknote",
      color: "from-amber-500 to-yellow-500",
      category: "work",
    },
    {
      problem: "Восстановление на работе",
      description: "Вернем на работу при незаконном увольнении",
      keywords: [
        "незаконное увольнение",
        "восстановление в должности",
        "сокращение штата",
        "дисциплинарное взыскание",
        "расторжение трудового договора",
        "нарушение процедуры увольнения",
        "компенсация за вынужденный прогул",
        "незаконное сокращение",
      ],
      solution: "Судебное восстановление",
      result: "Восстановление в должности + компенсация вынужденного прогула",
      time: "2-3 месяца",
      link: "/vosstanovlenie-na-rabote",
      icon: "Briefcase",
      color: "from-yellow-500 to-amber-500",
      category: "work",
    },

    // Защита прав потребителей
    {
      problem: "Расторжение договора и возврат денег",
      description: "Вернем деньги за некачественный товар или услугу",
      keywords: [
        "бракованный товар",
        "некачественная услуга",
        "возврат денег за товар",
        "отказ от договора",
        "существенный недостаток",
        "гарантийный ремонт",
        "претензия продавцу",
        "обман потребителя",
      ],
      solution: "Претензионный порядок и суд",
      result: "Возврат полной стоимости + неустойка и штраф",
      time: "1-2 месяца",
      link: "/vozvrat-deneg-za-tovar",
      icon: "PackageCheck",
      color: "from-purple-500 to-violet-500",
      category: "consumer",
    },
    {
      problem: "Взыскание неустойки по договору",
      description: "Взыщем штрафы и пени за нарушение условий договора",
      keywords: [
        "нарушение сроков",
        "неустойка по договору",
        "пени за просрочку",
        "штрафные санкции",
        "несоблюдение условий",
        "договорные обязательства",
        "взыскание пени",
        "ответственность за нарушение договора",
      ],
      solution: "Претензионная работа",
      result: "Взыскание неустойки в размере до 50% от суммы договора",
      time: "1-3 месяца",
      link: "/vzyskanie-neustojki",
      icon: "FileText",
      color: "from-violet-500 to-purple-500",
      category: "consumer",
    },
  ];

  // Улучшенный поиск с учетом категорий
  const filteredServices = useMemo(() => {
    if (!searchQuery && !activeCategory) return legalServices;

    const query = searchQuery.toLowerCase().trim();

    return legalServices.filter((service) => {
      // Фильтрация по категории
      if (activeCategory && service.category !== activeCategory) {
        return false;
      }

      // Если есть поисковый запрос
      if (query) {
        // Ищем в основных полях и ключевых словах
        const searchIn = [
          service.problem.toLowerCase(),
          service.description.toLowerCase(),
          service.solution.toLowerCase(),
          service.result.toLowerCase(),
          ...service.keywords,
        ].join(" ");

        return searchIn.includes(query);
      }

      return true;
    });
  }, [searchQuery, activeCategory]);

  // Популярные запросы
  const popularSearches = [
    "вернуть долг",
    "затопили квартиру",
    "банкротство",
    "дтп",
    "алименты",
    "незаконное увольнение",
    "возврат товара",
    "споры с застройщиком",
  ];

  return (
    <div className="space-y-16">
      {/* Блок 1: Главный поиск */}
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Юридические услуги
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Профессиональная правовая помощь по всем отраслям права
        </p>

        {/* Поле поиска */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Найдите нужную услугу или опишите ситуацию..."
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
            <span className="text-sm text-gray-500 mr-2">
              Популярные запросы:
            </span>
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

        {/* Категории */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Выберите категорию:
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
                  {category.title.split(" ").slice(1).join(" ")}
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
            {activeCategory
              ? problemCategories.find((c) => c.id === activeCategory)?.title
              : "Все услуги"}
          </h2>
          {filteredServices.length > 0 && (
            <div className="text-sm text-gray-500">
              Найдено {filteredServices.length} услуг
              {filteredServices.length === 1 ? "а" : ""}
            </div>
          )}
        </div>

        {filteredServices.length === 0 ? (
          // Если ничего не найдено
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Не нашли нужную услугу?
            </h3>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Возможно, ваша ситуация требует индивидуального подхода.
              <br />
              <span className="font-semibold">
                Позвоните нам для бесплатной консультации.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => window.open("tel:+73832359505", "_self")}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg px-10 py-6 text-lg"
              >
                <Icon name="Phone" className="h-6 w-6 mr-3" />
                Бесплатная консультация
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
                Показать все услуги
              </Button>
            </div>
          </div>
        ) : (
          // Карточки услуг
          <div className="grid md:grid-cols-2 gap-6">
            {filteredServices.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(service.link)}
              >
                {/* Цветная полоска сверху */}
                <div className={`h-2 bg-gradient-to-r ${service.color}`} />

                <div className="p-6">
                  {/* Заголовок с иконкой */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon
                        name={service.icon}
                        className="h-6 w-6 text-white"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
                        {service.problem}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {service.solution}
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
                      <span className="font-medium">Результат:</span>
                    </div>
                    <p className="text-gray-700 pl-6">{service.result}</p>
                  </div>

                  {/* Футер карточки */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Icon name="Clock" className="h-4 w-4" />
                        <span>{service.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-primary font-semibold text-sm group-hover:text-primary/80">
                      <span>Подробнее об услуге</span>
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

      {/* Блок 3: Процесс работы */}
      <div className="border-t border-gray-200 pt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Как мы работаем
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Консультация",
              description: "Анализируем вашу ситуацию, оцениваем перспективы",
              icon: "MessageSquare",
            },
            {
              step: "02",
              title: "Документы",
              description: "Собираем и готовим все необходимые документы",
              icon: "FileText",
            },
            {
              step: "03",
              title: "Решение",
              description: "Выбираем оптимальную стратегию решения проблемы",
              icon: "Target",
            },
            {
              step: "04",
              title: "Результат",
              description: "Добиваемся положительного результата для клиента",
              icon: "Award",
            },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Icon name={item.icon} className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Блок 4: CTA */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Нужна консультация юриста?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Получите бесплатную первичную консультацию по вашему вопросу
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              onClick={() => window.open("tel:+73832359505", "_self")}
              className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-10 py-6 text-lg rounded-xl shadow-lg"
            >
              <Icon name="Phone" className="h-6 w-6 mr-3" />
              Заказать консультацию
            </Button>

            <div className="text-left">
              <div className="text-2xl font-black tracking-tight">
                +7 (383) 235-95-05
              </div>
              <div className="text-gray-400 text-sm mt-1">
                Новосибирск • Ежедневно с 9:00 до 21:00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
