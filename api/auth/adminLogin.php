<?php
require '../../config/db.php';

$showAlert = "";

function clearString($str)
{
    global $conn;
    return htmlspecialchars(mysqli_real_escape_string($conn, $str), ENT_QUOTES, 'UTF-8');
}

function validateAdmin($user_name, $user_pass)
{
    global $conn;
    $searchSql = "SELECT * FROM `admin` WHERE `admin_username` = $user_name";
    $result = mysqli_query($conn, $searchSql);

    if (mysqli_num_rows($result) != 1) {

        return "invalid";
    } else {
        $row = mysqli_fetch_row($result);
        if (password_verify($user_pass, $row[3]) == 1) {
            session_start();
            $_SESSION['admin_id'] = $row[0];
            $_SESSION['admin_username'] = $row[1];
            return true;
        } else {
            return false;
        }
    }
}

if (isset($_GET['user']) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_name = trim($_POST['admin_username']);
    $user_pass = trim($_POST['admin_password']);
    $msg = validateAdmin($user_name, $user_pass);

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
