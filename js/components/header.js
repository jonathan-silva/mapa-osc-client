/*** Componente responsável pela parte superior da página ***/
var BotaoResponsivo = React.createClass({
  renderListItems: function(){
    var icons = [];
    for (var i = 0; i < this.props.icons.length; i++) {
      icons.push(<span className="icon-bar">{this.props.icons[i]}</span>);
    }
    return icons;
  },
  render: function () {
    return (
      <div className="navbar navbar-default navbar-static-top">
        <div className="container">
      <div className="navbar-header">
        <a className="navbar-brand brand-master-style" contenteditable="true">
          <img src="img/simbolo.png" className="brand-style"></img>
          <span className="brand-text-style">Mapa das Organizações da Sociedade Civil</span>
        </a>
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-ex-collapse">
                <span className="sr-only">Toggle navigation</span>
                {this.renderListItems()}
              </button>
              </div>
              </div>
            </div>);
  }
});

var icons = ["Home", "O Mapa", "Mapa", "Dados", "Login"];
ReactDOM.render(<BotaoResponsivo icons={icons}/>, document.getElementById("header"));
