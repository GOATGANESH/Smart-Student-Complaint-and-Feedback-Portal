<?php
require '../../config/db.php';
require '../../middleware/studentAuth.php';

$sId = (int)$_SESSION['student_id'];

$fetchDataQuery = "SELECT  
    c.complaint_ticket,
    c.description,
    c.status,
    c.created_at AS complaint_created_at,
    category.category_name
    FROM complaint c
    JOIN category ON c.category_id = category.category_id 
    WHERE student_id = $sId
    ORDER BY c.created_at DESC ";

$data = [];
$result = mysqli_query($conn, $fetchDataQuery);
if ($result) {
    $nums = mysqli_num_rows($result);
    if ($nums > 0) {
        while($row = mysqli_fetch_assoc($result)){
            $row['description'] =  htmlspecialchars_decode($row['description'], ENT_QUOTES);
            $data[] = $row;
        }
    }
    echo json_encode($data);
}
else{
    echo "Something went wrong ";
}
