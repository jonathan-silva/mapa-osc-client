require(["nv.d3.lib","graficoParaTabela"], function (React) {

  var jsonGrafico1 = [{"config":[",f",1,""],"leg_X":"Região","leg_Y":"Quantidade de OSC","tituloColuna":["Natureza Jurídica", "Região", "Quantidade de OSCs"],"legenda":"Fonte: Ministério do Trabalho (2014).","titulo":"Natureza jurídica das OSCs, por região",
  series:[
    {key: "Associação Privada", values: [{"label" : "SUDESTE", "value" : 139613 }, {"label" : "SUL", "value" : 81134 }, {"label" : "NORDESTE", "value" : 78358 }, {"label" : "CENTRO-OESTE", "value" : 20869 }, {"label" : "NORTE", "value" : 16331 }]},
    {key: "Organização Religiosa", values: [{"label" : "SUDESTE", "value" : 27133 }, {"label" : "SUL", "value" : 6780 }, {"label" : "NORDESTE", "value" : 6704 }, {"label" : "CENTRO-OESTE", "value" : 2930 }, {"label" : "NORTE", "value" : 2437 }]},
    {key: "Fundacao Privada", values: [{"label" : "SUDESTE", "value" : 3965 }, {"label" : "SUL", "value" : 1565 }, {"label" : "NORDESTE", "value" : 1725 }, {"label" : "CENTRO-OESTE", "value" : 622 }, {"label" : "NORTE", "value" : 301 }]},
    {key: "Organização Social", values: [{"label" : "SUDESTE", "value" : 414 }, {"label" : "SUL", "value" : 172 }, {"label" : "NORDESTE", "value" : 214 }, {"label" : "CENTRO-OESTE", "value" : 75 }, {"label" : "NORTE", "value" : 29 }]}
    ]}];

  var jsonGrafico2 = [{"config":[",f",1000000," M",",f"],"leg_X":"Ano","leg_Y":"Quantidade de OSC","tituloColuna":["", "Ano", "Valores"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016). Valores deflacionados pelo IPCA do mês corrente.","titulo":"Evolução anual dos repasses federais para as OSCs",
  series:[
        {
          "key" : "Número OSC Parcerias" ,
          "bar": true,
          "color": "#8ed5ff",
          "values" : [ {"label" : 2009, "value" : 1020} , {"label" : 2010, "value" : 874} ,
                      {"label" : 2011, "value" : 16258} , {"label" : 2012, "value" : 16672},
                      {"label" : 2013, "value" : 16799} , {"label" : 2014, "value" : 17031},
                      {"label" : 2015, "value" : 15175} , {"label" : 2016, "value" : 16309},
                      {"label" : 2017, "value" : 1456}]
        } ,
        {
          "tipo_valor":"$",
          "key" : "Valor Total Pago" ,
          "color" : "#333",
          "values" : [ {"label" : 2009, "value" : 2097927848.90473} , {"label" : 2010, "value" : 2281962978.49661} ,
                      {"label" : 2011, "value" : 5549325689.21752} , {"label" : 2012, "value" : 6901981281.24876},
                      {"label" : 2013, "value" : 7062210861.9215} , {"label" : 2014, "value" : 7511003213.6233},
                      {"label" : 2015, "value" : 4872101423.21428} , {"label" : 2016, "value" : 5261215337.98598},
                      {"label" : 2017, "value" : 153863506.33} ]
        }
        ]}];

      var jsonGrafico3 = [{"config":[",f",1000000," M"],"leg_X":"Ano","leg_Y":"em R$","tituloColuna":["Divisão CNAE", "Ano da Parceria", "Valor Total Pago"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016). Valores deflacionados pelo IPCA do mês corrente.","titulo":"Evolução anual dos repasses federais para as OSCs, por área de atuação (Top 6)",
      series:[
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 738663644.485168 }, {"x" : 2010, "y" : 709177219.033217 }, {"x" : 2011, "y" : 1761337428.75283 },
          {"x" : 2012, "y" : 2043233034.80996 }, {"x" : 2013, "y" : 2296955271.39577}, {"x" : 2014, "y" : 2323105919.77762},
           {"x" : 2015, "y" : 1602899276.87772 }, {"x" : 2016, "y" : 1690021136.10126 }, {"x" : 2017, "y" : 25387914.55 }],
          key: 'Outras atividades de serviços'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 489934575.038326 }, {"x" : 2010, "y" : 302910502.523619 }, {"x" : 2011, "y" : 604362639.928777 },
          {"x" : 2012, "y" : 967526575.360216 }, {"x" : 2013, "y" : 691636557.400421}, {"x" : 2014, "y" : 698803557.190435 },
           {"x" : 2015, "y" : 435474748.202901 }, {"x" : 2016, "y" : 854250858.089767 }, {"x" : 2017, "y" : 2202831.33 }],
          key: 'Pesquisa e desenvolvimento científico'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 409394217.990992 }, {"x" : 2010, "y" : 414169669.963959 }, {"x" : 2011, "y" : 593151678.565846 },
          {"x" : 2012, "y" : 780110780.114055 }, {"x" : 2013, "y" : 746219199.068177 }, {"x" : 2014, "y" : 580216883.10774 },
           {"x" : 2015, "y" : 396765126.54998 }, {"x" : 2016, "y" : 406644205.761917}, {"x" : 2017, "y" : 14923735.38 }],
          key: 'Educação'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 146585281.137188 }, {"x" : 2010, "y" : 351169198.714895 }, {"x" : 2011, "y" : 300407874.209402 },
           {"x" : 2012, "y" : 412368128.266625 }, {"x" : 2013, "y" : 382154087.506097 }, {"x" : 2014, "y" : 273276546.290963 },
           {"x" : 2015, "y" : 160186852.569811 }, {"x" : 2016, "y" : 219178840.947294 }, {"x" : 2017, "y" : 1382533.91}],
          key: 'Administração pública, defesa e seguridade social'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 113905805.536032 }, {"x" : 2010, "y" : 186290377.810224 }, {"x" : 2011, "y" : 225345412.552933 },
           {"x" : 2012, "y" : 206878973.929389 }, {"x" : 2013, "y" : 311109585.370215 }, {"x" : 2014, "y" : 170590548.661313 },
           {"x" : 2015, "y" : 83943358.2585302 }, {"x" : 2016, "y" : 0 }, {"x" : 2017, "y" : 0 } ],
          key: 'Artes, cultura, esporte e recreação'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 81237557.922572 }, {"x" : 2010, "y" : 130647350.871644 }, {"x" : 2011, "y" : 1758617126.35443 },
          {"x" : 2012, "y" : 2113281932.68143 }, {"x" : 2013, "y" : 2223510156.0203 }, {"x" : 2014, "y" : 3056910559.48137 },
          {"x" : 2015, "y" : 2031853719.37485 }, {"x" : 2016, "y" : 1891689605.62197 }, {"x" : 2017, "y" : 106846367.52 }],
          key: 'Saúde humana e serviços sociais'
        }
      ]}];

  var jsonGrafico4 = [{"config":[",f",1,""],"leg_X":"Região","leg_Y":"Quantidade de OSC","tituloColuna":["Certificados", "Número de OSC"],"legenda":"Fonte: Ministério da Justiça (2016), Ministério da Educação (2013), Ministério da Saúde (2015), Ministério do Desenvolvimento Social (2015).","titulo":"Títulos e certificações das OSCs", key: "GraficoMain 4",
  values: [ {"label" : "OSCIP", "value" : 7124}, {"label" : "CEBAS/MDS", "value" : 3894 } ,
            { "label" : "CEBAS/MS" , "value" : 377 }, {"label" : "CEBAS/MEC", "value" : 5 } ]}];

  var jsonGrafico5 = [{"config":[",.1%",1,"",",f"],"leg_X":"Ano","leg_Y":"Quantidade de OSC","tituloColuna":["", "Ano", "Valores"],"legenda":"Fonte: Ministério do Trabalho (2014).","titulo":"Evolução do número de OSCs em atuação no país",
  series:[
        {
          "key" : "Número de OSCs" ,
          "bar": true,
          "color": "#ccf",
          "values" : [ {"label" : 2009, "value" : 365566} , {"label" : 2010, "value" : 367317} ,
                      {"label" : 2011, "value" : 381680} , {"label" : 2012, "value" : 388934},
                      {"label" : 2013, "value" : 385424} , {"label" : 2014, "value" : 391371} ]
        } ,
        {
          "key" : "Taxa de Crescimento Acumulado" ,
          "color" : "#ff7f0e",
          "values" : [ {"label" : 2009, "value" : 0} , {"label" : 2010, "value" : 0.004789} ,
                      {"label" : 2011, "value" : 0.038922} , {"label" : 2012, "value" : 0.062897},
                      {"label" : 2013, "value" : 0.053873} , {"label" : 2014, "value" : 0.069302} ]
        }
        ]}];

  createMultiBarChart('#graficoMain-1',jsonGrafico1);
  createLinePlusBarChart('#graficoMain-2',jsonGrafico2);
  createLineChart('#graficoMain-3',jsonGrafico3);
  createBarChart('#graficoMain-4',jsonGrafico4);
  createLinePlusBarChart('#graficoMain-5',jsonGrafico5);

  $("#tabelaMain-1").click(function(){
      createTabela_MultBar_Line(jsonGrafico1,false);
  });

  $("#tabelaMain-2").click(function(){
      createTabela_MultBar_Line(jsonGrafico2,false);
  });

  $("#tabelaMain-3").click(function(){
      createTabela_MultBar_Line(jsonGrafico3,true);
  });

  $("#tabelaMain-4").click(function(){
      createTabela_Bar_Donut(jsonGrafico4);
  });

  $("#tabelaMain-5").click(function(){
      createTabela_MultBar_Line(jsonGrafico5,false);
  });

} );

require(["jquery-ui", "rotas"], function (React) {

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

  var rotas = new Rotas();
  var limiteAutocomplete = 10;
  var limiteAutocompleteCidade = 25;
  var controller = "js/controller.php";

  //botao de consulta
  var div = $(".tab-content");
  div.find(".btn.btn-primary").on("click", function(){
    var tabAtiva = div.find('.tab-pane.fade.active.in');
    var id = tabAtiva.attr("id");
    var val = tabAtiva.find(".form-control").val();
    val = val.replace(/ /g, '+');//troca espaços por '+'
    val = replaceSpecialChars(val);
    var link;
    if (id == 'organizacao' && val !== ''){
      link = "./resultado-consulta.html?"+id+"="+val;
      location.href=link;
    }
    else {
      val = $('.response').val();
      console.log(val);
      if (val !== ''){
        link = "./resultado-consulta.html?"+id+"="+val;
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
       $.ajax({
           url: controller,
           type: 'GET',
           dataType: "json",
           data: {flag: 'autocomplete', rota: rotas.AutocompleteOSCByName(replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocomplete)},
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
     link = "./resultado-consulta.html?"+'organizacao'+"="+replaceSpecialChars(ui.item.value).replace(/ /g, '+');
     location.href=link;
   }
 });

  //autocomplete municipio
  $("#municipio .form-control").autocomplete({
    minLength: 3,
    source: function (request, response) {
       $.ajax({
           url: controller,//4204251
           type: 'GET',
           dataType: "json",
           data: {flag: 'autocomplete', rota: rotas.AutocompleteOSCByCounty(replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocompleteCidade)},
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
          url: controller,//4204251
          type: 'GET',
          dataType: "json",
          data: {flag: 'autocomplete', rota: rotas.AutocompleteOSCByState(replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocomplete)},
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
         url: controller,//4204251
         type: 'GET',
         dataType: "json",
         data: {flag: 'autocomplete', rota: rotas.AutocompleteOSCByRegion(replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocomplete)},
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

 $(document).ready(function() {
   $('.ui-autocomplete-input').keypress(function(e) {
     var key = e.which;
     if(key == 13){
       $('.btn-primary').click();
       $('.ui-menu-item').hide();
       return false;
     }
   });
 });

});
