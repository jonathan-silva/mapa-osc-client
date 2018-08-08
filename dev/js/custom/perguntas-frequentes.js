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
  var modulo = "perguntas_frequentes";

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

        var html = '<div class="row"><div class="col-md-12"><h1 class="text-primary">'+data[0].modulos.tx_titulo_modulo+'</h1><hr></div></div>';
        html += '<div class="row"><div class="col-md-12"><div class="text-justify txtBloco">'+data[0].modulos.tx_descricao_modulo+'</div></div></div>';

        html += '<div id="accordion">';
        var num = 0;
        for (var i in data[0].itens){
          num = parseInt(i)+1;
          html += '<h3>'+num+'- '+data[0].itens[i].tx_titulo_itens+'</h3>';
          html += '<div>'+data[0].itens[i].tx_descricao_itens+'</div>';
        }

        html += '</div>';

        $('#perguntas_frequentes').append(html);

        var icons = {
          header: "ui-icon-circle-arrow-e",
          activeHeader: "ui-icon-circle-arrow-s"
        };
        $("#accordion").accordion({
           collapsible: true,
           heightStyle: "content",
           icons: icons
        });
        $("#toggle").button().on("click", function() {
          if ($("#accordion").accordion("option","icons")) {
            $("#accordion").accordion("option","icons",null );
          } else {
            $("#accordion").accordion("option","icons",icons);
          }
        });
      }
      else{
        $('.manutencao').css('display', 'block');
      }

      $('.loading').addClass('hide');
    }
  });

});
