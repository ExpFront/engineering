<?php 
    require_once 'IOFactory.php'; // IOFactory отвечает за чтение Excel-файлов
// ограничение размера файла
	$limit_size = 1*1024*1024*1024; 
	// корректные форматы файлов
	// хранилище ошибок
	$error_array = array();
	// путь до нового файла
	$path_file = "files/";

	// если есть отправленные файлы
	if($_FILES){
		// валидация размера файла
		if($_FILES["userfile"]["size"] > $limit_size){
			$error_array[] = "Размер файла превышает допустимый!";
		}
		// если не было ошибок
		if(empty($error_array)){
			// проверяем загружен ли файл
			if(is_uploaded_file($_FILES["userfile"]["tmp_name"])){
				// сохраняем файл
				move_uploaded_file($_FILES["userfile"]["tmp_name"], $path_file . $_FILES["userfile"]["name"]);
        $filename = $_FILES["userfile"]["name"];
               

                $excel = PHPExcel_IOFactory::load($path_file . $_FILES["userfile"]["name"]); // подключить Excel-файл
                $excel->setActiveSheetIndex(0); // получить данные из указанного листа

                $sheet = $excel->getActiveSheet();

$colar = $sheet->getCellByColumnAndRow(0,2)->getValue();
      for ($i = 3; $i < $sheet->getHighestRow(); $i++) { 
      $colar= $colar.'", "'.$sheet->getCellByColumnAndRow(0,$i)->getValue();}
      $datamas=$datamas.'labels: ["'.$colar.'"],';
			}else{
				// Если файл не загрузился
				$error_array[] = "Ошибка загрузки!";
			}
		}		
	}
?>

<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/chartist@0.11.0/dist/chartist.css">
  <script src="https://cdn.jsdelivr.net/npm/chartist@0.11.0/dist/chartist.min.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>StatAnalys</title>
  <link rel="stylesheet" href="styles/style.css">
  <link rel="stylesheet" href="jquery.jexcel.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
  <script type="text/javascript" src="http://code.highcharts.com/highcharts.js"></script>
  <script type="text/javascript" src="http://code.highcharts.com/modules/exporting.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="jquery.nicescroll.js"></script>
<script src="http://cdn.bossanova.uk/js/jquery.jexcel.js"></script>
</head>
<body>
<?php
$nColumn = PHPExcel_Cell::columnIndexFromString($sheet->getHighestColumn());
echo "<div align='center'><h1>Ваши данные</h1></div>";
?>
<div style="background-color:#c8c8c8; margin:0 auto; max-height: 250px; width:500px; overflow: scroll;">
<div id="my" style="max-height: 250px;
width:250px; background-size:100px; hover::-webkit-scrollbar-thumb{background: #6a7d9b;}; margin-left:75px;">

<script>
data = [<?php $rowsforex = ($sheet->getCellByColumnAndRow(0,1)->getValue());
        for ($j = 0; $j < $nColumn; $j++) {
          $rowsforex = $rowsforex."'".($sheet->getCellByColumnAndRow($j,1)->getValue())."',";}
        for ($i = 2; $i < $sheet->getHighestRow(); $i++) { 
                  $str = "";
                  $firstr="['".$sheet->getCellByColumnAndRow(0,$i)->getValue()."',";
        for ($j = 1; $j < $nColumn; $j++) {

        if (empty($sheet->getCellByColumnAndRow($j, $i)->getValue())){
          $str =$str."0,";
        }
        else{
          $str = $str.($sheet->getCellByColumnAndRow($j, $i)->getValue()).",";
        }
        }
        echo $firstr.$str."],";
       }  ?>
    
];

$('#my').jexcel({
    data:data,
    <?php echo "colHeaders:[".$rowsforex."]";
     ?>
});
</script>
</div>
</div>
<div style='text-align: center; margin-bottom: 20px'>
<input type="button" id= "but1" name = "button" value="Внести изменения" onClick= " document.getElementById('fulltab').style.display = '';">
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
<form action="chomethod.php" method="POST" style='text-align: center;' enctype="multipart/form-data">
<p><input type="submit" value="Обработать данные"><br></p>
<input type="text" name="name" value="<?php echo $filename;?>" hidden>
     </form>
	</body>
</html>