import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const ServicesMain = () => {
  const serviceCategories = [
    {
      icon: "Car",
      title: "Автоюрист",
      description: "Защита при ДТП, споры со страховыми, лишение прав, незаконные штрафы",
      link: "/dtp-lawyer"
    },
    {
      icon: "Users",
      title: "Семейное право",
      description: "Разводы, алименты, раздел имущества, споры о детях",
      link: "/family-lawyer"
    },
    {
      icon: "TrendingDown",
      title: "Банкротство",
      description: "Списание долгов физических лиц, защита от кредиторов",
      link: "/bankruptcy-lawyer"
    },
    {
      icon: "FileText",
      title: "Миграционное право",
      description: "РВП, ВНЖ, гражданство, депортация, запреты на въезд",
      link: "/migration"
    },
    {
      icon: "Home",
      title: "Недвижимость",
      description: "Сделки купли-продажи, споры с застройщиками, перепланировки",
      link: "/real-estate-lawyer"
    },
    {
      icon: "Shield",
      title: "Уголовная защита",
      description: "Защита на следствии и в суде, обжалование приговоров",
      link: "/criminal-lawyer"
    }
  ];

  return (
    <section
      id="services"
      className="py-20 bg-secondary/20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Наши услуги
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Комплексная юридическая поддержка — от консультации до победы в суде
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {serviceCategories.map((service, index) => (
            <Link key={index} to={service.link}>
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-8 space-y-4">
                  <div className="inline-block p-4 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:scale-110 transition-all">
                    <Icon name={service.icon} className="h-8 w-8 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center text-primary font-semibold pt-2">
                    <span className="mr-2">Подробнее</span>
                    <Icon name="ArrowRight" className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center space-y-3">
              <div className="inline-block p-3 bg-primary rounded-xl">
                <Icon name="Award" className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Опыт с 2016 года</h3>
              <p className="text-sm text-muted-foreground">
                Более 8 лет успешной практики в различных областях права
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200 hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center space-y-3">
              <div className="inline-block p-3 bg-blue-600 rounded-xl">
                <Icon name="UserCheck" className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Индивидуальный подход</h3>
              <p className="text-sm text-muted-foreground">
                Анализируем вашу ситуацию и предлагаем оптимальное решение
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200 hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center space-y-3">
              <div className="inline-block p-3 bg-green-600 rounded-xl">
                <Icon name="Target" className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Полное сопровождение</h3>
              <p className="text-sm text-muted-foreground">
                Ведём дело от начала до конца, держим вас в курсе каждого шага
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200 hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center space-y-3">
              <div className="inline-block p-3 bg-amber-600 rounded-xl">
                <Icon name="FileCheck" className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Прозрачность</h3>
              <p className="text-sm text-muted-foreground">
                Честные цены без скрытых комиссий, отчёт на каждом этапе
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-primary to-primary/90 text-white border-none shadow-2xl">
          <CardContent className="p-10">
            <div className="text-center space-y-6">
              <h3 className="text-2xl lg:text-3xl font-bold">
                Нужна юридическая помощь?
              </h3>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Позвоните нам или оставьте заявку — мы свяжемся с вами в течение 15 минут
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 px-8 text-lg font-semibold"
                  asChild
                >
                  <a href="tel:+7 (383) 235-95-05">
                    <Icon name="Phone" className="h-5 w-5 mr-2" />
                    +7 993 190 35 00
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 text-lg font-semibold"
                  asChild
                >
                  <a href="#contacts">
                    <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                    Получить консультацию
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-8 pt-6 text-blue-100">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" className="h-5 w-5" />
                  <span className="font-medium">Работаем 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" className="h-5 w-5" />
                  <span className="font-medium">г. Новосибирск, ул. Ленина, д. 3</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Shield" className="h-5 w-5" />
                  <span className="font-medium">100% конфиденциальность</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ServicesMain;
