const ServicesMain = () => {
  // ... остальной код ...

  return (
    <section id="services" className="py-12 sm:py-16 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            Наши услуги
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Комплексная юридическая поддержка от консультации до суда
          </p>
        </div>

        {/* Услуги - остаются */}
        
        {/* Преимущества - УБИРАЕМ дубли с Hero */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
          {[
            {
              icon: "FileText",
              title: "Документы",
              desc: "Подготовка всех документов"
            },
            {
              icon: "MessageSquare",
              title: "Консультация",
              desc: "Разбор ситуации за 15 минут"
            },
            {
              icon: "Briefcase",
              title: "Сопровождение",
              desc: "Ведение дела в суде"
            },
            {
              icon: "CreditCard",
              title: "Оплата",
              desc: "Фиксированная цена"
            }
          ].map((item, idx) => (
            // ... карточки ...
          ))}
        </div>

        {/* CTA Баннер - УБИРАЕМ дублирующий адрес */}
        <Card className="bg-gradient-to-r from-primary to-primary/90 text-white border-none">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center space-y-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                Нужна юридическая помощь?
              </h3>
              <p className="text-sm sm:text-base text-blue-100">
                Получите бесплатную консультацию за 15 минут
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size={isMobile ? "default" : "lg"}
                  className="bg-white text-primary hover:bg-gray-100"
                  asChild
                >
                  <a href="tel:+79931903500">
                    <Icon name="Phone" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Позвонить сейчас
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  className="border-white text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <a href="#contacts">
                    Заказать консультацию
                  </a>
                </Button>
              </div>

              {/* УБИРАЕМ адрес, оставляем только важное */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-4 text-xs sm:text-sm text-blue-100">
                <div className="flex items-center gap-1.5">
                  <Icon name="Clock" className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Консультация 15 минут</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon name="Shield" className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Конфиденциальность</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};