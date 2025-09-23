import { useState } from "react";
import servicios from "../datos/servicios.json";
import terapeutas from "../datos/terapeutas.json"; // 👈 IMPORTANTE
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Icono personalizado para los pines
const icono = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

export default function BuscarTerapeuta() {
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [provinciaFiltro, setProvinciaFiltro] = useState("");
  const [ciudadFiltro, setCiudadFiltro] = useState("");

  // Obtenemos categorías únicas desde los servicios
  const categorias = [...new Set(servicios.map((s) => s.categoria))];

  // Obtenemos provincias únicas desde terapeutas
  const provincias = [...new Set(terapeutas.map((t) => t.provincia).filter(Boolean))];

  // Ciudades dinámicas según provincia seleccionada
  const ciudades = [
    ...new Set(
      terapeutas
        .filter((t) => !provinciaFiltro || t.provincia === provinciaFiltro)
        .map((t) => t.ciudad)
        .filter(Boolean)
    ),
  ];

  // Filtrar terapeutas según filtros
  const resultados = terapeutas.filter((t) => {
    return (
      (categoriaFiltro === "" ||
        servicios.some((s) => s.categoria === categoriaFiltro && s.terapeutaId === t.id)) &&
      (provinciaFiltro === "" || t.provincia === provinciaFiltro) &&
      (ciudadFiltro === "" || t.ciudad === ciudadFiltro)
    );
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-teal-600 mb-4 text-center">
        Buscar Terapeuta
      </h1>
      <p className="text-gray-700 text-center mb-8">
        Filtra por especialidad, provincia y ciudad para encontrar el terapeuta ideal para vos.
      </p>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        {/* Especialidad */}
        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">Todas las especialidades</option>
          {categorias.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Provincia */}
        <select
          value={provinciaFiltro}
          onChange={(e) => {
            setProvinciaFiltro(e.target.value);
            setCiudadFiltro(""); // resetear ciudad al cambiar provincia
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">Todas las provincias</option>
          {provincias.map((p, i) => (
            <option key={i} value={p}>
              {p}
            </option>
          ))}
        </select>

        {/* Ciudad */}
        <select
          value={ciudadFiltro}
          onChange={(e) => setCiudadFiltro(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          disabled={!provinciaFiltro}
        >
          <option value="">Todas las ciudades</option>
          {ciudades.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Mapa con terapeutas */}
      <div className="h-[500px] w-full rounded-lg overflow-hidden shadow">
        <MapContainer
          center={[-34.6037, -58.3816]} // arranca en Buenos Aires
          zoom={6}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {resultados.map((t) => (
            <Marker key={t.id} position={[t.lat, t.lng]} icon={icono}>
              <Popup>
                <div className="text-center">
                  <img
                    src={t.fotoPerfil}
                    alt={t.nombre}
                    className="w-16 h-16 rounded-full mx-auto mb-2"
                  />
                  <h3 className="font-semibold">{t.nombre}</h3>
                  <Link to={`/terapeuta/${t.slug}`} className="text-teal-600 hover:underline">
  Ver perfil
</Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Mensaje si no hay resultados */}
      {resultados.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No se encontraron terapeutas con los filtros seleccionados.
        </p>
      )}
    </div>
  );
}