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
    },
  });
};

// Функции для отправки целей
const reachGoal = (targetName: string, params?: Record<string, any>) => {
  if (typeof window === "undefined" || !window.ym) return;
  window.ym(106063131, "reachGoal", targetName, params);
};

const hitPageView = (url: string) => {
  if (typeof window === "undefined" || !window.ym) return;
  window.ym(106063131, "hit", url);
};

export default function FloodDamagePage() {
  const [showExitPopup, setShowExitPopup] = useState(false);

  // Инициализация Метрики и отслеживание страницы
  useEffect(() => {
    initYandexMetrika();
    hitPageView(window.location.pathname);

    // Exit-intent popup
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 0) {
        reachGoal("exit_intent_shown");
        setShowExitPopup(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  // Обработчики для целей
  const handleConsultationClick = () => {
    reachGoal("free_consultation_request", { location: "hero" });
    // Здесь ваш код открытия формы
  };

  const handlePhoneClick = () => {
    reachGoal("phone_call_click", { phone: "+73832359505" });
  };

  const handleDownloadClick = () => {
    reachGoal("document_download", { file_name: "Шаблон_претензии.pdf" });
    // Скачивание файла
    const link = document.createElement("a");
    link.href = "/templates/pretension-template.pdf";
    link.download = "Шаблон_досудебной_претензии_при_заливе.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSecondaryCta = (location: string) => {
    reachGoal("secondary_cta_click", { location });
    // Здесь ваш код для вторичного CTA
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
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block">Вас затопили</span>
              <span className="block text-primary">соседи или УК?</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              <span className="font-bold">
                Специализируемся на взыскании ущерба с потопа
              </span>{" "}
              — работаем с 2016 года в Новосибирске
            </p>

            <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
              Вернем деньги за ремонт + штраф 50% + моральный вред
            </p>

            {/* Телефон */}
            <div className="mb-12">
              <a
                href="tel:+73832359505"
                onClick={handlePhoneClick}
                className="inline-flex items-center justify-center text-3xl md:text-4xl font-bold text-gray-900 hover:text-primary transition-colors bg-white px-8 py-6 rounded-2xl shadow-xl hover:shadow-2xl border-2 border-primary/20"
              >
                <Phone className="mr-4 h-10 w-10" />
                +7 (383) 235-95-05
              </a>
              <p className="text-gray-600 mt-3 text-lg">
                Звоните — первая консультация бесплатно
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleConsultationClick}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white text-lg px-10 py-7 shadow-lg hover:shadow-xl"
              >
                <Zap className="mr-3" />
                Бесплатная консультация юриста
              </Button>

              <Button
                onClick={handleDownloadClick}
                size="lg"
                variant="outline"
                className="text-lg px-8 py-7 border-2"
              >
                <Download className="mr-3" />
                Скачать шаблон претензии
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Проблемы и ошибки */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Почему 83% людей <span className="text-red-600">теряют деньги</span>{" "}
            при самостоятельном взыскании?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: "Ошибка в акте",
                desc: "УК составляет поверхностный акт, упуская 60% повреждений",
              },
              {
                icon: FileText,
                title: "Слабая экспертиза",
                desc: "Самостоятельная оценка легко оспаривается в суде",
              },
              {
                icon: Clock,
                title: "Пропуск сроков",
                desc: "Незнание процедур ведет к потере права на взыскание",
              },
              {
                icon: Scale,
                title: "Только ущерб",
                desc: "Не требуют штраф 50%, моральный вред и судебные расходы",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <item.icon className="h-12 w-12 text-red-500 mb-4" />
                  <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Гарантии */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Мы берем на себя все риски
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Calendar,
                value: "8 лет",
                title: "специализации",
                desc: "Работаем только с заливами с 2016 года",
              },
              {
                icon: CheckCircle,
                title: "Оплата по результату",
                desc: "Платите только после получения ваших денег",
              },
              {
                icon: Shield,
                title: "Штраф 50% в вашу пользу",
                desc: "Добьемся в суде по Закону о защите прав потребителей",
              },
              {
                icon: Users,
                title: "Знание местных судов",
                desc: "Работаем со всеми районными судами Новосибирска",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className={`text-center border-t-4 ${idx === 0 ? "border-t-blue-500" : idx === 1 ? "border-t-green-500" : idx === 2 ? "border-t-amber-500" : "border-t-purple-500"} pt-6 hover:shadow-md`}
              >
                <CardContent>
                  <item.icon
                    className={`h-12 w-12 ${idx === 0 ? "text-blue-500" : idx === 1 ? "text-green-500" : idx === 2 ? "text-amber-500" : "text-purple-500"} mx-auto mb-4`}
                  />
                  {item.value && (
                    <p className="text-4xl font-black text-gray-900">
                      {item.value}
                    </p>
                  )}
                  <p className="text-xl font-bold mt-2">{item.title}</p>
                  <p className="text-gray-600 mt-2">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Расчет компенсации */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Из чего складывается ваша{" "}
            <span className="text-primary">итоговая компенсация</span>
          </h2>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[
                {
                  title: "Прямой ущерб",
                  desc: "Ремонт потолка, стен, пола, замена имущества",
                  amount: "Основа расчета",
                },
                {
                  title: "Неустойка",
                  desc: "3% от суммы ущерба за каждый день просрочки",
                  amount: "+ 3% в месяц",
                },
                {
                  title: "Штраф 50%",
                  desc: "Взыскивается в вашу пользу, если дело дошло до суда",
                  amount: "+ 50% к ущербу",
                },
                {
                  title: "Моральный вред",
                  desc: "Компенсация за стресс и нарушение покоя",
                  amount: "+ 10-100 тыс. ₽",
                },
                {
                  title: "Судебные расходы",
                  desc: "Оценка, госпошлина, наши услуги",
                  amount: "Полное возмещение",
                },
                {
                  title: "Проценты по ст. 395 ГК РФ",
                  desc: "За время пользования вашими деньгами",
                  amount: "+ по ставке ЦБ",
                },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className="p-6 border-l-4 border-l-primary hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                        {item.amount}
                      </span>
                    </div>
                    <p className="text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
              <p className="text-2xl font-bold">
                Итог:{" "}
                <span className="text-primary">
                  Финальная сумма может в 1.5-2 раза превышать стоимость ремонта
                </span>
              </p>
              <p className="text-gray-600 mt-2">
                Наша задача — добиться каждой позиции в суде
              </p>
              <Button
                onClick={() => handleSecondaryCta("compensation_block")}
                className="mt-6 bg-primary hover:bg-primary/90"
              >
                Рассчитать мою компенсацию
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Процесс работы */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Ваше спокойствие — наша работа
          </h2>
          <p className="text-center text-gray-600 mb-10 text-lg">
            Минимум вашего участия, максимум результата
          </p>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Консультация и стратегия",
                desc: "Анализируем вашу ситуацию, определяем всех виновников, разрабатываем план действий. Бесплатно.",
              },
              {
                step: "2",
                title: "Экспертиза и фиксация",
                desc: "Наш оценщик выезжает на объект, составляет детальный отчет об ущербе, который принимают суды.",
              },
              {
                step: "3",
                title: "Досудебная работа",
                desc: "Готовим официальные претензии всем ответственным лицам. Фиксируем факт обращения.",
              },
              {
                step: "4",
                title: "Судебное представительство",
                desc: "Ведем всё дело в суде. Вам не нужно присутствовать. Готовим все документы и ходатайства.",
              },
              {
                step: "5",
                title: "Исполнение решения",
                desc: "Контролируем выплаты, работаем с приставами. Вы получаете деньги — мы получаем оплату.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mr-6">
                  {item.step}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Кто виноват */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Кто отвечает за потоп и когда?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Scale className="mr-3 text-primary" /> Правовая оценка:
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-bold">
                      Собственник квартиры сверху
                    </span>
                    <p className="text-gray-600">
                      Отвечает за всё, что происходит после отключающих кранов:
                      неисправные краны, стиральные машины, оставленные
                      открытыми вентили.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-bold">Управляющая компания (УК)</span>
                    <p className="text-gray-600">
                      Виновата, если протечка из общедомового имущества: стояки
                      до первого крана, крыша, общие коммуникации.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-bold">Застройщик/подрядчик</span>
                    <p className="text-gray-600">
                      Несет ответственность при строительном браке:
                      некачественные трубы, нарушение технологии монтажа.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-amber-800">
                  Важно знать:
                </h3>
                <ul className="space-y-3 text-amber-800">
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Даже если виноваты арендаторы — иск к собственнику
                    </span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      УК платит в 3% случаев добровольно — готовьтесь к суду
                    </span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Срок исковой давности — 3 года с момента обнаружения
                      ущерба
                    </span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Без акта о заливе и экспертизы суд откажет во взыскании
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Психологические боли и решения */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Мы понимаем вашу ситуацию и знаем как решить
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <AlertTriangle className="mr-3 text-red-500" /> Ваши проблемы
                  и боли:
                </h3>
                <ul className="space-y-3">
                  {[
                    "Паника и растерянность в первый момент",
                    "Гнев на соседей, которые отказываются платить",
                    "Страх конфликта и испорченных отношений",
                    "Ощущение беспомощности перед УК и бюрократией",
                    "Тревога о стоимости ремонта и потере имущества",
                    "Усталость от бумажной волокиты и судов",
                    "Неверие в справедливость и систему",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <CheckCircle className="mr-3 text-green-500" /> Наши решения:
                </h3>
                <ul className="space-y-3">
                  {[
                    "Четкий план действий в первые 24 часа",
                    "Ведем все переговоры за вас — никаких конфликтов",
                    "Берем на себя весь стресс общения с виновником",
                    "Знаем все лазейки УК и как их закрыть",
                    "Финансовая защита — вы не тратитесь на ремонт",
                    "Полная документальная поддержка",
                    "Восстановление справедливости и вашего спокойствия",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Не дайте ущербу стать «недоказанным»
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            С каждым днём сложнее зафиксировать последствия. Виновники находят
            оправдания, а сроки исковой давности — идут.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              onClick={handleConsultationClick}
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 text-lg px-10 py-7"
            >
              <Phone className="mr-3" />
              Получить консультацию
            </Button>

            <a
              href="tel:+73832359505"
              onClick={handlePhoneClick}
              className="text-2xl font-bold hover:opacity-90 transition-opacity"
            >
              +7 (383) 235-95-05
            </a>
          </div>

          <p className="mt-8 text-white/80">
            <strong>Спецпредложение:</strong> Оставьте заявку сегодня — получите
            бесплатный анализ ваших документов.
          </p>
        </div>
      </section>

      {/* Exit-intent Popup */}
      <Dialog open={showExitPopup} onOpenChange={setShowExitPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Уже уходите? Заберите полезный документ!
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">
              Мы подготовили для вас{" "}
              <strong>бесплатный шаблон досудебной претензии</strong> с
              комментариями юриста. Это обязательный первый шаг для взыскания
              ущерба.
            </p>

            <div className="space-y-4">
              <Button
                onClick={() => {
                  reachGoal("exit_popup_download");
                  handleDownloadClick();
                  setShowExitPopup(false);
                }}
                className="w-full bg-primary"
              >
                <Download className="mr-2" />
                Скачать шаблон претензии
              </Button>

              <Button
                onClick={() => {
                  reachGoal("exit_popup_consultation");
                  handleConsultationClick();
                  setShowExitPopup(false);
                }}
                variant="outline"
                className="w-full"
              >
                Нужна консультация юриста
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
