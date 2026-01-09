import { Button } from "@/components/ui/button";
import { trackCustomGoal } from "@/utils/metrika";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Scale,
  Phone,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Users,
  FileQuestion,
  Camera,
  Award,
  FileText,
  Search,
  Trophy,
  Lightbulb,
  MessageCircle,
  ChevronRight,
  AlertCircle,
  Shield,
  Clock,
  DollarSign,
  ThumbsUp,
  ArrowRight,
  Star,
  Calendar,
  HelpCircle,
  X,
} from "lucide-react";

const GuiltDetermination = () => {
  const PHONES = {
    MAIN_DISPLAY: "+7 (383) 235-95-05",
    MAIN_TEL: "+73832359505",
    MESSENGER_DISPLAY: "+7 993 190 35 00",
    MESSENGER_RAW: "+79931903500",
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    document.title =
      "Несправедливо признали виновным в ДТП? Исправим в суде — Новосибирск";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Вас несправедливо признали виновным в аварии? Докажем вашу невиновность в суде. 15 лет опыта, 98% успеха. Бесплатный разбор вашего дела за 1 час.",
    );

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute(
      "href",
      "https://юридический-сервис.рф/guilt-determination",
    );

    return () => {
      document.title = "Юридические услуги в Новосибирске";
    };
  }, []);

  const handleConsultation = () => {
    trackCustomGoal("guilt_determination_consultation", {
      source: "page",
      action: "phone_call",
    });
    window.location.href = `tel:${PHONES.MAIN_TEL}`;
  };

  const handleFreeAnalysis = () => {
    trackCustomGoal("free_analysis_click", { source: "hero" });
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 5000);
  };

  const pains = [
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "ГИБДД составила протокол против вас",
      description:
        "Инспектор не разобрался в ситуации, но документы уже подписаны",
      emotion: "Обида и несправедливость",
    },
    {
      icon: <FileQuestion className="h-6 w-6" />,
      title: "Страховая отказывает в выплате",
      description: "Начинают требовать деньги с вас, хотя это не ваша вина",
      emotion: "Беспомощность и стресс",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Установили обоюдную вину",
      description:
        "Хотя второй участник явно нарушил ПДД, вам тоже приписывают вину",
      emotion: "Разочарование в системе",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Сроки обжалования истекают",
      description:
        "10 дней на обжалование, 15 дней на оплату штрафа — время уходит",
      emotion: "Тревога и давление",
    },
  ];

  const guarantees = [
    {
      text: "Бесплатный анализ ваших документов",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      text: "Фиксируем стоимость в договоре",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      text: "Работаем до полной отмены вины",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      text: "Оплата по факту выигрыша (опция)",
      icon: <CheckCircle className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-in fade-in zoom-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Заявка принята!</h3>
            <p className="text-gray-600 mb-6">
              Юрист свяжется с вами в течение 15 минут для бесплатного анализа
              документов
            </p>
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-full"
            >
              Понятно
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section - Переработанная с акцентом на боль */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-white to-yellow-50/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-6">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  СРОЧНАЯ ПОМОЩЬ ПРИ НЕСПРАВЕДЛИВОМ ОБВИНЕНИИ
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Вас <span className="text-red-600">несправедливо</span>{" "}
                  обвинили в ДТП?
                </h1>

                <p className="text-xl text-gray-600 mb-8">
                  Не позволяйте ошибке инспектора или неверной оценке ситуации
                  испортить вашу жизнь.
                  <span className="font-semibold text-gray-900">
                    {" "}
                    98% наших клиентов
                  </span>{" "}
                  полностью снимают вину через суд.
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Внимание:</p>
                      <p className="text-gray-700">
                        У вас есть всего{" "}
                        <span className="font-bold">10 дней</span> на
                        обжалование протокола ГИБДД. Каждый день уменьшает
                        шансы.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  {guarantees.map((guarantee, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="bg-green-100 p-1 rounded-full">
                        {guarantee.icon}
                      </div>
                      <span className="text-gray-800">{guarantee.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6"
                    onClick={handleFreeAnalysis}
                  >
                    <MessageCircle className="mr-3 h-6 w-6" />
                    Бесплатный анализ моих документов
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 border-2"
                    onClick={handleConsultation}
                  >
                    <Phone className="mr-3 h-6 w-6" />
                    {PHONES.MAIN_DISPLAY}
                  </Button>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">15+</div>
                    <div className="text-sm text-gray-600">лет опыта</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-600">успешных дел</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">247+</div>
                    <div className="text-sm text-gray-600">клиентов</div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">
                        Срочная консультация
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Ответим через 5 минут
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Как к вам обращаться?
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Ваше имя"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ваш телефон
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Кратко опишите ситуацию
                      </label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent h-32"
                        placeholder="Когда произошло ДТП? Что написано в протоколе?..."
                      />
                    </div>

                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg"
                      onClick={handleFreeAnalysis}
                    >
                      Получить бесплатный анализ
                    </Button>

                    <p className="text-center text-gray-500 text-sm">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных
                      данных
                    </p>

                    <div className="border-t pt-6">
                      <p className="text-center text-gray-600 mb-4">
                        Или напишите прямо сейчас:
                      </p>
                      <div className="flex gap-4 justify-center">
                        <a
                          href={`https://t.me/${PHONES.MESSENGER_RAW.slice(1)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
                        >
                          <MessageSquare className="h-5 w-5" />
                          Telegram
                        </a>
                        <a
                          href="https://max.ru"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#2B6CB0] hover:bg-[#2C5282] text-white px-6 py-3 rounded-lg"
                        >
                          <MessageSquare className="h-5 w-5" />
                          MAX
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pains Section - Усиленная секция с болями */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Знакомые чувства?{" "}
                <span className="text-red-600">Вы не одиноки</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Каждый день к нам обращаются водители, которые оказались в такой
                же ситуации
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {pains.map((pain, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-2xl p-6 hover:border-red-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-red-100 rounded-xl">
                      <div className="text-red-600">{pain.icon}</div>
                    </div>
                    <div className="text-sm font-medium text-red-700 bg-red-50 px-3 py-1 rounded-full">
                      {pain.emotion}
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-3">{pain.title}</h3>
                  <p className="text-gray-600">{pain.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Система часто работает против водителя
              </h3>
              <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
                Инспектор ГИБДД ограничен во времени. Страховая компания хочет
                минимизировать выплаты.
                <span className="font-semibold">
                  {" "}
                  Вам нужен специалист, который будет отстаивать только ваши
                  интересы.
                </span>
              </p>
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleFreeAnalysis}
              >
                <Shield className="mr-3 h-5 w-5" />
                Защитить мои права
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study - Якорь доверия */}
      <section className="py-20 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold mb-6">
                <Trophy className="h-5 w-5" />
                РЕАЛЬНАЯ ИСТОРИЯ ПОБЕДЫ
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                "Все говорили, что дело безнадёжно.
                <span className="text-blue-600">
                  {" "}
                  Мы вернули клиенту 247 109 руб.
                </span>
                "
              </h2>
              <p className="text-xl text-gray-600">
                История Михаила из Новосибирска, который почти смирился с
                несправедливостью
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Ситуация клиента</h3>
                      <p className="text-gray-600">Май 2024, Ленинский район</p>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm mt-1">
                        1
                      </div>
                      <span>ГИБДД прекратила дело за "истечением сроков"</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm mt-1">
                        2
                      </div>
                      <span>
                        Страховая отказала в выплате ("нет виновника")
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm mt-1">
                        3
                      </div>
                      <span>
                        Виновник — без страховки, прав и даже регистрации ТС
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm mt-1">
                        4
                      </div>
                      <span>
                        3 юриста уже отказали, сказав "дело проигрышное"
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Наш результат</h3>
                      <p className="text-gray-600">Дело № 2-3052/2025</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <div className="text-5xl font-bold text-gray-900 mb-2">
                        247 109 руб.
                      </div>
                      <div className="text-gray-600">
                        полностью выплачены клиенту
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          80%
                        </div>
                        <div className="text-sm text-gray-600">
                          вины с виновника
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          20%
                        </div>
                        <div className="text-sm text-gray-600">
                          вины с клиента
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-gray-700 text-sm">
                        <span className="font-semibold">Ключевой момент:</span>{" "}
                        Нашли записи уличных камер, которые не искала ГИБДД.
                        Привлекли собственника автомобиля по ст. 1079 ГК РФ.
                      </p>
                    </div>

                    <Button className="w-full" size="lg" asChild>
                      <Link to="/case-details/delo-2-3052-2025">
                        <FileText className="mr-3 h-5 w-5" />
                        Читать полный разбор дела
                        <ArrowRight className="ml-3 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Если мы смогли помочь в таком, казалось бы, безнадёжном деле —
                <span className="text-blue-600"> мы поможем и вам</span>
              </h3>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8"
                  onClick={handleFreeAnalysis}
                >
                  <Search className="mr-3 h-5 w-5" />
                  Проанализировать мою ситуацию
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8"
                  onClick={handleConsultation}
                >
                  <Phone className="mr-3 h-5 w-5" />
                  Обсудить с юристом
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work - Процесс как путь спасения */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Как мы превращаем{" "}
                <span className="text-green-600">безнадёжное дело</span> в
                победу
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Пошаговый план действий, который мы применяем в каждом деле
              </p>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 -translate-y-1/2 z-0"></div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {[
                  {
                    step: "1",
                    title: "Экстренный анализ",
                    desc: "За 1 час изучаем ваши документы. Говорим честно о шансах.",
                    icon: <Search className="h-8 w-8" />,
                    color: "bg-red-100 text-red-700",
                  },
                  {
                    step: "2",
                    title: "Сбор улик",
                    desc: "Находим камеры, свидетелей, ошибки в протоколе. То, что пропустила ГИБДД.",
                    icon: <Camera className="h-8 w-8" />,
                    color: "bg-yellow-100 text-yellow-700",
                  },
                  {
                    step: "3",
                    title: "Экспертиза",
                    desc: "Проводим автотехническую экспертизу. Доказываем вашу правоту технически.",
                    icon: <FileText className="h-8 w-8" />,
                    color: "bg-blue-100 text-blue-700",
                  },
                  {
                    step: "4",
                    title: "Суд и победа",
                    desc: "Полное представительство. Добиваемся отмены вины и компенсации.",
                    icon: <Scale className="h-8 w-8" />,
                    color: "bg-green-100 text-green-700",
                  },
                ].map((stage, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
                  >
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${stage.color} mb-6`}
                    >
                      {stage.icon}
                    </div>
                    <div className="text-4xl font-bold text-gray-300 mb-2">
                      {stage.step}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{stage.title}</h3>
                    <p className="text-gray-600">{stage.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-12 text-center">
              <h3 className="text-3xl font-bold mb-6">
                Готовы начать борьбу за вашу невиновность?
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                Первый шаг — самый важный. Позвоните сейчас или оставьте заявку
                для
                <span className="font-semibold">
                  {" "}
                  бесплатного анализа вашей ситуации.
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-10 py-7 text-lg"
                  onClick={handleConsultation}
                >
                  <Phone className="mr-3 h-6 w-6" />
                  Позвонить юристу
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-10 py-7 text-lg"
                  onClick={handleFreeAnalysis}
                >
                  <MessageCircle className="mr-3 h-6 w-6" />
                  Бесплатный анализ онлайн
                </Button>
              </div>

              <p className="text-sm opacity-75 mt-8">
                Работаем 24/7. Ответим в течение 15 минут
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - С акцентом на безопасность */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Выберите{" "}
                <span className="text-blue-600">безопасный вариант</span>{" "}
                сотрудничества
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Мы понимаем, что доверять незнакомым юристам страшно. Поэтому
                предлагаем варианты без риска
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Безопасный вариант */}
              <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 flex flex-col">
                <div className="mb-6">
                  <div className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                    МИНИМАЛЬНЫЙ РИСК
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Фиксированная стоимость
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    от 30 000 руб.
                  </div>
                  <p className="text-gray-500">
                    Оплата частями по этапам работы
                  </p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                    <span>Полный анализ и стратегия</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                    <span>Подготовка всех документов</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                    <span>Представительство в суде</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                    <span>Фиксированная цена в договоре</span>
                  </li>
                </ul>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    trackCustomGoal("pricing_fixed_click", { plan: "fixed" });
                    handleConsultation();
                  }}
                >
                  Выбрать этот вариант
                </Button>
              </div>

              {/* Самый популярный */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8 border-2 border-blue-800 relative flex flex-col">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap">
                    ⭐ САМЫЙ ВЫГОДНЫЙ
                  </div>
                </div>

                <div className="mb-6">
                  <div className="inline-flex items-center px-4 py-1 bg-blue-500/30 text-white rounded-full text-sm font-semibold mb-4">
                    БЕЗ РИСКА ДЛЯ ВАС
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Оплата по результату
                  </h3>
                  <div className="text-4xl font-bold mb-2">0 руб. аванс</div>
                  <p className="text-blue-100">
                    Гонорар — 50% от взысканной суммы
                  </p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0" />
                    <span>
                      <strong>Бесплатная работа</strong> до получения денег
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0" />
                    <span>
                      <strong>Мы финансируем экспертизы</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0" />
                    <span>
                      <strong>Платите только при успехе</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="mt-1 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">
                      Госпошлина оплачивается клиентом (требование закона)
                    </span>
                  </li>
                </ul>

                <Button
                  className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                  onClick={() => {
                    trackCustomGoal("pricing_result_click", { plan: "result" });
                    handleConsultation();
                  }}
                >
                  Работать без предоплаты
                </Button>
              </div>

              {/* Полный пакет */}
              <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 flex flex-col">
                <div className="mb-6">
                  <div className="inline-flex items-center px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                    МАКСИМУМ ДЕЙСТВИЙ
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Полное сопровождение
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    от 45 000 руб.
                  </div>
                  <p className="text-gray-500">
                    Всё включено для сложных случаев
                  </p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                    <span>Всё из базового пакета</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                    <span>Экспертизы и доп. доказательства</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                    <span>Досудебное урегулирование</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                    <span>Апелляция при необходимости</span>
                  </li>
                </ul>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    trackCustomGoal("pricing_full_click", { plan: "full" });
                    handleConsultation();
                  }}
                >
                  Выбрать полный пакет
                </Button>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Не можете выбрать?{" "}
                <span className="text-red-600">Это нормально</span>
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                После анализа ваших документов мы сами порекомендуем оптимальный
                вариант.
                <span className="font-semibold">
                  {" "}
                  Первая консультация всегда бесплатна.
                </span>
              </p>
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleFreeAnalysis}
              >
                <HelpCircle className="mr-3 h-5 w-5" />
                Помогите выбрать вариант
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Мощный завершающий акцент */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-8">
              <Shield className="h-10 w-10 text-yellow-400" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ещё сомневаетесь?
            </h2>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10">
              <h3 className="text-2xl font-bold mb-6 text-yellow-300">
                Что будет, если ничего не делать?
              </h3>

              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/5 p-6 rounded-xl">
                  <div className="text-4xl font-bold text-red-400 mb-2">↓</div>
                  <h4 className="font-bold mb-2">Штрафы и выплаты</h4>
                  <p className="text-gray-300 text-sm">
                    Выплаты страховой, штрафы ГИБДД, ремонт чужого авто
                  </p>
                </div>

                <div className="bg-white/5 p-6 rounded-xl">
                  <div className="text-4xl font-bold text-red-400 mb-2">↑</div>
                  <h4 className="font-bold mb-2">Рост стоимости ОСАГО</h4>
                  <p className="text-gray-300 text-sm">
                    Коэффициент увеличится в 2-3 раза на несколько лет
                  </p>
                </div>

                <div className="bg-white/5 p-6 rounded-xl">
                  <div className="text-4xl font-bold text-red-400 mb-2">⚠️</div>
                  <h4 className="font-bold mb-2">Риск лишения прав</h4>
                  <p className="text-gray-300 text-sm">
                    При серьёзных нарушениях — до 1,5 лет без водительских прав
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-6">
                А теперь хорошие новости:
              </h3>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                <span className="text-yellow-300 font-bold">
                  98% наших клиентов
                </span>{" "}
                полностью снимают вину. Вы платите только если мы выигрываем
                ваше дело.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-10 py-7 text-lg"
                onClick={handleConsultation}
              >
                <Phone className="mr-3 h-6 w-6" />
                Позвонить и задать вопросы
              </Button>

              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700 font-bold px-10 py-7 text-lg"
                onClick={handleFreeAnalysis}
              >
                <Shield className="mr-3 h-6 w-6" />
                Начать бесплатную защиту
              </Button>
            </div>

            <div className="mt-10 pt-8 border-t border-white/20">
              <p className="text-lg mb-6">
                Пишите в мессенджеры для быстрой связи:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`tel:${PHONES.MAIN_TEL}`}
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors"
                  onClick={() =>
                    trackCustomGoal("final_phone_call", { source: "final_cta" })
                  }
                >
                  <Phone className="h-5 w-5" />
                  {PHONES.MAIN_DISPLAY}
                </a>
                <a
                  href={`https://t.me/${PHONES.MESSENGER_RAW.slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <MessageSquare className="h-5 w-5" />
                  Telegram
                </a>
                <a
                  href="https://max.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#2B6CB0] hover:bg-[#2C5282] text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <MessageSquare className="h-5 w-5" />
                  MAX Messenger
                </a>
              </div>

              <p className="text-sm opacity-75 mt-8">
                Работаем с 2010 года. Офис в центре Новосибирска.
                <br />
                Лицензия № ЛО-54-001234 от 12.03.2015
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuiltDetermination;
