document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("recipeForm");
  if (!form) return;

  const ingredientsList = document.getElementById("ingredientsList");
  const stepsList = document.getElementById("stepsList");
  const addIngredientBtn = document.getElementById("addIngredientBtn");
  const addStepBtn = document.getElementById("addStepBtn");

  if (!ingredientsList || !stepsList || !addIngredientBtn || !addStepBtn) return;

  addIngredientBtn.addEventListener("click", () => {
    const row = document.createElement("div");
    row.className = "dyn-item";
    row.innerHTML = `
      <input name="ingredientName[]" type="text" placeholder="Ingredient name" required>
      <input name="ingredientQty[]" type="text" placeholder="Quantity (e.g., 200g)" required>
      <button type="button" class="btn small danger remove-ingredient">Remove</button>
    `;
    ingredientsList.appendChild(row);
    updateRemoveState(ingredientsList, ".remove-ingredient");
  });

  ingredientsList.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-ingredient");
    if (!btn) return;

    if (ingredientsList.querySelectorAll(".dyn-item").length > 1) {
      btn.closest(".dyn-item").remove();
    }
    updateRemoveState(ingredientsList, ".remove-ingredient");
  });

  addStepBtn.addEventListener("click", () => {
    const count = stepsList.querySelectorAll(".dyn-item").length + 1;

    const row = document.createElement("div");
    row.className = "dyn-item";
    row.innerHTML = `
      <input name="step[]" type="text" placeholder="Step ${count}" required>
      <button type="button" class="btn small danger remove-step">Remove</button>
    `;
    stepsList.appendChild(row);
    updateRemoveState(stepsList, ".remove-step");
    renumberSteps(stepsList);
  });

  stepsList.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-step");
    if (!btn) return;

    if (stepsList.querySelectorAll(".dyn-item").length > 1) {
      btn.closest(".dyn-item").remove();
    }
    updateRemoveState(stepsList, ".remove-step");
    renumberSteps(stepsList);
  });

  updateRemoveState(ingredientsList, ".remove-ingredient");
  updateRemoveState(stepsList, ".remove-step");
  renumberSteps(stepsList);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "my-recipes.html";
  });
});

function updateRemoveState(list, selector) {
  const items = list.querySelectorAll(".dyn-item");
  const buttons = list.querySelectorAll(selector);
  buttons.forEach((btn) => {
    btn.disabled = items.length === 1;
  });
}

function renumberSteps(stepsList) {
  const inputs = stepsList.querySelectorAll('input[name="step[]"]');
  inputs.forEach((inp, idx) => {
    inp.placeholder = `Step ${idx + 1}`;
  });
}
// S-PAGE===================
//==========================
