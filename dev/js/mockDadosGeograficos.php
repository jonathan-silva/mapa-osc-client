<?php
  $limite = isset($_POST['limite']) ? $_POST['limite'] : 0;

  $SQLPontos = "SELECT bosc_sq_osc AS id, ST_Y(ospr_geometry) as lat, ST_X(ospr_geometry) as lng FROM portal.vm_osc_principal group by bosc_sq_osc order by bosc_sq_osc  limit ".$limite;

  $db_connection = pg_connect("host=10.1.4.110 dbname=mapaosc_test user=i3geo password=ipea001");

  $result = pg_query($db_connection, $SQLPontos);
  $result = pg_fetch_all($result);
  $maxid = $result[count($result)-1]['id'];
  $json = array_fill(1, $maxid, '');

  for ($i = 0; $i<count($result); $i++) {
      $json[$result[$i]['id']][0] = $result[$i]['lat'];//lat
      $json[$result[$i]['id']][1] = $result[$i]['lng'];//lng
  }

  //$chunks = count($json)/4;
  //$pieceOfArray = array_chunk($json, $chunks, true);
  print_r(json_encode($json));
  flush();
/*
  while(@ob_end_clean());
  $size = count($pieceOfArray);

  for($i=0; $i<$size; $i++){
    $f=json_encode($pieceOfArray[$i]);
    if($i!=$size-1) $f.=',';
    print_r($f);
    //print_r("----------------------------------------");
    flush();
    //sleep(1);
  }
    foreach ($pieceOfArray as $key => $value) {
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
