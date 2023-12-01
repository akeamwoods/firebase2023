import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard";
import { Card } from "../../components/card/Card";
import styles from "./Products.module.css";
import Modal from "../../components/modal/Modal";
import { useState } from "react";
import { AddNewProduct } from "../../components/addNewProduct/AddNewProduct";

const Products = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { data: products, isLoading } = useProducts();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.listContainer}>
      <Card>
        <button onClick={openModal}>Add New Product</button>
      </Card>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <AddNewProduct onClose={closeModal} />
        </Modal>
      )}
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
