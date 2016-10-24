require(["nv.d3.lib","graficoParaTabela"], function (React) {

  var jsonGrafico1 = [{"tituloColuna":["Natureza Jurídica", "Região", "Quantidade"],"legenda":"fonte...","titulo":"Natureza jurídica das OSCs, por região",
  series:[
    {key: "Associação Privada", values: [{"label" : "SUDESTE", "value" : 139613 }, {"label" : "SUL", "value" : 81134 }, {"label" : "NORDESTE", "value" : 78358 }, {"label" : "CENTRO-OESTE", "value" : 20869 }, {"label" : "NORTE", "value" : 16331 }]},
    {key: "Organização Religiosa", values: [{"label" : "SUDESTE", "value" : 27133 }, {"label" : "SUL", "value" : 6780 }, {"label" : "NORDESTE", "value" : 6704 }, {"label" : "CENTRO-OESTE", "value" : 2930 }, {"label" : "NORTE", "value" : 2437 }]},
    {key: "Fundacao Privada", values: [{"label" : "SUDESTE", "value" : 3965 }, {"label" : "SUL", "value" : 1565 }, {"label" : "NORDESTE", "value" : 1725 }, {"label" : "CENTRO-OESTE", "value" : 622 }, {"label" : "NORTE", "value" : 301 }]},
    {key: "Organização Social", values: [{"label" : "SUDESTE", "value" : 414 }, {"label" : "SUL", "value" : 172 }, {"label" : "NORDESTE", "value" : 214 }, {"label" : "CENTRO-OESTE", "value" : 75 }, {"label" : "NORTE", "value" : 29 }]}
    ]}];

  var jsonGrafico2 = [{"tituloColuna":["", "Ano", "Valores"],"legenda":"fonte...","titulo":"Evolução anual dos repasses federais para as OSCs",
  series:[
        {
          "key" : "Número OSC Parcerias" ,
          "bar": true,
          "color": "#ccf",
          "values" : [ {"label" : 2009, "value" : 1184} , {"label" : 2010, "value" : 1035} ,
                      {"label" : 2011, "value" : 16289} , {"label" : 2012, "value" : 16681},
                      {"label" : 2013, "value" : 16803} , {"label" : 2014, "value" : 17039},
                      {"label" : 2015, "value" : 15183} , {"label" : 2016, "value" : 15596} ]
        } ,
        {
          "key" : "Valor Total Pago" ,
          "color" : "#333",
          "values" : [ {"label" : 2009, "value" : 2114159898.04677} , {"label" : 2010, "value" : 2269350646.31726} ,
                      {"label" : 2011, "value" : 5483215571.02208} , {"label" : 2012, "value" : 6813078949.4345},
                      {"label" : 2013, "value" : 6977451931.98629} , {"label" : 2014, "value" : 7426759858.10878},
                      {"label" : 2015, "value" : 4813084434.41138} , {"label" : 2016, "value" : 14406692.3994473} ]
        }
        ]}];

      var jsonGrafico3 = [{"tituloColuna":["Divisão CNAE", "Ano da Parceria", "Valor Total Pago"],"legenda":"fonte...","titulo":"Evolução anual dos repasses federais para as OSCs, por área de atuação (Top 6)",
      series:[
        {
          values: [{"x" : 2009, "y" : 757928340.377431 }, {"x" : 2010, "y" : 708639328.866454 }, {"x" : 2011, "y" : 1740354298.16759 },
          {"x" : 2012, "y" : 2018891631.00759 }, {"x" : 2013, "y" : 2269591228.81008 }, {"x" : 2014, "y" : 2295430339.79941 },
           {"x" : 2015, "y" : 1584213974.1642 }, {"x" : 2016, "y" : 312296.741043859 }],
          key: 'Outras atividades de serviços'
        },
        {
          values: [{"x" : 2009, "y" : 484097896.047445 }, {"x" : 2010, "y" : 303847269.11452 }, {"x" : 2011, "y" : 597162758.754703 },
          {"x" : 2012, "y" : 949534513.426844 }, {"x" : 2013, "y" : 683396966.300754 }, {"x" : 2014, "y" : 688288089.296487 },
           {"x" : 2015, "y" : 425759121.345697 }, {"x" : 2016, "y" : 4214585.56417965 }],
          key: 'Atividades profissionais, científicas e técnicas'
        },
        {
          values: [{"x" : 2009, "y" : 406037907.400515 }, {"x" : 2010, "y" : 407216782.037449 }, {"x" : 2011, "y" : 586085355.597272 },
          {"x" : 2012, "y" : 770817179.635877 }, {"x" : 2013, "y" : 736696744.800751 }, {"x" : 2014, "y" : 572323668.680979 },
           {"x" : 2015, "y" : 388932614.739074 }, {"x" : 2016, "y" : 1828357.48131871 }],
          key: 'Educação'
        },
        {
          values: [{"x" : 2009, "y" : 144838984.234751 }, {"x" : 2010, "y" : 346985656.689466 }, {"x" : 2011, "y" : 296829061.001626 },
           {"x" : 2012, "y" : 407243472.130015 }, {"x" : 2013, "y" : 376707980.162947 }, {"x" : 2014, "y" : 269527107.036232 },
           {"x" : 2015, "y" : 158232886.634741 }, {"x" : 2016, "y" : 6394543.06033605 }],
          key: 'Administração pública, defesa e seguridade social'
        },
        {
          values: [{"x" : 2009, "y" : 113424468.717987 }, {"x" : 2010, "y" : 184376917.60289 }, {"x" : 2011, "y" : 222660831.994322 },
           {"x" : 2012, "y" : 204414387.385983 }, {"x" : 2013, "y" : 307403280.74648 }, {"x" : 2014, "y" : 168558272.675613 },
           {"x" : 2015, "y" : 82943325.8857725 }, {"x" : 2016, "y" : 0 }],
          key: 'Artes, cultura, esporte e recreação'
        },
        {
          values: [{"x" : 2009, "y" : 80309002.9774891 }, {"x" : 2010, "y" : 132045431.547993 }, {"x" : 2011, "y" : 1737666403.22248 },
          {"x" : 2012, "y" : 2088106023.71986 }, {"x" : 2013, "y" : 2197921587.69312 }, {"x" : 2014, "y" : 3029394940.8982 },
          {"x" : 2015, "y" : 2013085231.38928 }, {"x" : 2016, "y" : 1570825.04137601 }],
          key: 'Saúde humana e serviços sociais'
        }
      ]}];

  var jsonGrafico4 = [{"tituloColuna":["Certificados", "Número de OSC"],"legenda":"fonte ...","titulo":"Títulos e certificações das OSCs", key: "GraficoMain 4", values: [ {"label" : "OSCIP", "value" : 7124}, {"label" : "CEBAS/MDS", "value" : 3894 } , { "label" : "CEBAS/MS" , "value" : 377 }, {"label" : "CEBAS/MEC", "value" : 5 } ]}];

  createMultiBarChart('#graficoMain-1',jsonGrafico1);
  createLinePlusBarChart('#graficoMain-2',jsonGrafico2);
  createLineChart('#graficoMain-3',jsonGrafico3);
  createBarChart('#graficoMain-4',jsonGrafico4);

  $("#tabelaMain-1").click(function(){
      createTabela_MultBar_Line(jsonGrafico1);
  });

  $("#tabelaMain-2").click(function(){
      createTabela_MultBar_Line(jsonGrafico2);
  });

  $("#tabelaMain-3").click(function(){
      createTabela_MultBar_Line(jsonGrafico3,true);
  });

  $("#tabelaMain-4").click(function(){
      createTabela_Bar_Donut(jsonGrafico4);
  });

} );

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

  //autocomplete organizacao
  $("#organizacao .form-control").autocomplete({
    minLength: 3,
    source: function (request, response) {
       $.ajax({
           url: "http://mapaosc-desenv.ipea.gov.br:8383/api/search/osc/"+request.term,
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
           error: function () {
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
           url: "http://mapaosc-desenv.ipea.gov.br:8383/api/dictionary/geo/municipio/"+request.term,//4204251
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
           error: function () {
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
          url: "http://mapaosc-desenv.ipea.gov.br:8383/api/dictionary/geo/estado/"+request.term,//4204251
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
         url: "http://mapaosc-desenv.ipea.gov.br:8383/api/dictionary/geo/regiao/"+request.term,//4204251
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
});
