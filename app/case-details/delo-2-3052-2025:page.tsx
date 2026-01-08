import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import SEOHead from "@/components/SEOHead";
import { SEO_PAGES } from '@/lib/constants';
import { trackCustomGoal } from "@/utils/metrika";
import Link from "next/link";

const CaseDetailsPage = () => {
  // SEO для этой страницы
  const seo = {
    title: 'Разбор дела №2-3052/2025: Как мы взыскали 247 109 ₽ с собственника авто без страховки | Новосибирск',
    description: 'Подробный юридический разбор реального дела по взысканию ущерба с собственника автомобиля без ОСАГО. Анализ доказательств, стратегия по ст. 1079 ГК РФ, комментарии юриста.',
    canonical: '/case-details/delo-2-3052-2025'
  };

  const handleConsultation = () => {
    trackCustomGoal('case_detail_consultation', {
      source: 'case_page',
      action: 'phone_call'
    });
    window.location.href = 'tel:+79994523500';
  };

  return (
    <>
      <SEOHead 
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        
        {/* Навигация назад */}
        <div className="container mx-auto px-4 pt-8">
          <Link 
            href="/guilt-determination" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <Icon name="ArrowLeft" className="mr-2" />
            Вернуться к услуге "Установление вины в ДТП"
          </Link>
        </div>

        {/* Hero секция кейса */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full font-bold text-sm mb-6 border border-red-300">
                <Icon name="FileText" className="mr-2" />
                РАЗБОР РЕАЛЬНОГО ДЕЛА
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Дело № 2-3052/2025: Как мы взыскали <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-red-600">247 109 ₽</span>, когда ГИБДД прекратила дело
              </h1>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                  <Icon name="Scale" className="text-blue-600" />
                  <span className="font-medium">Ленинский районный суд г. Новосибирска</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <Icon name="Calendar" className="text-green-600" />
                  <span className="font-medium">Решение от 15.09.2025</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
                  <Icon name="Banknote" className="text-purple-600" />
                  <span className="font-medium">Взыскано: 247 109 ₽</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-yellow-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                <h2 className="text-2xl font-bold mb-4">Краткая суть дела</h2>
                <p className="text-gray-700">
                  Клиенту отказали в выплате страховки после ДТП, ГИБДД прекратила производство из-за истечения сроков, 
                  а виновник оказался без страховки и прав. Нам удалось найти записи с камер наблюдения, доказать нарушения 
                  собственника автомобиля и взыскать ущерб в полном объеме по статье 1079 ГК РФ.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Основной контент */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Детальная хронология */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">Детальная хронология дела</h2>
                
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">ДТП и первоначальные отказы</h3>
                      <p className="text-gray-600 mb-3">
                        ДТП произошло на пересечении улиц. ГИБДД, проведя административное расследование, 
                        прекратила производство по делу в связи с истечением сроков привлечения к ответственности 
                        (ст. 4.5 КоАП РФ). Страховая компания «Ингосстрах» отказала в выплате, ссылаясь на отсутствие 
                        установленной вины.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 italic">
                          <strong>Проблема клиента:</strong> Формально вина не установлена, взыскивать не с кого, 
                          страховщик отказывается платить.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Наш анализ и поиск доказательств</h3>
                      <p className="text-gray-600 mb-3">
                        Изучив материалы, мы обнаружили, что виновник управлял автомобилем, который:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
                        <li>Не был застрахован по ОСАГО</li>
                        <li>Не состоял на учете более 2 лет</li>
                        <li>Принадлежал третьему лицу (ФИО2)</li>
                      </ul>
                      <p className="text-gray-600 mb-3">
                        Самостоятельно запросили и получили записи с камер наблюдения с магазина «Магазин разливных напитков» 
                        и пешеходного перехода, которые не были исследованы ГИБДД.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Правовая стратегия</h3>
                      <p className="text-gray-600 mb-3">
                        Вместо бесперспективного взыскания с недобросовестного водителя, мы построили стратегию на 
                        привлечении к ответственности собственника транспортного средства по 
                        <strong> статье 1079 Гражданского кодекса РФ</strong>.
                      </p>
                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                        <h4 className="font-bold mb-2">Ключевой правовой вывод:</h4>
                        <p className="text-gray-700">
                          Собственник источника повышенной опасности несет ответственность за вред, причиненный этим источником, 
                          если не докажет, что вред возник вследствие непреодолимой силы или умысла потерпевшего.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                        4
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Судебный процесс и результат</h3>
                      <p className="text-gray-600 mb-3">
                        В суде мы представили:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
                        <li>Видеозаписи, доказывающие нарушение ПДД водителем</li>
                        <li>Доказательства отсутствия страховки и регистрации ТС</li>
                        <li>Экспертное заключение о размере ущерба (308 886 ₽)</li>
                        <li>Правовое обоснование ответственности собственника</li>
                      </ul>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-gray-700">
                          <strong>Решение суда:</strong> Установлена обоюдная вина 80%/20%, с собственника ТС взыскано 
                          <span className="font-bold text-green-700 text-xl ml-2">247 109 ₽</span> (80% от общей суммы ущерба).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Комментарии юриста */}
              <div className="mb-16 bg-gray-50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-8 text-center">Комментарии юриста по делу</h2>
                
                <div className="space-y-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <Icon name="HelpCircle" className="text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold">Почему именно собственник, а не водитель?</h3>
                    </div>
                    <p className="text-gray-600">
                      По закону, риск причинения вреда источником повышенной опасности лежит на его владельце. 
                      Собственник, передавая автомобиль без страховки и не убедившись в законности его использования, 
                      несет субсидиарную ответственность. Взыскание с водителя в данном случае было бы бесперспективным — 
                      у него не было имущества для обращения взыскания.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <Icon name="Lightbulb" className="text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold">Что делать, если попал в похожую ситуацию?</h3>
                    </div>
                    <ol className="list-decimal pl-5 space-y-3 text-gray-600">
                      <li><strong>Не соглашайтесь с прекращением дела ГИБДД</strong> — это не означает отсутствие вины.</li>
                      <li><strong>Собирайте все возможные доказательства</strong> — ищите камеры, свидетелей сразу после ДТП.</li>
                      <li><strong>Проверяйте страховку виновника</strong> — если ее нет, сразу думайте о взыскании с собственника.</li>
                      <li><strong>Обращайтесь к юристу в первые дни</strong> — многие доказательства теряют силу со временем.</li>
                    </ol>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                        <Icon name="AlertTriangle" className="text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold">Какие ошибки чаще всего допускают в таких делах?</h3>
                    </div>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>Соглашаются с решением ГИБДД о прекращении дела</li>
                      <li>Не запрашивают записи с камер наблюдения в первые 30 дней</li>
                      <li>Пытаются взыскивать только с водителя, игнорируя собственника</li>
                      <li>Пропускают сроки обращения в суд (3 года с момента ДТП)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Ключевые документы и доказательства */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8">Ключевые доказательства по делу</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <Icon name="Video" className="text-blue-600 mr-3" />
                      <h3 className="text-lg font-bold">Видеозаписи с камер наблюдения</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Записи с 3 камер: магазина «Магазин разливных напитков», пешеходного перехода и уличной камеры. 
                      Показали траекторию движения, момент нарушения ПДД, факт создания помехи.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <Icon name="FileText" className="text-green-600 mr-3" />
                      <h3 className="text-lg font-bold">Экспертное заключение</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Заключение ООО «ПРОФЭКСПЕРТ» №... от ... с расчетом ущерба в размере 308 886 ₽ 50 коп. 
                      Подробный расчет стоимости восстановительного ремонта.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <Icon name="Car" className="text-red-600 mr-3" />
                      <h3 className="text-lg font-bold">Данные по транспортному средству</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Установлено: автомобиль не застрахован по ОСАГО, не состоит на учете более 2 лет, 
                      принадлежит ФИО2 на праве собственности.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <Icon name="Scale" className="text-purple-600 mr-3" />
                      <h3 className="text-lg font-bold">Материалы ГИБДД</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Протокол осмотра места ДТП, схема ДТП, определение о прекращении административного производства, 
                      объяснения участников.
                    </p>
                  </div>
                </div>
              </div>

              {/* Извлеченные уроки */}
              <div className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-8 text-center">Что это дело изменило в нашей практике</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Icon name="CheckCircle" className="text-green-600 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold mb-2">Новый подход к "безнадежным" делам</h3>
                      <p className="text-gray-700">
                        Теперь мы целенаправленно ищем основания для привлечения собственников ТС в случаях, 
                        когда водитель недобросовестен или не имеет средств для возмещения ущерба.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Icon name="CheckCircle" className="text-green-600 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold mb-2">Активный сбор доказательств</h3>
                      <p className="text-gray-700">
                        Мы научились эффективно работать с записями камер наблюдения: знаем, как их найти, 
                        запросить и использовать в суде даже когда ГИБДД этого не сделала.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Icon name="CheckCircle" className="text-green-600 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold mb-2">Работа со статьей 1079 ГК РФ</h3>
                      <p className="text-gray-700">
                        Разработали успешную методику применения этой статьи в спорах о ДТП, что значительно 
                        расширяет возможности для взыскания ущерба.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA блок */}
              <div className="text-center py-12">
                <h2 className="text-3xl font-bold mb-6">Есть похожая ситуация?</h2>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                  Не отчаивайтесь, если вам отказали в выплате или ГИБДД прекратила дело. 
                  Юридические пути для защиты ваших прав существуют. Проанализируем ваши документы 
                  и предложим стратегию, как в этом деле.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white hover:from-yellow-700 hover:to-yellow-800 font-bold py-6 px-10 text-lg"
                    onClick={handleConsultation}
                  >
                    <Icon name="Phone" className="mr-3" />
                    Бесплатный анализ моей ситуации
                  </Button>
                  
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-6 px-10 text-lg"
                    onClick={() => window.location.href = 'tel:+79994523500'}
                  >
                    <Icon name="MessageCircle" className="mr-3" />
                    Задать вопрос юристу
                  </Button>
                </div>
                
                <p className="text-gray-500 mt-8">
                  Или напишите в Telegram: 
                  <a href="https://t.me/+79931903500" className="text-blue-600 font-medium ml-2">+7 993 190 35 00</a>
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Связанные услуги */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Связанные услуги</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Link 
                  href="/guilt-determination" 
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-yellow-500 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center mb-4">
                    <Icon name="Scale" className="text-yellow-600 mr-3" />
                    <h3 className="text-lg font-bold">Установление вины в ДТП</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Докажем вашу невиновность в суде, обжалуем неправомерные решения ГИБДД, 
                    установим истинные обстоятельства ДТП.
                  </p>
                </Link>
                
                <Link 
                  href="/services" 
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center mb-4">
                    <Icon name="DollarSign" className="text-blue-600 mr-3" />
                    <h3 className="text-lg font-bold">Взыскание ущерба с виновника ДТП</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Взыщем ущерб с виновника ДТП, страховой компании или собственника транспортного средства 
                    в полном объеме.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default CaseDetailsPage;