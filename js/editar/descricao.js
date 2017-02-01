class Descricao {
  constructor() {

  }
  montarDescricao(json, util, dados_form){
    var descricao = util.validateObject(json.descricao) ? json.descricao : "";
    var formItens = [];

    var items = dados_form.form_items;
    for (var j=0; j<items.length; j++){
      formItens.push(util.FormItens(items[j].id, items[j].label, items[j].content, items[j].fonte, items[j].placeholder, items[j].type));
    }
    return formItens;
  }
}
