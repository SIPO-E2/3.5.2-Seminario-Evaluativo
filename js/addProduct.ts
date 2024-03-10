// Importación de la clase Product
import { Product } from "./clases.ts";
import { currentProducts, loadTable, itemsPerPage } from "./app.js";

// Función para validar los campos del producto
function validateProduct(product: Product): boolean {
  // Aquí puedes agregar las validaciones necesarias para tu producto
  // Por ejemplo, verificar que el título no esté vacío
function validateProduct(product: Product): boolean {
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
    body: JSON.stringify(product),
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
