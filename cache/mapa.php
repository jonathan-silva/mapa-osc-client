<?php
  error_reporting(E_ALL);
  ini_set("display_errors", 1);

  class Cache{
    public $redis;
    function __construct(){
      $this->redis  = new Redis();
      $this->redis->connect("localhost", 6379);
    }
    public function setCoordenadas($hash, $arrayCoordenadas){
      $this->redis->set($hash, $arrayCoordenadas);
    }

    public function getCoordenadas($hash){
      return ($this->redis->get($hash));
    }
  }
?>
