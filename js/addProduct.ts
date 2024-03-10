// Importación de la clase Product
import { Product } from "./clases.js";
import { currentProducts, loadTable, itemsPerPage } from "./app.js";

  // Aquí puedes agregar las validaciones necesarias para tu producto
  // Por ejemplo, verificar que el título no esté vacío
export function validateProduct(product: Product): boolean {
  if (!product.title) {
    alert("El título del producto es obligatorio.");
    return false;
  }
  // Add more validations as needed
  if (!product.description) {
    alert("La descripción del producto es obligatoria.");
    return false;
  }
  if (isNaN(product.price) || product.price <= 0) {
    alert("El precio del producto debe ser un número positivo.");
    return false;
  }
  // Add additional validations for other fields if necessary
  // Agrega aquí más validaciones según tus necesidades
  return true;
}

export async function addProduct(): Promise<void> {
  const productModalNew = document.getElementById("ProductModalNew") as HTMLInputElement;
  const descriptionModalNew = document.getElementById("DescriptionModalNew") as HTMLInputElement;
  const priceModalNew = document.getElementById("PriceModalNew") as HTMLInputElement;
  const discountModalNew = document.getElementById("DiscountModalNew") as HTMLInputElement;
  const ratingModalNew = document.getElementById("RatingModalNew") as HTMLInputElement;
  const stockModalNew = document.getElementById("StockModalNew") as HTMLInputElement;
  const brandModalNew = document.getElementById("BrandModalNew") as HTMLInputElement;
  const categoryModalNew = document.getElementById("CategoryModalNew") as HTMLSelectElement;
  const thumbnailModalNew = document.getElementById("ThumbnailModalNew") as HTMLInputElement;
  const imagesModalNew = document.getElementById("ImagesModalNew") as HTMLInputElement;

  const product = new Product(
    Date.now(), // Using current timestamp as a mock ID
    productModalNew.value.trim(),
    descriptionModalNew.value.trim(),
    parseFloat(priceModalNew.value),
    parseFloat(discountModalNew.value),
    parseFloat(ratingModalNew.value),
    parseInt(stockModalNew.value),
    brandModalNew.value.trim(),
    categoryModalNew.value,
    thumbnailModalNew.value.trim(),
    imagesModalNew.value.split(',') // Assuming images are comma-separated
  );

  if (!validateProduct(product)) {
    return;
  }

// Función para añadir un producto
export async function addProduct(product: Product): Promise<void> {
  if (!validateProduct(product)) {
    return;
  }

  const response = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: product.title,
      description: product.description,
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
      thumbnail: product.thumbnail,
      images: product.images
    }),
  });

  if (response.ok) {
    alert("Operación exitosa");
    currentProducts.push(product);
    const startIndex = currentProducts.length - itemsPerPage;
    loadTable(currentProducts.slice(startIndex));
  } else {
    alert("Hubo un error al añadir el producto");
  }
}
