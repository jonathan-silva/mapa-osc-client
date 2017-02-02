/* jshint ignore:start */
require(["jquery-ui", "libs/jquery-mask/jquery.mask.min"], function (React) {

  $(document).tooltip({
    position: {
      my: "center bottom-20",
      at: "center top",
      using: function( position, feedback ) {
        $( this ).css( position );
        $( "<div>" )
        .addClass( "arrow" )
        .addClass( feedback.vertical )
        .addClass( feedback.horizontal )
        .appendTo( this );
      }
    }
  });

  function readURL(input) {
    if (input.files && input.files[0] && input.files[0].type.match('image.*')) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#imagemLogo").attr('src', e.target.result)
      };
      reader.readAsDataURL(input.files[0]);
    }
    else {
      $('#errorLabel').removeClass('hide');
    }
  }

  $('.custom-file-upload').on("change", function(){
    $('input[type=file]').each(function(index){
      if ($('input[type=file]').eq(index).val() != ""){
        readURL(this);
      }
    });
  });

});

require(['react', 'rotas', 'jsx!components/Util', 'jsx!components/EditarOSC', 'jquery', 'jquery-ui', 'datatables-responsive', 'editarCabecalho'], function (React) {

  var dadosForm = new DataForms();
  var util = new Util();
  var rotas = new Rotas();
  var cabecalhoObject = new Cabecalho();
  var dadosGerais = new DadosGerais();
  var areasAtuacao = new AreaAtuacao();
  var descricao = new Descricao();
  var titulosCertificacoes = new TitulosCertificacoes();
  var relacoesGovernanca = new RelacoesGovernanca();
  var espacosPartSocial = new EspacosPartSocial();
  var projeto = new Projeto();
  var old_json = null;
  var newJson = {};

  require(['componenteFormItem', 'componenteCabecalho', 'componenteCheckbox', 'componenteSection',
  'componenteAgrupador', 'componenteFormItemButtons','componenteAgrupadorInputProjeto','componenteAgrupadorConferencia','componenteAgrupadorConselhos'],
  function(FormItem, Cabecalho, Checkbox, Section, Agrupador, FormItemButtons, AgrupadorInputProjeto, AgrupadorConferencia, AgrupadorConselhos){

    var valoresURL = window.location.href.split('#')[1]!==undefined ? window.location.href.split('#/')[1].split('=') : null;
    var urlRota = "";
    var idOsc = "";
    //console.log(rotas);
    if(valoresURL !== null){
      idOsc = valoresURL[0];
      urlRota = rotas.OSCByID_no_project(idOsc);
    }
    //window.localStorage.setItem('User', 17);
    //window.localStorage.setItem('Authorization', "vhYFzMQd8FzeMgM89P99Bx6qR7coRXBGHycCaTr27F4=");
    var user = window.localStorage.getItem('User');
    var auth  = window.localStorage.getItem('Authorization');

    $("#unauthorized" ).dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      autoOpen: false,
      buttons: {
        "OK": function() {
          $( this ).dialog( "close" );
        }
      }
    });

    var authHeader = {
      "User": user,
      "Authorization": auth
    }

    var headerPriority = '2';
    var divObjetivosMetasProjeto='';

    $.ajax({
      url: rotas.OSCByID_no_project(idOsc),
      type: 'GET',
      dataType: 'json',
      data:{flag: "", rota: urlRota},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        //console.log(data);
        //Cabeçalho
        ativarCabecalho(data, util);
        // Dados Gerais
        ativarDadosGerais(data, util, dadosForm);
        //Áreas de atuação
        var txtAtvEconomica = util.validateObject(data.dados_gerais.tx_nome_atividade_economica_osc) ? data.dados_gerais.tx_nome_atividade_economica_osc : "";
        var fonteAtvEconomica = util.validateObject(data.dados_gerais.ft_atividade_economica_osc) ? data.dados_gerais.ft_atividade_economica_osc : "";
        ativarAreasDeAtuacao(data, util, dadosForm, rotas, txtAtvEconomica, fonteAtvEconomica);
        //Descrição
        ativarDescricao(data, util);
        //Títulos e certificações
        ativarTitulosCertificacoes(data, util, dadosForm);
        //Relações de trabalho e governança
        //ativarTrabalhoGovernanca(data, util, dadosForm);
        // Espaços participacao social
        ativarEspacosPart(data, util, dadosForm);/**/
        //Projetos
        ativarProjetos(data, util, dadosForm);
        /*
        //Datas
        $(".date").datepicker({ dateFormat: 'dd-mm-yy' });
        $(".ano").datepicker({ dateFormat: 'yy' });
        //Fonte de recurso
        fonteRecurso.montarFontedeRecursos(data, util);
        */
        //Acessibilidade
        verificarContraste();
        //função para contornar a não renderização de eventos (onclick, onmouseover...) pelo react
        clique();
      }
    });

    function ativarCabecalho(data, util){
      var cabecalhoArray = cabecalhoObject.montarCabecalho(data, util);
      Cabecalho = React.createFactory(Cabecalho);
      ReactDOM.render(Cabecalho({dados:cabecalhoArray}), document.getElementById("cabecalho"));
      old_json = data;
    }

    function ativarDadosGerais(data, util, dadosForm) {
      var formItens = dadosGerais.montarDadosGerais(data, util, dadosForm);
      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:{priority: headerPriority, text: 'Dados Gerais'}, dados:formItens}
        ), document.getElementById("dados_gerais")
      );
      $("#tx_telefone").find("input").mask('(00) 0000-0000');
    }

    function ativarAreasDeAtuacao(data, util, dadosForm, rotas, tx_nome_atividade_economica_osc, ft_atividade_economica_osc){
      var obj = areasAtuacao.montarAreasDeAtuacao(data, util, dadosForm, rotas, tx_nome_atividade_economica_osc, ft_atividade_economica_osc);
      var formItens = obj.formItens;
      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:{priority: headerPriority, text: 'Áreas e Subáreas de Atuação da OSC'}, dados:formItens}
        ), document.getElementById("areas_de_atuacao")
      );
      carregarAreasAtuacao(obj.area_suggestions, obj.macro_area_suggestions);
    }

    function carregarAreasAtuacao(area_suggestions, macro_area_suggestions){
      var id_suggestion = 0;

      $("#areas_de_atuacao .autocomplete").autocomplete({
        minLength: 0,
        create: function(event, ui) {
          var value = $(this).attr("placeholder");
          for (var i = 0; i < macro_area_suggestions.length; i++) {
            var suggestion = macro_area_suggestions[i].value;

            if (suggestion === value){
              var $container = $(this).siblings(".checkboxList");
              var $element = $container.find("#subareas-"+i);
              if($element.hasClass('hidden')){
                $element.toggleClass('hidden');
              }
              for (var j = 0; j < macro_area_suggestions.length; j++) {
                if((value === macro_area_suggestions[j].tx_nome_area_atuacao)){
                  var subarea_exists = false;
                  $element.find("label").each(function(){
                    if(macro_area_suggestions[j].tx_nome_subarea_atuacao === $(this).text().trim()){
                      subarea_exists = $(this);
                    }
                  });
                  if(subarea_exists){
                    subarea_exists.find("input").prop('checked', true);
                  } else {
                    $element.find("#outros").val(macro_area_suggestions[j].tx_nome_subarea_atuacao);
                  }
                }
              }
            }
          }
        },
        source: macro_area_suggestions,
        change: function( event, ui ) {
        },
        select: function(event, ui){
          var targetElement = event.target;
          var id = macro_area_suggestions.indexOf(ui.item)+1;
          id_suggestion = id;
          var $container = $($(targetElement).siblings(".checkboxList")[0]);
          $container.children().each(function( index ) {
            if(!$(this).hasClass('hidden')){
              $(this).toggleClass('hidden');
              $(this).children().each(function(index){
                var $input = $($(this).find('input')[0]);
                if ($input.is(':checked')){
                  $input.prop('checked', false);
                }
                if ($input.prop('type') == "text"){
                  $input.val("");
                }
              });
            }
          });
          var $element = $container.find("#subareas-"+id);
          if($element.hasClass('hidden')){
            $element.toggleClass('hidden');
          }
          // interação macro_area_outros
          var macro_area = ui.item.value;
          var pai = $(this).closest(".form-group");
          var id = pai.find(".autocomplete").attr("id");
          var $inputContainer = null;
          if(id === "macro_area_1"){
            $inputContainer = pai.siblings().find("#macro_area_1_outros").closest(".form-group");
          } else {
            $inputContainer = pai.siblings().find("#macro_area_2_outros").closest(".form-group");
          }

          if (macro_area === "Outros"){
            $inputContainer.toggleClass('hidden');
            if($inputContainer.hasClass('hidden')){
              var $input = $inputContainer.find('input');
              $input.val("");
            }
          } else {
            if(!$inputContainer.hasClass('hidden')){
              $inputContainer.toggleClass('hidden');
              var $input = $inputContainer.find('input');
              $input.val("");
            }
          }

        }
      });

      $(".autocomplete").on("click", function(){
        $(this).autocomplete( "search", "" );
      });

      $(".autocomplete").keyup(function(){
        if(($(this).val() === "") && (id_suggestion != 0)){
          var id = id_suggestion;
          var $container = $(this).parent();
          var $element = $container.find("#subareas-"+id);
          if(!$element.hasClass('hidden')){
            $element.toggleClass('hidden');
          }
        }
      });

      //interações seção areas de atuacao
      $(".checkboxList :checkbox").change(function() {

        if($(this).closest("label").text() === "Outros"){
          var pai = $(this).closest(".form-group");
          var id = pai.find(".autocomplete").attr("id");
          var $inputContainer = null;
          if(id === "macro_area_1"){
            $inputContainer = pai.siblings().find("#sub_area_1_outros").closest(".form-group");
          } else {
            $inputContainer = pai.siblings().find("#sub_area_2_outros").closest(".form-group");
          }
          $inputContainer.toggleClass('hidden');
          if($inputContainer.hasClass('hidden')){
            var $input = $inputContainer.find('input');
            $input.val("");
          }
        }
      });
    }

    function ativarDescricao(data, util){
      var formItens = descricao.montarDescricao(data, util, dadosForm.descricao(descricao));
      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:{priority: headerPriority, text: 'Descrição da OSC'}, dados:formItens}
        ), document.getElementById("descricao")
      );
      //Salvar
      $("#descricao").append('<button id="salvar" class="btn-primary btn">Salvar</button>');
      var newJson = {};
      $("#descricao").find("#salvar").click(function(){
        $("#descricao .form-control").each(function(){
          newJson[$(this).attr("id")] = $(this).val();
        });
      });
    }

    function ativarTitulosCertificacoes(data, util, dadosForm){
      var dados_form = dadosForm.titulosCertificacoes(data, util);
      var formItens = titulosCertificacoes.montarTitulosCertificacoes(data, util, dados_form);
      var autoElement = React.createElement('div', { id: 'auto' });
      var manualLabel = React.createElement('label', null, 'Utilidade pública');
      var manualElement = React.createElement('div', { id: 'manual' });

      var root = React.createElement('div', { id: 'root' }, autoElement, manualLabel, manualElement);
      ReactDOM.render(root, document.getElementById('certificacoes'));
      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:{priority: headerPriority, text: 'Títulos e Certificações'}, dados:formItens[0]}
        ), document.getElementById("auto")
      );

      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:null, dados:formItens[1]}
        ), document.getElementById("manual")
      );

      carregarInteracoesTitCertif();
    }

    function carregarInteracoesTitCertif(){
      //interações seção títulos e certificações
      $("#certificacoes :checkbox").change(function() {
        var $inputContainer = $(this).closest(".form-group").siblings().find("#utilidade_publica_"+this.value).closest(".form-group");
        $inputContainer.toggleClass('hidden');
        if($inputContainer.hasClass('hidden')){
          var $input = $inputContainer.find('input');
          $input.val("");
        }
      });

      $("#manual").find("input:text").each(function(){
        if ($(this).attr("placeholder") !== "Não constam informações nas bases de dados do Mapa."){
          var utilidade_publica_id = $(this).attr("id").replace("data_validade_", "");
          $("#manual").find("input:checkbox").each(function(){
            if($(this).val() === utilidade_publica_id){
              $(this).prop('checked', true);
            }
          });
          $(this).parents(".hidden").toggleClass('hidden');
        }
      });
    }

    function ativarTrabalhoGovernanca(data, util, dadosForm){
      var formItens = relacoesGovernanca.montarRelacoesGovernanca(data, util, dadosForm);
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
      addItem('dirigentes');
      //conselho fiscal
      FormItemButtons = React.createFactory(FormItemButtons);
      ReactDOM.render(
        FormItemButtons(
          {header:null, dados:conselho_fiscal}
        ), document.getElementById("conselho_fiscal")
      );
      addItem('conselho_fiscal');
      //trabalhadores
      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:null, dados:trabalhadores}
        ), document.getElementById("trabalhadores")
      );
    }

    function ativarEspacosPart(data, util, dadosForm){
      var tx_sem_participacao_social = "Não há registros de participação social";
      var participacao_social_form = dadosForm.partSocial();
      var items = participacao_social_form.items;
      Section = React.createFactory(Section);
      ReactDOM.render(
        Section(
          {dados:items}
        ), document.getElementById(items[0].target)
      );

      var arrayObj = espacosPartSocial.montarEspacosParticipacaoSocial(data, util, participacao_social_form);
      var formItens = arrayObj[0];



      Agrupador = React.createFactory(AgrupadorConselhos);
      ReactDOM.render(
        Agrupador(
          {header:null, dados:formItens}
        ), document.getElementById("conselhos")
      );
      addItem('conselhos');

      var formItens = arrayObj[1];
      Agrupador = React.createFactory(AgrupadorConferencia);
      ReactDOM.render(
        Agrupador(
          {header:null, dados:formItens}
        ), document.getElementById("conferencias")
      );
      addItem('conferencias');

      var formItens = arrayObj[2];
      FormItemButtons = React.createFactory(FormItemButtons);
      ReactDOM.render(
        FormItemButtons(
          {header:null, dados:formItens}
        ), document.getElementById("outros_part")
      );
      addItem('outros_part');
    }

    function ativarProjetos(data, util){
      var projetosArray = projeto.montarProjetos(data, util);

      var headerProjeto = projetosArray[0];
      Section = React.createFactory(Section);
      ReactDOM.render(
        Section(
          {dados:[headerProjeto]}
        ), document.getElementById("projetos")
      );
      $( "#lista_projetos" ).append( '<table id="table_lista_projetos"></table>' );

      var newData = projetosArray[1];
      var table_lista_projetos = montaTabelaListaProjetos(newData);
      Section = React.createFactory(Section);
      ReactDOM.render(
        Section(
          {dados:[headerProjeto]}
        ), document.getElementById("projetos")
      );
      $( "#lista_projetos" ).append( '<table id="table_lista_projetos"></table>' );

      var newData = projetosArray[2];
      var table_lista_projetos = montaTabelaListaProjetos(newData);
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
          var result = projeto.carregaProjeto(id_projeto, dadosForm, rotas, util);

          agrupamento(result, id_projeto);
          metasObjetivos(data, id_projeto);
          verificarContraste();
        } else {
          var $divDadosProjeto = $(projetos[0]);
          $divDadosProjeto.toggleClass("hidden");
        }
      });
    }

    function montaTabelaListaProjetos(newData){
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

      return table_lista_projetos;
    }

    function agrupamento(agrupadores, id){
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
    }

    function metasObjetivos(project, id){
      //metas e objetivos
      var objetivo_meta = util.validateObject(project.objetivo_meta) ? project.objetivo_meta : "";
      var objetivo = util.validateObject(objetivo_meta.tx_nome_objetivo_projeto) ? objetivo_meta.tx_nome_objetivo_projeto : -1;
      var cd_objetivo = util.validateObject(objetivo_meta.cd_objetivo_projeto) ? objetivo_meta.cd_objetivo_projeto : -1;
      var meta = util.validateObject(objetivo_meta.tx_nome_meta_projeto) ? objetivo_meta.tx_nome_meta_projeto : -1;
      var cd_meta = util.validateObject(objetivo_meta.cd_meta_projeto) ? objetivo_meta.cd_meta_projeto : -1;

      var $divProjeto = $('#projeto-'+id);
      $divProjeto.append('<div class="col-md-12" id="objetivos-metas"</div>');

      $divObjetivosMetasProjeto = $divProjeto.find("#objetivos-metas");
      $divObjetivosMetasProjeto.append('<div id="objetivos" class="objetivos"></div>');

      $divObjetivosProjeto = $divObjetivosMetasProjeto.find('#objetivos');
      $divObjetivosProjeto.append('<div class="header">Objetivos do Desenvolvimento Sustentável - ODS - <a href=https://nacoesunidas.org/pos2015 target=_blank>.</a> </div>');
      $divObjetivosProjeto.append('<div class="form-group"><div id="objetivos"><select class="form-control"></select></div></div>');
      $divObjetivosMetasProjeto.append('<div id="metas-'+cd_objetivo+'" class="metas"></div>');

      var $divMetasProjeto = $divObjetivosMetasProjeto.find("#metas-"+cd_objetivo);
      $divMetasProjeto.append('<div class="header" title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido</div>');
      $divMetasProjeto.append('<ol id="selectable-'+cd_objetivo +'" class="selectable"></ol>');

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

      if(cd_objetivo){
        loadMetas(cd_objetivo);
      }
    }

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

    function carregaMetas($divObjetivosMetasProjeto){
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

    function clique(){
      $(".ajuda").on("click", function(){
        abrirModalAjuda($(this).attr("data"));
      });
    }

    // Salvar
    $("#salvar").click(function(){
      //Dados Gerais
      //$("#dados_gerais").append('<button id="salvar" class="btn-primary btn">Salvar</button>');
      old_dados_gerais = util.validateObject(old_json.dados_gerais) ? old_json.dados_gerais : {};
      var newJson = old_dados_gerais;
      $("#dados_gerais :input").each(function(){
        var key = $(this).attr("id");
        var value = $(this).val();
        newJson[key] = value;
      });
      newJson["headers"] = authHeader;
      newJson["id_osc"] = idOsc;
      //console.log(newJson);

      util.carregaAjax(rotas.DadosGerais(idOsc), 'POST', newJson);
      //console.log(newJson);

      //Áreas de atuação
      //console.log(old_json);
      var newJson = {};
      newJson.area_atuacao = [];
      var suggestions = dadosForm.getSuggestions();
      $("#areas_de_atuacao .autocomplete").each(function(){
        var cd_area = 0;
        for (var i = 0; i < suggestions.length; i++) {
          if($(this).val() === suggestions[i].tx_nome_area_atuacao){
            cd_area = suggestions[i].cd_area_atuacao;
          }
        }

        var macro_area_id = $(this).attr("id").substring(11);
        var idMacroAreaOutros = $("#macro_area_"+macro_area_id+"_outros").val();

        obj_area_atuacao = {
          "cd_area_atuacao": cd_area,
          "tx_nome_area_atuacao": ($(this).val() === "Outros") ? idMacroAreaOutros : $(this).val(),
          "ft_area_atuacao": "Usuário",
          "id_area_atuacao": null
        }

        var subareas = [];
        $(this).siblings(".checkboxList").children(":not(.hidden)").each(function(index){
          $(this).find("input:checked").each(function(){
            var labelOutros = $(this).closest("label").text();
            var isLabelOutros = ($(this).closest("label").text() === "Outros");

            subareas.push({
              "tx_nome_subarea_atuacao": isLabelOutros ? $("#sub_area_"+macro_area_id+"_outros").val() : labelOutros,
              "cd_subarea_atuacao": $(this).val(),
              "id_area_atuacao": null
            });
          });

          if(subareas){
            obj_area_atuacao.subareas = subareas;
          }
          newJson.area_atuacao.push(obj_area_atuacao);
        });

        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        //console.log(newJson);

        util.carregaAjax(rotas.AtualizarAreaAtuacao(idOsc), 'POST', newJson);

        //Descricao
        var newJson = {};
        $("#descricao .form-control").each(function(){
          newJson[$(this).attr("id")] = $(this).val();
        });
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        //console.log(newJson);

        util.carregaAjax(rotas.Descricao(idOsc), 'POST', newJson);

        //Certificacoes
        var newJson = {};
        newJson.certificados = [];
        $("#certificacoes .form-control").each(function(){
          var cd_certificado = 0;
          if($(this).attr("id").substring(18) === "estadual"){
            cd_certificado = 6;
          }
          if($(this).attr("id").substring(18) === "municipal"){
            cd_certificado = 7;
          }
          var item = {};
          item[$(this).attr("id")] = {};
          item[$(this).attr("id")].dt_fim_certificado = $(this).val();
          item[$(this).attr("id")].dt_inicio_certificado = null;
          item[$(this).attr("id")].ft_certificado = authHeader.User;
          item[$(this).attr("id")].ft_inicio_certificado = authHeader.User;
          item[$(this).attr("id")].ft_fim_certificado = authHeader.User;
          item[$(this).attr("id")].cd_certificado = cd_certificado;
          newJson.certificados.push(item);
        });
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        //console.log(newJson);

        util.carregaAjax(rotas.Certificado(idOsc), 'POST', newJson);

        // Projetos
        var newJson = [];
        var idProjeto = "";
        $(".projeto").each(function(){
          var str = $(this).attr("id");
          idProjeto = str.substring(str.indexOf("-") + 1);
          $(this).find(".form-group").each(function(){
            if($(this).children().length <= 1){
              $child = $(this).children(':first');
              var key = $(this).attr("id");
              var value = $child.find(".form-control").val();
              if(key)
              newJson[key] = value;
            } else {
              var children = $(this).children();
              var key = $(this).attr("id");
              newJson[key] = [];
              for (var i = 0; i < children.length; i++) {
                var $child = $(children[i]);
                newJson[key].push($child.find(":input").val());
              }
            }
          });
          newJson["meta"] = $(".metas :visible").find(".ui-selected").text();
          newJson["headers"] = authHeader;
          newJson["id_osc"] = idOsc;
          //console.log(newJson);
          util.carregaAjax(rotas.ProjectByID(idProjeto), 'POST', newJson);
        });
      });
    });
  });

  function addItem(idDiv){
    $('#'+idDiv+' button').on('click', function(){
      if($(this).hasClass('btn-primary')){
        var $cloneDiv = ($(this).parent());
        var $input = $cloneDiv.find('input[type=text]');
        var values = new Array();
        $input.parent().removeClass('has-error');
        $('.alert-danger').remove();
        $input.each(function(i){
          if($(this).val() !== "" ){
            values[i] = true;
          }
          else {
            values[i] = false;
            $(this).parent().addClass('has-error').after('<span class = "alert-danger">É necessário que os campos estejam preenchidos.</span>');
          }
        });
        if(values.every(isTrue)){
          $input.parent().removeClass('has-error');
          $input.after().find('span').remove();
          var $clone = $cloneDiv.find('button').text('Remover').attr('class', 'btn-danger btn');
          var $cloneChildren = $('#'+idDiv).children();
          $cloneDiv.clone().appendTo($cloneChildren);
          $cloneDiv.parent().children().last().find('button').text('Adicionar').attr('class', 'btn-primary btn').click(addItem(idDiv));
          $cloneDiv.parent().children().last().find('input[type=text]').val('');
          $(".date").datepicker({ dateFormat: 'dd-mm-yy' });
          $(".ano").datepicker({ dateFormat: 'yy' });
        }
      }
      else {
        $(this).parent().remove();
      }
    });
  }
});
