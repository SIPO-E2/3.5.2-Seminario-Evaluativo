var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const modal = (modalID, product) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(product);
    const modalProductLabel = document.getElementById("modalProductLabel");
    const productModal = document.getElementById("ProductModal");
    const descriptionModal = document.getElementById("DescriptionModal");
    const priceModal = document.getElementById("PriceModal");
    const discountModal = document.getElementById("DiscountModal");
    const ratingModal = document.getElementById("RatingModal");
    const stockModal = document.getElementById("StockModal");
    const brandModal = document.getElementById("BrandModal");
    const categoryModal = document.getElementById("CategoryModal");
    const thumbnailModal = document.getElementById("ThumbnailModal");
    const imagesModal = document.getElementById("ImagesModal");
    const addProductBtn = document.getElementById("addProductBtn");
    const thumbnailDisplay = document.getElementById('thumbnailDisplay');
    if (product === null || product === void 0 ? void 0 : product.thumbnail) {
        thumbnailDisplay.src = product.thumbnail;
    }
    if (modalID === "ProductModalEdit") {
        modalProductLabel.innerHTML = "Edit Product";
        if (product) {
            // Populate the form with the existing product data
            productModal.value = product.title;
            descriptionModal.value = product.description;
            priceModal.value = product.price.toString();
            discountModal.value = product.discountPercentage.toString();
            ratingModal.value = product.rating.toString();
            stockModal.value = product.stock.toString();
            brandModal.value = product.brand;
            categoryModal.value = product.category;
            thumbnailModal.value = product.thumbnail;
            imagesModal.value = product.images.join(', ');
        }
        modalProductLabel.value = "Edit Product";
        addProductBtn.innerHTML = "Edit Product";
        addProductBtn.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
            // Validate required fields
            // ... (validation code remains the same)
            // Prepare the updated product object
            const updatedProduct = {
            // ... (properties remain the same)
            };
            try {
                const response = yield fetch(`https://dummyjson.com/products/${product === null || product === void 0 ? void 0 : product.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedProduct),
                });
                const responseData = yield response.json();
                console.log(responseData);
                if (response.ok) {
                    alert(`Product updated successfully: ${JSON.stringify(responseData)}`);
                    // ... (additional success handling)
                }
                else {
                    alert(`Failed to update product. Server responded with status: ${response.status}`);
                }
            }
            catch (error) {
                alert("An error occurred while updating the product.");
            }
        });
    }
    else if (modalID === "ProductModalNew") {
        modalProductLabel.innerHTML = "Add Product";
        addProductBtn.innerHTML = "Add Product";
        addProductBtn.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
            // Validate required fields
            if (productModal.value.trim() === "" ||
                descriptionModal.value.trim() === "" ||
                isNaN(Number(priceModal.value)) ||
                isNaN(Number(discountModal.value)) ||
                isNaN(Number(ratingModal.value)) ||
                isNaN(Number(stockModal.value)) ||
                brandModal.value.trim() === "" ||
                categoryModal.value.trim() === "" ||
                thumbnailModal.value.trim() === "") {
                alert("Correct input please fill with correct values in all required fields.");
                return;
            }
            const Product = {
                title: productModal.value.trim(),
                description: descriptionModal.value.trim(),
                price: Number(priceModal.value),
                discountPercentage: Number(discountModal.value),
                rating: Number(ratingModal.value),
                stock: Number(stockModal.value),
                brand: brandModal.value.trim(),
                category: categoryModal.value.trim(),
                thumbnail: thumbnailModal.value.trim(),
                images: imagesModal.value.split(',').map(url => url.trim()),
            };
            try {
                const response = yield fetch("https://dummyjson.com/products/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(Product),
                });
                const responseData = yield response.json();
                console.log(responseData);
                if (response.ok) {
                    alert(`Product created successfully: ${JSON.stringify(responseData)}`);
                }
                else {
                    alert("Failed to add product.");
                    alert(`Failed to add product. Server responded with status: ${response.status}`);
                }
            }
            catch (error) {
                alert("An error occurred while adding the product.");
            }
        });
    }
    else if (modalID === "ProductModalView") {
        console.log("View Product");
        modalProductLabel.innerHTML = "View Product";
        addProductBtn.style.display = "none"; // Hide the add/edit button
        if (product) {
            // Populate the form with the existing product data
            productModal.value = product.title;
            descriptionModal.value = product.description;
            priceModal.value = product.price.toString();
            discountModal.value = product.discountPercentage.toString();
            ratingModal.value = product.rating.toString();
            stockModal.value = product.stock.toString();
            brandModal.value = product.brand;
            categoryModal.value = product.category;
            thumbnailModal.value = product.thumbnail;
            imagesModal.value = product.images.join(', ');
            // Disable all input fields to make it read-only
            productModal.disabled = true;
            descriptionModal.disabled = true;
            priceModal.disabled = true;
            discountModal.disabled = true;
            ratingModal.disabled = true;
            stockModal.disabled = true;
            brandModal.disabled = true;
            categoryModal.disabled = true;
            thumbnailModal.disabled = true;
            imagesModal.disabled = true;
        }
    }
    else {
        alert("Modal not found");
    }
});
