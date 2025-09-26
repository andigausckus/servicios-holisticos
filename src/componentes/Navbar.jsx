import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [submenuAbierto, setSubmenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="https://i.postimg.cc/4nkPJg30/Screenshot-20250920-171140-Instagram.jpg"
            alt="Logo Servicios Holísticos"
            className="h-14 w-auto"
          />
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-teal-600 ${
                isActive ? "text-teal-600 font-semibold" : "text-gray-700"
              }`
            }
          >
            Inicio
          </NavLink>

          {/* Servicios con submenú */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-teal-600">
              Servicios
            </button>
            <div className="absolute left-0 mt-2 w-40 bg-white border rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              <NavLink
                to="/servicios"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                Online
              </NavLink>
              <NavLink
                to="/mapa"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                Presencial
              </NavLink>
            </div>
          </div>

          <NavLink
            to="/sobre-mi"
            className={({ isActive }) =>
              `hover:text-teal-600 ${
                isActive ? "text-teal-600 font-semibold" : "text-gray-700"
              }`
            }
          >
            Sobre mí
          </NavLink>

          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              `hover:text-teal-600 ${
                isActive ? "text-teal-600 font-semibold" : "text-gray-700"
              }`
            }
          >
            Contacto
          </NavLink>

          {/* 👉 Tienda Holística con badge Próximamente */}
          <div className="flex items-center space-x-1">
            <span className="text-gray-700 cursor-not-allowed">
              Tienda Holística
            </span>
            <span className="text-xs bg-teal-600 text-white px-2 py-0.5 rounded">
              Próximamente
            </span>
          </div>
        </div>

        {/* Botón hamburguesa */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
        >
          {menuAbierto ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className="md:hidden bg-white shadow-md px-4 py-2 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block text-center border border-gray-200 rounded-lg px-3 py-2 hover:text-teal-600 ${
                isActive ? "text-teal-600 font-semibold" : "text-gray-700"
              }`
            }
            onClick={() => setMenuAbierto(false)}
          >
            Inicio
          </NavLink>

          {/* Submenú en mobile */}
          <div>
            <button
              onClick={() => setSubmenuAbierto(!submenuAbierto)}
              className="w-full text-center border border-gray-200 rounded-lg px-3 py-2 text-gray-700 hover:text-teal-600"
            >
              Servicios
            </button>
            {submenuAbierto && (
              <div className="mt-2 space-y-2">
                <NavLink
                  to="/servicios"
                  className="block text-center border border-gray-200 rounded-lg px-3 py-2 hover:text-teal-600 text-gray-700"
                  onClick={() => setMenuAbierto(false)}
                >
                  Online
                </NavLink>
                <NavLink
                  to="/mapa"
                  className="block text-center border border-gray-200 rounded-lg px-3 py-2 hover:text-teal-600 text-gray-700"
                  onClick={() => setMenuAbierto(false)}
                >
                  Presencial
                </NavLink>
              </div>
            )}
          </div>

          <NavLink
            to="/sobre-mi"
            className={({ isActive }) =>
              `block text-center border border-gray-200 rounded-lg px-3 py-2 hover:text-teal-600 ${
                isActive ? "text-teal-600 font-semibold" : "text-gray-700"
              }`
            }
            onClick={() => setMenuAbierto(false)}
          >
            Sobre mí
          </NavLink>

          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              `block text-center border border-gray-200 rounded-lg px-3 py-2 hover:text-teal-600 ${
                isActive ? "text-teal-600 font-semibold" : "text-gray-700"
              }`
            }
            onClick={() => setMenuAbierto(false)}
          >
            Contacto
          </NavLink>

          {/* 👉 Tienda Holística con badge Próximamente en mobile */}
          <div className="flex justify-center items-center space-x-1 border border-gray-200 rounded-lg px-3 py-2">
            <span className="text-gray-700 cursor-not-allowed">
              Tienda Holistica
            </span>
            <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">
              Próximamente
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}