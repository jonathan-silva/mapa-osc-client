require(['jquery-ui'], function (React) {

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


require(['react', 'jsx!components/Util','jquery-ui','rotas', 'datatables-responsive', 'simplePagination'], function (React) {

   var user = window.localStorage.getItem('User');
   var auth  = window.localStorage.getItem('Authorization');

   var authHeader = {
     "User": user,
     "Authorization": auth
   };

   var newJson = {};
   newJson['headers'] = authHeader;

   var $id_osc = '';
   var rotas = new Rotas();
   var limiteAutocomplete = 10;
   var controller = "js/controller.php";

   $.ajax({
       url: controller,
       type: 'GET',
       dataType: "json",
       data: {flag: 'validaUsuario', rota: rotas.ValidarUsuario(user), parametros: newJson},
       success: function(data) {

         var columns = 3;
         var sizeOfData = data.representacao.length;
         newData = new Array(sizeOfData);
         var i = 0;
         var txtVazioNulo = 'Dado não informado.';

         for (var j = 0; j < data.representacao.length; j++){
             newData[i] = new Array(columns);
             newData[i][0] = data.representacao[j].tx_nome_osc !== null ? data.representacao[j].tx_nome_osc : txtVazioNulo;//tx_nome_osc;
             newData[i][1] = '<button title="Clique para Detalhar" type="button" onclick="location.href=\'visualizar-osc.html#/'+data.representacao[j].id_osc+'\';" class="btn btn-info"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Detalhar</button>';
             newData[i][2] = '<button title="Clique para Editar" type="button" onclick="location.href=\'editar-osc.html#/'+data.representacao[j].id_osc+'\';" class="btn btn-info"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Editar</button>';
             i++;
         }

         //Se a pesquisa for alguma palavra que não tem referencia com nenhuma OSC
         if(typeof newData[0] !== "undefined"){
           var datatable = $('#lista_minhas_oscs').DataTable({
             responsive: true,
             processing: true,
             deferLoading: 1000,
             deferRender: true,
             searching: false,
             data: newData,
             dom: 'Bfrtip',
             "bPaginate": false,
             "bSort": true,
             "aaSorting": [[ 1, 'asc' ]],
              columns: [
                      {title: "Nome da OSC"},
                      {title: "Detalhar"},
                      {title: "Editar"}
                  ],
              aoColumnDefs: [
                {bSortable :false, aTargets: [0]},
                {bSortable :false, aTargets: [1]},
                {bSortable :false, aTargets: [2]}
              ],
              autoWidth: true
            });
            datatable.destroy();
            datatable.draw();

            $('#loading').addClass('hide');
          }
          else {
             $('#modalMensagem').modal({backdrop: 'static', keyboard: false});
             $('#modalTitle').text('Nenhuma OSC encontrada');
             $('#modalMensagem').modal('show');
          }

       },
       error: function(e) {
           $('#modalMensagem').modal({backdrop: 'static', keyboard: false});
           $('#modalTitle').text('Erro');
           $('#modalConteudo').text('É necessário estar logado no sistema para acessar essa página.');
           $('.modal-footer button').on('click', function(){
             history.go(-1);
           });
           $('#modalMensagem').modal('show');
       }
    });

    $('#lista_minhas_oscs').on( 'draw.dt', function () {
      verificarContraste();
    });

  });
