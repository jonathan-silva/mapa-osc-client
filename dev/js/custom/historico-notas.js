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

  jQuery(document).ready(function($) {
      $(".scroll").click(function(event){
          event.preventDefault();
          $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
     });
  });

});

require(['react', 'jsx!components/Util'], function (React) {

  require(['componenteAccordion'], function(HistoricoNotas){
    function Gloss(topico, desc){
      this.topico = topico;
      this.desc = desc;
    }

  var jsonDados = [
    {
      "topico":"Notas de lançamento da versão 1.7.7, ocorrida em agosto de 2016",
      "desc": ["Nesta versão, o Mapa das OSCs incorporou novas funções e traz aprimoramentos importantes. Além da complementação dos dados da RAIS 2013 com as informações referentes a Organizações da Sociedade Civil de Interesse Público (OSCIP), de alterações importantes no menu lateral e na página da OSC e do aprimoramento do sistema e da usabilidade, algumas das principais novidades são a disponibilização de dados inéditos referentes às OSCs e ao extinto Cadastro Nacional de Entidades Sociais (CNES), do Ministério da Justiça, para download pelo usuário e a criação de tutorial de orientação para cadastro e edição da página da OSC pelo representante de organização civil. A página da OSC também foi atualizada e continua recebendo informações atualizadas sobre projetos executados, histórico de atuação da organização, bem como alguns dados cadastrais atualizados. Com isso, o Mapa das OSCs se torna um ambiente de construção colaborativa das informações sobre as OSCs do país e permite o exercício da transparência ativa. Em breve esta página será ampliada.",
                "Segue a lista completa de aprimoramentos desta versão:",
                "• Disponibilização dos dados do extinto CNES/MJ para download no Mapa",
                "• Disponibilização de tutorial para cadastro de representante de OSC e edição da página da OSC",
                "• Disponibilização da base do Mapa em shapefile para download no Mapa",
                "• Correção dos links no menu lateral para visualização de dados da OSC",
                "• Correção do uso da tecla \"Enter\" para busca no Mapa",
                "• Correção na exibição dos certificados e títulos na página da OSC",
                "• Correção de problema no carregamento de dados de OSCs no menu lateral",
                "• Correção dos valores dos repasses exibidos na matriz de indicadores",
                "• Inclusão das OSCIPs ausentes da RAIS 2013 no Mapa",
                "• Inclusão de captcha no cadastro de representante de OSC e na edição da página da OSC",
                "• Inclusão de texto de fonte dos dados da matriz de indicadores",
                "• Inclusão de texto de fonte dos dados dos campos de dirigentes da página da OSC",
                "• Exclusão das informações referentes ao título de Utilidade Pública Federal",
                "• Alteração do botão de \"Ver detalhes\" para \"Página da OSC\" no menu lateral",
                "• Alteração do texto do botão de \"Cadastre-se como representante\"",
                "• Alteração dos campos de recursos públicos do menu lateral",
                "• Alteração da fonte do campo \"Nome fantasia\" da página da OSC",
                "• Alteração do campo de CPF cadastrado pelo usuário",
                "• Atualização dos infográficos",
                "• Atualização do conteúdo da Metodologia",
                "• Atualização do conteúdo do FAQ",
                "• Atualização do conteúdo da página da versão",
                "• Atualização do conteúdo do texto informativo de cadastro de representante de OSC",
                "• Atualização do campo de fontes de recursos da página da OSC",
                "• Atualização dos dados de repasses da Finep no menu lateral e na página da OSC",
                "• Atualização do serviço de dados do Siconv",
                "• Atualização das marcas do Governo Federal e da Secretaria de Governo"
           ],
    },
    {
    "topico":"Notas de lançamento da versão 1.7, ocorrida em maio de 2016",
    "desc": ["Nesta versão, o Mapa das OSCs incorporou novas funções e traz aprimoramentos importantes. Além da atualização dos dados da RAIS 2013, da correção dos valores dos repasses da administração pública federal para OSCs pelos índices de inflação e do aprimoramento do sistema e da usabilidade a principal novidade é a criação de um ambiente no qual os representantes de OSCs podem alimentar dados em uma página própria, que pode – e deve! – ser permanentemente atualizada. Ali podem ser acrescentados dados sobre projetos executados, histórico de atuação da organização, bem como alguns dados cadastrais atualizados. Com isso, o Mapa das OSCs se torna um ambiente de construção colaborativa das informações sobre as OSCs do país e permite o exercício da transparência ativa. Em breve esta página será ampliada.",
            "Segue a lista completa de aprimoramentos desta versão:",
            "• Disponibilização de uma página individual das OSCs com informações extraídas das bases públicas e campos para que representantes das organizações possam inserir informações sobre as mesmas",
            "• Atualizar o nome fantasia da OSCs, se houver",
            "• Atualizar dados cadastrais",
            "• Inserir informações sobre projetos, áreas de atuação e público beneficiário, entre outras",
            "• Inclusão das OSCs que declararam a RAIS Negativa em 2013, que se somam às demais OSCs já incluídas",
            "• Correção dos valores monetários dos repasses da administração pública federal para organizações da sociedade civil presentes no Sistema de Gestão de Convênios e Contratos de Repasse (Siconv) (e demais bases) pelos índices do Índice Nacional de Preços ao Consumidor Amplo (IPCA)",
            "• Criação de página de sistema em manutenção para eventuais serviços de atualização do Mapa das OSCs",
            "• Criação de página de notificação do usuário em caso de ocorrência de eventuais erros no Mapa das OSCs",
            "• Atualização dos links úteis no rodapé do Mapa das OSCs",
            "• Fixação das fontes dos dados exibidas no menu lateral, na tela com informações resumidas das OSCs e na matriz de indicadores",
            "• Nova visualização das instituições que apoiam o Mapa das OSCs",
            "• Implementação do acesso à matriz de indicadores por meio do teclado",
            "• Correção do menu da página da matriz de indicadores",
            "• Inclusão do link para a página do Github na página das notas de lançamento de versão"
            ],
  },
    {
    "topico":"Notas de lançamento da versão 1.6, ocorrida em março de 2016",
    "desc": ["Nesta versão o Mapa das OSCs incorporou funções importantes. Além de atualizar dados, corrigir bugs, aumentar a eficiência da busca e dos clusteres, é possível aos representantes das OSCs inserirem dados detalhados sobre as atividades correntes e passadas das OSCs, além de incorporar informações sobre finalidades da atuação e público alvo das organizações. Segue a lista de aprimoramentos desta versão:",
              "• Criação de página individual das OSCs",
              "• Inserção de campos para definição das finalidades de atuação e público alvo dos projetos executados",
              "• Correção das falhas de contraste no cabeçalho da página principal",
              "• Inclusão das notas de versão na página de versão do Mapa",
              "• Revisão do conteúdo da página de versão",
              "• Correção dos totais apresentados nos clusteres de OSCs",
              "• Maior eficiência na formação dos clusteres",
              "• Atualização da metodologia de construção dos dados do MOSC",
              "• Reestruturação da função auto completar, na barra de buscas, incluindo a busca por endereços das OSCs",
              "• Correção de bugs nas abas de informações sobre as OSCs",
              "• Atualização dos dados, rótulos, títulos e informações dos infográficos",
              "• Aprimoramento das informações disponibilizadas no menu lateral",
              "• Deslocamento da seção sobre documentos de parcerias e das OSCs para a página individual das mesmas.",
              "• Criação de página estática para informar sobre carga de dados e indisponibilidade do servidor."
            ],
    },
    {
    "topico":"Notas de lançamento da versão 1.5, ocorrida em fevereiro de 2016",
    "desc": ["Reformulação da página com quadro-resumo de informações sobre a OSC",
              "• Modificação e atualização do infográfico sobre a distribuição das OSCs por natureza jurídica e por região",
              "• Atualização das informações sobre a metodologia de construção dos dados utilizados neste Mapa",
              "• Atualização da base de dados com os títulos de Utilidade Pública Federal conferidos às OSCs e das OSCs qualificadas como OSCIPs",
              "• Atualização da base de dados com informações sobre as OSCs detentoras do certificado CEBAS conferidos pelo Ministério da Saúde",
              "• Correção de erros na tela de configurações de uso",
              "• Instalação do gerador de estatísticas de acessos de usuários ao Mapa das OSC",
              "• Adição de um sumário na página \"Dúvidas Frequentes\"",
              "• Modificação das informações da seção \"Sobre o Mapa\"",
              "• Criação da página de acessibilidade como recomendado no EMAG 3.1",
              "• Correção do redimensionamento da página principal",
              "• Alteração da rotina de buscas para otimizar as consultas",
              "• Inclusão da possibilidade de buscar as OSCs por CNPJ",
              "• Implementação da escolha em lista utilizando o teclado e tecla “enter”, na rotina de busca",
              "• Correção da imagem associada ao nome do usuário logado no Mapa",
              "• Criação de ambiente de integração contínua",
              "• Migração do projeto para a tecnologia MAVEN 3",
              "• Migração do projeto para a tecnologia Java 1.8",
              "• Adaptação do projeto ao GWT Bootstrap 3"
            ],
    }
    ];

    var historicoNotas = [];
    for (var i in jsonDados){
      historicoNotas.push(new Gloss(jsonDados[i].topico,jsonDados[i].desc));
    }

    HistoricoNotas = React.createFactory(HistoricoNotas);
    ReactDOM.render(HistoricoNotas({dados:historicoNotas}), document.getElementById("historico_notas_formato_dados"));
  });



});
