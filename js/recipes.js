// ===== Add Recipe (Dynamic Fields + Redirect) =====

const ingredientsList = document.getElementById("ingredientsList");
const stepsList = document.getElementById("stepsList");
const addIngredientBtn = document.getElementById("addIngredientBtn");
const addStepBtn = document.getElementById("addStepBtn");
const form = document.getElementById("addRecipeForm");

// Add ingredient row
addIngredientBtn.addEventListener("click", () => {
  const item = document.createElement("div");
  item.className = "dynamic-item";
  item.innerHTML = `
    <input type="text" name="ingredientName[]" placeholder="Ingredient name" required>
    <input type="text" name="ingredientQty[]" placeholder="Quantity (e.g., 200g)" required>
    <button type="button" class="btn small-btn danger-btn remove-btn">Remove</button>
  `;
  ingredientsList.appendChild(item);
  updateRemoveButtons();
});

// Remove ingredient row
ingredientsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    e.target.parentElement.remove();
    updateRemoveButtons();
  }
});

function updateRemoveButtons() {
  const removeBtns = ingredientsList.querySelectorAll(".remove-btn");
  removeBtns.forEach(btn => btn.disabled = removeBtns.length === 1);
}

// Add step row
addStepBtn.addEventListener("click", () => {
  const count = stepsList.querySelectorAll(".dynamic-item").length + 1;

  const item = document.createElement("div");
  item.className = "dynamic-item";
  item.innerHTML = `
    <input type="text" name="step[]" placeholder="Step ${count}" required>
    <button type="button" class="btn small-btn danger-btn remove-step-btn">Remove</button>
  `;
  stepsList.appendChild(item);
  updateStepRemoveButtons();
  renumberSteps();
});

// Remove step row
stepsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-step-btn")) {
    e.target.parentElement.remove();
    updateStepRemoveButtons();
    renumberSteps();
  }
});

function updateStepRemoveButtons() {
  const removeBtns = stepsList.querySelectorAll(".remove-step-btn");
  removeBtns.forEach(btn => btn.disabled = removeBtns.length === 1);
}

function renumberSteps() {
  const inputs = stepsList.querySelectorAll('input[name="step[]"]');
  inputs.forEach((inp, idx) => {
    inp.placeholder = `Step ${idx + 1}`;
  });
}

// On submit → redirect to my-recipes.html (as required)
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Phase 1: no backend, just redirect
  window.location.href = "my-recipes.html";
});
// S-PAGE===================
//==========================
