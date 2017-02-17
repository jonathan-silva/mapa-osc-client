class Cabecalho {
  constructor() {

  }

  montarCabecalho(json, util, React, ReactDOM, Cabecalho){

    var cabecalho = util.validateObject(json.cabecalho, "");
    var Nome = util.validateObject(cabecalho.tx_razao_social_osc, "");
    var cd_nur = util.validateObject(cabecalho.cd_identificador_osc, "");
    var NatJur = util.validateObject(cabecalho.tx_nome_natureza_juridica_osc, "");
    var fCabecalho = {
      "Nome" : Nome,
      "cd_nur" : cd_nur,
      "NatJur" : NatJur
    };
    var cabecalhoArray = [];
    cabecalhoArray.push(fCabecalho);
    Cabecalho = React.createFactory(Cabecalho);
    ReactDOM.render(Cabecalho({dados:cabecalhoArray}), document.getElementById("cabecalho"));
  }
}
