// recipes.js

document.addEventListener("DOMContentLoaded", () => {

  /* ============================= */
  /* Add Recipe Page - Sara (S) */
  /* ============================= */

  // Add Ingredient dynamically
  const addIngredientBtn = document.getElementById("add-ingredient-btn");
  const ingredientsContainer = document.getElementById("ingredients-container");

  if (addIngredientBtn && ingredientsContainer) {
    addIngredientBtn.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.name = "ingredients[]";
      input.placeholder = "Ingredient";
      input.className = "input-field";
      ingredientsContainer.appendChild(input);
    });
  }

  // Image Preview
  const recipeImage = document.getElementById("recipe-image");
  const previewImage = document.getElementById("preview-image");

  if (recipeImage && previewImage) {
    recipeImage.addEventListener("change", (e) => {
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          previewImage.src = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        previewImage.src = "image/default-recipe.jpg";
      }
    });
  }

  // Add Recipe Form Submit
  const addRecipeForm = document.getElementById("add-recipe-form");

  if (addRecipeForm) {
    addRecipeForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const titleInput = addRecipeForm.querySelector("#title");
      const titleValue = titleInput.value.trim();

      if (titleValue === "") {
        alert("Please enter recipe name");
        return;
      }

      alert("Recipe added successfully ✅");

      // Redirect to My Recipes page
      window.location.href = "my-recipes.html";
    });
  }

  /* ============================= */
  /* My Recipes Page - Sara (S) */
  /* ============================= */

  // Delete recipe (UI only)
  const deleteLinks = document.querySelectorAll(".delete-link");

  deleteLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Recipe deleted (UI only)");
    });
  });

});
