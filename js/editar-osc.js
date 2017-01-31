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
    // console.log(urlRota);

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
        var cabecalhoArray = cabecalhoObject.montarCabecalho(data, util);
        Cabecalho = React.createFactory(Cabecalho);
        ReactDOM.render(Cabecalho({dados:cabecalhoArray}), document.getElementById("cabecalho"));
        old_json = data;

        // Dados Gerais
        var formItens = dadosGerais.montarDadosGerais(data, util, dadosForm);
        FormItem = React.createFactory(FormItem);
        ReactDOM.render(
          FormItem(
            {header:{priority: headerPriority, text: 'Dados Gerais'}, dados:formItens}
          ), document.getElementById("dados_gerais")
        );
        $("#tx_telefone").find("input").mask('(00) 0000-0000');

        //Áreas de atuação
        var tx_nome_atividade_economica_osc="";
        var ft_atividade_economica_osc="";
        obj = areasAtuacao.montarAreasDeAtuacao(data, util, dadosForm, rotas, tx_nome_atividade_economica_osc, ft_atividade_economica_osc);
        var formItens = obj.formItens;
        carregarAreasAtuacao(obj.area_suggestions, obj.macro_area_suggestions);
        FormItem = React.createFactory(FormItem);
        ReactDOM.render(
          FormItem(
            {header:{priority: headerPriority, text: 'Áreas e Subáreas de Atuação da OSC'}, dados:formItens}
          ), document.getElementById("areas_de_atuacao")
        );
        /*
        //Descrição
        descricao.montarDescricao(data, util);
        //Títulos e certificações
        titulosCertificacoes.montarTitulosCertificacoes(data, util);
        //Relações de trabalho e governança
        relacoesGovernanca.montarRelacoesGovernanca(data, util);
        // Espaços participacao social
        espacosPartSocial.montarEspacosParticipacaoSocial(data, util);
        //Projetos
        projeto.montarProjetos(data, util);
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
          $cloneChildren = $('#'+idDiv).children();
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

  function carregarAreasAtuacao(area_suggestions, macro_area_suggestions){
    var id_suggestion = 0;

      $("#areas_de_atuacao .autocomplete").autocomplete({
        minLength: 0,
        create: function(event, ui) {
          var value = $(this).attr("placeholder");
          for (var i = 0; i < macro_area_suggestions.length; i++) {
            var suggestion = macro_area_suggestions[i].value;

            //if (suggestion === value){
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
            //}
          }
        },
        source: macro_area_suggestions,
        change: function( event, ui ) {
        },
        select: function(event, ui){
          var targetElement = event.target;
          var id = macro_area_suggestions.indexOf(ui.item)+1;
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

});
