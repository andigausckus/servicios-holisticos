// src/componentes/Footer.jsx
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
return (
<footer className="bg-teal-800 text-white py-6 mt-10">
<div className="flex flex-col items-center gap-4">
{/* Links */}
<nav className="flex flex-col items-center gap-2">
<Link to="/" className="hover:underline">
Inicio
</Link>
<Link to="/servicios?modalidad=Online" className="hover:underline">
Online
</Link>
<Link to="/mapa" className="hover:underline">
Presencial
</Link>
<Link to="/sobre-mi" className="hover:underline">
Sobre mí
</Link>
</nav>

{/* Ícono de Instagram */}  
    <a  
      href="https://www.instagram.com/servicios_holisticos?igsh=NGx1M212dGJnNGM1"  
      target="_blank"  
      rel="noopener noreferrer"  
      className="text-2xl hover:text-gray-200 transition-colors"  
    >  
      <FaInstagram />  
    </a>  

    {/* Derechos reservados */}  
    <p className="text-sm text-gray-600 mt-4">  
      © {new Date().getFullYear()} Servicios Holísticos. Todos los derechos reservados.  
    </p>  
  </div>  
</footer>

);
}