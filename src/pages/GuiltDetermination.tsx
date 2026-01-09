import { Button } from "@/components/ui/button";
import { trackCustomGoal } from "@/utils/metrika";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    MESSENGER_DISPLAY: "+7 999 452 35 00",
    MESSENGER_RAW: "89994523500",
  };

  const GREEN_API_CONFIG = {
    idInstance: "3100445356",
    apiTokenInstance: "ced349362db7404d8b038631d7e61c14ab7e4530efa541c7ac",
    chatId: `${PHONES.MESSENGER_RAW}@c.us`,
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [formErrors, setFormErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const [visibleStats, setVisibleStats] = useState([false, false, false]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title =
      "Несправедливо признали виновным в ДТП? Исправим в суде — Новосибирск";

    const metaDescription =
      document.querySelector('meta[name="description"]') ||
      document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content =
      "Вас несправедливо признали виновным в аварии? Докажем вашу невиновность в суде. 15 лет опыта, 98% успеха. Бесплатный разбор вашего дела за 1 час.";
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }

    // Показываем плавающую кнопку при скролле
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowFloatingCTA(true);
      } else {
        setShowFloatingCTA(false);
      }

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

  // Функция отправки в Green API - упрощённая версия
  const sendToGreenAPI = async (message) => {
    const url = `https://api.green-api.com/waInstance${GREEN_API_CONFIG.idInstance}/sendMessage/${GREEN_API_CONFIG.apiTokenInstance}`;

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

  // Упрощённая валидация
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Введите ваше имя";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Имя должно содержать минимум 2 символа";
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

    return errors;
  };

  // Обработка отправки формы - маркетинговый подход
  const handleFormSubmit = async (e) => {
    if (e) e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);

      // Анимация ошибок
      Object.keys(errors).forEach((key) => {
        const input = document.querySelector(`[name="${key}"]`);
        if (input) {
          input.classList.add("animate-shake");
          setTimeout(() => input.classList.remove("animate-shake"), 500);
        }
      });
      return;
    }

    setIsLoading(true);
    setFormErrors({});
    setSubmissionStatus(null);

    // Форматируем сообщение для MAX с маркетинговым акцентом
    const maxMessage = `
🚨 СРОЧНАЯ ЗАЯВКА С ЛЕНДИНГА
——————————————————
👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
⏰ Время: ${new Date().toLocaleString("ru-RU")}
🌐 Источник: «Установление вины в ДТП»
🔗 Акция: Бесплатный анализ за 24 часа
——————————————————
✅ Горячий лид — перезвонить в первые 5 минут!
    `.trim();

    // Отправляем в Green API
    const result = await sendToGreenAPI(maxMessage);

    if (result.success) {
      setSubmissionStatus("success");
      trackCustomGoal("quick_form_submitted", {
        status: "success",
        form_type: "quick_lead",
      });

      // Показываем модальное окно успеха
      setShowSuccessModal(true);

      // Очищаем форму через 1 секунду
      setTimeout(() => {
        setFormData({ name: "", phone: "" });
        setSubmissionStatus(null);
      }, 1000);

      // Скрываем модальное окно через 3 секунды
      setTimeout(() => setShowSuccessModal(false), 3000);

      // После успешной отправки показываем дополнительный оффер
      setTimeout(() => {
        trackCustomGoal("post_submission_offer", {
          lead_name: formData.name,
          lead_phone: formData.phone,
        });
      }, 1500);
    } else {
      setSubmissionStatus("error");
      trackCustomGoal("quick_form_error", {
        error: result.error,
        form_type: "quick_lead",
      });
      setTimeout(() => setSubmissionStatus(null), 3000);
    }

    setIsLoading(false);
  };

  // Обработчик для кнопки "Бесплатный анализ"
  const handleFreeAnalysis = () => {
    trackCustomGoal("free_analysis_click", { source: "hero" });
    document.getElementById("contact-form")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleConsultation = () => {
    trackCustomGoal("guilt_determination_consultation", {
      source: "page",
      action: "phone_call",
    });
    window.location.href = `tel:${PHONES.MAIN_TEL}`;
  };

  // Обработчик для открытия полного разбора дела
  const handleCaseDetailsOpen = () => {
    trackCustomGoal("case_details_open", {
      caseId: "delo-2-3052-2025",
      source: "case_study_section",
    });

    // На сервисе poehali.dev все роуты должны быть предварительно определены
    // Если роут существует в вашем приложении, используем navigate
    // Если нет, открываем GitHub страницу
    try {
      navigate("/case-details/delo-2-3052-2025");
    } catch (error) {
      // Если роута нет, открываем GitHub
      window.open(
        "https://github.com/vituarten/legal-services-nsk/blob/main/app/case-details/delo-2-3052-2025/page.tsx",
        "_blank",
      );
    }
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
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out forwards;
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

      {/* Плавающая кнопка CTA */}
      {showFloatingCTA && (
        <div className="fixed bottom-6 right-6 z-40 animate-slide-up">
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-2xl hover:shadow-3xl px-6 py-5 rounded-full group animate-pulse-slow"
            onClick={handleFreeAnalysis}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <MessageCircle className="h-5 w-5" />
              </div>
              <span className="font-bold">Бесплатный анализ</span>
            </div>
          </Button>
        </div>
      )}

      {/* Success Modal - упрощённый */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-200">
            <div
              className={`w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 ${float}`}
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Успешно отправлено!
            </h3>

            <p className="text-gray-600 mb-6">
              <span className="font-semibold text-gray-900">
                {formData.name}
              </span>
              , мы свяжемся с вами в течение{" "}
              <span className="text-red-600 font-bold">5 минут</span>
            </p>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-200">
              <div className="flex items-center justify-center gap-2 text-sm text-green-700">
                <Clock className="h-4 w-4" />
                <span>Получите бесплатный анализ вашего дела за 24 часа</span>
              </div>
            </div>

            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
            >
              Понятно
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

                {/* Ограниченное предложение */}
                <div
                  className={`bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 p-5 mb-8 rounded-xl shadow-lg ${pulse}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <Clock4 className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg mb-1">
                        🔥 Акция: Бесплатный анализ за 24 часа
                      </p>
                      <p className="text-gray-700">
                        Оставьте заявку до конца дня и получите полный разбор
                        вашей ситуации{" "}
                        <span className="font-bold text-red-600">
                          бесплатно
                        </span>
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
                      text: "Бесплатный анализ за 24 часа",
                      icon: <Zap className="h-6 w-6" />,
                      color: "from-yellow-100 to-amber-100",
                      iconColor: "text-yellow-600",
                    },
                    {
                      text: "Фиксируем стоимость в договоре",
                      icon: <FileText className="h-6 w-6" />,
                      color: "from-blue-100 to-cyan-100",
                      iconColor: "text-blue-600",
                    },
                    {
                      text: "Оплата только при победе",
                      icon: <ThumbsUp className="h-6 w-6" />,
                      color: "from-emerald-100 to-green-100",
                      iconColor: "text-emerald-600",
                    },
                  ].map((guarantee, index) => (
                    <div key={index} className="flex items-center gap-4 group">
                      <div className="flex-shrink-0">
                        <div
                          className={`p-2 bg-gradient-to-br ${guarantee.color} rounded-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <div className={guarantee.iconColor}>
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
                          за 24 часа
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
                          Срочный звонок
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

              {/* Правая колонка - УПРОЩЁННАЯ ФОРМА */}
              <div className="lg:w-1/2">
                <div
                  id="contact-form"
                  className={`bg-gradient-to-br from-white via-white to-gray-50 rounded-2xl shadow-2xl p-8 border border-gray-200/50 ${slideInRight}`}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center shadow-lg">
                        <Zap className="h-7 w-7 text-blue-600" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                        <Clock className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Быстрая заявка
                      </h3>
                      <p className="text-gray-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Заберём ваши документы и сделаем анализ за 24 часа
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Бесплатно и без обязательств
                        </p>
                        <p className="text-sm text-gray-600">
                          Получите профессиональный анализ вашей ситуации
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleFormSubmit}>
                    <div className="space-y-6">
                      {/* Имя */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Ваше имя *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className={`w-full px-5 py-4 border ${formErrors.name ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-3 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm`}
                            placeholder="Иван Иванов"
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
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
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
                            name="phone"
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
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {formErrors.phone}
                          </p>
                        )}
                      </div>

                      {/* Счётчик времени */}
                      <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 rounded-full">
                          <Clock className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium text-gray-700">
                            Бесплатный анализ за 24 часа
                          </span>
                        </div>
                      </div>

                      {/* Кнопка отправки */}
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                            Отправляем...
                          </>
                        ) : (
                          <>
                            <span className="relative z-10 flex items-center justify-center gap-3">
                              <Zap className="h-6 w-6 group-hover:scale-110 transition-transform" />
                              Получить бесплатный анализ
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </>
                        )}
                      </Button>

                      <div className="text-center space-y-3">
                        <p className="text-gray-500 text-sm">
                          Нажимая кнопку, вы соглашаетесь с политикой
                          конфиденциальности
                        </p>
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                          <Shield className="h-3 w-3" />
                          <span>Ваши данные защищены</span>
                        </div>
                      </div>

                      {/* Альтернативные способы связи */}
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
                            onClick={() =>
                              trackCustomGoal("telegram_click", {
                                source: "quick_form",
                              })
                            }
                          >
                            {/* Иконка Telegram */}
                            <svg
                              className="w-5 h-5 fill-white group-hover:scale-110 transition-transform"
                              viewBox="0 0 24 24"
                            >
                              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                            </svg>
                            <span>Telegram</span>
                            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </a>
                          <a
                            href="https://max.ru"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#2B6CB0] to-[#2C5282] hover:from-[#2C5282] hover:to-[#2B6CB0] text-white px-6 py-3 rounded-xl transition-all duration-300 shadow hover:shadow-md group"
                            onClick={() =>
                              trackCustomGoal("max_click", {
                                source: "quick_form",
                              })
                            }
                          >
                            {/* Иконка MAX */}
                            <svg
                              className="w-5 h-5 fill-white group-hover:scale-110 transition-transform"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span>MAX Messenger</span>
                            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Доверительные элементы под формой */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">98%</div>
                    <div className="text-xs text-gray-600">Успешных дел</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">
                      5 мин
                    </div>
                    <div className="text-xs text-gray-600">
                      Среднее время ответа
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">24ч</div>
                    <div className="text-xs text-gray-600">
                      Анализ документов
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Остальные секции остаются без изменений */}
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
                    <Button
                      onClick={handleCaseDetailsOpen}
                      variant="ghost"
                      className="group"
                    >
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
                      onClick={handleCaseDetailsOpen}
                    >
                      <FileText className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                      Читать полный разбор дела
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
              className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full mb-10 backdrop-blur-sm border border-white/10 ${float}`}
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
                  полностью снимают вину. Виновник несет все Расходы на наши
                  услуги Юриста.
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
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
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
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
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
