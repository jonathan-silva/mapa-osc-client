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

  var jsonGrafico1 = [{"config":[",f","1",""],"leg_X":"Região","leg_Y":"Quantidade de OSCs","tituloColuna":["Número de Empregados", "Região", "Quantidade de OSCs"],"legenda":"Fonte: Ministério do Trabalho (2014).","titulo":"1- Distribuição de OSCs por número de empregados e região, Brasil - 2014",
  series:[
    {key: "Sem pessoal ", values: [{"label" : "Sudeste", "value" : 173751 }, {"label" : "Sul", "value" : 99698 }, {"label" : "Nordeste", "value" : 108987 }, {"label" : "Centro-Oeste", "value" : 27902 }, {"label" : "Norte", "value" : 27504 }]},
    {key: "1 a 2", values: [{"label" : "Sudeste", "value" : 17456 }, {"label" : "Sul", "value" : 7218 }, {"label" : "Nordeste", "value" : 5388 }, {"label" : "Centro-Oeste", "value" : 3191 }, {"label" : "Norte", "value" : 1552 }]},
    {key: "3 a 4", values: [{"label" : "Sudeste", "value" : 6428 }, {"label" : "Sul", "value" : 2844 }, {"label" : "Nordeste", "value" : 2053 }, {"label" : "Centro-Oeste", "value" : 1155 }, {"label" : "Norte", "value" : 581 }]},
    {key: "5 a 9", values: [{"label" : "Sudeste", "value" : 6874 }, {"label" : "Sul", "value" : 2953 }, {"label" : "Nordeste", "value" : 1763 }, {"label" : "Centro-Oeste", "value" : 1108 }, {"label" : "Norte", "value" : 525 }]},
    {key: "10 a 49", values: [{"label" : "Sudeste", "value" : 10763 }, {"label" : "Sul", "value" : 3613 }, {"label" : "Nordeste", "value" : 2082 }, {"label" : "Centro-Oeste", "value" : 1253 }, {"label" : "Norte", "value" : 581 }]},
    {key: "50 a 99", values: [{"label" : "Sudeste", "value" : 2056 }, {"label" : "Sul", "value" : 629 }, {"label" : "Nordeste", "value" : 463 }, {"label" : "Centro-Oeste", "value" : 281 }, {"label" : "Norte", "value" : 125 }]},
    {key: "100 a 499", values: [{"label" : "Sudeste", "value" : 1787 }, {"label" : "Sul", "value" : 561 }, {"label" : "Nordeste", "value" : 426 }, {"label" : "Centro-Oeste", "value" : 208 }, {"label" : "Norte", "value" : 115 }]},
    {key: "500 ou mais", values: [{"label" : "Sudeste", "value" : 464 }, {"label" : "Sul", "value" : 126 }, {"label" : "Nordeste", "value" : 91 }, {"label" : "Centro-Oeste", "value" : 51 }, {"label" : "Norte", "value" : 24 }]}
    ]}];

    var jsonGrafico2 = [{"config":[",f","1",""],"leg_X":"Região","leg_Y":"Quantidade de Empregos","tituloColuna":["Região", "Número de Empregos nas OSCs"],"legenda":"Fonte: Ministério do Trabalho (2014).","titulo":"2- Número de empregos formais nas OSCs por região, Brasil - 2014", key: "Grafico 2", values: [{"label" : "Sudeste", "value" : 1698756 }, {"label" : "Sul", "value" : 513450 }, { "label" : "Nordeste" , "value" : 381848 }, {"label" : "Centro-Oeste", "value" : 220009}, {"label" : "Norte", "value" : 90825}]}];
    var jsonGrafico3 = [{"config":[",f","1",""],"leg_X":"","leg_Y":"","tituloColuna":["Atividade Econômica", "Número de OSC"],"legenda":"Fonte: Ministério do Trabalho (2014).","titulo":"3- Distribuição de OSCs por área de atuação, Brasil - 2014", key: "Grafico 3", values: [
      {"label": "Saúde", "value" : 6841 },
      {"label": "Cultura e recreação", "value" : 79917 },
      {"label": "Educação e pesquisa", "value" : 39669},
      {"label": "Assistência social", "value" : 27383},
      {"label": "Religião", "value" : 208325},
      {"label": "Associações patronais e profissionais", "value" : 22261},
      {"label": "Defesa de direitos e interesses", "value" : 339104},
      {"label": "Outras atividades associativas", "value" : 77550},
      {"label": "Outras organizações da sociedade civil", "value" : 19136}
    ]}];

    var jsonGrafico4 = [{"config":[",f","1",""],"leg_X":"Região","leg_Y":"Quantidade de OSCs","tituloColuna":["Região", "Número de OSC"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016). A série histórica inclui os dados do SIAFI a partir de 2011. Os dados do Ministério da Fazenda cobrem 2011-2017; do MPOG, 2009-2017; do MinC, 1992-2012; do Ministério do Esporte, 2007-2016; do MCTI, 2009-2016.","titulo":"4- Número de OSCs com parcerias com o Governo Federal por região, Brasil - 2014", key: "Grafico 4", values: [{"label" : "Sudeste", "value" : 8628 }, {"label" : "Nordeste", "value" : 5038 } ,{ "label" : "Sul" , "value" : 4414 }, {"label" : "Centro-Oeste", "value" : 1430}, {"label" : "Norte", "value" : 1253}]}];

    var jsonGrafico5 = [{"config":[",f","1",""],"leg_X":"Ano","leg_Y":"Quantidade de OSCs","tituloColuna":["Tipo", "Ano da Parceria", "Total OSCs "],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016). A série histórica inclui os dados do SIAFI a partir de 2011. Os dados do Ministério da Fazenda cobrem 2011-2017; do MPOG, 2009-2017; do MinC, 1992-2012; do Ministério do Esporte, 2007-2016; do MCTI, 2009-2016.","titulo":"5- Evolução anual de OSCs com parcerias com o Governo Federal por instrumento de parceria, Brasil - 2009-2017",
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

      var jsonGrafico6 = [{"config":[",f","1000000"," M"],"leg_X":"Ano","leg_Y":"em R$","tipo_valor":"$","tituloColuna":["Tipo", "Ano da Parceria", "Valor Pago"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016). Valores deflacionados pelo IPCA do mês corrente. Os valores exibidos referem-se aos valores efetivamente pagos para as organizações. A série histórica inclui os dados do SIAFI a partir de 2011. Os dados do Ministério da Fazenda cobrem 2011-2017; do MPOG, 2009-2017; do MinC, 1992-2012; do Ministério do Esporte, 2007-2016; do MCTI, 2009-2016.","titulo":"6- Evolução anual dos repasses federais para OSCs por instrumento de parceria, Brasil - 2009-2017",
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

      var jsonGrafico7 = [{"config":[",f","1",""],"leg_X":"Ano","leg_Y":"Quantidade de OSCs","tituloColuna":["Divisão", "Ano da Parceria", "Total OSCs"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016).A série histórica inclui os dados do SIAFI a partir de 2011. Os dados do Ministério da Fazenda cobrem 2011-2017; do MPOG, 2009-2017; do MinC, 1992-2012; do Ministério do Esporte, 2007-2016; do MCTI, 2009-2016.","titulo":"7- Evolução anual de OSCs com parcerias com o Governo Federal por tamanho da OSC, Brasil - 2009-2017",
        series:[
          {
            values: [{"x" : 2009, "y" : 376 }, {"x" : 2010, "y" : 457 }, {"x" : 2011, "y" : 13100 },
            {"x" : 2012, "y" : 13619 }, {"x" : 2013, "y" : 13652 }, {"x" : 2014, "y" : 13863 },
             {"x" : 2015, "y" : 13296 }, {"x" : 2016, "y" : 13324 }, {"x" : 2017, "y" : 809 }],
            key: 'Sem pessoal'
          },
          {
            values: [{"x" : 2009, "y" : 187 }, {"x" : 2010, "y" : 216 }, {"x" : 2011, "y" : 499 },
            {"x" : 2012, "y" : 482 }, {"x" : 2013, "y" : 497 }, {"x" : 2014, "y" : 488 },
             {"x" : 2015, "y" : 298 }, {"x" : 2016, "y" : 397 }, {"x" : 2017, "y" : 23 }],
            key: '1 a 2'
          },
          {
            values: [{"x" : 2009, "y" : 207 }, {"x" : 2010, "y" : 225 }, {"x" : 2011, "y" : 781 },
            {"x" : 2012, "y" : 772 }, {"x" : 2013, "y" : 826 }, {"x" : 2014, "y" : 810 },
             {"x" : 2015, "y" : 245 }, {"x" : 2016, "y" : 703 }, {"x" : 2017, "y" : 17 }],
            key: '3 a 4'
          },
          {
            values: [{"x" : 2009, "y" : 208 }, {"x" : 2010, "y" : 280 }, {"x" : 2011, "y" : 920 },
             {"x" : 2012, "y" : 903 }, {"x" : 2013, "y" : 926 }, {"x" : 2014, "y" : 1004 },
             {"x" : 2015, "y" : 433 }, {"x" : 2016, "y" : 922 }, {"x" : 2017, "y" : 156 }],
            key: '5 a 9'
          },
          {
            values: [{"x" : 2009, "y" : 207 }, {"x" : 2010, "y" : 225 }, {"x" : 2011, "y" : 781 },
            {"x" : 2012, "y" : 772 }, {"x" : 2013, "y" : 826 }, {"x" : 2014, "y" : 810 },
             {"x" : 2015, "y" : 245 }, {"x" : 2016, "y" : 703 }, {"x" : 2017, "y" : 17 }],
            key: '10 a 49'
          },
          {
            values: [{"x" : 2009, "y" : 208 }, {"x" : 2010, "y" : 280 }, {"x" : 2011, "y" : 920 },
             {"x" : 2012, "y" : 903 }, {"x" : 2013, "y" : 926 }, {"x" : 2014, "y" : 1004 },
             {"x" : 2015, "y" : 433 }, {"x" : 2016, "y" : 922 }, {"x" : 2017, "y" : 156 }],
            key: '50 a 99'
          },
          {
            values: [{"x" : 2009, "y" : 208 }, {"x" : 2010, "y" : 280 }, {"x" : 2011, "y" : 920 },
             {"x" : 2012, "y" : 903 }, {"x" : 2013, "y" : 926 }, {"x" : 2014, "y" : 1004 },
             {"x" : 2015, "y" : 433 }, {"x" : 2016, "y" : 922 }, {"x" : 2017, "y" : 156 }],
            key: '100 a 499'
          },
          {
            values: [{"x" : 2009, "y" : 273 }, {"x" : 2010, "y" : 348 }, {"x" : 2011, "y" : 790 },
             {"x" : 2012, "y" : 781 }, {"x" : 2013, "y" : 741 }, {"x" : 2014, "y" : 809 },
             {"x" : 2015, "y" : 712 }, {"x" : 2016, "y" : 740 }, {"x" : 2017, "y" : 436 }],
            key: '500 ou mais'
          },
          {
            values: [{"x" : 2009, "y" : 273 }, {"x" : 2010, "y" : 348 }, {"x" : 2011, "y" : 790 },
             {"x" : 2012, "y" : 781 }, {"x" : 2013, "y" : 741 }, {"x" : 2014, "y" : 809 },
             {"x" : 2015, "y" : 712 }, {"x" : 2016, "y" : 740 }, {"x" : 2017, "y" : 436 }],
            key: 'Não informado'
          }
        ]}];

        var jsonGrafico8 = [{"config":[",f","1000000"," M"],"leg_X":"Ano","leg_Y":"em R$","tituloColuna":["Divisão", "Ano da Parceria", "Valor Pago"],"legenda":"Fonte: Ministério do Trabalho (2014), Ministério do Esporte (2016), Ministério da Cultura (2016), Ministério da Ciência (2016), Ministério da Fazenda (2016), Ministério do Planejamento (2016). Valores deflacionados pelo IPCA do mês corrente. Os valores exibidos referem-se aos valores efetivamente pagos para as organizações. A série histórica inclui os dados do SIAFI a partir de 2011. Os dados do Ministério da Fazenda cobrem 2011-2017; do MPOG, 2010-2017; do MinC, 1992-2012; do Ministério do Esporte, 2007-2016; do MCTI, 2009-2016.","titulo":"8- Total de recursos públicos federais transferidos para OSCs, por porte (2010-2017)",
        series:[
          {
            "tipo_valor":"$",
            values: [{"x" : 2010, "y" : 3423794915.37 }, {"x" : 2011, "y" : 3137763278.23 },
            {"x" : 2012, "y" :  3236653706.15 }, {"x" : 2013, "y" : 3150345824.74 }, {"x" : 2014, "y" : 3365245753.51 },
             {"x" : 2015, "y" : 4393384693.61 }, {"x" : 2016, "y" : 21937697.34 }, {"x" : 2017, "y" : 6365899.92 }],
            key: 'Sem pessoal'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2010, "y" : 162234738.47 }, {"x" : 2011, "y" : 79607179.07 },
            {"x" : 2012, "y" : 95166297.15 }, {"x" : 2013, "y" : 67939395.84 }, {"x" : 2014, "y" : 60135740.66 },
             {"x" : 2015, "y" : 41621726.41 }, {"x" : 2016, "y" : 2890080.15 }, {"x" : 2017, "y" : 1182952.01 }],
            key: '1 a 2'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2010, "y" : 165901120.14 }, {"x" : 2011, "y" : 41291778.91 },
            {"x" : 2012, "y" : 64666408.97 }, {"x" : 2013, "y" : 66344086.16 }, {"x" : 2014, "y" : 86711885.47 },
             {"x" : 2015, "y" : 63024149.37 }, {"x" : 2016, "y" : 2006252.84 }, {"x" : 2017, "y" : 4613073.01 }],
            key: '3 a 4'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2010, "y" : 292400313.77 }, {"x" : 2011, "y" : 178339647.89 },
             {"x" : 2012, "y" : 175936420.4 }, {"x" : 2013, "y" : 147642566.74 }, {"x" : 2014, "y" : 421516369.41 },
             {"x" : 2015, "y" : 366469993.74 }, {"x" : 2016, "y" : 25857025.24 }, {"x" : 2017, "y" : 3455016.32 }],
            key: '5 a 9'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2010, "y" : 854820455.66 }, {"x" : 2011, "y" : 599342690.38 },
             {"x" : 2012, "y" : 649700109.53}, {"x" : 2013, "y" : 677379657.94 }, {"x" : 2014, "y" : 941574006.12 },
             {"x" : 2015, "y" : 495439488.72 }, {"x" : 2016, "y" : 109887075.11 }, {"x" : 2017, "y" : 19645945.17 }],
            key: '10 a 49'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2010, "y" : 494947985.13 }, {"x" : 2011, "y" : 484411681.2 },
             {"x" : 2012, "y" : 562633079.2 }, {"x" : 2013, "y" : 872375968.46 }, {"x" : 2014, "y" : 704320110.77 },
             {"x" : 2015, "y" : 788992278.1 }, {"x" : 2016, "y" : 30212263.06 }, {"x" : 2017, "y" : 11496486.68 }],
            key: '50 a 99'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2010, "y" : 2694405947.85 }, {"x" : 2011, "y" : 2160558521 },
             {"x" : 2012, "y" : 2267078032.86 }, {"x" : 2013, "y" : 2438315964.98 }, {"x" : 2014, "y" : 2539934066.06 },
             {"x" : 2015, "y" : 2287949234.78 }, {"x" : 2016, "y" : 1205800124.65 }, {"x" : 2017, "y" : 765439397.26 }],
            key: '100 a 499'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2010, "y" : 3177144539.27 }, {"x" : 2011, "y" : 3215056474.2 },
             {"x" : 2012, "y" : 3383317071.93 }, {"x" : 2013, "y" :3514790924.8 }, {"x" : 2014, "y" : 3810061434.24 },
             {"x" : 2015, "y" : 2763662160.03 }, {"x" : 2016, "y" : 878214628.31 }, {"x" : 2017, "y" : 83245549.28 }],
            key: '500 ou mais'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2010, "y" : 12381785.33 }, {"x" : 2011, "y" : 15588000.33 },
             {"x" : 2012, "y" : 22299641.76 }, {"x" : 2013, "y" : 7033970 }, {"x" : 2014, "y" : 11627012.75 },
             {"x" : 2015, "y" : 6817041.36 }, {"x" : 2016, "y" : 2594866.53 }, {"x" : 2017, "y" : 195095.28 }],
            key: 'Não informado'
          }
        ]}];

    var jsonGrafico9 = [{"config":[",f","1",""],"leg_X":"","leg_Y":"","tituloColuna":["Serviços", "Número de OSC"],"legenda":"Fonte: Ministério do Desenvolvimento Social (2013), Ministério do Trabalho (2014).","titulo":"9- Distribuição de OSCs de assistência social por tipo de serviço prestado, Brasil - 2014", key: "Grafico 9", values: [
    {"label" : "Serviços de Proteção Social Básica", "value" : 10529 },
    {"label" : "Serviços de Proteção Social Especial de Alta Complexidade", "value" : 3780 },
    {"label" : "Ações de Assessoramento e Defesa e Garantia de Direitos" , "value" : 15096 },
    {"label" : "Serviços de Proteção Social Especial de Média Complexidade", "value" : 3622},
    {"label" : "Outras Ofertas", "value" : 6269},
    {"label" : "Benefícios Eventuais", "value" : 2360}
    ]}];

    var jsonGrafico10 = [{"config":[",f","1",""],"leg_X":"","leg_Y":"","tituloColuna":["Tipo de Unidade", "Número de OSC"],"legenda":"Fonte: Ministério da Saúde (2016), Ministério do Trabalho (2014).","titulo":"10- Distribuição de OSCs de saúde por tipo de estabelecimento de saúde, Brasil - 2014", key: "Grafico 10", values: [
    {"label": "Clínica/Centro de Especialidade", "value" : 637 } ,  {"label": "Hospital Geral", "value" : 1607 },
    { "label": "Consultório Isolado", "value" : 123}, {"label": "Unidade de Apoio Diagnose e Terapia", "value" : 209 },
    {"label": "Policlínica", "value" : 143 } , { "label": "Hospital Especializado", "value" : 211},
    { "label": "Centro de Saúde/Unidade Básica", "value" : 127},
    {"label": "Outras", "value" : 189 }
    ]}];

  var jsonGrafico11 = [{"config":[",f","1",""],"leg_X":"Região","leg_Y":"Quantidade de OSCs","tituloColuna":["Tipo de Gestão", "Região", "Quantidade"],"legenda":"Fonte: Ministério da Saúde (2016), Ministério do Trabalho (2014).","titulo":"11- Distribuição de OSCs de saúde por região e tipo de gestão, Brasil - 2014",
  series:[
    {key: "Municipal", values: [{"label" : "Sudeste", "value" : 1419 }, {"label" : "Sul", "value" : 463 }, {"label" : "Nordeste", "value" : 311 }, {"label" : "Centro-Oeste", "value" : 126 }, {"label" : "Norte", "value" : 39 }]},
    {key: "Estadual", values: [{"label" : "Sudeste", "value" : 236 }, {"label" : "Sul", "value" : 148 }, {"label" : "Nordeste", "value" : 67 }, {"label" : "Centro-Oeste", "value" : 24 }, {"label" : "Norte", "value" : 11 }]},
    {key: "Dupla", values: [{"label" : "Sudeste", "value" : 177 }, {"label" : "Sul", "value" : 271 }, {"label" : "Nordeste", "value" : 63 }, {"label" : "Centro-Oeste", "value" : 16 }, {"label" : "Norte", "value" : 7 }]}
    ]}];


  var jsonGrafico12 = [{"config":[",f","1",""],"leg_X":"Região","leg_Y":"Quantidade de OSCs","tituloColuna":["Tipo de Vínculo", "Região", "Quantidade"],"legenda":"Fonte: Ministério do Trabalho (2016), Ministério do Trabalho (2014).","titulo":"12- Distribuição de OSCs de economia solidária por região e tipo de vínculo com outras entidades, Brasil - 2014",
  series:[
    {key: "Não possui vínculo", values: [{"label" : "Sudeste", "value" : 19 }, {"label" : "Sul", "value" : 15 }, {"label" : "Nordeste", "value" : 17 }, {"label" : "Centro-Oeste", "value" : 1 }, {"label" : "Norte", "value" : 7 }]},
    {key: "Federação de órgãos sociais", values: [{"label" : "Sudeste", "value" : 0 }, {"label" : "Sul", "value" : 0 }, {"label" : "Nordeste", "value" : 11 }, {"label" : "Centro-Oeste", "value" : 0 }, {"label" : "Norte", "value" : 3 }]},
    {key: "Governo", values: [{"label" : "Sudeste", "value" : 5 }, {"label" : "Sul", "value" : 4 }, {"label" : "Nordeste", "value" : 6 }, {"label" : "Centro-Oeste", "value" : 1 }, {"label" : "Norte", "value" : 1 }]},
    {key: "Movimento sindical", values: [{"label" : "Sudeste", "value" :2 }, {"label" : "Sul", "value" : 5 }, {"label" : "Nordeste", "value" : 6 }, {"label" : "Centro-Oeste", "value" : 0 }, {"label" : "Norte", "value" : 2 }]},
    {key: "Instituição de ensino e/ou pesquisa", values: [{"label" : "Sudeste", "value" : 4 }, {"label" : "Sul", "value" : 7 }, {"label" : "Nordeste", "value" : 0 }, {"label" : "Centro-Oeste", "value" : 0 }, {"label" : "Norte", "value" : 0 }]}
    ]}];

  var jsonGrafico13 = [{"config":[",f","1",""],"leg_X":"Região","leg_Y":"Quantidade de OSCs","tituloColuna":["Tipo de Abrangência", "Região", "Quantidade"],"legenda":"Fonte: Ministério do Trabalho (2016), Ministério do Trabalho (2014).","titulo":"13- Distribuição de OSCs de economia solidária por região e abrangência da atuação, Brasil - 2014",
  series:[
    {key: "Estadual e/ou inter-estadual", values: [{"label" : "Sudeste", "value" : 26 }, {"label" : "Sul", "value" : 28 }, {"label" : "Nordeste", "value" : 30 }, {"label" : "Centro-Oeste", "value" : 0 }, {"label" : "Norte", "value" : 50 }]},
    {key: "Nacional", values: [{"label" : "Sudeste", "value" : 4 }, {"label" : "Sul", "value" : 11 }, {"label" : "Nordeste", "value" : 15 }, {"label" : "Centro-Oeste", "value" : 0 }, {"label" : "Norte", "value" : 7 }]},
    {key: "Municipal e/ou inter-municipal", values: [{"label" : "Sudeste", "value" : 6 }, {"label" : "Sul", "value" : 5 }, {"label" : "Nordeste", "value" : 8 }, {"label" : "Centro-Oeste", "value" : 3 }, {"label" : "Norte", "value" : 1 }]}
    ]}];

  createMultiBarChart('#grafico-1',jsonGrafico1);
  createBarChart('#grafico-2',jsonGrafico2);
  createDonutChart('#grafico-3',jsonGrafico3);
//  createBarChart('#grafico-4',jsonGrafico4);
//  createLineChart('#grafico-5',jsonGrafico5);
//  createLineChart('#grafico-6',jsonGrafico6);
//  createLineChart('#grafico-7',jsonGrafico7);
//  createLineChart('#grafico-8',jsonGrafico8);
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
/*
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
*/
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
