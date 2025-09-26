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

  const mensajeWhatsApp = `Hola, quiero comprar el producto: ${producto.titulo} (SKU: ${sku}) - Cantidad: ${cantidad} - Precio total: $${(
    producto.precio * cantidad
  ).toLocaleString("es-AR")}`;

  return (
    <div className="px-3 max-w-4xl mx-auto space-y-5">
      {/* Imagen */}
      <div className="relative w-full h-72 mt-4 mb-4">
        {producto.esNuevo && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">
            Nuevo
          </span>
        )}
        <img src={producto.imagen} alt={producto.titulo} className="w-full h-full object-contain" />
      </div>

      {/* Breadcrumb */}
      <p className="text-sm text-gray-500">Tienda / {producto.categoria}</p>

      {/* Título */}
      <h1 className="text-3xl font-bold">{producto.titulo}</h1>

      {/* SKU */}
      <p className="text-gray-500 text-sm">SKU: {sku}</p>

      {/* Precio */}
      <p className="text-gray-800 font-medium text-xl">${producto.precio.toLocaleString("es-AR")}</p>

      {/* Método de envío */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
        <div className="flex flex-col">
          <h2 className="text-sm font-medium">Método de envío</h2>
          <img
            src="https://i.postimg.cc/yNm4Wf4F/correo-argentino-logo-png-seeklogo-35682.png"
            alt="Correo Argentino"
            className="h-20 w-auto mt-2"
          />
          <p className="text-gray-700 text-sm mt-2 font-semibold">Tiempo de entrega</p>
          <p className="text-gray-700 text-sm">2 a 5 días hábiles a todo el país</p>
        </div>

        <div className="flex flex-col mt-4 sm:mt-0">
          <h2 className="text-sm font-medium">Método de pago</h2>
          <p className="text-gray-700 text-sm mt-1">A acordar con el vendedor</p>
        </div>
      </div>

        {/* Cantidad + WhatsApp */}
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center border rounded-sm">
            <button
              onClick={disminuir}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-lg"
            >
              -
            </button>
            <span className="px-5 py-2 text-lg">{cantidad}</span>
            <button
              onClick={aumentar}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-lg"
            >
              +
            </button>
          </div>
        

        <a
          href={`https://wa.me/5493548553662?text=${encodeURIComponent(mensajeWhatsApp)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded hover:bg-green-600 mt-3 sm:mt-0"
        >
          <FaWhatsapp size={20} /> Comprar por WhatsApp
        </a>
      </div>

      {/* Descripción */}
      {producto.descripcion && (
        <div className="bg-gray-50 p-4 rounded-sm border">
          <h2 className="font-semibold mb-2">Descripción</h2>
          <p className="text-gray-700 text-sm">{producto.descripcion}</p>
        </div>
      )}
    </div>
  );
}