<?php
  error_reporting(E_ALL);
  ini_set("display_errors", 1);
  include_once( "../cache/mapa.php");
  $chave = isset($_POST['chave']) ? md5($_POST['chave']) : '';
  $url = isset($_POST['url']) ? $_POST['url'] : '';
  $valor="";

  //teste
  //$chave = "hash";
  //$url = "http://mapaosc-desenv.ipea.gov.br:8383/api/osc/2";
  //fim teste

  //$redis = new Redis();
  //$redis->connect("localhost", 6379);
  //$valor = $redis->get($chave);



  $cache = new Cache();
  $valor = $cache->getCoordenadas($chave);

  if($valor!=""){
    print_r($valor);
  }
  else{
	   $dadosMockJSON = file_get_contents($url);//"mockDadosGeograficos.php");//$url
     $cache->setCoordenadas($chave, $dadosMockJSON);
     print_r($dadosMockJSON);
  }

?>
