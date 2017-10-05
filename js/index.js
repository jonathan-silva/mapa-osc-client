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

  var jsonGrafico1 = [{"config":[",f",1,""],"leg_X":"Região","leg_Y":"Quantidade de OSC","tituloColuna":["Natureza Jurídica", "Região", "Quantidade de OSCs"],"legenda":"Fonte: Ministério do Trabalho (2014).","titulo":"Número de OSCs por natureza jurídica e região, Brasil - 2014",
  series:[
    {key: "Associação Privada", values: [{"label" : "SUDESTE", "value" : 139613 }, {"label" : "SUL", "value" : 81134 }, {"label" : "NORDESTE", "value" : 78358 }, {"label" : "CENTRO-OESTE", "value" : 20869 }, {"label" : "NORTE", "value" : 16331 }]},
    {key: "Organização Religiosa", values: [{"label" : "SUDESTE", "value" : 27133 }, {"label" : "SUL", "value" : 6780 }, {"label" : "NORDESTE", "value" : 6704 }, {"label" : "CENTRO-OESTE", "value" : 2930 }, {"label" : "NORTE", "value" : 2437 }]},
    {key: "Fundacao Privada", values: [{"label" : "SUDESTE", "value" : 3965 }, {"label" : "SUL", "value" : 1565 }, {"label" : "NORDESTE", "value" : 1725 }, {"label" : "CENTRO-OESTE", "value" : 622 }, {"label" : "NORTE", "value" : 301 }]},
    {key: "Organização Social", values: [{"label" : "SUDESTE", "value" : 414 }, {"label" : "SUL", "value" : 172 }, {"label" : "NORDESTE", "value" : 214 }, {"label" : "CENTRO-OESTE", "value" : 75 }, {"label" : "NORTE", "value" : 29 }]}
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

      var jsonGrafico3 = [{"config":[",f",1000000," M"],"leg_X":"Ano","leg_Y":"em R$","tituloColuna":["Divisão CNAE", "Ano da Parceria", "Valor Total Pago"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016). Valores deflacionados pelo IPCA do mês corrente. Os valores exibidos referem-se aos valores efetivamente pagos para as organizações.","titulo":"Evolução anual dos repasses federais para as OSCs por área de atuação (Top 8), Brasil - 2009-2017",
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

  var jsonGrafico4 = [{"config":[",f",1,""],"leg_X":"Tipo de título ou certificação","leg_Y":"Quantidade de OSC","tituloColuna":["Títulos e Certificados", "Número de OSC"],"legenda":"Fonte: Ministério da Justiça (2016), Ministério da Educação (2013), Ministério da Saúde (2015), Ministério do Desenvolvimento Social (2015).","titulo":"Número de organizações civis com títulos e certificações, Brasil - 2014", key: "GraficoMain 4",
  values: [ {"label" : "OSCIP", "value" : 7124}, {"label" : "CEBAS/MDS", "value" : 3894 } ,
            { "label" : "CEBAS/MS" , "value" : 377 }, {"label" : "CEBAS/MEC", "value" : 5 } ]}];

  var jsonGrafico5 = [{"config":[",.1%",1,"",",f"],"leg_X":"Ano","leg_Y":"Quantidade de OSC","tituloColuna":["", "Ano", "Valores"],"legenda":"Fonte: Ministério do Trabalho (2009-2014).","titulo":"Evolução do número de OSCs ativas, Brasil - 2009-2014",
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

require(["bootstrap","jquery-ui", "rotas"], function (React) {

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
	   textoBusca = replaceSpecialChars(request.term.trim()).replace(/ /g, '+');

       $.ajax({
           url: controller,
           type: 'GET',
           dataType: "json",
           data: {flag: 'autocomplete', rota: rotas.AutocompleteOSCByName(textoBusca, limiteAutocomplete, 2)},
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
			link = './resultado-consulta.html?organizacao=' + replaceSpecialChars(ui.item.value.trim()).replace(/[ -]/g, '+').replace(/\+{2,}/g, '+') + '&tipoBusca=1';
		}else{
			link = './resultado-consulta.html?organizacao=' + replaceSpecialChars(textoBusca.trim()).replace(/[ -]/g, '+').replace(/\+{2,}/g, '+') + '&tipoBusca=0';
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
  var itemWidth = "";

  if (navigator.geolocation){
       navigator.geolocation.getCurrentPosition(showPosition,showError);
  }else{
    verificarLocalidade();
  }

  function showPosition(position){
    window.localStorage.setItem('cd_latitude',   position.coords.latitude);
    window.localStorage.setItem('cd_longitude',  position.coords.longitude);

    $.ajax({
      url: controller,
      type: 'GET',
      async: true,
      dataType: 'json',
      data:{flag: 'consulta', rota:  rotas.RecuperarMunicipio(position.coords.latitude, position.coords.longitude)},
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
  }

  function showError(error){
    verificarLocalidade();
  }

  function verificarLocalidade(){
    cd_localidade = window.localStorage.getItem('cd_localidade');
    if(cd_localidade == ""){
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
         btnParentSb = $(this).parent().attr(dataItems);
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
      cd_localidade = window.localStorage.getItem('cd_localidade');
      cd_latitude = window.localStorage.getItem('cd_latitude');
      cd_longitude = window.localStorage.getItem('cd_longitude');
      var rotaEscolhida;

      if(cd_latitude != "" && cd_longitude != "" ){
        rotaEscolhida = rotas.RecuperarOscPorGeolocalizacaoAreaAtuacao(cd_area_atuacao, cd_latitude, cd_longitude);
      }
      else if(cd_localidade != "" ){
        rotaEscolhida = rotas.RecuperarOscPorLocalidadeAreaAtuacao(cd_area_atuacao, cd_localidade);
      }else{
        rotaEscolhida = rotas.RecuperarOscPorAreaAtuacao(cd_area_atuacao);
      }

      return rotaEscolhida;
    }

     function recuperarOscLocalidadeAreaAtuacao(cd_area_atuacao, nome_area_atuacao) {

       $.ajax({
         url: controller,
         type: 'GET',
         async: false,
         dataType: 'json',
         data: {flag: 'consulta', rota: escolherRotaLocalidadeAreaAtuacao(cd_area_atuacao)},
         error: function(e){
           console.log("Erro no ajax: ");
           console.log(e);
         },
         success: function(data){

           $("#loading_top_5").hide();

           tabela = '<center><h5 style="padding-top: 0px;"><b>'+nome_area_atuacao+'</b></h5></center>';
           tabela += '<div class="table-responsive">';
           tabela += '<table class="table table-hover">';
           corpo = '<tbody>';
           if(data != null && data.length !== 0 ){

             for(var i = 0; i < data.length && i < 5; i++){
                num_row = i + 1;
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
         url: controller,
         type: 'GET',
         async: true,
         dataType: 'json',
         data:{flag: 'consulta', rota:  rotas.AreaAtuacao()},
         error: function(e){
           console.log("Erro no ajax: ");
           console.log(e);
         },
         success: function(data){

           if(data != null && typeof data.length !== 'undefined'){
             corpo = "";
             for(var i = 0; i < data.length; i++){
               if(data[i].cd_area_atuacao != 10 && data[i].tx_nome_area_atuacao != "Outros"){
                  if(i == 0){
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
       url: controller,
       type: 'GET',
       async: false,
       dataType: 'json',
       data: {flag: 'consulta', rota: rotas.RecuperarOscAtualizacao()},
       error: function(e){
         console.log("Erro no ajax: ");
         console.log(e);
       },
       success: function(data){

         $("#loading_top_10").hide();
         if(data != null && typeof data.length !== 'undefined'){

           tabela = '<div class="table-responsive">';
           tabela += '<table class="table table-hover">';
           corpo = '<tbody>';

           for(var i = 0; i < data.length && i < 10; i++){
              num_row = i + 1;
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
