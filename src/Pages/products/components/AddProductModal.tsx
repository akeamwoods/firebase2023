import { Controller, useForm } from "react-hook-form";
import Modal from "../../../components/modal/Modal";
import { uploadImage } from "../../../firebase/products";
import { useAddProduct } from "../../../hooks/useProducts";
import { ProductType } from "../../../types/product";
import { Input, Form } from "antd";

import styles from "./AddProductModal.module.css";

type FormData = {
  name: string;
  description: string;
  price: number;
  image: FileList;
};

type AddProductModalProps = {
  onClose: () => void;
};

export const AddProductModal: React.FC<AddProductModalProps> = ({
  onClose,
}) => {
  const addProductMutation = useAddProduct();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const newProductData: Omit<ProductType, "id"> = {
      name: data.name,
      description: data.description,
      price: data.price,
    };

    if (data.image && data.image[0]) {
      const imageUrl = await uploadImage(data.image[0]);
      newProductData.imageUrl = imageUrl;
    }

    addProductMutation.mutate(newProductData);
    reset();
    onClose();
  };
  return (
    <Modal
      onOk={handleSubmit(onSubmit)}
      okText="Add product"
      title="Add Product"
      onClose={onClose}
    >
      <Form layout="vertical" className={styles.container}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Form.Item label="Product Name">
              <Input {...field} placeholder="Lash Extensions" />
            </Form.Item>
          )}
        />
        {errors.name && <span>This field is required</span>}

        <Controller
          name="price"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Form.Item label="Price">
              <Input {...field} type="number" prefix="£" placeholder="32.50" />
            </Form.Item>
          )}
        />
        {errors.price && <span>This field is required</span>}

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Form.Item label="Product Description">
              <Input.TextArea
                rows={3}
                {...field}
                placeholder="Lash extensions goes here"
              />
            </Form.Item>
          )}
        />

        <input type="file" {...register("image")} />
      </Form>
    </Modal>
  );
};
