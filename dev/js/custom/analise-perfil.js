require(['rotas','highcharts','jquery',"jquery-ui"], function (React) {

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

  $("#voltaPagAnterior").on("click", function(){
    history.go(-1);
  });

  function addLinkVoltar(id){
  		$("#voltaPerfil").attr("href","analise-perfil.html?localidade="+id);
  }

  var rotas = new Rotas();
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



          var myChart = Highcharts.chart('grafico', {
              chart: {
                  type: 'bar'
              },
              title: {
                  text: 'Fruit Consumption'
              },
              xAxis: {
                  categories: ['Apples', 'Bananas', 'Oranges']
              },
              yAxis: {
                  title: {
                      text: 'Fruit eaten'
                  }
              },
              series: [{
                  name: 'Jane',
                  data: [1, 0, 4]
              }, {
                  name: 'John',
                  data: [5, 7, 3]
              }]
          });







      $( ".dt_pub_news" ).before( $( ".social" ) );
      $( ".social" ).css("display","flex")
      $('.loading').addClass('hide');
      $(".social iframe").each(function() {
        $(this).attr('title', '');
      });
    }
  });

});
