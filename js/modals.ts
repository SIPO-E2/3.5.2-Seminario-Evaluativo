import { Product } from "./clases";

export const modal = async (modalID:string): Promise<void> => {
    
    const modalProductLabel = document.getElementById("modalProductLabel") as HTMLInputElement;
    const productModal = document.getElementById("ProductModal") as HTMLInputElement;
    const descriptionModal = document.getElementById("DescriptionModal") as HTMLInputElement;
    const priceModal = document.getElementById("PriceModal") as HTMLInputElement;
    const discountModal = document.getElementById("DiscountModal") as HTMLInputElement;
    const ratingModal = document.getElementById("RatingModal") as HTMLInputElement;
    const stockModal = document.getElementById("StockModal") as HTMLInputElement;
    const brandModal = document.getElementById("BrandModal") as HTMLInputElement;
    const categoryModal = document.getElementById("CategoryModal") as HTMLSelectElement;
    const thumbnailModal = document.getElementById("ThumbnailModal") as HTMLInputElement;
    const imagesModal = document.getElementById("ImagesModal") as HTMLInputElement;
    const addProductBtn = document.getElementById("addProductBtn") as HTMLButtonElement;


    if(modalID === "ProductModalEdit"){
        modalProductLabel.value = "Edit Product";
        addProductBtn.innerHTML = "Edit Product";


    } else if(modalID === "ProductModalNew"){

        modalProductLabel.innerHTML = "Add Product";
        addProductBtn.innerHTML = "Add Product";

        addProductBtn.onclick = async () => {
            // Validate required fields
            if (
                productModal.value.trim() === "" ||
                descriptionModal.value.trim() === "" ||
                isNaN(Number(priceModal.value)) ||
                isNaN(Number(discountModal.value)) ||
                isNaN(Number(ratingModal.value)) ||
                isNaN(Number(stockModal.value)) ||
                brandModal.value.trim() === "" ||
                categoryModal.value.trim() === "" ||
                thumbnailModal.value.trim() === "" 
                ) {
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
                    const response = await fetch("https://dummyjson.com/products/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(Product),
                    });
        
                    const responseData = await response.json();
                    console.log(responseData);
        
                    if (response.ok) {
                    alert(`Product created successfully: ${JSON.stringify(responseData)}`);
                    
                    } else {
                    alert("Failed to add product.");
                    alert(`Failed to add product. Server responded with status: ${response.status}`);
                    }
                } catch (error) {
                    alert("An error occurred while adding the product.");
                } 
            
        }


        

    } else if(modalID === "ProductModalView"){

    } else{
        alert("Modal not found");
    }
  
};

