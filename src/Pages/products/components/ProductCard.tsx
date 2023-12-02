import React, { useState } from "react";
import { Card, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useUpdateProduct, useDeleteProduct } from "../../../hooks/useProducts";
import { ProductType } from "../../../types/product";
import { formatPrice } from "../../../utils/utils";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState(product);
  const [newImage, setNewImage] = useState<File | null>(null);
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const handleEdit = () => {
    const updatedData = {
      ...editProduct,
      newImage,
    };
    updateProductMutation.mutate(updatedData);
    setIsEditing(false);
    setNewImage(null);
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
    <Card
      extra={formatPrice(product.price)}
      title={product.name}
      hoverable
      className={styles.cardContainer}
      actions={[
        <DeleteOutlined key="delete" onClick={handleDelete} />,
        <EditOutlined key="edit" onClick={() => setIsEditing(true)} />,
      ]}
    >
      {product.imageUrl && (
        <img
          style={{ maxWidth: "200px" }}
          src={product.imageUrl}
          alt={product.name}
        />
      )}
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
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button type="primary" onClick={handleEdit}>
            Save
          </Button>
        </div>
      ) : (
        <Card.Meta description={product.description} />
      )}
    </Card>
  );
};

export default ProductCard;
