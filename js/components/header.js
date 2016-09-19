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
    var tituloLogo = "Mapa das Organizações da Sociedade Civil";
    return (
      <div>
        <a className="navbar-brand brand-master-style" contenteditable="true">
          <img src="img/simbolo.png" className="brand-style"></img>
          <span className="brand-text-style">{tituloLogo}</span>
        </a>
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-ex-collapse">
          <span className="sr-only">Toggle navigation</span>
          {this.renderListItems()}
        </button>
      </div>);
  }
});

var Menu = React.createClass({
  renderListItems: function(){
    var items = [];

    for (var i = 0; i < this.props.items.length; i++) {
      if(i==1){//posição em que o dropdown do mapa deve aparecer
        items.push(<li id="dropdown-menu-header" className="dropdown"></li>);
      }
      items.push(<li><a href="#">{this.props.items[i]}</a></li>);
    }
    return items;
  },
  render: function () {
    return (
      <div>
        <ul className="nav navbar-nav navbar-right">{this.renderListItems()}</ul>
      </div>
    );
  }
});

var DropdownMenu = React.createClass({
  renderList: function(){
    var elems = [];
    for (var i=0; i< this.props.submenu.length; i++) {
      var l = this.props.submenu[i];
      //se titulo vir vazio entende-se que devemos adicionar um separador
      if (l.text=='') elems.push(<li className="divider"></li>);
      else elems.push(<li><a href={l.link}>{l.text}</a></li>);
    }
    return elems;
  },
  render: function () {
    var titulo = "O Mapa";
    return (<div>
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{titulo}<i className="fa fa-caret-down"></i></a>
              <ul className="dropdown-menu" role="menu">{this.renderList()}</ul>
            </div>);
  }
});

var menu = ["Home", "Mapa", "Dados", "Login"];
ReactDOM.render(<BotaoResponsivo icons={menu}/>, document.getElementById("menu-mobile"));
ReactDOM.render(<Menu items={menu}/>, document.getElementById("navbar-ex-collapse"));

function MenuDropDownObject (text='', link=''){
  this.text = text;
  this.link = link;
}
var linksSubmenu = [];
linksSubmenu.push(new MenuDropDownObject("Sobre", "#"));
linksSubmenu.push(new MenuDropDownObject("Versão", "#"));
linksSubmenu.push(new MenuDropDownObject("Metodologia", "#"));
linksSubmenu.push(new MenuDropDownObject());
linksSubmenu.push(new MenuDropDownObject("FAQ", "#"));
linksSubmenu.push(new MenuDropDownObject("Glossário", "#"));
linksSubmenu.push(new MenuDropDownObject());
linksSubmenu.push(new MenuDropDownObject("Equipe", "#"));
linksSubmenu.push(new MenuDropDownObject("Apoio", "#"));
linksSubmenu.push(new MenuDropDownObject("Links", "#"));

ReactDOM.render(<DropdownMenu submenu={linksSubmenu}/>, document.getElementById("dropdown-menu-header"));
