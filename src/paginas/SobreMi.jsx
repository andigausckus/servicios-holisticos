import { useState } from "react";

export default function SobreMi() {
  const imagenes = [
    "https://i.postimg.cc/RhSt7bKt/img-3-1758549606794.jpg",
    "https://i.postimg.cc/Qd9TJ79f/img-5-1758549674514.jpg",
    "https://i.postimg.cc/Dw9bjz1n/img-6-1758549700311.jpg",
    "https://i.postimg.cc/B6gLnckn/img-1-1758549585952.jpg",
    "https://i.postimg.cc/QMZHgyrM/img-4-1758549631014.jpg",
  ];

  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-teal-600 mb-4">Sobre mí</h1>
      <p className="text-gray-700 max-w-2xl mx-auto mb-6">
        Bienvenido/a 👋 Soy Andi Gausckus, el creador de este espacio de servicios holisticos.
      </p>

      <p className="text-gray-700 max-w-2xl mx-auto mb-6">
        Mi objetivo es ayudarte a conectar con terapeutas de confianza de manera simple y accesible, para que puedas encontrar el apoyo que necesitas.
      </p>

      <p className="text-gray-700 max-w-2xl mx-auto mb-6">
        En estos tiempos difíciles que vivimos, es fundamental cuidar nuestra salud mental, física y emocional, y volver constantemente la mirada hacia nuestro interior, para poder encontrar la paz y el equilibrio que tanto necesitamos.
      </p>

      <p className="text-gray-700 max-w-2xl mx-auto mb-6">
        De esa necesidad humana es que nace este espacio holístico con una misión clara: ayudarte a conectar con terapeutas holísticos dispuestos a acompañarte en tu camino de sanación y crecimiento personal. Espero que encuentres aquí lo que buscas y juntos podamos crear un futuro más feliz para todos.
      </p>

      <p className="text-gray-700 max-w-2xl mx-auto mb-6">
        Si llegaste a este espacio no es casualidad, quizá es tiempo de dar el salto que tanto necesitabas para empezar a cambiar tu vida.
      </p>

      <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
        Te abrazo donde sea que estés 💞 <br />
        Namaste 🙏
      </p>

      {/* Galería */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {imagenes.map((img, i) => (
          <div
            key={i}
            className={`overflow-hidden rounded-lg border border-gray-200 shadow-sm cursor-pointer transform transition duration-300 hover:scale-105 ${
              i >= 3 ? "md:col-span-1 md:col-start-2" : ""
            }`}
            onClick={() => setImagenSeleccionada(img)}
          >
            <img
              src={img}
              alt={`Sobre mí ${i + 1}`}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {imagenSeleccionada && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setImagenSeleccionada(null)}
        >
          <div className="relative max-w-3xl w-full p-4">
            <img
              src={imagenSeleccionada}
              alt="Imagen ampliada"
              className="w-full rounded-lg shadow-lg"
            />
            <button
              onClick={() => setImagenSeleccionada(null)}
              className="absolute top-2 right-2 text-white bg-gray-800 bg-opacity-70 rounded-full px-3 py-1 hover:bg-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}