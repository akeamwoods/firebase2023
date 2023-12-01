import { useForm } from "react-hook-form";
import { useProducts, useAddProduct } from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard";

const Products = () => {
  const { data: products, isLoading } = useProducts();
  const addProductMutation = useAddProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addProductMutation.mutate(data);
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
