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

export let currentProducts: Product[] = [];
export let isSearchActive: boolean = false;
export let currentPage: number = 0;
export const itemsPerPage: number = 10;

const tableBody: HTMLTableSectionElement | null =
  document.querySelector("#table-body");

export function setIsSearchActive(value: boolean): void {
  isSearchActive = value;
}

export function setCurrentProducts(products: Product[]): void {
  currentProducts = products;
}

export const loadTable = (products: Product[]): void => {
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
            <button class="btn btn-outline-primary">View</button>
            <button class="btn btn-outline-secondary">Edit</button>
            <button class="btn btn-outline-danger">Delete</button>
          </div>
        </td>`;
      tableBody.appendChild(row);
    });
  }
  updatePaginationButtons();
};

export const updatePaginationButtons = (): void => {
  const prevPageButton = document.getElementById(
    "prevPage"
  ) as HTMLButtonElement;
  const nextPageButton = document.getElementById(
    "nextPage"
  ) as HTMLButtonElement;

  // Siempre permite la paginación cuando hay más productos de los que se pueden mostrar en una página.
  const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
  const isPaginationNeeded = totalPages > 1;

  prevPageButton.disabled = !isPaginationNeeded || currentPage === 0;
  nextPageButton.disabled =
    !isPaginationNeeded || currentPage >= totalPages - 1;
};

export const fetchProducts = async (): Promise<void> => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  currentProducts = data.products;
  isSearchActive = false;
  currentPage = 0;
  loadTable(currentProducts.slice(0, itemsPerPage));
};

// Event listeners for pagination
document.getElementById("prevPage")?.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    window.loadTable(
      currentProducts.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      )
    );
  }
});

document.getElementById("nextPage")?.addEventListener("click", () => {
  const sliceStart = (currentPage + 1) * itemsPerPage;
  if (sliceStart < currentProducts.length) {
    currentPage++;
    window.loadTable(
      currentProducts.slice(sliceStart, sliceStart + itemsPerPage)
    );
  }
});

// Initialize products table on document load
document.addEventListener("DOMContentLoaded", fetchProducts);
