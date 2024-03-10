import { Product } from "./clases.js";

let currentProducts: Product[] = [];
let isSearchActive: boolean = false;

async function loadCategories() {
  const response = await fetch("https://dummyjson.com/products/categories");
  const categories: string[] = await response.json();
  const select = document.getElementById("searchCategory") as HTMLSelectElement;
  categories.forEach((category) => {
    const option = new Option(category, category);
    select.add(option);
  });
}

async function searchProducts(name: string, price: number, category: string) {
  let url = `https://dummyjson.com/products/search?q=${name}`;
  const response = await fetch(url);
  const data = await response.json();
  let filteredProducts: Product[] = data.products;

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

  currentProducts = filteredProducts;
  isSearchActive = true;
  window.loadTable(filteredProducts); // Muestra todos los productos filtrados
}

document.getElementById("searchForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = (document.getElementById("searchName") as HTMLInputElement)
    .value;
  const price = parseFloat(
    (document.getElementById("searchPrice") as HTMLInputElement).value
  );
  const category = (
    document.getElementById("searchCategory") as HTMLSelectElement
  ).value;

  searchProducts(name, price, category);
});

document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
});
