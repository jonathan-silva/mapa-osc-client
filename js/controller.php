<?php
  error_reporting(E_ALL);
  ini_set("display_errors", 1);
  include_once( "../cache/mapa.php");

  $flag = isset($_GET['flag']) ? $_GET['flag'] : '';
  $rota = isset($_GET['rota']) ? $_GET['rota'] : '';


  if($flag=='' && $rota==''){
    $flag = isset($_POST['flag']) ? $_POST['flag'] : '';
    $rota = isset($_POST['rota']) ? $_POST['rota'] : '';
  };

  $user = isset($_POST['user']) ? $_POST['user'] : ''; //ID DO USUARIO LOGADO

  $isCacheEnabled = false;

  if($flag!='' && $rota!=''){
            if($flag == 'autocomplete'){
                  $dadosJSON = file_get_contents($rota);
                  print_r($dadosJSON);
            }else{
                  switch ($flag) {
                      case 'consulta':
                            if($isCacheEnabled){
                                  $valor="";
                                  $chave = md5($rota);
                                  $cache = new Cache();
                                  $valor = $cache->getCoordenadas($chave);
                                  if($valor!=""){
                                        print_r($valor);
                                  }else{
                                        $dadosJSON = file_get_contents($rota);//"mockDadosGeograficos.php");
                                        $cache->setCoordenadas($chave, $dadosJSON);
                                        print_r($dadosJSON);
                                  }
                            }else{
                                  $dadosJSON = file_get_contents($rota);
                                  print_r($dadosJSON);
                            };
                            break;
                      case "login":
                            $parametros = isset($_POST['parametros']) ? $_POST['parametros'] : ''; // JSON DE PARAMETROS
                            $opts = array(
                                 'http' => array(
                                      'method'  => 'POST',
                                      'header'=> "Content-Type: application/json\r\n",
                                      'content' => json_encode($parametros)
                              ));

                            $context  = stream_context_create($opts);
                            $result = file_get_contents($rota, null, $context);
                            //print_r('$result');
                            print_r($result);
                            break;
                      case "consultaPost":
                            $parametros = isset($_POST['parametros']) ? $_POST['parametros'] : ''; // JSON DE PARAMETROS
                            $authorization = isset($_POST['authorization']) ? $_POST['authorization'] : ''; //CHAVE DO USUARIO LOGADO
                            $opts = array(
                                 'http' => array(
                                      'method'  => 'POST',
                                      'header'=> array("Content-Type: application/json",
                                            "Authorization: $authorization" ,
                                            "User: $user"),
                                      'content' => json_encode($parametros) . " \r\n"
                              ));

                            $context  = stream_context_create($opts);
                            $result = file_get_contents($rota, null, $context);
                            //print_r('$result');
                            print_r($result);
                            break;
                      case "validaUsuario":
                            $parametros = isset($_GET['parametros']) ? $_GET['parametros'] : ''; // JSON DE PARAMETROS
                            $authorization = isset($_GET['authorization']) ? $_GET['authorization'] : ''; //CHAVE DO USUARIO LOGADO
                            $opts = array(
                                 'http' => array(
                                      'method'  => 'GET',
                                      'header'=> array("Content-Type: application/json",
                                            "Authorization: $authorization" ,
                                            "User: $user"),
                                      'content' => json_encode($parametros) . " \r\n"
                              ));

                            $context  = stream_context_create($opts);
                            $result = file_get_contents($rota, null, $context);
                            //print_r('$result');
                            print_r($result);
                            break;
                      default:
                            print_r("Tipo de consulta inexistente.");
                  } //fim switch
          }
  }else{
    print_r("Flag (".$flag.") ou rota (".$rota.") inexistente");
  }

?>
