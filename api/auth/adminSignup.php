<?php
require '../../config/db.php';

$showAlert = "";

function clearString($str)
{
    global $conn;
    return htmlspecialchars(mysqli_real_escape_string($conn, $str), ENT_QUOTES, 'UTF-8');
}

function validateStudent($user_id)
{
    global $conn;
    $searchSql = "SELECT * FROM student WHERE `student_id` = $user_id";
    $result = mysqli_query($conn, $searchSql);
    if (mysqli_num_rows($result) == false) {
        return true;
    } else {
        return false;
    }
}

if (isset($_GET['user']) && $_SERVER['REQUEST_METHOD'] == 'POST') {


    $user_id = trim($_POST['sid']);
    $user_name = trim($_POST['sname']);
    $user_email = trim($_POST['semail']);
    $user_mobile = trim($_POST['smobile']);
    $user_pass = trim($_POST['spass']);
    $user_cpass = trim($_POST['sconfirm']);

    if (!validateStudent($user_id)) {
        $showAlert = "Account already exists ! ";
    } else {
        if (!filter_var($user_email, FILTER_VALIDATE_EMAIL)) {
            $showAlert = "Enter valid email !";
        } else {
            $pass_hash = password_hash($user_pass, PASSWORD_DEFAULT);
            $insertSql = "INSERT INTO `student` (`student_id`, `student_name`, `student_email`, `student_password_hash`, `student_mobileno`,`created_at`) VALUES ('$user_id', '$user_name', '$user_email', '$pass_hash', '$user_mobile', current_timestamp())";
            
            $result = mysqli_query($conn, $insertSql);
            if (!$result) {
                $showAlert = "Something went wrong !";
            } else {
                $showAlert = "success";
            }
        }
    }
}

echo $showAlert;
?>
