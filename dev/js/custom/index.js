require(["nv.d3.lib","graficoParaTabela"], function (React) {

  var jsonGrafico1 = [{"config":[",f",1,""],"leg_X":"Região","leg_Y":"Quantidade de OSC","tituloColuna":["Natureza Jurídica", "Região", "Quantidade de OSCs"],"legenda":"Fonte: Ministério do Trabalho (2014).","titulo":"Natureza jurídica das OSCs, por região",
  series:[
    {key: "Associação Privada", values: [{"label" : "SUDESTE", "value" : 139613 }, {"label" : "SUL", "value" : 81134 }, {"label" : "NORDESTE", "value" : 78358 }, {"label" : "CENTRO-OESTE", "value" : 20869 }, {"label" : "NORTE", "value" : 16331 }]},
    {key: "Organização Religiosa", values: [{"label" : "SUDESTE", "value" : 27133 }, {"label" : "SUL", "value" : 6780 }, {"label" : "NORDESTE", "value" : 6704 }, {"label" : "CENTRO-OESTE", "value" : 2930 }, {"label" : "NORTE", "value" : 2437 }]},
    {key: "Fundacao Privada", values: [{"label" : "SUDESTE", "value" : 3965 }, {"label" : "SUL", "value" : 1565 }, {"label" : "NORDESTE", "value" : 1725 }, {"label" : "CENTRO-OESTE", "value" : 622 }, {"label" : "NORTE", "value" : 301 }]},
    {key: "Organização Social", values: [{"label" : "SUDESTE", "value" : 414 }, {"label" : "SUL", "value" : 172 }, {"label" : "NORDESTE", "value" : 214 }, {"label" : "CENTRO-OESTE", "value" : 75 }, {"label" : "NORTE", "value" : 29 }]}
    ]}];

  var jsonGrafico2 = [{"config":[",f",1000000," M",",f"],"leg_X":"Ano","leg_Y":"Quantidade de OSC","tituloColuna":["", "Ano", "Valores"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016). Valores deflacionados pelo IPCA do mês corrente. Os valores exibidos referem-se aos valores efetivamente pagos para as organizações.","titulo":"Evolução anual dos repasses federais para as OSCs",
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

      var jsonGrafico3 = [{"config":[",f",1000000," M"],"leg_X":"Ano","leg_Y":"em R$","tituloColuna":["Divisão CNAE", "Ano da Parceria", "Valor Total Pago"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016). Valores deflacionados pelo IPCA do mês corrente. Os valores exibidos referem-se aos valores efetivamente pagos para as organizações.","titulo":"Evolução anual dos repasses federais para as OSCs, por área de atuação (Top 8)",
      series:[
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 1149281752.51223 }, {"x" : 2010, "y" : 1370599704.06939 }, {"x" : 2011, "y" : 2243048333.29452 },
          {"x" : 2012, "y" : 2010100871.52074 }, {"x" : 2013, "y" : 4035381660.66814}, {"x" : 2014, "y" : 1423769268.04441},
           {"x" : 2015, "y" : 957342180.798026 }, {"x" : 2016, "y" : 902306830.824239 }, {"x" : 2017, "y" : 21010449.45 }],
          key: 'Outras atividades de serviços'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 521990854.503395 }, {"x" : 2010, "y" : 360546843.720276 }, {"x" : 2011, "y" : 580381340.663934 },
          {"x" : 2012, "y" : 1051194273.37233 }, {"x" : 2013, "y" : 669777705.027443 }, {"x" : 2014, "y" : 696355633.344648 },
           {"x" : 2015, "y" : 388882391.342939 }, {"x" : 2016, "y" : 834576958.108925 }, {"x" : 2017, "y" : 2202831.33 }],
          key: 'Pesquisa e desenvolvimento científico'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 464619770.336309 }, {"x" : 2010, "y" : 461917799.643376 }, {"x" : 2011, "y" : 599091766.803416 },
          {"x" : 2012, "y" : 855340819.99516 }, {"x" : 2013, "y" : 755803809.619537 }, {"x" : 2014, "y" : 725242118.225837 },
           {"x" : 2015, "y" : 256422939.573475 }, {"x" : 2016, "y" : 312383155.632079 }, {"x" : 2017, "y" : 12080378.38 }],
          key: 'Educação'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 190266462.439417 }, {"x" : 2010, "y" : 370296173.18069 }, {"x" : 2011, "y" : 307239737.415565 },
           {"x" : 2012, "y" : 544651201.3966 }, {"x" : 2013, "y" : 403924237.012156 }, {"x" : 2014, "y" : 320214618.000476 },
           {"x" : 2015, "y" : 130731976.455409 }, {"x" : 2016, "y" : 126741687.356842 }, {"x" : 2017, "y" : 0}],
          key: 'Administração pública, defesa e seguridade social'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 114606332.541614 }, {"x" : 2010, "y" : 255161479.731741 }, {"x" : 2011, "y" : 223966380.293564 },
           {"x" : 2012, "y" : 340970062.160367 }, {"x" : 2013, "y" : 170448721.003335 }, {"x" : 2014, "y" : 201950796.716085 },
           {"x" : 2015, "y" : 35474927.649192 }, {"x" : 2016, "y" : 0 }, {"x" : 2017, "y" : 0 } ],
          key: 'Artes, cultura, esporte e recreação'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 235712925.631814 }, {"x" : 2010, "y" : 482092143.742933 }, {"x" : 2011, "y" : 2672851510.7148 },
          {"x" : 2012, "y" : 2125949559.5521 }, {"x" : 2013, "y" : 2337623934.53204 }, {"x" : 2014, "y" : 2914817844.690557 },
          {"x" : 2015, "y" : 1607460349.92118 }, {"x" : 2016, "y" : 1264118892.18268 }, {"x" : 2017, "y" : 106092383.55 }],
          key: 'Saúde humana e serviços sociais'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 0 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0 }, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 57620264.105342 }, {"x" : 2017, "y" : 934002.5 }],
          key: 'Outras atividades profissionais, científicas e técnicas'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 0 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0 }, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 0 }, {"x" : 2017, "y" : 1588477.75 }],
          key: 'Atividades dos serviços de tecnologia da informação'
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
  
  var flagMultiplo = true;
  var textoBusca = '';

  //botao de consulta
  var div = $(".tab-content");
  div.find(".btn.btn-primary").on("click", function(){
    var tabAtiva = div.find('.tab-pane.fade.active.in');
    var id = tabAtiva.attr("id");
    var val = tabAtiva.find(".form-control").val();
    val = replaceSpecialChars(val.trim()).replace(/[ -]/g, '+').replace(/\+{2,}/g, '+');
    var link;
    if (id == 'organizacao' && val !== ''){
      link = "./resultado-consulta.html?" + id + "=" + val + "&similaridade=05";
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
	   textoBusca = replaceSpecialChars(request.term.trim()).replace(/ /g, '+');
	   
       $.ajax({   
           url: controller,
           type: 'GET',
           dataType: "json",
           data: {flag: 'autocomplete', rota: rotas.AutocompleteOSCByName(textoBusca, limiteAutocomplete, '05')},
           success: function (data) {
        	   if(data.constructor === Array){
	        	   if(data.length == 1){
	        		   if(!data[0].bo_multiple){
	        			   flagMultiplo = false;
	        		   }
	        	   }
        	   }
        	   
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
		if(flagMultiplo){
			link = './resultado-consulta.html?organizacao=' + replaceSpecialChars(ui.item.value.trim()).replace(/[ -]/g, '+').replace(/\+{2,}/g, '+') + '&similaridade=99';
		}else{
			//link = "./resultado-consulta.html?"+'organizacao'+"="+textoBusca+"&similaridade=05";
			link = './resultado-consulta.html?organizacao=' + replaceSpecialChars(textoBusca.trim()).replace(/[ -]/g, '+').replace(/\+{2,}/g, '+') + '&similaridade=05';
		}
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
