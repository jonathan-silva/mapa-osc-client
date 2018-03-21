require(['rotas','jquery-ui'], function (React) {

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

  var rotas = new Rotas();
  var urlCMS = rotas.getBaseUrlCMS();
  var modulo = "acessibilidade";

  $.ajax({
    url: 'js/controller.php',
    type: 'GET',
    dataType: 'json',
    data: {flag: 'consulta', rota: rotas.ModuloBySlug(modulo)},
    error: function(e){
        console.log("ERRO no AJAX :" + e);
    },
    success: function(data){
      var html = "";
      if (data.length > 0){

        html = '<div class="row"><div class="col-md-12"><h1 class="text-primary">'+data[0].modulos.tx_titulo_modulo+'</h1><hr></div></div>';
        html += '<div class="row"><div class="col-md-12"><div class="text-justify txtBloco">'+data[0].modulos.tx_descricao_modulo+'</div>';
        html += '<a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div></div>';

        if(data[0].itens.length > 0){
          for (var i in data[0].itens) {
            html += '<div class="row"><div class="col-md-12"><h3 class="subTitulo">'+data[0].itens[i].tx_titulo_itens+'</h3>';
            html += '<div class="text-justify txtBloco">'+data[0].itens[i].tx_descricao_itens+'</div>';
            html += '<a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div></div>';
          }
        }
      }
      $('#acessibilidade').append(html);
      $('.loading').addClass('hide');

      $(".scroll").click(function(event){
          event.preventDefault();
          $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
     });

    }
  });

});
