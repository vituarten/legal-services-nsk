import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const BusinessBlog = () => {
  const [openItems, setOpenItems] = useState<string[]>(["1"]);

  const faqItems = [
    {
      id: "1",
      question: "Как происходит работа по арбитражным спорам?",
      answer:
        "Работа строится по алгоритму: 1) Бесплатный анализ вашей ситуации, 2) Разработка индивидуальной стратегии защиты, 3) Подготовка всех процессуальных документов, 4) Полное сопровождение в суде, 5) Контроль исполнения решения.",
      category: "Арбитражные споры",
    },
    {
      id: "2",
      question: "Сколько стоит юридическое сопровождение бизнеса?",
      answer:
        "Предлагаю прозрачное ценообразование: 1) Бесплатная первичная консультация, 2) Фиксированная стоимость за конкретную услугу, 3) Гибкая система оплаты в зависимости от сложности задачи, 4) Возможность поэтапной оплаты.",
      category: "Стоимость",
    },
    {
      id: "3",
      question: "Занимаетесь ли вы договорным правом?",
      answer:
        "Да, специализируюсь на договорной работе: 1) Разработка и проверка договоров любой сложности, 2) Анализ договорных рисков, 3) Составление дополнительных соглашений, 4) Претензионная работа по нарушенным договорам.",
      category: "Договорное право",
    },
    {
      id: "4",
      question: "Можно ли решить вопрос удаленно?",
      answer:
        "Да, большинство вопросов решаются дистанционно. Использую: 1) Онлайн-консультации по видеосвязи, 2) Электронный документооборот, 3) Цифровые подписи, 4) Облачное хранилище для документов.",
      category: "Формат работы",
    },
    {
      id: "5",
      question: "Какие гарантии вы предоставляете?",
      answer:
        "Гарантирую: 1) Полную конфиденциальность, 2) Прозрачное ценообразование без скрытых платежей, 3) Персональное внимание к вашему делу, 4) Регулярные отчеты о проделанной работе, 5) Оперативную связь в рабочие часы.",
      category: "Гарантии",
    },
    {
      id: "6",
      question: "Как быстро вы приступаете к работе?",
      answer:
        "1) Первичный ответ на заявку — в течение 1 часа, 2) Бесплатный анализ ситуации — в день обращения, 3) Начало работы — сразу после заключения договора, 4) Срочные вопросы — рассматриваю в приоритетном порядке.",
      category: "Сроки",
    },
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-6 py-2 mb-4">
            <Icon name="HelpCircle" size={20} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-900 uppercase tracking-wider">
              Частые вопросы
            </span>
          </div>

          <h2 className="text-4xl font-bold text-slate-900">
            Ответы на вопросы
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Объясняю сложные юридические вопросы простым языком
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16 space-y-4">
          {faqItems.map((item) => {
            const isOpen = openItems.includes(item.id);

            return (
              <Card
                key={item.id}
                className="border border-slate-200 hover:border-blue-300 transition-colors"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left px-6 py-4 hover:bg-blue-50/50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mr-3">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-semibold text-slate-900 inline">
                        {item.question}
                      </h3>
                    </div>
                    <Icon
                      name={isOpen ? "ChevronUp" : "ChevronDown"}
                      className="h-5 w-5 text-blue-600"
                    />
                  </div>
                </button>

                {isOpen && (
                  <CardContent className="px-6 pb-6 pt-2">
                    <div className="text-slate-700 leading-relaxed bg-blue-50/30 rounded-lg p-5 border border-blue-100">
                      {item.answer}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-blue-50 rounded-full px-6 py-3 mb-8">
            <Icon name="Target" size={20} className="text-blue-600" />
            <span className="text-slate-700 font-medium">
              Специализируюсь на арбитражных спорах, договорном и корпоративном
              праве
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
              Задать вопрос в WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Icon name="Phone" className="h-5 w-5 mr-2" />
              Позвонить для консультации
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessBlog;
