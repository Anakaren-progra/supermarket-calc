export function renderLista(productos) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  productos.forEach(p => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";

    li.innerHTML = `
      ${p.producto}
      <span>$${p.precio}</span>
    `;

    lista.appendChild(li);
  });
}

export function actualizarTotal(productos) {
  const total = productos.reduce((acc, p) => acc + Number(p.precio), 0);
  document.getElementById("total").textContent = total;
}