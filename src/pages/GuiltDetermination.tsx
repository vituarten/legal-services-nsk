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
  X,
  FileCheck,
  Scale,
  TrendingUp,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ShieldCheck,
  Target as TargetIcon,
  BarChart,
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

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [formErrors, setFormErrors] = useState({});
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const heroRef = useRef(null);
  const navigate = useNavigate();

  // Функция для показа уведомлений
  const showToast = (type, message) => {
    setToastMessage(message);
    if (type === "success") {
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    } else {
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 5000);
    }
  };

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

      const responseText = await response.text();
      console.log("Green API Response:", response.status, responseText);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${responseText}`);
      }

      const data = JSON.parse(responseText);
      return { success: true, data };
    } catch (error) {
      console.error("Green API Error:", error);
      return {
        success: false,
        error: error.message || "Не удалось отправить сообщение",
      };
    }
  };

  // Обработчик ввода телефона с автоформатированием
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

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
      trackCustomGoal("form_submitted", { status: "success" });
      showToast(
        "success",
        `Заявка от ${formData.name} успешно отправлена. Мы свяжемся в течение 15 минут.`,
      );
      setFormData({ name: "", phone: "" });
    } else {
      trackCustomGoal("form_error", { error: result.error });
      showToast(
        "error",
        "Ошибка отправки. Пожалуйста, позвоните нам напрямую.",
      );
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

  // FAQ данные
  const faqItems = [
    {
      question: "Если уже признали виновным — можно обжаловать?",
      answer:
        "Да, обязательно! В 85% случаев решение ГИБДД можно оспорить в суде. Даже если вы уже подписали протокол — это не окончательный вердикт. Мы анализируем все нарушения процедуры и доказательства.",
      icon: <Scale className="h-5 w-5" />,
      important: true,
    },
    {
      question: "Если прошло 10 дней — всё потеряно?",
      answer:
        "Нет! У вас есть 10 дней на обжалование постановления, но если срок пропущен — мы подаем ходатайство о восстановлении срока. В 95% случаев суд идет навстречу, если причина уважительная.",
      icon: <Clock className="h-5 w-5" />,
      important: true,
    },
    {
      question: "Какие шансы именно у меня?",
      answer:
        "После бесплатного анализа вашего дела мы даем четкий прогноз. В среднем по нашим делам: 78% — полное снятие вины, 15% — снижение вины (с 100% до 20-50%), 7% — сохранение статуса-кво. Точный прогноз — после изучения документов.",
      icon: <TrendingUp className="h-5 w-5" />,
      important: true,
    },
    {
      question: "Сколько длится суд?",
      answer:
        "Обычно 2-3 месяца. Первое заседание через 3-4 недели после подачи иска. Мы ускоряем процесс за счет подготовки полного пакета документов сразу.",
      icon: <Clock4 className="h-5 w-5" />,
      important: true,
    },
    {
      question: "Что если проиграем?",
      answer:
        "Мы работаем по договору с гарантией результата. Если не добиваемся положительного решения — вы платите только расходы на экспертизы (около 5000-15000 руб). Наша гонорарная часть — только при успехе.",
      icon: <ShieldCheck className="h-5 w-5" />,
      important: true,
    },
    {
      question: "Сколько это стоит?",
      answer:
        "Стоимость зависит от сложности: от 25 000 руб за обжалование протокола до 45 000 руб за полный судебный процесс. Точную цену фиксируем в договоре после анализа документов.",
      icon: <FileCheck className="h-5 w-5" />,
    },
    {
      question: "Вы работаете только в Новосибирске?",
      answer:
        "Да, мы специализируемся на судах Новосибирска и области. Это позволяет нам глубоко знать местную судебную практику и быстро взаимодействовать с судами.",
      icon: <TargetIcon className="h-5 w-5" />,
    },
    {
      question: "Нужно ли мне присутствовать в суде?",
      answer:
        "В 70% случаев ваше присутствие не требуется. Мы представляем ваши интересы самостоятельно. Вызываем вас только если судья настаивает или для дачи пояснений.",
      icon: <Users className="h-5 w-5" />,
    },
  ];

  // Как мы работаем
  const workflowSteps = [
    {
      step: "1",
      title: "Бесплатный разбор дела",
      description:
        "Изучаем ваши документы (протокол, схему ДТП, фото/видео). Даем четкий прогноз и план действий.",
      duration: "30-60 минут",
      icon: <Search className="h-8 w-8" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      step: "2",
      title: "Доказательства и экспертизы",
      description:
        "Собираем дополнительные доказательства, при необходимости — автотехническую экспертизу, запросы в ГИБДД, свидетелей.",
      duration: "3-10 дней",
      icon: <FileText className="h-8 w-8" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      step: "3",
      title: "Суд и результат",
      description:
        "Подаем иск, представляем ваши интересы в суде, добиваемся решения. Полностью сопровождаем до исполнения решения.",
      duration: "2-3 месяца",
      icon: <Scale className="h-8 w-8" />,
      color: "from-green-500 to-emerald-500",
    },
  ];

  // Юридические гарантии
  const legalGuarantees = [
    {
      title: "Фиксированная цена в договоре",
      description:
        "Стоимость услуг фиксируется в договоре и не меняется в процессе работы. Никаких скрытых платежей.",
      icon: <FileCheck className="h-10 w-10" />,
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "Работа до результата",
      description:
        "Мы ведем дело до окончательного решения суда. Если нужна апелляция — продолжаем без доплат (кроме госпошлины).",
      icon: <Target className="h-10 w-10" />,
      color: "bg-green-50 border-green-200",
    },
    {
      title: "Еженедельная отчетность",
      description:
        "Вы получаете отчет о проделанной работе каждую неделю. Все документы доступны в личном кабинете.",
      icon: <BarChart className="h-10 w-10" />,
      color: "bg-purple-50 border-purple-200",
    },
    {
      title: "Деньги под защитой",
      description:
        "Ваши деньги хранятся на расчетном счете до выполнения этапов работ. Возврат при расторжении договора.",
      icon: <ShieldCheck className="h-10 w-10" />,
      color: "bg-amber-50 border-amber-200",
    },
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
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
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideOutUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
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
        .animate-slide-in-down {
          animation: slideInDown 0.3s ease-out forwards;
        }
        .animate-slide-out-up {
          animation: slideOutUp 0.3s ease-out forwards;
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
      `}</style>

      {/* Toast уведомления в правом верхнем углу */}
      {showSuccessToast && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in-down">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-lg p-4 max-w-sm">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Успешно отправлено
                </p>
                <p className="text-xs text-gray-600 mt-1">{toastMessage}</p>
              </div>
              <button
                onClick={() => setShowSuccessToast(false)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {showErrorToast && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in-down">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl shadow-lg p-4 max-w-sm">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Ошибка отправки
                </p>
                <p className="text-xs text-gray-600 mt-1">{toastMessage}</p>
              </div>
              <button
                onClick={() => setShowErrorToast(false)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-red-200">
              <button
                onClick={handleConsultation}
                className="text-sm font-medium text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <Phone className="h-3 w-3" />
                Позвонить {PHONES.MAIN_DISPLAY}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section с анимациями */}
      <section ref={heroRef} className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-red-100/30 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-yellow-100/20 to-transparent rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-48 bg-gradient-to-r from-transparent via-blue-50/10 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Левая колонка - Контент */}
              <div className="lg:w-1/2">
                <div
                  className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full text-sm font-semibold mb-6 animate-fade-in-up`}
                >
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    СРОЧНАЯ ПОМОЩЬ ПРИ НЕСПРАВЕДЛИВОМ ОБВИНЕНИИ
                  </span>
                </div>

                <h1
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up`}
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
                  className={`text-xl text-gray-600 mb-8 animate-fade-in-up`}
                  style={{ animationDelay: "0.2s" }}
                >
                  Не позволяйте ошибке инспектора испортить вашу жизнь.
                  <span className="font-semibold text-gray-900">
                    {" "}
                    98% наших клиентов
                  </span>{" "}
                  полностью снимают вину через суд.
                </p>

                <div
                  className={`bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-amber-500 p-5 mb-8 rounded-r-xl shadow-sm animate-fade-in-up`}
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 animate-pulse-slow`}>
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
                  className={`space-y-4 mb-10 animate-fade-in-up`}
                  style={{ animationDelay: "0.4s" }}
                >
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
                          className={`p-2 bg-gradient-to-br ${guarantee.color} rounded-lg transition-transform duration-300 hover:scale-110`}
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
                <div
                  className={`flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up`}
                  style={{ animationDelay: "0.5s" }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-lg px-8 py-7 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleFreeAnalysis}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 p-2 bg-white/20 rounded-lg transition-transform duration-300 group-hover:scale-110">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">
                          Получить консультацию
                        </div>
                      </div>
                    </div>
                  </Button>

                  {/* Кнопка "Обсудить с юристом" - в стиле дизайна */}
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white text-lg px-8 py-7 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleConsultation}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 p-2 bg-white/20 rounded-lg transition-transform duration-300 group-hover:scale-110">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold">{PHONES.MAIN_DISPLAY}</div>
                        <div className="text-sm font-normal opacity-90">
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
                  className={`bg-gradient-to-br from-white via-white to-gray-50 rounded-2xl shadow-2xl p-8 border border-gray-200/50 animate-slide-in-right`}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                        <Send className="h-7 w-7 text-blue-600" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse-slow">
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
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
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
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                            <AlertCircle className="h-4 w-4" />
                            {formErrors.phone}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
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
                              <Send className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                              Отправить заявку
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
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <p className="text-center text-gray-600 mb-5">
                          Или напишите прямо сейчас:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <a
                            href={`https://t.me/${PHONES.TELEGRAM_RAW}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow hover:shadow-md group"
                          >
                            <svg
                              className="w-5 h-5 fill-white transition-transform duration-300 group-hover:scale-110"
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
                            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#2B6CB0] to-[#2C5282] hover:from-[#2C5282] hover:to-[#2B6CB0] text-white px-6 py-3 rounded-xl transition-all duration-300 shadow hover:shadow-md group"
                          >
                            <svg
                              className="w-5 h-5 fill-white transition-transform duration-300 group-hover:scale-110"
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

      {/* Pains Section с анимацией */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className={`text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up`}
              >
                Знакомые чувства?{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                  Вы не одиноки
                </span>
              </h2>
              <p
                className={`text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up`}
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
                  className={`bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 rounded-2xl p-7 hover:border-red-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-fade-in-up`}
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-3 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl transition-transform duration-300 hover:scale-110">
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
              className={`bg-gradient-to-r from-red-50/80 to-orange-50/80 border border-red-100 rounded-2xl p-10 text-center shadow-lg animate-fade-in-up`}
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
                <Shield className="mr-3 h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                Защитить мои права сейчас
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Ответы на страхи */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div
                className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-full font-semibold mb-8 animate-fade-in-up`}
              >
                <HelpCircle className="h-6 w-6" />
                ОТВЕТЫ НА ГЛАВНЫЕ ВОПРОСЫ
              </div>
              <h2
                className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 animate-fade-in-up`}
              >
                Развеиваем ваши{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  главные страхи
                </span>
              </h2>
              <p
                className={`text-xl text-gray-600 animate-fade-in-up`}
                style={{ animationDelay: "0.1s" }}
              >
                То, что волнует каждого водителя в вашей ситуации
              </p>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className={`bg-white border ${item.important ? "border-red-200" : "border-gray-200"} rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden animate-fade-in-up`}
                  style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                >
                  <button
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 mt-1 ${item.important ? "text-red-600" : "text-blue-600"}`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {item.question}
                          {item.important && (
                            <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Важно
                            </span>
                          )}
                        </h3>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </button>

                  {expandedFaq === index && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <div className="pl-10 border-l-2 border-blue-200">
                        <p className="text-gray-700 leading-relaxed">
                          {item.answer}
                        </p>
                        {item.important && index === 0 && (
                          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                            <p className="text-sm text-gray-700">
                              <span className="font-semibold">Важно:</span> Из
                              127 дел за 2024 год мы обжаловали 98% протоколов,
                              и в 85% случаев суд встал на сторону водителя.
                            </p>
                          </div>
                        )}
                        {item.important && index === 2 && (
                          <div className="mt-4 flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                            <BarChart className="h-5 w-5 text-blue-600" />
                            <p className="text-sm text-gray-700">
                              <span className="font-semibold">
                                Наша статистика:
                              </span>{" "}
                              Полное снятие вины — 78%, Снижение степени вины —
                              15%, Сохранение статуса — 7%.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-16 text-center animate-fade-in">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Остались вопросы?
                </h3>
                <p className="text-gray-700 mb-6">
                  Получите персональный ответ от нашего юриста в течение 15
                  минут
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={handleFreeAnalysis}
                >
                  <MessageCircle className="mr-3 h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  Задать вопрос юристу
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Как мы работаем */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div
                className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full font-semibold mb-8 animate-fade-in-up`}
              >
                <BookOpen className="h-6 w-6" />
                ПОНЯТНЫЙ ПУТЬ К РЕЗУЛЬТАТУ
              </div>
              <h2
                className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 animate-fade-in-up`}
              >
                Как мы{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  работаем
                </span>
              </h2>
              <p
                className={`text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up`}
                style={{ animationDelay: "0.1s" }}
              >
                Четкий план действий от первой консультации до решения суда
              </p>
            </div>

            <div className="relative">
              {/* Декоративная линия для десктопа */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-cyan-200 to-blue-200 transform -translate-x-1/2"></div>

              <div className="space-y-12 lg:space-y-0">
                {workflowSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`relative animate-fade-in-up`}
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <div
                      className={`lg:flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                    >
                      {/* Контент */}
                      <div
                        className={`lg:w-1/2 ${index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"}`}
                      >
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                          <div className="flex items-start gap-6 mb-6">
                            <div
                              className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}
                            >
                              <div className="text-white">{step.icon}</div>
                            </div>
                            <div>
                              <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700 mb-2">
                                <Clock className="h-3 w-3 mr-2" />
                                {step.duration}
                              </div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                {step.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Шаг с номером */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 lg:translate-x-0 z-10 mt-8 lg:mt-0">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white to-gray-50 border-4 border-white rounded-full shadow-xl">
                          <div
                            className={`text-2xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}
                          >
                            {step.step}
                          </div>
                        </div>
                      </div>

                      {/* Пустая колонка для выравнивания */}
                      <div className="lg:w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center animate-fade-in">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-12 shadow-2xl">
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  Начните с первого шага — это бесплатно
                </h3>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Отправьте документы на анализ. Через 30-60 минут вы получите
                  четкий план действий и точную стоимость услуг.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    onClick={handleFreeAnalysis}
                  >
                    <FileText className="mr-3 h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                    Отправить документы на анализ
                  </Button>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white border-2 border-white/50 hover:border-white px-10 py-6 backdrop-blur-sm group"
                    onClick={handleConsultation}
                  >
                    <Phone className="mr-3 h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                    {PHONES.MAIN_DISPLAY}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Юридические гарантии */}
      <section className="py-24 bg-gradient-to-b from-blue-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div
                className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full font-semibold mb-8 animate-fade-in-up`}
              >
                <ShieldCheck className="h-6 w-6" />
                ЮРИДИЧЕСКИЕ ГАРАНТИИ
              </div>
              <h2
                className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 animate-fade-in-up`}
              >
                Ваша{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  защита по договору
                </span>
              </h2>
              <p
                className={`text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up`}
                style={{ animationDelay: "0.1s" }}
              >
                Формальные гарантии, которые дают вам уверенность и защищают
                ваши права
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {legalGuarantees.map((guarantee, index) => (
                <div
                  key={index}
                  className={`border-2 ${guarantee.color} rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-fade-in-up`}
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`p-4 rounded-2xl mb-6 transition-transform duration-300 hover:scale-110 ${guarantee.color.replace("bg-", "bg-").replace("border-", "bg-")}`}
                    >
                      <div
                        className={`${guarantee.color.includes("blue") ? "text-blue-600" : guarantee.color.includes("green") ? "text-green-600" : guarantee.color.includes("purple") ? "text-purple-600" : "text-amber-600"}`}
                      >
                        {guarantee.icon}
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-4 text-gray-900">
                      {guarantee.title}
                    </h3>
                    <p className="text-gray-600">{guarantee.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-10 text-center shadow-lg animate-fade-in">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Договор — ваша главная защита
                </h3>
                <p className="text-gray-700 mb-8 text-lg">
                  Каждый пункт договора согласовывается с вами. Вы платите
                  только за результат.
                  <span className="font-semibold text-gray-900">
                    {" "}
                    Все наши обязательства зафиксированы на бумаге.
                  </span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    onClick={handleFreeAnalysis}
                  >
                    <FileCheck className="mr-3 h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                    Получить образец договора
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 px-10 py-6 group"
                    onClick={() => window.open("/docs/license.pdf", "_blank")}
                  >
                    <FileText className="mr-3 h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                    Наши лицензии
                  </Button>
                </div>
              </div>
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
                className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full font-semibold mb-8 animate-fade-in-up`}
              >
                <Trophy className="h-6 w-6" />
                РЕАЛЬНАЯ ИСТОРИЯ ПОБЕДЫ
              </div>
              <h2
                className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 animate-fade-in-up`}
              >
                "Все говорили, что дело безнадёжно.
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  {" "}
                  Мы вернули клиенту 247 109 руб.
                </span>
                "
              </h2>
              <p
                className={`text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up`}
                style={{ animationDelay: "0.1s" }}
              >
                История Михаила из Новосибирска, который почти смирился с
                несправедливостью
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className={`space-y-6 animate-slide-in-left`}>
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-200">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl flex items-center justify-center shadow-lg animate-float">
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
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full flex items-center justify-center text-sm mt-1 transition-transform duration-300 group-hover:scale-110">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-6 animate-fade-in`}
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
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className={`animate-slide-in-right`}>
                <div className="bg-gradient-to-br from-blue-50/50 to-cyan-50/50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
                  <div className="space-y-7">
                    <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-8 text-center border border-gray-200 shadow-inner animate-pulse-slow">
                      <div className="text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                        247 109 руб.
                      </div>
                      <div className="text-gray-600 flex items-center justify-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-emerald-500" />
                        полностью выплачены клиенту
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="bg-white p-6 rounded-xl text-center border border-gray-200 shadow-sm transition-shadow duration-300 hover:shadow-md">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          80%
                        </div>
                        <div className="text-sm text-gray-600">
                          вины с виновника
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-xl text-center border border-gray-200 shadow-sm transition-shadow duration-300 hover:shadow-md">
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
                      <FileText className="mr-3 h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                      Читать полный разбор дела
                      <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Заключение кейса */}
            <div
              className={`bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-12 text-center shadow-2xl animate-fade-in`}
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
                  <Search className="mr-3 h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  Проанализировать мою ситуацию
                </Button>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white border-2 border-white/50 hover:border-white px-10 py-7 backdrop-blur-sm group"
                  onClick={handleConsultation}
                >
                  <Phone className="mr-3 h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  Обсудить с юристом
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full mb-10 backdrop-blur-sm border border-white/10 animate-float`}
            >
              <Shield className="h-12 w-12 text-yellow-400" />
            </div>

            <h2
              className={`text-3xl md:text-4xl font-bold mb-10 animate-fade-in-up`}
            >
              Ещё сомневаетесь?
            </h2>

            <div
              className={`mb-12 animate-fade-in-up`}
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30 max-w-2xl mx-auto">
                <p className="text-xl leading-relaxed">
                  <span className="font-bold">98% наших клиентов</span>{" "}
                  полностью снимают вину. Вы платите только если мы выигрываем
                  ваше дело.
                </p>
              </div>
            </div>

            <div className={`pt-10 border-t border-white/20 animate-fade-in`}>
              <p className="text-lg mb-8 opacity-90">
                Пишите в мессенджеры для быстрой связи:
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <a
                  href={`https://t.me/${PHONES.TELEGRAM_RAW}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl transition-all duration-300 group"
                >
                  <div className="p-2 bg-white/20 rounded-lg transition-transform duration-300 group-hover:scale-110">
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
                  className="inline-flex items-center gap-4 bg-gradient-to-r from-[#2B6CB0] to-[#2C5282] hover:from-[#2C5282] hover:to-[#2B6CB0] text-white px-8 py-4 rounded-xl transition-all duration-300 group"
                >
                  <div className="p-2 bg-white/20 rounded-lg transition-transform duration-300 group-hover:scale-110">
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
