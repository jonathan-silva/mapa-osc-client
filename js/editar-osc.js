require(["jquery-ui", "datatables-responsive"], function (React) {

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
});

require(['react', 'jsx!components/Util', 'jsx!components/EditarOSC'], function (React) {

  require(
    ['componenteFormItem', 'componenteCheckbox', 'componenteSection', 'componenteAgrupador', 'componenteFormItemButtons','componenteAgrupadorInputProjeto'], function(FormItem, Checkbox, Section, Agrupador, FormItemButtons, AgrupadorInputProjeto){
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
    var result = {
        "cabecalho": {
          "id_osc": 1,
          "cd_identificador_osc": "1234567891234",
          "ft_identificador_osc": "Rais",
          "tx_razao_social_osc": "Organização Teste",
          "ft_razao_social_osc": "Rais",
          "tx_subclasse_atividade_economica": null,
          "ft_atividade_economica_osc": null,
          "tx_natureza_juridica": null,
          "ft_natureza_juridica_osc": null,
          "im_logo": null,
          "ft_logo": null
        },
        "dados_gerais": {
          "id_osc": 1,
          "cd_identificador_osc": "1234567891234",
          "ft_identificador_osc": "Rais",
          "tx_razao_social_osc": "Organização Teste",
          "ft_razao_social_osc": "Rais",
          "tx_nome_fantasia_osc": "Teste",
          "ft_nome_fantasia_osc": "Rais",
          "im_logo": null,
          "ft_logo": null,
          "tx_atividade_economica_osc": null,
          "ft_atividade_economica_osc": null,
          "tx_natureza_juridica_osc": null,
          "ft_natureza_juridica_osc": null,
          "tx_sigla_osc": null,
          "ft_sigla_osc": null,
          "tx_url_osc": null,
          "ft_url_osc": null,
          "dt_inscricao_osc": "09/09/1990",
          "ft_inscricao_osc": null,
          "dt_fundacao_osc": "05/08/1990",
          "ft_fundacao_osc": null,
          "tx_nome_responsavel_legal": null,
          "ft_nome_responsavel_legal": null,
          "tx_resumo_osc": null,
          "ft_resumo_osc": null,
          "tx_endereco_eletronico_sugerido": "endereço sugerido",
          "ft_endereco_eletronico_sugerido": null,
          "tx_endereco": "Rua joao joaquim",
          "ft_endereco": "Rais",
          "nr_localizacao": null,
          "ft_localizacao": null,
          "tx_endereco_complemento": null,
          "ft_endereco_complemento": null,
          "tx_bairro": "Tijuca",
          "ft_bairro": null,
          "tx_municipio": null,
          "ft_municipio": null,
          "tx_uf": null,
          "ft_uf": null,
          "nm_cep": null,
          "ft_cep": null,
          "tx_email": "email@exemplo.com",
          "ft_email": "Rais",
          "tx_site": "site.com.br",
          "ft_site": null,
          "tx_telefone": null,
          "ft_telefone": null,
          "tx_nome_situacao_imovel_osc": "Alugado",
          "ft_nome_situacao_imovel_osc": null
        },
        "descricao": {
          "id_osc": 1,
          "tx_como_surgiu": null,
          "ft_como_surgiu": null,
          "tx_missao_osc": null,
          "ft_missao_osc": null,
          "tx_visao_osc": "visao teste",
          "ft_visao_osc": null,
          "tx_finalidades_estatutarias": null,
          "ft_finalidades_estatutarias": null,
          "tx_link_estatuto_osc": null,
          "ft_link_estatuto_osc": null
        },
        "areas_atuacao": [
          {
            "id_osc": 1,
            "tx_nome_macro_area_fasfil": "Macro 1",
            "tx_nome_area_fasfil": "nome fasfil 1",
            "ft_area_atuacao_fasfil": null,
            "areas_autodeclaradas": [
              {
                "id_osc": 1,
                "tx_nome_area_atuacao_declarada": "autodeclarada 1",
                "ft_area_declarada": null
              },
              {
                "id_osc": 1,
                "tx_nome_area_atuacao_declarada": "autodeclarada 2",
                "ft_area_declarada": null
              },
              {
                "id_osc": 1,
                "tx_nome_area_atuacao_declarada": "autodeclarada 3",
                "ft_area_declarada": null
              }
            ]
          },
          {
            "id_osc": 1,
            "tx_nome_macro_area_fasfil": "Macro 2",
            "tx_nome_area_fasfil": "nome fasfil 2",
            "ft_area_atuacao_fasfil": null,
            "areas_autodeclaradas": [
              {
                "id_osc": 1,
                "tx_nome_area_atuacao_declarada": "autodeclarada 1",
                "ft_area_declarada": null
              },
              {
                "id_osc": 1,
                "tx_nome_area_atuacao_declarada": "autodeclarada 2",
                "ft_area_declarada": null
              },
              {
                "id_osc": 1,
                "tx_nome_area_atuacao_declarada": "autodeclarada 3",
                "ft_area_declarada": null
              }
            ]
          }
        ],
        "certificacoes": [
          {
            "id_osc": 1,
            "nm_certificado": "cert1",
            "dt_inicio_certificado": "05/02/2006",
            "dt_fim_certificado": "05/02/2016",
            "ft_certificado": "Possui"
          },
          {
            "id_osc": 1,
            "nm_certificado": "cert2",
            "dt_inicio_certificado": "05/02/2006",
            "dt_fim_certificado": "12/04/2020",
            "ft_certificado": "Possui"
          }
        ],
        "relacoes_trabalho": {
          "id_osc": 1,
          "nr_trabalhadores": 21,
        	"nr_trabalhadores_vinculo": 5,
        	"ft_trabalhadores_vinculo": null,
        	"nr_trabalhadores_deficiencia": 1,
        	"ft_trabalhadores_deficiencia": null,
        	"nr_trabalhadores_voluntarios": 15,
        	"ft_trabalhadores_voluntarios": null,
          "nr_trabalhadores_outros": null,
          "ft_trabalhadores_outros": null,
        },
        "dirigentes": [
          {
            "id_osc": 1,
            "tx_cargo_dirigente": "cargo 1",
            "ft_cargo_dirigente": null,
            "tx_nome_dirigente": "nome 1",
            "ft_nome_dirigente": null
          },
          {
            "id_osc": 1,
            "tx_cargo_dirigente": "cargo 2",
            "ft_cargo_dirigente": null,
            "tx_nome_dirigente": "nome 2",
            "ft_nome_dirigente": null
          }
        ],
        "conselheiros": [
          {
            "id_osc": 1,
            "tx_quantidade": 30
          }
        ],
        "conselho_fiscal": [
          {
            "id_conselheiro": 1,
            "tx_nome_conselheiro": "nome 1",
            "ft_nome_conselheiro": null,
            "tx_cargo_conselheiro": "cargo 1",
            "ft_cargo_conselheiro": null
          },
          {
            "id_conselheiro": 2,
            "tx_nome_conselheiro": "nome 2",
            "ft_nome_conselheiro": null,
            "tx_cargo_conselheiro": "cargo 2",
            "ft_cargo_conselheiro": null
          },
          {
            "id_conselheiro": 3,
            "tx_nome_conselheiro": "nome 3",
            "ft_nome_conselheiro": null,
            "tx_cargo_conselheiro": "cargo 3",
            "ft_cargo_conselheiro": null
          }
        ],
        "projetos": [
          {
            "id_osc": 1,
            "id_projeto": 1,
            "tx_identificador_projeto_externo": null,
            "ft_identificador_projeto_externo": null,
            "tx_nome_projeto": "test1",
            "ft_nome_projeto": null,
            "tx_nome_status_projeto": "status 2",
            "ft_status_projeto": null,
            "dt_data_inicio_projeto": "09/05/2005",
            "ft_data_inicio_projeto": null,
            "dt_data_fim_projeto": "09/05/2009",
            "ft_data_fim_projeto": null,
            "tx_link_projeto": null,
            "ft_link_projeto": null,
            "nr_total_beneficiarios": null,
            "ft_total_beneficiarios": null,
            "nr_valor_total_projeto": null,
            "ft_valor_total_projeto": null,
            "tx_valor_captado_projeto": 50,
            "ft_valor_captado_projeto": null,
            "tx_metodologia_monitoramento": null,
            "ft_metodologia_monitoramento": null,
            "tx_descricao_projeto": null,
            "ft_descricao_projeto": null,
            "tx_nome_abrangencia_projeto": null,
            "ft_nome_abrangencia_projeto": null,
            "tx_nome_zona_atuacao": null,
            "ft_nome_zona_atuacao": null
          },
          {
            "id_osc": 1,
            "id_projeto": 2,
            "tx_identificador_projeto_externo": null,
            "ft_identificador_projeto_externo": null,
            "tx_nome_projeto": "test2",
            "ft_nome_projeto": null,
            "tx_nome_status_projeto": "status 3",
            "ft_status_projeto": null,
            "dt_data_inicio_projeto": "19/06/2010",
            "ft_data_inicio_projeto": null,
            "dt_data_fim_projeto": "19/06/2015",
            "ft_data_fim_projeto": null,
            "tx_link_projeto": null,
            "ft_link_projeto": null,
            "nr_total_beneficiarios": null,
            "ft_total_beneficiarios": null,
            "nr_valor_total_projeto": 1000,
            "ft_valor_total_projeto": null,
            "tx_valor_captado_projeto": 800,
            "ft_valor_captado_projeto": null,
            "tx_metodologia_monitoramento": null,
            "ft_metodologia_monitoramento": null,
            "tx_descricao_projeto": null,
            "ft_descricao_projeto": null,
            "tx_nome_abrangencia_projeto": null,
            "ft_nome_abrangencia_projeto": null,
            "tx_nome_zona_atuacao": null,
            "ft_nome_zona_atuacao": null,
            "localizacao_projeto": [
              {
                "id_regiao_localizacao_projeto": 2,
                "tx_nome_regiao_localizacao_projeto": "sp",
                "ft_nome_regiao_localizacao_projeto": null
              }
            ],
            "publico_beneficiado": [
              {
                "id_publico_beneficiado": 2,
                "tx_nome_publico_beneficiado": "sp",
                "ft_nome_publico_beneficiado": null
              }
            ],
            "financiadores": [
              {
                "id_financiador_projeto": 2,
                "tx_nome_financiador": "João",
                "ft_nome_financiador": null
              }
            ],
            "autodeclaradas": [
              {
                "vw_osc_area_atuacao_outra": 2,
                "tx_nome_area_atuacao_outra": "João",
                "ft_area_atuacao_outra": null
              }
            ],
            "parceiras": [
              {
                "id_osc": 2,
                "tx_nome_osc_parceira_projeto": "Nome da osc parceira 2",
                "id_projeto": 2,
                "ft_osc_parceira_projeto": null
              }
            ]
          }
        ],
        "lista_projetos":[
          {
            "id": 1,
            "nome": "test1"
          },
          {
            "id": 2,
            "nome": "test2"
          }
        ],
        "recursos": {
        	"id_osc": 1,
        	"nr_valor_total": 10000.00,
        	"nr_valor_federal": 10000.00,
        	"nr_valor_estadual": 0.0,
        	"nr_valor_municipal": 0.0,
        	"nr_valor_privado": 0.0,
        	"nr_valor_proprio": 0.0,
        	"tx_link_relatorio_auditoria": null,
        	"ft_link_relatorio_auditoria": null,
        	"tx_link_demonstracao_contabil": null,
        	"ft_link_demonstracao_contabil": null,
        	"conselho_contabil": [
        		{
        			"id_conselheiro": 1,
        			"tx_nome_conselheiro": "Conselheiro Teste",
        			"ft_nome_conselheiro": "Usuário Teste",
        			"tx_cargo_conselheiro": "Diretor",
        			"ft_cargo_conselheiro": "Usuário Teste"
        		},
            {
        			"id_conselheiro": 2,
        			"tx_nome_conselheiro": "Conselheiro Teste 2",
        			"ft_nome_conselheiro": "Usuário Teste 2",
        			"tx_cargo_conselheiro": "Diretor 2",
        			"ft_cargo_conselheiro": "Usuário Teste 2"
        		}
        	]
        },
        "participacao_social": {
        	"id_osc": 1,
        	"conferencia": [
        		{
        			"tx_nome_conferencia": "conferencia teste 1",
        			"ft_nome_conferencia": null,
        			"dt_data_inicio_conferencia": "05/05/2005",
        			"ft_data_inicio_conferencia": null,
        			"dt_data_fim_conferencia": "10/05/2005",
        			"ft_data_fim_conferencia": null
        		},
            {
        			"tx_nome_conferencia": "conferencia teste 2",
        			"ft_nome_conferencia": null,
        			"dt_data_inicio_conferencia": "15/01/2008",
        			"ft_data_inicio_conferencia": null,
        			"dt_data_fim_conferencia": "25/01/2008",
        			"ft_data_fim_conferencia": null
        		}
        	],
        	"conselho": [
        		{
        			"nm_conselho": "nome conselho 1",
        			"ft_conselho": null,
        			"nr_numero_assentos": 30,
        			"ft_numero_assentos": null,
        			"tx_periodicidade_reuniao": "Mensal",
        			"ft_periodicidade_reuniao": null
        		},
            {
        			"nm_conselho": "nome conselho 2",
        			"ft_conselho": null,
        			"nr_numero_assentos": 50,
        			"ft_numero_assentos": null,
        			"tx_periodicidade_reuniao": "Semestral",
        			"ft_periodicidade_reuniao": null
        		}
        	],
        	"outra": [
        		{
        			"tx_nome_outra_participacao_social": "nome outra 1",
        			"ft_nome_outra_participacao_social": null,
        			"tx_tipo_outra_participacao_social": "tipo outra 1",
        			"ft_tipo_outra_participacao_social": null,
        			"dt_data_ingresso_outra_participacao_social": "02/03/2015",
        			"ft_data_ingresso_outra_participacao_social": null
        		},
            {
        			"tx_nome_outra_participacao_social": "nome outra 2",
        			"ft_nome_outra_participacao_social": null,
        			"tx_tipo_outra_participacao_social": "tipo outra 2",
        			"ft_tipo_outra_participacao_social": null,
        			"dt_data_ingresso_outra_participacao_social": "07/10/2016",
        			"ft_data_ingresso_outra_participacao_social": null
        		}
        	]
        }
      };

    //Dados Gerais

    var dadosGerais = result.dados_gerais;
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
    //Áreas de atuação
    function AutocompleteItem(id, label, content, fonte, placeholder, type, custom_class, suggestions){
      this.id = id;
      this.label = label;
      this.content = content;
      this.fonte = fonte;
      this.placeholder = placeholder;
      this.type = type;
      this.custom_class = custom_class;
      this.suggestions = suggestions;
    }
    var areas_atuacao = result.areas_atuacao;
    var macro_area_suggestions = getSuggestions();
    headerPriority = '2';
    headerText = 'Áreas de Atuação';
    formItens = [];
    dados_form =
    {
      "form_items": [
        {
          "id": "macro_area_1",
          "label": "Macro Área 1",
          "content": areas_atuacao[0].tx_nome_macro_area_fasfil,
          "fonte": areas_atuacao[0].ft_area_atuacao_fasfil,
          "placeholder": "Insira o nome como a OSC é conhecida",
          "type": "text",
          "custom_class": "autocomplete"
        },
        {
          "id": "macro_area_2",
          "label": "Macro Área 2",
          "content": areas_atuacao[1].tx_nome_macro_area_fasfil,
          "fonte": areas_atuacao[1].ft_area_atuacao_fasfil,
          "placeholder": "Insira o nome como a OSC é conhecida",
          "type": "text",
          "custom_class": "autocomplete"
        }
      ]
    };
    items = dados_form.form_items;
    for (var j=0; j<items.length; j++){
      formItens.push(new AutocompleteItem(items[j].id, items[j].label, items[j].content, items[j].fonte, items[j].placeholder, items[j].type, items[j].custom_class, macro_area_suggestions));
    }
    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:{priority: headerPriority, text: headerText}, dados:formItens}
      ), document.getElementById("areas_de_atuacao")
    );

    require(["react", "jquery-ui"], function (React) {
      //autocomplete macro_area_1 e macro_area_2
      $("#areas_de_atuacao .autocomplete").autocomplete({
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
         var $element = $container.find("#"+id);
         if($element.hasClass('hidden')){
           $element.toggleClass('hidden');
         }
       }
     });
    });

    //Descrição
    var descricao = result.descricao;
    headerPriority = '2';
    headerText = 'Descrição da OSC';
    formItens = [];
    dados_form =
    {
      "form_items": [
        {
          "id": "tx_como_surgiu",
          "label": "Histórico",
          "content": descricao.tx_como_surgiu,
          "fonte": descricao.ft_como_surgiu,
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

    //Títulos e certificações
    var tx_sem_titulos = "Não há registros de títulos ou certificações";
    var certificacoes = result.certificacoes;
    headerPriority = '2';
    headerText = 'Títulos e certificações';
    formItens = [];
    dados_form =
    {
      "form_items": [
        {
          "id": "tx_utilidade_publica",
          "label": null,
          "content": findCertificateContent(certificacoes, "tx_utilidade_publica"),
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
          "id": "data_validade_estadual",
          "label": "Insira data de validade para Utilidade pública estadual",
          "content": findCertificateDate(certificacoes, "data_validade_estadual"),
          "fonte": null,
          "placeholder": "Não constam informações nas bases de dados do Mapa.",
          "type": "text",
          "hide": true
        },
        {
          "id": "data_validade_municipal",
          "label": "Insira data de validade para Utilidade pública municipal",
          "content": findCertificateDate(certificacoes, "data_validade_municipal"),
          "fonte": null,
          "placeholder": "Não constam informações nas bases de dados do Mapa.",
          "type": "text",
          "hide": true
        }
      ]
    };
    items = certificacoes;
    if(items.length > 0){
      for (j=0; j<items.length; j++){
        var dataValidadeText = "Data de Validade: " + items[j].dt_fim_certificado;
        formItens.push(new FormItens(items[j].id_osc, items[j].nm_certificado, dataValidadeText, items[j].ft_certificado, items[j].placeholder, "p"));
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
      var $inputContainer = $(this).closest(".form-group").siblings().find("#data_validade_"+this.value).closest(".form-group");
      $inputContainer.toggleClass('hidden');
      if($inputContainer.hasClass('hidden')){
        var $input = $inputContainer.find('input');
        $input.val("");
      }
    });

    //Relações de trabalho e governança
    var tx_sem_relacoes = "Não há registros de relações de trabalho e governança";
    var dirigentes = result.dirigentes;
    var conselheiros = result.conselheiros[0];
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
    formItens.push(new FormItens(dirigentes[0].id, "Nome", "Insira o nome aqui", null, null, "text"));
    formItens.push(new FormItens(dirigentes[0].id, "Cargo", "Insira o cargo aqui", null, null, "text"));
    Agrupador = React.createFactory(Agrupador);
    ReactDOM.render(
      Agrupador(
        {dados:formItens}
      ), document.getElementById("dirigentes")
    );
    formItens = [];
    formItens.push(new FormItens(conselheiros.id_osc, "Quantidade de conselheiros", conselheiros.tx_quantidade, null, null, "p"));
    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:null, dados:formItens}
      ), document.getElementById("conselheiros")
    );

    //Conselho fiscal
    var conselho_fiscal = result.conselho_fiscal;

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

    //Trabalhadores
    var relacoes_trabalho = result.relacoes_trabalho;
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
          "content": relacoes_trabalho.nr_trabalhadores_outros,
          "fonte": relacoes_trabalho.ft_trabalhadores_outros,
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

    //Projetos
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
          "removable": false,
          "type": "textarea",
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

      var projects = [result.projetos[id]];
      var agrupadores = [];
      for (var i = 0; i < projects.length; i++) {
        var projectId = projects[i].id_projeto;
        for (var property in projects[i]) {
          if ((projects[i].hasOwnProperty(property)) && (labelMap[property] !== undefined)) {
            var sectionId = property;
            var value = projects[i][property];
            var header = labelMap[property].header;
            var containerClass = labelMap[property].containerClass;
            var removable = labelMap[property].removable;
            var type = labelMap[property].type;
            var options = labelMap[property].options;
            var buttons = null;
            var buttonsInLine = false;

            var inputProjeto = new InputProjeto(sectionId, value, type, options, removable, buttons, buttonsInLine);

            var agrupadorInputProjeto = new AgrupadorDeInputs(sectionId, containerClass, header, [inputProjeto], buttons);

            agrupadores.push(agrupadorInputProjeto);
          }
        }
        var localizacao = getLocalizacaoProjeto(projectId);
        var fonte = getFonteDeRecursosProjeto(projectId);
        var publicoBeneficiado = getPublicoBeneficiadoProjeto(projectId);
        var financiadores = getFinanciadoresProjeto(projectId);
        var autodeclaradas = getAutodeclaradasProjeto(projectId);
        var parceiras = getParceirasProjeto(projectId);
        var multipleInputs = [
          localizacao, publicoBeneficiado, financiadores,
          autodeclaradas, parceiras, fonte
        ];
        for (var j = 0; j < multipleInputs.length; j++) {
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
          var inputId = sectionId + "-" + i;
          for (var property in object.dados[i]) {
            if (object.dados[i].hasOwnProperty(property)) {
              if(sectionId == "fonte_de_recursos"){
                if(property === "tx_nome_origem_fonte_recursos_projeto"){
                  value = object.dados[i][property];
                  options = labelMap[object.id].options;
                  console.log(options);
                  var inputProjeto = new InputProjeto(inputId, value, type, options, removable, buttonsInput, buttonsInLine);
                  inputs.push(inputProjeto);
                  // for (var j = 0; j < element.options.length; j++) {
                  //   console.log(element.options[j]);
                  // }
                  // console.log(element.options);
                } else if (property === "tx_nome_fonte_recursos_projeto"){
                  options = labelMap[object.id+"_publico"].options;
                  console.log(options);
                  var inputId = "sub-" + sectionId + "-" + i;
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
    }
    var projects_list = result.lista_projetos;
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
      newData[i][0] = projects_list[i].id;
      newData[i][1] = projects_list[i].nome;
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
       var rowId = $(this)[0]._DT_RowIndex;
       var divId = "projeto-" + rowId;
       var projetos = $(this).next(".projeto");
       console.log(projetos);
       if(projetos.length < 1){
         $(this).after('<div id="' + divId + '" class="projeto col-md-12">');
         carregaProjeto(rowId);
       } else {
         var $divDadosProjeto = $(projetos[0]);
         console.log($divDadosProjeto);
         $divDadosProjeto.toggleClass("hidden");
       }
     });
  });
});

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

function getLocalizacaoProjeto(id){
  var localizacao = {
    "localizacao_projeto": [
      {
        "id_regiao_localizacao_projeto": 1,
        "tx_nome_regiao_localizacao_projeto": "rio",
        "ft_nome_regiao_localizacao_projeto": null,
        "bo_localizacao_prioritaria": false,
        "ft_localizacao_prioritaria": null
      }
    ]
  };
  var key = Object.keys(localizacao)[0];
  var objLocalizacao = {
    "id": key,
    "dados": localizacao[key]
  };
  return objLocalizacao;
}
function getPublicoBeneficiadoProjeto(id){
  var publico_beneficiado = {
    "publico_beneficiado": [
      {
        "id_publico_beneficiado": 1,
        "tx_nome_publico_beneficiado": "rio",
        "nr_estimativa_pessoas_atendidas": null,
        "ft_publico_beneficiado_projeto": null
      }
    ]
  };
  var key = Object.keys(publico_beneficiado)[0];
  var objBeneficiado = {
    "id": key,
    "dados": publico_beneficiado[key]
  };
  return objBeneficiado;
}
function getFinanciadoresProjeto(id){
  var financiadores = {
    "financiadores": [
      {
        "id_financiador_projeto": 1,
        "tx_nome_financiador": "João",
        "ft_nome_financiador": null
      }
    ]
  };
  var key = Object.keys(financiadores)[0];
  var objFinanciadores = {
    "id": key,
    "dados": financiadores[key]
  };
  return objFinanciadores;
}
function getAutodeclaradasProjeto(id){
  var autodeclaradas = {
    "autodeclaradas": [
      {
        "cd_area_atuacao_projeto": 1,
        "tx_nome_area_atuacao_projeto": "Joaquim",
        "ft_area_atuacao_projeto": null
      }
    ]
  };
  var key = Object.keys(autodeclaradas)[0];
  var objAutodeclaradas = {
    "id": key,
    "dados": autodeclaradas[key]
  };
  return objAutodeclaradas;
}
function getParceirasProjeto(id){
  var parceiras = {
    "parceiras": [
      {
        "id_osc": 2,
        "tx_nome_osc_parceira_projeto": "Nome da osc",
        "ft_osc_parceira_projeto": null
      }
    ]
  };
  var key = Object.keys(parceiras)[0];
  var objParceiras = {
    "id": key,
    "dados": parceiras[key]
  };
  return objParceiras;
}
function findCertificateDate(certificacoes, id){

}
function findCertificateContent(certificacoes, id){

}
function getSuggestions(){
  var suggestions = [
    {
      "label": "Habitação",
      "value": "Habitação",
      "id": "habitacao",
      "subareas": [
        {
          "label":"Habitação",
          "value": "habitacao"
        },
        {
          "label":"Outros",
          "value": "outros"
        }
      ]
    },
    {
      "label": "Saúde",
      "value": "Saúde",
      "id": "saude",
      "subareas": [
        {
          "label":"Hospitais",
          "value": "hospitais"
        },
        {
          "label":"Outros serviços de saúde",
          "value": "outros_servicos"
        },
        {
          "label":"Outros",
          "value": "outros"
        }
      ]
    },
    {
      "label": "Cultura e recreação",
      "value": "Cultura e recreação",
      "id": "cultura",
      "subareas": [
        {
          "label":"Cultura e arte",
          "value": "cultura_e_arte"
        },
        {
          "label":"Esportes e recreação",
          "value": "esportes"
        },
        {
          "label":"Outros",
          "value": "outros"
        }
      ]
    },
    {
      "label": "Educação",
      "value": "Educação",
      "id": "educacao",
      "subareas": [
        {
          "label":"Educação infantil",
          "value": "educacao_infantil"
        },
        {
          "label":"Ensino fundamental",
          "value": "ensino_fundamental"
        },
        {
          "label":"Ensino médio",
          "value": "ensino_medio"
        },
        {
          "label":"Educação superior",
          "value": "educacao_superior"
        },
        {
          "label":"Estudos e pesquisas",
          "value": "estudos_e_pesquisas"
        },
        {
          "label":"Educação profissional",
          "value": "educacao_profissional"
        },
        {
          "label":"Outras formas de educação/ensino",
          "value": "outras_formas"
        },
        {
          "label":"Outros",
          "value": "outros"
        }
      ]
    },
    {
      "label": "Assistência social",
      "value": "Assistência social",
      "id": "assistencia_social",
      "subareas": [
        {
          "label":"Assitência social",
          "value": "assistencia_social"
        },
        {
          "label":"Outros",
          "value": "outros"
        }
      ]
    },
    {
      "label": "Religião",
      "value": "Religião",
      "id": "religiao",
      "subareas": [
        {
          "label":"Religião",
          "value": "religiao"
        },
        {
          "label":"Outros",
          "value": "outros"
        }
      ]
    },
    {
      "label": "Associações patronais, profissionais e de produtores rurais",
      "value": "Associações patronais, profissionais e de produtores rurais",
      "id": "associacoes_patronais",
      "subareas": [
        {
          "label":"Associações empresariais e patronais",
          "value": "associacoes_empresariais"
        },
        {
          "label":"Associações profissionais",
          "value": "associacoes_profissionais"
        },
        {
          "label":"Associações de produtores rurais",
          "value": "associacoes_rurais"
        },
        {
          "label":"Cooperativas sociais",
          "value": "cooperativas"
        },
        {
          "label":"Outros",
          "value": "outros"
        }
      ]
    },
    {
      "label": "Meio ambiente e proteção animal",
      "value": "Meio ambiente e proteção animal",
      "id": "meio_ambiente_e_protecao_animal",
      "subareas": [
        {
          "label":"Meio ambiente",
          "value": "meio_ambiente"
        },
        {
          "label":"Proteção animal",
          "value": "protecao_animal"
        },
        {
          "label":"Outros",
          "value": "outros"
        }
      ]
    },
    {
      "label": "Desenvolvimento e defesa de direitos",
      "value": "Desenvolvimento e defesa de direitos",
      "id": "desenvolvimento",
      "subareas": [
        {
          "label":"Associação de moradores",
          "value": "associacao_de_moradores"
        },
        {
          "label":"Centros e associações comunitárias",
          "value": "centros_comunitarios"
        },
        {
          "label":"Desenvolvimento rural",
          "value": "desenvolvimento_rural"
        },
        {
          "label":"Emprego e treinamento",
          "value": "emprego"
        },
        {
          "label":"Defesa de direitos de grupos e/ou minorias",
          "value": "defesa_de_direitos"
        },
        {
          "label":"Outros",
          "value": "outros"
        }
      ]
    }
  ];
  return suggestions;
}
function montarEnderecoImovel(dadosGerais){
  var endereco = [dadosGerais.tx_endereco, dadosGerais.nr_localizacao,
    dadosGerais.tx_endereco_complemento, dadosGerais.tx_bairro,
    dadosGerais.tx_municipio, dadosGerais.tx_uf,
    dadosGerais.nm_cep];
  var tx_endereco_completo = '';
  for (var i = 0; i < endereco.length; i++) {
    if (endereco[i] !== null){
      tx_endereco_completo += (tx_endereco_completo === '' ? '' : ', ');
      tx_endereco_completo += endereco[i];
    }
    if (tx_endereco_completo === '') {
      tx_endereco_completo = 'Endereço não registrado.';
    }
  }
  return tx_endereco_completo;
}
