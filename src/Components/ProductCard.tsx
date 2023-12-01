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
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const handleEdit = () => {
    updateProductMutation.mutate(editProduct);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteProductMutation.mutate(product.id);
  };

  return (
    <div className="product-card">
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
