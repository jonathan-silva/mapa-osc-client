require(['jquery'], function(){
  //carrega pontos em pedaços
  (function addXhrProgressEvent($) {
      var originalXhr = $.ajaxSettings.xhr;
      $.ajaxSetup({
          progress: function() { console.log("standard progress callback"); },
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
      url: "js/pegadadosTeste.php",
      data: { limite: '100000' },
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
        pontos = pontos.replace(',]', ']');
        ponto = JSON.parse(pontos);

        for (i=0; i<ponto.length; i++)
          for(var k in ponto[i])
            map.addLayer(loadPoint(k, ponto[i][k][0], ponto[i][k][1]));
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
    leafletView.RegisterMarker(marker);

    return leafletView;
  }

});
