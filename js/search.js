var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
// Asume que las siguientes variables son exportadas desde app.ts o definidas de nuevo aquí de manera similar
let currentProducts = [];
let isSearchActive = false;
function loadCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://dummyjson.com/products/categories");
        const categories = yield response.json();
        const select = document.getElementById("searchCategory");
        categories.forEach((category) => {
            const option = new Option(category, category);
            select.add(option);
        });
    });
}
function searchProducts(name, price, category) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `https://dummyjson.com/products/search?q=${name}`;
        const response = yield fetch(url);
        const data = yield response.json();
        let filteredProducts = data.products;
        if (price > 0) {
            filteredProducts = filteredProducts.filter((product) => product.price <= price);
        }
        if (category && category !== "All") {
            filteredProducts = filteredProducts.filter((product) => product.category === category);
        }
        currentProducts = filteredProducts;
        isSearchActive = true;
        window.loadTable(filteredProducts); // Muestra todos los productos filtrados
    });
}
(_a = document.getElementById("searchForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("searchName")
        .value;
    const price = parseFloat(document.getElementById("searchPrice").value);
    const category = document.getElementById("searchCategory").value;
    searchProducts(name, price, category);
});
document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
});
export {};
