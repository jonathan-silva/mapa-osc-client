class Descricao {
  constructor() {

  }
  montarDescricao(json, util, dados_form, React, ReactDOM, FormItem){
    var headerPriority = '2';
    var descricao = util.validateObject(json.descricao, "");
    var formItens = [];

    var items = dados_form.form_items;
    for (var j=0; j<items.length; j++){
      formItens.push(util.FormItens(items[j].id, items[j].label, items[j].content, items[j].fonte, items[j].placeholder, items[j].type));
    }

    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:{priority: headerPriority, text: 'Descrição da OSC'}, dados:formItens}
      ), document.getElementById("descricao")
    );
    //Salvar
    /*$("#descricao").append('<button id="salvar" class="btn-primary btn">Salvar</button>');
    var newJson = {};
    $("#descricao").find("#salvar").click(function(){
      $("#descricao .form-control").each(function(){
        newJson[$(this).attr("id")] = $(this).val();
      });
    });*/
  }
}
