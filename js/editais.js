require(["jquery-ui"], function (React) {

  $(document).tooltip({
    position: {
      my: "center bottom-20",
      at: "center top",
      using: function( position, feedback ) {
        $( this ).css( position );
        $( "<div>" )
          .addClass( "arrow" )
          .addClass( feedback.vertical )
          .addClass( feedback.horizontal )
          .appendTo( this );
      }
    }
  });
});
  require(['jquery','datatables-responsive'], function (React) {

  var isCacheEnabled = false;
  var tipoRequisicao;
  var parametros='';
  var newData;
  //var valoresURL = window.location.href.split('?')[1].split('=');
  //var tipoConsulta = valoresURL[0];
  //var stringBuscada = valoresURL[1];
  var urlRota = "http://mapaosc-desenv.ipea.gov.br:8383/api/edital";/* /

  if(tipoConsulta=="organizacao"){
    urlRota+="search/osc/"+stringBuscada;
  }
  else if(tipoConsulta=="municipio"){
    urlRota+="geo/osc/municipio/"+stringBuscada;
  }
  else if(tipoConsulta=="estado"){
    urlRota+="geo/osc/estado/"+stringBuscada;
  }
  else if(tipoConsulta=="regiao"){
    urlRota+="geo/osc/regiao/"+stringBuscada;
    console.log(urlRota);
  }
  else{
    console.log("ERRO!");
  }
*/
  function tabela (newData){
    $('#editais_formato_dados').DataTable({
      responsive: true,
       processing: true,
       data: newData,
       columns: [
               //{title: "", width: 100},
               {title: "Orgão", width: 100},
               {title: "Nome do Programa"},
               {title: "Area de Interesse"},
               {title: "Data de Vencimento"},
               {title: "Número da Chamada"},
               {title: "Edital"}
           ],
       order: [],
       aoColumnDefs: [
         {bSortable :false, aTargets: [0]},
         {bSortable :false, aTargets: [5]},
         {bSortable :false, aTargets: [4]}
       ],
       autoWidth: true
     });
   };
function tabela2 (newData2){
     $('#encerrados_formato_dados').DataTable({
       responsive: true,
        processing: true,
        data: newData2,
        columns: [
                //{title: "", width: 100},
                {title: "Orgão", width: 100},
                {title: "Nome do Programa"},
                {title: "Area de Interesse"},
                {title: "Data de Vencimento"},
                {title: "Número da Chamada"},
                {title: "Edital"}
            ],
        order: [],
        aoColumnDefs: [
          {bSortable :false, aTargets: [0]},
          {bSortable :false, aTargets: [5]},
          {bSortable :false, aTargets: [4]}
        ],
        autoWidth: true
      });
  }
/*
  function carregaOSC(id, leafletMarker){
    var rotas = new Rotas();
      $.ajax({
          url: rotas.OSCByID(id),
          type: "GET",
          dataType: "json",
          complete: function(data){
            //console.log(data);
            for(var i=0; i<data.length; i++){
              var response = data.responseJSON === undefined ? undefined : data.responseJSON.cabecalho;
              var idOSC = response === undefined ? "" : response.cd_identificador_osc;
              leafletMarker.bindPopup('Codigo identificador da OSC= '+idOSC).openPopup();
            }
          }
    });
  }

  function loadPoint(id, latFinal, lngFinal){
    if(latFinal !=="" || lngFinal !== ""){
      var marker = new PruneCluster.Marker(latFinal, lngFinal);
      marker.data.ID = id;

      leafletView.PrepareLeafletMarker = function(leafletMarker, data) {
          leafletMarker.on('click', function(){
            carregaOSC(data.ID, leafletMarker);
          });
      };

      leafletView.RegisterMarker(marker);
      return leafletView;
    }
  }

/*  function carregaMapa(dados){
    for(var i=0; i<dados.length; i++)
      map.addLayer(loadPoint(dados[i].id_osc, dados[i].geo_lat, dados[i].geo_lng));

    leafletView.ProcessView();
  }*/

  if(isCacheEnabled){
    tipoRequisicao = 'POST';
    //parametros={chave: urlRota, rota: urlRota};
    //urlRota = "js/cacheConsulta.php";//sobrescreve rota do ajax para chamar php responsável pelo cache
  }
  else{
    tipoRequisicao = 'GET';
  }
  console.log(tipoRequisicao);
  $.ajax({
    url: 'js/controller.php',
    type: 'GET',
    dataType: 'json',
    data: {flag: 'consulta', rota: urlRota},
    error: function(e){
        console.log("ERRO no AJAX :" + e);
    },
    success: function(data){
      if(data!==undefined){
        var sizeOfData = data.ativos.length;
        var sizeOfData2 = data.encerrados.length;
        var columns = 6;

        newData = new Array(sizeOfData);
        newData2 = new Array(sizeOfData2);

        for (var i=0; i < sizeOfData; i++){
          newData[i] = new Array(columns);
          //newData[i][0] = "<img class='img-circle media-object' src='img/camera.png' height='64' width='64'>";
          newData[i][0] = data.ativos[i].tx_orgao;
          newData[i][1] = data.ativos[i].tx_programa;
          newData[i][2] = data.ativos[i].tx_area_interesse_edital;
          newData[i][3] = data.ativos[i].dt_vencimento;
          newData[i][4] = data.ativos[i].tx_numero_chamada;
          newData[i][5] = "<a href="+data.ativos[i].tx_link_edital+" target=_blank>"+data.ativos[i].tx_link_edital+"<img src=img/site-ext.gif alt=\"Site Externo.\" title=\"Site Externo.\"></a>";

          //newData[i][9] = '<button type="button" onclick="location.href=\'visualizar-osc.html#'+data[i].id_osc+'\';" class="btn btn-info">Detalhar &nbsp;<span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>';
        }
        for (var i=0; i < sizeOfData2; i++){
          newData2[i] = new Array(columns);
          //newData[i][0] = "<img class='img-circle media-object' src='img/camera.png' height='64' width='64'>";
          newData2[i][0] = data.encerrados[i].tx_orgao;
          newData2[i][1] = data.encerrados[i].tx_programa;
          newData2[i][2] = data.encerrados[i].tx_area_interesse_edital;
          newData2[i][3] = data.encerrados[i].dt_vencimento;
          newData2[i][4] = data.encerrados[i].tx_numero_chamada;
          newData2[i][5] = "<a href="+data.encerrados[i].tx_link_edital+" target=_blank>"+data.encerrados[i].tx_link_edital+"<img src=img/site-ext.gif alt=\"Site Externo.\" title=\"Site Externo.\"></a>";

          //newData[i][9] = '<button type="button" onclick="location.href=\'visualizar-osc.html#'+data[i].id_osc+'\';" class="btn btn-info">Detalhar &nbsp;<span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>';
        }

        tabela(newData);
        tabela2(newData2);
        console.log(newData2);
        //carregaMapa(data);
        console.log("OK");
      }
    }

  });
});


/*
require(['jquery', 'rotas'], function(){
  //carrega pontos em pedaços
  (function addXhrProgressEvent($) {
      var originalXhr = $.ajaxSettings.xhr;
      $.ajaxSetup({
          progress: function() { //console.log("standard progress callback");
          },
          xhr: function() {
              var req = originalXhr(), that = this;
              if (req) {
                  if (typeof req.addEventListener == "function") {
                      req.addEventListener("progress", function(evt) {
                          that.progress(evt);
                      },false);
                  }
              }
              return req;
          }
      });
  })(jQuery);


    var last_response_len = false;
    var lat=-16.55555555; var lng= -60.55555555;
    var map = new L.Map('map', {center: new L.LatLng(lat, lng), zoom: 4});
    var leafletView = new PruneClusterForLeaflet();

    $.ajax({
        url: "js/cacheConsulta.php",//trocar pela rota correta
        data: { chave:'consultaTudo', rota: 'http://mapaosc-desenv:8383/api/geo/osc/regiao/1' },
        type: "POST",
        dataType: "json",
        beforeSend: function() {
          //var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
          //var ggl = new L.Google();
          var ggl2 = new L.Google('RODMAP');
          map.addLayer(ggl2);
          //map.addControl(new L.Control.Layers( {'OSM':osm, 'Google':ggl, 'Google Terrain':ggl2}, {}));
          map.addControl(new L.Control.Layers({'Google':ggl2}, {}));
        },
        complete: function(dados) {
          //var pontos = '[{"2":["-15.7783899","-47.9286308"],"3":["-15.7993202","-47.8981781"]},{"4":["-15.7958345","-47.8923149"],"5":["-15.8199205","-47.9239616"]},{"6":["-15.7980804","-47.8906555"],"7":["-15.7952542779082","-47.9394622544892"]},{"11":["-15.8751554","-47.9755211"],"15":["-15.8104582","-47.8541069"]},{"16":["-15.793664","-47.8509483"]}]';
          pontos = dados.responseJSON;
          //pontos = JSON.parse('[{"id_osc":22365,"lat":"-1.74820834599956","lng":"-47.0633436779996"},{"id_osc":22390,"lat":"-1.89886019799957","lng":"-49.3907389839996"},{"id_osc":22410,"lat":"-1.76024734199956","lng":"-55.8584121719996"},{"id_osc":22451,"lat":"-1.90143278399955","lng":"-55.5212850339996"},{"id_osc":22487,"lat":"-2.43663717199956","lng":"-54.7298703269996"},{"id_osc":22490,"lat":"-1.28689238999959","lng":"-47.9512049799996"},{"id_osc":22547,"lat":"-7.94180843999959","lng":"-55.1663152319996"},{"id_osc":22579,"lat":"-1.39623169999959","lng":"-48.8664998849996"},{"id_osc":22602,"lat":"-2.43885314899956","lng":"-54.7000788909996"}]');
          //console.log(pontos);
          //for(var k in pontos)
            //map.addLayer(loadPoint(k, pontos[k][0], pontos[k][1]));
          for(var i=0; i<pontos.length; i++)
            map.addLayer(loadPoint(pontos[i].id_osc, pontos[i].lat, pontos[i].lng));

          leafletView.ProcessView();
          //console.log(leafletView);
        },
        progress: function(dados) {
          var this_response, response = dados.currentTarget.response;
          if(last_response_len === false)
          {
              this_response = response;
              last_response_len = response.length;
          }
          else
          {
              this_response = response.substring(last_response_len);
              last_response_len = response.length;
          }

          console.log("Loading...");
        }
    });

    function loadPoint(id, latFinal, lngFinal){
      if(latFinal !="" || lngFinal != ""){
        var marker = new PruneCluster.Marker(latFinal, lngFinal);
        marker.data.ID = id;

        leafletView.PrepareLeafletMarker = function(leafletMarker, data) {
            leafletMarker.on('click', function(){
              carregaOSC(data.ID, leafletMarker);
            });
        };

        leafletView.RegisterMarker(marker);
        return leafletView;
      }
    }

  function carregaOSC(id, leafletMarker){
    var rotas = new Rotas();
      $.ajax({
          url: rotas.OSCByID(id),
          type: "GET",
          dataType: "json",
          complete: function(data){
            //console.log(data);
            for(var i=0; i<data.length; i++){
              var response = data.responseJSON === undefined ? undefined : data.responseJSON.cabecalho;
              var idOSC = response === undefined ? "" : response.cd_identificador_osc;
              leafletMarker.bindPopup('Codigo identificador da OSC= '+idOSC).openPopup();
            }
          }
    });
  }
});*/
