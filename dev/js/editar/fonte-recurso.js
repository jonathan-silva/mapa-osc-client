class FonteRecurso {
  constructor() {

  }

  montarPorAno(ano, index, recursos, util, fontesRecursos, sections, recursos_form, React, ReactDOM, Section, FormItem) {
    var recursos_publicos = $.grep(fontesRecursos, function(o) { return o.cd_origem_fonte_recursos_osc == 1; });
    var recursos_privados = $.grep(fontesRecursos, function(o) { return o.cd_origem_fonte_recursos_osc == 2; });
    var recursos_proprios = $.grep(fontesRecursos, function(o) { return o.cd_origem_fonte_recursos_osc == 4; });
    var recursos_nao_financeiros = $.grep(fontesRecursos, function(o) { return o.cd_origem_fonte_recursos_osc == 3; });
    $("#recursos").append('<div id='+ano+'></div>');
    if(index !== 0){
      $('#'+ano).toggleClass("hidden");
    }
    var items = sections.items;
    // console.log(items);
    Section = React.createFactory(Section);
    ReactDOM.render(
      Section(
        {dados:items, ano: ano}
      ), document.getElementById(ano)
    );

    //geral, seleção do ano
    items = recursos_form.recursos_geral;
    var formItens = [];
    for (var i=0; i<items.length; i++){
      formItens.push(util.FormItens("ano-"+ano, items[i].label, ano, items[i].fonte, items[i].placeholder, items[i].type, items[i].options, items[i].pretext, items[i].custom_class));
    }
    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:null, dados:formItens}
      ), document.getElementById("recursos_geral-"+ano)
    );
    //recursos
    //colocando dados no Array
    recursos_form.recursos_nao_financeiros = this.mapContentRecursos(recursos.recursos_nao_financeiros, recursos_nao_financeiros);
    recursos_form.recursos_privados = this.mapContentRecursos(recursos.recursos_privados, recursos_privados);
    recursos_form.recursos_proprios = this.mapContentRecursos(recursos.recursos_proprios, recursos_proprios);
    recursos_form.recursos_publicos = this.mapContentRecursos(recursos.recursos_publicos, recursos_publicos);

    var recursosArray=[
      {//proprios
        "items": recursos_form.recursos_proprios,
        "divId": "recursos_proprios"
      },
      {//publicos
        "items": recursos_form.recursos_publicos,
        "divId": "recursos_publicos"
      },
      {//privados
        "items": recursos_form.recursos_privados,
        "divId": "recursos_privados"
      },
      {//nao financeiros
        "items": recursos_form.recursos_nao_financeiros,
        "divId": "recursos_nao_financeiros"
      }
    ];

    for(var k=0; k<recursosArray.length; k++){
      var formItens = [];
      var items = recursosArray[k].items;
      var divId = recursosArray[k].divId;

      for (var i=0; i<items.length; i++){
        var value = items[i].content;
        if(value !== ""){
          if(value.indexOf('.') === -1){
            value += "00";
          }
        }
        formItens.push(util.FormItens(items[i].id, items[i].label, value, items[i].fonte, items[i].placeholder, items[i].type, items[i].options, items[i].pretext));
      }

      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:null, dados:formItens}
        ), document.getElementById(divId+"-"+ano)
      );
    }

    // máscara monetária
    $("#recursos_proprios-"+ano).find('input').mask('000.000.000.000.000,00', {reverse: true});
    $("#recursos_proprios-"+ano).find('input').addClass('with-pretext');
    $("#recursos_proprios-"+ano).find('.input-box').prepend('<span class="pretext">R$</span>');

    $("#recursos_publicos-"+ano).find('input').mask('000.000.000.000.000,00', {reverse: true});
    $("#recursos_publicos-"+ano).find('input').addClass('with-pretext');
    $("#recursos_publicos-"+ano).find('.input-box').prepend('<span class="pretext">R$</span>');

    $("#recursos_privados-"+ano).find('input').mask('000.000.000.000.000,00', {reverse: true});
    $("#recursos_privados-"+ano).find('input').addClass('with-pretext');
    $("#recursos_privados-"+ano).find('.input-box').prepend('<span class="pretext">R$</span>');

    $("#recursos_nao_financeiros-"+ano).find('input').mask('000.000.000.000.000,00', {reverse: true});
    $("#recursos_nao_financeiros-"+ano).find('input').addClass('with-pretext');
    $("#recursos_nao_financeiros-"+ano).find('.input-box').prepend('<span class="pretext">R$</span>');
  }

  carregaFontes(rotas){
    var fontesRecursos = null;
    $.ajax({
      url: 'js/controller.php',
      async: false,
      type: 'GET',
      dataType: 'json',
      data: {flag: 'consulta', rota: rotas.FontesRecursos()},
      success: function(data) {
          fontesRecursos = data;
      },
      error: function(e) {
        //util.showUnauthorizedUser(e);
        console.log(e);
      }
    });

    return fontesRecursos;
  }

  montarFontedeRecursos(json, util, rotas, dadosForm, React, ReactDOM, Section, FormItem){
    var sections = dadosForm.itemsRecurso();
    var recursos_form = dadosForm.tiposRecurso();
    var fontesRecursos = this.carregaFontes(rotas);
    //console.log(json);
    for (var j = 0; j < json.recursos.recursos.length; j++) {
      this.montarPorAno(json.recursos.recursos[j].dt_ano_recursos_osc, j, json.recursos.recursos[j], util, fontesRecursos, sections, recursos_form, React, ReactDOM, Section, FormItem);
    }

    // interacoes da selecao de anos
    $(".select-ano").find(".form-control").bind("change", function(){
      var ano = $(this).val();
      var valor = $(this).attr("id").slice(4);
      if($("#"+ano).hasClass('hidden')){
        $("#"+ano).toggleClass('hidden');
        $("#"+ano).siblings().addClass('hidden');
      }
      $(this).find('option[value='+valor+']').prop('selected', true);
    });
  }

  mapContentRecursos(obj, array){
    /*
      array[index].id = array[index].cd_fonte_recursos_osc;
      array[index].label = array[index].tx_nome_fonte_recursos_osc;
      array[index].content = o.nr_valor_recursos_osc;
      array[index].placeholder = "Insira o valor";
    */
    var index = 0;
    for (var i = 0; i < array.length; i++) {
      var fonteRecurso = array[i];
      fonteRecurso.id = fonteRecurso.cd_fonte_recursos_osc;
      fonteRecurso.label = fonteRecurso.tx_nome_fonte_recursos_osc;
      fonteRecurso.content = "";
      fonteRecurso.placeholder = "Insira o valor";
      for (var k in obj){
        var o = obj[k];
        if ((obj.hasOwnProperty(k)) && (o.cd_fonte_recursos_osc === fonteRecurso.cd_fonte_recursos_osc)) {
          fonteRecurso.content = o.nr_valor_recursos_osc;
        }
      }
    }
    return array;
  }
}
