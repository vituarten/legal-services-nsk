"use client";

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckboxSimple } from "@/components/ui/checkbox-simple";
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
  });

  const [calculator, setCalculator] = useState({
    repairCost: 150000,
    hasDocuments: "full",
  });

  const [timeLeft, setTimeLeft] = useState(900); // 15 минут для срочности
  const [checklist, setChecklist] = useState<number[]>([1, 2, 3]);
  const [activeTab, setActiveTab] = useState("compensation");
  const [lossCounter, setLossCounter] = useState(125000); // Счётчик растущего ущерба

  // ============ КОНСТАНТЫ ДЛЯ НОВОСИБИРСКА ============
  const CITY_PHONE = "+7 (383) 235-95-05";
  const CITY_PHONE_RAW = "+738322359505";
  const WHATSAPP_NUMBER = "79994523500";

  // ============ ЭФФЕКТЫ ============
  // Таймер обратного отсчёта
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Счётчик растущего ущерба (маркетинговый триггер)
  useEffect(() => {
    const timer = setInterval(() => {
      setLossCounter((prev) => prev + 100); // +100₽ каждые 5 сек для демо
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // ============ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ============
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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

  // ============ ОБРАБОТЧИКИ СОБЫТИЙ ============
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
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    if ((window as any).ym) {
      (window as any).ym(106063131, "reachGoal", "flood_whatsapp_click");
    }
  };

  // ============ ДАННЫЕ СТРАНИЦЫ ============
  const checklistItems = [
    {
      id: 1,
      text: "Остановить протечку (перекройте воду, уведомите соседей/УК)",
      critical: true,
      risk: "Затопление этажей ниже → регрессный иск к вам",
    },
    {
      id: 2,
      text: "Сфотографировать и снять на видео весь ущерб с разных ракурсов",
      critical: true,
      risk: "Без фото — нет доказательств. Сумму ущерба занизят на 40-60%",
    },
    {
      id: 3,
      text: "Вызвать представителя УК для составления официального акта",
      critical: true,
      risk: "Акт без представителя УК виновник легко оспорит в суде",
    },
    {
      id: 4,
      text: "Внести в акт максимально подробное описание всех повреждений",
      critical: false,
      risk: "Общие фразы — основание для занижения суммы на 30%",
    },
    {
      id: 5,
      text: "Получить подпись виновника или акт о его отказе подписывать",
      critical: true,
      risk: "Без подписи — спор о факте залива. Сроки взыскания +3 месяца",
    },
    {
      id: 6,
      text: "Не начинать ремонт до проведения независимой экспертизы",
      critical: true,
      risk: "Уничтожение доказательств → отказ в выплате",
    },
  ];

  const reviews = [
    {
      name: "Анна К., Октябрьский район",
      amount: "450 000 ₽",
      text: "Пыталась решить проблему с соседями сама месяц — безрезультатно. Юристы за 2 недели подготовили претензию, провели переговоры и взыскали полную сумму. Главное — я ничего не платила заранее!",
      case: "Залив из-за лопнувшей трубы у соседей сверху. Повреждён ремонт в новостройке.",
    },
    {
      name: "Сергей М., Ленинский район",
      amount: "187 000 ₽",
      text: "Сначала думал справлюсь сам. Составил претензию по шаблону из интернета — УК проигнорировала. Специалисты переделали документы с учетом нюансов новосибирских судов, и УК выплатила добровольно.",
      case: "Протечка с крыши. УК отказывалась признавать вину.",
    },
    {
      name: "Ольга В., Дзержинский район",
      amount: "620 000 ₽",
      text: "Виновник обещал всё уладить «по-хорошему». Через 3 месяца поняла, что меня водят за нос. Юрист сразу подал иск в Кировский суд. Получила не только ущерб, но и штраф 50%, и компенсацию морального вреда.",
      case: "Залив от соседей с затоплением кухни и дорогой техники.",
    },
  ];

  const team = [
    {
      name: "Алексей Семёнов",
      role: "Ведущий юрист по имущественным спорам",
      experience: "9 лет",
      cases: "140+ дел по заливам",
      quote:
        "Знаю все уловки УК и виновников. Наша задача — не просто составить акт, а создать неоспоримую доказательную базу с первого дня.",
    },
    {
      name: "Мария Колесникова",
      role: "Эксперт по оценке ущерба",
      experience: "7 лет",
      cases: "95+ экспертиз",
      quote:
        "Моя задача — чтобы в акте и экспертизе были зафиксированы все повреждения, включая скрытые. Это +30% к итоговой сумме.",
    },
  ];

  const faqItems = [
    {
      question:
        "Почему консультация бесплатная, а работа — «без моих расходов»?",
      answer: `Консультация — это анализ вашего случая и оценка перспектив. Мы заинтересованы брать только выигрышные дела.\n\n**КЛЮЧЕВОЕ УСЛОВИЕ:** Мы авансируем все расходы — экспертизу, госпошлину, работу юриста. Если дело выигрываем, большую часть наших затрат взыскиваем с виновника в рамках того же иска. Вы получаете свою компенсацию в полном объеме. Наш гонорар — процент от успеха.`,
    },
    {
      question: "А если попробовать решить вопрос самостоятельно?",
      answer: `По нашей статистике, в 80% случаев самостоятельные попытки заканчиваются:\n\n• Неправильным актом (без ключевых формулировок)\n• Пропуском досудебного порядка (обязателен для взыскания штрафа 50%)\n• Занижением суммы ущерба в 2-3 раза из-за неучтённых повреждений\n• Потерей 3-6 месяцев на бесплодную переписку\n\nВ итоге люди всё равно обращаются к юристу, но с уже усугубленной ситуацией и меньшими шансами.`,
    },
    {
      question: "Какие районы Новосибирска вы охватываете?",
      answer:
        "Работаем во всех районах: Центральный, Железнодорожный, Заельцовский, Калининский, Кировский, Ленинский, Октябрьский, Первомайский, Советский, Дзержинский. Отлично знаем специфику судов и УК в каждом районе.",
    },
  ];

  const stats = [
    { value: "8+", label: "лет практики по заливам в НСК", icon: "Calendar" },
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
          content={`Затопили соседи в Новосибирске? Профессиональный юрист по заливам. Взыщем ущерб за ремонт + штраф 50% + моральный вред. Работаем БЕЗ ВАШЕЙ ПРЕДОПЛАТЫ — инвестируем в ваше дело. ${CITY_PHONE}`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: "Юрист по заливу квартиры в Новосибирске",
            description:
              "Взыскание ущерба от потопа. Работаем без предоплаты, инвестируем в дело клиента.",
            areaServed: districts.map((district) => ({
              "@type": "City",
              name: `${district} район Новосибирска`,
            })),
            provider: {
              "@type": "Organization",
              name: "Юридический сервис",
              telephone: CITY_PHONE_RAW,
              openingHours: "Пн-Пт 9:00-20:00, Сб 10:00-18:00",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Новосибирск",
                streetAddress: "ул. Ленина, 12",
              },
            },
          })}
        </script>
      </Helmet>

      {/* ============ 1. HERO: ПРОБЛЕМА И СРОЧНОСТЬ ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-red-100 text-red-800 border-red-200 text-lg animate-pulse">
                <Icon name="Clock" className="h-5 w-5 mr-2" />
                ВНИМАНИЕ: Ущерб растёт! Уже{" "}
                {lossCounter.toLocaleString("ru-RU")} ₽
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Затопили квартиру в{" "}
                <span className="text-primary">Новосибирске</span>?
                <br />
                <span className="text-2xl md:text-3xl text-red-600">
                  Виновник тянет время или УК бездействует?
                </span>
              </h1>

              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Есть решение за 72 часа:
                    </h3>
                    <p className="text-gray-700 text-lg">
                      <strong>Юрист возьмёт всё на себя</strong> и начнёт
                      процедуру взыскания: ущерб +{" "}
                      <span className="text-green-600 font-bold">
                        штраф 50%
                      </span>{" "}
                      + моральный вред. <u>Вы не платите ничего вперед</u>.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold px-6 py-3 rounded-lg text-xl shadow-lg">
                    НУЛЕВАЯ ПРЕДОПЛАТА
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
                      Бесплатный анализ ситуации за 15 мин
                    </h3>
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
                        Пн-Пт 9:00-20:00, Сб 10:00-18:00, срочные заявки 24/7
                      </p>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Icon
                          name="CheckCircle"
                          className="h-5 w-5 text-green-500 mt-0.5"
                        />
                        <div>
                          <p className="font-bold">
                            Анализ документов и стратегии — 0 ₽
                          </p>
                          <p className="text-sm text-gray-600">
                            Скажем, можно ли взыскать и какую сумму
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
                            Мы инвестируем в ваше дело
                          </p>
                          <p className="text-sm text-gray-600">
                            Авансируем экспертизу и судебные расходы
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon
                          name="CheckCircle"
                          className="h-5 w-5 text-green-500 mt-0.5"
                        />
                        <div>
                          <p className="font-bold">Знаем суды Новосибирска</p>
                          <p className="text-sm text-gray-600">
                            Работали во всех районных судах НСК
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
                    <Badge className="mb-4 bg-amber-500 text-white">
                      <Icon name="Clock" className="h-4 w-4 mr-2" />
                      До конца акции: {formatTime(timeLeft)}
                    </Badge>
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
                      className="w-full h-14 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-lg shadow-lg"
                    >
                      <Icon name="MessageSquare" className="h-5 w-5 mr-2" />
                      СРОЧНО получить анализ от юриста
                    </Button>

                    <div className="flex items-center justify-center text-sm text-gray-500 gap-4">
                      <div className="flex items-center">
                        <Icon name="Lock" className="h-4 w-4 mr-1" /> Данные
                        защищены
                      </div>
                      <div className="flex items-center">
                        <Icon name="Shield" className="h-4 w-4 mr-1" />{" "}
                        Конфиденциально
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. ЧЕК-ЛИСТ С ПРОГРЕСС-БАРОМ ============ */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Что делать в первые часы после залива?
            </h2>
            <p className="text-xl text-gray-600">
              Правильные действия сейчас увеличат вашу компенсацию на 30-50%
            </p>
          </div>

          <Card className="shadow-xl border-2 border-blue-200">
            <CardContent className="p-8">
              {/* Прогресс-бар */}
              <div className="mb-10">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">
                    Ваш прогресс по сбору доказательств:
                  </span>
                  <span className="font-bold text-primary">
                    {checklist.length}/{checklistItems.length} пунктов
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
                    style={{
                      width: `${(checklist.length / checklistItems.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {checklist.length < 3
                    ? "⚠️ Вы пропустили критически важные шаги! Риск потери компенсации высок."
                    : checklist.length < 6
                      ? "🎯 Вы на верном пути. Завершите оставшиеся пункты для максимальной суммы."
                      : "✅ Идеально! Вы создали отличную доказательную базу. Следующий шаг — экспертиза."}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-bold mb-6">
                    Пошаговый план действий:
                  </h3>
                  <div className="space-y-4">
                    {checklistItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                      >
                        <CheckboxSimple
                          id={`item-${item.id}`}
                          checked={checklist.includes(item.id)}
                          onCheckedChange={(checked) =>
                            handleChecklistChange(item.id, checked as boolean)
                          }
                          className="h-6 w-6 mt-0.5"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={`item-${item.id}`}
                            className="text-lg font-medium leading-none cursor-pointer"
                          >
                            {item.text}
                          </label>
                          {item.risk && (
                            <p className="text-sm text-red-600 mt-2 font-medium">
                              Риск: {item.risk}
                            </p>
                          )}
                        </div>
                        {item.critical && (
                          <Badge variant="destructive">ВАЖНО</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                    <h4 className="text-xl font-bold text-red-800 mb-4">
                      <Icon
                        name="AlertTriangle"
                        className="h-5 w-5 inline mr-2"
                      />
                      Худший сценарий, если ничего не делать:
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Icon
                          name="X"
                          className="h-5 w-5 text-red-500 mt-0.5"
                        />
                        <span>
                          <strong>Через 3 дня:</strong> Виновник начнёт
                          оспаривать акт, свидетели забудут детали
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon
                          name="X"
                          className="h-5 w-5 text-red-500 mt-0.5"
                        />
                        <span>
                          <strong>Через 2 недели:</strong> Следы протечки
                          исчезнут после ремонта у соседей
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon
                          name="X"
                          className="h-5 w-5 text-red-500 mt-0.5"
                        />
                        <span>
                          <strong>Через 1 месяц:</strong> Получить компенсацию
                          будет в 10 раз сложнее, вы потеряете право на штраф
                          50%
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-blue-100 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-blue-800 mb-4">
                      <Icon name="Lightbulb" className="h-5 w-5 inline mr-2" />С
                      нами вы получаете:
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Icon
                          name="Check"
                          className="h-5 w-5 text-green-500 mt-0.5"
                        />
                        <span>
                          <strong>Шаблоны документов</strong> для вашего района
                          Новосибирска
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon
                          name="Check"
                          className="h-5 w-5 text-green-500 mt-0.5"
                        />
                        <span>
                          <strong>Контроль за составлением акта</strong> по
                          телефону в момент его оформления
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon
                          name="Check"
                          className="h-5 w-5 text-green-500 mt-0.5"
                        />
                        <span>
                          <strong>Срочную экспертизу</strong> (выезд эксперта в
                          течение 24 часов)
                        </span>
                      </li>
                    </ul>
                    <Button
                      className="w-full mt-6"
                      onClick={() =>
                        (window.location.href = `tel:${CITY_PHONE_RAW}`)
                      }
                    >
                      <Icon name="Phone" className="h-5 w-5 mr-2" />
                      Получить шаблоны документов {CITY_PHONE}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ============ 3. КАЛЬКУЛЯТОР КОМПЕНСАЦИИ ============ */}
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
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>50 000 ₽</span>
                        <span>Средний ущерб в НСК</span>
                        <span>1 000 000 ₽</span>
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
                            desc: "Акт, фото, чеки",
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
                            onClick={() =>
                              setCalculator({
                                ...calculator,
                                hasDocuments: option.id,
                              })
                            }
                            className="h-auto py-4 flex-col"
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
                            В 80% случаев сумма занижается на 40-60%, штраф 50%
                            не взыскивается, процесс затягивается на 4-8
                            месяцев.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Правая часть - результаты */}
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
                              <Separator className="my-4" />
                              <div className="flex justify-between text-2xl font-bold pt-4 border-t border-white/20">
                                <span>ИТОГО к получению:</span>
                                <span className="text-green-300">
                                  {compensation.total.toLocaleString("ru-RU")} ₽
                                </span>
                              </div>
                            </div>
                            <div className="mt-8 p-4 bg-white/10 rounded-lg">
                              <p className="text-sm">
                                <strong>*Наши услуги:</strong> Работаем без
                                предоплаты. 70% гонорара взыскиваем с виновника.
                                Ваш риск минимален.
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
                            compensation.total -
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

      {/* ============ 4. КОМАНДА ЭКСПЕРТОВ ============ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ваше дело в руках узких специалистов
              </h2>
              <p className="text-xl text-gray-600">
                Мы 8+ лет занимаемся только заливами в Новосибирске. Знаем
                каждую лазейку УК и виновников.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {team.map((member, idx) => (
                <Card
                  key={idx}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {member.name}
                        </h3>
                        <p className="text-primary font-semibold mb-2">
                          {member.role}
                        </p>
                        <div className="flex gap-4 mb-4">
                          <Badge variant="outline" className="bg-blue-50">
                            Опыт: {member.experience}
                          </Badge>
                          <Badge variant="outline" className="bg-green-50">
                            Дела: {member.cases}
                          </Badge>
                        </div>
                        <p className="text-gray-700 italic border-l-4 border-primary pl-4 py-2">
                          "{member.quote}"
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. ОТЗЫВЫ ============ */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Клиенты из Новосибирска о работе с нами
            </h2>
            <p className="text-xl text-gray-600">
              Реальные истории тех, кто уже прошёл путь от проблемы к решению
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
                      <p className="text-sm text-gray-500">{review.case}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 font-bold">
                      {review.amount}
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{review.text}"</p>
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
        </div>
      </section>

      {/* ============ 6. FAQ ============ */}
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
        </div>
      </section>

      {/* ============ 7. ФИНАЛЬНЫЙ CTA ============ */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
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
                      Пн-Пт 9:00-20:00, Сб 10:00-18:00, срочные заявки 24/7
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
              Юридический сервис • Новосибирск • Опыт с 2016 года • Работаем во
              всех районных судах НСК
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
