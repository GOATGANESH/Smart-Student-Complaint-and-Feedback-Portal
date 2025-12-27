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

function showTab(tabName) {
  document
    .querySelectorAll(".tab-content")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById("tab-" + tabName).classList.add("active");
  document
    .querySelectorAll(".nav-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document.getElementById("btn-" + tabName).classList.add("active");
}

// --- COMPLAINTS DATA LOGIC ---

document.addEventListener("DOMContentLoaded", loadData);

function submitData() {
  const cat = document.getElementById("cat").value;
  const desc = document.getElementById("desc").value;
  if (!cat || !desc.trim()) {
    showToast("Please fill all fields", "error");
    return;
  }

  const newEntry = {
    id: "#" + Math.floor(1000 + Math.random() * 9000),
    category: cat,
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    status: "Pending",
    desc: desc,
  };

  let data = JSON.parse(localStorage.getItem("complaints")) || [];
  data.unshift(newEntry);
  localStorage.setItem("complaints", JSON.stringify(data));

  showToast("Complaint Submitted!", "success");
  document.getElementById("cat").value = "";
  document.getElementById("desc").value = "";
  loadData();
  showTab("status");
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("complaints")) || [];
  const tbody = document.getElementById("table-body");
  const empty = document.getElementById("empty-msg");
  tbody.innerHTML = "";

  if (data.length === 0) {
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    data.forEach((item) => {
      tbody.innerHTML += `<tr>
                        <td style="font-weight:600; font-family:monospace; color:#111827;">${item.id}</td>
                        <td>${item.category}</td>
                        <td style="color:#6B7280;">${item.date}</td>
                        <td><span class="badge badge-${item.status}">${item.status}</span></td>
                        <td><span class="action-link" onclick="openDetails('${item.id}')">View Details</span></td>
                    </tr>`;
    });
  }
}

function clearAll() {
  if(document.getElementById("empty-msg").style.display == "block"){
    showToast("Table is empty ! ",'error');
  }
  else{
    if (confirm("Delete all history permanently ?")) {
    if(clearComplaintHistory()){
        showComplaintHistory();
        showToast("History Cleared", "success");
    }
  }
  }
  
}

async function openDetails(complaint_ticket) {
  const data = await fetchComplaints();
  const complaint = data.find((c) => c.complaint_ticket === complaint_ticket);

  let MySQLDate = complaint.complaint_created_at;
  let date = MySQLDate.replace(/[-]/g, "/");
  let jsDate = new Date(Date.parse(date)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (complaint) {
    document.getElementById("modal-id").innerText = complaint.complaint_ticket;
    document.getElementById("modal-cat").innerText = complaint.category_name;
    document.getElementById("modal-desc").innerText = complaint.description;
    document.getElementById("modal-date").innerText = jsDate;
    document.getElementById("status-text").innerText =
      "Current Status: " + complaint.status;

    const adminBox = document.getElementById("admin-box");
    const adminText = document.getElementById("admin-remark-text");

    adminBox.className = "admin-box";

    if (complaint.status === "Pending") {
      adminBox.classList.add("Pending");
      adminText.innerText =
        "Complaint is Pending. Faculty will soon solve your complaint.";
    } else if (complaint.status === "Resolved") {
      adminBox.classList.add("resolved");
      adminText.innerText =
        "This issue has been resolved. Thank you for your patience.";
    } else {
      adminText.innerText = "Status updated by admin.";
    }

    const line = document.getElementById("progress-line");
    const s1 = document.getElementById("step-1");
    const s2 = document.getElementById("step-2");
    const s3 = document.getElementById("step-3");

    s1.classList.remove("active");
    s2.classList.remove("active");
    s3.classList.remove("active");
    line.style.width = "0%";

    // Logic
    if (complaint.status === "Pending") {
      s1.classList.add("active");
      line.style.width = "0%";
    } else if (complaint.status === "Processing") {
      s1.classList.add("active");
      s2.classList.add("active");
      line.style.width = "50%";
    } else if (complaint.status === "Resolved") {
      s1.classList.add("active");
      s2.classList.add("active");
      s3.classList.add("active");
      line.style.width = "100%";
    } else if (complaint.status === "Rejected") {
      s1.classList.add("active");
      s2.classList.add("active");
      s3.classList.add("active");
      line.style.width = "100%";
    }

    // Show Modal
    document.getElementById("details-modal").style.display = "flex";
  }
}

function closeModal() {
  document.getElementById("details-modal").style.display = "none";
}

window.onclick = function (event) {
  if (event.target == document.getElementById("details-modal")) closeModal();
};

/* --- MOBILE MENU TOGGLE --- */
function toggleSidebar() {
  const sidebar = document.querySelector("aside");
  sidebar.classList.toggle("active");

  // Optional: Close sidebar when clicking a menu item on mobile
  if (window.innerWidth <= 768) {
    const navBtns = document.querySelectorAll(".nav-btn");
    navBtns.forEach((btn) => {
      btn.onclick = () => {
        showTab(btn.id.replace("btn-", ""));
        sidebar.classList.remove("active");
      };
    });
  }
}

// Close sidebar when clicking outside (on the main content)
document.querySelector("main").addEventListener("click", () => {
  const sidebar = document.querySelector("aside");
  if (window.innerWidth <= 768 && sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
  }
});

// LOGOUT LOGIC
document.getElementById('student-logout-btn').addEventListener("click",(e)=>{
    e.preventDefault();
    if(confirm("Do you want to exit ? ")){
        fetch('../../api/auth/logout.php')
        .then(res => res.text())
        .then(text =>{
            if(text == "success"){
                window.location.href="../../HomePage.php";
            }
        })
    }
})
