<?php
require '../../config/db.php';

$showAlert = "";

function clearString($str)
{
    global $conn;
    return htmlspecialchars(mysqli_real_escape_string($conn, $str), ENT_QUOTES, 'UTF-8');
}

function validateStudent($user_id, $user_pass)
{
    global $conn;
    $searchSql = "SELECT * FROM student WHERE `student_id` = $user_id";
    $result = mysqli_query($conn, $searchSql);

    if (mysqli_num_rows($result) != 1) {
        return "invalid";
    } else {
        $row = mysqli_fetch_row($result);
        if (password_verify($user_pass, $row[3]) == 1) {
            session_start();
            $_SESSION['student_id'] = $row[0];
            $_SESSION['student_name'] = $row[1];
            return true;
        } else {
            return false;
        }
    }
}

if (isset($_GET['user']) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = clearString($_POST['sid']);
    $user_pass = clearString($_POST['spass']);
    $msg = validateStudent($user_id, $user_pass);

    if ($msg == 1) {

        $showAlert = "success";
    } else {

        if ($msg == false) {
            $showAlert = "Invalid password !";
        } else {
            $showAlert = "Invalid credentials !";
        }
    }
}

echo $showAlert;
