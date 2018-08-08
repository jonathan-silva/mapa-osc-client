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
});

/*
require(['rotas','jquery-ui','datatables-responsive'], function (React) {



  function popularDadosEdital(data){
    var sizeOfData = data.length;
    var columns = 6;
    var newData = new Array(sizeOfData);
    var txtVazioNulo = 'Dado não informado.';


    for (var i=0; i < sizeOfData; i++){
      newData[i] = new Array(columns);
      newData[i][0] = data[i].tx_orgao != null ? data[i].tx_orgao : txtVazioNulo;
      newData[i][1] = data[i].tx_programa != null ? data[i].tx_programa : txtVazioNulo;
      newData[i][2] = data[i].tx_area_interesse_edital != null ? data[i].tx_area_interesse_edital : txtVazioNulo;
      newData[i][3] = data[i].dt_vencimento != null ? data[i].dt_vencimento : txtVazioNulo;
      newData[i][4] = data[i].tx_numero_chamada != null ? data[i].tx_numero_chamada : txtVazioNulo;
      newData[i][5] = "<a  title=\"Link Externo para o edital\" href="+data[i].tx_link_edital+" target=_blank>Abrir o edital<img src=img/site-ext.gif alt=\"Site Externo.\" title=\"Site Externo.\"></a>";
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
      "aaSorting": [[ 3, 'asc' ]],
      columns: [
               {title: "Instituição responsável","width": "25%"},
               {title: "Nome do Programa"},
               {title: "Area de Interesse"},
               {title: "Data de Vencimento"},
               {title: "Número da Chamada"},
               {title: "Edital","width": "5%"}
           ]
     });
   }

    var rotas = new Rotas();

  $.ajax({
    url: rotas.Edital(),
    type: 'GET',
    dataType: 'json',
    error: function(e){
        console.log("ERRO no AJAX :" + e);
    },
    success: function(data){
      var txtVazioNulo = 'Dado não informado.';
      if(data!==undefined){
        if (data.ativos){
        tabela('#editais_formato_dados', popularDadosEdital(data.ativos));
        }
        else {
          console.log(txtVazioNulo);
          tabela('#editais_formato_dados','','','','','','')
        }
        if (data.encerrados){
        tabela('#encerrados_formato_dados', popularDadosEdital(data.encerrados));
        }
        else {
          console.log(txtVazioNulo);
          tabela('#encerrados_formato_dados','','','','','','')
        }
      }

      $('.loading').addClass('hide');
    }
  });

  $('#editais_formato_dados').on( 'draw.dt', function () {
    verificarContraste();
  });

  $('#encerrados_formato_dados').on( 'draw.dt', function () {
    verificarContraste();
  });

  $('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
      $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
  } );
});
*/
