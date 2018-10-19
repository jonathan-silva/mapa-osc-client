require(['jquery-ui'], function (React) {
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

});


require(["rotas","nv.d3.lib","graficoParaTabela"], function (React) {
  var rotas = new Rotas();

  $.ajax({
    url: rotas.GraficosSlug("indicadores"),
    type: 'GET',
    async: false,
    dataType: 'json',
    error: function(e){
      console.log("Erro no ajax: ");
      console.log(e);
    },
    success: function(idsGraficos){

      if(idsGraficos != null ){
        for (var i = 0; i < idsGraficos.length; i++) {

          $.ajax({
            url: rotas.RecuperarGrafico(idsGraficos[i]),
            type: 'GET',
            async: false,
            dataType: 'json',
            error: function(e){
              console.log("Erro no ajax: ");
              console.log(e);
            },
            success: function(data){

              if(data != null ){
                var menu_msg = "";
                var grafico_msg = "";
                var fontes = ". ";

                var num = i+1;
                if(i == 0){
                  menu_msg += '<li class="active"><a href="#dado-'+num+'" data-toggle="tab">'+num+'-'+data.titulo+'</a></li>';

                  grafico_msg += '<div class="tab-pane active" id="dado-'+num+'">';
                  grafico_msg += '<h4>'+num+'-'+data.titulo+'</h4>';
                  grafico_msg += '<div class="chart-container" id="grafico-'+num+'"><svg></svg></div>';

                  if(data.fontes != null){
                    fontes = data.fontes.join(", ");
                    fontes += ". ";
                  }
                  grafico_msg += '<h5>Fonte: '+ fontes;
                  if(data.legenda != null){
                    grafico_msg += data.legenda;
                  }
                  grafico_msg += '<a id="tabela-'+num+'" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5></div>';
                }
                else{
                  menu_msg += '<li><a href="#dado-'+num+'" data-toggle="tab">'+num+'-'+data.titulo+'</a></li>';

                  grafico_msg += '<div class="tab-pane" id="dado-'+num+'">';
                  grafico_msg += '<h4>'+num+'-'+data.titulo+'</h4>';
                  grafico_msg += '<div class="chart-container" id="grafico-'+num+'"><svg></svg></div>';

                  if(data.fontes != null){
                    fontes = data.fontes.join(", ");
                    fontes += ". ";
                  }
                  grafico_msg += '<h5>Fonte: '+ fontes;
                  if(data.legenda != null){
                    grafico_msg += data.legenda;
                  }
                  grafico_msg += '<a id="tabela-'+num+'" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5></div>';
                }
                $("#tabGrafico").append(menu_msg);
                $("#graficosView").append(grafico_msg);

                escolherGrafico(num,data);
              }
            }
          });
        }
      }
    }
  });


  jQuery('#tabGrafico a').click(function (e) {
      e.preventDefault()
      jQuery(this).tab('show')
      jQuery(window).trigger('resize'); // Added this line to force NVD3 to redraw the chart
  })

} );
