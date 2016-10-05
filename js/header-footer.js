//Header da página
require(['react', 'jsx!components/Header'], function(React, Header) {

  function MenuDropDownObject(text='', link=''){
    this.text = text;
    this.link = link;
  }
  function Menu(dropdown, menuList){
    this.dropdown = dropdown;
    this.menuList = menuList;
  }

  function MenuListObject(text='', link=''){
    this.text = text;
    this.link = link;
  }

  var menuList = [];
  menuList.push(new MenuListObject("Home", "index.html"));
  menuList.push(new MenuListObject("Mapa", "resultado-consulta.html"));
  menuList.push(new MenuListObject("Dados", "dados.html"));
  menuList.push(new MenuListObject("Contato", "contato.html"));
  menuList.push(new MenuListObject("Login", "#"));

  var linksSubmenu = [];
  linksSubmenu.push(new MenuDropDownObject("Sobre", "sobre.html"));
  linksSubmenu.push(new MenuDropDownObject("Versão", "versao.html"));
  linksSubmenu.push(new MenuDropDownObject("Metodologia", "metodologia.html"));
  linksSubmenu.push(new MenuDropDownObject());
  linksSubmenu.push(new MenuDropDownObject("Ajuda", "ajuda.html"));
  linksSubmenu.push(new MenuDropDownObject());
  linksSubmenu.push(new MenuDropDownObject("Equipe", "equipe.html"));
  linksSubmenu.push(new MenuDropDownObject("Apoio", "apoio.html"));
  linksSubmenu.push(new MenuDropDownObject("Links", "links-uteis.html"));

  Header = React.createFactory(Header);
  ReactDOM.render(Header({headerObject: new Menu(linksSubmenu, menuList)}), document.getElementById("header"));
});


//Footer da página
require(['react', 'jsx!components/Footer'], function(React, Footer) {

  function BlockFooterObject(title, urls=[], texts=[]){
    this.title = title;
    this.urls = urls;
    this.texts = texts;
  }
  // links do menu inferior
  var blocks = [];
  blocks.push(new BlockFooterObject("Portal das OCSs", ["metodologia.html", "termos.html","cadastro-representante.html", "contato.html"], ["Metodologia", "Termos de Uso", "Cadastro de Representante", "Contato e Sugestões"]));
  blocks.push(new BlockFooterObject("Ajuda", ["glossario.html", "perguntas-frequentes.html", "tutoriais.html", "mapa-do-site.html"], ["Glossário", "Perguntas Frequentes", "Tutoriais", "Mapa do Site"]));
  blocks.push(new BlockFooterObject("IPEA", ["http://atlasbrasil.org.br/", "http://ivs.ipea.gov.br/", "http://www.ipea.gov.br/extrator/"], ["Atlas do Desenvolvimento Humano no Brasil", "Atlas da Vulnerabilidade Social", "Extrator de Dados do Ipea"]));

  // src e alt, respectivamente, da parte de "realização" normal e com contraste
  var imgsAltRealizacao = ["img\\ipea-realizacao.png", "Instituto de Pesquisa Economica Aplicada", "img\\ipea-realizacao.png", "Instituto de Pesquisa Economica Aplicada"];
  //Carrossel do rodapé
  var imgList = ["img\\logo_secretaria.png", "img\\logo-mj.png", "img\\logo_fgv.png", "img\\logo_pnud.png"];

  function FooterObject(blocks, imgsAltRealizacao, imgList){
    this.blocks =blocks;
    this.imgsAltRealizacao = imgsAltRealizacao;
    this.imgList = imgList;
  }

  Footer = React.createFactory(Footer);
  ReactDOM.render(Footer({footerObject: new FooterObject(blocks, imgsAltRealizacao, imgList)}), document.getElementById("rodape"));
});


//Bibliotecas
define(["jquery", "bootstrap"], function($) {
});
