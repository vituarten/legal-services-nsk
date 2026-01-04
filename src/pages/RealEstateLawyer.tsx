import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useState } from 'react';
import { trackCustomGoal } from '@/utils/metrika';

export default function RealEstateLawyer() {
  const [formData, setFormData] = useState({ name: '', phone: '', issue: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackCustomGoal('real_estate_consultation', {
      source: 'page',
      action: 'form_submit'
    });
    toast.success('Заявка отправлена! Перезвоним в течение 15 минут');
    setFormData({ name: '', phone: '', issue: '' });
  };

  const situations = [
    { icon: 'Home', title: 'Купля-продажа', description: 'Безопасное оформление сделок с недвижимостью' },
    { icon: 'Hammer', title: 'Перепланировка', description: 'Узаконим любую перепланировку, даже сложную' },
    { icon: 'Building', title: 'Споры с застройщиками', description: 'Защита прав дольщиков, возврат денег' },
    { icon: 'Users', title: 'Споры с соседями', description: 'Шум, затопление, незаконные постройки' },
  ];

  const advantages = [
    { icon: 'Shield', title: 'Безопасность сделок', text: 'Проверяем чистоту документов и юридическую историю' },
    { icon: 'FileCheck', title: 'Узаконивание', text: 'Легализуем любые перепланировки через суд' },
    { icon: 'TrendingUp', title: '92% успеха', text: 'Выигрываем споры с застройщиками и соседями' },
    { icon: 'Clock', title: 'Быстро', text: 'Оформление сделок за 7-14 дней' },
  ];

  const steps = [
    { num: '1', title: 'Консультация', text: 'Разбираем вашу ситуацию бесплатно' },
    { num: '2', title: 'Проверка', text: 'Анализируем документы и риски' },
    { num: '3', title: 'Решение', text: 'Готовим документы, ведём переговоры' },
    { num: '4', title: 'Результат', text: 'Безопасная сделка или выигранный спор' },
  ];

  const prices = [
    { service: 'Сопровождение сделки', price: 'от 20 000₽', time: '7-14 дней' },
    { service: 'Узаконивание перепланировки', price: 'от 35 000₽', time: '2-4 месяца' },
    { service: 'Спор с застройщиком', price: 'от 25 000₽', time: '3-12 месяцев' },
    { service: 'Спор с соседями', price: 'от 15 000₽', time: '1-6 месяцев' },
  ];

  return (
    <>
      <Helmet>
        <title>Юрист по недвижимости в Новосибирске | Сделки, перепланировки, споры</title>
        <meta name="description" content="Юрист по недвижимости ЮрСервисНСК. Безопасные сделки, узаконивание перепланировок, споры с застройщиками. 92% выигранных дел." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-green-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-medium mb-6">
                  <Icon name="Home" className="h-5 w-5 mr-2" />
                  Защита прав на недвижимость
                </div>
                <h1 className="text-5xl font-bold mb-6 leading-tight">
                  Юрист по недвижимости — ваша безопасность и спокойствие
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Безопасные сделки, узаконивание перепланировок, споры с застройщиками и соседями. Защитим ваши права на жильё
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg bg-green-600 hover:bg-green-700" asChild>
                    <a href="#form">
                      <Icon name="MessageSquare" className="h-5 w-5 mr-2" />
                      Получить консультацию
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg" asChild>
                    <a href="tel:+79931903500">
                      <Icon name="Phone" className="h-5 w-5 mr-2" />
                      +7 993 190 35 00
                    </a>
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="bg-white p-8 rounded-2xl shadow-2xl">
                  <Icon name="Building2" className="h-24 w-24 text-green-600 mx-auto mb-4" />
                  <div className="text-center space-y-3">
                    <div className="text-4xl font-bold text-green-600">800+</div>
                    <div className="text-muted-foreground">сделок и споров</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Situations */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Чем мы поможем</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">Решаем любые вопросы с недвижимостью</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {situations.map((item, i) => (
                <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={item.icon} className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* USP */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Почему выбирают нас</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((adv, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={adv.icon} className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{adv.title}</h3>
                  <p className="text-muted-foreground">{adv.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prices */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Стоимость услуг</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {prices.map((p, i) => (
                <Card key={i} className="p-6 border-l-4 border-green-600">
                  <h3 className="text-xl font-semibold mb-3">{p.service}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-green-600">{p.price}</span>
                    <span className="text-sm text-muted-foreground">{p.time}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Как мы работаем</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="relative text-center">
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section id="form" className="py-20 bg-green-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4">Получите бесплатную консультацию</h2>
              <p className="text-xl mb-8 opacity-90">Разберём вашу ситуацию и предложим решение</p>
              <form onSubmit={handleSubmit} className="bg-white text-foreground rounded-xl p-8 space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                  required
                />
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                  required
                />
                <textarea
                  placeholder="Опишите вашу ситуацию"
                  value={formData.issue}
                  onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border h-24"
                />
                <Button type="submit" size="lg" className="w-full text-lg bg-green-600 hover:bg-green-700">
                  Получить консультацию
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}