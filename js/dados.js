require(['jquery-ui'], function (React) {
  $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
} );


require(["nv.d3.lib"], function (React) {

  var jsonGrafico3 = [{key: "Grafico 3", values: [{"label" : "CEBAS Educação", "value" : 4 }, {"label" : "CEBAS Saúde", "value" : 200 } ,{ "label" : "CEBAS Assistência Social" , "value" : 498 } , {"label" : "OSCIP", "value" : 7991}]}];
  var jsonGrafico4 = [{key: "Grafico 4", values: [{"label" : "FINEP", "value" : 5 }, {"label" : "SALIC", "value" : 515 } , { "label" : "SLIE" , "value" : 656 } , {"label" : "SICONV", "value" : 1921} , { "label" : "Tituladas ou Certificadas" , "value" : 8693 }, { "label" : "SIAFI" , "value" : 68021 } ]}];
  var jsonGrafico1 = [{"label": "Fundação Privada", "value" : 8123 } ,  {"label": "Organização Religiosa", "value" : 41587 } , { "label": "Associação Privado", "value" : 391582} ];
  var jsonGrafico2 = [{"label": "Fundação Privada", "value" : 330521 } ,  {"label": "Organização Religiosa", "value" : 35621 } , { "label": "Associação Privado", "value" : 1837907} ];

  createDonutChart('#grafico-1',jsonGrafico1);
  createDonutChart('#grafico-2',jsonGrafico2);
  createBarChart('#grafico-3',jsonGrafico3);
  createBarChart('#grafico-4',jsonGrafico4);

  jQuery('#tabGrafico a').click(function (e) {
      e.preventDefault()
      jQuery(this).tab('show')
      jQuery(window).trigger('resize'); // Added this line to force NVD3 to redraw the chart
  })

} );
