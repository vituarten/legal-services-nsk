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
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";

const GuiltDetermination = () => {
  const PHONES = {
    MAIN_DISPLAY: "+7 (383) 235-95-05",
    MAIN_TEL: "+73832359505",
    MESSENGER_DISPLAY: "+7 993 190 35 00",
    MESSENGER_RAW: "79931903500", // Без + для Green API
  };

  // Конфигурация Green API для MAX
  const GREEN_API_CONFIG = {
    idInstance: "3100445356",
    apiTokenInstance: "ced349362db7404d8b038631d7e61c14ab7e4530efa541c7ac",
    chatId: `${PHONES.MESSENGER_RAW}@c.us`,
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [progress, setProgress] = useState(0);

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

  // Функция отправки в Green API
  const sendToGreenAPI = async (message) => {
    const url = `https://3100.api.green-api.com/v3/waInstance${GREEN_API_CONFIG.idInstance}/sendMessage/${GREEN_API_CONFIG.apiTokenInstance}`;

    const payload = {
      chatId: GREEN_API_CONFIG.chatId,
      message: message,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Ошибка API: ${response.status}`);
      }

      const data = await response.json();
      console.log("Green API Response:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Green API Error:", error);
      return { success: false, error: error.message };
    }
  };

  // Валидация формы
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Введите ваше имя";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Введите ваш телефон";
    } else if (
      !/^[\d\s\-\+\(\)]{10,20}$/.test(
        formData.phone.replace(/[\s\-\+\(\)]/g, ""),
      )
    ) {
      errors.phone = "Введите корректный номер телефона";
    }

    if (!formData.description.trim()) {
      errors.description = "Опишите ситуацию";
    } else if (formData.description.trim().length < 10) {
      errors.description = "Опишите ситуацию подробнее";
    }

    return errors;
  };

  // Обработка отправки формы
  const handleFormSubmit = async (e) => {
    if (e) e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    setFormErrors({});
    setSubmissionStatus(null);
    setProgress(0);

    // Анимация прогресса
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    // Форматируем сообщение для MAX
    const maxMessage = `
📋 НОВАЯ ЗАЯВКА С САЙТА
——————————————————
👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
📝 Ситуация: ${formData.description}
⏰ Время получения: ${new Date().toLocaleString("ru-RU")}
🌐 Источник: Страница «Установление вины в ДТП»
——————————————————
💼 Требуется консультация по установлению вины в ДТП
    `.trim();

    // Отправляем в Green API
    const result = await sendToGreenAPI(maxMessage);

    clearInterval(progressInterval);
    setProgress(100);

    if (result.success) {
      setSubmissionStatus("success");
      trackCustomGoal("messenger_form_submitted", {
        status: "success",
        messenger: "max",
      });

      // Показываем модальное окно успеха
      setShowSuccessModal(true);

      // Очищаем форму через 2 секунды
      setTimeout(() => {
        setFormData({ name: "", phone: "", description: "" });
        setSubmissionStatus(null);
        setProgress(0);
      }, 2000);

      // Скрываем модальное окно через 7 секунд
      setTimeout(() => setShowSuccessModal(false), 7000);
    } else {
      setSubmissionStatus("error");
      trackCustomGoal("messenger_form_error", {
        error: result.error,
        messenger: "max",
      });
    }

    setIsLoading(false);
  };

  // Обработчик для кнопки "Бесплатный анализ"
  const handleFreeAnalysis = () => {
    trackCustomGoal("free_analysis_click", { source: "hero" });
    document.getElementById("contact-form")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleConsultation = () => {
    trackCustomGoal("guilt_determination_consultation", {
      source: "page",
      action: "phone_call",
    });
    window.location.href = `tel:${PHONES.MAIN_TEL}`;
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
              className={`w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-float`}
            >
              {submissionStatus === "success" ? (
                <Sparkles className="h-12 w-12 text-blue-600" />
              ) : submissionStatus === "error" ? (
                <AlertCircle className="h-12 w-12 text-red-600" />
              ) : (
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
              )}
            </div>

            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {submissionStatus === "success"
                ? "Заявка принята!"
                : submissionStatus === "error"
                  ? "Ошибка отправки"
                  : "Отправляем..."}
            </h3>

            <p className="text-gray-600 mb-6">
              {submissionStatus === "success" ? (
                <>
                  <span className="font-semibold text-gray-900">
                    Ваша заявка успешно отправлена
                  </span>
                  <br />
                  Специалист свяжется с вами для анализа документов
                </>
              ) : submissionStatus === "error" ? (
                "Произошла ошибка при отправке. Пожалуйста, попробуйте позвонить."
              ) : (
                "Заявка обрабатывается..."
              )}
            </p>

            {/* Анимированный прогресс-бар */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
              {submissionStatus === "success" && (
                <div className="flex items-center gap-2 animate-pulse">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Статус: заявка в обработке</span>
                </div>
              )}
            </div>

            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
            >
              {submissionStatus === "success" ? "Понятно" : "Закрыть"}
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
                  id="contact-form"
                  className={`bg-gradient-to-br from-white via-white to-gray-50 rounded-2xl shadow-2xl p-8 border border-gray-200/50 ${slideInRight}`}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center shadow-lg">
                        <Send className="h-7 w-7 text-blue-600" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <Zap className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Отправка заявки
                      </h3>
                      <p className="text-gray-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        Заявка отправится сразу после заполнения
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleFormSubmit}>
                    <div className="space-y-6">
                      {/* Имя */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Как к вам обращаться? *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className={`w-full px-5 py-4 border ${formErrors.name ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-3 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm`}
                            placeholder="Ваше имя"
                            disabled={isLoading}
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
                        {formErrors.name && (
                          <p className="mt-2 text-sm text-red-600">
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      {/* Телефон */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Ваш телефон *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className={`w-full px-5 py-4 border ${formErrors.phone ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-3 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm`}
                            placeholder={PHONES.MAIN_DISPLAY}
                            disabled={isLoading}
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Phone className="w-5 h-5" />
                          </div>
                        </div>
                        {formErrors.phone && (
                          <p className="mt-2 text-sm text-red-600">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>

                      {/* Описание ситуации */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Кратко опишите ситуацию *
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          className={`w-full px-5 py-4 border ${formErrors.description ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-3 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm h-36 resize-none`}
                          placeholder="Когда произошло ДТП? Что написано в протоколе? Есть ли свидетели или запись с видеорегистратора?..."
                          disabled={isLoading}
                        />
                        {formErrors.description && (
                          <p className="mt-2 text-sm text-red-600">
                            {formErrors.description}
                          </p>
                        )}
                      </div>

                      {/* Кнопка отправки */}
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                            Отправляем заявку...
                          </>
                        ) : (
                          <>
                            <span className="relative z-10 flex items-center justify-center gap-3">
                              <Send className="h-6 w-6 group-hover:scale-110 transition-transform" />
                              Отправить заявку на анализ
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </>
                        )}
                      </Button>

                      <p className="text-center text-gray-500 text-sm px-4">
                        Нажимая кнопку, вы соглашаетесь с обработкой
                        персональных данных
                      </p>

                      {/* Статус отправки */}
                      {submissionStatus === "error" && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                          <p className="text-red-700 font-medium mb-2">
                            Ошибка отправки заявки
                          </p>
                          <p className="text-red-600 text-sm">
                            Пожалуйста, позвоните нам по номеру{" "}
                            {PHONES.MAIN_DISPLAY}
                          </p>
                        </div>
                      )}

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
                  </form>
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

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-48 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full mb-10 backdrop-blur-sm border border-white/10 animate-float`}
            >
              <Shield className="h-12 w-12 text-yellow-400" />
            </div>

            <h2 className={`text-3xl md:text-4xl font-bold mb-10 ${fadeInUp}`}>
              Ещё сомневаетесь?
            </h2>

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
                  полностью снимают вину. Все расходы несет Виновная сторона.
                </p>
              </div>
            </div>

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
