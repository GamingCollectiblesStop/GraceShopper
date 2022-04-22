import React from "react";
import { deleteProduct } from "../../axios-services";

const DeleteProduct = ({ productId, products, setProducts }) => {
  // click handler
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // prompt admin to ensure intentional click
      let text = "Are you sure you want to delete this product?";

      if (confirm(text)) {
        const response = await deleteProduct(productId);

        // verify success before removing from frontend products array, alert admin of results
        if (
          response.message === "Product successfully deleted from the database."
        ) {
          const filteredProducts = await products.filter((product) => {
            return product.id !== response.product.id;
          });
          setProducts(filteredProducts);
          alert(response.message);
        } else {
          alert(response.message);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  return <button onClick={handleClick}>Delete Product</button>;
};

export default DeleteProduct;