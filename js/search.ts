import { Product } from "./clases.js";
import {
  currentProducts,
  loadTable,
  updatePaginationButtons,
  fetchProducts,
  itemsPerPage,
  setIsSearchActive,
  setCurrentProducts,
} from "./app.js";

async function loadCategories(): Promise<void> {
  try {
    const response = await fetch("https://dummyjson.com/products/categories");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const categories = await response.json();
    const selectElement = document.getElementById(
      "searchCategory"
    ) as HTMLSelectElement;
    selectElement.options.length = 0;
    selectElement.add(new Option("All categories", "All"));
    categories.forEach((category: string) => {
      selectElement.add(new Option(category, category));
    });
  } catch (error) {
    console.error("Error loading categories:", error);
  }
}

async function searchProducts(
  name: string,
  price: number,
  category: string
): Promise<void> {
  setIsSearchActive(true);

  let filteredProducts: Product[] = [];

  if (category === "All") {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    filteredProducts = data.products;

    // Aplica los filtros de nombre y precio aquí, incluso si la categoría es "All"
    if (name) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (price > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= price
      );
    }

    setIsSearchActive(false); // Considerar qué valor debería tener esto basado en tu lógica
  } else {
    // La lógica existente para manejar búsquedas específicas de categoría
    const url = `https://dummyjson.com/products/search?q=${name}`;
    const response = await fetch(url);
    const data = await response.json();
    filteredProducts = data.products;

    if (price > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= price
      );
    }
    if (category && category !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }
  }

  setCurrentProducts(filteredProducts);
  loadTable(filteredProducts.slice(0, itemsPerPage));
  updatePaginationButtons();
}

document.getElementById("searchForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("searchName") as HTMLInputElement;
  const priceInput = document.getElementById("searchPrice") as HTMLInputElement;
  const categorySelect = document.getElementById(
    "searchCategory"
  ) as HTMLSelectElement;

  searchProducts(
    nameInput.value,
    parseFloat(priceInput.value || "0"),
    categorySelect.value
  );
});

document.addEventListener("DOMContentLoaded", loadCategories);
