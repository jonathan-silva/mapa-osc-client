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


require(['rotas','jquery-ui','datatables-responsive'], function (React) {



  function popularDadosNoticia(data){
    var sizeOfData = data.length;
    var columns = 2;
    var newData = new Array(sizeOfData);
    var txtVazioNulo = 'Dado não informado.';

    for (var i=0; i < sizeOfData; i++){
      newData[i] = new Array(columns);
      newData[i][0] = '<div><span class="glyphicon glyphicon-search" aria-hidden="true"></span>'+data[i].dt_noticia+'<\div>';
      newData[i][1] = '<ul class="media-list"><li class="media"><a class="pull-left" href="./noticia.html#/'+data[i].cd_noticia+'" target="_self"><img class="media-object img-circle" src="img/noticia/'+data[i].tx_link_img_noticia+'" height="64" width="64"></a><div class="media-body"><h4 class="media-heading"><a class="btn-link" href="./noticia.html#/'+data[i].cd_noticia+'" target="_self">'+data[i].tx_titulo_noticia+'</a></h4><p>'+data[i].tx_resumo_noticia+'</p></div></li></ul>';
    }
    return newData;
  }

  function popularDadosVideo(data){
    var sizeOfData = data.length;
    var columns = 2;
    var newData = new Array(sizeOfData);
    var txtVazioNulo = 'Dado não informado.';

    for (var i=0; i < sizeOfData; i++){
      newData[i] = new Array(columns);
      newData[i][0] = '<div><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>'+data[i].dt_video+'<\div>';
      newData[i][1] = '<ul class="media-list"><li class="media"><a class="pull-left" href="./video.html#/'+data[i].cd_video+'" target="_self"><img class="media-object img-rounded" src="img/video/'+data[i].tx_link_img_video+'" height="64" width="64"></a><div class="media-body"><h4 class="media-heading"><a class="btn-link" href="./video.html#/'+data[i].cd_video+'" target="_self">'+data[i].tx_titulo_video+'</a></h4><p>'+data[i].tx_resumo_video+'</p></div></li></ul>';
    }
    return newData;
  }

  function tabela (div, newData){
    $(div).DataTable({
      responsive: true,
      processing: true,
      deferLoading: 1000,
      deferRender: true,
      searching: false,
      data: newData,
      dom: 'Bfrtip',
      "bSort": true,
      "aaSorting": [[ 0, 'desc' ]],
      columns: [
               {title: "", "width": "50px"},
               {title: ""},
           ]
     });
   }

  var rotas = new Rotas();

  $.ajax({
    url: 'js/controller.php',
    type: 'GET',
    dataType: 'json',
    data: {flag: 'consulta', rota: rotas.Imprensa()},
    error: function(e){
        console.log("ERRO no AJAX :" + e);
        tabela('#noticia_formato_dados','','');
        tabela('#video_formato_dados','','');
        $('.loading').addClass('hide');
    },
    success: function(data){
      var txtVazioNulo = 'Dado não informado.';
      if(data!==undefined){
        if (data.noticia){
          tabela('#noticia_formato_dados', popularDadosNoticia(data.noticias));
        }
        else {
          tabela('#noticia_formato_dados','','');
        }

        if (data.video){
          tabela('#video_formato_dados', popularDadosVideo(data.videos));
        }
        else {
          tabela('#video_formato_dados','','');
        }
      }

      $('.loading').addClass('hide');
    }
  });

  $('#noticia_formato_dados').on( 'draw.dt', function () {
    verificarContraste();
  });

  $('#video_formato_dados').on( 'draw.dt', function () {
    verificarContraste();
  });

  $('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
      $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
  } );
});
