import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import SEOHead from "@/components/SEOHead";
import { toast } from "sonner";

const DTPLanding = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    callTime: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Заявка отправлена! Мы свяжемся с вами в течение 15 минут.");
    setFormData({ name: "", phone: "", callTime: "" });
  };

  const scrollToForm = () => {
    document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SEOHead
        title="Юридическая помощь после ДТП — работаем только за результат"
        description="Профессиональная юридическая помощь после ДТП. Без аванса, оплата только за результат. Консультация, документы, суд — все под ключ."
        keywords="юридическая помощь при ДТП, услуги адвоката по ДТП, помощь после ДТП, юрист по ДТП"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Юридическая помощь после ДТП — без риска для вас!
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Оставьте все сложности нам, мы доведем ваше дело до результата
              </p>
              <Button
                size="lg"
                onClick={scrollToForm}
                className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 h-auto shadow-2xl"
              >
                Получить бесплатную консультацию
                <Icon name="ArrowRight" className="ml-2" />
              </Button>

              <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Icon name="Shield" className="mb-3 text-blue-200" size={32} />
                  <h3 className="font-bold mb-2">Без предоплаты</h3>
                  <p className="text-sm text-blue-100">Оплата только за результат</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Icon name="Clock" className="mb-3 text-blue-200" size={32} />
                  <h3 className="font-bold mb-2">Более 5 лет</h3>
                  <p className="text-sm text-blue-100">Успешной работы на рынке</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Icon name="TrendingUp" className="mb-3 text-blue-200" size={32} />
                  <h3 className="font-bold mb-2">98% успеха</h3>
                  <p className="text-sm text-blue-100">Выигранных дел</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Сложности после ДТП?
                </h2>
                <p className="text-xl text-gray-600">
                  ДТП — это не просто повреждение автомобиля. Это еще и споры со страховыми компаниями, 
                  сложные формулировки документов и затягивание выплат.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Clock" className="text-red-600" size={32} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Долгое ожидание</h3>
                  <p className="text-gray-600 text-sm">
                    Месяцы переписок и ожидания решения от страховой компании
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="FileText" className="text-orange-600" size={32} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Сложные документы</h3>
                  <p className="text-gray-600 text-sm">
                    Непонятные юридические термины и бюрократические процедуры
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="DollarSign" className="text-yellow-600" size={32} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Занижение выплат</h3>
                  <p className="text-gray-600 text-sm">
                    Страховые компании стараются выплатить минимум возможного
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Почему выбирают нас?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Мы берем на себя все юридические вопросы — от консультации до суда. 
                  Никакой предоплаты. Оплата только за результат!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="MessageSquare" className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Консультации по ДТП
                        </h3>
                        <p className="text-gray-600">
                          Бесплатная первичная консультация и оценка перспектив вашего дела
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="FileCheck" className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Оформление документов
                        </h3>
                        <p className="text-gray-600">
                          Подготовим все необходимые документы: иски, жалобы, заявления
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Handshake" className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Переговоры со страховыми
                        </h3>
                        <p className="text-gray-600">
                          Ведем переговоры и добиваемся справедливой компенсации
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Scale" className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Представительство в суде
                        </h3>
                        <p className="text-gray-600">
                          Полное юридическое сопровождение в судебных инстанциях
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Ваши гарантии — наш результат!
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Award" className="text-blue-600" size={32} />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">5+ лет</div>
                  <p className="text-gray-700 font-medium">Более 5 лет на рынке</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="ShieldCheck" className="text-green-600" size={32} />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">Без аванса</div>
                  <p className="text-gray-700 font-medium">Прозрачные условия работы</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Zap" className="text-purple-600" size={32} />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">Быстро</div>
                  <p className="text-gray-700 font-medium">Экономия вашего времени</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="TrendingUp" className="text-red-600" size={32} />
                  </div>
                  <div className="text-3xl font-bold text-red-600 mb-2">98%</div>
                  <p className="text-gray-700 font-medium">Высокий процент побед</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* USP Section */}
        <section className="py-20 bg-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="BadgeCheck" size={40} className="text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Работаем только за результат!
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Вы не рискуете своими финансами: оплата услуг только после успешного завершения дела
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">0₽</div>
                    <p className="text-blue-100">Предоплата</p>
                  </div>
                  <Icon name="ArrowRight" size={32} className="text-blue-200 rotate-90 md:rotate-0" />
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">100%</div>
                    <p className="text-blue-100">После победы</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Form Section */}
        <section id="consultation-form" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Готовы начать?
                </h2>
                <p className="text-xl text-gray-600">
                  Оставьте заявку на бесплатную консультацию, и мы ответим вам в течение 15 минут!
                </p>
              </div>

              <Card className="border-2 border-blue-200 shadow-xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-base font-medium">
                        Ваше имя
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-2 h-12 text-base"
                        placeholder="Иван Иванов"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-base font-medium">
                        Телефон
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-2 h-12 text-base"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>

                    <div>
                      <Label htmlFor="callTime" className="text-base font-medium">
                        Удобное время для звонка
                      </Label>
                      <Input
                        id="callTime"
                        type="text"
                        value={formData.callTime}
                        onChange={(e) => setFormData({ ...formData, callTime: e.target.value })}
                        className="mt-2 h-12 text-base"
                        placeholder="Например: с 10:00 до 18:00"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-red-600 hover:bg-red-700 text-white text-lg h-14"
                    >
                      Получить бесплатную консультацию
                      <Icon name="Send" className="ml-2" />
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Что говорят наши клиенты?
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-2 border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon key={star} name="Star" className="text-yellow-400 fill-yellow-400" size={20} />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">
                      "Спасибо вам за помощь! Выиграли моё дело, получил возмещение целиком. 
                      Профессионалы своего дела!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-blue-600">АС</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Александр С.</p>
                        <p className="text-sm text-gray-500">Москва</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon key={star} name="Star" className="text-yellow-400 fill-yellow-400" size={20} />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">
                      "Страховая занижала выплату в 3 раза. Юристы помогли взыскать полную сумму 
                      через суд. Очень довольна!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-pink-600">МП</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Мария П.</p>
                        <p className="text-sm text-gray-500">Санкт-Петербург</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon key={star} name="Star" className="text-yellow-400 fill-yellow-400" size={20} />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">
                      "Отличная команда! Все сделали быстро и качественно. Не пришлось даже 
                      ходить на судебные заседания."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-green-600">ДК</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Дмитрий К.</p>
                        <p className="text-sm text-gray-500">Новосибирск</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contacts Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Контакты
                </h2>
                <p className="text-xl text-gray-600">
                  Свяжитесь с нами удобным способом
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-blue-100">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Наши контакты</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name="Phone" className="text-blue-600" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Телефон</p>
                          <a href="tel:+79994523500" className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                            +7 999 452 35 00
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name="Send" className="text-blue-600" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Telegram</p>
                          <a 
                            href="https://t.me/+79931903500" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                          >
                            +7 993 190 35 00
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name="Mail" className="text-blue-600" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Email</p>
                          <a href="mailto:info@юрист-нск.рф" className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                            info@юрист-нск.рф
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name="MapPin" className="text-blue-600" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Адрес офиса</p>
                          <p className="text-lg font-semibold text-gray-900">
                            г. Новосибирск, ул. Красный проспект, 82
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <div className="flex gap-4">
                        <Button
                          asChild
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          <a href="tel:+79994523500">
                            <Icon name="Phone" className="mr-2" size={20} />
                            Позвонить
                          </a>
                        </Button>
                        <Button
                          asChild
                          className="flex-1 bg-blue-500 hover:bg-blue-600"
                        >
                          <a href="https://t.me/+79931903500" target="_blank" rel="noopener noreferrer">
                            <Icon name="Send" className="mr-2" size={20} />
                            Telegram
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="h-[500px] rounded-xl overflow-hidden border-2 border-gray-200">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A8e0c5f5b5e5c5c5c5c5c5c5c5c5c5c5c&amp;source=constructor"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Карта офиса"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Получите бесплатную консультацию уже сегодня!
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Не откладывайте решение своей проблемы. Мы работаем для вашего успеха.
            </p>
            <Button
              size="lg"
              onClick={scrollToForm}
              className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 h-auto"
            >
              Оставить заявку
              <Icon name="ArrowRight" className="ml-2" />
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default DTPLanding;
