import { useState } from "react";
import slugify from "../utils/slugify";
import { FaRegCopy } from "react-icons/fa";

const provincias = [
  "Buenos Aires","Catamarca","Chaco","Chubut","Córdoba","Corrientes",
  "Entre Ríos","Formosa","Jujuy","La Pampa","La Rioja","Mendoza",
  "Misiones","Neuquén","Río Negro","Salta","San Juan","San Luis",
  "Santa Cruz","Santa Fe","Santiago del Estero","Tierra del Fuego","Tucumán"
];

export default function RegistroTerapeuta() {
  const [formData, setFormData] = useState({
    nombre: "",
    provincia: "",
    ciudad: "",
    lat: "",
    lng: "",
    fotoPerfil: "",
    fotoPortada: "",
    sobreMi: "",
    especialidades: "",
    disponibilidad: "",
  });

  const [copiado, setCopiado] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      setFormData({ ...formData, [name]: url });
    }
  };

  const capitalizeWords = (str) =>
    str.replace(/\b\w/g, (c) => c.toUpperCase());

  const generarJSON = () => {
    const especialidadesArray = formData.especialidades
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean)
      .map(capitalizeWords);

    return JSON.stringify(
      {
        id: Date.now(),
        nombre: capitalizeWords(formData.nombre),
        slug: slugify(formData.nombre),
        provincia: capitalizeWords(formData.provincia),
        ciudad: capitalizeWords(formData.ciudad),
        lat: formData.lat ? parseFloat(formData.lat) : null,
        lng: formData.lng ? parseFloat(formData.lng) : null,
        fotoPerfil: formData.fotoPerfil,
        fotoPortada: formData.fotoPortada,
        sobreMi: formData.sobreMi,
        especialidades: especialidadesArray,
        disponibilidad: formData.disponibilidad,
      },
      null,
      2
    );
  };

  const handleCopiar = () => {
    navigator.clipboard.writeText(generarJSON());
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="pt-24 p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl text-center font-bold mb-10">Registro de Terapeuta</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre y apellido"
          value={formData.nombre}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="provincia"
          value={formData.provincia}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Selecciona provincia</option>
          {provincias.map((prov, i) => (
            <option key={i} value={prov}>{prov}</option>
          ))}
        </select>

        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"
          value={formData.ciudad}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="lat"
          placeholder="Latitud (Déjalo vacío)"
          value={formData.lat}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="lng"
          placeholder="Longitud (Déjalo vacío)"
          value={formData.lng}
          onChange={handleChange}
          className="border p-2 mb-4 rounded"
        />

        {/* Foto de perfil */}
        <div>
          <label className="block mb-2">Foto de perfil para perfil público</label>
          <input
            type="file"
            accept="image/*"
            name="fotoPerfil"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
          />
          {formData.fotoPerfil && (
            <img
              src={formData.fotoPerfil}
              alt="Perfil"
              className="w-32 h-32 object-cover mb-4 rounded mt-2"
            />
          )}
        </div>

        {/* Foto de portada */}
        <div>
          <label className="block mb-2">Foto de portada para perfil público</label>
          <input
            type="file"
            accept="image/*"
            name="fotoPortada"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
          />
          {formData.fotoPortada && (
            <img
              src={formData.fotoPortada}
              alt="Portada"
              className="w-full h-32 object-cover rounded mb-4 mt-2"
            />
          )}
        </div>

        {/* Sobre mí */}
        <label className="block font-medium mb-1">Sobre mí</label>
        <textarea
          name="sobreMi"
          placeholder="Contale a los usuarios quién sos y cómo podes ayudarlos"
          value={formData.sobreMi}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
        />

        {/* Especialidades */}
        <label className="block font-medium mb-1">Especialidades</label>
        <input
          type="text"
          name="especialidades"
          placeholder="Separalas por comas. Ej: Yoga, Reiki, Tarot"
          value={formData.especialidades}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
        />

        {/* Disponibilidad */}
        <label className="block font-medium mb-1">Disponibilidad horaria</label>
        <input
          type="text"
          name="disponibilidad"
          placeholder="Ej: Lunes a Viernes de 10 a 16 hs"
          value={formData.disponibilidad}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
        />
      </form>

      <div className="relative mt-4">
        <h2 className="font-semibold mb-2">JSON generado:</h2>
        <button
          onClick={handleCopiar}
          className="absolute right-2 top-0 p-1 text-gray-600 hover:text-teal-600"
          title="Copiar al portapapeles"
        >
          <FaRegCopy size={20} />
        </button>
        <textarea
          readOnly
          value={generarJSON()}
          className="w-full h-64 p-2 border rounded mt-2 font-mono text-sm"
        />
        {copiado && (
          <p className="text-green-600 text-sm mt-1">¡JSON copiado al portapapeles!</p>
        )}
        <p className="mt-2 text-gray-600 text-sm">
          Copiá este JSON y enviámelo por WhatsApp para comenzar a subir tus servicios a la web 👉
        </p>
      </div>
    </div>
  );
}