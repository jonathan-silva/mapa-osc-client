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
  var fonteRecurso = new FonteRecurso();
  var old_json = null;
  var newJson = {};

  require(['componenteFormItem', 'componenteCabecalho', 'componenteCheckbox', 'componenteSection',
  'componenteAgrupador', 'componenteFormItemButtons','componenteAgrupadorInputProjeto','componenteAgrupadorConferencia','componenteAgrupadorConselhos'],
  function(FormItem, Cabecalho, Checkbox, Section, Agrupador, FormItemButtons, AgrupadorInputProjeto, AgrupadorConferencia, AgrupadorConselhos){

    var valoresURL = window.location.href.split('#')[1]!==undefined ? window.location.href.split('#/')[1].split('=') : null;
    var urlRota = "";
    var idOsc = "";

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
        //Cabeçalho
        cabecalhoObject.montarCabecalho(data, util, React, ReactDOM, Cabecalho);
        old_json = data;
        // Dados Gerais
        dadosGerais.montarDadosGerais(data, util, dadosForm, React, ReactDOM, FormItem);
        //Áreas de atuação
        var txtAtvEconomica = util.validateObject(data.dados_gerais.tx_nome_atividade_economica_osc) ? data.dados_gerais.tx_nome_atividade_economica_osc : "";
        var fonteAtvEconomica = util.validateObject(data.dados_gerais.ft_atividade_economica_osc) ? data.dados_gerais.ft_atividade_economica_osc : "";
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
        var arrayObj = espacosPartSocial.iniciarEspacosPartSoc(data, util, dadosForm, Section, React, ReactDOM);
        espacosPartSocial.ativarEspacosPart(arrayObj, util, React, ReactDOM, Agrupador, AgrupadorConselhos, AgrupadorConferencia, FormItemButtons);
        //Projetos
        ativarProjetos(data, util, dadosForm);
        //Fonte de recurso
        fonteRecurso.montarFontedeRecursos(data, util, dadosForm, React, ReactDOM, Section, FormItem);
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
      }
    });

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
      $divObjetivosProjeto.append('<div class="header">Objetivos do Desenvolvimento Sustentável - ODS - <a href=https://nacoesunidas.org/pos2015 target=_blank><img className="imgLinkExterno" src="img/site-ext.gif" width="17" height="11" alt="Site Externo." title="Site Externo." /></a> </div>');
      $divObjetivosProjeto.append('<div class="form-group"><div id="objetivos"><select class="form-control"></select></div></div>');
      $divObjetivosMetasProjeto.append('<div id="metas-'+id+'" class="metas"></div>');

      var $divMetasProjeto = $divObjetivosMetasProjeto.find("#metas-"+id);
      $divMetasProjeto.append('<div class="header" title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido</div>');
      $divMetasProjeto.append('<ol id="selectable-'+id +'" class="selectable"></ol>');

      if(cd_objetivo){
        loadMetas(cd_objetivo);
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

    function loadMetas(cd_objetivo){
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

    function carregaEventoMetas(){
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
      		loadMetas(cd_objetivo);
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

        items = data;
        for (var i=0; i<items.length; i++){
          checkboxItems.push(new CheckboxItems(items[i].cd_meta_projeto, items[i].tx_nome_meta_projeto, items[i].tx_nome_meta_projeto, "checkbox", null));
        }
        Checkbox = React.createFactory(Checkbox);
        ReactDOM.render(
          Checkbox(
            {dados:checkboxItems}
          ), document.getElementById("selectable-"+cd_objetivo)
        );

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
          loadMetas(cd_objetivo);
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
      var newJson = util.validateObject(old_json.dados_gerais) ? old_json.dados_gerais : {};
      $("#dados_gerais :input").each(function(){
        var key = $(this).attr("id");
        var value = $(this).val();
        newJson[key] = value;
      });
      newJson["headers"] = authHeader;
      newJson["id_osc"] = idOsc;
      //console.log(newJson);
      success = util.carregaAjax(rotas.DadosGerais(idOsc), 'POST', newJson);
      console.log(success);

      //Áreas de atuação
      // if(util.validateObject(old_json.area_atuacao)){
      //   newJson = old_json.area_atuacao;
      // } else{
      //   newJson={};
      //   newJson.area_atuacao = [];
      // }
      newJson={};
      newJson.area_atuacao = [];
      console.log("old_json", old_json);
      newJson["headers"] = authHeader;
      newJson["id_osc"] = idOsc;
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
          "cd_area_atuacao": cd_area.toString(),
          "tx_nome_subarea_atuacao_outra": ($(this).val() === "Outros") ? idMacroAreaOutros : null
        }

        var subareas = [];
        $(this).siblings(".checkboxList").children(":not(.hidden)").each(function(index){
          $(this).find("input:checked").each(function(){
            var labelOutros = $(this).closest("label").text();
            var isLabelOutros = ($(this).closest("label").text() === "Outros");

            subareas.push({
              "tx_nome_subarea_atuacao_outra": isLabelOutros ? $("#sub_area_"+macro_area_id+"_outros").val() : null,
              "cd_subarea_atuacao": $(this).val(),
              //"ft_area_atuacao": "Representante"
            });
          });

          if(subareas){
            obj_area_atuacao.subarea_atuacao = subareas;
          }
          newJson.area_atuacao.push(obj_area_atuacao);
        });
      });
        console.log(newJson);
        success = util.carregaAjax(rotas.AtualizarAreaAtuacao(idOsc), 'POST', newJson);
        console.log(success);

        //Descricao
        var newJson = {};
        $("#descricao .form-control").each(function(){
          newJson[$(this).attr("id")] = $(this).val();
        });
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;

        success = util.carregaAjax(rotas.Descricao(idOsc), 'POST', newJson);
        console.log(success);

        //Certificacoes
        var newJson = {};
        newJson.certificado = [];
        $("#certificacoes .form-control").each(function(){
          var cd_certificado = 0;
          if($(this).attr("id").substring(18) === "estadual"){
            cd_certificado = 6;
          }
          if($(this).attr("id").substring(18) === "municipal"){
            cd_certificado = 7;
          }
          var item = {};
          item = {};
          item.dt_fim_certificado = $(this).val();
          item.dt_inicio_certificado = null;
          item.ft_certificado = authHeader.User;
          item.ft_inicio_certificado = authHeader.User;
          item.ft_fim_certificado = authHeader.User;
          item.cd_certificado = cd_certificado;
          newJson.certificado.push(item);
        });
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        console.log(newJson);
        success = util.carregaAjax(rotas.Certificado(idOsc), 'POST', newJson);
        console.log(success);

        // Relações de trabalho
        /*
        var newJson = [];
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        console.log(newJson);
        success = util.carregaAjax(rotas.ProjectByID(idProjeto), 'POST', newJson);
        console.log(success);
        */

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
          }
        });
        console.log(newJson);
        success = util.carregaAjax(rotas.ParticipacaoSocialConferencia(idOsc), 'POST', newJson);
        console.log(success);

        // Outros espaços
        var newJson = [];
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
            newJson.push(obj);
          }
        });
        console.log(newJson);
        success = util.carregaAjax(rotas.OutraParticipacaoSocial(idOsc), 'POST', newJson);
        console.log(success);

        // Projetos
        var newJson = {};
        var idProjeto = "";
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
                obj["metas"].push({
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
                  "cd_area_atuacao_projeto": null,
                  "tx_area_atuacao_projeto": valor
                });
              } else {
                obj[$pai.attr("id")] = [];
                obj[$pai.attr("id")].push({
                  "cd_area_atuacao_projeto": null,
                  "tx_area_atuacao_projeto": valor
                });
              }
            } else if ($pai.attr("id") === "objetivos"){
              console.log($(this).val());
            } else {
              obj[$pai.attr("id")] = valor;
            }
          });
          return obj;
        }
        $(".projeto").each(function(){
          console.log("projeto");
          var str = $(this).attr("id");
          idProjeto = str.substring(str.indexOf("-") + 1);

          newJson = $.extend({}, newJson, getDataFromForm($(this).find("input")));
          newJson = $.extend({}, newJson, getDataFromForm($(this).find("textarea")));
          newJson = $.extend({}, newJson, getDataFromForm($(this).find("select")));
          /*
          $(this).find("input").each(function() {
            var $pai = $(this).closest(".form-group");
            newJson[$pai.attr("id")] = $(this).val();
          });
          $(this).find("textarea").each(function() {
            var $pai = $(this).closest(".form-group");
            newJson[$pai.attr("id")] = $(this).val();
          });
          $(this).find("select").each(function() {
            var $pai = $(this).closest(".form-group");
            if($pai.attr("id") === undefined){
              $pai = $(this).parent();
            }
            newJson[$pai.attr("id")] = $(this).val();
          });*/

          /*
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
          */
          //newJson["meta"] = $(".metas :visible").find(".ui-selected").text();
          newJson["headers"] = authHeader;
          newJson["id_osc"] = idOsc;
          console.log(newJson);
          success = util.carregaAjax(rotas.AtualizarProjectByID(idProjeto), 'POST', newJson);
          console.log(success);
        });
        console.log(old_json);
        // Fonte de recursos
        newJson = [];
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        $("#recursos").children().each(function(){
          var obj = {};
          var ano = $(this).find("select").val();
          obj["dt_ano_recursos_osc"] = ano;
          $(this).find("input").each(function(){
            obj[$(this).attr("id")] = $(this).val();
          })
          newJson.push(obj);
        });
        console.log(newJson);
      //});



    });
  });

});
