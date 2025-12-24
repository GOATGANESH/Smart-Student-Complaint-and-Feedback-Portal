// HUMBURGER LOGIC
const humburgerIcon = document.querySelector(".humburger");
let sideBar = document.querySelector(".sidebar");
let closeMenuIcon = document.querySelector(".closeMenuIcon");

humburgerIcon.addEventListener("click", (e) => {
  sideBar.style.display = "flex";
  humburgerIcon.style.display = "none";
});

closeMenuIcon.addEventListener("click", () => {
  sideBar.style.display = "none";
  humburgerIcon.style.display = "initial";
});

// Dynamic paging loading
const container = document.querySelector(".dashboard-main-window");
const links = document.querySelectorAll(".link a");

function loadPage(page) {
  if (page){
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
    if(otherLink!=link){
        otherLink.classList.remove('active')
    }
  });
}

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    loadPage(e.target.href);
    if(window.innerWidth<=1000){
       humburgerIcon.style.display="block"
       sideBar.style.display="none"
    }
    toggleLinkFocus(e.target.parentElement);
  });
});

// LOGOUT
document.getElementById('admin-logout').addEventListener('click',()=>{
  if(confirm("Do you want to exit ?")){
    window.location.href="../../HomePage.html"
  }
})