"use client";

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";
import { CONTACTS } from "@/config/contacts";

export default function FloodDamagePage() {
  // ============ СОСТОЯНИЯ ============
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
    damageType: "neighbors",
  });

  const [calculator, setCalculator] = useState({
    repairCost: 150000,
    hasDocuments: "full",
  });

  const [timeLeft, setTimeLeft] = useState(900); // 15 минут
  const [checklist, setChecklist] = useState<number[]>([1, 2, 3]);
  const [activeTab, setActiveTab] = useState("compensation");

  // ============ ТАЙМЕР ============
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // ============ РАСЧЕТ КОМПЕНСАЦИИ ============
  const calculateCompensation = () => {
    const base = calculator.repairCost;
    const penalty = base * 0.5;
    const moral = Math.min(base * 0.3, 50000);
    const total = base + penalty + moral;

    let chance = 90;
    if (calculator.hasDocuments === "partial") chance = 75;
    if (calculator.hasDocuments === "none") chance = 60;

    return { base, penalty, moral, total, chance };
  };

  const compensation = calculateCompensation();

  // ============ ОБРАБОТЧИКИ ============
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && (window as any).ym) {
      (window as any).ym(106063131, "reachGoal", "flood_form_submit");
    }
    console.log("Форма отправлена:", formData);
    alert("Спасибо! Юрист свяжется с вами в течение " + CONTACTS.responseTime);
  };

  const handleChecklistChange = (id: number, checked: boolean) => {
    if (checked) {
      setChecklist([...checklist, id]);
    } else {
      setChecklist(checklist.filter((item) => item !== id));
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Здравствуйте! Нужна консультация по затоплению квартиры в Новосибирске.`;
    const url = `https://wa.me/${CONTACTS.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // ============ ДАННЫЕ ДЛЯ НОВОСИБИРСКА ============
  const checklistItems = [
    {
      id: 1,
      text: "Остановить протечку (уведомить соседей/УК)",
      critical: true,
    },
    {
      id: 2,
      text: "Сфотографировать и снять на видео весь ущерб",
      critical: true,
    },
    {
      id: 3,
      text: "Вызвать представителя УК для составления акта",
      critical: true,
    },
    {
      id: 4,
      text: "Внести в акт максимально подробное описание",
      critical: false,
    },
    { id: 5, text: "Получить подпись виновника на акте", critical: true },
    {
      id: 6,
      text: "Не начинать ремонт до проведения экспертизы",
      critical: true,
    },
  ];

  const reviews = [
    {
      name: "Анна К.",
      district: "Октябрьский район",
      amount: "450 000 ₽",
      text: "Соседи затопили новую кухню. Юристы взыскали 300 тыс. на ремонт + штраф 150 тыс. Судебные издержки также взыскали с виновника.",
    },
    {
      name: "Сергей М.",
      district: "Ленинский район",
      amount: "187 000 ₽",
      text: "УК отказалась платить за прорвавший стояк. Специалисты подготовили претензию и добились выплаты. Мои расходы на юриста полностью компенсировались.",
    },
    {
      name: "Ольга В.",
      district: "Дзержинский район",
      amount: "620 000 ₽",
      text: "После залива испортился дорогой ремонт. Виновник тянул время. Подключили юриста, который подал иск в Кировский суд и выиграл дело.",
    },
  ];

  const faqItems = [
    {
      question: "Почему консультация и работа бесплатные для меня?",
      answer: `Это НЕ бесплатно в абсолютном смысле. Мы работаем по модели "без предоплаты".\n\n• ВСЕ расходы на юриста взыскиваются с виновника по решению суда\n• Вы получаете свою компенсацию в полном объеме\n• Наши гонорары оплачивает проигравшая сторона\n\nТаким образом, для вас работа юриста действительно бесплатна — все издержки ложатся на виновника.`,
    },
    {
      question: "Какие именно расходы взыскиваются с виновника?",
      answer:
        "По решению суда Новосибирска с виновника взыскивается:\n\n• Гонорар юриста (по тарифу РКА или договору)\n• Стоимость экспертизы ущерба\n• Судебные расходы (госпошлина, почтовые расходы)\n• Услуги оценщика\n• Иные издержки, связанные с делом\n\nВсе это прибавляется к основной сумме ущерба, штрафу 50% и моральному вреду.",
    },
    {
      question: "Что делать, если виновник — управляющая компания?",
      answer:
        "В Новосибирске мы имеем успешную практику взыскания с УК. Они несут ответственность за протечки из общедомовых коммуникаций. Мы знаем специфику работы с новосибирскими УК и какие суды (районные, арбитраж) наиболее эффективны для таких дел.",
    },
    {
      question: "Как долго длится взыскание ущерба в Новосибирске?",
      answer:
        "Средние сроки по Новосибирску:\n\n• Досудебное урегулирование — 1-2 месяца\n• Судебный процесс в районном суде — 3-4 месяца\n• Исполнительное производство — 1-3 месяца\n\nУскоряем процесс за счет знания специфики новосибирских судов (Кировский, Ленинский, Октябрьский и др.).",
    },
    {
      question: "Что если виновник не платит после решения суда?",
      answer:
        "Мы ведем дело до фактического получения денег:\n\n1. Подаем заявление приставам\n2. Контролируем работу ФССП\n3. При необходимости — арест счетов, имущества\n4. Работаем с банком должника\n\nНаша задача — не просто выиграть дело, а гарантировать вам реальное получение денег.",
    },
  ];

  const stats = [
    { value: "8+", label: "лет практики в Новосибирске", icon: "Calendar" },
    { value: "42 млн+", label: "взыскано для клиентов", icon: "DollarSign" },
    { value: "97%", label: "успешных дел", icon: "TrendingUp" },
    { value: "287+", label: "решенных случаев", icon: "Users" },
  ];

  const districts = [
    "Центральный",
    "Железнодорожный",
    "Заельцовский",
    "Калининский",
    "Кировский",
    "Ленинский",
    "Октябрьский",
    "Первомайский",
    "Советский",
    "Дзержинский",
  ];

  return (
    <>
      <Helmet>
        <title>
          Юрист по заливу квартиры в Новосибирске | Взыскание ущерба + штраф 50%
        </title>
        <meta
          name="description"
          content={`Затопили соседи в Новосибирске? Взыщем ущерб за ремонт + штраф 50% + моральный вред + судебные издержки. БЕЗ ваших расходов — все взыскивается с виновника. ${CONTACTS.workingHours}. Звоните: ${CONTACTS.phoneFormatted}`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: "Юрист по заливу квартиры в Новосибирске",
            description:
              "Взыскание ущерба от потопа. Без ваших расходов — все издержки взыскиваются с виновника.",
            areaServed: {
              "@type": "City",
              name: "Новосибирск",
              containsPlace: districts.map((district) => ({
                "@type": "AdministrativeArea",
                name: district + " район",
              })),
            },
            provider: {
              "@type": "Organization",
              name: "ЮрСервис НСК",
              telephone: CONTACTS.phone,
              openingHours: CONTACTS.workingHours,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Новосибирск",
                streetAddress: "ул. Ленина, д. 3",
              },
            },
          })}
        </script>
      </Helmet>

      {/* ============ 1. HERO С КЛЮЧЕВЫМ ПРЕИМУЩЕСТВОМ ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-red-100 text-red-800 border-red-200 text-lg">
                <Icon name="Zap" className="h-5 w-5 mr-2" />
                РАБОТАЕМ БЕЗ ВАШИХ РАСХОДОВ
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Затопили квартиру в{" "}
                <span className="text-primary">Новосибирске</span>?
              </h1>

              <p className="text-2xl md:text-3xl font-bold text-primary mb-8">
                Вернем ущерб + штраф 50% + моральный вред +{" "}
                <span className="text-red-600">все издержки с виновника</span>
              </p>

              <div className="space-y-4 mb-10 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3">
                  <Icon name="CheckCircle" className="h-6 w-6 text-green-500" />
                  <span className="text-lg">
                    Юрист работает <strong>без ваших расходов</strong> — гонорар
                    взыскивается с виновника
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Icon name="CheckCircle" className="h-6 w-6 text-green-500" />
                  <span className="text-lg">
                    Опыт с 2016 года во всех районных судах Новосибирска
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Icon name="CheckCircle" className="h-6 w-6 text-green-500" />
                  <span className="text-lg">
                    Знаем специфику каждой УК и всех судебных участков
                  </span>
                </div>
              </div>

              {/* Финансовая модель - ключевой акцент */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Честная финансовая модель
                    </h3>
                    <p className="text-gray-700">
                      <strong>Вы ничего не платите</strong> — все расходы на
                      юриста, экспертизу и суд мы взыскиваем с виновника по
                      решению суда.
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-800 font-bold px-6 py-3 rounded-lg">
                    БЕЗ ВАШИХ ВЛОЖЕНИЙ
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Левая часть - контакты */}
              <div className="space-y-8">
                <Card className="border-2 border-primary/20 shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-center mb-6">
                      Консультация юриста по заливу
                    </h3>

                    {/* Основной телефон */}
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-primary/20 p-3 rounded-full">
                          <Icon name="Phone" className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Бесплатный звонок юристу
                          </p>
                          <a
                            href={`tel:${CONTACTS.phone}`}
                            className="text-3xl font-bold text-gray-900 hover:text-primary transition-colors"
                            onClick={() =>
                              (window as any).ym?.(
                                106063131,
                                "reachGoal",
                                "flood_hero_phone",
                              )
                            }
                          >
                            {CONTACTS.phoneFormatted}
                          </a>
                        </div>
                      </div>
                      <p className="text-center text-gray-600 text-sm">
                        {CONTACTS.workingHours}
                      </p>
                    </div>

                    <Separator className="my-6" />

                    {/* Районы Новосибирска */}
                    <div className="mb-6">
                      <h4 className="font-bold text-lg text-center mb-3">
                        Работаем во всех районах:
                      </h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {districts.slice(0, 6).map((district) => (
                          <Badge
                            key={district}
                            variant="outline"
                            className="text-sm"
                          >
                            {district}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator className="my-6" />

                    {/* WhatsApp */}
                    <div className="text-center">
                      <Button
                        onClick={handleWhatsAppClick}
                        className="w-full h-14 bg-green-600 hover:bg-green-700"
                      >
                        <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                        Написать в WhatsApp
                      </Button>
                      <p className="text-sm text-gray-600 mt-2">
                        Ответим в течение {CONTACTS.responseTime}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Статистика */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, idx) => (
                    <Card
                      key={idx}
                      className="text-center border-0 shadow-lg bg-white"
                    >
                      <CardContent className="p-4">
                        <p className="text-2xl md:text-3xl font-black text-primary mb-1">
                          {stat.value}
                        </p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Правая часть - форма */}
              <Card className="shadow-2xl border-0 rounded-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">
                      Бесплатная консультация юриста
                    </h3>
                    <Badge className="bg-green-100 text-green-800">
                      <Icon name="Shield" className="h-4 w-4 mr-1" />
                      Без обязательств • Конфиденциально
                    </Badge>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ваше имя *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Иван Иванов"
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder={CONTACTS.phoneFormatted}
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Опишите ситуацию *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Пример: Затопили соседи сверху в Кировском районе, повреждены потолок, стены, техника. Составили акт с УК."
                        required
                        className="min-h-[120px]"
                      />
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Icon
                          name="Info"
                          className="h-5 w-5 text-blue-600 mt-0.5"
                        />
                        <p className="text-sm text-gray-700">
                          <strong>Важно:</strong> Консультация бесплатна. Если
                          решите продолжить работу, все расходы на юриста будут
                          взысканы с виновника через суд.
                        </p>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-14 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-lg"
                    >
                      <Icon name="MessageSquare" className="h-5 w-5 mr-2" />
                      Получить бесплатную консультацию
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных
                      данных
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. КАК ЭТО РАБОТАЕТ - ФИНАНСОВАЯ МОДЕЛЬ ============ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Почему для вас это{" "}
                <span className="text-green-600">бесплатно</span>?
              </h2>
              <p className="text-xl text-gray-600">
                Честная модель работы, где все расходы несет виновник
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-2 border-green-200">
                <CardContent className="p-8">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon
                      name="FileText"
                      className="h-10 w-10 text-green-600"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Вы подаете заявку</h3>
                  <p className="text-gray-600">
                    Бесплатная консультация, анализ документов, оценка
                    перспектив дела
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 border-blue-200">
                <CardContent className="p-8">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="Scale" className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Мы ведем дело</h3>
                  <p className="text-gray-600">
                    Экспертиза, претензия, суд, исполнительное производство —
                    полный цикл
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 border-green-200">
                <CardContent className="p-8">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon
                      name="DollarSign"
                      className="h-10 w-10 text-green-600"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    Вы получаете деньги
                  </h3>
                  <p className="text-gray-600">
                    Все расходы взыскиваются с виновника. Вы платите только
                    после получения компенсации
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Схема взыскания */}
            <Card className="mt-12 border-0 shadow-xl bg-gradient-to-r from-blue-50 to-gray-50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-center mb-8">
                  Что взыскивается с виновника по решению суда:
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: "Ущерб за ремонт", amount: "100%", color: "blue" },
                    { title: "Штраф 50%", amount: "+50%", color: "green" },
                    {
                      title: "Гонорар юриста",
                      amount: "+100%",
                      color: "purple",
                    },
                    { title: "Все издержки", amount: "+100%", color: "orange" },
                  ].map((item, idx) => (
                    <div key={idx} className="text-center">
                      <div
                        className={`bg-${item.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <span
                          className={`text-2xl font-bold text-${item.color}-600`}
                        >
                          {item.amount}
                        </span>
                      </div>
                      <p className="font-bold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">
                        взыскивается с виновника
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-white border border-gray-200 rounded-lg">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        Итог для вас:
                      </h4>
                      <p className="text-gray-700">
                        Вы получаете полную компенсацию ущерба плюс штраф 50%.
                        <strong>
                          {" "}
                          Все расходы на юриста оплачивает виновник.
                        </strong>
                      </p>
                    </div>
                    <Badge className="bg-green-600 text-white text-lg px-6 py-3">
                      НУЛЕВЫЕ РАСХОДЫ
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ============ 3. КАЛЬКУЛЯТОР КОМПЕНСАЦИИ ============ */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Сколько можно взыскать с виновника в Новосибирске?
              </h2>
              <p className="text-xl text-gray-600">
                Рассчитайте полную сумму компенсации, включая судебные издержки
              </p>
            </div>

            <Card className="bg-white shadow-2xl">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-10">
                  {/* Левая часть - калькулятор */}
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-lg font-semibold">
                          Ущерб от залива:
                        </Label>
                        <Badge variant="outline" className="text-lg font-bold">
                          {calculator.repairCost.toLocaleString("ru-RU")} ₽
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>50 000 ₽</span>
                          <span>Средний ущерб в НСК</span>
                          <span>1 000 000 ₽</span>
                        </div>
                        <input
                          type="range"
                          min="50000"
                          max="1000000"
                          step="10000"
                          value={calculator.repairCost}
                          onChange={(e) =>
                            setCalculator({
                              ...calculator,
                              repairCost: parseInt(e.target.value),
                            })
                          }
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Незначительный</span>
                          <span>Катастрофический</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">
                        Доказательства:
                      </Label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          {
                            id: "full",
                            label: "Полные",
                            desc: "Акт УК, фото, чеки",
                          },
                          {
                            id: "partial",
                            label: "Частичные",
                            desc: "Только фото",
                          },
                          { id: "none", label: "Нет", desc: "Поможем собрать" },
                        ].map((option) => (
                          <Button
                            key={option.id}
                            type="button"
                            variant={
                              calculator.hasDocuments === option.id
                                ? "default"
                                : "outline"
                            }
                            className={`h-auto py-4 flex-col ${
                              calculator.hasDocuments === option.id
                                ? "bg-primary text-white"
                                : "bg-gray-50"
                            }`}
                            onClick={() =>
                              setCalculator({
                                ...calculator,
                                hasDocuments: option.id,
                              })
                            }
                          >
                            <span className="font-bold">{option.label}</span>
                            <span className="text-xs mt-1">{option.desc}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="w-full h-14 text-lg bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                      onClick={() => {
                        const phoneUrl = `tel:${CONTACTS.phone}`;
                        window.location.href = phoneUrl;
                        (window as any).ym?.(
                          106063131,
                          "reachGoal",
                          "calculator_call",
                        );
                      }}
                    >
                      <Icon name="Phone" className="h-5 w-5 mr-2" />
                      Обсудить расчет с юристом
                    </Button>
                  </div>

                  {/* Правая часть - результаты */}
                  <div className="bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-6 text-center">
                      Ваша компенсация
                    </h3>

                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-white/20">
                        <span className="text-gray-300">
                          Вероятность успеха:
                        </span>
                        <Badge className="text-lg bg-green-600">
                          {compensation.chance}%
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Возмещение ремонта:</span>
                          <span className="font-bold">
                            {compensation.base.toLocaleString("ru-RU")} ₽
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Штраф 50% (ЗЗПП):</span>
                          <span className="font-bold text-green-300">
                            +{compensation.penalty.toLocaleString("ru-RU")} ₽
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Моральный вред:</span>
                          <span className="font-bold">
                            +{compensation.moral.toLocaleString("ru-RU")} ₽
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-white/10">
                          <span>Судебные издержки*:</span>
                          <span className="font-bold text-blue-300">
                            +30-50%
                          </span>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex justify-between text-2xl font-bold pt-4 border-t border-white/20">
                          <span>ИТОГО к получению:</span>
                          <span className="text-green-300">
                            {(compensation.total * 1.3).toLocaleString("ru-RU")}{" "}
                            ₽
                          </span>
                        </div>
                      </div>

                      <div className="mt-8 p-4 bg-white/10 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Icon
                            name="Info"
                            className="h-5 w-5 text-amber-300 mt-0.5"
                          />
                          <div>
                            <p className="text-sm mb-1">
                              <strong>*Судебные издержки</strong> (гонорар
                              юриста, экспертиза, госпошлина) взыскиваются с
                              виновника дополнительно.
                            </p>
                            <p className="text-xs text-white/70">
                              *Примерный расчет. Точную сумму определит
                              экспертиза и суд.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ============ 4. ОТЗЫВЫ ============ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Реальные дела по заливам в Новосибирске
            </h2>
            <p className="text-xl text-gray-600">
              Более 280 успешно решенных дел во всех районах города
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <Card
                key={idx}
                className="hover:shadow-xl transition-shadow border-0 shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-bold text-gray-900">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.district}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 font-bold">
                      {review.amount}
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-6">{review.text}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        className="h-4 w-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">5.0</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg border border-blue-200">
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">
                  Хотите такую же результативность?
                </p>
                <p className="text-gray-600">
                  Первая консультация бесплатно. Все расходы — на виновнике.
                </p>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                onClick={() =>
                  document
                    .getElementById("final-cta")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Icon name="MessageSquare" className="h-5 w-5 mr-2" />
                Начать бесплатно
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. FAQ С ФИНАНСОВЫМ АКЦЕНТОМ ============ */}
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Вопросы по финансированию дела
            </h2>
            <p className="text-xl text-gray-600">
              Как именно работает модель "без ваших расходов"
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="bg-white border rounded-lg"
              >
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline hover:bg-gray-50">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-700 whitespace-pre-line">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <Card className="border-2 border-green-200 bg-green-50 inline-block">
              <CardContent className="p-6">
                <p className="text-lg font-bold text-gray-900 mb-4">
                  Остались вопросы по финансированию?
                </p>
                <p className="text-gray-700 mb-6">
                  Юрист подробно объяснит, какие именно расходы и как будут
                  взысканы с виновника
                </p>
                <Button
                  size="lg"
                  onClick={() => {
                    const phoneUrl = `tel:${CONTACTS.phone}`;
                    window.location.href = phoneUrl;
                  }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Icon name="Phone" className="h-5 w-5 mr-2" />
                  Позвонить за разъяснениями
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ============ 6. ФИНАЛЬНЫЙ CTA ============ */}
      <section
        className="py-16 bg-gradient-to-r from-gray-900 to-blue-900 text-white"
        id="final-cta"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-red-500 text-white border-0">
              <Icon name="Clock" className="h-4 w-4 mr-2" />
              ДО КОНЦА АКЦИИ: {formatTime(timeLeft)}
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Не упустите шанс взыскать ущерб{" "}
              <span className="text-green-300">без своих расходов</span>
            </h2>

            <p className="text-xl mb-8 text-white/90">
              С каждым днем доказательства теряют силу. Чем раньше начнете — тем
              проще взыскать полную сумму.
              <br />
              <strong>Все расходы на юриста будут взысканы с виновника.</strong>
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-500/20 p-2 rounded-full">
                      <Icon
                        name="CheckCircle"
                        className="h-6 w-6 text-green-400"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Консультация юриста</p>
                      <p className="text-white/80">
                        Анализ документов, оценка перспектив
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={`tel:${CONTACTS.phone}`}
                      className="block text-2xl font-bold hover:text-green-300 transition-colors"
                      onClick={() =>
                        (window as any).ym?.(
                          106063131,
                          "reachGoal",
                          "final_phone",
                        )
                      }
                    >
                      {CONTACTS.phoneFormatted}
                    </a>
                    <p className="text-white/70">{CONTACTS.workingHours}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg">
                    <p className="font-bold text-lg mb-2">Напоминаем:</p>
                    <p className="text-white/90 text-sm">
                      Консультация бесплатна. Если продолжим работу — все
                      расходы взыскиваются с виновника через суд.
                    </p>
                  </div>

                  <Button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-600 hover:bg-green-700 h-12"
                  >
                    <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                    Написать в WhatsApp
                  </Button>
                </div>
              </div>
            </div>

            <p className="text-white/70 text-sm">
              ЮрСервис НСК • Новосибирск • Опыт с 2016 года • Работаем во всех
              районных судах
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
