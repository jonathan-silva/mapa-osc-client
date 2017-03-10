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
    var jsonGrafico4 = [{"config":[",f","1",""],"leg_X":"Região","leg_Y":"Quantidade de OSCs","tituloColuna":["Região", "Número de OSC"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016).","titulo":"4- OSCs com parcerias com o Governo Federal, por região", key: "Grafico 4", values: [{"label" : "Sudeste", "value" : 8628 }, {"label" : "Nordeste", "value" : 5038 } ,{ "label" : "Sul" , "value" : 4414 }, {"label" : "Centro-Oeste", "value" : 1430}, {"label" : "Norte", "value" : 1253}]}];

    var jsonGrafico5 = [{"config":[",f","1",""],"leg_X":"Ano","leg_Y":"Quantidade de OSCs","tituloColuna":["Tipo", "Ano da Parceria", "Total OSCs "],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016).","titulo":"5- Evolução anual de OSCs com parcerias com o Governo Federal, por instrumento de parceria",
      series:[
        {
          values: [{"x" : 2009, "y" : 142 }, {"x" : 2010, "y" : 195 }, {"x" : 2011, "y" : 86 },
          {"x" : 2012, "y" : 61 }, {"x" : 2013, "y" : 49 }, {"x" : 2014, "y" : 110 },
           {"x" : 2015, "y" : 61 }, {"x" : 2016, "y" : 119 },{"x" : 2017, "y" : 0 }],
          key: 'Contrato de repasse'
        },
        {
          values: [{"x" : 2009, "y" : 944 }, {"x" : 2010, "y" : 4058 }, {"x" : 2011, "y" : 629 },
          {"x" : 2012, "y" : 511 }, {"x" : 2013, "y" : 511 }, {"x" : 2014, "y" : 719 },
           {"x" : 2015, "y" : 569 }, {"x" : 2016, "y" : 675 }, {"x" : 2017, "y" : 6 }],
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
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 15414 },
          {"x" : 2012, "y" : 15961 }, {"x" : 2013, "y" : 15979 }, {"x" : 2014, "y" : 16264 },
          {"x" : 2015, "y" : 14380 }, {"x" : 2016, "y" : 15725 }, {"x" : 2017, "y" : 1434 }],
          key: 'Outras transferências voluntárias'
        },
        {
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 0 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0}, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 25 }, {"x" : 2017, "y" : 2 }],
          key: 'Termo de colaboração'
        },
        {
          values: [{"x" : 2009, "y" : 18 }, {"x" : 2010, "y" : 18 }, {"x" : 2011, "y" : 8 },
          {"x" : 2012, "y" : 11 }, {"x" : 2013, "y" : 6 }, {"x" : 2014, "y" : 3 },
          {"x" : 2015, "y" : 4 }, {"x" : 2016, "y" : 2 }, {"x" : 2017, "y" : 0 }],
          key: 'Termo de parceria'
        },
        {
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 0 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0 }, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 15 }, {"x" : 2017, "y" : 0 }],
          key: 'Termo de fomento'
        }
      ]}];

      var jsonGrafico6 = [{"config":[",f","1000000"," M"],"leg_X":"Ano","leg_Y":"em R$","tipo_valor":"$","tituloColuna":["Tipo", "Ano da Parceria", "Valor Pago"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016). Valores deflacionados pelo IPCA do mês corrente.","titulo":"6- Evolução anual dos repasses federais para OSCs, por instrumento de parceria",
      series:[
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 154995912.816056 }, {"x" : 2010, "y" : 139929679.132065 }, {"x" : 2011, "y" : 69329607.9688609 },
          {"x" : 2012, "y" : 146108290.397886 }, {"x" : 2013, "y" : 32259486.5490012 }, {"x" : 2014, "y" : 23060337.1983431 },
           {"x" : 2015, "y" : 3133311.25842172 }, {"x" : 2016, "y" : 167724.115191084 }, {"x" : 2017, "y" : 0 }],
          key: 'Contrato de repasse'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 1454038499.10232 }, {"x" : 2010, "y" : 1617670445.66519 }, {"x" : 2011, "y" :2498718069.2037 },
          {"x" : 2012, "y" : 1613629249.14887 }, {"x" : 2013, "y" : 3358510931.7825 }, {"x" : 2014, "y" : 1217055668.18036 },
           {"x" : 2015, "y" : 734545942.296774 }, {"x" : 2016, "y" : 194884004.201096 }, {"x" : 2017, "y" : 0 }],
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
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 3681353556.70508 },
          {"x" : 2012, "y" : 4008367002.66929 }, {"x" : 2013, "y" : 3522671851.99341 }, {"x" : 2014, "y" : 4597453203.45959 },
          {"x" : 2015, "y" : 2589512146.26217 }, {"x" : 2016, "y" : 3334558409.02197 }, {"x" : 2017, "y" : 144648063.09 }],
          key: 'Outras transferências voluntárias'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 0 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0}, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 7267562.56947329 }, {"x" : 2017, "y" : 0 }],
          key: 'Termo de colaboração'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 23387537.7594027 }, {"x" : 2010, "y" : 307943241.131192 }, {"x" : 2011, "y" : 45500720.7797221 },
          {"x" : 2012, "y" : 622545548.549492 }, {"x" : 2013, "y" : 1005207305.44486 }, {"x" : 2014, "y" : 170037205.746424 },
          {"x" : 2015, "y" : 142476044.409264 }, {"x" : 2016, "y" : 23201354.5390073 }, {"x" : 2017, "y" : 0 }],
          key: 'Termo de parceria'
        },
        {
          "tipo_valor":"$",
          values: [{"x" : 2009, "y" : 0 }, {"x" : 2010, "y" : 0 }, {"x" : 2011, "y" : 0 },
          {"x" : 2012, "y" : 0 }, {"x" : 2013, "y" : 0}, {"x" : 2014, "y" : 0 },
          {"x" : 2015, "y" : 0 }, {"x" : 2016, "y" : 9666833.76719038 }, {"x" : 2017, "y" : 0 }],
          key: 'Termo de fomento'
        }
      ]}];

      var jsonGrafico7 = [{"config":[",f","1",""],"leg_X":"Ano","leg_Y":"Quantidade de OSCs","tituloColuna":["Divisão", "Ano da Parceria", "Total OSCs"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016).","titulo":"7- Evolução anual de OSCs com parcerias com o Governo Federal, por tamanho da OSC",
        series:[
          {
            values: [{"x" : 2009, "y" : 376 }, {"x" : 2010, "y" : 457 }, {"x" : 2011, "y" : 13100 },
            {"x" : 2012, "y" : 13619 }, {"x" : 2013, "y" : 13652 }, {"x" : 2014, "y" : 13863 },
             {"x" : 2015, "y" : 13296 }, {"x" : 2016, "y" : 13324 }, {"x" : 2017, "y" : 809 }],
            key: '0'
          },
          {
            values: [{"x" : 2009, "y" : 187 }, {"x" : 2010, "y" : 216 }, {"x" : 2011, "y" : 499 },
            {"x" : 2012, "y" : 482 }, {"x" : 2013, "y" : 497 }, {"x" : 2014, "y" : 488 },
             {"x" : 2015, "y" : 298 }, {"x" : 2016, "y" : 397 }, {"x" : 2017, "y" : 23 }],
            key: '1 a 4'
          },
          {
            values: [{"x" : 2009, "y" : 207 }, {"x" : 2010, "y" : 225 }, {"x" : 2011, "y" : 781 },
            {"x" : 2012, "y" : 772 }, {"x" : 2013, "y" : 826 }, {"x" : 2014, "y" : 810 },
             {"x" : 2015, "y" : 245 }, {"x" : 2016, "y" : 703 }, {"x" : 2017, "y" : 17 }],
            key: '5 a 19'
          },
          {
            values: [{"x" : 2009, "y" : 208 }, {"x" : 2010, "y" : 280 }, {"x" : 2011, "y" : 920 },
             {"x" : 2012, "y" : 903 }, {"x" : 2013, "y" : 926 }, {"x" : 2014, "y" : 1004 },
             {"x" : 2015, "y" : 433 }, {"x" : 2016, "y" : 922 }, {"x" : 2017, "y" : 156 }],
            key: '20 a 99'
          },
          {
            values: [{"x" : 2009, "y" : 273 }, {"x" : 2010, "y" : 348 }, {"x" : 2011, "y" : 790 },
             {"x" : 2012, "y" : 781 }, {"x" : 2013, "y" : 741 }, {"x" : 2014, "y" : 809 },
             {"x" : 2015, "y" : 712 }, {"x" : 2016, "y" : 740 }, {"x" : 2017, "y" : 436 }],
            key: '100 ou mais'
          }
        ]}];

        var jsonGrafico8 = [{"config":[",f","1000000"," M"],"leg_X":"Ano","leg_Y":"em R$","tituloColuna":["Divisão", "Ano da Parceria", "Valor Pago"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016). Valores deflacionados pelo IPCA do mês corrente.","titulo":"8- Evolução anual dos repasses federais para as OSCs, por área de atuação (Top 6)",
        series:[
          {
            "tipo_valor":"$",
            values: [{"x" : 2009, "y" : 305359081.669266 }, {"x" : 2010, "y" : 356947584.638683 }, {"x" : 2011, "y" : 502254862.14359 },
            {"x" : 2012, "y" : 650575038.436647 }, {"x" : 2013, "y" : 587478318.967865 }, {"x" : 2014, "y" : 450858828.719786 },
             {"x" : 2015, "y" : 339262278.508082 }, {"x" : 2016, "y" : 252723026.377461 }, {"x" : 2017, "y" : 12013657.41 }],
            key: '0'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2009, "y" : 207951543.543334 }, {"x" : 2010, "y" : 206492971.022804 }, {"x" : 2011, "y" : 101083095.055984 },
            {"x" : 2012, "y" : 164360989.515233 }, {"x" : 2013, "y" : 92762791.5564615 }, {"x" : 2014, "y" : 67575110.340414 },
             {"x" : 2015, "y" : 28920749.3671555 }, {"x" : 2016, "y" : 28765754.8714835 }, {"x" : 2017, "y" : 526352.02 }],
            key: '1 a 4'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2009, "y" : 257156587.957212 }, {"x" : 2010, "y" : 432016592.572412 }, {"x" : 2011, "y" : 337036762.740556 },
            {"x" : 2012, "y" : 429302885.533626 }, {"x" : 2013, "y" : 423431592.36591 }, {"x" : 2014, "y" : 521428288.807057 },
             {"x" : 2015, "y" : 234921428.40664 }, {"x" : 2016, "y" : 357320606.541281 }, {"x" : 2017, "y" : 3397981.94 }],
            key: '5 a 19'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2009, "y" : 432499756.620207 }, {"x" : 2010, "y" : 615967093.627833 }, {"x" : 2011, "y" : 731817338.911622 },
             {"x" : 2012, "y" : 1024561271.04736 }, {"x" : 2013, "y" : 703563489.531337 }, {"x" : 2014, "y" : 692368378.532493 },
             {"x" : 2015, "y" : 289676800.214741 }, {"x" : 2016, "y" : 205622757.726689 }, {"x" : 2017, "y" : 8833135.27 }],
            key: '20 a 99'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2009, "y" : 1622818205.41044 }, {"x" : 2010, "y" : 2078332096.51162 }, {"x" : 2011, "y" : 5225091567.36394 },
             {"x" : 2012, "y" : 5188750424.54597 }, {"x" : 2013, "y" : 6961348621.70469 }, {"x" : 2014, "y" : 4850428761.21299 },
             {"x" : 2015, "y" : 2583385920.74028 }, {"x" : 2016, "y" : 2725313742.69701 }, {"x" : 2017, "y" : 119876936.45 }],
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
