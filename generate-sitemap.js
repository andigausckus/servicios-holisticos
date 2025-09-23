import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Para resolver rutas correctamente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leemos terapeutas.json manualmente
const terapeutasPath = path.join(__dirname, "src/datos/terapeutas.json");
const terapeutas = JSON.parse(fs.readFileSync(terapeutasPath, "utf-8"));

const baseUrl = "https://servicios-holisticos.com"; // <-- cambia por tu dominio real

// Rutas principales
const staticRoutes = [
  "",
  "contacto",
  "servicios",
  "sobre-mi",
  "mapa",
];

// Rutas dinámicas para terapeutas
const terapeutaRoutes = terapeutas.map((t) => `terapeuta/${t.slug}`);

const allRoutes = [...staticRoutes, ...terapeutaRoutes];

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

fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemap, "utf-8");

console.log("✅ sitemap.xml generado en /public");