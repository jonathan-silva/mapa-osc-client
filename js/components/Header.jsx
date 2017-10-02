/*** Componente responsável pela parte superior da página ***/
define(['react','rotas'], function(React) {


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
            <img src="img/logo.png" className="brand-style logoMapa"></img>
          </a>
          <button type="button" className="navbar-toggle micro" data-toggle="collapse" data-target="#navbar-ex-collapse">
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
        if (l.text=='') {
          elems.push(<li className="divider"></li>);
        }
        else if (l.text=='Sair') {
          elems.push(<li><a href={l.link}><span className="glyphicon glyphicon-log-out" aria-hidden="true"></span> {l.text}</a></li>);
        }
        else {
          elems.push(<li><a href={l.link}>{l.text}</a></li>);
        }
      }
      return elems;
    },
    render: function () {
      return (<div>
              <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{this.props.titulo}<i className="fa fa-caret-down"></i></a>
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
          items.push(<li><a id="btnEntrar" className="btn-link"  data-toggle="modal" data-target="#modalLogin">{this.props.headerObject.menuList[i].text}</a></li>);
          items.push(<li id="dropdown-menu-header" className="dropdown logado menuLogado"><DropdownMenu submenu={this.props.headerObject.menuLogado} titulo={usuarioLogado}/></li>);
        }
        else if(i == this.props.headerObject.menuList.length-2){//Posição do editar OSC
          items.push(<li><a id="btnEditarOSCs" className="logado" href={this.props.headerObject.menuList[i].link}>{this.props.headerObject.menuList[i].text}</a></li>);
        }
        else if(i == this.props.headerObject.menuList.length-3){//Posição do cadastrar
          items.push(<li><a id="btnCadastrar" href={this.props.headerObject.menuList[i].link}>{this.props.headerObject.menuList[i].text}</a></li>);
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
          desativaContraste();
          location.reload();
      }
      else if (index == 2) {
          ativaContraste();
          location.reload();
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
      }else if (index == 6) {

              var email =  $('#emailLogin').val();
              var senha =  $('#senhaLogin').val();
              jQuery("#labelError").text("");

              if (!validaEmail(email)){
                $("#emailLogin.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                jQuery("#labelError").text("Endereço de e-mail inválido.");
                return false;
              }else{
                $("#emailLogin.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
              }

              if (senha.length < 5){
                $("#senhaLogin.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                jQuery("#labelError").text("Senha inválida.");
                return false;
              }else{
                $("#senhaLogin.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
              }

              var $json = {
                  "tx_email_usuario": email,
                  "tx_senha_usuario": senha
              };

              var rotas = new Rotas();
              var urlController = 'js/controller.php';
              jQuery("#labelError").text(""); // Limpar dados
              $.ajax({
              url: urlController,
              type: 'POST',
              dataType: 'json',
              data: {flag: 'login', rota: rotas.Login(), parametros: $json},
              success: function (data) {
                  window.localStorage.setItem('User', data.id_usuario);
                  window.localStorage.setItem('Authorization', data.access_token);
                  window.localStorage.setItem('Nome', data.tx_nome_usuario);
                  window.localStorage.setItem('Osc', data.representacao);
                  $('#modalLogin').modal('hide');
                  verificarLogado();
                  location.reload();
              },
              error: function (data) {
                  if (data.responseText.id_usuario != undefined){
                      window.localStorage.setItem('User', data.responseText.id_usuario);
                      window.localStorage.setItem('Authorization', data.responseText.access_token);
                      window.localStorage.setItem('Nome', data.responseText.tx_nome_usuario);
                      window.localStorage.setItem('Osc', data.responseText.representacao);
                      $('#modalLogin').modal('hide');
                      verificarLogado();
                      location.reload();
                  } else if (data.status == 403) {
                      jQuery("#labelError").text(JSON.parse(data.responseText).msg);
                  } else if (data.status == 401) { // Usuario Inválido
                      jQuery("#labelError").text("E-mail e/ou senha incorretos. Tente novamente.");
                  }else {
                      jQuery("#labelError").text("E-mail e/ou senha incorretos. Tente novamente.");
                  }
              }
          });

      }
      else if (index == 7) {

        var elemento="#conteudo";
        var posicao = $(elemento).offset().top - 0;
        $('html, body').stop().animate({ scrollTop: posicao }, 800);

      }
      else if (index == 8) {

        var elemento="#navbar-ex-collapse";
        var posicao = $(elemento).offset().top - 0;
        $('html, body').stop().animate({ scrollTop: posicao }, 800);

      }
      else if (index == 9) {

        var elemento="#rodape";
        var posicao = $(elemento).offset().top - 0;
        $('html, body').stop().animate({ scrollTop: posicao }, 800);

      }
      else if (index == 10) {

        var rotas = new Rotas();
        var controller = 'js/controller.php';
        var limiteAutocompleteCidade = 10;

        function replaceSpecialChars(str){
          str = str.replace(/[ÀÁÂÃÄÅ]/g,"A");
          str = str.replace(/[àáâãäå]/g,"a");
          str = str.replace(/[ÉÈÊË]/g,"E");
          str = str.replace(/[éèêë]/g,"e");
          str = str.replace(/[ÍÌÎÏ]/g,"I");
          str = str.replace(/[íìîï]/g,"i");
          str = str.replace(/[ÓÒÔÕ]/g,"O");
          str = str.replace(/[óòôõ]/g,"o");
          str = str.replace(/[ÚÙÛÜ]/g,"U");
          str = str.replace(/[úùûü]/g,"u");
          str = str.replace(/[Ç]/g,"C");
          str = str.replace(/[ç]/g,"c");
          return str;
        }


        //autocomplete municipio
        $("#localidade").autocomplete({
            minLength: 1,
            source: function (request, response) {
               $.ajax({
                   url: controller,
                   type: 'GET',
                   async: true,
                   dataType: "json",
                   data: {flag: 'autocomplete', rota: rotas.AutocompleteOSCByCounty(replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocompleteCidade)},
                   success: function (data) {
                     response($.map( data, function( item ) {
                        return {
                            label: item.edmu_nm_municipio + ' - '+ item.eduf_sg_uf,
                            value: item.edmu_nm_municipio + ' - '+ item.eduf_sg_uf,
                            id: item.edmu_cd_municipio
                        };
                    }));
                   },
                   error: function (e) {
                     $("#localidade").val("");
                     $("#cd_municipio_id_localidade").val("");
                     $("#localidade").closest('.form-group').removeClass('has-success').addClass('has-error');
                     jQuery("#labelErrorLocalidade").text("Nome do Município inválido.");
                   }
               });
           },
            select: function( event, ui ) {
              var id_attr = '';
              $("#localidade").val( ui.item.value );
              $("#cd_municipio_id_localidade").val( ui.item.id );

              id_attr = "#" + $("#localidade.form-control").attr("id");
              $("#localidade.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
              $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');

            }
         });
      }
      else if (index == 11) {

        window.localStorage.setItem('cd_localidade',   $("#cd_municipio_id_localidade").val());
        window.localStorage.setItem('nome_localidade',   $("#localidade").val());
        $("#btn-localidade").text($("#localidade").val())
        $('#modalLocalidade').modal('hide');
        location.reload();
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
              <li>Ir para o <a id="navCont" name="conteudo" className="cursor" onClick={this.getComponent.bind(this, 7)}>Conteúdo [1]</a></li>
              <li>Ir para o <a id="navMenu" name="navbar-ex-collapse" className="cursor"  onClick={this.getComponent.bind(this, 8)}>Menu [2]</a></li>
              <li>Ir para o <a id="navRoda" name="rodape" className="cursor" onClick={this.getComponent.bind(this, 9)}>Rodapé [3]</a></li>
            </ul>
            <ul id="nav2">
              <li><a href="acessibilidade.html" target="_self">Acessibilidade</a></li>
              <li id="contraste">
              <a id="contraste_normal" data-toggle="tooltip" data-placement="bottom" title="Contraste normal" className="cursor" onClick={this.getComponent.bind(this, 1)}>Contraste Normal</a>
              <a id="alto_contraste" data-toggle="tooltip" data-placement="bottom" title="Alto contraste"  className="cursor" onClick={this.getComponent.bind(this, 2)}>Alto Contraste</a>
              </li>
              <li>Tamanho do texto
              <a data-toggle="tooltip" data-placement="bottom" title="Aumentar fonte" className="inc-font cursor" onClick={this.getComponent.bind(this, 3)}><b> A+</b></a>
              <a data-toggle="tooltip" data-placement="bottom" title="Fonte padrão" className="res-font cursor" onClick={this.getComponent.bind(this, 4)}><b> A</b></a>
              <a data-toggle="tooltip" data-placement="bottom" title="Diminuir fonte" className="dec-font cursor" onClick={this.getComponent.bind(this, 5)}><b> A-</b></a></li>
              <li>
                <a id="btn-localidade" data-toggle="tooltip" data-placement="bottom" title="Escolha seu Município" className="cursor" data-toggle="modal" data-target="#modalLocalidade">Minha localidade</a>
              </li>
            </ul>
          </div>



          <div className="modal fade" id="modalLocalidade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
              <div className="modal-content">

                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title" id="modalLocalidade">Escolha seu Município</h4>
                </div>

                <div className="modal-body">
                  <form className="form-login">
                    <div className="form-group">
                      <label className="control-label">Município</label>
                      <input className="form-control" id="localidade" placeholder="Inserir o nome do seu Município" type="text" onClick={this.getComponent.bind(this, 10)}></input>
                      <input className="form-control" id="cd_municipio_id_localidade" type="hidden" ></input>

                    </div>
                    <div className="form-group row-centered">
                      <span id="labelErrorLocalidade" className="label label-danger centered"></span>
                    </div>
                  </form>
                </div>

                <div className="modal-footer">
                  <a type="submit" className="btn btn-success" id="btn-localidade-modal" onClick={this.getComponent.bind(this, 11)} ><span className="glyphicon glyphicon-log-in" aria-hidden="true"></span> Confirmar</a>
                  <a className="btn btn-danger" data-dismiss="modal"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Cancelar</a>
                </div>
              </div>
            </div>
          </div>




        </div>
        <div className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div id="menu-mobile" className="navbar-header"><BotaoResponsivo/></div>
            <div className="collapse navbar-collapse menuHeader" id="navbar-ex-collapse"><Menu headerObject={headerObject}/></div>
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
                    <label className="control-label">E-mail: <span className="obrigatorio glyphicon-asterisk">(Campo Obrigatório)</span></label>
                    <input className="form-control" id="emailLogin" placeholder="Email" type="text"></input>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Senha: <span className="obrigatorio glyphicon-asterisk">(Campo Obrigatório)</span></label>
                    <input className="form-control" id="senhaLogin" placeholder="Senha" type="password"></input>
                  </div>
                  <div className="form-group row-centered">
                       <span id="labelError" className="label label-danger centered"></span>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <a type="submit" className="btn btn-success" id="btn-logar-modal" onClick={this.getComponent.bind(this, 6)}><span className="glyphicon glyphicon-log-in" aria-hidden="true"></span> Entrar</a>
                <a className="btn btn-danger" data-dismiss="modal"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Cancelar</a>
                <a type="button" className="btn btn-link" href="recuperar-senha.html">Esqueci a senha</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    }
  });
  return Header;
});


function validaEmail(email){

  var usuario = email.substring(0, email.indexOf("@"));
  var dominio = email.substring(email.indexOf("@")+ 1, email.length);

  if ((usuario.length >=1) &&
  (dominio.length >=3) &&
  (usuario.search("@")==-1) &&
  (dominio.search("@")==-1) &&
  (usuario.search(" ")==-1) &&
  (dominio.search(" ")==-1) &&
  (dominio.search(".")!=-1) &&
  (dominio.indexOf(".") >=1)&&
  (dominio.lastIndexOf(".") < dominio.length - 1)) {
    return true;
  }else{
    return false;
  }
}
