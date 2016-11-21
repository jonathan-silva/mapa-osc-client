/* jshint ignore:start */
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

require(['react', 'rotas', 'jsx!components/Util', 'jsx!components/EditarOSC', 'jquery'], function (React) {
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
    var valoresURL = window.location.href.split('?')[1]!==undefined ? window.location.href.split('?')[1].split('=') : null;
    var rotas = new Rotas();
    var urlRota = "";
    //console.log(rotas);
    if(valoresURL !== null){
      var idOsc = valoresURL[0];
      urlRota = rotas.OSCByID(idOsc);
    }
    //console.log(urlRota);
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
          {/*
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
            "ft_nome_dirigente": null*/
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
        	"id_osc": 94,
        	"conferencia": [
        		{
              "id_conferencia":1,
              "cd_conferencia":1,
              "tx_nome_conferencia":"Conferência das Organizações Sociais do Brasil",
              "ft_conferencia":"RAIS",
              "dt_ano_realizacao":null,
              "ft_ano_realizacao":null,
              "cd_forma_participacao_conferencia":11 ,
              "tx_nome_forma_participacao_conferencia":"null",
              "ft_forma_participacao_conferencia": null
            },
            {
              "id_conferencia":2,
              "cd_conferencia":2,
              "tx_nome_conferencia":"Simpósio das Organizações Sociais do Brasil",
              "ft_conferencia":"SBC",
              "dt_ano_realizacao":"2010",
              "ft_ano_realizacao":"null",
              "cd_forma_participacao_conferencia":22 ,
              "tx_nome_forma_participacao_conferencia":"null",
              "ft_forma_participacao_conferencia":"null"
        		}
        	],
          "conferencia_outra": [
        		{
              "id_conferencia_outra":1,
              "id_conferencia_declarada":2,
              "tx_nome_conferencia_declarada":"nome",
              "ft_conferencia_declarada":"ft_nome",
              "dt_ano_realizacao":"2003",
              "ft_ano_realizacao":"2013",
              "cd_forma_participacao_conferencia":11,
              "tx_nome_forma_participacao_conferencia":"nome_forma",
              "ft_forma_participacao_conferencial":"ft_forma1"
        		}
          ],
        	"conselho": [
        		{
              "id_conselho":1,
              "cd_conselho":1,
              "tx_nome_conselho":"Conselho1",
              "ft_conselho":"fonte1",
              "cd_tipo_participacao":11,
              "tx_nome_tipo_participacao":"Suplente",
              "ft_tipo_participacao":"fonte_tipo1",
              "tx_nome_representante_conselho":"TEXT",
              "ft_nome_representante_conselho":"TEXT",
              "tx_periodicidade_reuniao":"mensal",
              "ft_periodicidade_reuniao":"ft_peri",
              "dt_data_inicio_conselho":"1/1/2001",
              "ft_data_inicio_conselho":"ft_inicio1",
              "dt_data_fim_conselho":"1/1/2010",
              "ft_data_fim_conselho":"ft_fim1",
              "id_representante_conselho" :1,
              "id_participacao_social_conselho":1
        		},
            {
              "id_conselho":2,
              "cd_conselho":2,
              "tx_nome_conselho":"Conselho2",
              "ft_conselho":"fonte1",
              "cd_tipo_participacao":22,
              "tx_nome_tipo_participacao":"Titular",
              "ft_tipo_participacao":"fonte_tipo2",
              "tx_nome_representante_conselho":"Nome Repre",
              "ft_nome_representante_conselho":"fonte repre",
              "tx_periodicidade_reuniao":"bimestral",
              "ft_periodicidade_reuniao":"ft_peri",
              "dt_data_inicio_conselho":"2/2/2002",
              "ft_data_inicio_conselho":"ft_inicio2",
              "dt_data_fim_conselho":"2/2/2012",
              "ft_data_fim_conselho":"ft_fim2",
              "id_representante_conselho" :2,
              "id_participacao_social_conselho":2
        		}
        	],
          "declarada": [
            {
              "id_participacao_social_declarada": 1,
              "tx_nome_participacao_social_declarada": "nome declarada",
        			"ft_nome_participacao_social_declarada": "null",
        			"tx_tipo_participacao_social_declarada": "tipo declarada",
              "ft_tipo_participacao_social_declarada": "ft_tipo",
        			"dt_data_ingresso_participacao_social_declarada": "1/1/2005",
              "ft_data_ingresso_participacao_social_declarada": "ft_data"
        		}
        	],
        	"outra": [
            {
        			"id_participacao_social_outra": 2,
        			"tx_nome_participacao_social_outra": "nome outra ",
        			"ft_participacao_social_outra": null
        		}
        	]
        }
      };

    var json = {
      "area_atuacao": {
        "area_atuacao": [
          {
            "cd_area_atuacao": 1,
            "tx_nome_area_atuacao": "Educação",
            "cd_subarea_atuacao": 1,
            "tx_nome_subarea_atuacao": "Educação Básica",
            "ft_area_atuacao": "Usuário"
          }
        ],
        "area_atuacao_outra": [
          {
            "id_area_atuacao_outra": 1,
            "tx_nome_area_atuacao": "Apoio a jovens infratores",
            "ft_area_atuacao_outra": "Usuário"
          }
        ]
      },
      "cabecalho": {
        "cd_identificador_osc": "12345678901234",
        "ft_identificador_osc": "RAIS",
        "tx_razao_social_osc": "Terra dos Homens",
        "ft_razao_social_osc": null,
        "tx_natureza_juridica": "Educação",
        "ft_natureza_juridica_osc": "RAIS",
        "im_logo": null,
        "ft_logo": null
      },
      "certificacao": {
        "certificado": [
          {
            "id_certificado": 1,
            "tx_nome_certificado": "Bom Pagador",
            "dt_inicio_certificado": "2016-10-20",
            "dt_fim_certificado": "2017-10-20",
            "ft_certificado": "Vagner"
          },
          {
            "id_certificado": 2,
            "tx_nome_certificado": "Idoneidade Aceite",
            "dt_inicio_certificado": null,
            "dt_fim_certificado": "2017-10-25",
            "ft_certificado": null
          }
        ],
        "utilidade_publica_estadual": {
          "dt_data_validade": "2016-10-20",
          "ft_utilidade_publica_estadual": "Vagner"
        },
        "utilidade_publica_municipal": {
          "dt_data_validade": "2016-10-30",
          "ft_utilidade_publica_municipal": "Vagner"
        }
      },
      "dados_gerais": {
        "cd_identificador_osc": "12345678901234",
        "ft_identificador_osc": "RAIS",
        "tx_razao_social_osc": "Terra dos Homens",
        "ft_razao_social_osc": null,
        "tx_nome_fantasia_osc": null,
        "ft_nome_fantasia_osc": null,
        "im_logo": null,
        "ft_logo": null,
        "tx_atividade_economica_osc": "Saúde Básica",
        "ft_atividade_economica_osc": "RAIS",
        "tx_natureza_juridica_osc": "Educação",
        "ft_natureza_juridica_osc": "RAIS",
        "tx_sigla_osc": null,
        "ft_sigla_osc": null,
        "tx_apelido_osc": "terra",
        "ft_apelido_osc": "Vagner",
        "dt_fundacao_osc": null,
        "ft_fundacao_osc": null,
        "dt_ano_cadastro_cnpj": null,
        "ft_ano_cadastro_cnpj": null,
        "tx_nome_responsavel_legal": null,
        "ft_nome_responsavel_legal": null,
        "tx_link_estatuto_osc": null,
        "ft_link_estatuto_osc": null,
        "tx_resumo_osc": null,
        "ft_resumo_osc": null,
        "tx_nome_situacao_imovel_osc": null,
        "ft_situacao_imovel_osc": null,
        "tx_endereco": null,
        "ft_endereco": null,
        "nr_localizacao": null,
        "ft_localizacao": null,
        "tx_endereco_complemento": null,
        "ft_endereco_complemento": null,
        "tx_bairro": null,
        "ft_bairro": null,
        "tx_municipio": null,
        "ft_municipio": null,
        "tx_uf": null,
        "ft_uf": null,
        "nr_cep": null,
        "ft_cep": null,
        "geo_lat": null,
        "geo_lng": null,
        "tx_email": null,
        "ft_email": null,
        "tx_site": null,
        "ft_site": null,
        "tx_telefone": null,
        "ft_telefone": null
      },
      "descricao": {
        "tx_historico": null,
        "ft_historico": null,
        "tx_missao_osc": null,
        "ft_missao_osc": null,
        "tx_visao_osc": null,
        "ft_visao_osc": null,
        "tx_finalidades_estatutarias": "Ajudar o próximo mais proximamente",
        "ft_finalidades_estatutarias": "Vagner"
      },
      "participacao_social": {
        "conselho": [
          {
            "id_conselho": 1,
            "tx_nome_conselho": "Conselho Federal  das OSCs",
            "ft_conselho": "Vagner",
            "nr_numero_assentos": null,
            "ft_numero_assentos": null,
            "tx_periodicidade_reuniao": null,
            "ft_periodicidade_reuniao": null,
            "cd_tipo_participacao": 1,
            "nm_tipo_participacao": "Titular",
            "ft_tipo_participacao": "Vagner"
          }
        ]
      },
      "projeto": [
        {
          "id_projeto": 1,
          "tx_nome_projeto": "Projeto Teste 1"
        },
        {
          "id_projeto": 2,
          "tx_nome_projeto": "Projeto Teste 2"
        }
      ],
      "recursos": {
        "nr_valor_total": "150000",
        "nr_valor_federal": null,
        "nr_valor_estadual": null,
        "nr_valor_municipal": null,
        "nr_valor_privado": null,
        "nr_valor_proprio": null,
        "tx_link_relatorio_auditoria": null,
        "ft_link_relatorio_auditoria": null,
        "tx_link_demonstracao_contabil": null,
        "ft_link_demonstracao_contabil": null
      },
      "relacoes_trabalho_governanca": {
        "relacoes_trabalho": {
          "nr_trabalhadores": 13,
          "nr_trabalhadores_vinculo": 3,
          "ft_trabalhadores_vinculo": "RAIS",
          "nr_trabalhadores_deficiencia": 0,
          "ft_trabalhadores_deficiencia": "RAIS",
          "nr_trabalhadores_voluntarios": 10,
          "ft_trabalhadores_voluntarios": "Vagner"
        },
        "relacoes_trabalho_outra": [
          {
            "nr_trabalhadores": 10,
            "ft_trabalhadores": "Vagner",
            "tx_tipo_relacao_trabalho": "Pessoa Jurídica",
            "ft_tipo_relacao_trabalho": "Vagner"
          }
        ],
        "governanca": [
          {
            "id_dirigente": 1,
            "tx_cargo_dirigente": "Diretor",
            "ft_cargo_dirigente": "Vagner",
            "tx_nome_dirigente": "Maria Silva",
            "ft_nome_dirigente": "Vagner"
          },
          {
            "id_dirigente": 3,
            "tx_cargo_dirigente": "Gerente",
            "ft_cargo_dirigente": "Vagner",
            "tx_nome_dirigente": "João Oliveira",
            "ft_nome_dirigente": "Vagner"
          }
        ],
        "conselho_fiscal": [
          {
            "id_conselheiro": 3,
            "tx_nome_conselheiro": "José Mendes",
            "ft_nome_conselheiro": "RAIS",
            "tx_cargo_conselheiro": "Conselheiro Financeiro",
            "ft_cargo_conselheiro": "RAIS"
          }
        ]
      }
    };
    //Dados Gerais

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
    var areas_atuacao = json.area_atuacao.area_atuacao;
    var area_atuacao_outra = json.area_atuacao.area_atuacao_outra;
    areas_atuacao = areas_atuacao.concat(area_atuacao_outra);
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
      formItens.push(new AutocompleteItem(items[j].id, items[j].label, content, fonte, items[j].placeholder, items[j].type, items[j].custom_class, macro_area_suggestions));
    }
    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:{priority: headerPriority, text: headerText}, dados:formItens}
      ), document.getElementById("areas_de_atuacao")
    );

    require(["react", "jquery-ui", "jquery"], function (React) {
      //autocomplete macro_area_1 e macro_area_2
      $("#areas_de_atuacao .autocomplete").autocomplete({
        create: function(event, ui) {
          var value = $(this).attr("placeholder");
          for (var i = 0; i < macro_area_suggestions.length; i++) {
            var suggestion = macro_area_suggestions[i].label;
            if (suggestion === value){
              var $container = $(this).siblings(".checkboxList");
              var $element = $container.find("#"+i);
              if($element.hasClass('hidden')){
                $element.toggleClass('hidden');
              }
              for (var j = 0; j < areas_atuacao.length; j++) {
                if((value === areas_atuacao[j].tx_nome_area_atuacao) && (areas_atuacao[j].tx_nome_subarea_atuacao)){
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
         var $element = $container.find("#"+id);
         if($element.hasClass('hidden')){
           $element.toggleClass('hidden');
         }
       }
     });
    });

    //Descrição
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

    //Títulos e certificações
    var tx_sem_titulos = "Não há registros de títulos ou certificações";
    var certificacoes = json.certificacao.certificado;
    var utilidade_publica_estadual = json.certificacao.utilidade_publica_estadual;
    var utilidade_publica_municipal = json.certificacao.utilidade_publica_municipal;
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
          "id": "data_validade_estadual",
          "label": "Insira data de validade para Utilidade pública estadual",
          "content": utilidade_publica_estadual.dt_data_validade,
          "fonte": utilidade_publica_estadual.ft_utilidade_publica_estadual,
          "placeholder": "Não constam informações nas bases de dados do Mapa.",
          "type": "text",
          "hide": true
        },
        {
          "id": "data_validade_municipal",
          "label": "Insira data de validade para Utilidade pública municipal",
          "content": utilidade_publica_municipal.dt_data_validade,
          "fonte": utilidade_publica_municipal.ft_utilidade_publica_municipal,
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
      var $inputContainer = $(this).closest(".form-group").siblings().find("#data_validade_"+this.value).closest(".form-group");
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

    //Relações de trabalho e governança
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
  function quadroDirigenteItem(){
      $('#dirigentes button').on('click', function(){
        if($(this).hasClass('btn-primary')){
          var $cloneDiv = ($(this).closest('.dirigente'));
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
          if(values[0] && values[1]){
            $input.parent().removeClass('has-error');
            $input.after().find('span').remove();
            var $clone = $cloneDiv.find('button').text('Remover').attr('class', 'btn-danger btn');
            $cloneDiv.clone().appendTo('#dirigentes');
            $('.dirigente').last().find('button').text('Adicionar').attr('class', 'btn-primary btn').click(quadroDirigenteItem());
            $('.dirigente').last().find('input[type=text]').val('');
          }
        }
        else {
          $(this).parent().remove();
        }
     });
    }
    quadroDirigenteItem();

    //Conselho fiscal
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

    function conselhoFiscalItem(){
        $('#conselho_fiscal button').on('click', function(){
          if($(this).hasClass('btn-primary')){
            var $conselho = $(this).parent();
            var $cloneDiv = ($(this).closest($conselho));
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
            if(values[0]){
              $input.parent().removeClass('has-error');
              $input.after().find('span').remove();
              var $clone = $cloneDiv.find('button').text('Remover').attr('class', 'btn-danger btn');
              var $conselhoChildren = $('#conselho_fiscal').children();
              $cloneDiv.clone().appendTo($conselhoChildren);
              $conselho.parent().children().last().find('button').text('Adicionar').attr('class', 'btn-primary btn').click(conselhoFiscalItem());
              $conselho.parent().children().last().find('input[type=text]').val('');
            }
          }
          else {
            $(this).parent().remove();
          }
       });
      }
      conselhoFiscalItem();

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

    // Espaços participacao social;
      var tx_sem_participacao_social = "Não há registros de participação social";
      var conselhos = result.participacao_social.conselho;
      var conferencias = result.participacao_social.conferencia;
      var outras = result.participacao_social.outra;
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

      function conferenciaItem(){
          $('#conferencias button').on('click', function(){
            if($(this).hasClass('btn-primary')){
              var $cloneDiv = ($(this).closest('.conferencia'));
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
              if(values[0] && values[1] && values[2]){
                $input.parent().removeClass('has-error');
                $input.after().find('span').remove();
                var $clone = $cloneDiv.find('button').text('Remover').attr('class', 'btn-danger btn');
                $cloneDiv.clone().appendTo('#conferencias');
                $('.conferencia').last().find('button').text('Adicionar').attr('class', 'btn-primary btn').click(conferenciaItem());
                $('.conferencia').last().find('input[type=text]').val('');
              }
            }
            else {
              $(this).parent().remove();
            }
         });
        }
        conferenciaItem();

      formItens = [];//React.createFactory(participacao_social_form);
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
        formItens.push(new FormItens(conselho[j].id, "Nome do Conselho", null,null, null, "text"));
        formItens.push(new FormItens(conselho[j].id, "Titularidade", null,null, null, "text"));
        formItens.push(new FormItens(conselho[j].id, "Nome de representante", null,null, null, "text"));
        formItens.push(new FormItens(conselho[j].id, "Periodicidade da Reunião", null,null, null, "text"));
        formItens.push(new FormItens(conselho[j].id, "Data de início de vigência", null,null, null, "text"));
        formItens.push(new FormItens(conselho[j].id, "Data de fim de vigência", null,null, null, "text"));

        Agrupador = React.createFactory(AgrupadorConselhos);
        ReactDOM.render(
          Agrupador(
            {header:null, dados:formItens}
          ), document.getElementById("conselhos")
        );
      };

      function conselhoItem(){
          $('#conselhos button').on('click', function(){
            if($(this).hasClass('btn-primary')){
              var $cloneDiv = ($(this).closest('.conselho'));
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
              if(values[0] && values[1] && values[2] && values[3] && values[4]){
                $input.parent().removeClass('has-error');
                $input.after().find('span').remove();
                var $clone = $cloneDiv.find('button').text('Remover').attr('class', 'btn-danger btn');
                $cloneDiv.clone().appendTo('#conselhos');
                $('.conselho').last().find('button').text('Adicionar').attr('class', 'btn-primary btn').click(conselhoItem());
                $('.conselho').last().find('input[type=text]').val('');
              }
            }
            else {
              $(this).parent().remove();
            }
         });
        }
        conselhoItem();

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

      var project = getProject(id);
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
          var inputId = sectionId + "-" + i;
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
      $divObjetivosProjeto.append('<div class="form-group"><select class="form-control"></select></div>');
      $divObjetivosMetasProjeto.append('<div id="metas-'+cd_objetivo+'" class="metas"></div>');
      var $divMetasProjeto = $divObjetivosMetasProjeto.find("#metas-"+cd_objetivo);
      $divMetasProjeto.append('<div class="header">Metas</div>');
      $divMetasProjeto.append('<ol id="selectable-'+cd_objetivo +'" class="selectable"></ol>');

      var options = getObjetivosOptions()
      var $selectObjetivos = $divObjetivosProjeto.find("select");
      for (var i = 0; i < options.length; i++) {
        if(options[i].cd_objetivo_projeto === cd_objetivo){
          $selectObjetivos.append('<option selected id="' + options[i].cd_objetivo_projeto + '">' + options[i].tx_nome_objetivo_projeto + '</option>');
        } else {
          $selectObjetivos.append('<option id="' + options[i].cd_objetivo_projeto + '">' + options[i].tx_nome_objetivo_projeto + '</option>');
        }
      }

      var options = getMetasOptions(cd_objetivo);
      for (var i = 0; i < options.length; i++) {
        if(options[i].cd_meta_projeto == cd_meta){
          $('#selectable-'+cd_objetivo).append('<li class="ui-widget-content ui-selected">' + options[i].tx_nome_meta_projeto + '</li>');
        } else {
          $('#selectable-'+cd_objetivo).append('<li class="ui-widget-content">' + options[i].tx_nome_meta_projeto + '</li>');
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
           var cd_objetivo = $(this).attr('id');
           $(this).removeClass("ui-selected");
           $divObjetivosMetasProjeto.append('<div id="metas-'+cd_objetivo+'" class="metas"></div>');
           $('#metas-'+cd_objetivo).append('<div class="header">Metas</div>');
           $('#metas-'+cd_objetivo).append('<ol id="selectable-'+cd_objetivo +'" class="selectable"></ol>');
           if($('#metas-'+cd_objetivo).hasClass('hidden')){
             $('#metas-'+cd_objetivo).toggleClass('hidden');
           }

           var options = getMetasOptions(idObjetivo);
           for (var i = 0; i < options.length; i++) {
             if(options[i].cd_meta_projeto == cd_meta){
               $('#selectable-'+cd_objetivo).append('<li class="ui-widget-content ui-selected">' + options[i].tx_nome_meta_projeto + '</li>');
             } else {
               $('#selectable-'+cd_objetivo).append('<li class="ui-widget-content">' + options[i].tx_nome_meta_projeto + '</li>');
             }
           }
            $('#selectable-'+cd_objetivo).selectable();
         });
       });
    }
    var projects_list = json.projeto;
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
  });
});

function getProject(id){
  console.log(id);
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

function getMetasOptions(id){
  var metas = [
    {
      "cd_meta_projeto": 1,
      "tx_nome_meta_projeto": "Até 2030, erradicar a pobreza extrema para todas as pessoas em todos os lugares, atualmente medida como pessoas vivendo com menos de US$ 1,25 por dia"
    },
    {
      "cd_meta_projeto": 2,
      "tx_nome_meta_projeto": "Até 2030, reduzir pelo menos à metade a proporção de homens, mulheres e crianças, de todas as idades, que vivem na pobreza, em todas as suas dimensões, de acordo com as definições nacionais"
    },
    {
      "cd_meta_projeto": 3,
      "tx_nome_meta_projeto": "Implementar, em nível nacional, medidas e sistemas de proteção social adequados, para todos, incluindo pisos, e até 2030 atingir a cobertura substancial dos pobres e vulneráveis"
    }
  ];
  return metas;
}

function getObjetivosOptions(){
  var objetivos = [
    {
      "cd_objetivo_projeto": 1,
      "tx_nome_objetivo_projeto": "Acabar com a pobreza em todas as suas formas, em todos os lugares"
    },
    {
      "cd_objetivo_projeto": 2,
      "tx_nome_objetivo_projeto": "Acabar com a fome, alcançar a segurança alimentar e melhoria da nutrição e promover a agricultura sustentável"
    },
    {
      "cd_objetivo_projeto": 3,
      "tx_nome_objetivo_projeto": "Assegurar uma vida saudável e promover o bem-estar para todos, em todas as idades"
    },
    {
      "cd_objetivo_projeto": 4,
      "tx_nome_objetivo_projeto": "Assegurar a educação inclusiva e equitativa e de qualidade, e promover oportunidades de aprendizagem ao longo da vida para todos"
    },
    {
      "cd_objetivo_projeto": 5,
      "tx_nome_objetivo_projeto": "Alcançar a igualdade de gênero e empoderar todas as mulheres e meninas"
    }
  ];
  return objetivos;
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
