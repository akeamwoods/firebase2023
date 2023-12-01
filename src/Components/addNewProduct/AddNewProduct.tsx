import { useForm } from "react-hook-form";
import { uploadImage } from "../../firebase/products";
import { useAddProduct } from "../../hooks/useProducts";
import { ProductType } from "../../types/product";
import styles from "./AddNewProduct.module.css";

type FormData = {
  name: string;
  description: string;
  price: number;
  image: FileList;
};

type AddNewProductProps = {
  onClose: () => void;
};

export const AddNewProduct: React.FC<AddNewProductProps> = ({ onClose }) => {
  const addProductMutation = useAddProduct();

  const {
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
    <>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <input
          {...register("name", { required: true })}
          placeholder="Product Name"
        />
        {errors.name && <span>This field is required</span>}

        <input {...register("description")} placeholder="Product Description" />

        <input
          type="number"
          {...register("price", { required: true })}
          placeholder="Product Price"
        />
        {errors.price && <span>This field is required</span>}

        <input type="file" {...register("image")} />

        <div className={styles.buttonContainer}>
          <button type="button" onClick={onClose}>
            Close
          </button>
          <button type="submit">Add Product</button>
        </div>
      </form>
    </>
  );
};
