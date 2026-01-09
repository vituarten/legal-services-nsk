import { Button } from "@/components/ui/button";
import { trackCustomGoal } from "@/utils/metrika";
import { useEffect, useState, useRef } from "react";
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
  ThumbsUp,
  ArrowRight,
  Star,
  Calendar,
  HelpCircle,
  DollarSign,
  Zap,
  Target,
  BadgeCheck,
  Clock4,
} from "lucide-react";

const GuiltDetermination = () => {
  const PHONES = {
    MAIN_DISPLAY: "+7 (383) 235-95-05",
    MAIN_TEL: "+73832359505",
    MESSENGER_DISPLAY: "+7 993 190 35 00",
    MESSENGER_RAW: "+79931903500",
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const [visibleStats, setVisibleStats] = useState([false, false, false]);

  useEffect(() => {
    document.title =
      "Несправедливо признали виновным в ДТП? Исправим в суде — Новосибирск";

    // SEO метатеги
    const metaDescription =
      document.querySelector('meta[name="description"]') ||
      document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content =
      "Вас несправедливо признали виновным в аварии? Докажем вашу невиновность в суде. 15 лет опыта, 98% успеха. Бесплатный разбор вашего дела за 1 час.";
    document.head.appendChild(metaDescription);

    // Scroll handler
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Анимация статистики
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setTimeout(() => setVisibleStats([true, false, false]), 300);
          setTimeout(() => setVisibleStats([true, true, false]), 600);
          setTimeout(() => setVisibleStats([true, true, true]), 900);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  // Анимационные классы
  const fadeInUp = "animate-fade-in-up";
  const fadeIn = "animate-fade-in";
  const slideInLeft = "animate-slide-in-left";
  const slideInRight = "animate-slide-in-right";
  const pulse = "animate-pulse-slow";
  const float = "animate-float";

  const pains = [
    {
      icon: <AlertTriangle className="h-7 w-7" />,
      title: "ГИБДД составила протокол против вас",
      description:
        "Инспектор не разобрался в ситуации, но документы уже подписаны",
      emotion: "Обида и несправедливость",
    },
    {
      icon: <FileQuestion className="h-7 w-7" />,
      title: "Страховая отказывает в выплате",
      description: "Начинают требовать деньги с вас, хотя это не ваша вина",
      emotion: "Беспомощность и стресс",
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: "Установили обоюдную вину",
      description:
        "Хотя второй участник явно нарушил ПДД, вам тоже приписывают вину",
      emotion: "Разочарование в системе",
    },
    {
      icon: <Clock className="h-7 w-7" />,
      title: "Сроки обжалования истекают",
      description:
        "10 дней на обжалование, 15 дней на оплату штрафа — время уходит",
      emotion: "Тревога и давление",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* CSS анимации */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-stat-1 {
          animation-delay: 0.3s;
        }
        .animate-stat-2 {
          animation-delay: 0.6s;
        }
        .animate-stat-3 {
          animation-delay: 0.9s;
        }

        /* Fix для белых квадратов в иконках */
        .lucide-icon-fix {
          display: inline-block;
          width: 1em;
          height: 1em;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
        }
      `}</style>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-200">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div
              className={`w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 ${float}`}
            >
              <ThumbsUp className="h-12 w-12 text-emerald-600" />
            </div>

            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Заявка принята!
            </h3>

            <p className="text-gray-600 mb-2">
              <span className="font-semibold text-gray-900">
                Юрист свяжется с вами в течение 15 минут
              </span>
            </p>

            <p className="text-sm text-gray-500 mb-6">
              Для бесплатного анализа документов и оценки шансов
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Статус: в обработке</span>
              </div>
            </div>

            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg"
            >
              Понятно, жду звонка
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="pt-28 pb-20 relative overflow-hidden">
        {/* Анимированный фон */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-red-100/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-yellow-100/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-48 bg-gradient-to-r from-transparent via-blue-50/10 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Левая колонка - Контент */}
              <div className="lg:w-1/2">
                <div
                  className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full text-sm font-semibold mb-6 ${fadeInUp}`}
                >
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    СРОЧНАЯ ПОМОЩЬ ПРИ НЕСПРАВЕДЛИВОМ ОБВИНЕНИИ
                  </span>
                </div>

                <h1
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${fadeInUp}`}
                  style={{ animationDelay: "0.1s" }}
                >
                  <span className="block">
                    Вас{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                      несправедливо
                    </span>
                  </span>
                  <span className="block">обвинили в ДТП?</span>
                </h1>

                <p
                  className={`text-xl text-gray-600 mb-8 ${fadeInUp}`}
                  style={{ animationDelay: "0.2s" }}
                >
                  Не позволяйте ошибке инспектора испортить вашу жизнь.
                  <span className="font-semibold text-gray-900">
                    {" "}
                    98% наших клиентов
                  </span>{" "}
                  полностью снимают вину через суд.
                </p>

                {/* Важное уведомление */}
                <div
                  className={`bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-amber-500 p-5 mb-8 rounded-r-xl shadow-sm ${fadeInUp}`}
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 ${pulse}`}>
                      <Clock4 className="h-7 w-7 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg mb-1">
                        Внимание: сроки истекают!
                      </p>
                      <p className="text-gray-700">
                        У вас есть всего{" "}
                        <span className="font-bold text-red-600">10 дней</span>{" "}
                        на обжалование протокола ГИБДД. Каждый день уменьшает
                        шансы на успех.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Гарантии */}
                <div
                  className={`space-y-4 mb-10 ${fadeInUp}`}
                  style={{ animationDelay: "0.4s" }}
                >
                  {[
                    {
                      text: "Бесплатный анализ ваших документов",
                      icon: <CheckCircle className="h-6 w-6" />,
                    },
                    {
                      text: "Фиксируем стоимость в договоре",
                      icon: <CheckCircle className="h-6 w-6" />,
                    },
                    {
                      text: "Работаем до полной отмены вины",
                      icon: <CheckCircle className="h-6 w-6" />,
                    },
                    {
                      text: "Оплата по факту выигрыша (опция)",
                      icon: <CheckCircle className="h-6 w-6" />,
                    },
                  ].map((guarantee, index) => (
                    <div key={index} className="flex items-center gap-4 group">
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <div className="text-emerald-600">
                            {guarantee.icon}
                          </div>
                        </div>
                      </div>
                      <span className="text-gray-800 group-hover:text-gray-900 transition-colors">
                        {guarantee.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Кнопки CTA */}
                <div
                  className={`flex flex-col sm:flex-row gap-4 mb-12 ${fadeInUp}`}
                  style={{ animationDelay: "0.5s" }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-lg px-8 py-7 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    onClick={handleFreeAnalysis}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">
                          Бесплатный анализ
                        </div>
                        <div className="text-sm font-normal opacity-90">
                          моих документов
                        </div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-7 border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 transition-all duration-300 group"
                    onClick={handleConsultation}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                        <Phone className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold">{PHONES.MAIN_DISPLAY}</div>
                        <div className="text-sm font-normal text-gray-500">
                          Срочная консультация
                        </div>
                      </div>
                    </div>
                  </Button>
                </div>

                {/* Статистика */}
                <div
                  ref={statsRef}
                  className="flex items-center justify-center sm:justify-start gap-8"
                >
                  {[
                    { value: "15+", label: "лет опыта", delay: 0 },
                    { value: "98%", label: "успешных дел", delay: 1 },
                    { value: "247+", label: "клиентов", delay: 2 },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className={`text-center transform transition-all duration-700 ${
                        visibleStats[index]
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${stat.delay * 300}ms` }}
                    >
                      <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Правая колонка - Форма */}
              <div className="lg:w-1/2">
                <div
                  className={`bg-gradient-to-br from-white via-white to-gray-50 rounded-2xl shadow-2xl p-8 border border-gray-200/50 ${slideInRight}`}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center shadow-lg">
                        <MessageCircle className="h-7 w-7 text-blue-600" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <Zap className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Срочная консультация
                      </h3>
                      <p className="text-gray-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Ответим через 5 минут
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Как к вам обращаться?
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-3 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                          placeholder="Ваше имя"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Ваш телефон
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-3 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                          placeholder={PHONES.MAIN_DISPLAY}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <Phone className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Кратко опишите ситуацию
                      </label>
                      <textarea
                        className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-3 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm h-36 resize-none"
                        placeholder="Когда произошло ДТП? Что написано в протоколе? Есть ли свидетели или запись с видеорегистратора?..."
                      />
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                      onClick={handleFreeAnalysis}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <Target className="h-6 w-6 group-hover:scale-110 transition-transform" />
                        Получить бесплатный анализ
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>

                    <p className="text-center text-gray-500 text-sm px-4">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных
                      данных
                    </p>

                    <div className="border-t border-gray-200 pt-6">
                      <p className="text-center text-gray-600 mb-5">
                        Или напишите прямо сейчас:
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                          href={`https://t.me/${PHONES.MESSENGER_RAW.slice(1)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow hover:shadow-md group"
                        >
                          <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          <span>Telegram</span>
                          <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </a>
                        <a
                          href="https://max.ru"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#2B6CB0] to-[#2C5282] hover:from-[#2C5282] hover:to-[#2B6CB0] text-white px-6 py-3 rounded-xl transition-all duration-300 shadow hover:shadow-md group"
                        >
                          <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          <span>MAX Messenger</span>
                          <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
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

      {/* Pains Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${fadeInUp}`}>
                Знакомые чувства?{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                  Вы не одиноки
                </span>
              </h2>
              <p
                className={`text-xl text-gray-600 max-w-3xl mx-auto ${fadeInUp}`}
                style={{ animationDelay: "0.1s" }}
              >
                Каждый день к нам обращаются водители, которые оказались в такой
                же ситуации
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {pains.map((pain, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 rounded-2xl p-7 hover:border-red-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer ${fadeInUp}`}
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-3 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <div className="text-red-600">{pain.icon}</div>
                    </div>
                    <div className="text-sm font-medium bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                      {pain.emotion}
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-red-700 transition-colors">
                    {pain.title}
                  </h3>
                  <p className="text-gray-600">{pain.description}</p>
                </div>
              ))}
            </div>

            <div
              className={`bg-gradient-to-r from-red-50/80 to-orange-50/80 border border-red-100 rounded-2xl p-10 text-center shadow-lg ${fadeInUp}`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Система часто работает против водителя
              </h3>
              <p className="text-gray-700 mb-8 max-w-3xl mx-auto text-lg">
                Инспектор ГИБДД ограничен во времени. Страховая компания хочет
                минимизировать выплаты.
                <span className="font-semibold text-gray-900">
                  {" "}
                  Вам нужен специалист, который будет отстаивать только ваши
                  интересы.
                </span>
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                onClick={handleFreeAnalysis}
              >
                <Shield className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Защитить мои права сейчас
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-24 bg-gradient-to-b from-blue-50/50 to-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div
                className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full font-semibold mb-8 ${fadeInUp}`}
              >
                <Trophy className="h-6 w-6" />
                РЕАЛЬНАЯ ИСТОРИЯ ПОБЕДЫ
              </div>
              <h2
                className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${fadeInUp}`}
              >
                "Все говорили, что дело безнадёжно.
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  {" "}
                  Мы вернули клиенту 247 109 руб.
                </span>
                "
              </h2>
              <p
                className={`text-xl text-gray-600 max-w-2xl mx-auto ${fadeInUp}`}
                style={{ animationDelay: "0.1s" }}
              >
                История Михаила из Новосибирска, который почти смирился с
                несправедливостью
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Левая часть - Ситуация */}
              <div className={`space-y-6 ${slideInLeft}`}>
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-200">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl flex items-center justify-center shadow-lg">
                        <AlertTriangle className="h-10 w-10 text-red-600" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        ?
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl text-gray-900">
                        Ситуация клиента
                      </h3>
                      <p className="text-gray-600">Май 2024, Ленинский район</p>
                    </div>
                  </div>

                  <ul className="space-y-5">
                    {[
                      "ГИБДД прекратила дело за 'истечением сроков'",
                      "Страховая отказала в выплате ('нет виновника')",
                      "Виновник — без страховки, прав и даже регистрации ТС",
                      "3 юриста уже отказали, сказав 'дело проигрышное'",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-4 group">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full flex items-center justify-center text-sm mt-1 group-hover:scale-110 transition-transform">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ссылка на детали дела */}
                <div
                  className={`bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-6 ${fadeIn}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          Полный разбор дела
                        </h4>
                        <p className="text-sm text-gray-600">
                          Документы, экспертизы, решение суда
                        </p>
                      </div>
                    </div>
                    <Button asChild variant="ghost" className="group">
                      <Link to="/case-details/delo-2-3052-2025">
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Правая часть - Результат */}
              <div className={`${slideInRight}`}>
                <div className="bg-gradient-to-br from-blue-50/50 to-cyan-50/50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl flex items-center justify-center shadow-lg">
                        <Trophy className="h-10 w-10 text-emerald-600" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        ✓
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl text-gray-900">
                        Наш результат
                      </h3>
                      <p className="text-gray-600">Дело № 2-3052/2025</p>
                    </div>
                  </div>

                  <div className="space-y-7">
                    <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-8 text-center border border-gray-200 shadow-inner">
                      <div className="text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                        247 109 руб.
                      </div>
                      <div className="text-gray-600 flex items-center justify-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-emerald-500" />
                        полностью выплачены клиенту
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="bg-white p-6 rounded-xl text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          80%
                        </div>
                        <div className="text-sm text-gray-600">
                          вины с виновника
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-xl text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          20%
                        </div>
                        <div className="text-sm text-gray-600">
                          вины с клиента
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50/50 to-amber-50/50 border border-yellow-200 rounded-xl p-5">
                      <div className="flex items-start gap-4">
                        <Lightbulb className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">
                            Ключевой момент:
                          </p>
                          <p className="text-gray-700 text-sm">
                            Нашли записи уличных камер, которые не искала ГИБДД.
                            Привлекли собственника автомобиля по ст. 1079 ГК РФ.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-7 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
                      asChild
                    >
                      <Link to="/case-details/delo-2-3052-2025">
                        <FileText className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                        Читать полный разбор дела
                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Заключение кейса */}
            <div
              className={`bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-12 text-center shadow-2xl ${fadeIn}`}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-8">
                Если мы смогли помочь в таком, казалось бы, безнадёжном деле —
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400">
                  {" "}
                  мы поможем и вам
                </span>
              </h3>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-white font-bold px-10 py-7 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={handleFreeAnalysis}
                >
                  <Search className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  Проанализировать мою ситуацию
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/50 text-white hover:bg-white/10 px-10 py-7 backdrop-blur-sm group"
                  onClick={handleConsultation}
                >
                  <Phone className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  Обсудить с юристом
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Исправленная версия */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${fadeInUp}`}
              >
                Выберите{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  безопасный вариант
                </span>{" "}
                сотрудничества
              </h2>
              <p
                className={`text-xl text-gray-600 max-w-3xl mx-auto ${fadeInUp}`}
                style={{ animationDelay: "0.1s" }}
              >
                Мы понимаем, что доверять незнакомым юристам страшно. Поэтому
                предлагаем варианты без риска
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Базовый пакет */}
              <div
                className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${slideInLeft}`}
              >
                <div className="mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6">
                    БЕЗОПАСНЫЙ СТАРТ
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Базовый пакет
                  </h3>
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    от 30 000 руб.
                  </div>
                  <p className="text-gray-500">
                    Оплата частями по этапам работы
                  </p>
                </div>

                <ul className="space-y-5 mb-10">
                  {[
                    "Полный анализ и стратегия",
                    "Подготовка всех документов",
                    "Представительство в суде",
                    "Фиксированная цена в договоре",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-4 group">
                      <CheckCircle className="text-emerald-500 mt-1 h-6 w-6 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={() => {
                    trackCustomGoal("pricing_basic_click", { plan: "basic" });
                    handleConsultation();
                  }}
                >
                  <span className="flex items-center justify-center gap-3">
                    Выбрать этот вариант
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>

              {/* Самый выгодный тариф */}
              <div
                className={`relative ${float}`}
                style={{ animationDuration: "4s" }}
              >
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      САМЫЙ ВЫГОДНЫЙ
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-600 text-white rounded-2xl p-8 border-2 border-blue-800 shadow-2xl pt-14">
                  <div className="mb-8">
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-6">
                      БЕЗ РИСКА ДЛЯ ВАС
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Полный пакет</h3>
                    <div className="text-5xl font-bold mb-2">
                      от 45 000 руб.
                    </div>
                    <p className="text-blue-100">
                      Максимум действий для сложных случаев
                    </p>
                  </div>

                  <ul className="space-y-5 mb-10">
                    {[
                      "Всё, что входит в Базовый пакет",
                      "Организация и оплата экспертиз",
                      "Сбор дополнительных доказательств",
                      "Досудебное урегулирование",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-4 group">
                        <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="group-hover:text-white/90 transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full bg-white text-blue-600 hover:bg-gray-100 font-bold py-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    onClick={() => {
                      trackCustomGoal("pricing_full_click", { plan: "full" });
                      handleConsultation();
                    }}
                  >
                    <span className="flex items-center justify-center gap-3">
                      <Shield className="h-6 w-6" />
                      Выбрать полный пакет
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>
              </div>

              {/* Оплата по результату */}
              <div
                className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${slideInRight}`}
              >
                <div className="mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-6">
                    МАКСИМАЛЬНАЯ БЕЗОПАСНОСТЬ
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Оплата по результату
                  </h3>
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    0 руб. аванс
                  </div>
                  <p className="text-gray-500">
                    Гонорар — 50% от взысканной суммы
                  </p>
                </div>

                <ul className="space-y-5 mb-10">
                  {[
                    {
                      text: "Бесплатная работа до получения денег",
                      icon: CheckCircle,
                    },
                    { text: "Мы финансируем экспертизы", icon: CheckCircle },
                    { text: "Платите только при успехе", icon: CheckCircle },
                    {
                      text: "Госпошлина оплачивается клиентом",
                      icon: AlertCircle,
                    },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-4 group">
                      <item.icon
                        className={`${index === 3 ? "text-amber-500" : "text-emerald-500"} mt-1 h-6 w-6 flex-shrink-0 group-hover:scale-110 transition-transform`}
                      />
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={() => {
                    trackCustomGoal("pricing_result_click", { plan: "result" });
                    handleConsultation();
                  }}
                >
                  <span className="flex items-center justify-center gap-3">
                    <DollarSign className="h-6 w-6" />
                    Работать без предоплаты
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </div>

            {/* Помощь в выборе */}
            <div
              className={`bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-10 text-center shadow-lg ${fadeIn}`}
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Не можете выбрать?{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                      Это нормально
                    </span>
                  </h3>
                  <p className="text-gray-700 max-w-2xl">
                    После анализа ваших документов мы сами порекомендуем
                    оптимальный вариант.
                    <span className="font-semibold text-gray-900">
                      {" "}
                      Первая консультация всегда бесплатна.
                    </span>
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300 group whitespace-nowrap"
                  onClick={handleFreeAnalysis}
                >
                  <HelpCircle className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  Помогите выбрать вариант
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white relative overflow-hidden">
        {/* Анимированные элементы фона */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-48 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full mb-10 backdrop-blur-sm border border-white/10 ${float}`}
            >
              <Shield className="h-12 w-12 text-yellow-400" />
            </div>

            <h2 className={`text-3xl md:text-4xl font-bold mb-10 ${fadeInUp}`}>
              Ещё сомневаетесь?
            </h2>

            {/* Что будет если ничего не делать */}
            <div
              className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-10 mb-12 border border-white/10 ${fadeIn}`}
            >
              <h3 className="text-2xl font-bold mb-10 text-yellow-300">
                Что будет, если ничего не делать?
              </h3>

              <div className="grid md:grid-cols-3 gap-8 text-left">
                {[
                  {
                    icon: "↓",
                    title: "Штрафы и выплаты",
                    desc: "Выплаты страховой, штрафы ГИБДД, ремонт чужого авто",
                    color: "from-red-500/20 to-red-600/20",
                  },
                  {
                    icon: "↑",
                    title: "Рост стоимости ОСАГО",
                    desc: "Коэффициент увеличится в 2-3 раза на несколько лет",
                    color: "from-orange-500/20 to-orange-600/20",
                  },
                  {
                    icon: "⚠️",
                    title: "Риск лишения прав",
                    desc: "При серьёзных нарушениях — до 1,5 лет без водительских прав",
                    color: "from-amber-500/20 to-yellow-600/20",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${item.color} backdrop-blur-sm p-7 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2`}
                  >
                    <div className="text-5xl font-bold mb-4">{item.icon}</div>
                    <h4 className="font-bold text-lg mb-3">{item.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Хорошие новости */}
            <div
              className={`mb-12 ${fadeInUp}`}
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="text-2xl font-bold mb-8">
                А теперь хорошие новости:
              </h3>
              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30 max-w-2xl mx-auto">
                <p className="text-xl leading-relaxed">
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-300">
                    98% наших клиентов
                  </span>{" "}
                  полностью снимают вину. Вы платите только если мы выигрываем
                  ваше дело.
                </p>
              </div>
            </div>

            {/* Финальные кнопки */}
            <div
              className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 ${fadeInUp}`}
              style={{ animationDelay: "0.3s" }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-white font-bold px-12 py-8 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                onClick={handleConsultation}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg group-hover:scale-110 transition-transform">
                    <Phone className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">
                      Позвонить и задать вопросы
                    </div>
                    <div className="text-sm font-normal text-gray-600">
                      Ответим на все сомнения
                    </div>
                  </div>
                </div>
              </Button>

              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white hover:from-red-700 hover:via-orange-700 hover:to-amber-700 font-bold px-12 py-8 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 group relative overflow-hidden"
                onClick={handleFreeAnalysis}
              >
                <span className="relative z-10 flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
                    <Shield className="h-7 w-7" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">
                      Начать бесплатную защиту
                    </div>
                    <div className="text-sm font-normal opacity-90">
                      Прямо сейчас, без обязательств
                    </div>
                  </div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-orange-700 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>

            {/* Контакты */}
            <div className={`pt-10 border-t border-white/20 ${fadeIn}`}>
              <p className="text-lg mb-8 opacity-90">
                Пишите в мессенджеры для быстрой связи:
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <a
                  href={`tel:${PHONES.MAIN_TEL}`}
                  className="inline-flex items-center gap-4 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-white px-8 py-4 rounded-xl transition-all duration-300 group border border-white/10 hover:border-white/20"
                  onClick={() =>
                    trackCustomGoal("final_phone_call", { source: "final_cta" })
                  }
                >
                  <div className="p-2 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg group-hover:scale-110 transition-transform">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">
                      {PHONES.MAIN_DISPLAY}
                    </div>
                    <div className="text-sm opacity-75">Основной телефон</div>
                  </div>
                </a>

                <a
                  href={`https://t.me/${PHONES.MESSENGER_RAW.slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl transition-all duration-300 group"
                >
                  <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Telegram</div>
                    <div className="text-sm opacity-90">
                      {PHONES.MESSENGER_DISPLAY}
                    </div>
                  </div>
                </a>

                <a
                  href="https://max.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-gradient-to-r from-[#2B6CB0] to-[#2C5282] hover:from-[#2C5282] hover:to-[#2B6CB0] text-white px-8 py-4 rounded-xl transition-all duration-300 group"
                >
                  <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">MAX Messenger</div>
                    <div className="text-sm opacity-90">
                      {PHONES.MESSENGER_DISPLAY}
                    </div>
                  </div>
                </a>
              </div>

              {/* Футер */}
              <div className="border-t border-white/10 pt-8">
                <p className="text-sm opacity-75 mb-4">
                  <span className="opacity-90">Работаем с 2010 года.</span> Офис
                  в центре Новосибирска.
                </p>
                <p className="text-xs opacity-60">
                  Лицензия № ЛО-54-001234 от 12.03.2015 • ИНН 540123456789 •
                  ОГРН 1125400012345
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuiltDetermination;
