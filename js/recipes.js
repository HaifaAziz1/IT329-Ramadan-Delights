document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "ramadan_recipes_v1";
  const toast = document.getElementById("toast");

  function showToast(msg){
    if(!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1600);
  }

  function loadRecipes(){
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return [];
    try { return JSON.parse(raw) || []; } catch { return []; }
  }

  function saveRecipes(list){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function getId(){
    return "r_" + Math.random().toString(16).slice(2) + Date.now().toString(16);
  }

  function seedIfEmpty(){
    const list = loadRecipes();
    if(list.length) return;

    const seeded = [
      {
        id: "sambosa",
        title: "Sambosa",
        category: "Appetizer",
        description: "Crispy sambosa with potato filling.",
        photo: "image/sambosa.png",
        ingredients: [
          {name:"Flour", qty:"200g"},
          {name:"Potato", qty:"150g"},
          {name:"Spices", qty:"1 tsp"}
        ],
        steps: ["Mix dough", "Prepare filling", "Fry until golden"],
        video: "",
        likes: 45
      },
      {
        id: "kunafah",
        title: "Kunafah",
        category: "Dessert",
        description: "Classic kunafah with cheese and syrup.",
        photo: "image/kunafah.png",
        ingredients: [
          {name:"Kunafa dough", qty:"300g"},
          {name:"Cheese", qty:"200g"},
          {name:"Syrup", qty:"3 tbsp"}
        ],
        steps: ["Layer dough and cheese", "Bake until golden", "Add syrup and serve"],
        video: "",
        likes: 52
      },
      {
        id: "beehive",
        title: "Beehive",
        category: "Dessert",
        description: "Beehive dessert with syrup drizzle.",
        photo: "image/beehive.png",
        ingredients: [
          {name:"Flour", qty:"350g"},
          {name:"Milk", qty:"1 cup"},
          {name:"Cheese", qty:"150g"}
        ],
        steps: ["Prepare dough", "Stuff with cheese", "Bake and drizzle syrup"],
        video: "https://example.com/video",
        likes: 50
      },
      {
        id: "luqimat",
        title: "Luqimat",
        category: "Dessert",
        description: "Sweet fried dumplings served with syrup.",
        photo: "image/luqimat.png",
        ingredients: [
          {name:"Flour", qty:"250g"},
          {name:"Yeast", qty:"5g"},
          {name:"Sugar", qty:"2 tbsp"}
        ],
        steps: ["Mix batter", "Fry small balls", "Serve with syrup"],
        video: "",
        likes: 80
      },
      {
        id: "macaroni",
        title: "Macaroni",
        category: "Main Dish",
        description: "Creamy baked macaroni for Ramadan nights.",
        photo: "image/macaroni.png",
        ingredients: [
          {name:"Macaroni", qty:"300g"},
          {name:"Cheese", qty:"1 cup"},
          {name:"Milk", qty:"1 cup"}
        ],
        steps: ["Boil macaroni", "Mix with sauce", "Bake until golden"],
        video: "",
        likes: 41
      },
      {
        id: "tang",
        title: "Tang",
        category: "Drink",
        description: "Refreshing Tang juice for Iftar.",
        photo: "image/tang.png",
        ingredients: [
          {name:"Tang powder", qty:"2 tbsp"},
          {name:"Cold water", qty:"2 cups"},
          {name:"Ice", qty:"optional"}
        ],
        steps: ["Mix Tang with water", "Stir well", "Serve cold"],
        video: "",
        likes: 33
      },
      {
        id: "vimto",
        title: "Vimto",
        category: "Drink",
        description: "Classic Vimto drink for Ramadan.",
        photo: "image/vimto.png",
        ingredients: [
          {name:"Vimto syrup", qty:"3 tbsp"},
          {name:"Water", qty:"2 cups"},
          {name:"Ice", qty:"optional"}
        ],
        steps: ["Add syrup", "Pour water", "Serve with ice"],
        video: "",
        likes: 36
      }
    ];

    saveRecipes(seeded);
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[c]));
  }

  seedIfEmpty();

  // -----------------------------
  // My Recipes render
  // -----------------------------
  const tbody = document.getElementById("recipesTbody");
  if(tbody){
    const list = loadRecipes();

    const total = document.getElementById("totalRecipes");
    if(total) total.textContent = String(list.length);

    let most = null;
    list.forEach(r => { if(!most || r.likes > most.likes) most = r; });
    const mostLiked = document.getElementById("mostLiked");
    if(mostLiked) mostLiked.textContent = most ? most.title : "—";

    tbody.innerHTML = list.map(r => {
      const ing = (r.ingredients || []).map(i => `<li>${escapeHtml(i.name)} – ${escapeHtml(i.qty)}</li>`).join("");
      const steps = (r.steps || []).map(s => `<li>${escapeHtml(s)}</li>`).join("");

      const videoCell = r.video
        ? `<a class="btn btn-small" href="${escapeHtml(r.video)}" target="_blank" rel="noopener">Watch Video</a>`
        : `<span class="muted">No video for recipe</span>`;

      return `
        <tr>
          <td>
            <a class="recipe-link" href="view-recipe.html?id=${encodeURIComponent(r.id)}">
              <img src="${escapeHtml(r.photo)}" class="recipe-thumb" alt="${escapeHtml(r.title)}">
              <span class="recipe-name">${escapeHtml(r.title)}</span>
              <span class="badge">${escapeHtml(r.category)}</span>
            </a>
          </td>
          <td><ul>${ing}</ul></td>
          <td><ol>${steps}</ol></td>
          <td>${videoCell}</td>
          <td>${escapeHtml(r.likes)}</td>
          <td><a href="edit-recipe.html?id=${encodeURIComponent(r.id)}" class="link">Edit</a></td>
          <td><a href="#" class="link delete-link" data-id="${escapeHtml(r.id)}">Delete</a></td>
        </tr>
      `;
    }).join("");

    document.querySelectorAll(".delete-link").forEach(a => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const id = a.getAttribute("data-id");
        const newList = loadRecipes().filter(r => r.id !== id);
        saveRecipes(newList);
        showToast("Deleted successfully ✅");
        setTimeout(() => window.location.href = "my-recipes.html", 700);
      });
    });

    const params = new URLSearchParams(window.location.search);
    const msg = params.get("msg");
    if(msg) showToast(msg);
  }

  // -----------------------------
  // Add Recipe page
  // -----------------------------
  const addForm = document.getElementById("addRecipeForm");
  if(addForm){
    const addIng = document.getElementById("addIngredientBtn");
    const ingWrap = document.getElementById("ingredientsContainer");
    const addStep = document.getElementById("addStepBtn");
    const stepWrap = document.getElementById("stepsContainer");
    const photo = document.getElementById("photo");
    const preview = document.getElementById("preview");

    let photoDataUrl = "";

    addIng.addEventListener("click", () => {
      const row = document.createElement("div");
      row.className = "two-cols";
      row.innerHTML = `
        <input type="text" class="input-field ing-name" placeholder="Ingredient name" required>
        <input type="text" class="input-field ing-qty" placeholder="Quantity (e.g., 200g)" required>
      `;
      ingWrap.appendChild(row);
    });

    addStep.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "input-field step";
      input.placeholder = "Next step";
      input.required = true;
      stepWrap.appendChild(input);
    });

    photo.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if(!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        photoDataUrl = reader.result;
        preview.src = photoDataUrl;
      };
      reader.readAsDataURL(file);
    });

    addForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if(!addForm.checkValidity()){
        showToast("Please fill all required fields");
        return;
      }
      if(!photoDataUrl){
        showToast("Please upload a photo");
        return;
      }

      const title = document.getElementById("title").value.trim();
      const category = document.getElementById("category").value;
      const description = document.getElementById("desc").value.trim();
      const video = (document.getElementById("video").value || "").trim();

      const names = [...document.querySelectorAll(".ing-name")].map(x => x.value.trim());
      const qtys  = [...document.querySelectorAll(".ing-qty")].map(x => x.value.trim());
      const ingredients = names.map((n, i) => ({name:n, qty: qtys[i] || ""}));

      const steps = [...document.querySelectorAll(".step")].map(x => x.value.trim());

      const list = loadRecipes();
      list.unshift({
        id: getId(),
        title,
        category,
        description,
        photo: photoDataUrl,
        ingredients,
        steps,
        video,
        likes: Math.floor(Math.random()*70) + 20
      });
      saveRecipes(list);

      window.location.href = "my-recipes.html?msg=" + encodeURIComponent("Added successfully ✅");
    });
  }

  // -----------------------------
  // Edit Recipe page
  // -----------------------------
  const editForm = document.getElementById("editRecipeForm");
  if(editForm){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const list = loadRecipes();
    const r = list.find(x => x.id === id);

    if(!r){
      showToast("Recipe not found");
      setTimeout(() => window.location.href = "my-recipes.html", 700);
      return;
    }

    document.getElementById("e_title").value = r.title;
    document.getElementById("e_category").value = r.category;
    document.getElementById("e_desc").value = r.description;
    document.getElementById("e_video").value = r.video || "";

    const ingWrap = document.getElementById("e_ingredientsContainer");
    const stepWrap = document.getElementById("e_stepsContainer");
    const preview = document.getElementById("e_preview");
    const photo = document.getElementById("e_photo");

    preview.src = r.photo;

    function addIngRow(name="", qty=""){
      const row = document.createElement("div");
      row.className = "two-cols";
      row.innerHTML = `
        <input type="text" class="input-field e_ing_name" placeholder="Ingredient name" value="${escapeHtml(name)}" required>
        <input type="text" class="input-field e_ing_qty" placeholder="Quantity" value="${escapeHtml(qty)}" required>
      `;
      ingWrap.appendChild(row);
    }

    function addStepRow(val=""){
      const input = document.createElement("input");
      input.type = "text";
      input.className = "input-field e_step";
      input.placeholder = "Next step";
      input.value = val;
      input.required = true;
      stepWrap.appendChild(input);
    }

    ingWrap.innerHTML = "";
    (r.ingredients || []).forEach(i => addIngRow(i.name, i.qty));

    stepWrap.innerHTML = "";
    (r.steps || []).forEach(s => addStepRow(s));

    document.getElementById("e_addIngredientBtn").addEventListener("click", () => addIngRow());
    document.getElementById("e_addStepBtn").addEventListener("click", () => addStepRow());

    let newPhoto = "";
    photo.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        newPhoto = reader.result;
        preview.src = newPhoto;
      };
      reader.readAsDataURL(file);
    });

    editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if(!editForm.checkValidity()){
        showToast("Please fill all required fields");
        return;
      }

      r.title = document.getElementById("e_title").value.trim();
      r.category = document.getElementById("e_category").value;
      r.description = document.getElementById("e_desc").value.trim();
      r.video = (document.getElementById("e_video").value || "").trim();

      const names = [...document.querySelectorAll(".e_ing_name")].map(x => x.value.trim());
      const qtys  = [...document.querySelectorAll(".e_ing_qty")].map(x => x.value.trim());
      r.ingredients = names.map((n, i) => ({name:n, qty: qtys[i] || ""}));

      r.steps = [...document.querySelectorAll(".e_step")].map(x => x.value.trim());

      if(newPhoto) r.photo = newPhoto;

      saveRecipes(list);
      window.location.href = "my-recipes.html?msg=" + encodeURIComponent("Edited successfully ✅");
    });
  }

  // -----------------------------
  // View Recipe page
  // -----------------------------
  const vTitle = document.getElementById("v_title");
  if(vTitle){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const list = loadRecipes();
    const r = list.find(x => x.id === id);

    if(!r){
      showToast("Recipe not found");
      setTimeout(() => window.location.href = "my-recipes.html", 700);
      return;
    }

    document.getElementById("v_photo").src = r.photo;
    document.getElementById("v_title").textContent = r.title;
    document.getElementById("v_desc").textContent = r.description;

    const ing = document.getElementById("v_ingredients");
    ing.innerHTML = (r.ingredients || []).map(i => `<li>${escapeHtml(i.name)} – ${escapeHtml(i.qty)}</li>`).join("");

    const steps = document.getElementById("v_steps");
    steps.innerHTML = (r.steps || []).map(s => `<li>${escapeHtml(s)}</li>`).join("");

    const vVideo = document.getElementById("v_video");
    if(r.video){
      vVideo.innerHTML = `<a class="btn btn-small" href="${escapeHtml(r.video)}" target="_blank" rel="noopener">Watch Video</a>`;
    } else {
      vVideo.innerHTML = `<p class="muted">No video for recipe</p>`;
    }
  }
});
