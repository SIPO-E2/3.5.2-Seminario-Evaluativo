var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
export let currentProducts = [];
export let isSearchActive = false;
export let currentPage = 0;
export const itemsPerPage = 10;
const tableBody = document.querySelector("#table-body");
export function setIsSearchActive(value) {
    isSearchActive = value;
}
export function setCurrentProducts(products) {
    currentProducts = products;
}
// This function updates the table body with product rows
export const loadTable = (products) => {
    if (tableBody) {
        tableBody.innerHTML = "";
        products.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td><img src="${item.thumbnail}" alt="${item.title}" style="width: 50px;"></td>
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
// Update the state of pagination buttons based on current data
export const updatePaginationButtons = () => {
    const prevPageButton = document.getElementById("prevPage");
    const nextPageButton = document.getElementById("nextPage");
    // Siempre permite la paginación cuando hay más productos de los que se pueden mostrar en una página.
    const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
    const isPaginationNeeded = totalPages > 1;
    prevPageButton.disabled = !isPaginationNeeded || currentPage === 0;
    nextPageButton.disabled =
        !isPaginationNeeded || currentPage >= totalPages - 1;
};
export const fetchProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("https://dummyjson.com/products");
    const data = yield response.json();
    currentProducts = data.products;
    isSearchActive = false; // Reset search state
    currentPage = 0; // Reset to first page
    loadTable(currentProducts.slice(0, itemsPerPage)); // Load first page
});
// Event listeners for pagination
(_a = document.getElementById("prevPage")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        window.loadTable(currentProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
    }
});
(_b = document.getElementById("nextPage")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    const sliceStart = (currentPage + 1) * itemsPerPage;
    if (sliceStart < currentProducts.length) {
        currentPage++;
        window.loadTable(currentProducts.slice(sliceStart, sliceStart + itemsPerPage));
    }
});
// Initialize products table on document load
document.addEventListener("DOMContentLoaded", fetchProducts);
