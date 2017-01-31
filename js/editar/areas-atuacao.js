class AreaAtuacao {
  constructor() {

  }
  AutocompleteItem(id, label, content, fonte, placeholder, type, custom_class, areas, subareas){
    return {
      "id" : id,
      "label" : label,
      "content" : content,
      "fonte" : fonte,
      "placeholder" : placeholder,
      "type" : type,
      "custom_class" : custom_class,
      "areas" : areas,
      "subareas" : subareas
    };
  }

  loadSuggestions(area_suggestions, util, dadosForm, tx_nome_atividade_economica_osc, ft_atividade_economica_osc){
    var macro_area_suggestions = area_suggestions[0];
    var subarea_suggestions = area_suggestions[1];
    for (var i = 0; i < subarea_suggestions.length; i++) {
      subarea_suggestions[i]["label"] = subarea_suggestions[i]["tx_nome_subarea_atuacao"];
      subarea_suggestions[i]["value"] = subarea_suggestions[i]["cd_subarea_atuacao"];
    }

    var formItens = [];
    var dados_form = dadosForm.areasAtuacao();
    var items = dados_form.form_items;
    formItens.push(this.AutocompleteItem(items[0].id, items[0].label, util.validateObject(tx_nome_atividade_economica_osc) ? tx_nome_atividade_economica_osc:"Não informado", util.validateObject(ft_atividade_economica_osc) ? ft_atividade_economica_osc:"Não informado", items[0].placeholder, items[0].type, items[0].custom_class, macro_area_suggestions, subarea_suggestions));
    items.splice(0,1);
    //console.log(items);
    for (var j=0; j<items.length; j++){
      var content = null;
      var fonte = null;
      if(macro_area_suggestions.length > j){
        content = macro_area_suggestions[j].tx_nome_area_atuacao;
        fonte = macro_area_suggestions[j].ft_nome_area_atuacao;
      }
      //formItens.push(AutocompleteItem(items[j].id, items[j].label, content, fonte, items[j].placeholder, items[j].type, items[j].custom_class, macro_area_suggestions, subarea_suggestions));
      if(items[j].custom_class === "autocomplete"){
        formItens.push(this.AutocompleteItem(items[j].id, items[j].label, content, fonte, items[j].placeholder, items[j].type, items[j].custom_class, macro_area_suggestions, subarea_suggestions));
      } else {
        formItens.push(util.FormItens(items[j].id, items[j].label, items[j].content, items[j].fonte, items[j].placeholder, items[j].type, items[j].options, items[j].pretext, items[j].custom_class, items[j].hide));
      }
    }
    //autocomplete macro_area_1 e macro_area_2
    macro_area_suggestions = $.map(macro_area_suggestions, function(item) {
      var newItem = {
        label: item.tx_nome_area_atuacao,
        value: item.tx_nome_area_atuacao,
        id: item.cd_area_atuacao
      };

      return newItem;
    });

    return {"formItens":formItens, "area_suggestions": area_suggestions, "macro_area_suggestions":macro_area_suggestions};
  }

  carregaMacro(rotas, area_suggestions){
    var res;
    $.ajax({
      url: rotas.AreaAtuacao(),
      async: false,
      type: 'GET',
      dataType: 'json',
      data: {},
      success: function(data) {
          area_suggestions.push(data);

          $.ajax({
            url: rotas.SubAreaAtuacao(),
            async: false,
            type: 'GET',
            dataType: 'json',
            data: {},
            success: function(data) {
                area_suggestions.push(data);
            },
            error: function(e) {
              //util.showUnauthorizedUser(e);
              console.log(e);
            }
          });
      },
      error: function(e) {
        //util.showUnauthorizedUser(e);
        console.log(e);
      }
    });

    return area_suggestions;
  }

  montarAreasDeAtuacao(json, util, dadosForm, rotas, tx_nome_atividade_economica_osc, ft_atividade_economica_osc){
    var areas_atuacao = util.validateObject(json.area_atuacao) ? json.area_atuacao : [];
    var area_atuacao_outra = util.validateObject(areas_atuacao.area_atuacao_outra) ? areas_atuacao.area_atuacao_outra : [];
    areas_atuacao = [].concat(areas_atuacao).concat(area_atuacao_outra);
    var area_suggestions = this.carregaMacro(rotas, [], util);

    return this.loadSuggestions(area_suggestions, util, dadosForm, tx_nome_atividade_economica_osc, ft_atividade_economica_osc);
  }
}
