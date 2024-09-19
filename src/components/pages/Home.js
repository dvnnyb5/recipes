import { useState, useEffect } from "react";
import { getAllRecipes } from "../../firebase/firebaseUtils";
import AddRecipeModal from "../AddRecipeModal";

import "../../styles/home.scss"; // Create this file for styling

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const fetchedRecipes = await getAllRecipes();
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to My Recipes</h1>
        {/*carousel goes here */}
      </div>

      <button onClick={() => setIsModalOpen(true)}>Add New Recipe</button>

      <AddRecipeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="recipe-list">
        <h2>All Recipes</h2>
        {recipes.length ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-item">
              <h3>{recipe.name}</h3>
              <img src={recipe.imageUrl} alt={recipe.name} width="200" />
              {/* Buttons for editing and deleting */}
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
