import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  AlertTriangle,
  FileText,
  Shield,
  Zap,
  Home,
} from "lucide-react";

export default function FloodDamage() {
  return (
    <>
      <Helmet>
        <title>
          Возмещение ущерба от потопов в Новосибирске | Профессиональная помощь
        </title>
        <meta
          name="description"
          content="Вас затопили? Стены, потолок, дорогая техника — все испорчено. Знакомо чувство беспомощности и гнева? Мы берем на себя весь процесс: от фиксации ущерба до взыскания денег через суд. Работаем без предоплаты. Вернем вам спокойствие и деньги."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Эмоциональный Hero-блок */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Вас затопили соседи или УК?
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            <span className="font-semibold">
              Потолок обвалился, испорчен ремонт, не работает техника
            </span>{" "}
            — а виновник отказывается платить или тянет время? Вы не одни.
            Ежегодно с этой проблемой сталкиваются тысячи людей.
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            <span className="text-primary font-bold">
              Не надейтесь на советы из интернета и не пытайтесь решить это
              сами.
            </span>{" "}
            Без правильного плана и юридического сопровождения вы рискуете
            остаться ни с чем, потратив нервы, время и деньги на бесполезный
            ремонт.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 border-l-4 border-l-red-500 shadow-lg">
              <CardContent className="p-0">
                <AlertTriangle className="h-10 w-10 text-red-500 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Ошибки на старте</h3>
                <p className="text-gray-600">
                  Не вызвали аварийку официально, не зафиксировали ущерб
                  детально, не добились правильного акта от УК — и остались без
                  доказательств.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 border-l-4 border-l-amber-500 shadow-lg">
              <CardContent className="p-0">
                <FileText className="h-10 w-10 text-amber-500 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Юридическая ловушка</h3>
                <p className="text-gray-600">
                  Не знаете, как определить виновника (сосед, УК, застройщик?),
                  как правильно оценить ущерб и составить претензию.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 border-l-4 border-l-green-500 shadow-lg">
              <CardContent className="p-0">
                <Shield className="h-10 w-10 text-green-500 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Наше решение</h3>
                <p className="text-gray-600">
                  Полное сопровождение «под ключ»: экспертиза, претензия, суд,
                  работа с приставами. Вы платите только после получения ваших
                  денег.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
            >
              <Zap className="mr-3" />
              Получить план действий и расчет стоимости
            </Button>
            <p className="text-gray-500 text-sm mt-4">
              Первая консультация — бесплатно и ни к чему вас не обязывает
            </p>
          </div>
        </section>

        {/* Блок "Кто виноват и что делать" */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Кто виноват в затоплении и как это доказать?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <Home className="mr-3 text-primary" /> Частые виновники:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">
                      Собственник квартиры сверху
                    </span>{" "}
                    — отвечает за протечки из-за неисправной сантехники, бытовой
                    техники или собственной халатности[citation:3][citation:8].
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">
                      Управляющая компания (УК)
                    </span>{" "}
                    — виновата, если протечка произошла из-за неисправности{" "}
                    <strong>общедомового имущества</strong> (стояки до первого
                    отключающего крана, общедомовые счетчики,
                    крыша)[citation:3][citation:6].
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">
                      Застройщик или подрядчик
                    </span>{" "}
                    — если затопление произошло из-за строительного брака или
                    некачественного ремонта[citation:2].
                  </div>
                </li>
              </ul>
            </div>
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-amber-800">
                  Важно помнить:
                </h3>
                <ul className="space-y-3 text-amber-800">
                  <li>
                    ✅ Даже если виноваты арендаторы, иск предъявляется
                    собственнику жилья[citation:1][citation:6].
                  </li>
                  <li>
                    ✅ УК и Фонд капремонта почти никогда не платят добровольно
                    — готовьтесь к суду[citation:2].
                  </li>
                  <li>
                    ✅ В суде можно взыскать не только стоимость ремонта, но и
                    моральный вред, штрафы и все судебные издержки[citation:1].
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Блок "Наши услуги и гарантии" */}
        <section className="container mx-auto px-4 py-12 bg-gray-50 rounded-2xl my-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Как мы вам помогаем (работаем без предоплаты)
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: FileText,
                title: "Анализ и стратегия",
                desc: "Определяем всех виновников, разрабатываем план взыскания.",
              },
              {
                icon: Shield,
                title: "Доказательства и экспертиза",
                desc: "Организуем независимую оценку ущерба с привлечением виновника.",
              },
              {
                icon: Zap,
                title: "Переговоры и суд",
                desc: "Ведем все переговоры, составляем иски, представляем ваши интересы в суде.",
              },
              {
                icon: CheckCircle,
                title: "Исполнительное производство",
                desc: "Добиваемся выплат через судебных приставов, если виновник не платит.",
              },
            ].map((service, idx) => (
              <Card
                key={idx}
                className="text-center border-t-4 border-t-primary"
              >
                <CardContent className="p-6">
                  <service.icon className="h-12 w-12 text-primary mb-4 mx-auto" />
                  <h4 className="font-bold text-lg mb-2">{service.title}</h4>
                  <p className="text-gray-600 text-sm">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              Обсудить мою ситуацию с юристом
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
