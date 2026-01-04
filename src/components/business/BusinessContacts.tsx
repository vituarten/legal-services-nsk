// В BusinessContacts.tsx добавьте:
const BusinessContacts = () => {
  // ... existing code ...

  return (
    <section className="py-24 bg-slate-900 text-white">
      {/* ... existing code ... */}

      {/* В форме добавьте: */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ... form fields ... */}

        <Button
          type="submit"
          size="lg"
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-lg py-6 rounded-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <Icon name="Send" size={20} className="mr-2" />
          Получить бесплатную консультацию
        </Button>

        <p className="text-sm text-slate-400 text-center">
          Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
          <br />
          <span className="text-blue-300 font-semibold">
            Мы свяжемся с вами в течение 1 часа!
          </span>
        </p>
      </form>

      {/* ... rest of the component ... */}
    </section>
  );
};
