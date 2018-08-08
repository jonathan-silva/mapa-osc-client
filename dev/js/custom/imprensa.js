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

  var rotas = new Rotas();
  var urlCMS = rotas.getBaseUrlCMS();

  function popularDadosNoticia(data){
    var sizeOfData = data.length;
    var columns = 2;
    var newData = new Array(sizeOfData);
    var txtVazioNulo = 'Dado não informado.';
    var src_link = '';
    var link_erro = "this.src='img/noticia_icon.png'";

    for (var i=0; i < sizeOfData; i++){
      newData[i] = new Array(columns);
      newData[i][0] = '<div><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> '+data[i].dt_noticia+'<\div>';

      if(data[i].tx_link_img_noticia != null && data[i].tx_link_img_noticia != ""){
        src_link =  urlCMS+'/imagens/noticias/xs-'+data[i].tx_link_img_noticia;
      }
      else{
        src_link = 'img/noticia_icon.png';
      }
      newData[i][1] = '<ul class="media-list"><li class="media"><a class="pull-left" href="./noticia.html#/'+data[i].cd_noticia+'" target="_self"><img class="media-object img-rounded" src="'+src_link+'" height="80" width="120" onerror="'+link_erro+';"></a><div class="media-body"><h4 class="media-heading"><a class="btn-link" href="./noticia.html#/'+data[i].cd_noticia+'" target="_self">'+data[i].tx_titulo_noticia+'</a></h4><p>'+data[i].tx_resumo_noticia+'</p></div></li></ul>';
    }
    return newData;
  }

  function popularDadosVideo(data){
    var sizeOfData = data.length;
    var columns = 2;
    var newData = new Array(sizeOfData);
    var txtVazioNulo = 'Dado não informado.';
    var src_link = '';
    var link_erro = "this.src='img/video_icon.png'";

    for (var i=0; i < sizeOfData; i++){
      newData[i] = new Array(columns);
      newData[i][0] = '<div><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> '+data[i].dt_video+'<\div>';
      if(data[i].tx_link_img_video != null && data[i].tx_link_img_video != ""){
        src_link = urlCMS+'/imagens/videos/xs-'+data[i].tx_link_img_video;
      }
      else{
        src_link = 'img/video_icon.png';
      }
      newData[i][1] = '<ul class="media-list"><li class="media"><a class="pull-left" href="./video.html#/'+data[i].cd_video+'" target="_self"><img class="media-object img-rounded" src="'+src_link+'" height="80" width="120" onerror="'+link_erro+';"></a><div class="media-body"><h4 class="media-heading"><a class="btn-link" href="./video.html#/'+data[i].cd_video+'" target="_self">'+data[i].tx_titulo_video+'</a></h4><p>'+data[i].tx_resumo_video+'</p></div></li></ul>';
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
               {title: "", "width": "80px"},
               {title: ""},
           ]
     });
   }


  $.ajax({
    url: rotas.Imprensa(),
    type: 'GET',
    dataType: 'json',
    error: function(e){
        console.log("ERRO no AJAX :" + e);
        tabela('#noticia_formato_dados','','');
        tabela('#video_formato_dados','','');
        $('.loading').addClass('hide');
    },
    success: function(data){
      var txtVazioNulo = 'Dado não informado.';
      if(data !== undefined && data[0] !== undefined){
        if (data[0].noticias){
          tabela('#noticia_formato_dados', popularDadosNoticia(data[0].noticias));
        }
        else {
          tabela('#noticia_formato_dados','','');
        }

        if (data[0].videos){
          tabela('#video_formato_dados', popularDadosVideo(data[0].videos));
        }
        else {
          tabela('#video_formato_dados','','');
        }
      }

      $('.loading').addClass('hide');

      $('#noticia_formato_dados').on( 'draw.dt', function () {
        verificarContraste();
      });

      $('#video_formato_dados').on( 'draw.dt', function () {
        verificarContraste();
      });

      $('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
          $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
      } );
    }
  });

});
