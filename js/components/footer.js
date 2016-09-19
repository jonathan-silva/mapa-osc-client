/*** Componente responsável pela parte inferior da página ***/
var Carousel = React.createClass({
  renderListItems: function(){
    var images = [];
    images.push( <div className="item active">
                  <img src={this.props.images[0]}/>
                  <div className="carousel-caption" />
                </div>
              );
    for (var i = 1; i < this.props.images.length; i++) {
      images.push( <div className="item">
                    <img src={this.props.images[i]}/>
                    <div className="carousel-caption" />
                  </div>
                );
    }

    return images;
  },
  render: function() {
    return (<div>
      <span>Apoio:</span>
      <div className="carousel-wrapper">
        <div id="divcarousel" className="carousel-item now">
          <div className="carousel slide" data-ride="carousel" id="carousel-apoio">
            <div role="listbox" className="carousel-inner" >{this.renderListItems()}</div>
            {/* Controls */}
            <a data-slide="prev" role="button" href="#carousel-apoio" className="left carousel-control">
              <span aria-hidden="true" className="icon-prev fa fa-angle-left" />
              <span className="sr-only">Previous</span>
            </a>
            <a data-slide="next" role="button" href="#carousel-apoio" className="right carousel-control">
              <span aria-hidden="true" className="icon-next fa fa-angle-right" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
      </div>
    );
  }
});

var Realizacao = React.createClass({
  render: function(){
    return (<div><span>Realização:</span>
        <a target="_blank" href="http://www.ipea.gov.br">
          <img alt={this.props.items[1]} src={this.props.items[0]} className="normal" />
          <img style={{display: 'none'}} alt={this.props.items[3]} src={this.props.items[2]} className="contraste" />
        </a></div>);
  }
});

var MenuInferior = React.createClass({
  geraLinks: function (block){
    var arr = [];
    for(var i=0; i< block.urls.length; i++) arr.push(<dd><a href={block.urls[i]}>{block.texts[i]}</a></dd>);

    return arr;
  },
  renderListBlocks: function(){
    var elem = [];

    for (var i = 0; i < this.props.blockObject.length; i++) {
      var block = this.props.blockObject[i];
      elem.push(<div className="col-md-4"><dl className="capacho"><dt>{block.title}</dt>{this.geraLinks(block)}</dl></div>);
    }
    return elem;
  },
  render: function(){
    return <div>{this.renderListBlocks()}</div>;
  }
});

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
ReactDOM.render(<MenuInferior blockObject={blocks}/>, document.getElementById("menu-inferior"));

// src e alt, respectivamente, da parte de "realização" normal e com contraste
var imgsAltRealizacao = ["img\\ipea-realizacao.png", "Instituto de Pesquisa Economica Aplicada", "img\\ipea-realizacao.png", "Instituto de Pesquisa Economica Aplicada"];
ReactDOM.render(<Realizacao items={imgsAltRealizacao}/>, document.getElementById("realizacao"));

var imgList = ["img\\logo_secretaria.png", "img\\logo-mj.png", "img\\logo_fgv.png", "img\\logo_pnud.png"];
ReactDOM.render(<Carousel images={imgList}/>, document.getElementById("carousel"));
