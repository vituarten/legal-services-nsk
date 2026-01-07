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
    alert("Спасибо! Юрист свяжется с вами в течение 15 минут.");
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
    const url = `https://wa.me/79994523500?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // ============ КОНСТАНТЫ ДЛЯ НОВОСИБИРСКА ============
  const CITY_PHONE = "+7 (383) 235-95-05";
  const CITY_PHONE_RAW = "+738322359505";
  const WHATSAPP_NUMBER = "79994523500";

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
      text: "Пыталась решить проблему с соседями сама месяц — безрезультатно. Юристы за 2 недели подготовили претензию, провели переговоры и взыскали полную сумму. Главное — я ничего не платила заранее!",
    },
    {
      name: "Сергей М.",
      district: "Ленинский район",
      amount: "187 000 ₽",
      text: "Сначала думал справлюсь сам. Составил претензию по шаблону из интернета — УК проигнорировала. Специалисты переделали документы с учетом нюансов новосибирских судов, и УК выплатила добровольно.",
    },
    {
      name: "Ольга В.",
      district: "Дзержинский район",
      amount: "620 000 ₽",
      text: "Виновник обещал всё уладить «по-хорошему». Через 3 месяца поняла, что меня водят за нос. Юрист сразу подал иск в Кировский суд. Получила не только ущерб, но и штраф 50%, и компенсацию морального вреда.",
    },
  ];

  const faqItems = [
    {
      question: "Почему консультация бесплатная, а работа — без моих расходов?",
      answer: `Консультация — это знакомство и анализ вашего случая. Если дело перспективное, мы берем его в работу.\n\nКЛЮЧЕВОЕ: ВСЕ НАШИ УСЛУГИ (гонорар, экспертиза, судебные расходы) мы включаем в иск и ВЗЫСКИВАЕМ С ВИНОВНИКА по решению суда.\n\nВы получаете компенсацию ущерба в полном объеме. Все издержки оплачивает проигравшая сторона.`,
    },
    {
      question: "А если попробовать решить вопрос самостоятельно?",
      answer:
        "По нашей статистике, в 80% случаев самостоятельные попытки заканчиваются:\n\n• Неправильно составленным актом (виновник оспаривает)\n• Пропуском юридических сроков\n• Заниженной суммой ущерба (нет экспертизы)\n• Игнорированием претензии\n• Потерей времени (3-6 месяцев переписки)\n\nВ итоге люди все равно обращаются к юристу, но с уже усугубленной ситуацией.",
    },
    {
      question: "Сколько времени экономит работа с юристом?",
      answer:
        "Средние сроки по Новосибирску:\n\n• Самостоятельно: 4-8 месяцев переписки, часто без результата\n• С нами: 1-2 месяца — досудебное урегулирование, 3-4 месяца — суд (при необходимости)\n\nМы знаем «короткие» процедуры в судах каждого района НСК и как эффективно взаимодействовать с УК.",
    },
    {
      question: "Какие районы Новосибирска вы охватываете?",
      answer:
        "Работаем во всех районах: Центральный, Железнодорожный, Заельцовский, Калининский, Кировский, Ленинский, Октябрьский, Первомайский, Советский, Дзержинский. Знаем специфику судов и УК в каждом районе.",
    },
  ];

  const stats = [
    { value: "8+", label: "лет практики в Новосибирске", icon: "Calendar" },
    { value: "42 млн+", label: "взыскано для клиентов", icon: "DollarSign" },
    { value: "94%", label: "дел решаются досудебно", icon: "TrendingUp" },
    { value: "0 ₽", label: "предоплата с клиента", icon: "Shield" },
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
          content={`Затопили соседи в Новосибирске? Профессиональный юрист по заливам. Взыщем ущерб за ремонт + штраф 50% + моральный вред. Работаем БЕЗ ВАШИХ РАСХОДОВ — все издержки взыскиваем с виновника. Городской: ${CITY_PHONE}`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: "Юрист по заливу квартиры в Новосибирске",
            description:
              "Взыскание ущерба от потопа. Без предоплаты — расходы взыскиваются с виновника.",
            areaServed: {
              "@type": "City",
              name: "Новосибирск",
              containsPlace: districts.map((district) => ({
                "@type": "City",
                name: `${district} район Новосибирска`,
              })),
            },
            provider: {
              "@type": "Organization",
              name: "ЮрСервис НСК",
              telephone: CITY_PHONE_RAW,
              openingHours: "Пн-Пт 9:00-20:00, Сб 10:00-18:00",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Новосибирск",
                streetAddress: "ул. Ленина, д. 3",
              },
            },
          })}
        </script>
      </Helmet>

      {/* ============ 1. HERO: ПРОБЛЕМА И РЕШЕНИЕ ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200 text-lg">
                <Icon name="MapPin" className="h-5 w-5 mr-2" />
                Новосибирск и область • Работаем с 2016 года
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Затопили квартиру в{" "}
                <span className="text-primary">Новосибирске</span>?
              </h1>

              <p className="text-2xl md:text-3xl font-bold text-primary mb-8">
                Не знаете, как взыскать ущерб с виновника?
              </p>

              <div className="space-y-4 mb-10 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3">
                  <Icon name="HelpCircle" className="h-6 w-6 text-blue-500" />
                  <span className="text-lg">
                    Составляли акт, но сосед игнорирует?
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Icon name="HelpCircle" className="h-6 w-6 text-blue-500" />
                  <span className="text-lg">
                    УК отказывается признавать свою вину?
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Icon name="HelpCircle" className="h-6 w-6 text-blue-500" />
                  <span className="text-lg">
                    Боитесь, что ремонт придется делать за свой счет?
                  </span>
                </div>
              </div>

              {/* Решение - крупно и ясно */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Есть решение:
                    </h3>
                    <p className="text-gray-700 text-lg">
                      <strong>
                        Профессиональный юрист возьмет все на себя
                      </strong>{" "}
                      и взыщет с виновника: ущерб за ремонт + штраф 50% +
                      моральный вред + все судебные издержки.
                    </p>
                  </div>
                  <div className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg text-xl">
                    БЕЗ ВАШИХ ВЛОЖЕНИЙ
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Левая часть - контакты и доводы */}
              <div className="space-y-8">
                <Card className="border-2 border-primary/20 shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-center mb-6">
                      Проконсультируйтесь с юристом
                    </h3>

                    {/* Городской телефон - крупно */}
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-primary/20 p-3 rounded-full">
                          <Icon name="Phone" className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Городской телефон в Новосибирске
                          </p>
                          <a
                            href={`tel:${CITY_PHONE_RAW}`}
                            className="text-3xl font-bold text-gray-900 hover:text-primary transition-colors"
                            onClick={() =>
                              (window as any).ym?.(
                                106063131,
                                "reachGoal",
                                "flood_city_phone",
                              )
                            }
                          >
                            {CITY_PHONE}
                          </a>
                        </div>
                      </div>
                      <p className="text-center text-gray-600 text-sm">
                        Пн-Пт 9:00-20:00, Сб 10:00-18:00
                      </p>
                    </div>

                    <Separator className="my-6" />

                    {/* Быстрые доводы */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Icon
                          name="CheckCircle"
                          className="h-5 w-5 text-green-500 mt-0.5"
                        />
                        <div>
                          <p className="font-bold">
                            Бесплатный анализ вашего случая
                          </p>
                          <p className="text-sm text-gray-600">
                            Скажем, можно ли взыскать ущерб и в каком размере
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon
                          name="CheckCircle"
                          className="h-5 w-5 text-green-500 mt-0.5"
                        />
                        <div>
                          <p className="font-bold">
                            Прозрачная финансовая модель
                          </p>
                          <p className="text-sm text-gray-600">
                            Все расходы на юриста взыскиваются с виновника
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon
                          name="CheckCircle"
                          className="h-5 w-5 text-green-500 mt-0.5"
                        />
                        <div>
                          <p className="font-bold">Знание местной специфики</p>
                          <p className="text-sm text-gray-600">
                            Работали во всех районных судах Новосибирска
                          </p>
                        </div>
                      </div>
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
                      Получите бесплатный анализ вашей ситуации
                    </h3>
                    <p className="text-gray-600">
                      Ответим за 15 минут. Скажем, какие шаги предпринять и
                      какую сумму можно взыскать.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Как к вам обращаться? *</Label>
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
                      <Label htmlFor="phone">Телефон для связи *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder={CITY_PHONE}
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Что произошло? *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Например: 10 марта затопили соседи сверху в Кировском районе. Поврежден натяжной потолок, стены, паркет. Составили акт с УК."
                        required
                        className="min-h-[120px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-14 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-lg"
                    >
                      <Icon name="MessageSquare" className="h-5 w-5 mr-2" />
                      Получить бесплатный анализ от юриста
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Консультация ни к чему не обязывает. Мы соблюдаем
                      конфиденциальность.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. ЧЕК-ЛИСТ: ЧТО ДЕЛАТЬ ПРЯМО СЕЙЧАС ============ */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Что делать в первые часы после залива?
            </h2>
            <p className="text-xl text-gray-600">
              Правильные действия сейчас увеличат вашу компенсацию на 30-50% и
              упростят взыскание
            </p>
          </div>

          <Card className="shadow-xl border-2 border-blue-200">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-10">
                {/* Левая часть - чек-лист */}
                <div>
                  <h3 className="text-2xl font-bold mb-6">
                    Пошаговый план действий:
                  </h3>
                  <div className="space-y-4">
                    {checklistItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center h-7">
                          <Checkbox
                            id={`item-${item.id}`}
                            checked={checklist.includes(item.id)}
                            onCheckedChange={(checked) =>
                              handleChecklistChange(item.id, checked as boolean)
                            }
                            className="h-5 w-5"
                          />
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor={`item-${item.id}`}
                            className="text-lg font-medium leading-none cursor-pointer"
                          >
                            {item.text}
                          </label>
                        </div>
                        {item.critical && (
                          <Badge variant="destructive" className="ml-2">
                            ВАЖНО
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Правая часть - предупреждение об ошибках */}
                <div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                    <h4 className="text-xl font-bold text-red-800 mb-4">
                      <Icon
                        name="AlertTriangle"
                        className="h-5 w-5 inline mr-2"
                      />
                      3 фатальные ошибки, которые совершают в Новосибирске:
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Icon
                          name="X"
                          className="h-5 w-5 text-red-500 mt-0.5"
                        />
                        <span>
                          Начинают ремонт до экспертизы — теряют доказательства
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon
                          name="X"
                          className="h-5 w-5 text-red-500 mt-0.5"
                        />
                        <span>
                          Составляют акт без важных формулировок — виновник
                          оспаривает
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon
                          name="X"
                          className="h-5 w-5 text-red-500 mt-0.5"
                        />
                        <span>
                          Теряют время на переписку — пропускают сроки обращения
                          в суд
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-blue-800 mb-4">
                      <Icon name="Lightbulb" className="h-5 w-5 inline mr-2" />
                      Профессиональный подход дает:
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Icon
                          name="Check"
                          className="h-5 w-5 text-green-500 mt-0.5"
                        />
                        <span>Правильный акт, который нельзя оспорить</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon
                          name="Check"
                          className="h-5 w-5 text-green-500 mt-0.5"
                        />
                        <span>Официальную экспертизу ущерба</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon
                          name="Check"
                          className="h-5 w-5 text-green-500 mt-0.5"
                        />
                        <span>Юридически грамотную претензию</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-gradient-to-r from-primary/10 to-blue-100 rounded-xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Запутались или хотите сделать всё правильно?
                    </h3>
                    <p className="text-gray-700">
                      Юрист проконсультирует по телефону, как составить акт, что
                      фотографировать, и даст образцы документов для вашего
                      района Новосибирска.
                    </p>
                  </div>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                    onClick={() => {
                      const phoneUrl = `tel:${CITY_PHONE_RAW}`;
                      window.location.href = phoneUrl;
                    }}
                  >
                    <Icon name="Phone" className="h-5 w-5 mr-2" />
                    {CITY_PHONE}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ============ 3. КАЛЬКУЛЯТОР: ПОКАЗАТЬ ВЫГОДУ ============ */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Сколько можно взыскать с виновника?
              </h2>
              <p className="text-xl text-gray-600">
                Рассчитайте примерную сумму. Сравните: самостоятельное решение
                vs. с юристом
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
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">
                        Ваши доказательства:
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
                          {
                            id: "none",
                            label: "Почти нет",
                            desc: "Нужна помощь",
                          },
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

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Icon
                          name="AlertTriangle"
                          className="h-5 w-5 text-amber-600 mt-0.5"
                        />
                        <div>
                          <p className="font-bold text-amber-800 mb-1">
                            Самостоятельное взыскание:
                          </p>
                          <p className="text-sm text-amber-700">
                            В 80% случаев сумма ущерба занижается, штраф 50% не
                            взыскивается, процесс затягивается на месяцы.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full h-14 text-lg bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                      onClick={() => {
                        const phoneUrl = `tel:${CITY_PHONE_RAW}`;
                        window.location.href = phoneUrl;
                        (window as any).ym?.(
                          106063131,
                          "reachGoal",
                          "calculator_call",
                        );
                      }}
                    >
                      <Icon name="Calculator" className="h-5 w-5 mr-2" />
                      Обсудить точный расчет с юристом
                    </Button>
                  </div>

                  {/* Правая часть - результаты и сравнение */}
                  <div>
                    <Tabs
                      value={activeTab}
                      onValueChange={setActiveTab}
                      className="w-full"
                    >
                      <TabsList className="grid grid-cols-2 mb-6">
                        <TabsTrigger value="compensation">
                          С юристом
                        </TabsTrigger>
                        <TabsTrigger value="alone">Самостоятельно</TabsTrigger>
                      </TabsList>

                      <TabsContent value="compensation" className="space-y-6">
                        <div className="bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-2xl p-8">
                          <h3 className="text-2xl font-bold mb-6 text-center">
                            Ваша компенсация с юристом
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
                                  +
                                  {compensation.penalty.toLocaleString("ru-RU")}{" "}
                                  ₽
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Моральный вред:</span>
                                <span className="font-bold">
                                  +{compensation.moral.toLocaleString("ru-RU")}{" "}
                                  ₽
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
                                  {(compensation.total * 1.3).toLocaleString(
                                    "ru-RU",
                                  )}{" "}
                                  ₽
                                </span>
                              </div>
                            </div>

                            <div className="mt-8 p-4 bg-white/10 rounded-lg">
                              <p className="text-sm">
                                <strong>*Издержки</strong> (гонорар юриста,
                                экспертиза, госпошлина) взыскиваются с виновника
                                дополнительно.
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="alone" className="space-y-6">
                        <div className="bg-gradient-to-br from-gray-300 to-gray-400 text-white rounded-2xl p-8">
                          <h3 className="text-2xl font-bold mb-6 text-center">
                            При самостоятельном решении
                          </h3>

                          <div className="space-y-6">
                            <div className="flex justify-between items-center pb-4 border-b border-white/20">
                              <span className="text-gray-100">
                                Вероятность успеха:
                              </span>
                              <Badge className="text-lg bg-red-600">
                                20-40%
                              </Badge>
                            </div>

                            <div className="space-y-4">
                              <div className="flex justify-between">
                                <span>Возмещение ремонта:</span>
                                <span className="font-bold">
                                  {Math.floor(
                                    compensation.base * 0.6,
                                  ).toLocaleString("ru-RU")}{" "}
                                  ₽
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Штраф 50% (ЗЗПП):</span>
                                <span className="font-bold text-red-300">
                                  не взыскивается
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Моральный вред:</span>
                                <span className="font-bold text-red-300">
                                  редко взыскивается
                                </span>
                              </div>
                              <div className="flex justify-between pt-2 border-t border-white/10">
                                <span>Ваши расходы на эксперта:</span>
                                <span className="font-bold text-red-300">
                                  -15 000 - 30 000 ₽
                                </span>
                              </div>

                              <Separator className="my-4" />

                              <div className="flex justify-between text-2xl font-bold pt-4 border-t border-white/20">
                                <span>ИТОГО:</span>
                                <span className="text-red-300">
                                  {(
                                    compensation.base * 0.6 -
                                    20000
                                  ).toLocaleString("ru-RU")}{" "}
                                  ₽
                                </span>
                              </div>
                            </div>

                            <div className="mt-8 p-4 bg-white/10 rounded-lg">
                              <p className="text-sm">
                                <strong>Риски:</strong> ошибки в документах,
                                пропуск сроков, занижение суммы ущерба, потеря
                                времени (4-8 месяцев).
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="mt-6 text-center">
                      <p className="text-lg font-bold text-gray-900">
                        Разница:{" "}
                        <span className="text-green-600">
                          +
                          {(
                            compensation.total * 1.3 -
                            (compensation.base * 0.6 - 20000)
                          ).toLocaleString("ru-RU")}{" "}
                          ₽
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        в пользу работы с юристом
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ============ 4. ФИНАНСОВАЯ МОДЕЛЬ: ПОЧЕМУ БЕСПЛАТНО ДЛЯ КЛИЕНТА ============ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Как это работает? Почему для вас —{" "}
                <span className="text-green-600">без расходов</span>
              </h2>
              <p className="text-xl text-gray-600">
                Прозрачная модель, где все издержки несет виновник по решению
                суда
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  step: "01",
                  title: "Вы обращаетесь к нам",
                  desc: "Консультация и анализ документов — бесплатно. Оцениваем перспективы дела.",
                  icon: "MessageSquare",
                },
                {
                  step: "02",
                  title: "Мы ведем дело полностью",
                  desc: "Экспертиза, претензия, переговоры, суд, исполнительное производство.",
                  icon: "Scale",
                },
                {
                  step: "03",
                  title: "Виновник оплачивает всё",
                  desc: "По решению суда виновник возмещает ущерб, штраф 50%, моральный вред И ВСЕ НАШИ РАСХОДЫ.",
                  icon: "DollarSign",
                },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-8">
                    <div className="text-4xl font-black text-primary/30 mb-4">
                      {item.step}
                    </div>
                    <Icon
                      name={item.icon as any}
                      className="h-12 w-12 text-primary mx-auto mb-6"
                    />
                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Итог для вас:
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <Icon
                          name="CheckCircle"
                          className="h-5 w-5 text-green-600"
                        />
                        <span>
                          Вы получаете полную компенсацию ущерба + штраф 50% +
                          моральный вред
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Icon
                          name="CheckCircle"
                          className="h-5 w-5 text-green-600"
                        />
                        <span>
                          <strong>
                            Все расходы на юриста, экспертизу и суд оплачивает
                            виновник
                          </strong>
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Icon
                          name="CheckCircle"
                          className="h-5 w-5 text-green-600"
                        />
                        <span>
                          Вы не платите ничего вперед и ничем не рискуете
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <Badge className="bg-green-600 text-white text-xl px-8 py-4">
                      НУЛЕВАЯ ПРЕДОПЛАТА
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ============ 5. ОТЗЫВЫ: СОЦИАЛЬНЫЕ ДОКАЗАТЕЛЬСТВА ============ */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Клиенты из Новосибирска о работе с нами
            </h2>
            <p className="text-xl text-gray-600">
              Реальные истории тех, кто уже прошел путь от проблемы к решению
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
                  <p className="text-gray-700 mb-6 italic">"{review.text}"</p>
                  <div className="flex items-center justify-between">
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
                    <div className="text-sm text-gray-500">
                      Решено в {idx === 2 ? "суде" : "досудебном порядке"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white p-8 rounded-2xl shadow-lg border border-blue-200">
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">
                  Хотите получить такой же результат?
                </p>
                <p className="text-gray-600">
                  Первый шаг — бесплатная консультация с анализом ваших
                  документов.
                </p>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                onClick={() => {
                  const phoneUrl = `tel:${CITY_PHONE_RAW}`;
                  window.location.href = phoneUrl;
                }}
              >
                <Icon name="Phone" className="h-5 w-5 mr-2" />
                {CITY_PHONE}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. FAQ: СНЯТИЕ ПОСЛЕДНИХ ВОЗРАЖЕНИЙ ============ */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ответы на важные вопросы
            </h2>
            <p className="text-xl text-gray-600">
              То, что волнует клиентов перед обращением к юристу
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="bg-white border rounded-lg shadow-sm"
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
            <Card className="border-2 border-primary bg-gradient-to-r from-blue-50 to-cyan-50 inline-block">
              <CardContent className="p-8">
                <div className="flex flex-col items-center gap-6">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      Остались сомнения или вопросы?
                    </p>
                    <p className="text-gray-700">
                      Задайте их напрямую юристу по телефону
                    </p>
                  </div>
                  <div className="space-y-4">
                    <a
                      href={`tel:${CITY_PHONE_RAW}`}
                      className="block text-3xl font-bold text-primary hover:text-primary/80 transition-colors"
                    >
                      {CITY_PHONE}
                    </a>
                    <p className="text-sm text-gray-600">
                      Городской номер в Новосибирске
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ============ 7. ФИНАЛЬНЫЙ CTA С ТАЙМЕРОМ ============ */}
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
              Не упустите возможность взыскать ущерб{" "}
              <span className="text-green-300">без личных расходов</span>
            </h2>

            <p className="text-xl mb-8 text-white/90">
              Каждый день бездействия снижает шансы на полное взыскание.
              <br />
              Доказательства теряют силу, виновник может скрыть следы или
              продать имущество.
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
                      <p className="font-bold text-lg">
                        Бесплатный анализ документов
                      </p>
                      <p className="text-white/80">
                        Оценка перспектив вашего дела за 15 минут
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={`tel:${CITY_PHONE_RAW}`}
                      className="block text-2xl font-bold hover:text-green-300 transition-colors"
                      onClick={() =>
                        (window as any).ym?.(
                          106063131,
                          "reachGoal",
                          "final_phone",
                        )
                      }
                    >
                      {CITY_PHONE}
                    </a>
                    <p className="text-white/70">
                      Пн-Пт 9:00-20:00, Сб 10:00-18:00
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg">
                    <p className="font-bold text-lg mb-2">Что вы получите:</p>
                    <ul className="text-sm text-white/90 space-y-1">
                      <li>• Анализ ваших документов и ситуации</li>
                      <li>• Оценку суммы, которую можно взыскать</li>
                      <li>• Рекомендации по дальнейшим действиям</li>
                    </ul>
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

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {districts.slice(0, 5).map((district) => (
                <Badge
                  key={district}
                  variant="outline"
                  className="text-white border-white/30"
                >
                  {district} район
                </Badge>
              ))}
            </div>

            <p className="text-white/70 text-sm">
              ЮрСервис НСК • Новосибирск • ул. Ленина, д. 3 • Опыт с 2016 года •
              Работаем во всех районных судах
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
