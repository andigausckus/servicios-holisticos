import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import servicios from "../datos/servicios.json";
import slugify from "../utils/slugify";

export default function Servicios() {
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [ordenPrecio, setOrdenPrecio] = useState("");

  // Categorías únicas
  const categorias = [...new Set(servicios.map((s) => s.categoria))];

  // Filtrar por categoría y modalidad Online
  let serviciosFiltrados = servicios.filter(
    (servicio) =>
      (categoriaFiltro === "" || servicio.categoria === categoriaFiltro) &&
      servicio.modalidad === "Online"
  );

  // Ordenar por precio
  if (ordenPrecio === "asc") {
    serviciosFiltrados.sort((a, b) => a.precio - b.precio);
  } else if (ordenPrecio === "desc") {
    serviciosFiltrados.sort((a, b) => b.precio - a.precio);
  }

  return (
    <>
      <Helmet>
        <title>Servicios Holísticos | Encuentra tu terapia ideal</title>
        <meta
          name="description"
          content="Descubrí todos los servicios de bienestar y terapias disponibles online. Filtrá por categoría y reserva tu sesión."
        />
        <meta property="og:title" content="Servicios Holísticos" />
        <meta
          property="og:description"
          content="Descubrí todos los servicios de bienestar y terapias disponibles online. Filtrá por categoría y reserva tu sesión."
        />
        <meta property="og:image" content="URL_DE_UNA_IMAGEN_DEFAULT.jpg" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="p-3 pt-12 mb-24 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-teal-600">
          Servicios disponibles
        </h1>
        <p className="text-gray-600 mb-10">
          Encuentra el mejor servicio que se adapte a tus necesidades
        </p>

        {/* Filtros */}
        <div className="flex flex-col gap-4 mb-8 w-full">
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="">Todas las especialidades</option>
            {categorias
              .slice()
              .sort((a, b) => a.localeCompare(b))
              .map((categoria, idx) => (
                <option key={idx} value={categoria}>
                  {categoria}
                </option>
              ))}
          </select>

          <select
            value={ordenPrecio}
            onChange={(e) => setOrdenPrecio(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="">Ordenar por precio</option>
            <option value="asc">Menor a mayor</option>
            <option value="desc">Mayor a menor</option>
          </select>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {serviciosFiltrados.map((servicio) => (
            <div
              key={servicio.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {servicio.imagen && (
                <img
                  src={servicio.imagen}
                  alt={servicio.titulo}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-xl font-bold">{servicio.titulo}</h2>
                <p className="text-teal-600 font-normal mb-2">
                  {servicio.categoria}
                </p>
                <p className="text-gray-700 mb-4">{servicio.modalidad}</p>
                <p className="text-gray-900 font-medium mt-auto text-xl mb-3">
                  ${servicio.precio.toLocaleString("es-AR")}
                </p>

                <div className="mt-2 flex justify-center">
                  <Link
                    to={`/servicio/${slugify(servicio.titulo)}`}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {serviciosFiltrados.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No hay servicios Online disponibles con los filtros seleccionados.
            </p>
          )}
        </div>
      </div>
    </>
  );
}