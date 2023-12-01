import { useForm } from "react-hook-form";
import { useProducts, useAddProduct } from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard";
import { uploadImage } from "../../firebase/products";
import { ProductType } from "../../types/product";

type FormData = {
  name: string;
  description: string;
  price: number;
  image: FileList;
};

const Products = () => {
  const { data: products, isLoading } = useProducts();
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
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", { required: true })}
            placeholder="Product Name"
          />
          {errors.name && <span>This field is required</span>}

          <input
            {...register("description")}
            placeholder="Product Description"
          />

          <input
            type="number"
            {...register("price", { required: true })}
            placeholder="Product Price"
          />
          {errors.price && <span>This field is required</span>}

          <input type="file" {...register("image")} />

          <button type="submit">Add Product</button>
        </form>
      </div>
      <h1>Products</h1>
      <div className="product-list">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
