document.addEventListener("DOMContentLoaded", function () {

  // Buttons
  document.getElementById("btnFav").onclick = function () {
    alert("Added to favourites");
  };

  document.getElementById("btnLike").onclick = function () {
    alert("Recipe liked");
  };

  document.getElementById("btnReport").onclick = function () {
    alert("Recipe reported");
  };

  // Comment form
  document.getElementById("commentForm").onsubmit = function (e) {
    e.preventDefault();
    alert("Comment added");
    this.reset();
  };

});
