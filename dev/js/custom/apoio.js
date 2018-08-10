require(["jquery-ui"], function (React) {

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


require(['rotas',"jquery-ui"], function (React) {

    var rotas = new Rotas();

    $.ajax({
      url: 'js/controller.php',
      type: 'GET',
      dataType: 'json',
      data: {flag: 'consulta', rota: rotas.ModuloApoio()},
      error: function(e){
          console.log("ERRO no AJAX :" + e);
          $('.manutencao').css('display', 'block');
          $('.loading').addClass('hide');
      },
      success: function(data){
        if (data.length > 0){
          var modulo_html ="";
          for (var i in data) {
            var src_link = '/cms/imagens/apoios/'+ data[i].tx_imagem_apoio;
            modulo_html += '<div class="img-apoio"><a target="_blank" href="'+data[i].tx_link_apoio+'" title="Link externo '+data[i].tx_titulo_apoio+'">';
            modulo_html += '<img src='+src_link+' alt='+data[i].tx_titulo_apoio+'></a></div>';
          }
          $('#apoio').append(modulo_html);
        }
        else{
          $('.manutencao').css('display', 'block');
        }
        $('.loading').addClass('hide');

      }
    });
});
