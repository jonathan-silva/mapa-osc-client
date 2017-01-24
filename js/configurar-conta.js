require(['react', 'jsx!components/Util','jquery-ui','rotas','tagsinput'], function (React) {
  require(['componenteFormItem'], function(FormItem){
    function FormItens(id, label, type){
      this.id = id;
      this.label = label;
      this.type = type;
    }

    //formulario 1
    var hd = 'Dados de Identificação.';
    var id = ['nome','email','senha','confirmarSenha'];
    var label = ['Nome','Email','Senha','Confirmar Senha'];
    var type = ['text','email','password','password'];
    var formItens = [];

    for (var j=0; j<id.length; j++){
      formItens.push(new FormItens(id[j], label[j],type[j]));
    }

    //formulario 2
    var hd2 = 'Suas Organizações.';
    var id2 = ['nomeEntidade'];
    var label2 = ['CNPJ da Entidade'];
    var type2 = ['text'];
    var formItens2 = [];

    for (var i=0; i<id2.length; i++){
      formItens2.push(new FormItens(id2[i], label2[i],type2[i]));
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
   newJson["headers"] = authHeader;

   var $id_osc = '';
   var rotas = new Rotas();
   var limiteAutocomplete = 10;
   var controller = "js/controller.php";
   var oscs;

   $.ajax({
       url: rotas.ValidarUsuario(user),
       type: 'GET',
       dataType: "json",
       data: newJson,
       success: function(data) {
         $('#nome').val(data.tx_nome_usuario);
         $('#email').val(data.tx_email_usuario);
         oscs = data.representacao;
       },
       error: function(e) {
           console.log(e);
       }
   });

   console.log(oscs);

   require(["jquery-ui", "rotas"], function(React) {
     $('#tag').tagsinput({
         cancelConfirmKeysOnEmpty: false,
         freeInput: false,
         itemValue: 'id',
         itemText: 'text'
        });
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

});
function replaceSpecialChars(str) {
    str = str.replace(/[ÀÁÂÃÄÅ]/, "A");
    str = str.replace(/[àáâãäå]/, "a");
    str = str.replace(/[ÉÈÊË]/, "E");
    str = str.replace(/[éèêë]/, "e");
    str = str.replace(/[ÍÌÎÏ]/, "I");
    str = str.replace(/[íìîï]/, "i");
    str = str.replace(/[ÓÒÔÕ]/, "O");
    str = str.replace(/[óòôõ]/, "o");
    str = str.replace(/[ÚÙÛÜ]/, "U");
    str = str.replace(/[úùûü]/, "u");
    str = str.replace(/[Ç]/, "C");
    str = str.replace(/[ç]/, "c");
    return str;
}
