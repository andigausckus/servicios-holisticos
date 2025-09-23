// PerfilTerapeuta.jsx
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import terapeutas from "../datos/terapeutas.json";
import servicios from "../datos/servicios.json";
import slugify from "../utils/slugify";

export default function PerfilTerapeuta() {
  const { slug } = useParams();
  const terapeuta = terapeutas.find((t) => t.slug === slug);

  if (!terapeuta) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Terapeuta no encontrado
        </h1>
      </div>
    );
  }

  const serviciosTerapeuta = servicios.filter(
    (s) => s.terapeutaSlug === terapeuta.slug
  );

  const [modalAbierto, setModalAbierto] = useState(false);
  const [expandSobreMi, setExpandSobreMi] = useState(false);

  return (
    <div className="p-5 max-w-full mx-auto">
      {/* Foto de portada */}
      <div className="w-full h-60 bg-gray-200 rounded-lg overflow-hidden mb-6">
        <img
          src={terapeuta.fotoPortada}
          alt={terapeuta.nombre}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Perfil */}
      <div className="flex items-center gap-6 mb-12">
        <img
          src={terapeuta.fotoPerfil}
          alt={terapeuta.nombre}
          className="w-24 h-24 rounded-full object-cover shadow cursor-pointer"
          onClick={() => setModalAbierto(true)}
        />
        <div>
          <h1 className="text-2xl font-bold text-teal-600">
            {terapeuta.nombre}
          </h1>
          <p className="text-gray-600">
            {terapeuta.ciudad}, {terapeuta.provincia}
          </p>
        </div>
      </div>

      {/* Modal foto de perfil */}
      {modalAbierto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setModalAbierto(false)}
        >
          <div
            className="relative max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold"
              onClick={() => setModalAbierto(false)}
            >
              &times;
            </button>
            <img
              src={terapeuta.fotoPerfil}
              alt={terapeuta.nombre}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Sobre mí */}
      <div className="mb-8">
        <h2 className="text-gl font-medium mb-2">Sobre mí</h2>
        <p className="text-sm text-gray-700">
          {expandSobreMi
            ? terapeuta.sobreMi
            : `${terapeuta.sobreMi.split(" ").slice(0, 25).join(" ")}...`}
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => setExpandSobreMi(!expandSobreMi)}
            className="text-teal-600 text-sm mt-1 hover:underline focus:outline-none"
          >
            {expandSobreMi ? "Ver menos" : "Ver más"}
          </button>
        </div>
      </div>

      {/* Mis especialidades */}
      {terapeuta.especialidades && terapeuta.especialidades.length > 0 && (
        <div className="mb-8">
          <h2 className="text-gl font-medium mb-2">Mis especialidades</h2>
          <div className="flex flex-wrap gap-2">
            {terapeuta.especialidades.map((esp, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full border border-green-500 bg-white text-green-600 mb-4 text-sm"
              >
                {esp}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Mis servicios */}
      <div>
        <h2 className="text-gl font-medium mb-4">Mis servicios</h2>
        {serviciosTerapeuta.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviciosTerapeuta.map((s) => (
              <ServicioCard key={s.id} servicio={s} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            Este terapeuta aún no tiene servicios cargados.
          </p>
        )}
      </div>
    </div>
  );
}

// 👉 Componente tarjeta de servicio
function ServicioCard({ servicio }) {
  const [expanded, setExpanded] = useState(false);

  // buscamos al terapeuta dueño de este servicio
  const terapeuta = terapeutas.find((t) => t.slug === servicio.terapeutaSlug);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      {servicio.imagen && (
        <img
          src={servicio.imagen}
          alt={servicio.titulo}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />
      )}
      <h3 className="font-medium text-lg">{servicio.titulo}</h3>

      {/* Descripción con Ver más / Ver menos */}
      <p className={`text-sm text-gray-600 ${expanded ? "" : "line-clamp-2"}`}>
        {servicio.descripcion}
      </p>
      <div className="flex justify-end">
        <button
          className="text-teal-600 text-sm mt-1 hover:underline focus:outline-none"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Ver menos" : "Ver más"}
        </button>
      </div>

      {/* Ubicación del servicio */}
      <p className="text-teal-600 font-medium mt-2">
        {servicio.modalidad === "Online"
          ? "Online"
          : `Presencial en ${terapeuta?.ciudad}, ${terapeuta?.provincia}`}
      </p>

      {/* Precio */}
      <p className="font-medium text-xl text-gray-900 mt-1">
        ${servicio.precio.toLocaleString("es-AR")}
      </p>

      {/* Botón Ver servicio */}
      <div className="mt-4 flex justify-center">
        <Link
          to={`/servicio/${slugify(servicio.titulo)}`}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors mb-12 focus:outline-none focus:ring-0"
        >
          Ver servicio
        </Link>
      </div>
    </div>
  );
}