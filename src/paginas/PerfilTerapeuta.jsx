import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
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
  (s) => Number(s.terapeutaId) === Number(terapeuta.id)
);

const [modalAbierto, setModalAbierto] = useState(false);
const [expandSobreMi, setExpandSobreMi] = useState(false);

  return (
    <div className="p-3 mb-24 max-w-full mx-auto">
      {/* SEO dinámico */}
      <Helmet>
        <title>{`${terapeuta.nombre} | Terapeuta Holistico en ${terapeuta.ciudad}`}</title>
        <meta
          name="description"
          content={`${terapeuta.nombre} ofrece ${terapeuta.especialidades?.join(
            ", "
          )}. ${terapeuta.sobreMi}`}
        />
        <meta
          property="og:title"
          content={`${terapeuta.nombre} | Servicios Holisticos`}
        />
        <meta
          property="og:description"
          content={`${terapeuta.especialidades?.join(
            ", "
          )} en ${terapeuta.ciudad}, ${terapeuta.provincia}.`}
        />
        <meta property="og:image" content={terapeuta.fotoPerfil} />
        <meta
          property="og:url"
          content={`https://www.serviciosholisticos.com.ar/terapeuta/${terapeuta.slug}`}
        />
        <meta property="og:type" content="profile" />
        <meta property="og:locale" content="es_AR" />
      </Helmet>

{/* Foto o Video de portada */}  
  <div className="w-full h-76 bg-gray-200 rounded-lg overflow-hidden mb-6">  
    {terapeuta.videoPortada ? (  
      <iframe  
        width="100%"  
        height="100%"  
        src={terapeuta.videoPortada}  
        title="Video de portada"  
        frameBorder="0"  
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  
        allowFullScreen  
        className="w-full h-full"  
      ></iframe>  
    ) : (  
      <img  
        src={terapeuta.fotoPortada}  
        alt={terapeuta.nombre}  
        className="w-full h-full object-cover"  
      />  
    )}  
  </div>  

  {/* Perfil */}  
  <div className="flex items-center gap-6 mb-8">  
    <img  
      src={terapeuta.fotoPerfil}  
      alt={terapeuta.nombre}  
      className="w-24 h-24 rounded-full object-cover shadow cursor-pointer"  
      onClick={() => setModalAbierto(true)}  
    />  
    <div>  
      <h1 className="text-2xl font-bold text-teal-600">{terapeuta.nombre}</h1>  
      <p className="text-gray-600">{terapeuta.ciudad}, {terapeuta.provincia}</p>  
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
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
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

// Componente ServicioCard fuera del JSX
function ServicioCard({ servicio }) {
const [expanded, setExpanded] = useState(false);
  const terapeutaDelServicio = terapeutas.find(t => t.id === servicio.terapeutaId);

return (
<div className="bg-white rounded-lg shadow-md p-2 flex flex-col">
{servicio.imagen && (
<img  
src={servicio.imagen}  
alt={servicio.titulo}  
className="w-full h-40 object-cover rounded-lg mb-4"  
/>
)}
<h3 className="font-medium mb-2 text-md">{servicio.titulo}</h3>

  

  <p className="text-teal-600 mb-4 font-medium">  
    {servicio.modalidad === "Online"  
      ? "Online"  
      : `Presencial en ${terapeutaDelServicio?.ciudad}, ${terapeutaDelServicio?.provincia}`}  
  </p>  

  <p className="font-medium text-gl text-gray-900 mt-1">  
    ${servicio.precio.toLocaleString("es-AR")}  
  </p>  

  <div className="mt-4 flex justify-center">  
    <Link  
      to={`/servicio/${slugify(servicio.titulo)}`}  
      className="bg-yellow-600 text-white px-2 py-1 rounded-lg hover:bg-yellow-700 transition-colors focus:outline-none focus:ring-0"  
    >  
      Reservar ahora
    </Link>  
  </div>  
</div>

);
}

