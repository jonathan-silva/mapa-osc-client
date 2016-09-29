<?php
  $limite = isset($_POST['limite']) ? $_POST['limite'] : 0;

  $SQLPontos = "SELECT bosc_sq_osc AS id, ST_Y(ospr_geometry), ST_X(ospr_geometry) FROM portal.vm_osc_principal group by bosc_sq_osc order by bosc_sq_osc  limit ".$limite;

  $db_connection = pg_connect("host=10.1.4.110 dbname=mapaosc_test user=i3geo password=ipea001");

  $result = pg_query($db_connection, $SQLPontos);
  $maxid = pg_fetch_row($result)[0];

  $json = array_fill(1, $maxid, '');
  while ($val = pg_fetch_row($result) ) {
    $json[$val[0]][0] = $val[1];//lat
    $json[$val[0]][1] = $val[2];//lng
  }
  //$json = pg_fetch_all($result);
  //print_r (json_encode($json));
  $chunks = count($json)/4;
  $pieceOfArray = array_chunk($json, $chunks, true);

while(@ob_end_clean());
foreach ($pieceOfArray as $key => $value) {
  # code...

  /*for($i=0;$i<count($pieceOfArray);$i++){

    foreach ($pieceOfArray[$i] as $key => $value) {
      echo(" $".$i."$ ".json_encode($value));
      flush();
      //ob_flush();
    }
  }
    */
    echo(json_encode($value));
    flush();
    sleep(1);
  }


/*
  for($i = 0; $i < $chunks; $i++){
      print_r(json_encode($pieceOfArray[$i]));
      //sleep(1);
  }*/
  //print_r(json_encode(array_chunk($json, $chunks, true)[0]));
  //print_r (json_encode($json[2]));
?>
