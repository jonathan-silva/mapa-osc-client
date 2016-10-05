require(['react', 'jsx!components/Util'], function (React) {

  require(['componenteFormItem'], function(FormItem){
    function FormItens(id, label, type){
      this.id = id;
      this.label = label;
      this.type = type;
    }
    //formulario 1
    var hd = 'Verifique se a organização já está cadastrada no Mapa, informando o nome ou CNPJ.';
    var id = ['nomeEntidade'];
    var label = ['Nome ou CNPJ da Entidade'];
    var type = ['text'];
    var formItens = [];

    for (var i=0; i<id.length; i++){
      formItens.push(new FormItens(id[i], label[i],type[i]));
    }

    //formulario 2
    var hd2 = 'Informe seus dados de identificação.';
    var id2 = ['nome','email','cpf','senha','confirmarSenha'];
    var label2 = ['Nome','Email','CPF','Senha','Confirmar Senha'];
    var type2 = ['text','email','text','password','password'];
    var formItens2 = [];

    for (var j=0; j<id2.length; j++){
      formItens2.push(new FormItens(id2[j], label2[j],type2[j]));
    }

    FormItem = React.createFactory(FormItem);
    ReactDOM.render(FormItem({header:hd, dados:formItens}), document.getElementById("form-org"));
    ReactDOM.render(FormItem({header:hd2, dados:formItens2}), document.getElementById("form-dados"));
   });

   require(['jquery-ui'], function (React) {
      $(".captcha input").checkboxradio();
    });

});
