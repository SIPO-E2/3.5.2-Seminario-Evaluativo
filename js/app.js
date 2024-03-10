var _a, _b;
let currentProducts = [];
let isSearchActive = false;
const tableBody = document.querySelector("#table-body");
const itemsPerPage = 10;
let currentPage = 0;
window.loadTable = (products) => {
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
            <button class="btn btn-outline-primary" onclick="window.showModal(${item.id})">View</button>
            <button class="btn btn-outline-secondary">Edit</button>
            <button class="btn btn-outline-danger" onclick="window.deleteProduct(${item.id})">Delete</button>
          </div>
        </td>`;
            tableBody.appendChild(row);
        });
        updatePaginationButtons(products.length);
    }
};
const fetchProducts = () => {
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
const updatePaginationButtons = (numOfProducts) => {
    const prevPageButton = document.getElementById("prevPage");
    const nextPageButton = document.getElementById("nextPage");
    // Si hay menos de 10 productos en total, siempre desactiva ambos botones.
    if (numOfProducts < itemsPerPage) {
        prevPageButton.disabled = true;
        nextPageButton.disabled = true;
    }
    else {
        // Habilita o deshabilita basado en la posición actual de la página
        prevPageButton.disabled = currentPage === 0;
        nextPageButton.disabled = (currentPage + 1) * itemsPerPage >= numOfProducts;
    }
};
(_a = document.getElementById("prevPage")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        const sliceStart = currentPage * itemsPerPage;
        const sliceEnd = sliceStart + itemsPerPage;
        window.loadTable(currentProducts.slice(sliceStart, sliceEnd));
    }
});
(_b = document.getElementById("nextPage")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    const sliceStart = (currentPage + 1) * itemsPerPage;
    if (sliceStart < currentProducts.length) {
        currentPage++;
        const sliceEnd = sliceStart + itemsPerPage;
        window.loadTable(currentProducts.slice(sliceStart, sliceEnd));
    }
});
fetchProducts();
export {};
