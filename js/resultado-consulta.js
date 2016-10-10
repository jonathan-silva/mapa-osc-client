require(['datatable'], function (React) {
  function tabela (newData){
    $('#resultadoconsulta_formato_dados').DataTable({
      responsive: true,
       processing: true,
       data: newData,
       columns: [
               {title: ""},
               {title: "Nome da OSC" },
               {title: "CNPJ" },
               {title: "Natureza Jurídica" },
               {title: "Endereço" },
               {title: "Detalhar" }
           ],
       order: [],
       aoColumnDefs: [
         {bSortable :false, aTargets: [0]},
         {bSortable :false, aTargets: [5]},
         {bSortable :false, aTargets: [4]}
       ]
     });
  }

  var dado = 'Terra';
  var newData;
  $.ajax({
    url: 'http://mapaosc-desenv.ipea.gov.br:8383/api/search/osc/'+dado,
    type: 'GET',
    dataType: 'json',
    error: function(){
      console.log("Error");
    },
    success: function(data){
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
        newData[i][5] = "<button type='button' class='btn btn-info' href='#'>Detalhar<span class='glyphicon glyphicon-search' aria-hidden='true'></span></button>";
        /*("<img class='img-circle media-object' src='img/camera.png' height='64' width='64'>",
      data[i].cd_identificador_osc, data[i].tx_nome_osc, data[i].tx_natureza_juridica_osc, data[i].tx_endereco_osc,
      "<button type='button' class='btn btn-info' href='#'>Detalhar<span class='glyphicon glyphicon-search' aria-hidden='true'></span></button>");*/
      }
      tabela(newData);
    }
  });
});



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
        data: { chave:'consultaTudo' },
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
          //console.log(pontos);
          for(var k in pontos)
            map.addLayer(loadPoint(k, pontos[k][0], pontos[k][1]));

          leafletView.ProcessView();
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
            var cabecalho = data.responseJSON === undefined ? undefined : data.responseJSON.cabecalho;
            var idOSC = cabecalho === undefined ? "OSC ainda não registrada no banco" : cabecalho.cd_identificador_osc;
            leafletMarker.bindPopup('Codigo identificador da OSC= '+idOSC).openPopup();
          }
    });
  }
});
