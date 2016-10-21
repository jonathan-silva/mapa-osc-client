require(['jquery-ui'], function (React) {
  $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
} );


require(["nv.d3.lib","graficoParaTabela"], function (React) {

  var jsonGrafico1 = [{"tituloColuna":["Certificados", "Número de OSC"],"legenda":"fonte ...","titulo":"Títulos e certificações das OSCs", key: "Grafico 1", values: [{"label": "Fundação Privada", "value" : 8123 } ,  {"label": "Organização Religiosa", "value" : 41587 } , { "label": "Associação Privado", "value" : 391582}]} ];
  var jsonGrafico2 = [{"tituloColuna":["Certificados", "Número de OSC"],"legenda":"fonte ...","titulo":"Títulos e certificações das OSCs", key: "Grafico 3", values: [{"label": "Fundação Privada", "value" : 330521 } ,  {"label": "Organização Religiosa", "value" : 35621 } , { "label": "Associação Privado", "value" : 1837907}]} ];

  var jsonGrafico3 = [{"tituloColuna":["Certificados", "Número de OSC"],"legenda":"fonte ...","titulo":"Títulos e certificações das OSCs", key: "Grafico 3", values: [{"label" : "CEBAS Educação", "value" : 4 }, {"label" : "CEBAS Saúde", "value" : 200 } ,{ "label" : "CEBAS Assistência Social" , "value" : 498 }, {"label" : "OSCIP", "value" : 7991}]}];
  var jsonGrafico4 = [{"tituloColuna":["Certificados", "Número de OSC"],"legenda":"fonte ...","titulo":"Títulos e certificações das OSCs", key: "Grafico 4", values: [{"label" : "FINEP", "value" : 5 }, {"label" : "SALIC", "value" : 515 } , { "label" : "SLIE" , "value" : 656 } , {"label" : "SICONV", "value" : 1921} , { "label" : "Tituladas ou Certificadas" , "value" : 8693 }, { "label" : "SIAFI" , "value" : 68021 } ]}];



  var jsonGrafico5 = [{"tituloColuna":["Natureza Jurídica", "Região", "Quantidade"],"legenda":"fonte...","titulo":"Natureza jurídica das OSCs, por região",
  series:[
    {key: "Associação Privada", values: [{"label" : "SUDESTE", "value" : 139613 }, {"label" : "SUL", "value" : 81134 }, {"label" : "NORDESTE", "value" : 78358 }, {"label" : "CENTRO-OESTE", "value" : 20869 }, {"label" : "NORTE", "value" : 16331 }]},
    {key: "Organização Religiosa", values: [{"label" : "SUDESTE", "value" : 27133 }, {"label" : "SUL", "value" : 6780 }, {"label" : "NORDESTE", "value" : 6704 }, {"label" : "CENTRO-OESTE", "value" : 2930 }, {"label" : "NORTE", "value" : 2437 }]},
    {key: "Fundacao Privada", values: [{"label" : "SUDESTE", "value" : 3965 }, {"label" : "SUL", "value" : 1565 }, {"label" : "NORDESTE", "value" : 1725 }, {"label" : "CENTRO-OESTE", "value" : 622 }, {"label" : "NORTE", "value" : 301 }]},
    {key: "Organização Social", values: [{"label" : "SUDESTE", "value" : 414 }, {"label" : "SUL", "value" : 172 }, {"label" : "NORDESTE", "value" : 214 }, {"label" : "CENTRO-OESTE", "value" : 75 }, {"label" : "NORTE", "value" : 29 }]}
    ]}];


  var jsonGrafico6 = [{"tituloColuna":["", "Ano", "Valores"],"legenda":"fonte...","titulo":"Evolução anual dos repasses federais para as OSCs",
  series:[
    {
      values: [{"x" : 0, "y" : 200 }, {"x" : 10, "y" : 300 }, {"x" : 20, "y" : 800 }],
      key: 'Privada'
    },
    {
      values: [{"x" : 0, "y" : 800 }, {"x" : 10, "y" : 700 }, {"x" : 20, "y" : 600 }],
      key: 'Publica'
    },
    {
      values: [{"x" : 0, "y" : 500 }, {"x" : 10, "y" : 600 }, {"x" : 20, "y" : 100 }],
      key: 'Associação'
    }
  ]}];

  var jsonGrafico7 = [{"tituloColuna":["", "Ano", "Valores"],"legenda":"fonte...","titulo":"Evolução anual dos repasses federais para as OSCs",
  series:[
        {
          "key" : "Quantidade" ,
          "bar": true,
          "color": "#ccf",
          "values" : [ {"label" : 2005, "value" : 12710.0} , {"label" : 2006, "value" : 151000.0} , {"label" : 2007, "value" : 125000.0} , {"label" : 2008, "value" : 100} ]
        } ,
        {
          "key" : "Preço" ,
          "color" : "#333",
          "values" : [ {"label" : 2005, "value" : 71.89} , {"label" : 2006, "value" : 75.51} , {"label" : 2007, "value" : 68.49} , {"label" : 2008, "value" : 62.72} ]
        }
      ]}];



    var jsonGrafico8 =   [{"tituloColuna":["", "Ano", "Valores"],"legenda":"fonte...","titulo":"Evolução anual dos repasses federais para as OSCs",
    series:[
    {
      "key" : "North America" ,
      "values" : [{"label" : 2005, "value" : 71.89} , {"label" : 2006, "value" : 75.51} , {"label" : 2007, "value" : 58.49} , {"label" : 2008, "value" : 42.72}]
    },

    {
      "key" : "Africa" ,
      "values" : [{"label" : 2005, "value" : 91.89} , {"label" : 2006, "value" : 85.51} , {"label" : 2007, "value" : 68.49} , {"label" : 2008, "value" : 62.72}]
    }
  ]}];

  var jsonGrafico9 = [{"tituloColuna":["", "Ano", "Valores"],"legenda":"fonte...","titulo":"Evolução anual dos repasses federais para as OSCs",
  series:[
    {
      "key": "Series 1",
      "color": "#d67777",
      "values": [
        {
          "label" : "Group A" ,
          "value" : -1.87
        } ,
        {
          "label" : "Group B" ,
          "value" : -8.09
        } ,
        {
          "label" : "Group C" ,
          "value" : -0.57
        } ,
        {
          "label" : "Group D" ,
          "value" : -2.41
        }
      ]
    },
    {
      "key": "Series 2",
      "color": "#4f99b4",
      "values": [
        {
          "label" : "Group A" ,
          "value" : 25.30
        } ,
        {
          "label" : "Group B" ,
          "value" : 16.75
        } ,
        {
          "label" : "Group C" ,
          "value" : 18.45
        } ,
        {
          "label" : "Group D" ,
          "value" : 8.61
        }
      ]
    }
  ]}];


  createDonutChart('#grafico-1',jsonGrafico1);
  createDonutChart('#grafico-2',jsonGrafico2);
  createBarChart('#grafico-3',jsonGrafico3);
  createBarChart('#grafico-4',jsonGrafico4);
  createMultiBarChart('#grafico-5',jsonGrafico5);
  createLineChart('#grafico-6',jsonGrafico6);
  createLinePlusBarChart('#grafico-7',jsonGrafico7);
  createStackedAreaChart('#grafico-8',jsonGrafico8);
  createMultiBarHorizontalChart('#grafico-9',jsonGrafico9);

  $("#tabela-1").click(function(){
      createTabela_Bar_Donut(jsonGrafico1);
  });

  $("#tabela-2").click(function(){
      createTabela_Bar_Donut(jsonGrafico2);
  });

  $("#tabela-3").click(function(){
      createTabela_Bar_Donut(jsonGrafico3);
  });

  $("#tabela-4").click(function(){
      createTabela_Bar_Donut(jsonGrafico4);
  });

  $("#tabela-5").click(function(){
      createTabela_MultBar_Line(jsonGrafico5);
  });

  $("#tabela-6").click(function(){
      createTabela_MultBar_Line(jsonGrafico6, true);
  });

  $("#tabela-7").click(function(){
      createTabela_MultBar_Line(jsonGrafico7);
  });

  $("#tabela-8").click(function(){
      createTabela_MultBar_Line(jsonGrafico8);
  });

  $("#tabela-9").click(function(){
      createTabela_MultBar_Line(jsonGrafico9);
  });


  jQuery('#tabGrafico a').click(function (e) {
      e.preventDefault()
      jQuery(this).tab('show')
      jQuery(window).trigger('resize'); // Added this line to force NVD3 to redraw the chart
  })


} );
