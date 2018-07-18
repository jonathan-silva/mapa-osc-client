class TitulosCertificacoes {
  constructor() {

  }

  carregarInteracoesTitCertif(){
    //interações seção títulos e certificações

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



  montarTitulosCertificacoes(json, util, React, ReactDOM, FormItem, AgrupadorTitulosCertificacoes, NovoTituloCertificacao){
    var headerPriority = '2';
    var res = [];
    var tx_sem_titulos = "Não há registros de títulos ou certificações";
    var certificacoes = util.validateObject(json.certificado, 0);
    var formItens = [];
    var items = util.validateObject(certificacoes.certificado, []);

    if(items.length == 1 && items[0].id_certificado == null){
      items = [];
    }

    if(items.length > 0 ){
      for (var j=0; j<items.length; j++){
        items[j].dt_inicio_certificado = (items[j].dt_inicio_certificado?items[j].dt_inicio_certificado:"Não informado");
        items[j].dt_fim_certificado = (items[j].dt_fim_certificado?items[j].dt_fim_certificado:"Não informado");

        if(items[j].tx_uf != null && items[j].tx_uf != "" ){
            items[j].tx_local_certificado = (items[j].tx_uf?items[j].tx_uf:"Não informado");
            items[j].cd_uf_mun_certificado = (items[j].cd_uf?items[j].cd_uf:"Não informado");
        }

        if( items[j].tx_municipio != null && items[j].tx_municipio != ""){
            items[j].tx_local_certificado = (items[j].tx_municipio?items[j].tx_municipio:"Não informado");
            items[j].cd_uf_mun_certificado = (items[j].cd_municipio?items[j].cd_municipio:"Não informado");
        }
      }
    } else {
      formItens.push(util.FormItens(null, null, tx_sem_titulos, "base", null, "p"));
    }
    res.push(items);

    //monta estrutura de divs para renderizar os componentes
    var headerElement = React.createElement('div', { id: 'headerTitulosCertificacoes' });
    var bodyElement = React.createElement('div', { id: 'bodyheaderTitulosCertificacoes' });
    var root = React.createElement('div', { id: 'root' }, headerElement,bodyElement);
    ReactDOM.render(root, document.getElementById('certificacoes'));

    //Renderiza o header "Títulos e Certificações"
    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:{priority: headerPriority, text: 'Títulos e Certificações'}, dados:""}
      ), document.getElementById("headerTitulosCertificacoes")
    );

    //Renderiza os componentes de titulos e certificações"
    AgrupadorTitulosCertificacoes = React.createFactory(AgrupadorTitulosCertificacoes);
    ReactDOM.render(
      AgrupadorTitulosCertificacoes(
        {dados:res[0]}
      ), document.getElementById("bodyheaderTitulosCertificacoes")
    );

    res.push(formItens);
    this.carregarInteracoesTitCertif();
  }
}
