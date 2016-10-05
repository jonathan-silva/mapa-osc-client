<?php
  include_once('../cache/mapa.php');
  $chave = isset($_POST['chave']) ? md5($_POST['chave']) : '';
  $url = isset($_POST['url']) ? $_POST['url'] : '';
  $valor='';

  //teste
  $chave = 'hash';
  $url = "http://mapaosc-desenv.ipea.gov.br:8383/api/osc/2";
  //fim teste

  $cache = new Cache();
  $valor = $cache->getCoordenadas($chave);

  if($valor!=''){
    print_r("valor pego diretamente do cache: ".$valor);
  }
  else{
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        $valor = this.responseText;
        $cache->setCoordenadas($chave, $valor);
        print_r("valor retornado: ".$valor);
      }
    };
    xhttp.open("GET", $url, true);
    xhttp.send();
  }
?>
