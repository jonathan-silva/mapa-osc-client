<?php
  error_reporting(E_ALL);
  ini_set("display_errors", 1);
  include_once( "../cache/mapa.php");
  $chave = isset($_POST['chave']) ? md5($_POST['chave']) : '';
  $rota = isset($_POST['rota']) ? $_POST['rota'] : '';
  $valor="";

  $cache = new Cache();
  $valor = $cache->getCoordenadas($chave);

  if($valor!=""){
    print_r($valor);
  }
  else{
	   $dadosJSON = file_get_contents($rota);//"mockDadosGeograficos.php");
     $cache->setCoordenadas($chave, $dadosJSON);
     print_r($dadosJSON);
  }

?>
