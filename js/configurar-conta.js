require(['react', 'jsx!components/Util'], function (React) {
  require(['componenteFormItem'], function(FormItem){
    function FormItens(id, label, type){
      this.id = id;
      this.label = label;
      this.type = type;
    }

    //formulario 1
    var hd = 'Dados de Identificação.';
    var id = ['nome','email','cpf','senha','confirmarSenha'];
    var label = ['Nome','Email','CPF','Senha','Confirmar Senha'];
    var type = ['text','email','text','password','password'];
    var formItens = [];

    for (var j=0; j<id.length; j++){
      formItens.push(new FormItens(id[j], label[j],type[j]));
    }

    //formulario 2
    var hd2 = 'Suas Organizações.';
    var id2 = ['nomeCNPJEntidade'];
    var label2 = ['Nome ou CNPJ da Entidade'];
    var type2 = ['text'];
    var formItens2 = [];

    for (var i=0; i<id2.length; i++){
      formItens2.push(new FormItens(id2[i], label2[i],type2[i]));
    }

    FormItem = React.createFactory(FormItem);
    ReactDOM.render(FormItem({header:hd, dados:formItens}), document.getElementById("form-dados"));
    ReactDOM.render(FormItem({header:hd2, dados:formItens2}), document.getElementById("form-org"));
   });
});
