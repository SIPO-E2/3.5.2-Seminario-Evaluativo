// Declaraciones para expandir el objeto window global con funciones personalizadas
declare global {
  interface Window {
    showModal: (id: string) => void;
    deleteProduct: (id: number) => void;
    loadTable: (products: Product[]) => void;

  }
}

// Importación de la clase Product
import { Product } from "./clases.js";
import { Modal } from 'bootstrap';
import { modal } from "./modals.js";

export let currentProducts: Product[] = [];
export let isSearchActive: boolean = false;
export let currentPage: number = 0;
export const itemsPerPage: number = 10;

const tableBody: HTMLTableSectionElement | null =
  document.querySelector("#table-body");

export function setIsSearchActive(value: boolean): void {
  isSearchActive = value;
}

export const setCurrentProducts = (value: Product[]): void =>{
    currentProducts = value;
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
            <button class="btn btn-outline-dark viewProductBtn" data-product-id="${item.id}"><i class="fa fa-eye" aria-hidden="true"></i></button>
            <button class="btn btn-outline-warning editProductBtn" data-product-id="${item.id}"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            <button class="btn btn-outline-danger" ><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
    </td>`;
      tableBody.appendChild(row);
    });
  }
  updatePaginationButtons();
  attachViewButtonEventListeners();
  attachEditButtonEventListeners();
};

function attachViewButtonEventListeners(): void {
  document.querySelectorAll('.viewProductBtn').forEach(button => {
    button.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const productId = target.closest('.viewProductBtn')?.getAttribute('data-product-id');

      if (productId) {
        const product = currentProducts.find(p => p.id.toString() === productId);

        if (product) {
          productModal('ProductModalView', product);
        }
      }
    });
  });
}
function attachEditButtonEventListeners(): void {
  document.querySelectorAll('.editProductBtn').forEach(button => {
    button.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      console.log(target);
      const productId = target.closest('.editProductBtn')?.getAttribute('data-product-id');
      console.log(productId);
      
      if (productId) {
        const product = currentProducts.find(p => p.id.toString() === productId);
        console.log(currentProducts);
        
        console.log(product);
        
        if (product) {
            console.log(product);
            
          productModal('ProductModalEdit', product);

        }
      }
    });
  });
}

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


window.showModal = (id: string): void => {
  const element = document.getElementById(id);
  if (element) {
    const modal = new Modal(element);
    modal.show();
    element.addEventListener('hidden.bs.modal', resetModalFields);
  }
}

function resetModalFields(event: Event): void {
  const modal = event.target as HTMLElement;
  if (modal) {
    const form = modal.querySelector('form');
    if (form) {
      form.reset();
      // Re-enable any potentially disabled fields
      const inputs = form.querySelectorAll('input, select');
      inputs.forEach(input => {
        input.removeAttribute('disabled');
      });
    }
    // Show the add/edit button in case it was hidden
    const addProductBtn = modal.querySelector('#addProductBtn') as HTMLElement;
    if (addProductBtn) {
      addProductBtn.style.display = '';
    }

    // clear the thumbnail display
    const thumbnailDisplay = modal.querySelector('#thumbnailDisplay') as HTMLImageElement;
    if (thumbnailDisplay) {
      thumbnailDisplay.src = '';
    }

    // hide the carousel
    const carouselImagesModal = modal.querySelector('#carouselImagesModal') as HTMLElement;
    if (carouselImagesModal) {
      carouselImagesModal.style.display = 'none';
    }


  }
}

const productModal = (modalID: string, product?: Product): void => {
  window.showModal("modalProduct");
  modal(modalID, product);
}

// Event listeners 
document.getElementById("addNewProductNavbarBtn")?.addEventListener("click", () => {
  productModal("ProductModalNew");
});


document.getElementById("viewProductBtn")?.addEventListener("click", () => {
  productModal("ProductModalView");
});



document.addEventListener("DOMContentLoaded", fetchProducts);