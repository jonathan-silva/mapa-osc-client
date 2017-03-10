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

  $(".scroll").click(function(event){
      event.preventDefault();
      $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
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
  var fonteRecurso = new FonteRecurso();
  var old_json = null;
  var newJson = {};

  require(['componenteFormItem', 'componenteCabecalho', 'componenteCheckbox', 'componenteSection',
  'componenteAgrupador', 'componenteFormItemButtons','componenteAgrupadorInputProjeto','componenteAgrupadorConferencia','componenteAgrupadorConselhos','jquery'],
  function(FormItem, Cabecalho, Checkbox, Section, Agrupador, FormItemButtons, AgrupadorInputProjeto, AgrupadorConferencia, AgrupadorConselhos){

    var valoresURL = window.location.href.split('#')[1]!==undefined ? window.location.href.split('#/')[1].split('=') : null;
    var urlRota = "";
    var idOsc = "";

    if(valoresURL !== null){
      idOsc = valoresURL[0];
      verificarPermissao(idOsc);
      addBotaoVisualizar(idOsc);
      addLinkVoltar(idOsc);
      urlRota = rotas.OSCByID_no_project(idOsc);
    }

    var user = window.localStorage.getItem('User');
    var auth  = window.localStorage.getItem('Authorization');
    var authHeader = {
      "User": user,
      "Authorization": auth
    }

    var divObjetivosMetasProjeto='';
    var $divMetasProjeto='';

    /*$.ajax({
      url: rotas.Conselho(),
      type: 'GET',
      dataType: 'json',
      conselhos:{flag: "", rota: urlRota},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(conselhos){return conselhos}*/

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
        //Cabeçalho
        cabecalhoObject.montarCabecalho(data, util, React, ReactDOM, Cabecalho);
        old_json = data;
        // Dados Gerais
        dadosGerais.montarDadosGerais(data, util, dadosForm, React, ReactDOM, FormItem);
        //Áreas de atuação
        var txtAtvEconomica = util.validateObject(data.dados_gerais.tx_nome_atividade_economica_osc, "") ;
        var fonteAtvEconomica = util.validateObject(data.dados_gerais.ft_atividade_economica_osc, "");
        var areas_atuacao_sugestoes = areasAtuacao.montarAreasDeAtuacao(data, util, dadosForm, rotas, txtAtvEconomica, fonteAtvEconomica, React, ReactDOM, FormItem);
        //Descrição
        descricao.montarDescricao(data, util, dadosForm, React, ReactDOM, FormItem);
        //Títulos e certificações
        var dados_form = dadosForm.titulosCertificacoes(data, util);
        titulosCertificacoes.montarTitulosCertificacoes(data, util, dados_form, React, ReactDOM, FormItem);
        //Relações de trabalho e governança
        var formItens = relacoesGovernanca.montarRelacoesGovernanca(data, util, dadosForm);
        relacoesGovernanca.ativarTrabalhoGovernanca(dadosForm, formItens, React, ReactDOM, Section, Agrupador, FormItem, FormItemButtons, util);
        // Espaços participacao social
        var arrayObj = espacosPartSocial.iniciarEspacosPartSoc(data, util, dadosForm, Section, React, ReactDOM, rotas.Conselho(),rotas.Conferencia(),rotas.FormaParticipacao());
        espacosPartSocial.ativarEspacosPart(arrayObj, util, React, ReactDOM, Agrupador, AgrupadorConselhos, AgrupadorConferencia, FormItemButtons);
        //Projetos
        ativarProjetos(data, util, dadosForm, areas_atuacao_sugestoes);
        //Fonte de recurso
        fonteRecurso.montarFontedeRecursos(data, util, rotas, dadosForm, React, ReactDOM, Section, FormItem);
        //Acessibilidade
        verificarContraste();
        //função para contornar a não renderização de eventos (onclick, onmouseover...) pelo react
        clique();
        //Datas
        $(".date").datepicker({ dateFormat: 'dd-mm-yy',changeYear: true });
        //Seleção anual como opção do date picker
        $(function() {
            $('.ano').datepicker({
                changeYear: true,
                showButtonPanel: true,
                dateFormat: 'yy',
                yearRange: '1950:2050',
                onClose: function(dateText, inst) {
                    var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                    $(this).datepicker('setDate', new Date(year, 1));
                }
            });
          	$(".ano").focus(function () {
                $(".ui-datepicker-calendar").hide();
                $('.ui-datepicker-month').hide();
                $('.ui-datepicker-prev').hide();
                $('.ui-datepicker-next').hide();
            });
        });

        function readURL(input) {
          if (input.files && input.files[0] && input.files[0].type.match('image.*') && input.files[0].size < 1000000) {
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

        addBotaoimagem();
        $('.custom-file-upload').on("change", function(){
          $('.alert').addClass('hide');
          $('input[type=file]').each(function(index){
            if ($('input[type=file]').eq(index).val() != ""){
              readURL(this);
            }
          });
        });

        $("#btnRemoverLogo").click(function(){
          $("#imagemLogo").attr('src',"img/camera.jpg");
          $('input[type=file]').eq(0).val("");
        });

      }
    });

    function verificarPermissao(id){
    	var osc  = JSON.parse(window.localStorage.getItem('Osc'));
    	if(osc != "undefined" && osc !== null){
    		for (var i = 0; i < osc.length; i++) {
    			if (osc[i] == id) {
         		return true;
       		}
    		}
    	}
      window.location.href = "visualizar-osc.html#/"+id;
    	return false;
    }
    function addBotaoVisualizar(id){
        $(".btnVisualizar").append('<a id="btnVisualizar" type="button" title="Clique para Visualizar"  class="btn btn-info btn-sm"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Visualizar OSC</a>');
		    $("#btnVisualizar").attr("href","visualizar-osc.html#/"+id);
    }

    function addBotaoimagem(){
        $("#btnInserirImg").append('<label class="custom-file-upload btn btn-info" title="Clique para Inserir o Logo da OSC"><input id="inserirLogo" type="file" accept="image/x-png,image/gif,image/jpeg" /><i class="fa fa-cloud-upload"></i>Inserir Logo</label>');
        $("#btnRemoverImg").append('<a class="btn btn-danger btn-sm" id="btnRemoverLogo" type="button" title="Clique para Remover o Logo da OSC" ><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Remover Logo</a>');
    }

    function addLinkVoltar(id){
        $("#voltaEditar").attr("href","editar-osc.html#/"+id);
		    $("#voltaVisualizar").attr("href","visualizar-osc.html#/"+id);
    }

    function ativarProjetos(data, util, dadosForm, areas_atuacao_sugestoes){
      var projetosArray = projeto.montarProjetos(data, util);
      var headerProjeto = projetosArray[0];
      Section = React.createFactory(Section);
      ReactDOM.render(
        Section(
          {dados:[headerProjeto]}
        ), document.getElementById("projetos")
      );
      $( "#lista_projetos" ).append( '<table id="table_lista_projetos" class="table-striped"></table>' );

      var newData = projetosArray[1];
      var table_lista_projetos = montaTabelaListaProjetos(newData);
      Section = React.createFactory(Section);
      ReactDOM.render(
        Section(
          {dados:[headerProjeto]}
        ), document.getElementById("projetos")
      );
      $( "#lista_projetos" ).append( '<table id="table_lista_projetos" class="table-striped"></table>' );

      var newData = projetosArray[2];
      var table_lista_projetos = montaTabelaListaProjetos(newData);
      $('#table_lista_projetos').append('<span class="input-group-btn">'+
      '<button id="add_projeto" class="btn-primary btn">Adicionar Projeto</button>'+
      '</span>');
      var proj_id_generator = 0;
      $('#add_projeto').click(function(){
        table_lista_projetos.row.add([
          "-1",
          "Novo Projeto"
        ]).draw();
        proj_id_generator = 0;
        verificarContraste();
      });
      $("#table_lista_projetos").on('click', 'tr', function(){
        var novo = false;
        var id_projeto = table_lista_projetos.row(this).data()[0];
        var projetos = $(this).next(".projeto");
        if(id_projeto == "-1"){
          novo = true;
          id_projeto = Number(id_projeto) - proj_id_generator;
          proj_id_generator += 1;
        }
        if(projetos.length < 1){
          var res = projeto.carregaProjeto(id_projeto, dadosForm, rotas, util, novo);
          var result = res.agrupadores;
          var proj = res.projeto;
          console.log(res);
          var id_projeto_externo = proj ? proj.projeto[0].tx_identificador_projeto_externo : null;

          var divId = "projeto-" + id_projeto;
          $(this).after('<div id="' + divId + '" class="projeto col-md-12">');

          agrupamento(result, id_projeto);
          montarAreasDeAtuacaoProjetos(areas_atuacao_sugestoes);

          $($('#'+divId).find("div")[0]).attr("id", id_projeto_externo);
          if(proj){
            metasObjetivos(proj.projeto[0], id_projeto);
          } else {
            metasObjetivos({}, id_projeto);
          }
          verificarContraste();
        } else {
          console.log(projetos);
          var $divDadosProjeto = $(projetos[0]);
          $divDadosProjeto.toggleClass("hidden");
        }
      });

      $("#table_lista_projetos_paginate").click(function(e){
        verificarContraste();
      });
    }

    function montarAreasDeAtuacaoProjetos(sugestoes){
      var sugestoesAreas = sugestoes[0];
      var sugestoesSubAreas = sugestoes[1];
      console.log(sugestoesAreas);
      console.log(sugestoesSubAreas);
      $divAreaAtuacaoProjeto = $(".projeto #area_atuacao input");
      // $('.projeto').append('<input class="form-control autocomplete"> </input>');
      // $('.projeto').append('<div class="checkboxList"> </div>');
      // $('.projeto').append('<div class="col-md-3"> <div class="header">Áreas de atuação do projeto, atividade ou programa<div id="areas_de_atuacao_projeto"> </div>');
      var areaAtuacao = new AreaAtuacao();
      // var headerPriority = '2';
      // var obj = areaAtuacao.loadSuggestions(sugestoesAreas, null, util, dadosForm);
      // console.log(obj);
      // var formItens = obj.formItens;
      // FormItem = React.createFactory(FormItem);
      // ReactDOM.render(
      //   FormItem(
      //     {header:{priority: headerPriority, text: 'Áreas e Subáreas de Atuação da OSC'}, dados:formItens}
      //   ), document.getElementById("areas_de_atuacao_projeto")
      // );
      var id_suggestion = 0;
      $divAreaAtuacaoProjeto.addClass('autocomplete');
      $divAreaAtuacaoProjeto.append('<div class="checkboxList"></div>')
      for (var i = 0; i < sugestoesAreas.length; i++) {
        var sugestaoArea = sugestoesAreas[i];
        $divAreaAtuacaoProjeto.find('.checkboxList').append('<div>')
        for (var j = 0; j < sugestoesSubAreas.length; j++) {
          var sugestaoSubArea = sugestoesSubAreas[j];
          if (sugestaoArea.cd_area_atuacao === sugestaoSubArea.cd_area_atuacao) {

          }
        }

      }


      sugestoesAreas = $.map(sugestoesAreas, function(item) {
        var newItem = {
          label: item.tx_nome_area_atuacao,
          value: item.tx_nome_area_atuacao,
          id: item.cd_area_atuacao
        };

        return newItem;
      });

      $(".projeto .autocomplete").autocomplete({
        minLength: 0,
        create: function(event, ui) {
          var value = $(this).attr("placeholder");
          for (var i = 0; i < sugestoesAreas.length; i++) {
            var suggestion = sugestoesAreas[i].value;

            if (suggestion === value){
              var $container = $(this).siblings(".checkboxList");
              var $element = $container.find("#subareas-"+i);
              if($element.hasClass('hidden')){
                $element.toggleClass('hidden');
              }
              for (var j = 0; j < sugestoesAreas.length; j++) {
                if((value === sugestoesAreas[j].tx_nome_area_atuacao)){
                  var subarea_exists = false;
                  $element.find("label").each(function(){
                    if(sugestoesAreas[j].tx_nome_subarea_atuacao === $(this).text().trim()){
                      subarea_exists = $(this);
                    }
                  });
                  if(subarea_exists){
                    subarea_exists.find("input").prop('checked', true);
                  } else {
                    $element.find("#outros").val(sugestoesAreas[j].tx_nome_subarea_atuacao);
                  }
                }
              }
            }
          }
        },
        source: sugestoesAreas,
        change: function( event, ui ) {
        },
        select: function(event, ui){
          if(event.target.id == 'macro_area_1'){
            $('#sub_area_1_outros').parent().parent().addClass('hidden');
            $('#sub_area_1_outros').val('');
            $(this).parent().find(':checkbox').prop("checked", false);
          }
          else{
            $('#sub_area_2_outros').parent().parent().addClass('hidden');
            $('#sub_area_2_outros').val('');
            $(this).parent().find(':checkbox').prop("checked", false);
          }
          var targetElement = event.target;
          var id = sugestoesAreas.indexOf(ui.item)+1;
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

      $(".date").datepicker({ dateFormat: 'dd-mm-yy',changeYear: true });
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
      var objetivo_meta = util.validateObject(project.objetivo_meta, "");
      var objetivo = util.validateObject(objetivo_meta.tx_nome_objetivo_projeto, -1);
      var cd_objetivo = util.validateObject(objetivo_meta.cd_objetivo_projeto, -1);
      var meta = util.validateObject(objetivo_meta.tx_nome_meta_projeto, -1);
      var cd_meta = util.validateObject(objetivo_meta.cd_meta_projeto, -1);

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
          montarObjetivos(data, cd_objetivo);
        }
      });

      var $divProjeto = $('#projeto-'+id);
      $divProjeto.append('<div class="col-md-12" id="objetivos-metas"</div>');

      $divObjetivosMetasProjeto = $divProjeto.find("#objetivos-metas");
      $divObjetivosMetasProjeto.append('<div id="objetivos" class="objetivos"></div>');

      $divObjetivosProjeto = $divObjetivosMetasProjeto.find('#objetivos');
      $divObjetivosProjeto.append('<div class="header">Objetivos do Desenvolvimento Sustentável - ODS - <a href=https://nacoesunidas.org/pos2015 target=_blank><img class="imgLinkExterno" src="img/site-ext.gif" width="17" height="11" alt="Site Externo." title="Site Externo." /></a> </div>');
      $divObjetivosProjeto.append('<div class="form-group"><div id="objetivos"><select class="form-control"></select></div></div>');
      $divObjetivosMetasProjeto.append('<div id="metas-'+id+'" class="metas"></div>');

      $divMetasProjeto = $divObjetivosMetasProjeto.find("#metas-"+id);
      $divMetasProjeto.append('<br><div class="header" title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido</div><br>');
      $divMetasProjeto.append('<ol id="selectable-'+cd_objetivo +'" class="selectable"></ol><br>');
      //console.log($divMetasProjeto);

      if(cd_objetivo){
        loadMetas(cd_objetivo, cd_meta);
      }

      carregaEventoMetas();
    }

    function montarObjetivos(json, cd_objetivo){
      var options = json;
      var $selectObjetivos = $divObjetivosProjeto.find("select");
      $selectObjetivos.append('<option value=-1 selected id="' + 0 + '">' + "Selecione uma opção..." + '</option>');
      for (var i = 0; i < options.length; i++) {
        if(options[i].cd_objetivo_projeto === cd_objetivo){
          $selectObjetivos.append('<option selected id="' + options[i].cd_objetivo_projeto + '">' + options[i].tx_nome_objetivo_projeto + '</option>');
        } else {
          $selectObjetivos.append('<option id="' + options[i].cd_objetivo_projeto + '">' + options[i].tx_nome_objetivo_projeto + '</option>');
        }
      }
    }

    function loadMetas(cd_objetivo, cd_meta){
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
          montarMetas(data, cd_objetivo, cd_meta);
        }
      });
    }

    function carregaEventoMetas(){
      $('.objetivos').find('select').on('change', function(){
      	cd_objetivo = $(this).children(":selected").attr("id")
        $divObjetivosMetasProjeto = $(this).parents("#objetivos-metas");
      	$divObjetivosMetasProjeto.find(".metas").each(function(){
      		if(!$(this).hasClass('hidden')){
      			$(this).toggleClass('hidden');
      		}
      	});
        console.log($divObjetivosMetasProjeto);
        $divObjetivosMetasProjeto.find(".metas").remove();
      	$divObjetivosMetasProjeto.append('<div id="metas-'+cd_objetivo+'" class="metas"></div>');
      	$('#metas-'+cd_objetivo).append('<br><div class="header" title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido</div><br>');
      	$('#metas-'+cd_objetivo).append('<ol id="selectable-'+cd_objetivo +'" class="selectable"></ol><br>');
      	if($('#metas-'+cd_objetivo).hasClass('hidden')){
      		$('#metas-'+cd_objetivo).toggleClass('hidden');
      	}
      	if(parseInt(cd_objetivo) !== 0){
      		loadMetas(cd_objetivo, null);
      	}
              verificarContraste();
      });
    }

    function montarMetas(data, cd_objetivo, cd_meta){
      if (util.validateObject(data, false)){
        var checkboxItems = [];
        function CheckboxItem(id, label, value, type, checked){
          this.id = id;
          this.label = label;
          this.value = value;
          this.type = type;
          this.checked = checked;
        }

        items = data;
        for (var i=0; i<items.length; i++){
          var checkboxItem = null;
          if(items[i].cd_meta_projeto === cd_meta){
            checkboxItem = new CheckboxItem(items[i].cd_meta_projeto, items[i].tx_nome_meta_projeto, items[i].tx_nome_meta_projeto, "checkbox", true);
            checkboxItems.push(checkboxItem);
          } else {
            checkboxItem = new CheckboxItem(items[i].cd_meta_projeto, items[i].tx_nome_meta_projeto, items[i].tx_nome_meta_projeto, "checkbox", false);
            checkboxItems.push(checkboxItem);
          }
        }
        Checkbox = React.createFactory(Checkbox);
        ReactDOM.render(
          Checkbox(
            {dados:checkboxItems}
          ), document.getElementById("selectable-"+cd_objetivo)
        );

        /*var $selectMetas = $divMetasProjeto.find("select"); //console.log($selectMetas);

        items = data;
        for (var i=0; i<items.length; i++){
          new CheckboxItems();
          checkboxItems.push(CheckboxItems(items[i].cd_meta_projeto, items[i].tx_nome_meta_projeto, items[i].tx_nome_meta_projeto, "checkbox", null));
        /*}
        for (var i=0; i<items.length; i++){* /
          if(items[i].cd_meta_projeto === cd_meta) {
          console.log(items[i].cd_meta_projeto);

          //checkboxItems.checked(CheckboxItems(items[i].cd_meta_projeto, items[i].tx_nome_meta_projeto, items[i].tx_nome_meta_projeto, "checkbox", null));
        } /*else {
          $selectMetas.append('<ol id="selectable-'+options[i].cd_meta_projeto +'" class="selectable"></ol>');
        }* /
      }
        Checkbox = React.createFactory(Checkbox);
        ReactDOM.render(
          Checkbox(
            {dados:checkboxItems}
          ), document.getElementById("selectable-"+cd_objetivo)
        );*/
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

        $divObjetivosMetasProjeto.append('<div id="metas-'+cd_objetivo+'" class="metas"></div>');
        $('#metas-'+cd_objetivo).append('<div class="header" title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido</div>');
        $('#metas-'+cd_objetivo).append('<ol id="selectable-'+cd_objetivo +'" class="selectable"></ol>');
        if($('#metas-'+cd_objetivo).hasClass('hidden')){
          $('#metas-'+cd_objetivo).toggleClass('hidden');
        }
        if(parseInt(cd_objetivo) !== 0){
          loadMetas(cd_objetivo, null);
        }
      });
    }

    function clique(){
      var jsonModalAjuda = dadosForm.jsonModalAjuda();
      $(".ajuda").on("click", function(){
        util.abrirModalAjuda($(this).attr("data"), jsonModalAjuda);
      });
    }

    // Cancelar
    $("#cancelar").click(function(){
      window.location.href='/visualizar-osc.html#/'+idOsc;
    });

    // Salvar
    $("#salvar").click(function(){
      var success="";//guarda mensagens dos saves das secoes da pagina
      //Dados Gerais
      var newJson = util.validateObject(old_json.dados_gerais, {});
      $("#dados_gerais :input").each(function(){
        var key = $(this).attr("id");
        var value = $(this).val();
        if(key === "tx_nome_situacao_imovel_osc"){
          newJson["cd_situacao_imovel_osc"] = null;
          if(value === "Próprio"){
            newJson["cd_situacao_imovel_osc"] = 1
          }
          if(value === "Alugado"){
            newJson["cd_situacao_imovel_osc"] = 2
          }
          if(value === "Cedido"){
            newJson["cd_situacao_imovel_osc"] = 3
          }
          if(value === "Comodato"){
            newJson["cd_situacao_imovel_osc"] = 4
          }
        } else {
          newJson[key] = value;
        }
      });
      newJson["headers"] = authHeader;
      newJson["id_osc"] = idOsc;

      var imgSrc = $("#imagemLogo").attr("src");
      if(imgSrc == "img/camera.jpg" || imgSrc == null || imgSrc == undefined){
        newJson["im_logo"] = null;
      }
      else{
          newJson["im_logo"] = imgSrc;
      }
      //console.log(newJson);
      success = util.carregaAjax(rotas.DadosGerais(idOsc), 'POST', newJson);

      //Áreas de atuação
      // if(util.validateObject(old_json.area_atuacao)){
      //   newJson = old_json.area_atuacao;
      // } else{
      //   newJson={};
      //   newJson.area_atuacao = [];
      // }
      var newJson = util.validateObject(old_json.area_atuacao, {});

      newJson["headers"] = authHeader;
      newJson["id_osc"] = idOsc;
      newJson["area_atuacao"] = [];
      var suggestions = dadosForm.getSuggestions();
      $("#areas_de_atuacao .autocomplete").each(function(){
        var cd_area = 0;
        for (var i = 0; i < suggestions.length; i++) {
          if($(this).val().trim().toLowerCase() === suggestions[i].tx_nome_area_atuacao.trim().toLowerCase()){
            cd_area = suggestions[i].cd_area_atuacao;
          }
        }

        var macro_area_id = $(this).attr("id").substring(11);
        var idMacroAreaOutros = $("#macro_area_"+macro_area_id+"_outros").val();

        obj_area_atuacao = {
          "cd_area_atuacao": cd_area.toString(),
          "tx_nome_area_atuacao_outra": ($(this).val() === "Outros") ? idMacroAreaOutros : null
        }

        var subareas = [];
        $(this).siblings(".checkboxList").children(":not(.hidden)").each(function(index){
          $(this).find("input:checked").each(function(){
            var labelOutros = $(this).closest("label").text();
            var isLabelOutros = ($(this).closest("label").text() === "Outros");
            subareas.push({
                "tx_nome_subarea_atuacao_outra": isLabelOutros ? $("#sub_area_"+macro_area_id+"_outros").val() : null,
                "cd_subarea_atuacao": $(this).val()
                //"ft_area_atuacao": "Representante"
              });

          });

          if(subareas.length <= 0){
            subareas = null;
          }
          obj_area_atuacao.subarea_atuacao = subareas;
          newJson.area_atuacao.push(obj_area_atuacao);
        });
        if(newJson.area_atuacao.length == 0){
          newJson.area_atuacao.push({
            "cd_area_atuacao": 0,
            "tx_nome_area_atuacao_outra": null,
            "subarea_atuacao": null
          });
        }
      });
        success = util.carregaAjax(rotas.AtualizarAreaAtuacao(idOsc), 'POST', newJson);
        console.log(success);

        //Descricao
        var newJson = util.validateObject(old_json.descricao, {});
        $("#descricao .form-control").each(function(){
          newJson[$(this).attr("id")] = $(this).val();
        });
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;

        success = util.carregaAjax(rotas.Descricao(idOsc), 'POST', newJson);
        console.log(success);

        //Certificacoes
        var newJson = util.validateObject(old_json.certificacoes, {});
        newJson.certificado = [];
        $("#certificacoes .form-control").each(function(i){
          var cd_certificado = 0;
          if($(this).attr("id").substring(18) === "estadual" && $(this).is(':visible')){
            cd_certificado = 7;
          }
          if($(this).attr("id").substring(18) === "municipal" && $(this).is(':visible')){
            cd_certificado = 8;
          }
          var item = {};
          //item.dt_inicio_certificado = null;
          item.dt_fim_certificado = $(this).val();
          item.ft_certificado = 'Representante'//authHeader.User;
          item.ft_inicio_certificado = 'Representante'//authHeader.User;
          item.ft_fim_certificado = 'Representante'//authHeader.User;
          item.cd_certificado = cd_certificado;
          if(cd_certificado > 0){
            newJson.certificado.push(item);
          }
        });
        if(newJson.certificado.length > 0){
          newJson["headers"] = authHeader;
          newJson["id_osc"] = idOsc;
          success = util.carregaAjax(rotas.Certificado(idOsc), 'POST', newJson);
          console.log(success);
        }
        else {
          console.log('Nenhum certificado novo a ser inserido');
        }
        // Relações de trabalho

        //Governanca
        var newJson = {};//util.validateObject(old_json.relacoes_trabalho_governanca, {});
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        newJson["governanca"] = [];
        var item = {};
        $("#dirigentes").find("input").each(function(i){
          if ($(this)[0].value){
            if ((i % 2)==0){
              item.id_dirigente = $(this).attr("id") ? $(this).attr("id") : null;
              item.tx_nome_dirigente = $(this)[0].value;
              item.ft_nome_dirigente = "Representante"; //authHeader.User;
            } else {
              item.tx_cargo_dirigente = $(this)[0].value;
              item.ft_cargo_dirigente = "Representante"; //authHeader.User;
              newJson.governanca.push(item);
              item = {};
            }
          }
        });
        if(newJson['governanca'].length == 0){
          newJson['governanca'] = null;
        }

        success = util.carregaAjax(rotas.Dirigente(idOsc), 'POST', newJson);
        console.log(success);

        //Conselho Fiscal
        newJson = {};
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        newJson["conselho_fiscal"] = [];
        $("#conselho_fiscal").find("input").each(function(){
          if ($(this)[0].value){
            var item = {};
            item.id_conselheiro = $(this).attr("id") ? $(this).attr("id") : null ;
            item.tx_nome_conselheiro = $(this)[0].value;
            item.ft_nome_conselheiro = "Representante"; //authHeader.User;
            newJson.conselho_fiscal.push(item);
          }
        });

        if(newJson['conselho_fiscal'].length == 0){
          newJson['conselho_fiscal'] = null;
        }

        success = util.carregaAjax(rotas.ConselhoFiscal(idOsc), 'POST', newJson);
        console.log(success);

        //Trabalhadores
        newJson = {};
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        newJson["nr_trabalhadores_voluntarios"] =  $('#voluntarios').val();
        console.log(newJson);
        success = util.carregaAjax(rotas.RelacoesTrabalho(idOsc), 'POST', newJson);
        console.log(success);

        // Participacao social
        // Conselho
        var lforma = [];
        $.ajax({
          url: rotas.FormaParticipacao(),
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

        var lconselho =[];
        $.ajax({
          url: rotas.Conselho(),
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

        var newJson = {};
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        newJson["conselho"] = [];
        $(".conselho").each(function(){
         var obj = {}
         obj.conselho = {};
         obj.representante = [];
         var empty = false;

         $(this).find("input").each(function(){
           var split = $(this).attr("id").split("-");
           var campo = split[0];
           var conselho_id = split[1];

           for (var i=0;i<lconselho.length;i++){
           if ($(this).val() === lconselho[i].tx_nome_conselho){
             obj.conselho.cd_conselho = lconselho[i].cd_conselho;
             break;
            }
           }
           for (var i=0;i<lforma.length;i++){
           if ($(this).val() === lforma[i].tx_nome_tipo_participacao){
             obj.conselho.cd_tipo_participacao = lforma[i].cd_tipo_participacao;
             break;
            }
           }

           if(campo === "tx_nome_representante_conselho"){
             obj.representante.push(
               {
                "tx_nome_representante_conselho": $(this).val()
               }
             );
           } else {
             obj.conselho.cd_conselho = conselho_id;
             if ( (campo !== "tx_nome_conselho") && (campo !== "tx_nome_tipo_participacao") ) {
               obj.conselho[campo] = $(this).val();
             }
           }
           if((conselho_id === "0") && ($(this).val() === "")){
             empty = true;
           }
         });

         $(this).find("select").each(function(){
           for (var i=0;i<lconselho.length;i++){
           if ($(this).val() === lconselho[i].tx_nome_conselho){
             obj.conselho.cd_conselho = lconselho[i].cd_conselho;
             break;
            }
           }
           for (var i=0;i<lforma.length;i++){
           if ($(this).val() === lforma[i].tx_nome_tipo_participacao){
             obj.conselho.cd_tipo_participacao = lforma[i].cd_tipo_participacao;
             break;
            }
           }

         });

         if(!empty){
           newJson.conselho.push(obj);
           //newJson = Object.assign({}, newJson, obj);
         }
         else {
           newJson.conselho.push(null);
         }
        });
        console.log(newJson);
        success = util.carregaAjax(rotas.ParticipacaoSocialConselho(idOsc), 'POST', newJson);
        console.log(success);

        // Conferência
        var lista_forma_conferencia = [
        'Membro de comissão organizadora nacional', 'Membro de comissão organizadora estadual ou distrital', 'Membro de comissão organizadora municipal',
  'Delegado para etapa nacional','Delegado para etapa estadual ou distrital','Participante de etapa municipal','Participante de conferência livre ou virtual',
  'Palestrante ou convidado','Observador','Mediador, moderador ou relator','Outro'];
        var lista_forma_conferencia_id = [1,2,3,4,5,6,7,8,9,10,11];

        var lconferencia ={};

        $.ajax({
          url: rotas.Conferencia(),
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

        var newJson = {};
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        newJson["conferencia"] = [];
        $(".conferencia").each(function(){
         var obj = {};
         obj["cd_conferencia"] = 0;
         obj["cd_forma_participacao_conferencia"] = 0;
         obj["dt_ano_realizacao"] = 0 ;
         $(this).find("input").each(function(){
           for (var i=0;i<lconferencia.length;i++){
           if ($(this).val() === lconferencia[i].tx_nome_conferencia){
             obj["cd_conferencia"] = lconferencia[i].cd_conferencia;
             break;
            }
           }

         for (var i=0;i<lista_forma_conferencia.length;i++){
         if ($(this).val() === lista_forma_conferencia[i]){
           obj["cd_forma_participacao_conferencia"] = lista_forma_conferencia_id[i];
           break;
          }
        }
           if ( util.contains("19",$(this).val()) ||  util.contains("20",$(this).val()) ){
            obj["dt_ano_realizacao"] = $(this).val();
          }
         });
         $(this).find("select").each(function(){
           var split = $(this).attr("id").split("-");
           var campo = split[0];
           for (var i=0;i<lconferencia.length;i++){
           if ($(this).val() === lconferencia[i].tx_nome_conferencia){
             obj["cd_conferencia"] = lconferencia[i].cd_conferencia;
             break;
            }
           }

           for (var i=0;i<lista_forma_conferencia.length;i++){
           if ($(this).val() === lista_forma_conferencia[i]){
             obj["cd_forma_participacao_conferencia"] = lista_forma_conferencia_id[i];
             break;
            }
          }
         });
         //if(!(obj.cd_conferencia === "-1") && !(obj.cd_forma_participacao_conferencia === "-1") && !(obj.dt_ano_realizacao == "")){
         if ( (util.validateObject(obj.cd_conferencia,true))  && obj.cd_conferencia !== undefined ){
           newJson.conferencia.push(obj);
         }
         else {
           newJson["conferencia"].push(null);
         }
        });
        console.log(newJson);
        success = util.carregaAjax(rotas.ParticipacaoSocialConferencia(idOsc), 'POST', newJson);
        console.log(success);

        // Outros espaços
        var newJson = {};
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        newJson["outra"] = [];
        $("#outros_part").find("div").children(".form-group").each(function(){
          $(this).find("input").each(function(){
            var split = $(this).attr("id").split("-");
            var campo = split[0];
            var val;
            if (!($(this).val()=== "")) {
              var obj = {};
              obj[campo]=$(this).val();
              newJson["outra"].push(obj);
            }
            else {
              newJson["outra"].push(null);
            }
          });
        });
        console.log(newJson);
        success = util.carregaAjax(rotas.OutraParticipacaoSocial(idOsc), 'POST', newJson);
        console.log(success);

        // Projetos
        var listaProjetos = [];
        var newJson = {};
        var idProjeto = 0;
        function getDataFromForm($elementos){
          var obj = {};
          var auxArr = [];
          $elementos.each(function() {
            var $pai = $(this).closest(".form-group");
            console.log($pai.attr("id"));
            var valor = $(this).val();
            if(valor === "-1"){
              valor = "";
            }
            if($pai.attr("id") === undefined){
              $pai = $(this).parent();
            }
            if($(this).closest(".metas").length > 0){
              $pai = $(this).closest(".metas")[0];
              if(obj["objetivo_meta"] === undefined){
                obj["objetivo_meta"] = [];
              }
              if($(this).prop("checked")){
                var codigo = valor.split(" ")[0];
                obj["objetivo_meta"].push({
                  "cd_meta_projeto": codigo,
                  "tx_meta_projeto": valor
                });
              }
            } else if( $pai.attr("id") === "fonte_recursos"){
              if(obj[$pai.attr("id")] === undefined){
                obj[$pai.attr("id")] = [];
              }
              var tipo = $(this).parent().parent().attr("id");
              if(tipo === "fonte_recursos"){
                if(valor === "Recursos públicos"){
                  valor = 1;
                }
                if(valor === "Recursos privados"){
                  valor = 2;
                }
                if(valor === "Recursos próprios"){
                  valor = 3;
                }
                if(valor === "Outros"){
                  valor = 4;
                }
                if(valor === ""){
                  obj[$pai.attr("id")] = null;
                } else {
                  obj[$pai.attr("id")].push({
                    "cd_origem_fonte_recursos_projeto": valor
                    }
                  );
                }
              }
            } else if( $pai.attr("id") === "area_atuacao_outra"){
              if(Array.isArray(obj[$pai.attr("id")])){
                obj[$pai.attr("id")].push({
                  "cd_area_atuacao_projeto": $(this).attr("id") ? $(this).attr("id") : null,
                  "tx_area_atuacao_projeto": valor
                });
              } else {
                obj[$pai.attr("id")] = [];
                obj[$pai.attr("id")].push({
                  "cd_area_atuacao_projeto": $(this).attr("id") ? $(this).attr("id") : null,
                  "tx_area_atuacao_projeto": valor
                });
              }
            } else if ($pai.attr("id") === "objetivos"){
              /*var codigo = valor.split(".")[0];
              obj["objetivos"] = {
                "cd_objetivo_projeto": codigo,
                "tx_objetivo_projeto": valor
              };*/
            } else if(($pai.attr("id") === "tx_nome_status_projeto")){
              var cd_status_projeto = null;
              if(valor === "Planejado"){
                cd_status_projeto = 1;
              }
              if(valor === "Em execução"){
                cd_status_projeto = 2;
              }
              if(valor === "Finalizado"){
                cd_status_projeto = 3;
              }
              obj["cd_status_projeto"] = cd_status_projeto;
            } else if(($pai.attr("id") === "tx_nome_abrangencia_projeto")){
              console.log("entrou");
              var cd_abrangencia_projeto = null;
              if(valor === "Municipal"){
                cd_abrangencia_projeto = 1;
              }
              if(valor === "Estadual"){
                cd_abrangencia_projeto = 2;
              }
              if(valor === "Regional"){
                cd_abrangencia_projeto = 3;
              }
              if(valor === "Nacional"){
                cd_abrangencia_projeto = 4;
              }
              obj["cd_abrangencia_projeto"] = cd_abrangencia_projeto;
            } else if(($pai.attr("id") === "tx_nome_zona_atuacao")){
              var cd_zona_atuacao_projeto = null;
              if(valor === "Urbana"){
                cd_zona_atuacao_projeto = 1;
              }
              if(valor === "Rural"){
                cd_zona_atuacao_projeto = 2;
              }
              obj["cd_zona_atuacao_projeto"] = cd_zona_atuacao_projeto;
            } else if(($pai.attr("id") === "localizacao_projeto")){
              var localizacoes = [];
              var localizacao = {};
              var $inputs = $pai.find("input");
              $inputs.each(function(){
                if($(this).val() !== ""){
                  localizacao = {};
                  localizacao.tx_nome_regiao_localizacao_projeto = $(this).val();
                  localizacoes.push(localizacao);
                }
              });
              obj["localizacao"] = localizacoes.length > 0 ? localizacoes : null;
            } else if(($pai.attr("id") === "publico_beneficiado")){
              publicos_beneficiados = [];
              var publico_beneficiado = {};
              var $inputs = $pai.find("input");
              $inputs.each(function(){
                if($(this).val() !== ""){
                  publico_beneficiado = {};
                  publico_beneficiado.tx_nome_publico_beneficiado = $(this).val();
                  publicos_beneficiados.push(publico_beneficiado);
                }
              });
              obj["publico_beneficiado"] = publicos_beneficiados.length > 0 ? publicos_beneficiados : null;
            } else if(($pai.attr("id") === "financiador_projeto")){
              var financiadores = [];
              var financiador = {};
              var $inputs = $pai.find("input");
              $inputs.each(function(){
                if($(this).val() !== ""){
                  financiador = {};
                  financiador.tx_nome_financiador = $(this).val();
                  financiadores.push(financiador);
                }
              });
              obj["financiador_projeto"] = financiadores.length > 0 ? financiadores : null;
            } else {
              obj[$pai.attr("id")] = valor;
            }
          });
          return obj;
        }
        $(".projeto").each(function(){
          var str = $(this).attr("id");
          var id_projeto_text = str.substr(0,str.indexOf('-'));
          var id_projeto = str.substr(str.indexOf('-')+1);
          var idProjetoExterno = $($(this).find("div")[0]).attr("id");
          idProjeto = Number(id_projeto);
          idProjetoExterno =  idProjetoExterno ? idProjetoExterno : null;

          newJson = $.extend({}, newJson, getDataFromForm($(this).find("input")));
          newJson = $.extend({}, newJson, getDataFromForm($(this).find("textarea")));
          newJson = $.extend({}, newJson, getDataFromForm($(this).find("select")));

          if(newJson["objetivo_meta"] === undefined){
            newJson["objetivo_meta"] = null;
          }
          newJson["headers"] = authHeader;
          newJson["id_osc"] = idOsc;
          console.log(idProjeto);
          if(idProjeto === -1){
            newJson["id_projeto"] = null;
            newJson["tx_identificador_projeto_externo"] = idProjetoExterno;
            console.log(newJson);
            success = util.carregaAjax(rotas.CriarProjectByID(idOsc), 'POST', newJson);
            console.log(success);
          } else {
            newJson["id_projeto"] = idProjeto;
            newJson["tx_identificador_projeto_externo"] = idProjetoExterno;
            console.log(newJson);
            success = util.carregaAjax(rotas.AtualizarProjectByID(idOsc), 'POST', newJson);
            console.log(success);
          }
          //listaProjetos.push(newJson);
        });
        // console.log(listaProjetos);
        // success = util.carregaAjax(rotas.AtualizarProjectByID(idOsc), 'POST', listaProjetos);
        // console.log(success);
        // Fonte de recursos
        newJson = {};
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        newJson["fonte_recursos"] = [];
        $("#recursos").children().each(function(){
          var ano = $(this).find("select").val();
          $(this).find("input").each(function(){
            var obj = {};
            obj.dt_ano_recursos_osc = ano;
            obj.cd_fonte_recursos_osc = $(this).attr("id");
            obj.nr_valor_recursos_osc = $(this).val();
            newJson.fonte_recursos.push(obj);
          })

        });
        console.log(newJson);
        success = util.carregaAjax(rotas.AtualizarFontesRecursos(idOsc), 'POST', newJson);
        console.log(success);
      //});

      jsonSalvoSucesso = {"Salvo com sucesso!":"Suas alterações serão processadas aproximadamente em 1(um) dia.<br><br>Obrigado!"};
      util.abrirModalAjuda("Salvo com sucesso!", jsonSalvoSucesso);

    });
  });

});
