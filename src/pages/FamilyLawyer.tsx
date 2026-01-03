import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useState } from 'react';
import { trackCustomGoal } from '@/utils/metrika';

export default function FamilyLawyer() {
  const [formData, setFormData] = useState({ name: '', phone: '', problem: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackCustomGoal('family_lawyer_consultation', {
      source: 'page',
      action: 'form_submit'
    });
    toast.success('Заявка отправлена! Перезвоним в течение 15 минут');
    setFormData({ name: '', phone: '', problem: '' });
  };

  const situations = [
    { icon: 'HeartCrack', title: 'Развод', description: 'Расторжение брака быстро и без лишнего стресса' },
    { icon: 'Home', title: 'Раздел имущества', description: 'Справедливое распределение совместно нажитого' },
    { icon: 'Baby', title: 'Опека и алименты', description: 'Защита интересов детей и родительских прав' },
    { icon: 'Users', title: 'Споры по детям', description: 'Определение места жительства, порядка общения' },
  ];

  const advantages = [
    { icon: 'Shield', title: 'Конфиденциальность', text: 'Гарантируем полную тайну вашей семейной ситуации' },
    { icon: 'CheckCircle2', title: '95% выигранных дел', text: 'Успешно решаем семейные споры с 2016 года' },
    { icon: 'Clock', title: 'Быстрое решение', text: 'Ускоренное расторжение брака за 1 месяц' },
    { icon: 'Heart', title: 'Без стресса', text: 'Берём все переговоры и суды на себя' },
  ];

  const steps = [
    { num: '1', title: 'Консультация', text: 'Бесплатный разбор вашей ситуации за 15 минут' },
    { num: '2', title: 'План действий', text: 'Составляем стратегию защиты ваших интересов' },
    { num: '3', title: 'Документы', text: 'Готовим все иски, заявления, соглашения' },
    { num: '4', title: 'Результат', text: 'Добиваемся справедливого решения в суде' },
  ];

  return (
    <>
      <Helmet>
        <title>Семейный юрист в Новосибирске | Развод, раздел имущества, алименты</title>
        <meta name="description" content="Семейный юрист ЮрСервисНСК. Развод за 1 месяц, справедливый раздел имущества, защита прав детей. 95% выигранных дел. Бесплатная консультация." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-6">
                  <Icon name="Award" className="h-5 w-5 mr-2" />
                  95% выигранных дел
                </div>
                <h1 className="text-5xl font-bold mb-6 leading-tight">
                  Семейный юрист — защитим ваши права в любой ситуации
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Развод, раздел имущества, алименты, споры по детям. Решаем семейные вопросы быстро, законно и конфиденциально
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg" asChild>
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
                  <Icon name="Users" className="h-24 w-24 text-primary mx-auto mb-4" />
                  <div className="text-center space-y-3">
                    <div className="text-4xl font-bold text-primary">1500+</div>
                    <div className="text-muted-foreground">решённых семейных дел</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Situations */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">В каких ситуациях мы поможем</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">Профессиональная поддержка в сложный период</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {situations.map((item, i) => (
                <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={item.icon} className="h-7 w-7 text-primary" />
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
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={adv.icon} className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{adv.title}</h3>
                  <p className="text-muted-foreground">{adv.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Как мы работаем</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="relative text-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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
        <section id="form" className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4">Получите бесплатную консультацию</h2>
              <p className="text-xl mb-8 opacity-90">Перезвоним в течение 15 минут и разберём вашу ситуацию</p>
              <form id="family-lawyer-form" name="family-lawyer-form" onSubmit={handleSubmit} className="bg-white text-foreground rounded-xl p-8 space-y-4">
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
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border h-24"
                />
                <Button type="submit" size="lg" className="w-full text-lg">
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