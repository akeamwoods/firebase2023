import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../firebase/firebaseConfig";
import { ProductType } from "../types/product";
import { deleteImage, uploadImage } from "../firebase/products";

const fetchProducts = async (): Promise<ProductType[]> => {
  const querySnapshot = await getDocs(collection(firestore, "products"));
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ProductType)
  );
};
export const useProducts = () => {
  return useQuery("products", fetchProducts);
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (newProduct: Omit<ProductType, "id">) =>
      addDoc(collection(firestore, "products"), newProduct),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );
};

export type UpdateProductType = Omit<ProductType, "id"> & {
  id: string;
  newImage?: File;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, newImage, ...updatedProduct }: UpdateProductType) => {
      let updatedFields = updatedProduct;

      if (newImage) {
        // Delete old image from storage if it exists
        const currentProduct = queryClient
          .getQueryData<ProductType[]>(["products"])
          ?.find((p) => p.id === id);
        if (currentProduct?.imageUrl) {
          await deleteImage(currentProduct.imageUrl);
        }

        // Upload new image and get URL
        const newImageUrl = await uploadImage(newImage);
        updatedFields = { ...updatedFields, imageUrl: newImageUrl };
      }

      const productRef = doc(firestore, "products", id);
      await updateDoc(productRef, updatedFields);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (product: ProductType) => {
      if (!product.id) throw new Error("Product ID is undefined");

      // Delete image if it exists
      if (product.imageUrl) {
        await deleteImage(product.imageUrl);
      }

      // Delete the product document
      const productRef = doc(firestore, "products", product.id);
      await deleteDoc(productRef);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );
};
