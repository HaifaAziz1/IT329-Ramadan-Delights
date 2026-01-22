// recipes.js

document.addEventListener("DOMContentLoaded", () => {

  // === Add Ingredient dynamically ===
  const addIngredientBtn = document.getElementById("add-ingredient-btn");
  const ingredientsContainer = document.getElementById("ingredients-container");

  if(addIngredientBtn){
    addIngredientBtn.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.name = "ingredients[]";
      input.placeholder = "Ingredient";
      input.classList.add("input-field");
      ingredientsContainer.appendChild(input);
    });
  }

  // === Add Step dynamically ===
  const addStepBtn = document.getElementById("add-step-btn");
  const stepsContainer = document.getElementById("steps-container");

  if(addStepBtn){
    addStepBtn.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.name = "steps[]";
      input.placeholder = "Step";
      input.classList.add("input-field");
      stepsContainer.appendChild(input);
    });
  }

  // === Image Preview ===
  const recipeImage = document.getElementById("recipe-image");
  const previewImage = document.getElementById("preview-image");

  if(recipeImage){
    recipeImage.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if(file){
        const reader = new FileReader();
        reader.onload = () => {
          previewImage.src = reader.result;
        }
        reader.readAsDataURL(file);
      } else {
        previewImage.src = "image/default-recipe.jpg";
      }
    });
  }

  // === Simple UI Validation ===
  const addRecipeForm = document.getElementById("add-recipe-form");
  if(addRecipeForm){
    addRecipeForm.addEventListener("submit", (e) => {
      const title = addRecipeForm.querySelector('input[name="title"]').value.trim();
      if(title === ""){
        e.preventDefault();
        alert("Recipe title cannot be empty!");
      }
    });
  }

});
