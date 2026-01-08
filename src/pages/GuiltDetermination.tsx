import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import SEOHead from "@/components/SEOHead";
import { getSEOConfig } from "@/utils/seoConfig";
import { trackCustomGoal } from "@/utils/metrika";

const GuiltDetermination = () => {
  const seo = getSEOConfig("guiltDetermination");

  const handleConsultation = () => {
    trackCustomGoal("guilt_determination_consultation", {
      source: "page",
      action: "phone_call",
    });
    window.location.href = "tel:+79994523500";
  };

  const openModal = handleConsultation;

  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />

      <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-50">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
                <Icon name="Scale" size={40} className="text-yellow-600" />
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
                >
                  <a href="tel:+79994523500">
                    <Icon name="Phone" className="mr-2" />
                    +7 999 452 35 00
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  asChild
                >
                  <a href="https://t.me/+79931903500" target="_blank">
                    <Icon name="Send" className="mr-2" />
                    Telegram
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Icon
                    name="CheckCircle"
                    size={20}
                    className="text-green-600"
                  />
                  <span>С 2010 года в спорах о вине</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon
                    name="CheckCircle"
                    size={20}
                    className="text-green-600"
                  />
                  <span>98% дел с положительным исходом</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon
                    name="CheckCircle"
                    size={20}
                    className="text-green-600"
                  />
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
                      <Icon name="AlertTriangle" className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Вас признали виновным
                      </h3>
                      <p className="text-gray-600 text-sm">
                        ГИБДД или суд признали вас виновником, хотя вы не
                        нарушали ПДД
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Users" className="text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Обоюдная вина
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Установлена обоюдная вина, но на самом деле вы не
                        виноваты
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="FileQuestion" className="text-blue-600" />
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
                      <Icon name="Camera" className="text-purple-600" />
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
                    <h3 className="text-xl font-bold mb-2">
                      Сбор доказательств
                    </h3>
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
                    <h3 className="text-xl font-bold mb-2">
                      Обжалование в суде
                    </h3>
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

        {/* Case Study Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                  <Icon name="FileText" size={32} className="text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold">
                  Реальный кейс из нашей практики
                </h2>
                <p className="text-gray-600 mt-2">
                  Ленинский районный суд г. Новосибирска, дело № 2-3052/2025
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-yellow-50 border-2 border-blue-200 rounded-2xl p-8 mb-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="AlertCircle" className="text-red-600" />
                    </div>
                    <h3 className="font-bold mb-2">Исходная проблема</h3>
                    <p className="text-sm text-gray-600">
                      Клиента признали виновным в ДТП. ГИБДД прекратила дело,
                      страховая отказала в выплате. Виновник — без страховки и
                      прав.
                    </p>
                  </div>

                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Search" className="text-yellow-600" />
                    </div>
                    <h3 className="font-bold mb-2">Наша стратегия</h3>
                    <p className="text-sm text-gray-600">
                      Перенаправили иск на собственника автомобиля, который
                      нарушил закон, передав незастрахованное ТС.
                    </p>
                  </div>

                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Award" className="text-green-600" />
                    </div>
                    <h3 className="font-bold mb-2">Результат</h3>
                    <p className="text-sm text-gray-600">
                      Суд установил обоюдную вину 80%/20% и взыскал с
                      собственника{" "}
                      <span className="font-bold text-green-700">
                        247 109 рублей
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Icon name="CheckCircle" className="text-green-600 mt-1" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">
                      Самостоятельный сбор доказательств
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Обнаружили и запросили записи с уличных камер, которые не
                      были исследованы ГИБДД.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Icon name="CheckCircle" className="text-green-600 mt-1" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Глубокий правовой анализ</h4>
                    <p className="text-gray-600 text-sm">
                      Выявили нарушения со стороны собственника: отсутствие
                      ОСАГО и регистрации ТС более 2-х лет.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Icon name="CheckCircle" className="text-green-600 mt-1" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Перевод ответственности</h4>
                    <p className="text-gray-600 text-sm">
                      Доказали в суде, что собственник, а не водитель, должен
                      нести ответственность за причиненный вред.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    trackCustomGoal("case_study_detail_click", {
                      source: "main_page",
                    });
                    // Здесь будет переход на детальную страницу кейса
                    window.location.href = "/case-details/delo-2-3052-2025";
                  }}
                >
                  <Icon name="ExternalLink" className="mr-2" />
                  Подробный разбор этого дела с комментариями юриста
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Порядок работы
              </h2>

              <div className="relative">
                {/* Timeline line */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-yellow-200"></div>

                <div className="space-y-12">
                  {/* Step 1 */}
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-600 text-white rounded-full font-bold text-xl mb-4 relative z-10">
                        1
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        Анализ документов
                      </h3>
                      <p className="text-gray-600">
                        Бесплатный анализ ваших документов в течение 24 часов
                      </p>
                    </div>
                    <div className="md:w-1/2 md:pl-12">
                      <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                        <h4 className="font-bold mb-2">Что нужно сделать:</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start gap-2">
                            <Icon
                              name="CheckCircle"
                              size={16}
                              className="text-green-600 mt-1 flex-shrink-0"
                            />
                            <span>Пришлите фото документов в Telegram</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon
                              name="CheckCircle"
                              size={16}
                              className="text-green-600 mt-1 flex-shrink-0"
                            />
                            <span>Расскажите обстоятельства ДТП</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon
                              name="CheckCircle"
                              size={16}
                              className="text-green-600 mt-1 flex-shrink-0"
                            />
                            <span>Получите предварительную оценку шансов</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                      <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                        <h4 className="font-bold mb-2">
                          Что включает договор:
                        </h4>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start gap-2">
                            <Icon
                              name="CheckCircle"
                              size={16}
                              className="text-green-600 mt-1 flex-shrink-0"
                            />
                            <span>
                              Фиксированная стоимость без скрытых платежей
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon
                              name="CheckCircle"
                              size={16}
                              className="text-green-600 mt-1 flex-shrink-0"
                            />
                            <span>
                              Поэтапная оплата по факту выполнения работ
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon
                              name="CheckCircle"
                              size={16}
                              className="text-green-600 mt-1 flex-shrink-0"
                            />
                            <span>Прописанные сроки на каждом этапе</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 order-1 md:order-2">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-600 text-white rounded-full font-bold text-xl mb-4 relative z-10">
                        2
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        Заключение договора
                      </h3>
                      <p className="text-gray-600">
                        Прозрачные условия и пошаговая оплата
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-600 text-white rounded-full font-bold text-xl mb-4 relative z-10">
                        3
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        Подготовка к суду
                      </h3>
                      <p className="text-gray-600">
                        Сбор доказательств и подготовка процессуальных
                        документов
                      </p>
                    </div>
                    <div className="md:w-1/2 md:pl-12">
                      <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                        <h4 className="font-bold mb-2">Этапы подготовки:</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start gap-2">
                            <Icon
                              name="CheckCircle"
                              size={16}
                              className="text-green-600 mt-1 flex-shrink-0"
                            />
                            <span>
                              Запрос записей с камер наблюдения (1-2 недели)
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon
                              name="CheckCircle"
                              size={16}
                              className="text-green-600 mt-1 flex-shrink-0"
                            />
                            <span>
                              Проведение независимой экспертизы при
                              необходимости
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon
                              name="CheckCircle"
                              size={16}
                              className="text-green-600 mt-1 flex-shrink-0"
                            />
                            <span>
                              Подготовка искового заявления и доказательств
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                      <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                        <h4 className="font-bold mb-2">
                          Что мы делаем в суде:
                        </h4>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start gap-2">
                            <Icon
                              name="CheckCircle"
                              size={16}
                              className="text-green-600 mt-1 flex-shrink-0"
                            />
                            <span>
                              Полное представительство ваших интересов
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon
                              name="CheckCircle"
                              size={16}
                              className="text-green-600 mt-1 flex-shrink-0"
                            />
                            <span>Защита вашей позиции на всех заседаниях</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon
                              name="CheckCircle"
                              size={16}
                              className="text-green-600 mt-1 flex-shrink-0"
                            />
                            <span>Контроль исполнения решения суда</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 order-1 md:order-2">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-600 text-white rounded-full font-bold text-xl mb-4 relative z-10">
                        4
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        Судебный процесс
                      </h3>
                      <p className="text-gray-600">
                        Представительство в суде до получения решения
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Частые вопросы
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Icon name="HelpCircle" className="text-yellow-600" />
                    Сколько длится процесс установления вины?
                  </h3>
                  <p className="text-gray-600">
                    В среднем от 2 до 6 месяцев в зависимости от сложности дела.
                    Включает сбор доказательств (1-2 месяца), судебное
                    разбирательство (1-3 месяца) и получение решения. Мы даем
                    четкие сроки после анализа вашей ситуации.
                  </p>
                </div>

                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Icon name="HelpCircle" className="text-yellow-600" />
                    Что делать, если у меня нет видеозаписи ДТП?
                  </h3>
                  <p className="text-gray-600">
                    В 70% случаев мы находим записи с уличных камер наблюдения.
                    Как в нашем кейсе, самостоятельно запрашиваем записи с камер
                    магазинов, банков и городских систем видеонаблюдения. Также
                    ищем свидетелей и анализируем технические возможности
                    транспортных средств.
                  </p>
                </div>

                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Icon name="HelpCircle" className="text-yellow-600" />
                    Какова вероятность успеха в моем случае?
                  </h3>
                  <p className="text-gray-600">
                    После анализа документов мы даем честную оценку шансов. В
                    98% дел добиваемся либо полного снятия вины, либо
                    значительного снижения доли (как в нашем кейсе — 80%/20%).
                    Мы не берем заведомо проигрышные дела.
                  </p>
                </div>

                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Icon name="HelpCircle" className="text-yellow-600" />
                    Кто оплачивает независимую экспертизу?
                  </h3>
                  <p className="text-gray-600">
                    Экспертиза включается в стоимость наших услуг и оплачивается
                    поэтапно. В среднем это 15-25 тысяч рублей. Мы работаем с
                    проверенными экспертами и даем гарантию на качество
                    заключения.
                  </p>
                </div>

                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Icon name="HelpCircle" className="text-yellow-600" />
                    Что если виновник без страховки, как в вашем кейсе?
                  </h3>
                  <p className="text-gray-600">
                    Именно для таких случаев у нас есть стратегия перевода
                    ответственности на собственника ТС. Как в нашем кейсе, мы
                    добиваемся взыскания ущерба с владельца автомобиля, который
                    нарушил закон, передав незастрахованное ТС (статья 1079 ГК
                    РФ).
                  </p>
                </div>
              </div>

              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  className="border-yellow-600 text-yellow-600 hover:bg-yellow-50"
                  onClick={() => {
                    trackCustomGoal("faq_contact_click", {
                      source: "faq_section",
                    });
                    openModal();
                  }}
                >
                  <Icon name="MessageCircle" className="mr-2" />
                  Задать свой вопрос юристу
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Что вы получите
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-xl border-2 border-green-200">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon
                      name="ShieldCheck"
                      size={32}
                      className="text-green-600"
                    />
                  </div>
                  <h3 className="font-bold mb-2">Снятие вины</h3>
                  <p className="text-sm text-gray-600">
                    Официальное признание невиновности в ДТП
                  </p>
                </div>

                <div className="text-center p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon
                      name="DollarSign"
                      size={32}
                      className="text-blue-600"
                    />
                  </div>
                  <h3 className="font-bold mb-2">Возврат выплат</h3>
                  <p className="text-sm text-gray-600">
                    Не придется платить за чужой ущерб
                  </p>
                </div>

                <div className="text-center p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Award" size={32} className="text-purple-600" />
                  </div>
                  <h3 className="font-bold mb-2">Чистая репутация</h3>
                  <p className="text-sm text-gray-600">
                    Сохраните безаварийную страховую историю
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Principles Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                  <Icon name="Target" size={32} className="text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold">Наши принципы работы</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <Icon
                      name="CheckCircle"
                      className="text-green-600 mt-1 flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-bold mb-2">Честная оценка шансов</h3>
                      <p className="text-gray-600 text-sm">
                        С первого звонка даем реалистичную оценку перспектив
                        вашего дела. Не берем дела с заведомо очевидной виной
                        клиента.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <Icon
                      name="CheckCircle"
                      className="text-green-600 mt-1 flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-bold mb-2">
                        Фиксированная стоимость
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Цена прописывается в договоре и не меняется в процессе
                        работы. Оплата поэтапно по факту выполнения работ.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <Icon
                      name="CheckCircle"
                      className="text-green-600 mt-1 flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-bold mb-2">Только споры о вине</h3>
                      <p className="text-gray-600 text-sm">
                        С 2010 года специализируемся исключительно на
                        установлении и оспаривании вины в ДТП. Это наша узкая
                        экспертиза.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <Icon
                      name="CheckCircle"
                      className="text-green-600 mt-1 flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-bold mb-2">Полная прозрачность</h3>
                      <p className="text-gray-600 text-sm">
                        Вы в курсе каждого этапа работы. Все документы и
                        процессуальные действия согласовываются с вами.
                      </p>
                    </div>
                  </div>
                </div>
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
                    openModal();
                  }}
                >
                  <Icon name="MessageCircle" className="mr-2" />
                  Получить анализ документов
                </Button>
                <Button
                  size="lg"
                  className="bg-yellow-800 text-white hover:bg-yellow-900 font-semibold"
                  onClick={() => {
                    trackCustomGoal("phone_cta_click", { source: "main_cta" });
                    window.location.href = "tel:+79931903500";
                  }}
                >
                  <Icon name="Phone" className="mr-2" />
                  Позвонить для срочной консультации
                </Button>
              </div>
              <p className="text-sm opacity-75 mt-4">
                Или напишите нам в Telegram: +7 993 190 35 00
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Стоимость услуг
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-8 border-2 border-gray-200">
                  <h3 className="text-2xl font-bold mb-4">Базовый пакет</h3>
                  <div className="text-4xl font-bold text-yellow-600 mb-6">
                    от 30 000 ₽
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Icon
                        name="Check"
                        className="text-green-600 mt-1 flex-shrink-0"
                      />
                      <span>Анализ материалов дела</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon
                        name="Check"
                        className="text-green-600 mt-1 flex-shrink-0"
                      />
                      <span>Подготовка документов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon
                        name="Check"
                        className="text-green-600 mt-1 flex-shrink-0"
                      />
                      <span>Представительство в суде</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      trackCustomGoal("pricing_basic_click", { plan: "basic" });
                      openModal();
                    }}
                  >
                    Заказать
                  </Button>
                </div>

                <div className="bg-yellow-600 text-white rounded-xl p-8 border-2 border-yellow-700 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      Популярный
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Полный пакет</h3>
                  <div className="text-4xl font-bold mb-6">от 50 000 ₽</div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="mt-1 flex-shrink-0" />
                      <span>Всё из базового пакета</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="mt-1 flex-shrink-0" />
                      <span>Независимая экспертиза</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="mt-1 flex-shrink-0" />
                      <span>Сбор доказательств и запись камер</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="mt-1 flex-shrink-0" />
                      <span>Поиск свидетелей</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full bg-white text-yellow-600 hover:bg-gray-100"
                    onClick={() => {
                      trackCustomGoal("pricing_full_click", { plan: "full" });
                      openModal();
                    }}
                  >
                    Заказать
                  </Button>
                </div>
              </div>

              <p className="text-center text-gray-600 mt-8">
                * Точная стоимость определяется после анализа вашей ситуации.
                Фиксируется в договоре и не меняется.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GuiltDetermination;
