require(['rotas','jquery',"jquery-ui"], function (React) {

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
  		$("#voltaVideo").attr("href","video.html#/"+id);
  }

  var rotas = new Rotas();
  var valoresURL = window.location.href.split('#')[1]!==undefined ? window.location.href.split('#/')[1].split('=') : null;
  var idVideo = "";

  if(valoresURL !== null){
    idVideo = valoresURL[0];
    addLinkVoltar(idVideo);
  }

  function abrirModalVideo(titulo, corpo){
    $("#modalTitulo").html("");
    $("#modalTitulo").html(titulo);
    $("#corpoModal").html("");
    $("#corpoModal").html(corpo);
    $("#modalVideo").modal('show');
    verificarContraste();
  }

  $.ajax({
    url: 'js/controller.php',
    type: 'GET',
    dataType: 'json',
    data: {flag: 'consulta', rota: rotas.VideoByID(idVideo)},
    error: function(e){
        console.log("ERRO no AJAX :" + e);
    },
    success: function(data){

      var html = '<h3 class="subTitulo text-capitalize">'+data.tx_titulo_video+'</h3>';
      html += '<span class="glyphicon glyphicon-calendar txtData" aria-hidden="true"> '+data.dt_video+'</span>';
      var link_video = data.tx_link_video.replace("https://www.youtube.com/watch?v=","https://www.youtube.com/embed/");
      html += '<div><center><iframe width="853" height="480" src="'+link_video+'?rel=0" frameborder="0" allowfullscreen></iframe></center></div>';
      html += '<div class="text-justify txtBloco">';
      html += '<h5>'+data.tx_resumo_video+'<a id="versaoTexto" class="btn-item" data-toggle="modal" title="Versão em Texto."> Versão em texto.</a></h5>';
      html += '</div>';

      $('#video').append(html);
      $('.loading').addClass('hide');

      $("#versaoTexto").click(function(){
          abrirModalVideo(data.tx_titulo_video,data.tx_descricao_video);
      });
    }
  });

});
