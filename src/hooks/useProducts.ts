// hooks/useProducts.ts
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

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (updatedProduct: ProductType) =>
      updateDoc(doc(firestore, "products", updatedProduct.id), updatedProduct),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => deleteDoc(doc(firestore, "products", id)), {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });
};
