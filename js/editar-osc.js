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
        areasAtuacao.montarAreasDeAtuacao(data, util, dadosForm, rotas, txtAtvEconomica, fonteAtvEconomica, React, ReactDOM, FormItem);
        //Descrição
        descricao.montarDescricao(data, util, dadosForm.descricao(descricao), React, ReactDOM, FormItem);
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
        ativarProjetos(data, util, dadosForm);
        //Fonte de recurso
        fonteRecurso.montarFontedeRecursos(data, util, rotas, dadosForm, React, ReactDOM, Section, FormItem);
        //Acessibilidade
        verificarContraste();
        //função para contornar a não renderização de eventos (onclick, onmouseover...) pelo react
        clique();
        //Datas
        $(".date").datepicker({ dateFormat: 'dd-mm-yy' });
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

    function ativarProjetos(data, util){
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
          var res = projeto.carregaProjeto(id_projeto, dadosForm, rotas, util);
          var result = res.agrupadores;
          var proj = res.projeto;

          agrupamento(result, id_projeto);
          if(proj){
            metasObjetivos(proj.projeto[0], id_projeto);
          } else {
            metasObjetivos({}, id_projeto);
          }
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
      $divMetasProjeto.append('<div class="header" title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido</div>');
      $divMetasProjeto.append('<ol id="selectable-'+cd_objetivo +'" class="selectable"></ol>');
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
      	$(this).parents("#objetivos-metas").find(".metas").each(function(){
      		if(!$(this).hasClass('hidden')){
      			$(this).toggleClass('hidden');
      		}
      	});
        $divObjetivosMetasProjeto.find(".metas").remove();
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
        newJson[key] = value;
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
          item.dt_inicio_certificado = null;
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

        console.log(newJson);
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
            item.tx_nome_conselheiro = $(this)[0].value;
            item.ft_nome_conselheiro = "Representante"; //authHeader.User;
            newJson.conselho_fiscal.push(item);
          }
        });

        console.log(newJson);
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
        var newJson = [];
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        $(".conselho").each(function(){
         var obj = {}
         obj.conselho = {};
         obj.representante = {};
         var empty = false;
         $(this).find("input").each(function(){
           var split = $(this).attr("id").split("-");
           var campo = split[0];
           var conselho_id = split[1];
           if(campo === "tx_nome_representante_conselho"){
             obj.representante.id_participacao_social_conselho = conselho_id;
             obj.representante[campo] = $(this).val();
           } else {
             obj.conselho.id_conselho = conselho_id;
             obj.conselho[campo] = $(this).val();
           }
           if((conselho_id === "0") && ($(this).val() === "")){
             empty = true;
           }
         });
         if(!empty){
           newJson.push(obj);
           //newJson = Object.assign({}, newJson, obj);
         }
        });
        console.log(newJson);
        success = util.carregaAjax(rotas.ParticipacaoSocialConselho(idOsc), 'POST', newJson);
        console.log(success);

        // Conferência
        var newJson = [];
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        $(".conferencia").each(function(){
         var obj = {}
         var empty = false;
         $(this).find("input").each(function(){
           var split = $(this).attr("id").split("-");
           var campo = split[0];
           var conferencia_id = split[1];
           obj[campo] = $(this).val();
           obj.cd_conferencia = conferencia_id;
           if((conferencia_id === "0") && ($(this).val() === "")){
             empty = true;
           }
         });
         if(!empty){
           newJson.push(obj);
           //newJson = Object.assign({}, newJson, obj);
         }
        });
        console.log(newJson);
        success = util.carregaAjax(rotas.ParticipacaoSocialConferencia(idOsc), 'POST', newJson);
        console.log(success);

        // Outros espaços
        var newJson = {};
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        $("#outros_part").find("div").children(".form-group").each(function(){
          var obj = {}
          var empty = false;
          $(this).find("input").each(function(){
            var split = $(this).attr("id").split("-");
            var campo = split[0];
            var outros_part_id = split[1];
            obj[campo] = $(this).val();
            obj.id_participacao_social_outra = outros_part_id;
            if((outros_part_id === "0") && ($(this).val() === "")){
              empty = true;
            }
          });
          if(!empty){
            //newJson.push(obj);
            newJson = Object.assign({}, newJson, obj);
          }
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
            var valor = $(this).val();
            if(valor === "-1"){
              valor = "";
            }
            if($pai.attr("id") === undefined){
              $pai = $(this).parent();
            }
            if($(this).closest(".metas").length > 0){
              $pai = $(this).closest(".metas")[0];
              if(obj["metas"] === undefined){
                obj["metas"] = [];
              }
              if($(this).prop("checked")){
                var codigo = valor.split(" ")[0].split(".")[1];
                obj["metas"].push({
                  "cd_meta_projeto": codigo,
                  "tx_meta_projeto": valor
                });
              }
            } else if( $pai.attr("id") === "fonte_de_recursos"){
              if(obj[$pai.attr("id")] === undefined){
                obj[$pai.attr("id")] = {};
              }
              var tipo = $(this).parent().parent().attr("id");
              if(tipo === "fonte_de_recursos"){
                obj[$pai.attr("id")].cd_origem_fonte_recursos_projeto = valor;
                obj[$pai.attr("id")].tx_nome_origem_fonte_recursos_projeto = null;
              } else {
                obj[$pai.attr("id")].id_fonte_recursos_projeto = null;
                obj[$pai.attr("id")].cd_fonte_recursos_projeto = valor;
                obj[$pai.attr("id")].tx_nome_fonte_recursos_projeto = null;
                obj[$pai.attr("id")].ft_fonte_recursos_projeto = null;
              }
            } else if( $pai.attr("id") === "autodeclaradas"){
              if(Array.isArray(obj[$pai.attr("id")])){
                obj[$pai.attr("id")].push({
                  "cd_area_atuacao_projeto": $(this).attr("id"),
                  "tx_area_atuacao_projeto": valor
                });
              } else {
                obj[$pai.attr("id")] = [];
                obj[$pai.attr("id")].push({
                  "cd_area_atuacao_projeto": $(this).attr("id"),
                  "tx_area_atuacao_projeto": valor
                });
              }
            } else if ($pai.attr("id") === "objetivos"){
              var codigo = valor.split(".")[0];
              obj["objetivos"] = {
                "cd_objetivo_projeto": codigo,
                "tx_objetivo_projeto": valor
              };
            } else {
              obj[$pai.attr("id")] = valor;
            }
          });
          return obj;
        }
        $(".projeto").each(function(){
          var str = $(this).attr("id");
          idProjeto = Number(str.substring(str.indexOf("-") + 1));

          newJson = $.extend({}, newJson, getDataFromForm($(this).find("input")));
          newJson = $.extend({}, newJson, getDataFromForm($(this).find("textarea")));
          newJson = $.extend({}, newJson, getDataFromForm($(this).find("select")));

          newJson["headers"] = authHeader;
          newJson["id_osc"] = idOsc;
          if(idProjeto !== -1){
            newJson["id_projeto"] = idProjeto;
          } else {
            newJson["id_projeto"] = null;
          }
          listaProjetos.push(newJson);
        });
        console.log(listaProjetos);
        success = util.carregaAjax(rotas.AtualizarProjectByID(idOsc), 'POST', listaProjetos);
        console.log(success);
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
        console.log(success.responseText);
      //});



    });
  });

});
