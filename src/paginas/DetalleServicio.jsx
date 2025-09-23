import { useParams, Link } from "react-router-dom";
import servicios from "../datos/servicios.json";
import terapeutas from "../datos/terapeutas.json";
import { useState } from "react";
import slugify from "../utils/slugify";

export default function DetalleServicio() {
  const { slug } = useParams();

  const servicio = servicios.find((s) => slugify(s.titulo) === slug);
  const [expandirDescripcion, setExpandirDescripcion] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [whatsappUsuario, setWhatsappUsuario] = useState("");

  if (!servicio) {
    return <p className="text-center mt-10">Servicio no encontrado</p>;
  }

  const terapeuta = terapeutas.find((t) => t.slug === servicio.terapeutaSlug);

  // Armamos el mensaje dinámico para WhatsApp
  const mensaje = `📩 Nueva reserva desde Servicios Holísticos

  🙋‍♂️ Cliente: ${nombreUsuario || "No especificado"}
  📲 Mi WhatsApp: ${whatsappUsuario || "No especificado"}

  ✨ Servicio: ${servicio.titulo}
  🧘‍♀️ Terapeuta: ${terapeuta ? terapeuta.nombre : "No especificado"}
  📅 Disponibilidad: ${terapeuta?.disponibilidad || "Consultar disponibilidad"}
  📍 Modalidad: ${servicio.modalidad}
  ${
    servicio.modalidad === "Presencial" && terapeuta
      ? `📌 Ubicación: ${terapeuta.ciudad}, ${terapeuta.provincia}`
      : ""
  }
  💰 Precio: $${servicio.precio.toLocaleString("es-AR")}
  `;

  const urlWhatsapp = `https://wa.me/5493548563662?text=${encodeURIComponent(
    mensaje
  )}`;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Imagen */}
      <img
        src={servicio.imagen}
        alt={servicio.titulo}
        className="w-full h-64 object-cover rounded-lg mb-6 shadow"
      />

      {/* Título y categoría */}
      <h1 className="text-2xl font-bold mb-2">{servicio.titulo}</h1>
      <p className="text-gray-600 mb-6">{servicio.categoria}</p>

      {/* Terapeuta */}
      <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="font-medium mb-2">Terapeuta</h2>
        {terapeuta ? (
          <Link
            to={`/terapeuta/${terapeuta.slug}`}
            className="text-teal-600 underline hover:text-teal-800"
          >
            {terapeuta.nombre}
          </Link>
        ) : (
          <p>No especificado</p>
        )}
      </div>

      {/* Disponibilidad */}
      <div className="mb-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
        <h2 className="font-medium mb-2">Disponibilidad</h2>
        <p>{terapeuta?.disponibilidad || "Consultar con el terapeuta"}</p>
        <p className="text-sm italic text-gray-500 mt-1">
          El día y la hora ideal de la sesión la confirmas con el terapeuta
          luego de abonar
        </p>
      </div>

      {/* Duración */}
      <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="font-medium mb-2">Duración de la sesión</h2>
        <p className="text-sm text-gray-700">
          {servicio.duracion || "No especificada"}
        </p>
      </div>

      {/* Descripción */}
      <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="font-medium mb-2">Descripción del servicio</h2>
        <p className="text-sm text-gray-700">
          {expandirDescripcion
            ? servicio.descripcion
            : servicio.descripcion
            ? servicio.descripcion.split(" ").slice(0, 20).join(" ") + "..."
            : "Sin descripción disponible"}
        </p>

        {servicio.descripcion && (
          <div className="flex justify-end">
            <button
              onClick={() => setExpandirDescripcion(!expandirDescripcion)}
              className="text-teal-600 mt-2 hover:underline focus:outline-none focus:ring-0"
            >
              {expandirDescripcion ? "Ver menos" : "Ver más"}
            </button>
          </div>
        )}
      </div>

      {/* Ubicación con mapa */}
      {servicio.modalidad === "Presencial" && terapeuta?.lat && terapeuta?.lng && (
        <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
          <h2 className="font-semibold mb-1">Ubicación</h2>
          <p className="text-sm text-gray-700">
            {terapeuta.ciudad}, {terapeuta.provincia}
          </p>

          <div className="mt-3 w-full h-48 rounded-lg overflow-hidden shadow">
            <iframe
              title="Mapa ubicación"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${terapeuta.lat},${terapeuta.lng}&output=embed`}
            ></iframe>
          </div>
        </div>
      )}

      {/* Campo nombre */}
      <div className="mb-6">
        <label
          htmlFor="nombreUsuario"
          className="block text-gray-700 font-medium mb-1"
        >
          Tu nombre
        </label>
        <input
          id="nombreUsuario"
          type="text"
          required
          placeholder="Ej: Maria"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-teal-500 focus:ring-0 focus:outline-none"
        />
      </div>

      {/* Campo WhatsApp */}
      <div className="mb-6">
        <label
          htmlFor="whatsappUsuario"
          className="block text-gray-700 font-medium mb-1"
        >
          Tu WhatsApp
        </label>
        <input
          id="whatsappUsuario"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]{10}"
          title="El número debe tener exactamente 10 dígitos"
          placeholder="Ej: 1155678946"
          value={whatsappUsuario}
          onChange={(e) =>
            setWhatsappUsuario(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-teal-500 focus:ring-0 focus:outline-none"
          required
        />
      </div>

      {/* Texto de pago */}
      <p className="text-md italic text-gray-500 mt-8">
        Para tu seguridad, Servicios Holístico gestionará el pago de esta sesión.
      </p>

      {/* Precio y botón WhatsApp */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-2xl font-bold text-green-700">
          ${servicio.precio.toLocaleString("es-AR")}
        </p>
        <a
          href={urlWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (!nombreUsuario.trim()) {
              e.preventDefault();
              alert("Por favor, ingresá tu nombre antes de continuar.");
            }
          }}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-0 flex items-center gap-4"
        >
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/whatsapp.png"
            alt="WhatsApp"
            className="w-5 h-5"
          />
          Reservar sesión
        </a>
      </div>
    </div>
  );
}