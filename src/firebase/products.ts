import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "./firebaseConfig";
import { ProductType } from "../types/product";

export const addProduct = async (product: ProductType) => {
  await addDoc(collection(firestore, "products"), product);
};

export const editProduct = async (
  productId: string,
  updatedProduct: ProductType
) => {
  const productRef = doc(firestore, "products", productId);
  await updateDoc(productRef, updatedProduct);
};

export const deleteProduct = async (productId: string) => {
  const productRef = doc(firestore, "products", productId);
  await deleteDoc(productRef);
};
