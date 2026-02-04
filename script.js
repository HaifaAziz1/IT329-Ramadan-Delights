// ===============================
// IT329 Phase 1 - Unified script.js (UI only)
// Safe across pages (no backend) - no interference
// ===============================

document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // AUTH: login.html
  // =========================
  const loginForm = document.getElementById("loginForm");
  const loginAdminBtn = document.getElementById("loginAdminBtn");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      window.location.href = "user.html";
    });
  }

  if (loginAdminBtn) {
    loginAdminBtn.addEventListener("click", function () {
      window.location.href = "admin.html";
    });
  }

  // =========================
  // AUTH: signup.html
  // =========================
  const signupForm = document.getElementById("signupForm");
  const profileImageInput = document.getElementById("profileImage");
  const avatarPreviewImg = document.getElementById("avatarPreview");
  const DEFAULT_AVATAR = "image/default-avatar.png";

  if (avatarPreviewImg && profileImageInput) {
    // لو فيه صورة جاهزة بالـ HTML خليها، وإلا حط الافتراضية
    if (!avatarPreviewImg.getAttribute("src")) avatarPreviewImg.src = DEFAULT_AVATAR;

    let lastObjectUrl = null;

    profileImageInput.addEventListener("change", function () {
      const file = profileImageInput.files && profileImageInput.files[0];

      if (!file) {
        avatarPreviewImg.src = DEFAULT_AVATAR;
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Please choose an image file.");
        profileImageInput.value = "";
        avatarPreviewImg.src = DEFAULT_AVATAR;
        return;
      }

      if (lastObjectUrl) URL.revokeObjectURL(lastObjectUrl);
      lastObjectUrl = URL.createObjectURL(file);
      avatarPreviewImg.src = lastObjectUrl;
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      window.location.href = "user.html";
    });
  }

  // =========================
  // ADMIN: admin.html (UI only)
  // ONLY forms marked with data-admin-action
  // =========================
  const adminActionForms = document.querySelectorAll("form[data-admin-action]");
  if (adminActionForms.length) {
    adminActionForms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Action recorded");
      });
    });
  }

  // =========================
  // VIEW RECIPE: view-recipe.html (UI only)
  // =========================
  const btnFav = document.getElementById("btnFav");
  const btnLike = document.getElementById("btnLike");
  const btnReport = document.getElementById("btnReport");
  const commentForm = document.getElementById("commentForm");

  if (btnFav) btnFav.addEventListener("click", () => alert("Added to favourites"));
  if (btnLike) btnLike.addEventListener("click", () => alert("Recipe liked"));
  if (btnReport) btnReport.addEventListener("click", () => alert("Recipe reported"));

  if (commentForm) {
    commentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Comment added");
      commentForm.reset();
    });
  }

  // =========================
  // ADD/EDIT RECIPE: add-recipes.html + edit-recipe.html (Phase 1 UI)
  // Using recipeForm + ingredientsList/stepsList + addIngredientBtn/addStepBtn
  // (from recipes2.js) — guarded so it won't run elsewhere
  // =========================
  const recipeForm = document.getElementById("recipeForm");
  if (recipeForm) {
    const ingredientsList = document.getElementById("ingredientsList");
    const stepsList = document.getElementById("stepsList");
    const addIngredientBtn = document.getElementById("addIngredientBtn");
    const addStepBtn = document.getElementById("addStepBtn");

    if (ingredientsList && stepsList && addIngredientBtn && addStepBtn) {
      addIngredientBtn.addEventListener("click", () => {
        const row = document.createElement("div");
        row.className = "dyn-item";
        row.innerHTML = `
          <input type="text" name="ingredientName[]" placeholder="Ingredient name" required />
          <input type="text" name="ingredientQty[]" placeholder="Quantity" required />
          <button type="button" class="btn small danger remove-ingredient">Remove</button>
        `;
        ingredientsList.appendChild(row);
        updateRemoveButtons();
      });

      addStepBtn.addEventListener("click", () => {
        const count = stepsList.querySelectorAll(".dyn-item").length + 1;

        const row = document.createElement("div");
        row.className = "dyn-item";
        row.innerHTML = `
          <input type="text" name="step[]" placeholder="Step ${count}" required />
          <button type="button" class="btn small danger remove-step">Remove</button>
        `;
        stepsList.appendChild(row);
        renumberSteps();
        updateRemoveButtons();
      });

      ingredientsList.addEventListener("click", (e) => {
        const btn = e.target.closest(".remove-ingredient");
        if (!btn) return;

        if (ingredientsList.querySelectorAll(".dyn-item").length > 1) {
          btn.closest(".dyn-item").remove();
        }
        updateRemoveButtons();
      });

      stepsList.addEventListener("click", (e) => {
        const btn = e.target.closest(".remove-step");
        if (!btn) return;

        if (stepsList.querySelectorAll(".dyn-item").length > 1) {
          btn.closest(".dyn-item").remove();
        }
        renumberSteps();
        updateRemoveButtons();
      });

      recipeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        window.location.href = "my-recipes.html";
      });

      function updateRemoveButtons() {
        const ingItems = ingredientsList.querySelectorAll(".dyn-item");
        const ingBtns = ingredientsList.querySelectorAll(".remove-ingredient");
        ingBtns.forEach((b) => (b.disabled = ingItems.length === 1));

        const stepItems = stepsList.querySelectorAll(".dyn-item");
        const stepBtns = stepsList.querySelectorAll(".remove-step");
        stepBtns.forEach((b) => (b.disabled = stepItems.length === 1));
      }

      function renumberSteps() {
        const inputs = stepsList.querySelectorAll('input[name="step[]"]');
        inputs.forEach((inp, idx) => {
          inp.placeholder = `Step ${idx + 1}`;
        });
      }

      updateRemoveButtons();
      renumberSteps();
    }
  }

  // =========================
  // USER DASHBOARD: user.html (UI only)
  // Filter + Remove favourite (from recipes2.js)
  // =========================
  const filterBtn = document.getElementById("filterBtn");
  const categoryFilter = document.getElementById("categoryFilter");
  const allRecipesTable = document.getElementById("allRecipesTable");

  if (filterBtn && categoryFilter && allRecipesTable) {
    filterBtn.addEventListener("click", () => {
      const selected = categoryFilter.value; // all / iftar / dessert / drink
      const rows = allRecipesTable.querySelectorAll("tbody tr");

      rows.forEach((row) => {
        const rowCategory = row.getAttribute("data-category");
        row.style.display = selected === "all" || rowCategory === selected ? "" : "none";
      });

      alert("Filter applied ✅");
    });
  }

  // Remove Favourite (UI only) — only triggers if .remove-fav exists
  document.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".remove-fav");
    if (!removeBtn) return;

    const row = removeBtn.closest("tr");
    if (row) row.remove();

    alert("Removed from favourites ✅");
  });

  // =========================
  // OPTIONAL legacy blocks (will not interfere unless those IDs exist)
  // =========================
  const addIngredientBtnLegacy = document.getElementById("add-ingredient-btn");
  const ingredientsContainer = document.getElementById("ingredients-container");

  if (addIngredientBtnLegacy && ingredientsContainer) {
    addIngredientBtnLegacy.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.name = "ingredients[]";
      input.placeholder = "Ingredient";
      input.className = "input-field";
      ingredientsContainer.appendChild(input);
    });
  }

  const recipeImageInput = document.getElementById("recipe-image");
  const previewImage = document.getElementById("preview-image");
  const DEFAULT_RECIPE_IMG = "image/default-recipe.jpg";

  if (recipeImageInput && previewImage) {
    if (!previewImage.getAttribute("src")) previewImage.src = DEFAULT_RECIPE_IMG;

    recipeImageInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) {
        previewImage.src = DEFAULT_RECIPE_IMG;
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Please choose an image file.");
        recipeImageInput.value = "";
        previewImage.src = DEFAULT_RECIPE_IMG;
        return;
      }

      const reader = new FileReader();
      reader.onload = () => (previewImage.src = reader.result);
      reader.readAsDataURL(file);
    });
  }

  const addRecipeForm = document.getElementById("add-recipe-form");
  if (addRecipeForm) {
    addRecipeForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const titleInput =
        addRecipeForm.querySelector("#title") ||
        addRecipeForm.querySelector('input[type="text"]');

      const title = (titleInput?.value || "").trim();

      if (!title) {
        alert("Please enter recipe name");
        return;
      }

      alert(`Recipe "${title}" added successfully ✅`);
      window.location.href = "my-recipes.html";
    });
  }

  const deleteLinks = document.querySelectorAll(".delete-link");
  if (deleteLinks.length) {
    deleteLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Recipe deleted (UI only)");
      });
    });
  }
});
