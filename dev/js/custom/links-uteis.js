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

require(['react', 'rotas','jsx!components/Util'], function (React) {

  require(['componenteLinksUteis'], function(LinksUteis){
    function LinkUtil(titulo, desc, imagem, elo, linkExterno){
      this.titulo = titulo;
      this.desc = desc;
      this.imagem = imagem;
      this.elo = elo;
      this.linkExterno = linkExterno;
    }

    var rotas = new Rotas();

    $.ajax({
      url: rotas.ModuloLinks(),
      type: 'GET',
      dataType: 'json',
      error: function(e){
          console.log("ERRO no AJAX :" + e);
      },
      success: function(data){

        var linksuteis = [];
        if (data.length > 0){
          for (var i in data) {
            var src_link = '/cms/imagens/links/xs-'+ data[i].tx_imagem_link;
            linksuteis.push(new LinkUtil(data[i].tx_titulo_link, data[i].tx_descricao_link, src_link, data[i].tx_link_link, true));
          }
        }

        LinksUteis = React.createFactory(LinksUteis);
        ReactDOM.render(LinksUteis({dados:linksuteis}), document.getElementById("linksuteis_formato_dados"));
        $('.loading').addClass('hide');

      }
    });

  });



});
