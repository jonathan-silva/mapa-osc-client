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
"txt_tipo_localidade": "município",

"caracteristicas":{
  "nr_quantidade_oscs": 452,
  "nr_quantidade_trabalhadores":4546,
  "nr_quantidade_recursos":17000.00,
  "nr_quantidade_projetos":54,
  "fontes":["CNPJ/SRF/MF 2016", "OSCIP/MJ", "RAIS 2015", "RAIS/MTE", "RAIS/MTE 2015"],
},

"evolucao_quantidade_osc_ano":{
   "nr_colocacao_nacional":10,
   "series_1": [],
   "fontes":["CNPJ/SRF/MF 2016", "OSCIP/MJ", "RAIS 2015", "RAIS/MTE", "RAIS/MTE 2015"],
 },

 "natureza_juridica":{
   "nr_porcentagem_maior":86,
   "tx_porcentagem_maior":"Associações Privadas",
   "nr_porcentagem_maior_media_nacional":65,
   "tx_porcentagem_maior_media_nacional":"Religiosas",
    "series_1": [],
    "fontes":["CNPJ/SRF/MF 2016", "OSCIP/MJ", "RAIS 2015", "RAIS/MTE", "RAIS/MTE 2015"]
  },

   "repasse_recursos": {
     "nr_colocacao_nacional":10,
     "nr_repasse_media":14500.00,
     "nr_repasse_media_nacional":52000.00,
     "tx_maior_tipo_repasse":"Federal",
     "nr_porcentagem_maior_tipo_repasse":45,
     "series_1": [],
     "fontes":["CNPJ/SRF/MF 2016", "OSCIP/MJ", "RAIS 2015", "RAIS/MTE", "RAIS/MTE 2015"]
   },

   "area_atuacao": {
     "nr_porcentagem_maior":53,
     "tx_porcentagem_maior":"Saúde",
     "nr_porcentagem_maior_media_nacional":47,
     "tx_porcentagem_maior_media_nacional":"Educação",
     "series_1": [],
     "fontes":["CNPJ/SRF/MF 2016", "OSCIP/MJ", "RAIS 2015", "RAIS/MTE", "RAIS/MTE 2015"]
   },

   "trabalhadores":{
      "nr_porcentagem_maior":75,
      "tx_porcentagem_maior":"Voluntários",
      "nr_porcentagem_maior_media_nacional":53,
      "tx_porcentagem_maior_media_nacional":"Voluntários",
      "series_1": [],
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



  $.ajax({
    url: rotas.RecuperarPerfilByIDLocalidade(idLocalidade),
    type: 'GET',
    dataType: 'json',
    error: function(e){
        console.log("ERRO no AJAX :" + e);
        $('.manutencao').css('display', 'block');
        $('.loading').addClass('hide');
    },
    success: function(data){

      $("#tx_localidade").text(dados[0].tx_localidade);

      //Características

      var grafico = {};
      grafico['configuracao'] = ["f","1","","f"];
      grafico['legenda_x'] = "Ano";
      grafico['legenda_y'] = "Quantidade";
      grafico['titulo_colunas'] = ["",""];
      grafico['titulo'] = "Evolucao quantidade OSCs por ano";
      grafico['fontes'] = dados[0].evolucao_quantidade_osc_ano.fontes;
      grafico['legenda'] = "";
      grafico['tipo_grafico'] = "linewithfocuschart";
      grafico['series_1'] = dados[0].evolucao_quantidade_osc_ano.series_1;

      escolherGrafico(1,grafico);

      $("#tabela caption").text(formatar_fontes(dados[0].caracteristicas.fontes));

      var tab = '<tr>';
      tab += '<td>'+dados[0].caracteristicas.nr_quantidade_oscs+'</td>';
      tab += '<td>'+dados[0].caracteristicas.nr_quantidade_trabalhadores+'</td>';
      tab += '<td>'+formatarDinheiro(dados[0].caracteristicas.nr_quantidade_recursos)+'</td>';
      tab += '<td>'+dados[0].caracteristicas.nr_quantidade_projetos+'</td>';
      tab += '</tr>';

      $("#tabela tbody").append(tab);

      var txt = '<p>'+dados[0].tx_localidade+' é o '+dados[0].evolucao_quantidade_osc_ano.nr_colocacao_nacional+'º em relação a quantidade de OSCs no âmbito nacional.';
      txt += '</p>';

      $("#tx_caracteristicas").append(txt);


      //natureza juridica
      var grafico = {};
      grafico['configuracao'] = ["f","1","","f"];
      grafico['legenda_x'] = "Ano";
      grafico['legenda_y'] = "Quantidade";
      grafico['titulo_colunas'] = ["",""];
      grafico['titulo'] = "Evolucao quantidade OSCs por ano";
      grafico['fontes'] = dados[0].natureza_juridica.fontes;
      grafico['legenda'] = "";
      grafico['tipo_grafico'] = "linewithfocuschart";
      grafico['series_1'] = dados[0].natureza_juridica.series_1;

      escolherGrafico(2,grafico);

      var txt = '<p>'+dados[0].tx_localidade+' é o '+dados[0].natureza_juridica.nr_colocacao_nacional+'º em relação a quantidade de OSCs no âmbito nacional.';
      txt += '</p>';

      $("#tx_natureza_juridica").append(txt);


      //Repasse de Recursos
      var grafico = {};
      grafico['configuracao'] = ["f","1","","f"];
      grafico['legenda_x'] = "Ano";
      grafico['legenda_y'] = "Quantidade";
      grafico['titulo_colunas'] = ["",""];
      grafico['titulo'] = "Evolucao quantidade OSCs por ano";
      grafico['fontes'] = dados[0].repasse_recursos.fontes;
      grafico['legenda'] = "";
      grafico['tipo_grafico'] = "linewithfocuschart";
      grafico['series_1'] = dados[0].repasse_recursos.series_1;

      escolherGrafico(3,grafico);

      var txt = '<p>'+dados[0].tx_localidade+' é o '+dados[0].repasse_recursos.nr_colocacao_nacional+'º em relação a quantidade de OSCs no âmbito nacional.';
      txt += '</p>';

      $("#tx_repasse_recursos").append(txt);

      //Área de Atuação
      var grafico = {};
      grafico['configuracao'] = ["f","1","","f"];
      grafico['legenda_x'] = "Ano";
      grafico['legenda_y'] = "Quantidade";
      grafico['titulo_colunas'] = ["",""];
      grafico['titulo'] = "Evolucao quantidade OSCs por ano";
      grafico['fontes'] = dados[0].area_atuacao.fontes;
      grafico['legenda'] = "";
      grafico['tipo_grafico'] = "linewithfocuschart";
      grafico['series_1'] = dados[0].area_atuacao.series_1;

      escolherGrafico(3,grafico);

      var txt = '<p>'+dados[0].tx_localidade+' é o '+dados[0].area_atuacao.nr_colocacao_nacional+'º em relação a quantidade de OSCs no âmbito nacional.';
      txt += '</p>';

      $("#tx_area_atuacao").append(txt);


      //Trabalhadores
      var grafico = {};
      grafico['configuracao'] = ["f","1","","f"];
      grafico['legenda_x'] = "Ano";
      grafico['legenda_y'] = "Quantidade";
      grafico['titulo_colunas'] = ["",""];
      grafico['titulo'] = "Evolucao quantidade OSCs por ano";
      grafico['fontes'] = dados[0].trabalhadores.fontes;
      grafico['legenda'] = "";
      grafico['tipo_grafico'] = "linewithfocuschart";
      grafico['series_1'] = dados[0].trabalhadores.series_1;

      escolherGrafico(3,grafico);

      var txt = '<p>'+dados[0].tx_localidade+' é o '+dados[0].trabalhadores.nr_colocacao_nacional+'º em relação a quantidade de OSCs no âmbito nacional.';
      txt += '</p>';

      $("#tx_trabalhadores").append(txt);


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
