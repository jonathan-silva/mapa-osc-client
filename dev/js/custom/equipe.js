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

  jQuery(document).ready(function($) {
      $(".scroll").click(function(event){
          event.preventDefault();
          $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
     });
  });

  var rotas = new Rotas();

  $.ajax({
    url: 'js/controller.php',
    type: 'GET',
    dataType: 'json',
    data: {flag: 'consulta', rota: rotas.ModuloEquipe()},
    error: function(e){
        console.log("ERRO no AJAX :" + e);
        $('.manutencao').css('display', 'block');
        $('.loading').addClass('hide');
    },
    success: function(data){
      if (data.length > 0){
        var link_erro = "this.src='img/sem_img_user.png'";
        var src_link = '';

        var modulo_html = '<div class="row"><div class="col-md-12"><h1 class="text-primary">'+data[0].equipe[0].tx_titulo_equipe+'</h1><hr></div></div>';
        modulo_html += '<div class="row"><div class="col-md-12"><h3 class="subTitulo">'+data[0].equipe[0].tx_sub_titulo_equipe+'</h3>';
        modulo_html += '<div class="text-justify txtBloco">'+data[0].equipe[0].tx_descricao_equipe+'</div>';
        modulo_html += '</div></div>';

        if(data[0].versoes.length > 0){
          modulo_html += '<ul class="media-list">';
          for (var i in data[0].versoes) {

            modulo_html += '<li class="media"><div class="media-left"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></div>';
            modulo_html += '<div class="media-body"><h4 class="media-heading">'+data[0].versoes[i].tx_titulo_versao+'</h4>';
            modulo_html += '<h5 class="media-heading">'+data[0].versoes[i].tx_descricao_itens+'</h5>';

            modulo_html += '<dl class="dl-horizontal">';
            if(data[0].versoes[i].coordenadores.length > 0){
              modulo_html += '<dt>Coordenadores</dt>';
              for (var j in data[0].versoes[i].coordenadores) {

                if(data[0].versoes[i].coordenadores[j].tx_imagem_equipe != null && data[0].versoes[i].coordenadores[j].tx_imagem_equipe != ""){
                  src_link = '/cms/imagens/integrantes/xs-'+data[0].versoes[i].coordenadores[j].tx_imagem_equipe;
                }
                else{
                  src_link = 'img/sem_img_user.png';
                }

                if(data[0].versoes[i].coordenadores[j].tx_url_equipe != ""){
                  modulo_html += '<dd><a href="'+data[0].versoes[i].coordenadores[j].tx_url_equipe+'" title="Site externo" target="_blank"><img class="img-circle imgEquipe" src="'+src_link+'" height="32" width="32" onerror="'+link_erro+';"></img>'+data[0].versoes[i].coordenadores[j].tx_nome_equipe+'</a></dd>';
                }else {
                  modulo_html += '<dd><img class="img-circle imgEquipe" src="'+src_link+'" height="32" width="32" onerror="'+link_erro+';"></img>'+data[0].versoes[i].coordenadores[j].tx_nome_equipe+'</dd>';
                }
              }
            }

            modulo_html += '<dt>Equipe Técnica</dt><dd>';

            if(data[0].versoes[i].coordenadores_equipe.length > 0){
              for (var j in data[0].versoes[i].coordenadores_equipe) {
                if(data[0].versoes[i].coordenadores_equipe[j].tx_imagem_equipe != null && data[0].versoes[i].coordenadores_equipe[j].tx_imagem_equipe != ""){
                  src_link = '/cms/imagens/integrantes/xs-'+data[0].versoes[i].coordenadores_equipe[j].tx_imagem_equipe;
                }
                else{
                  src_link = 'img/sem_img_user.png';
                }

                if(data[0].versoes[i].coordenadores_equipe[j].tx_url_equipe != ""){
                  modulo_html += '<div><span><a href="'+data[0].versoes[i].coordenadores_equipe[j].tx_url_equipe+'" title="Site externo" target="_blank"><img class="img-circle imgEquipe" src="'+src_link+'" height="32" width="32" onerror="'+link_erro+';"></img>'+data[0].versoes[i].coordenadores_equipe[j].tx_nome_equipe+'</a><i> (coordenador técnico)</i></span></div>';
                }else {
                  modulo_html += '<div><span><img class="img-circle imgEquipe" src="'+src_link+'" height="32" width="32"  onerror="'+link_erro+';"></img>'+data[0].versoes[i].coordenadores_equipe[j].tx_nome_equipe+'</span><i> (coordenador técnico)</i></div>';
                }
              }
            }

            if(data[0].versoes[i].equipe.length > 0){
              for (var j in data[0].versoes[i].equipe) {
                if(data[0].versoes[i].equipe[j].tx_imagem_equipe != null && data[0].versoes[i].equipe[j].tx_imagem_equipe != ""){
                  src_link = '/cms/imagens/integrantes/xs-'+data[0].versoes[i].equipe[j].tx_imagem_equipe;
                }
                else{
                  src_link = 'img/sem_img_user.png';
                }

                if(data[0].versoes[i].equipe[j].tx_url_equipe != ""){
                  modulo_html += '<div><span><a href="'+data[0].versoes[i].equipe[j].tx_url_equipe+'" title="Site externo" target="_blank"><img class="img-circle imgEquipe" src="'+src_link+'" height="32" width="32" onerror="'+link_erro+';"></img>'+data[0].versoes[i].equipe[j].tx_nome_equipe+'</a></span></div>';
                }else {
                  modulo_html += '<div><span><img class="img-circle imgEquipe" src="'+src_link+'" height="32" width="32"  onerror="'+link_erro+';"></img>'+data[0].versoes[i].equipe[j].tx_nome_equipe+'</span></div>';
                }
              }
            }
            modulo_html += '</dd>';
            modulo_html += '</dl><a href="#header" name="header" class="scroll topo">Voltar para o topo</a></li>';
          }
          modulo_html += '</ul>';
        }
        $('#equipe').prepend(modulo_html);
      }
      else{
        $('.manutencao').css('display', 'block');
      }
      $('.loading').addClass('hide');
    }
  });

  });
