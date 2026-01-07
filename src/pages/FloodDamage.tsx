import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle, Shield, Calendar, FileText, Phone } from "lucide-react";

export default function FloodDamagePage() {
  const handleDownloadSubmit = (e) => {
    e.preventDefault();
    // Здесь логика сбора email и отправки файла
    console.log("Форма отправлена");
  };

  return (
    <>
      <Helmet>
        <title>
          Затопили квартиру в Новосибирске? Юридическая помощь с 2016 года | +7
          (383) 235-95-05
        </title>
        <meta
          name="description"
          content="Профессиональное взыскание ущерба от потопа с 2016 года. Работаем без предоплаты. Вернем деньги за ремонт, штраф 50% и моральный вред. Звоните: +7 (383) 235-95-05"
        />
      </Helmet>

      {/* 1. HERO БЛОК */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Вашу квартиру затопили?
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Взыщем <strong>полную компенсацию</strong> с виновника. Опыт работы по
          таким делам — <strong>с 2016 года</strong>.
        </p>
        <p className="text-2xl font-bold text-primary mb-8">
          Работаем без предоплаты. Платите только за результат.
        </p>

        {/* Телефон - крупно и заметно */}
        <div className="mb-10">
          <a
            href="tel:+73832359505"
            className="inline-flex items-center text-3xl font-bold text-gray-900 hover:text-primary transition-colors"
          >
            <Phone className="mr-3 h-8 w-8" /> +7 (383) 235-95-05
          </a>
          <p className="text-gray-600">Звоните для срочной консультации</p>
        </div>

        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-lg px-8"
        >
          Бесплатно рассчитать сумму взыскания
        </Button>
      </section>

      {/* 3. БЛОК ГАРАНТИЙ С АКЦЕНТОМ НА 8 ЛЕТ */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          Мы берем на себя риски и гарантируем результат
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center border-t-4 border-t-blue-500 pt-6">
            <CardContent>
              <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <p className="text-4xl font-black text-gray-900">8</p>
              <p className="font-bold">лет успешной работы</p>
              <p className="text-sm text-gray-600">
                Специализируемся на заливах с 2016 года
              </p>
            </CardContent>
          </Card>
          <Card className="text-center border-t-4 border-t-green-500 pt-6">
            <CardContent>
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-2xl font-bold">Оплата по результату</p>
              <p className="text-sm text-gray-600">
                Если деньги не взысканы — вы нам не платите
              </p>
            </CardContent>
          </Card>
          <Card className="text-center border-t-4 border-t-amber-500 pt-6">
            <CardContent>
              <Shield className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <p className="text-2xl font-bold">Штраф 50% в вашу пользу</p>
              <p className="text-sm text-gray-600">
                Добьемся в суде по Закону о защите прав потребителей
              </p>
            </CardContent>
          </Card>
          <Card className="text-center border-t-4 border-t-purple-500 pt-6">
            <CardContent>
              <FileText className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <p className="text-2xl font-bold">Знаем все суды Новосибирска</p>
              <p className="text-sm text-gray-600">
                Понимаем специфику каждого районного суда
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 7. БЛОК С ЛИД-МАГНИТОМ (ШАБЛОНОМ ПРЕТЕНЗИИ) */}
      <section className="container mx-auto px-4 py-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl my-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <FileText className="h-14 w-14 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Скачайте профессиональный шаблон досудебной претензии
            </h2>
            <p className="text-gray-700 text-lg">
              <strong>Первый и самый важный шаг</strong> — официальное
              требование к виновнику. Наш шаблон составлен юристом и содержит:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Левая часть - преимущества шаблона */}
            <div>
              <ul className="space-y-4">
                {[
                  "✅ Правильную структуру и формулировки",
                  "✅ Ссылки на необходимые статьи ГК РФ и ЖК РФ",
                  "✅ Подсказки, как рассчитать сумму неустойки",
                  "✅ Место для ваших данных и данных виновника",
                  "✅ <strong>Важно:</strong> Без правильно оформленной претензии суд не взыщет штраф 50%",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start"
                    dangerouslySetInnerHTML={{ __html: item }}
                  ></li>
                ))}
              </ul>
              <p className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <strong>Внимание:</strong> Шаблон дает старт, но не гарантирует
                успех. Ситуации уникальны. Если виновник проигнорирует
                претензию,{" "}
                <strong>необходима полноценная юридическая поддержка.</strong>
              </p>
            </div>

            {/* Правая часть - форма */}
            <Card className="p-6 shadow-lg">
              <CardContent>
                <h3 className="text-xl font-bold mb-4 text-center">
                  Получить шаблон претензии + памятку по заполнению
                </h3>
                <form onSubmit={handleDownloadSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Ваше имя</label>
                    <Input type="text" placeholder="Иван Иванов" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Email для отправки
                    </label>
                    <Input
                      type="email"
                      placeholder="example@mail.ru"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary">
                    Скачать бесплатный шаблон
                  </Button>
                </form>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Нажимая, вы соглашаетесь на обработку персональных данных.
                  Шаблон придет на email в течение 5 минут.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
