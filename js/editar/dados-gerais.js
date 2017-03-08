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

  montarDadosGerais(json, util, dadosForm, React, ReactDOM, FormItem){
    var dadosGerais = util.validateObject(json.dados_gerais, "");
    var content = this.montarEnderecoImovel(dadosGerais)
    var dados_form =dadosForm.dadosGerais(dadosGerais, content);
    var items = dados_form.form_items;
    var headerPriority = '2';
    var formItens = [];

    for (var i=0; i<items.length; i++){
      formItens.push(util.FormItens(items[i].id, items[i].label, items[i].content, items[i].fonte, items[i].placeholder, items[i].type, items[i].options, items[i].pretext));
    }

    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:{priority: headerPriority, text: 'Dados Gerais'}, dados:formItens}
      ), document.getElementById("dados_gerais")
    );
    $("#tx_telefone").find("input").mask('(00) 0000-0000');
    console.log($("#voluntarios"));
  }

}
