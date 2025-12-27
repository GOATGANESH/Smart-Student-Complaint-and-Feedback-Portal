<?php
require '../../config/db.php';
require '../../middleware/studentAuth.php';

$sId = (int) $_SESSION['student_id'];

$clearTableQuery = "DELETE  FROM `complaint` WHERE student_id = $sId";

$result = mysqli_query($conn,$clearTableQuery);
if($result){
    echo "success";
}
else{
    echo "something went wrong";
}
?>