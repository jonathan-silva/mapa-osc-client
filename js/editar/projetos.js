class Projeto {
  constructor() {

  }

  getFonteDeRecursosProjeto(id){
    var fonte = {
      "fonte_de_recursos": [
        {
          "id_fonte_recursos_projeto": 1,
          "cd_origem_fonte_recursos_projeto": 1092,
          "tx_nome_origem_fonte_recursos_projeto": "Público",
          "cd_fonte_recursos_projeto": null,
          "tx_nome_fonte_recursos_projeto": "Federal",
          "ft_fonte_recursos_projeto": null
        }
      ]
    };
    var key = Object.keys(fonte)[0];
    var objFonte = {
      "id": key,
      "dados": fonte[key]
    };
    return objFonte;
  }

  montarProjetos(json, util){
    var arraySecaoProjeto = [];

    var projects_list = util.validateObject(json.projeto_abreviado) ? json.projeto_abreviado : '0';
    //console.log(json.projeto);
    var headerProjeto = {
      "id": "lista_projetos",
      "priority": "2",
      "text": "Projetos, atividade e programas"
    };
    arraySecaoProjeto.push(headerProjeto);

    var columns = 2;
    var sizeOfData = projects_list.length;
    var newData = new Array(sizeOfData);
    for (var i=0; i < projects_list.length; i++){
      newData[i] = new Array(columns);
      newData[i][0] = util.validateObject(projects_list[i].id_projeto) ? projects_list[i].id_projeto : 1;
      newData[i][1] = util.validateObject(projects_list[i].tx_nome_projeto) ? projects_list[i].tx_nome_projeto : "";
    }
    arraySecaoProjeto.push(newData);

    var columns = 2;
    var sizeOfData = projects_list.length;
    var newData = new Array(sizeOfData);
    for (var i=0; i < projects_list.length; i++){
      newData[i] = new Array(columns);
      newData[i][0] = util.validateObject(projects_list[i].id_projeto) ? projects_list[i].id_projeto : 1;
      newData[i][1] = util.validateObject(projects_list[i].tx_nome_projeto) ? projects_list[i].tx_nome_projeto : "";
    }
    arraySecaoProjeto.push(newData);

    return arraySecaoProjeto;
  }

  montarProjeto(project, util, dadosForm){
    var labelMap = dadosForm.labelsProjeto();
    //console.log(labelMap);
    var arrayCampos = [];
    var agrupadores = [];
    var projectId = project.id_projeto;
    var title = util.validateObject(project.ft_identificador_projeto_externo)?project.ft_identificador_projeto_externo:null;

    for (var property in project) {
      if ((project.hasOwnProperty(property)) && (labelMap[property] !== undefined)) {
        var sectionId = property;
        var value = project[property];
        var header = labelMap[property].header;
        var containerClass = labelMap[property].containerClass;
        var removable = labelMap[property].removable;
        var type = labelMap[property].type;
        var options = labelMap[property].options;
        var placeholder = labelMap[property].placeholder;
        var buttons = null;
        var buttonsInLine = false;

        if((value === null) || (value.constructor !== Array)){
          var inputProjeto = util.InputProjeto(sectionId, value, type, options, removable, buttons, buttonsInLine, placeholder, title);
          var agrupadorInputProjeto = util.AgrupadorDeInputs(sectionId, containerClass, header, [inputProjeto], buttons);
          agrupadores.push(agrupadorInputProjeto);
        }
      }
    }
    var area_atuacao_projeto = util.validateObject(project.area_atuacao) ? project.area_atuacao : [];
    var area_atuacao_outra_projeto = util.validateObject(project.area_atuacao_outra) ? project.area_atuacao_outra : [];
    var autodeclaradas = [].concat(area_atuacao_projeto).concat(area_atuacao_outra_projeto);

    var localizacao = util.getTipoProjeto("localizacao_projeto", project.localizacao);
    var fonte = this.getFonteDeRecursosProjeto(projectId);
    var publicoBeneficiado = util.getTipoProjeto("publico_beneficiado", project.publico_beneficiado);
    var financiadores = util.getTipoProjeto("financiadores", project.financiador);
    var autodeclaradas = util.getTipoProjeto("autodeclaradas", autodeclaradas);
    var parceiras = util.getTipoProjeto("parceiras", project.parceira);
    var valorMeta = "";
    var idObjetivo = "";
    var multipleInputs = [
      localizacao, publicoBeneficiado, financiadores,
      autodeclaradas, parceiras, fonte
    ];
    //console.log(multipleInputs);
    for (var j = 0; j < multipleInputs.length; j++) {
      if(util.validateObject(multipleInputs[j].dados)){
        var agrupador = this.createAgrupadorMultipleInputs(multipleInputs[j], labelMap, util);
        agrupadores.push(agrupador);
      }
    }
    return agrupadores;
  }

  carregaProjeto(id, dadosForm, rotas, util){
    var res = null;
    var agrupadores=null;
    // rotas.ProjectByID(id)
    if(id === "-1"){
      var empty_project = dadosForm.getEmptyProject();
      agrupadores = this.montarProjeto(empty_project, util, dadosForm);
    } else {
      $.ajax({
        url: rotas.ProjectByID(id),
        type: 'GET',
        async: false,
        dataType: 'json',
        data:{},
        error:function(e){
          console.log("Erro no ajax: ");
          console.log(e);
        },
        success: function(data){
          res = data;
        }
      });
      agrupadores = this.montarProjeto(res, util, dadosForm);
    }

    return agrupadores;
  }

  createAgrupadorMultipleInputs(object, labelMap, util){
    var buttonRemove = {
      "type": "remove",
      "value": "Remover"
    };

    var buttonAdd = {
      "type": "add",
      "value": "Adicionar"
    };
    var sectionId = object.id
    var element = labelMap[object.id];
    var inputs = [];
    var value = "";
    var removable = element.removable;
    var type = element.type;
    var options = element.options;
    var suboptions = null;
    var buttonsInput = null;
    var buttonsInLine = false;
    if(removable){
      buttonsInput = [buttonRemove];
      buttonsAgrupador = [buttonAdd];
      buttonsInLine = true;
    }
    for (var i = 0; i < object.dados.length; i++) {
      var inputId = sectionId;
      for (var property in object.dados[i]) {
        if (object.dados[i].hasOwnProperty(property)) {
          if(sectionId == "fonte_de_recursos"){
            if(property === "tx_nome_origem_fonte_recursos_projeto"){
              value = object.dados[i][property];
              options = labelMap[object.id].options;
              var inputProjeto = util.InputProjeto(inputId, value, type, options, removable, buttonsInput, buttonsInLine);
              inputs.push(inputProjeto);
            } else if (property === "tx_nome_fonte_recursos_projeto"){
              options = labelMap[object.id+"_publico"].options;
              var inputId = "sub-" + sectionId;
              var inputProjeto = util.InputProjeto(inputId, value, type, options, removable, buttonsInput, buttonsInLine);
              inputs.push(inputProjeto);
            }
          } else if(property.slice(0,2) === "tx"){
            value = object.dados[i][property];
            var inputProjeto = util.InputProjeto(inputId, value, type, options, removable, buttonsInput, buttonsInLine);
            inputs.push(inputProjeto);
          }
        }
      }
    }
    var header = element.header;
    var containerClass = element.containerClass;
    var buttonsAgrupador = null;
    if(removable){
      buttonsInput = [buttonRemove];
      buttonsAgrupador = [buttonAdd];
    }
    var agrupadorInputProjeto = util.AgrupadorDeInputs(sectionId, containerClass, header, inputs, buttonsAgrupador);
    return agrupadorInputProjeto;
  }
}
