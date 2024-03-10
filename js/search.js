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
import { loadTable, updatePaginationButtons, fetchProducts, itemsPerPage, setIsSearchActive, setCurrentProducts, } from "./app.js";
function loadCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://dummyjson.com/products/categories");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const categories = yield response.json();
            const selectElement = document.getElementById("searchCategory");
            selectElement.options.length = 0;
            selectElement.add(new Option("All categories", "All"));
            categories.forEach((category) => {
                selectElement.add(new Option(category, category));
            });
        }
        catch (error) {
            console.error("Error loading categories:", error);
        }
    });
}
function searchProducts(name, price, category) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `https://dummyjson.com/products/search?q=${name}`;
        if (category === "All") {
            setIsSearchActive(false);
            yield fetchProducts();
        }
        else {
            setIsSearchActive(true);
            try {
                const response = yield fetch(url);
                const data = yield response.json();
                let filteredProducts = data.products;
                if (price > 0) {
                    filteredProducts = filteredProducts.filter((product) => product.price <= price);
                }
                if (category && category !== "All") {
                    filteredProducts = filteredProducts.filter((product) => product.category === category);
                }
                setCurrentProducts(filteredProducts);
                loadTable(filteredProducts.slice(0, itemsPerPage));
                updatePaginationButtons();
            }
            catch (error) {
                console.error("Error searching products:", error);
            }
        }
    });
}
(_a = document.getElementById("searchForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("searchName");
    const priceInput = document.getElementById("searchPrice");
    const categorySelect = document.getElementById("searchCategory");
    searchProducts(nameInput.value, parseFloat(priceInput.value || "0"), categorySelect.value);
});
document.addEventListener("DOMContentLoaded", loadCategories);
