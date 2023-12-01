import React, { useState } from "react";
import { useUpdateProduct, useDeleteProduct } from "../hooks/useProducts";
import { ProductType } from "../types/product";
import { formatPrice } from "../utils/utils";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState(product);
  const [newImage, setNewImage] = useState<File | null>(null); // New state for the new image
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const handleEdit = () => {
    const updatedData = {
      ...editProduct,
      newImage, // Include the new image if it exists
    };
    updateProductMutation.mutate(updatedData);
    setIsEditing(false);
    setNewImage(null); // Reset the new image state
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewImage(event.target.files[0]);
    }
  };
  const handleDelete = () => {
    deleteProductMutation.mutate(product);
  };

  return (
    <div className="product-card">
      {product.imageUrl && <img style={{maxWidth:'200px'}} src={product.imageUrl} alt={product.name} />}
      {isEditing ? (
        <div>
          <input
            value={editProduct.name}
            onChange={(e) =>
              setEditProduct({ ...editProduct, name: e.target.value })
            }
          />
          <textarea
            value={editProduct.description}
            onChange={(e) =>
              setEditProduct({ ...editProduct, description: e.target.value })
            }
          />
          <input
            type="number"
            value={editProduct.price}
            onChange={(e) =>
              setEditProduct({ ...editProduct, price: +e.target.value })
            }
          />
          <input type="file" onChange={handleImageChange} />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{formatPrice(product.price)}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
