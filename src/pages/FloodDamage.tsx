// src/pages/FloodDamagePage.tsx
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
  if (typeof window === "undefined") return;

  // Если уже инициализирован
  if (window.ym) return;

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
  console.log(`🎯 Яндекс.Метрика: цель "${targetName}" отправлена`, params);
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
    // Здесь логика открытия формы
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
          Затопили квартиру в Новосибирске? Возмещение ущерба с 2016 года |
          ЮрСервис НСК
        </title>
        <meta
          name="description"
          content="Вас затопили соседи или УК? Профессиональное взыскание ущерба с 2016 года. Работаем без предоплаты. Вернем деньги за ремонт, штраф 50% и моральный вред. ☎ +7 (383) 235-95-05"
        />
        <meta
          name="keywords"
          content="затопили квартиру новосибирск, возмещение ущерба от потопа, взыскание ущерба от залива, юрист по потопам, залили соседи, управляющая компания виновата"
        />
        <link
          rel="canonical"
          href="https://юридический-сервис.рф/затопление-квартиры"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BadgeCheck className="h-4 w-4" />
              Специализация с 2016 года
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="block text-slate-900">Вас затопили</span>
              <span className="block text-blue-600 mt-2">соседи или УК?</span>
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
                <div className="text-2xl font-bold text-blue-600">8 лет</div>
                <div className="text-sm text-slate-600">специализации</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-slate-600">успешных дел</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold text-blue-600">1-3 мес</div>
                <div className="text-sm text-slate-600">средний срок</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold text-blue-600">0 ₽</div>
                <div className="text-sm text-slate-600">предоплата</div>
              </div>
            </div>

            {/* Телефон и CTA */}
            <div className="space-y-6">
              <div>
                <a
                  href="tel:+73832359505"
                  onClick={handlePhoneCall}
                  className="inline-flex items-center justify-center text-2xl md:text-3xl font-bold text-slate-900 hover:text-blue-600 transition-colors bg-white px-8 py-5 rounded-xl shadow-lg hover:shadow-xl border-2 border-blue-200"
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
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6 shadow-lg hover:shadow-xl"
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

      {/* Блок "Проблемы" */}
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
                desc: "УК фиксирует только видимые повреждения, упуская скрытые дефекты, которые проявятся через месяц",
                color: "red",
              },
              {
                icon: FileText,
                title: "Слабая экспертиза",
                desc: "Самостоятельная или дешёвая оценка не имеет юридической силы и легко оспаривается в суде",
                color: "amber",
              },
              {
                icon: Clock,
                title: "Пропуск сроков",
                desc: "Незнание процессуальных сроков приводит к потере права на взыскание неустойки и штрафов",
                color: "blue",
              },
              {
                icon: Scale,
                title: 'Только "ущерб"',
                desc: "Требуют только стоимость ремонта, забывая про штраф 50%, моральный вред и судебные расходы",
                color: "purple",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="group hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div
                    className={`inline-flex p-3 rounded-lg mb-4 bg-${item.color}-100 text-${item.color}-700`}
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => handleMainCta("problems_block")}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Избежать этих ошибок
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Блок "Расчет компенсации" */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Что можно взыскать кроме стоимости ремонта?
            </h2>
            <p className="text-lg text-slate-600">
              Полный перечень компенсаций по закону
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[
                {
                  title: "Прямой имущественный ущерб",
                  desc: "Восстановительный ремонт потолка, стен, пола, замена испорченной мебели, техники, личных вещей",
                  amount: "Основа расчёта",
                  icon: Home,
                  color: "blue",
                },
                {
                  title: "Неустойка за просрочку",
                  desc: "3% от суммы ущерба за каждый день задержки выплат после получения вашего требования",
                  amount: "≈ +15-30%",
                  icon: Calendar,
                  color: "green",
                },
                {
                  title: "Штраф 50% в вашу пользу",
                  desc: 'По Закону "О защите прав потребителей", если виновник не удовлетворил требование добровольно',
                  amount: "+50%",
                  icon: Scale,
                  color: "amber",
                },
                {
                  title: "Компенсация морального вреда",
                  desc: "За пережитый стресс, нарушение покоя, неудобства и ухудшение условий проживания",
                  amount: "+10-150 тыс. ₽",
                  icon: Users,
                  color: "purple",
                },
                {
                  title: "Все судебные расходы",
                  desc: "Стоимость независимой экспертизы, госпошлина, услуги представителя, почтовые расходы",
                  amount: "Полный возврат",
                  icon: FileText,
                  color: "red",
                },
                {
                  title: "Проценты по ст. 395 ГК РФ",
                  desc: "За неправомерное пользование чужими денежными средствами за весь период просрочки",
                  amount: "По ключевой ставке ЦБ",
                  icon: Trophy,
                  color: "cyan",
                },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-lg bg-${item.color}-100`}>
                        <item.icon
                          className={`h-6 w-6 text-${item.color}-700`}
                        />
                      </div>
                      <span
                        className={`bg-${item.color}-100 text-${item.color}-700 font-bold px-3 py-1 rounded-lg text-sm`}
                      >
                        {item.amount}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Итоговая сумма может в{" "}
                  <span className="text-blue-600">1.5-2 раза превышать</span>{" "}
                  первоначальную оценку ущерба
                </h3>
                <p className="text-slate-600 mb-6">
                  Наша задача — последовательно взыскать каждую из этих позиций
                  в суде
                </p>
                <Button
                  onClick={handleFreeAnalysis}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Бесплатно рассчитать мою компенсацию
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Блок "Процесс работы" */}
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
            <div className="relative">
              {/* Временная линия */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block" />

              {[
                {
                  step: "01",
                  title: "Бесплатная консультация и стратегия",
                  desc: "Анализируем вашу ситуацию, документы, определяем всех виновников. Составляем пошаговый план действий с прогнозом сроков и суммы.",
                  icon: Shield,
                },
                {
                  step: "02",
                  title: "Экспертиза и юридическая фиксация",
                  desc: "Организуем независимую экспертизу ущерба с участием виновника. Составляем все необходимые акты и документы с соблюдением процессуальных норм.",
                  icon: FileText,
                },
                {
                  step: "03",
                  title: "Досудебная работа и претензии",
                  desc: "Подготавливаем и направляем официальные претензии всем ответственным лицам. Ведём переговоры, фиксируем факты обращения и ответы.",
                  icon: Mail,
                },
                {
                  step: "04",
                  title: "Судебное представительство",
                  desc: "Составляем и подаём исковое заявление со всеми требованиями. Полностью представляем ваши интересы в суде — вам не нужно присутствовать.",
                  icon: Scale,
                },
                {
                  step: "05",
                  title: "Исполнение решения и выплаты",
                  desc: "Контролируем исполнение судебного решения, работаем с судебными приставами. Вы получаете деньги на счёт — мы получаем оплату.",
                  icon: CheckCircle,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col md:flex-row items-start mb-12 last:mb-0"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 md:mb-0 md:mr-8 z-10">
                    {item.step}
                  </div>
                  <Card className="flex-grow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg mr-4">
                          <item.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-slate-600">{item.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Форма */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
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
                className="w-full bg-white text-blue-600 hover:bg-blue-50 text-lg py-6"
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
                  // Здесь можно вызвать функцию открытия формы
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
    </>
  );
}
