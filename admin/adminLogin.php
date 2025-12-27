<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin Login</title>
    <link
      href="https://cdn.jsdelivr.net/npm/remixicon@4.7.0/fonts/remixicon.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="../assets/css/admin.css" />
    <link rel="stylesheet" href="../assets/css/responsive.css" />
  </head>
  <body>
    <div id="toast-box"></div>
    <div class="admin-login-container fade-in flex-col gap-lg">
      <div class="top flex-col justify-center align-items-center">
        <div id="admin-shield-logo">
          <i class="ri-shield-user-fill"></i>
        </div>
        <div class="tag-line flex align-items-center justify-space-between">
          <span>Admin Console</span> <button id="restricted">RESTRICTED</button>
        </div>
      </div>
      <div class="bottom">
        <div class="login-form flex-col justify-content-between">
          <form id="form" class="flex-col gap-xl" method="post">
            <div id="username-container">
              <label for="username">Username</label>
              <input
                type="text"
                name="admin-username"
                id="admin-username"
                class="input"
                placeholder="Admin Username"
                required
              />
            </div>
            <div id="password-container">
              <label for="password">Password</label>
              <input
                type="password"
                name="admin-password"
                id="admin-password"
                class="input"
                placeholder="Account password"
                required
              />
              <p class="warning-msg">
                password should contain minimum 6 characters
              </p>
            </div>
            <a>
              <button type="submit" id="authentication-btn" class="btn-lg">
                Authenticate
              </button>
            </a>
          </form>
          <div class="go-to-homepage">
            <a href="../HomePage.php"
              ><i class="ri-arrow-left-long-fill"></i> Return to public
              portal</a
            >
          </div>
        </div>
      </div>
    </div>
  </body>
  <script src="../assets/js/adminValidation.js"> </script>
</html>
