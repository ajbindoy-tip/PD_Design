<?php

$CN=mysqli_connect("localhost", "admin1", "secret");
$DB=mysqli_select_db($CN, "leaf");

$data_get="select * from captured_leaf";

$Table = mysqli_query($CN,$data_get);
$json_array = array();


while ($row = mysqli_fetch_assoc($Table)){

    $json_array[]=$row;

}
function date_compare($element1, $element2) {
    $datetime1 = strtotime($element1['datetime']);
    $datetime2 = strtotime($element2['datetime']);
    return $datetime1 - $datetime2;
} 
  
// sort array with given user-defined function
usort($json_array, "data_compare");
$json_array = array_reverse($json_array);

echo json_encode($json_array);

mysqli_close($CN);

?>    





