require(["nv.d3.lib","graficoParaTabela"], function (React) {
  var jsonGrafico1 = [{key: "GraficoMain 1", values: [{"label" : "FINEP", "value" : 5 }, {"label" : "SALIC", "value" : 515 } , { "label" : "SLIE" , "value" : 656 } , {"label" : "SICONV", "value" : 1921} , { "label" : "Tituladas ou Certificadas" , "value" : 8693 }, { "label" : "SIAFI" , "value" : 68021 } ]}];
  var jsonGrafico2 = [{"label": "Fundação Privada", "value" : 8123 } ,  {"label": "Organização Religiosa", "value" : 41587 } , { "label": "Associação Privado", "value" : 391582} ];
  var jsonGrafico3 = [{key: "Privada", values: [{"label" : "FINEP", "value" : 3355 }, {"label" : "CEBAS Educação", "value" : 4144 }, {"label" : "CEBAS Assistência Social", "value" : 1194 }]},
                      {key: "Publica", values: [{"label" : "FINEP", "value" : 3899 }, {"label" : "CEBAS Educação", "value" : 2155 }, {"label" : "CEBAS Assistência Social", "value" : 2124 }]},
                      {key: "Associacao", values: [{"label" : "FINEP", "value" : 4000 }, {"label" : "CEBAS Educação", "value" : 3166 }, {"label" : "CEBAS Assistência Social", "value" : 3144 }]}];

  createBarChart('#graficoMain-1',jsonGrafico1);
  createDonutChart('#graficoMain-2',jsonGrafico2);
  createMultiBarChart('#graficoMain-3',jsonGrafico3);

  $("#tabelaMain-1").click(function(){
      createTabela_Bar(jsonGrafico1, ["prime", "segundo"], "Transferência de Recursos para OSC nos últimos 12 meses", "fonte");
  });

  $("#tabelaMain-2").click(function(){
      createTabela_Donut(jsonGrafico2, ["prime", "segundo"], "OSCs que realizam parcerias com o Estado", "fonte 2015");
  });

  $("#tabelaMain-3").click(function(){
      createTabela_MultBar(jsonGrafico3, ["prime", "segundo","terceiro"], "Distribuição de OSCs por região", "fonte 2014");
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
