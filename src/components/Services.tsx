import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Services = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Простые категории с иконками
  const simpleCategories = [
    {
      id: "dtp",
      label: "🚗 ДТП и авто",
      icon: "Car",
      color: "bg-blue-50",
      link: "/dtp-lawyer",
    },
    {
      id: "debts",
      label: "💸 Долги и кредиты",
      icon: "CreditCard",
      color: "bg-red-50",
      link: "/bankruptcy-lawyer",
    },
    {
      id: "family",
      label: "👨‍👩‍👦 Развод и семья",
      icon: "Users",
      color: "bg-pink-50",
      link: "/family-lawyer",
    },
    {
      id: "housing",
      label: "🏠 Жильё и квартиры",
      icon: "Home",
      color: "bg-green-50",
      link: "/real-estate-lawyer",
    },
    {
      id: "work",
      label: "💼 Работа и зарплата",
      icon: "Briefcase",
      color: "bg-yellow-50",
      link: "/labor-law",
    },
    {
      id: "consumer",
      label: "🛒 Покупки и услуги",
      icon: "ShoppingCart",
      color: "bg-purple-50",
      link: "/consumer-protection",
    },
  ];

  // Самые частые проблемы одним списком
  const commonProblems = [
    { text: "Затопили соседи", search: "затопили", link: "/flood-damage" },
    {
      text: "Страховая мало платит",
      search: "страховая мало",
      link: "/dtp-lawyer",
    },
    {
      text: "Должник не отдаёт деньги",
      search: "должник не отдаёт",
      link: "/debt-collection",
    },
    {
      text: "Развод с разделом имущества",
      search: "развод раздел",
      link: "/family-lawyer",
    },
    {
      text: "Не платят зарплату",
      search: "не платят зарплату",
      link: "/labor-law",
    },
    { text: "Лишают прав", search: "лишение прав", link: "/dtp-lawyer" },
    {
      text: "Обманул застройщик",
      search: "обманул застройщик",
      link: "/disputes-with-developers",
    },
    {
      text: "Купил бракованный товар",
      search: "бракованный товар",
      link: "/consumer-protection",
    },
    { text: "Штраф ГИБДД", search: "штраф гибдд", link: "/dtp-lawyer" },
    {
      text: "Нужен юрист в суд",
      search: "представительство в суде",
      link: "/court-representation",
    },
    {
      text: "Спор о наследстве",
      search: "наследство спор",
      link: "/family-lawyer",
    },
    {
      text: "Травма на работе",
      search: "травма на работе",
      link: "/labor-law",
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
          Ответьте на один вопрос — мы подскажем решение
        </p>

        {/* Поиск - максимально простой */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Например: 'затопили квартиру', 'долги по кредитам', 'штраф ГИБДД'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
            <Icon
              name="Search"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            />
          </div>

          {/* Или выберите категорию */}
          <div className="mt-8">
            <p className="text-gray-600 mb-4">Или выберите категорию:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {simpleCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => navigate(cat.link)}
                  className={`flex items-center gap-3 p-4 rounded-xl ${cat.color} hover:opacity-90 transition-opacity`}
                >
                  <div className="text-2xl">{cat.label.split(" ")[0]}</div>
                  <span className="font-medium text-left">
                    {cat.label.split(" ").slice(1).join(" ")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Шаг 2: Быстрый выбор проблемы */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Выберите свою ситуацию
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {commonProblems.map((problem, idx) => (
            <button
              key={idx}
              onClick={() => navigate(problem.link)}
              className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-sm transition-all text-left"
            >
              <div className="font-medium text-gray-800">{problem.text}</div>
              <div className="text-sm text-primary mt-2 flex items-center">
                Узнать решение
                <Icon name="ArrowRight" className="h-3 w-3 ml-1" />
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => {
              setSearchQuery("");
              window.open("tel:+73832359505", "_self");
            }}
            className="text-primary hover:text-primary/80 font-medium"
          >
            Не нашли свою ситуацию? Позвоните и расскажите →
          </button>
        </div>
      </div>

      {/* Шаг 3: Простые шаги к решению */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-10">Как мы решаем проблемы</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
              <Icon name="MessageCircle" className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold">1. Бесплатная консультация</h3>
            <p className="text-gray-600">
              Расскажите о проблеме за 15 минут. Юрист сразу скажет, сможем ли
              помочь.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
              <Icon name="FileText" className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">2. Анализ документов</h3>
            <p className="text-gray-600">
              Изучим ваши документы и подготовим план действий.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
              <Icon name="Scale" className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold">3. Решение проблемы</h3>
            <p className="text-gray-600">
              Возьмём на себя все переговоры, документы и судебные процессы.
            </p>
          </div>
        </div>
      </div>

      {/* Простой CTA */}
      <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-10 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Остались вопросы?</h2>
        <p className="text-xl mb-8 opacity-90">
          Просто позвоните. Первые 15 минут консультации — бесплатно.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => window.open("tel:+73832359505", "_self")}
            className="bg-white text-primary hover:bg-gray-100 font-bold px-10 py-6 text-lg"
          >
            <Icon name="Phone" className="h-6 w-6 mr-3" />
            Позвонить юристу
          </Button>

          <div className="text-left">
            <div className="text-2xl font-black">+7 (383) 235-95-05</div>
            <div className="opacity-80 text-sm">
              Новосибирск • с 8:00 до 22:00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
