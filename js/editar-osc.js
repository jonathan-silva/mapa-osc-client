require(['react', 'jsx!components/Util', 'jsx!components/EditarOSC'], function (React) {

  require(['componenteFormItem', 'componenteHeaderAreaDeAtuacao'], function(FormItem, AreaDeAtuacao){
    function FormItens(id, label, content, type, options, pretext){
      this.id = id;
      this.label = label;
      this.content = content;
      this.type = type;
      this.options = options;
      this.pretext = pretext;
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
          "tx_link_estatuto_osc": null,
          "ft_link_estatuto_osc": null,
          "tx_resumo_osc": null,
          "ft_resumo_osc": null,
          "tx_endereco_eletronico_sugerido": "endereço sugerido",
          "ft_endereco_eletronico_sugerido": null,
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
          "nm_cep": null,
          "ft_cep": null,
          "tx_email": "email@exemplo.com",
          "ft_email": null,
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
          "ft_finalidades_estatutarias": null
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
            "ft_certificado": "Não Possui"
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
        	"ft_trabalhadores_voluntarios": null
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
        "projetos": [
          {
            "id_osc": 1,
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
            "ft_valor_total_projeto": null
          },
          {
            "id_osc": 1,
            "tx_nome_projeto": "test3",
            "ft_nome_projeto": null,
            "tx_nome_status_projeto": "status 1",
            "ft_status_projeto": null,
            "dt_data_inicio_projeto": "10/02/2003",
            "ft_data_inicio_projeto": null,
            "dt_data_fim_projeto": "02/03/2004",
            "ft_data_fim_projeto": null,
            "tx_link_projeto": null,
            "ft_link_projeto": null,
            "nr_total_beneficiarios": null,
            "ft_total_beneficiarios": null,
            "nr_valor_total_projeto": null,
            "ft_valor_total_projeto": null
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
          "type": "text"
        },
        {
          "id": "tx_sigla_osc",
          "label": "Sigla da OSC",
          "content": dadosGerais.tx_sigla_osc,
          "type": "text"
        },
        {
          "id": "tx_endereco_eletronico_sugerido",
          "label": "Endereço eletrônico sugerido para esta página",
          "content": dadosGerais.tx_endereco_eletronico_sugerido,
          "pretext": "mapaosc.ipea.gov.br/",
          "type": "text"
        },
        {
          "id": "tx_endereco",
          "label": "Endereço da OSC",
          "content": montarEnderecoImovel(dadosGerais),
          "type": "p"
        },
        {
          "id": "tx_nome_situacao_imovel_osc",
          "label": "Situação do Imóvel",
          "content": dadosGerais.tx_nome_situacao_imovel_osc,
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
          "type": "text"
        },
        {
          "id": "dt_inscricao_osc",
          "label": "Ano de inscrição no Cadastro de CNPJ",
          "content": dadosGerais.dt_inscricao_osc,
          "type": "text"
        },
        {
          "id": "dt_fundacao_osc",
          "label": "Ano de Fundação",
          "content": dadosGerais.dt_fundacao_osc,
          "type": "text"
        },
        {
          "id": "tx_email",
          "label": "E-mail",
          "content": dadosGerais.tx_email,
          "type": "text"
        },
        {
          "id": "tx_resumo_osc",
          "label": "O que a OSC faz",
          "content": dadosGerais.tx_resumo_osc,
          "type": "textarea"
        },
        {
          "id": "tx_site",
          "label": "Site",
          "content": dadosGerais.tx_site,
          "type": "text"
        },
        {
          "id": "tx_telefone",
          "label": "Telefone",
          "content": dadosGerais.tx_telefone,
          "type": "text"
        },
        {
          "id": "tx_link_estatuto_osc",
          "label": "Link para o Estatuto da OSC",
          "content": dadosGerais.tx_link_estatuto_osc,
          "type": "text"
        },
      ]
    };
    var items = dados_form.form_items;
    var headerPriority = '2';
    var headerText = 'Dados Gerais';
    var formItens = [];

    for (var i=0; i<items.length; i++){
      formItens.push(new FormItens(items[i].id, items[i].label, items[i].content, items[i].type, items[i].options, items[i].pretext));
    }
    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:{priority: headerPriority, text: headerText}, dados:formItens}
      ), document.getElementById("dados_gerais")
    );

    //Áreas de atuação
    var areas_atuacao = result.areas_atuacao;
    headerPriority = '2';
    headerText = 'Áreas de Atuação';
    AreaDeAtuacao = React.createFactory(AreaDeAtuacao);
    ReactDOM.render(
      AreaDeAtuacao(
        {header:{priority: headerPriority, text: headerText}, dados:areas_atuacao}
      ), document.getElementById("areas_de_atuacao")
    );
  });
});

function montarEnderecoImovel(dadosGerais){
  var endereco = [dadosGerais.tx_endereco, dadosGerais.nr_localizacao,
    dadosGerais.tx_endereco_complemento, dadosGerais.tx_bairro,
    dadosGerais.tx_municipio, dadosGerais.tx_uf,
    dadosGerais.nm_cep];
  var tx_endereco_completo = '';
  for (var i = 0; i < endereco.length; i++) {
    if (endereco[i] !== null){
      tx_endereco_completo += endereco[i] + ', ';
    } else {
      tx_endereco_completo = 'Endereço não registrado.';
    }
  }
  return tx_endereco_completo;
}
