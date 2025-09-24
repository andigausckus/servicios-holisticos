// Mapa.jsx
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import terapeutas from "../datos/terapeutas.json";
import servicios from "../datos/servicios.json";
import { Link } from "react-router-dom";
import L from "leaflet";

// 📌 Componente auxiliar para mover el mapa
function ChangeView({ terapeutas, provinciaFiltro, ciudadFiltro }) {
  const map = useMap();

  useEffect(() => {
    if (ciudadFiltro) {
      // Zoom a la ciudad
      const ciudadTerapeutas = terapeutas.filter((t) => t.ciudad === ciudadFiltro);
      if (ciudadTerapeutas.length > 0) {
        const bounds = ciudadTerapeutas.map((t) => [t.lat, t.lng]);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    } else if (provinciaFiltro) {
      // Zoom a la provincia
      const provTerapeutas = terapeutas.filter((t) => t.provincia === provinciaFiltro);
      if (provTerapeutas.length > 0) {
        const bounds = provTerapeutas.map((t) => [t.lat, t.lng]);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    } else {
      // Vista inicial Argentina
      map.setView([-38.4161, -63.6167], 4);
    }
  }, [ciudadFiltro, provinciaFiltro, terapeutas, map]);

  return null;
}

export default function Mapa() {
  const [especialidadFiltro, setEspecialidadFiltro] = useState("");
  const [provinciaFiltro, setProvinciaFiltro] = useState("");
  const [ciudadFiltro, setCiudadFiltro] = useState("");

  // Especialidades
  const especialidades = [...new Set(servicios.map((s) => s.categoria))];

  // Provincias
  const provincias = [...new Set(terapeutas.map((t) => t.provincia))];

  // Ciudades filtradas
  const ciudades = [
    ...new Set(
      terapeutas
        .filter((t) => (provinciaFiltro ? t.provincia === provinciaFiltro : true))
        .map((t) => t.ciudad)
    ),
  ];

  // Filtrado principal
  const terapeutasFiltrados = terapeutas.filter((t) => {
    const categoriasTerapeuta = servicios
      .filter((s) => s.terapeutaSlug === t.slug)
      .map((s) => s.categoria);

    return (
      (especialidadFiltro === "" || categoriasTerapeuta.includes(especialidadFiltro)) &&
      (provinciaFiltro === "" || t.provincia === provinciaFiltro) &&
      (ciudadFiltro === "" || t.ciudad === ciudadFiltro)
    );
  });

  return (
    <div className="p-3 mb-24 pt-12">
      <h1 className="text-3xl font-bold text-teal-600 mb-2 text-center">
        Servicios Presenciales
      </h1>
      <p className="text-center mb-6 text-gray-600">
        Encontrá terapeutas disponibles en tu provincia o ciudad y reserva tu sesión hoy
      </p>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 max-w-4xl mx-auto">
        <select
          value={especialidadFiltro}
          onChange={(e) => setEspecialidadFiltro(e.target.value)}
          className="rounded-lg px-3 py-2 focus:border-teal-600 focus:outline-none"
        >
          <option value="">Todas las especialidades</option>
          {especialidades.map((esp, i) => (
            <option key={i} value={esp}>{esp}</option>
          ))}
        </select>

        <select
          value={provinciaFiltro}
          onChange={(e) => {
            setProvinciaFiltro(e.target.value);
            setCiudadFiltro(""); // reset ciudad al cambiar provincia
          }}
          className="rounded-lg px-3 py-2 focus:border-teal-600 focus:outline-none"
        >
          <option value="">Todas las provincias</option>
          {provincias.map((prov, i) => (
            <option key={i} value={prov}>{prov}</option>
          ))}
        </select>

        <select
          value={ciudadFiltro}
          onChange={(e) => setCiudadFiltro(e.target.value)}
          className="rounded-lg px-3 py-2 focus:border-teal-600 focus:outline-none"
        >
          <option value="">Todas las ciudades</option>
          {ciudades.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Mapa */}
      <MapContainer
        center={[-38.4161, -63.6167]}
        zoom={4}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        <ChangeView
          terapeutas={terapeutasFiltrados}
          provinciaFiltro={provinciaFiltro}
          ciudadFiltro={ciudadFiltro}
        />

        {terapeutasFiltrados.map((t) =>
          t.lat && t.lng ? (
            <Marker
              key={t.id}
              position={[t.lat, t.lng]}
              icon={L.icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
                iconSize: [32, 32],
              })}
            >
              <Popup>
                <div className="text-center">
                  <img
                    src={t.fotoPerfil}
                    alt={t.nombre}
                    className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                  />
                  <h3 className="font-bold">{t.nombre}</h3>
                  <p className="text-sm text-gray-600">{t.ciudad}</p>
                  <Link to={`/terapeuta/${t.slug}`} className="text-teal-600 hover:underline">
                    Ver perfil
                  </Link>
                </div>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}