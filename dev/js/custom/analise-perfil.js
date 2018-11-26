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

      var html = '<div class="row"><div class="col-md-12"><h2 class="text-primary">'+data.tx_localidade+'</h2><hr></div></div>';

      html += '<div class="text-justify txtBloco">'+data.tx_descricao_noticia+'</div>';

      $('#perfil').append(html);










      $( ".dt_pub_news" ).before( $( ".social" ) );
      $( ".social" ).css("display","flex")
      $('.loading').addClass('hide');
      $(".social iframe").each(function() {
        $(this).attr('title', '');
      });
    }
  });

});
