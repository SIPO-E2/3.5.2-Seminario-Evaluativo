import { Product } from "./clases";

export const modal = async (modalID:string, product?: Product): Promise<void> => {

    console.log(product);

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
    const carouselImagesInner = document.getElementById("carouselImagesInner") as HTMLDivElement;
    const carouselImagesModal = document.getElementById("carouselImagesModal") as HTMLDivElement;
    const imagesModal = document.getElementById("ImagesModal") as HTMLInputElement;
    const addProductBtn = document.getElementById("addProductBtn") as HTMLButtonElement;
    const thumbnailDisplay = document.getElementById('thumbnailDisplay') as  HTMLImageElement;

    if(product?.thumbnail){
        thumbnailDisplay.src = product.thumbnail;
    }

    if(modalID === "ProductModalEdit"){
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
          // Clear existing carousel items and display the carousel 
          carouselImagesModal.style.display = 'block';
          carouselImagesInner.innerHTML = '';
          // Populate carousel with product images
          product.images.forEach((image, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item${index === 0 ? ' active' : ''}`;
            carouselItem.innerHTML = `<img src="${image}" class="d-block w-100 carousel-img" alt="Product image">`;
            carouselImagesInner.appendChild(carouselItem);
          });

        }
        modalProductLabel.value = "Edit Product";
        addProductBtn.innerHTML = "Edit Product";
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
        ) 
        {
          alert("Please fill in all required fields with correct values.");
          return;        
      }
      
      // Prepare the updated product object
      const updatedProduct = {
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
        const response = await fetch(`https://dummyjson.com/products/${product?.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
           body: JSON.stringify(updatedProduct),          
        });
        const responseData = await response.json();
        console.log(responseData);
            if (response.ok) {
              alert(
                `Product updated successfully.\n` +
                `Product: ${responseData?.title}\n` +
                `Description: ${responseData?.description}\n` +
                `Price: ${responseData?.price}\n` +
                `Discount: ${responseData?.discountPercentage}%\n` +
                `Rating: ${responseData?.rating}\n` +
                `Stock: ${responseData?.stock}\n` +
                `Brand: ${responseData?.brand}\n` +
                `Category: ${responseData?.category}\n` +
                `Thumbnail: ${responseData?.thumbnail}\n` +
                `Images: ${Array.isArray(responseData?.images) ? responseData.images.join(", ") : responseData?.images}`
              );
              // ... (additional success handling)
            } else {
              alert(`Failed to update product. Server responded with status: ${response.status}`);
            }
          } catch (error) {
            alert("An error occurred while updating the product.");
          }
        };


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
                    alert(`Product created successfully: Product: ${responseData?.title} Description: ${responseData?.description} Price: ${responseData?.price} Discount: ${responseData?.discountPercentage} Rating: ${responseData?.rating} Stock: ${responseData?.stock} Brand: ${responseData?.brand} Category: ${responseData?.category} Thumbnail: ${responseData?.thumbnail} Images: ${responseData?.images}`);
                    
                    } else {
                    alert("Failed to add product.");
                    alert(`Failed to add product. Server responded with status: ${response.status}`);
                    }
                } catch (error) {
                    alert("An error occurred while adding the product.");
                } 
            
        }


        

    } else if(modalID === "ProductModalView"){
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
          // Clear existing carousel items and display the carousel 
          carouselImagesModal.style.display = 'block';
          carouselImagesInner.innerHTML = '';
          // Populate carousel with product images
          product.images.forEach((image, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item${index === 0 ? ' active' : ''}`;
            carouselItem.innerHTML = `<img src="${image}" class="d-block w-100 carousel-img" alt="Product image">`;
            carouselImagesInner.appendChild(carouselItem);
          });

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
    } else{
        alert("Modal not found");
    }
  
};