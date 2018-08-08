require(["jquery-ui", "rotas", "bootstrap"], function (React) {
  var rotas = new Rotas();
  var valoresURL = window.location.href.split('?')[1]!==undefined ? window.location.href.split('?')[1].split('=') : null;
  var tipoConsulta;

  if(valoresURL!==null){
        tipoConsulta = valoresURL[0];
        var stringBuscada = valoresURL[1];
        var $modal = $('#modalMensagem');
        stringBuscada = stringBuscada.replace(/\./g, "");
        stringBuscada = stringBuscada.split('#')[0];

        if((tipoConsulta=="token")&&(stringBuscada)){
              $.ajax({
                   url: rotas.AtivarUsuario(stringBuscada),
                   type: 'GET',
                   dataType: 'json',
                   error:function(data){
                     if (data.status == 200){
                       jQuery("#modalTitle").text("Solicitação realizada com sucesso!");
                       jQuery("#modalConteudo").text("Usuário Validado");
                       $modal.modal('show');
                       $modal.on('hidden.bs.modal', function () {
                         pagInicial();
                       });
                     }else{
                       jQuery("#modalTitle").text("Problema na solicitação!");
                       jQuery("#modalConteudo").text(JSON.parse(data.responseText).msg);
                       $modal.modal('show');
                       $modal.on('hidden.bs.modal', function () {
                         pagInicial();
                       });
                     }
                   },
                   success: function(data){
                     jQuery("#modalTitle").text("Solicitação realizada com sucesso!");
                     jQuery("#modalConteudo").text("Usuário Validado");
                     $modal.modal('show');
                     $modal.on('hidden.bs.modal', function () {
                       pagInicial();
                     });
                   }
               }); //final envio ajax

        }else{
          pagInicial();
        }
  }else{
    //chamada vazia. Redirecionar para a página principal
    pagInicial();
  }

  function pagInicial(){
    link = "./index.html";
    location.href=link;
  };
});
