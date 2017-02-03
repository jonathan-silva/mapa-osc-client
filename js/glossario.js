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
    "topico":"Acordo de Cooperação",
    "desc": ["O Marco Regulatório das Organizações da Sociedade Civil (MROSC) (Lei 13.019/2014) estabelece três instrumentos de parcerias que servirão à formalização das relações entre OSCs e administração pública, para a consecução de finalidades de interesse público, mas que também sejam pertinentes ao eixo de atuação da OSC. O Acordo de Cooperação, que consiste na parceria que não envolve repasse de recursos financeiros, é um dos três instrumentos criados no MROSC.",
             "Um exemplo de acordo de cooperação poderia ser firmado por uma OSC da área da infância e juventude com a Promotoria Especializada para utilização de sala para atendimento emergencial de casos pela equipe da OSC."],
    },
    {
    "topico":"Administrador Público",
    "desc": ["É a pessoa física que responde pelo órgão da Administração Pública que está realizando a parceria com a OSC. Em outras palavras, é o agente público que tem a competência para assinar os instrumentos de pactuação com a OSC e que pode autorizar terceiros a assinarem em seu lugar, delegando sua competência. "],
    },
    {
    "topico":"Administração Pública",
    "desc": ["O conceito de Administração Pública abrange dois sentidos: em sentido objetivo, material ou funcional, a Administração Pública pode ser definida como a atividade concreta e imediata que o Estado desenvolve, sob regime jurídico de direito público, para a consecução dos interesses coletivos. Em sentido subjetivo, formal ou orgânico, pode-se definir Administração Pública como sendo o conjunto de órgãos e de pessoas jurídicas ao qual a lei atribui o exercício da função administrativa do Estado. ",
             "O MROSC, por exemplo, adota o significado subjetivo de Administração Pública, ou seja, refere-se às pessoas jurídicas que exercem a função administrativa e que deverão ser contempladas pela lei. Assim, o texto da lei menciona todos os entes federativos da Administração Direta -- União, Estados e Municípios -- e também a Administração indireta, compreendendo as autarquias, fundações, empresas públicas e sociedades de economia mista respectivas aos entes. "],
    },
    {
    "topico":"Associação Privada",
    "desc": ["As associações privadas são formadas por grupos de pessoas que se unem em torno de um interesse ou causa comum. A causa de uma associação pode ser voltada para a coletividade – como é o caso de associações que promovem os direitos das pessoas com deficiência, por exemplo – ou pode ser de benefício mútuo e se restringir a um grupo seleto e homogêneo de associados – como fazem os clubes de recreação, por exemplo.",
             "As associações precisam cumprir obrigações definidas no Código Civil, previstas em seus artigos 54 e seguintes, dentre elas algumas exigências face ao estatuto, tais como a previsão de denominação, os fins e a sede da associação; os requisitos para a admissão, demissão e exclusão dos associados; os direitos e deveres dos associados; as fontes de recursos para sua manutenção; o modo de constituição e funcionamento dos órgãos deliberativos e administrativos; o modo de constituição e de funcionamento dos órgãos deliberativos; as condições para a alteração das disposições estatutárias e para a dissolução e a forma de gestão administrativa e de aprovação das respectivas contas."],
    },
    {
    "topico":"Atividade(s)",
    "desc": ["As organizações da sociedade civil desenvolvem ações de caráter permanente e/ou se dedicam a processos mais breves e limitados no tempo. O MROSC chamou de “atividades” o conjunto de operações que a OSC realiza de forma contínua ou permanente, e do qual resulta um produto ou serviço que atenda aos interesses compartilhados pela administração pública e a OSC. "]
    },
    {
    "topico":"Bens Recebidos em Direito de Uso",
    "desc": ["Bens cedidos por um doador a um donatário, de modo que este fica obrigado a manter e cuidar dos bens doados, sem que tenha, no entanto, direito pleno ao bem, mas apenas direito de uso em relação a ele. Assim, se o ato de doação não for renovado, o bem deve retornar ao seu proprietário de fato. Nesta categoria, estão compreendidas as cessões de comodato, que ocorrem quando, por exemplo, a administração pública cede em comodato um prédio público para uso por parte de entidade sem fins lucrativos."],
    },
    {
    "topico":"Bens Remanescentes",
    "desc": ["As parcerias entre OSCs e a Administração Pública podem prever a possibilidade de compra, com recursos financeiros transferidos para a OSC, de bens que tenham caráter permanente, ou seja, que tenham a durabilidade superior a dois anos (art. 14, § 2º, da lei 4320/64, que estabelece normas gerais de direito financeiro) e que precisam de um destino após o fim da parceria.",
             "Os bens remanescentes são aqueles bens de caráter permanente que poderão ser utilizados mesmo após o fim da parceria.",
             "Antes do MROSC, havia incertezas sobre a possibilidade de doação de bens remanescentes às OSCs, bem como a respeito dos benefícios de conservação desses bens pela Administração Pública.  A nova lei estabelece que a destinação dos bens remanescentes deve estar prevista de antemão e de forma justificada nos termos da parceria: deverão permanecer com o Poder Público, caso ainda lhe sejam úteis, ou poderão ser doados às OSCs parcerias ou a terceiras entidades, caso sejam relevantes para as ações de interesse social que desempenhem. "],
    },
    {
    "topico":"CEBAS",
    "desc": ["O CEBAS é o Certificado de Entidade Beneficente de Assistência Social, que é conferido pelos Ministérios do Desenvolvimento Social, da Saúde e da Educação para entidades que sejam pessoas jurídicas de direito privado, sem fins lucrativos que atuem nessas áreas e executem atividades continuadas, permanentes e com gratuidade de serviços, priorizando a autonomia a garantia de direitos dos usuários.",
             "As entidades detentoras de CEBAS podem receber isenção do pagamento das contribuições sociais incidentes sobre a remuneração de empregados(as) e receber transferências de recursos governamentais a título de subvenções sociais."],
    },
    {
    "topico":"CNEA (Cadastro Nacional de Entidades Ambientalistas)",
    "desc": ["Criado pela Resolução CONAMA Nº 006 de 1989, o CNEA foi instituído com o objetivo de manter em banco de dados o registro das OSCs cuja finalidade principal seja a defesa do meio ambiente.",
             "O Conselho Nacional do Meio Ambiente (CONAMA) utiliza o cadastro como pré-requisito para a eleição dos representantes da sociedade civil das cinco regiões geográficas que ocupam a vaga de conselheiro representante das Entidades Ambientalistas Civis no plenário do CONAMA. A Resolução Nº. 292 de 2002 do CONAMA estabelece os procedimentos para registro de entidades ambientalistas."],
    },
    {
    "topico":"Cadastro Nacional das Entidades de Assistência Social (CNEAS)",
    "desc": ["O cadastro é regulamentado pela Lei nº 12.101/2009 e coordenado pela Secretaria Nacional de Assistência Social do Ministério do Desenvolvimento Social e Agrário - MDSA. O CNEAS relaciona as organizações da sociedade civil que desempenham atividades de assistência social e que são acompanhadas por parte do Estado.",
             "O cadastro tem como objetivo armazenar informações importantes sobre as entidades de assistência social e sobre aquelas que ofertam projetos e atividades socioassistenciais, a fim de potencializar a capacidade de monitoramento da gestão pública e de qualificar o reconhecimento dessas ofertas no âmbito do SUAS."],
    },
    {
    "topico":"Cadastro Nacional de Entidades Sociais (CNES)",
    "desc": ["O CNES foi criado pela Portaria MJ nº 24 de 2007 para registrar as OSCs que tinham os títulos concedidos pelo Ministério da Justiça -- a saber, Organizações da Sociedade Civil de Interesse Público (OSCIP), Utilidade Pública Federal (UPF) e Organizações Estrangeiras (OEs). O principal objetivo do CNES era receber os relatórios de atividades das entidades tituladas como UPF e emitir a denominada certidão de regularidade de “prestação de contas”. Contudo, os títulos de UPF foram revogados e as entidades não devem mais apresentar os seus relatórios de atividades.",
             "Em virtude dessas mudanças na legislação, o CNES foi definitivamente desativado pela Portaria MJ nº 362 de 2016. Para dar ampla transparência e garantir o acesso à informação contida anteriormente nesse cadastro, a norma prevê a exportação de todos os seus dados para o Mapa das Organizações da Sociedade Civil.Os dados do extinto CNES estão disponíveis para download na seção \"Base de dados\", em formato apropriado para a realização de análises e estudos sobre eles."],
    },
    {
    "topico":"Cadastro Nacional de Estabelecimentos de Saúde (CNES-MS)",
    "desc": ["O Cadastro Nacional dos Estabelecimentos de Saúde foi instituído pela Portaria MS/SAS nº 376, de 03 de outubro de 2000, e tem como missão: Cadastrar todos os Estabelecimentos de Saúde: Públicos, Conveniados e Privados, seja pessoa física ou jurídica, que realizam qualquer tipo de serviço de atenção à Saúde no Âmbito do território Nacional e visão: Propiciar ao gestor público ou privado, de forma simples o conhecimento real de sua rede assistencial, bem como sua capacidade instalada, tornando-se uma ferramenta de apoio para a tomada de decisão e planejamento de ações baseada na visibilidade do mapeamento assistencial de saúde de seu território.",
             "O cadastro considera \"Estabelecimento de Saúde\" o \"Espaço físico, edificado ou móvel, privado ou público, onde são realizados ações e serviços de saúde, por pessoa física ou jurídica, e que possua responsável técnico, pessoal e infraestrutura compatível com a sua finalidade\"."],
    },
    {
    "topico":"Censo do Sistema Único de Assistência Social (Censo SUAS)",
    "desc": ["Levantamento realizado anualmente, desde 2007, e que faz um retrato detalhado sobre a estrutura e os serviços prestados nos equipamentos de assistência social de todo o país, contribuindo para a qualificação do planejamento, acompanhamento e avaliação do Sistema Único de Assistência Social (SUAS). A iniciativa é fundamentada pela Lei Orgânica da Assistência Social (LOAS – Lei nº 8.742/1993) e regulamentada pela Resolução nº 145/2004."]
    },
    {
    "topico":"Comissão de Monitoramento e Avaliação",
    "desc": ["A comissão de monitoramento e avaliação é o órgão colegiado destinado a monitorar e avaliar as parcerias celebradas com organizações da sociedade civil mediante termo de colaboração ou termo de fomento, constituído por ato publicado em meio oficial de comunicação, assegurada a participação de pelo menos um servidor ocupante de cargo efetivo ou emprego permanente do quadro de pessoal da administração pública;"],
    },
    {
    "topico":"Comissão de Seleção",
    "desc": ["A comissão de seleção é o órgão colegiado destinado a processar e julgar chamamentos públicos, constituído por ato publicado em meio oficial de comunicação, assegurada a participação de pelo menos um servidor ocupante de cargo efetivo ou emprego permanente do quadro de pessoal da administração pública."],
    },
    {
    "topico":"Conferências de Políticas Públicas",
    "desc": ["As conferências de políticas públicas são amplos espaços de participação que ultrapassam o espaço dos conselhos gestores. Convocadas de maneira mais episódica que os conselhos, têm, normalmente, a função de construir subsídios ou mesmo determinar as linhas basilares de uma política, não se tratando de espaços meramente consultivos, mas determinantes nas suas decisões do rumo de uma política. ",
             "Algumas dessas conferências são previstas nas próprias leis que regulamentam as políticas públicas, como nas áreas da saúde e da assistência social e sua realização é uma obrigação governamental. Outras são de iniciativa dos governos, podendo ser regulamentadas por decreto ou não.",
             "De modo a evidenciar as diferentes nuances dos direitos em debate e inserir um caráter plural na definição de princípios e diretrizes, tenta garantir a representatividade de diversos grupos sociais para que falem por si próprios, bem como, ordinariamente, são garantidas etapas municipais e estaduais de modo a contemplar a diversidade da população brasileira. O IPEA tem alguns trabalhos já realizados em relação a esse assunto, tal como o relatório \"Ampliação da Participação na Gestão Pública um estudo sobre Conferências Nacionais realizadas entre 2003 e 2011.\" publicado em 2013."],
    },
    {
    "topico":"Conselhos Gestores de Políticas Públicas",
    "desc": ["Os conselhos gestores de políticas públicas representaram uma das transformações decorrentes do processo de democratização vivido pelo Brasil no final da década de 80 e 90. Sua criação esteve ligada ao interesse de garantir canais de participação popular no Brasil para além da democracia representativa. Parte-se do pressuposto de que existe uma sociedade civil que deveria participar de forma institucionalizada dos processos de elaboração e gestão de políticas públicas com competências, inclusive, de exercer o controle acerca de sua efetivação.",
             "No contexto dos conselhos, há o detalhamento de políticas públicas com atividades cotidianas de controle, planejamento e implementação destas, tomando como base a legislação e os planos de políticas públicas que podem ser construídos em espaços ainda mais amplos de participação como as conferências (vide verbete abaixo):",
             "Temos como exemplos de conselhos gestores: Conselho de Alimentação Escolar; Conselho de Saúde, Educação e Assistência Social (que existem nas esferas municipal, estadual e federal), Conselho de Controle Social do Bolsa Família, Conselho do Fundeb, dentre outros.",
             "O IPEA tem alguns trabalhos já realizados em relação a esse assunto, tal como o relatório \"Conselhos Nacionais: Perfil e Atuação dos Conselheiros\", publicado em 2014."],
    },
    {
    "topico":"Dirigente",
    "desc": ["É a pessoa que detenha poderes de administração, gestão ou controle da organização da sociedade civil, habilitada a assinar termo de colaboração, termo de fomento ou acordo de cooperação com a administração pública para a consecução de finalidades de interesse público e recíproco, ainda que delegue essa competência a terceiros."],
    },
    {
    "topico":"Doações de Terceiros",
    "desc": ["Doação pode ser definida como o contrato em que uma pessoa, por liberalidade, transfere do seu patrimônio bens ou vantagens para o de outra, conforme dispõe o artigo 538 do Código Civil (Lei no 10.406/2002). Além da doação simples ou pura, há a possibilidade de doação modal ou com encargo. Esse tipo de doação prevê que o recebedor da doação tenha responsabilidades de fato, ficando obrigado a cumprir determinando encargo ou contrapartida. As doações podem ser recebidas na forma de produtos e serviços, com ou sem Nota Fiscal. Neste último caso, o valor das doações pode apenas ser estimado pela organização que as recebem"],
    },
    {
    "topico":"Empresas Públicas e Sociedades de Economia Mista",
    "desc": ["Empresa pública é pessoa jurídica de direito privado, constituída por capital exclusivamente público e podendo ser constituída em qualquer uma das modalidades empresariais. São exemplos de empresas públicas brasileiras: Caixa Econômica Federal (CEF), Banco Nacional de Desenvolvimento Econômico e Social (BNDES), Serviço Federal de Processamento de Dados (Serpro), a Empresa Brasileira de Correios e Telégrafos (ou Correios) e a Empresa Brasil de Comunicação (EBC). ",
             "Sociedade de economia mista é pessoa jurídica de direito privado, constituída por capital público e privado. A parte do capital público deve ser maior, pois a maioria das ações deve estar sob o controle do Poder Público. Somente poderá ser constituída na forma de sociedade anônima. O Banco do Brasil, a Petrobras, o Banco do Nordeste e a Eletrobras são exemplos de sociedades de economia mista brasileiras."],
    },
    {
    "topico":"Fundação Privada",
    "desc": ["As fundações privadas são pessoas jurídicas de direito privado, sem fins econômicos, estando dentro do rol previsto no conceito de OSCs previsto pela lei 13.019/14 e compondo o Mapa das Organizações da Sociedade Civil.",
             "São criadas a partir da destinação de bens livres, por escritura pública ou testamento, elaborado por seu instituidor, que pode ser pessoa física ou jurídica. Depois de criadas, os bens das fundações não mais se confundem com o patrimônio de seus instituidores, devendo ser absolutamente destinadas ao objetivo que fomentou a destinação de bens.",
             "As fundações privadas são fiscalizadas, desde a sua criação, pelo Ministério Público, a quem devem prestar contas regularmente. O Ministério Público tem ainda a função, de acordo com o art. 67 do Código Civil, de se manifestar previamente acerca de qualquer mudança no estatuto.",
             "As fundações privadas, tal como as associações, podem requerer os títulos de Organizações Sociais - OSs, conforme Lei 9.637/98, estando habilitadas a firmar Contratos de Gestão ou Organizações Sociais de Interesse Público - OSCIPs, conforme Lei 9.790/99, habilitando-se a realizar Termos de Parceria. Importa lembrar que as titulações não são necessárias para que a fundação privada realize Termos de Parceria ou Termos de Fomento com o Poder Público."],
    },
    {
    "topico":"Fundo Nacional de Desenvolvimento Científico e Tecnológico (FNDCT/FINEP)",
    "desc": ["O Fundo Nacional de Desenvolvimento Científico e Tecnológico foi criado em 31 de julho de 1969, através do Decreto Lei nº 719, com a finalidade de dar apoio financeiro aos programas e projetos prioritários de desenvolvimento científico e tecnológico, notadamente para a implantação do Plano Básico de Desenvolvimento Científico Tecnológico (PBDCT) e regulamentado pela Lei do FNDCT (Lei nº 11.540/07) e Decreto nº 6.938/09.",
             "O fundo é gerido pela FINEP - Financiadora de Estudos e Projetos, empresa pública vinculada ao Ministério da Ciência, Tecnologia e Inovação. A empresa tem o objetivo de desenvolver o Brasil econômica e socialmente por meio do invest0069mento público em Ciência, Tecnologia e Inovação em projetos que abrangem empresas, universidades e outras instituições públicas e privadas."],
    },
    {
    "topico":"Gestor",
    "desc": ["Gestor é o agente público responsável pela gestão de parceria celebrada por meio de termo de colaboração ou termo de fomento, designado por ato publicado em meio oficial de comunicação, com poderes de controle e fiscalização."],
    },
    {
    "topico":"Imunidade Tributária",
    "desc": ["A imunidade é uma limitação constitucional ao poder de tributar, ou seja, nega ao Estado o poder de tributar pessoas ou organizações definidas como imunes. No âmbito das OSCs, a Constituição torna imune a impostos a renda, o patrimônio e os serviços das instituições de educação e de assistência social. Essa imunidade se aplica ainda quanto às contribuições para a seguridade social no caso de entidades que possuam a Certificação de Entidade Beneficente de Assistência Social (Cebas)."],
    },
    {
    "topico":"Isenção Fiscal",
    "desc": ["A isenção fiscal é a dispensa de tributo por meio de lei realizada pelo ente federativo competente para institui-lo. No caso das OSCs, é comum a isenção do imposto de renda e da contribuição social sobre o lucro, prevista na Lei nº 9.532/1997, e a isenção em alguns estados do Imposto sobre a Transmissão Causa Mortis e Doações (ITCMD) – imposto de competência estadual cobrado de quem recebe a doação"],
    },
    {
    "topico":"Lei de Acesso à Informação (LAI)",
    "desc": ["A Lei nº 12.527/2011 regulamenta o direito constitucional de acesso às informações públicas. Essa norma entrou em vigor em 16 de maio de 2012 e criou mecanismos que possibilitam, a qualquer pessoa, física ou jurídica, sem necessidade de apresentar motivo, o recebimento de informações públicas dos órgãos e entidades.",
             "A Lei vale para os três Poderes da União, Estados, Distrito Federal e Municípios, inclusive aos Tribunais de Conta e Ministério Público. Entidades privadas sem fins lucrativos também são obrigadas a dar publicidade a informações referentes ao recebimento e à destinação dos recursos públicos por elas recebidos.",
             "As entidades privadas sem fins lucrativos que receberem recursos públicos deverão apresentar em seu sítio na internet (que poderá ser dispensada caso a entidade não disponha de meio para realizá-la), além de arquivo físico na sua sede, três ordens de informações: 1 - cópia do estatuto social atualizado da entidade; 2- relação nominal atualizada dos dirigentes da entidade; e 3- cópia integral das parcerias realizadas com o Poder Executivo federal, respectivos aditivos, e relatórios finais de prestação de contas, na forma da legislação aplicável, desde a pactuação até 180 dias após a prestação de contas final."],
    },
    {
    "topico":"Marco Regulatório das Organizações da Sociedade Civil (MROSC)",
    "desc": ["O novo Marco Regulatório das Organizações da Sociedade Civil, que já vale para a União, estados e Distrito Federal, criou três instrumentos jurídicos de parceria próprios para as OSCs: o Termo de Fomento, Termo de Colaboração e o Acordo de Cooperação, que apenas poderão ser celebrados por pessoas jurídicas de direito privado sem fins lucrativos. Algumas OSCs que possuem titulações específicas, como Organizações Sociais (OSs) e Organizações da Sociedade Civil de Interesse Público (OSCIP), poderão celebrar esses três instrumentos de parceria e outros instrumentos previstos em suas legislações específicas (como contrato de gestão, para as OSs, e os termos de parceria, para as OSCIPs).",
             "A entrada em vigor do novo MROSC implica ainda no fim da utilização do convênio como instrumento de parceria com entidades privadas, ficando este restrito às parcerias entre entes federados e à participação de OSCs em serviços de saúde de forma complementar ao SUS, nos termos do artigo 199, §1º, da Constituição Federal.",
             "O novo Marco Regulatório das Organizações da Sociedade Civil estabelece algumas exigências para que uma OSC realize parcerias com o poder público, que incluem:",
             "•	Possuir, no mínimo, um dois ou três anos de inscrição regular no Cadastro Nacional da Pessoa Jurídica (CNPJ), conforme, respectivamente, a parceria seja celebrada no âmbito dos municípios, Distrito Federal ou dos Estados e da União, admitida a redução desses prazos por ato específico de cada ente na hipótese de nenhuma organização atingi-los;",
             "•	Experiência prévia na realização, com efetividade, do objeto da parceria ou de natureza semelhante; e",
             "•	Apresentar certidões de regularidade fiscal, previdenciária, tributária, de contribuições e de dívida ativa, de acordo com a legislação aplicável de cada ente federado.",
             "A lei também define condições de impedimento para celebração de parcerias com a Administração Pública, como a impossibilidade de dirigente da entidade ser membro de Poder ou do Ministério Público, ou o caso em que a entidade esteja omissa no dever de prestar contas de parceria anteriormente celebrada."],
    },
    {
    "topico":"Mensalidades ou Contribuições de Associados",
    "desc": ["As organizações da sociedade civil são constituídas por um grupo de pessoas ligadas por uma causa ou objetivo comum, com vistas à transformação social. Esse corpo associativo, além de ser responsável pelas diretrizes e estratégicas da organização, muitas vezes contribui financeiramente para a sustentabilidade da organização, seja periodicamente (por meio de mensalidades ou anuidades, por exemplo) ou de outro modo."],
    },
    {
    "topico":"Monitoramento e Avaliação",
    "desc": ["O Monitoramento e Avaliação são compreendidos dentro da lógica processual da parceria realizada entre Poder Público e Organização da Sociedade Civil e devem ser realizados desde o início da execução, de modo a observar se o planejamento estabelecido originariamente está sendo seguido e, caso não esteja, quais as motivações e possibilidades de redefinição de caminhos.",
             "O monitoramento e avaliação devem ser praticados com vistas a realizar o apoio e o acompanhamento constantes da execução da parceria, o que possibilitará o aprimoramento dos procedimentos, a unificação dos entendimentos, a solução das controvérsias, padronização dos objetos, custos, metas e indicadores. ",
             "As Comissões de Monitoramento e Avaliação são previstas na lei 13.019/14 como órgãos colegiados competentes a monitorar e avaliar as parcerias celebradas com organizações da sociedade civil. São constituídas por ato publicado em meio oficial de comunicação, assegurada a participação de pelo menos um servidor ocupante de cargo efetivo ou emprego permanente do quadro de pessoal da administração pública. Devem ser concebidas como instâncias capazes de avaliar, dialogar e apoiar as decisões dos gestores, tratando do surgimento de questões não observadas nos momentos de planejamento ou da execução e que gerem dúvidas sobre como proceder em casos concretos."],
    },
    {
    "topico":"Natureza Jurídica",
    "desc": ["A natureza jurídica diz respeito à identidade dos institutos no mundo do Direito. A partir da verificação dos elementos que o compõem e que o diferenciam em face de outros institutos que existem, estabelece-se sua existência com consequências no mundo jurídico, garantindo direitos e poderes, de um lado, e estabelecendo obrigações.",
             "No que diz respeito ao Mapa das OSCs, temos a presença de 4 naturezas jurídicas, todas com verbetes específicos no presente glossário: fundação privada, associação privada, organização religiosa e a organização social (OS), sendo essa última, na verdade, um título que as pessoas jurídicas podem receber, diante do preenchimento de alguns requisitos. Esse critério de classificação abrange as fundações privadas e associações, tal como já utilizado na pesquisa Fasfil/IBGE, e inclui ainda as Organizações Sociais presentes na Tabela de Natureza Jurídica de 2014."],
    },
    {
    "topico":"Organização da Sociedade Civil (OSC)",
    "desc": ["As organizações da sociedade civil são entidades nascidas da livre organização e da participação social da população que desenvolvem ações de interesse público sem visarem ao lucro. As OSCs tratam dos mais diversos temas e interesses, com variadas formas de atuação, financiamento e mobilização.",
             "No Mapa das OSCs, consideramos OSCs as organizações registradas formalmente (isto é, que possuíam CNPJ) e estavam ativas em 2013, e que atendiam aos seguintes critérios:",
             "•	Privadas: não se integram ao aparelho do Estado;",
             "•	Sem fins lucrativos: não distribuem eventuais ganhos ou excedentes operacionais e entre sócios, fundadores, diretores;",
             "•	Institucionalizadas: possuem personalidade jurídica própria, ou legalmente constituídas;",
             "•	Auto-administradas ou capazes de gerenciar suas próprias atividades;",
             "•	Voluntárias ou não-compulsórias: constituídas livremente por qualquer grupo de pessoas, sem nenhum impedimento ou constrangimento legal.",
             "No Brasil, esses critérios correspondem a apenas três figuras jurídicas no novo Código Civil: associações privadas, fundações privadas e organizações religiosas. Assim, apenas organizações que pertencem a esses três tipos de pessoas jurídicas são apresentadas no Mapa.",
             "O termo “organização da sociedade civil” (OSC) representa apenas a forma mais recente de fazer referência àquelas entidades antes denominadas “organizações não governamentais” (ONG). Essas organizações constituem atores sociais e políticos cada vez mais presentes nas democracias contemporâneas."],
    },
    {
    "topico":"Organização da Sociedade Civil de Interesse Público (Oscip)",
    "desc": ["A qualificação de OSCIP é titulação prevista em lei e é conferida somente “às pessoas jurídicas de direito privado, sem fins lucrativos, cujos objetivos sociais tenham pelo menos uma das finalidades (...) tais como, promoção da assistência social, promoção gratuita da educação, defesa, preservação e conservação do meio ambiente e promoção do desenvolvimento sustentável, entre outras” (Lei nº 9.790/1999)."],
    },
    {
    "topico":"Organizações Bilaterais e Multilaterais",
    "desc": ["As organizações bilaterais existem na forma de grupos de apoio, organizações sem fins lucrativos e agências governamentais.  Essas organizações desempenham atividades de diversos tipos, desde a reconstrução de países atingidos por desastres naturais, até a distribuição ou estabelecimento de água potável e de serviços médicos emergenciais.",
             "As organizações bilaterais recebem financiamento do governo em seus países de origem e utilizam esses recursos no apoio a países em desenvolvimento. A United States Agency for International Development (USAID) é uma das organizações bilaterais mais antigas em atuação. Organizações multilaterais recebem financiamento de três ou mais governos (assim como de fontes não governamentais) e prestam serviços e desempenham projetos em vários países. Algumas das principais organizações multilaterais são parte das Nações Unidas, como a UNICEF e a UNDP. O Banco Mundial e a Organização Mundial da Saúde são exemplos adicionais de organizações multilaterais"],
    },
    {
    "topico":"Organização Religiosa",
    "desc": ["As organizações religiosas são constituídas por pessoas físicas ou jurídicas que professam uma religião segundo seus ditames e sob a perspectiva de uma fé, que lhes forneça o fundamento para suas iniciativas religiosas, educacionais, assistenciais e outras.",
             "As organizações religiosas podem ser consideradas organizações da sociedade civil, (OSC) desde que, tal como definidas no novo Marco Regulatório das Organizações da Sociedade Civil, se dediquem a atividades de interesse público e de cunho social distintas das destinadas a fins exclusivamente religiosos."],
    },
    {
    "topico":"Órgãos de Controle",
    "desc": ["São os órgãos públicos responsáveis por fiscalizar a aplicação dos recursos.  Os órgãos de controle nos três poderes e Ministério Público são a Controladoria-Geral da União (CGU), Câmaras de Vereadores e Assembléias Legislativas, Ministério Público Estadual (MPE) e Ministério Público Federal (MPF), Poder Judiciário (Juízes e Tribunais de Justiça), Tribunais de Contas dos Estados (TCE), Tribunais de Contas dos Municípios (TCM), Tribunal de Contas da União (TCU). "],
    },
    {
    "topico":"Parceria com Governo",
    "desc": ["As parcerias voluntárias entre a administração pública dos níveis federal, estadual e municipal e as organizações civis compreendem as transferências voluntárias (auxílios, contribuições e subvenções), os instrumentos de parceria vigente previstos em lei (convênio, contrato de repasse, termo de parceria, contrato de gestão, termo de fomento, termo de colaboração) e os recursos provenientes de incentivos fiscais a empresas privadas e destinados a projetos realizados pelas organizações civis."],
    },
    {
    "topico":"Prestação de Contas",
    "desc": ["A Lei 13.019/2014 traz um novo olhar sobre a prestação de contas, compartilhando a responsabilidade desta etapa entre as OSCs e a Administração Pública. Pode parecer óbvio, mas é uma importante mudança de abordagem. Afinal, se os recursos utilizados em uma parceria são públicos, é o público, a sociedade como um todo, que deverá saber como o seu dinheiro está sendo usado. O foco principal está nos resultados, ou seja, no cumprimento do objeto pactuado.",
             "Uma boa prestação de contas é o resultado de um bom planejamento e de uma execução cuidadosa, preocupadas em atender o que estava previsto no plano de trabalho. Ao se exigir que a prestação de contas e todos os atos que dela decorram sejam feitos em plataforma eletrônica, que permita que qualquer cidadão interessado acompanhe o andamento das atividades e os valores dispendidos, a lei também amplia o olhar do controle para além dos órgãos institucionalmente imbuídos da tarefa, trazendo ao cidadão também essa responsabilidade."],
    },
    {
    "topico":"Prestação de Serviços",
    "desc": ["As atividades realizadas por uma organização com o fim de atendimento do beneficiário de ações sociais pode retornar dividendos para a entidade. No entanto, as receitas auferidas em virtude de prestação de serviços, bem como de venda de produtos, devem ser revertidas aos projetos sociais desenvolvidos pela entidade sem fins lucrativos e devem guardar nexo causal com a sua missão institucional ou finalidade estatutária."],
    },
    {
    "topico":"Projeto",
    "desc": ["É o conjunto de operações, limitadas no tempo, das quais resulta um produto destinado à satisfação de interesses compartilhados pela administração pública e pela organização da sociedade civil; "],
    },
    {
    "topico":"RAIS",
    "desc": ["A Relação Anual de Informações Sociais (RAIS) consiste em um Registro Administrativo criado em 1975, com periodicidade anual, visando suprir necessidades da gestão governamental para o setor de trabalho e emprego, por meio de informações que auxiliam no (a) controle da atividade trabalhista no país, (b) provimento de dados para a elaboração de estatísticas de trabalho e (c) disponibilização de informações do mercado de trabalho às entidades governamentais. O universo de OSCs da versão atual do Mapa provém da base de dados da RAIS 2014."],
    },
    {
    "topico":"Rendimentos de Fundos Patrimoniais",
    "desc": ["Fundos patrimoniais são estruturas que oferecem sustentabilidade financeira a uma organização sem fins lucrativos. Os FPs nascem com frequência com o fim de preservarem o valor doado a uma organização (chamado de principal), utilizando para sua manutenção e atividades apenas os rendimentos resultantes do investimento desse fundo."],
    },
    {
    "topico":"Rendimentos Financeiros de Reservas ou Contas Correntes Próprias",
    "desc": ["A criação de fundos de reserva prevê a destinação periódica de parte dos recursos financeiros excedentes de uma organização para uma conta específica, que pode ser uma conta corrente, conta poupança ou outra com melhor rendimento. Os fundos de reserva são frequentemente usados pelas organizações no atendimento emergencial de despesas ordinárias do dia a dia da entidade."],
    },
    {
    "topico":"Sistema da Lei de Incentivo ao Esporte (SLIE)",
    "desc": ["A lei nº 11.438/06 regulamenta o incentivo fiscal a pessoas físicas e jurídicas que realizem doações ou patrocínio a projetos desportivos e paradesportivos apresentados por órgãos públicos e entidades privadas sem fins lucrativos. O Sistema tem plataforma eletrônica para cadastro de propostas relacionadas à lei e é administrado pela Comissão Técnica da Lei de Incentivo ao Esporte, dentro do Departamento de Incentivo e Fomento ao Esporte do Ministério do Esporte."],
    },
    {
    "topico":"Sistema de Apresentação das Leis de Incentivo à Cultura (Salic)",
    "desc": ["O Sistema de Apoio às Leis de Incentivo à Cultura (Salic) é o sistema informatizado do Ministério da Cultura pelo qual é feito o recebimento, a análise das propostas culturais e também a aprovação, execução, acompanhamento e a prestação de contas dos projetos culturais elaborados por pessoas físicas e jurídicas. O Salic é regulamentado pela Portaria MINC nº 30/09 e coordenado pela Secretaria de Fomento e Incentivo à Cultura (Sefic) do Ministério da Cultura (MinC)."],
    },
    {
    "topico":"Sistema de Gestão de Convênios e Contratos (SICONV)",
    "desc": ["Sistema que reúne e processa informações sobre as transferências de recursos do Governo Federal para órgãos públicos e privados sem fins lucrativos. O SICONV é administrado pela Secretaria de Logística e Tecnologia da Informação do MPOG. O repasse acontece por meio de termos de colaboração, de fomento e acordo de cooperação, que são destinados à execução de programas, projetos e ações que sejam de interesse comum. Todos os procedimentos referentes à seleção, formalização, execução, acompanhamento e prestação de contas dos contratos, convênios e parcerias são realizados diretamente no SICONV."],
    },
    {
    "topico":"Sistema Integrado de Administração Financeira (SIAFI)",
    "desc": ["Trata-se do principal instrumento utilizado pelo Ministério da Fazenda/Tesouro Nacional para o registro, acompanhamento e controle da execução orçamentária, financeira e patrimonial do Governo Federal. Os repasses de recursos para entidades sem fins lucrativos podem ocorrer de forma direta ou indireta, por meio de órgão ou entidade da administração pública estadual, municipal ou distrital, com a condição de que as atividades desempenhadas estejam de acordo com o programa de governo ou impliquem na realização de projeto, serviço ou evento de interesse recíproco. Atualmente, os recursos destinados às OSCs provenientes do Siafi não são apresentados nos perfis individuais das OSCs no Mapa. O trabalho para viabilizar esta inserção está em andamento."],
    },
    {
    "topico":"Termo de Colaboração",
    "desc": ["Termo de colaboração é o instrumento por meio do qual são formalizadas as parcerias estabelecidas pela administração pública com organizações da sociedade civil, para a consecução de finalidades de interesse público e recíproco propostas pela administração pública que envolvam a transferência de recursos financeiros."],
    },
    {
    "topico":"Termo de Fomento",
    "desc": ["O termo de fomento é o instrumento por meio do qual são formalizadas as parcerias estabelecidas pela administração pública com organizações da sociedade civil, para a consecução de finalidades de interesse público e recíproco propostas pelas organizações da sociedade civil, que envolvam a transferência de recursos financeiros."],
    },
    {
    "topico":"Utilidade Pública (Títulos)",
    "desc": ["O título de Utilidade Pública Federal (UPF) foi extinto por meio da Lei nº 13.204 de 2015, que alterou trechos do MROSC e revogou a Lei nº 91 de 1935. Essa medida visou estender a todas as organizações sem fins lucrativos os benefícios previstos em lei, independentemente da exigência de cumprir requisitos formais e burocráticos para certificação e titulação de UPF.",
             "Os títulos de Utilidade Pública estaduais e municipais, no entanto, continuam em vigor. Os benefícios concedidos para as organizações tituladas variam de acordo com as legislações locais, abrangendo desde a possibilidade de dedução fiscal de certos tributos à permissão de celebração de parcerias com o Poder Público."],
    },
    {
    "topico":"Venda de Bens e Direitos",
    "desc": ["Cessão onerosa da marca associada a uma organização civil para empresas privadas que, em troca, pagam royalties ou direitos autorais. Dessa forma, as empresas podem ter seus produtos associados à imagem de OSCs consideradas referência em determinadas áreas de atuação, que, por sua vez, garantem fontes alternativas de financiamento para suas atividades."],
    },
    {
    "topico":"Venda de Produtos",
    "desc": ["Esta é uma das formas de captação mais utilizadas pelas organizações, já que os produtos podem ser confeccionados pela própria instituição. Os produtos confeccionados pelos membros da organização podem ser vendidos ou utilizados internamente, minimizando os custos internos da instituição."],
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
