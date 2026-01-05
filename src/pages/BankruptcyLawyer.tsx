import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useState } from 'react';
import { trackCustomGoal } from '@/utils/metrika';

export default function BankruptcyLawyer() {
  const [formData, setFormData] = useState({ name: '', phone: '', debt: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackCustomGoal('bankruptcy_consultation', {
      source: 'page',
      action: 'form_submit'
    });
    toast.success('Заявка отправлена! Перезвоним в течение 15 минут');
    setFormData({ name: '', phone: '', debt: '' });
  };

  const situations = [
    { icon: 'CreditCard', title: 'Кредиты', description: 'Долги по банкам от 300 000₽ — спишем законно' },
    { icon: 'Building2', title: 'МФО', description: 'Задолженность по микрозаймам и коллекторы' },
    { icon: 'TrendingDown', title: 'ЖКХ и налоги', description: 'Долги за коммуналку, транспортный налог' },
    { icon: 'ShieldAlert', title: 'Исполнительное производство', description: 'Приставы арестовали счета или имущество' },
  ];

  const advantages = [
    { icon: 'Check', title: 'Списание долгов', text: 'Законно избавляем от долговых обязательств навсегда' },
    { icon: 'Home', title: 'Сохраняем имущество', text: 'Единственное жильё, личные вещи остаются у вас' },
    { icon: 'ShieldCheck', title: 'Без визитов', text: 'Вся процедура онлайн, не нужно ездить в суд' },
    { icon: 'Clock', title: '6-8 месяцев', text: 'Средний срок завершения процедуры банкротства' },
  ];

  const steps = [
    { num: '1', title: 'Анализ долгов', text: 'Проверяем возможность банкротства бесплатно' },
    { num: '2', title: 'Подготовка', text: 'Собираем документы, подаём заявление в суд' },
    { num: '3', title: 'Процедура', text: 'Ведём дело, общаемся с кредиторами и судом' },
    { num: '4', title: 'Списание', text: 'Получаете решение о признании банкротом' },
  ];

  const cases = [
    { debt: '2.5 млн ₽', result: 'Списано 100%', time: '7 месяцев', situation: 'Кредиты 4 банков + МФО' },
    { debt: '980 тыс ₽', result: 'Списано 100%', time: '6 месяцев', situation: 'Ипотека + потребкредиты' },
    { debt: '1.8 млн ₽', result: 'Списано 100%', time: '8 месяцев', situation: 'Долги по ЖКХ + кредиты' },
  ];

  return (
    <>
      <Helmet>
        <title>Банкротство физических лиц в Новосибирске | Списание долгов от 50 000₽</title>
        <meta name="description" content="Банкротство физлиц под ключ. Списываем долги по кредитам, МФО, ЖКХ законно. Сохраняем единственное жильё. Процедура онлайн за 6-8 месяцев." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-red-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-700 font-medium mb-6">
                  <Icon name="AlertCircle" className="h-5 w-5 mr-2" />
                  Долги от 300 000₽
                </div>
                <h1 className="text-5xl font-bold mb-6 leading-tight">
                  Банкротство физлиц — законное списание всех долгов
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Избавим от долгов по кредитам, МФО, ЖКХ навсегда. Сохраним единственное жильё. Процедура онлайн за 6-8 месяцев. Стоимость от 50 000₽
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg bg-red-600 hover:bg-red-700" asChild>
                    <a href="#form">
                      <Icon name="FileCheck" className="h-5 w-5 mr-2" />
                      Проверить возможность банкротства
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
                <div className="bg-white p-8 rounded-2xl shadow-2xl border-l-4 border-red-600">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Icon name="TrendingDown" className="h-12 w-12 text-red-600" />
                      <div>
                        <div className="text-3xl font-bold text-red-600">350+</div>
                        <div className="text-muted-foreground">списанных долгов</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">4.5 млрд ₽</div>
                    <div className="text-muted-foreground">освобождено от долгов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Situations */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Когда нужно банкротство</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">Поможем, если вы не можете платить по долгам</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {situations.map((item, i) => (
                <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={item.icon} className="h-7 w-7 text-red-600" />
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
            <h2 className="text-4xl font-bold text-center mb-12">Преимущества банкротства с нами</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((adv, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={adv.icon} className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{adv.title}</h3>
                  <p className="text-muted-foreground">{adv.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cases */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Примеры списанных долгов</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {cases.map((c, i) => (
                <Card key={i} className="p-6 border-l-4 border-red-600">
                  <div className="text-3xl font-bold text-red-600 mb-2">{c.debt}</div>
                  <div className="text-green-600 font-semibold mb-2">{c.result}</div>
                  <div className="text-sm text-muted-foreground mb-3">Срок: {c.time}</div>
                  <p className="text-sm">{c.situation}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Этапы банкротства</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="relative text-center">
                  <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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
        <section id="form" className="py-20 bg-red-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4">Проверьте возможность банкротства</h2>
              <p className="text-xl mb-8 opacity-90">Бесплатный анализ вашей ситуации за 15 минут</p>
              <form id="bankruptcy-lawyer-form" name="bankruptcy-lawyer-form" onSubmit={handleSubmit} className="bg-white text-foreground rounded-xl p-8 space-y-4">
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
                <input
                  type="text"
                  placeholder="Сумма долга (примерно)"
                  value={formData.debt}
                  onChange={(e) => setFormData({ ...formData, debt: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                />
                <Button type="submit" size="lg" className="w-full text-lg bg-red-600 hover:bg-red-700">
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