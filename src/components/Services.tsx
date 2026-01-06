// src/data/services.tsx
// ВСЕ данные об услугах в одном месте

export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  slug: string; // Ссылка на страницу услуги (ОБЯЗАТЕЛЬНО!)
  category: string[]; // Категории: popular, citizens, business, realestate, bankruptcy
  price?: string; // Цена (для страницы услуг)
  duration?: string; // Сроки (для страницы услуг)
}

export const ALL_SERVICES: Service[] = [
  // ========== ПОПУЛЯРНЫЕ УСЛУГИ ==========
  {
    id: 1,
    icon: "Users",
    title: "Семейный юрист",
    description: "Развод, раздел имущества, алименты, опека",
    slug: "/family-lawyer", // ← ССЫЛКА!
    category: ["popular", "citizens"],
    price: "от 15 000₽",
    duration: "1-3 месяца",
  },
  {
    id: 2,
    icon: "TrendingDown",
    title: "Банкротство физических лиц",
    description: "Процедура банкротства для граждан, списание долгов",
    slug: "/bankruptcy-lawyer", // ← ССЫЛКА!
    category: ["popular", "bankruptcy", "citizens"],
    price: "от 50 000₽",
    duration: "6-12 месяцев",
  },
  {
    id: 3,
    icon: "Home",
    title: "Недвижимость и перепланировки",
    description: "Сделки с недвижимостью, узаконивание перепланировок",
    slug: "/real-estate-lawyer", // ← ССЫЛКА!
    category: ["popular", "realestate"],
    price: "от 20 000₽",
    duration: "1-4 месяца",
  },
  {
    id: 4,
    icon: "CreditCard",
    title: "Взыскание долгов",
    description: "Взыскание задолженности, работа с должниками",
    slug: "/debt-collection", // ← ССЫЛКА!
    category: ["popular", "business", "citizens"],
    price: "от 15 000₽",
    duration: "2-6 месяцев",
  },
  {
    id: 5,
    icon: "FileText",
    title: "Составление и анализ документов",
    description:
      "Подготовка договоров, анализ документации, правовая экспертиза",
    slug: "/document-analysis", // ← ССЫЛКА! (нужно создать страницу)
    category: ["popular", "business", "citizens"],
    price: "от 5 000₽",
    duration: "1-5 дней",
  },
  {
    id: 6,
    icon: "Shield",
    title: "Представительство и защита в суде",
    description: "Представительство интересов в судах всех инстанций",
    slug: "/court-representation", // ← ССЫЛКА! (нужно создать страницу)
    category: ["popular", "business", "citizens"],
    price: "от 25 000₽",
    duration: "3-12 месяцев",
  },
  {
    id: 7,
    icon: "ShieldCheck",
    title: "Защита прав потребителей",
    description: "Возврат некачественного товара, споры с продавцами",
    slug: "/consumer-protection", // ← ССЫЛКА!
    category: ["popular", "citizens"],
    price: "от 10 000₽",
    duration: "1-6 месяцев",
  },
  {
    id: 8,
    icon: "Car",
    title: "Автоюрист. Споры по ДТП",
    description: "Взыскание ущерба, представительство в суде по автоавариям",
    slug: "/car-lawyer", // ← ССЫЛКА!
    category: ["popular", "citizens"],
    price: "от 18 000₽",
    duration: "2-12 месяцев",
  },
  {
    id: 9,
    icon: "Building",
    title: "Споры с застройщиками",
    description: "Защита прав дольщиков, взыскание неустойки, возврат средств",
    slug: "/construction-disputes", // ← ССЫЛКА! (часть недвижимости)
    category: ["popular", "realestate", "citizens"],
    price: "от 25 000₽",
    duration: "6-18 месяцев",
  },
  {
    id: 10,
    icon: "Droplets",
    title: "Возмещение ущерба от потопов",
    description: "Взыскание ущерба от залития квартиры, оценка повреждений",
    slug: "/flood-damage", // ← ССЫЛКА!
    category: ["popular", "citizens", "realestate"],
    price: "от 15 000₽",
    duration: "1-4 месяца",
  },

  // ========== УСЛУГИ ДЛЯ ГРАЖДАН ==========
  {
    id: 11,
    icon: "Briefcase",
    title: "Трудовое право",
    description: "Защита трудовых прав, взыскание заработной платы",
    slug: "/labor-law", // ← ССЫЛКА! (нужно создать страницу)
    category: ["citizens"],
    price: "от 8 000₽",
    duration: "1-8 месяцев",
  },
  {
    id: 12,
    icon: "FileText",
    title: "Миграционные споры",
    description: "Получение РВП, ВНЖ, гражданства, защита от депортации",
    slug: "/migration", // ← ССЫЛКА!
    category: ["citizens"],
    price: "от 20 000₽",
    duration: "2-6 месяцев",
  },
  {
    id: 13,
    icon: "Shield",
    title: "Уголовная защита",
    description: "Защита в уголовных делах, представительство в суде",
    slug: "/criminal-lawyer", // ← ССЫЛКА!
    category: ["citizens"],
    price: "от 30 000₽",
    duration: "3-24 месяца",
  },

  // ========== НЕДВИЖИМОСТЬ ==========
  {
    id: 14,
    icon: "Building",
    title: "Земельное право",
    description: "Оформление земельных участков, споры по межеванию",
    slug: "/land-law", // ← ССЫЛКА! (часть недвижимости)
    category: ["realestate"],
    price: "от 15 000₽",
    duration: "1-6 месяцев",
  },

  // ========== БАНКРОТСТВО ==========
  {
    id: 15,
    icon: "Building",
    title: "Банкротство юридических лиц",
    description: "Ликвидация предприятий, банкротство организаций",
    slug: "/corporate-bankruptcy", // ← ССЫЛКА! (нужно создать страницу)
    category: ["bankruptcy"],
    price: "от 80 000₽",
    duration: "12-24 месяца",
  },
];
