class EspacosPartSocial {
  constructor() {

  }
  montarEspacosParticipacaoSocial(json, util){
    var tx_sem_participacao_social = "Não há registros de participação social";
    var participacao_social_form = dadosForm.partSocial();
    items = participacao_social_form.items;
    Section = React.createFactory(Section);
    ReactDOM.render(
      Section(
        {dados:items}
      ), document.getElementById(items[0].target)
    );

    var nomeConselho = null;
    var nomeTipoParticipacao = null;
    var nomeRepresentanteConselho = null;
    var periodicidade = null;
    var dataInicioConselho = null;
    var dataFimConselho = null;
    var nomeConferencia = null;
    var nomeFormaParticipacao = null;
    var anoRealizacao = null;

    if (util.validateObject(json.participacao_social)){
      nomeConselho = "tx_nome_conselho-0";
      nomeTipoParticipacao = "tx_nome_tipo_participacao-0";
      nomeRepresentanteConselho = "tx_nome_representante_conselho-0";
      periodicidade = "tx_periodicidade_reuniao-0";
      dataInicioConselho = "dt_data_inicio_conselho-0";
      dataFimConselho = "dt_data_fim_conselho-0";
      nomeConferencia = "tx_nome_conferencia-0";
      nomeFormaParticipacao = "tx_nome_forma_participacao_conferencia-0";
      anoRealizacao = "dt_ano_realizacao-0";
    }

    var participacao_social = util.validateObject(json.participacao_social) ? json.participacao_social : "";
    var conselhos=util.validateObject(participacao_social.conselho) ? participacao_social.conselho : '0';
    var conferencias = util.validateObject(participacao_social.conferencia) ? participacao_social.conferencia : '0';
    var outras = util.validateObject(participacao_social.outra) ? participacao_social.outra : '0';
    formItens = [];

    if (conselhos) {
      var conselho = participacao_social_form.items;
      for (j=0; j<conselhos.length; j++){
        for (var property in conselhos[j]) {
          if (conselhos[j].hasOwnProperty(property)) {
            if(property == "conselho"){
              formItens.push(new FormItens(conselhos[j].conselho.id, "Nome do Conselho", conselhos[j].conselho.tx_nome_conselho, conselhos[j].conselho.ft_conselho, null, "text"));
              formItens.push(new FormItens(2, "Titularidade", conselhos[j].conselho.tx_nome_tipo_participacao, conselhos[j].conselho.ft_tipo_participacao, null, "text"));
              formItens.push(new FormItens(3, "Nome de representante", conselhos[j].conselho.tx_nome_representante_conselho , conselhos[j].conselho.ft_nome_representante_conselho, null, "text"));
              formItens.push(new FormItens(4, "Periodicidade da Reunião", conselhos[j].conselho.tx_periodicidade_reuniao, conselhos[j].conselho.ft_periodicidade_reuniao, null, "text"));
              formItens.push(new FormItens(5, "Data de início de vigência", conselhos[j].conselho.dt_data_inicio_conselho, conselhos[j].conselho.ft_data_inicio_conselho, null, "text", null, null, "date"));
              formItens.push(new FormItens(6, "Data de fim de vigência", conselhos[j].conselho.dt_data_fim_conselho, conselhos[j].conselho.ft_data_fim_conselho, null, "text", null, null, "date"));
            }
          }
        }
      }
      formItens.push(new FormItens(nomeConselho, "Nome do Conselho", null,null, "Insira no nome do conselho de política pública", "text"));
      formItens.push(new FormItens(nomeTipoParticipacao, "Titularidade", null,null, "Diga se a OSCs ocupa vaga de titular ou suplente", "text"));
      formItens.push(new FormItens(nomeRepresentanteConselho, "Nome de representante", null,null, "Insira o nome do representante da OSC no Conselho", "text"));
      formItens.push(new FormItens(periodicidade, "Periodicidade da Reunião", null,null, "Indique de quanto em quanto tempo as reuniões do Conselho ocorrem", "text"));
      formItens.push(new FormItens(dataInicioConselho, "Data de início de vigência", null,null, "Insira a data em que se iniciou a atividade de representante da OSC no Conselho", "text", null, null, "date"));
      formItens.push(new FormItens(dataFimConselho, "Data de fim de vigência", null,null, "Insira a data em que se encerrou a atividade de representante da OSC no Conselho", "text", null, null, "date"));

      Agrupador = React.createFactory(AgrupadorConselhos);
      ReactDOM.render(
        Agrupador(
          {header:null, dados:formItens}
        ), document.getElementById("conselhos")
      );
    };

    addItem('conselhos');

    formItens = [];//
    if (conferencias.length) {
      var conferencia = participacao_social_form.items;
      for (j=0; j<conferencias.length; j++){
        for (var property in conferencias[j]) {
          if (conferencias[j].hasOwnProperty(property)) {
            if(property == "tx_nome_conferencia"){
              formItens.push(new FormItens(property+"-"+conferencias[j].id, "Nome da Conferência", conferencias[j].tx_nome_conferencia, conferencias[j].ft_conferencia, null, "text"));
            }
            if(property == "tx_nome_forma_participacao_conferencia"){
              formItens.push(new FormItens(property+"-"+conferencias[j].id, "Forma de participação na conferência", conferencias[j].tx_nome_forma_participacao_conferencia, conferencias[j].ft_forma_participacao_conferencia, null, "text"));
            }
            if(property == "dt_ano_realizacao"){
              formItens.push(new FormItens(property+"-"+conferencias[j].id , "Ano de realização da conferência", conferencias[j].dt_ano_realizacao.substring(6), conferencias[j].ft_ano_realizacao, null, "text", null, null, "ano"));
            }
          }
        }
      }
      formItens.push(new FormItens(nomeConferencia, "Nome da Conferência", null,null, "Caso a OSC tenha participado, indique aqui o nome da conferência de política pública", "text"));
      formItens.push(new FormItens(nomeFormaParticipacao, "Forma de participação na conferência", null,null, "Indique qual foi a forma de atuação da OSC nesta Conferência", "text"));
      formItens.push(new FormItens(anoRealizacao, "Ano de realização da conferência", null,null, "Indique o ano em que se realizou a Conferência", "text", null, null, "ano"));

      Agrupador = React.createFactory(AgrupadorConferencia);
      ReactDOM.render(
        Agrupador(
          {header:null, dados:formItens}
        ), document.getElementById("conferencias")
      );
    }

    addItem('conferencias');

    formItens = [];//
    if (outras.length) {
      var outra = participacao_social_form.items;
      for (j=0; j<outras.length; j++){
        for (var property in outras[j]) {
          if (outras[j].hasOwnProperty(property)) {
            if(property == "tx_nome_participacao_social_outra"){
              formItens.push(new FormItens(outra[j].id, "Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs", outras[j].tx_nome_participacao_social_outra, outras[j].ft_participacao_social_outra, null, "text"));
            }
          }
        }
      }

      formItens.push(new FormItens(null, "Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs", null , null, "Indique em quais outros espaços de participação a OSC atualmente tem atuação, se houver", "text", null, null, null, null, true));

      FormItemButtons = React.createFactory(FormItemButtons);
      ReactDOM.render(
        FormItemButtons(
          {header:null, dados:formItens}
        ), document.getElementById("outros_part")
      );
    }

    addItem('outros_part');
  }
}
