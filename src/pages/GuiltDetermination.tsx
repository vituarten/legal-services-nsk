import { Button } from "@/components/ui/button";
import { trackCustomGoal } from "@/utils/metrika";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Phone,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Users,
  FileQuestion,
  Clock,
  MessageCircle,
  AlertCircle,
  Shield,
  ArrowRight,
  Zap,
  Target,
  BadgeCheck,
  Clock4,
  Loader2,
  Send,
  Sparkles,
  Search,
  Trophy,
  Lightbulb,
  FileText,
} from "lucide-react";

const GuiltDetermination = () => {
  const PHONES = {
    MAIN_DISPLAY: "+7 (383) 235-95-05",
    MAIN_TEL: "+73832359505",
    TELEGRAM_RAW: "79931903500",
  };

  const GREEN_API_CONFIG = {
    idInstance: "3100445356",
    apiTokenInstance: "ced349362db7404d8b038631d7e61c14ab7e4530efa541c7ac",
    chatId: `79994523500@c.us`,
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [formErrors, setFormErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title =
      "Несправедливо признали виновным в ДТП? Исправим в суде — Новосибирск";

    const metaDescription =
      document.querySelector('meta[name="description"]') ||
      document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content =
      "Вас несправедливо признали виновным в аварии? Докажем вашу невиновность в суде. Бесплатный разбор вашего дела.";
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }
  }, []);

  // Функция отправки в Green API
  const sendToGreenAPI = async (message) => {
    const url = `https://3100.api.green-api.com/v3/waInstance${GREEN_API_CONFIG.idInstance}/sendMessage/${GREEN_API_CONFIG.apiTokenInstance}`;

    const payload = {
      chatId: GREEN_API_CONFIG.chatId,
      message: message,
    };

    console.log("Sending to Green API:", { url, payload });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Green API Error:", response.status, errorText);
        throw new Error(`Ошибка API: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Green API Response:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Green API Error:", error);
      return { success: false, error: error.message };
    }
  };

  // Обработчик ввода телефона с автоформатированием
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    // Убираем уже введенный +7 если есть
    if (value.startsWith("7")) {
      value = value.substring(1);
    }

    let formattedValue = "+7";
    if (value.length > 0) {
      formattedValue += " (" + value.substring(0, 3);
    }
    if (value.length > 3) {
      formattedValue += ") " + value.substring(3, 6);
    }
    if (value.length > 6) {
      formattedValue += "-" + value.substring(6, 8);
    }
    if (value.length > 8) {
      formattedValue += "-" + value.substring(8, 10);
    }

    setFormData({ ...formData, phone: formattedValue });
    setFormErrors({ ...formErrors, phone: null });
  };

  // Валидация формы
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Введите ваше имя";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Имя должно содержать минимум 2 символа";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!phoneDigits) {
      errors.phone = "Введите ваш телефон";
    } else if (phoneDigits.length < 11) {
      errors.phone = "Введите полный номер телефона";
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

    const maxMessage = `
📋 НОВАЯ ЗАЯВКА С САЙТА
——————————————————
👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
⏰ Время: ${new Date().toLocaleString("ru-RU")}
🌐 Источник: Страница «Установление вины в ДТП»
——————————————————
💼 Срочная заявка на консультацию
    `.trim();

    const result = await sendToGreenAPI(maxMessage);

    if (result.success) {
      setSubmissionStatus("success");
      trackCustomGoal("form_submitted", { status: "success" });
      setShowSuccessModal(true);

      setTimeout(() => {
        setFormData({ name: "", phone: "" });
        setSubmissionStatus(null);
      }, 1000);

      setTimeout(() => setShowSuccessModal(false), 4000);
    } else {
      setSubmissionStatus("error");
      trackCustomGoal("form_error", { error: result.error });
      setShowSuccessModal(true);
    }

    setIsLoading(false);
  };

  const handleFreeAnalysis = () => {
    trackCustomGoal("analysis_click", { source: "hero" });
    document.getElementById("contact-form")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleConsultation = () => {
    trackCustomGoal("consultation_call", { source: "page" });
    window.location.href = `tel:${PHONES.MAIN_TEL}`;
  };

  const handleCaseDetailsOpen = () => {
    trackCustomGoal("case_details_open", {
      caseId: "delo-2-3052-2025",
      source: "case_study_section",
    });

    try {
      navigate("/case-details/delo-2-3052-2025");
    } catch (error) {
      window.open(
        "https://github.com/vituarten/legal-services-nsk/blob/main/app/case-details/delo-2-3052-2025/page.tsx",
        "_blank",
      );
    }
  };

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
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes successPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
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
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
        .animate-success-pulse {
          animation: successPulse 2s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>

      {/* Success Modal - улучшенная анимация */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-200 animate-slide-in">
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
              className={`w-20 h-20 ${submissionStatus === "success" ? "bg-gradient-to-br from-green-100 to-emerald-100" : "bg-gradient-to-br from-red-100 to-orange-100"} rounded-full flex items-center justify-center mx-auto mb-6 ${submissionStatus === "success" ? "animate-success-pulse" : ""}`}
            >
              {submissionStatus === "success" ? (
                <Sparkles className="h-10 w-10 text-green-600" />
              ) : (
                <AlertCircle className="h-10 w-10 text-red-600" />
              )}
            </div>

            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              {submissionStatus === "success"
                ? "Отлично! Заявка отправлена"
                : "Что-то пошло не так"}
            </h3>

            <p className="text-gray-600 mb-6">
              {submissionStatus === "success" ? (
                <>
                  <span className="font-semibold text-gray-900">
                    {formData.name}
                  </span>
                  , мы уже начали работу с вашей заявкой.
                  <br />
                  Специалист свяжется с вами в течение{" "}
                  <span className="text-green-600 font-bold">15 минут</span>.
                </>
              ) : (
                "Попробуйте отправить ещё раз или позвоните нам напрямую"
              )}
            </p>

            {submissionStatus === "error" && (
              <div className="mb-6">
                <Button
                  onClick={handleConsultation}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Позвонить {PHONES.MAIN_DISPLAY}
                </Button>
              </div>
            )}

            <Button
              onClick={() => setShowSuccessModal(false)}
              className={`w-full ${submissionStatus === "success" ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"} text-white`}
            >
              {submissionStatus === "success"
                ? "Понятно, жду звонка"
                : "Закрыть"}
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="pt-28 pb-20 relative overflow-hidden">
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
                  className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full text-sm font-semibold mb-6`}
                >
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    СРОЧНАЯ ПОМОЩЬ ПРИ НЕСПРАВЕДЛИВОМ ОБВИНЕНИИ
                  </span>
                </div>

                <h1
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6`}
                >
                  <span className="block">
                    Вас{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                      несправедливо
                    </span>
                  </span>
                  <span className="block">обвинили в ДТП?</span>
                </h1>

                <p className={`text-xl text-gray-600 mb-8`}>
                  Не позволяйте ошибке инспектора испортить вашу жизнь.
                  <span className="font-semibold text-gray-900">
                    {" "}
                    98% наших клиентов
                  </span>{" "}
                  полностью снимают вину через суд.
                </p>

                <div
                  className={`bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-amber-500 p-5 mb-8 rounded-r-xl shadow-sm`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0`}>
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

                {/* Гарантии - без "Бесплатный анализ ваших документов" */}
                <div className={`space-y-4 mb-10`}>
                  {[
                    {
                      text: "Фиксируем стоимость в договоре",
                      icon: <CheckCircle className="h-6 w-6" />,
                      color: "from-blue-100 to-cyan-100",
                      iconColor: "text-blue-600",
                    },
                    {
                      text: "Работаем до полной отмены вины",
                      icon: <Shield className="h-6 w-6" />,
                      color: "from-violet-100 to-purple-100",
                      iconColor: "text-violet-600",
                    },
                  ].map((guarantee, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`p-2 bg-gradient-to-br ${guarantee.color} rounded-lg`}
                        >
                          <div className={guarantee.iconColor}>
                            {guarantee.icon}
                          </div>
                        </div>
                      </div>
                      <span className="text-gray-800">{guarantee.text}</span>
                    </div>
                  ))}
                </div>

                {/* Кнопки CTA */}
                <div className={`flex flex-col sm:flex-row gap-4 mb-12`}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-lg px-8 py-7 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleFreeAnalysis}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 p-2 bg-white/20 rounded-lg">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">
                          Получить консультацию
                        </div>
                      </div>
                    </div>
                  </Button>

                  {/* Кнопка "Обсудить с юристом" - всегда видна, без hover-эффектов */}
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-7 border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 transition-all duration-300"
                    onClick={handleConsultation}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 p-2 bg-red-100 rounded-lg">
                        <Phone className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold">{PHONES.MAIN_DISPLAY}</div>
                        <div className="text-sm font-normal text-gray-500">
                          Обсудить с юристом
                        </div>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Правая колонка - Форма */}
              <div className="lg:w-1/2">
                <div
                  id="contact-form"
                  className={`bg-gradient-to-br from-white via-white to-gray-50 rounded-2xl shadow-2xl p-8 border border-gray-200/50`}
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
                        Быстрая заявка
                      </h3>
                      <p className="text-gray-600">
                        Отправляем заявку прямо в мессенджер
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleFormSubmit}>
                    <div className="space-y-6">
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
                            className={`w-full px-5 py-4 border ${formErrors.name ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-3 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 bg-white/50`}
                            placeholder="Иван Иванов"
                            disabled={isLoading}
                          />
                        </div>
                        {formErrors.name && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Ваш телефон *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            className={`w-full px-5 py-4 border ${formErrors.phone ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-3 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 bg-white/50`}
                            placeholder="+7 (___) ___-__-__"
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

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                            Отправляем...
                          </>
                        ) : (
                          <>
                            <Send className="h-6 w-6 mr-3" />
                            Отправить заявку
                          </>
                        )}
                      </Button>

                      <div className="text-center space-y-3">
                        <p className="text-gray-500 text-sm">
                          Нажимая кнопку, вы соглашаетесь с политикой
                          конфиденциальности
                        </p>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <p className="text-center text-gray-600 mb-5">
                          Или напишите прямо сейчас:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          {/* Telegram - исправленная ссылка */}
                          <a
                            href={`https://t.me/${PHONES.TELEGRAM_RAW}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow hover:shadow-md"
                            onClick={() =>
                              trackCustomGoal("telegram_click", {
                                source: "quick_form",
                              })
                            }
                          >
                            <svg
                              className="w-5 h-5 fill-white"
                              viewBox="0 0 24 24"
                            >
                              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                            </svg>
                            <span>Telegram</span>
                          </a>
                          <a
                            href="https://max.ru/u/f9LHodD0cOJFmV1rIMi6ZjEOt-EbDAs8qqafnjND6gCk6NfTMMBgw0WF_j0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#2B6CB0] to-[#2C5282] hover:from-[#2C5282] hover:to-[#2B6CB0] text-white px-6 py-3 rounded-xl transition-all duration-300 shadow hover:shadow-md"
                            onClick={() =>
                              trackCustomGoal("max_click", {
                                source: "quick_form",
                              })
                            }
                          >
                            <svg
                              className="w-5 h-5 fill-white"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span>MAX Messenger</span>
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
              <h2 className={`text-3xl md:text-4xl font-bold mb-4`}>
                Знакомые чувства?{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                  Вы не одиноки
                </span>
              </h2>
              <p className={`text-xl text-gray-600 max-w-3xl mx-auto`}>
                Каждый день к нам обращаются водители, которые оказались в такой
                же ситуации
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {pains.map((pain, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 rounded-2xl p-7 hover:border-red-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer`}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-3 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl">
                      <div className="text-red-600">{pain.icon}</div>
                    </div>
                    <div className="text-sm font-medium bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                      {pain.emotion}
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900">
                    {pain.title}
                  </h3>
                  <p className="text-gray-600">{pain.description}</p>
                </div>
              ))}
            </div>

            <div
              className={`bg-gradient-to-r from-red-50/80 to-orange-50/80 border border-red-100 rounded-2xl p-10 text-center shadow-lg`}
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
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleFreeAnalysis}
              >
                <Shield className="mr-3 h-6 w-6" />
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
                className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full font-semibold mb-8`}
              >
                <Trophy className="h-6 w-6" />
                РЕАЛЬНАЯ ИСТОРИЯ ПОБЕДЫ
              </div>
              <h2
                className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6`}
              >
                "Все говорили, что дело безнадёжно.
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  {" "}
                  Мы вернули клиенту 247 109 руб.
                </span>
                "
              </h2>
              <p className={`text-xl text-gray-600 max-w-2xl mx-auto`}>
                История Михаила из Новосибирска, который почти смирился с
                несправедливостью
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Левая часть - Ситуация */}
              <div className={`space-y-6`}>
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
                      <li key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full flex items-center justify-center text-sm mt-1">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-6`}
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
                    <Button onClick={handleCaseDetailsOpen} variant="ghost">
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Правая часть - Результат */}
              <div
                className={`bg-gradient-to-br from-blue-50/50 to-cyan-50/50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg`}
              >
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
                    <div className="bg-white p-6 rounded-xl text-center border border-gray-200 shadow-sm">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        80%
                      </div>
                      <div className="text-sm text-gray-600">
                        вины с виновника
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center border border-gray-200 shadow-sm">
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
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-7 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleCaseDetailsOpen}
                  >
                    <FileText className="mr-3 h-6 w-6" />
                    Читать полный разбор дела
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Заключение кейса - исправленный блок (убраны hover эффекты) */}
            <div
              className={`bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-12 text-center shadow-2xl`}
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
                  className="bg-gradient-to-r from-white to-gray-100 text-gray-900 font-bold px-10 py-7 shadow-lg transition-all duration-300"
                  onClick={handleFreeAnalysis}
                >
                  <Search className="mr-3 h-6 w-6" />
                  Проанализировать мою ситуацию
                </Button>
                <Button
                  size="lg"
                  className="border-2 border-white text-white px-10 py-7 backdrop-blur-sm"
                  onClick={handleConsultation}
                >
                  <Phone className="mr-3 h-6 w-6" />
                  Обсудить с юристом
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - только мессенджеры (без основного номера) */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full mb-10 backdrop-blur-sm border border-white/10`}
            >
              <Shield className="h-12 w-12 text-yellow-400" />
            </div>

            <h2 className={`text-3xl md:text-4xl font-bold mb-10`}>
              Ещё сомневаетесь?
            </h2>

            <div className={`mb-12`}>
              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30 max-w-2xl mx-auto">
                <p className="text-xl leading-relaxed">
                  <span className="font-bold">98% наших клиентов</span>{" "}
                  полностью снимают вину. Вы платите только если мы выигрываем
                  ваше дело.
                </p>
              </div>
            </div>

            <div className={`pt-10 border-t border-white/20`}>
              <p className="text-lg mb-8 opacity-90">
                Пишите в мессенджеры для быстрой связи:
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <a
                  href={`https://t.me/${PHONES.TELEGRAM_RAW}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl transition-all duration-300"
                >
                  <div className="p-2 bg-white/20 rounded-lg">
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Telegram</div>
                    <div className="text-sm opacity-90">
                      Написать в Telegram
                    </div>
                  </div>
                </a>

                <a
                  href="https://max.ru/u/f9LHodD0cOJFmV1rIMi6ZjEOt-EbDAs8qqafnjND6gCk6NfTMMBgw0WF_j0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-gradient-to-r from-[#2B6CB0] to-[#2C5282] hover:from-[#2C5282] hover:to-[#2B6CB0] text-white px-8 py-4 rounded-xl transition-all duration-300"
                >
                  <div className="p-2 bg-white/20 rounded-lg">
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">MAX Messenger</div>
                    <div className="text-sm opacity-90">Написать в MAX</div>
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
