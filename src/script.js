"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchProducts() {
    return __awaiter(this, arguments, void 0, function* (page = 1) {
        const response = yield fetch(`https://dummyjson.com/products?skip=${(page - 1) * 10}&limit=10`);
        const data = yield response.json();
        displayProducts(data.products);
        setupPagination(data.total, page);
    });
}
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    if (productList) {
        productList.innerHTML = ""; // Limpiar la lista de productos existente
        // Y así sucesivamente para las demás operaciones con productList
    } // Limpiar la lista de productos existente
    products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.title}</td>
          <td>${product.price}</td>
          <td>
              <button class="btn btn-primary btn-sm">Ver</button>
              <button class="btn btn-secondary btn-sm">Modificar</button>
          </td>
      `;
        const productList = document.getElementById("product-list"); // El '!' al final asegura a TypeScript que este elemento no es null.
    });
}
function setupPagination(totalItems, currentPage) {
    const pagination = document.querySelector(".pagination");
    if (pagination) {
        pagination.innerHTML = ""; // Limpiar paginación existente
        // Y así sucesivamente para las demás operaciones con pagination
    }
    const totalPages = Math.ceil(totalItems / 10);
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === currentPage ? "active" : ""}`;
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        li.addEventListener("click", () => fetchProducts(i));
        const pagination = document.querySelector(".pagination"); // Igualmente aquí.
    }
}
window.addEventListener("DOMContentLoaded", (event) => {
    const form = document.getElementById("add-product-form");
    form.onsubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        // Captura los valores del formulario
        const title = document.getElementById("title").value;
        const price = parseFloat(document.getElementById("price").value);
        const category = document.getElementById("category")
            .value;
        // Crea el objeto del producto
        const product = { title, price, category };
        // Envía el producto a la API
        try {
            const response = yield fetch("https://dummyjson.com/products/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
            const data = yield response.json();
            // Muestra una alerta o actualiza la UI según sea necesario
            alert("Producto añadido con éxito: " + data.title);
        }
        catch (error) {
            console.error("Error al añadir el producto:", error);
            alert("Error al añadir el producto.");
        }
    });
});
// Inicia la carga de productos en la primera página
fetchProducts();
