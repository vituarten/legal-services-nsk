import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";
import { useState } from "react";
import { trackCustomGoal } from "@/utils/metrika";

export default function FamilyLawyer() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    problem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackCustomGoal("family_lawyer_consultation", {
      source: "page",
      action: "form_submit",
    });
    toast.success("Заявка отправлена! Свяжемся с вами в течение 24 часов");
    setFormData({ name: "", phone: "", problem: "" });
  };

  const problemIcons = [
    {
      icon: "Home",
      title: "Раздел имущества",
      description: "Квартира, машина, сбережения",
    },
    {
      icon: "Scale",
      title: "Справедливость",
      description: "Защита ваших законных прав",
    },
    {
      icon: "CreditCard",
      title: "Алименты",
      description: "Начисление и взыскание",
    },
    { icon: "Users", title: "Дети", description: "Опека и порядок общения" },
  ];

  const services = [
    { icon: "CheckCircle2", text: "Расторжение брака через суд" },
    { icon: "CheckCircle2", text: "Справедливый раздел имущества" },
    { icon: "CheckCircle2", text: "Взыскание алиментов" },
    { icon: "CheckCircle2", text: "Определение места жительства детей" },
    { icon: "CheckCircle2", text: "Установление порядка общения с детьми" },
    { icon: "CheckCircle2", text: "Оспаривание отцовства/материнства" },
    { icon: "CheckCircle2", text: "Изменение размера алиментов" },
    {
      icon: "CheckCircle2",
      text: "Сопровождение в исполнительном производстве",
    },
  ];

  const advantages = [
    {
      icon: "Award",
      title: "Опытные специалисты",
      text: "Работаем с 2016 года, 95% успешных дел",
    },
    {
      icon: "DollarSign",
      title: "Прозрачная цена",
      text: "Фиксированная стоимость, без скрытых платежей",
    },
    {
      icon: "UserCheck",
      title: "Индивидуальный подход",
      text: "Персональная стратегия для каждого случая",
    },
    {
      icon: "Zap",
      title: "Сжатые сроки",
      text: "Минимизируем ваше участие в бумажной работе",
    },
  ];

  const successStories = [
    {
      before: "Клиентка рисковала потерять квартиру",
      after: "Сохранила 100% права на жилье",
      details: "Бывший муж пытался скрыть факт совместных вложений",
    },
    {
      before: "Отец не видел ребенка 6 месяцев",
      after: "Установлен порядок общения на выходные",
      details: "Мать препятствовала встречам без оснований",
    },
    {
      before: "Алименты 5 000 ₽ при доходе 150 000 ₽",
      after: "Добились выплат 37 500 ₽ ежемесячно",
      details: "Скрывал реальные доходы от предпринимательства",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Юридические услуги для разводов, алиментов и раздела имущества
        </title>
        <meta
          name="description"
          content="Ваша уверенность в сложных вопросах. Профессиональная поддержка при разводе. Бесплатная консультация. Опыт с 2016 года."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Заголовок */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
          {/* Фоновое изображение */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute right-0 top-0 w-1/3 h-full">
              {/* Здесь можно разместить SVG судебного молотка или изображение */}
              <div className="flex items-center justify-center h-full">
                <Icon name="Scale" className="h-64 w-64 text-white/30" />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Юридические услуги для разводов, алиментов и раздела имущества
                <span className="block text-3xl md:text-4xl font-normal mt-4 text-blue-300">
                  — Ваша уверенность в сложных вопросах
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Профессиональная поддержка, которая защищает ваши права и
                возвращает спокойствие
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg bg-white text-gray-900 hover:bg-gray-100 px-8"
                  asChild
                >
                  <a href="#consultation">
                    <Icon name="MessageSquare" className="h-5 w-5 mr-2" />
                    Получить консультацию
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg border-white text-white hover:bg-white/10 px-8"
                >
                  <Icon name="Calculator" className="h-5 w-5 mr-2" />
                  Рассчитать стоимость
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Проблема */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Сложности при разводе и разделе имущества могут стать настоящим
                испытанием
              </h2>
              <p className="text-xl text-gray-600">
                Как защитить свои права и интересы в непростых обстоятельствах?
              </p>
            </div>

            <div className="mb-8 bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 mb-6 text-center">
                Развод — это не только сильный стресс, но и множество
                юридических вопросов: от раздела имущества до алиментов и
                установления отцовства.
              </p>
              <p className="text-lg text-gray-700 text-center">
                Недостаток опыта и знаний только усложняет процесс, а
                юридические ошибки могут иметь серьезные последствия.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {problemIcons.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow-md text-center"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} className="h-8 w-8 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Решение */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Юридическая поддержка, которая облегчает процесс и возвращает
                  уверенность
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Мы берем на себя оформление всех юридических документов и
                  представление интересов в судах. Помогаем урегулировать
                  вопросы с алиментами, опекой, установлением отцовства и
                  разделом имущества. Вы экономите время и нервные клетки,
                  получая квалифицированное решение.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {services.slice(0, 4).map((service, i) => (
                    <div key={i} className="flex items-center">
                      <Icon
                        name={service.icon}
                        className="h-5 w-5 text-green-600 mr-3 flex-shrink-0"
                      />
                      <span className="text-gray-700">{service.text}</span>
                    </div>
                  ))}
                </div>

                <Button size="lg" className="text-lg px-8" asChild>
                  <a href="#consultation">
                    <Icon name="Calculator" className="h-5 w-5 mr-2" />
                    Рассчитать стоимость
                  </a>
                </Button>
              </div>

              <div className="hidden lg:block">
                <div className="bg-gray-100 rounded-2xl p-8">
                  {/* Изображение юриста за работой */}
                  <div className="text-center">
                    <Icon
                      name="Briefcase"
                      className="h-32 w-32 text-gray-400 mx-auto mb-6"
                    />
                    <div className="text-lg font-semibold text-gray-700 mb-2">
                      Юрист за работой
                    </div>
                    <p className="text-gray-600">
                      Профессиональная подготовка документов
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Почему наши юридические услуги — это ваш лучший выбор
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((adv, i) => (
                <Card
                  key={i}
                  className="p-6 text-center hover:shadow-lg transition-shadow bg-white"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={adv.icon} className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {adv.title}
                  </h3>
                  <p className="text-gray-600">{adv.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Уникальное торговое предложение */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  <span className="text-blue-600">
                    Жизнь после развода проще,
                  </span>{" "}
                  если воспользоваться нашей поддержкой
                </h2>
                <p className="text-2xl text-gray-700">
                  <span className="font-bold text-green-600">
                    — мы гарантируем профессионализм и оперативность
                  </span>
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-8 mb-12">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-white rounded-xl">
                    <Icon
                      name="Users"
                      className="h-12 w-12 text-blue-600 mx-auto mb-4"
                    />
                    <h3 className="font-semibold text-lg mb-2">
                      Любой формат работы
                    </h3>
                    <p className="text-gray-600">
                      Полное сопровождение или только консультация
                    </p>
                  </div>
                  <div className="text-center p-6 bg-white rounded-xl">
                    <Icon
                      name="Target"
                      className="h-12 w-12 text-blue-600 mx-auto mb-4"
                    />
                    <h3 className="font-semibold text-lg mb-2">
                      Любая сложность
                    </h3>
                    <p className="text-gray-600">
                      От простых случаев до самых сложных ситуаций
                    </p>
                  </div>
                  <div className="text-center p-6 bg-white rounded-xl">
                    <Icon
                      name="Heart"
                      className="h-12 w-12 text-blue-600 mx-auto mb-4"
                    />
                    <h3 className="font-semibold text-lg mb-2">Ключи успеха</h3>
                    <p className="text-gray-600">
                      Забота, внимание к деталям и профессиональная этика
                    </p>
                  </div>
                </div>
              </div>

              {/* Истории успеха */}
              <div>
                <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">
                  Реальные результаты наших клиентов
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {successStories.map((story, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-xl p-6"
                    >
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">Было:</div>
                        <div className="font-medium text-red-600">
                          {story.before}
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">Стало:</div>
                        <div className="font-medium text-green-600">
                          {story.after}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 italic">
                        {story.details}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Призыв к действию */}
        <section
          id="consultation"
          className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">
                Получите бесплатную консультацию уже сегодня и узнайте, как мы
                можем вам помочь!
              </h2>

              <div className="bg-white text-gray-900 rounded-2xl p-8 shadow-2xl mt-8">
                <div className="mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <Icon
                      name="ArrowDown"
                      className="h-8 w-8 text-blue-600 animate-bounce mr-2"
                    />
                    <span className="text-lg font-semibold">
                      Оставьте заявку прямо сейчас
                    </span>
                  </div>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center justify-center">
                      <Icon
                        name="CheckCircle2"
                        className="h-5 w-5 text-green-600 mr-2"
                      />
                      <span>Мы свяжемся с вами в течение 24 часов</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Icon
                        name="CheckCircle2"
                        className="h-5 w-5 text-green-600 mr-2"
                      />
                      <span>Узнайте стоимость услуг без скрытых платежей</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
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
                  <textarea
                    placeholder="Опишите вашу ситуацию"
                    value={formData.problem}
                    onChange={(e) =>
                      setFormData({ ...formData, problem: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32"
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-6"
                  >
                    <Icon name="Send" className="h-5 w-5 mr-2" />
                    Оставить заявку
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-gray-600 text-sm">
                    Или позвоните нам прямо сейчас:
                    <a
                      href="tel:+7 (383) 235-95-05"
                      className="block text-xl font-bold text-blue-600 mt-2"
                    >
                      <Icon name="Phone" className="h-5 w-5 inline mr-2" />
                      +7 (383) 235-95-05
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Контакты */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Контакты и информация
                </h2>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <Icon
                        name="Phone"
                        className="h-5 w-5 text-blue-600 mr-3"
                      />
                      <span className="text-lg font-semibold">Телефон:</span>
                    </div>
                    <a
                      href="tel:+7 (383) 235-95-05"
                      className="text-2xl font-bold text-gray-900 hover:text-blue-600"
                    >
                      +7 (383) 235-95-05
                    </a>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <Icon
                        name="Mail"
                        className="h-5 w-5 text-blue-600 mr-3"
                      />
                      <span className="text-lg font-semibold">Email:</span>
                    </div>
                    <a
                      href="mailto:info@example.ru"
                      className="text-xl text-gray-700 hover:text-blue-600"
                    >
                      info@example.ru
                    </a>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <Icon
                        name="MapPin"
                        className="h-5 w-5 text-blue-600 mr-3"
                      />
                      <span className="text-lg font-semibold">Адрес:</span>
                    </div>
                    <p className="text-xl text-gray-700">
                      Новосибирск, ул. Ленина, д. 12, офис 305
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <Icon
                        name="Clock"
                        className="h-5 w-5 text-blue-600 mr-3"
                      />
                      <span className="text-lg font-semibold">
                        Режим работы:
                      </span>
                    </div>
                    <p className="text-xl text-gray-700">
                      пн-пт с 9:00 до 18:00
                    </p>
                    <p className="text-gray-600">Консультации по записи</p>
                  </div>
                </div>
              </div>

              <div>
                {/* Карта */}
                <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="Map" className="h-16 w-16 text-gray-400 mb-4" />
                    <p className="text-gray-600 font-semibold">
                      Карта с местоположением офиса
                    </p>
                    <p className="text-gray-500">
                      (здесь будет интерактивная карта)
                    </p>
                  </div>
                </div>

                {/* Дополнительная форма */}
                <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-4">
                    Быстрый вопрос?
                  </h3>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Ваш телефон"
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
                    />
                    <Button>
                      <Icon name="ArrowRight" className="h-4 w-4 mr-2" />
                      Позвонить мне
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
