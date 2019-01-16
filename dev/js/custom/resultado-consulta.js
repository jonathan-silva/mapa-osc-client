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

function getParameter( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

var urlRota;
var type_http;
//require(['jquery','datatables-responsive', 'google'], function (React) {
require(['rotas','jquery-ui','datatables-responsive', 'leafletCluster', 'simplePagination', 'util'], function (React) {
  var geojson;
  var link;
  var util = new Util();
  var composto = [];
  var mapState = {};
  var mapRegion = {};
  var llayersIDH = {}; //layers do mapa de calor IDHM
  var llayers = {}; //layers do mapa de calor
  var clayers = {}; //layers dos estados
  var rlayers = {}; //layers das regiões
  var clustersLayer = L.layerGroup();
  var layerGroup = L.layerGroup();
  var layerGroupIDH = L.layerGroup();
  var isControlLoaded = false;//verifica se controle já foi adicionado a tela
  var isClusterVersion = true;
  var consulta_avancada = false;
  var analisePerfil = false;
  var txtFederacao="";
  var txtLocalidade="";
  var idPerfil;
  var params = {};
  var limiteAutocomplete = 10;
  var limiteAutocompleteCidade = 25;
  var flagMultiplo = true;
  var textoBusca = '';
  var zoomMaximo = 18;
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
        maxZoom: zoomMaximo,
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
    });
  //map.addLayer(ggl2);

  // Para mapa com contraste
  var mbAttr = 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://mapbox.com">Mapbox</a>',
		mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYW9zY3MiLCJhIjoiY2owbDJpYWxwMDM3dTMzbzh6dDU2bnpzdyJ9._dh2UCWnAeNeG0ZL5sQ5gA';

	var tilesGrayscale = L.tileLayer(mbUrl, {id: 'mapbox.dark', attribution: mbAttr});

  var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
  });

  map.addLayer(googleHybrid);
  map.addLayer(tilesGrayscale);
  map.addLayer(tiles);

  // create fullscreen control
	var fsControl = new L.Control.FullScreen();
	// add fullscreen control to the map
	map.addControl(fsControl);

  var newData, urlRotaMapa;
  var rotas = new Rotas();
  var valoresURL = window.location.href.split('?')[1]!==undefined ? window.location.href.split('?')[1].split('=') : null;
  var tipoConsulta;

  //botao de consulta
  var div = $("#buscarPerfil .tab-content");
  div.find(".btn.btn-primary").on("click", function(){
    var tabAtiva = div.find('.tab-pane.fade.active.in');
    var id = tabAtiva.attr("id");
    var val = tabAtiva.find(".form-control").val();
    val = replaceSpecialChars(val.trim()).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ',').replace(/\+{2,}/g, '_');

    if (id == 'organizacao' && val !== ''){
      link = "./resultado-consulta.html?" + id + "=" + val + "&tipoBusca=0";
      location.href=link;
    }
    else {
      val = $('.response').val();
      if (val !== ''){
        link = "./resultado-consulta.html?" + id + "=" + val;
        location.href=link;
      }
      else{
        $('#errorLabel').removeClass('hide');
      }
    }
  });

  function replaceSpecialChars(str){
    str = str.replace(/[ÀÁÂÃÄÅ]/g,"A");
    str = str.replace(/[àáâãäå]/g,"a");
    str = str.replace(/[ÉÈÊË]/g,"E");
    str = str.replace(/[éèêë]/g,"e");
    str = str.replace(/[ÍÌÎÏ]/g,"I");
    str = str.replace(/[íìîï]/g,"i");
    str = str.replace(/[ÓÒÔÕ]/g,"O");
    str = str.replace(/[óòôõ]/g,"o");
    str = str.replace(/[ÚÙÛÜ]/g,"U");
    str = str.replace(/[úùûü]/g,"u");
    str = str.replace(/[Ç]/g,"C");
    str = str.replace(/[ç]/g,"c");
    return str;
  }

  //autocomplete organizacao
  $("#organizacao .form-control").autocomplete({
    minLength: 3,
    source: function (request, response) {
     textoBusca = replaceSpecialChars(request.term.trim()).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ',');

       $.ajax({
           url: rotas.AutocompleteOSCByName(textoBusca, limiteAutocomplete, 0),
           type: 'GET',
           dataType: "json",
           success: function (data) {
             response($.map( data, function( item ) {
                return {
                    label: item.tx_nome_osc,
                    value: item.tx_nome_osc,
                    id: item.id_osc
                };
            }));
           },
           error: function (e) {
             //console.log(e);
               response([]);
           }
       });
   },
   select: function(event, ui){
    link = './resultado-consulta.html?organizacao=' + replaceSpecialChars(ui.item.value.trim()).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ',').replace(/\+{2,}/g, '_') + '&tipoBusca=1';
    location.href=link;
   }
 });

  //autocomplete municipio
  $("#municipio .form-control").autocomplete({
    minLength: 3,
    source: function (request, response) {
       $.ajax({
           url: rotas.AutocompleteOSCByCounty(replaceSpecialChars(request.term).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ','), limiteAutocompleteCidade),
           type: 'GET',
           dataType: "json",
           success: function (data) {
             response($.map( data, function( item ) {
                return {
                    label: item.edmu_nm_municipio + ' - '+ item.eduf_sg_uf,
                    value: item.edmu_nm_municipio + ' - '+ item.eduf_sg_uf,
                    id: item.edmu_cd_municipio
                };
            }));
           },
           error: function (e) {
               response([]);
           }
       });
   },
   select: function(event, ui){
     $('.response').val(ui.item.id);
     link = "./resultado-consulta.html?"+'municipio'+"="+ui.item.id;
     location.href=link;
   }
 });

 //autocomplete estado
 $("#estado .form-control").autocomplete({
   minLength: 3,
   source: function (request, response) {
      $.ajax({
          url: rotas.AutocompleteOSCByState(replaceSpecialChars(request.term).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ','), limiteAutocomplete),
          type: 'GET',
          dataType: "json",
          success: function (data) {
            response($.map( data, function( item ) {
               return {
                   label: item.eduf_nm_uf,
                   value: item.eduf_nm_uf,
                   id: item.eduf_cd_uf
               };
           }));
          },
          error: function () {
              response([]);
          }
      });
  },
  select: function(event, ui){
    $('.response').val(ui.item.id);
    link = "./resultado-consulta.html?"+'estado'+"="+ui.item.id;
    location.href=link;
  }
});

//autocomplete regiao
$("#regiao .form-control").autocomplete({
  minLength: 3,
  source: function (request, response) {
     $.ajax({
         url: rotas.AutocompleteOSCByRegion(replaceSpecialChars(request.term).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ','), limiteAutocomplete),
         type: 'GET',
         dataType: "json",
         success: function (data) {
           response($.map( data, function( item ) {
              return {
                  label: item.edre_nm_regiao,
                  value: item.edre_nm_regiao,
                  id: item.edre_cd_regiao
              };
          }));
         },
         error: function () {
             response([]);
         }
     });
 },
 select: function(event, ui){
   $('.response').val(ui.item.id);
   link = "./resultado-consulta.html?"+'regiao'+"="+ui.item.id;
   location.href=link;
  }
 });

 $('.ui-autocomplete-input').keypress(function(e) {
   var key = e.which;
   if(key == 13){
     $('.btn-primary').click();
     $('.ui-menu-item').hide();
     return false;
   }
 });

  if(valoresURL!==null){
    //consulta baseado na escolha da tela anterior
    tipoConsulta = valoresURL[0];
    var stringBuscada = valoresURL[1];
    stringBuscada = stringBuscada.replace(/\./g, "");
    stringBuscada = stringBuscada.split('&')[0];
    if(tipoConsulta == "organizacao"){
      urlRota = rotas.OSCByName(getParameter('organizacao'), 0, getParameter('tipoBusca'));
      urlRotaMapa = rotas.OSCByNameInMap(getParameter('organizacao'), getParameter('tipoBusca'));
      isClusterVersion=false;
      analisePerfil = true;
    }
    else if(tipoConsulta=="municipio"){
      urlRota = rotas.OSCByCounty(stringBuscada,0);
      urlRotaMapa=rotas.OSCByCountyInMap(stringBuscada);
      isClusterVersion=false;
      analisePerfil = true;
      idPerfil = stringBuscada;
      txtFederacao = "do município ";
    }
    else if(tipoConsulta=="estado"){
      urlRota = rotas.OSCByState(stringBuscada,0);
      urlRotaMapa=rotas.ClusterEstadoPorRegiao(stringBuscada);//urlRotaMapa=rotas.OSCByStateInMap(stringBuscada);
      analisePerfil = true;
      idPerfil = stringBuscada;
      txtFederacao = "do estado ";
    }
    else if(tipoConsulta=="regiao"){
      urlRota = rotas.OSCByRegion(stringBuscada,0);
      urlRotaMapa=rotas.ClusterRegiao(stringBuscada);//urlRotaMapa=rotas.OSCByRegionInMap(stringBuscada);
      analisePerfil = true;
      idPerfil = stringBuscada;
      txtFederacao = "da região ";
    }
    else if(tipoConsulta=="avancado"){
      params["avancado"] = window.localStorage.getItem('params_busca_avancada');

      if(params["avancado"] == '{}'){
        //consulta tudo
        tipoConsulta="todos";
        urlRotaMapa = rotas.ClusterPais();
        urlRota = rotas.AllOSC(0);
      }
      else{
        urlRota = rotas.ConsultaAvancadaLista(0);
        urlRotaMapa=rotas.ConsultaAvancadaMapa();
        isClusterVersion=false;
        consulta_avancada = true;

        if(util.contains('IDHM',params["avancado"])){ // fa\zer funcão talvez passando todos como IDH ou ipeadata sei lá
            var data = util.carregaAjax(rotas.IDHM(),'GET',null);
            if(data!==undefined){
              for (var i in data.value){
                var obj = {};
                obj['codigo'] = data.value[i].TERCODIGO;
                obj['valor'] = data.value[i].a2010m01d01;
                //obj[data.value[i].TERCODIGO] = data.value[i].a2010m01d01;
                composto.push(obj);
              }
            }
        }

        visualizar_filtro_busca(params["avancado"]);
     }
    }
    else{
      console.log("ERRO de URL!");
    }
  }
  else{
    //consulta tudo
    tipoConsulta="todos";
    urlRotaMapa = rotas.ClusterPais();
    urlRota = rotas.AllOSC(0);
  }

  if(analisePerfil){
    var txtPerfil = "Análise " + txtFederacao + txtLocalidade;
    $("#analisePerfil").text(txtPerfil);
    $("#analisePerfil").attr("href","analise-perfil.html?localidade="+idPerfil);
  }

  function visualizar_filtro_busca(json){
    var json_filtro = JSON.parse(json);
    var dadosgerais = json_filtro.dadosGerais;
    var txt = '<b><u>Filtros utilizados:</u></b> ';
    var nj = false;

    if(dadosgerais){

      if(dadosgerais.tx_razao_social_osc){
        txt += "<b><i>Nome da OSC:</i></b> " + dadosgerais.tx_razao_social_osc + ", ";
      }
      if(dadosgerais.tx_nome_regiao){
        txt += "<b><i>Região:</i></b> " + dadosgerais.tx_nome_regiao + ", ";
      }
      if(dadosgerais.tx_nome_fantasia_osc ){
        txt += "<b><i>Nome Fantasia:</i></b> " + dadosgerais.tx_nome_fantasia_osc + ", ";
      }
      if(dadosgerais.tx_nome_uf){
        txt += "<b><i>Estado:</i></b> " + dadosgerais.tx_nome_uf + ", ";
      }
      if(dadosgerais.cd_identificador_osc){
        txt += "<b><i>CNPJ:</i></b> " + dadosgerais.cd_identificador_osc + ", ";
      }
      if(dadosgerais.anoFundacaoMIN ){
        txt += "<b><i>Ano de Fundação de:</i></b> " + dadosgerais.anoFundacaoMIN + ", ";
      }
      if(dadosgerais.anoFundacaoMAX ){
        txt += "<b><i>Ano de Fundação até:</i></b> " + dadosgerais.anoFundacaoMAX + ", ";
      }
      if(dadosgerais.tx_nome_municipio){
        txt += "<b><i>Município:</i></b> " + dadosgerais.tx_nome_municipio + ", ";
      }

      var txt_nj = "<b><i>Natureza Jurídica:</i></b> ";
      if(dadosgerais.naturezaJuridica_associacaoPrivada){
        txt_nj += "Associação Privada" + ", ";
        nj = true;
      }

      if(dadosgerais.naturezaJuridica_fundacaoPrivada){
        txt_nj += "Fundação Privada" + ", ";
        nj = true;
      }

      if(dadosgerais.naturezaJuridica_organizacaoReligiosa){
        txt_nj += "Organização Religiosa"  + ", ";
        nj = true;
      }

      if(dadosgerais.naturezaJuridica_organizacaoSocial){
        txt_nj += "Organização Social"  + ", ";
        nj = true;
      }

      if(dadosgerais.naturezaJuridica_outra){
        txt_nj += "Não informado"  + ", ";
        nj = true;
      }

      if(nj)
      {
        txt += txt_nj;
      }

      dadosgerais.cd_situacao_imovel_osc;
      dadosgerais.cd_objetivo_osc;
      dadosgerais.cd_meta_osc;
    }

    var atividadeEconomica = json_filtro.atividadeEconomica;
    if(atividadeEconomica){
      txt += "<b><i>Atividade Econômica (CNAE):</i></b> " + atividadeEconomica.tx_atividade_economica + ", ";

    }

    var areasSubareasAtuacao = json_filtro.areasSubareasAtuacao;
    if(areasSubareasAtuacao){
      var nomes_area_sub_atuacao = [];

      $.ajax({
        url: rotas.AreaAtuacao(),
        type: 'GET',
        async:false,
        dataType: 'json',
        error:function(e){
          console.log("Erro no ajax: ");
        },
        success: function(data){

          for (var key in areasSubareasAtuacao ){
            var cd_area_atuacao = parseInt(key.split('cd_area_atuacao-')[1]);

            if(cd_area_atuacao != undefined){
              $.each(data, function (k, value) {
                if(cd_area_atuacao == value.cd_area_atuacao ){
                  if (nomes_area_sub_atuacao.indexOf(value.tx_nome_area_atuacao) === -1) {
                    nomes_area_sub_atuacao.push( value.tx_nome_area_atuacao);
                  }
                }
              });
            }
          }

          $.ajax({
            url: rotas.SubAreaAtuacao(),
            type: 'GET',
            async:false,
            dataType: 'json',
            error:function(e){
              console.log("Erro no ajax: ");
            },
            success: function(data){

                for (key in areasSubareasAtuacao ){
                  var cd_subarea_atuacao = parseInt(key.split('cd_subarea_atuacao-')[1]);

                  if(cd_subarea_atuacao != undefined){
                    $.each(data, function (k, value) {
                      if(cd_subarea_atuacao == value.cd_subarea_atuacao ){
                        if (nomes_area_sub_atuacao.indexOf(value.tx_nome_subarea_atuacao) === -1) {
                          nomes_area_sub_atuacao.push( value.tx_nome_subarea_atuacao);
                        }
                      }
                    });
                  }
                }

                if(nomes_area_sub_atuacao.length > 0){

                  txt += "<b><i>Área e Subárea de Atuação:</i></b> " + nomes_area_sub_atuacao.join(', ') + ", ";
                }
              }
            });

          }
        });

    }


    $("#filtros p").html(txt);

  }

  //*** Methods
  function tabela(urlRota, consulta_avancada){
    var data_tipo;
    $('#loading').removeClass('hide');
    $('#resultadoconsulta_formato_dados').hide();
    if(consulta_avancada){
      type_http = "POST";
      data_tipo = params;
    }else{
      type_http = "GET";
      data_tipo = null;
    }

    $.ajax({
      url: urlRota,
      type: type_http,
      dataType: 'json',
      data:data_tipo,
      error:function(e){
        console.log("Erro no ajax: "+e);
      },
      success: function(data){
        if(data !== "Nenhuma Organização encontrada!"){
          var columns = 6;
          var sizeOfData = data.length;
          var newData = new Array(sizeOfData);
          var i = 0;
          var txtVazioNulo = 'Dado não informado.';
          var srcPadrao = 'img/camera.jpg';
          for (var j in data){
            if(j=="0") continue;
            else{
              newData[i] = new Array(columns);
              var srcImg = data[j][4] !== null ? data[j][4] : srcPadrao;
              newData[i][0] = '<img class="img-circle media-object" src=' + srcImg + ' height="64" width="64">';
              newData[i][1] = data[j][0] !== null ? data[j][0] : txtVazioNulo;//tx_nome_osc;
              newData[i][2] = data[j][1] !== null ? data[j][1] : txtVazioNulo;//cd_identificador_osc;
              newData[i][3] = data[j][2] !== null ? data[j][2] : txtVazioNulo;//tx_natureza_juridica_osc;
              newData[i][4] = data[j][3] !== null ? data[j][3] : txtVazioNulo;//tx_endereco_osc;
              newData[i][5] = '<button type="button" onclick="location.href=\'visualizar-osc.html#'+j+'\';" class="btn btn-info"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Detalhar</button>';
              i++;
            }
          }
          //Se a pesquisa for alguma palavra que não tem referencia com nenhuma OSC
          if(typeof newData[0] !== "undefined"){
            var datatable = $('#resultadoconsulta_formato_dados').DataTable({
              responsive: true,
              processing: true,
              deferLoading: 1000,
              deferRender: true,
              searching: false,
              data: newData,
              dom: 'Bfrtip',
              "bPaginate": false,
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
             datatable.destroy();
             datatable.draw();
             $('#resultadoconsulta_formato_dados').show();
             $('#loading').addClass('hide');
         }
         else {
            $('#modalMensagem').modal({backdrop: 'static', keyboard: false});
            $('#modalTitle').text('Nenhuma OSC encontrada!');
            if(tipoConsulta !== "avancado" && tipoConsulta !== "municipio"){
              $('#modalConteudo').text('Sua pesquisa "'+ decodeURIComponent(stringBuscada) + '" não retornou nenhuma OSC.');
            }else {
              $('#modalConteudo').text('Sua pesquisa não retornou nenhuma OSC.');
            }
            $('#modalMensagem').modal('show');
         }
        }
        else {
           $('#modalMensagem').modal({backdrop: 'static', keyboard: false});
           $('#modalTitle').text('Nenhuma OSC encontrada!');
           if(tipoConsulta !== "avancado" && tipoConsulta !== "municipio"){
             $('#modalConteudo').text('Sua pesquisa "'+ decodeURIComponent(stringBuscada) + '" não retornou nenhuma OSC.');
           }else {
             $('#modalConteudo').text('Sua pesquisa não retornou nenhuma OSC.');
           }
           $('#modalMensagem').modal('show');
        }
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
      url: rotas.OSCPopUpByID(id),
      type: 'GET',
      dataType: 'json',
      error: function(e){
          console.log("ERRO no AJAX :" + e);
      },
      success: function(data){
        if(data!==undefined){
          //console.log(data);
          var endereco = data.tx_endereco !== null ? data.tx_endereco : '';
          var bairro = data.tx_bairro !== null? data.tx_bairro : '';
          var enderecoCompleto = endereco+' - '+bairro;
          var txtVazioNulo = 'Dado não informado.';
          var div = '<div class="mapa_organizacao clearfix">' +
                    '<span id="spantitle" class="magneticTooltip">'+
                    '<button id="title" class="btn-link"  onclick=location.href="visualizar-osc.html#'+ id +'">'+
                    '<h4>'+ (data.tx_nome_osc !== null ? data.tx_nome_osc : txtVazioNulo)+'</h4></button></span>'+
                    '<div class="coluna1"><strong></strong><strong>Endereço: </strong>'+ enderecoCompleto +'<br>'+
                    '<strong>Atividade Econômica: </strong>'+(data.tx_nome_atividade_economica !== null ? data.tx_nome_atividade_economica : txtVazioNulo)+'<br>'+
                    '<strong>Natureza Jurídica: </strong>'+(data.tx_nome_natureza_juridica !== null ? data.tx_nome_natureza_juridica : txtVazioNulo)+'<br><br>'+
                    '<div align="center"><button type = button class="btn btn-info" onclick=location.href="visualizar-osc.html#'+ id +'"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Detalhar</button>'+
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

      if(tipoCluster=="regiao" || tipoCluster=="todos"){
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
      if(k != "0"){
        var point = loadPoint(k, dados[k][0], dados[k][1]);
        if(point!==null){
          map.addLayer(point);
        }
      }
    }

    $("#loadingMapModal").hide();
    leafletView.ProcessView();
  }

  var info = L.control();

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
      if(layer.feature.properties.Name=="GO"){
        //Necessário para a layer de Goiás não se sobrepor a layer do Distrito federal
        layer.bringToBack();
      }
      info.update(layer.feature.properties);
  }

  function resetHighlight(e) {
      geojson.resetStyle(e.target);
      info.update();
  }

  function zoomm(e){
    var layer = e.target;
      map.fitBounds(layer.getBounds());
  }

  function heatMap(arrayPDF, arrayID){
      var nomeEstado;
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
          layerGroupIDH.addLayer(layer);
          llayers[layer.feature.properties.id] = layer;
          llayersIDH[layer.feature.properties.id] = layer;
      }

      map.addLayer(layerGroup);
      map.addLayer(layerGroupIDH);

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
      var lll;

      function zoomToFeature(e) {
        //console.log(e);
        var layer = e.target;
          map.fitBounds(layer.getBounds());
          loadChunkData(layer.feature.properties.id);
          //console.log(layer.feature.properties.Regiao);
          //console.log(layer.feature.properties.id);

          if(rlayers[layer.feature.properties.Regiao]==undefined){

            var l = clayers[layer.feature.properties.id];
            if(l!=undefined)
              map.removeLayer(l);
          }
          else{

            loadChunkDataRegiao(layer);

          }
          layer.off();
          layer.on({
              mouseover: highlightFeature,
              mouseout: resetHighlight,
              click: zoomm
          });
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
    //o menor valor de OScs em um estado é de ~537 e o maior ~91665, a escala abaixo está em 5 níveis,
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
    if(level=="regiao" || level == "todos") classNameLevel = "labelClassRegiao";
    else if(level=="estado") classNameLevel = "labelClassEstado";
    for(var k in dados){
      var markerGroup = [];
      var icone =  L.divIcon({
                    id: dados[k].id_regiao,
                    className: classNameLevel,
                    html: "<p>"+dados[k].nr_quantidade_osc_regiao+"</p>"
                  });
      mapRegion[dados[k].id_regiao] = dados[k].nr_quantidade_osc_regiao;
      var layerPoint = loadPointCluster(icone, dados[k].id_regiao, dados[k].geo_lat_centroid_regiao, dados[k].geo_lng_centroid_regiao, level);
      clustersLayer.addLayer(layerPoint);
      if(level=="estado") {
        clayers[dados[k].id_regiao]=layerPoint;
      }
      else if (level=="regiao" || level == "todos") {
        rlayers[dados[k].id_regiao]=layerPoint;
      }
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
      url: rotas.OSCByStateInMap(idEstado),
      type: 'GET',
      dataType: 'json',
      error: function(e){
          console.log("ERRO no AJAX :" + e);
      },
      success: function(data){
        tabela(urlRota, consulta_avancada);
        if(typeof data.length !== 'undefined'){
          var count = 0;
          for(var i = 0; i < data.length; i++){
            count += data[i].nr_quantidade_osc_regiao;
          }
          paginar(count);
        }
        else{
          paginar(Object.keys(data).length-1);
        }
        if(data!==undefined){
          carregaMapa(data);
        }
      }
    });
  }

  function clickClusterRegiao(e){
    //console.log(e.target);
    var idRegiao = e.target.options.icon.options.id;
    $("#loadingMapModal").show();
    $.ajax({
      url: rotas.ClusterEstadoPorRegiao(idRegiao),
      type: 'GET',
      dataType: 'json',
      error: function(e){
          console.log("ERRO no AJAX :" + e);
      },
      success: function(data){
        tabela(urlRota, consulta_avancada);
        if(typeof data.length !== 'undefined'){
          var count = 0;
          for(var i = 0; i < data.length; i++){
            count += data[i].nr_quantidade_osc_regiao;
          }
          paginar(count);
        }
        else{
          paginar(Object.keys(data).length-1);
        }

        if(data!==undefined){

          map.setView([e.target._latlng.lat, e.target._latlng.lng], 5);
          map.removeLayer(e.target);
          delete rlayers[idRegiao];
          carregaMapaCluster(data, "estado");
        }
      }
    });
  }

  function loadChunkDataRegiao(layer){
    var idRegiao = layer.feature.properties.Regiao;
    $("#loadingMapModal").show();
    $.ajax({
      url: rotas.ClusterEstadoPorRegiao(idRegiao),
      type: 'GET',
      dataType: 'json',
      error: function(e){
          console.log("ERRO no AJAX :" + e);
      },
      success: function(data){
        tabela(urlRota, consulta_avancada);
        if(typeof data.length !== 'undefined'){
          var count = 0;
          for(var i = 0; i < data.length; i++){
            count += data[i].nr_quantidade_osc_regiao;
          }
          paginar(count);
        }
        else{
          paginar(Object.keys(data).length-1);
        }
        if(data!==undefined){
          carregaMapaCluster(data, "estado");
          var r = rlayers[idRegiao];
          map.removeLayer(r);
          delete rlayers[idRegiao];
          var l = clayers[layer.feature.properties.id];
          map.removeLayer(l);
        }
      }
    });
  }

  function paginar(qtdPagination){
    $('.pagination').pagination({
      items: qtdPagination,
      itemsOnPage: 10,
      hrefTextPrefix: "#",
      prevText: "Anterior",
      nextText: "Próximo",
      onPageClick: function(pageNumber){(paginarAction(pageNumber))}
    });

  }

  function paginarAction(pageNumber){
    if(pageNumber === null){
      pageNumber = 0;
    }
    var offset = parseInt(pageNumber) * 10 - 10;

    if(tipoConsulta == "avancado"){
      urlRota = rotas.ConsultaAvancadaLista(offset);
      consulta_avancada = true;
    }
    else if(tipoConsulta == "municipio"){
      urlRota = rotas.OSCByCounty(stringBuscada,offset);
    }
    else if(tipoConsulta == "estado"){
      urlRota = rotas.OSCByState(stringBuscada,offset);
    }
    else if(tipoConsulta == "regiao"){
      urlRota = rotas.OSCByRegion(stringBuscada,offset);
    }
    else if(tipoConsulta == "todos"){
      urlRota = rotas.AllOSC(offset);
    }
    else if(tipoConsulta == "organizacao"){
      urlRota = rotas.OSCByName(getParameter('organizacao'), offset, getParameter('tipoBusca'));
    }

    tabela(urlRota, consulta_avancada);
  }

  function clickClusterEstado(e){
    //console.log(e);
    var idEstado = e.target.options.icon.options.id;
    //zoomToFeature(idEstado);
    $("#loadingMapModal").show();
    $.ajax({
      url: rotas.OSCByStateInMap(idEstado),
      type: 'GET',
      dataType: 'json',
      error: function(e){
          console.log("ERRO no AJAX :" + e);
      },
      success: function(data){
        tabela(urlRota, consulta_avancada);
        if(typeof data.length !== 'undefined'){
          var count = 0;
          for(var i = 0; i < data.length; i++){
            count += data[i].nr_quantidade_osc_regiao;
          }
          paginar(count);
        }
        else{
          paginar(Object.keys(data).length-1);
        }
        if(data!==undefined){
          map.setView([e.target._latlng.lat, e.target._latlng.lng], 6);
          map.removeLayer(e.target);
          var l = llayers[idEstado];
          l.off();
          l.on({
              mouseover: highlightFeature,
              mouseout: resetHighlight,
              click: zoomm
          });
          carregaMapa(data);
        }
      }
    });
  }

  function apagaMapaDeCalor(e){
    var zoomMap = map.getZoom();
    if(zoomMap==zoomMaximo){
      map.removeLayer(layerGroup);
      map.removeLayer(layerGroupIDH);
    }
  }


  //*** MAIN ***\\
  $("#loadingMapModal").show();
  var data_tipo_mapa;
  if(consulta_avancada){
    type_http = "POST";
    data_tipo_mapa = params;
  }else{
    type_http = "GET";
    data_tipo_mapa = null;
  }

  $.ajax({
    url: urlRotaMapa,
    type: type_http,
    dataType: 'json',
    data: data_tipo_mapa,
    error: function(e){
        console.log("ERRO no AJAX :" + e);
    },
    success: function(data){

      if(data !== "" && data !== undefined && data !== "Nenhuma Organização encontrada!" ){
        tabela(urlRota, consulta_avancada);
        var count = 0;

        if(isClusterVersion){
          if(typeof data.length !== 'undefined'){
            for(var i = 0; i < data.length; i++){
              count += data[i].nr_quantidade_osc_regiao;
            }
          }

          paginar(count);
          $("#legenda p").append(count);

          carregaMapaCluster(data, tipoConsulta);
        }
        else{
          count = Object.keys(data).length-1;
          paginar(count);
          $("#legenda p").append(count);

          carregaMapa(data);
        }
      }else{
        $('#modalMensagem').modal({backdrop: 'static', keyboard: false});
        $('#modalTitle').text('Nenhuma OSC encontrada!');
        if(tipoConsulta !== "avancado" && tipoConsulta !== "municipio"){
          $('#modalConteudo').text('Sua pesquisa "'+ decodeURIComponent(stringBuscada) + '" não retornou nenhuma OSC.');
        }else {
          $('#modalConteudo').text('Sua pesquisa não retornou nenhuma OSC.');
        }
        $('#modalMensagem').modal('show');
      }
    }
  });

  //Coloração do mapa
  $.ajax({
    url: rotas.ClusterEstado(),//rotas.IDHM,//
    type: 'GET',
    dataType: 'json',
    error: function(e){
        console.log("ERRO no AJAX :" + e);
    },
    success: function(data){
      if(data!==undefined){
        var pdfs={};
        var ids={};
        //for(var k in data.value){
        for(var k in data){
          pdfs[data[k].tx_sigla_regiao]=data[k].nr_quantidade_osc_regiao;
          //pdfs[data.value[k].TERNOME]=data.value[k].a2010m01d01;
          ids[data[k].tx_sigla_regiao]=data[k].id_regiao;
          //ids[data.value[k].TERNOME]=data.value[k].TERCODIGO;
        }
        map.addControl(new L.Control.Layers({
          'Satélite':googleHybrid,
          'Contraste': tilesGrayscale,
          'Mapa': tiles,
        }, { 'Mapa de calor':layerGroup,'IDHM':layerGroupIDH },{collapsed:false}));
        heatMap(pdfs, ids);
      }
    }

  });

  map.on('zoomend', apagaMapaDeCalor);

});
