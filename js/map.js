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
        url: "js/pegadadosTeste.php",//trocar pela rota correta
        data: { limite: '4' },
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
          var this_response = dados.responseText;
          var pontos = '['+this_response+']';
          //var pontos = '[{"2":["-15.7783899","-47.9286308"],"3":["-15.7993202","-47.8981781"]},{"4":["-15.7958345","-47.8923149"],"5":["-15.8199205","-47.9239616"]},{"6":["-15.7980804","-47.8906555"],"7":["-15.7952542779082","-47.9394622544892"]},{"11":["-15.8751554","-47.9755211"],"15":["-15.8104582","-47.8541069"]},{"16":["-15.793664","-47.8509483"]}]';
          pontos = pontos.replace(',]', ']');
          pontos = JSON.parse(pontos);

          for (i=0; i<pontos.length; i++)
            for(var k in pontos[i])
              map.addLayer(loadPoint(k, pontos[i][k][0], pontos[i][k][1]));

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
      var marker = new PruneCluster.Marker(latFinal, lngFinal);
      marker.data.ID = id;

      leafletView.PrepareLeafletMarker = function(leafletMarker, data) {
          var result='';
          leafletMarker.on('click', function(){
            carregaOSC(data.ID, leafletMarker);
          });

      };

      leafletView.RegisterMarker(marker);

      return leafletView;
    }

  function carregaOSC(id, leafletMarker){
    var rotas = new Rotas();
      $.ajax({
          url: rotas.OSCByID(id),
          type: "GET",
          dataType: "json",
          complete: function(data){
            var cabecalho = data.responseJSON.cabecalho;
            var idOSC = cabecalho.cd_identificador_osc;
            leafletMarker.bindPopup('Codigo identificador da OSC= '+idOSC).openPopup();
          }
    });
  }
});
