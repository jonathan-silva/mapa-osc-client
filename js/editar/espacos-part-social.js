class EspacosPartSocial {
  constructor() {

  }

  ativarEspacosPart(arrayObj, util, React, ReactDOM, Agrupador, AgrupadorConselhos, AgrupadorConferencia, FormItemButtons){
    var formItens = arrayObj[0];

    Agrupador = React.createFactory(AgrupadorConselhos);
    ReactDOM.render(
      Agrupador(
        {header:null, dados:formItens}
      ), document.getElementById("conselhos")
    );
    util.addItem('conselhos');

    var formItens = arrayObj[1];
    Agrupador = React.createFactory(AgrupadorConferencia);
    ReactDOM.render(
      Agrupador(
        {header:null, dados:formItens}
      ), document.getElementById("conferencias")
    );
    util.addItem('conferencias');

    var formItens = arrayObj[2];
    FormItemButtons = React.createFactory(FormItemButtons);
    ReactDOM.render(
      FormItemButtons(
        {header:null, dados:formItens}
      ), document.getElementById("outros_part")
    );
    util.addItem('outros_part');
  }

  iniciarEspacosPartSoc(data, util, dadosForm, Section, React, ReactDOM, conselhos, conferencias, formas){
    var tx_sem_participacao_social = "Não há registros de participação social";
    var participacao_social_form = dadosForm.partSocial();
    var items = participacao_social_form.items;
    Section = React.createFactory(Section);
    ReactDOM.render(
      Section(
        {dados:items}
      ), document.getElementById(items[0].target)
    );

    return this.montarEspacosParticipacaoSocial(data, util, participacao_social_form, conselhos, conferencias, formas);
  }

  montarEspacosParticipacaoSocial(json, util, participacao_social_form, lconselho, lconferencia, lforma){

    $.ajax({
      url: lconselho,
      type: 'GET',
      async: false,
      dataType: 'json',
      data:{},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        lconselho = data;
      }
    });
    var lista_conselho=[];
    for (var i=0;i<lconselho.length;i++){ lista_conselho[i] = lconselho[i].tx_nome_conselho}

    $.ajax({
      url: lconferencia,
      type: 'GET',
      async: false,
      dataType: 'json',
      data:{},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        lconferencia = data;
      }
    });
    var lista_conferencia=[];

    for (var i=0;i<lconferencia.length;i++){ lista_conferencia[i] = lconferencia[i].tx_nome_conferencia}
/*
    for (var i=0;i<lconferencia.length;i++){
      lista_conferencia.push({
        "texto": lconferencia[i].tx_nome_conferencia,
        "valor": lconferencia[i].cd_conferencia
      })
    }
*/
    $.ajax({
      url: lforma,
      type: 'GET',
      async: false,
      dataType: 'json',
      data:{},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        lforma = data;
      }
    });
    var lista_forma=[];
    for (var i=0;i<lforma.length;i++){ lista_forma[i] = lforma[i].tx_nome_tipo_participacao}
    /*for (var i=0;i<lforma.length;i++){
      lista_forma.push({
        "texto": lforma[i].tx_nome_tipo_participacao,
        "valor": lforma[i].cd_tipo_participacao
      });
    }*/

    var arraySecao = [];
    /*
    var nomeConselho = util.validateObject(json.participacao_social) ? "tx_nome_conselho-0" : null;
    var nomeTipoParticipacao = util.validateObject(json.participacao_social) ? "tx_nome_tipo_participacao-0" : null;
    var nomeRepresentanteConselho = util.validateObject(json.participacao_social) ? "tx_nome_representante_conselho-0" : null;
    var periodicidade = util.validateObject(json.participacao_social) ? "tx_periodicidade_reuniao-0" : null;
    var dataInicioConselho = util.validateObject(json.participacao_social) ? "dt_data_inicio_conselho-0" : null;
    var dataFimConselho = util.validateObject(json.participacao_social) ? "dt_data_fim_conselho-0" : null;
    var nomeConferencia = util.validateObject(json.participacao_social) ? "tx_nome_conferencia-0" : null;
    var nomeFormaParticipacao = util.validateObject(json.participacao_social) ? "tx_nome_forma_participacao_conferencia-0" : null;
    var anoRealizacao = util.validateObject(json.participacao_social) ? "dt_ano_realizacao-0" : null;
    */
    var nomeConselho = null;
    var nomeTipoParticipacao = null;
    var nomeRepresentanteConselho = null;
    var periodicidade = null;
    var dataInicioConselho = null;
    var dataFimConselho = null;
    var nomeConferencia = null;
    var nomeFormaParticipacao = null;
    var anoRealizacao = null;
    if(json.participacao_social){
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

    var participacao_social = util.validateObject(json.participacao_social, "");
    var conselhos=util.validateObject(participacao_social.conselho, '0');
    var conferencias = util.validateObject(participacao_social.conferencia, '0');
    var outras = util.validateObject(participacao_social.outra, '0');
    var formItens = [];

    if (conselhos) {
      var conselho = participacao_social_form.items;
      for (var j=0; j<conselhos.length; j++){
        for (var property in conselhos[j]) {
          if (conselhos[j].hasOwnProperty(property)) {
            if(property == "conselho"){
              formItens.push(util.FormItens("tx_nome_conselho-"+conselhos[j].conselho.id_conselho, "Nome do Conselho", conselhos[j].conselho.tx_nome_conselho, conselhos[j].conselho.ft_conselho, null, "text"));
              formItens.push(util.FormItens("tx_nome_tipo_participacao-"+conselhos[j].conselho.id_conselho, "Titularidade", conselhos[j].conselho.tx_nome_tipo_participacao, conselhos[j].conselho.ft_tipo_participacao, null, "text"));
              formItens.push(util.FormItens("tx_nome_representante_conselho-"+conselhos[j].conselho.id_conselho, "Nome de representante", conselhos[j].conselho.tx_nome_representante_conselho , conselhos[j].conselho.ft_nome_representante_conselho, null, "text"));
              formItens.push(util.FormItens("tx_periodicidade_reuniao-"+conselhos[j].conselho.id_conselho, "Periodicidade da Reunião", conselhos[j].conselho.tx_periodicidade_reuniao, conselhos[j].conselho.ft_periodicidade_reuniao, null, "text"));
              formItens.push(util.FormItens("dt_data_inicio_conselho-"+conselhos[j].conselho.id_conselho, "Data de início de vigência", conselhos[j].conselho.dt_data_inicio_conselho, conselhos[j].conselho.ft_data_inicio_conselho, null, "text", null, null, "date"));
              formItens.push(util.FormItens("dt_data_fim_conselho-"+conselhos[j].conselho.id_conselho, "Data de fim de vigência", conselhos[j].conselho.dt_data_fim_conselho, conselhos[j].conselho.ft_data_fim_conselho, null, "text", null, null, "date"));
            }
          }
        }
      }

      formItens.push(util.FormItens(nomeConselho, "Nome do Conselho", null,null, "", "select",lista_conselho,"Insira o nome do conselho de política pública"));
      formItens.push(util.FormItens(nomeTipoParticipacao, "Titularidade", null,null, "", "select",lista_forma,"Diga se a OSCs ocupa vaga de titular ou suplente"));
      formItens.push(util.FormItens(nomeRepresentanteConselho, "Nome de representante", null,null, "Insira o nome do representante da OSC no Conselho", "text"));
      formItens.push(util.FormItens(periodicidade, "Periodicidade da Reunião", null,null, "Indique de quanto em quanto tempo as reuniões do Conselho ocorrem", "text"));
      formItens.push(util.FormItens(dataInicioConselho, "Data de início de vigência", null,null, "Insira a data em que se iniciou a atividade de representante da OSC no Conselho", "text", null, null, "date"));
      formItens.push(util.FormItens(dataFimConselho, "Data de fim de vigência", null,null, "Insira a data em que se encerrou a atividade de representante da OSC no Conselho", "text", null, null, "date"));

      arraySecao.push(formItens);
    };

    var formItens = [];//
    if (conferencias.length) {
      var conferencia = participacao_social_form.items;
      for (var j=0; j<conferencias.length; j++){
        for (var property in conferencias[j]) {
          if (conferencias[j].hasOwnProperty(property)) {
            if(property == "tx_nome_conferencia"){
              formItens.push(util.FormItens(property+"-"+conferencias[j].id, "Nome da Conferência", conferencias[j].tx_nome_conferencia, conferencias[j].ft_conferencia, null, "text"));
            }
            if(property == "tx_nome_forma_participacao_conferencia"){
              formItens.push(util.FormItens(property+"-"+conferencias[j].id, "Forma de participação na conferência", conferencias[j].tx_nome_forma_participacao_conferencia, conferencias[j].ft_forma_participacao_conferencia, null, "text"));
            }
            if(property == "dt_ano_realizacao"){
              formItens.push(util.FormItens(property+"-"+conferencias[j].id , "Ano de realização da conferência", conferencias[j].dt_ano_realizacao.substring(6), conferencias[j].ft_ano_realizacao, null, "text", null, null, "ano"));
            }
          }
        }
      }
      var lista_forma_conferencia = [
      'Membro de comissão organizadora nacional', 'Membro de comissão organizadora estadual ou distrital', 'Membro de comissão organizadora municipal',
'Delegado para etapa nacional','Delegado para etapa estadual ou distrital','Participante de etapa municipal','Participante de conferência livre ou virtual',
'Palestrante ou convidado','Observador','Mediador, moderador ou relator','Outro'];

      formItens.push(util.FormItens(nomeConferencia, "Nome da Conferência", null,null, "", "select",lista_conferencia,"Caso a OSC tenha participado, indique aqui o nome da conferência de política pública"));
      formItens.push(util.FormItens(nomeFormaParticipacao, "Forma de participação na conferência", null,null, "", "select",lista_forma_conferencia,"Indique qual foi a forma de atuação da OSC nesta Conferência"));
      formItens.push(util.FormItens(anoRealizacao, "Ano de realização da conferência", null,null, "Indique o ano em que se realizou a Conferência", "text", null, null, "ano"));

      arraySecao.push(formItens);
    }

    var formItens = [];//
    if (outras.length) {
      var outra = participacao_social_form.items;
      for (var j=0; j<outras.length; j++){
        for (var property in outras[j]) {
          if (outras[j].hasOwnProperty(property)) {
            if(property == "tx_nome_participacao_social_outra"){
              formItens.push(util.FormItens(property+"-"+outras[j].id_participacao_social_outra, "Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs", outras[j].tx_nome_participacao_social_outra, outras[j].ft_participacao_social_outra, null, "text"));
            }
          }
        }
      }
      formItens.push(util.FormItens("tx_nome_participacao_social_outra-0", "Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs", null , null, "Indique em quais outros espaços de participação a OSC atualmente tem atuação, se houver", "text", null, null, null, null, true));

      arraySecao.push(formItens);
    }

    return arraySecao;
  }
}
