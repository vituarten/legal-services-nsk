import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Services = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    question: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Категории для фильтрации
  const categories = [
    { id: "all", label: "Все услуги" },
    { id: "auto", label: "Авто и ДТП" },
    { id: "money", label: "Деньги и долги" },
    { id: "housing", label: "Жильё и недвижимость" },
    { id: "family", label: "Семья и наследство" },
    { id: "work", label: "Трудовые споры" },
    { id: "consumer", label: "Защита прав потребителей" },
    { id: "court", label: "Судебное представительство" },
  ];

  // Все услуги (чистый каталог)
  const allServices = [
    {
      id: 1,
      title: "Автоюрист. Споры по ДТП",
      description:
        "Взыскание ущерба по ОСАГО, споры со страховыми, защита от лишения прав, административные дела",
      category: "auto",
      link: "/dtp-lawyer",
      icon: "Car",
    },
    {
      id: 2,
      title: "Банкротство физических лиц",
      description:
        "Процедура банкротства для граждан, списание долгов, защита имущества от кредиторов",
      category: "money",
      link: "/bankruptcy-lawyer",
      icon: "TrendingDown",
    },
    {
      id: 3,
      title: "Взыскание долгов",
      description:
        "Взыскание задолженности с физических и юридических лиц, работа с должниками",
      category: "money",
      link: "/debt-collection",
      icon: "CreditCard",
    },
    {
      id: 4,
      title: "Семейный юрист",
      description:
        "Развод, раздел имущества, алименты, опека, споры по детям, брачные договоры",
      category: "family",
      link: "/family-lawyer",
      icon: "Users",
    },
    {
      id: 5,
      title: "Недвижимость и перепланировки",
      description:
        "Сделки с недвижимостью, узаконивание перепланировок, споры с соседями по границам",
      category: "housing",
      link: "/real-estate-lawyer",
      icon: "Home",
    },
    {
      id: 6,
      title: "Возмещение ущерба от потопов",
      description:
        "Взыскание ущерба от залития квартиры, оценка повреждений, споры с соседями и управляющей компанией",
      category: "housing",
      link: "/flood-damage",
      icon: "Droplets",
    },
    {
      id: 7,
      title: "Споры с застройщиками",
      description:
        "Защита прав дольщиков, взыскание неустойки за просрочку, возврат средств по ДДУ",
      category: "housing",
      link: "/disputes-with-developers",
      icon: "Building",
    },
    {
      id: 8,
      title: "Трудовые споры",
      description:
        "Защита трудовых прав, взыскание заработной платы, восстановление на работе, споры с работодателем",
      category: "work",
      link: "/labor-law",
      icon: "Briefcase",
    },
    {
      id: 9,
      title: "Защита прав потребителей",
      description:
        "Возврат некачественного товара, споры с продавцами и услугами, взыскание компенсаций",
      category: "consumer",
      link: "/consumer-protection",
      icon: "ShieldCheck",
    },
    {
      id: 10,
      title: "Миграционные споры",
      description:
        "Получение РВП, ВНЖ, гражданства, защита от депортации, миграционный учёт для иностранцев",
      category: "court",
      link: "/migration",
      icon: "Globe",
    },
    {
      id: 11,
      title: "Представительство в суде",
      description:
        "Представительство интересов в судах всех инстанций: мировом, районном, арбитражном",
      category: "court",
      link: "/court-representation",
      icon: "Scale",
    },
    {
      id: 12,
      title: "Земельное право",
      description:
        "Оформление земельных участков, споры по межеванию, аренда земли, снятие обременений",
      category: "housing",
      link: "/land-law",
      icon: "MapPin",
    },
    {
      id: 13,
      title: "Составление и анализ документов",
      description:
        "Подготовка договоров, исков, жалоб, анализ документации, правовая экспертиза",
      category: "court",
      link: "/document-services",
      icon: "FileText",
    },
    {
      id: 14,
      title: "Уголовная защита",
      description:
        "Защита в уголовных делах, представительство в суде, обжалование приговоров, УДО",
      category: "court",
      link: "/criminal-lawyer",
      icon: "Shield",
    },
  ];

  // Фильтрация услуг
  const filteredServices = useMemo(() => {
    let filtered = allServices;

    // Фильтрация по категории
    if (activeCategory && activeCategory !== "all") {
      filtered = filtered.filter(
        (service) => service.category === activeCategory,
      );
    }

    // Фильтрация по поиску
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.category.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [searchQuery, activeCategory]);

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Здесь должна быть логика отправки формы
    console.log("Форма отправлена:", formData);

    // Имитация успешной отправки
    setIsSubmitted(true);

    // Очистка формы
    setTimeout(() => {
      setFormData({ name: "", phone: "", question: "" });
      setShowForm(false);
      setIsSubmitted(false);
    }, 3000);
  };

  // Обработчик изменения полей формы
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-12">
      {/* Заголовок */}
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Услуги юристов
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Найдите нужную услугу. На каждой странице — детальное описание,
          порядок работы и примеры.
        </p>
      </div>

      {/* Поиск и фильтры */}
      <div className="max-w-4xl mx-auto">
        {/* Строка поиска */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Поиск по услугам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none"
          />
          <Icon
            name="Search"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          />
        </div>

        {/* Категории-фильтры */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeCategory === category.id
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Сетка услуг */}
      {filteredServices.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
              onClick={() => navigate(service.link)}
            >
              <div className="space-y-4">
                {/* Иконка и заголовок */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors">
                    <Icon
                      name={service.icon}
                      className="h-6 w-6 text-gray-600"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* Описание */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Кнопка перехода */}
                <div className="pt-2">
                  <div className="inline-flex items-center text-gray-700 font-medium text-sm group-hover:text-gray-900 transition-colors">
                    <span>Перейти к услуге</span>
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
      ) : (
        // Если ничего не найдено
        <div className="text-center py-12 border border-gray-200 rounded-xl">
          <Icon
            name="Search"
            className="h-12 w-12 text-gray-400 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Услуги не найдены
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Попробуйте изменить поисковый запрос или выбрать другую категорию
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="text-gray-700 hover:text-gray-900 font-medium mr-4"
          >
            Сбросить фильтры
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="text-primary hover:text-primary/80 font-medium"
          >
            Задать вопрос
          </button>
        </div>
      )}

      {/* Форма заявки */}
      {showForm ? (
        <div className="border border-gray-200 rounded-xl p-8 max-w-2xl mx-auto">
          {isSubmitted ? (
            <div className="text-center py-8">
              <Icon
                name="CheckCircle"
                className="h-16 w-16 text-green-500 mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Заявка отправлена
              </h3>
              <p className="text-gray-600">
                Мы свяжемся с вами в ближайшее время
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Задать вопрос юристу
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Icon name="X" className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none"
                    placeholder="Иван Иванов"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>

                <div>
                  <label
                    htmlFor="question"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Ваш вопрос
                  </label>
                  <textarea
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none resize-none"
                    placeholder="Опишите свою ситуацию..."
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                  >
                    Отправить вопрос
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.open("tel:+73832359505", "_self")}
                    className="flex-1"
                  >
                    <Icon name="Phone" className="h-4 w-4 mr-2" />
                    Позвонить
                  </Button>
                </div>

                <p className="text-sm text-gray-500 text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </>
          )}
        </div>
      ) : (
        /* Если форма не показана - показываем кнопку для связи */
        <div className="border-t border-gray-200 pt-12 text-center">
          <p className="text-gray-600 mb-4">
            Если не нашли нужную услугу или есть вопросы
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => window.open("tel:+73832359505", "_self")}
              variant="outline"
              className="border-gray-300 hover:border-gray-400"
            >
              <Icon name="Phone" className="h-4 w-4 mr-2" />
              Позвонить
            </Button>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              <Icon name="MessageCircle" className="h-4 w-4 mr-2" />
              Задать вопрос юристу
            </Button>
          </div>

          <div className="mt-6">
            <div className="text-lg font-medium text-gray-900">
              +7 (383) 235-95-05
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Новосибирск, городской
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
