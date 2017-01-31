class RelacoesGovernanca {
  constructor() {

  }
  montarRelacoesGovernanca(json, util){
    // Governança: Dirigentes
    var tx_sem_relacoes = "Não há registros de relações de trabalho e governança";
    var sections = dadosForm.sectionsRelacoesGovernanca();
    items = sections.items;
    Section = React.createFactory(Section);
    ReactDOM.render(
      Section(
        {dados:items}
      ), document.getElementById(items[0].target)
    );
    function DadosForm(label, content) {
      this.nome = label;
      this.cargo = content;
    }

    var relacoes_trabalho =0;
    var relacoes_trabalho_governanca = util.validateObject(json.relacoes_trabalho_governanca) ? json.relacoes_trabalho_governanca : "";
    // Governança: Dirigentes
    var  dirigentes = util.validateObject(relacoes_trabalho_governanca.governanca) ? relacoes_trabalho_governanca.governanca : '0';
    // Governança: Conselheiros
    var  conselheiros = util.validateObject(relacoes_trabalho_governanca.governanca) ? relacoes_trabalho_governanca.conselho_fiscal : 0;

    formItens = [];
    for (j=0; j<dirigentes.length; j++){
      for (var property in dirigentes[j]) {
        if (dirigentes[j].hasOwnProperty(property)) {
          if(property == "tx_nome_dirigente"){
            formItens.push(new FormItens(dirigentes[j].id, "Nome do dirigente", dirigentes[j].tx_nome_dirigente, dirigentes[j].ft_nome_dirigente, "Insira o nome do dirigente", "text"));
          }
          if(property == "tx_cargo_dirigente"){
            formItens.push(new FormItens(dirigentes[j].id, "Cargo do dirigente", dirigentes[j].tx_cargo_dirigente, dirigentes[j].ft_cargo_dirigente, "Insira o cargo do dirigente", "text"));
          }
        }
      }
    }
    formItens.push(new FormItens(null, "Nome do dirigente", null , null, "Insira o nome do dirigente", "text", null, null, null, null, true));
    formItens.push(new FormItens(null, "Cargo do dirigente", null , null, "Insira o cargo do dirigente", "text", null, null, null, null, true));
    Agrupador = React.createFactory(Agrupador);
    ReactDOM.render(
      Agrupador(
        {dados:formItens}
      ), document.getElementById("dirigentes")
    );
    formItens = [];
    //formItens.push(new FormItens(null, "Quantidade de conselheiros", conselheiros, null, null, "p"));
    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:null, dados:formItens}
      ), document.getElementById("conselheiros")
    );
    addItem('dirigentes');

    // Governança: Conselheiros
    var conselho_fiscal = conselheiros;
    formItens = [];
    for (var i = 0; i < conselho_fiscal.length; i++) {
      var conselheiro = conselho_fiscal[i];
      formItens.push(new FormItens(conselheiro.id_conselheiro, "Nome", conselheiro.tx_nome_conselheiro, conselheiro.ft_nome_conselheiro, "Insira o nome do conselheiro fiscal", "text"));
    }
    formItens.push(new FormItens(null, "Nome", null , null, "Insira o nome do conselheiro fiscal", "text", null, null, null, null, true));
    FormItemButtons = React.createFactory(FormItemButtons);
    ReactDOM.render(
      FormItemButtons(
        {header:null, dados:formItens}
      ), document.getElementById("conselho_fiscal")
    );

    addItem('conselho_fiscal');

    //Trabalhadores
    relacoes_trabalho = util.validateObject(relacoes_trabalho_governanca.relacoes_trabalho) ? relacoes_trabalho_governanca.relacoes_trabalho : "";

    dados_form = dadosForm.relacoesTrabalho(relacoes_trabalho);
    formItens = [];
    for (var i = 0; i < dados_form.form_items.length; i++) {
      var campo = dados_form.form_items[i];
      formItens.push(new FormItens(campo.id, campo.label, campo.content, campo.fonte, campo.placeholder, campo.type));
    }
    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:null, dados:formItens}
      ), document.getElementById("trabalhadores")
    );
  }
}
