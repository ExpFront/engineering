<?php 
    
    require_once 'IOFactory.php'; // IOFactory отвечает за чтение Excel-файлов
	include 'PHPExcel.php';
  $name = $_POST['name'];
	// путь до нового файла
	$path_file = "files/";
                $excel = PHPExcel_IOFactory::load($path_file . "$name"); // подключить Excel-файл
                $excel->setActiveSheetIndex(0); // получить данные из указанного листа
                $sheet = $excel->getActiveSheet();

                $sheet->setCellValueByColumnAndRow(1,10,68);
                $sheet->setCellValueByColumnAndRow(2,7,84);
                $sheet->setCellValueByColumnAndRow(4,4,131);
                $sheet->setCellValueByColumnAndRow(4,9,132);
                ?>

<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
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
<?php
$nColumn = PHPExcel_Cell::columnIndexFromString($sheet->getHighestColumn());
echo "<div align='center'><h1>Ваши данные</h1>"."<table border=1; align='center';>"."<thead>";
        for ($j = 0; $j < $nColumn; $j++) {
        echo ('<th>'.$sheet->getCellByColumnAndRow($j,1)->getValue().'</th>');}
        echo "</thead>"."<tbody>";
          for ($i = 2; $i < 7; $i++) { 
          echo "<tr>";
          for ($j = 0; $j < $nColumn; $j++) {
           $value = $sheet->getCellByColumnAndRow($j, $i)->getValue();
              echo"<td>$value</td>";
            }
      
              echo "</tr>";
            }
            echo "</tbody>";

          echo "<tbody style='display:none;' id='fulltab'>";
          for ($i = 7; $i < $sheet->getHighestRow(); $i++) { 
          $table=$table. "<tr>";
          for ($j = 0; $j < $nColumn; $j++) {
            $value = $sheet->getCellByColumnAndRow($j, $i)->getValue();
              $table=$table."<td bgcolor='green'>$value</td>";

            }
              $table=$table."</tr>";
            }
                  echo $table."</tbody>"."</table>"."</div>";

?>
<div style='text-align: center; margin-bottom: 20px'>
<input type="button" id="next" name="next" value="Следующее изменение">
<input type="button" id="prev" name="prev" value="Предыдущее изменение">
<input type="button" id= "but1" name = "button" value="Открыть таблицу" onClick= " document.getElementById('fulltab').style.display = ''; document.getElementById('but1').value = 'Скрыть таблицу(двойной клик)';
" ondblclick="document.getElementById('fulltab').style.display = 'none';
document.getElementById('but1').value = 'Открыть таблицу'; ">
</div>
<canvas id="myChart" width="400" height="400"></canvas>
<script>
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        <?php echo($datamas)?>
        datasets: [<?php 
       
        $rowar='';
        for ($j = 1; $j < $nColumn; $j++) {
        echo ('{label: '.$rowar.'"'.$sheet->getCellByColumnAndRow($j,1)->getValue().'",');
        echo ("backgroundColor:['rgba(".rand(0,255).",".rand(0,255).",".rand(0,255).",0.3)'],");
        echo ("borderColor:['rgba(".rand(0,255).",".rand(0,255).",".rand(0,255).",0.3)'],");
        $str = " data : [";
        for ($i = 2; $i < $sheet->getHighestRow(); $i++) { 
        if (empty($sheet->getCellByColumnAndRow($j, $i)->getValue())){
          $str =$str."0,";
        }
        else{
          $str = $str.($sheet->getCellByColumnAndRow($j, $i)->getValue()).",";
        }
        }
        echo $str."]},";
       } 
 ?>
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
</script>



<form action="acceptme.html" method="POST">
<input type="submit" value="Подтвердить изменения">
<?php 
 $objWriter = PHPExcel_IOFactory::createWriter($excel, 'Excel2007');
 $objWriter->save('files/$name.xlsx');
?>
</form>
<form action="declineme.html" method="POST">
<input type="submit" value="Отказаться от изменеий">
</form>
	</body>
</html>