class TitulosCertificacoes {
  constructor() {

  }

  carregarInteracoesTitCertif(){
    //interações seção títulos e certificações
    $('#certificacoes :checkbox').prop('checked', false);
    $("#certificacoes :checkbox").change(function() {
      var $inputContainer = $(this).closest(".form-group").siblings().find("#utilidade_publica_"+this.value).closest(".form-group");
      if(!$(this).is(':checked')){
        $inputContainer.addClass('hidden');
      }
      else{
        $inputContainer.removeClass('hidden');
      }
      if($inputContainer.hasClass('hidden')){
        var $input = $inputContainer.find('input');
        $input.val("");
      }
    });

    $("#manual").find("input:text").each(function(){
      if ($(this).attr("placeholder") !== "Não constam informações nas bases de dados do Mapa."){
        var utilidade_publica_id = $(this).attr("id").replace("data_validade_", "");
        $("#manual").find("input:checkbox").each(function(){
          if($(this).val() === utilidade_publica_id){
            $(this).prop('checked', true);
          }
        });
        $(this).parents(".hidden").toggleClass('hidden');
      }
    });
  }

  montarTitulosCertificacoes(json, util, dados_form, React, ReactDOM, FormItem){
    var headerPriority = '2';
    var res = [];
    var tx_sem_titulos = "Não há registros de títulos ou certificações";
    var certificacoes = util.validateObject(json.certificado, 0);
    var formItens = [];
    var items = util.validateObject(certificacoes.certificado, []);

    if(items.length > 0){
      for (var j=0; j<items.length; j++){
        var dataValidadeText = "Data de Validade: " + (items[j].dt_fim_certificado?items[j].dt_fim_certificado:"Não informada");
        formItens.push(util.FormItens(items[j].id_certificado, items[j].tx_nome_certificado, dataValidadeText, items[j].ft_certificado, null, "p"));
      }
    } else {
      formItens.push(util.FormItens(null, null, tx_sem_titulos, "base", null, "p"));
    }

    res.push(formItens);
    items = dados_form.form_items;
    formItens = [];
    for (var j=0; j<items.length; j++){
      formItens.push(util.FormItens(items[j].id, items[j].label, items[j].content, items[j].fonte, items[j].placeholder, items[j].type, items[j].options, null, "date", items[j].hide));
    }

    res.push(formItens);

    var autoElement = React.createElement('div', { id: 'auto' });
    var manualLabel = React.createElement('label', null, 'Utilidade pública');
    var manualElement = React.createElement('div', { id: 'manual' });

    var root = React.createElement('div', { id: 'root' }, autoElement, manualLabel, manualElement);
    ReactDOM.render(root, document.getElementById('certificacoes'));
    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:{priority: headerPriority, text: 'Títulos e Certificações'}, dados:res[0]}
      ), document.getElementById("auto")
    );

    res.push(formItens);

    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:null, dados:res[1]}
      ), document.getElementById("manual")
    );
    this.carregarInteracoesTitCertif();
  }
}
