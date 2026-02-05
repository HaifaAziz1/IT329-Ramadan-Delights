

document.addEventListener("DOMContentLoaded", function () {

  // ---------- LOGIN ----------
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

  // ---------- SIGNUP ----------
  const signupForm = document.getElementById("signupForm");
  const profileImageInput = document.getElementById("profileImage");
  const avatarPreviewImg = document.getElementById("avatarPreview");

  const DEFAULT_AVATAR = "image/default-avatar.png";

  // Preview + default image
  if (profileImageInput && avatarPreviewImg) {
    avatarPreviewImg.src = DEFAULT_AVATAR;

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

  // Redirect after signup submit
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      window.location.href = "user.html";
    });
  }

}); 






