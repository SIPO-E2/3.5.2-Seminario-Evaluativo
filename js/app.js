var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
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
            <button class="btn btn-outline-dark" onclick=""><i class="fa fa-eye" aria-hidden="true"></i></button>
            <button class="btn btn-outline-warning" onclick=""><i class="fa fa-pencil" aria-hidden="true"></i></button>
            <button class="btn btn-outline-danger" onclick=""><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
    </td>`;
            tableBody.appendChild(row);
        });
    }
    updatePaginationButtons();
};
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
const addProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const productModalNew = document.getElementById("ProductModalNew");
    const descriptionModalNew = document.getElementById("DescriptionModalNew");
    const priceModalNew = document.getElementById("PriceModalNew");
    const discountModalNew = document.getElementById("DiscountModalNew");
    const ratingModalNew = document.getElementById("RatingModalNew");
    const stockModalNew = document.getElementById("StockModalNew");
    const brandModalNew = document.getElementById("BrandModalNew");
    const categoryModalNew = document.getElementById("CategoryModalNew");
    const thumbnailModalNew = document.getElementById("ThumbnailModalNew");
    const imagesModalNew = document.getElementById("ImagesModalNew");
    console.log(productModalNew.value.trim(), descriptionModalNew.value.trim(), priceModalNew.value.trim(), discountModalNew.value.trim(), ratingModalNew.value.trim(), stockModalNew.value.trim(), brandModalNew.value.trim(), categoryModalNew.value.trim(), thumbnailModalNew.value.trim(), imagesModalNew.value.trim());
    // Validate required fields
    if (productModalNew.value.trim() === "" ||
        descriptionModalNew.value.trim() === "" ||
        priceModalNew.value.trim() === "" ||
        discountModalNew.value.trim() === "" ||
        ratingModalNew.value.trim() === "" ||
        stockModalNew.value.trim() === "" ||
        brandModalNew.value.trim() === "" ||
        categoryModalNew.value.trim() === "" ||
        thumbnailModalNew.value.trim() === "" ||
        imagesModalNew.value.trim() === "") {
        console.log(productModalNew.value.trim(), descriptionModalNew.value.trim(), priceModalNew.value.trim(), discountModalNew.value.trim(), ratingModalNew.value.trim(), stockModalNew.value.trim(), brandModalNew.value.trim(), categoryModalNew.value.trim(), thumbnailModalNew.value.trim(), imagesModalNew.value.trim());
        alert("Please fill in all required fields.");
        return;
    }
    // Validate field values
    if (isNaN(Number(priceModalNew.value)) || isNaN(Number(discountModalNew.value)) || isNaN(Number(ratingModalNew.value)) || isNaN(Number(stockModalNew.value))) {
        alert("Invalid field values.");
        return;
    }
    const newProduct = {
        product: productModalNew.value.trim(),
        description: descriptionModalNew.value.trim(),
        price: Number(priceModalNew.value),
        discountPercentage: Number(discountModalNew.value),
        rating: Number(ratingModalNew.value),
        stock: Number(stockModalNew.value),
        brand: brandModalNew.value.trim(),
        category: categoryModalNew.value.trim(),
        thumbnailURL: thumbnailModalNew.value.trim(),
        imagesURL: imagesModalNew.value.trim(),
    };
    try {
        const response = yield fetch("https://dummyjson.com/products/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });
        if (response.ok) {
            alert("Product added successfully.");
        }
        else {
            alert("Failed to add product.");
        }
    }
    catch (error) {
        alert("An error occurred while adding the product.");
    }
});
(_c = document.getElementById("addProductBtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", addProduct);
document.addEventListener("DOMContentLoaded", fetchProducts);
window.addProduct = addProduct;
