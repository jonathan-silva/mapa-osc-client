<?php
  error_reporting(E_ALL);//comentar esta linha e a linha de baixo quando for pra produção
  ini_set("display_errors", 1);

  class Cache{
    private $redis = new Redis();
    $redis->connect("localhost", 6379);

    public function setCoordenadas($hash, $arrayCoordenadas){
      $this->redis->set($hash, $arrayCoordenadas);
    }

    public function getCoordenadas($hash){
      return $this->redis->get($hash);
    }
  }
?>
