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

//require(['jquery','datatables-responsive', 'google'], function (React) {
require(['rotas','jquery','datatables-responsive', 'leafletCluster'], function (React) {
  var geojson;
  //dummy data para a quantidade de OSCs

  var parametros='';
  var newData, urlRotaMapa, urlRota;
  var rotas = new Rotas();
  var valoresURL = window.location.href.split('?')[1].split('=');
  var tipoConsulta = valoresURL[0];
  var stringBuscada = valoresURL[1];
  stringBuscada = stringBuscada.replace(/\./g, "");

  var mapOptions = {
    center: new L.LatLng(-16.55555555, -60.55555555),
    zoom: 4,
    minZoom: 4 //18 niveis de zoom
  };
  var map = new L.Map('map', mapOptions);

  var leafletView = new PruneClusterForLeaflet();//Prune Cluster library version
  //var leafletView = L.markerClusterGroup();//Marker Cluster library version

  //var ggl2 = new L.Google('ROADMAP');
  var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
    });
  //map.addLayer(ggl2);
  map.addLayer(tiles);
  map.addControl(new L.Control.Layers({/*'Google':ggl2*/}, {'OpenStreetMap': tiles}));

  if(tipoConsulta=="organizacao"){
    urlRota = rotas.OSCByName(stringBuscada);
    urlRotaMapa = rotas.OSCByNameInMap(stringBuscada);
  }
  else if(tipoConsulta=="municipio"){
    urlRota = rotas.OSCByCounty(stringBuscada);
    urlRotaMapa=rotas.OSCByCountyInMap(stringBuscada);
  }
  else if(tipoConsulta=="estado"){
    urlRota = rotas.OSCByState(stringBuscada);
    urlRotaMapa=rotas.OSCByStateInMap(stringBuscada);
  }
  else if(tipoConsulta=="regiao"){
    urlRota = rotas.OSCByRegion(stringBuscada);
    urlRotaMapa=rotas.OSCByRegionInMap(stringBuscada);
  }
  else{
    console.log("ERRO de URL!");
  }

  function tabela (){
    $.ajax({
      url: urlRota,
      type: 'GET',
      dataType: 'json',
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        var columns = 6;
        var sizeOfData = data.length;
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
        $('#resultadoconsulta_formato_dados').DataTable({
          responsive: true,
          deferLoading: 1000,
          deferRender: true,
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
         $('#loading').addClass('hide');
       }
     });
  }

  function loadPopUp(id, leafletMarker){
    var loading = '<img id="loading" src="img/loading.gif" style="padding-top: 10px; padding-left: 10px;"/>';
    leafletMarker.bindPopup(loading).openPopup();
    $.ajax({
      url: 'js/controller.php',
      type: 'GET',
      dataType: 'json',
      data: {flag: 'consulta', rota: rotas.OSCPopUpByID(id)},
      error: function(e){
          console.log("ERRO no AJAX :" + e);
      },
      success: function(data){
        if(data!==undefined){
          //console.log(data);
          var endereco = data.tx_endereco!=null ? data.tx_endereco : '';
          var bairro = data.tx_bairro!=null? data.tx_bairro : '';
          var enderecoCompleto = endereco+' - '+bairro;
          var div = '<div class="mapa_organizacao clearfix">' +
                    '<span id="spantitle" class="magneticTooltip">'+
                    '<a id="title" title="">'+
                    '<h2>'+ (data.tx_nome_osc!=null ? data.tx_nome_osc : '')+'</h2></a><h3> </h3></span>'+
                    '<div class="coluna1"><strong></strong><strong>Endereço: </strong>'+ enderecoCompleto +'<br>'+
                    '<strong>Atividade Econômica: </strong>'+(data.tx_nome_atividade_economica!=null ? data.tx_nome_atividade_economica : '')+'<br>'+
                    '<strong>Natureza Jurídica: </strong>'+(data.tx_natureza_juridica_osc!=null ? data.tx_natureza_juridica_osc : '')+'<br>'+
                    '<div align="left"><button type = button class=btn btn-info onclick=location.href="visualizar-osc.html#'+ id +'">Detalhes</button>'+
                    '</div></div></div>';
          leafletMarker.bindPopup(div).openPopup();
        }
      }
    });
  }

  function loadPoint(id, latFinal, lngFinal){
    if((latFinal !=="")&&(latFinal !==null) || (lngFinal!==null)&&(lngFinal !== "")){
      var marker = new PruneCluster.Marker(latFinal, lngFinal);
      marker.data.ID = id;

      leafletView.PrepareLeafletMarker = function(leafletMarker, data) {
          leafletMarker.on('click', function(){
            loadPopUp(data.ID, leafletMarker);
          });
      };

      leafletView.RegisterMarker(marker);
      return leafletView;
    }
    return null;
  }

  function carregaMapa(dados){
    for(k in dados){
      var point = loadPoint(k, dados[k][0], dados[k][1]);
      if(point!==null){
        map.addLayer(point);
      }
    }

    leafletView.ProcessView();
  }

  $.ajax({
    url: 'js/controller.php',
    type: 'GET',
    dataType: 'json',
    data: {flag: 'consulta', rota: urlRotaMapa},
    error: function(e){
        console.log("ERRO no AJAX :" + e);
    },
    success: function(data){
      tabela ();
      if(data!==undefined){
        carregaMapa(data);
        /*
        var temparray, j;
        var chunk = 10000;
        //if(sizeOfData>20000) chunk = sizeOfData/10;
        //else if(sizeOfData>100000) chunk = sizeOfData/20;
        for (var i=0,j=data.length; i<j; i+=chunk) {
            temparray = data.slice(i,i+chunk);
            carregaMapa(temparray);
        }
        */
      }

    },
    error: function (e) {
      console.log(e);
    }
  });



  function heatMap(arrayPDF){

      $.each(statesData.features , function(i){
          nomeEstado = statesData.features[i].properties.Name;
          statesData.features[i].properties.density = arrayPDF[nomeEstado];
          //console.log(statesData.features[i].properties.density);
      });

      function style(feature) {
          return {
              fillColor: getColor(feature.properties.density),
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.6
          };
      }

      function onEachFeature(feature, layer) {
          layer.on({
              mouseover: highlightFeature,
              mouseout: resetHighlight,
              click: zoomToFeature
          });
      }

      var info = L.control();

      info.onAdd = function (map) {
          this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
          this.update();
          return this._div;
      };

      // method that we will use to update the control based on feature properties passed
      info.update = function (props) {
          this._div.innerHTML = '<h4>OSCs por Estado</h4>' +  (props ?
              '<b>' + props.Name + '</b><br />' + props.density + ' OSCs.'
              : 'Passe o mouse sobre um estado');
      };

      info.addTo(map);

      function highlightFeature(e) {
          var layer = e.target;

          layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
              fillOpacity: 0.7
          });

          if (!L.Browser.ie && !L.Browser.opera) {
              layer.bringToFront();
          }
          info.update(layer.feature.properties);
      }

      function resetHighlight(e) {
          geojson.resetStyle(e.target);
          info.update();
      }

      function zoomToFeature(e) {
          map.fitBounds(e.target.getBounds());
      }

      var legend = L.control({position: 'bottomright'});

      legend.onAdd = function (map) {

          var div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 1000, 10000, 20000, 30000, 40000, 50000, 60000],
              labels = [];

          div.innerHTML += '<h5>Escala de OSCs por estado</h5>';
          // loop through our density intervals and generate a label with a colored square for each interval
          for (var i = 0; i < grades.length; i++) {
              div.innerHTML +=
                  '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                  grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
          }

          return div;
      };

      legend.addTo(map);

      geojson = L.geoJson(statesData, {
          style: function (statesData) {
                return {
                    fillColor: getColor(statesData.properties.density),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.6
                };
            },
          onEachFeature: onEachFeature
      }).addTo(map);
  }

  function getColor(d) {
    //o menor valor de OScs em um estado é de ~537 e o maior ~91665, a escala abaixo está em 8 níveis,
    //logo o cálculo de degradê abaixo está considerando estes 3 fatores mais um arredondamento
      return d > 60000 ? '#800026' :
             d > 50000  ? '#BD0026' :
             d > 40000  ? '#E31A1C' :
             d > 30000  ? '#FC4E2A' :
             d > 20000   ? '#FD8D3C' :
             d > 10000   ? '#FEB24C' :
             d > 1000  ? '#FED976' :
                        '#FFEDA0';
  }

  //Coloração do mapa
  $.ajax({
    url: 'js/controller.php',
    type: 'GET',
    dataType: 'json',
    data: {flag: 'consulta', rota: rotas.ClusterEstado()},
    error: function(e){
        console.log("ERRO no AJAX :" + e);
    },
    success: function(data){
      if(data!==undefined){
        var pdfs={};
        for(k in data){
          pdfs[data[k].tx_sigla_estado]=data[k].nr_quantidade_osc;
        }
        heatMap(pdfs);
      }
    }
  });

});
