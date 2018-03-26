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

  require(['componenteAccordion'], function(Glossario){
    function Gloss(topico, desc){
      this.topico = topico;
      this.desc = desc;
    }

  var jsonDados = [
      {
      "topico":"Administração Pública",
      "desc": ["O conceito de Administração Pública abrange dois sentidos: em sentido objetivo, material ou funcional, a Administração Pública pode ser definida como a atividade concreta e imediata que o Estado desenvolve, sob regime jurídico de direito público, para a consecução dos interesses coletivos. Em sentido subjetivo, formal ou orgânico, pode-se definir Administração Pública como sendo o conjunto de órgãos e de pessoas jurídicas ao qual a lei atribui o exercício da função administrativa do Estado.",
               "O MROSC, por exemplo, adota o significado subjetivo de Administração Pública, ou seja, refere-se às pessoas jurídicas que exercem a função administrativa e que deverão ser contempladas pela lei. Assim, o texto da lei menciona todos os entes federativos da Administração Direta – União, Estados e Municípios –e também a Administração Indireta, compreendendo as autarquias, fundações, empresas públicas e sociedades de economia mista respectivas aos entes."]
      },
      {
      "topico":"Associação Privada",
      "desc": ["É formada por grupos de pessoas que se unem em torno de um interesse ou causa comum. As ações de uma associação podem ser voltadas para a coletividade – como é o caso de associações que promovem os direitos das pessoas com deficiência, por exemplo – ou podem ser de benefício mútuo e se restringir a um grupo seleto e homogêneo de associados – como é o caso dos clubes de recreação.",
               "As associações precisam cumprir obrigações definidas no Código Civil, previstas em seus artigos 54 e seguintes, dentre elas algumas exigências face ao estatuto, tais como a previsão de denominação, os fins e a sede da associação; os requisitos para a admissão, demissão e exclusão dos associados; os direitos e deveres dos associados; as fontes de recursos para sua manutenção; o modo de constituição e funcionamento dos órgãos deliberativos e administrativos; as condições para a alteração das disposições estatutárias e para a dissolução e a forma de gestão administrativa e de aprovação das respectivas contas."]
      },
      {
      "topico":"Atividade(s)",
      "desc": ["As Organizações da Sociedade Civil desenvolvem ações de caráter permanente e/ou se dedicam a processos mais breves e limitados no tempo. O MROSC considera “atividades” o conjunto de operações que a OSC realiza de forma contínua ou permanente, e do qual resulta um produto ou serviço que atenda aos interesses compartilhados pela Administração Pública e a OSC."]
      },
      {
      "topico":"Bens Recebidos em Direito de Uso",
      "desc": ["Refere-se aos bens cedidos por um doador a um donatário, de modo que este fica obrigado a mantê-los, sem que tenha, no entanto, direito pleno ao bem, mas apenas direito de uso em relação a ele. Assim, se o ato de doação não for renovado, o bem deve retornar ao seu proprietário de fato. Nessa categoria, estão compreendidas as cessões de comodato, que ocorrem quando, por exemplo, a Administração Pública cede em comodato um prédio público para uso por parte de entidade sem fins lucrativos."]
      },
      {
      "topico":"Bens Remanescentes",
      "desc": ["As parcerias entre OSCs e a Administração Pública podem prever a possibilidade de compra, com recursos financeiros transferidos para a OSC, de bens que tenham caráter permanente, ou seja, que tenham a durabilidade superior a dois anos (art. 14, § 2º, da Lei nº 4320/64, que estabelece normas gerais de direito financeiro) e que precisam de um destino após o fim da parceria.",
               "Os bens remanescentes são aqueles bens de caráter permanente que poderão ser utilizados mesmo após o fim da parceria.",
               "Antes do MROSC, havia incertezas sobre a possibilidade de doação de bens remanescentes às OSCs, bem como a respeito dos benefícios de conservação desses bens pela Administração Pública. A lei agora estabelece que a destinação dos bens remanescentes deve estar prevista de antemão e de forma justificada nos termos da parceria: deverão permanecer com o Poder Público, caso ainda lhe sejam úteis, ou poderão ser doados às OSCs parcerias ou a terceiras entidades, caso sejam relevantes para as ações de interesse social que desempenham."]
      },
      {
      "topico":"Cadastro de CNPJ da Base de dados da Secretaria da Receita Federal (SRF)",
      "desc": ["O CNPJ compreende as informações cadastrais das entidades de interesse das administrações tributárias da União, dos Estados, do Distrito Federal e dos Municípios. A administração do CNPJ compete à Secretaria da Receita Federal."]
      },
      {
      "topico":"Cadastro Nacional de Entidades Ambientalistas (CNEA)",
      "desc": ["Criado pela Resolução nº 006, de 1989, do Conselho Nacional do Meio Ambiente (CONAMA), foi instituído com o objetivo de manter em banco de dados o registro das OSCs cuja finalidade principal seja a defesa do meio ambiente.",
               "O CONAMA utiliza o cadastro como pré-requisito para a eleição dos representantes da sociedade civil das cinco regiões geográficas que ocupam a vaga de conselheiro representante das Entidades Ambientalistas Civis no plenário do grupo. A Resolução nº 292, de 2002, do CONAMA estabelece os procedimentos para registro de entidades ambientalistas."]
      },
      {
      "topico":"Cadastro Nacional das Entidades de Assistência Social (CNEAS)",
      "desc": ["É o cadastro regulamentado pela Lei nº 12.101/2009 e coordenado pela Secretaria Nacional de Assistência Social do Ministério do Desenvolvimento Social e Agrário (MDSA). O CNEAS relaciona as Organizações da Sociedade Civil que desempenham atividades de assistência social e que são acompanhadas por parte do Estado.",
               "O objetivo é armazenar informações importantes sobre as entidades de assistência social e sobre aquelas que ofertam projetos e atividades socioassistenciais, a fim de potencializar a capacidade de monitoramento da gestão pública e de qualificar o reconhecimento dessas ofertas no âmbito do Sistema Único de Assistência Social (SUAS)."]
      },
      {
      "topico":"Cadastro Nacional de Entidades Sociais (CNES)",
      "desc": ["É o instrumento criado pela Portaria nº 24, de 2007, do Ministério da Justiça para registrar as OSCs que tinham os títulos concedidos pela pasta – a saber, Organizações da Sociedade Civil de Interesse Público (OSCIP), Utilidade Pública Federal (UPF) e Organizações Estrangeiras (OEs). O principal objetivo do CNES era receber os relatórios de atividades das entidades tituladas como UPF e emitir a denominada certidão de regularidade de \"prestação de contas\". Contudo, os títulos de UPF foram revogados e as entidades não devem mais apresentar os seus relatórios de atividades.",
               "Em virtude dessas mudanças na legislação, o CNES foi definitivamente desativado pela Portaria nº 362, de 2016. Para dar ampla transparência e garantir o acesso à informação contida anteriormente nesse cadastro, a norma prevê a exportação de todos os seus dados para o Mapa das Organizações da Sociedade Civil. Os dados do extinto CNES estão disponíveis para download na seção Base de dados em formato apropriado para a realização de análises e estudos sobre eles."]
      },
      {
      "topico":"Cadastro Nacional de Estabelecimentos de Saúde (CNES-MS)",
      "desc": ["É o instrumento instituído pela Portaria MS/SAS Nº 376, de 03 de outubro de 2000, tem como missão cadastrar todos os estabelecimentos de saúde: públicos, conveniados e privados, seja pessoa física, seja  jurídica, que realizam qualquer tipo de serviço de atenção à saúde no âmbito do território nacional. O objetivo é propiciar ao gestor público ou privado, de forma simples o conhecimento real de sua rede assistencial, bem como sua capacidade instalada, tornando-se uma ferramenta de apoio para a tomada de decisão e planejamento de ações baseadas na visibilidade do mapeamento assistencial de saúde de seu território.",
               "O cadastro considera \"estabelecimento de saúde\" o \"espaço físico, edificado ou móvel, privado ou público, onde são realizados ações e serviços de saúde, por pessoa física ou jurídica, e que possua responsável técnico, pessoal e infraestrutura compatível com a sua finalidade\"."]
      },
      {
      "topico":"Cadastro Nacional de Informações Sociais (CNIS)",
      "desc": ["É um levantamento realizado anualmente, desde 2007, que disponibiliza um retrato detalhado sobre a estrutura e os serviços prestados nos equipamentos de assistência social de todo o país, contribuindo para a qualificação do planejamento, acompanhamento e avaliação do Sistema Único de Assistência Social (SUAS). A iniciativa é fundamentada pela Lei Orgânica da Assistência Social (LOAS – Lei nº 8.742/1993) e regulamentada pela Resolução nº 145/2004."]
      },

      {
      "topico":"Censo do Sistema Único de Assistência Social (Censo SUAS)",
      "desc": ["Levantamento realizado anualmente, desde 2007, e que faz um retrato detalhado sobre a estrutura e os serviços prestados nos equipamentos de assistência social de todo o país, contribuindo para a qualificação do planejamento, acompanhamento e avaliação do Sistema Único de Assistência Social (SUAS). A iniciativa é fundamentada pela Lei Orgânica da Assistência Social (LOAS – Lei nº 8.742/1993) e regulamentada pela Resolução nº 145/2004."]
      },
      {
      "topico":"Certificado de Entidade Beneficente de Assistência Social (CEBAS)",
      "desc": ["É o certificado conferido pelos Ministérios do Desenvolvimento Social, da Saúde e da Educação para entidades que sejam pessoas jurídicas de direito privado, sem fins lucrativos que atuam nessas áreas e executem atividades continuadas, permanentes e com gratuidade de serviços, priorizando a autonomia a garantia de direitos dos usuários.",
               "As entidades detentoras de CEBAS podem receber isenção do pagamento das contribuições sociais incidentes sobre a remuneração de empregados(as) e transferências de recursos governamentais a título de subvenções sociais."]
      },
      {
      "topico":"Classificação Nacional de Atividades Econômicas (CNAE)",
      "desc": ["A Classificação Nacional de Atividades Econômicas - CNAE é a classificação oficial adotada pelo Sistema Estatístico Nacional do Brasil e pelos órgãos federais, estaduais e municipais gestores de registros administrativos e demais instituições do Brasil. A CNAE foi estruturada tendo como referência a International Standard Industrial Classification of All Economic Activities - ISIC das Nações Unidas e a gestão e manutenção da CNAE é de responsabilidade do IBGE, a partir das deliberações da Comissão Nacional de Classificação - Concla. A CNAE conta atualmente com 581 classes e é o instrumento de padronização nacional dos códigos de atividade econômica e dos critérios de enquadramento utilizados pelos diversos órgãos da Administração Tributária do Brasil. Essa classificação aplica-se a empresas privadas ou públicas, organismos públicos e privados, instituições sem fins lucrativos e agentes autônomos (pessoa física)."]
      },
      {
      "topico":"Comissão de Monitoramento e Avaliação",
      "desc": ["É o órgão colegiado destinado a monitorar e avaliar as parcerias celebradas com Organizações da Sociedade Civil mediante termo de colaboração ou de fomento, constituído por ato publicado em meio oficial de comunicação, assegurada a participação de pelo menos um servidor ocupante de cargo efetivo ou emprego permanente do quadro de pessoal da Administração Pública."]
      },
      {
      "topico":"Comissão de Seleção",
      "desc": ["É o órgão colegiado destinado a processar e julgar chamamentos públicos, constituído por ato publicado em meio oficial de comunicação, no qual é assegurada a participação de pelo menos um servidor ocupante de cargo efetivo ou emprego permanente do quadro de pessoal da Administração Pública."]
      },
      {
      "topico":"Conferências de Políticas Públicas",
      "desc": ["São amplos espaços de participação que ultrapassam o espaço dos conselhos gestores. Convocadas de maneira mais episódica que os conselhos, têm, normalmente, a função de construir subsídios ou mesmo determinar as linhas basilares de uma política, não se tratando de espaços meramente consultivos, mas determinantes nas suas decisões do rumo de uma política.",
               "Algumas dessas conferências são previstas nas próprias leis que regulamentam as políticas públicas, como nas áreas da saúde e da assistência social e sua realização é uma obrigação governamental. Outras são de iniciativa dos governos, podendo ser regulamentadas por decreto ou não.",
               "De modo a evidenciar as diferentes nuances dos direitos em debate e inserir um caráter plural na definição de princípios e diretrizes, as Conferências tentam garantir a representatividade de diversos grupos sociais para que falem por si próprios, bem como, ordinariamente, são garantidas etapas municipais e estaduais de modo a contemplar a diversidade da população brasileira. O IPEA tem alguns trabalhos já realizados em relação a esse assunto, tal como o relatório \"Ampliação da Participação na Gestão Pública: um estudo sobre Conferências Nacionais realizadas entre 2003 e 2011\", publicado em 2013."]
      },
      {
      "topico":"Conselhos Gestores de Políticas Públicas",
      "desc": ["Representaram uma das transformações decorrentes do processo de democratização vivido pelo Brasil no final das décadas de 1980 e 1990. Sua criação esteve ligada ao interesse de garantir canais de participação popular no Brasil para além da democracia representativa. Parte-se do pressuposto de que existe uma sociedade civil que deveria participar de forma institucionalizada dos processos de elaboração e gestão de políticas públicas com competências, inclusive, de exercer o controle acerca de sua efetivação.",
               "No contexto dos Conselhos, há o detalhamento de políticas públicas com atividades cotidianas de controle, planejamento e implementação destas, tomando como base a legislação e os planos de políticas públicas que podem ser construídos em espaços ainda mais amplos de participação como as conferências.",
               "São exemplos de Conselhos Gestores: Conselho de Alimentação Escolar; Conselho de Saúde, Educação e Assistência Social (que existem nas esferas municipal, estadual e federal); Conselho de Controle Social do Bolsa Família; Conselho do Fundeb, dentre outros. O IPEA tem alguns trabalhos já realizados em relação a esse assunto, tal como o relatório \"Conselhos Nacionais: Perfil e Atuação dos Conselheiros\", publicado em 2014."]
      },
      {
      "topico":"Chamamento Público",
      "desc": ["É o procedimento destinado a selecionar as Organização da Sociedade Civil para firmar parceria por meio de termo de colaboração ou de fomento, no qual se garanta a observância dos princípios da isonomia, da legalidade, da impessoalidade, da moralidade, da igualdade, da publicidade, da probidade administrativa, da vinculação ao instrumento convocatório, do julgamento objetivo e dos que lhes são correlatos."]
      },
      {
      "topico":"Contrapartida",
      "desc": ["É a parte correspondente em bens e serviços com que a OSC poderá participar do valor total da parceria para a execução do objeto proposto.",
              "Não é exigida contrapartida financeira como requisito para celebração de parceria, facultada a exigência de contrapartida em bens e serviços cuja expressão monetária será obrigatoriamente identificada no termo de colaboração ou de fomento (Lei nº 13.019, art. 35, § 1°)"]
      },
      {
      "topico":"Cronograma de Desembolso",
      "desc": ["É o quadro demonstrativo que contém a previsão de datas para a liberação dos recursos dos termos de parceria."]
      },
      {
      "topico":"Dirigente",
      "desc": ["É a pessoa que detém poderes de administração, gestão ou controle da Organização da Sociedade Civil, habilitada a assinar termo de colaboração, termo de fomento ou acordo de cooperação com a Administração Pública para a consecução de finalidades de interesse público e recíproco, ainda que delegue essa competência a terceiros."]
      },
      {
      "topico":"Doações de Terceiros",
      "desc": ["Pode ser definida como o contrato em que uma pessoa, por liberalidade, transfere do seu patrimônio bens ou vantagens para o de outra, conforme dispõe o artigo 538 do Código Civil (Lei nº 10.406/2002). Além da doação simples ou pura, há a possibilidade de doação modal ou com encargo. Esse tipo de doação prevê que o favorecido tenha responsabilidades de fato, ficando obrigado a cumprir determinando encargo ou contrapartida. As doações podem ser recebidas na forma de produtos e serviços, com ou sem Nota Fiscal. Neste último caso, o valor das doações pode apenas ser estimado pela organização que as recebem."]
      },
      {
      "topico":"Edital",
      "desc": ["É o instrumento formal que estabelece as normas que regerão determinado processo administrativo seletivo. Como exemplo, pode-se citar o edital de um chamamento público, bem como o edital de um processo licitatório."]
      },
      {
      "topico":"Empresas Públicas e Sociedades de Economia Mista",
      "desc": ["É a pessoa jurídica de direito privado, constituída por capital exclusivamente público em qualquer uma das modalidades empresariais. São exemplos de empresas públicas brasileiras: Caixa Econômica Federal (CEF), Banco Nacional de Desenvolvimento Econômico e Social (BNDES), Serviço Federal de Processamento de Dados (Serpro), Empresa Brasileira de Correios e Telégrafos (ou Correios) e a Empresa Brasil de Comunicação (EBC).",
               "Já a Sociedade de Economia Mista é a pessoa jurídica de direito privado, constituída por capital público e privado. A parte do capital público deve ser maior, pois a maioria das ações deve estar sob o controle do Poder Público. Somente poderá ser constituída na forma de sociedade anônima. O Banco do Brasil, a Petrobras, e o Banco do Nordeste são exemplos de Sociedades de Economia Mista brasileiras."]
      },
      {
      "topico":"Fundação Privada",
      "desc": ["São pessoas jurídicas de direito privado, sem fins econômicos, estando dentro do rol previsto no conceito de OSCs pela Lei nº 13.019/14 e compondo o Mapa das Organizações da Sociedade Civil. São criadas a partir da destinação de bens livres, por escritura pública ou testamento, elaborado por seu instituidor, que pode ser pessoa física ou jurídica.",
               "Depois de criadas, os bens das fundações não mais se confundem com o patrimônio de seus instituidores, devendo ser absolutamente destinadas ao objetivo que a fomentou. As fundações privadas são fiscalizadas, desde a sua criação, pelo Ministério Público, a quem devem prestar contas regularmente.",
               "O Ministério Público tem ainda a função, de acordo com o art. 67 do Código Civil, de se manifestar previamente acerca de qualquer mudança no estatuto. As fundações privadas, tal como as associações, podem requerer os títulos de Organizações Sociais (OSs), conforme a Lei nº 9.637/98, estando aptas a firmar Contratos de Gestão ou Organizações Sociais de Interesse Público (OSCIPs), de acordo com a Lei nº 9.790/99, habilitando-se a realizar Termos de Parceria.",
               "É importante lembrar que as titulações não são necessárias para que a fundação privada realize Termos de Parceria ou Termos de Fomento com o Poder Público."]
      },
      {
      "topico":"Fundo Nacional de Desenvolvimento Científico e Tecnológico (FNDCT/FINEP)",
      "desc": ["Criado em 31 de julho de 1969, por meio do Decreto Lei nº 719, tem a finalidade de dar apoio financeiro aos programas e projetos prioritários de desenvolvimento científico e tecnológico, notadamente para a implantação do Plano Básico de Desenvolvimento Científico Tecnológico (PBDCT) e regulamentado pela Lei do FNDCT (Lei nº 11.540/07) e Decreto nº 6.938/09.",
               "O Fundo é gerido pela Financiadora de Estudos e Projetos (FINEP), empresa pública vinculada ao Ministério da Ciência, Tecnologia e Inovação. A empresa tem o objetivo de desenvolver o Brasil econômica e socialmente por meio do investimento público em Ciência, Tecnologia e Inovação em projetos que abrangem empresas, universidades e outras instituições públicas e privadas."]
      },
      {
      "topico":"Gestor",
      "desc": ["É o agente público responsável pela gestão de parceria celebrada por meio de termo de colaboração ou termo de fomento, designado por ato publicado em meio oficial de comunicação, com poderes de controle e fiscalização."]
      },
      {
      "topico":"Imunidade Tributária",
      "desc": ["É uma limitação constitucional ao poder de tributar, ou seja, nega ao Estado o poder de tributar pessoas ou organizações definidas como imunes. No âmbito das OSCs, a Constituição torna imune a impostos a renda, o patrimônio e os serviços das instituições de educação e de assistência social. Essa imunidade se aplica ainda quanto às contribuições para a seguridade social no caso de entidades que possuam a Certificação de Entidade Beneficente de Assistência Social (CEBAS)."]
      },
      {
      "topico":"Instituto de Pesquisa Econômica Aplicada (IPEA)",
      "desc": ["É uma fundação pública federal vinculada ao Ministério do Planejamento, Desenvolvimento e Gestão. Suas atividades de pesquisa fornecem suporte técnico e institucional às ações governamentais para a formulação e reformulação de políticas públicas e programas de desenvolvimento brasileiros. É responsável pela gestão do Mapa das OSCs."]
      },
      {
      "topico":"Isenção Fiscal",
      "desc": ["É a dispensa de tributo por meio de lei realizada pelo ente federativo competente para instituí-lo. No caso das OSCs, é comum a isenção do imposto de renda e da contribuição social sobre o lucro, prevista na Lei nº 9.532/1997, e a isenção em alguns estados do Imposto sobre a Transmissão Causa Mortis e Doações (ITCMD) – imposto de competência estadual cobrado de quem recebe a doação."]
      },
      {
      "topico":"Lei de Acesso à Informação (LAI)",
      "desc": ["De nº 12.527/2011, regulamenta o direito constitucional de acesso às informações públicas. Essa norma entrou em vigor em 16 de maio de 2012 e criou mecanismos que possibilitam, a qualquer pessoa, física ou jurídica, sem necessidade de apresentar motivo, o recebimento de informações públicas dos órgãos e entidades.",
               "A lei vale para os três Poderes da União, Estados, Distrito Federal e Municípios, inclusive aos Tribunais de Conta e Ministério Público. Entidades privadas sem fins lucrativos também são obrigadas a dar publicidade a informações referentes ao recebimento e à destinação dos recursos públicos por elas recebidos.",
               "As entidades privadas sem fins lucrativos que receberem recursos públicos deverão apresentar em sua página na internet (que poderá ser dispensada caso a entidade não disponha de meio para realizá-la), além de arquivo físico na sua sede, três ordens de informações: 1) cópia do estatuto social atualizado da entidade; 2) relação nominal atualizada dos dirigentes da entidade; e 3) cópia integral das parcerias realizadas com o Poder Executivo federal, respectivos aditivos, e relatórios finais de prestação de contas, na forma da legislação aplicável, desde a pactuação até 180 dias após a prestação de contas final."]
      },
      {
      "topico":"Lei de Diretrizes Orçamentárias (LDO)",
      "desc": ["Estabelece diretrizes para a confecção da Lei Orçamentária Anual (LOA), contendo metas e prioridades do governo federal, despesas de capital para o exercício financeiro seguinte, alterações na legislação tributária e política de aplicação nas agências financeiras de fomento.",
               "Também fixa limites para os orçamentos do Legislativo, Judiciário e Ministério Público e dispõe sobre gastos com pessoal e política fiscal, entre outros temas. Anualmente, deve ser enviada pelo Executivo ao Congresso até 15 de abril e aprovada pelo Legislativo até 30 de junho. Se não for aprovada nesse período, o Congresso não pode ter recesso em julho."]
      },
      {
      "topico":"Lei Orçamentária Anual (LOA)",
      "desc": ["É o orçamento anual enviado pelo Executivo ao Congresso que estima a receita e fixa a despesa do exercício financeiro, ou seja, aponta como o governo vai arrecadar e gastar os recursos públicos. Contém os orçamentos fiscal, da seguridade social e de investimento das estatais.",
              "Anualmente, o projeto de lei que trata do orçamento anual deve ser enviado pelo Executivo ao Congresso até o dia 31 de agosto. Pode ser aprovado até dezembro, mas essa prática não é obrigatória."]
      },
      {
      "topico":"Marco Regulatório das Organizações da Sociedade Civil (MROSC)",
      "desc": ["Estabelecido pela Lei nº 13.019/2014 e válido para a União, estados e Distrito Federal,  cria três instrumentos jurídicos de parceria próprios para as OSCs: o Termo de Fomento, Termo de Colaboração e o Acordo de Cooperação, que apenas poderão ser celebrados por pessoas jurídicas de direito privado sem fins lucrativos. Algumas OSCs que possuem titulações específicas, como Organizações Sociais (OSs) e Organizações da Sociedade Civil de Interesse Público (OSCIPs), poderão celebrar esses três instrumentos de parceria e outros instrumentos previstos em suas legislações específicas (como contrato de gestão, para as OSs, e os termos de parceria, para as OSCIPs).",
               "A entrada em vigor do novo MROSC implica ainda no fim da utilização do convênio como instrumento de parceria com entidades privadas, ficando este restrito às parcerias entre entes federados e à participação de OSCs em serviços de saúde de forma complementar ao SUS, nos termos do artigo 199, §1º, da Constituição Federal.",
               "O novo Marco Regulatório das Organizações da Sociedade Civil estabelece algumas exigências para que uma OSC realize parcerias com o poder público, que incluem:",
               "•	Possuir, no mínimo, um, dois ou três anos de inscrição regular no Cadastro Nacional da Pessoa Jurídica (CNPJ), conforme, respectivamente, a parceria seja celebrada no âmbito dos municípios, Distrito Federal ou dos Estados e da União, admitida a redução desses prazos por ato específico de cada ente na hipótese de nenhuma organização atingi-los;",
               "•	experiência prévia na realização, com efetividade, do objeto da parceria ou de natureza semelhante; e",
               "•	apresentar certidões de regularidade fiscal, previdenciária, tributária, de contribuições e de dívida ativa, de acordo com a legislação aplicável de cada ente federado.",
               "A lei também define condições de impedimento para celebração de parcerias com a Administração Pública, como a impossibilidade de dirigente da entidade ser membro de Poder ou do Ministério Público, ou o caso em que a entidade esteja omissa no dever de prestar contas de parceria anteriormente celebrada."]
      },
      {
      "topico":"Mensalidades ou Contribuições de Associados",
      "desc": ["As Organizações da Sociedade Civil são constituídas por um grupo de pessoas ligadas por uma causa ou objetivo comum, com vistas à transformação social. Esse corpo associativo, além de ser responsável pelas diretrizes estratégias da organização, muitas vezes contribui financeiramente para a sustentabilidade da organização, seja periodicamente (por meio de mensalidades ou anuidades, por exemplo) ou de outro modo."]
      },
      {
      "topico":"Monitoramento e Avaliação",
      "desc": ["São mecanismos compreendidos dentro da lógica processual da parceria realizada entre Poder Público e Organização da Sociedade Civil e devem ser realizados desde o início da execução, de modo a observar se o planejamento estabelecido originariamente está sendo seguido e, caso não esteja, quais as motivações e possibilidades de redefinição de caminhos.",
               "Ambos devem ser praticados com vistas a realizar o apoio e o acompanhamento constantes da execução da parceria, o que possibilita o aprimoramento dos procedimentos, a unificação dos entendimentos, a solução das controvérsias, a padronização dos objetos, os custos, as metas e os indicadores.",
               "As Comissões de Monitoramento e Avaliação são previstas na Lei Nº 13.019/14 como órgãos colegiados competentes a monitorar e avaliar as parcerias celebradas com Organizações da Sociedade Civil. São constituídas por ato publicado em meio oficial de comunicação, assegurada a participação de pelo menos um servidor ocupante de cargo efetivo ou emprego permanente do quadro de pessoal da Administração Pública. Devem ser concebidas como instâncias capazes de avaliar, dialogar e apoiar as decisões dos gestores, tratando do surgimento de questões não observadas nos momentos de planejamento ou da execução e que gerem dúvidas sobre como proceder em casos concretos."]
      },
      {
      "topico":"Natureza Jurídica",
      "desc": ["Diz respeito à identidade dos institutos no mundo do Direito. A partir da verificação dos elementos que o compõem e que o diferenciam em face de outros institutos que existem, estabelece-se sua existência com consequências no mundo jurídico, garantindo direitos e poderes, de um lado, e estabelecendo obrigações.",
               "No que diz respeito ao Mapa das OSCs, constam quatro naturezas jurídicas, todas com verbetes específicos no presente glossário: fundação privada, associação privada, organização religiosa e a organização social (OS), sendo essa última, na verdade, um título que as pessoas jurídicas podem receber, diante do preenchimento de alguns requisitos.",
               "Esse critério de classificação abrange as fundações privadas e associações, tal como já utilizado na pesquisa Fasfil/IBGE, e inclui ainda as Organizações Sociais presentes na Tabela de Natureza Jurídica de 2014."]
      },
      {
      "topico":"Objetivos de Desenvolvimento Sustentável (ODS)",
      "desc": ["Compõem uma agenda mundial – adotada durante a Cúpula das Nações Unidas sobre o Desenvolvimento Sustentável em setembro de 2015, composta por 17 objetivos e 169 metas a serem atingidos até 2030 – na qual estão previstas ações mundiais em quatro dimensões principais:",
               "1- Social: relacionada às necessidades humanas, de saúde, educação, melhoria da qualidade de vida e justiça.",
               "2- Ambiental: trata da preservação e conservação do meio ambiente, com ações que vão da reversão do desmatamento, proteção das florestas e da biodiversidade, combate à desertificação, uso sustentável dos oceanos e recursos marinhos até a adoção de medidas efetivas contra mudanças climáticas.",
               "3- Econômica: aborda o uso e o esgotamento dos recursos naturais, a produção de resíduos, o consumo de energia, entre outros.",
               "4- Institucional: diz respeito às capacidades de colocar em prática os ODS."]
      },
      {
      "topico":"Organização da Sociedade Civil (OSC)",
      "desc": ["São entidades nascidas da livre organização e da participação social da população que desenvolvem ações de interesse público sem visarem ao lucro. As OSCs tratam dos mais diversos temas e interesses, com variadas formas de atuação, financiamento e mobilização.",
               "No Mapa, considera-se OSCs as organizações registradas formalmente (isto é, que possuem CNPJ) e que atendem aos seguintes critérios:",
               "• Privadas: não se integram à estrutura estatal;",
               "•	Sem fins lucrativos: não distribuem eventuais ganhos ou excedentes operacionais entre sócios, fundadores, diretores;",
               "•	Institucionalizadas: possuem personalidade jurídica própria, ou legalmente constituídas",
               "•	Auto-administradas: capazes de gerenciar suas próprias atividades;",
               "•	Voluntárias ou não-compulsórias: constituídas livremente por qualquer grupo de pessoas, sem nenhum impedimento ou constrangimento legal.",
               "No Brasil, esses critérios correspondem a apenas três figuras jurídicas no novo Código Civil: associações privadas, fundações privadas e organizações religiosas. Assim, apenas organizações que pertencem a esses três tipos de pessoas jurídicas são apresentadas no Mapa.",
               "O termo “Organização da Sociedade Civil” (OSC) representa apenas a forma mais recente de fazer referência àquelas entidades antes denominadas “Organizações Não Governamentais” (ONG). Essas entidades constituem atores sociais e políticos cada vez mais presentes nas democracias contemporâneas."]
      },
      {
      "topico":"Organização da Sociedade Civil de Interesse Público (OSCIP)",
      "desc": ["É a titulação prevista em lei conferida somente “às pessoas jurídicas de direito privado, sem fins lucrativos, cujos objetivos sociais tenham pelo menos uma das finalidades (...) tais como, promoção da assistência social, promoção gratuita da educação, defesa, preservação e conservação do meio ambiente e promoção do desenvolvimento sustentável, entre outras” (Lei nº 9.790/1999)."]
      },
      {
      "topico":"Organizações Bilaterais e Multilaterais",
      "desc": ["Existem na forma de grupos de apoio, organizações sem fins lucrativos e agências governamentais e desempenham atividades de diversos tipos, desde a reconstrução de países atingidos por desastres naturais, até a distribuição ou estabelecimento de água potável e de serviços médicos emergenciais.",
               "As organizações bilaterais recebem financiamento do governo em seus países de origem e utilizam esses recursos no apoio a países em desenvolvimento. A United States Agency for International Development (USAID) é uma das organizações bilaterais mais antigas em atuação. Organizações multilaterais recebem financiamento de três ou mais governos (assim como de fontes não governamentais) e prestam serviços e desempenham projetos em vários países. Algumas das principais organizações multilaterais são parte das Nações Unidas, como a UNICEF e a UNDP. O Banco Mundial e a Organização Mundial da Saúde são exemplos adicionais de organizações multilaterais."]
      },
      {
      "topico":"Organização Religiosa",
      "desc": ["São constituídas por pessoas físicas ou jurídicas que professam uma religião segundo seus ditames e sob a perspectiva de uma fé, que lhes forneça o fundamento para suas iniciativas religiosas, educacionais, assistenciais e outras. Podem ser consideradas Organizações da Sociedade Civil (OSC) desde que, tal como definidas no novo Marco Regulatório das Organizações da Sociedade Civil, se dediquem a atividades de interesse público e de cunho social distintas das destinadas a fins exclusivamente religiosos."]
      },
      {
      "topico":"Órgãos de Controle",
      "desc": ["São os órgãos públicos responsáveis por fiscalizar a aplicação dos recursos. Os órgãos de controle nos três poderes e Ministério Público são a Controladoria-Geral da União (CGU), Câmaras de Vereadores e Assembleias Legislativas, Ministério Público Estadual (MPE) e Ministério Público Federal (MPF), Poder Judiciário (Juízes e Tribunais de Justiça), Tribunais de Contas dos Estados (TCE), Tribunais de Contas dos Municípios (TCM), Tribunal de Contas da União (TCU)."]
      },
      {
      "topico":"Parceria com Governo",
      "desc": ["As parcerias voluntárias entre a Administração Pública dos níveis federal, estadual e municipal e as organizações civis compreendem as transferências voluntárias (auxílios, contribuições e subvenções), os instrumentos de parceria vigente previstos em lei (convênio, contrato de repasse, termo de parceria, contrato de gestão, termo de fomento, termo de colaboração) e os recursos provenientes de incentivos fiscais a empresas privadas e destinados a projetos realizados pelas organizações civis."]
      },
      {
      "topico":"Plano de Trabalho",
      "desc": ["É o instrumento programático e integrante do termo de parceria a ser celebrado, independente de sua transcrição, que evidencia o detalhamento das responsabilidades assumidas pela OSC e pela Administração Pública. Não podem ser elaborados de forma genérica, devendo trazer, de forma clara e sucinta, todas as informações suficientes para a identificação do projeto, atividade ou evento de duração certa."]
      },
      {
      "topico":"Plano Plurianual (PPA)",
      "desc": ["É o planejamento das ações do governo para um período de quatro anos. Deve ser enviado pelo Executivo ao Congresso até o dia 31 de agosto, pelo presidente da República no primeiro ano do governo e corresponde ao período que vai do segundo ano de sua administração até o primeiro ano do mandato de seu sucessor."]
      },
      {
      "topico":"Prestação de Contas",
      "desc": ["A Lei nº 13.019/2014 traz um novo olhar sobre a prestação de contas, compartilhando a responsabilidade desta etapa entre as OSCs e a Administração Pública. Pode parecer óbvio, mas é uma importante mudança de abordagem. Afinal, se os recursos utilizados em uma parceria são públicos, é o público, a sociedade como um todo, que deverá saber como o seu dinheiro está sendo usado.",
               "O foco principal está nos resultados, ou seja, no cumprimento do objeto pactuado. Uma boa prestação de contas é o resultado de um bom planejamento e de uma execução cuidadosa, preocupada em atender o que estava previsto no plano de trabalho. Ao se exigir que a prestação de contas e todos os atos que dela decorram sejam feitos em plataforma eletrônica, que permita que qualquer cidadão interessado acompanhe o andamento das atividades e os valores dispendidos, a lei também amplia o olhar do controle para além dos órgãos institucionalmente, trazendo ao cidadão também essa responsabilidade."]
      },
      {
      "topico":"Prestação de Serviços",
      "desc": ["As atividades realizadas por uma organização com o fim de atendimento do beneficiário de ações sociais pode retornar dividendos para a entidade. No entanto, as receitas auferidas em virtude de prestação de serviços, bem como de venda de produtos, devem ser revertidas aos projetos sociais desenvolvidos pela entidade sem fins lucrativos e devem guardar nexo causal com a sua missão institucional ou finalidade estatutária."]
      },
      {
      "topico":"Projeto",
      "desc": ["É o conjunto de operações, limitadas no tempo, das quais resulta um produto destinado à satisfação de interesses compartilhados pela Administração Pública e pela Organização da Sociedade Civil."]
      },
      {
      "topico":"Relação Anual de Informações Sociais (RAIS)",
      "desc": ["Consiste em um Registro Administrativo criado em 1975, com periodicidade anual, visando suprir necessidades da gestão governamental para o setor de trabalho e emprego, por meio de informações que auxiliam no: 1) controle da atividade trabalhista no país; 2) provimento de dados para a elaboração de estatísticas de trabalho; e 3) disponibilização de informações do mercado de trabalho às entidades governamentais."]
      },
      {
      "topico":"Rendimentos de Fundos Patrimoniais (FPs)",
      "desc": ["São estruturas que oferecem sustentabilidade financeira a uma organização sem fins lucrativos. Nascem com frequência com o fim de preservarem o valor doado a uma organização (chamado de principal), utilizando para sua manutenção e atividades apenas os rendimentos resultantes do investimento desse fundo."]
      },
      {
      "topico":"Rendimentos Financeiros de Reservas ou Contas Correntes Próprias",
      "desc": ["A criação de fundos de reserva prevê a destinação periódica de parte dos recursos financeiros excedentes de uma organização para uma conta específica, que pode ser uma conta corrente, conta poupança ou outra com melhor rendimento. Os fundos de reserva são frequentemente usados pelas organizações no atendimento emergencial de despesas ordinárias do dia a dia da entidade."]
      },
      {
      "topico":"Sistema da Lei de Incentivo ao Esporte (SLIE)",
      "desc": ["A Lei nº 11.438/06 regulamenta o incentivo fiscal a pessoas físicas e jurídicas que realizam doações ou patrocínio a projetos desportivos e paradesportivos apresentados por órgãos públicos e entidades privadas sem fins lucrativos. O Sistema tem plataforma eletrônica para cadastro de propostas relacionadas à lei e é administrado pela Comissão Técnica da Lei de Incentivo ao Esporte, dentro do Departamento de Incentivo e Fomento ao Esporte do Ministério do Esporte."]
      },
      {
      "topico":"Sistema de Apresentação das Leis de Incentivo à Cultura (SALIC)",
      "desc": ["É o sistema informatizado do Ministério da Cultura pelo qual é feito o recebimento, a análise das propostas culturais e também a aprovação, execução, acompanhamento e a prestação de contas dos projetos culturais elaborados por pessoas físicas e jurídicas. É regulamentado pela Portaria MINC nº 30/09 e coordenado pela Secretaria de Fomento e Incentivo à Cultura (SEFIC) do Ministério da Cultura (MinC)."]
      },
      {
      "topico":"Sistema de Gestão de Convênios e Contratos (SICONV)",
      "desc": ["Sistema que reúne e processa informações sobre as transferências de recursos do Governo Federal para órgãos públicos e privados sem fins lucrativos. É administrado pela Secretaria de Logística e Tecnologia da Informação do MPOG. O repasse é realizado por meio de termos de colaboração, de fomento e acordo de cooperação, que são destinados à execução de programas, projetos e ações que sejam de interesse comum. Todos os procedimentos referentes à seleção, formalização, execução, acompanhamento e prestação de contas dos contratos, convênios e parcerias são realizados diretamente no SICONV."]
      },
      {
      "topico":"Sistema Integrado de Administração Financeira (SIAFI)",
      "desc": ["Trata-se do principal instrumento utilizado pelo Ministério da Fazenda/Tesouro Nacional para o registro, acompanhamento e controle da execução orçamentária, financeira e patrimonial do Governo Federal. Os repasses de recursos para entidades sem fins lucrativos podem ocorrer de forma direta ou indireta, por meio de órgão ou entidade da Administração Pública estadual, municipal ou distrital, com a condição de que as atividades desempenhadas estejam de acordo com o programa de governo ou impliquem na realização de projeto, serviço ou evento de interesse recíproco."]
      },
      {
      "topico":"Termo de Colaboração",
      "desc": ["É o instrumento utilizado para a execução de políticas públicas nas mais diferentes áreas, nos casos em que a política pública em questão já tem parâmetros consolidados, com indicadores e formas de avaliação conhecidos, integrando muitas vezes sistemas orgânicos, como por exemplo, o Sistema Único de Assistência Social (SUAS). Em sua maioria, são as políticas que se destinam à manutenção de equipamentos de assistência social, creches ou ao atendimento educacional especializado, programas de proteção a pessoas ameaçadas ou em situação que possa comprometer a sua segurança, entre outros."]
      },
      {
      "topico":"Termo de Fomento",
      "desc": ["É o instrumento que pode apoiar e reconhecer iniciativas das próprias organizações, buscando atrair para as políticas públicas tecnologias sociais inovadoras, fomentar projetos e eventos nas mais diversas áreas e ampliar o alcance das ações desenvolvidas por parte das organizações.  Como exemplo, pode-se citar o fomento à capacitação de grupos de agricultura familiar, projetos de enfrentamento à violência contra a mulher ou de proteção e promoção de direitos das pessoas com deficiência, exposições de arte, cultura popular, entre outros."]
      },
      {
      "topico":"Utilidade Pública (Títulos)",
      "desc": ["Foi extinto por meio da Lei nº 13.204 de 2015, que alterou trechos do MROSC e revogou a Lei nº 91 de 1935. Essa medida visou estender a todas as organizações sem fins lucrativos os benefícios previstos em lei, independentemente da exigência de cumprir requisitos formais e burocráticos para certificação e titulação de UPF.",
               "Os Títulos de Utilidade Pública estaduais e municipais, no entanto, continuam em vigor. Os benefícios concedidos para as organizações tituladas variam de acordo com as legislações locais, abrangendo desde a possibilidade de dedução fiscal de certos tributos à permissão de celebração de parcerias com o Poder Público."]
      },
      {
      "topico":"Venda de Bens e Direitos",
      "desc": ["Cessão onerosa da marca associada a uma Organização da Sociedade Civil para empresas privadas que, em troca, pagam royalties ou direitos autorais. Dessa forma, as empresas podem ter seus produtos associados à imagem de OSCs consideradas referência em determinadas áreas de atuação, que, por sua vez, garantem fontes alternativas de financiamento para suas atividades."]
      },
      {
      "topico":"Venda de Produtos",
      "desc": ["Formas de captação de recursos mais utilizadas pelas Organizações da Sociedade Civil, já que os produtos podem ser confeccionados pela própria instituição. Os itens confeccionados pelos membros da OSC podem ser vendidos ou utilizados internamente, minimizando os custos internos da instituição."]
      }
    ];

    var glossario = [];
    for (var i in jsonDados){
      glossario.push(new Gloss(jsonDados[i].topico,jsonDados[i].desc));
    }

    Glossario = React.createFactory(Glossario);
    ReactDOM.render(Glossario({dados:glossario}), document.getElementById("glossario_formato_dados"));
  });



});
