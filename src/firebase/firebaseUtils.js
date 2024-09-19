import { storage, db } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Get all recipes
export const getAllRecipes = async () => {
  const recipesCollection = collection(db, "recipes");
  const recipeSnapshot = await getDocs(recipesCollection);
  const recipeList = recipeSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return recipeList;
};

// Add a new recipe
export const addRecipe = async (recipe, imageFile) => {
  if (!imageFile) throw new Error("No image file provided!");

  const storageRef = ref(storage, `recipes/${imageFile.name}`);
  const snapshot = await uploadBytes(storageRef, imageFile);
  const imageUrl = await getDownloadURL(snapshot.ref);

  const newRecipe = {
    ...recipe,
    imageUrl,
    createdAt: new Date(),
  };

  const docRef = await addDoc(collection(db, "recipes"), newRecipe);
  return docRef;
};

// Update a recipe
export const updateRecipe = async (id, updatedRecipe) => {
  const recipeDoc = doc(db, "recipes", id);
  await updateDoc(recipeDoc, updatedRecipe);
};

// Delete a recipe
export const deleteRecipe = async (id) => {
  const recipeDoc = doc(db, "recipes", id);
  await deleteDoc(recipeDoc);
};
