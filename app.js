import { guardarProducto, obtenerProductos, limpiarProductos } from "./supabase.js";
import { renderLista, actualizarTotal } from "./ui.js";

const productoInput = document.getElementById("producto");
const precioInput = document.getElementById("precio");
const btnAgregar = document.getElementById("btnAgregar");
const btnLimpiar = document.getElementById("btnLimpiar");

async function cargarDatos() {
  const productos = await obtenerProductos();
  renderLista(productos);
  actualizarTotal(productos);
}

btnAgregar.addEventListener("click", async () => {
  const producto = productoInput.value;
  const precio = parseFloat(precioInput.value);

  if (!producto || !precio) return;

  await guardarProducto(producto, precio);

  productoInput.value = "";
  precioInput.value = "";

  cargarDatos();
});

btnLimpiar.addEventListener("click", async () => {
  await limpiarProductos();
  cargarDatos();
});

// Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

// Inicial
cargarDatos();