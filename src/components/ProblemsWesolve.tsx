import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const ProblemsWesolve = () => {
  const problems = [
    {
      icon: "Home",
      title: "Соседи затопили вас",
      description: "Страховая отказывает в выплате? Поможем получить компенсацию в полном объёме",
    },
    {
      icon: "Users",
      title: "Раздел имущества",
      description: "Сложности с разделом имущества при разводе? Защитим ваши интересы в суде",
    },
    {
      icon: "Shield",
      title: "Безопасность мероприятий",
      description: "Нужно обеспечить порядок на празднике или корпоративе? Организуем охрану с аккредитацией МВД",
    },
    {
      icon: "Car",
      title: "ДТП и споры со страховой",
      description: "Авария, а страховая занижает выплату? Добьёмся справедливой компенсации",
    },
    {
      icon: "FileText",
      title: "Договорные споры",
      description: "Контрагент не выполняет обязательства? Взыщем задолженность через суд",
    },
    {
      icon: "Building2",
      title: "Споры с застройщиками",
      description: "Проблемы с качеством жилья или сроками? Добьёмся устранения недостатков или компенсации",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Какие проблемы мы решаем
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Профессиональная юридическая помощь и поддержка в любых ситуациях
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name={problem.icon} className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <a href="tel:+7 (383) 235-95-05">
              <Icon name="Phone" className="h-5 w-5 mr-2" />
              Получить консультацию
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProblemsWesolve;
