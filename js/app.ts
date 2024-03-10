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
  const totalNumberOfPages = Math.ceil(currentProducts.length / itemsPerPage);

  // Si "isSearchActive" es false y hay más de una página, o si se selecciona "All categories", permitir paginación.
  const allowPagination = isSearchActive ? totalNumberOfPages > 1 : true;

  prevPageButton.disabled = !allowPagination || currentPage === 0;
  nextPageButton.disabled =
    !allowPagination || currentPage >= totalNumberOfPages - 1;
};

export const fetchProducts = async (): Promise<void> => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  currentProducts = data.products;
  isSearchActive = false;
  currentPage = 0;
  loadTable(currentProducts.slice(0, itemsPerPage));
};

document.getElementById("prevPage")?.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    loadTable(currentProducts.slice(startIndex, endIndex));
    updatePaginationButtons();
  }
});

document.getElementById("nextPage")?.addEventListener("click", () => {
  const totalNumberOfPages = Math.ceil(currentProducts.length / itemsPerPage);
  if (currentPage < totalNumberOfPages - 1) {
    currentPage++;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    loadTable(currentProducts.slice(startIndex, endIndex));
    updatePaginationButtons();
  }
});

// Initialize products table on document load
document.addEventListener("DOMContentLoaded", fetchProducts);
