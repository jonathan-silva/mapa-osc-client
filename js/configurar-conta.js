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
    var id = ['nome','email','senha','confirmarSenha'];
    var label = ['Nome','Email','Senha','Confirmar Senha'];
    var type = ['text','email','password','password'];
    var obrigatorio = [true, true, true, true, true];
    var formItens = [];

    for (var j=0; j<id.length; j++){
      formItens.push(new FormItens(id[j], label[j], type[j], obrigatorio[j]));
    }

    //formulario 2
    var hd2 = 'Suas Organizações.';
    var id2 = ['nomeEntidade'];
    var label2 = ['CNPJ da Entidade'];
    var type2 = ['text'];
    var obrigatorio2 = [true];
    var formItens2 = [];

    for (var i=0; i<id2.length; i++){
      formItens2.push(new FormItens(id2[i], label2[i], type2[i], obrigatorio2[j]));
    }

    FormItem = React.createFactory(FormItem);
    ReactDOM.render(FormItem({header:hd, dados:formItens}), document.getElementById("form-dados"));
    ReactDOM.render(FormItem({header:hd2, dados:formItens2}), document.getElementById("form-org"));
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
        var nome = $('#nome').val();
        var email = $('#email').val();
        var senha = $('#senha').val();
        var confirmarSenha = $('#confirmarSenha').val();
        var tag = $('#tag').val();
        var error = true;

        if(nome === '' || nome === null){
          $("#nome").closest('.form-group').removeClass('has-success').addClass('has-error');
        }
        else{
          $("#nome").closest('.form-group').removeClass('has-error').addClass('has-success');
          error = false;
        }
        if(!validaEmail(email)){
          $("#email").closest('.form-group').removeClass('has-success').addClass('has-error');
          error = true;
        }
        else{
          $("#email").closest('.form-group').removeClass('has-error').addClass('has-success');
          if(error){
            error = true;
          }
          else {
            error = false;
          }
        }
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

      if(tag === '' || tag === null){
        error = true;
      }
      else{
        if(error){
          error = true;
        }
        else {
          error = false;
        }
      }

      if(!error){
        newJson['tx_nome_usuario'] = nome;
        newJson['tx_email_usuario'] = email;
        if(senha !== '' && senha !== null)
          newJson['tx_senha_usuario'] = senha;
        var tags = tag.split(',');
        var tagValue = [];
        var tagsValue = [];
        for (var i = 0; i < tags.length; i++){
           tagValue.push({'id_osc':tags[i]});
           tagsValue.push(tags[i]);
        }
        newJson['representacao'] = tagValue;
        newJson['id_usuario'] = user;

        $.ajax({
            url: rotas.UpdateUsuario(user),
            type: 'POST',
            dataType: "json",
            data: newJson,
            success: function(data) {
              window.localStorage.removeItem('Osc');
              window.localStorage.setItem('Osc', ('[' + tagsValue + ']'));
              $('#modalTitle').text('Sucesso');
              $('#modalConteudo').text('Sua atualização foi realizada com sucesso.');
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

function validaEmail(email) {
    usuario = email.substring(0, email.indexOf("@"));
    dominio = email.substring(email.indexOf("@") + 1, email.length);

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        return true;
    } else {
        return false;
    }
}
