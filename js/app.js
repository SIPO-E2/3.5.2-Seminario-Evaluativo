import * as bootstrap from 'bootstrap';
// DOM elements
const tableBody = document.querySelector('#table-body');
const myModal_edit = new bootstrap.Modal(document.getElementById('modalEditProduct'));
// Constants and variables
const itemsPerPage = 10;
let currentPage = 0;
let idProductUpdate = null;
// Fetch products function
const fetchProducts = () => {
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then((data) => {
        const products = data.products;
        loadTable(products);
        
        document.getElementById('prevPage').addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                loadTable(products);
            }
        });
        document.getElementById('nextPage').addEventListener('click', () => {
            const maxPage = Math.ceil(products.length / itemsPerPage) - 1;
            if (currentPage < maxPage) {
                currentPage++;
                loadTable(products);
            }
        });
        // Show modal function
        window.editModal = (id, viewOnly = false) => {
            idProductUpdate = id;
            const index = products.findIndex((item) => item.id === idProductUpdate);
            document.querySelector('#ProductModal').value = products[index].title;
            document.querySelector('#DescriptionModal').value = products[index].description;
            document.querySelector('#PriceModal').value = products[index].price.toString();
            document.querySelector('#DiscountModal').value = products[index].discountPercentage.toString();
            document.querySelector('#RatingModal').value = products[index].rating.toString();
            document.querySelector('#StockModal').value = products[index].stock.toString();
            document.querySelector('#BrandModal').value = products[index].brand;
            const categoryId = products[index].category;
            const categorySelect = document.querySelector('#CategoryModal');
            const optionsArray = Array.from(categorySelect.options);
            for (let option of optionsArray) {
                if (option.value === categoryId) {
                    option.selected = true;
                }
            }
            document.querySelector('#ThumbnailModal').value = products[index].thumbnail;
            document.querySelector('#ImagesModal').value = products[index].images;
            const inputs = document.querySelectorAll('#modalEditProduct input, #modalEditProduct select');
            inputs.forEach(input => {
                input.disabled = viewOnly;
            });
            if (viewOnly) {
                document.getElementById('ThumbnailModal').style.display = 'none';
                document.getElementById('ImagesModal').style.display = 'none';
                document.getElementById('saveChangesBtn').style.display = 'none';
                const labels = document.querySelectorAll('#modalEditProduct label');
                if (labels) {
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
            }
            else {
                console.error("myModal_edit is null. Unable to show modal.");
            }
        };
        // Update product function
        const productUpdate = (e) => {
            e.preventDefault();
            const index = products.findIndex((item) => item.id === idProductUpdate);
            products[index].title = document.querySelector('#ProductModal').value;
            products[index].description = document.querySelector('#DescriptionModal').value;
            products[index].price = parseFloat(document.querySelector('#PriceModal').value);
            products[index].discountPercentage = parseFloat(document.querySelector('#DiscountModal').value);
            products[index].rating = parseFloat(document.querySelector('#RatingModal').value);
            products[index].stock = parseInt(document.querySelector('#StockModal').value, 10);
            products[index].brand = document.querySelector('#BrandModal').value;
            products[index].category = document.querySelector('#CategoryModal').value;
            products[index].thumbnail = document.querySelector('#ThumbnailModal').value;
            products[index].images = document.querySelector('#ImagesModal').value;
            loadTable(products);
            if (myModal_edit) {
                myModal_edit.hide();
            }
            else {
                console.error("myModal_edit is null. Unable to show modal.");
            }
        };
        // Event listeners
        document.querySelector('#formModal').addEventListener('submit', productUpdate);
        document.getElementById('saveChangesBtn').addEventListener('click', productUpdate);
    })
        .catch(error => {
        console.error('Error fetching products:', error);
    });
};
// Load table function
const loadTable = (products) => {
    if (tableBody) {
        tableBody.innerHTML = '';
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const productsToShow = products.slice(startIndex, endIndex);
        productsToShow.forEach(item => {
            const row = document.createElement('tr');
            const cells = `
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
    }
    else {
        console.error("tableBody is null. Unable to update the table.");
    }
};
fetchProducts();
