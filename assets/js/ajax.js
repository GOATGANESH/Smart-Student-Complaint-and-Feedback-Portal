let complaintSubmitForm = document.getElementById(
  "complaint-registration-form"
);

function validateData(cat, desc, sId, catId) {
  if (!cat || !desc.trim()) {
    showToast("Please fill all fields", "error");
    return false;
  }
  if (sId == null || catId == null) {
    showToast("Something went wrong !", "error");
    return false;
  }
  return true;
}

function registerComplaint(studentId, catId, catName, catDesc) {
  let complaintData = {
    studentId: studentId,
    catId: catId,
    catName: catName,
    catDesc: catDesc,
  };

  fetch("../../api/student/submit_complaint.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(complaintData),
  })
    .then((res) => res.text())
    .then((text) => {
      if (text.trim() == "success") {
        document.getElementById("cat").value = "";
        document.getElementById("desc").value = "";
        showToast("Complaint submitted successfully ! ", "success");
        // updateComplaintHistory();
      } else {
        showToast(text, "error");
      }
    });
}

complaintSubmitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const catId = Number(cat.options[cat.selectedIndex].id);
  const catName = document.getElementById("cat").value;
  const catDesc = document.getElementById("desc").value;
  const studentId = Number(document.getElementById("student_id").value);

  if (validateData(catName, catDesc, studentId, catId)) {
    registerComplaint(studentId, catId, catName, catDesc);
  }
});

// complaint history

async function fetchComplaints() {
  let data = [];
  let res = await fetch("../../api/student/fetch_complaints.php");
  data = await res.json();
  return data;
}

async function showComplaintHistory() {
  let tableContent = document.getElementById("table-body");
  tableContent.innerHTML = "";
  let data = await fetchComplaints();
  if (data.length == 0) {
    document.getElementById("empty-msg").style.display = "block";
  } else {
    document.getElementById("empty-msg").style.display = "none";
    data.forEach((row) => {
      tableContent.innerHTML += `<tr>
                        <td style="font-weight:600; font-family:monospace; color:#111827;">${row["complaint_ticket"]}</td>
                        <td>${row["category_name"]}</td>
                        <td style="color:#6B7280;">${row["complaint_created_at"]}</td>
                        <td><span class="badge badge-${row["status"]}">${row["status"]}</span></td>
                        <td><span class="action-link" onclick="openDetails('${row["complaint_ticket"]}')">View Details</span></td>
                    </tr>`;
    });
  }
}

document.body.addEventListener("click", (e) => {
  if (e.target.matches("#btn-status")) {
    showComplaintHistory();
  }
});


// DELETE COMPLAINT HISTORY

function clearComplaintHistory(){
    fetch('../../api/student/clear_complaints.php')
    .then(res => res.text())
    .then(text =>{
        if(text == "success"){
            showComplaintHistory();
            return true;
        }
        else{
            showToast(text,'error');
            return false;
        }
    })
}