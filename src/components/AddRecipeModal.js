import { useState } from "react";
import { addRecipe } from "../firebase/firebaseUtils";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const AddRecipeModal = ({ isOpen, onClose }) => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleAddRecipe = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, `recipes/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error("Error uploading image:", error);
      },
      async () => {
        try {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

          const newRecipe = {
            name: recipeName,
            description: recipeDescription,
            imageUrl: imageUrl,
          };

          await addRecipe(newRecipe);
          alert("Recipe added successfully!");
          onClose();
        } catch (error) {
          console.error("Error adding recipe", error);
        }
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add a New Recipe</h2>
        <form onSubmit={handleAddRecipe}>
          <input
            type="text"
            placeholder="Recipe Name"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Recipe Description"
            value={recipeDescription}
            onChange={(e) => setRecipeDescription(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <button type="submit">Add Recipe</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddRecipeModal;
