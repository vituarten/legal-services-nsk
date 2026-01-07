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
    email: "",
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

  // ============ ТАЙМЕР (создание срочности) ============
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
    // Яндекс.Метрика
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
    const message = `Здравствуйте! Нужна консультация по затоплению квартиры.`;
    const url = `https://wa.me/${CONTACTS.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleTelegramClick = () => {
    const message = `Здравствуйте! Нужна консультация по затоплению квартиры.`;
    const url = `https://t.me/${CONTACTS.telegram.replace("+", "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // ============ ДАННЫЕ ============
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
      district: "Центр Калуги",
      amount: "450 000 ₽",
      text: "Соседи затопили новую кухню. Юристы не просто взыскали 300 тыс. на ремонт, но и получили для меня штраф в 150 тыс. Очень детально всё объясняли.",
    },
    {
      name: "Сергей М.",
      district: "Московский район",
      amount: "187 000 ₽",
      text: "УК сначала отказалась платить за прорвавший стояк. Специалисты подготовили претензию, провели переговоры и добились выплаты в досудебном порядке.",
    },
    {
      name: "Ольга В.",
      district: "Правобережье",
      amount: "620 000 ₽",
      text: "После залива испортился дорогой ремонт в гостиной. Виновник тянул время. Подключили юриста, который подал иск и представлял мои интересы в суде Калуги.",
    },
  ];

  const faqItems = [
    {
      question: "Сколько стоит услуга юриста по заливу?",
      answer: `Мы работаем БЕЗ ПРЕДОПЛАТЫ. Оплата только после получения вами денег от виновника.\n\n• Досудебное урегулирование — фиксированная сумма\n• Полное сопровождение (включая суд) — процент от взысканной суммы\n\nПервая консультация — бесплатно!`,
    },
    {
      question: "Как долго длится взыскание ущерба?",
      answer:
        "Средние сроки по Калуге:\n\n• Досудебное урегулирование — 1-2 месяца\n• Судебный процесс — 3-4 месяца\n• Исполнительное производство — 1-2 месяца\n\nМы ускоряем процесс за счет знания специфики калужских судов.",
    },
    {
      question: "Что делать, если виновник — управляющая компания?",
      answer:
        "В Калуге это частая ситуация. УК несут ответственность за протечки из общедомовых коммуникаций. Мы знаем, как правильно составлять претензии именно к калужским управляющим компаниям и какие судебные инстанции наиболее эффективны.",
    },
    {
      question: "Нужна ли оценка ущерба?",
      answer:
        "Да, это обязательный этап для точного расчета суммы. Мы сотрудничаем с аккредитованными в Калуге оценщиками и организуем экспертизу. Часто — за наш счет, с оплатой после взыскания.",
    },
  ];

  const stats = [
    { value: "8+", label: "лет практики в Калуге", icon: "Calendar" },
    { value: "35 млн+", label: "взыскано для клиентов", icon: "DollarSign" },
    { value: "96%", label: "успешных дел", icon: "TrendingUp" },
    { value: "300+", label: "решенных случаев", icon: "Users" },
  ];

  return (
    <>
      <Helmet>
        <title>
          Юрист по заливу квартиры в Калуге | Взыскание ущерба + штраф 50%
        </title>
        <meta
          name="description"
          content={`Затопили соседи в Калуге? Взыщем ущерб за ремонт + штраф 50% + моральный вред. Работаем без предоплаты. ${CONTACTS.workingHours}. Звоните: ${CONTACTS.phoneFormatted}`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: "Юрист по заливу квартиры в Калуге",
            description:
              "Взыскание ущерба от потопа с виновника. Работаем без предоплаты.",
            areaServed: { "@type": "City", name: "Калуга" },
            provider: {
              "@type": "Organization",
              name: "ЮрСервис",
              telephone: CONTACTS.phone,
              openingHours: CONTACTS.workingHours,
              address: { "@type": "PostalAddress", addressLocality: "Калуга" },
            },
          })}
        </script>
      </Helmet>

      {/* ============ 1. HERO С ФОРМОЙ И ВСЕМИ КОНТАКТАМИ ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200 text-lg">
                <Icon name="Clock" className="h-5 w-5 mr-2" />
                Консультация {CONTACTS.responseTime} • {CONTACTS.workingHours}
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Затопили квартиру <span className="text-primary">в Калуге</span>
                ?
              </h1>

              <p className="text-2xl md:text-3xl font-bold text-primary mb-8">
                Вернем деньги за ремонт + штраф 50% в вашу пользу
              </p>

              <div className="space-y-4 mb-10 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3">
                  <Icon name="CheckCircle" className="h-6 w-6 text-green-500" />
                  <span className="text-lg">
                    Специализируемся на заливах с 2016 года
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Icon name="CheckCircle" className="h-6 w-6 text-green-500" />
                  <span className="text-lg">
                    Работаем БЕЗ ПРЕДОПЛАТЫ — платите за результат
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Icon name="CheckCircle" className="h-6 w-6 text-green-500" />
                  <span className="text-lg">
                    Знаем все суды Калуги и специфику работы с УК
                  </span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Левая часть - контакты */}
              <div className="space-y-8">
                <Card className="border-2 border-primary/20 shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-center mb-6">
                      Свяжитесь с юристом прямо сейчас
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

                    {/* Мессенджеры */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-lg text-center mb-4">
                        Или напишите в мессенджер:
                      </h4>

                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          onClick={handleWhatsAppClick}
                          className="h-14 bg-green-600 hover:bg-green-700"
                        >
                          <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                          WhatsApp
                        </Button>

                        <Button
                          onClick={handleTelegramClick}
                          className="h-14 bg-blue-500 hover:bg-blue-600"
                        >
                          <Icon name="Send" className="h-5 w-5 mr-2" />
                          Telegram
                        </Button>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          Ответим в течение {CONTACTS.responseTime}
                        </p>
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
                      Бесплатная консультация юриста
                    </h3>
                    <Badge className="bg-green-100 text-green-800">
                      <Icon name="Check" className="h-4 w-4 mr-1" />
                      Гарантия конфиденциальности
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
                        placeholder="Пример: Затопили соседи сверху в Калуге, повреждены потолок, стены, техника. Составили акт с УК."
                        required
                        className="min-h-[120px]"
                      />
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

      {/* ============ 2. ЧЕК-ЛИСТ ПЕРВЫХ ДЕЙСТВИЙ ============ */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-100 text-red-800 border-red-200">
              <Icon name="AlertTriangle" className="h-4 w-4 mr-2" />
              КРИТИЧЕСКИ ВАЖНО
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Что делать в первые часы после залива в Калуге
            </h2>
            <p className="text-xl text-gray-600">
              Правильные действия сейчас увеличат вашу компенсацию на 30-50%
            </p>
          </div>

          <Card className="shadow-xl border-2 border-red-200">
            <CardContent className="p-8">
              <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-4">
                  <Icon
                    name="AlertCircle"
                    className="h-8 w-8 text-red-500 mt-1 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-red-800 text-lg mb-2">
                      Главная ошибка в Калуге:
                    </h4>
                    <p className="text-red-700">
                      Начинают ремонт ДО фиксации ущерба! Без акта от УК и
                      фото/видео доказательств взыскать компенсацию через суд
                      Калуги будет крайне сложно.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-10">
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
                        ОБЯЗАТЕЛЬНО
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gradient-to-r from-primary/10 to-blue-100 rounded-xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Запутались в действиях?
                    </h3>
                    <p className="text-gray-700">
                      Юрист подскажет по телефону, как правильно составить акт с
                      калужской УК, какие формулировки использовать и как
                      зафиксировать ущерб
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
                    <Icon name="Phone" className="h-5 w-5 mr-2" />
                    Получить инструкцию
                  </Button>
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
                Сколько можно взыскать с виновника залива?
              </h2>
              <p className="text-xl text-gray-600">
                Рассчитайте примерную сумму компенсации по законам РФ
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
                          <span>Минимальный ущерб</span>
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
                      Ваша возможная компенсация
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
                          <span>Штраф 50% (по Закону):</span>
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

                        <Separator className="my-4" />

                        <div className="flex justify-between text-2xl font-bold pt-4 border-t border-white/20">
                          <span>ИТОГО к получению:</span>
                          <span className="text-green-300">
                            {compensation.total.toLocaleString("ru-RU")} ₽
                          </span>
                        </div>
                      </div>

                      <div className="mt-8 p-4 bg-white/10 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Icon
                            name="Info"
                            className="h-5 w-5 text-amber-300 mt-0.5"
                          />
                          <p className="text-sm">
                            <strong>Для Калуги:</strong> Фактическая сумма может
                            отличаться. Точный расчет сделает строительная
                            экспертиза. Мы организуем её проведение.
                          </p>
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

      {/* ============ 4. ТАБЫ С УСЛУГАМИ ============ */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Как мы работаем
            </h2>
            <p className="text-xl text-gray-600">
              Полный цикл от консультации до получения денег
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="compensation">Взыскание</TabsTrigger>
              <TabsTrigger value="documents">Документы</TabsTrigger>
              <TabsTrigger value="court">Суд</TabsTrigger>
            </TabsList>

            <TabsContent value="compensation" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon
                        name="Calculator"
                        className="h-8 w-8 text-blue-600"
                      />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Расчет ущерба</h4>
                    <p className="text-gray-600 text-sm">
                      Точная оценка стоимости ремонта и компенсации
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon
                        name="FileText"
                        className="h-8 w-8 text-green-600"
                      />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Претензия</h4>
                    <p className="text-gray-600 text-sm">
                      Составление юридически грамотного требования
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon
                        name="DollarSign"
                        className="h-8 w-8 text-amber-600"
                      />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Взыскание</h4>
                    <p className="text-gray-600 text-sm">
                      Получение выплаты с виновника
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-lg mb-4">Мы подготовим:</h4>
                      <ul className="space-y-3">
                        {[
                          "Акт о заливе (правильный образец)",
                          "Досудебную претензию виновнику",
                          "Исковое заявление в суд Калуги",
                          "Ходатайства и заявления",
                          "Расчет суммы ущерба",
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <Icon
                              name="Check"
                              className="h-5 w-5 text-green-500"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-bold text-lg mb-3">
                        Важно для Калуги:
                      </h4>
                      <p className="text-gray-700 mb-4">
                        В разных районах Калуги суды могут требовать
                        дополнительные документы. Мы знаем эти особенности.
                      </p>
                      <Button variant="outline" className="w-full">
                        <Icon name="Download" className="h-4 w-4 mr-2" />
                        Скачать образец акта
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="court">
              <Card>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-lg mb-4">Суд в Калуге:</h4>
                      <ul className="space-y-3">
                        {[
                          "Подготовка и подача иска",
                          "Представительство в заседаниях",
                          "Взаимодействие с судебными приставами",
                          "Обжалование решений при необходимости",
                          "Контроль за исполнением решения",
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <Icon
                              name="Check"
                              className="h-5 w-5 text-green-500"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-3">Наш опыт:</h4>
                      <p className="text-gray-700 mb-4">
                        Работали во всех районных судах Калуги. Знаем судей, их
                        требования и как эффективно вести дела именно в
                        калужских судах.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Icon name="MapPin" className="h-4 w-4" />
                        <span>Октябрьский, Московский, Ленинский районы</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ============ 5. ОТЗЫВЫ ============ */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Реальные случаи из нашей практики в Калуге
            </h2>
            <p className="text-xl text-gray-600">
              Более 300 успешно решенных дел о заливах
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow">
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
                  <p className="text-gray-700 italic mb-6">"{review.text}"</p>
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
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">
                  Готовы помочь и в вашем случае!
                </p>
                <p className="text-gray-600">
                  Первая консультация бесплатно. Работаем без предоплаты.
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
                Обсудить мой случай
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. FAQ ============ */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Частые вопросы по заливам в Калуге
            </h2>
            <p className="text-xl text-gray-600">
              Ответы на вопросы, которые волнуют наших клиентов
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border rounded-lg"
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
            <p className="text-lg text-gray-700 mb-6">
              Остались вопросы? Задайте их юристу напрямую
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => {
                  const phoneUrl = `tel:${CONTACTS.phone}`;
                  window.location.href = phoneUrl;
                }}
                className="bg-gradient-to-r from-primary to-blue-600"
              >
                <Icon name="Phone" className="h-5 w-5 mr-2" />
                Позвонить
              </Button>
              <Button size="lg" variant="outline" onClick={handleWhatsAppClick}>
                <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                Написать в WhatsApp
              </Button>
            </div>
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
              СРОЧНАЯ КОНСУЛЬТАЦИЯ • ДО КОНЦА АКЦИИ: {formatTime(timeLeft)}
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Не откладывайте! Каждый день бездействия снижает шансы на
              взыскание
            </h2>

            <p className="text-xl mb-8 text-white/90">
              С каждым днем доказательства теряют силу, а виновник может скрыть
              следы.
              <br />
              Получите пошаговый план действий уже сегодня.
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
                        Бесплатный звонок юристу
                      </p>
                      <p className="text-white/80">
                        {CONTACTS.responseTime} консультации
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={`tel:${CONTACTS.phone}`}
                      className="block text-2xl font-bold hover:text-primary transition-colors"
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
                  <p className="font-bold text-lg">
                    Или напишите в мессенджер:
                  </p>
                  <div className="space-y-3">
                    <Button
                      onClick={handleWhatsAppClick}
                      className="w-full bg-green-600 hover:bg-green-700 h-12"
                    >
                      <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                      WhatsApp
                    </Button>
                    <Button
                      onClick={handleTelegramClick}
                      className="w-full bg-blue-500 hover:bg-blue-600 h-12"
                    >
                      <Icon name="Send" className="h-5 w-5 mr-2" />
                      Telegram
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-white/70 text-sm">
              Работаем по всей Калуге и области. Опыт с 2016 года. Гарантия
              конфиденциальности.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
