class FonteRecurso {
  constructor() {

  }

  montarPorAno(ano, index, recursos) {
    //console.log(ano);
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
    formItens = [];
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
    recursos_form.recursos_nao_financeiros = this.mapContentRecursos(recursos.recursos_nao_financeiros, recursos_form.recursos_nao_financeiros);
    recursos_form.recursos_privados = this.mapContentRecursos(recursos.recursos_privados, recursos_form.recursos_privados);
    recursos_form.recursos_proprios = this.mapContentRecursos(recursos.recursos_proprios, recursos_form.recursos_proprios);
    recursos_form.recursos_publicos = this.mapContentRecursos(recursos.recursos_publicos, recursos_form.recursos_publicos);
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
        formItens.push(new FormItens(items[i].id, items[i].label, items[i].content, items[i].fonte, items[i].placeholder, items[i].type, items[i].options, items[i].pretext));
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

  montarFontedeRecursos(json, util){
    var sections = dadosForm.itemsRecurso();
    recursos_form = dadosForm.tiposRecurso();
    for (var j = 0; j < json.recursos.recursos.length; j++) {
      montarPorAno(json.recursos.recursos[j].dt_ano_recursos_osc, j, json.recursos.recursos[j]);
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
    var index = 0;
    for (var k in obj){
      if (obj.hasOwnProperty(k)) {
        var o = obj[k];
        //array[index].id = o.id_recursos_osc;
        array[index].content = o.nr_valor_recursos_osc;
        index++;
      }
    }
    return array;
  }
}
