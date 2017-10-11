require(['rotas','jquery',"jquery-ui"], function (React) {
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

  var rotas = new Rotas();

  function carregarMenuMrosc(){

    $.ajax({
      url: 'js/controller.php',
      type: 'GET',
      dataType: 'json',
      data: {flag: 'consulta', rota: rotas.MenuMrosc()},
      error: function(e){
          console.log("ERRO no AJAX :" + e);
      },
      success: function(data){

        var idConteudo = '';
        html = '<ul  class="lead nav nav-tabs nav-pills tabs-left nav-stacked" id="tabMrosc">';
        for (var i = 0; i < data.length; i++) {
            if(i == 0){
              idConteudo = data[i].cd_menu_mrosc;
              html += '<li class="active"><a id="'+data[i].cd_menu_mrosc+'" data-toggle="tab">'+data[i].tx_titulo_menu_mrosc+'</a></li>';
            }else{
                html += '<li><a id="'+data[i].cd_menu_mrosc+'" data-toggle="tab">'+data[i].tx_titulo_menu_mrosc+'</a></li>';
            }
        }
        html += '</ul>';

        $('#menuMrosc').html(html);
        carregarConteudo(idConteudo);

        jQuery('#tabMrosc a').click(function (e) {
            e.preventDefault();
            var idConteudo = $(this).attr('id');
            carregarConteudo(idConteudo);
        });
      }
    });
  }

  function carregarConteudo(idConteudo){
    $('.loading').removeClass('hide');
    $('#conteudoMrosc').empty();

      $.ajax({
        url: 'js/controller.php',
        type: 'GET',
        dataType: 'json',
        data: {flag: 'consulta', rota: rotas.ConteudoMroscByID(idConteudo)},
        error: function(e){
            console.log("ERRO no AJAX :" + e);
        },
        success: function(data){

          html =  '<div class="tab-pane active" >';
          html += '<div class="text-justify txtBloco">'+data[0].conteudoMrosc.tx_descricao_conteudo+'</div>';
          html += '<h5>Fonte: <a href="http://www.participa.br" title="Link Externo para www.participa.br." target="_blank">www.participa.br<img class="imgLinkExterno" src="img/site-ext.gif" width="17" height="11" alt="Site Externo." title="Site Externo."></a></h5>';
          html += '</div>';

          $('#conteudoMrosc').html(html);
          $('.loading').addClass('hide');
        }
      });
  }

  carregarMenuMrosc();

});
