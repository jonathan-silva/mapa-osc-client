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
  blocks.push(new BlockFooterObject("Mapa das OCSs", ["faq.html", "metodologia.html", "contato.html", "termos.html"], ["Dúvidas Frequentes", "Metodologia", "Contato e Sugestões", "Termos de Uso"]));
  blocks.push(new BlockFooterObject("IPEA", ["http://atlasbrasil.org.br/", "http://ivs.ipea.gov.br/", "http://www.ipea.gov.br/extrator/"], ["Atlas do Desenvolvimento Humano no Brasil", "Atlas da Vulnerabilidade Social", "Extrator de Dados do Ipea"]));
  blocks.push(new BlockFooterObject("Links Úteis", ["http://www.convenios.gov.br/portal/", "http://bibliotecadigital.abong.org.br/", "http://www.secretariageral.gov.br/atuacao/mrosc/estudos-e-pesquisas", "ftp://ftp.ibge.gov.br/Fundacoes_Privadas_e_Associacoes/2010/fasfil.pdf", "http://www.participa.br", "http://www.secretariageral.gov.br/mrosc", "http://sniic.cultura.gov.br/"], ["Portal dos Convênios", "Biblioteca Digital das OSCs", "Biblioteca do Marco Legal das OSC", "Pesquisa FASFIL 2010", "Participa.br", "Marco Legal das OSC", "Sniic - Sistema Nacional de Informações e Indicadores Culturais"]));
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
