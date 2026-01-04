import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

// Название компонента: BusinessFAQ

const BusinessFAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>(["1"]);

  const faqItems = [
    {
      id: "1",
      question: "Как происходит работа по арбитражным спорам?",
      answer:
        "Работа строится по алгоритму: 1) Бесплатный анализ вашей ситуации, 2) Разработка индивидуальной стратегии защиты, 3) Подготовка всех процессуальных документов, 4) Полное сопровождение в суде, 5) Контроль исполнения решения. Использую современные методы работы и актуальную судебную практику.",
      category: "Арбитражные споры",
    },
    {
      id: "2",
      question: "Сколько стоит юридическое сопровождение бизнеса?",
      answer:
        "Предлагаю прозрачное ценообразование: 1) Бесплатная первичная консультация, 2) Фиксированная стоимость за конкретную услугу, 3) Гибкая система оплаты в зависимости от сложности задачи, 4) Возможность поэтапной оплаты. Все условия обсуждаются заранее и фиксируются в договоре.",
      category: "Стоимость услуг",
    },
    {
      id: "3",
      question: "Занимаетесь ли вы договорным правом?",
      answer:
        "Да, специализируюсь на договорной работе: 1) Разработка и проверка договоров любой сложности, 2) Анализ договорных рисков, 3) Составление дополнительных соглашений, 4) Претензионная работа по нарушенным договорам. Помогаю создать надежную договорную базу для вашего бизнеса.",
      category: "Договорное право",
    },
    {
      id: "4",
      question: "Можно ли решить вопрос удаленно?",
      answer:
        "Да, большинство вопросов решаются дистанционно. Использую: 1) Онлайн-консультации по видеосвязи, 2) Электронный документооборот, 3) Цифровые подписи, 4) Облачное хранилище для документов. Это экономит ваше время и позволяет работать из любого города России.",
      category: "Формат работы",
    },
    {
      id: "5",
      question: "Какие гарантии вы предоставляете?",
      answer:
        "Гарантирую: 1) Полную конфиденциальность, 2) Прозрачное ценообразование без скрытых платежей, 3) Персональное внимание к вашему делу, 4) Регулярные отчеты о проделанной работе, 5) Оперативную связь в рабочие часы. Работаю на результат и репутацию.",
      category: "Гарантии",
    },
    {
      id: "6",
      question: "Как быстро вы приступаете к работе?",
      answer:
        "1) Первичный ответ на заявку — в течение 1 часа, 2) Бесплатный анализ ситуации — в день обращения, 3) Начало работы — сразу после заключения договора, 4) Срочные вопросы (арест счетов и др.) — рассматриваю в приоритетном порядке. Работаю без бюрократических задержек.",
      category: "Сроки",
    },
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const categories = [
    { name: "Все вопросы", count: faqItems.length },
    { name: "Арбитражные споры", count: 1 },
    { name: "Договорное право", count: 1 },
    { name: "Стоимость услуг", count: 1 },
    { name: "Формат работы", count: 1 },
    { name: "Гарантии", count: 1 },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-6 py-2 mb-4">
            <Icon name="HelpCircle" size={20} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-900 uppercase tracking-wider">
              Частые вопросы
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Ответы на вопросы о юридической защите бизнеса
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Объясняю сложные юридические вопросы простым языком
          </p>
        </div>

        {/* Категории FAQ */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, idx) => (
            <button
              key={idx}
              className="rounded-full px-5 py-2 border-2 border-blue-100 text-slate-700 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all bg-white text-sm font-medium"
            >
              {category.name}
              <span className="ml-2 bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-xs font-bold">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Простой аккордеон без сторонних библиотек */}
        <div className="max-w-4xl mx-auto mb-16 space-y-4">
          {faqItems.map((item) => {
            const isOpen = openItems.includes(item.id);

            return (
              <Card
                key={item.id}
                className="border border-slate-200 hover:border-blue-300 transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left px-6 py-4 hover:bg-blue-50/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon
                        name="HelpCircle"
                        className="h-5 w-5 text-blue-600"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-slate-900 pr-4">
                          {item.question}
                        </h3>
                        <div className="flex-shrink-0">
                          <Icon
                            name={isOpen ? "ChevronUp" : "ChevronDown"}
                            className="h-5 w-5 text-blue-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <CardContent className="px-6 pb-6 pt-2">
                    <div className="pl-14">
                      <div className="text-slate-700 leading-relaxed bg-blue-50/30 rounded-lg p-5 border border-blue-100">
                        {item.answer}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-16">
          <div className="text-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Clock" className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-1">1 час</div>
            <div className="text-sm text-slate-600">Ответ на заявку</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Shield" className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
            <div className="text-sm text-slate-600">Конфиденциальность</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Zap" className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
            <div className="text-sm text-slate-600">Для срочных вопросов</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="CheckCircle" className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-1">Фикс</div>
            <div className="text-sm text-slate-600">Цена в договоре</div>
          </div>
        </div>

        {/* CTA секция */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Остались вопросы?
                </h3>
                <p className="text-blue-100 mb-6">
                  Получите бесплатную консультацию по арбитражным спорам,
                  договорному праву или корпоративным вопросам вашего бизнеса.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-blue-700 hover:bg-blue-50 font-semibold"
                  >
                    <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                    Написать в WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white/10 font-semibold"
                  >
                    <Icon name="Phone" className="h-5 w-5 mr-2" />
                    Позвонить
                  </Button>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon
                      name="CheckCircle2"
                      className="h-5 w-5 text-green-300 flex-shrink-0"
                    />
                    <div>
                      <div className="font-bold">Арбитражные споры</div>
                      <div className="text-sm text-blue-200">
                        Взыскание долгов, защита от исков
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon
                      name="CheckCircle2"
                      className="h-5 w-5 text-green-300 flex-shrink-0"
                    />
                    <div>
                      <div className="font-bold">Договорное право</div>
                      <div className="text-sm text-blue-200">
                        Составление и проверка договоров
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon
                      name="CheckCircle2"
                      className="h-5 w-5 text-green-300 flex-shrink-0"
                    />
                    <div>
                      <div className="font-bold">Корпоративные вопросы</div>
                      <div className="text-sm text-blue-200">
                        Споры участников, защита прав
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Фокус на специализации */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-blue-50 rounded-full px-6 py-3">
            <Icon name="Target" size={20} className="text-blue-600" />
            <span className="text-slate-700 font-medium">
              Специализируюсь на арбитражных спорах, договорном и корпоративном
              праве
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessFAQ;
