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

  jQuery(document).ready(function($) {
      $(".scroll").click(function(event){
          event.preventDefault();
          $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
     });
  });

});

require(["nv.d3.lib","graficoParaTabela"], function (React) {

  var jsonGrafico1 = [{"config":[",f",1,""],"leg_X":"Região","leg_Y":"Quantidade de OSC","tituloColuna":["Natureza Jurídica", "Região", "Quantidade de OSCs"],"legenda":"Fonte: Elaboração do Ipea com base em dados da Secretaria da Receita Federal (2016).","titulo":"Número de OSCs por natureza jurídica e região, Brasil - 2016",
  series:[
    {key: "Associação Privada", values: [{"label" : "SUDESTE", "value" : 268864 }, {"label" : "SUL", "value" : 142398 }, {"label" : "NORDESTE", "value" : 184477 }, {"label" : "CENTRO-OESTE", "value" : 53663 }, {"label" : "NORTE", "value" : 56079 }, {"label" : "Não informado", "value" : 3065 }]},
    {key: "Organização Religiosa", values: [{"label" : "SUDESTE", "value" : 51000 }, {"label" : "SUL", "value" : 13428 }, {"label" : "NORDESTE", "value" : 17550 }, {"label" : "CENTRO-OESTE", "value" : 9311 }, {"label" : "NORTE", "value" : 6539 }, {"label" : "Não informado", "value" : 813 }]},
    {key: "Fundacao Privada", values: [{"label" : "SUDESTE", "value" : 5293 }, {"label" : "SUL", "value" : 2001 }, {"label" : "NORDESTE", "value" : 3128 }, {"label" : "CENTRO-OESTE", "value" : 1167 }, {"label" : "NORTE", "value" : 772 }, {"label" : "Não informado", "value" : 36 }]},
    {key: "Organização Social", values: [{"label" : "SUDESTE", "value" : 219 }, {"label" : "SUL", "value" : 71 }, {"label" : "NORDESTE", "value" : 145 }, {"label" : "CENTRO-OESTE", "value" : 101 }, {"label" : "NORTE", "value" : 62 }, {"label" : "Não informado", "value" : 4 }]}
    ]}];

  var jsonGrafico2 = [{"config":[",f",1000000," M",",f"],"leg_X":"Ano","leg_Y":"Quantidade de OSC","tituloColuna":["", "Ano", "Valores"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016). Valores deflacionados pelo IPCA do mês corrente. Os valores exibidos referem-se aos valores efetivamente pagos para as organizações. A série histórica inclui os dados do SIAFI a partir de 2011. Os dados do Ministério da Fazenda cobrem 2011-2017; do MPOG, 2009-2017; do MinC, 1992-2012; do Ministério do Esporte, 2007-2016; do MCTI, 2009-2016.","titulo":"Evolução anual dos repasses federais para as OSCs, Brasil - 2009-2017",
  series:[
        {
          "key" : "Número OSC Parcerias" ,
          "bar": true,
          "color": "#8ed5ff",
          "values" : [ {"label" : 2009, "value" : 1251} , {"label" : 2010, "value" : 1526} ,
                      {"label" : 2011, "value" : 16090} , {"label" : 2012, "value" : 16557},
                      {"label" : 2013, "value" : 16642} , {"label" : 2014, "value" : 16974},
                      {"label" : 2015, "value" : 14984} , {"label" : 2016, "value" : 16086},
                      {"label" : 2017, "value" : 1441}]
        } ,
        {
          "tipo_valor":"$",
          "key" : "Valor Total Pago" ,
          "color" : "#333",
          "values" : [ {"label" : 2009, "value" : 2825785175.20046} , {"label" : 2010, "value" : 3689756338.37335} ,
                      {"label" : 2011, "value" : 6897283626.21569} , {"label" : 2012, "value" : 7457550609.07884},
                      {"label" : 2013, "value" : 8738240049.30125} , {"label" : 2014, "value" : 6582659367.61274},
                      {"label" : 2015, "value" : 3476167177.2369} , {"label" : 2016, "value" : 3569745888.21392},
                      {"label" : 2017, "value" : 144648063.09} ]
        }
        ]}];

      var jsonGrafico3 = [{"config":[",f",1000000," M"],"leg_X":"Ano","leg_Y":"em R$","tituloColuna":["Divisão CNAE", "Ano da Parceria", "Valor Total Pago"],"legenda":"Siga Brasil/ Senado Federal (2017), RAIS/MTE (2015). Elaboração própria. Nota: referem-se aos valores executados (liquidados) e atualizados a preços de outubro de 2017.","titulo":"Evolução anual dos repasses federais para as OSCs por área de atuação, Brasil - 2010-2017",
      series:[
        {
          "tipo_valor":"$",
          values: [{"x" : 2010, "y" : 2475271665 }, {"x" : 2011, "y" : 2344840370 },
          {"x" : 2012, "y" : 2416751939 }, {"x" : 2013, "y" : 2360686002}, {"x" : 2014, "y" : 2619736378},
           {"x" : 2015, "y" : 1996874918 }, {"x" : 2016, "y" : 1762657873 }, {"x" : 2017, "y" : 722616503 }],
          key: 'Saúde'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2010, "y" : 177621059 }, {"x" : 2011, "y" : 64130914 },
          {"x" : 2012, "y" : 69157135 }, {"x" : 2013, "y" : 94974566 }, {"x" : 2014, "y" : 50767409 },
           {"x" : 2015, "y" : 46070808 }, {"x" : 2016, "y" : 1661980 }, {"x" : 2017, "y" : 5048758 }],
          key: 'Cultura e recreação'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2010, "y" : 1494752250 }, {"x" : 2011, "y" : 1191614600 },
          {"x" : 2012, "y" : 1337141937 }, {"x" : 2013, "y" : 1427079792 }, {"x" : 2014, "y" : 1350110928 },
           {"x" : 2015, "y" : 912500271 }, {"x" : 2016, "y" : 158224896 }, {"x" : 2017, "y" : 91640974 }],
          key: 'Educação e pesquisa'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2010, "y" : 57311974 }, {"x" : 2011, "y" : 41024076 },
           {"x" : 2012, "y": 38312968 }, {"x" : 2013, "y" : 43477853 }, {"x" : 2014, "y" : 45573709 },
           {"x" : 2015, "y": 28400811 }, {"x" : 2016, "y" : 3059934 }, {"x" : 2017, "y" : 626165}],
          key: 'Assistência social'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2010, "y" : 95856103 }, {"x" : 2011, "y" : 205217992 },
           {"x" : 2012, "y" : 370389290 }, {"x" : 2013, "y" : 485292129 }, {"x" : 2014, "y" : 543865255 },
           {"x" : 2015, "y" : 547896405 }, {"x" : 2016, "y" : 17662647 }, {"x" : 2017, "y" : 1266568 } ],
          key: 'Religião'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2010, "y" : 121545818 }, {"x" : 2011, "y" : 69282477 },
          {"x" : 2012, "y" : 59832981 }, {"x" : 2013, "y" : 42126887 }, {"x" : 2014, "y" : 47604912 },
          {"x" : 2015, "y" : 41902403 }, {"x" : 2016, "y" : 4238713 }, {"x" : 2017, "y" : 2107919 }],
          key: 'Associações patronais e profissionais'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2010, "y" : 4368739661 }, {"x" : 2011, "y" : 4032601858 },
          {"x" : 2012, "y" : 4135465164 }, {"x" : 2013, "y" : 4056921248 }, {"x" : 2014, "y" : 4318619203 },
          {"x" : 2015, "y" : 4890688981 }, {"x" : 2016, "y" : 88522782 }, {"x" : 2017, "y" : 28639038 }],
          key: 'Defesa de direitos e interesses'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2010, "y" : 533526888 }, {"x" : 2011, "y" : 433086831 },
          {"x" : 2012, "y" : 450237599 }, {"x" : 2013, "y" : 400444828 }, {"x" : 2014, "y" : 400102753 },
          {"x" : 2015, "y" : 371235115 }, {"x" : 2016, "y" : 21185665 }, {"x" : 2017, "y" : 9205267 }],
          key: 'Associações atividades não espececificadas anteriormente'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2010, "y" : 1953406383 }, {"x" : 2011, "y" : 1530160133 },
          {"x" : 2012, "y" : 1580161756 }, {"x" : 2013, "y" : 2031165053 }, {"x" : 2014, "y" : 2564745833 },
          {"x" : 2015, "y" : 2371791054 }, {"x" : 2016, "y" : 222185524 }, {"x" : 2017, "y" : 34488223 }],
          key: 'Outras organizações da sociedade civil'
        }
      ]}];

  var jsonGrafico4 = [{"config":[",f",1,""],"leg_X":"Tipo de título ou certificação","leg_Y":"Quantidade de OSC","tituloColuna":["Títulos e Certificados", "Número de OSC"],"legenda":"Fonte: Ministério da Justiça (2017), Ministério da Educação (2017), Ministério da Saúde (2017), Ministério do Desenvolvimento Social (2017).","titulo":"Número de organizações civis com títulos e certificações, Brasil - 2017", key: "GraficoMain 4",
  values: [ {"label" : "OSCIP/MJ", "value" : 7114}, {"label" : "CEBAS/MDS", "value" : 5487 } ,
            { "label" : "CEBAS/MS" , "value" : 1363 },{"label" : "CEBAS/MEC", "value" : 944 } ]}];

  var jsonGrafico5 = [{"config":[",.1%",1,"",",f"],"leg_X":"Ano","leg_Y":"Quantidade de OSC","tituloColuna":["", "Ano", "Valores"],"legenda":"Fonte: Elaboração do Ipea, com base em dados da Secretaria da Receita Federal (2016) e RAIS/MTE (2015).<br> * NOTA: em 2016 calculou-se o total de OSCs ativas do país a partir da base de dados da ficha cadastral de CNPJ da Secretaria da Receita Federal – SRF. Esses microdados não estavam disponíveis para análise de 2010 a 2015, quando se utilizou somente a base de dados da RAIS para calcular o total de OSCs. Observou-se na base da SRF milhares de OSCs ativas, mas ausentes da base RAIS/MTE. A alteração na fonte dos dados para calcular o total das OSCs explica a maior parte do crescimento observado entre os anos de 2015 e 2016.<br>Consulte a <a href='metodologia.html' target='_self'>seção metodológica</a> para mais detalhes.","titulo":"Total de OSC, por ano (2010-2016)*",
  series:[
        {
          "key" : "Número de OSCs" ,
          "bar": true,
          "color": "#ccf",
          "values" : [{"label" : 2010, "value" : 514027} , {"label" : 2011, "value" : 534728},
                      {"label" : 2012, "value" : 539792} , {"label" : 2013, "value" : 546453},
                      {"label" : 2014, "value" : 509608} , {"label" : 2015, "value" : 525591},
                      {"label" : 2016, "value" : 820186} ]
        } ,
        {
          "key" : "Taxa de Crescimento Acumulado" ,
          "color" : "#ff7f0e",
          "values" : [{"label" : 2010, "value" : 0} , {"label" : 2011, "value" : 0.04} ,
                      {"label" : 2012, "value" : 0.01} , {"label" : 2013, "value" : 0.012},
                      {"label" : 2014, "value" : -0.067} , {"label" : 2015, "value" : 0.031},
                      {"label" : 2016, "value" : 0.56} ]
        }
        ]}];

  var jsonGrafico6 = [{"config":[",.1f",1000000000,""],"leg_X":"Ano","leg_Y":"em Bilhoes R$","tituloColuna":["Entidade", "Ano", "Valor Total"],"legenda":"Fonte: Senado Federal (2018). Elaboração própria. Nota: Referem-se aos valores executados (liquidados). Valores corrigidos para preços de janeiro de 2018 pelo IPCA/IBGE. Para calcular o valor do orçamento, foram excluídos os valores destinados ao serviço da dívida pública.","titulo":"Evolução de recursos públicos federais transferidos para entidades sem fins lucrativos e somente para OSCs (2010-2017)",
  series:[
        {
          "tipo_valor":"$",
          values: [{"x" : 2010, "y" : 6278480452 }, {"x" : 2011, "y" : 4898668291 },
          {"x" : 2012, "y" : 6688450140 }, {"x" : 2013, "y" : 8196459734}, {"x" : 2014, "y" : 8265271851},
           {"x" : 2015, "y" : 6744253807 }, {"x" : 2016, "y" : 4901355349 }, {"x" : 2017, "y" : 3252559195 }],
          key: 'ESFLs'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2010, "y" : 11440189630.5479 }, {"x" : 2011, "y" : 10054475412.4703 },
          {"x" : 2012, "y" : 10607810116.9065 }, {"x" : 2013, "y" : 11099497076.5084 }, {"x" : 2014, "y" : 12112818316.924 },
           {"x" : 2015, "y" : 11368502473.1809 }, {"x" : 2016, "y" : 2312173689.10068 }, {"x" : 2017, "y" : 6352490520.4482 }],
          key: 'OSCs'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2010, "y" : 2678099914.85083 }, {"x" : 2011, "y" : 1640846786.21371 },
          {"x" : 2012, "y" : 2433787954.02355 }, {"x" : 2013, "y" : 2664537618.54551 }, {"x" : 2014, "y" : 2498533417.99339 },
           {"x" : 2015, "y" : 1787719861.38991 }, {"x" : 2016, "y" : 353510128.429499 }, {"x" : 2017, "y" : 2229340028.59652 }],
          key: 'OSCs (Modalidade 50)'
        }
  ]}];

  createMultiBarChart('#graficoMain-1',jsonGrafico1);
//  createLinePlusBarChart('#graficoMain-2',jsonGrafico2);
//  createLineChart('#graficoMain-3',jsonGrafico3);
  createBarChart('#graficoMain-4',jsonGrafico4);
  createLinePlusBarChart('#graficoMain-5',jsonGrafico5);
  createLineChart('#graficoMain-6',jsonGrafico6);


  $("#tabelaMain-1").click(function(){
      createTabela_MultBar_Line(jsonGrafico1,false);
  });
/*
  $("#tabelaMain-2").click(function(){
      createTabela_MultBar_Line(jsonGrafico2,false);
  });

  $("#tabelaMain-3").click(function(){
      createTabela_MultBar_Line(jsonGrafico3,true);
  });
*/
  $("#tabelaMain-4").click(function(){
      createTabela_Bar_Donut(jsonGrafico4);
  });

  $("#tabelaMain-5").click(function(){
      createTabela_MultBar_Line(jsonGrafico5,false);
  });

  $("#tabelaMain-6").click(function(){
      createTabela_MultBar_Line(jsonGrafico6,true);
  });

} );

require(["rotas","bootstrap","jquery-ui" ], function (React) {

  var rotas = new Rotas();

  var urlCMS = rotas.getBaseUrlCMS();

  $.ajax({
    url: rotas.ModuloWebdoors(),
    type: 'GET',
    dataType: 'json',
    error: function(e){
        console.log("ERRO no AJAX :" + e);
        $('.loading').addClass('hide');
    },
    success: function(data){

      var src_link = '';
      var link_erro = "this.src='img/item_cms.png'";

      if(data.length > 0){

          for (var i in data) {
            var indicators = '';
            var listbox = '';

            if(i == 0){
              indicators += '<li data-target="#carousel-topo" data-slide-to="'+i+'" class="active"></li>';
              listbox += '<div class="item active">';
            }
            else {
              indicators += '<li data-target="#carousel-topo" data-slide-to="'+i+'"></li>';
              listbox += '<div class="item">';
            }

            if(data[i].tx_imagem_webdoor != null && data[i].tx_imagem_webdoor != ""){
              src_link =  urlCMS+'/imagens/webdoors/'+data[i].tx_imagem_webdoor;
            }
            else{
              src_link = 'img/item_cms.png';
            }

            listbox += '<a class="btn-item" href="'+data[i].tx_link_webdoor+'">';
            listbox += '<img src="'+src_link+'"  onerror="'+link_erro+';" alt="" title="Link para '+data[i].tx_titulo_webdoor+'">';
            listbox += '<div class="carousel-caption"><h4 class="legenda">'+data[i].tx_legenda_webdoor+'</h4></div>';

            if(data[i].tx_descricao_webdoor != null && data[i].tx_descricao_webdoor != ""){
                listbox += '<div class="carousel-caption carousel-descricao"><div">'+data[i].tx_descricao_webdoor+'</div></div>';
            }
            listbox += '</a></div>';

            $('.carousel-indicators').append(indicators);
            $('.carousel-inner').append(listbox);
          }
        }
        $('.loading').addClass('hide');
    }
  });


  var limiteAutocomplete = 10;
  var limiteAutocompleteCidade = 25;

  var flagMultiplo = true;
  var textoBusca = '';

  //botao de consulta
  var div = $(".tab-content");
  div.find(".btn.btn-primary").on("click", function(){
    var tabAtiva = div.find('.tab-pane.fade.active.in');
    var id = tabAtiva.attr("id");
    var val = tabAtiva.find(".form-control").val();
    val = replaceSpecialChars(val.trim()).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ',').replace(/\+{2,}/g, '_');
    var link;
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
		var link = './resultado-consulta.html?organizacao=' + replaceSpecialChars(ui.item.value.trim()).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ',').replace(/\+{2,}/g, '_') + '&tipoBusca=1';
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
     var link = "./resultado-consulta.html?"+'municipio'+"="+ui.item.id;
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
    var link = "./resultado-consulta.html?"+'estado'+"="+ui.item.id;
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
   var link = "./resultado-consulta.html?"+'regiao'+"="+ui.item.id;
   location.href=link;
  }
 });

 $(document).ready(function() {
  var itemWidth = "";

  if (navigator.geolocation){
       navigator.geolocation.getCurrentPosition(showPosition,showError);
  }else{
    verificarLocalidade();
  }

  function showPosition(position){
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    if(lat != undefined && lat != null && lat != "" && long != undefined && long != null && long != ""){

      window.localStorage.setItem('cd_latitude', lat.toLocaleString('PT'));
      window.localStorage.setItem('cd_longitude', long.toLocaleString('PT'));

      $.ajax({
        url: rotas.RecuperarMunicipio(lat, long),
        type: 'GET',
        async: true,
        dataType: 'json',
        error: function(e){
          verificarLocalidade();
        },
        success: function(data){
          if(data != null &&  data.length !== 0){
            window.localStorage.setItem('cd_localidade',  data[0].cd_localidade);
            window.localStorage.setItem('nome_localidade',  data[0].tx_nome_localidade);
            $("#btn-localidade").text(data[0].tx_nome_localidade);
          }
          mostrarAreaAtuacaoPersonalizada();
        }
      });
    } else{
      verificarLocalidade();
    }
  }

  function showError(error){
    verificarLocalidade();
  }

  function verificarLocalidade(){
    var cd_localidade = window.localStorage.getItem('cd_localidade');
    if(cd_localidade == "" || cd_localidade == null || cd_localidade == undefined){
      $('#modalLocalidade').modal('show');
    }
    mostrarAreaAtuacaoPersonalizada();
  }

  $('.ui-autocomplete-input').keypress(function(e) {
     var key = e.which;
     if(key == 13){
       $('.btn-primary').click();
       $('.ui-menu-item').hide();
       return false;
     }
  });

  function ResCarouselSize() {
      var itemsMainDiv = ('.MultiCarousel');
      var itemsDiv = ('.MultiCarousel-inner');

      var incno = 0;
      var dataItems = ("data-items");
      var itemClass = ('.item');
      var id = 0;
      var btnParentSb = '';
      var itemsSplit = '';
      var sampwidth = $(itemsMainDiv).width();
      var bodyWidth = $('body').width();

      $(itemsDiv).each(function () {
         id = id + 1;
         var itemNumbers = $(this).find(itemClass).length;
         var btnParentSb = $(this).parent().attr(dataItems);
         itemsSplit = btnParentSb.split(',');
         $(this).parent().attr("id", "MultiCarousel" + id);

         if (bodyWidth >= 1200) {
             incno = itemsSplit[3];
             itemWidth = 30 + (sampwidth / incno) ;
         }
         else if (bodyWidth >= 992) {
             incno = itemsSplit[2];
             itemWidth = ( sampwidth / incno);
         }
         else if (bodyWidth >= 768) {
             incno = itemsSplit[2];
             itemWidth = (sampwidth / incno);
         }
         else if (bodyWidth >= 400) {
             incno = itemsSplit[1];
             itemWidth = (sampwidth / incno);
         }
         else {
             incno = itemsSplit[0];
             itemWidth = (sampwidth / incno);
         }
         $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
         $(this).find(itemClass).each(function () {
             $(this).outerWidth(itemWidth);
         });

         $(".leftLst").addClass("over");
         $(".rightLst").removeClass("over");

      });
    }

     //this function used to move the items
     function ResCarousel(e, el, s) {
         var itemsDiv = ('.MultiCarousel-inner');

         var leftBtn = ('.leftLst');
         var rightBtn = ('.rightLst');
         var translateXval = '';
         var divStyle = $(el + ' ' + itemsDiv).css('transform');
         var values = divStyle.match(/-?[\d\.]+/g);
         var xds = Math.abs(values[4]);
         if (e == 0) {
             translateXval = parseInt(xds) - parseInt(itemWidth * s);
             $(el + ' ' + rightBtn).removeClass("over");

             if (translateXval <= itemWidth / 2) {
                 translateXval = 0;
                 $(el + ' ' + leftBtn).addClass("over");
             }
         }
         else if (e == 1) {
             var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
             translateXval = parseInt(xds) + parseInt(itemWidth * s);
             $(el + ' ' + leftBtn).removeClass("over");

             if (translateXval >= itemsCondition - itemWidth / 2) {
                 translateXval = itemsCondition;
                 $(el + ' ' + rightBtn).addClass("over");
             }
         }
         $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
     }

     //It is used to get some elements from btn
     function click(ell, ee) {
         var Parent = "#" + $(ee).parent().attr("id");
         var slide = $(Parent).attr("data-slide");
         ResCarousel(ell, Parent, slide);
     }

    function escolherRotaLocalidadeAreaAtuacao(cd_area_atuacao) {
      var cd_localidade = window.localStorage.getItem('cd_localidade');
      var cd_latitude = window.localStorage.getItem('cd_latitude');
      var cd_longitude = window.localStorage.getItem('cd_longitude');
      var rotaEscolhida;

      if(cd_latitude != undefined && cd_latitude != null && cd_latitude != "" && cd_longitude != undefined && cd_longitude != null && cd_longitude != ""){
        rotaEscolhida = rotas.RecuperarOscPorGeolocalizacaoAreaAtuacao(cd_area_atuacao, cd_latitude, cd_longitude);
      }
      else if(cd_localidade != undefined && cd_localidade != null && cd_localidade != "" ){
        rotaEscolhida = rotas.RecuperarOscPorLocalidadeAreaAtuacao(cd_area_atuacao, cd_localidade);
      }else{
        rotaEscolhida = rotas.RecuperarOscPorAreaAtuacao(cd_area_atuacao);
      }

      return rotaEscolhida;
    }

     function recuperarOscLocalidadeAreaAtuacao(cd_area_atuacao, nome_area_atuacao) {

       $.ajax({
         url: escolherRotaLocalidadeAreaAtuacao(cd_area_atuacao),
         type: 'GET',
         async: false,
         dataType: 'json',
         error: function(e){
           console.log("Erro no ajax: ");
           console.log(e);
         },
         success: function(data){

           $("#loading_top_5").hide();

           var tabela = '<center><h5 style="padding-top: 0px;"><b>'+nome_area_atuacao+'</b></h5></center>';
           tabela += '<div class="table-responsive">';
           tabela += '<table class="table table-hover">';
           var corpo = '<tbody>';
           if(data != null && data.length !== 0 ){

             for(var i = 0; i < data.length && i < 5; i++){
                var num_row = i + 1;
                corpo += '<tr>';
                corpo += '<th scope="row">'+num_row+'</th>';
                corpo += '  <td><a class="btn-item" onclick="location.href=\'visualizar-osc.html#'+data[i].id_osc+'\';" >'+data[i].tx_nome_osc+'</a></td>';
                corpo += '  <th scope="row"><a class="btn-item" onclick="location.href=\'visualizar-osc.html#'+data[i].id_osc+'\';"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a></th>';
                corpo += '</tr>';
             }
             corpo += '</tbody>';
           }
           else{
             corpo += '<tr>';
             corpo += '<th scope="row"><center>Nenhuma OSC encontrada.</center></th>';
             corpo += '</tr>';
           }
           tabela += corpo +'</table></div>';
           $("#top_5_area_atuacao").html(tabela);
         }
       });
     }

    function mostrarAreaAtuacaoPersonalizada() {

       $.ajax({
         url: rotas.AreaAtuacao(),
         type: 'GET',
         async: true,
         dataType: 'json',
         error: function(e){
           console.log("Erro no ajax: ");
           console.log(e);
         },
         success: function(data){
          var nome_area_atuacao = "";

           if(data != null && typeof data.length !== 'undefined'){
             var corpo = "";
             var cd_area_atuacao;
             for(var i = 0; i < data.length; i++){
               if(data[i].cd_area_atuacao != 1 && data[i].cd_area_atuacao != 10 ){
                  if(data[i].cd_area_atuacao == 2){
                    corpo += '<div class="item active">';
                    cd_area_atuacao = data[i].cd_area_atuacao;
                    nome_area_atuacao = data[i].tx_nome_area_atuacao;
                  }else{
                    corpo += '<div class="item">';
                  }
                  corpo += '<div class="col-xs-12"><a class="btn-item" data-btn='+data[i].cd_area_atuacao+' <center>';
                  corpo += '<img class="imgAreaAtuacao" src="img/area_atuacao_'+data[i].cd_area_atuacao+'.png" >';
                  corpo += '<h5><b>'+data[i].tx_nome_area_atuacao+'</b></h5></center></a></div></div>';
               }
             }

             $(".MultiCarousel-inner").append(corpo);
             $('.leftLst, .rightLst').click(function () {
                 var condition = $(this).hasClass("leftLst");
                 if (condition){
                     click(0, this);
                 }else{
                    click(1, this);
                 }
            });

             ResCarouselSize();

             $(window).resize(function () {
                 ResCarouselSize();
             });

             //botao de consulta top 5
             $(".MultiCarousel .item a").on("click", function(){
               cd_area_atuacao = $(this).attr("data-btn");
               nome_area_atuacao = $(this).text();
               recuperarOscLocalidadeAreaAtuacao(cd_area_atuacao, nome_area_atuacao);
             });

             recuperarOscLocalidadeAreaAtuacao(cd_area_atuacao, nome_area_atuacao);
           }
         }
       });
     }

     $.ajax({
       url: rotas.RecuperarOscAtualizacao(),
       type: 'GET',
       async: false,
       dataType: 'json',
       error: function(e){
         console.log("Erro no ajax: ");
         console.log(e);
       },
       success: function(data){

         $("#loading_top_10").hide();
         if(data != null && typeof data.length !== 'undefined'){

           var tabela = '<div class="table-responsive">';
           tabela += '<table class="table table-hover">';
           var corpo = '<tbody>';

           for(var i = 0; i < data.length && i < 10; i++){
              var num_row = i + 1;
              corpo += '<tr>';
              corpo += '<th scope="row">'+num_row+'</th>';
              corpo += '  <td><a class="btn-item" onclick="location.href=\'visualizar-osc.html#'+data[i].id_osc+'\';" >'+data[i].tx_nome_osc+'</a></td>';
              corpo += '  <th scope="row"><a class="btn-item" onclick="location.href=\'visualizar-osc.html#'+data[i].id_osc+'\';"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a></th>';
              corpo += '</tr>';
           }
           corpo += '</tbody>';
           tabela += corpo +'</table></div>';

           $("#top_10_atualizacao").html(tabela);

         }
       }
     });

 });

});
