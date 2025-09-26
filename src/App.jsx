import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./componentes/Navbar";
import Inicio from "./paginas/Inicio";
import Servicios from "./paginas/Servicios";
import DetalleServicio from "./paginas/DetalleServicio";
import BuscarTerapeuta from "./paginas/BuscarTerapeuta";
import SobreMi from "./paginas/SobreMi";
import PerfilTerapeuta from "./paginas/PerfilTerapeuta";
import Mapa from "./paginas/Mapa";
import Contacto from "./paginas/Contacto"; // 👈 nuevo import
import BotonWhatsapp from "./componentes/BotonWhatsapp";
import Footer from "./componentes/Footer";
import ScrollToTop from "./componentes/ScrollToTop"; // 👈 nuevo import
import RegistroTerapeuta from "./paginas/RegistroTerapeuta";
import Tienda from "./paginas/Tienda";
import DetalleProducto from "./paginas/DetalleProducto";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop /> {/* 👈 siempre que cambie de ruta hace scroll arriba */}
        <Navbar />
        <main className="pt-16 min-h-screen"> {/* 👈 espacio para navbar */}
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/servicio/:slug" element={<DetalleServicio />} />
            <Route path="/buscar" element={<BuscarTerapeuta />} />
            <Route path="/sobre-mi" element={<SobreMi />} />
            <Route path="/terapeuta/:slug" element={<PerfilTerapeuta />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/contacto" element={<Contacto />} /> {/* 👈 nueva ruta */}
            <Route path="/registro-terapeuta" element={<RegistroTerapeuta />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/tienda/:slug" element={<DetalleProducto />} />
          </Routes>
        </main>

        {/* 👉 Footer en todas las páginas */}
        <Footer />

        {/* 👉 Botón flotante de WhatsApp */}
        <BotonWhatsapp />
      </Router>
    </HelmetProvider>
  );
}