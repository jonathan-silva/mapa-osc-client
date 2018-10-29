require(["rotas","jquery-ui"], function (React) {

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

  var rotas = new Rotas();
  var modulo = "base_dados";

  $.ajax({
    url: rotas.ModuloBySlug(modulo),
    type: 'GET',
    dataType: 'json',
    error: function(e){
        console.log("ERRO no AJAX :" + e);
        $('.manutencao').css('display', 'block');
        $('.loading').addClass('hide');
    },
    success: function(data){
      if (data.length > 0){

        var dataAtual = new Date();
        var mes = getMesExtenso(dataAtual.getMonth());
        var ano = dataAtual.getFullYear();
        var dataHora = mostrarData(mes, ano);

        var html = '<div class="row"><div class="col-md-12"><h1 class="text-primary">'+data[0].modulos.tx_titulo_modulo+'</h1><hr></div></div>';
        html += '<div class="row"><div class="col-md-12 txt_datahora">'+data[0].modulos.tx_descricao_modulo+'<b>&nbsp;'+dataHora+'</b>.</div></div>';

        if(data[0].itens.length > 0){
          html += '<div class="row"><div class="col-md-12"><ul class="media-list">';

          for (var i in data[0].itens) {
            html += '<li class="media tutorial"><div class="media-left"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></div><div class="media-body">';
            html += '<h4 class="media-heading">'+data[0].itens[i].tx_titulo_itens+'</h4>';
            html += '<div class="text-justify">'+data[0].itens[i].tx_descricao_itens+'</div></div></li>';
          }
          html += '</div></div></ul>';
        }
        $('#base_dados').prepend(html);
      }
      else{
        $('.manutencao').css('display', 'block');
      }
      $('.loading').addClass('hide');
    }
  });

function mostrarData(mes, ano){
    var dataHora = mes + " de " + ano;
    return dataHora;
}

function getMesExtenso(mes){
    var arrayMes = new Array(12);
    arrayMes[0] = "Janeiro";
    arrayMes[1] = "Fevereiro";
    arrayMes[2] = "Março";
    arrayMes[3] = "Abril";
    arrayMes[4] = "Maio";
    arrayMes[5] = "Junho";
    arrayMes[6] = "Julho";
    arrayMes[7] = "Agosto";
    arrayMes[8] = "Setembro";
    arrayMes[9] = "Outubro";
    arrayMes[10] = "Novembro";
    arrayMes[11] = "Dezembro";

    return arrayMes[mes];
}

});
