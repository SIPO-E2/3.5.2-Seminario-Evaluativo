import { Product } from "./clases.js";

// Función para cargar las categorías en el selector del formulario de búsqueda
async function loadCategories() {
  const response = await fetch("https://dummyjson.com/products/categories");
  const categories = await response.json();
  const select = document.getElementById("searchCategory") as HTMLSelectElement;
  categories.forEach((category: string) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });
}

async function searchProducts(name: string, price: number, category: string) {
  let url = `https://dummyjson.com/products/search?q=${name}`;

  const response = await fetch(url);
  const data = await response.json();
  let products: Product[] = data.products;

  // Filtrar por precio si se proporcionó
  if (price > 0) {
    products = products.filter((product) => product.price <= price);
  }

  // Filtrar por categoría si se proporcionó
  if (category) {
    products = products.filter((product) => product.category === category);
  }

  updateTableWithProducts(products);
}

// Event listener para el formulario de búsqueda
document.getElementById("searchForm")!.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = (document.getElementById("searchName") as HTMLInputElement)
    .value;
  const price = +(document.getElementById("searchPrice") as HTMLInputElement)
    .value;
  const category = (
    document.getElementById("searchCategory") as HTMLSelectElement
  ).value;

  searchProducts(name, price, category);
});

function updateTableWithProducts(products: Product[]) {
  const tableBody = document.querySelector("#table-body");
  if (tableBody) {
    tableBody.innerHTML = ""; // Limpiar tabla antes de añadir los nuevos resultados
    products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td><img src="${product.thumbnail}" alt="${product.title}" style="width: 50px; height: auto;"></td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>${product.discountPercentage}%</td>
        <td>${product.rating}</td>
        <td>${product.stock}</td>
        <td>${product.brand}</td>
        <td>${product.category}</td>
        <td>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-dark"><i class="fa fa-eye" aria-hidden="true"></i></button>
            <button class="btn btn-outline-warning"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            <button class="btn btn-outline-danger"><i class="fa fa-times" aria-hidden="true"></i></button>
          </div>
        </td>
      `;
      // Ahora, añade los manejadores de eventos para cada botón
      const buttons = row.querySelectorAll("button");
      buttons[0].addEventListener("click", () => window.showModal(product.id));
      buttons[1].addEventListener("click", () => {
        /* Lógica para editar */
      });
      buttons[2].addEventListener("click", () =>
        window.deleteProduct(product.id)
      );

      tableBody.appendChild(row);
    });
  } else {
    console.error("Table body not found.");
  }
}

// Cargar las categorías cuando se carga el documento
document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
});
