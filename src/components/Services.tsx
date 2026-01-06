import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Категории проблем на человеческом языке
  const problemCategories = [
    {
      id: "money",
      title: "💸 Деньги и долги",
      icon: "CreditCard",
      color: "from-red-50 to-orange-50",
      border: "border-red-100",
      hover: "hover:border-red-300",
      problems: [
        "Не могу платить кредиты",
        "Звонят коллекторы",
        "Мне должны деньги",
        "Банк навязал страховку",
        "Арестовали счёт или карту",
      ],
    },
    {
      id: "housing",
      title: "🏠 Жильё и квартиры",
      icon: "Home",
      color: "from-blue-50 to-cyan-50",
      border: "border-blue-100",
      hover: "hover:border-blue-300",
      problems: [
        "Затопили соседи",
        "Проблемы с застройщиком",
        "Хочу сделать перепланировку",
        "Споры из-за границ участка",
        "Управляйка не делает ремонт",
      ],
    },
    {
      id: "family",
      title: "👨‍👩‍👧‍👦 Семья и отношения",
      icon: "Users",
      color: "from-pink-50 to-rose-50",
      border: "border-pink-100",
      hover: "hover:border-pink-300",
      problems: [
        "Развод и раздел имущества",
        "Споры об алиментах",
        "Конфликт из-за наследства",
        "Определение места жительства детей",
        "Лишение родительских прав",
      ],
    },
    {
      id: "auto",
      title: "🚗 Авто и ДТП",
      icon: "Car",
      color: "from-green-50 to-emerald-50",
      border: "border-green-100",
      hover: "hover:border-green-300",
      problems: [
        "Попал в ДТП",
        "Страховая не платит",
        "Грозит лишение прав",
        "Купил бракованный авто",
        "Конфликт с автосервисом",
      ],
    },
    {
      id: "work",
      title: "💼 Работа и зарплата",
      icon: "Briefcase",
      color: "from-yellow-50 to-amber-50",
      border: "border-yellow-100",
      hover: "hover:border-yellow-300",
      problems: [
        "Не платят зарплату",
        "Уволили незаконно",
        "Не дают отпуск",
        "Травма на производстве",
        "Дискриминация на работе",
      ],
    },
    {
      id: "consumer",
      title: "🛒 Покупки и услуги",
      icon: "ShoppingCart",
      color: "from-purple-50 to-violet-50",
      border: "border-purple-100",
      hover: "hover:border-purple-300",
      problems: [
        "Купил некачественный товар",
        "Обманули в интернет-магазине",
        "Навязали ненужную услугу",
        "Туроператор сорвал отдых",
        "Бракованный ремонт",
      ],
    },
  ];

  // Реальные ситуации с решениями (без цен!)
  const realCases = [
    {
      problem: "Сняли 50 000 ₽ за ненужную страховку по кредиту",
      solution: "Вернём деньги + штраф 50%",
      result: "Получите: 50 000 ₽ (ваши) + 25 000 ₽ (штраф) = 75 000 ₽",
      time: "1-2 месяца",
      link: "/consumer-protection",
      icon: "CreditCard",
    },
    {
      problem: "Затопили квартиру, соседи и управляйка отказываются платить",
      solution: "Взыщем ущерб через суд",
      result: "Получите деньги на ремонт + компенсацию за неудобства",
      time: "2-4 месяца",
      link: "/flood-damage",
      icon: "Droplets",
    },
    {
      problem: "Не могу платить кредиты 6 месяцев, коллекторы достали",
      solution: "Списываем долги через банкротство",
      result:
        "Избавитесь от долгов, сохраните единственное жильё, остановите звонки",
      time: "5-9 месяцев",
      link: "/bankruptcy-lawyer",
      icon: "TrendingDown",
    },
    {
      problem: "Попал в ДТП, страховая выплатила мало, грозит лишение прав",
      solution: "Оспорим выплату и сохраним права",
      result: "Увеличим выплату, сохраним водительские права, снизим штраф",
      time: "1-3 месяца",
      link: "/dtp-lawyer",
      icon: "Car",
    },
    {
      problem: "Развод, муж угрожает забрать квартиру и детей",
      solution: "Сохраним ваше имущество и права на детей",
      result:
        "Справедливый раздел имущества, определение места жительства детей",
      time: "3-6 месяцев",
      link: "/family-lawyer",
      link: "/family-lawyer",
      icon: "Users",
    },
    {
      problem: "Купили квартиру, а застройщик сдал с дефектами и просрочкой",
      solution: "Вернём деньги или заставим исправить всё застройщика",
      result:
        "Полный возврат денег или исправление всех недостатков + неустойка",
      time: "4-8 месяцев",
      link: "/disputes-with-developers",
      icon: "Building",
    },
  ];

  // Фильтруем ситуации по выбранной категории
  const filteredCases = activeCategory
    ? realCases.filter((case_) => {
        const category = problemCategories.find((c) => c.id === activeCategory);
        return category?.problems.some((problem) =>
          case_.problem
            .toLowerCase()
            .includes(problem.toLowerCase().split(" ")[0]),
        );
      })
    : realCases;

  // Поиск по ситуациям
  const searchedCases = searchQuery
    ? filteredCases.filter(
        (case_) =>
          case_.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
          case_.solution.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : filteredCases;

  return (
    <div className="space-y-16">
      {/* Блок 1: Главный поиск */}
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Решаем юридические проблемы
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Опишите свою ситуацию — мы подскажем, как её решить. Без сложных
          терминов.
        </p>

        {/* Поле поиска */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Например: 'затопили квартиру', 'не платят зарплату', 'долги по кредитам'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
            <Icon
              name="Search"
              className="absolute right-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            />
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Начните вводить свою проблему — подберём решение
          </p>
        </div>

        {/* Категории проблем */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Или выберите категорию проблемы:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {problemCategories.map((category) => (
              <button
                key={category.id}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === category.id ? null : category.id,
                  )
                }
                className={`p-4 rounded-xl text-center transition-all duration-300 transform hover:-translate-y-1 ${
                  activeCategory === category.id
                    ? `ring-2 ring-primary ring-offset-2 ${category.color} ${category.border}`
                    : `bg-white ${category.border} ${category.hover}`
                }`}
              >
                <div className="text-2xl mb-2">
                  {category.title.split(" ")[0]}
                </div>
                <div className="text-sm font-medium text-gray-700">
                  {category.title.split(" ").slice(1).join(" ")}
                </div>
              </button>
            ))}
          </div>
          {activeCategory && (
            <div className="mt-6">
              <button
                onClick={() => setActiveCategory(null)}
                className="text-primary hover:text-primary/80 font-medium text-sm"
              >
                ✕ Сбросить фильтр
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Блок 2: Реальные ситуации и решения */}
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Частые ситуации и как мы их решаем
        </h2>

        {searchedCases.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Не нашли свою ситуацию?
            </h3>
            <p className="text-gray-600 mb-6">
              Опишите проблему по телефону — юрист бесплатно подскажет решение
            </p>
            <Button
              onClick={() => window.open("tel:+73832359505", "_self")}
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              <Icon name="Phone" className="h-5 w-5 mr-2" />
              Позвонить юристу
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {searchedCases.map((case_, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(case_.link)}
              >
                <div className="space-y-6">
                  {/* Иконка и заголовок */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Icon
                        name={case_.icon}
                        className="h-6 w-6 text-gray-600 group-hover:text-primary"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {case_.problem}
                      </h3>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold">
                        <Icon name="CheckCircle" className="h-4 w-4" />
                        {case_.solution}
                      </div>
                    </div>
                  </div>

                  {/* Результат */}
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-blue-800 font-medium mb-1">
                      <Icon name="TrendingUp" className="h-4 w-4" />
                      Что вы получите:
                    </div>
                    <p className="text-blue-700">{case_.result}</p>
                  </div>

                  {/* Сроки */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Icon name="Clock" className="h-4 w-4" />
                      <span className="font-medium">Срок:</span>
                      <span>{case_.time}</span>
                    </div>

                    <div className="flex items-center text-primary font-semibold group-hover:text-primary/80 transition-colors">
                      <span>Узнать как это работает</span>
                      <Icon
                        name="ArrowRight"
                        className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Блок 3: Полный список услуг (скрытый по умолчанию) */}
      <div className="border-t border-gray-200 pt-12">
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer text-2xl font-bold text-gray-900 mb-8 list-none">
            <span>Полный список услуг (для ознакомления)</span>
            <Icon
              name="ChevronDown"
              className="h-6 w-6 text-gray-500 transform group-open:rotate-180 transition-transform"
            />
          </summary>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Банкротство физических лиц",
                desc: "Списание долгов, защита от коллекторов",
                link: "/bankruptcy-lawyer",
              },
              {
                title: "Семейный юрист",
                desc: "Развод, раздел имущества, алименты, споры о детях",
                link: "/family-lawyer",
              },
              {
                title: "Автоюрист",
                desc: "ДТП, споры со страховыми, лишение прав",
                link: "/dtp-lawyer",
              },
              {
                title: "Недвижимость",
                desc: "Сделки, перепланировки, споры с застройщиками",
                link: "/real-estate-lawyer",
              },
              {
                title: "Взыскание долгов",
                desc: "Возврат денег с должников через суд",
                link: "/debt-collection",
              },
              {
                title: "Защита прав потребителей",
                desc: "Возврат некачественного товара, обман в магазинах",
                link: "/consumer-protection",
              },
              {
                title: "Трудовые споры",
                desc: "Невыплата зарплаты, незаконное увольнение",
                link: "/labor-law",
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
                desc: "Межевание, оформление участков, споры с соседями",
                link: "/land-law",
              },
              {
                title: "Возмещение ущерба от потопов",
                desc: "Взыскание ущерба при залитии квартиры",
                link: "/flood-damage",
              },
              {
                title: "Составление документов",
                desc: "Договоры, иски, жалобы, правовая экспертиза",
                link: "/document-services",
              },
            ].map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="block p-5 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className="font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
                  {service.title}
                </div>
                <div className="text-sm text-gray-600">{service.desc}</div>
              </Link>
            ))}
          </div>
        </details>
      </div>

      {/* Блок 4: Помощь в выборе */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-10 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Не знаете, какая услуга вам нужна?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Расскажите о ситуации — мы определим, как лучше помочь, и назовём
            точную стоимость решения
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              onClick={() => window.open("tel:+73832359505", "_self")}
              className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-10 py-6 text-lg rounded-xl"
            >
              <Icon name="Phone" className="h-6 w-6 mr-3" />
              Бесплатно проконсультироваться
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <Icon name="Clock" className="h-6 w-6 text-primary" />
              </div>
              <div className="font-semibold">Первая консультация</div>
              <div className="text-gray-400 text-sm">бесплатно</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <Icon name="Shield" className="h-6 w-6 text-primary" />
              </div>
              <div className="font-semibold">Оплата за результат</div>
              <div className="text-gray-400 text-sm">в некоторых случаях</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <Icon name="FileText" className="h-6 w-6 text-primary" />
              </div>
              <div className="font-semibold">Анализ документов</div>
              <div className="text-gray-400 text-sm">перед началом работы</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
