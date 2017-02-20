class AreaAtuacao {
  constructor() {

  }
  AutocompleteItem(id, label, content, fonte, placeholder, type, custom_class, areas, subareas, subareas_selected){
    return {
      "id" : id,
      "label" : label,
      "content" : content,
      "fonte" : fonte,
      "placeholder" : placeholder,
      "type" : type,
      "custom_class" : custom_class,
      "areas" : areas,
      "subareas" : subareas,
      "subareas_selected": subareas_selected
    };
  }

  loadSuggestions(area_suggestions, areas_atuacao, util, dadosForm, tx_nome_atividade_economica_osc, ft_atividade_economica_osc){
    //console.log(area_suggestions);
    //console.log(areas_atuacao);
    var macro_area_suggestions = area_suggestions[0];
    var subarea_suggestions = area_suggestions[1];
    for (var i = 0; i < subarea_suggestions.length; i++) {
      subarea_suggestions[i]["label"] = subarea_suggestions[i]["tx_nome_subarea_atuacao"];
      subarea_suggestions[i]["value"] = subarea_suggestions[i]["cd_subarea_atuacao"];
    }

    var formItens = [];
    var dados_form = dadosForm.areasAtuacao();
    var items = dados_form.form_items;
    formItens.push(this.AutocompleteItem(items[0].id, items[0].label, util.validateObject(tx_nome_atividade_economica_osc,"Não informado"), util.validateObject(ft_atividade_economica_osc,"Não informado"), items[0].placeholder, items[0].type, items[0].custom_class, macro_area_suggestions, subarea_suggestions));

    items.splice(0,1);
    //console.log(items);
    for (var j=0; j<items.length; j++){
      var content = null;
      var fonte = null;
      var lenAreaAtuacao = util.validateObject(areas_atuacao, 0);

      if(lenAreaAtuacao !== 0){
        if(items[j].id === "macro_area_1"){
          items[j].content = (areas_atuacao)?areas_atuacao[0].tx_nome_area_atuacao:"";
          items[j].subareas_selected = (areas_atuacao)?areas_atuacao[0].subarea_atuacao:"";
          items[j].fonte = (areas_atuacao)?areas_atuacao[0].subarea_atuacao[0].ft_area_atuacao:null;
        }
        if(items[j].id === "macro_area_2"){
          items[j].content = (areas_atuacao.length>1)?areas_atuacao[1].tx_nome_area_atuacao:"";
          items[j].subareas_selected = (areas_atuacao.length>1)?areas_atuacao[1].subarea_atuacao:"";
          items[j].fonte = (areas_atuacao.length>1)?areas_atuacao[1].subarea_atuacao[0].ft_area_atuacao:null;
        }
        if(util.validateObject(areas_atuacao[0], false)){
          if(items[j].id === "macro_area_1_outros"){
            items[j].content = (areas_atuacao[0].subarea_atuacao[0].cd_subarea_atuacao===null)?areas_atuacao[0].tx_nome_area_atuacao_outra:"";
          }
          if(items[j].id === "sub_area_1_outros"){
            items[j].content = (areas_atuacao[0].subarea_atuacao[0].cd_subarea_atuacao!==null)?areas_atuacao[0].tx_nome_area_atuacao_outra:"";
          }
        }
        if(util.validateObject(areas_atuacao[1], false)){
          if(items[j].id === "macro_area_2_outros"){
            items[j].content = (areas_atuacao[1].subarea_atuacao[0].cd_subarea_atuacao===null)?areas_atuacao[1].tx_nome_area_atuacao_outra:"";
          }
          if(items[j].id === "sub_area_2_outros"){
            items[j].content = (areas_atuacao[1].subarea_atuacao[0].cd_subarea_atuacao!==null)?areas_atuacao[1].tx_nome_area_atuacao_outra:"";
          }
        }
      }
      if(items[j].custom_class === "autocomplete"){
        formItens.push(this.AutocompleteItem(items[j].id, items[j].label, items[j].content, items[j].fonte, items[j].placeholder, items[j].type, items[j].custom_class, macro_area_suggestions, subarea_suggestions, items[j].subareas_selected));
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

  montarAreasDeAtuacao(json, util, dadosForm, rotas, tx_nome_atividade_economica_osc, ft_atividade_economica_osc, React, ReactDOM, FormItem){
    var headerPriority = '2';
    var areas_atuacao = util.validateObject(json.area_atuacao, []);
    var area_atuacao_outra = util.validateObject(areas_atuacao.area_atuacao_outra, []);
    areas_atuacao = [].concat(areas_atuacao).concat(area_atuacao_outra);
    var area_suggestions = this.carregaMacro(rotas, [], util);
    var areas_atuacao_inicial = util.validateObject(areas_atuacao[0], []);

    var obj = this.loadSuggestions(area_suggestions, areas_atuacao_inicial.area_atuacao, util, dadosForm, tx_nome_atividade_economica_osc, ft_atividade_economica_osc);
    var formItens = obj.formItens;
    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:{priority: headerPriority, text: 'Áreas e Subáreas de Atuação da OSC'}, dados:formItens}
      ), document.getElementById("areas_de_atuacao")
    );
    this.carregarAreasAtuacao(obj.area_suggestions, obj.macro_area_suggestions);
  }

  carregarAreasAtuacao(area_suggestions, macro_area_suggestions){
    var id_suggestion = 0;

    $("#areas_de_atuacao .autocomplete").autocomplete({
      minLength: 0,
      create: function(event, ui) {
        var value = $(this).attr("placeholder");
        for (var i = 0; i < macro_area_suggestions.length; i++) {
          var suggestion = macro_area_suggestions[i].value;

          if (suggestion === value){
            var $container = $(this).siblings(".checkboxList");
            var $element = $container.find("#subareas-"+i);
            if($element.hasClass('hidden')){
              $element.toggleClass('hidden');
            }
            for (var j = 0; j < macro_area_suggestions.length; j++) {
              if((value === macro_area_suggestions[j].tx_nome_area_atuacao)){
                var subarea_exists = false;
                $element.find("label").each(function(){
                  if(macro_area_suggestions[j].tx_nome_subarea_atuacao === $(this).text().trim()){
                    subarea_exists = $(this);
                  }
                });
                if(subarea_exists){
                  subarea_exists.find("input").prop('checked', true);
                } else {
                  $element.find("#outros").val(macro_area_suggestions[j].tx_nome_subarea_atuacao);
                }
              }
            }
          }
        }
      },
      source: macro_area_suggestions,
      change: function( event, ui ) {
      },
      select: function(event, ui){
        if(event.target.id == 'macro_area_1'){
          $('#sub_area_1_outros').parent().parent().addClass('hidden');
          $('#sub_area_1_outros').val('');
          $(this).parent().find(':checkbox').prop("checked", false);
        }
        else{
          $('#sub_area_2_outros').parent().parent().addClass('hidden');
          $('#sub_area_2_outros').val('');
          $(this).parent().find(':checkbox').prop("checked", false);
        }
        var targetElement = event.target;
        var id = macro_area_suggestions.indexOf(ui.item)+1;
        id_suggestion = id;
        var $container = $($(targetElement).siblings(".checkboxList")[0]);
        $container.children().each(function( index ) {
          if(!$(this).hasClass('hidden')){
            $(this).toggleClass('hidden');
            $(this).children().each(function(index){
              var $input = $($(this).find('input')[0]);
              if ($input.is(':checked')){
                $input.prop('checked', false);
              }
              if ($input.prop('type') == "text"){
                $input.val("");
              }
            });
          }
        });
        var $element = $container.find("#subareas-"+id);
        if($element.hasClass('hidden')){
          $element.toggleClass('hidden');
        }
        // interação macro_area_outros
        var macro_area = ui.item.value;
        var pai = $(this).closest(".form-group");
        var id = pai.find(".autocomplete").attr("id");
        var $inputContainer = null;
        if(id === "macro_area_1"){
          $inputContainer = pai.siblings().find("#macro_area_1_outros").closest(".form-group");
        } else {
          $inputContainer = pai.siblings().find("#macro_area_2_outros").closest(".form-group");
        }

        if (macro_area === "Outros"){
          $inputContainer.toggleClass('hidden');
          if($inputContainer.hasClass('hidden')){
            var $input = $inputContainer.find('input');
            $input.val("");
          }
        } else {
          if(!$inputContainer.hasClass('hidden')){
            $inputContainer.toggleClass('hidden');
            var $input = $inputContainer.find('input');
            $input.val("");
          }
        }
      }
    });

    $(".autocomplete").on("click", function(){
      $(this).autocomplete( "search", "" );
    });

    $(".autocomplete").keyup(function(){
      if(($(this).val() === "") && (id_suggestion != 0)){
        var id = id_suggestion;
        var $container = $(this).parent();
        var $element = $container.find("#subareas-"+id);
        if(!$element.hasClass('hidden')){
          $element.toggleClass('hidden');
        }
      }
    });

    //interações seção areas de atuacao
    $(".checkboxList :checkbox").change(function() {

      if($(this).closest("label").text() === "Outros"){
        var pai = $(this).closest(".form-group");
        var id = pai.find(".autocomplete").attr("id");
        var $inputContainer = null;
        if(id === "macro_area_1"){
          $inputContainer = pai.siblings().find("#sub_area_1_outros").closest(".form-group");
        } else {
          $inputContainer = pai.siblings().find("#sub_area_2_outros").closest(".form-group");
        }
        $inputContainer.toggleClass('hidden');
        if($inputContainer.hasClass('hidden')){
          var $input = $inputContainer.find('input');
          $input.val("");
        }
      }
    });

    //iniciar subareas selecionadas
    $(".checkboxList").each(function(){
      $(this).find("input").each(function(){
        if($(this).is(":checked")){
          if($(this).closest("label").text() === "Outros"){
            var pai = $(this).closest(".form-group");
            var id = pai.find(".autocomplete").attr("id");
            var $inputContainer = null;
            if(id === "macro_area_1"){
              $inputContainer = pai.siblings().find("#sub_area_1_outros").closest(".form-group");
            } else {
              $inputContainer = pai.siblings().find("#sub_area_2_outros").closest(".form-group");
            }
            $inputContainer.toggleClass('hidden');
            if($inputContainer.hasClass('hidden')){
              var $input = $inputContainer.find('input');
              $input.val("");
            }
          }
        }
      });
    });
    var macro_area_1 = $('#macro_area_1');
    var macro_area_2 = $('#macro_area_2');
    if(macro_area_1.val()=='Outros')
      $('#macro_area_1_outros').parent().parent().removeClass('hidden');
    if(macro_area_2.val()=='Outros')
      $('#macro_area_2_outros').parent().parent().removeClass('hidden');

  }
}
