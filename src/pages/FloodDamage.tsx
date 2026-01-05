import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function FloodDamage() {
  return (
    <>
      <Helmet>
        <title>Возмещение ущерба от потопов в Новосибирске | Профессиональная помощь от 20 000₽</title>
        <meta name="description" content="Возмещение ущерба от потопов под ключ. Оценка ущерба от залития квартиры, взыскание с виновника, работа с УК. Гарантия результата." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-6">
            Возмещение ущерба от потопов
          </h1>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Взыскание ущерба от залития квартиры, оценка повреждений, споры с соседями и УК
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Стоимость:</h2>
              <p className="text-3xl font-bold text-primary">от 20 000₽</p>
            </Card>
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Срок:</h2>
              <p className="text-3xl font-bold text-primary">1-3 месяца</p>
            </Card>
          </div>
          
          <div className="text-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Icon name="Phone" className="mr-2" />
              Бесплатная консультация
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
