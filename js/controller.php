<?php
  error_reporting(E_ALL);
  ini_set("display_errors", 1);
  include_once( "../cache/mapa.php");

  $flag = isset($_GET['flag']) ? $_GET['flag'] : '';
  $rota = isset($_GET['rota']) ? $_GET['rota'] : '';
  $isCacheEnabled = false;

  if($flag!='' && $rota!=''){
    if($flag == 'autocomplete'){
      $dadosJSON = file_get_contents($rota);
      print_r($dadosJSON);
    }
    else if($flag == 'consulta'){
      if($isCacheEnabled){
        $valor="";
        $chave = md5($rota);
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
      }
      else{
        $dadosJSON = file_get_contents($rota);
        print_r($dadosJSON);
      }
    }
    else{
      print_r("Tipo de consulta inexistente.");
    }
  }
  else{
    print_r("Flag (".$flag.") ou rota (".$rota.") inexistente");
  }

?>
