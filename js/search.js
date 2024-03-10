var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Función para cargar las categorías en el selector del formulario de búsqueda
function loadCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://dummyjson.com/products/categories");
        const categories = yield response.json();
        const select = document.getElementById("searchCategory");
        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            select.appendChild(option);
        });
    });
}
function searchProducts(name, price, category) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `https://dummyjson.com/products/search?q=${name}`;
        const response = yield fetch(url);
        const data = yield response.json();
        let products = data.products;
        // Filtrar por precio si se proporcionó
        if (price > 0) {
            products = products.filter((product) => product.price <= price);
        }
        // Filtrar por categoría si se proporcionó
        if (category) {
            products = products.filter((product) => product.category === category);
        }
        updateTableWithProducts(products);
    });
}
// Event listener para el formulario de búsqueda
document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("searchName")
        .value;
    const price = +document.getElementById("searchPrice")
        .value;
    const category = document.getElementById("searchCategory").value;
    searchProducts(name, price, category);
});
function updateTableWithProducts(products) {
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
            buttons[2].addEventListener("click", () => window.deleteProduct(product.id));
            tableBody.appendChild(row);
        });
    }
    else {
        console.error("Table body not found.");
    }
}
// Cargar las categorías cuando se carga el documento
document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
});
export {};
