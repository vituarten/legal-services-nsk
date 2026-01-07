"use client";

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  // ============ СОСТОЯНИЯ ДЛЯ ФОРМ И КАЛЬКУЛЯТОРА ============
  const [urgentForm, setUrgentForm] = useState({
    name: "",
    phone: "",
    problemType: "neighbors",
    description: "",
  });
  const [templateForm, setTemplateForm] = useState({ name: "", email: "" });
  const [calculator, setCalculator] = useState({
    repairCost: 150000,
    hasDocuments: "full",
  });
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 минут таймер
  const [checklistItems, setChecklistItems] = useState<number[]>([]);

  // Таймер для создания срочности
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

  // Расчет компенсации
  const calculateCompensation = () => {
    const baseRefund = calculator.repairCost;
    const penalty = calculator.repairCost * 0.5;
    const moralDamage = Math.min(calculator.repairCost * 0.3, 50000);
    const total = baseRefund + penalty + moralDamage;

    let successChance = 90;
    if (calculator.hasDocuments === "partial") successChance = 75;
    if (calculator.hasDocuments === "none") successChance = 60;

    return { baseRefund, penalty, moralDamage, total, successChance };
  };

  const compensation = calculateCompensation();

  // Обработчики форм
  const handleUrgentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && (window as any).ym) {
      (window as any).ym(106063131, "reachGoal", "urgent_form_submit");
    }
    alert("Спасибо! Юрист свяжется с вами в течение 5 минут.");
  };

  const handleTemplateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && (window as any).ym) {
      (window as any).ym(106063131, "reachGoal", "template_download");
    }
    // Имитация скачивания
    const link = document.createElement("a");
    link.href = "/templates/flood-claim.docx";
    link.download = "Шаблон_претензии_при_затоплении.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("Шаблон отправлен на вашу почту!");
  };

  // Данные для отзывов
  const reviews = [
    {
      name: "Анна К.",
      district: "Октябрьский район",
      result: "450 000 ₽",
      text: "Соседи затопили новую кухню. Юристы взыскали 300 тыс. на ремонт + штраф 150 тыс. Все детально объяснили.",
    },
    {
      name: "Сергей М.",
      district: "Ленинский район",
      result: "187 000 ₽",
      text: "УК отказалась платить за прорвавший стояк. Специалисты подготовили претензию и добились выплаты досудебно.",
    },
    {
      name: "Ольга В.",
      district: "Дзержинский район",
      result: "620 000 ₽",
      text: "После залива испортился дорогой ремонт. Виновник тянул время. Юрист подал иск и выиграл дело в суде.",
    },
  ];

  // Чек-лист
  const checklistData = [
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
      text: "Внести в акт подробное описание повреждений",
      critical: false,
    },
    { id: 5, text: "Получить подпись виновника на акте", critical: true },
    {
      id: 6,
      text: "Направить досудебную претензию в течение 3 дней",
      critical: false,
    },
    { id: 7, text: "Не начинать ремонт до экспертизы", critical: true },
  ];

  // FAQ
  const faqItems = [
    {
      question: "Сколько стоит услуга юриста по заливу?",
      answer:
        "Мы работаем без предоплаты. Оплата только после получения вами денег. Досудебное урегулирование — 10 000 ₽, полное сопровождение — 20-30% от взысканной суммы.",
    },
    {
      question: "Как долго длится взыскание ущерба?",
      answer:
        "Досудебное урегулирование — 1-2 месяца. Судебный процесс — 3-4 месяца. Полный цикл — от 2 до 6 месяцев.",
    },
    {
      question: "Что делать, если виновник — управляющая компания?",
      answer:
        "Процесс аналогичен, но есть особенности. УК несут ответственность за протечки из общедомовых коммуникаций. Мы поможем правильно составить претензию и подать иск.",
    },
    {
      question: "Нужна ли оценка ущерба?",
      answer:
        "Да, это обязательный этап. Мы сотрудничаем с аккредитованными оценщиками и организуем экспертизу за свой счет.",
    },
    {
      question: "Что если виновник отказывается платить?",
      answer:
        "Подаем иск в суд. После получения решения начинаем исполнительное производство через судебных приставов или банк виновника.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Юрист по заливу квартиры в Новосибирске | Взыскание ущерба + штраф 50%
        </title>
        <meta
          name="description"
          content="Затопили соседи? Взыщем ущерб за ремонт + штраф 50% + моральный вред. Работаем без предоплаты с 2016 года. Звоните: +7 (383) 235-95-05"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: "Юрист по заливу квартиры в Новосибирске",
            description:
              "Взыскание ущерба от потопа с виновника. Работаем без предоплаты.",
            areaServed: { "@type": "City", name: "Новосибирск" },
            provider: {
              "@type": "Organization",
              name: "ЮрСервис НСК",
              telephone: CONTACTS.phone,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Новосибирск",
                streetAddress: "ул. Ленина, д. 3",
              },
            },
          })}
        </script>
      </Helmet>

      {/* ============ 1. HERO БЛОК С ФОРМОЙ ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Левая часть - контент */}
            <div>
              <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
                <Icon name="Clock" className="h-4 w-4 mr-2" />
                Консультация 15 минут
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Затопили квартиру?
                <br />
                <span className="text-primary">Вернем деньги</span> за ремонт
              </h1>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Icon name="CheckCircle" className="h-5 w-5 text-green-500" />
                  <span className="text-lg">
                    Взыскание ущерба от потопа с 2016 года
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="CheckCircle" className="h-5 w-5 text-green-500" />
                  <span className="text-lg">
                    Работаем без предоплаты — платите за результат
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="CheckCircle" className="h-5 w-5 text-green-500" />
                  <span className="text-lg">
                    Дополнительно штраф 50% в вашу пользу по закону
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-blue-100 p-6 rounded-xl mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <Icon name="Phone" className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Бесплатная консультация юриста
                    </p>
                    <a
                      href={`tel:${CONTACTS.phone}`}
                      className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors"
                      onClick={() =>
                        (window as any).ym?.(
                          106063131,
                          "reachGoal",
                          "hero_phone",
                        )
                      }
                    >
                      {CONTACTS.phoneFormatted || "+7 (383) 235-95-05"}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая часть - форма */}
            <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-center mb-2">
                  Бесплатная консультация юриста
                </h3>
                <p className="text-center text-gray-600 mb-8">
                  Ответим в течение 15 минут
                </p>

                <form onSubmit={handleUrgentSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя *</Label>
                    <Input
                      id="name"
                      value={urgentForm.name}
                      onChange={(e) =>
                        setUrgentForm({ ...urgentForm, name: e.target.value })
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
                      value={urgentForm.phone}
                      onChange={(e) =>
                        setUrgentForm({ ...urgentForm, phone: e.target.value })
                      }
                      placeholder="+7 (___) ___ __ __"
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Кто виновник затопления?</Label>
                    <RadioGroup
                      value={urgentForm.problemType}
                      onValueChange={(value) =>
                        setUrgentForm({ ...urgentForm, problemType: value })
                      }
                      className="grid grid-cols-2 gap-3"
                    >
                      <div>
                        <RadioGroupItem
                          value="neighbors"
                          id="neighbors"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="neighbors"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary cursor-pointer"
                        >
                          <Icon name="Users" className="h-6 w-6 mb-2" />
                          <span className="text-center">Соседи</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="uk"
                          id="uk"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="uk"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary cursor-pointer"
                        >
                          <Icon name="Building" className="h-6 w-6 mb-2" />
                          <span className="text-center">УК</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Опишите ситуацию</Label>
                    <Textarea
                      id="description"
                      value={urgentForm.description}
                      onChange={(e) =>
                        setUrgentForm({
                          ...urgentForm,
                          description: e.target.value,
                        })
                      }
                      placeholder="Например: затопили соседи сверху, повреждены потолок, стены..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-lg"
                  >
                    <Icon name="MessageSquare" className="h-5 w-5 mr-2" />
                    Получить консультацию
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
      </section>

      {/* ============ 2. БЛОК С ЦИФРАМИ И СТАТИСТИКОЙ ============ */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            За 8 лет работы мы помогли вернуть
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                value: "42 млн ₽",
                label: "Общая сумма взысканий",
                icon: "DollarSign",
              },
              { value: "97%", label: "Успешных дел", icon: "TrendingUp" },
              { value: "287", label: "Довольных клиентов", icon: "Users" },
              { value: "от 2 мес", label: "Срок взыскания", icon: "Clock" },
            ].map((stat, idx) => (
              <Card
                key={idx}
                className="text-center border-0 shadow-lg bg-white/80"
              >
                <CardContent className="p-6">
                  <Icon
                    name={stat.icon as any}
                    className="h-10 w-10 text-primary mx-auto mb-4"
                  />
                  <p className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                    {stat.value}
                  </p>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. ЧЕК-ЛИСТ ПЕРВЫХ ДЕЙСТВИЙ ============ */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-amber-100 text-amber-800">
              <Icon name="AlertTriangle" className="h-4 w-4 mr-2" />
              СРОЧНОЕ РУКОВОДСТВО
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Что делать в первые часы после потопа:{" "}
              <span className="text-primary">чек-лист</span>
            </h2>
            <p className="text-xl text-gray-600">
              Правильные действия сейчас сэкономят вам время, нервы и увеличат
              сумму компенсации
            </p>
          </div>

          <Card className="shadow-xl border-2 border-amber-200">
            <CardContent className="p-8">
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon
                    name="AlertCircle"
                    className="h-6 w-6 text-red-500 mt-0.5"
                  />
                  <div>
                    <p className="font-bold text-red-800 mb-1">
                      Критическая ошибка 90% пострадавших:
                    </p>
                    <p className="text-red-700">
                      Начинают ремонт ДО фиксации ущерба! Без доказательств
                      взыскать компенсацию будет невозможно.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {checklistData.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center h-6">
                      <Checkbox
                        id={`item-${item.id}`}
                        checked={checklistItems.includes(item.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setChecklistItems([...checklistItems, item.id]);
                          } else {
                            setChecklistItems(
                              checklistItems.filter((id) => id !== item.id),
                            );
                          }
                        }}
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
                      <Badge variant="destructive">КРИТИЧНО</Badge>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-gradient-to-r from-primary/10 to-blue-100 rounded-xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Нужна помощь на любом этапе?
                    </h3>
                    <p className="text-gray-700">
                      Юрист подскажет, как правильно составить акт, проведет
                      переговоры, организует экспертизу
                    </p>
                  </div>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-blue-600"
                    onClick={() =>
                      document
                        .getElementById("contact-form")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <Icon name="MessageSquare" className="h-5 w-5 mr-2" />
                    Получить помощь юриста
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ============ 4. КАЛЬКУЛЯТОР КОМПЕНСАЦИИ ============ */}
      <section className="container mx-auto px-4 py-16" id="calculator">
        <Card className="bg-gradient-to-br from-white to-blue-50 shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Icon name="Calculator" className="h-7 w-7 text-primary" />
              <span className="text-2xl">
                Рассчитайте примерную компенсацию за 30 секунд
              </span>
            </CardTitle>
            <p className="text-gray-600">
              Узнайте, сколько вы можете взыскать с виновника по закону
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Левая часть - форма */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="cost-slider"
                      className="text-lg font-semibold"
                    >
                      Предварительная стоимость ремонта:
                    </Label>
                    <Badge variant="outline" className="text-lg font-bold">
                      {calculator.repairCost.toLocaleString("ru-RU")} ₽
                    </Badge>
                  </div>
                  <Slider
                    id="cost-slider"
                    min={50000}
                    max={1000000}
                    step={10000}
                    value={[calculator.repairCost]}
                    onValueChange={(value) =>
                      setCalculator({ ...calculator, repairCost: value[0] })
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>50 000 ₽</span>
                    <span>1 000 000 ₽</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-semibold">
                    Наличие документов и доказательств:
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        id: "full",
                        label: "Полные",
                        desc: "Чеки, фото/видео, акт",
                      },
                      {
                        id: "partial",
                        label: "Частичные",
                        desc: "Только фото",
                      },
                      { id: "none", label: "Нет", desc: "Нужна помощь" },
                    ].map((option) => (
                      <Button
                        key={option.id}
                        type="button"
                        variant={
                          calculator.hasDocuments === option.id
                            ? "default"
                            : "outline"
                        }
                        className={`h-auto py-4 flex-col ${calculator.hasDocuments === option.id ? "bg-primary" : ""}`}
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
                  className="w-full h-14 text-lg bg-gradient-to-r from-primary to-blue-600"
                  onClick={() => {
                    document
                      .getElementById("contact-form")
                      ?.scrollIntoView({ behavior: "smooth" });
                    (window as any).ym?.(
                      106063131,
                      "reachGoal",
                      "calculator_to_form",
                    );
                  }}
                >
                  <Icon name="ArrowRight" className="h-5 w-5 mr-2" />
                  Зафиксировать расчет и получить консультацию
                </Button>
              </div>

              {/* Правая часть - результаты */}
              <div className="bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Ваша возможная компенсация
                </h3>

                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-white/20">
                    <span className="text-gray-300">Шанс на успех:</span>
                    <Badge className="text-lg bg-green-600">
                      {compensation.successChance}%
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Возмещение ремонта:</span>
                      <span className="font-bold">
                        {compensation.baseRefund.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Штраф 50% в вашу пользу:</span>
                      <span className="font-bold text-green-300">
                        +{compensation.penalty.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Компенсация морального вреда:</span>
                      <span className="font-bold">
                        +{compensation.moralDamage.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>

                    <div className="pt-6 border-t border-white/30">
                      <div className="flex justify-between text-2xl font-bold">
                        <span>ИТОГО к получению:</span>
                        <span className="text-green-300">
                          {compensation.total.toLocaleString("ru-RU")} ₽
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-white/10 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Icon
                        name="Lightbulb"
                        className="h-5 w-5 text-amber-300 mt-0.5"
                      />
                      <p className="text-sm">
                        <strong>Важно:</strong> Это предварительный расчет.
                        Точную сумму определит строительно-техническая
                        экспертиза. Мы организуем её проведение за свой счет.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ============ 5. ТАБЫ С УСЛУГАМИ И ЦЕНАМИ ============ */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Стоимость услуг
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Прозрачное ценообразование. Оплата только после получения вами денег
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Консультация",
                price: "0 ₽",
                features: [
                  "Анализ ситуации",
                  "Расчет суммы ущерба",
                  "Рекомендации по действиям",
                ],
                buttonText: "Записаться",
                popular: false,
              },
              {
                title: "Досудебное урегулирование",
                price: "10 000 ₽",
                features: [
                  "Составление претензии",
                  "Переговоры с виновником",
                  "Получение выплаты",
                ],
                buttonText: "Выбрать",
                popular: true,
              },
              {
                title: "Полное сопровождение",
                price: "20-30%",
                subtitle: "от взысканной суммы",
                features: [
                  "Все этапы",
                  "Представительство в суде",
                  "Исполнительное производство",
                ],
                buttonText: "Обсудить",
                popular: false,
              },
            ].map((plan, idx) => (
              <Card
                key={idx}
                className={`relative border-2 ${plan.popular ? "border-primary shadow-2xl" : "border-gray-200"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white">ПОПУЛЯРНО</Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-center mb-4">
                    {plan.title}
                  </h3>
                  <div className="text-center mb-6">
                    <p className="text-4xl font-black text-gray-900">
                      {plan.price}
                    </p>
                    {plan.subtitle && (
                      <p className="text-gray-600 text-sm">{plan.subtitle}</p>
                    )}
                  </div>

                  <Separator className="my-6" />

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        <Icon name="Check" className="h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${plan.popular ? "bg-primary" : "bg-gray-900 hover:bg-gray-800"}`}
                    onClick={() =>
                      (window as any).ym?.(
                        106063131,
                        "reachGoal",
                        `plan_${idx}`,
                      )
                    }
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. СОЦИАЛЬНЫЕ ДОКАЗАТЕЛЬСТВА ============ */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
            <Icon name="Star" className="h-4 w-4 mr-2" />
            Реальные истории клиентов
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Мы вернули своим клиентам более{" "}
            <span className="text-primary">42 млн рублей</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Вот лишь несколько примеров из нашей практики в судах Новосибирска
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <Card
              key={idx}
              className="hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar>
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.district}</p>
                  </div>
                  <div className="bg-green-50 text-green-700 font-bold px-3 py-1 rounded-full text-sm">
                    {review.result}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-6">"{review.text}"</p>
                <div className="flex items-center gap-1">
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
      </section>

      {/* ============ 7. ФОРМА С ТАЙМЕРОМ ============ */}
      <section className="container mx-auto px-4 py-16" id="contact-form">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-red-100 text-red-800 border-red-200">
              <Icon name="Clock" className="h-4 w-4 mr-2" />
              СРОЧНАЯ КОНСУЛЬТАЦИЯ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Получите пошаговый план действий{" "}
              <span className="text-primary">всего за 15 минут</span>
            </h2>
            <p className="text-xl text-gray-600">
              Юрист перезвонит, проанализирует вашу ситуацию и даст четкие
              инструкции
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Таймер и преимущества */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-b from-amber-50 to-orange-50 border-amber-200 h-full">
                <CardContent className="p-6">
                  <div className="text-center mb-8">
                    <div className="text-5xl font-black text-gray-900 mb-2 font-mono">
                      {formatTime(timeLeft)}
                    </div>
                    <p className="text-gray-600">до окончания акции</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <Icon
                          name="CheckCircle"
                          className="h-5 w-5 text-primary"
                        />
                      </div>
                      <div>
                        <p className="font-bold">План действий за 15 мин</p>
                        <p className="text-sm text-gray-600">
                          Что делать прямо сейчас, а что отложить
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <Icon
                          name="FileText"
                          className="h-5 w-5 text-primary"
                        />
                      </div>
                      <div>
                        <p className="font-bold">Шаблоны документов</p>
                        <p className="text-sm text-gray-600">
                          Готовые для заполнения акты и претензии
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <Icon name="Scale" className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold">Оценка перспектив дела</p>
                        <p className="text-sm text-gray-600">
                          Скажем точно, стоит ли обращаться в суд
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Форма */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0">
                <CardContent className="p-8">
                  <form onSubmit={handleUrgentSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name2">Ваше имя *</Label>
                        <Input
                          id="name2"
                          value={urgentForm.name}
                          onChange={(e) =>
                            setUrgentForm({
                              ...urgentForm,
                              name: e.target.value,
                            })
                          }
                          placeholder="Иван Иванов"
                          required
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone2">Телефон *</Label>
                        <Input
                          id="phone2"
                          type="tel"
                          value={urgentForm.phone}
                          onChange={(e) =>
                            setUrgentForm({
                              ...urgentForm,
                              phone: e.target.value,
                            })
                          }
                          placeholder="+7 (___) ___ __ __"
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description2">Опишите ситуацию *</Label>
                      <Textarea
                        id="description2"
                        value={urgentForm.description}
                        onChange={(e) =>
                          setUrgentForm({
                            ...urgentForm,
                            description: e.target.value,
                          })
                        }
                        placeholder="Пример: Вчера затопили соседи сверху, вода текла 2 часа. Повреждены натяжной потолок, стены, бытовая техника. Составили акт, есть фото."
                        required
                        className="min-h-[120px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-14 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-lg"
                    >
                      <Icon name="Phone" className="h-5 w-5 mr-2" />
                      Получить срочный план действий
                    </Button>

                    <div className="text-center">
                      <p className="text-xs text-gray-500">
                        Нажимая кнопку, вы соглашаетесь с обработкой
                        персональных данных.
                        <br />
                        Гарантируем конфиденциальность. Юрист перезвонит в
                        течение 5 минут.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 8. FAQ ============ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Частые вопросы
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border rounded-lg px-6"
              >
                <AccordionTrigger className="text-lg font-semibold py-4 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ============ 9. ФИНАЛЬНЫЙ CTA ============ */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Icon
              name="AlertTriangle"
              className="h-16 w-16 text-amber-400 mx-auto mb-6"
            />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Не откладывайте на потом!
            </h2>
            <p className="text-xl mb-8 text-white/90">
              С каждым днем собирать доказательства становится сложнее.
              <br />
              Позвоните сейчас и получите план действий уже сегодня.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <p className="text-2xl font-bold mb-2">
                    Бесплатный звонок юристу
                  </p>
                  <p className="text-white/80">
                    15 минут консультации по вашему случаю
                  </p>
                </div>
                <a
                  href={`tel:${CONTACTS.phone}`}
                  className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white text-2xl font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center"
                  onClick={() =>
                    (window as any).ym?.(106063131, "reachGoal", "final_phone")
                  }
                >
                  <Icon name="Phone" className="h-6 w-6 mr-3" />
                  {CONTACTS.phoneFormatted || "+7 (383) 235-95-05"}
                </a>
              </div>
            </div>

            <p className="text-white/70 text-sm">
              Работаем с 2016 года. Офис в центре Новосибирска. Принимаем в
              любое время.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
