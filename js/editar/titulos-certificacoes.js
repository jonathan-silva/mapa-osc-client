class TitulosCertificacoes {
  constructor() {

  }
  montarTitulosCertificacoes(json, util, dados_form){
    var tx_sem_titulos = "Não há registros de títulos ou certificações";
    var certificacoes = util.validateObject(json.certificado) ? json.certificado.certificado : "";
    var formItens = [];
    var items = util.validateObject(certificacoes) ? certificacoes : [];

    if(items.length > 0){
      for (var j=0; j<items.length; j++){
        var dataValidadeText = "Data de Validade: " + (items[j].dt_fim_certificado?items[j].dt_fim_certificado:"Não informada");
        formItens.push(util.FormItens(items[j].id_certificado, items[j].tx_nome_certificado, dataValidadeText, items[j].ft_certificado, null, "p"));
      }
    } else {
      formItens.push(util.FormItens(null, null, tx_sem_titulos, "base", null, "p"));
    }

    var res = [];
    res.push(formItens);

    var formItens = [];
    for (var j=0; j<items.length; j++){
      formItens.push(util.FormItens(items[j].id, items[j].label, items[j].content, items[j].fonte, items[j].placeholder, items[j].type, items[j].options, null, "date", items[j].hide));
    }

    res.push(formItens);

    return res;
  }
}
