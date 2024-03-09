interface Product {
  id: number;
  title: string;
  price: number;
}

async function fetchProducts(page: number = 1) {
  const response = await fetch(
    `https://dummyjson.com/products?skip=${(page - 1) * 10}&limit=10`
  );
  const data = await response.json();

  displayProducts(data.products);
  setupPagination(data.total, page);
}

function displayProducts(products: Product[]) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Limpiar la lista de productos existente

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
    productList.appendChild(row);
  });
}

function setupPagination(totalItems: number, currentPage: number) {
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = ""; // Limpiar paginación existente
  const totalPages = Math.ceil(totalItems / 10);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", () => fetchProducts(i));
    pagination.appendChild(li);
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  const form = document.getElementById("add-product-form") as HTMLFormElement;
  form.onsubmit = async (e) => {
    e.preventDefault();

    // Captura los valores del formulario
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const price = parseFloat(
      (document.getElementById("price") as HTMLInputElement).value
    );
    const category = (document.getElementById("category") as HTMLInputElement)
      .value;

    // Crea el objeto del producto
    const product = { title, price, category };

    // Envía el producto a la API
    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();

      // Muestra una alerta o actualiza la UI según sea necesario
      alert("Producto añadido con éxito: " + data.title);
    } catch (error) {
      console.error("Error al añadir el producto:", error);
      alert("Error al añadir el producto.");
    }
  };
});

// Inicia la carga de productos en la primera página
fetchProducts();
