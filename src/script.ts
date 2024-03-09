interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string; // URL de la imagen
  images: string[]; // URLs de imágenes adicionales
}

async function fetchProducts(page: number = 1) {
  console.log(`Cargando productos para la página ${page}...`);
  const response = await fetch(
    `https://dummyjson.com/products?skip=${(page - 1) * 10}&limit=10`
  );
  const data = await response.json();

  displayProducts(data.products);
  setupPagination(data.total, page);
  console.log("Hola, mundo!");
}

function displayProducts(products: Product[]) {
  const productList = document.getElementById("product-list");
  if (productList) {
    productList.innerHTML = ""; // Limpiar la lista de productos existente

    products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>${product.discountPercentage}</td>
        <td>${product.rating}</td>
        <td>${product.stock}</td>
        <td>${product.brand}</td>
        <td>${product.category}</td>
        <td><img src="${
          product.thumbnail
        }" alt="Thumbnail" width="50" height="50"></td>
        <td>${product.images.join(", ")}</td>
        <td class="text-center">
        <button class="btn btn-primary btn-sm me-2 view-button" ><i class="fas fa-eye"></i></button>
        <button class="btn btn-secondary btn-sm me-2 edit-button"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger btn-sm delete-button" onclick="deleteProduct(${
          product.id
        }, this)"><i class="fas fa-trash"></i></button>
      </td>
      
      `;
      productList.appendChild(row);
    });
  }
}

function setupPagination(totalItems: number, currentPage: number) {
  const pagination = document.querySelector(".pagination");
  if (pagination !== null) {
    pagination.innerHTML = ""; // Limpiar paginación existente
    const totalPages = Math.ceil(totalItems / 10);

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.className = `page-item ${i === currentPage ? "active" : ""}`;
      li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      li.addEventListener("click", (event) => {
        event.preventDefault(); // Evita que la página se recargue
        fetchProducts(i);
      });
      pagination.appendChild(li);
    }
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
