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

    var projects_list = util.validateObject(json.projeto_abreviado, '0');
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
      newData[i][0] = util.validateObject(projects_list[i].id_projeto, 1);
      newData[i][1] = util.validateObject(projects_list[i].tx_nome_projeto, "");
    }
    arraySecaoProjeto.push(newData);

    var columns = 2;
    var sizeOfData = projects_list.length;
    var newData = new Array(sizeOfData);
    for (var i=0; i < projects_list.length; i++){
      newData[i] = new Array(columns);
      newData[i][0] = util.validateObject(projects_list[i].id_projeto, 1);
      newData[i][1] = util.validateObject(projects_list[i].tx_nome_projeto, "");
    }
    arraySecaoProjeto.push(newData);

    return arraySecaoProjeto;
  }

  montarProjeto(project, util, dadosForm,rotas){
    var labelMap = dadosForm.labelsProjeto();//console.log(labelMap);
    var arrayCampos = [];
    var agrupadores = [];
    var projectId = project.id_projeto;
    var projet = util.validateObject(project.projeto,project)
    var project = util.validateObject(projet[0],projet);
    var title = util.validateObject(project.ft_identificador_projeto_externo,null);
    var objetivo_meta = util.validateObject(project.objetivo_meta,null);
    for (var property in project) { //labelMap[property]) { console.log(property);
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
          var inputProjeto = util.InputProjeto(sectionId, value, type, options, removable, buttons, buttonsInLine, placeholder, title,objetivo_meta);
          var agrupadorInputProjeto = util.AgrupadorDeInputs(sectionId, containerClass, header, [inputProjeto], buttons);
          agrupadores.push(agrupadorInputProjeto);
        }
      }/*
      else {
        if (!( project.hasOwnProperty(property) ) ) { console.log(labelMap[property]);}
        if (labelMap[property] == undefined){ console.log(property);}
        /*if ( !(project.hasOwnProperty(property)) || (labelMap[property] == undefined)){
        var inputProjeto = util.InputProjeto(sectionId, value, type, options, removable, buttons, buttonsInLine, placeholder, title);
        var agrupadorInputProjeto = util.AgrupadorDeInputs(sectionId, containerClass, header, [inputProjeto], buttons);
        agrupadores.push(agrupadorInputProjeto);
      }
    }*/
    }
    var area_atuacao_projeto = util.validateObject(project.area_atuacao, []);
    var area_atuacao_outra_projeto = util.validateObject(project.area_atuacao_outra, []);
    var autodeclaradas = [].concat(area_atuacao_projeto).concat(area_atuacao_outra_projeto);

    var projectlocalizacao = util.validateObject(project.localizacao, []);
    var localizacao =  util.getTipoProjeto("localizacao_projeto", projectlocalizacao);
    var fonte = this.getFonteDeRecursosProjeto(projectId);

    var projectPublicoFinanciado = util.validateObject(project.publico_beneficiado, []);
    var publicoBeneficiado =  util.getTipoProjeto("publico_beneficiado", projectPublicoFinanciado);

    var financiadorProjeto = util.validateObject(project.financiador_projeto, []);
    var financiadores =  util.getTipoProjeto("financiador_projeto", financiadorProjeto);
    var autodeclaradas = util.getTipoProjeto("autodeclaradas", autodeclaradas);

    var oscParceira = util.validateObject(project.osc_parceira, []);
    var parceiras =  util.getTipoProjeto("osc_parceira", oscParceira);

    var valorMeta = "";
    var idObjetivo = util.validateObject(project.objetivo_meta) ? project.objetivo_meta.id_objetivo_projeto : "";
    //var objetivo_meta = /*util.validateObject(project.objetivo_meta)?*/ this.metasObjetivos(project,idObjetivo,util,rotas) ;// : util.getTipoProjeto("objetivo_meta", []);
    var multipleInputs = [
      localizacao, publicoBeneficiado, financiadores,
      autodeclaradas, parceiras, fonte//, objetivo_meta
    ];

    for (var j = 0; j < multipleInputs.length; j++) {
      if(util.validateObject(multipleInputs[j].dados, false)){
        var agrupador = this.createAgrupadorMultipleInputs(multipleInputs[j], labelMap, util);
        agrupadores.push(agrupador);
      }
   }
    //metasObjetivos(project, projectId);
    return agrupadores;
  }

  carregaProjeto(id, dadosForm, rotas, util){
    var res = {};
    var agrupadores=null;
    // rotas.ProjectByID(id)
    if(id === "-1"){
      var empty_project = dadosForm.getEmptyProject();
      res.agrupadores = this.montarProjeto(empty_project, util, dadosForm,rotas);
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
          res.projeto = data;
        }
      });
      agrupadores = this.montarProjeto(res.projeto, util, dadosForm,rotas);
      res.agrupadores = agrupadores;
    }

    return res;
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
    //console.log(object);
    var element = labelMap[object.id];
    var inputs = [];
    var value = "";
    var removable = util.validateObject(element)?element.removable:"";
    var type = util.validateObject(element)?element.type:"";
    var options = util.validateObject(element)?element.options:"";
    var suboptions = null;
    var buttonsInput = null;
    var buttonsInLine = false;
    if(removable){
      buttonsInput = [buttonRemove];
      buttonsAgrupador = [buttonAdd];
      buttonsInLine = true;
    }
    if(object.dados.length === 0){
      var inputId = sectionId;
      value = "";
      var inputProjeto = util.InputProjeto(inputId, value, type, options, removable, buttonsInput, buttonsInLine);
      inputs.push(inputProjeto);
    }
    for (var i = 0; i < object.dados.length; i++) {
      var inputId = sectionId;
      for (var property in object.dados[i]) {
        //console.log(property);
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
    var header = util.validateObject(element)?element.header:"";
    var containerClass = util.validateObject(element)?element.containerClass:"col-md-3";
    var buttonsAgrupador = null;
    if(removable){
      buttonsInput = [buttonRemove];
      buttonsAgrupador = [buttonAdd];
    }
    var agrupadorInputProjeto = util.AgrupadorDeInputs(sectionId, containerClass, header, inputs, buttonsAgrupador);
    return agrupadorInputProjeto;
  }


}
