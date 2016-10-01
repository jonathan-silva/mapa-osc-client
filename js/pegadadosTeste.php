<?php
  $limite = isset($_POST['limite']) ? $_POST['limite'] : 50000;

  $SQLPontos = "SELECT bosc_sq_osc AS id, ST_Y(ospr_geometry), ST_X(ospr_geometry) FROM portal.vm_osc_principal group by bosc_sq_osc order by bosc_sq_osc  limit ".$limite;

  $db_connection = pg_connect("host=10.1.4.110 dbname=mapaosc_test user=i3geo password=ipea001");

  $result = pg_query($db_connection, $SQLPontos);
  $maxid = pg_fetch_row($result)[count($result)];

  $json = array_fill(0, $maxid, '');
  while ($val = pg_fetch_row($result) ) {
    $json[$val[0]][0] = $val[1];//lat
    $json[$val[0]][1] = $val[2];//lng
  }

  $chunks = count($json)/4;
  $pieceOfArray = array_chunk($json, $chunks, true);
  $arrayJSON = '';
  while(@ob_end_clean());
  $size = count($pieceOfArray);

  for($i=0; $i<$size; $i++){
    $f=json_encode($pieceOfArray[$i]);
    if($i!=$size-1) $f.=',';
    //print_r("----------------------------------------");
    print_r($f);
    flush();
    //sleep(1);
  }
    /*foreach ($pieceOfArray as $key => $value) {
        foreach($value as $k => $v) {
        $arrayString = json_encode($v);
        //$arrayString=str_replace("}{", "},{", $f);
        print_r($arrayString.',');
        flush();
        //sleep(1);
        //usleep(10000);
      }

  }*/
?>
