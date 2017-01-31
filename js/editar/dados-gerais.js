class DadosGerais {
  constructor() {

  }

  montarEnderecoImovel(dadosGerais){
    var endereco = [dadosGerais.tx_endereco, dadosGerais.nr_localizacao,
      dadosGerais.tx_endereco_complemento, dadosGerais.tx_bairro,
      dadosGerais.tx_nome_municipio, dadosGerais.tx_nome_uf, dadosGerais.tx_sigla_uf,
      "CEP: "+dadosGerais.nr_cep];
      var tx_endereco_completo = '';
      for (var i = 0; i < endereco.length; i++) {
        if (endereco[i] !== null){
          tx_endereco_completo += tx_endereco_completo === '' ? '' : ', ';
          tx_endereco_completo += tx_endereco_completo === '' ? 'Endereço não registrado.' : endereco[i];
        }
      }

      return tx_endereco_completo;
    }

  montarDadosGerais(json, util, dadosForm){
    var dadosGerais = util.validateObject(json.dados_gerais) ? json.dados_gerais : "";
    var content = this.montarEnderecoImovel(dadosGerais)
    var dados_form =dadosForm.dadosGerais(dadosGerais, content);
    var items = dados_form.form_items;
    var formItens = [];

    for (var i=0; i<items.length; i++){
      formItens.push(util.FormItens(items[i].id, items[i].label, items[i].content, items[i].fonte, items[i].placeholder, items[i].type, items[i].options, items[i].pretext));
    }
    return formItens;
  }
}
