require(['jquery','datatables-responsive', 'google'], function (React) {
  var isCacheEnabled = true;
  var tipoRequisicao;
  var parametros='';
  var newData;
  var valoresURL = window.location.href.split('?')[1].split('=');
  var tipoConsulta = valoresURL[0];
  var stringBuscada = valoresURL[1];
  var urlRota = "http://mapaosc-desenv.ipea.gov.br:8383/api/";//pra teste apenas a busca por organização está habilitada no momento

  var last_response_len = false;
  var lat=-16.55555555; var lng= -60.55555555;
  var map = new L.Map('map', {center: new L.LatLng(lat, lng), zoom: 4});
  var leafletView = new PruneClusterForLeaflet();
  var ggl2 = new L.Google('RODMAP');
  map.addLayer(ggl2);
  map.addControl(new L.Control.Layers({'Google':ggl2}, {}));

  if(tipoConsulta=="organizacao"){
    urlRota+="search/osc/"+stringBuscada;
  }
  else if(tipoConsulta=="municipio"){
    urlRota+="search/municipio/"+stringBuscada;
  }
  else if(tipoConsulta=="estado"){
    urlRota+="search/estado/"+stringBuscada;
  }
  else if(tipoConsulta=="regiao"){
    urlRota+="search/regiao/"+stringBuscada;
  }
  else{
    console.log("ERRO!");
  }

  function tabela (newData){
    $('#resultadoconsulta_formato_dados').DataTable({
      responsive: true,
       processing: true,
       data: newData,
       columns: [
               {title: "", width: 50},
               {title: "Nome da OSC"},
               {title: "CNPJ"},
               {title: "Natureza Jurídica"},
               {title: "Endereço"},
               {title: "Detalhar"}
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

  function carregaMapa(dados){
    for(var i=0; i<dados.length; i++)
      map.addLayer(loadPoint(dados[i].id_osc, dados[i].geo_lat, dados[i].geo_lng));

    leafletView.ProcessView();
  }

  if(isCacheEnabled){
    parametros={chave: urlRota, rota: urlRota};
    urlRota = "js/cacheConsulta.php";//sobrescreve rota do ajax para chamar php responsável pelo cache
  }
  $.ajax({
    url: urlRota,
    type: 'GET',
    dataType: 'json',
    data: parametros,
    error: function(e){
        console.log("ERRO no AJAX :" + e);
    },
    success: function(data){
      if(data!==undefined){
        var sizeOfData = data.length;
        var columns = 6;

        newData = new Array(sizeOfData);

        for (var i=0; i < sizeOfData; i++){
          newData[i] = new Array(columns);
          newData[i][0] = "<img class='img-circle media-object' src='img/camera.png' height='64' width='64'>";
          newData[i][1] = data[i].tx_nome_osc;
          newData[i][2] = data[i].cd_identificador_osc;
          newData[i][3] = data[i].tx_natureza_juridica_osc;
          newData[i][4] = data[i].tx_endereco_osc;
          newData[i][5] = '<button type="button" onclick="location.href=\'visualizar-osc.html#'+data[i].id_osc+'\';" class="btn btn-info">Detalhar &nbsp;<span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>';
        }
        tabela(newData);
        //console.log(data);
        carregaMapa(data);
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
});
*/
