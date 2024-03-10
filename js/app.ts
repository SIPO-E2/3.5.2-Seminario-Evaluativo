// Declaraciones para expandir el objeto window global con funciones personalizadas
declare global {
  interface Window {
    showModal: (id: number) => void;
    deleteProduct: (id: number) => void;
    loadTable: (products: Product[]) => void;
  }
}

// Importación de la clase Product
import { Product } from "./clases.js";

let currentProducts: Product[] = [];
let isSearchActive: boolean = false;
const tableBody: HTMLTableSectionElement | null =
  document.querySelector("#table-body");
const itemsPerPage: number = 10;
let currentPage: number = 0;

window.loadTable = (products: Product[]): void => {
  if (tableBody) {
    tableBody.innerHTML = "";
    products.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td><img src="${item.thumbnail}" alt="${
        item.title
      }" style="width: 50px;"></td>
        <td>${item.description}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>${item.discountPercentage.toFixed(2)}%</td>
        <td>${item.rating.toFixed(2)}</td>
        <td>${item.stock}</td>
        <td>${item.brand}</td>
        <td>${item.category}</td>
        <td>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-primary" onclick="window.showModal(${
              item.id
            })">View</button>
            <button class="btn btn-outline-secondary">Edit</button>
            <button class="btn btn-outline-danger" onclick="window.deleteProduct(${
              item.id
            })">Delete</button>
          </div>
        </td>`;
      tableBody.appendChild(row);
    });
    updatePaginationButtons(products.length);
  }
};

const fetchProducts = (): void => {
  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      currentProducts = data.products;
      isSearchActive = false;
      currentPage = 0;
      window.loadTable(currentProducts.slice(0, itemsPerPage));
    })
    .catch((error) => console.error("Error fetching products:", error));
};

const updatePaginationButtons = (numOfProducts: number) => {
  const prevPageButton = document.getElementById(
    "prevPage"
  ) as HTMLButtonElement;
  const nextPageButton = document.getElementById(
    "nextPage"
  ) as HTMLButtonElement;
  // Si hay menos de 10 productos en total, siempre desactiva ambos botones.
  if (numOfProducts < itemsPerPage) {
    prevPageButton.disabled = true;
    nextPageButton.disabled = true;
  } else {
    // Habilita o deshabilita basado en la posición actual de la página
    prevPageButton.disabled = currentPage === 0;
    nextPageButton.disabled = (currentPage + 1) * itemsPerPage >= numOfProducts;
  }
};

document.getElementById("prevPage")?.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    const sliceStart = currentPage * itemsPerPage;
    const sliceEnd = sliceStart + itemsPerPage;
    window.loadTable(currentProducts.slice(sliceStart, sliceEnd));
  }
});

document.getElementById("nextPage")?.addEventListener("click", () => {
  const sliceStart = (currentPage + 1) * itemsPerPage;
  if (sliceStart < currentProducts.length) {
    currentPage++;
    const sliceEnd = sliceStart + itemsPerPage;
    window.loadTable(currentProducts.slice(sliceStart, sliceEnd));
  }
});

fetchProducts();
