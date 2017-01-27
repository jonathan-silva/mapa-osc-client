//Header da página
require(['react', 'jsx!components/Header','bootstrap'], function(React, Header) {

  function MenuDropDownObject(text, link){
    this.text = text;
    this.link = link;
  }
  function Menu(dropdown, menuList, menuLogado, menuDados){
    this.dropdown = dropdown;
    this.menuList = menuList;
    this.menuLogado = menuLogado;
    this.menuDados = menuDados;
  }

  function MenuListObject(text, link){
    this.text = text;
    this.link = link;
  }

  var menuList = [];
  menuList.push(new MenuListObject("Home", "index.html"));
  menuList.push(new MenuListObject("Mapa", "resultado-consulta.html"));
  menuList.push(new MenuListObject("Contato", "contato.html"));
  menuList.push(new MenuListObject("Cadastre-se", "cadastro-representante.html"));
  menuList.push(new MenuListObject("Entrar", ""));

  var linksSubmenu = [];
  linksSubmenu.push(new MenuDropDownObject("Sobre", "sobre.html"));
  linksSubmenu.push(new MenuDropDownObject("Metodologia", "metodologia.html"));
  linksSubmenu.push(new MenuDropDownObject("Equipe", "equipe.html"));
  linksSubmenu.push(new MenuDropDownObject("Versão", "versao.html"));
  linksSubmenu.push(new MenuDropDownObject("",""));
  linksSubmenu.push(new MenuDropDownObject("Glossário", "glossario.html"));
  linksSubmenu.push(new MenuDropDownObject("Tutoriais", "tutoriais.html"));
  linksSubmenu.push(new MenuDropDownObject("Perguntas frequentes", "perguntas-frequentes.html"));
  linksSubmenu.push(new MenuDropDownObject("",""));
  linksSubmenu.push(new MenuDropDownObject("Editais para OSCs", "editais.html"));
  linksSubmenu.push(new MenuDropDownObject("Colabore", "colabore.html"));
  linksSubmenu.push(new MenuDropDownObject("Apoio", "apoio.html"));
  linksSubmenu.push(new MenuDropDownObject("Links", "links-uteis.html"));

  var linksSubmenuDados = [];
  linksSubmenuDados.push(new MenuDropDownObject("Base de Dados", "base-dados.html"));
  linksSubmenuDados.push(new MenuDropDownObject("Dados e Indicadores", "dados-indicadores.html"));

  var linksUsuarioLogado = [];
  linksUsuarioLogado.push(new MenuDropDownObject("Configurar Conta", "configurar-conta.html"));
  linksUsuarioLogado.push(new MenuDropDownObject("",""));
//  linksUsuarioLogado.push(new MenuDropDownObject("Adicionar Dados", "entrada-dados.html"));
//  linksUsuarioLogado.push(new MenuDropDownObject("Adicionar Edital", "adicionar-edital.html"));
  linksUsuarioLogado.push(new MenuDropDownObject("",""));
  linksUsuarioLogado.push(new MenuDropDownObject("Sair", "javascript:deslogar();"));

  Header = React.createFactory(Header);
  ReactDOM.render(Header({headerObject: new Menu(linksSubmenu, menuList, linksUsuarioLogado, linksSubmenuDados)}), document.getElementById("header"));

  verificarLogado();
  verificarContraste();
});

//Footer da página
require(['react', 'jsx!components/Footer','bootstrap'], function(React, Footer) {

  function BlockFooterObject(title, urls, texts, target){
    this.title = title;
    this.urls = urls;
    this.texts = texts;
    this.target= target;
  }
  // links do menu inferior
  var blocks = [];
  blocks.push(new BlockFooterObject("Portal das OCSs", ["metodologia.html", "termos-uso.html","cadastro-representante.html", "contato.html"], ["Metodologia", "Termos de Uso", "Cadastro de Representante", "Contato e Sugestões"], "_self"));
  blocks.push(new BlockFooterObject("Ajuda", ["glossario.html", "perguntas-frequentes.html", "tutoriais.html", "mapa-do-site.html"], ["Glossário", "Perguntas Frequentes", "Tutoriais", "Mapa do Site"], "_self"));
  blocks.push(new BlockFooterObject("IPEA", ["http://atlasbrasil.org.br/", "http://ivs.ipea.gov.br/", "http://www.ipea.gov.br/extrator/"], ["Atlas do IDHM no Brasil", "Atlas da Vulnerabilidade Social", "Extrator de Dados do Ipea"],"_blank"));

  // src e alt, respectivamente, da parte de "realização" normal e com contraste
  var imgsAltRealizacao = ["img\\ipea-realizacao.png", "Instituto de Pesquisa Economica Aplicada", "img\\ipea-realizacao.png", "Instituto de Pesquisa Economica Aplicada"];
  //Carrossel do rodapé
  var imgList = [["img\\logo_secretaria.png", "img\\logo-mj.png", "img\\logo_pnud.png"],
                 ["http://www.secretariadegoverno.gov.br/","http://www.justica.gov.br/","http://www.undp.org/"],
                 ["Link externo para Secretaria de Governo","Link externo para Ministério da Justiça e Cidadania","Link externo para Programa das Nações Unidas para o Desenvolvimento"]];

  function FooterObject(blocks, imgsAltRealizacao, imgList){
    this.blocks =blocks;
    this.imgsAltRealizacao = imgsAltRealizacao;
    this.imgList = imgList;
  }

  Footer = React.createFactory(Footer);
  ReactDOM.render(Footer({footerObject: new FooterObject(blocks, imgsAltRealizacao, imgList)}), document.getElementById("rodape"));

  verificarContraste();

  window.onload = function () {
    verificarLogado();
    verificarContraste();
  };

});
