<?php
require '../../config/db.php';
require '../../middleware/studentAuth.php';

$showAlert = "";

function clearString($str)
{
    global $conn;
    return htmlspecialchars(mysqli_real_escape_string($conn, $str), ENT_QUOTES, 'UTF-8');
}

    
function validateComplaint($conn, $sId, $catId, $catDesc, &$showAlert){
    // To check for the max submission
    $result = mysqli_query($conn,"SELECT COUNT(*) AS total FROM complaint WHERE student_id = $sId AND status = 'Pending' ");
     $row = mysqli_fetch_assoc($result);
     if($row['total'] > 5){
            $showAlert = "Limit exceed ! MAX 5 complaints allowed ";
             return false;
     }
     
     // Check for description-
    if (str_word_count($catDesc) < 10) {
        $showAlert = "Description is too short !";
        return false;
    }
    // check for duplicate complaint
        $result = mysqli_query($conn, "SELECT * FROM complaint WHERE student_id = $sId AND category_id = $catId AND description = '$catDesc' AND status = 'Pending'");
        $nums = mysqli_num_rows($result);

        if (!$result) {
            return true;
        } else {
            return mysqli_num_rows($result) === 0;
        }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $data = json_decode(file_get_contents("php://input"), true);
    $sId = $data['studentId'];
    $catId = $data['catId'];
    $desc =  clearString($data['catDesc']);
    $status = 'Pending';

    $flag = validateComplaint($conn, $sId, $catId, $desc,$showAlert);

    if ($flag == true) {
        $complaintTicket = "#" . substr(uniqid("#"), -6);
        $insertSql = "INSERT INTO complaint(`complaint_ticket`,`student_id`,`category_id`,`description`,`status`,`created_at`) VALUES('$complaintTicket',$sId,$catId,'$desc','$status',NOW())";

        $result = mysqli_query($conn, $insertSql);
        if ($result) {
            $showAlert = "success";
        } else {
            $showAlert = "something went wrong !";
        }
    } else {
        if($showAlert === ""){
            $showAlert = "Complaint already registered !";
        }
    }
    echo $showAlert;
}
