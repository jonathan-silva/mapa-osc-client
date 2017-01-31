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

  montarProjetos(json){
    var projects_list = util.validateObject(json.projeto_abreviado) ? json.projeto_abreviado : '0';
    //console.log(json.projeto);
    var headerProjeto = {
      "id": "lista_projetos",
      "priority": "2",
      "text": "Projetos, atividade e programas"
    };

    Section = React.createFactory(Section);
    ReactDOM.render(
      Section(
        {dados:[headerProjeto]}
      ), document.getElementById("projetos")
    );
    $( "#lista_projetos" ).append( '<table id="table_lista_projetos"></table>' );
    var columns = 2;
    var sizeOfData = projects_list.length;
    newData = new Array(sizeOfData);

    for (var i=0; i < projects_list.length; i++){
      newData[i] = new Array(columns);
      newData[i][0] = util.validateObject(projects_list[i].id_projeto) ? projects_list[i].id_projeto : 1;
      newData[i][1] = util.validateObject(projects_list[i].tx_nome_projeto) ? projects_list[i].tx_nome_projeto : "";
    }
    var table_lista_projetos = $('#table_lista_projetos').DataTable({
      responsive: true,
      deferLoading: 1000,
      deferRender: true,
      data: newData,
      columns: [
        {DT_RowId: "Id"},
        {title: "Nome do Projeto"}
      ],
      order: [],
      aoColumnDefs: [
        {bSortable :false, aTargets: [0]},
        {
          "targets": [ 0 ],
          "visible": false,
          "searchable": false
        },
      ],
      autoWidth: true,
      "oLanguage": dadosForm.oLanguageDataTable()
    });


    Section = React.createFactory(Section);
    ReactDOM.render(
      Section(
        {dados:[headerProjeto]}
      ), document.getElementById("projetos")
    );
    $( "#lista_projetos" ).append( '<table id="table_lista_projetos"></table>' );
    var columns = 2;
    var sizeOfData = projects_list.length;
    newData = new Array(sizeOfData);

    for (var i=0; i < projects_list.length; i++){
      newData[i] = new Array(columns);
      newData[i][0] = util.validateObject(projects_list[i].id_projeto) ? projects_list[i].id_projeto : 1;
      newData[i][1] = util.validateObject(projects_list[i].tx_nome_projeto) ? projects_list[i].tx_nome_projeto : "";
    }
    var table_lista_projetos = $('#table_lista_projetos').DataTable({
      responsive: true,
      deferLoading: 1000,
      deferRender: true,
      data: newData,
      columns: [
        {DT_RowId: "Id"},
        {title: "Nome do Projeto"}
      ],
      order: [],
      aoColumnDefs: [
        {bSortable :false, aTargets: [0]},
        {
          "targets": [ 0 ],
          "visible": false,
          "searchable": false
        },
      ],
      autoWidth: true,
      "oLanguage": dadosForm.oLanguageDataTable()
    });

    $('#table_lista_projetos').append('<span class="input-group-btn">'+
    '<button id="add_projeto" class="btn-primary btn">Adicionar Projeto</button>'+
    '</span>');
    $('#add_projeto').click(function(){
      table_lista_projetos.row.add([
        "-1",
        "Novo Projeto"
      ]).draw();
      verificarContraste();
    });

    $("#table_lista_projetos").on('click', 'tr', function(){
      var id_projeto = table_lista_projetos.row(this).data()[0];
      var divId = "projeto-" + id_projeto;
      var projetos = $(this).next(".projeto");
      if(projetos.length < 1){
        $(this).after('<div id="' + divId + '" class="projeto col-md-12">');
        carregaProjeto(id_projeto);
        verificarContraste();
      } else {
        var $divDadosProjeto = $(projetos[0]);
        $divDadosProjeto.toggleClass("hidden");
      }
    });
  }

  carregaProjeto(id){
    var labelMap = dadosForm.labelsProjeto();

    var buttonRemove = {
      "type": "remove",
      "value": "Remover"
    };

    var buttonAdd = {
      "type": "add",
      "value": "Adicionar"
    };

    // rotas.ProjectByID(id)
    if(id === "-1"){
      var empty_project = dadosForm.getEmptyProject();
      montarProjeto(empty_project);
    } else {
      $.ajax({
        url: rotas.ProjectByID(id),
        type: 'GET',
        dataType: 'json',
        data:{},
        error:function(e){
          console.log("Erro no ajax: ");
          console.log(e);
        },
        success: function(data){
          montarProjeto(data);
        }
      });
    }

    function montarProjeto(json, util){
      //console.log(json);
      var project = json;
      var agrupadores = [];
      var projectId = project.id_projeto;
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
            var inputProjeto = util.InputProjeto(sectionId, value, type, options, removable, buttons, buttonsInLine, placeholder);
            var agrupadorInputProjeto = util.AgrupadorDeInputs(sectionId, containerClass, header, [inputProjeto], buttons);
            agrupadores.push(agrupadorInputProjeto);
          }
        }
      }
      var area_atuacao_projeto = util.validateObject(project.area_atuacao) ? project.area_atuacao : [];
      var area_atuacao_outra_projeto = util.validateObject(project.area_atuacao_outra) ? project.area_atuacao_outra : [];
      var autodeclaradas = [].concat(area_atuacao_projeto).concat(area_atuacao_outra_projeto);

      var localizacao = util.getTipoProjeto("localizacao_projeto", project.localizacao);
      var fonte = getFonteDeRecursosProjeto(projectId);
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
          var agrupador = createAgrupadorMultipleInputs(multipleInputs[j]);
          agrupadores.push(agrupador);
        }
      }

      function createAgrupadorMultipleInputs(object){
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

      AgrupadorInputProjeto = React.createFactory(AgrupadorInputProjeto);
      ReactDOM.render(
        AgrupadorInputProjeto(
          {dados:agrupadores}
        ), document.getElementById("projeto-"+id)
      );

      $(".date").datepicker({ dateFormat: 'dd-mm-yy' });
      $(".ano").datepicker({ dateFormat: 'yy' });

      // interacoes
      $('#projeto-'+id).on("click", ".btn-danger", function(){
        $(this).parents(".input-group").remove();
      });

      $('#projeto-'+id).find(".btn-primary").bind("click", function(){
        $(this).parent().siblings(".form-group").append(
          '<div class="input-group">'+
          '<div>'+
          '<input class="form-control" placeholder="Insira a informação"></input>'+
          '</div>'+
          '<span class="input-group-btn">'+
          '<button class="btn-danger btn">Remover</button>'+
          '</span>'+
          '</div>'
        );
      });

      //metas e objetivos
      var objetivo_meta = util.validateObject(project.objetivo_meta) ? project.objetivo_meta : "";
      var objetivo = util.validateObject(objetivo_meta.tx_nome_objetivo_projeto) ? objetivo_meta.tx_nome_objetivo_projeto : -1;
      var cd_objetivo = util.validateObject(objetivo_meta.cd_objetivo_projeto) ? objetivo_meta.cd_objetivo_projeto : -1;
      var meta = util.validateObject(objetivo_meta.tx_nome_meta_projeto) ? objetivo_meta.tx_nome_meta_projeto : -1;
      var cd_meta = util.validateObject(objetivo_meta.cd_meta_projeto) ? objetivo_meta.cd_meta_projeto : -1;

      var $divProjeto = $('#projeto-'+id);
      $divProjeto.append('<div class="col-md-12" id="objetivos-metas"</div>');

      var $divObjetivosMetasProjeto = $divProjeto.find("#objetivos-metas");
      $divObjetivosMetasProjeto.append('<div id="objetivos" class="objetivos"></div>');

      $divObjetivosProjeto = $divObjetivosMetasProjeto.find('#objetivos');
      $divObjetivosProjeto.append('<div class="header">Objetivos do Desenvolvimento Sustentável - ODS - <a href=https://nacoesunidas.org/pos2015 target=_blank>.</a> </div>');
      $divObjetivosProjeto.append('<div class="form-group"><div id="objetivos"><select class="form-control"></select></div></div>');
      $divObjetivosMetasProjeto.append('<div id="metas-'+cd_objetivo+'" class="metas"></div>');

      var $divMetasProjeto = $divObjetivosMetasProjeto.find("#metas-"+cd_objetivo);
      $divMetasProjeto.append('<div class="header" title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido</div>');
      $divMetasProjeto.append('<ol id="selectable-'+cd_objetivo +'" class="selectable"></ol>');

      // rotas.Objetivos()
      $.ajax({
        url: rotas.Objetivos(),
        type: 'GET',
        dataType: 'json',
        data:{},
        error:function(e){
          console.log("Erro no ajax: ");
          console.log(e);
        },
        success: function(data){
          montarObjetivos(data);
        }
      });

      function montarObjetivos(json){
        var options = json;
        var $selectObjetivos = $divObjetivosProjeto.find("select");
        $selectObjetivos.append('<option selected id="' + 0 + '">' + "Selecione um item" + '</option>');
        for (var i = 0; i < options.length; i++) {
          if(options[i].cd_objetivo_projeto === cd_objetivo){
            $selectObjetivos.append('<option selected id="' + options[i].cd_objetivo_projeto + '">' + options[i].tx_nome_objetivo_projeto + '</option>');
          } else {
            $selectObjetivos.append('<option id="' + options[i].cd_objetivo_projeto + '">' + options[i].tx_nome_objetivo_projeto + '</option>');
          }
        }
      }

      function loadMetas(cd_objetivo){
        // rotas.Metas()
        $.ajax({
          url: rotas.MetaProjeto(cd_objetivo),
          type: 'GET',
          dataType: 'json',
          data:{},
          error:function(e){
            console.log("Erro no ajax: ");
            console.log(e);
          },
          success: function(data){
            montarMetas(data, cd_objetivo);
          }
        });
      }

      if(cd_objetivo){
        loadMetas(cd_objetivo);
      }

      function montarMetas(data, cd_objetivo){
        if (util.validateObject(data)){
          var checkboxItems = [];
          function CheckboxItems(id, label, value, type, custom_class){
            this.id = id;
            this.label = label;
            this.value = value;
            this.type = type;
            this.custom_class = custom_class;
          }
          //console.log(data);
          items = data;
          for (var i=0; i<items.length; i++){
            checkboxItems.push(new CheckboxItems(items[i].cd_meta_projeto, items[i].tx_nome_meta_projeto, items[i].tx_nome_meta_projeto, "checkbox", null));
          }
          Checkbox = React.createFactory(Checkbox);
          ReactDOM.render(
            Checkbox(
              {header:{priority: headerPriority, text: headerText}, dados:checkboxItems}
            ), document.getElementById("selectable-"+cd_objetivo)
          );
          //console.log(CheckboxItems);
        }
      }

      $('.objetivos').find('select').on('change', function(){
        cd_objetivo = $(this).children(":selected").attr("id")
        $(this).parents("#objetivos-metas").find(".metas").each(function(){
          if(!$(this).hasClass('hidden')){
            $(this).toggleClass('hidden');
          }
        });

        // $(this).removeClass("ui-selected");
        //console.log($divObjetivosMetasProjeto);
        $divObjetivosMetasProjeto.append('<div id="metas-'+cd_objetivo+'" class="metas"></div>');
        $('#metas-'+cd_objetivo).append('<div class="header" title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido</div>');
        $('#metas-'+cd_objetivo).append('<ol id="selectable-'+cd_objetivo +'" class="selectable"></ol>');
        if($('#metas-'+cd_objetivo).hasClass('hidden')){
          $('#metas-'+cd_objetivo).toggleClass('hidden');
        }
        //console.log(cd_objetivo);
        if(parseInt(cd_objetivo) !== 0){
          loadMetas(cd_objetivo);
        }
      });
    }
  }
}
