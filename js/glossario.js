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

  require(['componenteGlossario'], function(Glossario){
    function Gloss(topico, desc){
      this.topico = topico;
      this.desc = desc;

    }
//var topico = ["Título do topico"]
//var desc = ["Descrição do topico"]
    var topico = ["Rendimentos de fundos patrimoniais","Rendimentos financeiros de reservas ou contas correntes próprias",
    "Mensalidades ou contribuições de associados","Venda de produtos","Prestação de serviços", "Venda de bens e direitos",
    "Parceria com governo","Organizações bilaterais e multilaterais","Empresas públicas e sociedades de economia mista",
    "Doações de terceiros","Isenção fiscal","Imunidade tributária", "Bens recebidos em direito de uso"
  ];
    var desc = ["Fundos patrimoniais são estruturas que oferecem sustentabilidade financeira a uma organização sem fins lucrativos. Os FPs nascem com frequência com o fim de preservarem o valor doado a uma organização (chamado de principal), utilizando para sua manutenção e atividades apenas os rendimentos resultantes do investimento desse fundo.",
    "A criação de fundos de reserva prevê a destinação periódica de parte dos recursos financeiros excedentes de uma organização para uma conta específica, que pode ser uma conta corrente, conta poupança ou outra com melhor rendimento. Os fundos de reserva são frequentemente usados pelas organizações no atendimento emergencial de despesas ordinárias do dia a dia da entidade.",
    "As organizações da sociedade civil são constituídas por um grupo de pessoas ligadas por uma causa ou objetivo comum, com vistas à transformação social. Esse corpo associativo, além de ser responsável pelas diretrizes e estratégicas da organização, muitas vezes contribui financeiramente para a sustentabilidade da organização, seja periodicamente (por meio de mensalidades ou anuidades, por exemplo) ou de outro modo.",
    "Esta é uma das formas de captação mais utilizadas pelas organizações, já que os produtos podem ser confeccionados pela própria instituição. Os produtos confeccionados pelos membros da organização podem ser vendidos ou utilizados internamente, minimizando os custos internos da instituição.",
    "As atividades realizadas por uma organização com o fim de atendimento do beneficiário de ações sociais pode retornar dividendos para a entidade. No entanto, as receitas auferidas em virtude de prestação de serviços, bem como de venda de produtos, devem ser revertidas aos projetos sociais desenvolvidos pela entidade sem fins lucrativos e devem guardar nexo causal com a sua missão institucional ou finalidade estatutária.",
    "Cessão onerosa da marca associada a uma organização civil para empresas privadas que, em troca, pagam royalties ou direitos autorais. Dessa forma, as empresas podem ter seus produtos associados à imagem de OSCs consideradas referência em determinadas áreas de atuação, que, por sua vez, garantem fontes alternativas de financiamento para suas atividades.",
    "As parcerias voluntárias entre a administração pública dos níveis federal, estadual e municipal e as organizações civis compreendem as transferências voluntárias (auxílios, contribuições e subvenções), os instrumentos de parceria vigente previstos em lei (convênio, contrato de repasse, termo de parceria, contrato de gestão, termo de fomento, termo de colaboração) e os recursos provenientes de incentivos fiscais a empresas privadas e destinados a projetos realizados pelas organizações civis.",
    "As organizações bilaterais existem na forma de grupos de apoio, organizações sem fins lucrativos e agências governamentais.  Essas organizações desempenham atividades de diversos tipos, desde a reconstrução de países atingidos por desastres naturais, até a distribuição ou estabelecimento de água potável e de serviços médicos emergenciais. As organizações bilaterais recebem financiamento do governo em seus países de origem e utilizam esses recursos no apoio a países em desenvolvimento. A United States Agency for International Development (USAID) é uma das organizações bilaterais mais antigas em atuação. Organizações multilaterais recebem financiamento de três ou mais governos (assim como de fontes não governamentais) e prestam serviços e desempenham projetos em vários países. Algumas das principais organizações multilaterais são parte das Nações Unidas, como a UNICEF e a UNDP. O Banco Mundial e a Organização Mundial da Saúde são exemplos adicionais de organizações multilaterais.",
    "Empresa pública é pessoa jurídica de direito privado, constituída por capital exclusivamente público e podendo ser constituída em qualquer uma das modalidades empresariais. São exemplos de empresas públicas brasileiras: Caixa Econômica Federal (CEF), Banco Nacional de Desenvolvimento Econômico e Social (BNDES), Serviço Federal de Processamento de Dados (Serpro), a Empresa Brasileira de Correios e Telégrafos (ou Correios) e a Empresa Brasil de Comunicação (EBC). Sociedade de economia mista é pessoa jurídica de direito privado, constituída por capital público e privado. A parte do capital público deve ser maior, pois a maioria das ações deve estar sob o controle do Poder Público. Somente poderá ser constituída na forma de sociedade anônima. O Banco do Brasil, a Petrobras, o Banco do Nordeste e a Eletrobras são exemplos de sociedades de economia mista brasileiras.",
    "Doação pode ser definida como o contrato em que uma pessoa, por liberalidade, transfere do seu patrimônio bens ou vantagens para o de outra, conforme dispõe o artigo 538 do Código Civil (Lei no 10.406/2002). Além da doação simples ou pura, há a possibilidade de doação modal ou com encargo. Esse tipo de doação prevê que o recebedor da doação tenha responsabilidades de fato, ficando obrigado a cumprir determinando encargo ou contrapartida. As doações podem ser recebidas na forma de produtos e serviços, com ou sem Nota Fiscal. Neste último caso, o valor das doações pode apenas ser estimado pela organização que as recebem.",
    "A isenção fiscal é a dispensa de tributo por meio de lei realizada pelo ente federativo competente para institui-lo. No caso das OSCs, é comum a isenção do imposto de renda e da contribuição social sobre o lucro, prevista na Lei nº 9.532/1997, e a isenção em alguns estados do Imposto sobre a Transmissão Causa Mortis e Doações (ITCMD) – imposto de competência estadual cobrado de quem recebe a doação.",
    "A imunidade é uma limitação constitucional ao poder de tributar, ou seja, nega ao Estado o poder de tributar pessoas ou organizações definidas como imunes. No âmbito das OSCs, a Constituição torna imune a impostos a renda, o patrimônio e os serviços das instituições de educação e de assistência social. Essa imunidade se aplica ainda quanto às contribuições para a seguridade social no caso de entidades que possuam a Certificação de Entidade Beneficente de Assistência Social (Cebas).",
    "Bens cedidos por um doador a um donatário, de modo que este fica obrigado a manter e cuidar dos bens doados, sem que tenha, no entanto, direito pleno ao bem, mas apenas direito de uso em relação a ele. Assim, se o ato de doação não for renovado, o bem deve retornar ao seu proprietário de fato. Nesta categoria, estão compreendidas as cessões de comodato, que ocorrem quando, por exemplo, a administração pública cede em comodato um prédio público para uso por parte de entidade sem fins lucrativos."
  ];

    var glossario = [];
    for (var i=0; i<topico.length; i++){
      glossario.push(new Gloss(topico[i], desc[i]));
    }

    Glossario = React.createFactory(Glossario);
    ReactDOM.render(Glossario({dados:glossario}), document.getElementById("glossario_formato_dados"));
  });



});
