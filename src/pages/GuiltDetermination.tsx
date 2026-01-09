import { Button } from "@/components/ui/button";
import { trackCustomGoal } from "@/utils/metrika";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Scale,
  Phone,
  Send,
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
  MessageSquare,
  MessageCircle,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

const GuiltDetermination = () => {
  const PHONES = {
    MAIN_DISPLAY: "+7 (383) 235-95-05",
    MAIN_TEL: "+73832359505",
    MESSENGER_DISPLAY: "+7 993 190 35 00",
    MESSENGER_RAW: "+79931903500",
  };

  // SEO настройки
  useEffect(() => {
    document.title =
      "Установление вины в ДТП в Новосибирске — Юридическая помощь";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Профессиональное установление и оспаривание вины в ДТП в суде Новосибирска. Докажем вашу невиновность. Опыт 15+ лет, 98% успешных дел. Бесплатный анализ документов.",
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

  const handleMessengerClick = (messenger) => {
    trackCustomGoal(`${messenger}_click`, {
      source: "page",
      action: "messenger_contact",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
              <Scale size={40} className="text-yellow-600" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Установление вины в ДТП в Новосибирске
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              С 2010 года специализируемся на доказательстве невиновности в
              сложных дорожных спорах
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
                asChild
                onClick={() =>
                  trackCustomGoal("main_phone_call", { source: "hero" })
                }
              >
                <a href={`tel:${PHONES.MAIN_TEL}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {PHONES.MAIN_DISPLAY}
                </a>
              </Button>

              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                asChild
                onClick={() => handleMessengerClick("telegram")}
              >
                <a
                  href={`https://t.me/${PHONES.MESSENGER_RAW.slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Telegram
                </a>
              </Button>

              <Button
                size="lg"
                className="bg-[#2B6CB0] hover:bg-[#2C5282] text-white"
                asChild
                onClick={() => handleMessengerClick("max_messenger")}
              >
                <a
                  href="https://max.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  MAX Messenger
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-600" />
                <span>С 2010 года в спорах о вине</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-600" />
                <span>98% дел с положительным исходом</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-600" />
                <span>Работаем по всей России</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Когда нужно установление вины в Новосибирске?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="text-red-600 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Вас признали виновным
                    </h3>
                    <p className="text-gray-600 text-sm">
                      ГИБДД или суд признали вас виновником, хотя вы не нарушали
                      ПДД
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="text-orange-600 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Обоюдная вина
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Установлена обоюдная вина, но на самом деле вы не виноваты
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileQuestion className="text-blue-600 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Неверный протокол
                    </h3>
                    <p className="text-gray-600 text-sm">
                      В протоколе ДТП указаны неверные обстоятельства
                      происшествия
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Camera className="text-purple-600 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Есть видеозапись
                    </h3>
                    <p className="text-gray-600 text-sm">
                      У вас есть видео с регистратора, которое доказывает
                      невиновность
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section - ИСПРАВЛЕНА ИЕРАРХИЯ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-amber-50/30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-bold text-sm mb-6 shadow-md">
                <div className="flex items-center justify-center gap-2">
                  <Award size={18} />
                  РЕАЛЬНЫЙ РЕЗУЛЬТАТ ИЗ НАШЕЙ ПРАКТИКИ
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Разбор дела: как мы взыскали{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-red-600">
                  247 109 руб.
                </span>
                <br />
                для клиента, когда все отказали
              </h2>
              <div className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm mt-4">
                <Scale size={16} className="mr-2" />
                Дело № 2-3052/2025, Ленинский районный суд г. Новосибирска
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-100 border-3 border-emerald-300 rounded-2xl p-8 text-center mb-10 shadow-lg">
              <p className="text-gray-700 text-lg mb-2">
                Итоговая сумма, полученная клиентом:
              </p>
              <div className="flex flex-col items-center justify-center">
                <div className="text-6xl md:text-7xl font-bold text-gray-900 mb-3">
                  247 109 руб.
                </div>
                <div className="flex items-center justify-center bg-emerald-500 text-white px-6 py-2 rounded-full">
                  <CheckCircle className="mr-3 h-5 w-5" />
                  <span className="font-semibold">
                    Деньги полностью выплачены клиенту
                  </span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-8">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <AlertTriangle className="text-white h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  Исходная ситуация
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
                      1
                    </div>
                    <span className="text-gray-700">
                      ГИБДД <strong>прекратила дело</strong> за истечением
                      сроков
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
                      2
                    </div>
                    <span className="text-gray-700">
                      Страховая компания <strong>отказала в выплате</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
                      3
                    </div>
                    <span className="text-gray-700">
                      Виновник — без страховки, прав и регистрации ТС
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-8">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <Search className="text-white h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  Наша работа
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
                      1
                    </div>
                    <span className="text-gray-700">
                      <strong>Самостоятельно нашли</strong> записи с уличных
                      камер
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
                      2
                    </div>
                    <span className="text-gray-700">
                      Выявили нарушения собственника авто по ст. 1079 ГК РФ
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
                      3
                    </div>
                    <span className="text-gray-700">
                      <strong>Перенаправили иск</strong> на владельца автомобиля
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <Trophy className="text-white h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  Судебный результат
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
                      ✓
                    </div>
                    <span className="text-gray-700">
                      Суд установил обоюдную вину 80% / 20%
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
                      ✓
                    </div>
                    <span className="text-gray-700">
                      Взыскано <strong>247 109 руб.</strong> с собственника ТС
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
                      ✓
                    </div>
                    <span className="text-gray-700">
                      Создан прецедент для аналогичных сложных дел
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-10 shadow-lg">
              <h3 className="text-3xl font-bold text-center mb-10">
                Хронология дела: от проблемы до выплаты
              </h3>

              <div className="relative">
                <div className="hidden md:block absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-red-400 via-blue-400 to-green-400 -translate-y-1/2 z-0"></div>

                <div className="flex flex-col md:flex-row md:justify-between items-center relative">
                  <div className="flex flex-col items-center text-center mb-10 md:mb-0 md:w-1/4 relative z-10">
                    <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                      <FileText className="text-white h-8 w-8" />
                    </div>
                    <div className="bg-red-50 px-4 py-2 rounded-lg mb-2">
                      <p className="font-bold text-red-700">День 1</p>
                    </div>
                    <h4 className="font-bold text-lg mb-2">
                      Отказ ГИБДД и страховой
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Клиент получил отказы со всех сторон
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center mb-10 md:mb-0 md:w-1/4 relative z-10">
                    <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                      <Search className="text-white h-8 w-8" />
                    </div>
                    <div className="bg-amber-50 px-4 py-2 rounded-lg mb-2">
                      <p className="font-bold text-amber-700">Неделя 1</p>
                    </div>
                    <h4 className="font-bold text-lg mb-2">
                      Наш анализ и поиск доказательств
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Нашли записи камер, выявили нарушения
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center mb-10 md:mb-0 md:w-1/4 relative z-10">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                      <Scale className="text-white h-8 w-8" />
                    </div>
                    <div className="bg-blue-50 px-4 py-2 rounded-lg mb-2">
                      <p className="font-bold text-blue-700">Месяц 2</p>
                    </div>
                    <h4 className="font-bold text-lg mb-2">Судебный процесс</h4>
                    <p className="text-gray-600 text-sm">
                      Подача иска и представление в суде
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center md:w-1/4 relative z-10">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                      <Trophy className="text-white h-8 w-8" />
                    </div>
                    <div className="bg-green-50 px-4 py-2 rounded-lg mb-2">
                      <p className="font-bold text-green-700">Месяц 6</p>
                    </div>
                    <h4 className="font-bold text-lg mb-2">Получение денег</h4>
                    <p className="text-gray-600 text-sm">
                      Клиент получил 247 109 руб. на счет
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-8 text-center">
              <Lightbulb size={48} className="mx-auto mb-6 text-yellow-400" />
              <h3 className="text-3xl font-bold mb-6">
                Что это значит для вас?
              </h3>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Даже если ГИБДД прекратила дело, а виновник — без страховки,
                <span className="text-yellow-300 font-bold">
                  {" "}
                  законные пути для компенсации ЕСТЬ
                </span>
                . Нужно только знать, как к этому подступиться.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-6 px-10 text-lg"
                  asChild
                >
                  <Link
                    to="/case-details/delo-2-3052-2025"
                    onClick={() =>
                      trackCustomGoal("case_study_detail_click", {
                        source: "enhanced_case",
                      })
                    }
                  >
                    <FileText className="mr-3 h-6 w-6" />
                    Полный разбор дела с комментариями юриста
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 font-bold py-6 px-10 text-lg"
                  onClick={() => {
                    trackCustomGoal("case_consultation_click", {
                      source: "case_cta",
                    });
                    handleConsultation();
                  }}
                >
                  <MessageSquare className="mr-3 h-6 w-6" />
                  Разобрать мою ситуацию так же детально
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Как мы доказываем невиновность в ДТП
            </h2>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Анализ материалов дела
                  </h3>
                  <p className="text-gray-600">
                    Изучаем протокол, схему ДТП, показания свидетелей, фото и
                    видео с места происшествия
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Независимая экспертиза
                  </h3>
                  <p className="text-gray-600">
                    Назначаем автотехническую экспертизу для установления
                    механизма ДТП и истинного виновника
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Сбор доказательств</h3>
                  <p className="text-gray-600">
                    Запрашиваем записи с камер наблюдения, находим свидетелей,
                    готовим техническую документацию
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Обжалование в суде</h3>
                  <p className="text-gray-600">
                    Подаем иск об установлении невиновности, представляем
                    интересы в суде до положительного решения
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - ИСПРАВЛЕННЫЙ ПЕРЕННОС */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Варианты сотрудничества и стоимость
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Пакет 1: Базовый */}
              <div className="bg-white rounded-xl p-8 border-2 border-gray-200 flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-4">Базовый пакет</h3>
                <div className="text-4xl font-bold text-yellow-600 mb-2">
                  от 30 000 руб.
                </div>
                <p className="text-gray-500 text-sm mb-6">
                  Фиксированная стоимость. Оплата поэтапно.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 mt-1 h-5 w-5 flex-shrink-0" />
                    <span>Детальный анализ материалов дела и стратегии</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 mt-1 h-5 w-5 flex-shrink-0" />
                    <span>Подготовка всех процессуальных документов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 mt-1 h-5 w-5 flex-shrink-0" />
                    <span>
                      Полное представительство в суде первой инстанции
                    </span>
                  </li>
                </ul>
                <Button
                  className="w-full mt-auto"
                  variant="outline"
                  onClick={() => {
                    trackCustomGoal("pricing_basic_click", { plan: "basic" });
                    handleConsultation();
                  }}
                >
                  Выбрать этот пакет
                </Button>
              </div>

              {/* Пакет 2: Полный */}
              <div className="bg-yellow-600 text-white rounded-xl p-8 border-2 border-yellow-700 relative flex flex-col h-full">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Популярный выбор
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Полный пакет</h3>
                <div className="text-4xl font-bold mb-2">от 45 000 руб.</div>
                <p className="text-yellow-100 text-sm mb-6">
                  Максимум действий для сложных случаев.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0" />
                    <span>
                      <strong>Всё, что входит в Базовый пакет</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0" />
                    <span>
                      Организация и оплата независимой автотехнической
                      экспертизы
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0" />
                    <span>Сбор дополнительных доказательств</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0" />
                    <span>Досудебное урегулирование спора</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-white text-yellow-600 hover:bg-gray-100 font-semibold mt-auto"
                  onClick={() => {
                    trackCustomGoal("pricing_full_click", { plan: "full" });
                    handleConsultation();
                  }}
                >
                  Выбрать этот пакет
                </Button>
              </div>

              {/* Пакет 3: Оплата по факту */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Оплата по факту
                </h3>
                <div className="text-4xl font-bold text-blue-700 mb-2">
                  0 руб. за работу
                </div>
                <p className="text-gray-600 text-sm mb-6">
                  Гонорар — 50% от реально взысканной суммы.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-blue-600 mt-1 h-5 w-5 flex-shrink-0" />
                    <span>
                      <strong>Бесплатная юридическая работа</strong> до
                      получения результата
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-blue-600 mt-1 h-5 w-5 flex-shrink-0" />
                    <span>
                      <strong>Мы финансируем экспертизу</strong> (если
                      требуется)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="text-amber-600 mt-1 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">
                      <strong>Госпошлина оплачивается клиентом</strong>{" "}
                      (требование закона)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="text-amber-600 mt-1 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">
                      <strong>Важно:</strong> Расходы на юриста с виновника не
                      взыскиваются. Наш гонорар — 50% от суммы, которая
                      фактически поступит вам.
                    </span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold mt-auto"
                  onClick={() => {
                    trackCustomGoal("pricing_success_click", {
                      plan: "success_fee",
                    });
                    handleConsultation();
                  }}
                >
                  Обсудить условия пакета
                </Button>
              </div>
            </div>

            <div className="mt-10 p-6 bg-gray-100 rounded-lg border border-gray-300">
              <h4 className="font-bold text-gray-900 mb-2 text-center">
                Какой пакет выбрать?
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="text-center p-3">
                  <p>
                    <strong>«Базовый»</strong> — если ситуация ясна и нужен
                    представитель в суде.
                  </p>
                </div>
                <div className="text-center p-3">
                  <p>
                    <strong>«Полный»</strong> — если дело сложное, нужны
                    экспертизы.
                  </p>
                </div>
                <div className="text-center p-3">
                  <p>
                    <strong>«Оплата по факту»</strong> — если хотите разделить
                    риски и платить только за результат.
                  </p>
                </div>
              </div>
              <p className="text-center text-gray-600 mt-4 text-sm">
                * Окончательная стоимость в первых двух пакетах определяется
                после анализа документов и фиксируется в договоре.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-yellow-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              Получите анализ вашей ситуации как в нашем кейсе
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Бесплатно изучим ваши документы и дадим честную оценку шансов в
              течение 24 часов
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold"
                onClick={() => {
                  trackCustomGoal("consultation_cta_click", {
                    source: "main_cta",
                  });
                  handleConsultation();
                }}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Получить анализ документов
              </Button>
              <Button
                size="lg"
                className="bg-yellow-800 text-white hover:bg-yellow-900 font-semibold"
                onClick={() => {
                  trackCustomGoal("phone_cta_click", { source: "main_cta" });
                  window.location.href = `tel:${PHONES.MAIN_TEL}`;
                }}
              >
                <Phone className="mr-2 h-5 w-5" />
                Позвонить для срочной консультации
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-6">
              Или напишите в мессенджеры:
            </p>
            <div className="flex justify-center gap-4 mt-3">
              <a
                href={`https://t.me/${PHONES.MESSENGER_RAW.slice(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={() => handleMessengerClick("telegram_cta")}
              >
                <Send size={16} />
                Telegram
              </a>
              <a
                href="https://max.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#2B6CB0] hover:bg-[#2C5282] text-white px-4 py-2 rounded-lg"
                onClick={() => handleMessengerClick("max_messenger_cta")}
              >
                <MessageSquare size={16} />
                MAX Messenger
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuiltDetermination;
