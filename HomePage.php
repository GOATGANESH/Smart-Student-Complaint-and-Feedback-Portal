<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Campus | Portal</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="./assets/css/HomePage.css">
</head>

<body>

    <?php
    include './config/db.php';
    ?>
    <div id="toast-container"></div>
    <nav>
        <div class="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7L12 12L22 7L12 2Z"></path>
                <path d="M2 17L12 22L22 17"></path>
                <path d="M2 12L12 17L22 12"></path>
            </svg>
            Smart Campus
        </div>
        <div id="toprightP">Complaint & Feedback 2025 Prototype</div>
    </nav>

    <div class="container">
        <h1><b>Complaint & Feedback Portal</b></h1>
        <p class="subtitle">Select your role to proceed to the secure dashboard.</p>

        <div class="role-selection">
            <div class="card" onclick="openStudentLogin()">
                <div class="icon-box student-icon">🎓</div>
                <h2>Student Zone</h2>
                <p>
                    Post complaints regarding infrastructure, academics, or hostel facilities. Track your status in
                    real-time.

                </p>
                <span class="btn btn-student">Student Login &rarr;</span>
            </div>

            <div class="card" onclick="openAdminLogin()">
                <div class="icon-box admin-icon">🛡️</div>
                <h2>Admin Control </h2>
                <p>Authorized faculty and staff only. Manage tickets, update statuses, and generate reports It is a
                    <b>Restricted</b>.
                </p>
                <span class="btn btn-admin">Admin Login &rarr;</span>
            </div>
        </div>
    </div>

    <footer>
        &copy; 2025 Smart Campus Portal Project
    </footer>

    <div id="studentLoginModal" class="modal-overlay">
        <div class="popup-card">
            <span class="close-icon" onclick="closeAll()">&times;</span>

            <div class="icon-circle">🎓</div>
            <h2 id="SLN">Student Login</h2>
            <p id="SLP">Enter credentials to track status</p>
            <form id="student-login-form" action="./api/auth/studentLogin.php" method="post">
                <div style="text-align:left;">
                    <label class="SLL">Student ID / PRN</label>
                    <input type="text" id="login-id" class="input-box" placeholder="e.g., 2024CS001"
                        oninput="clearError(this)" maxlength="10" required>

                    <label class="SLL">Password</label>
                    <input type="password" id="login-pass" class="input-box" placeholder="••••••••"
                        oninput="clearError(this)" maxlength="6" required>
                </div>

                <button type="submit" class="btn-blue" onclick="handleLogin()">Login</button>
            </form>

            <div class="link-text">
                Don't have an account?
                <a href="#" onclick="switchToSignup()" style="color:#3B82F6;">Sign Up Here</a>
            </div>
        </div>
    </div>

    <div id="studentSignupModal" class="modal-overlay">
        <div class="popup-card signup-theme">
            <span class="close-icon" onclick="closeAll()">&times;</span>

            <h2 id="SGH">Create Account</h2>
            <p id="SGP">New student registration</p>

            <form id="student-signup-form" action="./api/auth/studentSignup.php" method="post">
                <div class="ALLTHEINPUTS">
                    <input type="text" id="signup-name" class="input-box" placeholder="Full Name"
                        class="sgnc" oninput="clearError(this)">
                    <input type="tel" id="signup-mobile" class="input-box" placeholder="Mobile Number" maxlength="10"
                        class="sgnc" oninput="clearError(this)">
                    <input type="text" id="signup-id" class="input-box" placeholder="Student ID / PRN"
                        class="sgnc" oninput="clearError(this)" maxlength="10">
                    <input type="email" id="signup-email" class="input-box" placeholder="Email Address"
                        class="sgnc" oninput="clearError(this)">

                    <input type="password" id="signup-pass" class="input-box" placeholder="Create Password (Max 6)"
                        class="sgnc" oninput="clearError(this)" maxlength="6">
                    <input type="password" id="signup-confirm" class="input-box" placeholder="Confirm Password"
                        class="sgnc" oninput="clearError(this)" maxlength="6">
                </div>

                <button type="submit" class="btn-blue btn-green" style="margin-top:0.5rem;" onclick="handleRegister()">Register
                    Now</button>
            </form>
            <div class="link-text">
                Already have an account?
                <a href="#" onclick="switchToLogin()" style="color:#10B981;">Login Here</a>
            </div>
        </div>
    </div>

    <script src="./assets/js/HomePage.js"></script>
    <script>
        //--- REGISTER  STUDENT IN DB ---
        function studentFormSubmitHandler(student) {

            fetch('./api/auth/studentSignup.php?user=student', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "spass=" + encodeURIComponent(student.spass) + "&sconfirm=" + encodeURIComponent(student.sconfirm) + "&sid=" + encodeURIComponent(student.sid) + "&sname=" + encodeURIComponent(student.sname) + "&semail=" + encodeURIComponent(student.semail) + "&smobile=" + encodeURIComponent(student.smobile)
                })
                .then(res => res.text())
                .then(text => {
                    if (text != "success") {
                        showToast(text, 'error');
                    } else {
                        showToast('Registration Successful! Redirecting...', 'success');
                        setTimeout(() => {
                            switchToLogin();
                        }, 1500);
                    }
                })
        }


        function getStudentInfo() {
            const fields = ['signup-name', 'signup-mobile', 'signup-id', 'signup-email', 'signup-pass', 'signup-confirm'];

            let obj = {};
            fields.forEach(id => {
                obj['s' + id.substring(id.indexOf('-') + 1)] = document.getElementById(id).value.trim()
            })
            return obj;
        }


        //LOGIN STUDENT ---

        function studentLoginHandler(sid, spass) {

            fetch('./api/auth/studentLogin.php?user=student', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "spass=" + encodeURIComponent(spass) + "&sid=" + encodeURIComponent(sid)
                })
                .then(res => res.text())
                .then(text => {
                    if (text != "success") {
                        showToast(text, 'error');
                    } else {
                            
                        showToast('Login Verified! Opening Dashboard...', 'success');
                        setTimeout(() => {
                            window.location.href = 'student/dashboard/Dashboard.html';
                        }, 1000);
                    }
                })
        }

        document.body.addEventListener("submit", (e) => {
            if (e.target.matches("#student-signup-form")) {
                e.preventDefault();
                if (handleRegister()) {
                    let student = getStudentInfo();
                    studentFormSubmitHandler(student);
                }
            }
            if (e.target.matches("#student-login-form")) {
                e.preventDefault();
                if (handleLogin()) {
                    let sid = document.getElementById('login-id').value;
                    let spass = document.getElementById('login-pass').value;
                    studentLoginHandler(sid, spass);

                }
            }

        })
    </script>
</body>

</html>