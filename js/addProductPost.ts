// import { Product } from "./clases";

// export const addProductPost = async (product: Product): Promise<void> => {
//       // Validate required fields
//       if (
//         productModal.value.trim() === "" ||
//         descriptionModal.value.trim() === "" ||
//         isNaN(Number(priceModal.value)) ||
//         isNaN(Number(discountModal.value)) ||
//         isNaN(Number(ratingModal.value)) ||
//         isNaN(Number(stockModal.value)) ||
//         brandModal.value.trim() === "" ||
//         categoryModal.value.trim() === "" ||
//         thumbnailModal.value.trim() === "" 
//         ) {
//         alert("Correct input please fill with correct values in all required fields.");
//         return;
//         }

//         const Product = {
//         title: productModal.value.trim(),
//         description: descriptionModal.value.trim(),
//         price: Number(priceModal.value),
//         discountPercentage: Number(discountModal.value),
//         rating: Number(ratingModal.value),
//         stock: Number(stockModal.value),
//         brand: brandModal.value.trim(),
//         category: categoryModal.value.trim(),
//         thumbnail: thumbnailModal.value.trim(),
//         images: imagesModal.value.split(',').map(url => url.trim()),
//         };

        
//         try {
//             const response = await fetch("https://dummyjson.com/products/add", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(Product),
//             });

//             const responseData = await response.json();
//             console.log(responseData);

//             if (response.ok) {
//             alert(`Product created successfully: ${JSON.stringify(responseData)}`);
            
//             } else {
//             alert("Failed to add product.");
//             alert(`Failed to add product. Server responded with status: ${response.status}`);
//             }
//         } catch (error) {
//             alert("An error occurred while adding the product.");
//         } 
// }
