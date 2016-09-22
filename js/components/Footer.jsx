/*** RODAPÉ ***/
define(['react'], function(React) {
  var tituloLogo = "Mapa das Organizações da Sociedade Civil";
  var ano = 2016;

  //Componentes individuais
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

  //ReactDOM.render(<MenuInferior blockObject={blocks}/>, document.getElementById("menu-inferior"));
  //ReactDOM.render(<Realizacao items={imgsAltRealizacao}/>, document.getElementById("realizacao"));
  //ReactDOM.render(<Carousel images={imgList}/>, document.getElementById("carousel"));


  //Componente COMPLETO do rodapé (com todos os outros componentes juntos)
  var Footer = React.createClass({
    render:function(){
      var imgList = this.props.footerObject.imgList;
      var imgsAltRealizacao  =this.props.footerObject.imgsAltRealizacao;
      var blocks = this.props.footerObject.blocks;
      return (

          <div className="section partners">
            <div className="section">
              <div className="container">
                <div className="row">
                  <div className="col-md-3">
                    <h5>{tituloLogo} © {ano}</h5>
                  </div>
                  <div id="carousel"  className="col-md-3">
                    {<Carousel images={imgList}/>}
                  </div>
                  <div id="realizacao" className="col-md-3">
                    <Realizacao items={imgsAltRealizacao}/>
                  </div>
                </div>
                <hr/>
                <div className="row">
                  <MenuInferior blockObject={blocks}/>
                </div>
              </div>
            </div>
          </div>

      );
    }
  });
  //ReactDOM.render(<Footer/>, document.getElementById("rodape"));
  return Footer;
});
