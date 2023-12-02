import { useProducts } from "../../hooks/useProducts";
import ProductCard from "./components/ProductCard";
import { useState } from "react";
import { Card } from "antd";
import { AddProductModal } from "./components/AddProductModal";
import styles from "./ProductsPage.module.css";

const ProductsPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { data: products, isLoading } = useProducts();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className={styles.gridContainer}>
        <Card hoverable onClick={openModal} className={styles.addNewCard}>
          Add New Product
        </Card>

        {products?.map((product) => <ProductCard product={product} />)}
      </div>
      {isModalOpen && <AddProductModal onClose={closeModal} />}
    </>
  );
};

export default ProductsPage;
