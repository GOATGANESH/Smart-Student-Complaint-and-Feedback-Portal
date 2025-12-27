 addEventListener("DOMContentLoaded",()=>{
      document.querySelector('.admin-login-container').classList.add('show');
    })
    const loginForm = document.getElementById("form");
    const adminUserName = document.getElementById("admin-username");
    const adminLoginPass = document.getElementById("admin-password");

    adminLoginPass.addEventListener("focus", function (e) {
      this.classList.remove("invalid");
      document
        .querySelector(".warning-msg")
        .classList.remove("invalid-pass-warning");
    });

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (adminLoginPass.value.length < 6) {
        adminLoginPass.classList.add("invalid");
        document
          .querySelector(".warning-msg")
          .classList.add("invalid-pass-warning");
      }
      else{
        // loginAdmin();
       loginForm.submit();
       window.location.href='./dashboard/AdminPanel.php'
      }
    });

