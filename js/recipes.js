document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("recipeForm");
  if (!form) return;
  
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    window.location.href = "my-recipes.html";
  });

  const ingredientsList = document.getElementById("ingredientsList");
  const stepsList = document.getElementById("stepsList");
  const addIngredientBtn = document.getElementById("addIngredientBtn");
  const addStepBtn = document.getElementById("addStepBtn");

  if (!ingredientsList || !stepsList || !addIngredientBtn || !addStepBtn) return;

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
});

// S-PAGE===================
//==========================
// =========================
// User Dashboard (UI only)
// =========================


 // ===== Remove Favourite (UI only) =====
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".remove-fav");
  if (!btn) return;

  const row = btn.closest("tr");
  if (row) row.remove();
});
});
