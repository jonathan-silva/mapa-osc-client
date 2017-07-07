class Projeto {
  constructor() {

  }

  getFonteDeRecursosProjeto(fonte){
    var key = Object.keys(fonte)[0];
    var objFonte = {
      "id": "fonte_recursos",
      "dados": fonte[key]
    };
    return objFonte;
  }

  montarProjetos(json, util){
    var arraySecaoProjeto = [];

    var projects_list = util.validateObject(json.projeto_abreviado, []);
    //console.log(json.projeto);
    var headerProjeto = {
      "id": "lista_projetos",
      "priority": "2",
      "text": "Projetos, atividades e programas - PAP"
    };
    arraySecaoProjeto.push(headerProjeto);

    var columns = 3;
    var sizeOfData = projects_list.length;
    var newData = new Array(sizeOfData);
    for (var i=0; i < projects_list.length; i++){
      newData[i] = new Array(columns);
      newData[i][0] = util.validateObject(projects_list[i].id_projeto, 1);
      newData[i][1] = util.validateObject(projects_list[i].tx_nome_projeto, "");
      newData[i][2] = "<span className='input-group-btn'>"+
      "<button id='rem_projeto2' className='btn-danger btn'>Remover Projeto</button>"+
      "</span>"
    }
    arraySecaoProjeto.push(newData);
    var columns = 3;
    var sizeOfData = projects_list.length;
    var newData = new Array(sizeOfData);
    for (var i=0; i < projects_list.length; i++){
      newData[i] = new Array(columns);
      newData[i][0] = util.validateObject(projects_list[i].id_projeto, 1);
      newData[i][1] = util.validateObject(projects_list[i].tx_nome_projeto, "");
      newData[i][2] = "<span className='input-group-btn'>"+
      "<button id='rem_projeto2' className='btn-danger btn'>Remover Projeto</button>"+
      "</span>"
    }
    arraySecaoProjeto.push(newData);
    return arraySecaoProjeto;
  }

  montarProjeto(project, util, dadosForm,rotas){


    // MOCK DO CAMPO QUE AINDA NÃO EXISTE NO DB
    project.projeto[0]["cd_tipo_parceria"] = 1;
    project.projeto[0]["ft_tipo_parceria"] = "Representante";
    project.projeto[0]["tx_nome_tipo_parceria_projeto"] = "Outro";
    // MOCK DO CAMPO QUE AINDA NÃO EXISTE NO DB


    var labelMap = dadosForm.labelsProjeto();//console.log(labelMap);

    var arrayCampos = [];
    var agrupadores = [];
    var projectId = project.id_projeto;
    var projet = util.validateObject(project.projeto,project);
    //console.log("Projet");
    console.log(projet);
    var project = util.validateObject(projet[0],projet);
    //console.log("Project");
    //console.log(project);
    var title = util.validateObject(project.ft_identificador_projeto_externo,"Representante");
    var objetivo_meta = util.validateObject(project.objetivo_meta,null);
    for (var property in project) {
      // Area de atuacao e oscs parceiras de projeto temporariamente escondidas
      if((property != "area_atuacao") && (property != "osc_parceira") && (property != "area_atuacao_outra")){
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
          if(property == "tx_nome_tipo_parceria_projeto"){
            console.log("tipo_parceria");
            console.log(value);
            console.log(value === null);

          }
          if(property == "tx_nome_status_projeto"){

            //console.log("tx_nome_status_projeto");
            //console.log(value);
            //console.log(value === null);

          }



          if((value === null) || (value.constructor !== Array)){

            var inputProjeto = util.InputProjeto(sectionId, value, type, options, removable, buttons, buttonsInLine, placeholder, title, objetivo_meta);
            var agrupadorInputProjeto = util.AgrupadorDeInputs(sectionId, containerClass, header, [inputProjeto], buttons);
            agrupadores.push(agrupadorInputProjeto);
          }
        }
      }
    }
    //console.log(agrupadores);
    if (!(project.hasOwnProperty("fonte_de_recursos"))){
      //console.log("teste")
    }
    /* Area de atuacao de projeto temporariamente escondida
    if (!(project.hasOwnProperty("area_atuacao"))){
      var property = "area_atuacao";
      var sectionId = property;
      var value = "";
      var header = labelMap[property].header;
      var containerClass = labelMap[property].containerClass;
      var removable = labelMap[property].removable;
      var type = labelMap[property].type;
      var options = labelMap[property].options;
      var placeholder = labelMap[property].placeholder;
      var buttons = null;
      var buttonsInLine = false;
      var inputProjeto = util.InputProjeto(sectionId, value, type, options, removable, buttons, buttonsInLine, placeholder, title, objetivo_meta);
      var agrupadorInputProjeto = util.AgrupadorDeInputs(sectionId, containerClass, header, [inputProjeto], buttons);
      agrupadores.push(agrupadorInputProjeto);
    }*/
    var area_atuacao_projeto = util.validateObject(project.area_atuacao, []);
    var autodeclaradas = util.validateObject(project.area_atuacao_outra, []);

    var projectlocalizacao = util.validateObject(project.localizacao, []);
    var localizacao =  util.getTipoProjeto("localizacao_projeto", projectlocalizacao);
    var fonte = this.getFonteDeRecursosProjeto(util.validateObject(project.fonte_recursos, []));
    fonte.dados = util.validateObject(project.fonte_recursos, []);

    var projectPublicoFinanciado = util.validateObject(project.publico_beneficiado, []);
    var publicoBeneficiado =  util.getTipoProjeto("publico_beneficiado", projectPublicoFinanciado);

    var financiadorProjeto = util.validateObject(project.financiador_projeto, []);
    var financiadores =  util.getTipoProjeto("financiador_projeto", financiadorProjeto);
    var autodeclaradas = util.getTipoProjeto("area_atuacao_outra", autodeclaradas);

    var oscParceira = util.validateObject(project.osc_parceira, []);
    var parceiras =  util.getTipoProjeto("osc_parceira", oscParceira);

    var id_osc_parceira = [];
    var tam_osc_parc = project.osc_parceira ? project.osc_parceira.length : 0;
    for (var i = 0; i < tam_osc_parc ; i++) {
      id_osc_parceira = util.validateObject(project.osc_parceira[i].id_osc,null);
    }

    var valorMeta = "";
    var idObjetivo = util.validateObject(project.objetivo_meta) ? project.objetivo_meta.id_objetivo_projeto : "";

    // Area de atuacao de projeto e OSCs parceiras temporariamente escondidas
    // var multipleInputs = [
    //   autodeclaradas, localizacao, publicoBeneficiado, financiadores, parceiras, fonte//, objetivo_meta
    // ];
    var multipleInputs = [//local onde apresenta os campos na tela de edição do projeto
       fonte//, localizacao, publicoBeneficiado, financiadores, parceiras
    ];
    //console.log(multipleInputs);

    for (var j = 0; j < multipleInputs.length; j++) {
      if(util.validateObject(multipleInputs[j].dados, false)){
        var agrupador = this.createAgrupadorMultipleInputs(multipleInputs[j], labelMap, util);
        agrupadores.push(agrupador);
      }
   }
    //metasObjetivos(project, projectId);
    return agrupadores;
  }

  carregaProjeto(id, dadosForm, rotas, util, novo){
    //console.log(dadosForm);
    //console.log(novo);
    var res = {};
    var agrupadores=null;
    if(novo){
      var empty_project = dadosForm.getEmptyProject();
      res.agrupadores = this.montarProjeto(empty_project, util, dadosForm,rotas);
    } else {
      $.ajax({
        url: 'js/controller.php',
        type: 'GET',
        async: false,
        dataType: 'json',
        data:{flag: 'consulta', rota: rotas.ProjectByID(id)},
        error:function(e){
          console.log("Erro no ajax: ");
          console.log(e);
        },
        success: function(data){
          res.projeto = data;
          //console.log(data);
        }
      });
      agrupadores = this.montarProjeto(res.projeto, util, dadosForm,rotas);
      res.agrupadores = agrupadores;
    }
    //console.log(res);
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
          if(sectionId == "fonte_recursos"){
            if(property === "tx_nome_origem_fonte_recursos_projeto"){
              value = object.dados[i][property];
              options = labelMap[object.id].options;
              var inputProjeto = util.InputProjeto(inputId, value, type, options, removable, buttonsInput, buttonsInLine);
              inputs.push(inputProjeto);
            }
          } else if(property.slice(0,2) === "tx"){
            value = object.dados[i][property];
            var cd = object.dados[i].cd_area_atuacao_projeto;
            var inputProjeto = util.InputProjeto(inputId, value, type, options, removable, buttonsInput, buttonsInLine, null, null, cd);
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
