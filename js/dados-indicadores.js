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

  jQuery(document).ready(function($) {
      $(".scroll").click(function(event){
          event.preventDefault();
          $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
     });
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

    var jsonGrafico2 = [{"config":[",f","1",""],"leg_X":"Região","leg_Y":"Quantidade de Empregos","tituloColuna":["Região", "Número de Empregos nas OSCs"],"legenda":"Fonte: Ministério do Trabalho (2014).","titulo":"2- Número de empregos formais nas OSCs, por região", key: "Grafico 2", values: [{"label" : "Sudeste", "value" : 1347407 }, {"label" : "Sul", "value" : 403905 }, { "label" : "Nordeste" , "value" : 310339 }, {"label" : "Centro-Oeste", "value" : 157331}, {"label" : "Norte", "value" : 67401}]}];
    var jsonGrafico3 = [{"config":[",f","1",""],"leg_X":"","leg_Y":"","tituloColuna":["Atividade Econômica", "Número de OSC"],"legenda":"Fonte: Ministério do Trabalho (2014).","titulo":"3- Atividade econômica das OSCs", key: "Grafico 3", values: [
      {"label": "Outras atividades de serviços", "value" : 318663 }, {"label": "Artes, cultura, esporte e recreação", "value" : 27842 },
      {"label": "Saúde humana e serviços sociais", "value" : 18774}, {"label": "Educação", "value" : 16682},
      { "label": "Outras", "value" : 9410}
    ]}];
    var jsonGrafico4 = [{"config":[",f","1",""],"leg_X":"Região","leg_Y":"Quantidade de OSCs","tituloColuna":["Região", "Número de OSC"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016).","titulo":"4- OSCs com parcerias com o Governo Federal, por região", key: "Grafico 4", values: [{"label" : "Sudeste", "value" : 8656 }, {"label" : "Nordeste", "value" : 5073 } ,{ "label" : "Sul" , "value" : 4407 }, {"label" : "Centro-Oeste", "value" : 1439}, {"label" : "Norte", "value" : 1257}]}];

    var jsonGrafico5 = [{"config":[",f","1",""],"leg_X":"Ano","leg_Y":"Quantidade de OSCs","tituloColuna":["Tipo", "Ano da Parceria", "Total OSCs "],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016).","titulo":"5- Evolução anual de OSCs com parcerias com o Governo Federal, por instrumento de parceria",
      series:[
        {
          values: [{"x" : 2009, "y" : 103 }, {"x" : 2010, "y" : 60 }, {"x" : 2011, "y" : 4 },
          {"x" : 2012, "y" : 4 }, {"x" : 2013, "y" : 15 }, {"x" : 2014, "y" : 20 },
           {"x" : 2015, "y" : 45 }, {"x" : 2016, "y" : 119 },{"x" : 2017, "y" : 0 }],
          key: 'Contrato de repasse'
        },
        {
          values: [{"x" : 2009, "y" : 723 }, {"x" : 2010, "y" : 481 }, {"x" : 2011, "y" : 72 },
          {"x" : 2012, "y" : 32 }, {"x" : 2013, "y" : 41 }, {"x" : 2014, "y" : 45 },
           {"x" : 2015, "y" : 38 }, {"x" : 2016, "y" : 604 }, {"x" : 2017, "y" : 6 }],
          key: 'Convênio'
        },
        {
          values: [{"x" : 2009, "y" : 101 }, {"x" : 2010, "y" : 145 }, {"x" : 2011, "y" : 60 },
          {"x" : 2012, "y" : 115 }, {"x" : 2013, "y" : 96 }, {"x" : 2014, "y" : 69 },
           {"x" : 2015, "y" : 13 }, {"x" : 2016, "y" : 15 } , {"x" : 2017, "y" : 0 }],
          key: 'Financiamento - Finep'
        },
        {
          values: [{"x" : 2009, "y" : 20 }, {"x" : 2010, "y" : 5 }, {"x" : 2011, "y" : 1 },
           {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0 }, {"x" : 2014, "y" : 0 },
           {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 0 }, {"x" : 2017, "y" : 0 }],
          key: 'Incentivo à cultura'
        },
        {
          values: [{"x" : 2009, "y" : 133 }, {"x" : 2010, "y" : 221 }, {"x" : 2011, "y" : 288 },
           {"x" : 2012, "y" : 290 }, {"x" : 2013, "y" : 310 }, {"x" : 2014, "y" : 313 },
           {"x" : 2015, "y" : 290 }, {"x" : 2016, "y" : 23 }, {"x" : 2017, "y" : 0 }],
          key: 'Incentivo ao esporte'
        },
        {
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 15961 },
          {"x" : 2012, "y" : 16381 }, {"x" : 2013, "y" : 16474 }, {"x" : 2014, "y" : 16697 },
          {"x" : 2015, "y" : 14875 }, {"x" : 2016, "y" : 16147 }, {"x" : 2017, "y" : 1451 }],
          key: 'Outras transferências voluntárias'
        },
        {
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 0 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0}, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 13 }, {"x" : 2017, "y" : 2 }],
          key: 'Termo de colaboração'
        },
        {
          values: [{"x" : 2009, "y" : 9 }, {"x" : 2010, "y" : 8 }, {"x" : 2011, "y" : 1 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0 }, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 0 }, {"x" : 2017, "y" : 0 }],
          key: 'Termo de parceria'
        },
        {
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 0 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0 }, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 12 }, {"x" : 2017, "y" : 0 }],
          key: 'Termo de fomento'
        }
      ]}];

      var jsonGrafico6 = [{"config":[",f","1000000"," M"],"leg_X":"Ano","leg_Y":"em R$","tipo_valor":"$","tituloColuna":["Tipo", "Ano da Parceria", "Valor Pago"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016). Valores deflacionados pelo IPCA do mês corrente.","titulo":"6- Evolução anual dos repasses federais para OSCs, por instrumento de parceria",
      series:[
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 117101845.994766 }, {"x" : 2010, "y" : 59981219.5794839 }, {"x" : 2011, "y" : 0 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0 }, {"x" : 2014, "y" : 0 },
           {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 0 }, {"x" : 2017, "y" : 0 }],
          key: 'Contrato de repasse'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 782696871.482242 }, {"x" : 2010, "y" : 499478729.791864 }, {"x" : 2011, "y" : 229688681.253388 },
          {"x" : 2012, "y" : 277098070.505875 }, {"x" : 2013, "y" : 189639421.996875 }, {"x" : 2014, "y" : 131667671.229035 },
           {"x" : 2015, "y" : 71162563.6322086 }, {"x" : 2016, "y" : 22011414.4571239 }, {"x" : 2017, "y" : 0 }],
          key: 'Convênio'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 1003478983.36941 }, {"x" : 2010, "y" : 1347486287.83862 }, {"x" : 2011, "y" : 324859318.156408 },
          {"x" : 2012, "y" : 808098813.718983 }, {"x" : 2013, "y" : 551380305.962435 }, {"x" : 2014, "y" : 330703367.383072 },
           {"x" : 2015, "y" : 6499733.01026759 }, {"x" : 2016, "y" : 0 }, {"x" : 2017, "y" : 0 }],
          key: 'Financiamento - Finep'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 37806335.9859964 }, {"x" : 2010, "y" : 25253362.8916816 }, {"x" : 2011, "y" : 244534.876262271 },
           {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0 }, {"x" : 2014, "y" : 0 },
           {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 0 }, {"x" : 2017, "y" : 0 }],
          key: 'Incentivo à cultura'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 152077906.16727 }, {"x" : 2010, "y" : 251473321.714602 }, {"x" : 2011, "y" : 277277818.525661 },
           {"x" : 2012, "y" : 258801704.594315 }, {"x" : 2013, "y" : 268210167.569054 }, {"x" : 2014, "y" : 244349585.64495 },
           {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 0 }, {"x" : 2017, "y" : 0 }],
          key: 'Incentivo ao esporte'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 4684962973.36853 },
          {"x" : 2012, "y" : 5557982692.42959 }, {"x" : 2013, "y" : 6052980966.39313 }, {"x" : 2014, "y" : 6804282589.36624 },
          {"x" : 2015, "y" : 4794439126.5718 }, {"x" : 2016, "y" : 5234451465.68744 }, {"x" : 2017, "y" : 153863506.33 }],
          key: 'Outras transferências voluntárias'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 0 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0}, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 4625978.97967755 }, {"x" : 2017, "y" : 0 }],
          key: 'Termo de colaboração'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 4765905.90504343 }, {"x" : 2010, "y" : 98290056.6803608 }, {"x" : 2011, "y" : 32292363.037277 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0 }, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 0 }, {"x" : 2017, "y" : 0 }],
          key: 'Termo de parceria'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 0 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0}, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 126478.861737546 }, {"x" : 2017, "y" : 0 }],
          key: 'Termo de fomento'
        }
      ]}];

      var jsonGrafico7 = [{"config":[",f","1",""],"leg_X":"Ano","leg_Y":"Quantidade de OSCs","tituloColuna":["Divisão", "Ano da Parceria", "Total OSCs"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016).","titulo":"7- Evolução anual de OSCs com parcerias com o Governo Federal, por tamanho da OSC",
        series:[
          {
            values: [{"x" : 2009, "y" : 343 }, {"x" : 2010, "y" : 308 }, {"x" : 2011, "y" : 13232 },
            {"x" : 2012, "y" : 13667 }, {"x" : 2013, "y" : 13683 }, {"x" : 2014, "y" : 13906 },
             {"x" : 2015, "y" : 13313 }, {"x" : 2016, "y" : 13363 }, {"x" : 2017, "y" : 812 }],
            key: '0'
          },
          {
            values: [{"x" : 2009, "y" : 178 }, {"x" : 2010, "y" : 15 }, {"x" : 2011, "y" : 550 },
            {"x" : 2012, "y" : 497 }, {"x" : 2013, "y" : 511 }, {"x" : 2014, "y" : 512 },
             {"x" : 2015, "y" : 316 }, {"x" : 2016, "y" : 392 }, {"x" : 2017, "y" : 26 }],
            key: '1 a 4'
          },
          {
            values: [{"x" : 2009, "y" : 179 }, {"x" : 2010, "y" : 140 }, {"x" : 2011, "y" : 832 },
            {"x" : 2012, "y" : 799 }, {"x" : 2013, "y" : 846 }, {"x" : 2014, "y" : 851 },
             {"x" : 2015, "y" : 282 }, {"x" : 2016, "y" : 747 }, {"x" : 2017, "y" : 18 }],
            key: '5 a 19'
          },
          {
            values: [{"x" : 2009, "y" : 154 }, {"x" : 2010, "y" : 133 }, {"x" : 2011, "y" : 907 },
             {"x" : 2012, "y" : 922 }, {"x" : 2013, "y" : 976 }, {"x" : 2014, "y" : 965 },
             {"x" : 2015, "y" : 497 }, {"x" : 2016, "y" : 995 }, {"x" : 2017, "y" : 159 }],
            key: '20 a 99'
          },
          {
            values: [{"x" : 2009, "y" : 166 }, {"x" : 2010, "y" : 142 }, {"x" : 2011, "y" : 737 },
             {"x" : 2012, "y" : 787 }, {"x" : 2013, "y" : 783 }, {"x" : 2014, "y" : 797 },
             {"x" : 2015, "y" : 767 }, {"x" : 2016, "y" : 785 }, {"x" : 2017, "y" : 441 }],
            key: '100 ou mais'
          }
        ]}];

        var jsonGrafico8 = [{"config":[",f","1000000"," M"],"leg_X":"Ano","leg_Y":"em R$","tituloColuna":["Divisão", "Ano da Parceria", "Valor Pago"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016). Valores deflacionados pelo IPCA do mês corrente.","titulo":"8- Evolução anual dos repasses federais para as OSCs, por área de atuação (Top 6)",
        series:[
          {
            "tipo_valor":"$",
            values: [{"x" : 2009, "y" : 233688441.842029 }, {"x" : 2010, "y" : 190958212.775522 }, {"x" : 2011, "y" : 610171569.997831 },
            {"x" : 2012, "y" : 567388991.871364 }, {"x" : 2013, "y" : 624379095.155514 }, {"x" : 2014, "y" : 449494199.063047 },
             {"x" : 2015, "y" : 325988809.793153 }, {"x" : 2016, "y" : 328489339.418599 }, {"x" : 2017, "y" : 12772777.41 }],
            key: '0'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2009, "y" : 165281045.431258 }, {"x" : 2010, "y" : 124035632.065652 }, {"x" : 2011, "y" : 140184714.731024 },
            {"x" : 2012, "y" : 152542967.285171 }, {"x" : 2013, "y" : 99098682.2417786 }, {"x" : 2014, "y" : 74597806.820661 },
             {"x" : 2015, "y" : 40233424.4473125 }, {"x" : 2016, "y" : 42484177.649466 }, {"x" : 2017, "y" : 1571609.94 }],
            key: '1 a 4'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2009, "y" : 195389431.755194 }, {"x" : 2010, "y" : 272483791.262892 }, {"x" : 2011, "y" : 360894485.906847 },
            {"x" : 2012, "y" : 407201512.15357 }, {"x" : 2013, "y" : 423431592.36591 }, {"x" : 2014, "y" : 545865145.243431 },
             {"x" : 2015, "y" : 262400362.349181 }, {"x" : 2016, "y" : 393481343.565862 }, {"x" : 2017, "y" : 3583687.5 }],
            key: '5 a 19'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2009, "y" : 338115036.528087 }, {"x" : 2010, "y" : 425867984.737555 }, {"x" : 2011, "y" : 716810258.547437 },
             {"x" : 2012, "y" : 816333431.119289 }, {"x" : 2013, "y" : 908404652.152628 }, {"x" : 2014, "y" : 702899349.140788 },
             {"x" : 2015, "y" : 359086524.932103 }, {"x" : 2016, "y" : 315642712.511195 }, {"x" : 2017, "y" : 9660016.07 }],
            key: '20 a 99'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2009, "y" : 1165453893.34816 }, {"x" : 2010, "y" : 1268617357.65499 }, {"x" : 2011, "y" : 3721264660.03438 },
             {"x" : 2012, "y" : 4958514378.81936 }, {"x" : 2013, "y" : 5006896840.00567 }, {"x" : 2014, "y" : 5738146713.35537 },
             {"x" : 2015, "y" : 3885466237.47267 }, {"x" : 2016, "y" : 4181117764.84085 }, {"x" : 2017, "y" : 126275415.41 }],
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
