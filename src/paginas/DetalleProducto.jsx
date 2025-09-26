import { useParams } from "react-router-dom";
import { useState } from "react";
import productosData from "../datos/productos.json";
import slugify from "../utils/slugify";
import { FaWhatsapp } from "react-icons/fa";

export default function DetalleProducto() {
  const { slug } = useParams();
  const producto = productosData.find((p) => slugify(p.titulo) === slug);

  const [cantidad, setCantidad] = useState(1);

  if (!producto) return <p className="pt-24 text-center">Producto no encontrado</p>;

  // Generar SKU breve: 3 letras iniciales + 3 alfanuméricos aleatorios
  const generarSKU = (titulo) => {
    const letras = titulo.replace(/[^a-zA-Z]/g, "").substring(0, 3).toUpperCase();
    const aleatorio = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${letras}-${aleatorio}`;
  };
  const sku = generarSKU(producto.titulo);

  const aumentar = () => setCantidad(cantidad + 1);
  const disminuir = () => setCantidad(cantidad > 1 ? cantidad - 1 : 1);

  const precioTotal = producto.precio * cantidad; // ← Corrección aquí

  const mensajeWhatsApp = `Hola, quiero comprar el producto: ${producto.titulo} (SKU: ${sku}) - Cantidad: ${cantidad} - Precio total: $${precioTotal.toLocaleString("es-AR")}`;

  return (
    <div className="px-3 mb-24 max-w-4xl mx-auto space-y-5">
      {/* Imagen */}
      <div className="relative w-full h-72 mt-4">
        {producto.esNuevo && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-bold">
            Nuevo
          </span>
        )}
        <img src={producto.imagen} alt={producto.titulo} className="w-full h-full object-contain" />
      </div>

      {/* Breadcrumb */}
      <p className="text-sm text-gray-500">Tienda / {producto.categoria}</p>    
      
      {/* Título */}
      <h1 className="text-3xl font-bold mb-1">{producto.titulo}</h1>

      {/* SKU */}
      <p className="text-gray-500 text-sm mt-0">SKU: {sku}</p>

      {/* Precio */}
      <p className="text-gray-800 font-medium text-2xl">${producto.precio.toLocaleString("es-AR")}</p>

      {/* Método de envío */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
        <div className="flex flex-col">
          <h2 className="text-md font-medium">Método de envío</h2>
          <img
            src="https://i.postimg.cc/2jBQzW7P/correo-argentino-logo-png-seeklogo-35682.png"
            alt="Correo Argentino"
            className="h-10 w-auto mb-6 mt-1"
          />
          <p className="text-gray-700 text-md mt-2 font-medium">Tiempo de entrega</p>
          <p className="text-gray-700 text-sm">2 a 5 días hábiles a todo el país</p>
        </div>

        <div className="flex flex-col mt-4 sm:mt-0">
          <h2 className="text-md font-medium">Método de pago</h2>
          <p className="text-gray-700 text-sm mb-6 mt-1">Confirmar con el vendedor</p>
        </div>
      </div>

      {/* Cantidad + WhatsApp */}
      <div className="flex items-center justify-between mb-2">
        {/* Cantidad */}
        <div className="flex items-center border mb-6">
          <button
            onClick={disminuir}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-lg"
          >
            -
          </button>

          <span className="px-2 py-1 text-lg min-w-[50px] text-center">
            {cantidad}
          </span>

          <button
            onClick={aumentar}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-lg"
          >
            +
          </button>
        </div>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/5493548563662?text=${encodeURIComponent(
            `Hola Servicios Holisticos 👋 quiero comprar este producto:\n\n${producto.titulo}\n(SKU: ${sku})\nCantidad: ${cantidad}\nPrecio total: $${precioTotal.toLocaleString("es-AR")}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-6 flex items-center gap-2 bg-green-500 text-white px-3 py-2 hover:bg-green-600"
        >
          <FaWhatsapp size={22} /> Comprar por WhatsApp
        </a>
      </div>

      {/* Descripción */}
      {producto.descripcion && (
        <div className="bg-gray-50 p-4 border">
          <h2 className="font-medium mb-2">Descripción del producto</h2>
          <p className="text-gray-700 text-sm">{producto.descripcion}</p>
        </div>
      )}
    </div>
  );
}