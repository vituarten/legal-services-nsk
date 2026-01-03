import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ConsumerSituationsSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-4">
          В каких ситуациях мы поможем
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Любое нарушение ваших прав как покупателя — повод обратиться к нам
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="ShoppingBag" className="mb-4 text-primary" size={32} />
              <h3 className="text-xl font-semibold mb-2">Некачественный товар</h3>
              <p className="text-muted-foreground mb-3">
                Бракованный, неисправный, не соответствующий описанию или опасный товар
              </p>
              <p className="text-sm text-primary font-semibold">
                Ст. 18 ЗоЗПП + возврат + штраф + неустойка
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="Wrench" className="mb-4 text-primary" size={32} />
              <h3 className="text-xl font-semibold mb-2">Плохие услуги</h3>
              <p className="text-muted-foreground mb-3">
                Некачественный ремонт, строительство, медицинские, туристические или любые другие услуги
              </p>
              <p className="text-sm text-primary font-semibold">
                Ст. 29 ЗоЗПП + возврат + переделка + компенсация
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="FileX" className="mb-4 text-primary" size={32} />
              <h3 className="text-xl font-semibold mb-2">Навязанные услуги</h3>
              <p className="text-muted-foreground mb-3">
                Страховки, гарантии, допы при покупке автомобиля, техники, кредитов
              </p>
              <p className="text-sm text-primary font-semibold">
                Ст. 16 ЗоЗПП + возврат 100% + штраф за отказ
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="Clock" className="mb-4 text-primary" size={32} />
              <h3 className="text-xl font-semibold mb-2">Нарушение сроков</h3>
              <p className="text-muted-foreground mb-3">
                Просрочка доставки товара, выполнения ремонта, гарантийных обязательств
              </p>
              <p className="text-sm text-primary font-semibold">
                Ст. 23, 28 ЗоЗПП + 1% в день неустойки
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="CreditCard" className="mb-4 text-primary" size={32} />
              <h3 className="text-xl font-semibold mb-2">Обман с ценами</h3>
              <p className="text-muted-foreground mb-3">
                Неправильная цена на ценнике, скрытые комиссии, необоснованное повышение цены
              </p>
              <p className="text-sm text-primary font-semibold">
                Ст. 10 ЗоЗПП + возврат переплаты + штраф
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="ShieldAlert" className="mb-4 text-primary" size={32} />
              <h3 className="text-xl font-semibold mb-2">Отказ в гарантии</h3>
              <p className="text-muted-foreground mb-3">
                Необоснованный отказ в гарантийном ремонте или замене товара
              </p>
              <p className="text-sm text-primary font-semibold">
                Ст. 18, 19 ЗоЗПП + ремонт за счёт продавца + компенсация
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="Home" className="mb-4 text-primary" size={32} />
              <h3 className="text-xl font-semibold mb-2">Застройщики</h3>
              <p className="text-muted-foreground mb-3">
                Просрочка сдачи квартиры, недоделки, несоответствие проекту
              </p>
              <p className="text-sm text-primary font-semibold">
                ФЗ-214 + неустойка + устранение недостатков + компенсация
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="Smartphone" className="mb-4 text-primary" size={32} />
              <h3 className="text-xl font-semibold mb-2">Сотовые операторы</h3>
              <p className="text-muted-foreground mb-3">
                Необоснованные списания, навязанные подписки, плохая связь
              </p>
              <p className="text-sm text-primary font-semibold">
                ЗоЗПП + возврат + штраф + неустойка + моральный вред
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="Plane" className="mb-4 text-primary" size={32} />
              <h3 className="text-xl font-semibold mb-2">Авиакомпании</h3>
              <p className="text-muted-foreground mb-3">
                Задержка рейса, отмена, потеря багажа, овербукинг
              </p>
              <p className="text-sm text-primary font-semibold">
                ВК РФ №82 + компенсация до 600€ + расходы
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
