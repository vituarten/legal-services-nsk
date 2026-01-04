// В BusinessServices.tsx добавьте к карточкам:
const BusinessServices = () => {
  // ... existing code ...

  return (
    <section className="py-24 bg-white">
      {/* ... existing code ... */}

      <div className="grid md:grid-cols-2 gap-8 mb-20">
        {services.map((service, index) => (
          <div key={index} className="group">
            <div
              className={`${service.color} rounded-2xl p-1 mb-4 transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl`}
            >
              <div className="bg-white rounded-xl p-8 h-full group-hover:shadow-inner transition-shadow">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-16 h-16 ${service.color.split(" ")[0]} rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform`}
                  >
                    <Icon
                      name={service.icon}
                      className="h-8 w-8 text-white group-hover:scale-125 transition-transform"
                    />
                  </div>
                  <span className="text-xs font-semibold text-white px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-700 transition-all">
                    {service.highlight}
                  </span>
                </div>

                {/* ... rest of the card ... */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ... rest of the component ... */}
    </section>
  );
};
