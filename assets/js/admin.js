function showToast(msg, type) {
  const box = document.getElementById("toast-box");
  const el = document.createElement("div");

  el.className = `toast ${type}`;
  el.innerHTML = `<span>${type == "success" ? "✅" : "⚠️"}</span> ${msg}`;

  box.appendChild(el);

  setTimeout(() => el.classList.add("show"), 10);

  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

showToast("HIi",'success');
// HUMBURGER LOGIC
const humburgerIcon = document.querySelector(".humburger");
let sideBar = document.querySelector(".sidebar");
let closeMenuIcon = document.querySelector(".closeMenuIcon");

humburgerIcon.addEventListener("click", (e) => {
  sideBar.style.display = "flex";
  humburgerIcon.style.display = "none";
  document.querySelector(".background").classList.add("show-background");
});

closeMenuIcon.addEventListener("click", () => {
  sideBar.style.display = "none";
  humburgerIcon.style.display = "initial";
  document.querySelector(".background").classList.remove("show-background");
});

// Dynamic paging loading
const container = document.querySelector(".dashboard-main-window");
const links = document.querySelectorAll(".link a");

function loadPage(page) {
  if (page) {
    fetch(page)
      .then((res) => res.text())
      .then((text) => {
        container.innerHTML = text;
      });
  }
}

function toggleLinkFocus(link) {
  link.classList.toggle("active");
  document.querySelectorAll(".link").forEach((otherLink) => {
    if (otherLink != link) {
      otherLink.classList.remove("active");
    }
  });
}

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    loadPage(e.target.href);
    if (window.innerWidth <= 1000) {
      humburgerIcon.style.display = "block";
      sideBar.style.display = "none";
      document.querySelector(".background").classList.remove("show-background");
    }
    toggleLinkFocus(e.target.parentElement);
  });
});

// ----- REVIEW COMPLAINT MODAL ------

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("review-complaint")) {
    e.preventDefault();
   
    fetch("../../admin/complaints/ReviewComplaint.php")
      .then((res) => res.text())
      .then((text) => {
        document.querySelector(".review-complaint-modal").innerHTML = text;
      });
    document
      .querySelector(".review-complaint-modal")
      .classList.toggle("show-modal");
    document.querySelector(".background").classList.add("show-background");
  } else if (e.target.closest("#closeModal").id == "closeModal") {
    document
      .querySelector(".review-complaint-modal")
      .classList.toggle("show-modal");
    document.querySelector(".background").classList.remove("show-background");
  }
});

// LOGOUT
document.getElementById("admin-logout").addEventListener("click", () => {
  if (confirm("Do you want to exit ?")) {
    window.location.href = "../../HomePage.php";
  }
});
