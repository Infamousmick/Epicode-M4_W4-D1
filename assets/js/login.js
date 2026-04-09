const loginForm = document.querySelector("#loginModal form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const myUSername = "infamick";
  const myPassword = "admin";

  const userNameInput = document
    .querySelector("#loginModal form #userName")
    .value.toLowerCase();
  const passwordInput = document.querySelector(
    "#loginModal form #password",
  ).value;

  if (userNameInput !== myUSername || passwordInput !== myPassword) {
    showAlert("Credenziali errate", "text-bg-danger");
  } else {
    showAlert(
      "Login avvenuto! Reindirizzandoti al Backend...",
      "text-bg-success",
    );
    setTimeout(() => window.location.assign("../../backend.html"), 3000);
  }
});

const showAlert = (message, color) => {
  const alertContainer = document.querySelector(".toast-container");
  alertContainer.innerHTML = `
  <div id="liveToast" class="toast align-items-center ${color} border-0 shadow" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body fw-medium">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
`;

  const toastElement = document.getElementById("liveToast");

  const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
  toast.show();
};
