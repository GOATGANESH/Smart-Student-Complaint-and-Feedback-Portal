 /* ----- 1. PROFESSIONAL TOAST NOTIFICATION SYSTEM --- */
        function showToast(message, type = 'success') {
            const container = document.getElementById('toast-container');
            
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            
            const icon = type === 'success' ? '✅' : '⚠️';
            toast.innerHTML = `<span class="icon">${icon} </span> ${message}`;
            container.appendChild(toast);
            
            
            setTimeout(() => {
                 toast.classList.add('show'); 
                }, 10);

           
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                     toast.remove(); 
                    }, 300);
            }, 3000);
        }

        /* --- 2. ERROR HANDLING (Make inputs RED) --- */
        function showError(inputId, message) {
            const input = document.getElementById(inputId);
            input.classList.add('input-error');
            
            showToast(message, 'error');
        }

        function clearError(inputElement) {
            inputElement.classList.remove('input-error');
        }

        /* --- 3. MODAL NAVIGATION --- */
        function openStudentLogin() {
            closeAll();
            document.getElementById('studentLoginModal').style.display = 'flex';
        }
        
         function openAdminLogin() {
            closeAll();
            // document.getElementById('AdminLoginModal').style.display = 'flex';
            // window.location.href = "../../admin/adminLogin.php";
            console.log("Hii")
            
        }
        function switchToSignup() {
            document.getElementById('studentLoginModal').style.display = 'none';
            document.getElementById('studentSignupModal').style.display = 'flex';
        }

        function switchToLogin() {
            document.getElementById('studentSignupModal').style.display = 'none';
            document.getElementById('studentLoginModal').style.display = 'flex';
        }

        function closeAll() {
            document.querySelectorAll('.modal-overlay').forEach(el => el.style.display = 'none');
            
            document.querySelectorAll('.input-box').forEach(el => el.classList.remove('input-error'));
        }
        
        window.onclick = function(e) {
            if (e.target.classList.contains('modal-overlay')) closeAll();
        }

        /* --- 4. FORM LOGIC --- */

        // SIGN UP LOGIC
        function handleRegister() {
            const fields = ['signup-name', 'signup-mobile', 'signup-id', 'signup-email', 'signup-pass', 'signup-confirm'];
            let isValid = true;

           
            fields.forEach(id =>
                {
                const el = document.getElementById(id);
                if(!el.value.trim()) {
                    el.classList.add('input-error');
                    isValid = false;
                }
            });

            if(!isValid) {
                showToast('Please fill all highlighted fields', 'error');
                return;
            }

            
            const mobile = document.getElementById('signup-mobile').value;
            if(mobile.length !== 10) {
                showError('signup-mobile', 'Mobile number must be 10 digits');
                return;
            }

          
            const email = document.getElementById('signup-email').value;
            if(!email.includes('@')||email.charAt(0)!== email.charAt(0).toLowerCase()) {

                showError('signup-email', 'Invalid email address');
                return;
            }

           
            const pass = document.getElementById('signup-pass').value;
            const confirm = document.getElementById('signup-confirm').value;

            if(pass.length < 6) {
                showError('signup-pass', 'Password is too short (Strong 6)');
                return;
            }

            if(pass !== confirm) {
                showError('signup-confirm', 'Passwords do not match');
                document.getElementById('signup-pass').classList.add('input-error'); // Mark both red
                return;
            }

            // SUCCESS
            
            return isValid;
        }



        // LOGIN LOGIC
        function handleLogin() {
            const id = document.getElementById('login-id');
            const pass = document.getElementById('login-pass');
            let isValid = true;

            if(!id.value.trim()) {
                id.classList.add('input-error');
                isValid = false;
            }
            if(!pass.value.trim()) {
                pass.classList.add('input-error');
                isValid = false;
            }
            if(pass.value.trim().length < 6){
                 showError('signup-pass', 'Password is too short (Strong 6)');
                 isValid=false;
            }
            // if(!isValid) {
            //     showToast('Credentials required', 'error');
            //     return false;
            // }    

            return isValid;
        }
