{
  /* Финальный блок - Уникальное сочетание возможностей */
}
<div className="mt-12 sm:mt-14 md:mt-16 lg:mt-20">
  <div className="bg-gradient-to-r from-primary/10 via-blue-50/30 to-primary/5 rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 border border-primary/20">
    <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
      <div className="lg:w-1/4 flex justify-center">
        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
            <Icon
              name="ShieldCheck"
              className="h-8 w-8 sm:h-10 sm:w-10 text-white"
            />
          </div>
          <div className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 border border-primary/20">
            <Icon name="Star" className="h-4 w-4 text-amber-500" />
          </div>
        </div>
      </div>

      <div className="lg:w-3/4 text-center lg:text-left">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4">
          Уникальное сочетание возможностей
        </h3>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-5">
          <div className="bg-white p-4 sm:p-5 rounded-lg border border-blue-100 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Building2" className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">
                  Юридическая экспертиза
                </div>
                <div className="text-xs text-primary font-medium">
                  ООО "Правоотношение"
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Более 8 лет успешной практики во всех сферах права
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="Shield" className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">
                  Государственная поддержка
                </div>
                <div className="text-xs text-blue-600 font-medium">
                  Народная дружина
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Аккредитация МВД Новосибирской области с 18 марта 2016 года
            </p>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-primary/20">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white px-5 py-3 sm:px-6 sm:py-4 rounded-xl border border-primary/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Scale" className="h-4 w-4 text-primary" />
              </div>
              <div className="text-sm font-semibold text-primary">
                ЮрСервис НСК =
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">
                  Экспертиза в праве
                </span>
                <Icon name="Plus" className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">
                  Государственная поддержка
                </span>
                <Icon name="Equal" className="h-4 w-4 text-primary" />
              </div>
              <div className="text-sm font-bold text-primary">
                Ваша уверенность в результате
              </div>
            </div>
          </div>

          <div className="mt-3 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Объединение профессиональной юридической помощи и официальной
              поддержки
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>;
