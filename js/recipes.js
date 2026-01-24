// recipes.js

document.addEventListener("DOMContentLoaded", () => {

  // === Image Preview ===
  const recipeImage = document.getElementById("recipe-image");
  const previewImage = document.getElementById("preview-image");

  if(recipeImage && previewImage){
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

  // === Simple Form Validation & Notification ===
  const addRecipeForm = document.querySelector(".form-card");
  if(addRecipeForm){
    addRecipeForm.addEventListener("submit", (e) => {
      e.preventDefault(); // منع الريلود للعرض التجريبي

      const title = addRecipeForm.querySelector('input[type="text"]').value.trim();
      const category = addRecipeForm.querySelector('select').value;
      const ingredients = addRecipeForm.querySelector('textarea[name="ingredients"]') || addRecipeForm.querySelectorAll('textarea')[0];
      
      if(title === "" || category === "Select category" || ingredients.value.trim() === ""){
        alert("Please fill in all required fields!");
        return;
      }

      // === Notification Success ===
      alert(`Recipe "${title}" added successfully!`);
      // === بعدين ممكن هنا نضيف redirect للـ My Recipes page ===
      // window.location.href = "my-recipes.html";
    });
  }

});
