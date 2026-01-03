import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { X } from "lucide-react";

interface AudienceSelectorProps {
  onSelect: (type: "business" | "citizens") => void;
  alwaysShow?: boolean;
}

const AudienceSelector = ({
  onSelect,
  alwaysShow = false,
}: AudienceSelectorProps) => {
  const [isOpen, setIsOpen] = useState(alwaysShow);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    // Определение типа устройства
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (!alwaysShow) {
      const hasSelected = localStorage.getItem("audienceType");
      if (!hasSelected) {
        setIsOpen(true);
      }
    } else {
      setIsOpen(true);
    }

    return () => window.removeEventListener("resize", checkDevice);
  }, [alwaysShow]);

  const handleSelect = (type: "business" | "citizens") => {
    localStorage.setItem("audienceType", type);
    if (!alwaysShow) {
      setIsOpen(false);
    }
    onSelect(type);

    if (typeof window !== "undefined" && window.ym) {
      window.ym(106063131, "reachGoal", `audience_${type}`);
    }
  };

  const handleClose = () => {
    if (!alwaysShow) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6">
      {/* Основной контейнер с адаптивными размерами */}
      <div
        className={`
        bg-white rounded-2xl shadow-2xl 
        w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl 
        max-h-[95vh] overflow-y-auto
        animate-in fade-in zoom-in duration-300
        ${isMobile ? "p-4" : isTablet ? "p-6" : "p-8 md:p-10 lg:p-12"}
      `}
      >
        {/* Кнопка закрытия (только если не alwaysShow) */}
        {!alwaysShow && (
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 md:right-6 md:top-6 z-10
              p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 
              transition-colors duration-200"
            aria-label="Закрыть"
          >
            <X
              size={isMobile ? 18 : isTablet ? 20 : 24}
              className="text-gray-600"
            />
          </button>
        )}

        {/* Заголовок */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
            <Icon
              name="Scale"
              size={isMobile ? 36 : isTablet ? 42 : 48}
              className="text-blue-600"
            />
            <h2
              className="
              text-2xl sm:text-3xl md:text-4xl 
              font-bold text-gray-900
              mt-2 sm:mt-0
            "
            >
              ЮрСервис НСК
            </h2>
          </div>
          <p
            className="
            text-base sm:text-lg md:text-xl 
            font-semibold text-gray-800 mb-2
          "
          >
            Юридическая компания полного цикла
          </p>
          <p
            className="
            text-sm sm:text-base md:text-lg 
            text-gray-600
          "
          >
            Выберите, кто вы:
          </p>
        </div>

        {/* Карточки выбора */}
        <div
          className={`
          grid ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} 
          gap-3 sm:gap-4 md:gap-6
        `}
        >
          {/* Для бизнеса */}
          <button
            onClick={() => handleSelect("business")}
            className="
              group relative w-full
              bg-gradient-to-br from-blue-50 to-blue-100 
              hover:from-blue-100 hover:to-blue-200 
              border-2 border-blue-200 hover:border-blue-400 
              rounded-xl md:rounded-2xl
              p-4 sm:p-6 md:p-8
              transition-all duration-300 
              hover:shadow-xl 
              ${isMobile ? '' : 'hover:scale-[1.02]'}
              active:scale-[0.98]
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            "
          >
            <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
              <div
                className="
                w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 
                bg-blue-600 rounded-full 
                flex items-center justify-center 
                group-hover:scale-110 transition-transform duration-300
              "
              >
                <Icon
                  name="Building2"
                  size={isMobile ? 24 : isTablet ? 32 : 40}
                  className="text-white"
                />
              </div>

              <div className="w-full">
                <h3
                  className="
                  text-lg sm:text-xl md:text-2xl 
                  font-bold text-gray-900 mb-1 sm:mb-2
                "
                >
                  Для бизнеса
                </h3>
                <p
                  className="
                  text-sm sm:text-base 
                  text-gray-600 mb-3 sm:mb-4
                "
                >
                  Юридическое сопровождение организаций
                </p>

                <div
                  className="
                  space-y-1.5 sm:space-y-2 
                  text-left mx-auto 
                  max-w-xs sm:max-w-sm md:max-w-none
                "
                >
                  {[
                    "Арбитражные споры",
                    "Договоры и сделки",
                    "Банкротство",
                    "Налоговые споры",
                    "Абонентское обслуживание",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-1.5 sm:gap-2"
                    >
                      <Icon
                        name="CheckCircle2"
                        size={isMobile ? 14 : 16}
                        className="text-blue-600 mt-0.5 flex-shrink-0"
                      />
                      <span
                        className="
                        text-xs sm:text-sm 
                        text-gray-700 leading-tight
                      "
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="
                flex items-center gap-1.5 sm:gap-2 
                text-blue-600 font-semibold 
                mt-2 sm:mt-3
              "
              >
                <span className="text-sm sm:text-base">Перейти</span>
                <Icon name="ArrowRight" size={isMobile ? 16 : 20} />
              </div>
            </div>
          </button>

          {/* Для граждан */}
          <button
            onClick={() => handleSelect("citizens")}
            className="
              group relative w-full
              bg-gradient-to-br from-green-50 to-green-100 
              hover:from-green-100 hover:to-green-200 
              border-2 border-green-200 hover:border-green-400 
              rounded-xl md:rounded-2xl
              p-4 sm:p-6 md:p-8
              transition-all duration-300 
              hover:shadow-xl 
              ${isMobile ? '' : 'hover:scale-[1.02]'}
              active:scale-[0.98]
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
            "
          >
            <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
              <div
                className="
                w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 
                bg-green-600 rounded-full 
                flex items-center justify-center 
                group-hover:scale-110 transition-transform duration-300
              "
              >
                <Icon
                  name="Users"
                  size={isMobile ? 24 : isTablet ? 32 : 40}
                  className="text-white"
                />
              </div>

              <div className="w-full">
                <h3
                  className="
                  text-lg sm:text-xl md:text-2xl 
                  font-bold text-gray-900 mb-1 sm:mb-2
                "
                >
                  Для граждан
                </h3>
                <p
                  className="
                  text-sm sm:text-base 
                  text-gray-600 mb-3 sm:mb-4
                "
                >
                  Юридическая помощь физическим лицам
                </p>

                <div
                  className="
                  space-y-1.5 sm:space-y-2 
                  text-left mx-auto 
                  max-w-xs sm:max-w-sm md:max-w-none
                "
                >
                  {[
                    "Автоюрист: ДТП, ОСАГО",
                    "Взыскание долгов",
                    "Залив квартиры, ЖКХ",
                    "Семейные споры",
                    "Банкротство",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-1.5 sm:gap-2"
                    >
                      <Icon
                        name="CheckCircle2"
                        size={isMobile ? 14 : 16}
                        className="text-green-600 mt-0.5 flex-shrink-0"
                      />
                      <span
                        className="
                        text-xs sm:text-sm 
                        text-gray-700 leading-tight
                      "
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="
                flex items-center gap-1.5 sm:gap-2 
                text-green-600 font-semibold 
                mt-2 sm:mt-3
              "
              >
                <span className="text-sm sm:text-base">Перейти</span>
                <Icon name="ArrowRight" size={isMobile ? 16 : 20} />
              </div>
            </div>
          </button>
        </div>

        {/* Подвал */}
        <div className="mt-6 sm:mt-8 md:mt-10 text-center">
          <p
            className="
            text-xs sm:text-sm 
            text-gray-500
          "
          >
            Вы всегда сможете переключиться позже
          </p>

          {/* Кнопка "Позже" для мобильных */}
          {!alwaysShow && isMobile && (
            <button
              onClick={handleClose}
              className="
                mt-4 px-4 py-2 
                text-sm text-gray-600 
                hover:text-gray-900 
                transition-colors duration-200
              "
            >
              Выбрать позже →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudienceSelector;
