import { FaWhatsapp } from "react-icons/fa";

export default function BotonWhatsapp() {
  const numero = "5493548563662";
  const mensaje = "Hola! 👋 Quiero más información sobre los servicios.";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors animate-pulse z-50"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}