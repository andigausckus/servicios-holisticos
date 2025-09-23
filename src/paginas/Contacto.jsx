import { useState } from "react";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    // Acá después podés integrar EmailJS, Nodemailer o un backend
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl text-teal-600 font-bold text-center mb-4">Contacto</h1>
      <p className="text-gray-600 text-center mb-8">
        Escríbeme y me pondré en contacto con vos lo antes posible, o abrí un
        nuevo chat en WhatsApp para aclarar tus dudas.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4 border border-gray-200"
      >
        {/* Nombre */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-teal-500 focus:ring-0 focus:outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-teal-500 focus:ring-0 focus:outline-none"
            required
          />
        </div>

        {/* Asunto */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Asunto</label>
          <input
            type="text"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-teal-500 focus:ring-0 focus:outline-none"
            required
          />
        </div>

        {/* Mensaje */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Mensaje</label>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows="5"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-teal-500 focus:ring-0 focus:outline-none"
            required
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-teal-500 text-white font-semibold py-2 rounded-lg hover:bg-teal-600 transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}