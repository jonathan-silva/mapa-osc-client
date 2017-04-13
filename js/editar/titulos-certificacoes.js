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

    $("#novo_titulo_certificacao_botao").on('click', function() {
      $('#novo_titulo_certificacao_form').toggleClass("hidden");
    });

    $("#titulo_certificacao_botao_remover").on('click', function() {
        console.log("click_remover");
        $(this).parent().parent().remove();
    });



  }

  montarTitulosCertificacoes(json, util, React, ReactDOM, FormItem, AgrupadorTitulosCertificacoes, NovoTituloCertificacao){
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

    var headerElement = React.createElement('div', { id: 'headerTitulosCertificacoes' });
    var novoTituloCertificacaoElement = React.createElement('div', { id: 'novoTituloCertificacao' });
    var autoElement = React.createElement('div', { id: 'auto' });
    //var manualLabel = React.createElement('label', null, 'Utilidade pública');
    var manualElement = React.createElement('div', { id: 'manual' });
    //var root = React.createElement('div', { id: 'root' }, autoElement, manualLabel, manualElement);
    var root = React.createElement('div', { id: 'root' }, headerElement,novoTituloCertificacaoElement,autoElement,manualElement);

    ReactDOM.render(root, document.getElementById('certificacoes'));

    //Header
    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:{priority: headerPriority, text: 'Títulos e Certificações'}, dados:""}
      ), document.getElementById("headerTitulosCertificacoes")
    );

    //Novo Titulo
    //NovoTituloCertificacao = React.createFactory(NovoTituloCertificacao);
    //ReactDOM.render(
    //  NovoTituloCertificacao(), document.getElementById("novoTituloCertificacao")
    //);


    // Botao e Lista
    AgrupadorTitulosCertificacoes = React.createFactory(AgrupadorTitulosCertificacoes);
    ReactDOM.render(
      AgrupadorTitulosCertificacoes(
        {dados:res[0]}
      ), document.getElementById("auto")
    );

    res.push(formItens);



    this.carregarInteracoesTitCertif();
  }
}
