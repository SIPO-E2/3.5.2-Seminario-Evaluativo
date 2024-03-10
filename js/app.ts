// Declaraciones para expandir el objeto window global con funciones personalizadas
declare global {
  interface Window {
    showModal: (id: number) => void;
    deleteProduct: (id: number) => void;
    loadTable: (products: Product[]) => void;
    editModal: (id: number) => void;
  }
}
// Importación de la clase Product
import { Product } from './clases.js';
import * as bootstrap from 'bootstrap';

// DOM elements
const tableBody: HTMLTableSectionElement | null = document.querySelector('#table-body');
const myModal_edit: bootstrap.Modal = new bootstrap.Modal(document.getElementById('modalEditProduct')!);


// Constants and variables
const itemsPerPage: number = 10;
let currentPage: number = 0;
let idProductUpdate: number | null = null;

// Fetch products function
const fetchProducts = (): void => {
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then((data: { products: Product[] }) => {
            const products: Product[] = data.products;
            loadTable(products);

            // Pagination buttons event listeners
            document.getElementById('prevPage')!.addEventListener('click', () => {
                if (currentPage > 0) {
                    currentPage--;
                    loadTable(products);
                }
            });

            document.getElementById('nextPage')!.addEventListener('click', () => {
                const maxPage: number = Math.ceil(products.length / itemsPerPage) - 1;
                if (currentPage < maxPage) {
                    currentPage++;
                    loadTable(products);
                }
            });

            // Show modal function
            window.editModal = (id: number, viewOnly: boolean = false): void => {
                idProductUpdate = id;
                const index: number = products.findIndex((item) => item.id === idProductUpdate);
                document.querySelector<HTMLInputElement>('#ProductModal')!.value = products[index].title;
                document.querySelector<HTMLInputElement>('#DescriptionModal')!.value = products[index].description;
                document.querySelector<HTMLInputElement>('#PriceModal')!.value = products[index].price.toString();
                document.querySelector<HTMLInputElement>('#DiscountModal')!.value = products[index].discountPercentage.toString();
                document.querySelector<HTMLInputElement>('#RatingModal')!.value = products[index].rating.toString();
                document.querySelector<HTMLInputElement>('#StockModal')!.value = products[index].stock.toString();
                document.querySelector<HTMLInputElement>('#BrandModal')!.value = products[index].brand;
                const categoryId: string = products[index].category;
                const categorySelect: HTMLSelectElement = document.querySelector('#CategoryModal')!;
                const optionsArray: HTMLOptionElement[] = Array.from(categorySelect.options);
                for (let option of optionsArray) {
                    if (option.value === categoryId) {
                        option.selected = true;
                    }
                }

                document.querySelector<HTMLInputElement>('#ThumbnailModal')!.value = products[index].thumbnail;
                document.querySelector<HTMLInputElement>('#ImagesModal')!.value = products[index].images;

                const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('#modalEditProduct input, #modalEditProduct select');
                inputs.forEach(input => {
                    input.disabled = viewOnly;
                });

                if (viewOnly) {
                    document.getElementById('ThumbnailModal')!.style.display = 'none';
                    document.getElementById('ImagesModal')!.style.display = 'none';
                    document.getElementById('saveChangesBtn')!.style.display = 'none';

                    const labels: NodeListOf<HTMLLabelElement>| null = document.querySelectorAll('#modalEditProduct label');
                    if (labels){
                        labels.forEach(label => {
                            const htmlFor = label.htmlFor;
                            if (htmlFor === 'ImagesModal' || htmlFor === 'ThumbnailModal') {
                                label.style.display = viewOnly ? 'none' : 'block';
                            }
                        });
                    }
                }

                if (myModal_edit) {
                    myModal_edit.show();
                } else {
                    console.error("myModal_edit is null. Unable to show modal.");
                }
            };

            // Update product function
            const productUpdate = (e: Event): void => {
                e.preventDefault();
                const index: number = products.findIndex((item) => item.id === idProductUpdate);
                products[index].title = document.querySelector<HTMLInputElement>('#ProductModal')!.value;
                products[index].description = document.querySelector<HTMLInputElement>('#DescriptionModal')!.value;
                products[index].price = parseFloat(document.querySelector<HTMLInputElement>('#PriceModal')!.value);
                products[index].discountPercentage = parseFloat(document.querySelector<HTMLInputElement>('#DiscountModal')!.value);
                products[index].rating = parseFloat(document.querySelector<HTMLInputElement>('#RatingModal')!.value);
                products[index].stock = parseInt(document.querySelector<HTMLInputElement>('#StockModal')!.value, 10);
                products[index].brand = document.querySelector<HTMLInputElement>('#BrandModal')!.value;
                products[index].category = document.querySelector<HTMLSelectElement>('#CategoryModal')!.value;
                products[index].thumbnail = document.querySelector<HTMLInputElement>('#ThumbnailModal')!.value;
                products[index].images = document.querySelector<HTMLInputElement>('#ImagesModal')!.value;
                loadTable(products);
                if (myModal_edit) {
                    myModal_edit.hide();
                } else {
                    console.error("myModal_edit is null. Unable to show modal.");
                }
            };

            // Event listeners
            document.querySelector<HTMLFormElement>('#formModal')!.addEventListener('submit', productUpdate);
            document.getElementById('saveChangesBtn')!.addEventListener('click', productUpdate);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
};


// Load table function
const loadTable = (products: Product[]): void => {
    if (tableBody) {
        tableBody.innerHTML = '';
        const startIndex: number = currentPage * itemsPerPage;
        const endIndex: number = startIndex + itemsPerPage;
        const productsToShow: Product[] = products.slice(startIndex, endIndex);
        productsToShow.forEach(item => {
            const row: HTMLTableRowElement = document.createElement('tr');
            const cells: string = `
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td><img src="${item.thumbnail}" alt="Thumbnail" style="max-width: 150px;"></td>
                    <td>${item.description}</td>
                    <td>$${item.price}</td>
                    <td>%${item.discountPercentage}</td>
                    <td>${item.rating}</td>
                    <td>${item.stock}</td>
                    <td>${item.brand}</td>
                    <td>${item.category}</td>
                    <td>
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-dark" onclick="showModal(${item.id}, true)"><i class="fa fa-eye" aria-hidden="true"></i></button>
                            <button class="btn btn-outline-warning" onclick="editModal(${item.id})"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                            <button class="btn btn-outline-danger" onclick="deleteProduct(${item.id})"><i class="fa fa-times" aria-hidden="true"></i></button>
                        </div>
                    </td>`;
            row.innerHTML = cells;
            tableBody.appendChild(row);
        });
    } else {
        console.error("tableBody is null. Unable to update the table.");
    }
};

fetchProducts();
