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
  var pdfs = {"AC" : "1", "AM" : "2", "RR" : "3","RO" : "4","AP" : "5","PA" : "6","MT" : "7","MS" : "8","MA" : "9","TO" : "1","GO" : "2","DF" : "3","PI" : "4","CE" : "5","RN" : "6","PB" : "7","PE" : "8","AL" : "9","SE" : "1","BA" : "2","MG" : "3","ES" : "4","RJ" : "5","SP" : "6","PR" : "7","SC" : "8", "RS" : "9"};

  var parametros='';
  var newData;
  var rotas = new Rotas();
  var valoresURL = window.location.href.split('?')[1].split('=');
  var tipoConsulta = valoresURL[0];
  var stringBuscada = valoresURL[1];

  var lat=-16.55555555; var lng= -60.55555555;
  var map = new L.Map('map', {center: new L.LatLng(lat, lng), zoom: 4});
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
    //urlRota+="search/osc/"+stringBuscada;
    urlRota = rotas.OSCByName(stringBuscada);
  }
  else if(tipoConsulta=="municipio"){
    //urlRota+="search/municipio/"+stringBuscada;
    urlRota=rotas.OSCByCounty(stringBuscada);
  }
  else if(tipoConsulta=="estado"){
    //urlRota+="search/estado/"+stringBuscada;
    urlRota=rotas.OSCByState(stringBuscada);
  }
  else if(tipoConsulta=="regiao"){
    //urlRota+="search/regiao/"+stringBuscada;
    urlRota=rotas.OSCByRegion(stringBuscada);
  }
  else{
    console.log("ERRO de URL!");
  }

  function tabela (newData){
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

  /*function carregaOSC(id, leafletMarker){
      $.ajax({
          url: rotas.OSCByID(id),
          type: "GET",
          dataType: "json",
          success: function(data){
            //console.log(data);
            for(var i=0; i<data.length; i++){
              //var response = data.responseJSON === undefined ? undefined : data.responseJSON.cabecalho;
              //var idOSC = response === undefined ? "" : response.cd_identificador_osc;
              var idOSC = data[i].id_osc === undefined ? "" : data[i].id_osc;
              //console.log(idOSC);
              //leafletMarker.bindPopup('Codigo identificador da OSC= '+idOSC).openPopup();
            }
          },
          error: function (e) {
            console.log(e);

          }
    });
  }*/

  function loadPoint(id, latFinal, lngFinal, nome, endereco, natureza, atividade){
    if((latFinal !=="")&&(latFinal !==null) || (lngFinal!==null)&&(lngFinal !== "")){
      //console.log(lngFinal);
      var marker = new PruneCluster.Marker(latFinal, lngFinal);//Prune Cluster library version
      marker.data.ID = id;//Prune Cluster library version
      marker.data.nome_osc = nome;
      marker.data.endereco_osc = endereco;
      marker.data.area_atuacao_osc = atividade;
      marker.data.natureza_juridica_osc = natureza;
      //leafletMarker = L.marker(new L.LatLng(latFinal, lngFinal), { id: id });//Marker Cluster library version

      leafletView.PrepareLeafletMarker = function(leafletMarker, data) {
          leafletMarker.on('click', function(){
          //  carregaOSC(data.ID, leafletMarker);//Prune Cluster library version
            var button ;
            var div = '<div class="mapa_organizacao clearfix">' +
                      '<span id="spantitle" class="magneticTooltip">'+
                      '<a id="title" title="">'+
                      '<h2>'+ data.nome_osc+'</h2></a><h3> </h3></span>'+
                      '<div class="coluna1"><strong></strong><strong>Endereço: </strong>'+ data.endereco_osc +'<br>'+
                      '<strong>Área de Atuação: </strong>'+data.area_atuacao_osc+'<br>'+
                      '<strong>Natureza Jurídica: </strong>'+data.natureza_juridica_osc+'<br>'+
                      '<div align="left"><button type = button class=btn btn-info onclick=location.href="visualizar-osc.html#'+data.ID +'">Detalhes</button>'+
                      '</div></div></div>';
            leafletMarker.bindPopup(div).openPopup();
          });
      };

      leafletView.RegisterMarker(marker);//Prune Cluster library version
      return leafletView;//Prune Cluster library version
      //return leafletMarker;//Marker Cluster library version
    }
    return null;
  }
  var offset = 1000;
  function carregaMapa(dados){
    var cont=0;
    for(var i=0; i<dados.length; i++){
      //elapsedTime = new Date().getMilliseconds() - elapsedTime;
      var point = loadPoint(dados[i].id_osc, dados[i].geo_lat, dados[i].geo_lng,
        dados[i].tx_nome_osc, dados[i].tx_endereco_osc, dados[i].tx_natureza_juridica_osc,
        dados[i].tx_nome_atividade_economica);
      if(point!==null){
        map.addLayer(point);//Prune Cluster library version
        //leafletView.addLayer(point);//Marker Cluster library version

      }
    }

    leafletView.ProcessView();//Prune Cluster library version
    //map.addLayer(leafletView);//Marker Cluster library version
  }
  var offset = 1000;
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
        var sizeOfData = data.length;
        //console.log("Size: "+sizeOfData);
        var columns = 6;
        var temparray, j;
        var chunk = 10000;
        //if(sizeOfData>20000) chunk = sizeOfData/10;
        //else if(sizeOfData>100000) chunk = sizeOfData/20;
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

        for (var i=0,j=sizeOfData; i<j; i+=chunk) {
            temparray = data.slice(i,i+chunk);
            //console.log(i);
            carregaMapa(temparray);
        }
        //carregaMapa(data);
        tabela(newData);
      }
    },
    error: function (e) {
      console.log(e);
    }
  });



  function heatMap(pdfs){
    var arrayPDF = pdfs;

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
              grades = [0, 2, 3, 4, 5, 6, 7, 8],
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
      return d > 8 ? '#800026' :
             d > 7  ? '#BD0026' :
             d > 6  ? '#E31A1C' :
             d > 5  ? '#FC4E2A' :
             d > 4   ? '#FD8D3C' :
             d > 3   ? '#FEB24C' :
             d > 2   ? '#FED976' :
                        '#FFEDA0';
  }

  //Coloração do mapa
  heatMap(pdfs);
});
