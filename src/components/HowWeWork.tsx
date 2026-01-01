import Icon from "@/components/ui/icon";

const HowWeWork = () => {
  const steps = [
    {
      number: "01",
      icon: "MessageSquare",
      title: "Заявка",
      description: "Оставьте заявку через сайт или позвоните нам",
    },
    {
      number: "02",
      icon: "Users",
      title: "Консультация",
      description: "Получите бесплатную консультацию юриста в течение 15 минут",
    },
    {
      number: "03",
      icon: "FileCheck",
      title: "Договор",
      description: "Подписываем договор и начинаем работу над вашим делом",
    },
    {
      number: "04",
      icon: "CheckCircle2",
      title: "Результат",
      description: "Решаем вашу проблему и достигаем поставленных целей",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Как мы работаем
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Простой и прозрачный процесс от заявки до результата
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-primary/20 -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-xl text-center">
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <Icon name={step.icon} className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
