import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import servicios from "../datos/servicios.json";
import terapeutas from "../datos/terapeutas.json";
import slugify from "slugify";

export default function Inicio() {
  const [openIndex, setOpenIndex] = useState(null);

  // Filtro servicios nuevos y que aún tienen menos de 3 días de antigüedad
  const ahora = new Date();
  const nuevosServicios = servicios.filter((s) => {
    if (!s.esNuevo) return false;
    const creado = new Date(s.fechaCreacion || ahora); // fechaCreacion opcional en JSON
    const diffDias = (ahora - creado) / (1000 * 60 * 60 * 24);
    return diffDias <= 3;
  });

  const onlineServicios = nuevosServicios.filter(s => s.modalidad === "Online");
  const presencialServicios = nuevosServicios.filter(s => s.modalidad === "Presencial");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const faqs = [
    {
      q: "¿Necesito registrarme para usar la plataforma?",
      a: "No, no es necesario registrarse. Podés acceder a todos los servicios directamente.",
    },
    {
      q: "¿Cómo se abona la sesión?",
      a: "La sesión se abona por WhatsApp al reservar, de forma rápida y segura.",
    },
    {
      q: "¿Cuándo recibo los datos del terapeuta?",
      a: "Una vez realizado el pago, recibirás los datos completos del terapeuta.",
    },
    {
      q: "¿Qué métodos de pago se aceptan?",
      a: "Podés pagar con dinero en cuenta de Mercado Pago, transferencia CBU/CVU o con tarjeta de débito.",
    },
    {
      q: "¿Dónde veo la disponibilidad y detalles del servicio?",
      a: "La disponibilidad horaria, duración, ubicación y descripción se encuentran en los detalles de cada servicio.",
    },
  ];

  return (
    <div className="w-full font-montserrat mb-24 overflow-x-hidden">
      {/* SEO dinámico */}
      <Helmet>
        <title>Servicios Holisticos | Encuentra terapeutas de confianza</title>
        <meta
          name="description"
          content="Conecta con terapeutas y reserva sesiones de Reiki, Yoga, Tarot y más. Online o presencial."
        />
        <meta property="og:title" content="Servicios Holisticos" />
        <meta
          property="og:description"
          content="Descubre terapeutas y reserva tu sesión fácilmente. Reiki, Yoga, Tarot y más."
        />
        <meta
          property="og:image"
          content="https://www.serviciosholisticos.com.ar/android-chrome-512x512.png"
        />
        <meta
          property="og:url"
          content="https://www.serviciosholisticos.com.ar/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_AR" />
      </Helmet>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-100 text-center px-6">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Encuentra el terapeuta ideal para tu bienestar
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-8">
            Conecta con terapeutas de confianza, descubre servicios holísticos y
            reserva tu sesión fácilmente.
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            ¿Qué tipo de terapia buscas?
          </h2>
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

      {/* Slider Nuevos Servicios Online */}
      {onlineServicios.length > 0 && (
        <section className="py-16 bg-white">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
            Servicios online
          </h2>
          <div className="max-w-6xl mx-auto">
            <Slider {...settings}>
              {onlineServicios.map(s => (
                <div key={s.id} className="p-4 flex flex-col items-center text-center">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-green-500 text-white rounded-full mb-2">
                    Nuevo
                  </span>
                  <img
                    src={s.imagen}
                    alt={s.titulo}
                    className="w-full h-64 object-cover rounded-lg shadow mb-2"
                  />
                  <p className="text-sm text-teal-600 mb-1">{s.categoria}</p>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{s.titulo}</h3>
                  <p className="text-gray-600 mb-2">${s.precio}</p>
                  <p className="text-sm text-gray-500 mb-4">Online</p>
                  <Link
                    to={`/servicio/${slugify(s.titulo, { lower: true, strict: true })}`}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-full shadow hover:bg-yellow-700 transition"
                  >
                    Reservar ahora
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}

      {/* Slider Nuevos Servicios Presenciales */}
      {presencialServicios.length > 0 && (
        <section className="py-16 bg-white">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
            Servicios presenciales
          </h2>
          <div className="max-w-6xl mx-auto">
            <Slider {...settings}>
              {presencialServicios.map(s => {
                const terapeuta = terapeutas.find(t => t.slug === s.terapeutaSlug);
                return (
                  <div key={s.id} className="p-4 flex flex-col items-center text-center">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-green-500 text-white rounded-full mb-2">
                      Nuevo
                    </span>
                    <img
                      src={s.imagen}
                      alt={s.titulo}
                      className="w-full h-64 object-cover rounded-lg shadow mb-2"
                    />
                    <p className="text-sm text-teal-600 mb-1">{s.categoria}</p>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{s.titulo}</h3>
                    <p className="text-gray-600 mb-1">${s.precio}</p>
                    {terapeuta && (
                      <p className="text-sm text-gray-500 mb-4">
                        Presencial en {terapeuta.ciudad}, {terapeuta.provincia}
                      </p>
                    )}
                    <Link
                      to={`/servicio/${slugify(s.titulo, { lower: true, strict: true })}`}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-full shadow hover:bg-yellow-700 transition"
                    >
                      Reservar ahora
                    </Link>
                  </div>
                );
              })}
            </Slider>
          </div>
        </section>
      )}

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

      {/* FAQ */}
      <section className="py-16 px-6 bg-gradient-to-r from-slate-50 via-slate-100 to-slate-200">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Preguntas frecuentes
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="bg-white shadow rounded-lg p-4 cursor-pointer"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">{item.q}</h3>
                <span className="text-2xl text-teal-600">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </div>
              {openIndex === idx && (
                <p className="mt-3 text-gray-600">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-gradient-to-r from-orange-100 via-amber-100 to-red-100 text-center">
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