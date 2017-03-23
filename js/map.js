require(['jquery','datatable', 'google', 'rotas', 'leaflet', 'leafletCluster'], function (React) {
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

  }
  else if(tipoConsulta=="estado"){

  }
  else if(tipoConsulta=="regiao"){

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

  function carregaOSC(id, leafletMarker){
    var rotas = new Rotas();
      $.ajax({
          url: 'js/controller.php',
          type: "GET",
          dataType: "json",
          data: {flag: 'consulta', rota: rotas.OSCByID(id)}
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

  function carregaMapa(dados){
    for(var i=0; i<dados.length; i++)
      map.addLayer(loadPoint(dados[i].id_osc, dados[i].geo_lat, dados[i].geo_lng));

    leafletView.ProcessView();
  }

  $.ajax({
    url: 'js/controller.php',//urlRota,
    type: 'GET',
    dataType: 'json',
    data: {flag: 'consulta', rota: urlRota}
    error: function(){
      console.log("Error");
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
          newData[i][5] = '<button type="button" onclick="location.href=\'visualizar-osc.html#'+data[i].id_osc+'\';" class="btn btn-info">Detalhar<span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>';
        }
        tabela(newData);
        //console.log(data);
        carregaMapa(data);
        console.log("OK");
      }
    }
  });
});
