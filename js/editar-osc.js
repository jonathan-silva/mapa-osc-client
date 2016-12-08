/* jshint ignore:start */
require(["jquery-ui"], function (React) {

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

require(['react', 'rotas', 'jsx!components/Util', 'jsx!components/EditarOSC', 'jquery', 'datatables-responsive'], function (React) {
  require(
    ['componenteFormItem', 'componenteCheckbox', 'componenteSection', 'componenteAgrupador', 'componenteFormItemButtons','componenteAgrupadorInputProjeto','componenteAgrupadorConferencia','componenteAgrupadorConselhos'], function(FormItem, Checkbox, Section, Agrupador, FormItemButtons, AgrupadorInputProjeto, AgrupadorConferencia, AgrupadorConselhos){
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
    //var valoresURL = window.location.href.split('?')[1]!==undefined ? window.location.href.split('?')[1].split('=') : null;
    var valoresURL = window.location.href.split('#')[1]!==undefined ? window.location.href.split('#/')[1].split('=') : null;
    var rotas = new Rotas();
    var urlRota = "";
    var idOsc = "";
    //console.log(rotas);
    if(valoresURL !== null){
      idOsc = valoresURL[0];
      urlRota = rotas.OSCByID_no_project(idOsc);
    }
    // console.log(urlRota);
    // api/osc/no_project/{id}
    $.ajax({
      //url: "http://localhost:8080/api/osc/no_project/"+idOsc,
      url: rotas.OSCByID_no_project(idOsc),
      type: 'GET',
      dataType: 'json',
      data:{flag: "", rota: urlRota},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        montarDadosGerais(data);
        montarAreasDeAtuacao(data);
        montarDescricao(data);
        montarTitulosCertificacoes(data);
        montarRelacoesGovernanca(data);
        montarEspacosParticipacaoSocial(data);
        montarProjetos(data);
      }
    });

    // Dados Gerais
    function montarDadosGerais(json){
      var dadosGerais = json.dados_gerais;
      var dados_form =
      {
        "form_items": [
          {
            "id": "tx_nome_fantasia_osc",
            "label": "Nome Fantasia",
            "content": dadosGerais.tx_nome_fantasia_osc,
            "fonte": dadosGerais.ft_nome_fantasia_osc,
            "placeholder": "Insira o nome como a OSC é conhecida",
            "type": "text"
          },
          {
            "id": "tx_sigla_osc",
            "label": "Sigla da OSC",
            "content": dadosGerais.tx_sigla_osc,
            "fonte": dadosGerais.ft_sigla_osc,
            "placeholder": "Insira aqui a sigla da OSC, se houver",
            "type": "text"
          },
          {
            "id": "tx_endereco_eletronico_sugerido",
            "label": "Endereço eletrônico sugerido para esta página",
            "content": dadosGerais.tx_endereco_eletronico_sugerido,
            "fonte": dadosGerais.ft_endereco_eletronico_sugerido,
            "placeholder": "Insira um nome que deve constar após o endereço mapaosc.ipea.gov.br/[nome da OSC]",
            "pretext": "mapaosc.ipea.gov.br/",
            "type": "text"
          },
          {
            "id": "tx_endereco",
            "label": "Endereço da OSC",
            "content": montarEnderecoImovel(dadosGerais),
            "fonte": dadosGerais.ft_endereco,
            "type": "p"
          },
          {
            "id": "tx_nome_situacao_imovel_osc",
            "label": "Situação do Imóvel",
            "content": dadosGerais.tx_nome_situacao_imovel_osc,
            "fonte": dadosGerais.ft_nome_situacao_imovel_osc,
            "type": "select",
            "options": [
              "Próprio",
              "Alugado",
              "Outro"
            ]
          },
          {
            "id": "tx_nome_responsavel_legal",
            "label": "Responsável Legal",
            "content": dadosGerais.tx_nome_responsavel_legal,
            "fonte": dadosGerais.ft_nome_responsavel_legal,
            "placeholder": "Insira o nome do responsável legal pela OSC",
            "type": "text"
          },
          {
            "id": "dt_inscricao_osc",
            "label": "Ano de inscrição no Cadastro de CNPJ",
            "content": dadosGerais.dt_inscricao_osc,
            "fonte": dadosGerais.ft_inscricao_osc,
            "placeholder": "Insira o ano em que a OSC foi legalmente criada",
            "type": "text"
          },
          {
            "id": "dt_fundacao_osc",
            "label": "Ano de Fundação",
            "content": dadosGerais.dt_fundacao_osc,
            "fonte": dadosGerais.ft_fundacao_osc,
            "placeholder": "Insira o ano de fundação da OSC",
            "type": "text"
          },
          {
            "id": "tx_email",
            "label": "E-mail",
            "content": dadosGerais.tx_email,
            "fonte": dadosGerais.ft_email,
            "placeholder": "Insira o endereço de e-mail da OSC",
            "type": "text"
          },
          {
            "id": "tx_resumo_osc",
            "label": "O que a OSC faz",
            "content": dadosGerais.tx_resumo_osc,
            "fonte": dadosGerais.ft_resumo_osc,
            "placeholder": "Apresente ao público, resumida e objetivamente, o que a OSC faz. Insira os objetivos, as atividades, práticas ou o que achar mais adequado para retratar a OSC",
            "type": "textarea"
          },
          {
            "id": "tx_site",
            "label": "Site",
            "content": dadosGerais.tx_site,
            "fonte": dadosGerais.ft_site,
            "placeholder": "Insira o endereço da página da OSC na internet, se houver",
            "type": "text"
          },
          {
            "id": "tx_telefone",
            "label": "Telefone",
            "content": dadosGerais.tx_telefone,
            "fonte": dadosGerais.ft_telefone,
            "placeholder": "Insira o telefone da OSC",
            "type": "text"
          }
        ]
      };
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
      //Salvar
      // $("#dados_gerais").append('<button id="salvar" class="btn-primary btn">Salvar</button>');
      var newJson = dadosGerais;
      $("#dados_gerais").find("#salvar").click(function(){
       $("#dados_gerais :input").each(function(){
         var key = $(this).attr("id");
         var value = $(this).val();
         newJson[key] = value;
       });
       console.log(idOsc);
       /*
       $.ajax({
       	url: "http://localhost:8383/api/osc/dadosgerais/"+idOsc,
       	type: 'put',
       	dataType: 'json',
       	data: dadosGerais,

         success: function(data) {
           console.log(data);
         },
         error: function(e) {
           console.log(e);
         }
       });*/
      });
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
      var areas_atuacao;
      var area_atuacao_outra;

      if(json.area_atuacao){
        areas_atuacao = json.area_atuacao.area_atuacao;
        area_atuacao_outra = json.area_atuacao.area_atuacao_outra;
      }

      if(areas_atuacao === undefined){
        areas_atuacao = [];
      }
      if(area_atuacao_outra === undefined){
        area_atuacao_outra = [];
      }
      areas_atuacao = areas_atuacao.concat(area_atuacao_outra);
      var macro_area_suggestions = getSuggestions();
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
          subarea_suggestions[i]["value"] = subarea_suggestions[i]["tx_nome_subarea_atuacao"];
        }
        headerPriority = '2';
        headerText = 'Áreas de Atuação';
        formItens = [];
        dados_form =
        {
          "form_items": [
            {
              "id": "macro_area_1",
              "label": "Macro Área 1",
              "content": null,
              "fonte": null,
              "placeholder": "Insira o nome como a OSC é conhecida",
              "type": "text",
              "custom_class": "autocomplete"
            },
            {
              "id": "macro_area_2",
              "label": "Macro Área 2",
              "content": null,
              "fonte": null,
              "placeholder": "Insira o nome como a OSC é conhecida",
              "type": "text",
              "custom_class": "autocomplete"
            }
          ]
        };
        items = dados_form.form_items;
        for (var j=0; j<items.length; j++){
          var content = null;
          var fonte = null;
          if(areas_atuacao.length > j){
            content = areas_atuacao[j].tx_nome_area_atuacao;
            fonte = areas_atuacao[j].ft_nome_area_atuacao;

          }
          formItens.push(new AutocompleteItem(items[j].id, items[j].label, content, fonte, items[j].placeholder, items[j].type, items[j].custom_class, macro_area_suggestions, subarea_suggestions));
        }
        FormItem = React.createFactory(FormItem);
        ReactDOM.render(
          FormItem(
            {header:{priority: headerPriority, text: headerText}, dados:formItens}
          ), document.getElementById("areas_de_atuacao")
        );

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
          $("#areas_de_atuacao .autocomplete").autocomplete({
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
             var id = macro_area_suggestions.indexOf(ui.item);
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
           }
         });

         //Salvar
        //  $("#areas_de_atuacao").append('<button id="salvar" class="btn-primary btn">Salvar</button>');
         $("#areas_de_atuacao").find("#salvar").click(function(){
           var newJson = [];
           $("#areas_de_atuacao .autocomplete").each(function(){
             newJson.push({
               "ft_area_declarada": "Usuário",
               "tx_nome_area_atuacao": $(this).val()
             });
           });
           $("#areas_de_atuacao .checkboxList").children(":not(.hidden)").each(function(index){
             var subareas = [];
             $(this).find("input:checked").each(function(){
               subareas.push($(this).closest("label").text());
             });
            var key = "tx_nome_subarea_atuacao";
            newJson[index][key] = subareas;
           });
           console.log(newJson);
         });
        });
      }
    }

    //Descrição
    function montarDescricao(json){
      var descricao = json.descricao;
      headerPriority = '2';
      headerText = 'Descrição da OSC';
      formItens = [];
      dados_form =
      {
        "form_items": [
          {
            "id": "tx_historico",
            "label": "Histórico",
            "content": descricao.tx_historico,
            "fonte": descricao.ft_historico,
            "placeholder": "De modo resumido e objetivo, diga como surgiu a OSC, quando, onde, por que e por quem foi fundada",
            "type": "textarea"
          },
          {
            "id": "tx_missao_osc",
            "label": "Missão",
            "content": descricao.tx_missao_osc,
            "fonte": descricao.ft_missao_osc,
            "placeholder": "Se houver, apresente qual a missão da OSC",
            "type": "textarea"
          },
          {
            "id": "tx_visao_osc",
            "label": "Visão",
            "content": descricao.tx_visao_osc,
            "fonte": descricao.ft_visao_osc,
            "placeholder": "se houver, apresente a visão da OSC",
            "type": "textarea"
          },
          {
            "id": "tx_finalidades_estatutarias",
            "label": "Finalidades Estatutárias da OSC",
            "content": descricao.tx_finalidades_estatutarias,
            "fonte": descricao.ft_finalidades_estatutarias,
            "placeholder": "Apresente aqui quais são as finalidades estatutárias da OSCs. Você poderá copiar do estatuto, se preferir.",
            "type": "textarea"
          },
          {
            "id": "tx_link_estatuto_osc",
            "label": "Link para o Estatuto da OSC",
            "content": descricao.tx_link_estatuto_osc,
            "fonte": descricao.ft_link_estatuto_osc,
            "placeholder": "Se houver, insira o link que leva ao estatuto da OSC",
            "type": "text"
          }
        ]
      };
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
      // $("#descricao").append('<button id="salvar" class="btn-primary btn">Salvar</button>');
      var newJson = {};
      $("#descricao").find("#salvar").click(function(){
        $("#descricao .form-control").each(function(){
          console.log($(this).val());
          newJson[$(this).attr("id")] = $(this).val();
        });
        console.log(idOsc);
        /*
        $.ajax({
         url: "http://localhost:8383/api/osc/descricao/"+idOsc,
         type: 'put',
         dataType: 'json',
         data: newJson,

          success: function(data) {
            console.log(data);
          },
          error: function(e) {
            console.log(e);
          }
        });*/
      });

    }

    //Títulos e certificações
    function montarTitulosCertificacoes(json){
      var tx_sem_titulos = "Não há registros de títulos ou certificações";
      var certificacoes;
      var utilidade_publica_estadual;
      var utilidade_publica_municipal;

      if(json.certificacao){
        certificacoes = json.certificacao.certificado;
        utilidade_publica_estadual = json.certificacao.utilidade_publica_estadual;
        utilidade_publica_municipal = json.certificacao.utilidade_publica_municipal;
      }

      headerPriority = '2';
      headerText = 'Títulos e certificações';
      formItens = [];
      dados_form =
      {
        "form_items": [
          {
            "id": "tx_utilidade_publica",
            "label": null,
            "content": null,
            "fonte": null,
            "placeholder": "Não constam informações nas bases de dados do Mapa.",
            "type": "checkbox",
            "options": [
              {
                "label":"Utilidade pública estadual",
                "value": "estadual",
                "checked": true
              },
              {
                "label":"Utilidade pública municipal",
                "value": "municipal",
                "checked": false
              }
            ]
          },
          {
            "id": "utilidade_publica_estadual",
            "label": "Insira data de validade para Utilidade pública estadual",
            "content": utilidade_publica_estadual ? utilidade_publica_estadual.dt_data_validade : null,
            "fonte": utilidade_publica_estadual ? utilidade_publica_estadual.ft_utilidade_publica_estadual : null,
            "placeholder": "Não constam informações nas bases de dados do Mapa.",
            "type": "text",
            "hide": true
          },
          {
            "id": "utilidade_publica_municipal",
            "label": "Insira data de validade para Utilidade pública municipal",
            "content": utilidade_publica_municipal ? utilidade_publica_municipal.dt_data_validade : null,
            "fonte": utilidade_publica_municipal ? utilidade_publica_municipal.ft_utilidade_publica_municipal : null,
            "placeholder": "Não constam informações nas bases de dados do Mapa.",
            "type": "text",
            "hide": true
          }
        ]
      };
      if(certificacoes){
        items = certificacoes;
      } else {
        items = [];
      }

      if(items.length > 0){
        for (j=0; j<items.length; j++){
          var dataValidadeText = "Data de Validade: " + items[j].dt_fim_certificado;
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
        formItens.push(new FormItens(items[j].id, items[j].label, items[j].content, items[j].fonte, items[j].placeholder, items[j].type, items[j].options, null, null, items[j].hide));
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

      //Salvar
      // $("#certificacoes").append('<button id="salvar" class="btn-primary btn">Salvar</button>');
      var newJson = [];
      $("#certificacoes").find("#salvar").click(function(){
        $("#certificacoes .form-control").each(function(){
          console.log($(this).val());
          var item = {};
          item[$(this).attr("id")] = {};
          item[$(this).attr("id")].dt_fim_certificado = $(this).val();
          newJson.push(item);
        });
        console.log(newJson);
        /*
        $.ajax({
         url: "http://localhost:8383/api/osc/certificado/"+idOsc,
         type: 'put',
         dataType: 'json',
         data: newJson,

          success: function(data) {
            console.log(data);
          },
          error: function(e) {
            console.log(e);
          }
        });*/
      });
    }

    //Relações de trabalho e governança
    function montarRelacoesGovernanca(json){
      // Governança: Dirigentes
      var tx_sem_relacoes = "Não há registros de relações de trabalho e governança";
      var dirigentes = json.relacoes_trabalho_governanca.governanca;
      var conselheiros = json.relacoes_trabalho_governanca.conselho_fiscal;
      var sections = {
        "items": [
          {
              "id": "relacoes_trabalho",
              "priority": "2",
              "text": "Relações de trabalho e governança",
              "target": "relacoes_trabalho_e_governanca"
          },
          {
            "id": "governanca",
            "priority": "3",
            "text": "Governança da OSC",
            "target": "relacoes_trabalho"
          },
          {
            "id": "dirigentes",
            "priority": "4",
            "text": "Quadro de dirigentes",
            "subsections": []
          },
          {
            "id": "conselheiros",
            "priority": "4",
            "text": "Conselheiros",
            "subsections": []
          },
          {
            "id": "conselho_fiscal",
            "priority": "4",
            "text": "Membros do conselho fiscal",
            "subsections": []
          },
          {
            "id": "trabalhadores",
            "priority": "3",
            "text": "Trabalhadores",
            "target": "relacoes_trabalho",
            "subsections": []
          }
        ]
      };
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

      formItens = [];
      for (j=0; j<dirigentes.length; j++){
        for (var property in dirigentes[j]) {
          if (dirigentes[j].hasOwnProperty(property)) {
            if(property == "tx_nome_dirigente"){
              formItens.push(new FormItens(dirigentes[j].id, "Nome", dirigentes[j].tx_nome_dirigente, dirigentes[j].ft_nome_dirigente, null, "text"));
            }
            if(property == "tx_cargo_dirigente"){
              formItens.push(new FormItens(dirigentes[j].id, "Cargo", dirigentes[j].tx_cargo_dirigente, dirigentes[j].ft_cargo_dirigente, null, "text"));
            }
          }
        }
      }
      formItens.push(new FormItens(null, "Nome", "Insira o nome aqui", null, null, "text"));
      formItens.push(new FormItens(null, "Cargo", "Insira o cargo aqui", null, null, "text"));
      Agrupador = React.createFactory(Agrupador);
      ReactDOM.render(
        Agrupador(
          {dados:formItens}
        ), document.getElementById("dirigentes")
      );
      formItens = [];
      formItens.push(new FormItens(null, "Quantidade de conselheiros", conselheiros.length, null, null, "p"));
      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:null, dados:formItens}
        ), document.getElementById("conselheiros")
      );

      function isTrue(obj){
        if(obj){
          return true;
        }
        else {
          return false;
        }
      }
      addItem('dirigentes');

      // Governança: Conselheiros
      var conselho_fiscal = json.relacoes_trabalho_governanca.conselho_fiscal;

      formItens = [];
      for (var i = 0; i < conselho_fiscal.length; i++) {
        var conselheiro = conselho_fiscal[i];
        formItens.push(new FormItens(conselheiro.id_conselheiro, "Nome", conselheiro.tx_nome_conselheiro, conselheiro.ft_nome_conselheiro, "Insira aqui o nome do conselheiro", "text"));
      }
      formItens.push(new FormItens(null, "Nome", null , null, "Insira aqui o nome do conselheiro", "text", null, null, null, null, true));
      FormItemButtons = React.createFactory(FormItemButtons);
      ReactDOM.render(
        FormItemButtons(
          {header:null, dados:formItens}
        ), document.getElementById("conselho_fiscal")
      );

      addItem('conselho_fiscal');

      //Trabalhadores
      var relacoes_trabalho = json.relacoes_trabalho_governanca.relacoes_trabalho;
      var relacoes_trabalho_outra = json.relacoes_trabalho_governanca.relacoes_trabalho_outra[0];
      dados_form =
      {
        "form_items": [
          {
            "id": "trabalhadores",
            "label": "Total de trabalhadores",
            "content": relacoes_trabalho.nr_trabalhadores,
            "fonte": null,
            "placeholder": "Não constam informações nas bases de dados do Mapa.",
            "type": "p"
          },
          {
            "id": "empregados",
            "label": "Empregados",
            "content": relacoes_trabalho.nr_trabalhadores_vinculo,
            "fonte": relacoes_trabalho.ft_trabalhadores_vinculo,
            "placeholder": "Não constam informações nas bases de dados do Mapa.",
            "type": "p"
          },
          {
            "id": "deficiencia",
            "label": "Trabalhadores com deficiência",
            "content": relacoes_trabalho.nr_trabalhadores_deficiencia,
            "fonte": relacoes_trabalho.ft_trabalhadores_deficiencia,
            "placeholder": "Não constam informações nas bases de dados do Mapa.",
            "type": "p"
          },
          {
            "id": "voluntarios",
            "label": "Trabalhadores voluntários",
            "content": relacoes_trabalho.nr_trabalhadores_voluntarios,
            "fonte": relacoes_trabalho.ft_trabalhadores_voluntarios,
            "placeholder": "Insira o número de voluntários",
            "type": "text"
          },
          {
            "id": "outros",
            "label": "Outros trabalhadores",
            "content": relacoes_trabalho_outra.nr_trabalhadores,
            "fonte": relacoes_trabalho_outra.ft_trabalhadores,
            "placeholder": "Insira o total de trabalhadores com outros tipos de vínculo",
            "type": "text"
          }
        ]
      };
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
      var conselhos = json.participacao_social.conselho;
      var conferencias = json.participacao_social.conferencia;
      var outras = json.participacao_social.outra;
      var participacao_social_form =
      {
      "items": [
          {
            "id": "participacao_social",
            "priority": "2",
            "text": "Espaços de Participação Social",
            "target": "participacao_social"
          },
          {
            "id": "conselhos",
            "priority": "3",
            "text": "Conselhos de Políticas Públicas",
            "target": "participacao_social"
          },/*
          {
            "id": "data_vigencia",
            "priority": "4",
            "text": "Data de Vigência",
            "options": []
          },/*
          {
            "id": "nome_representante",
            "priority": "4",
            "text": "Nome de representante",
            "subsections": []
          },
          {
            "id": "titularidade",
            "priority": "4",
            "text": "Titularidade",
            "type": "select",
            "options": [],
            "subsections": []
          },*/
          {
            "id": "conferencias",
            "priority": "3",
            "text": "Conferências de Políticas Públicas",
            "target": "participacao_social"
          },/*
          {
            "id": "ano_conferencia",
            "priority": "4",
            "text": "Ano de realização da conferência",
            "subsections": []
          },
          {
            "id": "participacao_conferencia",
            "priority": "4",
            "text": "Forma de participação na conferência",
            "type": "select",
            "options": [],
            "subsections": []
          },*/
          {
            "id": "outros_part",
            "priority": "3",
            "text": "Outros espaços de participação social",
            "target": "participacao_social"
          }/*,
          {
            "id": "atuacao",
            "priority": "4",
            "text": "Atuação  em Fóruns, Articulações, Coletivos e Redes de OSCs",
            "type": "text"
          }*/
        ]
      };

      items = participacao_social_form.items;
      Section = React.createFactory(Section);
      ReactDOM.render(
        Section(
          {dados:items}
        ), document.getElementById(items[0].target)
      );/*
      function DadosForm(label, content) {
        this.nome = label;
        this.cargo = content;
      }*/


      formItens = [];//
        if (conferencias.length) {
          //console.log(conferencias);
          var conferencia = participacao_social_form.items;
          for (j=0; j<conferencias.length; j++){
            for (var property in conferencias[j]) {
              //console.log(property);
              if (conferencias[j].hasOwnProperty(property)) {

                if(property == "dt_ano_realizacao"){
                  formItens.push(new FormItens(conferencia[j].id, "Ano de realização da conferência", conferencias[j].dt_ano_realizacao, conferencias[j].ft_ano_realizacao, null, "text"));
                }
                if(property == "tx_nome_conferencia"){
                  formItens.push(new FormItens(conferencia[j].id, "Nome da Conferência", conferencias[j].tx_nome_conferencia, conferencias[j].ft_conferencia, null, "text"));
                }
                if(property == "tx_nome_forma_participacao_conferencia"){
                  formItens.push(new FormItens(conferencia[j].id, "Forma de participação na conferência", conferencias[j].tx_nome_forma_participacao_conferencia, conferencias[j].ft_forma_participacao_conferencia, null, "text"));
                }
             }
            }
          }
          formItens.push(new FormItens(conferencia[j].id, "Nome da Conferência", null,null, null, "text"));
          formItens.push(new FormItens(conferencia[j].id, "Forma de participação na conferência", null,null, null, "text"));
          formItens.push(new FormItens(conferencia[j].id, "Ano de realização da conferência", null,null, null, "text"));

          Agrupador = React.createFactory(AgrupadorConferencia);
          ReactDOM.render(
            Agrupador(
              {header:null, dados:formItens}
            ), document.getElementById("conferencias")
          );
        }

        formItens = [];
        if (conselhos.length) {
          var conselho = participacao_social_form.items;

          for (j=0; j<conselhos.length; j++){
            for (var property in conselhos[j]) {
              if (conselhos[j].hasOwnProperty(property)) {

                if(property == "tx_nome_conselho"){
                  formItens.push(new FormItens(conselho[j].id, "Nome do Conselho", conselhos[j].tx_nome_conselho, conselhos[j].ft_conselho, null, "text"));
                }
                if(property == "tx_nome_tipo_participacao"){
                  formItens.push(new FormItens(conselho[j].id, "Titularidade", conselhos[j].tx_nome_tipo_participacao, conselhos[j].ft_tipo_participacao, null, "text"));
                }
                if(property == "tx_nome_representante_conselho"){
                  formItens.push(new FormItens(conselho[j].id, "Nome de representante", conselhos[j].tx_nome_representante_conselho , conselhos[j].ft_nome_representante_conselho, null, "text"));
                }
                if(property == "tx_periodicidade_reuniao"){
                  formItens.push(new FormItens(conselho[j].id, "Periodicidade da Reunião", conselhos[j].tx_periodicidade_reuniao, conselhos[j].ft_periodicidade_reuniao, null, "text"));
                }
                if(property == "dt_data_inicio_conselho"){
                  formItens.push(new FormItens(conselho[j].id, "Data de início de vigência", conselhos[j].dt_data_inicio_conselho, conselhos[j].ft_data_inicio_conselho, null, "text"));
                }
                if(property == "dt_data_fim_conselho"){
                  formItens.push(new FormItens(conselho[j].id, "Data de fim de vigência", conselhos[j].dt_data_fim_conselho, conselhos[j].ft_data_fim_conselho, null, "text"));
                }
             }
            }
          }
          formItens.push(new FormItens(null, "Nome do Conselho", null,null, null, "text"));
          formItens.push(new FormItens(null, "Titularidade", null,null, null, "text"));
          formItens.push(new FormItens(null, "Nome de representante", null,null, null, "text"));
          formItens.push(new FormItens(null, "Periodicidade da Reunião", null,null, null, "text"));
          formItens.push(new FormItens(null, "Data de início de vigência", null,null, null, "text"));
          formItens.push(new FormItens(null, "Data de fim de vigência", null,null, null, "text"));

          Agrupador = React.createFactory(AgrupadorConselhos);
          ReactDOM.render(
            Agrupador(
              {header:null, dados:formItens}
            ), document.getElementById("conselhos")
          );
        };

       addItem('conselhos');
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

        formItens.push(new FormItens(null, "Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs", null , null, null, "text", null, null, null, null, true));

        FormItemButtons = React.createFactory(FormItemButtons);
        ReactDOM.render(
          FormItemButtons(
            {header:null, dados:formItens}
          ), document.getElementById("outros_part")
        );
      }

      addItem('outros_part');
    }

    // Lista de Projetos
    function montarProjetos(json){
      var projects_list = json.projeto_abreviado;
      var headerProjeto = {
        "id": "lista_projetos",
        "priority": "2",
        "text": "Projetos, atividade e/ou programas"
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
        newData[i][0] = projects_list[i].id_projeto;
        newData[i][1] = projects_list[i].tx_nome_projeto;
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
        autoWidth: true
       });
       $("#table_lista_projetos tr").click(function(){
         var id_projeto = table_lista_projetos.row(this).data()[0];
         var divId = "projeto-" + id_projeto;
         var projetos = $(this).next(".projeto");
         if(projetos.length < 1){
           $(this).after('<div id="' + divId + '" class="projeto col-md-12">');
           carregaProjeto(id_projeto);
         } else {
           var $divDadosProjeto = $(projetos[0]);
           $divDadosProjeto.toggleClass("hidden");
         }
       });
    }

    // Projetos
    function carregaProjeto(id){
      var labelMap = {
        "tx_nome_projeto": {
          "header": "Nome do projeto, atividade ou programa",
          "containerClass": "col-md-12",
          "removable": false,
          "type": "text",
          "options": null
        },
        "tx_nome_status_projeto": {
          "header": "Status",
          "containerClass": "col-md-3",
          "removable": false,
          "type": "select",
          "options": ["ABC", "BCA"]
        },
        "dt_data_inicio_projeto": {
          "header": "Data de Início",
          "containerClass": "col-md-3",
          "removable": false,
          "type": "text",
          "options": null
        },
        "dt_data_fim_projeto": {
          "header": "Data de Fim",
          "containerClass": "col-md-3",
          "removable": false,
          "type": "text",
          "options": null
        },
        "tx_link_projeto": {
          "header": "Link",
          "containerClass": "col-md-3",
          "removable": false,
          "type": "text",
          "options": null
        },
        "nr_total_beneficiarios": {
          "header": "Total de Beneficiários",
          "containerClass": "col-md-3",
          "removable": false,
          "type": "text",
          "options": null
        },
        "nr_valor_total_projeto": {
          "header": "Valor Total",
          "containerClass": "col-md-3",
          "removable": false,
          "type": "text",
          "options": null
        },
        "tx_valor_captado_projeto": {
          "header": "Valor Captado",
          "containerClass": "col-md-3",
          "removable": false,
          "type": "text",
          "options": null
        },
        "fonte_de_recursos": {
          "header": "Fonte de Recursos",
          "containerClass": "col-md-3",
          "removable": false,
          "type": "select",
          "options": [
            "Público", "Privado", "Próprio"
          ]
        },
        "fonte_de_recursos_publico": {
          "header": "Fonte de Recursos Públicos",
          "containerClass": "col-md-3",
          "removable": false,
          "type": "select",
          "options": [
            "Municipal", "Federal", "Estadual"
          ]
        },
        "financiadores": {
          "header": "Financiadores do Projeto",
          "containerClass": "col-md-3",
          "removable": true,
          "type": "text",
          "options": null
        },
        "autodeclaradas": {
          "header": "Área de atuação do projeto, atividade ou programa",
          "containerClass": "col-md-3",
          "removable": true,
          "type": "text",
          "options": null
        },
        "publico_beneficiado": {
          "header": "Público Beneficiado",
          "containerClass": "col-md-3",
          "removable": true,
          "type": "text",
          "options": null
        },
        "tx_nome_abrangencia_projeto": {
          "header": "Abrangência de atuação",
          "containerClass": "col-md-3",
          "removable": false,
          "type": "select",
          "options": [
            "Municipal", "Estadual", "Regional", "Nacional"
          ]
        },
        "localizacao_projeto": {
          "header": "Local de execução do projeto, atividade ou programa",
          "containerClass": "col-md-3",
          "removable": true,
          "type": "text",
          "options": null
        },
        "parceiras": {
          "header": "OSCs Parceiras",
          "containerClass": "col-md-6",
          "removable": true,
          "type": "text",
          "options": null
        },
        "tx_nome_zona_atuacao": {
          "header": "Zona de Atuação",
          "containerClass": "col-md-3",
          "removable": false,
          "type": "select",
          "options": [
            "Rural", "Urbana"
          ]
        },
        "tx_metodologia_monitoramento": {
          "header": "Metodologia de Monitoramento e Avaliação do Projeto, atividade e/ou programa",
          "containerClass": "col-md-12",
          "removable": false,
          "type": "textarea",
          "options": null
        },
        "tx_descricao_projeto": {
          "header": "Descrição do Projeto, atividade e/ou programa",
          "containerClass": "col-md-12",
          "removable": false,
          "type": "textarea",
          "options": null
        },
        "objetivos": {
          "header": "Objetivos de desenvolvimento do milênio",
          "containerClass": "col-md-12",
          "removable": false,
          "type": "select",
          "options": null
        },
        "objetivos_metas": {
          "header": null,
          "containerClass": null,
          "removable": false,
          "type": "select",
          "options": null
        }
      };

      var buttonRemove = {
        "type": "remove",
        "value": "Remover"
      };

      var buttonAdd = {
        "type": "add",
        "value": "Adicionar"
      };

      function InputProjeto(id, content, type, options, removable, buttons, buttonsInLine){
        this.id = id;
        this.content = content;
        this.type = type;
        this.options = options;
        this.removable = removable;
        this.buttons = buttons;
        this.buttonsInLine = buttonsInLine;
      }

      function AgrupadorDeInputs(id, containerClass, header, inputs, buttons){
        this.id = id;
        this.containerClass = containerClass;
        this.header = header;
        this.inputs = inputs;
        this.buttons = buttons;
      }

      // rotas.ProjectByID(id)
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
      function montarProjeto(json){
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
            var buttons = null;
            var buttonsInLine = false;

            if(value.constructor !== Array){
              var inputProjeto = new InputProjeto(sectionId, value, type, options, removable, buttons, buttonsInLine);

              var agrupadorInputProjeto = new AgrupadorDeInputs(sectionId, containerClass, header, [inputProjeto], buttons);
              agrupadores.push(agrupadorInputProjeto);
            }
          }
        }
        var autodeclaradas = project.area_atuacao.concat(project.area_atuacao_outra);

        var localizacao = getLocalizacaoProjeto(projectId, project.localizacao);
        var fonte = getFonteDeRecursosProjeto(projectId);
        var publicoBeneficiado = getPublicoBeneficiadoProjeto(projectId, project.publico_beneficiado);
        var financiadores = getFinanciadoresProjeto(projectId, project.financiador);
        var autodeclaradas = getAutodeclaradasProjeto(projectId, autodeclaradas);
        var parceiras = getParceirasProjeto(projectId, project.parceira);
        var valorMeta = "";
        var idObjetivo = "";
        var multipleInputs = [
          localizacao, publicoBeneficiado, financiadores,
          autodeclaradas, parceiras, fonte
        ];
        for (var j = 0; j < multipleInputs.length; j++) {
          var agrupador = createAgrupadorMultipleInputs(multipleInputs[j]);
          agrupadores.push(agrupador);
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

        //metas e objetivos
        var objetivo = project.objetivo_meta.tx_nome_objetivo_projeto;
        var cd_objetivo = project.objetivo_meta.cd_objetivo_projeto;
        var meta = project.objetivo_meta.tx_nome_meta_projeto;
        var cd_meta = project.objetivo_meta.cd_meta_projeto;

        var $divProjeto = $('#projeto-'+id);
        $divProjeto.append('<div class="col-md-12" id="objetivos-metas"</div>');
        var $divObjetivosMetasProjeto = $divProjeto.find("#objetivos-metas");
        $divObjetivosMetasProjeto.append('<div id="objetivos"></div>');
        $divObjetivosProjeto = $divObjetivosMetasProjeto.find('#objetivos');
        $divObjetivosProjeto.append('<div class="header">Objetivos</div>');
        $divObjetivosProjeto.append('<div class="form-group"><div id="objetivos"><select class="form-control"></select></div></div>');
        $divObjetivosMetasProjeto.append('<div id="metas-'+cd_objetivo+'" class="metas"></div>');
        var $divMetasProjeto = $divObjetivosMetasProjeto.find("#metas-"+cd_objetivo);
        $divMetasProjeto.append('<div class="header">Metas</div>');
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
              montarMetas(data);
            }
          });
        }
        loadMetas(cd_objetivo);
        function montarMetas(data){
          console.log(data);
          var options = data;
          for (var i = 0; i < options.length; i++) {
            if(options[i].cd_meta_projeto == cd_meta){
              $('#selectable-'+cd_objetivo).append('<li class="ui-widget-content ui-selected">' + options[i].tx_nome_meta_projeto + '</li>');
            } else {
              $('#selectable-'+cd_objetivo).append('<li class="ui-widget-content">' + options[i].tx_nome_meta_projeto + '</li>');
            }
          }
        }
        $('#selectable-'+cd_objetivo).selectable();

         $('#objetivos').find('select').on('change', function(){
           $(this).find('option:selected').each(function(){
             $(".metas").each(function(){
               if(!$(this).hasClass('hidden')){
                 $(this).toggleClass('hidden');
               }
             });
             cd_objetivo = $(this).attr('id');
             $(this).removeClass("ui-selected");
             $divObjetivosMetasProjeto.append('<div id="metas-'+cd_objetivo+'" class="metas"></div>');
             $('#metas-'+cd_objetivo).append('<div class="header">Metas</div>');
             $('#metas-'+cd_objetivo).append('<ol id="selectable-'+cd_objetivo +'" class="selectable"></ol>');
             if($('#metas-'+cd_objetivo).hasClass('hidden')){
               $('#metas-'+cd_objetivo).toggleClass('hidden');
             }

             loadMetas(cd_objetivo);
              $('#selectable-'+cd_objetivo).selectable();
           });
         });
      }
    }

    // Salvar
    $("#salvar").click(function(){

      var newJson = [];
      $(".projeto").each(function(){
        var str = $(this).attr("id");
        var idProjeto = str.substring(str.indexOf("-") + 1);
        console.log(str);
        $(this).find(".form-group").each(function(){
          if($(this).children().length <= 1){
            $child = $(this).children(':first');
            var key = $child.attr("id");
            var value = $child.find(".form-control").val();
            if(key)
            newJson[key] = value;
          } else {
            var children = $(this).children();
            var key = $(children[0]).attr("id");
            newJson[key] = [];
            for (var i = 0; i < children.length; i++) {
              var $child = $(children[i]);
              newJson[key].push($child.find(":input").val());
            }
          }
        });
        newJson["meta"] = $(".metas :visible").find(".ui-selected").text();
        $.ajax({
         url: rotas.ProjectByID(idProjeto),
         type: 'put',
         dataType: 'json',
         data: dadosGerais,

          success: function(data) {
            console.log(data);
          },
          error: function(e) {
            console.log(e);
          }
        });
      });
      console.log(newJson);
    });
  });
});

function getProject(id){
  var project = {
    "id_projeto": 1,
    "tx_identificador_projeto_externo": null,
    "ft_identificador_projeto_externo": null,
    "tx_nome_projeto": "Projeto Teste",
    "ft_nome_projeto": "Usuário",
    "cd_status_projeto": 2,
    "tx_nome_status_projeto": "Em Execução",
    "ft_status_projeto": "Usuário",
    "dt_data_inicio_projeto": "2016-11-11",
    "ft_data_inicio_projeto": "Usuário",
    "dt_data_fim_projeto": "2017-11-11",
    "ft_data_fim_projeto": "Usuário",
    "tx_link_projeto": "www.orgteste.com/projeto/teste",
    "ft_link_projeto": "Usuário",
    "nr_total_beneficiarios": 1000,
    "ft_total_beneficiarios": "Usuário",
    "nr_valor_total_projeto": "100000",
    "ft_valor_total_projeto": "MINC/SALICWEB",
    "nr_valor_captado_projeto": "100000",
    "ft_valor_captado_projeto": "Usuário",
    "tx_metodologia_monitoramento": "Networking giant Cisco’s latest Global Cloud Index shines a light on how the growth of off-premise services is affecting the datacentre market.",
    "ft_metodologia_monitoramento": "Usuário",
    "tx_descricao_projeto": "EDR can mitigate threats before they impact your organization. Discover 5 key factors to look for when researching EDR to best determine which solutions are most proactive in helping to prevent attacks. ",
    "ft_descricao_projeto": "Usuário",
    "cd_abrangencia_projeto": 2,
    "tx_nome_abrangencia_projeto": "Estadual",
    "ft_abrangencia_projeto": "Usuário",
    "cd_zona_atuacao_projeto": 1,
    "tx_nome_zona_atuacao": "Urbana",
    "ft_zona_atuacao_projeto": "Usuário",
    "publico_beneficiado": [
      {
        "id_publico_beneficiado": 1,
        "tx_nome_publico_beneficiado": "Crianças",
        "nr_estimativa_pessoas_atendidas": 1000,
        "ft_publico_beneficiado_projeto": "Usuário"
      }
    ],
    "area_atuacao": [
      {
        "cd_area_atuacao_projeto": 1,
        "tx_nome_area_atuacao_projeto": "Educação Básica",
        "ft_area_atuacao_projeto": "Usuário"
      }
    ],
    "area_atuacao_outra": [
      {
        "id_area_atuacao_outra_projeto": 1,
        "tx_nome_area_atuacao_outra_projeto": "Educação Alternativa",
        "ft_area_atuacao_outra_projeto": "Usuário"
      }
    ],
    "localizacao": [
      {
        "id_regiao_localizacao_projeto": 1,
        "tx_nome_regiao_localizacao_projeto": "São Paulo",
        "ft_nome_regiao_localizacao_projeto": null,
        "bo_localizacao_prioritaria": false,
        "ft_localizacao_prioritaria": null
      }
    ],
    "parceira": [
      {
        "id_osc": 2,
        "tx_nome_osc_parceira_projeto": "Nome da osc",
        "ft_osc_parceira_projeto": null
      },
      {
        "id_osc": 3,
        "tx_nome_osc_parceira_projeto": "Nome da osc X",
        "ft_osc_parceira_projeto": null
      }
    ],
    "financiador": [
      {
        "id_financiador_projeto": 1,
        "tx_nome_financiador": "João",
        "ft_nome_financiador": null
      },
      {
        "id_financiador_projeto": 2,
        "tx_nome_financiador": "José",
        "ft_nome_financiador": null
      }
    ],
    "objetivo_meta": {
      "id_objetivo_projeto": 1,
      "cd_objetivo_projeto": 1,
      "tx_nome_objetivo_projeto": "Acabar com a pobreza em todas as suas formas, em todos os lugares",
      "cd_meta_projeto": 1,
      "tx_nome_meta_projeto": "Até 2030, erradicar a pobreza extrema para todas as pessoas em todos os lugares, atualmente medida como pessoas vivendo com menos de US$ 1,25 por dia",
      "ft_objetivo_projeto": "Usuário"
    },
    "recursos": {
      "id_fonte_recursos_projeto": 1,
      "cd_origem_fonte_recursos_projeto": 2,
      "tx_nome_origem_fonte_recursos_projeto": "Público",
      "cd_fonte_recursos_projeto": "",
      "tx_nome_fonte_recursos_projeto": "Estadual",
      "ft_fonte_recursos_projeto": ""
    }
  };
  return project;
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
function getLocalizacaoProjeto(id, dados){
  var localizacao = {
    "localizacao_projeto": dados
  };
  var key = Object.keys(localizacao)[0];
  var objLocalizacao = {
    "id": key,
    "dados": localizacao[key]
  };
  return objLocalizacao;
}
function getPublicoBeneficiadoProjeto(id, dados){
  var publico_beneficiado = {
    "publico_beneficiado": dados
  };
  var key = Object.keys(publico_beneficiado)[0];
  var objBeneficiado = {
    "id": key,
    "dados": publico_beneficiado[key]
  };
  return objBeneficiado;
}
function getFinanciadoresProjeto(id, dados){
  var financiadores = {
    "financiadores": dados
  };
  var key = Object.keys(financiadores)[0];
  var objFinanciadores = {
    "id": key,
    "dados": financiadores[key]
  };
  return objFinanciadores;
}
function getAutodeclaradasProjeto(id, dados){
  var autodeclaradas = {
    "autodeclaradas": dados
  };
  var key = Object.keys(autodeclaradas)[0];
  var objAutodeclaradas = {
    "id": key,
    "dados": autodeclaradas[key]
  };
  return objAutodeclaradas;
}
function getParceirasProjeto(id, dados){
  var parceiras = {
    "parceiras": dados
  };
  var key = Object.keys(parceiras)[0];
  var objParceiras = {
    "id": key,
    "dados": parceiras[key]
  };
  return objParceiras;
}
function validateObject(obj){
  if(obj === null){
    return false;
  }
  if(Object.keys(obj).length === 0 && obj.constructor === Object){
    return false;
  }
  return true;
}
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
      }
    }
    else {
      $(this).parent().remove();
    }
 });
}
function getSuggestions(){
  var suggestions = [
    {
      "cd_area_atuacao": 1,
      "tx_nome_area_atuacao": "Habitação"
    },
    {
      "cd_area_atuacao": 2,
      "tx_nome_area_atuacao": "Saúde"
    },
    {
      "cd_area_atuacao": 3,
      "tx_nome_area_atuacao": "Cultura e recreação"
    },
    {
      "cd_area_atuacao": 4,
      "tx_nome_area_atuacao": "Educação"
    },
    {
      "cd_area_atuacao": 5,
      "tx_nome_area_atuacao": "Assistência social"
    },
    {
      "cd_area_atuacao": 6,
      "tx_nome_area_atuacao": "Religião"
    },
    {
      "cd_area_atuacao": 7,
      "tx_nome_area_atuacao": "Associações patronais, profissionais e de produtores rurais"
    },
    {
      "cd_area_atuacao": 8,
      "tx_nome_area_atuacao": "Meio ambiente e proteção animal"
    },
    {
      "cd_area_atuacao": 9,
      "tx_nome_area_atuacao": "Desenvolvimento e defesa de direitos"
    }
  ];
  return suggestions;
}
function montarEnderecoImovel(dadosGerais){
  var endereco = [dadosGerais.tx_endereco, dadosGerais.nr_localizacao,
    dadosGerais.tx_endereco_complemento, dadosGerais.tx_bairro,
    dadosGerais.tx_nome_municipio, dadosGerais.tx_nome_uf, dadosGerais.tx_sigla_uf,
    dadosGerais.nr_cep];
  var tx_endereco_completo = '';
  for (var i = 0; i < endereco.length; i++) {
    if (endereco[i] !== null){
      tx_endereco_completo += (tx_endereco_completo === '' ? '' : ', ');
      tx_endereco_completo += endereco[i];
    }
  }
  if (tx_endereco_completo === '') {
    tx_endereco_completo = 'Endereço não registrado.';
  }
  return tx_endereco_completo;
}
