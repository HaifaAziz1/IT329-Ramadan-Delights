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
// ===============================
// User Page JS (Dashboard)
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  // ===== Filter Recipes =====
  const filterBtn = document.getElementById("filterBtn");
  const categoryFilter = document.getElementById("categoryFilter");

  if (filterBtn && categoryFilter) {
    filterBtn.addEventListener("click", function () {
      const selectedCategory = categoryFilter.value.toLowerCase();
      const rows = document.querySelectorAll(".table tr");

      rows.forEach((row, index) => {
        if (index === 0) return; // skip header row

        const categoryCell = row.cells[4]; // عمود Category
        if (!categoryCell) return;

        const categoryText = categoryCell.textContent.toLowerCase();

        if (selectedCategory === "all" || categoryText === selectedCategory) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });

      alert("Filter applied ✅");
    });
  }

});


// ===== Remove Favourite Recipe =====
function removeFav() {
  alert("Recipe removed from favourites ❤️");

  // حذف السطر من الجدول
  event.target.closest("tr").remove();
}
