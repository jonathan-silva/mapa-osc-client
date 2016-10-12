require(["nv.d3.lib"], function (React) {
  var jsonGrafico1 = [{key: "GraficoMain 1", values: [{"label" : "FINEP", "value" : 5 }, {"label" : "SALIC", "value" : 515 } , { "label" : "SLIE" , "value" : 656 } , {"label" : "SICONV", "value" : 1921} , { "label" : "Tituladas ou Certificadas" , "value" : 8693 }, { "label" : "SIAFI" , "value" : 68021 } ]}];
  var jsonGrafico2 = [{"label": "Fundação Privada", "value" : 8123 } ,  {"label": "Organização Religiosa", "value" : 41587 } , { "label": "Associação Privado", "value" : 391582} ];
  var jsonGrafico3 = [{key: "Privada", values: [{"label" : "FINEP", "value" : 3355 }, {"label" : "CEBAS Educação", "value" : 4144 }, {"label" : "CEBAS Assistência Social", "value" : 1194 }]},
                      {key: "Publica", values: [{"label" : "FINEP", "value" : 3899 }, {"label" : "CEBAS Educação", "value" : 2155 }, {"label" : "CEBAS Assistência Social", "value" : 2124 }]},
                      {key: "Associacao", values: [{"label" : "FINEP", "value" : 4000 }, {"label" : "CEBAS Educação", "value" : 3166 }, {"label" : "CEBAS Assistência Social", "value" : 3144 }]}];

  createBarChart('#graficoMain-1',jsonGrafico1);
  createDonutChart('#graficoMain-2',jsonGrafico2);
  createMultiBarChart('#graficoMain-3',jsonGrafico3);
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
    var link = "./resultado-consulta.html?"+id+"="+val;
    location.href=link;
    //console.log(link);
  });
});
