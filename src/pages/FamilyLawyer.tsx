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
    toast.success("Заявка отправлена! Юрист перезвонит вам в течение 10 минут");
    setFormData({ name: "", phone: "", problem: "" });
  };

  const painPoints = [
    {
      icon: "Clock",
      title: "Развод затянулся на месяцы?",
      description:
        "Самостоятельное оформление может длиться до 6 месяцев. Мы сокращаем срок до 1 месяца через суд",
      consequence:
        "Теряете время, нервы и деньги на бесконечные походы в ЗАГС и суды",
    },
    {
      icon: "DollarSign",
      title: "Боитесь потерять имущество?",
      description:
        "Бывший супруг скрывает доходы или переписывает имущество на родственников",
      consequence:
        "Можете потерять до 70% совместно нажитого, если не успеете принять меры",
    },
    {
      icon: "Baby",
      title: "Угрожают отобрать детей?",
      description:
        "Второй родитель создает искусственные препятствия для общения или хочет лишить вас прав",
      consequence:
        "Рискуете видеть ребенка только по решению суда 2 раза в месяц",
    },
    {
      icon: "CreditCard",
      title: "Не платят алименты?",
      description:
        "Бывший супруг скрывает доходы, работает неофициально или уклоняется от выплат",
      consequence:
        "Ребенок не получает положенного содержания, а долг растет с каждым месяцем",
    },
  ];

  const commonMistakes = [
    {
      title: "Ошибка большинства",
      description: 'Пытаются договориться "полюбовно" без юриста',
      result:
        "Попадают в невыгодные условия, которые потом невозможно оспорить",
      solution:
        "Мы ведем переговоры за вас, защищая ваши интересы с первого дня",
    },
    {
      title: "Роковая ошибка",
      description: "Подписывают соглашение о разделе имущества без оценки",
      result:
        "Достается квартира с долгами, а бывший супруг забирает машину и счет в банке",
      solution: "Проводим независимую оценку и выявляем все активы",
    },
    {
      title: "Типичная ситуация",
      description: 'Уступают в праве на ребенка "чтобы не травмировать"',
      result:
        "Потом годами борются за возможность видеться чаще, чем 2 раза в месяц",
      solution:
        "Сразу закрепляем ваши права юридически на максимально выгодных условиях",
    },
  ];

  const whatYouLose = [
    { icon: "Home", text: "Квартиру или долю в ней", value: "до 3 000 000 ₽" },
    {
      icon: "Car",
      text: "Автомобиль и другое имущество",
      value: "до 1 500 000 ₽",
    },
    { icon: "Wallet", text: "Сбережения и вклады", value: "до 2 000 000 ₽" },
    { icon: "CreditCard", text: "Алименты за 3 года", value: "до 1 800 000 ₽" },
  ];

  const advantages = [
    {
      icon: "Shield",
      title: "Фиксируем имущество за 24 часа",
      text: "Наложим обеспечительные меры, чтобы супруг не успел продать или переписать имущество",
    },
    {
      icon: "FileCheck",
      title: "Всё включено — никаких доплат",
      text: "Полное ведение дела: иски, переговоры, суды, исполнительное производство. Цена известна заранее",
    },
    {
      icon: "Clock",
      title: "Ускоренный развод за 1 месяц",
      text: "Даже при несогласии супруга. Экономим вам 5 месяцев ожидания",
    },
    {
      icon: "Heart",
      title: "Бережем ваши нервы",
      text: "Вы не общаетесь с бывшим супругом. Все коммуникации и переговоры ведем мы",
    },
  ];

  const steps = [
    {
      num: "1",
      title: "Диагностика ситуации",
      text: "Анализируем риски и слабые места. Рассказываем, что можно получить по закону",
      note: "Бесплатно за 20 минут",
    },
    {
      num: "2",
      title: "Стратегия и план",
      text: "Составляем пошаговый план: от сбора доказательств до исполнительного листа",
      note: "Фиксируем в договоре",
    },
    {
      num: "3",
      title: "Наложение ареста на имущество",
      text: "В первый же день блокируем счета и имущество, чтобы супруг ничего не успел скрыть",
      note: "Срочные меры за 24 часа",
    },
    {
      num: "4",
      title: "Результат под ключ",
      text: "Получаем решение суда и ведем исполнительное производство до фактического получения вами всего положенного",
      note: "Гарантия результата",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Семейный юрист в Новосибирске | Не теряйте имущество при разводе
        </title>
        <meta
          name="description"
          content="Развод с юристом vs без юриста: защитим вашу квартиру, машину, сбережения и права на детей. 95% успеха. Срочные меры за 24 часа. Бесплатный анализ рисков."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero с акцентом на боль */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-full font-medium mb-6 border border-red-200">
                  <Icon name="AlertTriangle" className="h-5 w-5 mr-2" />
                  Внимание: при разводе без юриста вы рискуете потерять
                </div>
                <h1 className="text-5xl font-bold mb-6 leading-tight">
                  <span className="text-red-600">
                    Не потеряйте квартиру, машину и детей
                  </span>{" "}
                  при разводе
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  9 из 10 людей при разводе без юриста теряют до 70% имущества и
                  соглашаются на невыгодные условия с детьми
                </p>

                <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-red-100">
                  <div className="flex items-start">
                    <Icon
                      name="CheckCircle2"
                      className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Бесплатно проанализируем вашу ситуацию
                      </h3>
                      <p className="text-gray-600">
                        За 20 минут скажем: какие риски, что можно сохранить и
                        как действовать
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="text-lg bg-red-600 hover:bg-red-700"
                    asChild
                  >
                    <a href="#form">
                      <Icon name="Shield" className="h-5 w-5 mr-2" />
                      Защитить имущество и права
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg"
                    asChild
                  >
                    <a href="tel:+79931903500">
                      <Icon name="Phone" className="h-5 w-5 mr-2" />
                      Срочная консультация
                    </a>
                  </Button>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
                  <div className="text-red-600 font-bold text-sm uppercase tracking-wider mb-4">
                    Что теряют без юриста:
                  </div>
                  <div className="space-y-4">
                    {whatYouLose.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <Icon
                            name={item.icon}
                            className="h-5 w-5 text-gray-600 mr-3"
                          />
                          <span className="font-medium">{item.text}</span>
                        </div>
                        <span className="font-bold text-red-600">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        1500+
                      </div>
                      <div className="text-gray-600">
                        семей сохранили имущество и права
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Боли клиента */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              Узнаете свою ситуацию?
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Типичные проблемы, которые решаем каждый день
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
              {painPoints.map((item, i) => (
                <Card
                  key={i}
                  className="p-6 hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon name={item.icon} className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 mb-3">{item.description}</p>
                      <div className="flex items-start text-sm">
                        <Icon
                          name="AlertCircle"
                          className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-gray-600 font-medium">
                          {item.consequence}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Ошибки */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-center mb-8">
                Типичные ошибки, которые дорого обходятся
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {commonMistakes.map((mistake, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl">
                    <div className="text-red-600 font-bold mb-2">
                      {mistake.title}
                    </div>
                    <p className="text-gray-800 mb-3">{mistake.description}</p>
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">
                        Результат:
                      </div>
                      <div className="text-red-600 font-medium">
                        {mistake.result}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500 mb-1">
                        Наше решение:
                      </div>
                      <div className="text-green-600 font-medium">
                        {mistake.solution}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Что мы делаем для защиты */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              Мы действуем быстро, пока супруг не спрятал имущество
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Первые 24 часа — самые важные для сохранения активов
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((adv, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={adv.icon} className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">
                    {adv.title}
                  </h3>
                  <p className="text-gray-600 text-center">{adv.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Процесс с гарантиями */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium mb-4">
                <Icon name="CheckCircle2" className="h-5 w-5 mr-2" />
                Работаем по договору с гарантией
              </div>
              <h2 className="text-4xl font-bold mb-4">
                Мы берем на себя всё — от первого звонка до получения имущества
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-4 top-6 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.num}
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl ml-4 h-full">
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.text}</p>
                    <div className="pt-4 border-t border-gray-200">
                      <span className="text-sm text-blue-600 font-medium">
                        {step.note}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Форма с сильным CTA */}
        <section
          id="form"
          className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold mb-4">
                  Прямо сейчас супруг может переписать имущество на
                  родственников
                </h2>
                <p className="text-xl opacity-90">
                  Каждый день промедления увеличивает риск потери активов на 17%
                </p>
              </div>

              <div className="bg-white text-gray-900 rounded-2xl p-8 shadow-2xl">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      24 часа
                    </div>
                    <div className="text-sm">
                      накладываем арест на имущество
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">95%</div>
                    <div className="text-sm">дел выигрываем полностью</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-3xl font-bold text-red-600">0 ₽</div>
                    <div className="text-sm">предоплаты за консультацию</div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        placeholder="Как к вам обращаться?"
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
                        Телефон
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
                      Опишите ситуацию{" "}
                      <span className="text-gray-500">
                        (что больше всего беспокоит?)
                      </span>
                    </label>
                    <textarea
                      placeholder="Например: «Муж угрожает отобрать детей и уже переписал машину на брата...»"
                      value={formData.problem}
                      onChange={(e) =>
                        setFormData({ ...formData, problem: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg bg-red-600 hover:bg-red-700 py-6 text-white font-bold"
                  >
                    <Icon name="ShieldAlert" className="h-5 w-5 mr-2" />
                    СРОЧНО ЗАЩИТИТЬ ИМУЩЕСТВО И ПРАВА
                  </Button>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных
                    данных.
                    <br />
                    Мы перезвоним в течение 10 минут в рабочее время
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
