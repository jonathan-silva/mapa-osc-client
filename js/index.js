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
          "values" : [ {"label" : 2009, "value" : 1184} , {"label" : 2010, "value" : 1035} ,
                      {"label" : 2011, "value" : 16289} , {"label" : 2012, "value" : 16681},
                      {"label" : 2013, "value" : 16803} , {"label" : 2014, "value" : 17039},
                      {"label" : 2015, "value" : 15183} , {"label" : 2016, "value" : 15596} ]
        } ,
        {
          "tipo_valor":"$",
          "key" : "Valor Total Pago" ,
          "color" : "#333",
          "values" : [ {"label" : 2009, "value" : 2114159898.04677} , {"label" : 2010, "value" : 2269350646.31726} ,
                      {"label" : 2011, "value" : 5483215571.02208} , {"label" : 2012, "value" : 6813078949.4345},
                      {"label" : 2013, "value" : 6977451931.98629} , {"label" : 2014, "value" : 7426759858.10878},
                      {"label" : 2015, "value" : 4813084434.41138} , {"label" : 2016, "value" : 14406692.3994473} ]
        }
        ]}];

      var jsonGrafico3 = [{"config":[",f",1000000," M"],"leg_X":"Ano","leg_Y":"em R$","tituloColuna":["Divisão CNAE", "Ano da Parceria", "Valor Total Pago"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016). Valores deflacionados pelo IPCA do mês corrente.","titulo":"Evolução anual dos repasses federais para as OSCs, por área de atuação (Top 6)",
      series:[
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 757928340.377431 }, {"x" : 2010, "y" : 708639328.866454 }, {"x" : 2011, "y" : 1740354298.16759 },
          {"x" : 2012, "y" : 2018891631.00759 }, {"x" : 2013, "y" : 2269591228.81008 }, {"x" : 2014, "y" : 2295430339.79941 },
           {"x" : 2015, "y" : 1584213974.1642 }, {"x" : 2016, "y" : 312296.741043859 }],
          key: 'Outras atividades de serviços'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 484097896.047445 }, {"x" : 2010, "y" : 303847269.11452 }, {"x" : 2011, "y" : 597162758.754703 },
          {"x" : 2012, "y" : 949534513.426844 }, {"x" : 2013, "y" : 683396966.300754 }, {"x" : 2014, "y" : 688288089.296487 },
           {"x" : 2015, "y" : 425759121.345697 }, {"x" : 2016, "y" : 4214585.56417965 }],
          key: 'Atividades profissionais, científicas e técnicas'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 406037907.400515 }, {"x" : 2010, "y" : 407216782.037449 }, {"x" : 2011, "y" : 586085355.597272 },
          {"x" : 2012, "y" : 770817179.635877 }, {"x" : 2013, "y" : 736696744.800751 }, {"x" : 2014, "y" : 572323668.680979 },
           {"x" : 2015, "y" : 388932614.739074 }, {"x" : 2016, "y" : 1828357.48131871 }],
          key: 'Educação'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 144838984.234751 }, {"x" : 2010, "y" : 346985656.689466 }, {"x" : 2011, "y" : 296829061.001626 },
           {"x" : 2012, "y" : 407243472.130015 }, {"x" : 2013, "y" : 376707980.162947 }, {"x" : 2014, "y" : 269527107.036232 },
           {"x" : 2015, "y" : 158232886.634741 }, {"x" : 2016, "y" : 6394543.06033605 }],
          key: 'Administração pública, defesa e seguridade social'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 113424468.717987 }, {"x" : 2010, "y" : 184376917.60289 }, {"x" : 2011, "y" : 222660831.994322 },
           {"x" : 2012, "y" : 204414387.385983 }, {"x" : 2013, "y" : 307403280.74648 }, {"x" : 2014, "y" : 168558272.675613 },
           {"x" : 2015, "y" : 82943325.8857725 }, {"x" : 2016, "y" : 0 }],
          key: 'Artes, cultura, esporte e recreação'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 80309002.9774891 }, {"x" : 2010, "y" : 132045431.547993 }, {"x" : 2011, "y" : 1737666403.22248 },
          {"x" : 2012, "y" : 2088106023.71986 }, {"x" : 2013, "y" : 2197921587.69312 }, {"x" : 2014, "y" : 3029394940.8982 },
          {"x" : 2015, "y" : 2013085231.38928 }, {"x" : 2016, "y" : 1570825.04137601 }],
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
    str = str.replace(/[ÀÁÂÃÄÅ]/,"A");
    str = str.replace(/[àáâãäå]/,"a");
    str = str.replace(/[ÉÈÊË]/,"E");
    str = str.replace(/[éèêë]/,"e");
    str = str.replace(/[ÍÌÎÏ]/,"I");
    str = str.replace(/[íìîï]/,"i");
    str = str.replace(/[ÓÒÔÕ]/,"O");
    str = str.replace(/[óòôõ]/,"o");
    str = str.replace(/[ÚÙÛÜ]/,"U");
    str = str.replace(/[úùûü]/,"u");
    str = str.replace(/[Ç]/,"C");
    str = str.replace(/[ç]/,"c");
    console.log(str);
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
     link = "./resultado-consulta.html?"+'organizacao'+"="+ui.item.value.replace(/ /g, '+');
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
