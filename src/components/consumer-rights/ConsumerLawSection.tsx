import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ConsumerLawSection() {
  return (
    <section className="py-16 px-4 bg-primary/5">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-4">
          Закон на вашей стороне
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          По закону «О защите прав потребителей» вы можете получить гораздо больше, чем просто вернуть деньги
        </p>
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-white border-2 border-primary/20">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <h3 className="text-lg font-semibold mb-2">Полный возврат</h3>
              <p className="text-sm text-muted-foreground">
                Стоимость товара или услуги по ст. 18, 29 ЗоЗПП
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-2 border-primary/20">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">50%</div>
              <h3 className="text-lg font-semibold mb-2">Штраф за отказ</h3>
              <p className="text-sm text-muted-foreground">
                От взысканной суммы по п. 6 ст. 13 ЗоЗПП
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-2 border-primary/20">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">1%</div>
              <h3 className="text-lg font-semibold mb-2">Неустойка в день</h3>
              <p className="text-sm text-muted-foreground">
                За каждый день просрочки по ст. 23, 28 ЗоЗПП
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-2 border-primary/20">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">до 50К</div>
              <h3 className="text-lg font-semibold mb-2">Моральный вред</h3>
              <p className="text-sm text-muted-foreground">
                За переживания и неудобства по ст. 15 ЗоЗПП
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <Icon name="Scale" className="text-green-700" size={24} />
            Реальный пример
          </h3>
          <p className="text-muted-foreground">
            Купили диван за 80 000 ₽. Через месяц он развалился, магазин отказался возвращать деньги. 
            <strong className="text-foreground"> Мы взыскали: 80 000 ₽ (возврат) + 40 000 ₽ (штраф) + 24 000 ₽ (неустойка за 80 дней) + 
            15 000 ₽ (моральный вред) + 18 000 ₽ (судебные расходы) = 177 000 ₽</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
