var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d;
import { Modal } from 'bootstrap';
import { modal } from "./modals.js";
export let currentProducts = [];
export let isSearchActive = false;
export let currentPage = 0;
export const itemsPerPage = 10;
const tableBody = document.querySelector("#table-body");
export function setIsSearchActive(value) {
    isSearchActive = value;
}
export const setCurrentProducts = (value) => {
    currentProducts = value;
};
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
            <button class="btn btn-outline-dark viewProductBtn" data-product-id="${item.id}"><i class="fa fa-eye" aria-hidden="true"></i></button>
            <button class="btn btn-outline-warning editProductBtn" data-product-id="${item.id}"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            <button class="btn btn-outline-danger" ><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
    </td>`;
            tableBody.appendChild(row);
        });
    }
    updatePaginationButtons();
    attachViewButtonEventListeners();
    attachEditButtonEventListeners();
};
function attachViewButtonEventListeners() {
    document.querySelectorAll('.viewProductBtn').forEach(button => {
        button.addEventListener('click', (event) => {
            var _a;
            const target = event.target;
            const productId = (_a = target.closest('.viewProductBtn')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-product-id');
            if (productId) {
                const product = currentProducts.find(p => p.id.toString() === productId);
                if (product) {
                    productModal('ProductModalView', product);
                }
            }
        });
    });
}
function attachEditButtonEventListeners() {
    document.querySelectorAll('.editProductBtn').forEach(button => {
        button.addEventListener('click', (event) => {
            var _a;
            const target = event.target;
            console.log(target);
            const productId = (_a = target.closest('.editProductBtn')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-product-id');
            console.log(productId);
            if (productId) {
                const product = currentProducts.find(p => p.id.toString() === productId);
                console.log(currentProducts);
                console.log(product);
                if (product) {
                    console.log(product);
                    productModal('ProductModalEdit', product);
                }
            }
        });
    });
}
export const updatePaginationButtons = () => {
    const prevPageButton = document.getElementById("prevPage");
    const nextPageButton = document.getElementById("nextPage");
    const totalNumberOfPages = Math.ceil(currentProducts.length / itemsPerPage);
    // Si "isSearchActive" es false y hay más de una página, o si se selecciona "All categories", permitir paginación.
    const allowPagination = isSearchActive ? totalNumberOfPages > 1 : true;
    prevPageButton.disabled = !allowPagination || currentPage === 0;
    nextPageButton.disabled =
        !allowPagination || currentPage >= totalNumberOfPages - 1;
};
export const fetchProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("https://dummyjson.com/products");
    const data = yield response.json();
    currentProducts = data.products;
    isSearchActive = false;
    currentPage = 0;
    loadTable(currentProducts.slice(0, itemsPerPage));
});
(_a = document.getElementById("prevPage")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        loadTable(currentProducts.slice(startIndex, endIndex));
        updatePaginationButtons();
    }
});
(_b = document.getElementById("nextPage")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    const totalNumberOfPages = Math.ceil(currentProducts.length / itemsPerPage);
    if (currentPage < totalNumberOfPages - 1) {
        currentPage++;
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        loadTable(currentProducts.slice(startIndex, endIndex));
        updatePaginationButtons();
    }
});
window.showModal = (id) => {
    const element = document.getElementById(id);
    if (element) {
        const modal = new Modal(element);
        modal.show();
        element.addEventListener('hidden.bs.modal', resetModalFields);
    }
};
function resetModalFields(event) {
    const modal = event.target;
    if (modal) {
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
            // Re-enable any potentially disabled fields
            const inputs = form.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.removeAttribute('disabled');
            });
        }
        // Show the add/edit button in case it was hidden
        const addProductBtn = modal.querySelector('#addProductBtn');
        if (addProductBtn) {
            addProductBtn.style.display = '';
        }
        // clear the thumbnail display
        const thumbnailDisplay = modal.querySelector('#thumbnailDisplay');
        if (thumbnailDisplay) {
            thumbnailDisplay.src = '';
        }
        // hide the carousel
        const carouselImagesModal = modal.querySelector('#carouselImagesModal');
        if (carouselImagesModal) {
            carouselImagesModal.style.display = 'none';
        }
    }
}
const productModal = (modalID, product) => {
    window.showModal("modalProduct");
    modal(modalID, product);
};
// Event listeners 
(_c = document.getElementById("addNewProductNavbarBtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    productModal("ProductModalNew");
});
(_d = document.getElementById("viewProductBtn")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    productModal("ProductModalView");
});
document.addEventListener("DOMContentLoaded", fetchProducts);
