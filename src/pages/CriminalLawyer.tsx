import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useState } from 'react';
import { trackCustomGoal } from '@/utils/metrika';

export default function CriminalLawyer() {
  const [formData, setFormData] = useState({ name: '', phone: '', case: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackCustomGoal('criminal_lawyer_consultation', {
      source: 'page',
      action: 'form_submit'
    });
    toast.success('Заявка отправлена! Перезвоним в течение 15 минут');
    setFormData({ name: '', phone: '', case: '' });
  };

  const situations = [
    { icon: 'ShieldAlert', title: 'Следственные действия', description: 'Защита на допросах, обысках, при задержании' },
    { icon: 'Scale', title: 'Представительство в суде', description: 'Защита интересов на всех стадиях процесса' },
    { icon: 'FileText', title: 'Обжалование приговоров', description: 'Апелляция, кассация, надзор' },
    { icon: 'Users', title: 'Потерпевший', description: 'Защита прав потерпевшего в уголовном деле' },
  ];

  const advantages = [
    { icon: 'Clock', title: '24/7 на связи', text: 'Выезжаем в любое время, даже ночью' },
    { icon: 'Shield', title: 'Конфиденциально', text: 'Адвокатская тайна гарантирована законом' },
    { icon: 'Award', title: 'Опыт', text: '15+ лет успешной защиты по уголовным делам' },
    { icon: 'CheckCircle2', title: 'Результат', text: '78% дел закрыты или смягчено наказание' },
  ];

  const steps = [
    { num: '1', title: 'Срочная помощь', text: 'Выезжаем сразу, защищаем на допросе' },
    { num: '2', title: 'Анализ дела', text: 'Изучаем материалы, ищем нарушения' },
    { num: '3', title: 'Стратегия', text: 'Разрабатываем план защиты' },
    { num: '4', title: 'Защита', text: 'Добиваемся оправдания или минимального срока' },
  ];

  const categories = [
    { title: 'Экономические преступления', description: 'Мошенничество, растрата, налоги' },
    { title: 'Насилие и причинение вреда', description: 'Побои, угрозы, тяжкий вред здоровью' },
    { title: 'Имущественные', description: 'Кражи, грабежи, разбой, вымогательство' },
    { title: 'Наркотические', description: 'Хранение, сбыт, перевозка наркотиков' },
    { title: 'ДТП с пострадавшими', description: 'Нарушение ПДД, причинение вреда' },
    { title: 'Другие категории', description: 'Любые уголовные дела' },
  ];

  return (
    <>
      <Helmet>
        <title>Уголовный адвокат в Новосибирске | Защита 24/7 | 78% успеха</title>
        <meta name="description" content="Уголовный адвокат ЮрСервисНСК. Защита на допросах, в суде, обжалование приговоров. Выезд 24/7. 15+ лет опыта. 78% дел закрыты или смягчены." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 to-gray-700 text-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-red-600 rounded-full font-medium mb-6">
                  <Icon name="ShieldAlert" className="h-5 w-5 mr-2" />
                  Срочная помощь 24/7
                </div>
                <h1 className="text-5xl font-bold mb-6 leading-tight">
                  Уголовный адвокат — защитим ваши права и свободу
                </h1>
                <p className="text-xl text-gray-200 mb-8">
                  Профессиональная защита на всех стадиях уголовного процесса. Выезжаем немедленно в любое время суток. 78% дел закрыты или смягчено наказание
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg bg-red-600 hover:bg-red-700" asChild>
                    <a href="tel:+7 (383) 235-95-05">
                      <Icon name="Phone" className="h-5 w-5 mr-2" />
                      Срочный вызов адвоката
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg text-white border-white hover:bg-white hover:text-gray-900" asChild>
                    <a href="#form">
                      <Icon name="MessageSquare" className="h-5 w-5 mr-2" />
                      Консультация
                    </a>
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-red-600 mb-2">15+</div>
                      <div className="text-sm text-muted-foreground">лет опыта</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-red-600 mb-2">78%</div>
                      <div className="text-sm text-muted-foreground">дел выиграно</div>
                    </div>
                    <div className="text-center col-span-2">
                      <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
                      <div className="text-sm text-muted-foreground">на связи</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Situations */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Когда нужен адвокат</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">Защита на всех стадиях уголовного дела</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {situations.map((item, i) => (
                <Card key={i} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-red-600">
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

        {/* Categories */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">По каким делам защищаем</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {categories.map((cat, i) => (
                <Card key={i} className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* USP */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Почему выбирают нас</h2>
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

        {/* Process */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Как мы работаем</h2>
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

        {/* Urgency CTA */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Вас задержали или вызвали на допрос?</h2>
            <p className="text-xl mb-8 opacity-90">Не давайте показаний без адвоката! Звоните прямо сейчас — выезжаем немедленно</p>
            <Button size="lg" className="text-lg bg-white text-red-600 hover:bg-gray-100" asChild>
              <a href="tel:+7 (383) 235-95-05">
                <Icon name="Phone" className="h-5 w-5 mr-2" />
                +7 993 190 35 00
              </a>
            </Button>
          </div>
        </section>

        {/* Form */}
        <section id="form" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-4">Получите консультацию</h2>
              <p className="text-center text-muted-foreground mb-8 text-lg">Разберём вашу ситуацию и предложим стратегию защиты</p>
              <form id="criminal-lawyer-form" name="criminal-lawyer-form" onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-8 space-y-4">
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
                  placeholder="Кратко опишите ситуацию"
                  value={formData.case}
                  onChange={(e) => setFormData({ ...formData, case: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border h-24"
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