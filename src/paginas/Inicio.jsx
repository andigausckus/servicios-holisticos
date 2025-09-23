import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div className="w-full font-montserrat">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-100 text-center px-6">
        <div className="max-w-4xl">
          {/* H1 principal */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Encuentra el terapeuta ideal para tu bienestar
          </h1>

          {/* Descripción */}
          <p className="text-base md:text-lg text-gray-600 mb-8">
            Conecta con terapeutas de confianza, descubre servicios holísticos y
            reserva tu sesión fácilmente.
          </p>

          {/* Subtítulo */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            ¿Qué tipo de terapia buscas?
          </h2>

          {/* Botones en línea */}
          <div className="flex gap-6 justify-center">
            <Link
              to="/servicios?modalidad=online"
              className="w-40 text-center bg-teal-600 text-white py-3 rounded-full shadow-md hover:bg-teal-700 transition font-medium"
            >
              Online
            </Link>
            <Link
              to="/mapa"
              className="w-40 text-center bg-teal-600 text-white py-3 rounded-full shadow-md hover:bg-teal-700 transition font-medium"
            >
              Presencial
            </Link>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-16 bg-white text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          ¿Cómo funciona?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-teal-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-teal-600 mb-3">1. Busca</h3>
            <p className="text-gray-700 text-base">
              Explora terapias online o presenciales según tu necesidad.
            </p>
          </div>
          <div className="bg-teal-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-teal-600 mb-3">
              2. Descubre
            </h3>
            <p className="text-gray-700 text-base">
              Conoce a los terapeutas y sus servicios con información detallada.
            </p>
          </div>
          <div className="bg-teal-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-teal-600 mb-3">
              3. Reserva
            </h3>
            <p className="text-gray-700 text-base">
              Elegí tu servicio y agenda tu sesión fácilmente por WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Especialidades más buscadas */}
      <section className="py-16 bg-gradient-to-r from-cyan-100 via-sky-100 to-teal-200 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          Especialidades más buscadas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <img
              src="https://i.postimg.cc/tJZc6th9/wellness-285590-1920.jpg"
              alt="Reiki"
              className="w-28 h-28 object-cover rounded-full mb-3 shadow"
            />
            <p className="font-medium text-gray-700 text-base">Reiki</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://i.postimg.cc/7ZtFGdyF/woman-2573216.jpg"
              alt="Yoga"
              className="w-28 h-28 object-cover rounded-full mb-3 shadow"
            />
            <p className="font-medium text-gray-700 text-base">Yoga</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://i.postimg.cc/mDJztGYp/monk-7465757-1920.jpg"
              alt="Meditación"
              className="w-28 h-28 object-cover rounded-full mb-3 shadow"
            />
            <p className="font-medium text-gray-700 text-base">Meditación</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://i.postimg.cc/7Y6B71rF/woman-2722936-1920.jpg"
              alt="Masajes"
              className="w-28 h-28 object-cover rounded-full mb-3 shadow"
            />
            <p className="font-medium text-gray-700 text-base">Masajes</p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-gradient-to-r from-stone-100 via-gray-200 to-zinc-200 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          ¿Listo para comenzar tu camino de bienestar?
        </h2>
        <p className="text-base md:text-lg text-gray-700 mb-8 max-w-xl mx-auto">
          Encontrá el terapeuta ideal y reservá tu sesión ahora mismo.
        </p>
        <Link
          to="/mapa"
          className="bg-teal-600 text-white px-8 py-4 rounded-full text-lg shadow-md hover:bg-teal-700 transition font-medium"
        >
          Comenzar ahora
        </Link>
      </section>
    </div>
  );
}