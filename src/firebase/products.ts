import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore, storage } from "./firebaseConfig";
import { ProductType } from "../types/product";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

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
  // Generate a unique filename: originalName_timestamp_uuid.extension
  const fileExtension = file.name.split(".").pop();
  const uniqueName = `${file.name}_${Date.now()}_${uuidv4()}.${fileExtension}`;
  const storageRef = ref(storage, `products/${uniqueName}`);

  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export const deleteImage = async (imageUrl) => {
  const imageRef = ref(storage, imageUrl);
  await deleteObject(imageRef);
};
