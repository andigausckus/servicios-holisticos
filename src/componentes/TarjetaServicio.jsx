import { Link } from "react-router-dom";
import { useState } from "react";

export default function TarjetaServicio({ servicio }) {
  const [verMas, setVerMas] = useState(false);

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden p-4">
      {/* Imagen */}
      {servicio.imagen && (
        <img
          src={servicio.imagen}
          alt={servicio.titulo}
          className="w-full h-48 object-cover rounded"
        />
      )}

      {/* Título */}
      <h2 className="text-xl font-bold mt-4">{servicio.titulo}</h2>

      {/* Categoría */}
      <p className="text-teal-600 font-semibold">{servicio.categoria}</p>

      {/* Terapeuta */}
      {servicio.terapeuta && (
        <div className="mt-2">
          <p className="font-medium">Terapeuta</p>
          <p>{servicio.terapeuta}</p>
        </div>
      )}

      {/* Disponibilidad */}
      {servicio.disponibilidad && (
        <div className="mt-2">
          <p className="font-medium">Disponibilidad</p>
          <p>{servicio.disponibilidad}</p>
        </div>
      )}

      {/* Descripción */}
      <div className="mt-2">
        <p className="font-medium">Descripción del servicio</p>
        <p className="text-gray-600">
          {verMas
            ? servicio.descripcion
            : servicio.descripcion?.slice(0, 120) + "..."}
        </p>
        {servicio.descripcion?.length > 120 && (
          <button
            onClick={() => setVerMas(!verMas)}
            className="text-teal-600 underline mt-1"
          >
            {verMas ? "Ver menos" : "Ver más"}
          </button>
        )}
      </div>

      {/* Ubicación */}
      {servicio.modalidad === "Presencial" && (
        <div className="mt-2">
          <p className="font-medium">Ubicación</p>
          <p>
            Presencial en {servicio.ciudad}, {servicio.provincia}
          </p>
          {/* Mapa */}
          <iframe
            className="w-full h-40 rounded mt-2"
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${servicio.ciudad},${servicio.provincia}&output=embed`}
          ></iframe>
        </div>
      )}

      {/* Botón */}
      <div className="mt-4 flex justify-center">
        <Link
          to={`/servicio/${servicio.id}`}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg shadow hover:bg-teal-700"
        >
          ${servicio.precio}
        </Link>
      </div>
    </div>
  );
}