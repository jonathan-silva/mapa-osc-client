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
require(['rotas','jquery-ui','datatables-responsive', 'leafletCluster'], function (React) {
  var geojson;
  var mapState = {};
  var mapRegion = {};
  clustersLayer = L.layerGroup();
  var layerGroup = L.layerGroup();
  var isControlLoaded = false;//verifica se controle já foi adicionado a tela
  var isClusterVersion = true;
  var zoomMaximo = 18;
  var mapOptions = {
    center: new L.LatLng(-16.55555555, -60.55555555),
    zoom: 4,
    minZoom: 4 //18 niveis de zoom
  };
  map = new L.Map('map', mapOptions);

  var leafletView = new PruneClusterForLeaflet();//Prune Cluster library version
  //var leafletView = L.markerClusterGroup();//Marker Cluster library version

  //var ggl2 = new L.Google('ROADMAP');
  var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        maxZoom: zoomMaximo,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
    });
  //map.addLayer(ggl2);

  // Para mapa com contraste
  var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

	var tilesGrayscale = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr});

  map.addLayer(tilesGrayscale);
  map.addLayer(tiles);

  var parametros='';
  var newData, urlRotaMapa, urlRota;
  var rotas = new Rotas();
  var valoresURL = window.location.href.split('?')[1]!==undefined ? window.location.href.split('?')[1].split('=') : null;

  if(valoresURL!=null){
    //consulta baseado na escolha da tela anterior
    var tipoConsulta = valoresURL[0];
    var stringBuscada = valoresURL[1];
    stringBuscada = stringBuscada.replace(/\./g, "");

    if(tipoConsulta=="organizacao"){
      urlRota = rotas.OSCByName(stringBuscada);
      urlRotaMapa = rotas.OSCByNameInMap(stringBuscada);
      isClusterVersion=false;
    }
    else if(tipoConsulta=="municipio"){
      urlRota = rotas.OSCByCounty(stringBuscada);
      urlRotaMapa=rotas.OSCByCountyInMap(stringBuscada);
      isClusterVersion=false;
    }
    else if(tipoConsulta=="estado"){
      urlRota = rotas.OSCByState(stringBuscada);
      urlRotaMapa=rotas.ClusterEstadoPorRegiao(stringBuscada);//urlRotaMapa=rotas.OSCByStateInMap(stringBuscada);
    }
    else if(tipoConsulta=="regiao"){
      urlRota = rotas.OSCByRegion(stringBuscada);
      urlRotaMapa=rotas.ClusterRegiao(stringBuscada);//urlRotaMapa=rotas.OSCByRegionInMap(stringBuscada);
    }
    else{
      console.log("ERRO de URL!");
    }
  }
  else{
    //consulta tudo

    tipoConsulta="regiao";
    //console.log(tipoConsulta);
    urlRotaMapa = rotas.ClusterPais();
  }

  //*** Methods
  function tabela (){
    $.ajax({
      url: "js/controller.php",
      type: 'GET',
      dataType: 'json',
      data:{flag: "consulta", rota: urlRota},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        var columns = 6;
        var sizeOfData = data.length;
        newData = new Array(sizeOfData);
        var i = 0;
        var txtVazioNulo = 'Dado não informado.';

        for (var j in data){
          if(j=="0") continue;
          else{
            newData[i] = new Array(columns);
            newData[i][0] = "<img class='img-circle media-object' src='img/camera.jpg' height='64' width='64'>";
            newData[i][1] = data[j][0] !== null ? data[j][0] : txtVazioNulo;//tx_nome_osc;
            newData[i][2] = data[j][1] !== null ? data[j][1] : txtVazioNulo;//cd_identificador_osc;
            newData[i][3] = data[j][2] !== null ? data[j][2] : txtVazioNulo;//tx_natureza_juridica_osc;
            newData[i][4] = data[j][3] !== null ? data[j][3] : txtVazioNulo;//tx_endereco_osc;
            newData[i][5] = '<button type="button" onclick="location.href=\'visualizar-osc.html#'+j+'\';" class="btn btn-info">Detalhar &nbsp;<span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>';
            i++;
          }
        }

        $('#resultadoconsulta_formato_dados').DataTable({
          responsive: true,
          processing: true,
          deferLoading: 1000,
          deferRender: true,
          searching: false,
          data: newData,
          dom: 'Bfrtip',
          "bSort": true,
          "aaSorting": [[ 1, 'asc' ]],
           columns: [
                   {title: "", width: 50},
                   {title: "Nome da OSC", width: 200},
                   {title: "CNPJ"},
                   {title: "Natureza Jurídica"},
                   {title: "Endereço"},
                   {title: "Detalhar"}
               ],
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

    $('#resultadoconsulta_formato_dados').on( 'draw.dt', function () {
      verificarContraste();
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
          var endereco = data.tx_endereco != null ? data.tx_endereco : '';
          var bairro = data.tx_bairro != null? data.tx_bairro : '';
          var enderecoCompleto = endereco+' - '+bairro;
          var txtVazioNulo = 'Dado não informado.';
          var div = '<div class="mapa_organizacao clearfix">' +
                    '<span id="spantitle" class="magneticTooltip">'+
                    '<button id="title" class="btn-link" title="Clique para Detalhar" onclick=location.href="visualizar-osc.html#'+ id +'">'+
                    '<h4>'+ (data.tx_nome_osc != null ? data.tx_nome_osc : txtVazioNulo)+'</h4></button></span>'+
                    '<div class="coluna1"><strong></strong><strong>Endereço: </strong>'+ enderecoCompleto +'<br>'+
                    '<strong>Atividade Econômica: </strong>'+(data.tx_nome_atividade_economica != null ? data.tx_nome_atividade_economica : txtVazioNulo)+'<br>'+
                    '<strong>Natureza Jurídica: </strong>'+(data.tx_nome_natureza_juridica != null ? data.tx_nome_natureza_juridica : txtVazioNulo)+'<br><br>'+
                    '<div align="center"><button type = button class="btn btn-info" title="Clique para Detalhar" onclick=location.href="visualizar-osc.html#'+ id +'">Detalhes</button>'+
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

  function loadPointCluster(icone, id, latFinal, lngFinal, tipoCluster){
    if((latFinal !=="")&&(latFinal !==null) || (lngFinal!==null)&&(lngFinal !== "")){
      var marker;

      if(tipoCluster=="regiao"){
        marker = L.marker([latFinal, lngFinal], {icon: icone}).on('click', clickClusterRegiao);
      }
      else if(tipoCluster=="estado"){
        marker = L.marker([latFinal, lngFinal], {icon: icone}).on('click', clickClusterEstado);
      }
      //marker.addTo(map);
      return marker;
    }
  }

  function carregaMapa(dados){
    for(var k in dados){
      var point = loadPoint(k, dados[k][0], dados[k][1]);
      if(point!==null){
        map.addLayer(point);
      }
    }

    $("#loadingMapModal").hide();
    leafletView.ProcessView();
  }

  function heatMap(arrayPDF, arrayID){
      $.each(statesData.features , function(i){
          nomeEstado = statesData.features[i].properties.Name;
          statesData.features[i].properties.density = arrayPDF[nomeEstado];
          statesData.features[i].properties.id = arrayID[nomeEstado];
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
              //click: zoomm //zoomToFeature //metodo que carrega pontos ao clicar no estado
              click: zoomToFeature
          });
          layerGroup.addLayer(layer);
          map.addLayer(layerGroup);
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
        var layer = e.target;
          map.fitBounds(layer.getBounds());
          loadChunkData(layer.feature.properties.id);
          layer.off();
          layer.on({
              mouseover: highlightFeature,
              mouseout: resetHighlight,
              click: zoomm
          });
          //console.log(e.target.feature.properties.id);
      }

      function zoomm(e){
        var layer = e.target;
          map.fitBounds(layer.getBounds());
      }

      var legend = L.control({position: 'bottomright'});

      legend.onAdd = function (map) {

          var div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 1000, 15000, 30000, 45000, 60000],
              labels = [];

          div.innerHTML += '<h5>Escala de OSCs por estado</h5>';
          // loop through our density intervals and generate a label with a colored square for each interval
          for (var i = 0; i < grades.length; i++) {
              div.innerHTML +=
                  '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                  parseInt(grades[i] + 1) + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
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
             d > 45000  ? '#E31A1C' :
             d > 30000  ? '#FC4E2A' :
             d > 15000   ? '#FEB24C' :
             d > 1000  ? '#FED976' :
                        '#FFEDA0';
  }

  function carregaMapaCluster(dados, level){
    var classNameLevel;
    if(level=="regiao") classNameLevel = "labelClassRegiao";
    else if(level=="estado") classNameLevel = "labelClassEstado";
    for(var k in dados){
      var markerGroup = []
      var icone =  L.divIcon({
                    id: dados[k].id_regiao,
                    className: classNameLevel,
                    html: "<p>"+dados[k].nr_quantidade_osc_regiao+"</p>"
                  });
      mapRegion[dados[k].id_regiao] = dados[k].nr_quantidade_osc_regiao;
      clustersLayer.addLayer(loadPointCluster(icone, dados[k].id_regiao, dados[k].geo_lat_centroid_regiao, dados[k].geo_lng_centroid_regiao, level));
    }

    if(!isControlLoaded){//Evitar adicionar controles repetidamente na tela
        clustersLayer.addTo(map);
        isControlLoaded=true;
    }
    $("#loadingMapModal").hide();
    //leafletView.ProcessView();
  }

  function loadChunkData(idEstado){
    $("#loadingMapModal").show();
    $.ajax({
      url: 'js/controller.php',
      type: 'GET',
      dataType: 'json',
      data: {flag: 'consulta', rota: rotas.OSCByStateInMap(idEstado)},
      error: function(e){
          console.log("ERRO no AJAX :" + e);
      },
      success: function(data){
        //tabela ();
        if(data!==undefined){
          carregaMapa(data);
        }
      },
      error: function (e) {
        console.log(e);
      }
    });
  }

  function clickClusterRegiao(e){
    //console.log(e.target);
    var idRegiao = e.target.options.icon.options.id;
    $("#loadingMapModal").show();
    $.ajax({
      url: 'js/controller.php',
      type: 'GET',
      dataType: 'json',
      data: {flag: 'consulta', rota: rotas.ClusterEstadoPorRegiao(idRegiao)},//rotas.OSCByRegionInMap(idRegiao)},
      error: function(e){
          console.log("ERRO no AJAX :" + e);
      },
      success: function(data){
        //tabela ();
        if(data!==undefined){

          map.setView([e.target._latlng.lat, e.target._latlng.lng], 5);
          map.removeLayer(e.target);
          carregaMapaCluster(data, "estado");
        }
      },
      error: function (e) {
        console.log(e);
      }
    });
  }

  function clickClusterEstado(e){
    //console.log(e);
    var idEstado = e.target.options.icon.options.id;
    $("#loadingMapModal").show();
    $.ajax({
      url: 'js/controller.php',
      type: 'GET',
      dataType: 'json',
      data: {flag: 'consulta', rota: rotas.OSCByStateInMap(idEstado)},
      error: function(e){
          console.log("ERRO no AJAX :" + e);
      },
      success: function(data){
        //tabela ();
        if(data!==undefined){
          map.setView([e.target._latlng.lat, e.target._latlng.lng], 6);
          map.removeLayer(e.target);
          carregaMapa(data);
        }
      },
      error: function (e) {
        console.log(e);
      }
    });
  }



  //*** main
  $("#loadingMapModal").show();

  $.ajax({
    url: 'js/controller.php',
    type: 'GET',
    dataType: 'json',
    data: {flag: 'consulta', rota: urlRotaMapa},
    error: function(e){
        console.log("ERRO no AJAX :" + e);
    },
    success: function(data){
      //tabela ();
      if(data!==undefined){
        if(isClusterVersion){
          carregaMapaCluster(data, tipoConsulta);
        }
        else{
          carregaMapa(data);
        }
      }
    },
    error: function (e) {
      console.log(e);
    }
  });

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
        var ids={};
        for(k in data){
          pdfs[data[k].tx_sigla_regiao]=data[k].nr_quantidade_osc_regiao;
          ids[data[k].tx_sigla_regiao]=data[k].id_regiao;
        }
        map.addControl(new L.Control.Layers({ "Contraste": tilesGrayscale, 'Mapa': tiles }, { 'Mapa de calor':layerGroup },{collapsed:false}));//, "Clusters": clustersLayer
        heatMap(pdfs, ids);
      }
    }
  });


  map.on('zoomend', apagaMapaDeCalor);
  function apagaMapaDeCalor(e){
    var zoomMap = map.getZoom();
    if(zoomMap==zoomMaximo){
      map.removeLayer(layerGroup);
    }
  }

});
