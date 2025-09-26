// src/paginas/Tienda.jsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import productosData from "../datos/productos.json";
import slugify from "../utils/slugify";

export default function Tienda() {
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [ordenPrecio, setOrdenPrecio] = useState("");

  // categorías únicas ordenadas A-Z
  const categorias = useMemo(
    () => [...new Set(productosData.map((p) => p.categoria))].sort((a, b) => a.localeCompare(b)),
    []
  );

  // filtrado y orden
  const productosFiltrados = useMemo(() => {
    let arr = productosData.slice();
    if (categoriaFiltro) {
      arr = arr.filter((p) => p.categoria === categoriaFiltro);
    }
    if (ordenPrecio === "asc") {
      arr.sort((a, b) => a.precio - b.precio);
    } else if (ordenPrecio === "desc") {
      arr.sort((a, b) => b.precio - a.precio);
    }
    return arr;
  }, [categoriaFiltro, ordenPrecio]);

  return (
    <div className="pt-20 pb-24 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-teal-600 mb-4">
        Tienda Holística (Próximamente)
      </h1>
      <p className="text-gray-600 mb-6">
        Productos naturales, sahumerios y más. (Página en desarrollo)
      </p>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center mb-6">
        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="border rounded-sm px-3 py-2 w-full md:flex-1"
        >
          <option value="">Productos</option>
          {categorias.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={ordenPrecio}
          onChange={(e) => setOrdenPrecio(e.target.value)}
          className="border rounded-sm px-3 py-2 w-full md:flex-1"
        >
          <option value="">Ordenar por precio</option>
          <option value="asc">Menor a mayor</option>
          <option value="desc">Mayor a menor</option>
        </select>
      </div>

      {/* Grid: 2 por fila */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
        {productosFiltrados.map((p) => (
          <article
            key={p.id}
            className="bg-white border rounded-sm shadow-sm overflow-hidden"
          >
            {/* imagen con badge */}
            <div className="relative w-full h-44 overflow-hidden">
              <img
                src={p.imagen}
                alt={p.titulo}
                className="w-full h-full object-contain"
              />
              {p.esNuevo && (
                <span className="absolute top-1 right-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                  Nuevo
                </span>
              )}
            </div>

            <div className="p-4">
              <p className="text-xs text-teal-600 mb-1">{p.categoria}</p>
              <h3 className="text-sm font-semibold mb-2">{p.titulo}</h3>
              <p className="text-gray-800 font-medium mb-3">
                ${p.precio.toLocaleString("es-AR")}
              </p>

              <div className="flex items-center justify-between gap-2">
                <Link
                  to={`/tienda/${slugify(p.titulo)}`}
                  className="text-sm px-3 py-2 rounded-sm bg-teal-600 text-white hover:bg-teal-700"
                >
                  Ver más
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No hay productos que coincidan con los filtros.
        </p>
      )}
    </div>
  );
}