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

  var jsonGrafico1 = [{"tituloColuna":["Tamanho", "Região", "Quantidade"],"legenda":"Ministério do Trabalho (2014).","titulo":"Tamanho das OSCs, por região",
  series:[
    {key: "0", values: [{"label" : "Sudeste", "value" : 127866 }, {"label" : "Sul", "value" : 73278 }, {"label" : "Nordeste", "value" : 75689 }, {"label" : "Centro-Oeste", "value" : 17885 }, {"label" : "Norte", "value" : 15844 }]},
    {key: "1 a 4", values: [{"label" : "Sudeste", "value" : 22644 }, {"label" : "Sul", "value" : 9100 }, {"label" : "Nordeste", "value" : 6798 }, {"label" : "Centro-Oeste", "value" : 3943 }, {"label" : "Norte", "value" : 1943 }]},
    {key: "5 a 19", values: [{"label" : "Sudeste", "value" : 11816 }, {"label" : "Sul", "value" : 4472 }, {"label" : "Nordeste", "value" : 2656 }, {"label" : "Centro-Oeste", "value" : 1678 }, {"label" : "Norte", "value" : 821 }]},
    {key: "20 a 99", values: [{"label" : "Sudeste", "value" : 6589 }, {"label" : "Sul", "value" : 2140 }, {"label" : "Nordeste", "value" : 1370 }, {"label" : "Centro-Oeste", "value" : 749 }, {"label" : "Norte", "value" : 364 }]},
    {key: "100 ou mais", values: [{"label" : "Sudeste", "value" : 2210 }, {"label" : "Sul", "value" : 661 }, {"label" : "Nordeste", "value" : 488 }, {"label" : "Centro-Oeste", "value" : 241 }, {"label" : "Norte", "value" : 126 }]}
    ]}];

    var jsonGrafico2 = [{"tituloColuna":["Região", "Número de Empregos nas OSCs"],"legenda":"Ministério do Trabalho (2014).","titulo":"Empregos formais nas OSCs, por natureza jurídica e região", key: "Grafico 2", values: [{"label" : "Sudeste", "value" : 1347407 }, {"label" : "Sul", "value" : 403905 }, { "label" : "Nordeste" , "value" : 310339 }, {"label" : "Centro-Oeste", "value" : 157331}, {"label" : "Norte", "value" : 67401}]}];
    var jsonGrafico3 = [{"tituloColuna":["Atividade Econômica", "Número de OSC"],"legenda":"Ministério do Trabalho (2014).","titulo":"Atividade econômica das OSCs", key: "Grafico 3", values: [{"label": "Outras atividades de serviços", "value" : 318663 } ,  {"label": "Artes, cultura, esporte e recreação", "value" : 27842 } , { "label": "Saúde humana e serviços sociais", "value" : 18774}, { "label": "Educação", "value" : 16682}, { "label": "Outras", "value" : 9410}]} ];
    var jsonGrafico4 = [{"tituloColuna":["Região", "Número de OSC"],"legenda":"Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016).","titulo":"OSCs com parcerias com o Governo Federal, por região", key: "Grafico 4", values: [{"label" : "Sudeste", "value" : 8656 }, {"label" : "Nordeste", "value" : 5073 } ,{ "label" : "Sul" , "value" : 4407 }, {"label" : "Centro-Oeste", "value" : 1439}, {"label" : "Norte", "value" : 1257}]}];

    var jsonGrafico5 = [{"tituloColuna":["Tipo", "Ano", "Quantidade"],"legenda":"Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016).","titulo":"Evolução anual dos repasses federais para as OSCs",
    series:[
      {key: "Contrato de repasse", values: [{"label" : "2009", "value" : 124 }, {"label" : "2010", "value" : 118 }, {"label" : "2011", "value" : 38 },
      {"label" : "2012", "value" : 9 }, {"label" : "2013", "value" : 21 }, {"label" : "2014", "value" : 60 }, {"label" : "2015", "value" : 56 }, {"label" : "2016", "value" : 12 }]},

      {key: "Convênio", values: [{"label" : "2009", "value" : 874 }, {"label" : "2010", "value" : 593 }, {"label" : "2011", "value" : 72 },
       {"label" : "2012", "value" : 51 }, {"label" : "2013", "value" : 55 }, {"label" : "2014", "value" : 57 }, {"label" : "2015", "value" : 78 }, {"label" : "2016", "value" : 377 }]},

      {key: "Financiamento - Finep", values: [{"label" : "2009", "value" : 101 }, {"label" : "2010", "value" : 145 }, {"label" : "2011", "value" : 60 },
      {"label" : "2012", "value" : 115 }, {"label" : "2013", "value" : 96 }, {"label" : "2014", "value" : 69 }, {"label" : "2015", "value" : 13 }, {"label" : "2016", "value" : 15 }]},

      {key: "Incentivo à cultura", values: [{"label" : "2009", "value" : 20 }, {"label" : "2010", "value" : 5 }, {"label" : "2011", "value" : 1 },
       {"label" : "2012", "value" : 0 }, {"label" : "2013", "value" : 0 }, {"label" : "2014", "value" : 0 }, {"label" : "2015", "value" : 0 }, {"label" : "2016", "value" : 0 }]},

      {key: "Incentivo ao esporte", values: [{"label" : "2009", "value" : 133 }, {"label" : "2010", "value" : 221 }, {"label" : "2011", "value" : 288 },
       {"label" : "2012", "value" : 290 }, {"label" : "2013", "value" : 310 }, {"label" : "2014", "value" : 313 }, {"label" : "2015", "value" : 290 }, {"label" : "2016", "value" : 23 }]},

      {key: "Outras transferências voluntárias", values: [{"label" : "2009", "value" : 0 }, {"label" : "2010", "value" : 0 }, {"label" : "2011", "value" : 15961 },
      {"label" : "2012", "value" : 16381 }, {"label" : "2013", "value" : 16474 }, {"label" : "2014", "value" : 16697 }, {"label" : "2015", "value" : 14875 }, {"label" : "2016", "value" : 15480 }]},

      {key: "Termo de colaboração", values: [{"label" : "2009", "value" : 0 }, {"label" : "2010", "value" : 0 }, {"label" : "2011", "value" : 0 },
       {"label" : "2012", "value" : 0 }, {"label" : "2013", "value" : 0 }, {"label" : "2014", "value" : 0 }, {"label" : "2015", "value" : 0 }, {"label" : "2016", "value" : 1 }]},

      {key: "Termo de parceria", values: [{"label" : "2009", "value" : 13 }, {"label" : "2010", "value" : 9 }, {"label" : "2011", "value" : 1 },
        {"label" : "2012", "value" : 0 }, {"label" : "2013", "value" : 0 }, {"label" : "2014", "value" : 0 }, {"label" : "2015", "value" : 0 }, {"label" : "2016", "value" : 0 }]}

      ]}];

      var jsonGrafico6 = [{"tituloColuna":["Divisão CNAE", "Ano da Parceria", "Valor Total Pago"],"legenda":"Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016).","titulo":"Evolução anual dos repasses federais para as OSCs, por área de atuação (Top 6)",
      series:[
        {
          values: [{"x" : 2009, "y" : 117485488832751 }, {"x" : 2010, "y" : 594188621009088 }, {"x" : 2011, "y" : 0 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0 }, {"x" : 2014, "y" : 285847615435015 },
           {"x" : 2015, "y" : 131775011055224 }, {"x" : 2016, "y" : 0 }],
          key: 'Contrato de repasse'
        },
        {
          values: [{"x" : 2009, "y" : 812818806306349 }, {"x" : 2010, "y" : 507949244466716 }, {"x" : 2011, "y" : 226952358551096 },
          {"x" : 2012, "y" : 267119167702857 }, {"x" : 2013, "y" : 186754675637313 }, {"x" : 2014, "y" : 135049823862428 },
           {"x" : 2015, "y" : 69208250681497 }, {"x" : 2016, "y" : 111965067597798 }],
          key: 'Convênio'
        },
        {
          values: [{"x" : 2009, "y" : 991524357183733 }, {"x" : 2010, "y" : 133143344056587 }, {"x" : 2011, "y" : 320989210485139 },
          {"x" : 2012, "y" : 798471786746614 }, {"x" : 2013, "y" : 544811612892457 }, {"x" : 2014, "y" : 326763638498929 },
           {"x" : 2015, "y" : 642230051817535 }, {"x" : 2016, "y" : 0 }],
          key: 'Financiamento - Finep'
        },
        {
          values: [{"x" : 2009, "y" : 373559422840324 }, {"x" : 2010, "y" : 249525150231117 }, {"x" : 2011, "y" : 241621688160153 },
           {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0 }, {"x" : 2014, "y" : 0 },
           {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 0 }],
          key: 'Incentivo à cultura'
        },
        {
          values: [{"x" : 2009, "y" : 150266174631821 }, {"x" : 2010, "y" : 248477474659914 }, {"x" : 2011, "y" : 27397455784458 },
           {"x" : 2012, "y" : 255718553192126 }, {"x" : 2013, "y" : 265014931449886 }, {"x" : 2014, "y" : 241438604943388 },
           {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 0 }],
          key: 'Incentivo ao esporte'
        },
        {
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 462915016416317 },
          {"x" : 2012, "y" : 54917694417929 }, {"x" : 2013, "y" : 598087071200663 }, {"x" : 2014, "y" : 67232219431886 },
          {"x" : 2015, "y" : 473732210820066 }, {"x" : 2016, "y" : 0 }],
          key: 'Outras transferências voluntárias'
        },
        {
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 0 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0}, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 321018563966751 }],
          key: 'Termo de colaboração'
        },
        {
          values: [{"x" : 2009, "y" : 470912880808857 }, {"x" : 2010, "y" : 97119109500742}, {"x" : 2011, "y" : 319076582899321 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0 }, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 0 }],
          key: 'Termo de parceria'
        }
      ]}];

      var jsonGrafico7 = [{"tituloColuna":["Região", "Tamanho", "Quantidade"],"legenda":"Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016).","titulo":"Evolução anual dos repasses federais para as OSCs",
      series:[
        {key: "0", values: [{"label" : "Sudeste", "value" : 127866 }, {"label" : "Sul", "value" : 73278 }, {"label" : "Nordeste", "value" : 75689 }, {"label" : "Centro-Oeste", "value" : 17885 }, {"label" : "Norte", "value" : 15844 }]},
        {key: "1 a 4", values: [{"label" : "Sudeste", "value" : 22644 }, {"label" : "Sul", "value" : 9100 }, {"label" : "Nordeste", "value" : 6798 }, {"label" : "Centro-Oeste", "value" : 3943 }, {"label" : "Norte", "value" : 1943 }]},
        {key: "5 a 19", values: [{"label" : "Sudeste", "value" : 11816 }, {"label" : "Sul", "value" : 4472 }, {"label" : "Nordeste", "value" : 2656 }, {"label" : "Centro-Oeste", "value" : 1678 }, {"label" : "Norte", "value" : 821 }]},
        {key: "20 a 99", values: [{"label" : "Sudeste", "value" : 6589 }, {"label" : "Sul", "value" : 2140 }, {"label" : "Nordeste", "value" : 1370 }, {"label" : "Centro-Oeste", "value" : 749 }, {"label" : "Norte", "value" : 364 }]},
        {key: "100 ou mais", values: [{"label" : "Sudeste", "value" : 2210 }, {"label" : "Sul", "value" : 661 }, {"label" : "Nordeste", "value" : 488 }, {"label" : "Centro-Oeste", "value" : 241 }, {"label" : "Norte", "value" : 126 }]}
        ]}];

        var jsonGrafico8 = [{"tituloColuna":["Divisão CNAE", "Ano da Parceria", "Valor Total Pago"],"legenda":"Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016).","titulo":"Evolução anual dos repasses federais para as OSCs, por área de atuação (Top 6)",
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

    var jsonGrafico9 = [{"tituloColuna":["Serviços", "Número de OSC"],"legenda":"Ministério do Desenvolvimento Social (2013).","titulo":"OSCs de Assistência Social, por serviço prestado", key: "Grafico 9", values: [{"label" : "Proteção Básica", "value" : 7906 }, {"label" : "Proteção Especial - Alta Complexidade", "value" : 1975 } ,{ "label" : "Assessoramento, Defesa e Garantia de Direitos" , "value" : 1652 }, {"label" : "Proteção Especial - Média Complexidade", "value" : 1147}, {"label" : "Outras Ofertas", "value" : 975}, {"label" : "Benefícios Eventuais", "value" : 206}]}];

    var jsonGrafico10 = [{"tituloColuna":["Tipo de Unidade", "Número de OSC"],"legenda":"Ministério da Saúde (2016).","titulo":"OSCs de Saúde, por tipo de estabelecimento de Saúde", key: "Grafico 10", values: [
    {"label": "Clinica/Centro De Especialidade", "value" : 1814 } ,  {"label": "Hospital Geral", "value" : 1505 } , { "label": "Consultorio Isolado", "value" : 440},
    {"label": "Unidade De Apoio Diagnose E Terapia (Sadt Isolado)", "value" : 350 } ,  {"label": "Policlinica", "value" : 272 } , { "label": "Hospital Especializado", "value" : 188},
    {"label": "Outras", "value" : 284 }

    ]} ];

  var jsonGrafico11 = [{"tituloColuna":["Tipo de Gestão", "Região", "Quantidade"],"legenda":"Ministério da Saúde (2016).","titulo":"OSCs de Saúde, por região e tipo de gestão do estabelecimento de Saúde",
  series:[
    {key: "Municipal", values: [{"label" : "Sudeste", "value" : 1932 }, {"label" : "Sul", "value" : 726 }, {"label" : "Nordeste", "value" : 497 }, {"label" : "Centro-Oeste", "value" : 180 }, {"label" : "Norte", "value" : 86 }]},
    {key: "Estadual", values: [{"label" : "Sudeste", "value" : 240 }, {"label" : "Sul", "value" : 403 }, {"label" : "Nordeste", "value" : 58 }, {"label" : "Centro-Oeste", "value" : 75 }, {"label" : "Norte", "value" : 22 }]},
    {key: "Dupla", values: [{"label" : "Sudeste", "value" : 202 }, {"label" : "Sul", "value" : 349 }, {"label" : "Nordeste", "value" : 57 }, {"label" : "Centro-Oeste", "value" : 21 }, {"label" : "Norte", "value" : 6 }]}
    ]}];


  var jsonGrafico12 = [{"tituloColuna":["Tipo de Vínculo", "Região", "Quantidade"],"legenda":"Ministério do Trabalho (2016).","titulo":"OSCs de Economia Solidária, por região e tipo de vínculo com outras entidades",
  series:[
    {key: "Não possui vínculo", values: [{"label" : "Sudeste", "value" : 19 }, {"label" : "Sul", "value" : 15 }, {"label" : "Nordeste", "value" : 17 }, {"label" : "Centro-Oeste", "value" : 1 }, {"label" : "Norte", "value" : 7 }]},
    {key: "Federação de órgãos sociais", values: [{"label" : "Sudeste", "value" : 0 }, {"label" : "Sul", "value" : 0 }, {"label" : "Nordeste", "value" : 11 }, {"label" : "Centro-Oeste", "value" : 0 }, {"label" : "Norte", "value" : 3 }]},
    {key: "Governo", values: [{"label" : "Sudeste", "value" : 5 }, {"label" : "Sul", "value" : 4 }, {"label" : "Nordeste", "value" : 6 }, {"label" : "Centro-Oeste", "value" : 1 }, {"label" : "Norte", "value" : 1 }]},
    {key: "Movimento sindical", values: [{"label" : "Sudeste", "value" :2 }, {"label" : "Sul", "value" : 5 }, {"label" : "Nordeste", "value" : 6 }, {"label" : "Centro-Oeste", "value" : 0 }, {"label" : "Norte", "value" : 2 }]},
    {key: "Instituição de ensino e/ou pesquisa", values: [{"label" : "Sudeste", "value" : 4 }, {"label" : "Sul", "value" : 7 }, {"label" : "Nordeste", "value" : 0 }, {"label" : "Centro-Oeste", "value" : 0 }, {"label" : "Norte", "value" : 0 }]}
    ]}];

  var jsonGrafico13 = [{"tituloColuna":["Tipo de Abrangência", "Região", "Quantidade"],"legenda":"Ministério do Trabalho (2016).","titulo":"OSCs de Economia Solidária, por região e abrangência da atuação",
  series:[
    {key: "Estadual e/ou inter-estadual", values: [{"label" : "Sudeste", "value" : 26 }, {"label" : "Sul", "value" : 28 }, {"label" : "Nordeste", "value" : 30 }, {"label" : "Centro-Oeste", "value" : 0 }, {"label" : "Norte", "value" : 50 }]},
    {key: "Nacional", values: [{"label" : "Sudeste", "value" : 4 }, {"label" : "Sul", "value" : 11 }, {"label" : "Nordeste", "value" : 15 }, {"label" : "Centro-Oeste", "value" : 0 }, {"label" : "Norte", "value" : 7 }]},
    {key: "Municipal e/ou inter-municipal", values: [{"label" : "Sudeste", "value" : 6 }, {"label" : "Sul", "value" : 5 }, {"label" : "Nordeste", "value" : 8 }, {"label" : "Centro-Oeste", "value" : 3 }, {"label" : "Norte", "value" : 1 }]}
    ]}];

  createMultiBarChart('#grafico-1',jsonGrafico1);
  createBarChart('#grafico-2',jsonGrafico2);
  createDonutChart('#grafico-3',jsonGrafico3);
  createBarChart('#grafico-4',jsonGrafico4);
  createMultiBarChart('#grafico-5',jsonGrafico5);
  createLineChart('#grafico-6',jsonGrafico6);
  createMultiBarChart('#grafico-7',jsonGrafico7);
  createLineChart('#grafico-8',jsonGrafico8);
  createDonutChart('#grafico-9',jsonGrafico9);
  createBarChart('#grafico-10',jsonGrafico10);
  createMultiBarChart('#grafico-11',jsonGrafico11);
  createMultiBarChart('#grafico-12',jsonGrafico12);
  createMultiBarChart('#grafico-13',jsonGrafico13);

  $("#tabela-1").click(function(){
      createTabela_MultBar_Line(jsonGrafico1);
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
      createTabela_MultBar_Line(jsonGrafico8, true);
  });

  $("#tabela-9").click(function(){
      createTabela_Bar_Donut(jsonGrafico9);
  });

  $("#tabela-10").click(function(){
      createTabela_Bar_Donut(jsonGrafico10);
  });

  $("#tabela-11").click(function(){
      createTabela_MultBar_Line(jsonGrafico11);
  });

  $("#tabela-12").click(function(){
      createTabela_MultBar_Line(jsonGrafico12);
  });

  $("#tabela-13").click(function(){
      createTabela_MultBar_Line(jsonGrafico13);
  });


  jQuery('#tabGrafico a').click(function (e) {
      e.preventDefault()
      jQuery(this).tab('show')
      jQuery(window).trigger('resize'); // Added this line to force NVD3 to redraw the chart
  })


} );
