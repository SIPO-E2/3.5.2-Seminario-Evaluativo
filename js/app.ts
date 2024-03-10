// Declaraciones para expandir el objeto window global con funciones personalizadas
declare global {
  interface Window {
    showModal: (id: number) => void;
    deleteProduct: (id: number) => void;
    loadTable: (products: Product[]) => void;
    addProduct: () => void;
  }
}
// Importación de la clase Product
import { Product } from "./clases.js";

export let currentProducts: Product[] = [];
export let isSearchActive: boolean = false;
export let currentPage: number = 0;
export const itemsPerPage: number = 10;

const tableBody: HTMLTableSectionElement | null =
  document.querySelector("#table-body");

export function setIsSearchActive(value: boolean): void {
  isSearchActive = value;
}

export function setCurrentProducts(products: Product[]): void {
  currentProducts = products;
}

export const loadTable = (products: Product[]): void => {
  if (tableBody) {
    tableBody.innerHTML = "";
    products.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td><img src="${item.thumbnail}" alt="${
        item.title
      }" style="width: 50px;"></td>
        <td>${item.description}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>${item.discountPercentage.toFixed(2)}%</td>
        <td>${item.rating.toFixed(2)}</td>
        <td>${item.stock}</td>
        <td>${item.brand}</td>
        <td>${item.category}</td>
        <td>
        <div class="d-flex gap-2">
            <button class="btn btn-outline-dark" onclick=""><i class="fa fa-eye" aria-hidden="true"></i></button>
            <button class="btn btn-outline-warning" onclick=""><i class="fa fa-pencil" aria-hidden="true"></i></button>
            <button class="btn btn-outline-danger" onclick=""><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
    </td>`;
      tableBody.appendChild(row);
    });
  }
  updatePaginationButtons();
};


export const updatePaginationButtons = (): void => {
  const prevPageButton = document.getElementById(
    "prevPage"
  ) as HTMLButtonElement;
  const nextPageButton = document.getElementById(
    "nextPage"
  ) as HTMLButtonElement;
  const totalNumberOfPages = Math.ceil(currentProducts.length / itemsPerPage);

  // Si "isSearchActive" es false y hay más de una página, o si se selecciona "All categories", permitir paginación.
  const allowPagination = isSearchActive ? totalNumberOfPages > 1 : true;

  prevPageButton.disabled = !allowPagination || currentPage === 0;
  nextPageButton.disabled =
    !allowPagination || currentPage >= totalNumberOfPages - 1;
};



export const fetchProducts = async (): Promise<void> => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  currentProducts = data.products;
  isSearchActive = false;
  currentPage = 0;
  loadTable(currentProducts.slice(0, itemsPerPage));
};

document.getElementById("prevPage")?.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    loadTable(currentProducts.slice(startIndex, endIndex));
    updatePaginationButtons();
  }
});

document.getElementById("nextPage")?.addEventListener("click", () => {
  const totalNumberOfPages = Math.ceil(currentProducts.length / itemsPerPage);
  if (currentPage < totalNumberOfPages - 1) {
    currentPage++;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    loadTable(currentProducts.slice(startIndex, endIndex));
    updatePaginationButtons();
  }
});


    window.addProduct = async (): Promise<void> => {
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
      

      // Validate required fields
      if (
        productModalNew.value.trim() === "" ||
        descriptionModalNew.value.trim() === "" ||
        priceModalNew.value.trim() === "" ||
        discountModalNew.value.trim() === "" ||
        ratingModalNew.value.trim() === "" ||
        stockModalNew.value.trim() === "" ||
        brandModalNew.value.trim() === "" ||
        categoryModalNew.value.trim() === "" ||
        thumbnailModalNew.value.trim() === "" ||
        imagesModalNew.value.trim() === ""
      ) {
        console.log(productModalNew.value.trim(), descriptionModalNew.value.trim(), priceModalNew.value.trim(), discountModalNew.value.trim(), ratingModalNew.value.trim(), stockModalNew.value.trim(), brandModalNew.value.trim(), categoryModalNew.value.trim(), thumbnailModalNew.value.trim(), imagesModalNew.value.trim());
        alert("Please fill in all required fields.");
        return;
      }

      // Validate field values
      if (isNaN(Number(priceModalNew.value)) || isNaN(Number(discountModalNew.value)) || isNaN(Number(ratingModalNew.value)) || isNaN(Number(stockModalNew.value))) {
      if (
        isNaN(Number(priceModalNew.value)) ||
        isNaN(Number(discountModalNew.value)) ||
        isNaN(Number(ratingModalNew.value)) ||
        isNaN(Number(stockModalNew.value))
      ) {
        alert("Invalid field values.");
        return;
      }

      const newProduct = {
        title: productModalNew.value.trim(),
        description: descriptionModalNew.value.trim(),
        price: Number(priceModalNew.value),
        discountPercentage: Number(discountModalNew.value),
        rating: Number(ratingModalNew.value),
        stock: Number(stockModalNew.value),
        brand: brandModalNew.value.trim(),
        category: categoryModalNew.value.trim(),
        thumbnail: thumbnailModalNew.value.trim(),
        images: imagesModalNew.value.split(',').map(url => url.trim()),
      };

      try {
        const response = await fetch("https://dummyjson.com/products/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });

        const responseData = await response.json();

        if (response.ok) {
          alert(`Product added successfully. Product ID: ${responseData.id}`);
        } else {
          alert("Failed to add product.");
          alert(`Failed to add product. Server responded with status: ${response.status}`);
        }
      } catch (error) {
        alert("An error occurred while adding the product.");
      }
    };

document.getElementById("addProductBtn")?.addEventListener("click", addProduct);
document.addEventListener("DOMContentLoaded", fetchProducts);
document.getElementById("addProductBtn")?.addEventListener("click", addProduct);    
document.addEventListener("DOMContentLoaded", fetchProducts);
