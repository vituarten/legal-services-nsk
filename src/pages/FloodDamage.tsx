"use client";

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const [timeLeft, setTimeLeft] = useState(900);
  const [checklist, setChecklist] = useState<number[]>([1, 2, 3]);
  const [activeTab, setActiveTab] = useState("compensation");
  const [lossCounter, setLossCounter] = useState(125000);

  // ============ КОНСТАНТЫ ДЛЯ НОВОСИБИРСКА ============
  const CITY_PHONE = "+7 (383) 235-95-05";
  const CITY_PHONE_RAW = "+738322359505";

  // ============ ЭФФЕКТЫ ============
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLossCounter((prev) => prev + 100);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Форма отправлена:", formData);
    alert(
      "Спасибо! Мы свяжемся с вами в течение 15 минут для бесплатной консультации.",
    );
  };

  const handleChecklistChange = (id: number, checked: boolean) => {
    if (checked) {
      setChecklist([...checklist, id]);
    } else {
      setChecklist(checklist.filter((item) => item !== id));
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

  // === НОВЫЙ БЛОК: Наши услуги и тарифы ===
  const serviceTiers = [
    {
      title: "БЕСПЛАТНАЯ ПЕРВИЧНАЯ КОНСУЛЬТАЦИЯ",
      price: "0 ₽",
      description: "Общий анализ ситуации и стратегия действий",
      features: [
        "Устная консультация по вашей ситуации",
        "Оценка перспектив взыскания ущерба",
        "Разъяснение ваших прав и пошаговый план",
        "Ответы на общие вопросы по процедуре",
      ],
      cta: "Получить консультацию",
      highlighted: false,
    },
    {
      title: "ПРАВОВОЙ АНАЛИЗ ДОКУМЕНТОВ",
      price: "от 5 000 ₽",
      description: "Подробный письменный анализ ваших документов[citation:4]",
      features: [
        "Проверка актов о заливе на соответствие закону",
        "Анализ договоров и переписки с УК/виновником[citation:9]",
        "Выявление рисков и слабых мест в доказательствах",
        "Письменное заключение с рекомендациями[citation:4]",
        "Расчёт точной суммы для взыскания",
      ],
      cta: "Заказать анализ",
      highlighted: true,
    },
  ];

  const faqItems = [
    {
      question: "Что входит в бесплатную консультацию?",
      answer: `На бесплатной консультации мы анализируем вашу ситуацию, объясняем ваши права и даём общий план действий. Вы получаете устные рекомендации и понимание, какие документы нужны для дальнейшей работы[citation:5].`,
    },
    {
      question: "Чем анализ документов отличается от консультации?",
      answer: `Консультация — это устные общие рекомендации. Анализ документов — это платная услуга, где юристы детально изучают ваши акты, договоры, переписку, выявляют ошибки и риски, готовят письменное заключение с расчётами[citation:4][citation:9]. Стоимость зависит от объёма и сложности документов.`,
    },
    {
      question: "Как происходит оплата?",
      answer: `Бесплатная консультация не требует оплаты. При заказе правового анализа документов заключается договор, оплата происходит по факту выполнения работы.`,
    },
  ];

  const stats = [
    { value: "94%", label: "дел решаются досудебно" },
    { value: "42 млн+", label: "взыскано для клиентов" },
    { value: "от 5 000 ₽", label: "стоимость анализа документов[citation:4]" },
    { value: "8+ лет", label: "опыта работы с заливами" },
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
          Помощь при заливе квартиры в Новосибирске | Бесплатная консультация
        </title>
        <meta
          name="description"
          content={`Затопили соседи в Новосибирске? Бесплатная консультация юриста. Платный анализ документов от 5 000 ₽. Взыскание ущерба + штраф 50%. ${CITY_PHONE}`}
        />
      </Helmet>

      {/* ============ 1. HERO Секция ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-red-100 text-red-800 border-red-200 text-lg animate-pulse">
                ⏰ ВНИМАНИЕ: Ущерб растёт! Уже{" "}
                {lossCounter.toLocaleString("ru-RU")} ₽
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Бесплатная консультация по заливу
                <br />
                <span className="text-2xl md:text-3xl text-red-600">
                  в Новосибирске
                </span>
              </h1>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Правильный алгоритм действий:
                    </h3>
                    <p className="text-gray-700 text-lg">
                      <strong>1. Бесплатная консультация</strong> →{" "}
                      <strong>2. Анализ документов (от 5 000 ₽)</strong> →{" "}
                      <strong>3. Взыскание ущерба + штраф 50%</strong>
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold px-6 py-3 rounded-lg text-xl shadow-lg">
                    ПЕРВАЯ КОНСУЛЬТАЦИЯ 0₽
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div className="space-y-8">
                <Card className="border-2 border-blue-200 shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-center mb-6">
                      Бесплатный анализ ситуации
                    </h3>
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                        <div className="bg-blue-100 p-3 rounded-full">📞</div>
                        <div>
                          <p className="text-sm text-blue-600 font-semibold">
                            Телефон для консультации
                          </p>
                          <a
                            href={`tel:${CITY_PHONE_RAW}`}
                            className="text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-2"
                          >
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-lg text-xl">
                              {CITY_PHONE}
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="text-green-500 mt-0.5">✅</div>
                        <div>
                          <p className="font-bold">
                            Консультация по ситуации — 0 ₽
                          </p>
                          <p className="text-sm text-gray-600">
                            Общий анализ и план действий[citation:5]
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="text-blue-500 mt-0.5">💰</div>
                        <div>
                          <p className="font-bold">
                            Анализ документов — от 5 000 ₽
                          </p>
                          <p className="text-sm text-gray-600">
                            Детальная проверка актов и договоров[citation:4]
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, idx) => (
                    <Card
                      key={idx}
                      className="text-center border-0 shadow-lg bg-white"
                    >
                      <CardContent className="p-4">
                        <p className="text-2xl md:text-3xl font-black text-blue-600 mb-1">
                          {stat.value}
                        </p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="shadow-2xl border-0 rounded-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <Badge className="mb-4 bg-amber-500 text-white">
                      ⏰ До конца акции: {formatTime(timeLeft)}
                    </Badge>
                    <h3 className="text-2xl font-bold mb-2">
                      Записаться на бесплатную консультацию
                    </h3>
                    <p className="text-gray-600">
                      Расскажите о ситуации. Мы дадим предварительную оценку и
                      план действий.
                    </p>
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
                        placeholder="Пример: 10 марта затопили соседи сверху. Поврежден потолок, стены. Составили акт с УК."
                        required
                        className="min-h-[120px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-lg shadow-lg"
                    >
                      📞 Получить бесплатную консультацию
                    </Button>

                    <p className="text-center text-sm text-gray-500">
                      Нажимая кнопку, вы соглашаетесь на обработку данных для
                      консультации
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. ЧЕК-ЛИСТ ============ */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Что делать в первые часы после залива?
            </h2>
            <p className="text-xl text-gray-600">
              Правильные действия увеличат компенсацию на 30-50%
            </p>
          </div>

          <Card className="shadow-xl border-2 border-blue-200">
            <CardContent className="p-8">
              <div className="mb-10">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">
                    Ваш прогресс по сбору доказательств:
                  </span>
                  <span className="font-bold text-blue-600">
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
                        <input
                          type="checkbox"
                          id={`item-${item.id}`}
                          checked={checklist.includes(item.id)}
                          onChange={(e) =>
                            handleChecklistChange(item.id, e.target.checked)
                          }
                          className="h-6 w-6 rounded border-2 border-gray-300 checked:border-blue-500 checked:bg-blue-500 focus:ring-blue-500 mt-1"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={`item-${item.id}`}
                            className="text-lg font-medium leading-none cursor-pointer"
                          >
                            {item.text}
                            {item.critical && (
                              <span className="ml-2 text-red-600 text-sm font-bold">
                                [ВАЖНО]
                              </span>
                            )}
                          </label>
                          {item.risk && (
                            <p className="text-sm text-red-600 mt-2 font-medium">
                              ⚠️ Риск: {item.risk}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                    <h4 className="text-xl font-bold text-blue-800 mb-4">
                      💡 Что вы получите после бесплатной консультации:
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Разбор вашего конкретного случая</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Оценку перспектив взыскания</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Рекомендации по дальнейшим действиям</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-amber-800 mb-4">
                      ⚖️ Когда нужен платный анализ документов:
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        <span>
                          Если нужна письменная экспертиза актов[citation:9]
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        <span>
                          Для детальной проверки договоров и претензий
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        <span>
                          При сложном случае с большим объёмом документов
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ============ 3. КАЛЬКУЛЯТОР ============ */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Сколько можно взыскать?
              </h2>
              <p className="text-xl text-gray-600">
                Рассчитайте примерную сумму компенсации
              </p>
            </div>

            <Card className="bg-white shadow-2xl">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-10">
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
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
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
                          <button
                            key={option.id}
                            type="button"
                            onClick={() =>
                              setCalculator({
                                ...calculator,
                                hasDocuments: option.id,
                              })
                            }
                            className={`h-auto py-4 flex-col rounded-lg border-2 ${calculator.hasDocuments === option.id ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                          >
                            <span className="font-bold">{option.label}</span>
                            <span className="text-xs mt-1">{option.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-2xl p-8">
                      <h3 className="text-2xl font-bold mb-6 text-center">
                        Ваша возможная компенсация
                      </h3>
                      <div className="space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-white/20">
                          <span className="text-gray-300">
                            Вероятность успеха:
                          </span>
                          <span className="text-lg bg-green-600 px-3 py-1 rounded">
                            {compensation.chance}%
                          </span>
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
                          <Separator className="my-4" />
                          <div className="flex justify-between text-2xl font-bold pt-4 border-t border-white/20">
                            <span>ИТОГО к получению:</span>
                            <span className="text-green-300">
                              {compensation.total.toLocaleString("ru-RU")} ₽
                            </span>
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

      {/* ============ 4. НОВЫЙ БЛОК: НАШИ УСЛУГИ И ТАРИФЫ ============ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Наши услуги и тарифы
              </h2>
              <p className="text-xl text-gray-600">
                Прозрачное ценообразование и понятные условия
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {serviceTiers.map((tier, index) => (
                <Card
                  key={index}
                  className={`border-2 ${tier.highlighted ? "border-blue-500 shadow-xl relative" : "border-gray-200"}`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white px-4 py-1 text-sm">
                        ПОПУЛЯРНО
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {tier.title}
                      </h3>
                      <div className="mb-4">
                        <span className="text-4xl font-black text-blue-600">
                          {tier.price}
                        </span>
                        {tier.price !== "0 ₽" && (
                          <span className="text-gray-600 text-sm ml-2">
                            за пакет документов[citation:4]
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-6">{tier.description}</p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full h-12 text-lg ${tier.highlighted ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-800 hover:bg-gray-900"}`}
                      onClick={() =>
                        (window.location.href = `tel:${CITY_PHONE_RAW}`)
                      }
                    >
                      {tier.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                💼 Код ОКВЭД нашей деятельности:{" "}
                <strong>69.10 - Деятельность в области права</strong>
                [citation:2]
              </p>
              <p className="text-gray-600">
                📝 Заключаем договор как дистанционно, так и в нашем офисе в
                Новосибирске
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. FAQ ============ */}
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ответы на вопросы
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-start justify-between hover:bg-gray-50 transition-colors"
                  onClick={(e) => {
                    const content = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    const arrow = e.currentTarget.querySelector(".arrow");
                    if (content && arrow) {
                      content.classList.toggle("hidden");
                      arrow.style.transform = content.classList.contains(
                        "hidden",
                      )
                        ? "rotate(0deg)"
                        : "rotate(180deg)";
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      ?
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.question}
                    </h3>
                  </div>
                  <svg
                    className="arrow h-5 w-5 flex-shrink-0 ml-4 text-gray-400 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div className="hidden px-6 pb-6 ml-12">
                  <div className="pt-2">
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. ФИНАЛЬНЫЙ CTA ============ */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-red-500 text-white border-0">
              ⏰ ДО КОНЦА АКЦИИ: {formatTime(timeLeft)}
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Получите бесплатную консультацию
            </h2>

            <p className="text-xl mb-8 text-white/90">
              Узнайте, как правильно действовать в вашей ситуации. Первая
              консультация — бесплатно!
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-500/20 p-2 rounded-full">
                      <span className="text-green-400 text-xl">✓</span>
                    </div>
                    <div>
                      <p className="font-bold text-lg">
                        Бесплатная консультация
                      </p>
                      <p className="text-white/80">
                        Анализ ситуации и план действий
                      </p>
                    </div>
                  </div>
                  <a
                    href={`tel:${CITY_PHONE_RAW}`}
                    className="block text-2xl font-bold hover:text-green-300 transition-colors mt-4"
                  >
                    {CITY_PHONE}
                  </a>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg">
                    <p className="font-bold text-lg mb-2">Что вы получите:</p>
                    <ul className="text-sm text-white/90 space-y-1">
                      <li>• Оценку вашей ситуации за 15 минут</li>
                      <li>• Чёткий план следующих действий</li>
                      <li>• Ответы на все вопросы</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {districts.slice(0, 5).map((district) => (
                <span
                  key={district}
                  className="text-white border border-white/30 px-3 py-1 rounded-full text-sm"
                >
                  {district} район
                </span>
              ))}
            </div>

            <p className="text-white/70 text-sm">
              Работаем по всему Новосибирску • Консультация бесплатно • Анализ
              документов от 5 000 ₽
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
