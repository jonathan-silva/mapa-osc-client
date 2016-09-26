/*** Componente responsável pela parte superior da página ***/
define(['react'], function(React) {
  var tituloLogo = "Mapa das Organizações da Sociedade Civil";
  var titulo = "O Mapa";

  //Componentes individuais
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
      return (<div>
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{titulo}<i className="fa fa-caret-down"></i></a>
                <ul className="dropdown-menu" role="menu">{this.renderList()}</ul>
              </div>);
    }
  });

  var Menu = React.createClass({
    renderListItems: function(){
      var items = [];

      for (var i = 0; i < this.props.headerObject.menuList.length; i++) {
        if(i==1){//posição em que o dropdown do mapa deve aparecer
          items.push(<li id="dropdown-menu-header" className="dropdown"><DropdownMenu submenu={this.props.headerObject.dropdown}/></li>);
        }
        items.push(<li><a href="#">{this.props.headerObject.menuList[i]}</a></li>);
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

  //Componente COMPLETO do cabeçalho
  var Header = React.createClass({
    render:function(){
      var headerObject = this.props.headerObject;

      return (
        <div id="topo_acessibilidade">
          <div className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div id="menu-mobile" class="navbar-header"><BotaoResponsivo icons={headerObject.menuList}/></div>
              <div className="collapse navbar-collapse" id="navbar-ex-collapse"><Menu headerObject={headerObject}/></div>
            </div>
          </div>
        </div>
      );
    }
  });

  //ReactDOM.render(<BotaoResponsivo icons={menu}/>, document.getElementById("menu-mobile"));
  //ReactDOM.render(<Menu items={menu}/>, document.getElementById("navbar-ex-collapse"));
  //ReactDOM.render(<DropdownMenu submenu={linksSubmenu}/>, document.getElementById("dropdown-menu-header"));
  //ReactDOM.render(<Header/>, document.getElementById("header"));
  return Header;
});
