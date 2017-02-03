class RelacoesGovernanca {
  constructor() {

  }

  montarRelacoesGovernanca(json, util, dadosForm){
    var relGovObject=[];
    var relacoes_trabalho =0;
    var relacoes_trabalho_governanca = util.validateObject(json.relacoes_trabalho_governanca) ? json.relacoes_trabalho_governanca : "";
    var dirigentes = util.validateObject(relacoes_trabalho_governanca.governanca) ? relacoes_trabalho_governanca.governanca : '0';
    var conselheiros = util.validateObject(relacoes_trabalho_governanca.governanca) ? relacoes_trabalho_governanca.conselho_fiscal : 0;

    var formItens = [];
    for (var j=0; j<dirigentes.length; j++){
      for (var property in dirigentes[j]) {
        if (dirigentes[j].hasOwnProperty(property)) {
          if(property == "tx_nome_dirigente"){
            formItens.push(util.FormItens(dirigentes[j].id, "Nome do dirigente", dirigentes[j].tx_nome_dirigente, dirigentes[j].ft_nome_dirigente, "Insira o nome do dirigente", "text"));
          }
          if(property == "tx_cargo_dirigente"){
            formItens.push(util.FormItens(dirigentes[j].id, "Cargo do dirigente", dirigentes[j].tx_cargo_dirigente, dirigentes[j].ft_cargo_dirigente, "Insira o cargo do dirigente", "text"));
          }
        }
      }
    }
    formItens.push(util.FormItens(null, "Nome do dirigente", null , null, "Insira o nome do dirigente", "text", null, null, null, null, true));
    formItens.push(util.FormItens(null, "Cargo do dirigente", null , null, "Insira o cargo do dirigente", "text", null, null, null, null, true));
    relGovObject.push(formItens);

    // Governança: Conselheiros
    var conselho_fiscal = conselheiros;
    var formItens = [];
    for (var i = 0; i < conselho_fiscal.length; i++) {
      var conselheiro = conselho_fiscal[i];
      formItens.push(util.FormItens(conselheiro.id_conselheiro, "Nome", conselheiro.tx_nome_conselheiro, conselheiro.ft_nome_conselheiro, "Insira o nome do conselheiro fiscal", "text"));
    }
    formItens.push(util.FormItens(null, "Nome", null , null, "Insira o nome do conselheiro fiscal", "text", null, null, null, null, true));
    relGovObject.push(formItens);

    //Trabalhadores
    var relacoes_trabalho = util.validateObject(relacoes_trabalho_governanca.relacoes_trabalho) ? relacoes_trabalho_governanca.relacoes_trabalho : "";
    var dados_form = dadosForm.relacoesTrabalho(relacoes_trabalho);
    var formItens = [];
    for (var i = 0; i < dados_form.form_items.length; i++) {
      var campo = dados_form.form_items[i];
      formItens.push(util.FormItens(campo.id, campo.label, campo.content, campo.fonte, campo.placeholder, campo.type));
    }
    relGovObject.push(formItens);
    return relGovObject;
  }

  ativarTrabalhoGovernanca(dadosForm, formItens, React, ReactDOM, Section, Agrupador, FormItem, FormItemButtons, util){
    var dirigentes = formItens[0];
    var conselheiros = [];
    var conselho_fiscal = formItens[1];
    var trabalhadores = formItens[2];

    var tx_sem_relacoes = "Não há registros de relações de trabalho e governança";
    var sections = dadosForm.sectionsRelacoesGovernanca();
    var items = sections.items;
    Section = React.createFactory(Section);
    ReactDOM.render(
      Section(
        {dados:items}
      ), document.getElementById(items[0].target)
    );
    //dirigentes
    Agrupador = React.createFactory(Agrupador);
    ReactDOM.render(
      Agrupador(
        {dados:dirigentes}
      ), document.getElementById("dirigentes")
    );
    //conselheiros
    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:null, dados:conselheiros}
      ), document.getElementById("conselheiros")
    );
    util.addItem('dirigentes');
    //conselho fiscal
    FormItemButtons = React.createFactory(FormItemButtons);
    ReactDOM.render(
      FormItemButtons(
        {header:null, dados:conselho_fiscal}
      ), document.getElementById("conselho_fiscal")
    );
    util.addItem('conselho_fiscal');
    //trabalhadores
    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:null, dados:trabalhadores}
      ), document.getElementById("trabalhadores")
    );
  }
}
