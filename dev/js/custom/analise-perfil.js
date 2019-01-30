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


require(["rotas","nv.d3.lib","graficoParaTabela"], function (React) {
  var rotas = new Rotas();

  $("#voltaPagAnterior").on("click", function(){
    history.go(-1);
  });

  function addLinkVoltar(id){
  		$("#voltaPerfil").attr("href","analise-perfil.html?localidade="+id);
  }

  var valoresURL = window.location.href.split('?')[1]!==undefined ? window.location.href.split('?')[1].split('=') : null;
  var idLocalidade = "";

  if(valoresURL !== null){
    idLocalidade = valoresURL[1];
    addLinkVoltar(idLocalidade);
  }


var dados = [{

"id_localidade": 3304557,
"tx_localidade": "Rio de Janeiro - RJ",
"tx_tipo_localidade": "município",

"caracteristicas":{
  "nr_quantidade_oscs": 452,
  "nr_quantidade_trabalhadores":4546,
  "nr_quantidade_recursos":17000.00,
  "nr_quantidade_projetos":54,
  "fontes":["CNPJ/SRF/MF 2016", "OSCIP/MJ", "RAIS 2015", "RAIS/MTE", "RAIS/MTE 2015"],
},

"evolucao_quantidade_osc_ano":{
   "nr_colocacao_nacional":10,
   "tx_primeiro_colocado_municipio":"Campinas - SP",
   "tx_ultimo_colocado_municipio":"Rio Claro - AC",
   "tx_primeiro_colocado_estado":"São Paulo",
   "tx_ultimo_colocado_estado":"Alagoas",
   "nr_quantidade_oscs_primeiro_colocado_municipio":12300,
   "nr_quantidade_oscs_ultimo_colocado_municipio":2,
   "nr_quantidade_oscs_primeiro_colocado_estado":125654,
   "nr_quantidade_oscs_ultimo_colocado_estado":2201,
   "series_1": [
        {
          "tipo_valor":"",
          area: true,
          color:'#99d8ff',
          values: [{"x" : 2010, "y" : 2475271665 }, {"x" : 2011, "y" : 2344840370 },
          {"x" : 2012, "y" : 2416751939 }, {"x" : 2013, "y" : 2360686002}, {"x" : 2014, "y" : 2619736378},
           {"x" : 2015, "y" : 1996874918 }, {"x" : 2016, "y" : 1762657873 }, {"x" : 2017, "y" : 722616503 }],
          key: 'Quantidade OSC'
        }
      ],
   "fontes":["CNPJ/SRF/MF 2016", "OSCIP/MJ", "RAIS 2015", "RAIS/MTE", "RAIS/MTE 2015"],
 },

 "natureza_juridica":{
   "nr_porcentagem_maior":86,
   "tx_porcentagem_maior":"Associações Privadas",
   "nr_porcentagem_maior_media_nacional":65,
   "tx_porcentagem_maior_media_nacional":"Religiosas",
    "series_1": [ {"label" : "OSCIP/MJ", "value" : 7114}, {"label" : "CEBAS/MDS", "value" : 5487 } ,
            { "label" : "CEBAS/MS" , "value" : 1363 },{"label" : "CEBAS/MEC", "value" : 944 } ],
    "fontes":["CNPJ/SRF/MF 2016", "OSCIP/MJ", "RAIS 2015", "RAIS/MTE", "RAIS/MTE 2015"]
  },

   "repasse_recursos": {
     "nr_colocacao_nacional":10,
     "nr_repasse_media":14500.00,
     "nr_repasse_media_nacional":52000.00,
     "tx_maior_tipo_repasse":"Federal",
     "nr_porcentagem_maior_tipo_repasse":45,
     "series_1": [
          {
            "tipo_valor":"$",
            values: [{"x" : 2010, "y" : 2475271665 }, {"x" : 2011, "y" : 2344840370 },
            {"x" : 2012, "y" : 2416751939 }, {"x" : 2013, "y" : 2360686002}, {"x" : 2014, "y" : 2619736378},
             {"x" : 2015, "y" : 1996874918 }, {"x" : 2016, "y" : 1762657873 }, {"x" : 2017, "y" : 722616503 }],
            key: 'Recursos próprios'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2010, "y" : 177621059 }, {"x" : 2011, "y" : 64130914 },
            {"x" : 2012, "y" : 69157135 }, {"x" : 2013, "y" : 94974566 }, {"x" : 2014, "y" : 50767409 },
             {"x" : 2015, "y" : 46070808 }, {"x" : 2016, "y" : 1661980 }, {"x" : 2017, "y" : 5048758 }],
            key: 'Recursos públicos'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2010, "y" : 1494752250 }, {"x" : 2011, "y" : 1191614600 },
            {"x" : 2012, "y" : 1337141937 }, {"x" : 2013, "y" : 1427079792 }, {"x" : 2014, "y" : 1350110928 },
             {"x" : 2015, "y" : 912500271 }, {"x" : 2016, "y" : 158224896 }, {"x" : 2017, "y" : 91640974 }],
            key: 'Recursos privados'
          },
          {
            "tipo_valor":"$",
            values: [{"x" : 2010, "y" : 57311974 }, {"x" : 2011, "y" : 41024076 },
             {"x" : 2012, "y": 38312968 }, {"x" : 2013, "y" : 43477853 }, {"x" : 2014, "y" : 45573709 },
             {"x" : 2015, "y": 28400811 }, {"x" : 2016, "y" : 3059934 }, {"x" : 2017, "y" : 626165}],
            key: 'Recursos não financeiros'
          }
        ],
     "fontes":["CNPJ/SRF/MF 2016", "OSCIP/MJ", "RAIS 2015", "RAIS/MTE", "RAIS/MTE 2015"]
   },

   "area_atuacao": {
     "nr_porcentagem_maior":53,
     "tx_porcentagem_maior":"Saúde",
     "nr_porcentagem_maior_media_nacional":47,
     "tx_porcentagem_maior_media_nacional":"Educação",
     "series_1":  [ {"label" : "OSCIP/MJ", "value" : 7114}, {"label" : "CEBAS/MDS", "value" : 5487 } ,
           { "label" : "CEBAS/MS" , "value" : 1363 },{"label" : "CEBAS/MEC", "value" : 944 } ],
     "fontes":["CNPJ/SRF/MF 2016", "OSCIP/MJ", "RAIS 2015", "RAIS/MTE", "RAIS/MTE 2015"]
   },

   "trabalhadores":{
      "nr_porcentagem_maior":75,
      "tx_porcentagem_maior":"Voluntários",
      "nr_porcentagem_maior_media_nacional":53,
      "tx_porcentagem_maior_media_nacional":"Voluntários",
      "series_1": [ {"label" : "OSCIP/MJ", "value" : 7114}, {"label" : "CEBAS/MDS", "value" : 5487 } ,
            { "label" : "CEBAS/MS" , "value" : 1363 },{"label" : "CEBAS/MEC", "value" : 944 } ],
      "fontes":["CNPJ/SRF/MF 2016", "OSCIP/MJ", "RAIS 2015", "RAIS/MTE", "RAIS/MTE 2015"]
    }
}];

function formatar_fontes(fontes){
  var fonte_format = ". ";

  if(fontes != null){
    fonte_format = fontes.join(", ").replace(/'/gi,"");
    fonte_format += ". ";
  }

  return "Fonte: " + fonte_format ;
}

function formatar_tipo_localidade(tipo_localidade,artigo){
  var tx_tipoLocalidade = tipo_localidade.toLowerCase();
  var txt_tipo = "do "+tx_tipoLocalidade;

  if(artigo == 1){
    txt_tipo = "O "+tx_tipoLocalidade;
  }

  if(tx_tipoLocalidade == 'região'){
    txt_tipo = "da "+ tx_tipoLocalidade;

    if(artigo == 1){
      txt_tipo = "A "+ tx_tipoLocalidade;
    }
  }

  return txt_tipo;
}

  $.ajax({
    url: rotas.RecuperarPerfilByIDLocalidade(idLocalidade),
    type: 'GET',
    dataType: 'json',
    error: function(e){
        console.log("ERRO no AJAX :" + e);
        $('.manutencao').css('display', 'block');
        $('.loading').addClass('hide');
        $('.tela').addClass('hide');
    },
    success: function(data){

      $("#tx_localidade").text(data.tx_localidade);

      //Características

      $("#tabela caption").text(formatar_fontes(data.caracteristicas.fontes));

      var txt = '<h5><a id="tabela-p1" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>';
      $("#tabela caption").append(txt);


      var tab = '<tr>';
      tab += '<td>'+data.caracteristicas.nr_quantidade_oscs+'</td>';
      tab += '<td>'+data.caracteristicas.nr_quantidade_trabalhadores+'</td>';
      tab += '<td>'+formatarDinheiro(data.caracteristicas.nr_quantidade_recursos)+'</td>';
      tab += '<td>'+data.caracteristicas.nr_quantidade_projetos+'</td>';
      tab += '</tr>';

      $("#tabela tbody").append(tab);

      txt = '<p>'+data.tx_localidade+' é o '+data.evolucao_quantidade_osc_ano.nr_colocacao_nacional+'º em relação a quantidade de OSCs no âmbito nacional. ';
      txt += 'Nesse ranking, o estado ('+data.evolucao_quantidade_osc_ano.tx_primeiro_colocado_estado+', '+data.evolucao_quantidade_osc_ano.nr_quantidade_oscs_primeiro_colocado_estado+' OSCs) ';
      txt += 'e o município ('+data.evolucao_quantidade_osc_ano.tx_primeiro_colocado_municipio+', '+data.evolucao_quantidade_osc_ano.nr_quantidade_oscs_primeiro_colocado_municipio+' OSCs) são os que contêm mais OSCs. '
      txt += 'O estado ('+data.evolucao_quantidade_osc_ano.tx_ultimo_colocado_estado[0]+') e o município ('+data.evolucao_quantidade_osc_ano.tx_ultimo_colocado_municipio[0]+') ';
      txt += 'são os que contêm menos OSCs, '+data.evolucao_quantidade_osc_ano.nr_quantidade_oscs_ultimo_colocado_estado+' e '+data.evolucao_quantidade_osc_ano.nr_quantidade_oscs_ultimo_colocado_municipio+' respectivamente.';
      txt += '</p>';

      $("#tx_caracteristicas").append(txt);

      var grafico = {};
      grafico['configuracao'] = ["f","100000","","f"];
      grafico['legenda_x'] = "Ano";
      grafico['legenda_y'] = "Quantidade OSC";
      grafico['titulo_colunas'] = ["Evolução","Ano","Quantidade"];
      grafico['titulo'] = "Evolucao da quantidade OSCs por ano";
      grafico['fontes'] = data.evolucao_quantidade_osc_ano.fontes;
      grafico['legenda'] = "";
      grafico['tipo_grafico'] = "linechart";
      grafico['series_1'] = data.evolucao_quantidade_osc_ano.series_1;

      escolherGrafico("p1",grafico);

      //natureza juridica

      var txt = '<p>Na população de OSCs '+formatar_tipo_localidade(data.tx_tipo_localidade,2)+', '+data.natureza_juridica.nr_porcentagem_maior+'% são ';
      txt += data.natureza_juridica.tx_porcentagem_maior+'. Enquanto, em relação a média nacional '+data.natureza_juridica.nr_porcentagem_maior_media_nacional+'% são ';
      txt += data.natureza_juridica.tx_porcentagem_maior_media_nacional;
      txt += '.</p>';

      $("#tx_natureza_juridica").append(txt);

      txt = '<h5 class="legenda_perfil">'+formatar_fontes(data.natureza_juridica.fontes)+'</h5>';
      txt +='<h5><a id="tabela-p2" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>';
      $("#tx_natureza_juridica").append(txt);

      var grafico = {};
      grafico['configuracao'] = ["f","1","","f"];
      grafico['legenda_x'] = "Natureza Jurídica";
      grafico['legenda_y'] = "Quantidade OSC";
      grafico['titulo_colunas'] = ["Natureza Jurídica","Quantidade OSC"];
      grafico['titulo'] = "Número de OSCs por natureza jurídica";
      grafico['fontes'] = data.natureza_juridica.fontes;
      grafico['legenda'] = "";
      grafico['tipo_grafico'] = "barchart";
      grafico['series_1'] = data.natureza_juridica.series_1;

      escolherGrafico("p2",grafico);

      //Repasse de Recursos

      var txt = '<p>'+data.tx_localidade+' é o '+data.repasse_recursos.nr_colocacao_nacional+'º em relação ao repasse de recursos, com média de ';
      txt += formatarDinheiro(data.repasse_recursos.nr_repasse_media)+' por ano, enquanto a média nacional ficou em '+formatarDinheiro(data.repasse_recursos.nr_repasse_media_nacional);
      txt += '. A entidade que mais repassou foi '+data.repasse_recursos.tx_maior_tipo_repasse+', chegando a '+data.repasse_recursos.nr_porcentagem_maior_tipo_repasse+'% dos valores.';
      txt += '</p>';

      $("#tx_repasse_recursos").append(txt);

      txt = '<h5 class="legenda_perfil">'+formatar_fontes(data.natureza_juridica.fontes)+'</h5>';
      txt +='<h5><a id="tabela-p3" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>';
      $("#tx_repasse_recursos").append(txt);

      var grafico = {};
      grafico['configuracao'] = ["f","1000000","","f"];
      grafico['legenda_x'] = "Ano";
      grafico['legenda_y'] = "Recursos (em milhões R$)";
      grafico['titulo_colunas'] = ["Repasse","Ano","Recursos (em milhões R$)"];
      grafico['titulo'] = "Evolução de recursos transferidos para OSCs";
      grafico['fontes'] = data.repasse_recursos.fontes;
      grafico['legenda'] = "";
      grafico['tipo_grafico'] = "linechart";
      grafico['series_1'] = data.repasse_recursos.series_1;

      escolherGrafico("p3",grafico);

      //Área de Atuação

      var txt = '<p>'+data.tx_localidade+' contém '+data.area_atuacao.nr_porcentagem_maior+'% das OSCs atuando em '+data.area_atuacao.tx_porcentagem_maior;
      txt += '. Enquanto a média nacional está com '+data.area_atuacao.nr_porcentagem_maior_media_nacional+'% relacionada a atividade econômica ';
      txt += data.area_atuacao.tx_porcentagem_maior_media_nacional;
      txt += '.</p>';

      $("#tx_area_atuacao").append(txt);

      txt = '<h5 class="legenda_perfil">'+formatar_fontes(data.natureza_juridica.fontes)+'</h5>';
      txt +='<h5><a id="tabela-p4" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>';
      $("#tx_area_atuacao").append(txt);

      var grafico = {};
      grafico['configuracao'] = ["f","1","","f"];
      grafico['legenda_x'] = "Atividade Econômica";
      grafico['legenda_y'] = "Quantidade OSC";
      grafico['titulo_colunas'] = ["Atividade Econômica","Quantidade OSC"];
      grafico['titulo'] = "Distribuição de OSCs por área de atuação";
      grafico['fontes'] = data.area_atuacao.fontes;
      grafico['legenda'] = "";
      grafico['tipo_grafico'] = "donutchart";
      grafico['series_1'] = data.area_atuacao.series_1;

      escolherGrafico("p4",grafico);

      //Trabalhadores

      var txt = '<p>'+formatar_tipo_localidade(data.tx_tipo_localidade,1)+' possui '+data.trabalhadores.nr_porcentagem_maior+'% de trabalhadores ';
      txt += data.trabalhadores.tx_porcentagem_maior+'. Enquanto a média nacional apresenta '+data.trabalhadores.nr_porcentagem_maior_media_nacional+'% de trabalhadores ';
      txt += data.trabalhadores.tx_porcentagem_maior_media_nacional;
      txt += '</p>';

      $("#tx_trabalhadores").append(txt);

      txt = '<h5 class="legenda_perfil">'+formatar_fontes(data.natureza_juridica.fontes)+'</h5>';
      txt +='<h5><a id="tabela-p5" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>';
      $("#tx_trabalhadores").append(txt);

      var grafico = {};
      grafico['configuracao'] = ["f","1","","f"];
      grafico['legenda_x'] = "Tipo";
      grafico['legenda_y'] = "Número de trabalhadores";
      grafico['titulo_colunas'] = ["Tipo","Número de trabalhadores"];
      grafico['titulo'] = "Distribuição de trabalhodores";
      grafico['fontes'] = data.trabalhadores.fontes;
      grafico['legenda'] = "";
      grafico['tipo_grafico'] = "barchart";
      grafico['series_1'] = data.trabalhadores.series_1;

      escolherGrafico("p5",grafico);

      // Limpar tela
      $( ".dt_pub_news" ).before( $( ".social" ) );
      $( ".social" ).css("display","flex")
      $('.loading').addClass('hide');
      $(".social iframe").each(function() {
        $(this).attr('title', '');
      });
    }
  });


});
