require(["jquery-ui","rotas"], function (React) {

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
  var modulo = "metodologia";

  $.ajax({
    url: 'js/controller.php',
    type: 'GET',
    dataType: 'json',
    data: {flag: 'consulta', rota: rotas.ModuloBySlug(modulo)},
    error: function(e){
        console.log("ERRO no AJAX :" + e);
    },
    success: function(data){
      var menu_html = "";
      var html = "";
      if (data.length > 0){

        menu_html += '<div class="row"><div class="col-md-12"><h1 class="text-primary">'+data[0].modulos.tx_titulo_modulo+'</h1><hr></div></div>';
        html += '<div class="row"><div class="col-md-12"><div class="text-justify txtBloco">'+data[0].modulos.tx_descricao_modulo+'</div></div></div>';

        if(data[0].itens.length > 0){
          var menu = 0;
          menu_html += '<ul class="nav nav-pills">';
          for (var i in data[0].itens) {
            menu = parseInt(i)+1;
            if(data[0].itens[i].tx_titulo_itens != 'Final'){
              menu_html += '<li><a href="#item_'+menu+'" class="scroll">'+data[0].itens[i].tx_titulo_itens+'</a></li>';
            }

            if(data[0].itens[i].tx_titulo_itens == 'Final'){
              var end_html = '<div class="row"><div class="col-md-12">';
              end_html += '<div class="text-justify">'+data[0].itens[i].tx_descricao_itens+'</div>';
              end_html += '<a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div></div>';

            }else if(data[0].itens[i].tx_titulo_itens == 'Descrição das bases de dados'){
              var pop_html = '<a id="item_'+menu+'" name="item_'+menu+'" href="#descricao_bases_dados" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="descricao_bases_dados" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Saiba mais sobre as descrições das bases de dados</a>';
              pop_html += '<div class="collapse" id="descricao_bases_dados">';
              pop_html += '<div class="well">';
              pop_html += '<div class="row"><div class="col-md-12"><h4 class="subTitulo">'+data[0].itens[i].tx_titulo_itens+'</h4>';
              pop_html += '<div class="text-justify">'+data[0].itens[i].tx_descricao_itens+'</div>';
              pop_html += '<a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div></div>';
            }
            else{
              html += '<div id="item_'+menu+'" name="item_'+menu+'" class="row"><div class="col-md-12"><h4 class="subTitulo">'+data[0].itens[i].tx_titulo_itens+'</h4>';
              html += '<div class="text-justify">'+data[0].itens[i].tx_descricao_itens+'</div>';
              html += '<a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div></div>';
            }
          }
          menu_html += '</ul>';
        }
      }

      $('#metodologia').append(menu_html);
      $('#metodologia').append(html);
      $('#metodologia').append(pop_html);
      $('#metodologia').append(end_html);

      $('.loading').addClass('hide');

      $(".scroll").click(function(event){
         event.preventDefault();
         $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
      });

    }
  });

});
