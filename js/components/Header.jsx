/*** Componente responsável pela parte superior da página ***/
define(['react'], function(React) {
  var tituloLogo = "Mapa das Organizações da Sociedade Civil";
  var tituloPortal = "O Portal";
  var tituloDados = "Dados";
  var usuarioLogado = "";

  //Componentes individuais
  var BotaoResponsivo = React.createClass({
    renderListItems: function(){
      var icons = [];
      var qtdeLinha = 3;
      for (var i = 0; i < qtdeLinha; i++) {
        icons.push(<span className="icon-bar"></span>);
      }
      return icons;
    },
    render: function () {
      return (
        <div>
          <a href="index.html" className="navbar-brand brand-master-style" contenteditable="true">
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
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{this.props.titulo}<i className="fa fa-caret-down"></i></a>
              <ul className="dropdown-menu" role="menu">{this.renderList()}</ul>
              </div>);
    }
  });

  var Menu = React.createClass({
    renderListItems: function(){
      var items = [];

      for (var i = 0; i < this.props.headerObject.menuList.length; i++) {
        if(i==1){//posição em que o dropdown do Portal deve aparecer
          items.push(<li id="dropdown-menu-header" className="dropdown"><DropdownMenu submenu={this.props.headerObject.dropdown} titulo={tituloPortal}/></li>);
          items.push(<li><a href={this.props.headerObject.menuList[i].link}>{this.props.headerObject.menuList[i].text}</a></li>);
        }
        else if(i==2){//posição em que o dropdown do Dados deve aparecer
          items.push(<li id="dropdown-menu-header" className="dropdown"><DropdownMenu submenu={this.props.headerObject.menuDados} titulo={tituloDados}/></li>);
          items.push(<li><a href={this.props.headerObject.menuList[i].link}>{this.props.headerObject.menuList[i].text}</a></li>);
        }
        else if(i == this.props.headerObject.menuList.length-1){//posição em que o dropdown do Usuario Logado deve aparecer
          items.push(<li><a className="btn-link" data-toggle="modal" data-target="#modalLogin">{this.props.headerObject.menuList[i].text}</a></li>);
          items.push(<li id="dropdown-menu-header" className="dropdown logado"><DropdownMenu submenu={this.props.headerObject.menuLogado} titulo={usuarioLogado}/></li>);
        }
        else{
          items.push(<li><a href={this.props.headerObject.menuList[i].link}>{this.props.headerObject.menuList[i].text}</a></li>);
        }
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

    getComponent: function(index) {

      if( index == 1){

        $("body" ).css( "background-color", "#ffffff" );
        $("body" ).css( "color", "#000000" );
        $("a" ).css( "color", "#337cbb" );
        $(".text-list").find("a").css("color", "#337cbb");
        $(".topo").css("color", "black");
        $(".btn-link").css( "color", "#337cbb" );
        $("#buscarPerfil a").css( "color", "#337cbb" );
        $(".btn-primary").css( "color", "#ffffff" );
        $(".navbar-nav li a").css( "color", "#404040" );
        $(".carousel-control").css( "color", "#ffffff" );
        $("hr").css( "border-color", "#1659bf" );
        $("legend" ).css( "color", "#333333" );
        $("footer" ).css( "background-color", "#337cbb" );
        $(".partners").css( "background-color", "#e0e0e0" );
        $(".brand-master-style").css( "color", "#404040" );
        $(".navbar-default").css( "background-color", "#ffffff" );
        $(".navbar-default").css( "color", "#404040" );
        $(".navbar-default").css( "border-bottom", "4px solid #1659bf" );
        $(".capacho").css( "border-left", "1px dotted #1659bf" );
        $(".capacho a").css( "color", "#000000" );
        $(".dropdown-menu").css( "background-color", "#ffffff");
        $(".dropdown-menu").css( "border", "1px solid rgba(0, 0, 0, 0.15)");
        $(".modal-content").css( "background-color", "#ffffff");
        $(".modal-content").css( "border", "1px solid rgba(0, 0, 0, 0.2)");
        $(".subTitulo" ).css( "color", "#337cbb" );
        $(".subTitulo" ).css( "background-color", "aliceblue" );
        $(".pagination" ).find("a").css( "color", "#337cbb" );
        $(".pagination .disabled" ).find("a").css( "color", "#777777" );
        $(".pagination .active" ).find("a").css( "color", "#ffffff" );
        $(".nav-tabs" ).find("a").css( "color", "#337cbb" );
        $(".nav-tabs .active" ).find("a").css( "color", "#555555" );
        $(".pagination" ).find("a").css( "background-color", "#ffffff" );
        $(".pagination .active" ).find("a").css( "background-color", "#337cbb" );
        $(".ui-widget-content").css( "background-color", "#ffffff" );
        $(".ui-widget-content").css( "color", "#333333" );
        $("#barra-brasil a").css( "color", "#606060" );
        $("#barra-brasil" ).css( "background-color", "#f1f1f1" );
        $("#topo_acessibilidade").css( "background-color", "rgba(255, 255, 255, 0.5)" );
        $("#topo_acessibilidade a").css( "color", "#337cbb" );
        $("#itemHome a").css( "color", "#337cbb" );
        $("#buscarPerfil .active a").css( "color", "#ffffff" );

      }
      else if (index == 2) {

        $("body" ).css( "background-color", "#000000" );
        $("body" ).css( "color", "#ffffff" );
        $("a").css( "color", "#FFF333" );
        $("hr").css( "border-color", "#ffffff" );
        $("legend" ).css( "color", "#ffffff" );
        $("footer" ).css( "background-color", "#000000" );
        $(".partners").css( "background-color", "#000000" );
        $(".navbar-default").css( "background-color", "#000000" );
        $(".navbar-default").css( "border-bottom", "4px solid #ffffff" );
        $(".capacho").css( "border-left", "1px dotted #ffffff" );
        $(".dropdown-menu").css( "background-color", "#000000");
        $(".dropdown-menu").css( "border", "1px solid #ffffff");
        $(".modal-content").css( "background-color", "#000000");
        $(".modal-content").css( "border", "1px solid #ffffff");
        $(".subTitulo" ).css( "background-color", "#000000" );
        $(".pagination" ).find("a").css( "background-color", "#000000" );
        $(".ui-widget-content").css( "background-color", "#000000" );
        $(".ui-widget-content").css( "color", "#ffffff" );
        $(".btn-link").css( "color", "#FFF333" );
        $("#barra-brasil" ).css( "background-color", "#000000" );
        $("#topo_acessibilidade").css( "background-color", "#000000" );

        //$( ".dropdown-toggle" ).css( "background-color", "#555555" );

      }
      else if (index == 3) {

        var size = $("body").css('font-size');

        size = size.replace('px', '');
        size = Number(size) + 0.5;
        if (size <= 18) {
          $("body").animate({
            'font-size' : size + 'px'
          });
        }

      }
      else if (index == 4) {

        $("body").animate({
          'font-size' : '14px'
        });

      }
      else if (index == 5) {
        var size = $("body").css('font-size');

        size = size.replace('px', '');
        size = Number(size) - 0.5;
        if (size >= 11) {
          $("body").animate({
            'font-size' : size + 'px'
          });
        }
      }
      else if (index == 0) {
      }

  },
    render:function(){
      var headerObject = this.props.headerObject;

      return (
      <div>
        <div className="container extensao">
          <div id="topo_acessibilidade">
            <ul id="nav1">
              <li>Ir para o <a href="#conteudo" accesskey="1">Conteúdo [1]</a></li>
              <li>Ir para o <a href="#navbar-ex-collapse" accesskey="2">Menu [2]</a></li>
              <li>Ir para o <a href="#rodape" accesskey="3">Rodapé [3]</a></li>
            </ul>
            <ul id="nav2">
              <li><a href="acessibilidade.html" target="_self">Acessibilidade</a></li>
              <li id="contraste">Contraste <a id="contraste_normal" href="#" data-toggle="tooltip" data-placement="bottom" onClick={this.getComponent.bind(this, 1)}><img src="img/contraste1.png" title="Contraste normal" width="13" height="14"/></a><a id="alto_contraste" href="#" data-toggle="tooltip" data-placement="bottom" onClick={this.getComponent.bind(this, 2)}><img src="img/contraste2.png" title="Alto contraste" width="13" height="14"/></a></li>
              <li>Tamanho do texto
              <a href="#" data-toggle="tooltip" data-placement="bottom" title="Aumentar fonte" className="inc-font" onClick={this.getComponent.bind(this, 3)}> A+</a>
              <a href="#" data-toggle="tooltip" data-placement="bottom" title="Fonte padrão" className="res-font" onClick={this.getComponent.bind(this, 4)}> A</a>
              <a href="#" data-toggle="tooltip" data-placement="bottom" title="Diminuir fonte" className="dec-font" onClick={this.getComponent.bind(this, 5)}> A-</a></li>
            </ul>
          </div>
        </div>
        <div className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div id="menu-mobile" className="navbar-header"><BotaoResponsivo/></div>
            <div className="collapse navbar-collapse" id="navbar-ex-collapse"><Menu headerObject={headerObject}/></div>
          </div>
        </div>
        <div className="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="modalLogin">Identificação</h4>
              </div>
              <div className="modal-body">
                <form className="form-login">
                  <div className="form-group">
                    <label className="control-label">Email:</label>
                    <input className="form-control" id="emailLogin" placeholder="Email" type="text"></input>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Senha:</label>
                    <input className="form-control" id="senhaLogin" placeholder="Senha" type="password"></input>
                  </div>
                  <div className="form-group">
                    <div className="checkbox">
                      <input id="lembrarLogin" type="checkbox"></input><label>Lembrar de mim</label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <a type="submit" className="btn btn-primary" onClick={this.getComponent.bind(this, 6)}>Entrar</a>
                <a className="btn btn-success" href="cadastro-representante.html">Cadastrar</a>
                <a className="btn btn-danger" data-dismiss="modal">Cancelar</a>
                <a type="button" className="btn btn-link" href="recuperar-senha.html">Esqueci a senha</a>
              </div>
            </div>
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
