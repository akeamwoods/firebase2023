import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore, storage } from "./firebaseConfig";
import { ProductType } from "../types/product";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

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

export const uploadImage = async (file) => {
  const storageRef = ref(storage, `products/${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export const deleteImage = async (imageUrl) => {
  const imageRef = ref(storage, imageUrl);
  await deleteObject(imageRef);
};