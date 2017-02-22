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
   var limiteAutocomplete = 10;
   var controller = "js/controller.php";
   $('#tag').tagsinput({
       cancelConfirmKeysOnEmpty: false,
       freeInput: false,
       itemValue: 'id',
       itemText: 'text'
      });

   $.ajax({
       url: rotas.ValidarUsuario(user),
       type: 'GET',
       dataType: "json",
       data: newJson,
       success: function(data) {
         $('#nome').val(data.tx_nome_usuario);
         $('#email').val(data.tx_email_usuario);
         for (var i = 0; i < data.representacao.length; i++){
           $('#tags').removeClass('hide');
           $('#tag').tagsinput('add', {id: data.representacao[i].id_osc, text: data.representacao[i].tx_nome_osc});
         }
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

   require(["jquery-ui", "rotas"], function(React) {
       $("#nomeEntidade.form-control").autocomplete({
           minLength: 14,
           source: function(request, response) {
               $.ajax({
                   url: controller,
                   type: 'GET',
                   dataType: "json",
                   data: {
                       flag: 'autocomplete',
                       rota: rotas.AutocompleteOSCByCnpj(replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocomplete)
                   },
                   success: function(data) {
                     if (data === null){
                         $("#nomeEntidade.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                     }else{
                       $("#nomeEntidade.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                     }
                     response($.map(data, function(item) {
                         return {
                             label: item.tx_nome_osc,
                             value: item.tx_nome_osc,
                             id:    item.id_osc
                         };
                     }));
                   },
                   error: function(e) {
                       response([]);
                   }
               });
           },
           select: function(event, ui) {
               $id_osc = ui.item.id;
               $('#tags').removeClass('hide');
               $('#tag').tagsinput('add', {id: ui.item.id, text: ui.item.label});

           }
       });
     });

     $('#send').on('click', function(){
        var senha = $('#senha').val();
        var confirmarSenha = $('#confirmarSenha').val();
        var error = true;

        if(confirmarSenha !== '' && senha !== ''){
          if (confirmarSenha === senha) {
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
              error = true;
          }
      }

      if(!error){
        newJson['tx_nome_usuario'] = nome;
        newJson['tx_email_usuario'] = email;
        if(senha !== '' && senha !== null)
          newJson['tx_senha_usuario'] = senha;
        var tags = tag.split(',');
        var tagValue = [];
        for (var i = 0; i < tags.length; i++){
           tagValue.push({'id_osc':tags[i]});
        }
        newJson['representacao'] = tagValue;
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
function replaceSpecialChars(str) {
    str = str.replace(/[ÀÁÂÃÄÅ]/g, "A");
    str = str.replace(/[àáâãäå]/g, "a");
    str = str.replace(/[ÉÈÊË]/g, "E");
    str = str.replace(/[éèêë]/g, "e");
    str = str.replace(/[ÍÌÎÏ]/g, "I");
    str = str.replace(/[íìîï]/g, "i");
    str = str.replace(/[ÓÒÔÕ]/g, "O");
    str = str.replace(/[óòôõ]/g, "o");
    str = str.replace(/[ÚÙÛÜ]/g, "U");
    str = str.replace(/[úùûü]/g, "u");
    str = str.replace(/[Ç]/g, "C");
    str = str.replace(/[ç]/g, "c");
    return str;
}
