import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Services = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Самые частые проблемы с иконками
  const commonProblems = [
    {
      text: "🚗 ДТП и страховые",
      desc: "Мало выплатили, спор о вине",
      link: "/dtp-lawyer",
    },
    {
      text: "💸 Долги и кредиты",
      desc: "Коллекторы, банкротство",
      link: "/bankruptcy-lawyer",
    },
    {
      text: "💧 Затопили соседи",
      desc: "Вернём деньги на ремонт",
      link: "/flood-damage",
    },
    {
      text: "👨‍👩‍👦 Развод и дети",
      desc: "Раздел имущества, алименты",
      link: "/family-lawyer",
    },
    {
      text: "💼 Не платят зарплату",
      desc: "Вернём все невыплаты",
      link: "/labor-law",
    },
    {
      text: "🏠 Проблемы с квартирой",
      desc: "Застройщик обманул",
      link: "/disputes-with-developers",
    },
    { text: "🚫 Лишают прав", desc: "За алкоголь, ДТП", link: "/dtp-lawyer" },
    {
      text: "📄 Нужен юрист в суд",
      desc: "Представительство",
      link: "/court-representation",
    },
    {
      text: "🛒 Купил бракованный товар",
      desc: "Вернём деньги",
      link: "/consumer-protection",
    },
    {
      text: "⚖️ Споры с УК/ТСЖ",
      desc: "Коммунальные платежи",
      link: "/housing-disputes",
    },
    {
      text: "📉 Навязали страховку",
      desc: "Вернём деньги",
      link: "/consumer-protection",
    },
    {
      text: "👴 Споры о наследстве",
      desc: "Раздел с родственниками",
      link: "/family-lawyer",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Шаг 1: Главный вопрос */}
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Какая у вас проблема?
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Выберите ситуацию — расскажем, как решаем
        </p>

        {/* Поиск */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Введите проблему: например, 'затопили', 'штраф ГИБДД', 'долги'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
            <Icon
              name="Search"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            />
          </div>

          {searchQuery && (
            <div className="mt-4 text-left">
              <p className="text-gray-600 mb-2">Возможно, вы ищете:</p>
              {commonProblems
                .filter(
                  (p) =>
                    p.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.desc.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .slice(0, 3)
                .map((p, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(p.link)}
                    className="block w-full p-3 text-left hover:bg-gray-50 rounded-lg mb-1"
                  >
                    <div className="font-medium">{p.text}</div>
                    <div className="text-sm text-gray-500">{p.desc}</div>
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Шаг 2: Сетка проблем */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">
          Выберите свою ситуацию
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {commonProblems.map((problem, idx) => (
            <button
              key={idx}
              onClick={() => navigate(problem.link)}
              className="p-5 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{problem.text.split(" ")[0]}</div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-lg mb-1">
                    {problem.text.split(" ").slice(1).join(" ")}
                  </div>
                  <div className="text-gray-600 text-sm">{problem.desc}</div>
                  <div className="mt-3 text-primary font-medium flex items-center">
                    Узнать, как решить
                    <Icon
                      name="ArrowRight"
                      className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-10">
          <div className="inline-flex flex-col items-center">
            <p className="text-gray-600 mb-4">
              Не нашли свою ситуацию в списке?
            </p>
            <Button
              onClick={() => window.open("tel:+73832359505", "_self")}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-8 py-6 text-lg"
            >
              <Icon name="Phone" className="h-5 w-5 mr-3" />
              Бесплатно проконсультироваться
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Первые 15 минут консультации — бесплатно
            </p>
          </div>
        </div>
      </div>

      {/* Шаг 3: Как работает */}
      <div className="bg-gray-50 rounded-2xl p-10">
        <h2 className="text-3xl font-bold text-center mb-10">
          Как мы работаем
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              step: "01",
              title: "Расскажите о проблеме",
              desc: "Позвоните или оставьте заявку. Юрист выслушает и сразу скажет, сможем ли помочь.",
              icon: "MessageCircle",
              color: "bg-blue-100 text-blue-600",
            },
            {
              step: "02",
              title: "Анализ и план",
              desc: "Изучим ваши документы, подготовим стратегию и назовём точную стоимость.",
              icon: "FileText",
              color: "bg-green-100 text-green-600",
            },
            {
              step: "03",
              title: "Решаем вашу проблему",
              desc: "Возьмём на себя все переговоры, документы и судебные процессы. Вы только получаете результат.",
              icon: "CheckCircle",
              color: "bg-purple-100 text-purple-600",
            },
          ].map((item, i) => (
            <div key={i} className="text-center space-y-4">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${item.color} font-bold text-lg`}
              >
                {item.step}
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Финальный CTA */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-primary/5 to-blue-50 rounded-2xl p-10 border border-primary/20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Просто позвоните
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Не ищите сложные решения. Расскажите о проблеме — мы всё объясним.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              onClick={() => window.open("tel:+73832359505", "_self")}
              className="bg-primary hover:bg-primary/90 text-white font-bold px-10 py-6 text-lg shadow-lg"
            >
              <Icon name="Phone" className="h-6 w-6 mr-3" />
              Позвонить юристу
            </Button>

            <div className="text-left">
              <div className="text-2xl font-black text-gray-900">
                +7 (383) 235-95-05
              </div>
              <div className="text-gray-600 text-sm">
                Новосибирск • Работаем с 8:00 до 22:00
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              ⚡{" "}
              <span className="font-semibold">
                Первая консультация 15 минут — бесплатно
              </span>
              <br />
              📄 <span className="font-semibold">Анализ документов</span> перед
              началом работы
              <br />
              🛡️ <span className="font-semibold">Конфиденциально</span> — ваши
              данные в безопасности
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
