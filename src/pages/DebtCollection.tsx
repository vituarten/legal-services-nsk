import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";
import { useState } from "react";
import { trackCustomGoal } from "@/utils/metrika";

export default function DebtCollectionPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    situation: "",
  });
  const [downloadClicked, setDownloadClicked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackCustomGoal("debt_collection_consultation", {
      source: "page",
      action: "form_submit",
    });
    toast.success(
      "Заявка принята! Юрист по взысканию свяжется с вами в течение 30 минут",
    );
    setFormData({ name: "", phone: "", email: "", situation: "" });
  };

  // Психологический триггер: "Вы уже все перепробовали?"
  const painPoints = [
    { icon: "Clock", text: 'Долг "висит" уже несколько месяцев или лет?' },
    { icon: "UserX", text: "Должник игнорирует звонки и письма?" },
    { icon: "Building", text: "Компания-должник меняет директоров и адреса?" },
    { icon: "ShieldOff", text: 'Приставы говорят "не можем найти имущество"?' },
    {
      icon: "TrendingDown",
      text: "Боитесь, что должник обанкротится и спишет долг?",
    },
    { icon: "DollarSign", text: "Эти деньги нужны вам для развития бизнеса?" },
  ];

  // Документы для скачивания (лид-магнит)
  const freeDocuments = [
    {
      title: 'Чек-лист "10 действий до обращения в суд"',
      description:
        "Пошаговый план, который увеличит шансы на возврат денег на 40%",
      icon: "CheckSquare",
      file: "/docs/checklist_10_actions.pdf",
    },
    {
      title: "Образец эффективной досудебной претензии",
      description:
        "Не просто формальность, а документ, после которого 30% должников платят",
      icon: "FileText",
      file: "/docs/sample_pretension.docx",
    },
    {
      title: 'Памятка "Как проверить должника"',
      description:
        "7 источников информации, которые покажут реальные активы должника",
      icon: "Search",
      file: "/docs/debtor_check_memo.pdf",
    },
    {
      title: "Гид по работе с приставами",
      description:
        "Что требовать от ФССП, чтобы они реально работали по вашему делу",
      icon: "Shield",
      file: "/docs/fssp_guide.pdf",
    },
  ];

  const handleDownloadClick = (docTitle: string) => {
    setDownloadClicked(true);
    trackCustomGoal("document_download", { document: docTitle });
    // Здесь будет логика скачивания файла
    toast.info(
      `Файл "${docTitle}" начнет скачиваться. Если возникнут вопросы - мы ниже.`,
    );
  };

  // Ситуации, когда нужны наши услуги
  const creditorSituations = [
    {
      icon: "Building2",
      title: "Контрагент не платит",
      description: "ООО или ИП задерживает оплату за товар или услугу",
    },
    {
      icon: "User",
      title: "Частный заемщик",
      description: "Человек не возвращает крупную сумму денег",
    },
    {
      icon: "FileText",
      title: "Есть решение суда",
      description: "Суд был, исполнительный лист есть, а денег нет",
    },
    {
      icon: "ShieldAlert",
      title: "Должник банкротится",
      description: "Нужно срочно включиться в реестр кредиторов",
    },
    {
      icon: "Globe",
      title: "Иностранный контрагент",
      description: "Зарубежная компания уклоняется от оплаты",
    },
    {
      icon: "Clock",
      title: "Долг списали как безнадежный",
      description: "Но вы уверены, что деньги можно вернуть",
    },
  ];

  const advantages = [
    {
      icon: "Percent",
      title: "Платите только за результат",
      text: "В сложных делах работаем за процент от возвращенной суммы. Никаких предоплат.",
    },
    {
      icon: "Zap",
      title: "Действуем пока вы читаете",
      text: 'За 72 часа наложим арест на счета и имущество должника. Пока другие юристы "изучают документы".',
    },
    {
      icon: "Search",
      title: "Найдем то, что скрыто",
      text: 'У 60% "бедных" должников есть счета в других банках, недвижимость на родственников, доли в бизнесе.',
    },
    {
      icon: "Briefcase",
      title: "Говорим на языке цифр",
      text: 'Не "возьмемся за дело", а "вернем от 70% долга за 4-8 месяцев". Конкретика вместо обещаний.',
    },
  ];

  const cases = [
    {
      debt: "12.4 млн ₽",
      result: "Взыскано 100%",
      time: "8 месяцев",
      situation:
        "Долг по договору поставки. Должник скрывал активы через офшоры.",
    },
    {
      debt: "3.1 млн ₽",
      result: "Взыскано 85%",
      time: "4 месяца",
      situation: "Займ физлицу. Вернули через арест доли в бизнесе.",
    },
    {
      debt: "87 млн ₽",
      result: "Взыскано 70%",
      time: "14 месяцев",
      situation: "Корпоративный спор. Работали в рамках банкротства должника.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Вернуть деньги с должника | Профессиональное взыскание долгов для
          бизнеса
        </title>
        <meta
          name="description"
          content="Должник не платит? Вернем ваши деньги. Действуем жестко и быстро. Арест счетов за 72 часа. Работаем за результат. Бесплатный анализ дела."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero с психологическим ударом */}
        <section className="pt-28 pb-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 font-medium mb-6 border border-blue-500/30">
                  <Icon name="AlertTriangle" className="h-5 w-5 mr-2" />
                  Для тех, кто устал ждать
                </div>
                <h1 className="text-5xl font-bold mb-6 leading-tight">
                  Должник не платит?
                  <br />
                  <span className="text-blue-300">Мы заставим</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Не ждите, пока должник обанкротится или скроется.{" "}
                  <span className="font-semibold text-white">За 72 часа</span>{" "}
                  наложим арест на его счета и имущество. Вернем ваши деньги,
                  когда другие опускают руки.
                </p>

                <div className="mb-10 p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Icon name="HelpCircle" className="h-5 w-5 mr-2" />
                    Вы уже все перепробовали?
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {painPoints.map((point, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <Icon
                          name="X"
                          className="h-4 w-4 text-red-400 mr-2 flex-shrink-0"
                        />
                        <span>{point.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="text-lg bg-blue-600 hover:bg-blue-700 shadow-lg"
                    asChild
                  >
                    <a href="#action">
                      <Icon name="Swords" className="h-5 w-5 mr-2" />
                      Начать взыскание
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg text-white border-white/30 hover:bg-white/10"
                    asChild
                  >
                    <a href="tel:+74951234567">
                      <Icon name="Phone" className="h-5 w-5 mr-2" />
                      Срочный звонок юриста
                    </a>
                  </Button>
                </div>
              </div>

              <Card className="p-8 bg-gray-800 border-gray-700 text-white">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Пока вы думаете, должник:
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <Icon name="Building" className="h-6 w-6 text-red-400" />
                    </div>
                    <div>
                      <div className="font-semibold">
                        Переоформляет имущество
                      </div>
                      <div className="text-sm text-gray-400">
                        На родственников или подставных лиц
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Icon
                        name="Banknote"
                        className="h-6 w-6 text-yellow-400"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">Выводит деньги</div>
                      <div className="text-sm text-gray-400">
                        Со счетов, пока не наложен арест
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Icon name="Scale" className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold">
                        Инициирует банкротство
                      </div>
                      <div className="text-sm text-gray-400">
                        Чтобы списать ваш долг законно
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                  <div className="text-3xl font-bold text-blue-300">
                    72 часа
                  </div>
                  <div className="text-gray-400">
                    и мы начинаем реальные действия
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Ситуации - психология "Вы не одиноки" */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                "У нас такая же ситуация"
              </h2>
              <p className="text-lg text-muted-foreground">
                С какими должниками мы работаем каждый день
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creditorSituations.map((item, i) => (
                <Card
                  key={i}
                  className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 border hover:border-blue-300"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={item.icon} className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm text-gray-500">
                      Типичные признаки:
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                        Игнорирует претензии
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                        Меняет юр. адрес
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Преимущества с акцентом на выгоду */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Почему клиенты возвращаются к нам с новыми делами
            </h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                {advantages.map((adv, i) => (
                  <div key={i} className="flex items-start gap-4 mb-8">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={adv.icon} className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {adv.title}
                      </h3>
                      <p className="text-muted-foreground">{adv.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border">
                <h3 className="text-2xl font-bold mb-6">Чего мы НЕ делаем:</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                    <Icon
                      name="XCircle"
                      className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <div className="font-semibold">
                        Не берем дела "для галочки"
                      </div>
                      <div className="text-sm text-gray-600">
                        Если шансов нет - скажем честно и не возьмемся
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                    <Icon
                      name="XCircle"
                      className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <div className="font-semibold">Не затягиваем сроки</div>
                      <div className="text-sm text-gray-600">
                        Каждые 2 недели - отчет о конкретных действиях
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                    <Icon
                      name="XCircle"
                      className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <div className="font-semibold">
                        Не работаем по шаблону
                      </div>
                      <div className="text-sm text-gray-600">
                        Для каждого должника - своя стратегия давления
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <div className="text-lg font-semibold text-blue-900 mb-2">
                    Простая математика:
                  </div>
                  <div className="text-3xl font-bold text-blue-700 mb-2">
                    0 ₽ предоплаты
                  </div>
                  <div className="text-gray-600">
                    в делах с оплатой за результат
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Бесплатные документы (лид-магнит) */}
        <section id="documents" className="py-20 bg-white border-t">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-medium mb-4">
                <Icon name="Download" className="h-5 w-5 mr-2" />
                Бесплатно • Без регистрации
              </div>
              <h2 className="text-4xl font-bold mb-4">
                Возьмите эти документы, даже если не готовы к услугам
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                То, что другие юристы продают за деньги. Скачайте и используйте
                прямо сейчас.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {freeDocuments.map((doc, i) => (
                <Card
                  key={i}
                  className="p-6 hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-green-100"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={doc.icon} className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{doc.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {doc.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-green-300 text-green-700 hover:bg-green-50"
                    onClick={() => handleDownloadClick(doc.title)}
                  >
                    <Icon name="Download" className="h-4 w-4 mr-2" />
                    Скачать бесплатно
                  </Button>
                </Card>
              ))}
            </div>

            {downloadClicked && (
              <div className="max-w-2xl mx-auto mt-12 p-8 bg-blue-50 rounded-2xl border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon
                      name="MessageCircle"
                      className="h-6 w-6 text-blue-600"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Остались вопросы по документам?
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Бесплатные файлы — это хорошо. Но если нужен конкретный
                      план для вашей ситуации,
                      <span className="font-semibold">
                        {" "}
                        лучше поговорить с юристом.
                      </span>
                      Мы уже изучили документы, которые вы скачали, и понимаем
                      вашу проблему.
                    </p>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <a href="#action">
                        <Icon name="Phone" className="h-4 w-4 mr-2" />
                        Получить 15-минутную консультацию
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Кейсы с акцентом на сложность */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              Сложные дела, которые другие назвали "безнадежными"
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Мы специализируемся на том, от чего отказываются другие
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {cases.map((c, i) => (
                <Card key={i} className="p-8 hover:shadow-xl transition-shadow">
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      {c.debt}
                    </div>
                    <div className="text-lg font-semibold text-green-700">
                      {c.result}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      за {c.time} работы
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6">{c.situation}</p>
                  <div className="pt-6 border-t">
                    <div className="text-sm font-semibold text-gray-500 mb-2">
                      Особые сложности:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {i === 0 && (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                          Офшоры
                        </span>
                      )}
                      {i === 0 && (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                          Подставные лица
                        </span>
                      )}
                      {i === 1 && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                          Отсутствие имущества
                        </span>
                      )}
                      {i === 1 && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                          Бездействие приставов
                        </span>
                      )}
                      {i === 2 && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                          Банкротное дело
                        </span>
                      )}
                      {i === 2 && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                          Конкурсные кредиторы
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gray-200 rounded-full text-gray-700 font-medium mb-4">
                <Icon name="AlertTriangle" className="h-5 w-5 mr-2" />
                Ваш случай сложнее? Это наша специализация
              </div>
            </div>
          </div>
        </section>

        {/* Форма с психологическим триггером */}
        <section
          id="action"
          className="py-20 bg-gradient-to-r from-blue-900 to-gray-900 text-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  Один из двух вариантов:
                </h2>
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div className="p-6 bg-white/10 rounded-xl border border-white/20">
                    <div className="text-2xl font-bold mb-4 text-red-300">
                      Самостоятельно
                    </div>
                    <ul className="space-y-3 text-left">
                      <li className="flex items-center">
                        <Icon name="X" className="h-5 w-5 text-red-400 mr-3" />
                        Тратите время на изучение законов
                      </li>
                      <li className="flex items-center">
                        <Icon name="X" className="h-5 w-5 text-red-400 mr-3" />
                        Делаете ошибки, которые затягивают процесс
                      </li>
                      <li className="flex items-center">
                        <Icon name="X" className="h-5 w-5 text-red-400 mr-3" />
                        Должник находит новые лазейки
                      </li>
                      <li className="flex items-center">
                        <Icon name="X" className="h-5 w-5 text-red-400 mr-3" />
                        Вернете 0-30% долга за 1-2 года
                      </li>
                    </ul>
                  </div>
                  <div className="p-6 bg-blue-600/30 rounded-xl border border-blue-400">
                    <div className="text-2xl font-bold mb-4 text-green-300">
                      С нами
                    </div>
                    <ul className="space-y-3 text-left">
                      <li className="flex items-center">
                        <Icon
                          name="Check"
                          className="h-5 w-5 text-green-400 mr-3"
                        />
                        Мы действуем с первого дня
                      </li>
                      <li className="flex items-center">
                        <Icon
                          name="Check"
                          className="h-5 w-5 text-green-400 mr-3"
                        />
                        Знаем все уловки должников
                      </li>
                      <li className="flex items-center">
                        <Icon
                          name="Check"
                          className="h-5 w-5 text-green-400 mr-3"
                        />
                        Действуем одновременно по всем направлениям
                      </li>
                      <li className="flex items-center">
                        <Icon
                          name="Check"
                          className="h-5 w-5 text-green-400 mr-3"
                        />
                        Вернете 50-100% долга за 4-8 месяцев
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <Card className="p-8 bg-white text-gray-900">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium mb-4">
                    <Icon name="Zap" className="h-5 w-5 mr-2" />
                    Экспресс-анализ вашего дела
                  </div>
                  <h3 className="text-3xl font-bold mb-4">
                    Узнайте, можно ли вернуть ваши деньги
                  </h3>
                  <p className="text-gray-600">
                    Ответим за 15 минут. Если шансов нет — скажем честно.
                  </p>
                </div>

                <form
                  id="debt-collection-form"
                  name="debt-collection-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Как вас зовут? *
                      </label>
                      <input
                        type="text"
                        placeholder="Иван Иванов"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Телефон для связи *
                      </label>
                      <input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Электронная почта
                    </label>
                    <input
                      type="email"
                      placeholder="для отправки предварительного плана"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Опишите ситуацию коротко *
                      <span className="text-gray-500 font-normal ml-2">
                        (Например: "ООО должен 2 млн за поставку с января,
                        директор скрывается")
                      </span>
                    </label>
                    <textarea
                      placeholder="Чем больше деталей, точнее будет анализ..."
                      value={formData.situation}
                      onChange={(e) =>
                        setFormData({ ...formData, situation: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-4">
                      <Icon
                        name="Clock"
                        className="h-6 w-6 text-blue-600 flex-shrink-0"
                      />
                      <div>
                        <div className="font-semibold text-blue-900">
                          Что будет после заявки:
                        </div>
                        <ol className="list-decimal list-inside text-sm text-gray-700 mt-2 space-y-1">
                          <li>
                            Перезвоним в течение 15 минут (в рабочее время)
                          </li>
                          <li>Зададим 5-7 уточняющих вопросов по телефону</li>
                          <li>
                            Сразу скажем, есть ли реальные рычаги воздействия
                          </li>
                          <li>
                            Если шансы есть — предложим план действий и
                            стоимость
                          </li>
                          <li>
                            Если нет — объясним почему и что можно сделать
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg bg-blue-600 hover:bg-blue-700 py-6 text-white font-semibold"
                  >
                    <Icon name="Send" className="h-5 w-5 mr-2" />
                    Получить честный анализ ситуации
                  </Button>

                  <p className="text-xs text-center text-gray-500 mt-4">
                    Отправляя заявку, вы соглашаетесь с политикой
                    конфиденциальности.
                    <br />
                    Мы не передаем ваши данные третьим лицам и не рассылаем
                    спам.
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
