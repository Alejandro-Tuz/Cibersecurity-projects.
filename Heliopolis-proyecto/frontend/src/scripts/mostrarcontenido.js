export function mostrarContenido(id) {
  document
    .querySelectorAll(".contenido")
    .forEach((el) => el.classList.add("hidden"));

  const contenido = document.getElementById(id);
  if (contenido) {
    contenido.classList.remove("hidden");
  }
}