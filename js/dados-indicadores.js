require(['jquery-ui'], function (React) {
  $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );

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

});


require(["nv.d3.lib","graficoParaTabela"], function (React) {

  var jsonGrafico1 = [{"config":[",f","1",""],"leg_X":"Região","leg_Y":"Quantidade de OSCs","tituloColuna":["Número de Empregados", "Região", "Quantidade de OSCs"],"legenda":"Fonte: Ministério do Trabalho (2014).","titulo":"1- Distribuição das OSCs por número de Empregados e Região",
  series:[
    {key: "0", values: [{"label" : "Sudeste", "value" : 127866 }, {"label" : "Sul", "value" : 73278 }, {"label" : "Nordeste", "value" : 75689 }, {"label" : "Centro-Oeste", "value" : 17885 }, {"label" : "Norte", "value" : 15844 }]},
    {key: "1 a 4", values: [{"label" : "Sudeste", "value" : 22644 }, {"label" : "Sul", "value" : 9100 }, {"label" : "Nordeste", "value" : 6798 }, {"label" : "Centro-Oeste", "value" : 3943 }, {"label" : "Norte", "value" : 1943 }]},
    {key: "5 a 19", values: [{"label" : "Sudeste", "value" : 11816 }, {"label" : "Sul", "value" : 4472 }, {"label" : "Nordeste", "value" : 2656 }, {"label" : "Centro-Oeste", "value" : 1678 }, {"label" : "Norte", "value" : 821 }]},
    {key: "20 a 99", values: [{"label" : "Sudeste", "value" : 6589 }, {"label" : "Sul", "value" : 2140 }, {"label" : "Nordeste", "value" : 1370 }, {"label" : "Centro-Oeste", "value" : 749 }, {"label" : "Norte", "value" : 364 }]},
    {key: "100 ou mais", values: [{"label" : "Sudeste", "value" : 2210 }, {"label" : "Sul", "value" : 661 }, {"label" : "Nordeste", "value" : 488 }, {"label" : "Centro-Oeste", "value" : 241 }, {"label" : "Norte", "value" : 126 }]}
    ]}];

    var jsonGrafico2 = [{"config":[",f","1",""],"leg_X":"Região","leg_Y":"Quantidade de Empregos","tituloColuna":["Região", "Número de Empregos nas OSCs"],"legenda":"Fonte: Ministério do Trabalho (2014).","titulo":"2- Empregos formais nas OSCs, por natureza jurídica e região", key: "Grafico 2", values: [{"label" : "Sudeste", "value" : 1347407 }, {"label" : "Sul", "value" : 403905 }, { "label" : "Nordeste" , "value" : 310339 }, {"label" : "Centro-Oeste", "value" : 157331}, {"label" : "Norte", "value" : 67401}]}];
    var jsonGrafico3 = [{"config":[",f","1",""],"leg_X":"","leg_Y":"","tituloColuna":["Atividade Econômica", "Número de OSC"],"legenda":"Fonte: Ministério do Trabalho (2014).","titulo":"3- Atividade econômica das OSCs", key: "Grafico 3", values: [
      {"label": "Outras atividades de serviços", "value" : 318663 }, {"label": "Artes, cultura, esporte e recreação", "value" : 27842 },
      {"label": "Saúde humana e serviços sociais", "value" : 18774}, {"label": "Educação", "value" : 16682},
      { "label": "Outras", "value" : 9410}
    ]}];
    var jsonGrafico4 = [{"config":[",f","1",""],"leg_X":"Região","leg_Y":"Quantidade de OSCs","tituloColuna":["Região", "Número de OSC"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016).","titulo":"4- OSCs com parcerias com o Governo Federal, por região", key: "Grafico 4", values: [{"label" : "Sudeste", "value" : 8656 }, {"label" : "Nordeste", "value" : 5073 } ,{ "label" : "Sul" , "value" : 4407 }, {"label" : "Centro-Oeste", "value" : 1439}, {"label" : "Norte", "value" : 1257}]}];

    var jsonGrafico5 = [{"config":[",f","1",""],"leg_X":"Ano","leg_Y":"Quantidade de OSCs","tituloColuna":["Tipo", "Ano da Parceria", "Total OSCs "],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016).","titulo":"5- Evolução anual de OSCs com parcerias com o Governo Federal, por instrumento de parceria",
      series:[
        {
          values: [{"x" : 2009, "y" : 124 }, {"x" : 2010, "y" : 118 }, {"x" : 2011, "y" : 38 },
          {"x" : 2012, "y" : 9 }, {"x" : 2013, "y" : 21 }, {"x" : 2014, "y" : 60 },
           {"x" : 2015, "y" : 56 }, {"x" : 2016, "y" : 12 }],
          key: 'Contrato de repasse'
        },
        {
          values: [{"x" : 2009, "y" : 874 }, {"x" : 2010, "y" : 593 }, {"x" : 2011, "y" : 72 },
          {"x" : 2012, "y" : 51 }, {"x" : 2013, "y" : 55 }, {"x" : 2014, "y" : 57 },
           {"x" : 2015, "y" : 78 }, {"x" : 2016, "y" : 377 }],
          key: 'Convênio'
        },
        {
          values: [{"x" : 2009, "y" : 101 }, {"x" : 2010, "y" : 145 }, {"x" : 2011, "y" : 60 },
          {"x" : 2012, "y" : 115 }, {"x" : 2013, "y" : 96 }, {"x" : 2014, "y" : 69 },
           {"x" : 2015, "y" : 13 }, {"x" : 2016, "y" : 15 }],
          key: 'Financiamento - Finep'
        },
        {
          values: [{"x" : 2009, "y" : 20 }, {"x" : 2010, "y" : 5 }, {"x" : 2011, "y" : 1 },
           {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0 }, {"x" : 2014, "y" : 0 },
           {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 0 }],
          key: 'Incentivo à cultura'
        },
        {
          values: [{"x" : 2009, "y" : 133 }, {"x" : 2010, "y" : 221 }, {"x" : 2011, "y" : 288 },
           {"x" : 2012, "y" : 290 }, {"x" : 2013, "y" : 310 }, {"x" : 2014, "y" : 313 },
           {"x" : 2015, "y" : 290 }, {"x" : 2016, "y" : 23 }],
          key: 'Incentivo ao esporte'
        },
        {
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 15961 },
          {"x" : 2012, "y" : 16381 }, {"x" : 2013, "y" : 16474 }, {"x" : 2014, "y" : 16697 },
          {"x" : 2015, "y" : 14875 }, {"x" : 2016, "y" : 15480 }],
          key: 'Outras transferências voluntárias'
        },
        {
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 0 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0}, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 1 }],
          key: 'Termo de colaboração'
        },
        {
          values: [{"x" : 2009, "y" : 13 }, {"x" : 2010, "y" : 9}, {"x" : 2011, "y" : 1 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0 }, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 0 }],
          key: 'Termo de parceria'
        }
      ]}];

      var jsonGrafico6 = [{"config":[",f","1000000"," M"],"leg_X":"Ano","leg_Y":"em R$","tipo_valor":"$","tituloColuna":["Tipo", "Ano da Parceria", "Valor Pago"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016).","titulo":"6- Evolução anual dos repasses federais para OSCs, por instrumento de parceria",
      series:[
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 117485488.832751 }, {"x" : 2010, "y" : 59418862.1009088 }, {"x" : 2011, "y" : 0 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0 }, {"x" : 2014, "y" : 285847.615435015 },
           {"x" : 2015, "y" : 131775.011055224 }, {"x" : 2016, "y" : 0 }],
          key: 'Contrato de repasse'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 812818806.306349 }, {"x" : 2010, "y" : 507949244.466716 }, {"x" : 2011, "y" : 226952358.551096 },
          {"x" : 2012, "y" : 267119167.702857 }, {"x" : 2013, "y" : 186754675.637313 }, {"x" : 2014, "y" : 135049823.862428 },
           {"x" : 2015, "y" : 69208250.681497 }, {"x" : 2016, "y" : 11196506.7597798 }],
          key: 'Convênio'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 991524357.183733 }, {"x" : 2010, "y" : 1331433440.56587 }, {"x" : 2011, "y" : 320989210.485139 },
          {"x" : 2012, "y" : 798471786.746614 }, {"x" : 2013, "y" : 544811612.892457 }, {"x" : 2014, "y" : 326763638.498929 },
           {"x" : 2015, "y" : 6422300.51817535 }, {"x" : 2016, "y" : 0 }],
          key: 'Financiamento - Finep'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 37355942.2840324 }, {"x" : 2010, "y" : 24952515.0231117 }, {"x" : 2011, "y" : 241621.688160153 },
           {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0 }, {"x" : 2014, "y" : 0 },
           {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 0 }],
          key: 'Incentivo à cultura'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 150266174.631821 }, {"x" : 2010, "y" : 248477474.659914 }, {"x" : 2011, "y" : 273974557.84458 },
           {"x" : 2012, "y" : 255718553.192126 }, {"x" : 2013, "y" : 265014931.449886 }, {"x" : 2014, "y" : 241438604.943388 },
           {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 0 }],
          key: 'Incentivo ao esporte'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 4629150164.16317 },
          {"x" : 2012, "y" : 5491769441.7929 }, {"x" : 2013, "y" : 5980870712.00663 }, {"x" : 2014, "y" : 6723221943.1886 },
          {"x" : 2015, "y" : 4737322108.20066 }, {"x" : 2016, "y" : 0 }],
          key: 'Outras transferências voluntárias'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 0 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0}, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 3210185.63966751 }],
          key: 'Termo de colaboração'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 4709128.80808857 }, {"x" : 2010, "y" : 97119109.500742}, {"x" : 2011, "y" : 31907658.2899321 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0 }, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 0 }],
          key: 'Termo de parceria'
        }
      ]}];

      var jsonGrafico7 = [{"config":[",f","1",""],"leg_X":"Ano","leg_Y":"Quantidade de OSCs","tituloColuna":["Divisão", "Ano da Parceria", "Total OSCs"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016).","titulo":"7- Evolução anual de OSCs com parcerias com o Governo Federal, por tamanho da OSC",
        series:[
          {
            values: [{"x" : 2009, "y" : 397 }, {"x" : 2010, "y" : 365 }, {"x" : 2011, "y" : 13237 },
            {"x" : 2012, "y" : 13668 }, {"x" : 2013, "y" : 13681 }, {"x" : 2014, "y" : 13906 },
             {"x" : 2015, "y" : 13313 }, {"x" : 2016, "y" : 12874 }],
            key: '0'
          },
          {
            values: [{"x" : 2009, "y" : 193 }, {"x" : 2010, "y" : 171 }, {"x" : 2011, "y" : 553 },
            {"x" : 2012, "y" : 498 }, {"x" : 2013, "y" : 513 }, {"x" : 2014, "y" : 512 },
             {"x" : 2015, "y" : 317 }, {"x" : 2016, "y" : 392 }],
            key: '1 a 4'
          },
          {
            values: [{"x" : 2009, "y" : 201 }, {"x" : 2010, "y" : 164 }, {"x" : 2011, "y" : 838 },
            {"x" : 2012, "y" : 800 }, {"x" : 2013, "y" : 847 }, {"x" : 2014, "y" : 852 },
             {"x" : 2015, "y" : 284 }, {"x" : 2016, "y" : 699 }],
            key: '5 a 19'
          },
          {
            values: [{"x" : 2009, "y" : 189 }, {"x" : 2010, "y" : 165 }, {"x" : 2011, "y" : 913 },
             {"x" : 2012, "y" : 927 }, {"x" : 2013, "y" : 977 }, {"x" : 2014, "y" : 973 },
             {"x" : 2015, "y" : 500 }, {"x" : 2016, "y" : 904 }],
            key: '20 a 99'
          },
          {
            values: [{"x" : 2009, "y" : 204 }, {"x" : 2010, "y" : 170 }, {"x" : 2011, "y" : 748 },
             {"x" : 2012, "y" : 788 }, {"x" : 2013, "y" : 785 }, {"x" : 2014, "y" : 796 },
             {"x" : 2015, "y" : 769 }, {"x" : 2016, "y" : 727 }],
            key: '100 ou mais'
          }
        ]}];

        var jsonGrafico8 = [{"config":[",f","1000000"," M"],"leg_X":"Ano","leg_Y":"em R$","tituloColuna":["Divisão", "Ano da Parceria", "Valor Pago"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016).","titulo":"8- Evolução anual dos repasses federais para as OSCs, por área de atuação (Top 6)",
        series:[
          {
            "tipo_valor":"$",
            values: [{"x" : 2009, "y" : 259438198.759741 }, {"x" : 2010, "y" : 197129939.129687 }, {"x" : 2011, "y" : 602682282.573246 },
            {"x" : 2012, "y" : 560235930.077152 }, {"x" : 2013, "y" : 616382970.605714 }, {"x" : 2014, "y" : 444139293.567779 },
             {"x" : 2015, "y" : 322321988.677237 }, {"x" : 2016, "y" : 499674.785670175 }],
            key: '0'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2009, "y" : 170267648.314439 }, {"x" : 2010, "y" : 123976508.534449 }, {"x" : 2011, "y" : 138734872.34953 },
            {"x" : 2012, "y" : 151119349.753281 }, {"x" : 2013, "y" : 98475885.4930064 }, {"x" : 2014, "y" : 73709109.688392 },
             {"x" : 2015, "y" : 39754116.4025914 }, {"x" : 2016, "y" : 0 }],
            key: '1 a 4'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2009, "y" : 195520210.800048 }, {"x" : 2010, "y" : 273588886.394731 }, {"x" : 2011, "y" : 361776354.529576 },
            {"x" : 2012, "y" : 406796100.342595 }, {"x" : 2013, "y" : 420866960.791592 }, {"x" : 2014, "y" : 545145868.304699 },
             {"x" : 2015, "y" : 262400362.349181 }, {"x" : 2016, "y" : 7420586.15966751 }],
            key: '5 a 19'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2009, "y" : 337364209.337626 }, {"x" : 2010, "y" : 420215525.860733 }, {"x" : 2011, "y" : 708270768.603938 },
             {"x" : 2012, "y" : 806608303.664065 }, {"x" : 2013, "y" : 897737331.935403 }, {"x" : 2014, "y" : 694525582.370983 },
             {"x" : 2015, "y" : 353834840.124651 }, {"x" : 2016, "y" : 435884.511193018 }],
            key: '20 a 99'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2009, "y" : 1151569630.83492}, {"x" : 2010, "y" : 1254439786.39766 }, {"x" : 2011, "y" : 3671751292.96579 },
             {"x" : 2012, "y" : 4888319265.59741 }, {"x" : 2013, "y" : 4943988783.16058 }, {"x" : 2014, "y" : 5669240004.17692 },
             {"x" : 2015, "y" : 3834773126.85772 }, {"x" : 2016, "y" : 6050546.9429166 }],
            key: '100 ou mais'
          }
        ]}];

    var jsonGrafico9 = [{"config":[",f","1",""],"leg_X":"","leg_Y":"","tituloColuna":["Serviços", "Número de OSC"],"legenda":"Fonte: Ministério do Desenvolvimento Social (2013).","titulo":"9- OSCs de Assistência Social, por serviço prestado", key: "Grafico 9", values: [
    {"label" : "Proteção Básica", "value" : 7906 }, {"label" : "Proteção Especial - Alta Complexidade", "value" : 1975 },
    { "label" : "Assessoramento, Defesa e Garantia de Direitos" , "value" : 1652 }, {"label" : "Proteção Especial - Média Complexidade", "value" : 1147},
    {"label" : "Outras Ofertas", "value" : 975}, {"label" : "Benefícios Eventuais", "value" : 206}
    ]}];

    var jsonGrafico10 = [{"config":[",f","1",""],"leg_X":"","leg_Y":"","tituloColuna":["Tipo de Unidade", "Número de OSC"],"legenda":"Fonte: Ministério da Saúde (2016).","titulo":"10- OSCs de Saúde, por tipo de estabelecimento de Saúde", key: "Grafico 10", values: [
    {"label": "Clinica/Centro De Especialidade", "value" : 1814 } ,  {"label": "Hospital Geral", "value" : 1505 },
    { "label": "Consultorio Isolado", "value" : 440}, {"label": "Unidade De Apoio Diagnose E Terapia", "value" : 350 },
    {"label": "Policlinica", "value" : 272 } , { "label": "Hospital Especializado", "value" : 188}, {"label": "Outras", "value" : 284 }
    ]}];

  var jsonGrafico11 = [{"config":[",f","1",""],"leg_X":"Região","leg_Y":"Quantidade de OSCs","tituloColuna":["Tipo de Gestão", "Região", "Quantidade"],"legenda":"Fonte: Ministério da Saúde (2016).","titulo":"11- OSCs de Saúde, por região e tipo de gestão do estabelecimento de Saúde",
  series:[
    {key: "Municipal", values: [{"label" : "Sudeste", "value" : 1932 }, {"label" : "Sul", "value" : 726 }, {"label" : "Nordeste", "value" : 497 }, {"label" : "Centro-Oeste", "value" : 180 }, {"label" : "Norte", "value" : 86 }]},
    {key: "Estadual", values: [{"label" : "Sudeste", "value" : 240 }, {"label" : "Sul", "value" : 403 }, {"label" : "Nordeste", "value" : 58 }, {"label" : "Centro-Oeste", "value" : 75 }, {"label" : "Norte", "value" : 22 }]},
    {key: "Dupla", values: [{"label" : "Sudeste", "value" : 202 }, {"label" : "Sul", "value" : 349 }, {"label" : "Nordeste", "value" : 57 }, {"label" : "Centro-Oeste", "value" : 21 }, {"label" : "Norte", "value" : 6 }]}
    ]}];


  var jsonGrafico12 = [{"config":[",f","1",""],"leg_X":"Região","leg_Y":"Quantidade de OSCs","tituloColuna":["Tipo de Vínculo", "Região", "Quantidade"],"legenda":"Fonte: Ministério do Trabalho (2016).","titulo":"12- OSCs de Economia Solidária, por região e tipo de vínculo com outras entidades",
  series:[
    {key: "Não possui vínculo", values: [{"label" : "Sudeste", "value" : 19 }, {"label" : "Sul", "value" : 15 }, {"label" : "Nordeste", "value" : 17 }, {"label" : "Centro-Oeste", "value" : 1 }, {"label" : "Norte", "value" : 7 }]},
    {key: "Federação de órgãos sociais", values: [{"label" : "Sudeste", "value" : 0 }, {"label" : "Sul", "value" : 0 }, {"label" : "Nordeste", "value" : 11 }, {"label" : "Centro-Oeste", "value" : 0 }, {"label" : "Norte", "value" : 3 }]},
    {key: "Governo", values: [{"label" : "Sudeste", "value" : 5 }, {"label" : "Sul", "value" : 4 }, {"label" : "Nordeste", "value" : 6 }, {"label" : "Centro-Oeste", "value" : 1 }, {"label" : "Norte", "value" : 1 }]},
    {key: "Movimento sindical", values: [{"label" : "Sudeste", "value" :2 }, {"label" : "Sul", "value" : 5 }, {"label" : "Nordeste", "value" : 6 }, {"label" : "Centro-Oeste", "value" : 0 }, {"label" : "Norte", "value" : 2 }]},
    {key: "Instituição de ensino e/ou pesquisa", values: [{"label" : "Sudeste", "value" : 4 }, {"label" : "Sul", "value" : 7 }, {"label" : "Nordeste", "value" : 0 }, {"label" : "Centro-Oeste", "value" : 0 }, {"label" : "Norte", "value" : 0 }]}
    ]}];

  var jsonGrafico13 = [{"config":[",f","1",""],"leg_X":"Região","leg_Y":"Quantidade de OSCs","tituloColuna":["Tipo de Abrangência", "Região", "Quantidade"],"legenda":"Fonte: Ministério do Trabalho (2016).","titulo":"13- OSCs de Economia Solidária, por região e abrangência da atuação",
  series:[
    {key: "Estadual e/ou inter-estadual", values: [{"label" : "Sudeste", "value" : 26 }, {"label" : "Sul", "value" : 28 }, {"label" : "Nordeste", "value" : 30 }, {"label" : "Centro-Oeste", "value" : 0 }, {"label" : "Norte", "value" : 50 }]},
    {key: "Nacional", values: [{"label" : "Sudeste", "value" : 4 }, {"label" : "Sul", "value" : 11 }, {"label" : "Nordeste", "value" : 15 }, {"label" : "Centro-Oeste", "value" : 0 }, {"label" : "Norte", "value" : 7 }]},
    {key: "Municipal e/ou inter-municipal", values: [{"label" : "Sudeste", "value" : 6 }, {"label" : "Sul", "value" : 5 }, {"label" : "Nordeste", "value" : 8 }, {"label" : "Centro-Oeste", "value" : 3 }, {"label" : "Norte", "value" : 1 }]}
    ]}];

  createMultiBarChart('#grafico-1',jsonGrafico1);
  createBarChart('#grafico-2',jsonGrafico2);
  createDonutChart('#grafico-3',jsonGrafico3);
  createBarChart('#grafico-4',jsonGrafico4);
  createLineChart('#grafico-5',jsonGrafico5);
  createLineChart('#grafico-6',jsonGrafico6);
  createLineChart('#grafico-7',jsonGrafico7);
  createLineChart('#grafico-8',jsonGrafico8);
  createDonutChart('#grafico-9',jsonGrafico9);
  createDonutChart('#grafico-10',jsonGrafico10);
  createMultiBarChart('#grafico-11',jsonGrafico11);
  createMultiBarChart('#grafico-12',jsonGrafico12);
  createMultiBarChart('#grafico-13',jsonGrafico13);

  $("#tabela-1").click(function(){
      createTabela_MultBar_Line(jsonGrafico1,false);
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
      createTabela_MultBar_Line(jsonGrafico5, true);
  });

  $("#tabela-6").click(function(){
      createTabela_MultBar_Line(jsonGrafico6, true);
  });

  $("#tabela-7").click(function(){
      createTabela_MultBar_Line(jsonGrafico7, true);
  });

  $("#tabela-8").click(function(){
      createTabela_MultBar_Line(jsonGrafico8, true);
  });

  $("#tabela-9").click(function(){
      createTabela_Bar_Donut(jsonGrafico9);
  });

  $("#tabela-10").click(function(){
      createTabela_Bar_Donut(jsonGrafico10);
  });

  $("#tabela-11").click(function(){
      createTabela_MultBar_Line(jsonGrafico11,false);
  });

  $("#tabela-12").click(function(){
      createTabela_MultBar_Line(jsonGrafico12,false);
  });

  $("#tabela-13").click(function(){
      createTabela_MultBar_Line(jsonGrafico13,false);
  });


  jQuery('#tabGrafico a').click(function (e) {
      e.preventDefault()
      jQuery(this).tab('show')
      jQuery(window).trigger('resize'); // Added this line to force NVD3 to redraw the chart
  })

} );
