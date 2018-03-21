require(['rotas',"jquery-ui"], function (React) {

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
  var urlCMS = rotas.getBaseUrlCMS();
  var modulo = "historico_notas";

  $.ajax({
    url: 'js/controller.php',
    type: 'GET',
    dataType: 'json',
    data: {flag: 'consulta', rota: rotas.ModuloBySlug(modulo)},
    error: function(e){
        console.log("ERRO no AJAX :" + e);
    },
    success: function(data){

      if (data.length > 0){

        var html = '<div class="col-md-12">';
        html += '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';

        for (var i in data[0].itens){
          var heading = "heading_"+i;
          var idColapse = "collapse_"+i;
          html += '<div class="panel panel-default">';
          html += '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#'+idColapse+'" aria-expanded="true" aria-controls="#'+idColapse+'">';
          html += '<div class="panel-heading" role="tab" id="'+heading+'">';
          html += '<h4 class="panel-title"><b>'+data[0].itens[i].tx_titulo_itens+'</b>';
          html += '<span class="glyphicon glyphicon-plus" style="float:right" aria-hidden="true"></span></h4></div></a>';

          html += '<div id="'+idColapse+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="'+heading+'">';
          html += '<div class="panel-body">'+data[0].itens[i].tx_descricao_itens+'</div></div></div>';
        }

        html += '</div></div>';

        $('#historico_notas').append(html);
        $('.loading').addClass('hide');
      }
    }
  });

});
