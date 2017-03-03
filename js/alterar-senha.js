require(['react', 'jsx!components/Util','jquery-ui','rotas','tagsinput'], function (React) {
  require(['componenteFormItem'], function(FormItem){
    function FormItens(id, label, type, obrigatorio){
      this.id = id;
      this.label = label;
      this.type = type;
      this.obrigatorio = obrigatorio;
      this.fonte = false;
    }

    //formulario 1
    var hd = 'Dados de Identificação.';
    var id = ['senha','confirmarSenha'];
    var label = ['Senha','Confirmar Senha'];
    var type = ['password','password'];
    var obrigatorio = [ true, true];
    var formItens = [];

    for (var j=0; j<id.length; j++){
      formItens.push(new FormItens(id[j], label[j], type[j], obrigatorio[j]));
    }

    FormItem = React.createFactory(FormItem);
    ReactDOM.render(FormItem({header:hd, dados:formItens}), document.getElementById("form-dados"));
   });

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
   var controller = "js/controller.php";

   $.ajax({
       url: rotas.ValidarUsuario(user),
       type: 'GET',
       dataType: "json",
       data: newJson,
       success: function(data) {
         $('#nome').val(data.tx_nome_usuario);
         $('#email').val(data.tx_email_usuario);
       },
       error: function(e) {
           console.log(e);
           $('#modalMensagem').modal({backdrop: 'static', keyboard: false});
           $('#modalTitle').text('Erro');
           $('#modalConteudo').text('É necessário estar logado no sistema para acessar essa página.');
           $('.modal-footer button').on('click', function(){
             history.go(-1);
           });
           $('#modalMensagem').modal('show');
       }
   });

   $('#send').on('click', function(){
      var senha = $('#senha').val();
      var confirmarSenha = $('#confirmarSenha').val();
      var error = true;

      if(senha !== '' ){
        if(senha.length > 5 ){
          if (confirmarSenha === senha)
          {
              $("#senha").closest('.form-group').removeClass('has-error').addClass('has-success');
              $("#confirmarSenha").closest('.form-group').removeClass('has-error').addClass('has-success');
              if(error){
                error = true;
              }
              else {
                error = false;
              }
          } else {
              $("#senha").closest('.form-group').removeClass('has-success').addClass('has-error');
              $("#confirmarSenha").closest('.form-group').removeClass('has-success').addClass('has-error');
              $("#confirmarSenha").closest('.form-group').append('<div class="form-group row-centered"><span id="labelError" class="label label-danger centered">Erro: Confirmar senha tem que ser igual senha!</span></div>');
              error = true;
          }
        }else {
          error = true;
          $("#senha").closest('.form-group').removeClass('has-success').addClass('has-error');
          $("#confirmarSenha").closest('.form-group').removeClass('has-success').addClass('has-error');
          $("#senha").closest('.form-group').append('<div class="form-group row-centered"><span id="labelError" class="label label-danger centered">Erro: Senha é Menor que 6 Caracteres!</span></div>');
        }
      }

      if(!error){
        if(senha !== '' && senha !== null && senha.length > 5)
          newJson['tx_senha_usuario'] = senha;
        newJson['id_usuario'] = user;

        $.ajax({
            url: rotas.UpdateUsuario(user),
            type: 'POST',
            dataType: "json",
            data: newJson,
            success: function(data) {
              $('#modalTitle').text('Sucesso');
              $('#modalConteudo').text('Sua atualização foi realizada com sucesso. É necessário realizar o login novamente.');
              $('#modalMensagem').modal('show');
            },
            error: function(e) {
                console.log(e);
            }
        });
      }
    });
});
