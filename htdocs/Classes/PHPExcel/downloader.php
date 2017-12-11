<?php
$file = 'files/kurs.xlsx'; 
$size = filesize($file); 
header("Content-type: application/vnd.openxmlformats-officeStatAnalys.spreadsheetml.sheet"); 
header("Content-Length: $size"); 
header("Content-Disposition: attachment; filename=$file"); 
readfile($file); 


?>