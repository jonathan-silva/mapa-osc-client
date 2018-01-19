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

  require(['componenteLinksUteis'], function(LinksUteis){
    function LinkUtil(titulo, desc, imagem, elo, linkExterno){
      this.titulo = titulo;
      this.desc = desc;
      this.imagem = imagem;
      this.elo = elo;
      this.linkExterno = linkExterno;
    }
//var titulo = ["Título do Site"]
//var desc = ["Descrição do Site"]
//var imagem = ["img/simbolo.png"]
//var elo = ["#"]
    var titulo = ["Portal de Convênios","Biblioteca Digital das OSCs","Biblioteca do Marco Regulatório das OSCs","Pesquisa FASFIL 2010","Participa.br","Marco Regulatório das OSCs","Sniic - Sistema Nacional de Informações e Indicadores Culturais"];
    var desc = [
    "O Portal dos Convênios é a página virtual que abriga o Sistema de Gestão de Convênios e Contratos de Repasse – SICONV, bem como todo o conjunto de informações relacionadas a convênios e contratos de repasse.",
    "Página oficial da Biblioteca da Associação Brasileira de Organizações Não Governamentais – ABONG.",
    "A Biblioteca do Marco Regulatório das OSCs reúne estudos e pesquisas sobre OSCs.",
    "Pesquisa sobre Fundações Privadas e Associações sem Fins Lucrativos – FASFIL.",
    "O Participa.br é uma Plataforma de Participação Social. Trata-se de um espaço virtual para participação social no Brasil, com o objetivo de facilitar o diálogo entre o Governo Federal e a Sociedade Civil.",
    "O Marco Regulatório das Organizações da Sociedade Civil é fruto de um esforço conjunto do governo federal e da sociedade civil para modernizar as relações do poder público com as Organizações da Sociedade Civil.",
    "O Sistema Nacional de Informações e Indicadores Culturais é um banco de dados disponível para toda a sociedade. Ele reúne dados de bens, serviços, infraestrutura, investimentos, instituições e gestão cultural, produção, acesso, consumo, agentes, programas e transparência."
  ];
    var imagem = ["img/siconv.png","img/abong.png","img/mrosc.png","img/fasfil-2010.png","img/participa-br.png","img/icone-mrosc.png","img/sniic.png"];
    var elo = ["http://portal.convenios.gov.br/","http://bibliotecadigital.abong.org.br/","http://www.secretariadegoverno.gov.br/iniciativas/mrosc/estudos-e-pesquisas",
  "ftp://ftp.ibge.gov.br/Fundacoes_Privadas_e_Associacoes/2010/fasfil.pdf","http://www.participa.br/","http://www.secretariadegoverno.gov.br/iniciativas/mrosc","http://sniic.cultura.gov.br/"];


    var linksuteis = [];
    for (var i=0; i<titulo.length; i++){
      linksuteis.push(new LinkUtil(titulo[i], desc[i],imagem[i],elo[i],true));
    }

    LinksUteis = React.createFactory(LinksUteis);
    ReactDOM.render(LinksUteis({dados:linksuteis}), document.getElementById("linksuteis_formato_dados"));
  });

  /* Comentei esse trecho, não parece fazer sentido e gera o seguinte
   * erro no React: https://facebook.github.io/react/docs/error-decoder.html?invariant=37
   * porque não existe o elemento de id "tipo_arquivo_dropdown".
   * Verificar para remover se necessário
  require(['componenteDropdown'], function(Dropdown){
    //var arquivosRetornados, arquivosEnviados;
    //arquivosRetornados = arquivosEnviados = ["XML", "JSON", "CSV"];
    var prox = ["."];

    Dropdown = React.createFactory(Dropdown);

    //ReactDOM.render(Dropdown({list: arquivosRetornados}), document.getElementById("arquivo_retornado_dropdown"));
    ReactDOM.render(Dropdown({list:prox}), document.getElementById("prox_dropdown"));
    //ReactDOM.render(Dropdown({list:arquivosEnviados}), document.getElementById("tipo_arquivo_dropdown"));
  });*/
});
