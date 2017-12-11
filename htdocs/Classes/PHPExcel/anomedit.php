<?php 
    
    require_once 'IOFactory.php'; // IOFactory отвечает за чтение Excel-файлов
	include 'PHPExcel.php';
	// путь до нового файла
	$path_file = "files/";
                $excel = PHPExcel_IOFactory::load($path_file . "kurs.xlsx"); // подключить Excel-файл
                $excel->setActiveSheetIndex(0); // получить данные из указанного листа
                $sheet = $excel->getActiveSheet();
				$style =array('fill' => array(
        'type' => PHPExcel_Style_Fill::FILL_SOLID,
        'color' => array (
                'rgb' => '036BFE'
        )));
				$sheet->getStyleByColumnAndRow(1,5)->applyFromArray($style);
				$sheet->getStyleByColumnAndRow(2,10)->applyFromArray($style);
				$sheet->setCellValueByColumnAndRow(1,5,63);
				$sheet->setCellValueByColumnAndRow(2,10,83);
                echo "<div align='center'>Ваши данные";

                echo "<table border=1; align='center';>";
    
for ($i = 1; $i <= $sheet->getHighestRow(); $i++) {  
    echo "<tr>";
     
    $nColumn = PHPExcel_Cell::columnIndexFromString(
        $sheet->getHighestColumn());
     
    for ($j = 0; $j < $nColumn; $j++) {
        $value = $sheet->getCellByColumnAndRow($j, $i)->getValue();
        echo "<td>$value</td>";
    }
      
    echo "</tr>";
}
echo "</table>";

?>

<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
    <script src="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>StatAnalys</title>
  <link rel="stylesheet" href="./styles/style.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
  <script type="text/javascript" src="http://code.highcharts.com/highcharts.js"></script>
  <script type="text/javascript" src="http://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
</head>
<body>
<div class="ct-chart ct-perfect-fourth"></div>
<script>
var data2 = {
  labels: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
  
  series: [
    [61, 62, 61, 63, 60, 59,72,60,68,62,63,68],
    [80,85,81,86,83,84,85,86,83,82,80,81],
    [95,94,93,90,89,99,92,91,90,92,94,90],
    [134,136,131,132,130,134,135,132,136,137,131,130]
  ]
};
var options = {
  width: 1000,
  height: 700
};

new Chartist.Line('.ct-chart', data2, options);
</script>
<form action="acceptme.html" method="POST">
<input type="submit" value="Подтвердить изменения">
<?php 
 $objWriter = PHPExcel_IOFactory::createWriter($excel, 'Excel2007');
 $objWriter->save('files/kurs.xlsx');
?>
</form>
<form action="declineme.html" method="POST">
<input type="submit" value="Отказаться от изменеий">
</form>
	</body>
</html>