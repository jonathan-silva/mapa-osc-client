class Descricao {
  constructor() {

  }
  montarDescricao(json, util){
    var descricao = util.validateObject(json.descricao) ? json.descricao : "";
    headerPriority = '2';
    headerText = 'Descrição da OSC';
    formItens = [];
    dados_form = dadosForm.descricao(descricao);
    items = dados_form.form_items;
    for (j=0; j<items.length; j++){
      formItens.push(new FormItens(items[j].id, items[j].label, items[j].content, items[j].fonte, items[j].placeholder, items[j].type));
    }
    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:{priority: headerPriority, text: headerText}, dados:formItens}
      ), document.getElementById("descricao")
    );

    //Salvar
    $("#descricao").append('<button id="salvar" class="btn-primary btn">Salvar</button>');
    var newJson = {};
    $("#descricao").find("#salvar").click(function(){
      $("#descricao .form-control").each(function(){
        newJson[$(this).attr("id")] = $(this).val();
      });
    });
  }
}
