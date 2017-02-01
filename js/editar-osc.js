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

require(['react', 'rotas', 'jsx!components/Util', 'jsx!components/EditarOSC', 'jquery', 'jquery-ui', 'datatables-responsive'], function (React) {

  var dadosForm = new DataForms();
  var old_json = null;

  require(['componenteFormItem', 'componenteCabecalho', 'componenteCheckbox', 'componenteSection',
  'componenteAgrupador', 'componenteFormItemButtons','componenteAgrupadorInputProjeto','componenteAgrupadorConferencia','componenteAgrupadorConselhos'],
  function(FormItem, Cabecalho, Checkbox, Section, Agrupador, FormItemButtons, AgrupadorInputProjeto, AgrupadorConferencia, AgrupadorConselhos){

    function FormItens(id, label, content, fonte, placeholder, type, options, pretext, custom_class, hide, defaultFormItem){
      this.id = id;
      this.label = label;
      this.content = content;
      this.fonte = fonte;
      this.placeholder = placeholder;
      this.type = type;
      this.options = options;
      this.pretext = pretext;
      this.custom_class = custom_class;
      this.hide = hide;
      this.default = defaultFormItem;
    }

    var valoresURL = window.location.href.split('#')[1]!==undefined ? window.location.href.split('#/')[1].split('=') : null;
    var rotas = new Rotas();
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
        montarCabecalho(data);
        montarDadosGerais(data);
        montarAreasDeAtuacao(data);
        montarDescricao(data);
        montarTitulosCertificacoes(data);
        montarRelacoesGovernanca(data);
        montarEspacosParticipacaoSocial(data);
        montarProjetos(data);
        $(".date").datepicker({ dateFormat: 'dd-mm-yy' });
        //$(".ano").datepicker({ dateFormat: 'yy' });
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

        montarFontedeRecursos(data);
        verificarContraste();
        clique();
      }
    });

    //função para contornar a não renderização de eventos (onclick, onmouseover...) pelo react
    function clique(){
      $(".ajuda").on("click", function(){
        abrirModalAjuda($(this).attr("data"));
      });
    }

    function montarCabecalho(json){
      function fCabecalho(Nome, cd_nur,NatJur){
        this.Nome = Nome;
        this.cd_nur = cd_nur;
        this.NatJur = NatJur;
      }
      var cabecalho = validateObject(json.cabecalho) ? json.cabecalho : "";
      var Nome = validateObject(cabecalho.tx_razao_social_osc) ? cabecalho.tx_razao_social_osc : "";
      var cd_nur = validateObject(cabecalho.cd_identificador_osc) ? cabecalho.cd_identificador_osc : "";
      var NatJur = validateObject(cabecalho.tx_nome_natureza_juridica_osc) ? cabecalho.tx_nome_natureza_juridica_osc : "";

      var cabecalhoArray = [];
      cabecalhoArray.push(new fCabecalho(Nome, cd_nur, NatJur));
      Cabecalho = React.createFactory(Cabecalho);
      ReactDOM.render(Cabecalho({dados:cabecalhoArray}), document.getElementById("cabecalho"));
      old_json = json;
    }

    // Dados Gerais
    function montarDadosGerais(json){
      var dadosGerais = validateObject(json.dados_gerais) ? json.dados_gerais : "";
      var content = montarEnderecoImovel(dadosGerais)
      var dados_form =dadosForm.dadosGerais(dadosGerais, content);
      var items = dados_form.form_items;
      var headerPriority = '2';
      var headerText = 'Dados Gerais';
      var formItens = [];

      for (var i=0; i<items.length; i++){
        formItens.push(new FormItens(items[i].id, items[i].label, items[i].content, items[i].fonte, items[i].placeholder, items[i].type, items[i].options, items[i].pretext));
      }
      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:{priority: headerPriority, text: headerText}, dados:formItens}
        ), document.getElementById("dados_gerais")
      );

      $("#tx_telefone").find("input").mask('(00) 0000-0000');
    }

    //Áreas de atuação
    function montarAreasDeAtuacao(json){

      function AutocompleteItem(id, label, content, fonte, placeholder, type, custom_class, areas, subareas){
        this.id = id;
        this.label = label;
        this.content = content;
        this.fonte = fonte;
        this.placeholder = placeholder;
        this.type = type;
        this.custom_class = custom_class;
        this.areas = areas;
        this.subareas = subareas;
      }
      //console.log(json.area_atuacao);
      var areas_atuacao = validateObject(json.area_atuacao) ? json.area_atuacao : [];
      var area_atuacao_outra = validateObject(areas_atuacao.area_atuacao_outra) ? areas_atuacao.area_atuacao_outra : [];
      areas_atuacao = [].concat(areas_atuacao).concat(area_atuacao_outra);
      var macro_area_suggestions = dadosForm.getSuggestions();
      //console.log(areas_atuacao);

      $.when(
        $.ajax({
          url: rotas.AreaAtuacao(),
          type: 'get',
          dataType: 'json',
          data: {},
          success: function(data) {
            return data;
          },
          error: function(e) {
            console.log(e);
          }
        }),
        $.ajax({
          url: rotas.SubAreaAtuacao(),
          type: 'get',
          dataType: 'json',
          data: {},
          success: function(data) {
            return data;
          },
          error: function(e) {
            console.log(e);
          }
        })
      ).then(function (macro_area_suggestions, subarea_suggestions) {
        loadSuggestions(macro_area_suggestions[0], subarea_suggestions[0]);
      });

      function loadSuggestions(macro_area_suggestions, subarea_suggestions){
        for (var i = 0; i < subarea_suggestions.length; i++) {
          subarea_suggestions[i]["label"] = subarea_suggestions[i]["tx_nome_subarea_atuacao"];
          subarea_suggestions[i]["value"] = subarea_suggestions[i]["cd_subarea_atuacao"];
        }

        headerPriority = '2';
        headerText = 'Áreas e Subáreas de Atuação da OSC';
        formItens = [];
        dados_form = dadosForm.areasAtuacao();
        items = dados_form.form_items;
        formItens.push(new AutocompleteItem(items[0].id, items[0].label, validateObject(json.dados_gerais.tx_nome_atividade_economica_osc)?json.dados_gerais.tx_nome_atividade_economica_osc:"Não informado", validateObject(json.dados_gerais.ft_atividade_economica_osc)?json.dados_gerais.ft_atividade_economica_osc:"Não informado", items[0].placeholder, items[0].type, items[0].custom_class, macro_area_suggestions, subarea_suggestions));
        items.splice(0,1);
        //console.log(items);
        for (var j=0; j<items.length; j++){
          var content = null;
          var fonte = null;
          if(areas_atuacao.length > j){
            content = areas_atuacao[j].tx_nome_area_atuacao;
            fonte = areas_atuacao[j].ft_nome_area_atuacao;
          }
          //formItens.push(new AutocompleteItem(items[j].id, items[j].label, content, fonte, items[j].placeholder, items[j].type, items[j].custom_class, macro_area_suggestions, subarea_suggestions));
          if(items[j].custom_class === "autocomplete"){
            formItens.push(new AutocompleteItem(items[j].id, items[j].label, content, fonte, items[j].placeholder, items[j].type, items[j].custom_class, macro_area_suggestions, subarea_suggestions));
          } else {
            formItens.push(new FormItens(items[j].id, items[j].label, items[j].content, items[j].fonte, items[j].placeholder, items[j].type, items[j].options, items[j].pretext, items[j].custom_class, items[j].hide));
          }
        }

        require(["react", "jquery-ui", "jquery"], function (React) {
          //autocomplete macro_area_1 e macro_area_2
          macro_area_suggestions = $.map(macro_area_suggestions, function(item) {
            newItem = {
              label: item.tx_nome_area_atuacao,
              value: item.tx_nome_area_atuacao,
              id: item.cd_area_atuacao
            };

            return newItem;
          });
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

                  for (var j = 0; j < areas_atuacao.length; j++) {
                    if((value === areas_atuacao[j].tx_nome_area_atuacao)){
                      var subarea_exists = false;
                      $element.find("label").each(function(){
                        if(areas_atuacao[j].tx_nome_subarea_atuacao === $(this).text().trim()){
                          subarea_exists = $(this);
                        }
                      });
                      if(subarea_exists){
                        subarea_exists.find("input").prop('checked', true);
                      } else {
                        $element.find("#outros").val(areas_atuacao[j].tx_nome_subarea_atuacao);
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
        });

        FormItem = React.createFactory(FormItem);
        ReactDOM.render(
          FormItem(
            {header:{priority: headerPriority, text: headerText}, dados:formItens}
          ), document.getElementById("areas_de_atuacao")
        );
      }
    }

    //Descrição
    function montarDescricao(json){
      var descricao = validateObject(json.descricao) ? json.descricao : "";
      headerPriority = '2';
      headerText = 'Descrição da OSC';
      formItens = [];
      dados_form = dadosForm.descricao(descricao);
      items = dados_form.form_items;
      for (j=0; j<items.length; j++){
        formItens.push(new FormItens(items[j].id, items[j].label, items[j].content, items[j].fonte, items[j].placeholder, items[j].type));
      }
      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:{priority: headerPriority, text: headerText}, dados:formItens}
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

    //Títulos e certificações
    function montarTitulosCertificacoes(json){
      var tx_sem_titulos = "Não há registros de títulos ou certificações";
      var utilidade_publica_estadual;
      var utilidade_publica_municipal;
      var certificacoes = validateObject(json.certificado) ? json.certificado.certificado : "";

      headerPriority = '2';
      headerText = 'Títulos e Certificações';
      formItens = [];
      dados_form = dadosForm.titulosCertificacoes(json);
      var items = validateObject(certificacoes) ? certificacoes : [];

      if(items.length > 0){
        for (j=0; j<items.length; j++){
          var dataValidadeText = "Data de Validade: " + (items[j].dt_fim_certificado?items[j].dt_fim_certificado:"Não informada");
          formItens.push(new FormItens(items[j].id_certificado, items[j].tx_nome_certificado, dataValidadeText, items[j].ft_certificado, null, "p"));
        }
      } else {
        formItens.push(new FormItens(null, null, tx_sem_titulos, "base", null, "p"));
      }
      items = dados_form.form_items;
      var autoElement = React.createElement('div', { id: 'auto' });
      var manualLabel = React.createElement('label', null, 'Utilidade pública');
      var manualElement = React.createElement('div', { id: 'manual' });
      var root = React.createElement('div', { id: 'root' }, autoElement, manualLabel, manualElement);
      ReactDOM.render(root, document.getElementById('certificacoes'));

      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:{priority: headerPriority, text: headerText}, dados:formItens}
        ), document.getElementById("auto")
      );

      formItens = [];
      for (j=0; j<items.length; j++){
        formItens.push(new FormItens(items[j].id, items[j].label, items[j].content, items[j].fonte, items[j].placeholder, items[j].type, items[j].options, null, "date", items[j].hide));
      }

      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:null, dados:formItens}
        ), document.getElementById("manual")
      );

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

    //Relações de trabalho e governança
    function montarRelacoesGovernanca(json){
      // Governança: Dirigentes
      var tx_sem_relacoes = "Não há registros de relações de trabalho e governança";
      var sections = dadosForm.sectionsRelacoesGovernanca();
      items = sections.items;
      Section = React.createFactory(Section);
      ReactDOM.render(
        Section(
          {dados:items}
        ), document.getElementById(items[0].target)
      );
      function DadosForm(label, content) {
        this.nome = label;
        this.cargo = content;
      }

      var relacoes_trabalho =0;
      var relacoes_trabalho_governanca = validateObject(json.relacoes_trabalho_governanca) ? json.relacoes_trabalho_governanca : "";
      // Governança: Dirigentes
      var  dirigentes = validateObject(relacoes_trabalho_governanca.governanca) ? relacoes_trabalho_governanca.governanca : '0';
      // Governança: Conselheiros
      var  conselheiros = validateObject(relacoes_trabalho_governanca.governanca) ? relacoes_trabalho_governanca.conselho_fiscal : 0;

      formItens = [];
      for (j=0; j<dirigentes.length; j++){
        for (var property in dirigentes[j]) {
          if (dirigentes[j].hasOwnProperty(property)) {
            if(property == "tx_nome_dirigente"){
              formItens.push(new FormItens(dirigentes[j].id, "Nome do dirigente", dirigentes[j].tx_nome_dirigente, dirigentes[j].ft_nome_dirigente, "Insira o nome do dirigente", "text"));
            }
            if(property == "tx_cargo_dirigente"){
              formItens.push(new FormItens(dirigentes[j].id, "Cargo do dirigente", dirigentes[j].tx_cargo_dirigente, dirigentes[j].ft_cargo_dirigente, "Insira o cargo do dirigente", "text"));
            }
          }
        }
      }
      formItens.push(new FormItens(null, "Nome do dirigente", null , null, "Insira o nome do dirigente", "text", null, null, null, null, true));
      formItens.push(new FormItens(null, "Cargo do dirigente", null , null, "Insira o cargo do dirigente", "text", null, null, null, null, true));
      Agrupador = React.createFactory(Agrupador);
      ReactDOM.render(
        Agrupador(
          {dados:formItens}
        ), document.getElementById("dirigentes")
      );
      formItens = [];
      //formItens.push(new FormItens(null, "Quantidade de conselheiros", conselheiros, null, null, "p"));
      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:null, dados:formItens}
        ), document.getElementById("conselheiros")
      );
      addItem('dirigentes');

      // Governança: Conselheiros
      var conselho_fiscal = conselheiros;
      formItens = [];
      for (var i = 0; i < conselho_fiscal.length; i++) {
        var conselheiro = conselho_fiscal[i];
        formItens.push(new FormItens(conselheiro.id_conselheiro, "Nome", conselheiro.tx_nome_conselheiro, conselheiro.ft_nome_conselheiro, "Insira o nome do conselheiro fiscal", "text"));
      }
      formItens.push(new FormItens(null, "Nome", null , null, "Insira o nome do conselheiro fiscal", "text", null, null, null, null, true));
      FormItemButtons = React.createFactory(FormItemButtons);
      ReactDOM.render(
        FormItemButtons(
          {header:null, dados:formItens}
        ), document.getElementById("conselho_fiscal")
      );

      addItem('conselho_fiscal');

      //Trabalhadores
      relacoes_trabalho = validateObject(relacoes_trabalho_governanca.relacoes_trabalho) ? relacoes_trabalho_governanca.relacoes_trabalho : "";

      dados_form = dadosForm.relacoesTrabalho(relacoes_trabalho);
      formItens = [];
      for (var i = 0; i < dados_form.form_items.length; i++) {
        var campo = dados_form.form_items[i];
        formItens.push(new FormItens(campo.id, campo.label, campo.content, campo.fonte, campo.placeholder, campo.type));
      }
      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:null, dados:formItens}
        ), document.getElementById("trabalhadores")
      );
    }

    // Espaços participacao social;
    function montarEspacosParticipacaoSocial(json){
      var tx_sem_participacao_social = "Não há registros de participação social";
      var participacao_social_form = dadosForm.partSocial();
      items = participacao_social_form.items;
      Section = React.createFactory(Section);
      ReactDOM.render(
        Section(
          {dados:items}
        ), document.getElementById(items[0].target)
      );

      var nomeConselho = null;
      var nomeTipoParticipacao = null;
      var nomeRepresentanteConselho = null;
      var periodicidade = null;
      var dataInicioConselho = null;
      var dataFimConselho = null;
      var nomeConferencia = null;
      var nomeFormaParticipacao = null;
      var anoRealizacao = null;

      if (validateObject(json.participacao_social)){
        nomeConselho = "tx_nome_conselho-0";
        nomeTipoParticipacao = "tx_nome_tipo_participacao-0";
        nomeRepresentanteConselho = "tx_nome_representante_conselho-0";
        periodicidade = "tx_periodicidade_reuniao-0";
        dataInicioConselho = "dt_data_inicio_conselho-0";
        dataFimConselho = "dt_data_fim_conselho-0";
        nomeConferencia = "tx_nome_conferencia-0";
        nomeFormaParticipacao = "tx_nome_forma_participacao_conferencia-0";
        anoRealizacao = "dt_ano_realizacao-0";
      }

      var participacao_social = validateObject(json.participacao_social) ? json.participacao_social : "";
      var conselhos=validateObject(participacao_social.conselho) ? participacao_social.conselho : '0';
      var conferencias = validateObject(participacao_social.conferencia) ? participacao_social.conferencia : '0';
      var outras = validateObject(participacao_social.outra) ? participacao_social.outra : '0';
      formItens = [];

      if (conselhos) {
        var conselho = participacao_social_form.items;
        for (j=0; j<conselhos.length; j++){
          for (var property in conselhos[j]) {
            if (conselhos[j].hasOwnProperty(property)) {
              if(property == "conselho"){
                formItens.push(new FormItens(conselhos[j].conselho.id, "Nome do Conselho", conselhos[j].conselho.tx_nome_conselho, conselhos[j].conselho.ft_conselho, null, "text"));
                formItens.push(new FormItens(2, "Titularidade", conselhos[j].conselho.tx_nome_tipo_participacao, conselhos[j].conselho.ft_tipo_participacao, null, "text"));
                formItens.push(new FormItens(3, "Nome de representante", conselhos[j].conselho.tx_nome_representante_conselho , conselhos[j].conselho.ft_nome_representante_conselho, null, "text"));
                formItens.push(new FormItens(4, "Periodicidade da Reunião", conselhos[j].conselho.tx_periodicidade_reuniao, conselhos[j].conselho.ft_periodicidade_reuniao, null, "text"));
                formItens.push(new FormItens(5, "Data de início de vigência", conselhos[j].conselho.dt_data_inicio_conselho, conselhos[j].conselho.ft_data_inicio_conselho, null, "text", null, null, "date"));
                formItens.push(new FormItens(6, "Data de fim de vigência", conselhos[j].conselho.dt_data_fim_conselho, conselhos[j].conselho.ft_data_fim_conselho, null, "text", null, null, "date"));
              }
            }
          }
        }
        formItens.push(new FormItens(nomeConselho, "Nome do Conselho", null,null, "Insira no nome do conselho de política pública", "text"));
        formItens.push(new FormItens(nomeTipoParticipacao, "Titularidade", null,null, "Diga se a OSCs ocupa vaga de titular ou suplente", "text"));
        formItens.push(new FormItens(nomeRepresentanteConselho, "Nome de representante", null,null, "Insira o nome do representante da OSC no Conselho", "text"));
        formItens.push(new FormItens(periodicidade, "Periodicidade da Reunião", null,null, "Indique de quanto em quanto tempo as reuniões do Conselho ocorrem", "text"));
        formItens.push(new FormItens(dataInicioConselho, "Data de início de vigência", null,null, "Insira a data em que se iniciou a atividade de representante da OSC no Conselho", "text", null, null, "date"));
        formItens.push(new FormItens(dataFimConselho, "Data de fim de vigência", null,null, "Insira a data em que se encerrou a atividade de representante da OSC no Conselho", "text", null, null, "date"));

        Agrupador = React.createFactory(AgrupadorConselhos);
        ReactDOM.render(
          Agrupador(
            {header:null, dados:formItens}
          ), document.getElementById("conselhos")
        );
      };

      addItem('conselhos');

      formItens = [];//
      if (conferencias.length) {
        var conferencia = participacao_social_form.items;
        for (j=0; j<conferencias.length; j++){
          for (var property in conferencias[j]) {
            if (conferencias[j].hasOwnProperty(property)) {
              if(property == "tx_nome_conferencia"){
                formItens.push(new FormItens(property+"-"+conferencias[j].id, "Nome da Conferência", conferencias[j].tx_nome_conferencia, conferencias[j].ft_conferencia, null, "text"));
              }
              if(property == "tx_nome_forma_participacao_conferencia"){
                formItens.push(new FormItens(property+"-"+conferencias[j].id, "Forma de participação na conferência", conferencias[j].tx_nome_forma_participacao_conferencia, conferencias[j].ft_forma_participacao_conferencia, null, "text"));
              }
              if(property == "dt_ano_realizacao"){
                formItens.push(new FormItens(property+"-"+conferencias[j].id , "Ano de realização da conferência", conferencias[j].dt_ano_realizacao.substring(6), conferencias[j].ft_ano_realizacao, null, "text", null, null, "ano"));
              }
            }
          }
        }
        formItens.push(new FormItens(nomeConferencia, "Nome da Conferência", null,null, "Caso a OSC tenha participado, indique aqui o nome da conferência de política pública", "text"));
        formItens.push(new FormItens(nomeFormaParticipacao, "Forma de participação na conferência", null,null, "Indique qual foi a forma de atuação da OSC nesta Conferência", "text"));
        formItens.push(new FormItens(anoRealizacao, "Ano de realização da conferência", null,null, "Indique o ano em que se realizou a Conferência", "text", null, null, "ano"));

        Agrupador = React.createFactory(AgrupadorConferencia);
        ReactDOM.render(
          Agrupador(
            {header:null, dados:formItens}
          ), document.getElementById("conferencias")
        );
      }

      addItem('conferencias');

      formItens = [];//
      if (outras.length) {
        var outra = participacao_social_form.items;
        for (j=0; j<outras.length; j++){
          for (var property in outras[j]) {
            if (outras[j].hasOwnProperty(property)) {
              if(property == "tx_nome_participacao_social_outra"){
                formItens.push(new FormItens(outra[j].id, "Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs", outras[j].tx_nome_participacao_social_outra, outras[j].ft_participacao_social_outra, null, "text"));
              }
            }
          }
        }

        formItens.push(new FormItens(null, "Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs", null , null, "Indique em quais outros espaços de participação a OSC atualmente tem atuação, se houver", "text", null, null, null, null, true));

        FormItemButtons = React.createFactory(FormItemButtons);
        ReactDOM.render(
          FormItemButtons(
            {header:null, dados:formItens}
          ), document.getElementById("outros_part")
        );
      }

      addItem('outros_part');
    }

    function montarFontedeRecursos(json){
      var sections = dadosForm.itemsRecurso();
      recursos_form = dadosForm.tiposRecurso();
      for (var j = 0; j < json.recursos.recursos.length; j++) {
        montarPorAno(json.recursos.recursos[j].dt_ano_recursos_osc, j, json.recursos.recursos[j]);
      }

      function montarPorAno(ano, index, recursos) {
        //console.log(ano);
        $("#recursos").append('<div id='+ano+'></div>');
        if(index !== 0){
          $('#'+ano).toggleClass("hidden");
        }
        items = sections.items;
        // console.log(items);
        Section = React.createFactory(Section);
        ReactDOM.render(
          Section(
            {dados:items, ano: ano}
          ), document.getElementById(ano)
        );

        //geral, seleção do ano
        items = recursos_form.recursos_geral;
        formItens = [];
        for (var i=0; i<items.length; i++){
          formItens.push(new FormItens("ano-"+ano, items[i].label, ano, items[i].fonte, items[i].placeholder, items[i].type, items[i].options, items[i].pretext, items[i].custom_class));
        }
        FormItem = React.createFactory(FormItem);
        ReactDOM.render(
          FormItem(
            {header:null, dados:formItens}
          ), document.getElementById("recursos_geral-"+ano)
        );

        //recursos
        //colocando dados no Array
        recursos_form.recursos_nao_financeiros = mapContentRecursos(recursos.recursos_nao_financeiros, recursos_form.recursos_nao_financeiros);
        recursos_form.recursos_privados = mapContentRecursos(recursos.recursos_privados, recursos_form.recursos_privados);
        recursos_form.recursos_proprios = mapContentRecursos(recursos.recursos_proprios, recursos_form.recursos_proprios);
        recursos_form.recursos_publicos = mapContentRecursos(recursos.recursos_publicos, recursos_form.recursos_publicos);
        var recursosArray=[
          {//proprios
            "items": recursos_form.recursos_proprios,
            "divId": "recursos_proprios"
          },
          {//publicos
            "items": recursos_form.recursos_publicos,
            "divId": "recursos_publicos"
          },
          {//privados
            "items": recursos_form.recursos_privados,
            "divId": "recursos_privados"
          },
          {//nao financeiros
            "items": recursos_form.recursos_nao_financeiros,
            "divId": "recursos_nao_financeiros"
          }
        ];

        for(var k=0; k<recursosArray.length; k++){
          var formItens = [];
          var items = recursosArray[k].items;
          var divId = recursosArray[k].divId;

          for (var i=0; i<items.length; i++){
            formItens.push(new FormItens(items[i].id, items[i].label, items[i].content, items[i].fonte, items[i].placeholder, items[i].type, items[i].options, items[i].pretext));
          }

          FormItem = React.createFactory(FormItem);
          ReactDOM.render(
            FormItem(
              {header:null, dados:formItens}
            ), document.getElementById(divId+"-"+ano)
          );
        }

        // máscara monetária
        $("#recursos_proprios-"+ano).find('input').mask('000.000.000.000.000,00', {reverse: true});
        $("#recursos_proprios-"+ano).find('input').addClass('with-pretext');
        $("#recursos_proprios-"+ano).find('.input-box').prepend('<span class="pretext">R$</span>');

        $("#recursos_publicos-"+ano).find('input').mask('000.000.000.000.000,00', {reverse: true});
        $("#recursos_publicos-"+ano).find('input').addClass('with-pretext');
        $("#recursos_publicos-"+ano).find('.input-box').prepend('<span class="pretext">R$</span>');

        $("#recursos_privados-"+ano).find('input').mask('000.000.000.000.000,00', {reverse: true});
        $("#recursos_privados-"+ano).find('input').addClass('with-pretext');
        $("#recursos_privados-"+ano).find('.input-box').prepend('<span class="pretext">R$</span>');

        $("#recursos_nao_financeiros-"+ano).find('input').mask('000.000.000.000.000,00', {reverse: true});
        $("#recursos_nao_financeiros-"+ano).find('input').addClass('with-pretext');
        $("#recursos_nao_financeiros-"+ano).find('.input-box').prepend('<span class="pretext">R$</span>');
      }

      function mapContentRecursos(obj, array){
        var index = 0;
        for (var k in obj){
          if (obj.hasOwnProperty(k)) {
            var o = obj[k];
            //array[index].id = o.id_recursos_osc;
            array[index].content = o.nr_valor_recursos_osc;
            index++;
          }
        }
        return array;
      }

      // interacoes da selecao de anos
      $(".select-ano").find(".form-control").bind("change", function(){
        var ano = $(this).val();
        var valor = $(this).attr("id").slice(4);
        if($("#"+ano).hasClass('hidden')){
          $("#"+ano).toggleClass('hidden');
          $("#"+ano).siblings().addClass('hidden');
        }
        $(this).find('option[value='+valor+']').prop('selected', true);
      });
    }

    // Lista de Projetos
    function montarProjetos(json){
      var projects_list = validateObject(json.projeto_abreviado) ? json.projeto_abreviado : '0';
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
        newData[i][0] = validateObject(projects_list[i].id_projeto) ? projects_list[i].id_projeto : 1;
        newData[i][1] = validateObject(projects_list[i].tx_nome_projeto) ? projects_list[i].tx_nome_projeto : "";
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
        newData[i][0] = validateObject(projects_list[i].id_projeto) ? projects_list[i].id_projeto : 1;
        newData[i][1] = validateObject(projects_list[i].tx_nome_projeto) ? projects_list[i].tx_nome_projeto : "";
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
    // Projetos
    function carregaProjeto(id){
      var labelMap = dadosForm.labelsProjeto();

      var buttonRemove = {
        "type": "remove",
        "value": "Remover"
      };

      var buttonAdd = {
        "type": "add",
        "value": "Adicionar"
      };

      function InputProjeto(id, content, type, options, removable, buttons, buttonsInLine, placeholder,title){
        this.id = id;
        this.content = content;
        this.type = type;
        this.options = options;
        this.removable = removable;
        this.buttons = buttons;
        this.buttonsInLine = buttonsInLine;
        this.placeholder = placeholder;
        this.title = title;
      }

      function AgrupadorDeInputs(id, containerClass, header, inputs, buttons){
        this.id = id;
        this.containerClass = containerClass;
        this.header = header;
        this.inputs = inputs;
        this.buttons = buttons;
      }

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

      function montarProjeto(json){
        //console.log(json);
        var project = json;
        var agrupadores = [];
        var projectId = project.id_projeto;
        var title = validateObject(project.ft_identificador_projeto_externo)?project.ft_identificador_projeto_externo:null;
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
              var inputProjeto = new InputProjeto(sectionId, value, type, options, removable, buttons, buttonsInLine, placeholder,title);
              var agrupadorInputProjeto = new AgrupadorDeInputs(sectionId, containerClass, header, [inputProjeto], buttons);

              agrupadores.push(agrupadorInputProjeto);
            }
          }
        }
        var area_atuacao_projeto = validateObject(project.area_atuacao) ? project.area_atuacao : [];
        var area_atuacao_outra_projeto = validateObject(project.area_atuacao_outra) ? project.area_atuacao_outra : [];
        var autodeclaradas = [].concat(area_atuacao_projeto).concat(area_atuacao_outra_projeto);

        var localizacao = getTipoProjeto("localizacao_projeto", project.localizacao);
        var fonte = getFonteDeRecursosProjeto(projectId);
        var publicoBeneficiado = getTipoProjeto("publico_beneficiado", project.publico_beneficiado);
        var financiadores = getTipoProjeto("financiadores", project.financiador);
        var autodeclaradas = getTipoProjeto("autodeclaradas", autodeclaradas);
        var parceiras = getTipoProjeto("parceiras", project.parceira);
        var valorMeta = "";
        var idObjetivo = "";
        var multipleInputs = [
          localizacao, publicoBeneficiado, financiadores,
          autodeclaradas, parceiras, fonte
        ];
        //console.log(multipleInputs);
        for (var j = 0; j < multipleInputs.length; j++) {
          if(validateObject(multipleInputs[j].dados)){
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
                    var inputProjeto = new InputProjeto(inputId, value, type, options, removable, buttonsInput, buttonsInLine);
                    inputs.push(inputProjeto);
                  } else if (property === "tx_nome_fonte_recursos_projeto"){
                    options = labelMap[object.id+"_publico"].options;
                    var inputId = "sub-" + sectionId;
                    var inputProjeto = new InputProjeto(inputId, value, type, options, removable, buttonsInput, buttonsInLine);
                    inputs.push(inputProjeto);
                  }
                } else if(property.slice(0,2) === "tx"){
                  value = object.dados[i][property];
                  var inputProjeto = new InputProjeto(inputId, value, type, options, removable, buttonsInput, buttonsInLine);
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
          var agrupadorInputProjeto = new AgrupadorDeInputs(sectionId, containerClass, header, inputs, buttonsAgrupador);
          return agrupadorInputProjeto;
        }

        AgrupadorInputProjeto = React.createFactory(AgrupadorInputProjeto);
        ReactDOM.render(
          AgrupadorInputProjeto(
            {dados:agrupadores}
          ), document.getElementById("projeto-"+id)
        );

        $(".date").datepicker({ dateFormat: 'dd-mm-yy' });
        //$(".ano").datepicker({ dateFormat: 'yy' });

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
        var objetivo_meta = validateObject(project.objetivo_meta) ? project.objetivo_meta : "";
        var objetivo = validateObject(objetivo_meta.tx_nome_objetivo_projeto) ? objetivo_meta.tx_nome_objetivo_projeto : -1;
        var cd_objetivo = validateObject(objetivo_meta.cd_objetivo_projeto) ? objetivo_meta.cd_objetivo_projeto : -1;
        var meta = validateObject(objetivo_meta.tx_nome_meta_projeto) ? objetivo_meta.tx_nome_meta_projeto : -1;
        var cd_meta = validateObject(objetivo_meta.cd_meta_projeto) ? objetivo_meta.cd_meta_projeto : -1;

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
          if (validateObject(data)){
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

    // Salvar
    $("#salvar").click(function(){
      //Dados Gerais
      //$("#dados_gerais").append('<button id="salvar" class="btn-primary btn">Salvar</button>');
      old_dados_gerais = validateObject(old_json.dados_gerais) ? old_json.dados_gerais : {};
      var newJson = old_dados_gerais;
      $("#dados_gerais :input").each(function(){
        var key = $(this).attr("id");
        var value = $(this).val();
        newJson[key] = value;
      });
      newJson["headers"] = authHeader;
      newJson["id_osc"] = idOsc;
      //console.log(newJson);

      $.ajax({
        url: rotas.DadosGerais(idOsc),
        type: 'POST',
        dataType: 'json',
        data: newJson,
        success: function(data) {
          //console.log(data);
        },
        error: function(e) {
          showUnauthorizedUser(e);
          console.log(e);
        }
      });
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

        $.ajax({
          url: rotas.AtualizarAreaAtuacao(idOsc),
          type: 'POST',
          dataType: 'json',
          data: newJson,
          success: function(data) {
            //console.log(data);
          },
          error: function(e) {
            showUnauthorizedUser(e);
            console.log(e);
          }
        });

        //Descricao
        var newJson = {};
        $("#descricao .form-control").each(function(){
          newJson[$(this).attr("id")] = $(this).val();
        });
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        //console.log(newJson);

        $.ajax({
          url: rotas.Descricao(idOsc),
          type: 'POST',
          dataType: 'json',
          data: newJson,
          success: function(data) {
            //console.log(data);
          },
          error: function(e) {
            showUnauthorizedUser(e);
            console.log(e);
          }
        });

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
        console.log(newJson);

        $.ajax({
          url: rotas.Certificado(idOsc),
          type: 'POST',
          dataType: 'json',
          data: newJson,
          success: function(data) {
            //console.log(data);
          },
          error: function(e) {
            showUnauthorizedUser(e);
            console.log(e);
          }
        });

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
          $.ajax({
            url: rotas.ProjectByID(idProjeto),
            type: 'POST',
            dataType: 'json',
            data: newJson,
            success: function(data) {
              //console.log(data);
            },
            error: function(e) {
              showUnauthorizedUser(e);
              console.log(e);
            }
          });
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
          //$(".ano").datepicker({ dateFormat: 'yy' });
        }
      }
      else {
        $(this).parent().remove();
      }
    });
  }

  function montarEnderecoImovel(dadosGerais){
    var endereco = [dadosGerais.tx_endereco, dadosGerais.nr_localizacao,
      dadosGerais.tx_endereco_complemento, dadosGerais.tx_bairro,
      dadosGerais.tx_nome_municipio, dadosGerais.tx_nome_uf, dadosGerais.tx_sigla_uf,
      "CEP: "+dadosGerais.nr_cep];
      var tx_endereco_completo = '';
      for (var i = 0; i < endereco.length; i++) {
        if (endereco[i] !== null){
          tx_endereco_completo += tx_endereco_completo === '' ? '' : ', ';
          tx_endereco_completo += tx_endereco_completo === '' ? 'Endereço não registrado.' : endereco[i];
        }
      }

      return tx_endereco_completo;
    }

    function getFonteDeRecursosProjeto(id){
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
  });
