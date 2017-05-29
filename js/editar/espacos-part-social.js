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
    util.addOutro('conselho');
    $(".date").datepicker({ dateFormat: 'dd-mm-yy' });

    var formItens = arrayObj[1];
    Agrupador = React.createFactory(AgrupadorConferencia);
    ReactDOM.render(
      Agrupador(
        {header:null, dados:formItens}
      ), document.getElementById("conferencias")
    );
    util.addItem('conferencias');
    util.addOutro('conferencia');

    var formItens = arrayObj[2];
    FormItemButtons = React.createFactory(FormItemButtons);
    ReactDOM.render(
      FormItemButtons(
        {header:null, dados:formItens}
      ), document.getElementById("outros_part")
    );
    util.addItem('outros_part');
  }

  iniciarEspacosPartSoc(data, util, dadosForm, Section, React, ReactDOM, conselhos, conferencias, periodicidadeReuniao, formas){
    var tx_sem_participacao_social = "Não há registros de participação social";
    var participacao_social_form = dadosForm.partSocial();
    var items = participacao_social_form.items;
    Section = React.createFactory(Section);
    ReactDOM.render(
      Section(
        {dados:items}
      ), document.getElementById(items[0].target)
    );
    return this.montarEspacosParticipacaoSocial(data, util, participacao_social_form, conselhos, conferencias, periodicidadeReuniao, formas);
  }

  montarEspacosParticipacaoSocial(json, util, participacao_social_form, lconselho, lconferencia, lperiodicidadeReuniao, lforma){
    var controller = 'js/controller.php'
    $.ajax({
      url: controller,
      type: 'GET',
      async: false,
      dataType: 'json',
      data:{flag: 'consulta', rota: lconselho},
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
      url: controller,
      type: 'GET',
      async: false,
      dataType: 'json',
      data:{flag: 'consulta', rota: lperiodicidadeReuniao},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        lperiodicidadeReuniao = data;
      }
    });
    var lista_periodicidadeReuniao=[];
    for (var i=0;i<lperiodicidadeReuniao.length;i++){ lista_periodicidadeReuniao[i] = lperiodicidadeReuniao[i].tx_nome_periodicidade_reuniao_conselho}

    $.ajax({
      url: controller,
      type: 'GET',
      async: false,
      dataType: 'json',
      data:{flag: 'consulta', rota: lconferencia},
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
      url: controller,
      type: 'GET',
      async: false,
      dataType: 'json',
      data:{flag: 'consulta', rota: lforma},
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
    var periodicidade = util.validateObject(json.participacao_social) ? "tx_nome_periodicidade_reuniao_conselho-0" : null;
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
      periodicidade = "tx_nome_periodicidade_reuniao_conselho-0";
      dataInicioConselho = "dt_data_inicio_conselho-0";
      dataFimConselho = "dt_data_fim_conselho-0";
      nomeConferencia = "tx_nome_conferencia-0";
      nomeFormaParticipacao = "tx_nome_forma_participacao_conferencia-0";
      anoRealizacao = "dt_ano_realizacao-0";
    }

    var participacao_social = util.validateObject(json.participacao_social, "");
    var conselhos=util.validateObject(participacao_social.conselho, '0');
    //var conselhos_outro=util.validateObject(participacao_social.conselho_outro, '0');
    var conferencias = util.validateObject(participacao_social.conferencia, '0');
    //var conferencias_outro = util.validateObject(participacao_social.conferencia_outra, '0');
    var outras = util.validateObject(participacao_social.outra, '0');
    var formItens = [];

    if (conselhos) {
      var conselho = participacao_social_form.items;
      for (var j=0; j<conselhos.length; j++){
        for (var property in conselhos[j]) {
          if (conselhos[j].hasOwnProperty(property)) {
            if(property == "conselho"){
              formItens.push(util.FormItens("tx_nome_conselho-"+conselhos[j].conselho.id_conselho, "Nome do Conselho", conselhos[j].conselho.tx_nome_conselho, conselhos[j].conselho.ft_conselho, null, "select",lista_conselho));
              if (conselhos[j].conselho.tx_nome_conselho_outro){
                formItens.push(util.FormItens("outro-conselho-"+conselhos[j].conselho.id_conselho, "Identificação do Conselho", conselhos[j].conselho.tx_nome_conselho_outro ? conselhos[j].conselho.tx_nome_conselho_outro  : "" , conselhos[j].conselho.ft_conselho, null, "text"));
              }else{
                  formItens.push(util.FormItens("outro-conselho-empty-"+conselhos[j].conselho.id_conselho, "Identificação do Conselho", conselhos[j].conselho.tx_nome_conselho_outro ? conselhos[j].conselho.tx_nome_conselho_outro  : "" , conselhos[j].conselho.ft_conselho, null, "text", null, null,null, true));
              }
              formItens.push(util.FormItens("tx_nome_tipo_participacao-"+conselhos[j].conselho.id_conselho, "Titularidade", conselhos[j].conselho.tx_nome_tipo_participacao, conselhos[j].conselho.ft_tipo_participacao, null, "select", lista_forma));
              formItens.push(util.FormItens("tx_nome_representante_conselho-"+conselhos[j].conselho.id_conselho, "Nome de representante", conselhos[j].representante ? conselhos[j].representante[0].tx_nome_representante_conselho : "" , conselhos[j].conselho.ft_nome_representante_conselho, null, "text"));
              formItens.push(util.FormItens("tx_nome_periodicidade_reuniao_conselho-"+conselhos[j].conselho.id_conselho, "Periodicidade da Reunião", conselhos[j].conselho.tx_nome_periodicidade_reuniao_conselho, conselhos[j].conselho.ft_periodicidade_reuniao, null, "select", lista_periodicidadeReuniao));
              formItens.push(util.FormItens("dt_data_inicio_conselho-"+conselhos[j].conselho.id_conselho, "Data de início de vigência", conselhos[j].conselho.dt_data_inicio_conselho, conselhos[j].conselho.ft_data_inicio_conselho, null, "text", null, null, "date"));
              formItens.push(util.FormItens("dt_data_fim_conselho-"+conselhos[j].conselho.id_conselho, "Data de fim de vigência", conselhos[j].conselho.dt_data_fim_conselho, conselhos[j].conselho.ft_data_fim_conselho, null, "text", null, null, "date"));
            }
          }
        }
      }


      formItens.push(util.FormItens(nomeConselho, "Nome do Conselho", null,null, "", "select",lista_conselho,"Insira o nome do conselho de política pública"));
      formItens.push(util.FormItens(nomeTipoParticipacao, "Titularidade", null,null, "", "select",lista_forma,"Diga se a OSCs ocupa vaga de titular ou suplente"));
      formItens.push(util.FormItens(nomeRepresentanteConselho, "Nome de representante", null,null, "Insira o nome do representante da OSC no Conselho", "text"));
      formItens.push(util.FormItens(periodicidade, "Periodicidade da Reunião", null,null, "", "select",lista_periodicidadeReuniao,"Indique de quanto em quanto tempo as reuniões do Conselho ocorrem"));
      formItens.push(util.FormItens(dataInicioConselho, "Data de início de vigência", null,null, "Insira a data em que se iniciou a atividade de representante da OSC no Conselho", "text", null, null, "date"));
      formItens.push(util.FormItens(dataFimConselho, "Data de fim de vigência", null,null, "Insira a data em que se encerrou a atividade de representante da OSC no Conselho", "text", null, null, "date"));
      arraySecao.push(formItens);
    };

    var lista_forma_conferencia = [
    'Membro de comissão organizadora nacional', 'Membro de comissão organizadora estadual ou distrital', 'Membro de comissão organizadora municipal',
'Delegado para etapa nacional','Delegado para etapa estadual ou distrital','Participante de etapa municipal','Participante de conferência livre ou virtual',
'Palestrante ou convidado','Observador','Mediador, moderador ou relator','Outra'];
    var formItens = [];//
    //console.log(conferencias);
    if (conferencias.length) {

      var conferencia = participacao_social_form.items;
      for (var j=0; j<conferencias.length; j++){
        for (var property in conferencias[j]) {
          if (conferencias[j].hasOwnProperty(property)) {
            if(property == "tx_nome_conferencia"){
              formItens.push(util.FormItens(property+"-"+conferencias[j].id, "Nome da Conferência", conferencias[j].tx_nome_conferencia, conferencias[j].ft_conferencia, null, "select", lista_conferencia));
            }

            if (property == "tx_nome_conferencia_outro"){
                if ( conferencias[j].tx_nome_conferencia_outro ){
                    formItens.push(util.FormItens("outro-conferencia-"+conferencias[j].id_conferencia, "Identificação da Confêrencia", conferencias[j].tx_nome_conferencia_outro ? conferencias[j].tx_nome_conferencia_outro  : "" , conferencias[j].ft_conferencia, null, "text"));
                }else{
                        formItens.push(util.FormItens("outro-conferencia-empty-"+conferencias[j].id_conferencia, "Identificação da Confêrencia", conferencias[j].tx_nome_conferencia_outro ? conferencias[j].tx_nome_conferencia_outro  : "" , conferencias[j].ft_conferencia, null, "text", null, null,null, true));
                }
            }

            if(property == "tx_nome_forma_participacao_conferencia"){
              formItens.push(util.FormItens(property+"-"+conferencias[j].id, "Forma de participação na conferência", conferencias[j].tx_nome_forma_participacao_conferencia, conferencias[j].ft_forma_participacao_conferencia, null, "select",lista_forma_conferencia));
            }
            if(property == "dt_ano_realizacao"){
              var dtAnoRealizacao = conferencias[j].dt_ano_realizacao;
              dtAnoRealizacao = dtAnoRealizacao ? dtAnoRealizacao.substring(6) : dtAnoRealizacao;
              formItens.push(util.FormItens(property+"-"+conferencias[j].id , "Ano de realização da conferência", dtAnoRealizacao, conferencias[j].ft_ano_realizacao, null, "text", null, null, "ano"));
            }
          }
        }
      }

      formItens.push(util.FormItens(nomeConferencia, "Nome da Conferência", null,null, "", "select",lista_conferencia,"Caso a OSC tenha participado, indique aqui o nome da conferência de política pública"));
      formItens.push(util.FormItens(anoRealizacao, "Ano de realização da conferência", null,null, "Indique o ano em que se realizou a Conferência", "text", null, null, "ano"));
      formItens.push(util.FormItens(nomeFormaParticipacao, "Forma de participação na conferência", null,null, "", "select",lista_forma_conferencia,"Indique qual foi a forma de atuação da OSC nesta Conferência"));

      arraySecao.push(formItens);
      /*console.log(nomeFormaParticipacao);
      if (nomeFormaParticipacao === "Outra"){ console.log(nomeConferencia);
        /*$inputContainer.toggleClass('hidden');
        if($inputContainer.hasClass('hidden')){
          var $input = $inputContainer.find('input');
          $input.val("");
        }
      } else {console.log("else");/*
        if(!$inputContainer.hasClass('hidden')){
          $inputContainer.toggleClass('hidden');
          var $input = $inputContainer.find('input');
          $input.val("");
        }
      }*/
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
    $(".date").datepicker({ dateFormat: 'dd-mm-yy' });
    return arraySecao;
  }
}
