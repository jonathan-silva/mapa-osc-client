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
  $.ajax({
      url: "js/pegadadosTeste.php",
      data: { limite: '10' },
      type: "POST",
      dataType: "json",
      complete: function(dados) { //console.log(dados.responseText);
        console.log("FIM");
        var lat=-16.55555555; var lng= -60.55555555;
    var map = new L.Map('map', {center: new L.LatLng(lat, lng), zoom: 4});
    var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    var ggl = new L.Google();
    var ggl2 = new L.Google('RODMAP');
    map.addLayer(ggl2);
    var leafletView = new PruneClusterForLeaflet();
    var size = 1000000;
    var markers = [];
    for (var i = 0; i < size; ++i) {
    var latFinal = lat + (Math.random()- 0.0 ) * Math.random() * 0.00001 * size;
    var lngFinal = lng + (Math.random() - 0.0) * Math.random() * 0.00002 * size;
        var marker = new PruneCluster.Marker(latFinal, lngFinal);
    /*marker.on('mouseover', function(event){
    var marker = event.target;
              var position = marker.getLatLng();
    var panoramaOptions = {
          position: position,
          pov: {
              heading: 34,
              pitch: 10
          }
      };
      var panorama = new  google.maps.StreetViewPanorama(document.getElementById('pano'),panoramaOptions);
      map.setStreetView(panorama);
    });*/
    markers.push(marker);
        leafletView.RegisterMarker(marker);
    }
    window.setInterval(function () {
        for (i = 0; i < size / 2; ++i) {
            var coef = i < size / 8 ? 10 : 1;
            var ll = markers[i].position;
            ll.lat += (Math.random() - 0.5) * 0.00001 * coef;
            ll.lng += (Math.random() - 0.5) * 0.00002 * coef;
        }
        leafletView.ProcessView();
    }, 3000);

    map.addLayer(leafletView);
    map.addControl(new L.Control.Layers( {'OSM':osm, 'Google':ggl, 'Google Terrain':ggl2}, {}));
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
        console.log("-----------------------------------------------------------------------------");
        console.log(this_response);
      }

  });

});
