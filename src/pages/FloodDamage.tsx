import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  Shield,
  Calendar,
  FileText,
  Phone,
  AlertTriangle,
  Zap,
  Home,
  Clock,
  Award,
  Users,
  Scale,
  Download,
  XCircle,
  ChevronRight,
  Mail,
  ArrowRight,
  Trophy,
  BadgeCheck,
  ExternalLink,
  Star,
  User,
  TrendingUp,
  TrendingDown,
  Calculator,
  Camera,
  Info,
  Building,
  Construction,
  Handshake,
} from "lucide-react";

declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: string,
      goalName?: string,
      params?: Record<string, any>,
    ) => void;
    dataLayer?: any[];
  }
}

// Инициализация Яндекс.Метрики
const initYandexMetrika = () => {
  if (typeof window === "undefined" || window.ym) return;

  (function (m: any, e: any, t: any, r: any, i: any, k: any, a: any) {
    m[i] =
      m[i] ||
      function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
    m[i].l = 1 * new Date();
    for (let j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) return;
    }
    (k = e.createElement(t)),
      (a = e.getElementsByTagName(t)[0]),
      (k.async = 1),
      (k.src = r),
      a.parentNode.insertBefore(k, a);
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  window.ym?.(106063131, "init", {
    defer: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    trackHash: true,
    ecommerce: "dataLayer",
    triggerEvent: true,
    trackForms: true,
    params: {
      site_type: "legal_services",
      service_type: "flood_damage",
      region: "novosibirsk",
      page_type: "landing",
    },
  });
};

// Функции для целей
const reachGoal = (targetName: string, params?: Record<string, any>) => {
  if (typeof window === "undefined" || !window.ym) return;
  window.ym(106063131, "reachGoal", targetName, params);
};

const hitPageView = (url: string) => {
  if (typeof window === "undefined" || !window.ym) return;
  window.ym(106063131, "hit", url, { title: document.title });
};

export default function FloodDamagePage() {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // Инициализация и отслеживание
  useEffect(() => {
    initYandexMetrika();
    hitPageView(window.location.pathname);

    // Exit-intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 0 && !showExitPopup) {
        reachGoal("exit_intent_triggered", {
          time_on_page: Math.round(performance.now() / 1000),
        });
        setShowExitPopup(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [showExitPopup]);

  // Обработчики конверсий
  const handleMainCta = (source: string) => {
    reachGoal("main_cta_click", {
      button_location: source,
      page_section: "hero",
    });
  };

  const handlePhoneCall = () => {
    reachGoal("phone_call_initiated", {
      phone: "+73832359505",
      context: "direct_click",
    });
  };

  const handleDownloadTemplate = () => {
    reachGoal("template_downloaded", {
      file_type: "pretension_template",
      source: "main_button",
    });

    // Скачивание файла
    const link = document.createElement("a");
    link.href = "/templates/pretension-template.pdf";
    link.download = "Шаблон_досудебной_претензии_ЮрСервис_НСК.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reachGoal("contact_form_submitted", {
      form_type: "consultation_request",
      name_length: name.length,
      email_provider: email.includes("@") ? email.split("@")[1] : "unknown",
    });

    // Ваша логика отправки формы
    console.log("Форма отправлена:", { name, email });

    // Сброс формы
    setName("");
    setEmail("");
  };

  const handleFreeAnalysis = () => {
    reachGoal("free_analysis_requested", {
      offer_type: "document_analysis",
      context: "middle_page",
    });
  };

  return (
    <>
      <Helmet>
        <title>
          Затопили квартиру в Новосибирске? Возмещение ущерба с 2016 года | +7
          (383) 235-95-05
        </title>
        <meta
          name="description"
          content="Вас затопили соседи или УК? Профессиональное взыскание ущерба с 2016 года. Работаем без предоплаты. Вернем деньги за ремонт, штраф 50% и моральный вред. Звоните: +7 (383) 235-95-05"
        />
        <link
          rel="canonical"
          href="https://юридический-сервис.рф/затопление-квартиры"
        />
      </Helmet>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BadgeCheck className="h-4 w-4" />
              Специализация с 2016 года
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="block text-slate-900">Вас затопили</span>
              <span className="block text-primary mt-2">соседи или УК?</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
              <span className="font-semibold">
                Вернем деньги за ремонт + штраф 50% + моральный вред.
              </span>
              <br />
              Работаем без предоплаты — платите только после получения ваших
              денег.
            </p>

            {/* Ключевые показатели */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto">
              <div className="bg-white p-4 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold text-primary">8 лет</div>
                <div className="text-sm text-slate-600">специализации</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-slate-600">успешных дел</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold text-primary">1-3 мес</div>
                <div className="text-sm text-slate-600">средний срок</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold text-primary">0 ₽</div>
                <div className="text-sm text-slate-600">предоплата</div>
              </div>
            </div>

            {/* Телефон и CTA */}
            <div className="space-y-6">
              <div>
                <a
                  href="tel:+73832359505"
                  onClick={handlePhoneCall}
                  className="inline-flex items-center justify-center text-2xl md:text-3xl font-bold text-slate-900 hover:text-primary transition-colors bg-white px-8 py-5 rounded-xl shadow-lg hover:shadow-xl border-2 border-primary/20"
                >
                  <Phone className="mr-4 h-7 w-7" />
                  +7 (383) 235-95-05
                </a>
                <p className="text-slate-600 mt-3 text-lg">
                  Звоните — первая консультация бесплатно
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => handleMainCta("hero_primary")}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white text-lg px-10 py-6 shadow-lg hover:shadow-xl"
                >
                  <Zap className="mr-3 h-5 w-5" />
                  Бесплатная консультация юриста
                </Button>

                <Button
                  onClick={handleDownloadTemplate}
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2"
                >
                  <Download className="mr-3 h-5 w-5" />
                  Скачать шаблон претензии
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. БЛОК ПРОБЛЕМ */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Почему самостоятельное взыскание{" "}
              <span className="text-red-600">часто проваливается</span>?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              7 критических ошибок, из-за которых люди теряют до 70% положенной
              компенсации
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: "Неполный акт",
                desc: "УК фиксирует только видимые повреждения, упуская скрытые дефекты",
              },
              {
                icon: FileText,
                title: "Слабая экспертиза",
                desc: "Самостоятельная оценка не имеет юридической силы",
              },
              {
                icon: Clock,
                title: "Пропуск сроков",
                desc: "Незнание процессуальных сроков ведет к потере права",
              },
              {
                icon: Scale,
                title: 'Только "ущерб"',
                desc: "Забывают про штраф 50%, моральный вред и судебные расходы",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <item.icon className="h-10 w-10 text-red-500 mb-4" />
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. КТО ВИНОВАТ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Кто отвечает за потоп и когда?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "СОБСТВЕННИК КВАРТИРЫ",
                desc: "Вся сантехника и техника ПОСЛЕ отключающих кранов",
                examples: [
                  "Протекающий кран",
                  "Лопнувший шланг стиральной машины",
                  "Забытый открытым вентиль",
                ],
                color: "red",
                icon: Home,
              },
              {
                title: "УПРАВЛЯЮЩАЯ КОМПАНИЯ",
                desc: "Общедомовое имущество ДО первых отключающих кранов",
                examples: [
                  "Протечка стояка",
                  "Прорыв труб на чердаке",
                  "Неисправность общего счетчика",
                ],
                color: "blue",
                icon: Building,
              },
              {
                title: "ЗАСТРОЙЩИК / ПОДРЯДЧИК",
                desc: "Скрытые строительные дефекты и нарушения технологии",
                examples: [
                  "Некачественные трубы в стенах",
                  "Нарушение герметизации",
                  "Брак монтажа",
                ],
                color: "amber",
                icon: Construction,
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="border-t-4 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="p-3 rounded-lg bg-slate-100 mb-4">
                    <item.icon className="h-6 w-6 text-slate-700" />
                  </div>

                  <h3 className="font-bold text-xl mb-3 text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{item.desc}</p>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700">
                      Примеры:
                    </p>
                    {item.examples.map((example, i) => (
                      <div
                        key={i}
                        className="flex items-center text-sm text-slate-600"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-2"></div>
                        {example}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. КАЛЬКУЛЯТОР УЩЕРБА */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white border-2 border-slate-300 rounded-full shadow-sm mb-6">
                <Calculator className="h-10 w-10 text-slate-700" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                <span className="block">Предварительный расчет</span>
                <span className="block text-lg font-normal text-slate-600 mt-2">
                  на основе средней рыночной стоимости ремонта в Новосибирске
                </span>
              </h2>
            </div>

            <Card className="border border-slate-300 overflow-hidden">
              <div className="bg-slate-900 text-white px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">
                      Расчетная форма ЭК-2024
                    </h3>
                    <p className="text-sm text-slate-300 opacity-90">
                      Данные для ориентировочной оценки ущерба
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Версия: 2.4.1</div>
                    <div className="text-xs text-slate-400">
                      Действительно до: 31.12.2024
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Левая колонка - параметры */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 text-lg border-b border-slate-200 pb-2">
                        Параметры повреждений
                      </h4>

                      <div className="space-y-4">
                        {[
                          {
                            id: "area",
                            label: "Площадь затопления",
                            unit: "м²",
                          },
                          {
                            id: "material",
                            label: "Отделка потолка",
                            unit: "",
                          },
                          { id: "walls", label: "Отделка стен", unit: "" },
                          {
                            id: "floor",
                            label: "Напольное покрытие",
                            unit: "",
                          },
                        ].map((param) => (
                          <div key={param.id} className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">
                              {param.label}
                              {param.unit && (
                                <span className="text-slate-500 ml-1">
                                  ({param.unit})
                                </span>
                              )}
                            </label>
                            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none bg-white">
                              <option value="">Выберите вариант</option>
                              <option value="5">
                                До 10 м² (ванная, туалет)
                              </option>
                              <option value="15">10-20 м² (комната)</option>
                              <option value="30">20-40 м² (2 комнаты)</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Блок имущества */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 text-lg border-b border-slate-200 pb-2">
                        Поврежденное имущество
                      </h4>

                      <div className="space-y-3">
                        {[
                          {
                            label: "Мебель (шкаф, диван, кровать)",
                            value: 50000,
                          },
                          {
                            label: "Бытовая техника (ТВ, ноутбук)",
                            value: 30000,
                          },
                          { label: "Кухонная техника", value: 25000 },
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                          >
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id={`item-${idx}`}
                                className="h-4 w-4 text-primary border-slate-300 rounded focus:ring-primary/50"
                              />
                              <label
                                htmlFor={`item-${idx}`}
                                className="ml-3 text-sm text-slate-700"
                              >
                                {item.label}
                              </label>
                            </div>
                            <span className="text-sm font-medium text-slate-900">
                              до {item.value.toLocaleString("ru-RU")} ₽
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Правая колонка - расчет */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 text-lg border-b border-slate-200 pb-2">
                        Предварительный расчет
                      </h4>

                      <div className="space-y-3 mb-6">
                        {[
                          {
                            item: "Ремонт потолка",
                            amount: "24 000 ₽",
                            note: "15 м² × 1 600 ₽",
                          },
                          {
                            item: "Ремонт стен",
                            amount: "27 000 ₽",
                            note: "30 м² × 900 ₽",
                          },
                          {
                            item: "Замена напольного покрытия",
                            amount: "30 000 ₽",
                            note: "15 м² × 2 000 ₽",
                          },
                        ].map((row, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 border-b border-slate-100 last:border-0"
                          >
                            <div>
                              <div className="font-medium text-slate-900">
                                {row.item}
                              </div>
                              {row.note && (
                                <div className="text-xs text-slate-500 mt-1">
                                  {row.note}
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-slate-900">
                                {row.amount}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-medium">
                            Базовый ущерб:
                          </span>
                          <span className="text-2xl font-bold">146 000 ₽</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Без учета дополнительных компенсаций</span>
                          <Info className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    {/* Дополнительные компенсации */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 text-lg border-b border-slate-200 pb-2">
                        Дополнительные требования
                      </h4>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
                          <div>
                            <div className="font-medium text-amber-900">
                              Неустойка (3% в месяц)
                            </div>
                            <div className="text-sm text-amber-700">
                              За каждый день просрочки выплат
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-amber-900">
                              +43 800 ₽
                            </div>
                            <div className="text-sm text-amber-700">
                              за 3 месяца
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div>
                            <div className="font-medium text-blue-900">
                              Штраф 50%
                            </div>
                            <div className="text-sm text-blue-700">
                              При отказе от добровольного возмещения
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-blue-900">
                              +73 000 ₽
                            </div>
                            <div className="text-sm text-blue-700">
                              50% от ущерба
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Итоговый блок */}
                    <div className="pt-6 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-2xl font-bold text-slate-900">
                            287 800 ₽
                          </div>
                          <div className="text-sm text-slate-600">
                            Потенциальная итоговая сумма
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">
                            +97%
                          </div>
                          <div className="text-sm text-slate-600">
                            к базовому ущербу
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <Button
                          size="lg"
                          className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold"
                          onClick={handleFreeAnalysis}
                        >
                          <Calculator className="mr-3 h-5 w-5" />
                          Получить точный расчет
                        </Button>
                        <p className="text-xs text-slate-500 mt-3">
                          *Расчет приблизительный. Точную сумму определит
                          эксперт на месте
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. СРАВНИТЕЛЬНАЯ ТАБЛИЦА */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Сравнительный анализ эффективности
              </h2>
              <p className="text-slate-600">
                На основе 243 дел за 2022-2024 гг.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-lg">
              {/* Шапка таблицы */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-300">
                <div className="p-6 bg-slate-50 border-r border-slate-300">
                  <div className="text-lg font-bold text-slate-900">
                    Параметры оценки
                  </div>
                </div>
                <div className="p-6 border-r border-slate-300 bg-red-50/30">
                  <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-3">
                    <User className="h-4 w-4 mr-2" />
                    САМОСТОЯТЕЛЬНО
                  </div>
                  <div className="text-lg font-bold text-red-700">
                    Без юридической помощи
                  </div>
                </div>
                <div className="p-6 bg-emerald-50/30">
                  <div className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-3">
                    <Shield className="h-4 w-4 mr-2" />С ЮРИСТОМ
                  </div>
                  <div className="text-lg font-bold text-emerald-700">
                    Профессиональное сопровождение
                  </div>
                </div>
              </div>

              {/* Строки сравнения */}
              {[
                {
                  parameter: "Фиксация ущерба",
                  independent: {
                    text: "Фото на телефон, поверхностный акт от УК",
                    success: "15%",
                  },
                  professional: {
                    text: "Выезд эксперта-оценщика с оборудованием",
                    success: "98%",
                  },
                },
                {
                  parameter: "Итоговая сумма взыскания",
                  independent: {
                    text: "Только стоимость ремонта",
                    success: "154 300 ₽",
                  },
                  professional: {
                    text: "Полный комплекс компенсаций",
                    success: "387 500 ₽",
                  },
                },
                {
                  parameter: "Сроки решения вопроса",
                  independent: {
                    text: "От 6 месяцев до 2 лет",
                    success: "58%",
                  },
                  professional: {
                    text: "1-3 месяца до получения решения",
                    success: "91%",
                  },
                },
              ].map((row, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-1 md:grid-cols-3 border-b border-slate-200 last:border-0 hover:bg-slate-50/50 transition-colors`}
                >
                  <div className="p-6 border-r border-slate-300 bg-slate-50">
                    <div className="text-lg font-bold text-slate-900">
                      {row.parameter}
                    </div>
                  </div>

                  <div className="p-6 border-r border-slate-300">
                    <div className="text-slate-700 mb-3">
                      {row.independent.text}
                    </div>
                    <div className="pt-4 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          Эффективность:
                        </span>
                        <span className="text-lg font-bold text-red-600">
                          {row.independent.success}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-slate-700 mb-3">
                      {row.professional.text}
                    </div>
                    <div className="pt-4 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          Эффективность:
                        </span>
                        <span className="text-lg font-bold text-emerald-600">
                          {row.professional.success}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Итоговая разница */}
            <div className="mt-12 p-8 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Финансовый итог сравнения
                </h3>

                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-400">
                      154 300 ₽
                    </div>
                    <div className="text-sm text-slate-300 mt-2">
                      Самостоятельно
                    </div>
                  </div>
                  <div className="text-center flex items-center justify-center">
                    <ArrowRight className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-400">
                      387 500 ₽
                    </div>
                    <div className="text-sm text-slate-300 mt-2">С юристом</div>
                  </div>
                </div>

                <div className="text-xl font-bold text-white mb-6">
                  Разница: <span className="text-emerald-400">+233 200 ₽</span>{" "}
                  (<span className="text-emerald-400">+151%</span>)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ПРОЦЕСС РАБОТЫ */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Как мы работаем: минимум вашего участия
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Вы занимаетесь своими делами — мы возвращаем ваши деньги
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Бесплатная консультация и стратегия",
                desc: "Анализируем вашу ситуацию, документы, определяем всех виновников. Составляем пошаговый план действий.",
                icon: Shield,
              },
              {
                step: "02",
                title: "Экспертиза и юридическая фиксация",
                desc: "Организуем независимую экспертизу ущерба с участием виновника. Составляем все необходимые акты.",
                icon: FileText,
              },
              {
                step: "03",
                title: "Досудебная работа и претензии",
                desc: "Подготавливаем и направляем официальные претензии всем ответственным лицам.",
                icon: Mail,
              },
              {
                step: "04",
                title: "Судебное представительство",
                desc: "Составляем и подаём исковое заявление со всеми требованиями. Полностью представляем ваши интересы в суде.",
                icon: Scale,
              },
              {
                step: "05",
                title: "Исполнение решения и выплаты",
                desc: "Контролируем исполнение судебного решения, работаем с судебными приставами.",
                icon: CheckCircle,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative flex items-start mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mr-6">
                  {item.step}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-slate-100 rounded-lg mr-4">
                      <item.icon className="h-6 w-6 text-slate-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ФИНАЛЬНЫЙ CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Получите бесплатный анализ вашей ситуации
            </h2>
            <p className="text-lg mb-10 opacity-90">
              Оставьте контакты, и наш юрист свяжется с вами в течение 15 минут
            </p>

            <form
              onSubmit={handleFormSubmit}
              className="space-y-4 bg-white/10 backdrop-blur-sm p-8 rounded-2xl"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Ваше имя
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иван Иванов"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Телефон или Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="+7 (___) ___-__-__ или email"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-white text-primary hover:bg-blue-50 text-lg py-6"
              >
                <Phone className="mr-3 h-5 w-5" />
                Получить консультацию юриста
              </Button>

              <p className="text-sm opacity-75">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>

            <div className="mt-10">
              <a
                href="tel:+73832359505"
                onClick={handlePhoneCall}
                className="inline-flex items-center text-2xl font-bold hover:opacity-90 transition-opacity"
              >
                <Phone className="mr-3 h-7 w-7" />
                +7 (383) 235-95-05
              </a>
              <p className="mt-2 opacity-80">Звоните прямо сейчас</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exit-intent Popup */}
      <Dialog open={showExitPopup} onOpenChange={setShowExitPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Уходите? Заберите полезный документ!
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-6 text-slate-600">
              Мы подготовили <strong>шаблон досудебной претензии</strong> с
              комментариями юриста. Это обязательный первый шаг для взыскания
              ущерба.
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  reachGoal("exit_popup_download");
                  handleDownloadTemplate();
                  setShowExitPopup(false);
                }}
                className="w-full"
              >
                <Download className="mr-2 h-5 w-5" />
                Скачать шаблон бесплатно
              </Button>

              <Button
                onClick={() => {
                  reachGoal("exit_popup_consultation");
                  setShowExitPopup(false);
                }}
                variant="outline"
                className="w-full"
              >
                Нужна помощь юриста
              </Button>

              <Button
                onClick={() => setShowExitPopup(false)}
                variant="ghost"
                className="w-full"
              >
                Нет, спасибо
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Футер */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-2xl font-bold">
                Юридическая помощь при заливе квартиры
              </p>
              <p className="text-slate-400 mt-2">
                Специализация с 2016 года. Новосибирск и область
              </p>
            </div>
            <div className="text-center md:text-right">
              <a
                href="tel:+73832359505"
                className="text-3xl font-bold hover:text-primary transition-colors"
              >
                +7 (383) 235-95-05
              </a>
              <p className="text-slate-400 mt-2">Ежедневно с 9:00 до 21:00</p>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>© {new Date().getFullYear()} Все права защищены</p>
          </div>
        </div>
      </footer>
    </>
  );
}
