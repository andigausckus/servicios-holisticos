import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Para resolver rutas correctamente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL de tu dominio
const baseUrl = "https://serviciosholisticos.com.ar";

// Leer terapeutas.json
const terapeutasPath = path.join(__dirname, "src/datos/terapeutas.json");
const terapeutas = JSON.parse(fs.readFileSync(terapeutasPath, "utf-8"));

// Leer servicios.json
const serviciosPath = path.join(__dirname, "src/datos/servicios.json");
const servicios = JSON.parse(fs.readFileSync(serviciosPath, "utf-8"));

// Rutas principales estáticas
const staticRoutes = [
  "",
  "contacto",
  "servicios",
  "sobre-mi",
  "mapa",
];

// Rutas dinámicas de terapeutas
const terapeutaRoutes = terapeutas.map((t) => `terapeuta/${t.slug}`);

// Rutas dinámicas de servicios
const servicioRoutes = servicios.map(
  (s) => `servicio/${s.slug || s.titulo.toLowerCase().replace(/\s+/g, "-")}`
);

// Todas las rutas
const allRoutes = [...staticRoutes, ...terapeutaRoutes, ...servicioRoutes];

// Generar sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}/${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === "" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

// Escribir sitemap en /public
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemap, "utf-8");

console.log("✅ sitemap.xml generado en /public");