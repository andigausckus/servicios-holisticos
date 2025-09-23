// src/utils/slugify.js
export default function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // quita acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-") // espacios → guiones
    .replace(/[^\w\-]+/g, "") // quita caracteres especiales
    .replace(/\-\-+/g, "-") // guiones dobles
    .replace(/^-+/, "") // quita guion inicial
    .replace(/-+$/, ""); // quita guion final
}